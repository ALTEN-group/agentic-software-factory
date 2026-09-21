<template>
  <div class="factory-console-root">
    <!-- Ambient Cyber Glow Backdrop -->
    <div class="console-ambient-glow" />

    <!-- Main Holographic Factory Unit -->
    <div class="factory-unit">
      <!-- Upper Telemetry Bar -->
      <div class="unit-header">
        <div class="status-indicator">
          <span class="pulse-dot" />
          <span class="status-label">AUTONOMOUS FACTORY</span>
        </div>
      </div>

      <!-- Central Kinetic Foundry Chamber -->
      <div class="foundry-chamber">
        <!-- SVG Vector Assembly Stage -->
        <svg
          class="stage-svg"
          viewBox="0 0 340 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="neonLaser" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#38BDF8" />
              <stop offset="100%" stop-color="#2563EB" />
            </linearGradient>
            <linearGradient id="crystalGrad" x1="120" y1="50" x2="220" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#60A5FA" stop-opacity="0.9" />
              <stop offset="45%" stop-color="#2563EB" stop-opacity="0.85" />
              <stop offset="100%" stop-color="#1E3A8A" stop-opacity="0.95" />
            </linearGradient>
            <linearGradient id="gridBeam" x1="0" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#38BDF8" stop-opacity="0" />
              <stop offset="50%" stop-color="#38BDF8" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#38BDF8" stop-opacity="0" />
            </linearGradient>
            <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="coreGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- Isometric Foundation Grid -->
          <g class="isometric-grid" stroke="#3B82F6" stroke-opacity="0.22" stroke-width="1">
            <line x1="30" y1="180" x2="170" y2="235" />
            <line x1="70" y1="160" x2="210" y2="215" />
            <line x1="110" y1="140" x2="250" y2="195" />
            <line x1="150" y1="120" x2="290" y2="175" />
            
            <line x1="310" y1="180" x2="170" y2="235" />
            <line x1="270" y1="160" x2="130" y2="215" />
            <line x1="230" y1="140" x2="90" y2="195" />
            <line x1="190" y1="120" x2="50" y2="175" />
          </g>

          <!-- Input Conduits (Left: Client Meeting Dialogue & Audio Intake) -->
          <g class="intake-module" transform="translate(14, 75)">
            <rect x="0" y="0" width="42" height="70" rx="6" fill="#0F172A" stroke="#38BDF8" stroke-opacity="0.4" stroke-width="1.2" />
            <!-- Animated Equalizer Bars -->
            <line class="eq-bar bar-1" x1="12" y1="58" x2="12" y2="22" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" />
            <line class="eq-bar bar-2" x1="21" y1="58" x2="21" y2="14" stroke="#60A5FA" stroke-width="2.5" stroke-linecap="round" />
            <line class="eq-bar bar-3" x1="30" y1="58" x2="30" y2="30" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" />
            <text x="21" y="66" fill="#93C5FD" font-size="5.8" font-family="monospace" font-weight="600" letter-spacing="0.04em" text-anchor="middle">MEETING</text>
          </g>

          <!-- Connection Conduit: Intake to Core -->
          <path class="stream-line" d="M56 110 H88" stroke="url(#neonLaser)" stroke-width="2" stroke-dasharray="4 3" />

          <!-- Central Fabricating Chamber: Multi-Agent Code Generation Studio -->
          <g class="fabrication-core">
            <!-- Shadow Glow Base -->
            <ellipse cx="170" cy="186" rx="65" ry="14" fill="#1E3A8A" fill-opacity="0.3" filter="url(#coreGlow)" />

            <!-- Holographic Code Editor Window (Hovering) -->
            <g class="code-editor-window">
              <!-- Window Chrome Backdrop -->
              <rect x="88" y="44" width="164" height="132" rx="8" fill="#0A0F1D" stroke="#38BDF8" stroke-opacity="0.55" stroke-width="1.2" filter="url(#laserGlow)" />
              <rect x="88" y="44" width="164" height="132" rx="8" fill="#0A0F1D" fill-opacity="0.92" />

              <!-- Window Header -->
              <rect x="88" y="44" width="164" height="20" rx="8" fill="#0F172A" />
              <!-- Window Controls Dots -->
              <circle cx="98" cy="54" r="2.5" fill="#EF4444" />
              <circle cx="105" cy="54" r="2.5" fill="#F59E0B" />
              <circle cx="112" cy="54" r="2.5" fill="#10B981" />

              <!-- Tab File Title -->
              <text x="145" y="57" fill="#94A3B8" font-size="7" font-family="ui-monospace, monospace" font-weight="600">service.agent.ts</text>
              <rect x="208" y="49" width="38" height="10" rx="3" fill="#1E3A8A" fill-opacity="0.6" stroke="#38BDF8" stroke-width="0.7" />
              <text x="227" y="56.5" fill="#38BDF8" font-size="5.5" font-family="ui-monospace, monospace" font-weight="700" text-anchor="middle">AI BUILD</text>

              <!-- Code Lines with Syntax Coloring -->
              <!-- Gutter Line Numbers -->
              <g fill="#475569" font-size="6" font-family="ui-monospace, monospace">
                <text x="96" y="74">01</text>
                <text x="96" y="86">02</text>
                <text x="96" y="98">03</text>
                <text x="96" y="110">04</text>
                <text x="96" y="122">05</text>
                <text x="96" y="134">06</text>
              </g>

              <!-- Code Content Lines -->
              <g font-size="6.2" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace">
                <!-- Line 01: Comment -->
                <text x="108" y="74" fill="#64748B">// Autonomous AI generation</text>
                
                <!-- Line 02: const code = await ai.build(spec) -->
                <text x="108" y="86" class="code-line line-gen">
                  <tspan fill="#60A5FA" font-weight="700">const </tspan>
                  <tspan fill="#E2E8F0">code </tspan>
                  <tspan fill="#38BDF8">= </tspan>
                  <tspan fill="#93C5FD">await </tspan>
                  <tspan fill="#FBBF24">ai.build</tspan>
                  <tspan fill="#94A3B8">(</tspan><tspan fill="#34D399">spec</tspan><tspan fill="#94A3B8">)</tspan>
                </text>

                <!-- Line 03: const tests = await ai.genTests(code) -->
                <text x="108" y="98" class="code-line line-test">
                  <tspan fill="#60A5FA" font-weight="700">const </tspan>
                  <tspan fill="#E2E8F0">tests </tspan>
                  <tspan fill="#38BDF8">= </tspan>
                  <tspan fill="#93C5FD">await </tspan>
                  <tspan fill="#FBBF24">ai.genTests</tspan>
                  <tspan fill="#94A3B8">(</tspan><tspan fill="#E2E8F0">code</tspan><tspan fill="#94A3B8">)</tspan>
                </text>

                <!-- Line 04: await harness.verify(tests) -->
                <text x="108" y="110" class="code-line line-verify">
                  <tspan fill="#93C5FD">await </tspan>
                  <tspan fill="#34D399">harness</tspan>
                  <tspan fill="#94A3B8">.</tspan>
                  <tspan fill="#FBBF24">autoValidate</tspan>
                  <tspan fill="#94A3B8">(</tspan><tspan fill="#34D399">100%</tspan><tspan fill="#94A3B8">)</tspan>
                </text>

                <!-- Line 05: export default verifiedPR -->
                <text x="108" y="122" class="code-line line-export">
                  <tspan fill="#60A5FA" font-weight="700">export default </tspan>
                  <tspan fill="#34D399" font-weight="600">verifiedPR</tspan>
                  <tspan fill="#94A3B8">;</tspan>
                </text>

                <!-- Line 06: Active typing cursor line -->
                <text x="108" y="134" fill="#38BDF8">
                  <tspan fill="#38BDF8">&gt; </tspan>
                  <tspan fill="#93C5FD">selfHeal.ready()</tspan>
                </text>
                <!-- Blinking Code Cursor -->
                <rect class="code-cursor-rect" x="178" y="127" width="4.5" height="8" fill="#38BDF8" />
              </g>

              <!-- Footer Verification Strip Inside Window -->
              <rect x="88" y="152" width="164" height="24" rx="6" fill="#0F172A" stroke="#3B82F6" stroke-opacity="0.25" stroke-width="0.8" />
              <circle cx="100" cy="164" r="3" fill="#10B981" />
              <text x="108" y="166.5" fill="#34D399" font-size="5.8" font-family="ui-monospace, monospace" font-weight="700">ALL CHECKS PASSED</text>
              <text x="205" y="166.5" fill="#38BDF8" font-size="5.5" font-family="ui-monospace, monospace" font-weight="600">0 ERRORS</text>
            </g>

            <!-- Autonomous AI Agents Floating Above/Around Window -->
            <!-- Agent 1: Synthesis Agent (Left) -->
            <g class="agent-node agent-builder">
              <circle cx="78" cy="40" r="12" fill="#0F172A" stroke="#38BDF8" stroke-width="1.8" filter="url(#laserGlow)" />
              <text x="78" y="44" font-size="11" text-anchor="middle">🤖</text>
              <!-- Focused Laser Beam directly typing into Line 02 -->
              <path class="laser-beam beam-builder" d="M86 46 L130 84" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round" filter="url(#laserGlow)" />
            </g>

            <!-- Agent 2: Test & Auto-Validation Agent (Right) -->
            <g class="agent-node agent-tester">
              <circle cx="262" cy="40" r="12" fill="#0F172A" stroke="#34D399" stroke-width="1.8" filter="url(#laserGlow)" />
              <text x="262" y="44" font-size="11" text-anchor="middle">🛡️</text>
              <!-- Focused Laser Beam verifying Line 04 -->
              <path class="laser-beam beam-tester" d="M254 46 L205 108" stroke="#34D399" stroke-width="1.8" stroke-linecap="round" filter="url(#laserGlow)" />
            </g>
          </g>

          <!-- Connection Conduit: Core to Proof Gate -->
          <path class="stream-line" d="M252 110 H280" stroke="url(#neonLaser)" stroke-width="2" stroke-dasharray="4 3" />

          <!-- Output Module (Right: Deterministic Proof & Release Gate) -->
          <g class="proof-gate" transform="translate(280, 75)">
            <rect x="0" y="0" width="42" height="70" rx="6" fill="#0F172A" stroke="#10B981" stroke-opacity="0.6" stroke-width="1.2" />
            <!-- Hexagonal Verification Seal -->
            <polygon class="proof-hex" points="21,18 32,24 32,38 21,44 10,38 10,24" fill="#065F46" fill-opacity="0.4" stroke="#10B981" stroke-width="1.8" />
            <path d="M16 31 L20 35 L27 27" stroke="#34D399" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
            <text x="21" y="56" fill="#34D399" font-size="6.5" font-family="monospace" text-anchor="middle">PROOF</text>
            <text x="21" y="65" fill="#94A3B8" font-size="5" font-family="monospace" text-anchor="middle">VERIFIED</text>
          </g>

          <!-- Autonomous Pipeline Pulse Particle -->
          <circle class="pipeline-runner" r="3.5" fill="#38BDF8" filter="url(#laserGlow)" />
        </svg>
      </div>

      <!-- Bottom Pipeline Stream Ticker -->
      <div class="pipeline-ticker">
        <div class="ticker-step step-need">
          <span class="step-num">L1</span>
          <span class="step-name">NEED</span>
        </div>
        <div class="ticker-arrow">→</div>
        <div class="ticker-step step-spec">
          <span class="step-num">L2</span>
          <span class="step-name">SPEC</span>
        </div>
        <div class="ticker-arrow">→</div>
        <div class="ticker-step step-build active">
          <span class="step-num">L3</span>
          <span class="step-name">BUILD</span>
        </div>
        <div class="ticker-arrow">→</div>
        <div class="ticker-step step-proof verified">
          <span class="step-num">L4</span>
          <span class="step-name">PROOF</span>
        </div>
        <div class="ticker-arrow">→</div>
        <div class="ticker-step step-release">
          <span class="step-num">L5</span>
          <span class="step-name">RELEASE</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.factory-console-root {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 440px;
  min-height: 340px;
  margin: 0 auto;
  user-select: none;
}

/* Cyber Ambient Glow */
.console-ambient-glow {
  position: absolute;
  width: 320px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(37, 99, 235, 0.35) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 75%);
  filter: blur(48px);
  z-index: 0;
  pointer-events: none;
}

