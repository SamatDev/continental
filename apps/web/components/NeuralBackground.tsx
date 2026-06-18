'use client'

import { useEffect, useRef } from 'react'

// ─── типы ────────────────────────────────────────────────────────────────────

interface MatrixColumn {
  x: number
  y: number          // позиция головы
  speed: number
  chars: string[]    // буфер символов трейла
  len: number        // длина трейла
  color: 'cyan' | 'purple' | 'pink'
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulse: number
  pulseSpeed: number
  color: 'cyan' | 'purple' | 'pink'
}

// ─── константы цветов ────────────────────────────────────────────────────────

const COLORS = {
  cyan:   { r: '0,212,255',   head: '#00d4ff', dim: '#004455' },
  purple: { r: '160,80,255',  head: '#a050ff', dim: '#2a0055' },
  pink:   { r: '255,0,160',   head: '#ff00a0', dim: '#440030' },
}

const MATRIX_CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノ' +
  'ハヒフヘホマミムメモヤユヨラリルレロワヲン' +
  '01001101010011001011010'

function rndChar() {
  return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
}

// ─── компонент ───────────────────────────────────────────────────────────────

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let nodes: Node[] = []
    let columns: MatrixColumn[] = []

    const COL_SIZE   = 14   // уже → больше колонн
    const NODE_COUNT = 65
    const CONN_DIST  = 170

    // ── resize ────────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      initColumns()
    }

    // ── матричные колонны ─────────────────────────────────────────────────────
    const initColumns = () => {
      const count = Math.floor(canvas.width / COL_SIZE)
      columns = Array.from({ length: count }, (_, i) => {
        const rnd = Math.random()
        const color: MatrixColumn['color'] =
          rnd < 0.55 ? 'cyan' : rnd < 0.85 ? 'purple' : 'pink'
        const len = Math.floor(Math.random() * 22) + 10
        // половина колонн сразу на экране, половина ждёт сверху
        const startOnScreen = Math.random() < 0.55
        const y = startOnScreen
          ? Math.random() * canvas.height
          : Math.random() * -canvas.height
        return {
          x: i * COL_SIZE + COL_SIZE / 2,
          y,
          speed: Math.random() * 1.8 + 0.5,
          chars: Array.from({ length: len }, rndChar),
          len,
          color,
        }
      })
    }

    // ── нейронная сеть ────────────────────────────────────────────────────────
    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => {
        const rnd = Math.random()
        const color: Node['color'] =
          rnd < 0.55 ? 'cyan' : rnd < 0.85 ? 'purple' : 'pink'
        return {
          x:          Math.random() * canvas.width,
          y:          Math.random() * canvas.height,
          vx:         (Math.random() - 0.5) * 0.45,
          vy:         (Math.random() - 0.5) * 0.45,
          radius:     Math.random() * 2.2 + 0.8,
          pulse:      Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.025 + 0.008,
          color,
        }
      })
    }

    // ── главный цикл ──────────────────────────────────────────────────────────
    const draw = () => {
      // оверлей — гасит хвосты и держит фон тёмным
      ctx.fillStyle = 'rgba(5, 5, 8, 0.38)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // ── сетка ──────────────────────────────────────────────────────────────
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += 60) {
        ctx.strokeStyle = 'rgba(0,212,255,0.025)'
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += 60) {
        ctx.strokeStyle = 'rgba(160,80,255,0.018)'
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }

      // ── матричный дождь ────────────────────────────────────────────────────
      ctx.font = `${COL_SIZE - 2}px monospace`
      for (const col of columns) {
        const c = COLORS[col.color]

        for (let i = 0; i < col.len; i++) {
          const cy = col.y - i * COL_SIZE
          if (cy < -COL_SIZE || cy > canvas.height) continue

          const t = 1 - i / col.len          // 1 у головы, 0 у хвоста
          const alpha = i === 0
            ? 0.75                           // голова — яркая, но не слепит
            : Math.pow(t, 3) * 0.35          // хвост быстрее гаснет

          if (i === 0) {
            ctx.fillStyle = `rgba(200,230,255,${alpha})`
          } else {
            ctx.fillStyle = `rgba(${c.r},${alpha})`
          }

          // случайно мутируем символ
          if (Math.random() < 0.04) col.chars[i] = rndChar()
          ctx.fillText(col.chars[i], col.x - COL_SIZE / 2, cy)
        }

        col.y += col.speed
        if (col.y - col.len * COL_SIZE > canvas.height) {
          col.y     = Math.random() * -canvas.height * 0.5
          col.speed = Math.random() * 1.4 + 0.6
          col.len   = Math.floor(Math.random() * 18) + 8
          col.chars = Array.from({ length: col.len }, rndChar)
          // иногда меняем цвет колонны
          if (Math.random() < 0.3) {
            const r = Math.random()
            col.color = r < 0.55 ? 'cyan' : r < 0.85 ? 'purple' : 'pink'
          }
        }
      }

      // ── связи между нейронами ──────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist >= CONN_DIST) continue

          const alpha = (1 - dist / CONN_DIST) * 0.18
          // цвет связи — берём цвет «доминирующего» нода
          const ci = COLORS[nodes[i].color]
          ctx.strokeStyle = `rgba(${ci.r},${alpha})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
        }
      }

      // ── нейроны ────────────────────────────────────────────────────────────
      for (const node of nodes) {
        node.pulse += node.pulseSpeed
        const pf = 0.5 + 0.5 * Math.sin(node.pulse)
        const r  = node.radius + pf * 2
        const c  = COLORS[node.color]

        // мягкий glow (меньше радиус, тише альфа)
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4)
        grad.addColorStop(0, `rgba(${c.r},${0.12 + pf * 0.08})`)
        grad.addColorStop(1, `rgba(${c.r},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2)
        ctx.fill()

        // ядро — чуть тише
        ctx.fillStyle = `rgba(${c.r},${0.45 + pf * 0.25})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fill()

        // движение
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > canvas.width)  node.vx *= -1
        if (node.y < 0 || node.y > canvas.height)  node.vy *= -1
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    initNodes()

    const onResize = () => { resize(); initNodes() }
    window.addEventListener('resize', onResize)

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  )
}
