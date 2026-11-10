<template>
  <div class="delivery-flowchart-container">
    <svg
      viewBox="45 0 930 762"
      class="delivery-flowchart-svg"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-label="isFr ? 'Diagramme de livraison : de la réunion client à la mise en production' : 'Delivery Flowchart: From Meeting to Production Release'"
    >
      <defs>
        <!-- Gradients -->
        <linearGradient id="flowBgCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1e1e2f" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#13131f" stop-opacity="0.98" />
        </linearGradient>

        <linearGradient id="flowCoreCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#7e22ce" />
          <stop offset="100%" stop-color="#6b21a8" />
        </linearGradient>

        <linearGradient id="flowGreenCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#047857" />
          <stop offset="100%" stop-color="#065f46" />
        </linearGradient>

        <linearGradient id="flowOrangeCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#c2410c" />
          <stop offset="100%" stop-color="#9a3412" />
        </linearGradient>

        <linearGradient id="flowYellowCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#a16207" />
          <stop offset="100%" stop-color="#854d0e" />
        </linearGradient>

        <linearGradient id="flowIndigoCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4338ca" />
          <stop offset="100%" stop-color="#3730a3" />
        </linearGradient>

        <linearGradient id="flowCyanCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0e7490" />
          <stop offset="100%" stop-color="#155e75" />
        </linearGradient>

        <linearGradient id="flowBlueCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0369a1" />
          <stop offset="100%" stop-color="#075985" />
        </linearGradient>

        <linearGradient id="flowGrayCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#475569" />
          <stop offset="100%" stop-color="#334155" />
        </linearGradient>

        <linearGradient id="flowPinkCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#be185d" />
          <stop offset="100%" stop-color="#9d174d" />
        </linearGradient>

        <linearGradient id="flowGreyCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#334155" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>

        <linearGradient id="flowPipeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#8b5cf6" />
        </linearGradient>

        <linearGradient id="flowCoreBorder" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#a855f7" />
          <stop offset="50%" stop-color="#ec4899" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>

        <!-- Arrow Markers -->
        <marker
          id="flowArrowMain"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#818cf8" />
        </marker>

        <marker
          id="flowArrowGreen"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
        </marker>

        <marker
          id="flowArrowGrey"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
        </marker>


        <!-- Drop Shadows & Glow Filters -->
        <filter id="coreGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="greenGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- ============================================================== -->
      <!-- FEEDBACK LOOPS (Outer perimeter, drawn behind cards)           -->
      <!-- ============================================================== -->


      <!-- Loop 2: 7 — Learn back to Persistent Context (Outer Left) -->
      <path
        d="M 360 726 H 70 V 247 H 87"
        class="feedback-path green-feedback"
        marker-end="url(#flowArrowGreen)"
      />
      <text x="300" y="734" class="flow-label green-text">{{ isFr ? 'Enrichit' : 'Enriches' }}</text>

      <!-- Loop 3: 7 — Learn back to Deterministic Controls (Inner Left) -->
      <path
        d="M 360 712 H 82 V 339 H 87"
        class="feedback-path green-feedback"
        marker-end="url(#flowArrowGreen)"
      />
      <text x="300" y="705" class="flow-label green-text">{{ isFr ? 'Renforce' : 'Hardens' }}</text>

      <!-- ============================================================== -->
      <!-- CONNECTIONS FROM GREEN BLOCKS INTO DELIVERY STAGES             -->
      <!-- ============================================================== -->

      <!-- Weekly audit -> 4 — Code -->
      <path
        d="M 675 431 H 647"
        class="audit-connector"
        marker-end="url(#flowArrowGrey)"
      />

      <!-- Weekly audit -> 1 — Triage (own inner corridor) -->
      <path
        d="M 905 431 H 912 Q 920 431 920 423 V 178 Q 920 170 912 170 H 647"
        class="audit-connector"
        marker-end="url(#flowArrowGrey)"
      />
      <text x="784" y="163" class="flow-label grey-text">{{ isFr ? 'Ouvre des tickets' : 'Opens issues' }}</text>

      <!-- 7 — Learn -> 1 — Triage (Outer right corridor, opens backlog issues) -->
      <path
        d="M 640 707 H 935 V 159 Q 935 151 927 151 H 647"
        class="audit-connector"
        marker-end="url(#flowArrowGrey)"
      />
      <text x="784" y="144" class="flow-label grey-text">{{ isFr ? 'Ouvre des tickets' : 'Opens issues' }}</text>

      <!-- Support ticketing tool -> 1 — Triage (above the Learn corridor) -->
      <path
        d="M 790 96 V 132 H 647"
        class="audit-connector"
        marker-end="url(#flowArrowGrey)"
      />
      <text x="718" y="125" class="flow-label grey-text">{{ isFr ? 'Ouvre des tickets' : 'Opens issues' }}</text>

      <!-- Persistent Context & Deterministic Controls <-> shared trunk (left) feeding 0 — Meet through 7 — Learn -->
      <path
        d="M 325 247 H 340"
        class="green-connector"
        marker-start="url(#flowArrowGreen)"
      />
      <path
        d="M 325 339 H 340"
        class="green-connector"
        marker-start="url(#flowArrowGreen)"
      />
      <path
        d="M 340 63 V 707"
        class="green-connector"
      />
      <path
        v-for="row in 8"
        :key="`left-trunk-${row}`"
        :d="`M 340 ${rowCenterY(row - 1)} H 353`"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />

      <!-- The Forge -> shared trunk (right) feeding 2 — Think, 3 — Plan, 4 — Code -->
      <path
        d="M 660 247 V 412"
        class="green-connector"
      />
      <path
        d="M 660 412 H 647"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />
      <path
        d="M 675 339 H 647"
        class="green-connector"
        marker-start="url(#flowArrowGreen)"
        marker-end="url(#flowArrowGreen)"
      />
      <path
        d="M 660 247 H 647"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />

      <!-- ============================================================== -->
      <!-- MAIN PIPELINE HIGHWAY (Straight Vertical Down the Center)      -->
      <!-- ============================================================== -->
      <path
        v-for="row in 7"
        :key="`highway-${row}`"
        :d="`M 500 ${rowY(row - 1) + CARD_HEIGHT} V ${rowY(row) - 7}`"
        class="pipe-highway"
        marker-end="url(#flowArrowMain)"
      />

      <!-- ============================================================== -->
      <!-- INTERACTIVE CARDS & NODES (Unified height & row grid)          -->
      <!-- ============================================================== -->
      <a
        v-for="node in nodes"
        :key="node.id"
        :href="withBase(prefix + node.href)"
        class="flow-node-link"
      >
        <g :class="['flow-node', node.nodeClass]" :transform="`translate(${node.x}, ${node.y})`">
          <rect :width="node.width" :height="CARD_HEIGHT" rx="10" :class="['node-rect', node.rectClass]" />
          <text
            :x="node.textX"
            :y="node.lines.length === 1 ? 28 : 25"
            :class="['node-title', node.titleClass]"
          >{{ node.title }}</text>
          <text
            v-for="(line, lineIdx) in node.lines"
            :key="lineIdx"
            :x="node.textX"
            :y="node.lines.length === 1 ? 47 : (lineIdx === 0 ? 42 : 55)"
            :class="['node-subtitle', node.subtitleClass]"
          >{{ line }}</text>
        </g>
      </a>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const isFr = computed(() => lang.value === 'fr')
