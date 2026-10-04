<template>
  <figure class="metric-chart">
    <figcaption class="metric-title">
      {{ title }}
      <span class="metric-direction">{{ lowerIsBetter ? 'lower is better' : 'higher is better' }}</span>
    </figcaption>
    <svg :viewBox="`0 0 ${W} ${H}`" class="metric-svg" xmlns="http://www.w3.org/2000/svg" role="img" :aria-label="title">
      <!-- Grid and y axis -->
      <g v-for="t in ticks" :key="t">
        <line :x1="L" :x2="W - R" :y1="y(t)" :y2="y(t)" class="metric-grid" />
        <text :x="L - 8" :y="y(t) + 4" class="metric-axis metric-axis-y">{{ t }}</text>
      </g>
      <text :x="L - 8" y="16" class="metric-unit">{{ unit }}</text>

      <!-- Target -->
      <g v-if="target !== undefined">
        <line :x1="L" :x2="W - R" :y1="y(target)" :y2="y(target)" class="metric-target" />
        <text :x="W - R" :y="y(target) - 6" class="metric-target-label">{{ targetLabel || 'target ' + target }}</text>
      </g>

      <!-- Bars -->
      <template v-if="type === 'bar'">
        <g v-for="(v, i) in values" :key="i">
          <rect :x="xBar(i)" :y="y(v)" :width="barW" :height="y(0) - y(v)" rx="4" class="metric-bar" />
          <text :x="xBar(i) + barW / 2" :y="y(v) - 6" class="metric-value">{{ v }}</text>
        </g>
      </template>

      <!-- Line -->
      <template v-else>
        <path :d="linePath" class="metric-line" />
        <g v-for="(v, i) in values" :key="i">
          <circle :cx="xPoint(i)" :cy="y(v)" r="4" class="metric-dot" />
          <text :x="xPoint(i)" :y="y(v) - 10" class="metric-value">{{ v }}</text>
        </g>
      </template>

      <!-- X labels -->
      <text
        v-for="(l, i) in labels"
        :key="'l' + i"
        :x="type === 'bar' ? xBar(i) + barW / 2 : xPoint(i)"
        :y="H - 14"
        class="metric-axis metric-axis-x"
      >{{ l }}</text>
    </svg>
    <p class="metric-note">Illustrative example data.</p>
  </figure>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  type: { type: String, default: 'line' },
  unit: { type: String, default: '' },
  labels: { type: Array, required: true },
  values: { type: Array, required: true },
  target: { type: Number, default: undefined },
  targetLabel: { type: String, default: '' },
  lowerIsBetter: { type: Boolean, default: true },
})

const W = 640
const H = 300
const L = 56
const R = 28
const T = 36
const B = 40

const stepSize = computed(() => {
  const m = Math.max(...props.values, props.target ?? 0)
  const pow = Math.pow(10, Math.floor(Math.log10(m / 4)))
  return [1, 2, 2.5, 5, 10].map((s) => s * pow).find((s) => s >= m / 4) ?? pow * 10
})
const max = computed(() => {
  const m = Math.max(...props.values, props.target ?? 0)
  return Math.ceil(m / stepSize.value) * stepSize.value
})
const ticks = computed(() => {
  const out = []
  for (let t = 0; t <= max.value + 1e-9; t += stepSize.value) out.push(+t.toFixed(2))
  return out
})

const y = (v) => T + (H - T - B) * (1 - v / max.value)
const slot = computed(() => (W - L - R) / props.values.length)
const barW = computed(() => Math.min(56, slot.value * 0.6))
const xBar = (i) => L + slot.value * i + (slot.value - barW.value) / 2
const xPoint = (i) => L + slot.value * i + slot.value / 2
const linePath = computed(() => props.values.map((v, i) => `${i ? 'L' : 'M'} ${xPoint(i)} ${y(v)}`).join(' '))
</script>

<style scoped>
.metric-chart {
  margin: 20px 0 28px;
  padding: 16px 16px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.metric-title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.metric-direction {
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.metric-svg {
  width: 100%;
  height: auto;
  display: block;
  margin-top: 8px;
}

.metric-grid {
  stroke: var(--vp-c-divider);
  stroke-width: 1;
}

.metric-axis,
.metric-unit,
.metric-value,
.metric-target-label {
  font-family: var(--vp-font-family-base, system-ui, -apple-system, sans-serif);
  font-size: 12px;
}

.metric-axis {
  fill: var(--vp-c-text-2);
}

.metric-axis-y {
  text-anchor: end;
}

.metric-axis-x {
  text-anchor: middle;
}

.metric-unit {
  fill: var(--vp-c-text-2);
  text-anchor: end;
  font-weight: 600;
}

.metric-value {
  fill: var(--vp-c-text-1);
  text-anchor: middle;
  font-weight: 600;
}

.metric-bar {
  fill: #6366f1;
}

.metric-line {
  fill: none;
  stroke: #6366f1;
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.metric-dot {
  fill: #6366f1;
  stroke: var(--vp-c-bg-soft);
  stroke-width: 2;
}

.metric-target {
  stroke: #10b981;
  stroke-width: 2;
  stroke-dasharray: 6, 4;
}

.metric-target-label {
  fill: #059669;
  text-anchor: end;
  font-weight: 600;
}

.dark .metric-target-label {
  fill: #34d399;
}

.metric-note {
  margin: 4px 0 8px;
  font-size: 11px;
  color: var(--vp-c-text-3);
  text-align: right;
}
</style>
