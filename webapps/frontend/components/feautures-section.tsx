import Image from "next/image"
import type React from "react"

export function FeaturesSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-indigo-500/20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-center text-4xl font-inter font-bold mb-20">
          <span className="bg-gradient-to-r from-[#FF1CF7] to-[#0900FF] bg-clip-text text-transparent">
            Why Choose Kairox?
          </span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon="/overlay.png"
            title="Trustless Workflows"
            description="Smart contracts automate agreements, escrow, and payouts with full transparency."
            accent="from-fuchsia-500 to-purple-500"
          />

          <FeatureCard
            icon="/overlay1.png"
            title="AI Opportunity Intelligence"
            description="Advanced AI aligns skills, reputation, and intent to surface the right opportunities."
            accent="from-orange-500 to-amber-500"
          />

          <FeatureCard
            icon="/overlay2.png"
            title="On-Chain Reputation"
            description="Portable, verifiable reputation built from real work — not self-reported resumes."
            accent="from-sky-500 to-blue-500"
          />

          <FeatureCard
            icon="/overlay3.png"
            title="Self-Sovereign Identity"
            description="Wallet-based authentication with full ownership of your professional identity."
            accent="from-emerald-500 to-teal-500"
          />

          <FeatureCard
            icon="/overlay4.png"
            title="Global Payments"
            description="Instant, low-fee crypto payments without borders or intermediaries."
            accent="from-indigo-500 to-violet-500"
          />

          <FeatureCard
            icon="/overlay5.png"
            title="Built on Starknet"
            description="High-performance, low-cost, and future-proof infrastructure secured by Starknet."
            accent="from-pink-500 to-rose-500"
          />
        </div>
      </div>

      {/* Bottom vector */}
      <div className="mt-24 flex justify-center">
        <Image
          src="/vector.png"
          alt="Decorative vector"
          width={336}
          height={100}
          className="opacity-70"
        />
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  accent: string
}

function FeatureCard({
  icon,
  title,
  description,
  accent,
}: FeatureCardProps) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-white/20">
      {/* Glow border */}
      <div
        className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r ${accent} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30`}
      />

      {/* Icon */}
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
        <Image src={icon} alt={title} width={28} height={28} />
      </div>

      {/* Content */}
      <h3 className="mb-3 text-xl font-semibold tracking-tight">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
    </div>
  )
}
