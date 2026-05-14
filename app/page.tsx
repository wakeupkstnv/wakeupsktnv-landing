import { PersonalNavbar } from "@/components/personal-navbar"
import { PersonalHero } from "@/components/personal-hero"
import { TechMarquee } from "@/components/tech-marquee"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { AwardsSection } from "@/components/awards-section"
import { ContactSection } from "@/components/contact-section"
import { PersonalFooter } from "@/components/personal-footer"
import { TopologyGraph } from "@/components/topology-graph"
import { DitherCard } from "@/components/bento/dither-card"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <PersonalNavbar />
      <PersonalHero />
      <TechMarquee />
      
      {/* Visual showcase section */}
      <section className="w-full px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border-2 border-foreground">
            <div className="flex items-center justify-between px-4 py-2 border-b-2 border-foreground bg-foreground/5">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                {"// SYSTEM: NEURAL_TOPOLOGY"}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#ea580c] font-mono">ACTIVE</span>
            </div>
            <TopologyGraph />
          </div>
          <div className="border-2 border-foreground">
            <DitherCard />
          </div>
        </div>
      </section>
      
      <ExperienceSection />
      <SkillsSection />
      <AwardsSection />
      <ContactSection />
      <PersonalFooter />
    </main>
  )
}
