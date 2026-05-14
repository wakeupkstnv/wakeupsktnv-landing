"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

export function PersonalFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease }}
      className="w-full border-t-2 border-foreground px-6 py-8 lg:px-12"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono tracking-[0.15em] uppercase font-bold text-foreground">
            TAMIRLAN.DEV
          </span>
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
            {"// AI & BACKEND ENGINEER — ALMATY, KZ"}
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <motion.a
            href="https://github.com/tamirlan1919"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4, ease }}
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Github size={12} />
            <span>GitHub</span>
          </motion.a>
          
          <motion.a
            href="https://www.linkedin.com/in/tamirlan-kustanayev-b3ba6b276/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.4, ease }}
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Linkedin size={12} />
            <span>LinkedIn</span>
          </motion.a>
          
          <motion.a
            href="mailto:kustanayevtamirlan1@gmail.com"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22, duration: 0.4, ease }}
            className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Mail size={12} />
            <span>Email</span>
          </motion.a>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
          {"(C) 2024 — BUILT WITH NEXT.JS"}
        </span>
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
          {"v1.0.0"}
        </span>
      </div>
    </motion.footer>
  )
}
