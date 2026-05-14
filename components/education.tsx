import { GraduationCap } from "lucide-react"

export function Education() {
  return (
    <section id="about" className="py-24">
      <h2 className="text-sm font-medium text-muted-foreground mb-12 tracking-wide uppercase">
        Education
      </h2>

      <div className="group flex gap-4 p-4 -mx-4 rounded-lg hover:bg-secondary/50 transition-colors">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
            <GraduationCap className="h-5 w-5" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="font-medium text-foreground">
            Bachelor of Information Systems
          </h3>
          <p className="text-sm text-muted-foreground">
            Kazakh-British Technical University
          </p>
          <p className="text-xs text-muted-foreground">
            Almaty, Kazakhstan · 2023 — 2027
          </p>
        </div>
      </div>
    </section>
  )
}