/* Outer High-Tech Chassis */
.factory-unit {
  position: relative;
  z-index: 1;
  width: 100%;
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 58, 138, 0.3) 100%);
  border: 1px solid rgba(59, 130, 246, 0.35);
  border-radius: 16px;
  box-shadow: 0 16px 40px -10px rgba(15, 23, 42, 0.7), 0 0 24px -4px rgba(37, 99, 235, 0.25);
  backdrop-filter: blur(12px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Header Telemetry */
.unit-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(15, 23, 42, 0.6);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: dot-pulse 1.8s infinite;
}

.status-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #93c5fd;
}

/* Foundry Chamber Stage */
.foundry-chamber {
  position: relative;
  width: 100%;
  padding: 8px 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stage-svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

/* Equalizer Bars Animations */
.eq-bar {
  animation: eq-bounce 1.4s ease-in-out infinite alternate;
}
.bar-1 { animation-delay: 0.1s; }
.bar-2 { animation-delay: 0.4s; }
.bar-3 { animation-delay: 0.25s; }

@keyframes eq-bounce {
  0% { transform: scaleY(0.4); transform-origin: 18px 58px; }
  100% { transform: scaleY(1.15); transform-origin: 18px 58px; }
}

/* Floating Code Editor Window */
.code-editor-window {
  animation: window-float 4.5s ease-in-out infinite;
  transform-origin: 170px 110px;
}

@keyframes window-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

/* Typing Cursor Blinking */
.code-cursor-rect {
  animation: cursor-blink 0.85s step-start infinite;
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* AI Agents Floating */
.agent-node {
  animation: agent-float 3.2s ease-in-out infinite alternate;
}

.agent-builder {
  animation-delay: 0s;
  transform-origin: 78px 40px;
}

.agent-tester {
  animation-delay: 1.2s;
  transform-origin: 262px 40px;
}

@keyframes agent-float {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-5px); }
}

