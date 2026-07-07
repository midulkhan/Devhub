import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getSimilarity(a: string, b: string) {
  const wordsA = new Set(normalizeText(a).split(" "));
  const wordsB = new Set(normalizeText(b).split(" "));

  const commonWords = [...wordsA].filter((word) => wordsB.has(word));
  const totalWords = new Set([...wordsA, ...wordsB]);

  return commonWords.length / totalWords.size;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const title = String(body.title ?? "").trim();

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
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

    const matches = existingPosts
      .map((post) => {
        const similarity = getSimilarity(title, post.title);

        return {
          id: post.id.toString(),
          title: post.title,
          similarity,
          created_at: post.created_at,
        };
      })
      .filter((post: any) => post.similarity >= 0.55)
      .sort((a: any, b: any) => b.similarity - a.similarity);

    const isDuplicate = matches.length > 0;

    return NextResponse.json({
      success: true,
      isDuplicate,
      checkedTitle: title,
      matches,
    });
  } catch (error) {
    console.error("Duplicate API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
