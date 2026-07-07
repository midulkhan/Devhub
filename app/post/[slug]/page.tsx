import Image from "next/image";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  oneDark,
  materialDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Share2,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

const tableOfContents = [
  "The Issue",
  "Why It Happens",
  "Solution",
  "Testing",
  "Final Notes",
];

type Article = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  description: {
    title: string;
    content: string;
  };
  code?: {
    language?: string;
    snippet?: string;
  } | null;
  checklist?: string[] | null;
  recommendation?: string | null;
};

interface props {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailsPage({ params }: props) {
  const { slug } = await params;

  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_BASE_URL;

  const request = await fetch(`${baseURL}/api/v1/getposts/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await request.json();
  if (!data.success) {
    notFound();
  }

  const posts: Article = data.data;
  console.log("Posts data:", posts);

  return (
    <main className="bg-white">
      <section className="py-16 md:py-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-[220px_minmax(0,760px)] lg:gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-4 text-xs font-bold uppercase tracking-wide text-zinc-950">
                Table of Contents
              </p>

              <nav className="space-y-3">
                {tableOfContents.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                    className="block text-sm font-medium text-zinc-500 transition-colors hover:text-orange-500"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article>
            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
              <Link href="/" className="hover:text-orange-500">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-orange-500">
                Blog
              </Link>
              <span>/</span>
              <span className="text-zinc-800">
                WooCommerce Cart Not Updating
              </span>
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
              {posts?.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-500">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="size-4" />
                Motions Studio Team
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" />

                <p>
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(posts.created_at))}
                </p>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-4" />6 min read
              </span>
            </div>

            <div className="relative mt-8 aspect-16/7 overflow-hidden rounded-2xl bg-zinc-100">
              <Image
                src={"/assets/web_banner.webp"}
                alt="WooCommerce cart issue"
                fill
                priority
                className="object-cover"
              />
            </div>

            <section id="the-issue" className="mt-10">
              <h2 className="text-lg font-bold tracking-tight text-zinc-950">
                {posts?.description?.title}
              </h2>

              <p className="mt-4 text-base leading-8 text-zinc-600">
                {posts?.description?.content}
              </p>

              {/* <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                  <div className="flex gap-3">
                    <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-500" />
                    <div>
                      <p className="font-semibold text-red-700">
                        Common Error Message
                      </p>
                      <p className="mt-2 font-mono text-sm leading-6 text-red-600">
                        There has been a critical error on this website. Please
                        check your site admin email inbox for instructions.
                      </p>
                    </div>
                  </div>
                </div> */}
            </section>

            {/* <section id="why-it-happens" className="mt-10">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
                  Why It Happens
                </h2>

                <p className="mt-4 text-base leading-8 text-zinc-600">
                  WooCommerce depends on WordPress hooks, AJAX requests,
                  sessions, templates, and PHP functions. If one part breaks,
                  the cart may fail silently or throw a fatal error.
                </p>

                <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
                  <p className="mb-3 font-semibold text-orange-800">
                    Primary Causes:
                  </p>

                  <ul className="space-y-2 text-sm text-orange-700">
                    <li>Deprecated functions removed in newer PHP versions</li>
                    <li>
                      Plugin conflicts affecting cart fragments or sessions
                    </li>
                    <li>
                      Theme overrides using outdated WooCommerce templates
                    </li>
                    <li>Broken cache, CDN, or optimization settings</li>
                  </ul>
                </div>
              </section> */}
            {Array.isArray(posts?.checklist) && posts.checklist.length > 0 && (
              <section id="solution" className="mt-10">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
                  Step-by-Step Solution
                </h2>

                <ul className="mt-5 space-y-3">
                  {posts.checklist.map((check: string, index: number) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm leading-6 text-zinc-700"
                    >
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-orange-500 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section id="code" className="mt-10">
              <SyntaxHighlighter
                language="php"
                style={materialDark}
                className="rounded-2xl text-sm"
              >
                {posts?.code?.snippet}
              </SyntaxHighlighter>
            </section>

            {/* <section id="testing" className="mt-10">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
                  Testing Checklist
                </h2>

                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="mb-4 font-semibold text-emerald-800">
                    After applying the fix, verify:
                  </p>

                  <ul className="space-y-3">
                    {checklist.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm font-medium text-emerald-700"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section> */}

            {posts?.recommendation && posts.recommendation.length > 0 && (
              <section id="final-notes" className="mt-10">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
                  Final Recommendation
                </h2>

                <div className="mt-5 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
                  <div className="flex gap-3">
                    <Wrench className="mt-0.5 size-5 shrink-0 text-cyan-600" />
                    <div>
                      <p className="font-semibold text-cyan-900">
                        Best Practice
                      </p>
                      <p className="mt-2 text-sm leading-7 text-cyan-800">
                        {posts?.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-zinc-200 py-5">
              <span className="text-sm font-medium text-zinc-500">
                WooCommerce Fixes
              </span>

              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Share2 className="size-4" />
                Share this guide
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <div className="flex gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-full bg-orange-500 font-bold text-white">
                  M
                </div>

                <div>
                  <h3 className="font-bold text-zinc-950">
                    Motions Studio Team
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    WordPress developer specializing in debugging, WooCommerce
                    optimization, and PHP compatibility fixes.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