/* Agentic Laser Beams */
.laser-beam {
  animation: laser-pulse 1.8s ease-in-out infinite alternate;
}

.beam-builder { animation-delay: 0.1s; }
.beam-tester { animation-delay: 0.9s; }

@keyframes laser-pulse {
  0% { stroke-opacity: 0.3; stroke-width: 1.2; }
  100% { stroke-opacity: 1; stroke-width: 2.2; }
}

/* Proof Hex Seal */
.proof-hex {
  animation: hex-breathe 3s ease-in-out infinite;
}

@keyframes hex-breathe {
  0%, 100% { filter: drop-shadow(0 0 2px rgba(16, 185, 129, 0.4)); }
  50% { filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.9)); }
}

/* Conveyor Light Runner */
.pipeline-runner {
  animation: runner-path 4.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

@keyframes runner-path {
  0% { cx: 56px; cy: 110px; opacity: 0; }
  12% { opacity: 1; }
  35% { cx: 88px; cy: 110px; }
  68% { cx: 252px; cy: 110px; }
  85% { opacity: 1; }
  100% { cx: 280px; cy: 110px; opacity: 0; }
}

/* Pipeline Status Ticker Footer */
.pipeline-ticker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: rgba(15, 23, 42, 0.8);
  border-top: 1px solid rgba(59, 130, 246, 0.2);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.ticker-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.step-num {
  font-size: 8px;
  font-weight: 700;
  transition: color 0.2s ease;
}

.step-name {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.05em;
  transition: color 0.2s ease;
}

/* L1 NEED: Warm Amber / Discovery */
.ticker-step.step-need .step-num { color: #f59e0b; }
.ticker-step.step-need .step-name { color: #fbbf24; }

/* L2 SPEC: Electric Indigo / Specification */
.ticker-step.step-spec .step-num { color: #818cf8; }
.ticker-step.step-spec .step-name { color: #a5b4fc; }

/* L3 BUILD: Cyan / Autonomous Execution */
.ticker-step.step-build .step-num { color: #38bdf8; }
.ticker-step.step-build .step-name { color: #38bdf8; text-shadow: 0 0 6px rgba(56, 189, 248, 0.6); }

/* L4 PROOF: Emerald / Deterministic Verification */
.ticker-step.step-proof .step-num { color: #34d399; }
.ticker-step.step-proof .step-name { color: #34d399; }

/* L5 RELEASE: Violet-Fuchsia / Production Rollout */
.ticker-step.step-release .step-num { color: #c084fc; }
.ticker-step.step-release .step-name { color: #e879f9; }

.ticker-arrow {
  font-size: 9px;
  color: #64748b;
  opacity: 0.6;
}

@keyframes dot-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

@media (max-width: 640px) {
  .factory-console-root {
    max-width: 330px;
    transform: scale(0.92);
  }
}
</style>
