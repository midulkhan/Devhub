// app/api/v1/posts/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type CreateArticleBody = {
  title?: string;
  description?: {
    title?: string;
    content?: string;
  };
  code?: {
    language?: string;
    snippet?: string;
  } | null;
  checklist?: string[] | null;
  recommendation?: string | null;
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

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateArticleBody;

    const title = String(body.title ?? "").trim();

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 },
      );
    }

    if (!body.description || typeof body.description !== "object") {
      return NextResponse.json(
        { success: false, message: "Description is required" },
        { status: 400 },
      );
    }

    const existingPosts = await prisma.articles.findMany({
      select: {
        id: true,
        title: true,
        created_at: true,
      },
    });

    const duplicateMatches = existingPosts
      .map((post) => ({
        id: post.id.toString(),
        title: post.title,
        similarity: getSimilarity(title, post.title),
        created_at: post.created_at,
      }))
      .filter((post) => post.similarity >= 0.55)
      .sort((a, b) => b.similarity - a.similarity);

    if (duplicateMatches.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Duplicate article blocked",
          duplicate: true,
          checkedTitle: title,
          matches: duplicateMatches,
        },
        { status: 409 },
      );
    }

    const article = await prisma.articles.create({
      data: {
        title,
        description: body.description,
        code: body.code ?? null,
        checklist: body.checklist ?? null,
        recomendation: body.recommendation ?? null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        article: {
          ...article,
          id: article.id.toString(),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create article error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create article",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
