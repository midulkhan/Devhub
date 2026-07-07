"use client";

import { useState } from "react";
import { ArrowRight, Code2, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Blog",
    href: "/post",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isHome ? "bg-transparent" : "bg-[#020617]/90 backdrop-blur-xl"}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/site-logo.webp"
            alt="DevHub Logo"
            width={150}
            height={100}
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-xl lg:flex">
          {navigation.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-white transition hover:bg-white/10 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Header actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/65 backdrop-blur-xl transition hover:border-orange-400/30 hover:bg-orange-500/10 hover:text-white"
          >
            <Search className="h-4 w-4 text-white" />
          </button>

          <Link
            href="#"
            className="hidden items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(249,115,22,0.35)] transition hover:-translate-y-0.5 hover:bg-orange-400 sm:inline-flex"
          >
            Explore fixes
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="absolute left-4 right-4 top-22 rounded-2xl border border-white/10 bg-[#080b15]/90 p-3 shadow-2xl backdrop-blur-2xl lg:hidden">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {item.href}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
