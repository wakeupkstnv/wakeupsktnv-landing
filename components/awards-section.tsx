"use client"

import { motion } from "framer-motion"
import { Trophy, Award } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

interface AwardItem {
  id: string
  title: string
  organization: string
  year: string
  description: string
  highlight?: boolean
}

const AWARDS: AwardItem[] = [
  {
    id: "nfactorial",
    title: "TOP 50 FINALIST",
    organization: "nFactorial Incubator 2024",
    year: "2024",
    description: "Selected from 6,500+ applicants across Central Asia. Intensive 8-week startup program focused on building real products.",
    highlight: true,
  },
  {
    id: "yandex",
    title: "2ND PLACE",
    organization: "Yandex Cup Kazakhstan Hackathon",
    year: "2024",
    description: "Developed AI-powered solution for real-world business challenges. Competed against top developers from the region.",
    highlight: true,
  },
]

function AwardCard({ award, index }: { award: AwardItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.15, duration: 0.6, ease }}
      className={`flex flex-col border-2 border-foreground ${
        award.highlight ? "bg-foreground text-background" : "bg-background"
      }`}
    >
      {/* Card header */}
      <div className={`flex items-center justify-between px-5 py-3 border-b-2 ${
        award.highlight ? "border-background/20" : "border-foreground"
      }`}>
        <div className="flex items-center gap-2">
          <Trophy size={14} className="text-[#ea580c]" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-mono">
            {award.year}
          </span>
        </div>
        <span className={`text-[10px] tracking-[0.2em] font-mono ${
          award.highlight ? "text-background/50" : "text-muted-foreground"
        }`}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Card content */}
      <div className="flex-1 px-5 py-5">
        <h3 className="text-xl lg:text-2xl font-mono font-bold tracking-tight uppercase mb-2">
          {award.title}
        </h3>
        <p className={`text-xs tracking-[0.15em] uppercase font-mono mb-4 ${
          award.highlight ? "text-[#ea580c]" : "text-[#ea580c]"
        }`}>
          {award.organization}
        </p>
        <p className={`text-xs font-mono leading-relaxed ${
          award.highlight ? "text-background/70" : "text-muted-foreground"
        }`}>
          {award.description}
        </p>
      </div>
    </motion.div>
  )
}

export function AwardsSection() {
  return (
    <section id="awards" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: ACHIEVEMENTS"}
        </span>
        <div className="flex-1 border-t border-border" />
        <Award size={12} className="text-[#ea580c]" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">004</span>
      </motion.div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col gap-3 mb-12"
      >
        <h2 className="text-2xl lg:text-3xl font-mono font-bold tracking-tight uppercase text-foreground">
          Awards & Recognition
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-md">
          Competitions and achievements worth noting.
        </p>
      </motion.div>

      {/* Awards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {AWARDS.map((award, i) => (
          <AwardCard key={award.id} award={award} index={i} />
        ))}
      </div>
    </section>
  )
}
