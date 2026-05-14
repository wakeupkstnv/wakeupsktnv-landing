import { Award, Trophy } from "lucide-react"

const awards = [
  {
    title: "Nfactorial Incubator Finalist",
    organization: "Nfactorial School",
    period: "Jun 2024 — Aug 2024",
    description: "Awarded for exceptional performance and innovative contributions to AI-driven educational projects.",
    icon: Award,
  },
  {
    title: "Yandex Archive Hackathon",
    organization: "Yandex",
    period: "Oct 2024",
    description: "Won 2nd place for the project \"Archive-Hack\" at Yandex's open competition.",
    icon: Trophy,
  },
]

export function Awards() {
  return (
    <section className="py-24">
      <h2 className="text-sm font-medium text-muted-foreground mb-12 tracking-wide uppercase">
        Awards & Recognition
      </h2>

      <div className="space-y-8">
        {awards.map((award, index) => (
          <div
            key={index}
            className="group flex gap-4 p-4 -mx-4 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                <award.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <h3 className="font-medium text-foreground">{award.title}</h3>
                <span className="text-xs text-muted-foreground">{award.period}</span>
              </div>
              <p className="text-sm text-muted-foreground">{award.organization}</p>
              <p className="text-sm text-muted-foreground pt-1">{award.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
