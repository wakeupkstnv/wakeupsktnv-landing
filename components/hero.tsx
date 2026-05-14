"use client"

import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm tracking-wide">
            AI & Backend Engineer
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Tamirlan Kustanayev
          </h1>
        </div>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          I build scalable AI infrastructure and backend systems. Currently working on{" "}
          <span className="text-primary font-medium">LLM serving layers</span> and{" "}
          <span className="text-primary font-medium">observability pipelines</span> at Bereke Bank.
        </p>

        <p className="text-muted-foreground leading-relaxed max-w-2xl">
          Previously, I developed AI-based voice call services and agent orchestration systems at KOZ Digital AI. 
          I specialize in Python, FastAPI, vLLM, and building high-load applications that scale.
        </p>

        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">Almaty, Kazakhstan</span>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Link
            href="https://github.com/wakeupkstnv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/wakeupkstnv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="mailto:tkustanayev@kbtu.kz"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
