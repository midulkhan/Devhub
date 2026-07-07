import OpenAI from "openai";
import { tavily } from "@tavily/core";
import { inngest } from "./client";
import { prisma } from "@/lib/prisma";

const deepseek = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const tvly = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

type GeneratedPost = {
  slug: string;
  title: string;
  description: {
    title: string;
    content: string;
  };
  code: {
    language: string;
    snippet: string;
  };
  checklist: string[];
  recommendation: string;
};

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getSimilarity(a: string, b: string): number {
  const wordsA = new Set(normalizeText(a).split(" "));
  const wordsB = new Set(normalizeText(b).split(" "));

  if (!wordsA.size || !wordsB.size) return 0;

  const commonWords = [...wordsA].filter((word) => wordsB.has(word));
  const totalWords = new Set([...wordsA, ...wordsB]);

  return commonWords.length / totalWords.size;
}

function parseJsonPost(content: string): GeneratedPost {
  const cleaned = content
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  if (!cleaned.startsWith("{") || !cleaned.endsWith("}")) {
    throw new Error("AI did not return clean JSON");
  }

  return JSON.parse(cleaned) as GeneratedPost;
}

export const aiGeneratingPost = inngest.createFunction(
  {
    id: "ai-auto-blog-post",
    name: "Generate unique AI blog post",
    retries: 3,
    triggers: {
      cron: "0 */3 * * *", // every 3h
    },
  },
  async ({ step }) => {
    const researchResults = await step.run(
      "research-latest-issues",
      async () => {
        const searches = await Promise.all([
          tvly.search(
            "recent WordPress errors WooCommerce issues checkout bugs plugin conflicts",
            {
              maxResults: 5,
              searchDepth: "advanced",
            },
          ),
          tvly.search(
            "site:wordpress.org/support WooCommerce checkout not working recent issue",
            {
              maxResults: 5,
              searchDepth: "advanced",
            },
          ),
          tvly.search(
            "site:github.com/woocommerce/woocommerce/issues recent WooCommerce bug checkout cart",
            {
              maxResults: 5,
              searchDepth: "advanced",
            },
          ),
          tvly.search(
            "site:stackoverflow.com/questions/tagged/elementor Wordpress and woocommerce issues recent bugs",
            {
              maxResults: 5,
              searchDepth: "advanced",
            },
          ),
        ]);

        return searches.flatMap((search) =>
          search.results.map((result) => ({
            title: result.title,
            url: result.url,
            content: result.content,
          })),
        );
      },
    );

    const existingPosts = await step.run("get-existing-posts", async () => {
      const posts = await prisma.articles.findMany({
        select: {
          title: true,
          slug: true,
        },
        orderBy: {
          created_at: "desc",
        },
        take: 100,
      });

      return posts.map((post) => ({ title: post.title, slug: post.slug }));
    });

    const generatedPost = await step.run("generate-unique-post", async () => {
      const completion = await deepseek.chat.completions.create({
        model: "deepseek-v4-flash",
        stream: false,
        max_tokens: 2500,
        messages: [
          {
            role: "system",
            content: `
                You are DevHub AI.

                You are a senior WordPress, WooCommerce, Elementor, PHP, JavaScript, SEO and technical troubleshooting expert.

                You must generate one unique article based on the supplied research results.

                Strict rules:
                - Return ONLY valid JSON.
                - Do not use markdown.
                - Do not use code fences.
                - Do not write "Here is the content".
                - Output must start with { and end with }.
                - Do not generate a topic that already exists.
                - Prefer recent real-world WordPress/WooCommerce issues.
                - Explain how the error looks, why it happens, how to fix it, code solution if needed, pro tips and recommendation.
                `,
          },
          {
            role: "user",
            content: `
                Existing posts:
                ${JSON.stringify(existingPosts, null, 2)}

                Research results:
                ${JSON.stringify(researchResults, null, 2)}

                Task:
                Pick one strong WordPress/WooCommerce issue that is not already covered by existing posts.

                Return exactly this JSON structure:

                {
                "title": "string",
                "slug": "string",
                "description": {
                    "title": "string",
                    "content": "string"
                },
                "code": {
                    "language": "php",
                    "snippet": "string"
                },
                "checklist": ["string"],
                "recommendation": "string"
                }
`,
          },
        ],
      });

      const content = completion.choices[0]?.message?.content;

      if (!content) {
        throw new Error("DeepSeek returned empty content");
      }

      return parseJsonPost(content);
    });

    const duplicateCheck = await step.run("check-duplicate", async () => {
      const existing = await prisma.articles.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
        },
      });

      const matches = existing
        .map((post) => ({
          id: post.id.toString(),
          title: post.title,
          slug: post.slug,
          similarity: getSimilarity(generatedPost.title, post.title),
        }))
        .filter((post) => post.similarity >= 0.55)
        .sort((a, b) => b.similarity - a.similarity);

      return {
        isDuplicate: matches.length > 0,
        matches,
      };
    });

    if (duplicateCheck.isDuplicate) {
      throw new Error(
        `Duplicate article generated: ${duplicateCheck.matches[0]?.title}`,
      );
    }

    const savedPost = await step.run("save-post-to-supabase", async () => {
      const article = await prisma.articles.create({
        data: {
          title: generatedPost.title,
          description: generatedPost.description,
          code: generatedPost.code,
          checklist: generatedPost.checklist,
          recommendation: generatedPost.recommendation,
          slug: generatedPost.slug ?? null,
        },
      });

      return {
        ...article,
        id: article.id.toString(),
      };
    });

    return {
      success: true,
      savedPost,
    };
  },
);
