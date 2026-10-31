<template>
  <div class="enabler-block-container">
    <svg
      viewBox="-8 -8 246 78"
      class="enabler-block-svg"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-label="block.title"
    >
      <defs>
        <linearGradient :id="`enablerGreenCard-${type}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#047857" />
          <stop offset="100%" stop-color="#065f46" />
        </linearGradient>
      </defs>

      <g class="flow-node node-green">
        <rect
          width="230"
          height="62"
          rx="10"
          class="node-rect rect-green"
          :fill="`url(#enablerGreenCard-${type})`"
        />
        <text x="18" :y="block.titleY" class="node-title green-title">{{ block.title }}</text>
        <text
          v-for="(line, index) in block.lines"
          :key="index"
          x="18"
          :y="line.y"
          class="node-subtitle green-desc"
        >{{ line.text }}</text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (v) => ['forge', 'persistent-context', 'deterministic-controls'].includes(v),
  },
})

const { lang } = useData()
const isFr = computed(() => lang.value === 'fr')

const block = computed(() => {
  if (props.type === 'persistent-context') {
    return {
      titleY: 24,
      title: isFr.value ? '🧠 Contexte persistant' : '🧠 Persistent Context',
      lines: [
        { y: 41, text: isFr.value ? 'Instructions, prompts,' : 'Instructions, prompts,' },
        { y: 54, text: isFr.value ? 'skills et agents' : 'skills and agents' },
      ],
    }
  }
  if (props.type === 'deterministic-controls') {
    return {
      titleY: 27,
      title: isFr.value ? '🛡️ Contrôles déterministes' : '🛡️ Deterministic Controls',
      lines: [
        { y: 47, text: isFr.value ? 'Gardes, jalons, contrats & sondes' : 'Guards, gates, contracts & probes' },
      ],
    }
  }
  return {
    titleY: 24,
    title: '📦 Forge',
    lines: [
      { y: 41, text: isFr.value ? 'Code réutilisable :' : 'Reusable code:' },
      { y: 54, text: isFr.value ? 'fonctions, librairies, services' : 'functions, libraries, services' },
    ],
  }
})
</script>

<style scoped>
.enabler-block-container {
  margin: 16px 0 24px 0;
}

.enabler-block-svg {
  width: 100%;
  max-width: 380px;
  height: auto;
  display: block;
  user-select: none;
}

.rect-green {
  stroke: #10b981;
  stroke-width: 2px;
  filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.25));
}

.node-title {
  font-family: var(--vp-font-family-base, system-ui, -apple-system, sans-serif);
  font-size: 15px;
  font-weight: 700;
  fill: #ffffff;
}

.green-title {
  fill: #ecfdf5;
}

.node-subtitle {
  font-family: var(--vp-font-family-base, system-ui, -apple-system, sans-serif);
  font-size: 11px;
  font-weight: 500;
  fill: #f1f5f9;
}

.green-desc {
  fill: #a7f3d0;
}
</style>
