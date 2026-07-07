import Image from "next/image";
import Link from "next/link";
import { Code2, ChevronLeft, ChevronRight } from "lucide-react";

type Article = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  description: {
    title?: string;
    content?: string;
  };
};

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { page } = await searchParams;

  const currentPage = Number(page ?? 1);
  const limit = 16;

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(
    `${baseURL}/api/v1/getposts?page=${currentPage}&limit=${limit}`,
    {
      cache: "no-store",
    },
  );

  const result = await res.json();

  const posts: Article[] = result.data ?? [];
  const totalPosts = result.totalPosts ?? 0;
  const totalPages = Math.ceil(totalPosts / limit);

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="py-20 md:py-30">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="mb-12 max-w-3xl">
            <div className="flex items-start gap-5">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-orange-500 text-white">
                <Code2 className="size-6" />
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-2xl">
                  DevHub Blog
                </h1>

                <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                  WordPress, WooCommerce, PHP, plugin conflict, and performance
                  troubleshooting guides with practical fixes.
                </p>
              </div>
            </div>
          </div>

          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/post/${post.slug}`}
                    className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10"
                  >
                    <div className="p-6">
                      <h2 className="line-clamp-2 text-xl font-bold leading-snug text-zinc-950 transition-colors group-hover:text-orange-500">
                        {post.title}
                      </h2>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">
                        {post.description?.content}
                      </p>

                      <div className="mt-5 flex items-center justify-between text-xs text-zinc-500">
                        <span>DevHub Team</span>

                        <span>
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }).format(new Date(post.created_at))}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Link
                    href={`?page=${Math.max(currentPage - 1, 1)}`}
                    className={`grid size-10 place-items-center rounded-xl border text-sm transition ${
                      currentPage === 1
                        ? "pointer-events-none border-zinc-200 text-zinc-300"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-orange-300 hover:text-orange-500"
                    }`}
                  >
                    <ChevronLeft className="size-4" />
                  </Link>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;

                    return (
                      <Link
                        key={pageNumber}
                        href={`?page=${pageNumber}`}
                        className={`grid size-10 place-items-center rounded-xl text-sm font-semibold transition ${
                          currentPage === pageNumber
                            ? "bg-orange-500 text-white"
                            : "border border-zinc-200 bg-white text-zinc-700 hover:border-orange-300 hover:text-orange-500"
                        }`}
                      >
                        {pageNumber}
                      </Link>
                    );
                  })}

                  <Link
                    href={`?page=${Math.min(currentPage + 1, totalPages)}`}
                    className={`grid size-10 place-items-center rounded-xl border text-sm transition ${
                      currentPage === totalPages
                        ? "pointer-events-none border-zinc-200 text-zinc-300"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-orange-300 hover:text-orange-500"
                    }`}
                  >
                    <ChevronRight className="size-4" />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center">
              <h2 className="text-xl font-bold text-zinc-950">
                No posts found
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                There are no articles in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
