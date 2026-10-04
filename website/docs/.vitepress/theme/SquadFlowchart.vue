<template>
  <div class="squad-flowchart-container">
    <svg
      viewBox="80 0 740 760"
      class="squad-flowchart-svg"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="The operating model with who does the job at each group of stages"
    >
      <defs>
        <linearGradient v-for="c in colors" :id="'sq' + c.id" :key="c.id" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" :stop-color="c.from" />
          <stop offset="100%" :stop-color="c.to" />
        </linearGradient>
        <marker
          id="sqArrow"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818cf8" />
        </marker>
      </defs>

      <!-- Arrows between stages -->
      <path
        v-for="(s, i) in stages.slice(0, -1)"
        :key="'a' + i"
        :d="`M ${cx} ${rowY(i) + 54} V ${rowY(i + 1) - 7}`"
        class="sq-pipe"
        marker-end="url(#sqArrow)"
      />
      <text :x="cx" :y="rowY(4) - 16" class="sq-validate">👤 Validate</text>

      <!-- Who does the job, per group of stages -->
      <g v-for="g in groups" :key="g.from">
        <path
          :d="`M ${blockX - 8} ${rowY(g.from)} H ${blockX - 18} V ${rowY(g.to) + 54} H ${blockX - 8}`"
          class="sq-bracket"
          :stroke="roles[g.role].color"
        />
        <path :d="`M ${blockX - 40} ${mid(g)} H ${blockX - 18}`" class="sq-bracket" :stroke="roles[g.role].color" />
        <g :transform="`translate(${blockX - 40 - 120}, ${mid(g) - 15})`">
          <rect width="120" height="30" rx="15" :fill="roles[g.role].color" />
          <text x="60" y="20" class="sq-chip">{{ roles[g.role].label }}</text>
        </g>
      </g>

      <!-- Enablers: the green blocks of the operating model, owned by the architect -->
      <text :x="enX + enW / 2" :y="enablerY(0) - 14" class="sq-section">Enablers</text>
      <a v-for="(e, i) in enablers" :key="e.page" :href="withBase('/guide/' + e.page)" class="sq-link">
        <g :transform="`translate(${enX}, ${enablerY(i)})`" class="sq-node">
          <rect :width="enW" :height="e.h" rx="10" fill="url(#sqgreen)" stroke="#10b981" stroke-width="1.8" />
          <text x="12" :y="e.h / 2 + 5" class="sq-title sq-title-small">{{ e.icon }}</text>
          <text
            v-for="(line, k) in e.lines"
            :key="k"
            x="34"
            :y="e.h / 2 + 5 + (k - (e.lines.length - 1) / 2) * 18"
            class="sq-title sq-title-small"
          >{{ line }}</text>
        </g>
      </a>
      <path :d="`M ${enX + enW + 10} ${enablerY(0)} H ${enX + enW + 20} V ${enablerEnd} H ${enX + enW + 10}`" class="sq-bracket" :stroke="roles.architect.color" />
      <path :d="`M ${enX + enW + 20} ${enablerMid} H ${enX + enW + 30}`" class="sq-bracket" :stroke="roles.architect.color" />
      <g :transform="`translate(${enX + enW + 30}, ${enablerMid - 15})`">
        <rect width="100" height="30" rx="15" :fill="roles.architect.color" />
        <text x="50" y="20" class="sq-chip">{{ roles.architect.label }}</text>
      </g>

      <g v-for="(s, i) in stages" :key="s.title">
        <a :href="withBase('/guide/' + s.page)" class="sq-link">
          <g :transform="`translate(${blockX}, ${rowY(i)})`" class="sq-node">
            <rect :width="blockW" height="54" rx="10" :fill="'url(#sq' + s.color + ')'" :stroke="strokes[s.color]" stroke-width="1.8" />
            <text x="18" y="24" class="sq-title">{{ s.title }}</text>
            <text x="18" y="42" class="sq-sub">{{ s.sub }}</text>
          </g>
        </a>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { withBase } from 'vitepress'

const roles = {
  product: { label: 'Product Owner', color: '#ea580c' },
  dev: { label: 'Developer', color: '#4f46e5' },
  devops: { label: 'DevOps', color: '#0284c7' },
  support: { label: 'QA and maintainer', color: '#0f766e' },
  architect: { label: 'Architect', color: '#9333ea' },
}

// Who does the job, per group of consecutive stages (indexes into `stages`).
const groups = [
  { role: 'product', from: 0, to: 1 },
  { role: 'dev', from: 2, to: 5 },
  { role: 'devops', from: 6, to: 6 },
  { role: 'support', from: 7, to: 7 },
]

