<template>
  <div class="delivery-flowchart-container">
    <svg
      viewBox="45 0 930 786"
      class="delivery-flowchart-svg"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Delivery Flowchart: From Meeting to Production Release"
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
        d="M 360 722 H 70 V 258 H 87"
        class="feedback-path green-feedback"
        marker-end="url(#flowArrowGreen)"
      />
      <text x="300" y="730" class="flow-label green-text">Enriches</text>

      <!-- Loop 3: 7 — Learn back to Deterministic Controls (Inner Left) -->
      <path
        d="M 360 708 H 82 V 342 H 87"
        class="feedback-path green-feedback"
        marker-end="url(#flowArrowGreen)"
      />
      <text x="300" y="701" class="flow-label green-text">Hardens</text>

      <!-- ============================================================== -->
      <!-- CONNECTIONS FROM GREEN BLOCKS INTO DELIVERY STAGES             -->
      <!-- ============================================================== -->

      <!-- Weekly audit -> 4 — Code -->
      <path
        d="M 675 450 H 647"
        class="audit-connector"
        marker-end="url(#flowArrowGrey)"
      />

      <!-- Weekly audit -> 1 — Triage (own inner corridor) -->
      <path
        d="M 905 445 H 912 Q 920 445 920 437 V 172 Q 920 164 912 164 H 647"
        class="audit-connector"
        marker-end="url(#flowArrowGrey)"
      />
      <text x="784" y="157" class="flow-label grey-text">Opens issues</text>

      <!-- 7 — Learn -> 1 — Triage (Outer right corridor, opens backlog issues) -->
      <path
        d="M 640 715 H 935 V 153 Q 935 145 927 145 H 647"
        class="audit-connector"
        marker-end="url(#flowArrowGrey)"
      />
      <text x="784" y="138" class="flow-label grey-text">Opens issues</text>

      <!-- Support ticketing tool -> 1 — Triage (above the Learn corridor) -->
      <path
        d="M 790 86 V 126 H 647"
        class="audit-connector"
        marker-end="url(#flowArrowGrey)"
      />
      <text x="718" y="119" class="flow-label grey-text">Opens issues</text>

      <!-- Persistent Context -> shared trunk (left) feeding 0 — Meet, 1 — Triage, 2 — Think, 3 — Plan, 4 — Code, 5 — Prove -->
      <path
        d="M 325 342 H 340"
        class="green-connector"
        marker-start="url(#flowArrowGreen)"
      />
      <path
        d="M 340 58 V 539"
        class="green-connector"
      />
      <path
        d="M 340 58 H 353"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />
      <path
        d="M 340 145 H 353"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />
      <path
        d="M 340 235 H 353"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />
      <path
        d="M 340 327 H 353"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />
      <path
        d="M 340 436 H 353"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />
      <path
        d="M 340 539 H 353"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />

      <!-- The Forge -> shared trunk (right) feeding 2 — Think, 3 — Plan, 4 — Code -->
      <path
        d="M 660 235 V 428"
        class="green-connector"
      />
      <path
        d="M 660 428 H 647"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />
      <path
        d="M 675 327 H 647"
        class="green-connector"
        marker-start="url(#flowArrowGreen)"
        marker-end="url(#flowArrowGreen)"
      />
      <path
        d="M 660 235 H 647"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />

      <!-- Persistent Context & Deterministic Controls <-> shared trunk (left): the links go both ways -->
      <path
        d="M 325 258 H 340"
        class="green-connector"
        marker-start="url(#flowArrowGreen)"
      />

      <!-- ============================================================== -->
      <!-- MAIN PIPELINE HIGHWAY (Straight Vertical Down the Center)      -->
      <!-- ============================================================== -->

      <!-- Meeting -> 1 — Triage -->
      <path d="M 500 86 V 109" class="pipe-highway" marker-end="url(#flowArrowMain)" />

      <!-- 1 — Triage -> 3 — Plan -->
      <path d="M 500 174 V 197" class="pipe-highway" marker-end="url(#flowArrowMain)" />

      <!-- 2 — Think -> 3 — Plan -->
      <path d="M 500 266 V 289" class="pipe-highway" marker-end="url(#flowArrowMain)" />

      <!-- 3 — Plan -> 4 — Code -->
      <path d="M 500 358 V 405" class="pipe-highway" marker-end="url(#flowArrowMain)" />
      <text x="500" y="372.5" class="flow-label highlight-label">👤 Validate</text>

      <!-- 4 — Code -> 5 — Prove -->
      <path d="M 500 478 V 501" class="pipe-highway" marker-end="url(#flowArrowMain)" />

      <!-- 5 — Prove -> 6 — Release -->
      <path d="M 500 570 V 593" class="pipe-highway" marker-end="url(#flowArrowMain)" />

      <!-- 6 — Release -> 7 — Learn -->
      <path d="M 500 656 V 679" class="pipe-highway" marker-end="url(#flowArrowMain)" />

      <!-- ============================================================== -->
      <!-- INTERACTIVE CARDS & NODES                                      -->
      <!-- ============================================================== -->

      <!-- [ROW 0] Meeting (Origin) -->
      <a :href="withBase('/guide/stage-meet')" class="flow-node-link">
        <g class="flow-node node-meeting" transform="translate(360, 30)">
          <rect width="280" height="56" rx="10" class="node-rect rect-orange" />
          <text x="20" y="26" class="node-title orange-title">🎙️ 0 — Meet</text>
          <text x="20" y="45" class="node-subtitle">Client dialogue &amp; discovery</text>
        </g>
      </a>

      <!-- [ROW 4 - RIGHT] Weekly audit (Exact Level with 4 — Code) -->
      <a :href="withBase('/guide/stage-triage#where-backlog-issues-come-from')" class="flow-node-link">
        <g class="flow-node node-audit" transform="translate(675, 416)">
          <rect width="230" height="58" rx="10" class="node-rect rect-audit" />
          <text x="18" y="22" class="node-title audit-title">⏱️ Weekly audit</text>
          <text x="18" y="42" class="node-subtitle">Scheduled in CI</text>
        </g>
      </a>

      <!-- [ROW 0 - RIGHT] Support ticketing tool (feeds Triage) -->
      <a :href="withBase('/guide/stage-triage#where-backlog-issues-come-from')" class="flow-node-link">
        <g class="flow-node node-audit" transform="translate(675, 30)">
          <rect width="230" height="56" rx="10" class="node-rect rect-audit" />
          <text x="18" y="24" class="node-title audit-title">🎧 Support tickets</text>
          <text x="18" y="44" class="node-subtitle">Support ticketing tool</text>
        </g>
      </a>

      <!-- [ROW 1] 1 — Triage -->
      <a :href="withBase('/guide/stage-triage')" class="flow-node-link">
        <g class="flow-node node-need" transform="translate(360, 116)">
          <rect width="280" height="58" rx="10" class="node-rect rect-yellow" />
          <text x="20" y="22" class="node-title yellow-title">🎯 1 — Triage</text>
          <text x="20" y="38" class="node-subtitle">Transcript analysis, business needs</text>
          <text x="20" y="51" class="node-subtitle">ranked &amp; logged as backlog issues</text>
        </g>
      </a>

      <!-- [LEFT] Deterministic Controls (below Persistent Context, feeding the same stages) -->
      <a :href="withBase('/guide/deterministic-controls')" class="flow-node-link">
        <g class="flow-node node-green" transform="translate(95, 311)">
          <rect width="230" height="62" rx="10" class="node-rect rect-green" />
          <text x="18" y="27" class="node-title green-title">🛡️ Deterministic Controls</text>
          <text x="18" y="47" class="node-subtitle green-desc">Guards, gates, contracts &amp; probes</text>
        </g>
      </a>

      <!-- [ROW 2 - LEFT] Persistent Context (Exact Level with 4 — Code) -->
      <a :href="withBase('/guide/persistent-context')" class="flow-node-link">
        <g class="flow-node node-green" transform="translate(95, 227)">
          <rect width="230" height="62" rx="10" class="node-rect rect-green" />
          <text x="18" y="24" class="node-title green-title">🧠 Persistent Context</text>
          <text x="18" y="41" class="node-subtitle green-desc">Instructions, prompts,</text>
          <text x="18" y="54" class="node-subtitle green-desc">skills &amp; agents primitives</text>
        </g>
      </a>

      <!-- [ROW 2 - CENTER] 2 — Think -->
      <a :href="withBase('/guide/stage-think')" class="flow-node-link">
        <g class="flow-node node-think" transform="translate(360, 204)">
          <rect width="280" height="62" rx="10" class="node-rect rect-pink" />
          <text x="20" y="24" class="node-title pink-title">💡 2 — Think</text>
          <text x="20" y="41" class="node-subtitle">Options exploration, trade-offs &amp;</text>
          <text x="20" y="54" class="node-subtitle">architectural decisions</text>
        </g>
      </a>

      <!-- [ROW 3 - CENTER] 3 — Plan -->
      <a :href="withBase('/guide/stage-plan')" class="flow-node-link">
        <g class="flow-node node-plan" transform="translate(360, 296)">
          <rect width="280" height="62" rx="10" class="node-rect rect-indigo" />
          <text x="20" y="24" class="node-title indigo-title">📋 3 — Plan</text>
          <text x="20" y="41" class="node-subtitle">Implementation breakdown, file scope &amp;</text>
          <text x="20" y="54" class="node-subtitle">boundary constraints</text>
        </g>
      </a>

      <!-- [ROW 3 - CENTER] 4 — Code (Autonomous Agent Core) -->
      <a :href="withBase('/guide/stage-code')" class="flow-node-link">
        <g class="flow-node node-core" transform="translate(360, 412)">
          <rect width="280" height="66" rx="10" class="node-rect rect-core" />
          <text x="20" y="26" class="node-title core-title">⚡ 4 — Code</text>
          <text x="20" y="44" class="node-subtitle">Fast autonomous loops,</text>
          <text x="20" y="57" class="node-subtitle">generate, test &amp; fix until green</text>
        </g>
      </a>

      <!-- [ROW 3 - RIGHT] The Forge (Exact Level with 3 — Plan) -->
      <a :href="withBase('/guide/forge')" class="flow-node-link">
        <g class="flow-node node-green" transform="translate(675, 294)">
          <rect width="230" height="66" rx="10" class="node-rect rect-green" />
          <text x="18" y="26" class="node-title green-title">📦 Forge</text>
          <text x="18" y="44" class="node-subtitle green-desc">Reusable code:</text>
          <text x="18" y="57" class="node-subtitle green-desc">functions, libraries, services</text>
        </g>
      </a>

      <!-- [ROW 4 - CENTER] 5 — Prove -->
      <a :href="withBase('/guide/stage-prove')" class="flow-node-link">
        <g class="flow-node node-proof" transform="translate(360, 508)">
          <rect width="280" height="62" rx="10" class="node-rect rect-cyan" />
          <text x="20" y="24" class="node-title cyan-title">✅ 5 — Prove</text>
          <text x="20" y="41" class="node-subtitle">Deterministic gate validation &amp;</text>
          <text x="20" y="54" class="node-subtitle">agent auto-remediation</text>
        </g>
      </a>

      <!-- [ROW 5 - CENTER] 6 — Release -->
      <a :href="withBase('/guide/stage-release')" class="flow-node-link">
        <g class="flow-node node-release" transform="translate(360, 600)">
          <rect width="280" height="56" rx="10" class="node-rect rect-blue" />
          <text x="20" y="21" class="node-title blue-title">🚀 6 — Release</text>
          <text x="20" y="36" class="node-subtitle">Automated deployment,</text>
          <text x="20" y="48" class="node-subtitle">reversible at any step</text>
        </g>
      </a>

      <!-- [ROW 6 - CENTER] 7 — Learn -->
      <a :href="withBase('/guide/stage-learn')" class="flow-node-link">
        <g class="flow-node node-learn" transform="translate(360, 686)">
          <rect width="280" height="58" rx="10" class="node-rect rect-gray" />
          <text x="20" y="22" class="node-title gray-title">📈 7 — Learn</text>
          <text x="20" y="38" class="node-subtitle">Telemetry analysis &amp;</text>
          <text x="20" y="51" class="node-subtitle">predictive monitoring</text>
        </g>
      </a>
    </svg>
  </div>
</template>

<script setup>
import { withBase } from 'vitepress'
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

.highlight-label {
  fill: #4f46e5;
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

.dark .highlight-label {
  fill: #a5b4fc;
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
  filter: drop-shadow(0 4px 16px rgba(249, 115, 22, 0.5));
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
  filter: drop-shadow(0 4px 16px rgba(14, 165, 233, 0.5));
}

.node-learn:hover .node-rect {
  filter: drop-shadow(0 4px 16px rgba(148, 163, 184, 0.5));
}

.node-green:hover .node-rect {
  filter: drop-shadow(0 4px 16px rgba(16, 185, 129, 0.55));
}
</style>