const prefix = computed(() => (isFr.value ? '/fr' : ''))

const CARD_HEIGHT = 66
const ROW_GAP = 26
const ROW_STEP = CARD_HEIGHT + ROW_GAP
const START_Y = 30

const LEFT_X = 95
const CENTER_X = 360
const RIGHT_X = 675

const SIDE_WIDTH = 230
const CENTER_WIDTH = 280

function rowY(row) {
  return START_Y + row * ROW_STEP
}

function rowCenterY(row) {
  return rowY(row) + CARD_HEIGHT / 2
}

const nodes = computed(() => [
  // Center column (Stages 0 to 7)
  {
    id: 'meet',
    href: '/guide/stage-meet',
    x: CENTER_X,
    y: rowY(0),
    width: CENTER_WIDTH,
    textX: 20,
    nodeClass: 'node-meeting',
    rectClass: 'rect-blue',
    titleClass: 'blue-title',
    subtitleClass: '',
    title: '🎙️ 0 — Meet',
    lines: [isFr.value ? 'Dialogue client & découverte' : 'Client dialogue & discovery'],
  },
  {
    id: 'triage',
    href: '/guide/stage-triage',
    x: CENTER_X,
    y: rowY(1),
    width: CENTER_WIDTH,
    textX: 20,
    nodeClass: 'node-need',
    rectClass: 'rect-yellow',
    titleClass: 'yellow-title',
    subtitleClass: '',
    title: '🎯 1 — Triage',
    lines: isFr.value
      ? ['Vérifier et classer les besoins,', 'créer les tickets']
      : ['Check and rank needs,', 'create backlog issues'],
  },
  {
    id: 'think',
    href: '/guide/stage-think',
    x: CENTER_X,
    y: rowY(2),
    width: CENTER_WIDTH,
    textX: 20,
    nodeClass: 'node-think',
    rectClass: 'rect-pink',
    titleClass: 'pink-title',
    subtitleClass: '',
    title: '💡 2 — Think',
    lines: isFr.value
      ? ['Comparer les options,', 'choisir l’approche']
      : ['Compare options,', 'choose the approach'],
  },
  {
    id: 'plan',
    href: '/guide/stage-plan',
    x: CENTER_X,
    y: rowY(3),
    width: CENTER_WIDTH,
    textX: 20,
    nodeClass: 'node-plan',
    rectClass: 'rect-indigo',
    titleClass: 'indigo-title',
    subtitleClass: '',
    title: '📋 3 — Plan',
    lines: isFr.value
      ? ['Définir les étapes,', 'les fichiers et les tests']
      : ['Define steps,', 'files and tests'],
  },
  {
    id: 'code',
    href: '/guide/stage-code',
    x: CENTER_X,
    y: rowY(4),
    width: CENTER_WIDTH,
    textX: 20,
    nodeClass: 'node-core',
    rectClass: 'rect-core',
    titleClass: 'core-title',
    subtitleClass: '',
    title: '⚡ 4 — Code',
    lines: isFr.value
      ? ['Boucles autonomes rapides,', 'générer, tester & corriger']
      : ['Fast autonomous loops,', 'generate, test & fix until green'],
  },
  {
    id: 'prove',
    href: '/guide/stage-prove',
    x: CENTER_X,
    y: rowY(5),
    width: CENTER_WIDTH,
    textX: 20,
    nodeClass: 'node-proof',
    rectClass: 'rect-cyan',
    titleClass: 'cyan-title',
    subtitleClass: '',
    title: '✅ 5 — Prove',
    lines: isFr.value
      ? ['Relancer les contrôles, revue', 'et évaluer indépendamment']
      : ['Rerun controls, review', 'and assess independently'],
  },
  {
    id: 'release',
    href: '/guide/stage-release',
    x: CENTER_X,
    y: rowY(6),
    width: CENTER_WIDTH,
    textX: 20,
    nodeClass: 'node-release',
    rectClass: 'rect-orange',
    titleClass: 'orange-title',
    subtitleClass: '',
    title: '🚀 6 — Release',
    lines: isFr.value
      ? ['Déploiement automatisé,', 'réversible à chaque étape']
      : ['Automated deployment,', 'reversible at any step'],
  },
  {
    id: 'learn',
    href: '/guide/stage-learn',
    x: CENTER_X,
    y: rowY(7),
    width: CENTER_WIDTH,
    textX: 20,
    nodeClass: 'node-learn',
    rectClass: 'rect-gray',
    titleClass: 'gray-title',
    subtitleClass: '',
    title: '📈 7 — Learn',
    lines: isFr.value
      ? ['Analyse de télémétrie &', 'supervision prédictive']
      : ['Telemetry analysis &', 'predictive monitoring'],
  },

  // Left column (Row 2 & Row 3 — same 66px height & 26px gap)
  {
    id: 'persistent-context',
    href: '/guide/persistent-context',
    x: LEFT_X,
    y: rowY(2),
    width: SIDE_WIDTH,
    textX: 18,
    nodeClass: 'node-green',
    rectClass: 'rect-green',
    titleClass: 'green-title',
    subtitleClass: 'green-desc',
    title: isFr.value ? '🧠 Contexte persistant' : '🧠 Persistent Context',
    lines: isFr.value
      ? ['Instructions, prompts,', 'skills et agents']
      : ['Instructions, prompts,', 'skills and agents'],
  },
  {
    id: 'deterministic-controls',
    href: '/guide/deterministic-controls',
    x: LEFT_X,
    y: rowY(3),
    width: SIDE_WIDTH,
    textX: 18,
    nodeClass: 'node-green',
    rectClass: 'rect-green',
    titleClass: 'green-title',
    subtitleClass: 'green-desc',
    title: isFr.value ? '🛡️ Contrôles déterministes' : '🛡️ Deterministic Controls',
    lines: [isFr.value ? 'Gardes, jalons, contrats & sondes' : 'Guards, gates, contracts & probes'],
  },

  // Right column (Row 0, Row 3 & Row 4 — same 66px height & 26px gap)
  {
    id: 'support-tickets',
    href: '/guide/stage-triage#where-backlog-issues-come-from',
    x: RIGHT_X,
    y: rowY(0),
    width: SIDE_WIDTH,
    textX: 18,
    nodeClass: 'node-audit',
    rectClass: 'rect-audit',
    titleClass: 'audit-title',
    subtitleClass: '',
    title: isFr.value ? '🎧 Tickets de support' : '🎧 Support tickets',
    lines: [isFr.value ? 'Outil de ticketing support' : 'Support ticketing tool'],
  },
  {
    id: 'forge',
    href: '/guide/forge',
    x: RIGHT_X,
    y: rowY(3),
    width: SIDE_WIDTH,
    textX: 18,
    nodeClass: 'node-green',
    rectClass: 'rect-green',
    titleClass: 'green-title',
    subtitleClass: 'green-desc',
    title: '📦 Forge',
    lines: isFr.value
      ? ['Code réutilisable :', 'fonctions, librairies, services']
      : ['Reusable code:', 'functions, libraries, services'],
  },
  {
    id: 'weekly-audit',
    href: '/guide/stage-triage#where-backlog-issues-come-from',
    x: RIGHT_X,
    y: rowY(4),
    width: SIDE_WIDTH,
    textX: 18,
    nodeClass: 'node-green',
    rectClass: 'rect-green',
    titleClass: 'green-title',
    subtitleClass: 'green-desc',
    title: isFr.value ? '⏱️ Audit hebdomadaire' : '⏱️ Weekly audit',
    lines: [isFr.value ? 'Planifié dans la CI' : 'Scheduled in CI'],
  },
])
</script>

