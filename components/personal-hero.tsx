"use client"

import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

const ease = [0.22, 1, 0.36, 1] as const

const PIXELS = [
  { x: "11%", y: "22%", size: 3, delay: 0.1 },
  { x: "22%", y: "70%", size: 2, delay: 0.7 },
  { x: "42%", y: "16%", size: 3, delay: 1.1 },
  { x: "68%", y: "78%", size: 2, delay: 0.9 },
  { x: "86%", y: "34%", size: 3, delay: 0.5 },
]

type TerminalLine = {
  kind: "command" | "output"
  text: string
}

const TERMINAL_SEQUENCE = [
  {
    command: "whoami",
    output: [
      "Tamirlan Kustanayev",
      "Backend/AI Engineer · Almaty, Kazakhstan",
    ],
  },
  {
    command: "history --work --public",
    output: [
      "Bereke Bank · Middle Backend/AI Engineer · Aug 2025 — Dec 2025",
      "KOZ Digital AI · Backend/AI Engineer · Feb 2025 — Aug 2025",
      "nFactorial Incubator · Mentor (Backend) · Jun 2025 — Aug 2025",
      "Kettik Group · Software Engineer Intern · Aug 2024 — Feb 2025",
    ],
  },
  {
    command: "cat skills.json",
    output: [
      "{ languages: [Python, Java, SQL], frameworks: [FastAPI, DRF, Sanic, Litestar] }",
      "{ tools: [Docker, RabbitMQ, Celery, SQLAlchemy, Pydantic AI, vLLM, LiteLLM] }",
      "{ devops: [AWS, Vagrant, Nomad, GitLab CI, ArgoCD, Argo Workflows] }",
    ],
  },
  {
    command: "open /playground --hidden",
    output: ["playground locked // scroll to unlock"],
  },
]

// Animated dither background with moving pixel metaballs.
function AnimatedDitherBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const animationRef = useRef<number | null>(null)
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
    const bright = isDark ? 222 : 14
    const dim = isDark ? 14 : 232

    const metaballs = [
      { x: w * 0.3, y: h * 0.3, r: 60, vx: 0.3, vy: 0.2 },
      { x: w * 0.7, y: h * 0.3, r: 50, vx: -0.25, vy: 0.3 },
      { x: w * 0.5, y: h * 0.7, r: 70, vx: 0.2, vy: -0.25 },
      { x: w * 0.2, y: h * 0.6, r: 40, vx: 0.35, vy: -0.15 },
      { x: w * 0.8, y: h * 0.7, r: 45, vx: -0.3, vy: 0.2 },
    ]

    const imageData = ctx.createImageData(w, h)
    const data = imageData.data
    const bayerMatrix = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ]

    function animate() {
      timeRef.current += 0.016

      for (const ball of metaballs) {
        ball.x += ball.vx
        ball.y += ball.vy

        if (ball.x < ball.r || ball.x > w - ball.r) ball.vx *= -1
        if (ball.y < ball.r || ball.y > h - ball.r) ball.vy *= -1

        ball.x = Math.max(ball.r, Math.min(w - ball.r, ball.x))
        ball.y = Math.max(ball.r, Math.min(h - ball.r, ball.y))
      }

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4
          let sum = 0

          for (const ball of metaballs) {
            const dx = x - ball.x
            const dy = y - ball.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            sum += (ball.r * ball.r) / (dist * dist + 1)
          }

          const value = Math.min(sum / 1.5, 1)
          const bayerValue = bayerMatrix[y % 4][x % 4] / 16
          const dithered = value > bayerValue ? bright : dim

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
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [resolvedTheme])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="h-full w-full object-cover opacity-25"
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
          <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" strokeOpacity="0.035" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

function PixelParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {PIXELS.map((pixel, index) => (
        <motion.span
          key={`${pixel.x}-${pixel.y}`}
          className="absolute bg-foreground/20"
          style={{
            left: pixel.x,
            top: pixel.y,
            width: pixel.size,
            height: pixel.size,
            boxShadow: `${pixel.size * 2}px ${pixel.size}px 0 rgba(143, 184, 199, 0.18)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.12, 0.42, 0.18], scale: [1, 1.1, 1] }}
          transition={{ delay: pixel.delay, duration: 4 + index * 0.2, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  )
}

function useTypedTerminal() {
  const [commandIndex, setCommandIndex] = useState(0)
  const [typedCommand, setTypedCommand] = useState("")
  const [lines, setLines] = useState<TerminalLine[]>([])

  useEffect(() => {
    if (commandIndex >= TERMINAL_SEQUENCE.length) return

    const activeCommand = TERMINAL_SEQUENCE[commandIndex]

    if (typedCommand.length < activeCommand.command.length) {
      const timer = window.setTimeout(() => {
        setTypedCommand(activeCommand.command.slice(0, typedCommand.length + 1))
      }, 34)

      return () => window.clearTimeout(timer)
    }

    const timer = window.setTimeout(() => {
      setLines((current) => [
        ...current,
        { kind: "command" as const, text: activeCommand.command },
        ...activeCommand.output.map((text) => ({ kind: "output" as const, text })),
      ])
      setTypedCommand("")
      setCommandIndex((index) => index + 1)
    }, 360)

    return () => window.clearTimeout(timer)
  }, [commandIndex, typedCommand])

  return {
    done: commandIndex >= TERMINAL_SEQUENCE.length,
    lines,
    typedCommand,
  }
}

function MacTerminalWindow() {
  const { done, lines, typedCommand } = useTypedTerminal()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollArea = scrollRef.current
    if (!scrollArea) return

    scrollArea.scrollTop = scrollArea.scrollHeight
  }, [lines, typedCommand])

  return (
    <div
      className="relative mx-auto my-4 w-full max-w-4xl overflow-hidden border-2 border-foreground bg-background/95 text-left shadow-[5px_5px_0_rgba(255,255,255,0.16),0_18px_60px_rgba(0,0,0,0.4)] backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-3 border-b-2 border-foreground bg-foreground/5 px-4 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#b86b6b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#c9b26b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#74a178]" />
          <span className="ml-2 truncate text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Terminal — zsh — 80x24
          </span>
        </div>
        <span className="hidden shrink-0 text-[10px] uppercase tracking-[0.2em] text-[#8fb8c7] sm:inline">
          secure shell
        </span>
      </div>

      <div
        ref={scrollRef}
        className="h-[16rem] overflow-y-auto overscroll-contain px-4 py-4 font-mono text-xs leading-relaxed sm:h-[18rem] sm:text-sm lg:h-[18.5rem]"
        aria-live="polite"
      >
        <div className="flex flex-col gap-1.5">
          {lines.map((line, index) => (
            <div key={`${line.kind}-${index}-${line.text}`} className="flex min-w-0 items-start gap-2">
              {line.kind === "command" ? (
                <>
                  <span className="shrink-0 text-[#8fb8c7]">tamirlan@mac</span>
                  <span className="shrink-0 text-muted-foreground">~ %</span>
                  <span className="min-w-0 break-words text-foreground">{line.text}</span>
                </>
              ) : (
                <>
                  <span className="shrink-0 text-muted-foreground">{"  "}</span>
                  <span className="min-w-0 break-words text-muted-foreground">{line.text}</span>
                </>
              )}
            </div>
          ))}

          {!done && (
            <div className="flex min-w-0 items-start gap-2">
              <span className="shrink-0 text-[#8fb8c7]">tamirlan@mac</span>
              <span className="shrink-0 text-muted-foreground">~ %</span>
              <span className="min-w-0 break-words text-foreground">{typedCommand}</span>
              <span className="mt-0.5 inline-block h-4 w-2 bg-foreground animate-blink" />
            </div>
          )}

          {done && (
            <div className="flex items-start gap-2 pt-1">
              <span className="shrink-0 text-[#8fb8c7]">tamirlan@mac</span>
              <span className="shrink-0 text-muted-foreground">~ %</span>
              <span className="inline-block h-4 w-2 bg-foreground animate-blink" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function PersonalHero() {
  return (
    <section className="relative w-full px-6 pt-6 pb-12 lg:px-12 lg:pt-10 lg:pb-16 min-h-[90vh] flex flex-col justify-center">
      <AnimatedDitherBackground />

      {/* Grid overlay */}
      <AnimatedGrid />
      <PixelParticles />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Top headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
          data-text="TAMIRLAN"
          className="pixel-glitch-title font-mono text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-2 select-none"
        >
          TAMIRLAN
        </motion.h1>

        <div className="relative flex w-full justify-center">
          <MacTerminalWindow />
        </div>

        {/* Bottom headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          data-text="KUSTANAYEV"
          className="pixel-glitch-title font-mono text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-4 select-none"
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
            href="https://github.com/wakeupkstnv"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pixel-button flex items-center gap-2 px-4 py-2 border-2 border-foreground bg-background hover:bg-foreground hover:text-background transition-colors duration-200"
          >
            <Github size={14} />
            <span className="text-xs font-mono tracking-widest uppercase">GitHub</span>
          </motion.a>
          
          <motion.a
            href="https://linkedin.com/in/wakeupkstnv"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pixel-button flex items-center gap-2 px-4 py-2 border-2 border-foreground bg-background hover:bg-foreground hover:text-background transition-colors duration-200"
          >
            <Linkedin size={14} />
            <span className="text-xs font-mono tracking-widest uppercase">LinkedIn</span>
          </motion.a>
          
          <motion.a
            href="mailto:tkustanayev@kbtu.kz"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pixel-button group flex items-center gap-0 bg-foreground text-background text-xs font-mono tracking-wider uppercase"
          >
            <span className="flex items-center justify-center w-10 h-10 bg-[#8fb8c7]">
              <Mail size={14} className="text-background" />
            </span>
            <span className="px-4 py-2.5">Contact</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
