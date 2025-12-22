import Link from "next/link"
import { Clock, DollarSign } from "lucide-react"

export function JobListingsRedesign() {
  const jobs = [
    {
      id: 1,
      title: "Smart Contract Developer",
      company: "DeFi Protocol X",
      type: "Full-time",
      salary: "120–150K USDC",
      description:
        "Build and audit smart contracts powering next-generation DeFi infrastructure.",
    },
    {
      id: 2,
      title: "Frontend Web3 Engineer",
      company: "NFT Marketplace Y",
      type: "Contract",
      salary: "80–100K USDC",
      description:
        "Design and ship high-performance Web3 interfaces with modern React tooling.",
    },
    {
      id: 3,
      title: "Blockchain Security Researcher",
      company: "Security DAO",
      type: "Full-time",
      salary: "130–160K USDC",
      description:
        "Research and strengthen protocol security across a multi-chain ecosystem.",
    },
  ]

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#FF1CF7]/20 to-[#0900FF]/20 blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="mb-16 text-center text-4xl font-bold font-inter">
          <span className="bg-gradient-to-r from-[#FF1CF7] to-[#0900FF] bg-clip-text text-transparent">
            Trending Opportunities
          </span>
        </h2>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group relative rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              {/* Glow */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-[#FF1CF7]/30 to-[#0900FF]/30 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-25" />

              {/* Top Row */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    {job.company}
                  </p>
                </div>

                <Link
                  href={`/jobs/${job.id}`}
                  className="inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF1CF7] to-[#0900FF] px-5 py-2 text-sm font-medium text-white transition-all hover:shadow-lg"
                >
                  View Role →
                </Link>
              </div>

              {/* Metadata */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-zinc-300">
                <Meta icon={<Clock className="h-4 w-4" />}>
                  {job.type}
                </Meta>
                <Meta icon={<DollarSign className="h-4 w-4" />}>
                  {job.salary}
                </Meta>
              </div>

              {/* Description */}
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400">
                {job.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/jobs"
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
          >
            Explore All Opportunities →
          </Link>
        </div>
      </div>
    </section>
  )
}

function Meta({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 backdrop-blur">
      {icon}
      <span>{children}</span>
    </div>
  )
}
