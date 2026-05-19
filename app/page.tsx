import { PersonalNavbar } from "@/components/personal-navbar"
import { PersonalHero } from "@/components/personal-hero"
import { TechMarquee } from "@/components/tech-marquee"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { AwardsSection } from "@/components/awards-section"
import { HiddenGameSection } from "@/components/hidden-game-section"
import { ContactSection } from "@/components/contact-section"
import { PersonalFooter } from "@/components/personal-footer"

export default function Home() {
  return (
    <main className="pixel-page-shell min-h-screen bg-background overflow-x-hidden">
      <PersonalNavbar />
      <PersonalHero />
      <TechMarquee />
      <ExperienceSection />
      <SkillsSection />
      <AwardsSection />
      <HiddenGameSection />
      <ContactSection />
      <PersonalFooter />
    </main>
  )
}
