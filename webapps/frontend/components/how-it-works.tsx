import Image from "next/image"

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-28 bg-black">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/3 h-[420px] w-[420px] rounded-full bg-gradient-to-r from-kairox-purple/20 to-kairox-blue/20 blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Left: Timeline */}
          <div>
            <h2 className="text-4xl font-bold mb-4 font-inter">
              <span className="bg-gradient-to-r from-kairox-purple to-kairox-blue bg-clip-text text-transparent">
                How Kairox Works
              </span>
            </h2>
            <p className="mb-14 max-w-md text-zinc-400 text-lg">
              A trust-minimized workflow designed for modern, on-chain work.
            </p>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 h-full w-[2px] bg-gradient-to-b from-kairox-purple/40 via-kairox-blue/40 to-transparent" />

              <Step
                step="01"
                title="Create Your Identity"
                description="Connect your wallet and establish a self-sovereign professional profile backed by on-chain data."
                accent="from-fuchsia-500 to-purple-500"
              />

              <Step
                step="02"
                title="Discover or Publish Opportunities"
                description="Explore AI-matched roles or publish opportunities through smart contract–powered workflows."
                accent="from-sky-500 to-blue-500"
              />

              <Step
                step="03"
                title="Execute & Get Paid"
                description="Work with confidence using escrowed agreements and receive secure, instant crypto payments."
                accent="from-emerald-500 to-teal-500"
              />
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative flex justify-center">
            {/* Glow behind visual */}
            <div className="absolute inset-0 flex justify-center">
              <div className="h-[380px] w-[380px] rounded-full bg-gradient-to-r from-kairox-purple/30 to-kairox-blue/30 blur-[150px]" />
            </div>

            <Image
              src="/blob.png"
              alt="Kairox workflow visual"
              width={520}
              height={520}
              className="relative z-10 w-full max-w-[520px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

interface StepProps {
  step: string
  title: string
  description: string
  accent: string
}

function Step({ step, title, description, accent }: StepProps) {
  return (
    <div className="group relative mb-12 pl-16">
      {/* Step dot */}
      <div className="absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-white/10">
        <div
          className={`h-3 w-3 rounded-full bg-gradient-to-r ${accent}`}
        />
      </div>

      {/* Card */}
      <div className="relative rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
        {/* Glow */}
        <div
          className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r ${accent} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-25`}
        />

        <span className="absolute right-5 top-4 text-7xl font-bold text-zinc-800 select-none">
          {step}
        </span>

        <h3 className="mb-2 text-xl font-semibold text-white">
          {title}
        </h3>
        <p className="relative z-10 text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  )
}
