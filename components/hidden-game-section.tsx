"use client"

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Gamepad2, RotateCcw } from "lucide-react"
import { motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"

const ease = [0.22, 1, 0.36, 1] as const

type Point = {
  x: number
  y: number
}

type GameState = {
  chip: Point
  message: string
  player: Point
  score: number
  status: "ready" | "running" | "hit"
  steps: number
}

const GAME_COLS = 9
const GAME_ROWS = 7
const INITIAL_PLAYER: Point = { x: 1, y: 3 }
const INITIAL_CHIP: Point = { x: 7, y: 3 }
const CHIP_SEQUENCE: Point[] = [
  { x: 7, y: 3 },
  { x: 6, y: 1 },
  { x: 2, y: 5 },
  { x: 8, y: 6 },
  { x: 4, y: 0 },
  { x: 0, y: 2 },
]

const INITIAL_GAME: GameState = {
  chip: INITIAL_CHIP,
  message: "collect packets // arrows or touch",
  player: INITIAL_PLAYER,
  score: 0,
  status: "ready",
  steps: 0,
}

function samePoint(a: Point, b: Point) {
  return a.x === b.x && a.y === b.y
}

function clampPoint(point: Point) {
  return {
    x: Math.max(0, Math.min(GAME_COLS - 1, point.x)),
    y: Math.max(0, Math.min(GAME_ROWS - 1, point.y)),
  }
}

function getGlitches(step: number): Point[] {
  return [
    { x: (4 + step) % GAME_COLS, y: 1 },
    { x: 5, y: (5 + step) % GAME_ROWS },
    { x: (7 - (step % GAME_COLS) + GAME_COLS) % GAME_COLS, y: 5 },
  ]
}

function getNextChip(score: number, glitches: Point[], player: Point) {
  const start = score % CHIP_SEQUENCE.length

  for (let offset = 0; offset < CHIP_SEQUENCE.length; offset++) {
    const point = CHIP_SEQUENCE[(start + offset) % CHIP_SEQUENCE.length]

    if (!samePoint(point, player) && !glitches.some((glitch) => samePoint(glitch, point))) {
      return point
    }
  }

  return CHIP_SEQUENCE[start]
}

function TerminalMiniGame() {
  const [game, setGame] = useState<GameState>(INITIAL_GAME)
  const glitches = getGlitches(game.steps)

  const resetGame = useCallback(() => {
    setGame(INITIAL_GAME)
  }, [])

  const movePlayer = useCallback((delta: Point) => {
    setGame((state) => {
      if (state.status === "hit") return state

      const nextSteps = state.steps + 1
      const nextPlayer = clampPoint({
        x: state.player.x + delta.x,
        y: state.player.y + delta.y,
      })
      const nextGlitches = getGlitches(nextSteps)

      if (nextGlitches.some((glitch) => samePoint(glitch, nextPlayer))) {
        return {
          ...state,
          message: "trace hit // reset",
          player: nextPlayer,
          status: "hit",
          steps: nextSteps,
        }
      }

      const captured = samePoint(nextPlayer, state.chip)
      const nextScore = captured ? state.score + 1 : state.score

      return {
        chip: captured ? getNextChip(nextScore, nextGlitches, nextPlayer) : state.chip,
        message: captured ? "packet captured // keep routing" : "route active // avoid traces",
        player: nextPlayer,
        score: nextScore,
        status: "running",
        steps: nextSteps,
      }
    })
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const directions: Record<string, Point> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        KeyW: { x: 0, y: -1 },
        KeyS: { x: 0, y: 1 },
        KeyA: { x: -1, y: 0 },
        KeyD: { x: 1, y: 0 },
      }
      const direction = directions[event.code]

      if (!direction) return

      event.preventDefault()
      movePlayer(direction)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [movePlayer])

  const cells = Array.from({ length: GAME_COLS * GAME_ROWS }, (_, index) => ({
    x: index % GAME_COLS,
    y: Math.floor(index / GAME_COLS),
  }))
  const statusText = game.status === "hit" ? "TRACE HIT" : game.score > 0 ? "SYNC" : "READY"

  return (
    <div className="mx-auto grid w-full max-w-2xl gap-3 lg:max-w-3xl lg:grid-cols-[minmax(0,26rem)_11rem] lg:items-stretch lg:justify-center">
      <div className="border-2 border-foreground bg-background/90">
        <div className="flex items-center justify-between border-b-2 border-foreground bg-foreground/5 px-3 py-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            signal_runner
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8fb8c7]" aria-live="polite">
            {statusText}
          </span>
        </div>

        <div className="p-2 sm:p-3">
          <div
            className="grid gap-0.5 sm:gap-1"
            style={{ gridTemplateColumns: `repeat(${GAME_COLS}, minmax(0, 1fr))` }}
            role="grid"
            aria-label="Signal runner mini game"
          >
            {cells.map((cell) => {
              const isPlayer = samePoint(cell, game.player)
              const isChip = samePoint(cell, game.chip)
              const isGlitch = glitches.some((glitch) => samePoint(glitch, cell))

              return (
                <span
                  key={`${cell.x}-${cell.y}`}
                  className={`aspect-square border border-foreground/15 ${
                    isPlayer
                      ? "bg-foreground"
                      : isChip
                        ? "bg-[#8fb8c7]"
                        : isGlitch
                          ? "animate-pulse bg-foreground/35"
                          : "bg-foreground/5"
                  }`}
                  role="gridcell"
                />
              )
            })}
          </div>

          <div className="mt-3 flex flex-col gap-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span>score: {String(game.score).padStart(2, "0")}</span>
            <span className={game.status === "hit" ? "text-foreground" : "text-muted-foreground"}>
              {game.message}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 border-2 border-foreground bg-background/90 p-3">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <p>collect blue nodes</p>
          <p>avoid trace blocks</p>
        </div>

        <div className="grid w-28 grid-cols-3 gap-1.5 self-center sm:w-32">
          <span aria-hidden="true" />
          <button
            type="button"
            onClick={() => movePlayer({ x: 0, y: -1 })}
            className="pixel-button flex h-9 items-center justify-center border-2 border-foreground bg-background text-foreground sm:h-10"
            aria-label="Move up"
          >
            <ArrowUp size={16} />
          </button>
          <span aria-hidden="true" />
          <button
            type="button"
            onClick={() => movePlayer({ x: -1, y: 0 })}
            className="pixel-button flex h-9 items-center justify-center border-2 border-foreground bg-background text-foreground sm:h-10"
            aria-label="Move left"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={resetGame}
            className="pixel-button flex h-9 items-center justify-center border-2 border-foreground bg-background text-foreground sm:h-10"
            aria-label="Reset game"
          >
            <RotateCcw size={15} />
          </button>
          <button
            type="button"
            onClick={() => movePlayer({ x: 1, y: 0 })}
            className="pixel-button flex h-9 items-center justify-center border-2 border-foreground bg-background text-foreground sm:h-10"
            aria-label="Move right"
          >
            <ArrowRight size={16} />
          </button>
          <span aria-hidden="true" />
          <button
            type="button"
            onClick={() => movePlayer({ x: 0, y: 1 })}
            className="pixel-button flex h-9 items-center justify-center border-2 border-foreground bg-background text-foreground sm:h-10"
            aria-label="Move down"
          >
            <ArrowDown size={16} />
          </button>
          <span aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

export function HiddenGameSection() {
  const [open, setOpen] = useState(false)

  return (
    <section id="playground" className="w-full px-6 py-16 lg:px-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// HIDDEN: PLAYGROUND"}
        </span>
        <div className="flex-1 border-t border-border" />
        <Gamepad2 size={12} className="text-[#8fb8c7]" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">005</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="pixel-panel border-2 border-foreground bg-background/90"
      >
        <div className="flex flex-col gap-4 border-b-2 border-foreground bg-foreground/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <span className="text-[#8fb8c7]">$</span> ./signal_runner --hidden
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="pixel-button inline-flex h-10 items-center justify-center border-2 border-foreground bg-background px-4 text-xs uppercase tracking-[0.16em] text-foreground"
          >
            {open ? "Close" : "Unlock"}
          </button>
        </div>

        {open ? (
          <div className="p-3 sm:p-4">
            <TerminalMiniGame />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="block w-full px-4 py-8 text-left font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground hover:bg-foreground/5"
          >
            <span className="text-[#8fb8c7]">{">"}</span> encrypted playground dormant
            <span className="ml-2 inline-block h-4 w-2 bg-foreground align-middle animate-blink" />
          </button>
        )}
      </motion.div>
    </section>
  )
}
