"use client"

import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

const ease = [0.22, 1, 0.36, 1] as const

// Animated Dither Background with moving metaballs
function AnimatedDitherBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const w = 320
    const h = 240
    canvas.width = w
    canvas.height = h

    const isDark = resolvedTheme === "dark"
    const darkVal = isDark ? 230 : 10
    const lightVal = isDark ? 15 : 230

    // Metaball positions (will animate)
    const metaballs = [
      { x: w * 0.3, y: h * 0.3, r: 60, vx: 0.3, vy: 0.2 },
      { x: w * 0.7, y: h * 0.3, r: 50, vx: -0.25, vy: 0.3 },
      { x: w * 0.5, y: h * 0.7, r: 70, vx: 0.2, vy: -0.25 },
      { x: w * 0.2, y: h * 0.6, r: 40, vx: 0.35, vy: -0.15 },
      { x: w * 0.8, y: h * 0.7, r: 45, vx: -0.3, vy: 0.2 },
    ]

    const imageData = ctx.createImageData(w, h)
    const data = imageData.data

    // Bayer dither matrix 4x4
    const bayerMatrix = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ]

    function animate() {
      timeRef.current += 0.016

      // Update metaball positions
      for (const ball of metaballs) {
        ball.x += ball.vx
        ball.y += ball.vy

        // Bounce off edges
        if (ball.x < ball.r || ball.x > w - ball.r) ball.vx *= -1
        if (ball.y < ball.r || ball.y > h - ball.r) ball.vy *= -1

        // Keep in bounds
        ball.x = Math.max(ball.r, Math.min(w - ball.r, ball.x))
        ball.y = Math.max(ball.r, Math.min(h - ball.r, ball.y))
      }

      // Render dithered metaballs
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4

          // Calculate metaball influence
          let sum = 0
          for (const ball of metaballs) {
            const dx = x - ball.x
            const dy = y - ball.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            sum += (ball.r * ball.r) / (dist * dist + 1)
          }

          // Normalize and apply threshold
          const value = Math.min(sum / 1.5, 1)

          // Apply Bayer dithering
          const bayerValue = bayerMatrix[y % 4][x % 4] / 16
          const dithered = value > bayerValue ? darkVal : lightVal

          data[idx] = dithered
          data[idx + 1] = dithered
          data[idx + 2] = dithered
          data[idx + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [resolvedTheme])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-30"
        style={{ imageRendering: "pixelated" }}
        aria-hidden="true"
      />
    </div>
  )
}

// Animated grid overlay
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeOpacity="0.05" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ea580c]/30 to-transparent"
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export function PersonalHero() {
  return (
    <section className="relative w-full px-6 pt-6 pb-12 lg:px-12 lg:pt-10 lg:pb-16 min-h-[90vh] flex flex-col justify-center">
      {/* Animated dither background */}
      <AnimatedDitherBackground />
      
      {/* Grid overlay */}
      <AnimatedGrid />

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
          className="w-full max-w-2xl my-6 border-2 border-foreground bg-background/90 backdrop-blur-sm"
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
