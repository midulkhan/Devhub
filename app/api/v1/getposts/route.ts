import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const articles = await prisma.articles.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    const data = articles.map((article) => ({
      ...article,
      id: article.id.toString(),
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching articles:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
