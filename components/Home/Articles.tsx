import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  FileText,
  UserRound,
  Zap,
} from "lucide-react";

type BlogPost = {
  title: string;
  description: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  href: string;
  image: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "How to Fix WordPress Critical Error After PHP Update",
    description:
      "Learn how to diagnose and fix the dreaded WordPress critical error that appears after upgrading your PHP version. Step-by-step troubleshooting with code solutions.",
    category: "WordPress Errors",
    author: "Alex Chen",
    publishedAt: "Jun 28, 2026",
    readingTime: "8 min read",
    href: "/blog/wordpress-critical-error-after-php-update",
    image: "./assets/code.svg",
  },
  {
    title: "WooCommerce Cart Not Updating: Causes and Fix",
    description:
      "Is your WooCommerce cart stuck and not updating when customers add products? Discover the common causes and proven solutions to fix cart AJAX issues.",
    category: "WooCommerce Fixes",
    author: "Sarah Kim",
    publishedAt: "Jun 25, 2026",
    readingTime: "6 min read",
    href: "/blog/woocommerce-cart-not-updating-fix",
    image: "./assets/code.svg",
  },
  {
    title: "Elementor Not Loading? Complete Troubleshooting Guide",
    description:
      "When the Elementor editor shows a blank screen or keeps loading forever, here is exactly what to check and how to fix it. Includes server config and plugin conflict solutions.",
    category: "Elementor Issues",
    author: "Alex Chen",
    publishedAt: "Jun 22, 2026",
    readingTime: "10 min read",
    href: "/blog/elementor-not-loading-troubleshooting",
    image: "./assets/code.svg",
  },
  {
    title: "Fix WordPress Image Upload Slow Issue",
    description:
      "Slow image uploads in WordPress can frustrate content editors. Learn how to optimize image handling, configure server settings, and use the right plugins for fast uploads.",
    category: "Performance Optimization",
    author: "Marcus Rivera",
    publishedAt: "Jun 20, 2026",
    readingTime: "7 min read",
    href: "/blog/wordpress-image-upload-slow-fix",
    image: "./assets/code.svg",
  },
  {
    title: "How to Disable WordPress Big Image Scaling",
    description:
      "WordPress automatically scales large images. Learn how to disable or customize the big image threshold without affecting your existing media library.",
    category: "Code Snippets",
    author: "Sarah Kim",
    publishedAt: "Jun 18, 2026",
    readingTime: "5 min read",
    href: "/blog/disable-wordpress-big-image-scaling",
    image: "./assets/code.svg",
  },
  {
    title: "PHP 8 Compatibility Issues in WordPress Plugins",
    description:
      "PHP 8 introduced breaking changes that can crash your WordPress site. Learn how to identify incompatible plugins, fix deprecated code, and safely upgrade PHP.",
    category: "PHP Compatibility",
    author: "Alex Chen",
    publishedAt: "Jun 15, 2026",
    readingTime: "9 min read",
    href: "/blog/php8-wordpress-plugin-compatibility",
    image: "./assets/code.svg",
  },
];

export default function Articles() {
  return (
    <section
      aria-labelledby="latest-fixes-heading"
      className="bg-white py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100    px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black">
              <Zap aria-hidden="true" className="size-4" />
              Latest Fixes
            </span>

            <h2
              id="latest-fixes-heading"
              className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl"
            >
              Recently Published Solutions
            </h2>
          </div>

          <Link
            href="/blog"
            className="
              inline-flex w-fit items-center gap-2 text-sm font-semibold
              text-orange-500 transition-colors
              hover:text-orange-600
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-orange-500
              focus-visible:ring-offset-4
            "
          >
            View All Posts
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.href}
              className="
                group flex h-full flex-col overflow-hidden rounded-2xl
                border border-zinc-200 bg-white
                transition duration-300
                hover:-translate-y-1
                hover:border-orange-500
                hover:shadow-xl
                hover:shadow-orange-500/10
                motion-reduce:transform-none
                motion-reduce:transition-none
              "
            >
              <div className="flex flex-1 flex-col p-5">
                <Link href={post.href}>
                  <h3
                    className="
                      mb-3 line-clamp-2 text-lg font-semibold
                      leading-snug text-zinc-950
                      transition-colors
                      group-hover:text-orange-600
                    "
                  >
                    {post.title}
                  </h3>
                </Link>

                <p className="mb-5 line-clamp-2 text-sm leading-6 text-zinc-600">
                  {post.description}
                </p>

                <div className="mt-auto">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500">
                    <span className="inline-flex items-center gap-1.5">
                      <UserRound aria-hidden="true" className="size-3.5" />
                      {post.author}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays aria-hidden="true" className="size-3.5" />
                      {post.publishedAt}
                    </span>

                    <span className="inline-flex items-center gap-1.5 sm:ml-auto">
                      <Clock3 aria-hidden="true" className="size-3.5" />
                      {post.readingTime}
                    </span>
                  </div>

                  <Link
                    href={post.href}
                    className="
                      mt-4 flex items-center gap-1 border-t border-zinc-100
                      pt-4 text-sm font-semibold text-orange-500
                      transition-all
                      hover:gap-2 hover:text-orange-600
                    "
                  >
                    <FileText aria-hidden="true" className="size-4" />
                    Read more
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
