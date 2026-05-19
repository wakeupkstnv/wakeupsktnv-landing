const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "Java", "SQL", "MySQL", "PostgreSQL", "SQLite"],
  },
  {
    title: "Frameworks",
    skills: ["FastAPI", "Django Rest Framework", "Sanic", "Litestar"],
  },
  {
    title: "AI / Backend",
    skills: ["Pydantic AI", "LLMs", "vLLM", "LiteLLM", "LangFuse", "WebSockets", "Asyncio", "Pydantic"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "Redis", "PostgreSQL", "MySQL", "SQLite"],
  },
  {
    title: "Developer Tools",
    skills: ["Git", "Docker", "RabbitMQ", "Celery", "SQLAlchemy", "Alembic", "PyTest"],
  },
  {
    title: "DevOps/MLOps",
    skills: ["Vagrant", "Nomad", "GitLab CI", "ArgoCD", "Argo Workflows", "Grafana", "AWS"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-24">
      <h2 className="text-sm font-medium text-muted-foreground mb-12 tracking-wide uppercase">
        Skills
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category) => (
          <div key={category.title} className="space-y-4">
            <h3 className="text-foreground font-medium">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm bg-secondary text-muted-foreground hover:text-primary hover:bg-muted transition-colors rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
