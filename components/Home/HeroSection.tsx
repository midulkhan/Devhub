"use client";

import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";
import {
  ArrowRight,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Menu,
  Search,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SaasLandingHero() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* Three.js shader background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ShaderGradientCanvas
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
          lazyLoad={false}
          pixelDensity={1}
          fov={45}
        >
          <ShaderGradient
            animate="on"
            brightness={1.2}
            cAzimuthAngle={180}
            cDistance={3.6}
            cPolarAngle={90}
            cameraZoom={1}
            color1="#ff5005"
            color2="#dbba95"
            color3="#d0bce1"
            wireframe={false}
          />
        </ShaderGradientCanvas>

        {/* Dark overlay for professional contrast */}
      </div>

      {/* Transparent header */}

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center">
        <div className="mx-auto max-w-7xl overflow-hidden px-5 pb-20 pt-20 md:px-8 md:pb-28 md:pt-24">
          {/* Hero heading */}
          <div className="mx-auto max-w-4xl text-center flex flex-col justify-center items-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-white/5 px-4 py-2 text-xs font-medium text-orange-100 shadow-[0_0_35px_rgba(249,115,22,0.14)] backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              AI-powered WordPress issue intelligence
              <ChevronRight className="h-3.5 w-3.5 text-orange-400" />
            </div>

            <h1 className="max-w-4xl text-balance text-5xl font-medium leading-[0.96] tracking-[-0.055em] text-white md:text-7xl lg:text-[86px]">
              Clear Fixes for Every
              <span className="block bg-gradient-to-b from-white to-white/45 bg-clip-text text-transparent">
                WordPress Problem.
              </span>
            </h1>

            <p className="mx-auto max-w-xl text-sm leading-6 text-white md:text-base">
              Practical fixes for WordPress errors, WooCommerce issues, plugin
              conflicts, PHP bugs, performance problems, and developer-level
              troubleshooting—explained step by step.
            </p>

            {/* Orange buttons */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#"
                className="inline-flex min-w-45 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_15px_45px_rgba(249,115,22,0.4)] transition hover:-translate-y-0.5 hover:bg-orange-400"
              >
                <Zap className="h-4 w-4 fill-current" />
                View latest fixes
              </Link>

              <Link
                href="#"
                className="inline-flex min-w-45 items-center justify-center gap-2 rounded-xl border border-orange-300/25 bg-orange-500/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-orange-300/40 hover:bg-orange-500/20"
              >
                <Braces className="h-4 w-4 text-orange-300" />
                Browse snippets
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/80">
              {[
                "Current issue tracking",
                "AI-assisted research",
                "Developer-ready solutions",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-orange-300/20 ">
                    <Check className="h-3 w-3 text-white" />
                  </span>

                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
