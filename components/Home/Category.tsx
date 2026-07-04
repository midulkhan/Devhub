import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Bug,
  CodeXml,
  FolderOpen,
  Gauge,
  LayoutDashboard,
  Newspaper,
  ShieldCheck,
  ShoppingCart,
  TerminalSquare,
} from "lucide-react";

type Category = {
  title: string;
  description: string;
  articles: number;
  href: string;
  icon: LucideIcon;
};

const categories: Category[] = [
  {
    title: "WordPress Errors",
    description:
      "Critical errors, white screen of death, database connection issues, and common WordPress error fixes.",
    articles: 24,
    href: "/category/wordpress-errors",
    icon: Bug,
  },
  {
    title: "WooCommerce Fixes",
    description:
      "Cart issues, checkout problems, payment gateway errors, product display bugs, and order management fixes.",
    articles: 18,
    href: "/category/woocommerce-fixes",
    icon: ShoppingCart,
  },
  {
    title: "PHP Compatibility",
    description:
      "PHP version upgrades, deprecated functions, fatal errors, and compatibility fixes for WordPress plugins and themes.",
    articles: 15,
    href: "/category/php-compatibility",
    icon: TerminalSquare,
  },
  {
    title: "Elementor Issues",
    description:
      "Editor not loading, widget errors, styling break issues, responsive problems, and Elementor performance fixes.",
    articles: 12,
    href: "/category/elementor-issues",
    icon: LayoutDashboard,
  },
  {
    title: "Plugin Conflicts",
    description:
      "Plugin compatibility issues, JavaScript conflicts, CSS override problems, and multi-plugin troubleshooting.",
    articles: 10,
    href: "/category/plugin-conflicts",
    icon: Blocks,
  },
  {
    title: "Security & Malware",
    description:
      "Malware removal, security hardening, firewall configuration, brute force protection, and vulnerability patching.",
    articles: 14,
    href: "/category/security-malware",
    icon: ShieldCheck,
  },
  {
    title: "Performance Optimization",
    description:
      "Speed optimization, caching setup, image optimization, database cleanup, Core Web Vitals, and CDN configuration.",
    articles: 16,
    href: "/category/performance",
    icon: Gauge,
  },
  {
    title: "Code Snippets",
    description:
      "Ready-to-use PHP, JavaScript, CSS, and SQL snippets for WordPress customization, hooks, filters, and theme development.",
    articles: 22,
    href: "/category/code-snippets",
    icon: CodeXml,
  },
];

export default function CategoriesSection() {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="bg-zinc-50 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
            <FolderOpen aria-hidden="true" className="size-4" />
            Browse by Category
          </span>

          <h2
            id="categories-heading"
            className="mb-4 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl"
          >
            Find the Fix You Need
          </h2>

          <p className="text-base leading-7 text-zinc-600">
            Every WordPress problem has a solution. Browse our organized
            categories to find step-by-step fixes, code snippets, and
            troubleshooting guides.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href={category.href}
                className="
                  group flex h-full flex-col rounded-2xl border
                  border-zinc-200 bg-white p-6
                  transition duration-300
                  hover:-translate-y-1 hover:border-orange-500
                  hover:bg-orange-500 hover:shadow-xl
                  hover:shadow-orange-500/15
                  focus-visible:-translate-y-1
                  focus-visible:border-orange-500
                  focus-visible:bg-orange-500
                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-orange-500/25
                  motion-reduce:transform-none
                  motion-reduce:transition-none
                "
              >
                <div
                  className="
                    mb-5 flex size-12 items-center justify-center
                    rounded-xl bg-orange-500 text-white
                    transition duration-300
                    group-hover:scale-105 group-hover:bg-white
                    group-hover:text-zinc-950
                    group-focus-visible:bg-white
                    group-focus-visible:text-zinc-950
                  "
                >
                  <Icon aria-hidden="true" className="size-6" />
                </div>

                <h3
                  className="
                    mb-2 text-base font-semibold text-zinc-950
                    transition-colors duration-300
                    group-hover:text-white
                    group-focus-visible:text-white
                  "
                >
                  {category.title}
                </h3>

                <p
                  className="
                    mb-5 line-clamp-3 text-sm leading-6 text-zinc-600
                    transition-colors duration-300
                    group-hover:text-white/90
                    group-focus-visible:text-white/90
                  "
                >
                  {category.description}
                </p>

                <span
                  className="
                    mt-auto inline-flex items-center gap-1.5
                    text-xs font-semibold text-zinc-500
                    transition-colors duration-300
                    group-hover:text-white
                    group-focus-visible:text-white
                  "
                >
                  <Newspaper className="size-4" />
                  {category.articles} articles
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
