import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") ?? 16), 1),
      50,
    );

    const skip = (page - 1) * limit;

    const [articles, total] = await Promise.all([
      prisma.articles.findMany({
        orderBy: {
          created_at: "desc",
        },
        skip,
        take: limit,
      }),

      prisma.articles.count(),
    ]);

    const data = articles.map((article) => ({
      ...article,
      id: article.id.toString(),
    }));

    return NextResponse.json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
      data,
    });
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
