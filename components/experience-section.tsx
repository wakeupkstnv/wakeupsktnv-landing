"use client"

import { motion } from "framer-motion"
import { Briefcase, ExternalLink } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

interface Experience {
  id: string
  company: string
  role: string
  period: string
  location: string
  description: string[]
  technologies: string[]
  current?: boolean
}

const EXPERIENCES: Experience[] = [
  {
    id: "bereke",
    company: "BEREKE BANK",
    role: "AI & Backend Engineer",
    period: "DEC 2024 — PRESENT",
    location: "Almaty, Kazakhstan",
    description: [
      "Building LLM infrastructure for banking applications using vLLM",
      "Developing scalable microservices with FastAPI and PostgreSQL",
      "Implementing AI-powered solutions for financial operations",
    ],
    technologies: ["Python", "FastAPI", "vLLM", "PostgreSQL", "Docker", "K8s"],
    current: true,
  },
  {
    id: "koz",
    company: "KOZ DIGITAL AI",
    role: "AI Engineer",
    period: "NOV 2024 — DEC 2024",
    location: "Remote",
    description: [
      "Developed AI solutions for digital transformation projects",
      "Implemented machine learning pipelines and models",
      "Collaborated on computer vision and NLP applications",
    ],
    technologies: ["Python", "TensorFlow", "FastAPI", "Docker"],
  },
  {
    id: "nfactorial",
    company: "NFACTORIAL INCUBATOR",
    role: "Backend Developer",
    period: "JUN 2024 — AUG 2024",
    location: "Almaty, Kazakhstan",
    description: [
      "Selected as one of top 50 finalists from 6,500+ applicants",
      "Built backend systems for startup projects using FastAPI",
      "Worked in agile team environment on real-world applications",
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    id: "kettik",
    company: "KETTIK GROUP",
    role: "Backend Developer",
    period: "MAY 2024 — JUN 2024",
    location: "Almaty, Kazakhstan",
    description: [
      "Developed REST APIs for mobile and web applications",
      "Implemented database schemas and optimized queries",
      "Participated in code reviews and technical discussions",
    ],
    technologies: ["Python", "Django", "PostgreSQL"],
  },
]

function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease }}
      className={`border-2 border-foreground ${experience.current ? "bg-foreground text-background" : "bg-background"}`}
    >
      {/* Card header */}
      <div className={`flex items-center justify-between px-5 py-3 border-b-2 ${experience.current ? "border-background/20" : "border-foreground"}`}>
        <span className="text-[10px] tracking-[0.2em] uppercase font-mono">
          {experience.company}
        </span>
        <div className="flex items-center gap-2">
          {experience.current && (
            <span className="bg-[#ea580c] text-background text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 font-mono">
              CURRENT
            </span>
          )}
          <span className={`text-[10px] tracking-[0.2em] font-mono ${experience.current ? "text-background/50" : "text-muted-foreground"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="px-5 py-4">
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="text-lg font-mono font-bold tracking-tight uppercase">
            {experience.role}
          </h3>
          <div className={`flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-mono ${experience.current ? "text-background/60" : "text-muted-foreground"}`}>
            <span>{experience.period}</span>
            <span>•</span>
            <span>{experience.location}</span>
          </div>
        </div>

        <ul className={`flex flex-col gap-2 mb-4 text-xs font-mono leading-relaxed ${experience.current ? "text-background/80" : "text-muted-foreground"}`}>
          {experience.description.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#ea580c] mt-0.5">{">"}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className={`text-[9px] tracking-[0.15em] uppercase px-2 py-1 font-mono ${
                experience.current 
                  ? "border border-background/30 text-background/80" 
                  : "border border-foreground/30 text-foreground/80"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: WORK_EXPERIENCE"}
        </span>
        <div className="flex-1 border-t border-border" />
        <Briefcase size={12} className="text-[#ea580c]" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">002</span>
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
          Work Experience
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-md">
          Building AI infrastructure and backend systems at scale.
        </p>
      </motion.div>

      {/* Experience grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceCard key={exp.id} experience={exp} index={i} />
        ))}
      </div>
    </section>
  )
}
