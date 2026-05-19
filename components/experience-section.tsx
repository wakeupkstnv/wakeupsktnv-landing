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
    role: "Middle Backend/AI Engineer",
    period: "AUG 2025 — DEC 2025",
    location: "Almaty, Kazakhstan",
    description: [
      "Integrated vLLM with LiteLLM to provide a scalable and cost-efficient LLM serving layer with API-key-based access control",
      "Implemented observability and eval pipelines in LangFuse for LLM performance monitoring, trace analysis, and quality evaluation",
      "Optimized LLM inference throughput by configuring GPU utilization and batching strategies in vLLM",
    ],
    technologies: ["Python", "vLLM", "LiteLLM", "LangFuse", "LLMs", "GPU"],
  },
  {
    id: "koz",
    company: "KOZ DIGITAL AI",
    role: "Backend/AI Engineer",
    period: "FEB 2025 — AUG 2025",
    location: "Almaty, Kazakhstan",
    description: [
      "Developed AI-based voice call services for automated customer interaction",
      "Built AI agent orchestration using Pydantic AI to dynamically manage behavior",
      "Implemented clean architecture across microservices to improve scalability and maintainability",
      "Configured CI/CD pipelines, Docker, and Digital Ocean deployments",
    ],
    technologies: ["Python", "FastAPI", "Pydantic AI", "Docker", "CI/CD", "Digital Ocean"],
  },
  {
    id: "nfactorial",
    company: "NFACTORIAL INCUBATOR",
    role: "Mentor (Backend)",
    period: "JUN 2024 — AUG 2024",
    location: "Almaty, Kazakhstan",
    description: [
      "Mentored students in backend development using FastAPI and Docker",
      "Guided projects from idea to deployment with cloud and CI/CD support",
    ],
    technologies: ["FastAPI", "Docker", "Mentoring", "Cloud", "CI/CD"],
  },
  {
    id: "kettik",
    company: "KETTIK GROUP",
    role: "Software Engineer Intern",
    period: "AUG 2024 — FEB 2025",
    location: "Almaty, Kazakhstan",
    description: [
      "Set up and optimized a high-load project capable of handling 100k concurrent users",
      "Parsed data of 2000 venues from Almaty and Astana",
      "Developed a backend service integrated into platforms like Sxodim and Seruen.ai",
      "Built an interactive map with advanced filtering capabilities",
    ],
    technologies: ["Python", "PostgreSQL", "High-load", "Data Parsing"],
  },
]

function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease }}
      className={`pixel-panel border-2 border-foreground ${experience.current ? "bg-foreground text-background" : "bg-background/90"}`}
    >
      {/* Card header */}
      <div className={`flex items-center justify-between px-5 py-3 border-b-2 ${experience.current ? "border-background/20" : "border-foreground"}`}>
        <span className="text-[10px] tracking-[0.2em] uppercase font-mono">
          {experience.company}
        </span>
        <div className="flex items-center gap-2">
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
              <span className="text-[#8fb8c7] mt-0.5">{">"}</span>
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
                  : "pixel-chip border border-foreground/30 text-foreground/80"
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
        <Briefcase size={12} className="text-[#8fb8c7]" />
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
