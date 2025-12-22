import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-32">
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-indigo-500/20 blur-[140px]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-zinc-300 backdrop-blur">
          ⚡ Built on Starknet · Trustless · On-chain
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-inter">
          The Right Talent.
          <br />
          <span className="bg-gradient-to-r from-kairox-purple to-kairox-blue bg-clip-text text-transparent">
            The Right Moment.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-zinc-400 leading-relaxed">
          Kairox is a decentralized talent exchange where skills are verifiable,
          reputation is on-chain, and opportunities meet proof — powered by
          Starknet and AI.
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#FF1CF7] to-[#0900FF] px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:shadow-xl">
            Explore Opportunities
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Button>

          <div className="rounded-xl bg-gradient-to-b from-[#FF1CF7] to-[#0900FF] p-[1px]">
            <Button
              variant="default"
              className="rounded-xl bg-black px-8 py-3 text-base font-medium text-white hover:bg-zinc-900"
            >
              Hire Talent
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>

        {/* Social proof / metrics */}
        <div className="mt-16 flex flex-wrap justify-center gap-10 text-sm text-zinc-400">
          <div>
            <span className="block text-2xl font-semibold text-white">
              On-Chain
            </span>
            Reputation
          </div>
          <div>
            <span className="block text-2xl font-semibold text-white">
              AI-Driven
            </span>
            Matching
          </div>
          <div>
            <span className="block text-2xl font-semibold text-white">
              Global
            </span>
            Payments
          </div>
        </div>
      </div>

      {/* Center visual */}
      <div className="relative mt-24 flex justify-center">
        {/* Glow behind visual */}
        <div className="absolute inset-0 flex justify-center">
          <div className="h-[420px] w-[420px] rounded-full bg-gradient-to-r from-fuchsia-500/30 to-indigo-500/30 blur-[160px]" />
        </div>

        <Image
          src="/glass.png"
          alt="Kairox visual"
          width={560}
          height={560}
          className="relative z-10 object-contain"
          priority
        />
      </div>
    </section>
  )
}
