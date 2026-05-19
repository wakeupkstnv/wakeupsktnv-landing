import { ExternalLink } from "lucide-react"
import Link from "next/link"

const experiences = [
  {
    period: "Aug 2025 — Dec 2025",
    title: "Middle Backend/AI Engineer",
    company: "Bereke Bank",
    url: "#",
    description: [
      "Integrated vLLM with LiteLLM to provide a scalable and cost-efficient LLM serving layer with API-key-based access control.",
      "Implemented observability and eval pipelines in LangFuse for LLM performance monitoring, trace analysis, and quality evaluation.",
      "Optimized LLM inference throughput by configuring GPU utilization and batching strategies in vLLM.",
    ],
    technologies: ["Python", "vLLM", "LiteLLM", "LangFuse", "LLMs", "GPU"],
  },
  {
    period: "Feb 2025 — Aug 2025",
    title: "Backend/AI Engineer",
    company: "KOZ Digital AI",
    url: "https://koz.ai",
    description: [
      "Developed AI-based voice call services, enabling automated customer interaction.",
      "Built AI agent orchestration using Pydantic AI to dynamically manage behavior.",
      "Implemented clean architecture principles across multiple microservices to improve scalability and maintainability.",
      "Introduced and integrated new technologies into production pipelines to boost performance and reliability.",
      "Led internal technical talks and knowledge-sharing sessions to upskill the engineering team.",
      "Configured CI/CD pipelines, Docker, and deployed applications on Digital Ocean.",
    ],
    technologies: ["Python", "Pydantic AI", "FastAPI", "Docker", "CI/CD", "Digital Ocean"],
  },
  {
    period: "Jun 2025 — Aug 2025",
    title: "Mentor (Backend)",
    company: "Nfactorial Incubator",
    url: "https://nfactorial.school",
    description: [
      "Mentored students in backend development using FastAPI and Docker.",
      "Guided projects from idea to deployment with cloud and CI/CD support.",
    ],
    technologies: ["FastAPI", "Docker", "Mentoring", "Cloud"],
  },
  {
    period: "Aug 2024 — Feb 2025",
    title: "Software Engineer Intern",
    company: "Kettik Group",
    url: "#",
    description: [
      "Set up and optimized a high-load project capable of handling 100k concurrent users.",
      "Parsed data of 2000 venues from Almaty and Astana.",
      "Developed a backend service integrated into platforms like Sxodim and Seruen.ai.",
      "Built an interactive map with advanced filtering capabilities.",
    ],
    technologies: ["Python", "PostgreSQL", "High-load", "Data Parsing"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <h2 className="text-sm font-medium text-muted-foreground mb-12 tracking-wide uppercase">
        Experience
      </h2>

      <div className="space-y-16">
        {experiences.map((exp, index) => (
          <div key={index} className="group grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-8">
            <div className="text-sm text-muted-foreground">
              {exp.period}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors inline-flex items-center gap-2">
                  {exp.title} · {exp.company}
                  {exp.url !== "#" && (
                    <Link
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </h3>
              </div>

              <ul className="space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-muted-foreground text-sm leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-secondary text-primary rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
