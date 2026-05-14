"use client"

import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function PersonalHero() {
  return (
    <section className="relative w-full px-6 pt-6 pb-12 lg:px-12 lg:pt-10 lg:pb-16">
      <div className="flex flex-col items-center text-center">
        {/* Top headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
          className="font-pixel text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-foreground mb-2 select-none"
        >
          TAMIRLAN
        </motion.h1>

        {/* Terminal-style info block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="w-full max-w-2xl my-6 border-2 border-foreground bg-background"
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-2 border-b-2 border-foreground bg-foreground/5">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              {"// USER.PROFILE"}
            </span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#ea580c]" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#ea580c] font-mono">
                ONLINE
              </span>
            </div>
          </div>

          {/* Terminal content */}
          <div className="px-4 py-4 font-mono text-xs lg:text-sm text-left">
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground">{">"}</span>
                <span className="text-muted-foreground">role:</span>
                <span className="text-foreground">AI & Backend Engineer</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground">{">"}</span>
                <span className="text-muted-foreground">current:</span>
                <span className="text-foreground">Bereke Bank (LLM Infrastructure)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground">{">"}</span>
                <span className="text-muted-foreground">stack:</span>
                <span className="text-[#ea580c]">Python, FastAPI, vLLM, Docker, K8s</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground">{">"}</span>
                <span className="text-muted-foreground">education:</span>
                <span className="text-foreground">KBTU, Computer Science</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="font-pixel text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-foreground mb-4 select-none"
          aria-hidden="true"
        >
          KUSTANAYEV
        </motion.h1>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="flex items-center gap-2 mb-6"
        >
          <MapPin size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
            Almaty, Kazakhstan
          </span>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          className="flex items-center gap-4"
        >
          <motion.a
            href="https://github.com/tamirlan1919"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 border-2 border-foreground bg-background hover:bg-foreground hover:text-background transition-colors duration-200"
          >
            <Github size={14} />
            <span className="text-xs font-mono tracking-widest uppercase">GitHub</span>
          </motion.a>
          
          <motion.a
            href="https://www.linkedin.com/in/tamirlan-kustanayev-b3ba6b276/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 border-2 border-foreground bg-background hover:bg-foreground hover:text-background transition-colors duration-200"
          >
            <Linkedin size={14} />
            <span className="text-xs font-mono tracking-widest uppercase">LinkedIn</span>
          </motion.a>
          
          <motion.a
            href="mailto:kustanayevtamirlan1@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-0 bg-foreground text-background text-xs font-mono tracking-wider uppercase"
          >
            <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
              <Mail size={14} className="text-background" />
            </span>
            <span className="px-4 py-2.5">Contact</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