const colors = [
  { id: 'orange', from: '#c2410c', to: '#9a3412' },
  { id: 'yellow', from: '#a16207', to: '#854d0e' },
  { id: 'pink', from: '#be185d', to: '#9d174d' },
  { id: 'indigo', from: '#4338ca', to: '#3730a3' },
  { id: 'core', from: '#7e22ce', to: '#6b21a8' },
  { id: 'cyan', from: '#0e7490', to: '#155e75' },
  { id: 'blue', from: '#0369a1', to: '#075985' },
  { id: 'gray', from: '#475569', to: '#334155' },
  { id: 'green', from: '#047857', to: '#065f46' },
]

const strokes = {
  orange: '#f97316',
  yellow: '#eab308',
  pink: '#ec4899',
  indigo: '#6366f1',
  core: '#a855f7',
  cyan: '#06b6d4',
  blue: '#0ea5e9',
  gray: '#94a3b8',
}

const stages = [
  { title: '🎙️ 0 — Meet', sub: 'Client dialogue & discovery', page: 'stage-meet', color: 'orange' },
  { title: '🎯 1 — Triage', sub: 'Business needs ranked as backlog issues', page: 'stage-triage', color: 'yellow' },
  { title: '💡 2 — Think', sub: 'Options, trade-offs & decisions', page: 'stage-think', color: 'pink' },
  { title: '📋 3 — Plan', sub: 'Breakdown, scope & criteria', page: 'stage-plan', color: 'indigo' },
  { title: '⚡ 4 — Code', sub: 'Fast iterative loops', page: 'stage-code', color: 'core' },
  { title: '✅ 5 — Prove', sub: 'Guards, gates, contracts & probes', page: 'stage-prove', color: 'cyan' },
  { title: '🚀 6 — Release', sub: 'Automated deployment', page: 'stage-release', color: 'blue' },
  { title: '📈 7 — Learn', sub: 'QA or monitoring', page: 'stage-learn', color: 'gray' },
]

const enablers = [
  { icon: '🧠', lines: ['Persistent Context'], page: 'persistent-context', h: 40 },
  { icon: '📦', lines: ['Forge'], page: 'forge', h: 40 },
  { icon: '🛡️', lines: ['Deterministic', 'Controls'], page: 'deterministic-controls', h: 58 },
]
const enablerGap = 12

const blockX = 250
const blockW = 250
const cx = blockX + blockW / 2
const enX = 520
const enW = 170

const rowY = (i) => 40 + i * 92
const enablerTop = 270
const enablerY = (i) => enablerTop + enablers.slice(0, i).reduce((sum, e) => sum + e.h + enablerGap, 0)
const enablerEnd = enablerY(enablers.length - 1) + enablers[enablers.length - 1].h
const enablerMid = (enablerY(0) + enablerEnd) / 2
const mid = (g) => (rowY(g.from) + rowY(g.to) + 54) / 2
</script>

<style scoped>
.squad-flowchart-container {
  width: 100%;
  max-width: 760px;
  margin: 28px auto;
  padding: 20px 0;
}

.squad-flowchart-svg {
  width: 100%;
  height: auto;
  display: block;
  user-select: none;
}

.sq-pipe {
  stroke: #818cf8;
  stroke-width: 3px;
  stroke-linecap: round;
  fill: none;
}

.sq-validate {
  font-family: var(--vp-font-family-base, system-ui, -apple-system, sans-serif);
  font-size: 9.5px;
  font-weight: 600;
  fill: #4f46e5;
  text-anchor: middle;
  paint-order: stroke;
  stroke: var(--vp-c-bg);
  stroke-width: 6px;
  stroke-linejoin: round;
}

.dark .sq-validate {
  fill: #a5b4fc;
}

.sq-link {
  text-decoration: none;
}

.sq-title {
  font-family: var(--vp-font-family-base, system-ui, -apple-system, sans-serif);
  font-size: 15px;
  font-weight: 700;
  fill: #ffffff;
}

.sq-sub {
  font-family: var(--vp-font-family-base, system-ui, -apple-system, sans-serif);
  font-size: 11px;
  font-weight: 500;
  fill: #f1f5f9;
}

.sq-section {
  font-family: var(--vp-font-family-base, system-ui, -apple-system, sans-serif);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  fill: var(--vp-c-text-2);
  text-anchor: middle;
}

.sq-title-small {
  font-size: 13px;
}

.sq-sub-green {
  fill: #a7f3d0;
}

.sq-chip {
  font-family: var(--vp-font-family-base, system-ui, -apple-system, sans-serif);
  font-size: 12px;
  font-weight: 700;
  fill: #ffffff;
  text-anchor: middle;
}

.sq-bracket {
  fill: none;
  stroke-width: 2.4px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sq-node:hover rect {
  filter: drop-shadow(0 4px 14px rgba(99, 102, 241, 0.45));
}
</style>
