<template>
  <div class="delivery-flowchart-container">
    <svg
      viewBox="0 0 1000 670"
      class="delivery-flowchart-svg"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Delivery Flowchart: From Business Meeting to Production Release"
    >
      <defs>
        <!-- Gradients -->
        <linearGradient id="flowBgCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1e1e2f" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#13131f" stop-opacity="0.98" />
        </linearGradient>

        <linearGradient id="flowCoreCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#241b3a" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#161226" stop-opacity="0.98" />
        </linearGradient>

        <linearGradient id="flowGreenCard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#064e3b" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#022c22" stop-opacity="0.65" />
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


      <!-- Loop 2: 6 — Learn back to Persistent Context (Inner Left) -->
      <path
        d="M 310 612 H 152 V 273"
        class="feedback-path green-feedback"
        marker-end="url(#flowArrowGreen)"
      />
      <rect x="77" y="470" width="150" height="18" rx="4" class="label-bg" />
      <text x="152" y="483" class="flow-label green-text">Enriches skills & ADRs</text>

      <!-- Loop 3: 6 — Learn back to Deterministic Controls (Outer Right) -->
      <path
        d="M 690 612 H 848 V 461"
        class="feedback-path green-feedback"
        marker-end="url(#flowArrowGreen)"
      />
      <rect x="778" y="515" width="140" height="18" rx="4" class="label-bg" />
      <text x="848" y="528" class="flow-label green-text">Hardens test suites</text>

      <!-- ============================================================== -->
      <!-- CONNECTIONS FROM GREEN BLOCKS INTO DELIVERY STAGES             -->
      <!-- ============================================================== -->

      <!-- Persistent Context -> 1 — Need (Smooth Diagonal Up) -->
      <path
        d="M 275 212 C 295 212, 290 145, 303 145"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />

      <!-- Persistent Context -> 2 — Plan (Direct Horizontal) -->
      <path
        d="M 275 230 H 303"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />

      <!-- Persistent Context -> 3 — Code (Smooth Diagonal Down) -->
      <path
        d="M 275 248 C 295 248, 290 320, 303 320"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />

      <!-- Persistent Context -> 4 — Proof (Route down left corridor) -->
      <path
        d="M 255 266 V 405 Q 255 415 268 415 H 303"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />

      <!-- The Forge -> 3 — Code (Direct Horizontal) -->
      <path
        d="M 725 329 H 697"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />

      <!-- The Forge -> 2 — Plan (Smooth Diagonal Up) -->
      <path
        d="M 725 310 C 705 310, 710 245, 697 245"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />

      <!-- Deterministic Controls -> 4 — Proof (Direct Horizontal) -->
      <path
        d="M 725 423 H 697"
        class="green-connector"
        marker-end="url(#flowArrowGreen)"
      />

      <!-- ============================================================== -->
      <!-- MAIN PIPELINE HIGHWAY (Straight Vertical Down the Center)      -->
      <!-- ============================================================== -->

      <!-- Meeting -> 1 — Need -->
      <path d="M 500 86 V 109" class="pipe-highway" marker-end="url(#flowArrowMain)" />

      <!-- 1 — Need -> 2 — Plan -->
      <path d="M 500 174 V 197" class="pipe-highway" marker-end="url(#flowArrowMain)" />

      <!-- 2 — Plan -> 3 — Code -->
      <path d="M 500 266 V 289" class="pipe-highway" marker-end="url(#flowArrowMain)" />

      <!-- 3 — Code -> 4 — Proof -->
      <path d="M 500 362 V 385" class="pipe-highway" marker-end="url(#flowArrowMain)" />

      <!-- 4 — Proof -> 5 — Release -->
      <path d="M 500 454 V 477" class="pipe-highway" marker-end="url(#flowArrowMain)" />

      <!-- 5 — Release -> 6 — Learn -->
      <path d="M 500 540 V 563" class="pipe-highway" marker-end="url(#flowArrowMain)" />

      <!-- ============================================================== -->
      <!-- INTERACTIVE CARDS & NODES                                      -->
      <!-- ============================================================== -->

      <!-- [ROW 0] Business Meeting (Origin) -->
      <g class="flow-node node-meeting" transform="translate(310, 30)">
        <rect width="380" height="56" rx="10" class="node-rect rect-meeting" />
        <text x="20" y="26" class="node-title">🎙️ Business Meeting</text>
        <text x="20" y="45" class="node-subtitle">Client dialogue &amp; discovery</text>
      </g>

      <!-- [ROW 1] 1 — Need -->
      <a href="./guide/layer-need" class="flow-node-link">
        <g class="flow-node node-standard" transform="translate(310, 116)">
          <rect width="380" height="58" rx="10" class="node-rect rect-purple" />
          <text x="20" y="26" class="node-title">1 — Need</text>
          <text x="20" y="46" class="node-subtitle">Real-time transcription &amp; opportunity ranking</text>
        </g>
      </a>

      <!-- [ROW 2 - LEFT] Persistent Context (Exact Level with 2 — Plan) -->
      <a href="./guide/context-layer" class="flow-node-link">
        <g class="flow-node node-green" transform="translate(30, 204)">
          <rect width="245" height="62" rx="10" class="node-rect rect-green" />
          <text x="18" y="27" class="node-title green-title">🧠 Persistent Context</text>
          <text x="18" y="47" class="node-subtitle green-desc">Instructions, skills, specs &amp; ADRs</text>
        </g>
      </a>

      <!-- [ROW 2 - CENTER] 2 — Plan -->
      <a href="./guide/layer-plan" class="flow-node-link">
        <g class="flow-node node-standard" transform="translate(310, 204)">
          <rect width="380" height="62" rx="10" class="node-rect rect-purple" />
          <text x="20" y="27" class="node-title">2 — Plan</text>
          <text x="20" y="47" class="node-subtitle">Implementation breakdown, file scope &amp; boundary constraints</text>
        </g>
      </a>

      <!-- [ROW 3 - CENTER] 3 — Code (Autonomous Agent Core) -->
      <a href="./guide/layer-code" class="flow-node-link">
        <g class="flow-node node-core" transform="translate(310, 296)">
          <rect width="380" height="66" rx="10" class="node-rect rect-core" />
          <text x="20" y="28" class="node-title core-title">3 — Code</text>
          <text x="20" y="50" class="node-subtitle">Application logic, test generation &amp; local self-healing</text>
        </g>
      </a>

      <!-- [ROW 3 - RIGHT] The Forge (Exact Level with 3 — Code) -->
      <a href="./guide/layer-plan#reusable-assets-the-enterprise-forge" class="flow-node-link">
        <g class="flow-node node-green" transform="translate(725, 296)">
          <rect width="245" height="66" rx="10" class="node-rect rect-green" />
          <text x="18" y="28" class="node-title green-title">📦 The Forge</text>
          <text x="18" y="49" class="node-subtitle green-desc">Reusable code &amp; services</text>
        </g>
      </a>

      <!-- [ROW 4 - CENTER] 4 — Proof -->
      <a href="./guide/layer-proof" class="flow-node-link">
        <g class="flow-node node-standard" transform="translate(310, 392)">
          <rect width="380" height="62" rx="10" class="node-rect rect-purple" />
          <text x="20" y="27" class="node-title">4 — Proof</text>
          <text x="20" y="47" class="node-subtitle">Deterministic gate validation &amp; LLM self-repair in CI</text>
        </g>
      </a>

      <!-- [ROW 4 - RIGHT] Deterministic Controls (Exact Level with 4 — Proof) -->
      <a href="./guide/guardrails" class="flow-node-link">
        <g class="flow-node node-green" transform="translate(725, 392)">
          <rect width="245" height="62" rx="10" class="node-rect rect-green" />
          <text x="18" y="27" class="node-title green-title">🛡️ Deterministic Controls</text>
          <text x="18" y="47" class="node-subtitle green-desc">Testbeds, linters, contracts &amp; mutation</text>
        </g>
      </a>

      <!-- [ROW 5 - CENTER] 5 — Release -->
      <a href="./guide/layer-release" class="flow-node-link">
        <g class="flow-node node-standard" transform="translate(310, 484)">
          <rect width="380" height="56" rx="10" class="node-rect rect-blue" />
          <text x="20" y="26" class="node-title blue-title">5 — Release</text>
          <text x="20" y="44" class="node-subtitle">Progressive canary rollout &amp; feature flag activation</text>
        </g>
      </a>

      <!-- [ROW 6 - CENTER] 6 — Learn -->
      <a href="./guide/layer-learn" class="flow-node-link">
        <g class="flow-node node-standard" transform="translate(310, 570)">
          <rect width="380" height="58" rx="10" class="node-rect rect-purple" />
          <text x="20" y="26" class="node-title">6 — Learn</text>
          <text x="20" y="46" class="node-subtitle">Production telemetry analysis &amp; outcome validation</text>
        </g>
      </a>
    </svg>
  </div>
