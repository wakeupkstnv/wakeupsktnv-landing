"use client"

import { motion } from "framer-motion"
import { Code2 } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

interface SkillCategory {
  name: string
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "LANGUAGES",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "Go"],
  },
  {
    name: "FRAMEWORKS",
    skills: ["FastAPI", "Django", "Flask", "Next.js", "React"],
  },
  {
    name: "AI / ML",
    skills: ["vLLM", "LangChain", "HuggingFace", "TensorFlow", "PyTorch", "OpenAI API"],
  },
  {
    name: "DATABASES",
    skills: ["PostgreSQL", "MongoDB", "Redis", "ChromaDB", "Pinecone"],
  },
  {
    name: "DEVOPS / MLOPS",
    skills: ["Docker", "Kubernetes", "Git", "CI/CD", "AWS", "GCP"],
  },
  {
    name: "TOOLS",
    skills: ["Linux", "Nginx", "Celery", "RabbitMQ", "Prometheus"],
  },
]

function SkillBlock({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease }}
      className="border-2 border-foreground"
    >
      {/* Category header */}
      <div className="flex items-center justify-between px-4 py-2 border-b-2 border-foreground bg-foreground/5">
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {category.name}
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {String(category.skills.length).padStart(2, "0")}
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 p-4">
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 + i * 0.03, duration: 0.3, ease }}
            className="text-xs tracking-[0.1em] uppercase px-3 py-1.5 font-mono bg-foreground text-background hover:bg-[#ea580c] transition-colors duration-200 cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: TECH_STACK"}
        </span>
        <div className="flex-1 border-t border-border" />
        <Code2 size={12} className="text-[#ea580c]" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">003</span>
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
          Technical Skills
        </h2>
        <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-md">
          Technologies and tools I work with daily.
        </p>
      </motion.div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {SKILL_CATEGORIES.map((category, i) => (
          <SkillBlock key={category.name} category={category} index={i} />
        ))}
      </div>
    </section>
  )
}
