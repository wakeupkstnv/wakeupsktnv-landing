"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin, ArrowRight, Phone } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

function BlinkDot() {
  return <span className="inline-block h-2 w-2 bg-[#ea580c] animate-blink" />
}

export function ContactSection() {
  return (
    <section id="contact" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: CONTACT"}
        </span>
        <div className="flex-1 border-t border-border" />
        <BlinkDot />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">005</span>
      </motion.div>

      {/* Contact content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="border-2 border-foreground"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left: Message */}
          <div className="flex-1 p-8 lg:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground">
            <h2 className="text-3xl lg:text-4xl font-mono font-bold tracking-tight uppercase text-foreground mb-4">
              {"LET'S WORK"}
              <br />
              <span className="text-[#ea580c]">TOGETHER</span>
            </h2>
            <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed mb-8 max-w-md">
              Open to opportunities in AI engineering, backend development, and LLM infrastructure. 
              Always interested in challenging problems and innovative projects.
            </p>

            <motion.a
              href="mailto:kustanayevtamirlan1@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-0 bg-foreground text-background text-xs font-mono tracking-wider uppercase"
            >
              <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
                <ArrowRight size={14} className="text-background" />
              </span>
              <span className="px-5 py-2.5">Send Email</span>
            </motion.a>
          </div>

          {/* Right: Contact details */}
          <div className="flex flex-col w-full lg:w-1/3">
            {/* Email */}
            <motion.a
              href="mailto:kustanayevtamirlan1@gmail.com"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4, ease }}
              className="flex items-center gap-4 px-6 py-5 border-b-2 border-foreground hover:bg-foreground hover:text-background transition-colors duration-200 group"
            >
              <Mail size={16} className="text-[#ea580c] group-hover:text-background" />
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-background/60 font-mono">
                  Email
                </span>
                <span className="text-xs font-mono tracking-wide">
                  kustanayevtamirlan1@gmail.com
                </span>
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+77786001919"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.4, ease }}
              className="flex items-center gap-4 px-6 py-5 border-b-2 border-foreground hover:bg-foreground hover:text-background transition-colors duration-200 group"
            >
              <Phone size={16} className="text-[#ea580c] group-hover:text-background" />
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-background/60 font-mono">
                  Phone
                </span>
                <span className="text-xs font-mono tracking-wide">
                  +7 778 600 1919
                </span>
              </div>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com/tamirlan1919"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4, ease }}
              className="flex items-center gap-4 px-6 py-5 border-b-2 border-foreground hover:bg-foreground hover:text-background transition-colors duration-200 group"
            >
              <Github size={16} className="text-[#ea580c] group-hover:text-background" />
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-background/60 font-mono">
                  GitHub
                </span>
                <span className="text-xs font-mono tracking-wide">
                  @tamirlan1919
                </span>
              </div>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/tamirlan-kustanayev-b3ba6b276/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.4, ease }}
              className="flex items-center gap-4 px-6 py-5 hover:bg-foreground hover:text-background transition-colors duration-200 group"
            >
              <Linkedin size={16} className="text-[#ea580c] group-hover:text-background" />
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-background/60 font-mono">
                  LinkedIn
                </span>
                <span className="text-xs font-mono tracking-wide">
                  Tamirlan Kustanayev
                </span>
              </div>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