</template>

<style scoped>
.delivery-flowchart-container {
  width: 100%;
  max-width: 1060px;
  margin: 28px auto;
  padding: 20px 14px;
  background: #0d1117;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
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
.label-bg {
  fill: #0b0f19;
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 0.8px;
}

.flow-label {
  font-family: var(--vp-font-family-base, system-ui, -apple-system, sans-serif);
  font-size: 9.5px;
  font-weight: 600;
  fill: #94a3b8;
  text-anchor: middle;
  dominant-baseline: middle;
}

.highlight-label {
  fill: #a5b4fc;
}

.green-text {
  fill: #34d399;
}

/* Card Rectangles */
.node-rect {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.rect-meeting {
  fill: url(#flowBgCard);
  stroke: #f59e0b;
  stroke-width: 1.8px;
}

.rect-purple {
  fill: url(#flowBgCard);
  stroke: #6366f1;
  stroke-width: 1.8px;
}

.rect-blue {
  fill: url(#flowBgCard);
  stroke: #0ea5e9;
  stroke-width: 1.8px;
}

.rect-core {
  fill: url(#flowCoreCard);
  stroke: url(#flowCoreBorder);
  stroke-width: 2.4px;
  filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.35));
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

.core-title {
  fill: #f3e8ff;
}

.green-title {
  fill: #ecfdf5;
}

.blue-title {
  fill: #f0f9ff;
}

.node-subtitle {
  font-family: var(--vp-font-family-base, system-ui, -apple-system, sans-serif);
  font-size: 11px;
  font-weight: 500;
  fill: #cbd5e1;
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

.node-green:hover .node-rect {
  filter: drop-shadow(0 4px 16px rgba(16, 185, 129, 0.55));
}

.node-core:hover .node-rect {
  filter: drop-shadow(0 4px 20px rgba(168, 85, 247, 0.65));
}
</style>
