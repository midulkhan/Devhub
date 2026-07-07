import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Bug,
  Code2,
  Database,
  Gauge,
  Mail,
  MessageCircle,
  MonitorCog,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

function DeveloperIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[390px]">
      <div className="absolute inset-x-0 top-0 bottom-5 overflow-hidden rounded-3xl border border-orange-100 bg-orange-50">
        {/* Background decorations */}
        <div className="absolute -top-20 -right-20 size-56 rounded-full bg-orange-200/60 blur-3xl" />

        <div className="absolute -bottom-24 -left-20 size-56 rounded-full bg-orange-100 blur-3xl" />

        <div className="absolute top-8 left-8 h-px w-24 bg-orange-200" />

        <div className="absolute top-12 left-8 h-px w-16 bg-orange-200" />

        {/* Floating icons */}
        <div className="absolute top-8 left-7 grid size-12 place-items-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
          <Blocks className="size-6" />
        </div>

        <div className="absolute top-24 left-12 grid size-10 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-md">
          <Settings className="size-5" />
        </div>

        <div className="absolute top-16 right-10 grid size-10 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-md">
          <Mail className="size-5" />
        </div>

        <div className="absolute top-32 right-6 grid size-10 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-md">
          <MessageCircle className="size-5" />
        </div>

        <div className="absolute top-48 right-11 grid size-10 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-md">
          <Database className="size-5" />
        </div>

        {/* Laptop */}
        <div className="absolute bottom-[70px] left-1/2 w-[210px] -translate-x-1/2 sm:w-[235px]">
          <div className="overflow-hidden rounded-xl border-[6px] border-zinc-900 bg-zinc-900 shadow-2xl">
            <div className="relative aspect-[1.55/1] overflow-hidden rounded-md bg-zinc-950 p-4">
              <div className="mb-4 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-orange-500" />
                <span className="size-2 rounded-full bg-zinc-600" />
                <span className="size-2 rounded-full bg-zinc-600" />
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="h-1.5 w-10 rounded-full bg-orange-500" />
                  <div className="h-1.5 w-20 rounded-full bg-zinc-600" />
                </div>

                <div className="h-1.5 w-[90%] rounded-full bg-zinc-700" />

                <div className="flex gap-2">
                  <div className="h-1.5 w-16 rounded-full bg-zinc-600" />
                  <div className="h-1.5 w-12 rounded-full bg-orange-400" />
                </div>

                <div className="h-1.5 w-[75%] rounded-full bg-zinc-700" />

                <div className="h-1.5 w-[88%] rounded-full bg-zinc-700" />

                <div className="flex gap-2">
                  <div className="h-1.5 w-8 rounded-full bg-orange-500" />
                  <div className="h-1.5 w-16 rounded-full bg-zinc-600" />
                </div>
              </div>

              <Code2 className="absolute right-4 bottom-4 size-7 text-orange-500/40" />
            </div>
          </div>

          <div className="mx-auto h-3 w-[112%] -translate-x-[5.5%] rounded-b-xl bg-zinc-300 shadow-lg">
            <div className="mx-auto h-1.5 w-14 rounded-b-md bg-zinc-400" />
          </div>
        </div>

        {/* Small service cards */}
        <div className="absolute bottom-8 left-6 flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-950 shadow-md">
          <Bug className="size-4 text-orange-500" />
          Error fixed
        </div>

        <div className="absolute right-5 bottom-24 flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-950 shadow-md">
          <Gauge className="size-4 text-orange-500" />
          Optimized
        </div>
      </div>

      {/* Security badge */}
      <div className="absolute right-0 bottom-0 grid size-20 place-items-center rounded-2xl bg-orange-500 text-white shadow-xl shadow-orange-500/25 sm:size-24">
        <ShieldCheck className="size-9 sm:size-11" />
      </div>
    </div>
  );
}

const services = [
  {
    title: "WordPress Errors",
    icon: Bug,
  },
  {
    title: "WooCommerce Issues",
    icon: ShoppingCart,
  },
  {
    title: "Plugin Conflicts",
    icon: Blocks,
  },
  {
    title: "Performance Problems",
    icon: Gauge,
  },
];

export default function Contact() {
  return (
    <section
      aria-labelledby="developer-help-heading"
      className="bg-zinc-50 py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl shadow-zinc-950/5">
          <div className="absolute -top-24 -left-24 size-64 rounded-full bg-orange-100 blur-3xl" />

          <div className="absolute -right-28 -bottom-28 size-72 rounded-full bg-orange-50 blur-3xl" />

          <div className="relative grid items-center gap-14 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:p-16 xl:grid-cols-[minmax(0,1fr)_430px]">
            <div className="max-w-3xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
                <Users className="size-4" />
                Professional Help
              </span>

              <h2
                id="developer-help-heading"
                className="max-w-2xl text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl"
              >
                Need Help Fixing Your WordPress Website?
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600">
                Facing WordPress errors, WooCommerce problems, PHP compatibility
                issues, plugin conflicts, malware warnings, or performance
                problems? DevHub can diagnose and safely fix your website.
              </p>

              <div className="mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                {services.map((service) => {
                  const Icon = service.icon;

                  return (
                    <div
                      key={service.title}
                      className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-800"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-orange-500 text-white">
                        <Icon className="size-4" />
                      </span>

                      {service.title}
                    </div>
                  );
                })}
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="
                    inline-flex min-h-12 items-center justify-center gap-2
                    rounded-xl bg-orange-500 px-6 text-sm font-semibold
                    text-white shadow-lg shadow-orange-500/20
                    transition duration-300
                    hover:-translate-y-0.5 hover:bg-orange-600
                    focus-visible:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-orange-500/25
                    motion-reduce:transform-none
                  "
                >
                  <Zap className="size-4" />
                  Hire DevHub
                </Link>

                <Link
                  href="/contact"
                  className="
                    inline-flex min-h-12 items-center justify-center gap-2
                    rounded-xl border border-zinc-200 bg-white px-6
                    text-sm font-semibold text-zinc-950
                    transition duration-300
                    hover:-translate-y-0.5 hover:border-orange-300
                    hover:bg-orange-50 hover:text-orange-600
                    focus-visible:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-orange-500/20
                    motion-reduce:transform-none
                  "
                >
                  <MessageCircle className="size-4" />
                  Contact Developer
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-zinc-500">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-orange-500" />
                  Safe fixes
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Wrench className="size-4 text-orange-500" />
                  Developer support
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <MonitorCog className="size-4 text-orange-500" />
                  Complete diagnosis
                </span>
              </div>
            </div>

            <DeveloperIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
