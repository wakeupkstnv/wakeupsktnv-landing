"use client"

import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const ease = [0.22, 1, 0.36, 1] as const

// Animated grid background
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ea580c]/50 to-transparent"
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

// Floating particles
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-[#ea580c]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Node graph background
function NodeGraph() {
  const nodes = [
    { x: 10, y: 20 },
    { x: 25, y: 60 },
    { x: 40, y: 30 },
    { x: 55, y: 70 },
    { x: 70, y: 25 },
    { x: 85, y: 55 },
    { x: 15, y: 80 },
    { x: 90, y: 85 },
  ]

  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [4, 5], [3, 5], [1, 6], [5, 7], [3, 7]
  ]

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
      {/* Connections */}
      {connections.map(([from, to], i) => (
        <motion.line
          key={`line-${i}`}
          x1={`${nodes[from].x}%`}
          y1={`${nodes[from].y}%`}
          x2={`${nodes[to].x}%`}
          y2={`${nodes[to].y}%`}
          stroke="hsl(var(--foreground))"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: i * 0.1 }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g key={`node-${i}`}>
          <motion.circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="4"
            fill="hsl(var(--foreground))"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
          <motion.circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="8"
            fill="none"
            stroke="#ea580c"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
          />
        </motion.g>
      ))}
      {/* Data packets */}
      {connections.slice(0, 5).map(([from, to], i) => (
        <motion.circle
          key={`packet-${i}`}
          r="3"
          fill="#ea580c"
          initial={{ 
            cx: `${nodes[from].x}%`, 
            cy: `${nodes[from].y}%` 
          }}
          animate={{ 
            cx: [`${nodes[from].x}%`, `${nodes[to].x}%`],
            cy: [`${nodes[from].y}%`, `${nodes[to].y}%`]
          }}
          transition={{
            duration: 2,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear"
          }}
        />
      ))}
    </svg>
  )
}

export function PersonalHero() {
  return (
    <section className="relative w-full px-6 pt-6 pb-12 lg:px-12 lg:pt-10 lg:pb-16 min-h-[90vh] flex flex-col justify-center">
      {/* Background effects */}
      <AnimatedGrid />
      <FloatingParticles />
      <NodeGraph />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Top headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
          className="font-mono text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-foreground mb-2 select-none"
        >
          TAMIRLAN
        </motion.h1>

        {/* Terminal-style info block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="w-full max-w-2xl my-6 border-2 border-foreground bg-background/80 backdrop-blur-sm"
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-2 border-b-2 border-foreground bg-foreground/5">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              {"// USER.PROFILE"}
            </span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-[#ea580c] animate-pulse" />
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
          className="font-mono text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-foreground mb-4 select-none"
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
          className="flex flex-wrap items-center justify-center gap-4"
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
