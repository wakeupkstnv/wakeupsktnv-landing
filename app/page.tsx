import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Education } from "@/components/education"
import { Awards } from "@/components/awards"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 pt-24">
        <Hero />
        <Education />
        <Experience />
        <Skills />
        <Awards />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}