<style scoped>
.delivery-flowchart-container {
  width: calc(100% + 48px);
  margin: 28px -24px;
  padding: 20px 0;
  --flow-bg: var(--vp-c-bg);
}


.delivery-flowchart-svg {
  width: 100%;
  height: auto;
  display: block;
  user-select: none;
}

/* Base Paths */
.pipe-highway {
  stroke: url(#flowPipeGrad);
  stroke-width: 3px;
  stroke-linecap: round;
}

.audit-connector {
  stroke: #94a3b8;
  stroke-width: 2.2px;
  stroke-dasharray: 5, 4;
  fill: none;
}

.green-connector {
  stroke: #10b981;
  stroke-width: 2.2px;
  stroke-dasharray: 5, 4;
  fill: none;
}

.feedback-path {
  stroke: #64748b;
  stroke-width: 1.8px;
  stroke-dasharray: 4, 4;
  fill: none;
}

.green-feedback {
  stroke: #10b981;
  stroke-opacity: 0.85;
}

/* Label Styling */
.flow-label {
  font-family: var(--vp-font-family-base, system-ui, -apple-system, sans-serif);
  font-size: 9.5px;
  font-weight: 600;
  fill: #475569;
  text-anchor: middle;
  dominant-baseline: middle;
  paint-order: stroke;
  stroke: var(--flow-bg);
  stroke-width: 6px;
  stroke-linejoin: round;
}

.grey-text {
  fill: #64748b;
}

.dark .grey-text {
  fill: #94a3b8;
}

.green-text {
  fill: #059669;
}

.dark .flow-label {
  fill: #94a3b8;
}

.dark .green-text {
  fill: #34d399;
}

/* Card Rectangles */
.node-rect {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.rect-orange {
  fill: url(#flowOrangeCard);
  stroke: #f97316;
  stroke-width: 1.8px;
}

.rect-yellow {
  fill: url(#flowYellowCard);
  stroke: #eab308;
  stroke-width: 1.8px;
}

.rect-audit {
  fill: url(#flowGreyCard);
  stroke: #94a3b8;
  stroke-width: 1.8px;
  stroke-dasharray: 6, 4;
}

.rect-pink {
  fill: url(#flowPinkCard);
  stroke: #ec4899;
  stroke-width: 1.8px;
}

.rect-indigo {
  fill: url(#flowIndigoCard);
  stroke: #6366f1;
  stroke-width: 1.8px;
}

.rect-core {
  fill: url(#flowCoreCard);
  stroke: url(#flowCoreBorder);
  stroke-width: 2.4px;
  filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.35));
}

.rect-cyan {
  fill: url(#flowCyanCard);
  stroke: #06b6d4;
  stroke-width: 1.8px;
}

.rect-blue {
  fill: url(#flowBlueCard);
  stroke: #0ea5e9;
  stroke-width: 1.8px;
}

.rect-gray {
  fill: url(#flowGrayCard);
  stroke: #94a3b8;
  stroke-width: 1.8px;
}

.rect-green {
  fill: url(#flowGreenCard);
  stroke: #10b981;
  stroke-width: 2px;
  filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.25));
}

/* Node Text */
.node-title {
  font-family: var(--vp-font-family-base, system-ui, -apple-system, sans-serif);
  font-size: 15px;
  font-weight: 700;
  fill: #ffffff;
}

.orange-title {
  fill: #ffedd5;
}

.yellow-title {
  fill: #fef08a;
}

.audit-title {
  fill: #f1f5f9;
}

.pink-title {
  fill: #fce7f3;
}

.indigo-title {
  fill: #e0e7ff;
}

.core-title {
  fill: #f3e8ff;
}

.cyan-title {
  fill: #cffafe;
}

.blue-title {
  fill: #f0f9ff;
}

.gray-title {
  fill: #f1f5f9;
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



/* Interactive Hover States */
.flow-node-link {
  text-decoration: none;
}

.flow-node:hover .node-rect {
  filter: drop-shadow(0 4px 16px rgba(99, 102, 241, 0.45));
  stroke-width: 2.6px;
  transform: translateY(-1px);
}

.node-meeting:hover .node-rect {
  filter: drop-shadow(0 4px 16px rgba(14, 165, 233, 0.5));
}

.node-need:hover .node-rect {
  filter: drop-shadow(0 4px 16px rgba(234, 179, 8, 0.5));
}

.node-audit:hover .node-rect {
  filter: drop-shadow(0 4px 16px rgba(148, 163, 184, 0.5));
}

.node-think:hover .node-rect {
  filter: drop-shadow(0 4px 16px rgba(236, 72, 153, 0.5));
}

.node-plan:hover .node-rect {
  filter: drop-shadow(0 4px 16px rgba(99, 102, 241, 0.5));
}

.node-core:hover .node-rect {
  filter: drop-shadow(0 4px 20px rgba(168, 85, 247, 0.65));
}

.node-proof:hover .node-rect {
  filter: drop-shadow(0 4px 16px rgba(6, 182, 212, 0.5));
}

.node-release:hover .node-rect {
  filter: drop-shadow(0 4px 16px rgba(249, 115, 22, 0.5));
}

.node-learn:hover .node-rect {
  filter: drop-shadow(0 4px 16px rgba(148, 163, 184, 0.5));
}

.node-green:hover .node-rect {
  filter: drop-shadow(0 4px 16px rgba(16, 185, 129, 0.55));
}
</style>
