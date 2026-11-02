<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useData } from 'vitepress';
import { Player, Quality } from '@1pizzateam/loopr';
import { Mat4x3, NumArray, Rect, Trigo, Utils, Vec2, Vec3 } from '@1pizzateam/spock';
import { Node as RoostRNode } from '@1pizzateam/roostr';

const { lang } = useData();
const isFr = computed(() => lang.value === 'fr');

const BOARD_ICON_PATH =
  'M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM1.5 6.5v7.75c0 .138.112.25.25.25H5v-8Zm5 8h7.75a.25.25 0 0 0 .25-.25V6.5H6.5Zm8-9.5V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25V5Z';

const VIEW_TABS = [
  {
    name: 'Backlog',
    active: true,
    caret: true,
    iconPath:
      'M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h7.75a.25.25 0 0 0 .25-.25V6.5Zm8-1.5V1.75a.25.25 0 0 0-.25-.25H6.5V5Zm-9.5 9.5v-8H1.5v7.75c0 .138.112.25.25.25ZM1.5 5H5V1.5H1.75a.25.25 0 0 0-.25.25Z',
  },
  {
    name: 'Priority board',
    iconPath:
      'M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM1.5 1.75v12.5c0 .138.112.25.25.25H5v-13H1.75a.25.25 0 0 0-.25.25ZM6.5 14.5h3v-13h-3Zm4.5 0h3.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H11Z',
  },
  { name: 'Team items', iconPath: BOARD_ICON_PATH },
  {
    name: 'Roadmap',
    iconPath:
      'M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0ZM1.5 1.75v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25ZM4 4.75A.75.75 0 0 1 4.75 4h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 4 4.75Zm2 3.5A.75.75 0 0 1 6.75 7.5h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 6 8.25Zm-1.25 2.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z',
  },
  { name: 'My items', iconPath: BOARD_ICON_PATH },
];

const COLUMNS = [
  {
    id: 'triage',
    name: 'Triage',
    color: '#d29922',
    ringBg: 'rgba(210, 153, 34, 0.15)',
  },
  {
    id: 'think',
    name: 'Think',
    color: '#db61a2',
    ringBg: 'rgba(219, 97, 162, 0.15)',
    workflow: 'Pipeline - Think',
    isFifo: false,
  },
  {
    id: 'plan',
    name: 'Plan',
    color: '#2f81f7',
    ringBg: 'rgba(47, 129, 247, 0.15)',
    workflow: 'Pipeline - Plan',
    isFifo: false,
  },
  {
    id: 'code',
    name: 'Code',
    color: '#8957e5',
    ringBg: 'rgba(137, 87, 229, 0.15)',
    workflow: 'Pipeline - Code',
    isFifo: true,
  },
  {
    id: 'prove',
    name: 'Prove',
    color: '#da3633',
    ringBg: 'rgba(218, 54, 51, 0.15)',
    workflow: 'Pipeline - Prove',
    isFifo: true,
  },
  {
    id: 'release',
    name: 'Release',
    color: '#db6d28',
    ringBg: 'rgba(219, 109, 40, 0.15)',
    workflow: 'Pipeline - Release',
    isFifo: true,
  },
  {
    id: 'done',
    name: 'Done',
    color: '#3fb950',
    ringBg: 'rgba(63, 185, 80, 0.15)',
  },
];

// Derive workflow stages directly from COLUMNS (single source of truth)
const WORKFLOW_STAGES = COLUMNS.map((col, colIndex) => ({
  colIndex,
  id: col.id,
  name: col.workflow,
  color: col.color,
  isFifo: Boolean(col.isFifo),
})).filter((st) => Boolean(st.name));

const INITIAL_TICKETS = [
  {
    id: 'spock-35',
    repo: 'Spock.js',
    number: '#35',
    title: 'Add RightTriangle class with hypotenuse projection and raycast collision methods',
    priority: 'High',
    releaseTag: 'v4.5.0',
    prNumber: '#36',
    thinkContent: 'Ray hit invariants',
    planContent: 'right-triangle.ts',
    costs: {
      think: 0.05,
      plan: 0.07,
      code: 0.18,
      prove: 0.09,
      release: 0.03,
    },
    steps: {
      think: ['Analyzing 2D geometry scope...', '# Think: spec & ray hit invariants ✓'],
      plan: ['Mapping src/shapes/right-triangle.ts...', '# Plan: steps & Jest suite validated ✓'],
      code: ['Code agent + running Jest...', 'PR #36 opened · 100% coverage ✓'],
      prove: ['Prove agent & deterministic gates...', 'Code review & CI checks green ✓'],
      release: ['Squash-merging & building release...', 'Squash-merged · npm v4.5.0 published ✓'],
    },
  },
  {
    id: 'loopr-14',
    repo: 'LoopR.js',
    number: '#14',
    title: 'Add adaptive resolution Quality scaler based on rolling FPS window and delta-time clock',
    priority: 'High',
    releaseTag: 'v2.2.0',
    prNumber: '#15',
    thinkContent: 'FPS hysteresis spec',
    planContent: 'src/quality.ts + Jest',
    proveFailContent: 'FPS spike assertion',
    proveFixContent: 'FPS spike test fixed',
    maxProveFailures: 1,
    costs: {
      think: 0.06,
      plan: 0.08,
      code: 0.21,
      proveFail: 0.08,
      codeFix: 0.11,
      prove: 0.09,
      release: 0.03,
    },
    steps: {
      think: ['Defining frame-time thresholds...', '# Think: hysteresis & scale ceiling ✓'],
      plan: ['Planning src/quality.ts & exports...', '# Plan: unit tests & docs verified ✓'],
      code: ['Code agent implementing Quality...', 'PR #15 opened · all checks green ✓'],
      prove: ['Independent Prove validation...', 'Code review & CI checks green ✓'],
      release: ['Squash-merging & building release...', 'Squash-merged · npm v2.2.0 published ✓'],
    },
  },
  {
    id: 'roostr-28',
    repo: 'RoostR.js',
    number: '#28',
    title: 'Compute world bounding spheres and normal matrices across nested 3D scene nodes',
    priority: 'Medium',
    releaseTag: 'v0.9.0',
    prNumber: '#29',
    thinkContent: 'World bounds & dirty',
    planContent: 'src/scene/node.ts',
    costs: {
      think: 0.05,
      plan: 0.06,
      code: 0.16,
      prove: 0.08,
      release: 0.03,
    },
    steps: {
      think: ['Inspecting SceneGraph dirty flags...', '# Think: world matrix stamp spec ✓'],
      plan: ['Planning src/scene/node.ts updates...', '# Plan: frustum & bounds tests ready ✓'],
      code: ['Code agent updating 3D Node...', 'PR #29 opened · WebGL suite passed ✓'],
      prove: ['Prove agent & release-readiness...', 'Code review & CI checks green ✓'],
      release: ['Squash-merging & building release...', 'Squash-merged · npm v0.9.0 published ✓'],
    },
  },
  {
    id: 'bumpr-19',
    repo: 'BumpR.js',
    number: '#19',
    title: 'Support custom collision filter callbacks for spatial grid queries and scene raycasting',
    priority: 'Medium',
    releaseTag: 'v1.2.0',
    prNumber: '#20',
    thinkContent: 'Zero-alloc filter API',
    planContent: 'src/scene.ts + CCD',
    proveFailContent: 'Null filter crash',
    proveFail2Content: 'CCD raycast bounds fail',
    proveFixContent: 'Filter guard verified',
    maxProveFailures: 2,
    costs: {
      think: 0.05,
      plan: 0.07,
      code: 0.19,
      proveFail: 0.07,
      codeFix: 0.09,
      proveFail2: 0.08,
      prove: 0.08,
      release: 0.03,
    },
    steps: {
      think: ['Specifying zero-alloc filter API...', '# Think: spatial query predicate ✓'],
      plan: ['Planning src/scene.ts & raycast...', '# Plan: CCD & triangle tests defined ✓'],
      code: ['Code agent coding spatial filter...', 'PR #20 opened · zero-alloc verified ✓'],
      prove: ['Prove agent & tarball dry-run...', 'Code review & CI checks green ✓'],
      release: ['Squash-merging & building release...', 'Squash-merged · npm v1.2.0 published ✓'],
    },
  },
  {
    id: 'DoomR-2',
    repo: 'DoomR.js',
    number: '#2',
    title: 'when we enter a secret room there is a sfx playing. The sfx should play when we open the secret door instead',
    priority: 'High',
    releaseTag: 'main',
    prNumber: '#12',
    thinkContent: 'Door open SFX state',
    planContent: 'door audio + sim.test',
    costs: {
      think: 0.04,
      plan: 0.05,
      code: 0.12,
      prove: 0.06,
      release: 0.02,
    },
    steps: {
      think: ['Tracing secret room trigger event...', '# Think: move SFX to door open state ✓'],
      plan: ['Planning door audio hook & sim test...', '# Plan: levels.test & sim.test scope ✓'],
      code: ['Code agent updating door SFX...', 'PR #12 opened · sim tests passing ✓'],
      prove: ['Prove agent verifying audio event...', 'Code review & CI checks green ✓'],
      release: ['Squash-merging & deploying main...', 'Squash-merged to main ✓'],
    },
  },
];

// Stage timing configuration (in seconds)
// Think & Plan run in parallel across all triggered tickets;
// Code -> Prove -> Release shares a single FIFO delivery lock (1 ticket at a time until Done).
const STAGE_DURATIONS = {
  triageWait: 0.4,
  think: 1.8,
  plan: 1.8,
  code: 1.8,
  prove: 1.8,
  release: 1.8,
};
const FLIGHT_DURATION = 0.58;
const SPAWN_STAGGER = 0.36; // Issues enter Triage 1 by 1 at the start of the cycle
const TICKET_STAGGER = 0.45; // Stagger so all 5 tickets visibly progress in parallel across Think & Plan

const CARD_HEIGHT = 170;
const CARD_GAP = 8;
const CARD_STRIDE = CARD_HEIGHT + CARD_GAP;
const COL_HEADER_OFFSET = 35;

const showcaseRootRef = ref(null);
const boardGridRef = ref(null);
const colElements = ref([]);

const isPlaying = ref(true);
const userPaused = ref(false);
const speedMultiplier = ref(1);
const prefersReducedMotion = ref(false);

// Non-reactive simulation clock counters (avoids unnecessary Vue dependency tracking on every frame)
let elapsedCycleTime = 0;
let pauseHoldTimer = 0;

// Spock geometric primitives & scratch buffers (zero per-frame heap allocations)
const scratchVec2A = new Vec2();
const scratchVec2B = new Vec2();
const scratchP0 = new Vec3();
const scratchP1 = new Vec3();
const scratchP2 = new Vec3();
const scratchP3 = new Vec3();
const scratchPos3D = new Vec3();
const scratchTangent3D = new Vec3();
const scratchRot3D = new Vec3();
const scratchScale3D = new Vec3(1, 1, 1);
const scratchWorldPos = new Vec3();
const scratchColOrigin = new Vec3();

// RoostR 3D SceneGraph matrix stack & Node hierarchy for column anchors and card spatial transforms
const boardSceneGraph = {
  model: [new Mat4x3().identity()],
  nbModel: 1,
  modelStackTop: 0,
  pushModelMatrix(modelMatrix) {
    this.modelStackTop++;
    if (this.modelStackTop === this.nbModel) {
      this.model.push(new Mat4x3());
      this.nbModel++;
    }
    this.model[this.modelStackTop].copy(modelMatrix);
  },
  popModelMatrix() {
    if (this.modelStackTop > 0) this.modelStackTop--;
  },
  getWorldMatrix() {
    return this.model[this.modelStackTop];
  },
};
const rootBoardNode = new RoostRNode();

const colRects = COLUMNS.map((_, idx) => {
  const width = 180;
  const x = idx * 190;
  return new Rect(
    scratchVec2A.setScalar(width, 955),
    scratchVec2B.setScalar(x + width * 0.5, COL_HEADER_OFFSET + 477.5)
  );
});

const colNodes = COLUMNS.map((_, idx) => {
  const node = new RoostRNode();
  node.setPosition(scratchPos3D.setScalar(colRects[idx].topLeftCorner.x, COL_HEADER_OFFSET, 0));
  rootBoardNode.addChild(node);
  return node;
});

const cardNodes = INITIAL_TICKETS.map(() => {
  const node = new RoostRNode();
  rootBoardNode.addChild(node);
  return node;
});
rootBoardNode.computeWorldMatrix(boardSceneGraph);

const colWidths = reactive(COLUMNS.map(() => 180));
const columnCounts = reactive([0, 0, 0, 0, 0, 0, 0]);
const totalRunningWorkflows = ref(0);
const totalCycleCostText = ref('$0.00');

const activeWorkflows = reactive(
  WORKFLOW_STAGES.map((st) => ({
    ...st,
    baseColor: st.color,
    isFailing: false,
    modeLabel: st.isFifo ? 'FIFO' : 'PARALLEL',
    runningCount: 0,
    queuedCount: 0,
    activeTicket: null,
    progress: 0,
    progressPct: '0%',
  }))
);

const tickets = reactive(
  INITIAL_TICKETS.map((t, index) => ({
    ...t,
    index,
    spawned: false,
    spawnTime: 0.08 + index * SPAWN_STAGGER,
    colIndex: 0, // 0: triage, 1: think, 2: plan, 3: code, 4: prove, 5: release, 6: done
    targetColIndex: 0,
    inFlight: false,
    flightProgress: 0,
    stageTimer: 0,
    stageProgress: 0,
    hasTriggerLabel: false,
    triggerTime: 1.85 + index * TICKET_STAGGER,
    planCompletedAt: 0,
    maxProveFailures: t.maxProveFailures || 0,
    proveFailCount: 0,
    proveFailedOnce: false,
    isProveFailing: false,
    isStoppedForDev: false,
    proveFailTimer: 0,
    shakeOffsetX: 0,
    // Spatial coordinates & slot targets (px) driven by RoostR & Spock
    slotX: 0,
    slotY: COL_HEADER_OFFSET + index * CARD_STRIDE,
    x: 0,
    y: COL_HEADER_OFFSET + index * CARD_STRIDE,
    fromX: 0,
    fromY: 0,
    toX: 0,
    toY: 0,
    tiltDeg: 0,
    scale: 0.94,
    opacity: 0,
    elevation: 0,
    // Precomputed per-tick view state (eliminates repeated template function calls at 60fps)
    planFifoRank: 0,
    isProcessing: false,
    isQueuedFifo: false,
    stageColor: COLUMNS[0].color,
    stepText: '',
    showThink: false,
    showPlan: false,
    showProveFail: false,
    showProveFail2: false,
    showProveFix: false,
    costUsd: 0,
    costText: '$0.00',
    showCostPill: false,
    thinkCostLabel: `+$${t.costs.think.toFixed(2)}`,
    planCostLabel: `+$${t.costs.plan.toFixed(2)}`,
    proveFailCostLabel: t.costs.proveFail
      ? `+$${(t.costs.code + t.costs.proveFail).toFixed(2)}`
      : '',
    proveFail2CostLabel: t.costs.proveFail2
      ? `+$${((t.costs.codeFix || 0) + t.costs.proveFail2).toFixed(2)}`
      : '',
    proveFixCostLabel: t.costs.codeFix
      ? `+$${(t.costs.codeFix + t.costs.prove).toFixed(2)}`
      : '',
    progressPct: '6%',
    cardWidth: '180px',
    opacityCss: '0',
    transformStyle: 'translate3d(0px, 0px, 0px) scale(0.940) rotate(0.00deg)',
  }))
);

// Pre-allocated scratch collections for zero-alloc per-frame scheduling
const orderedTickets = [...tickets];
const colBuckets = COLUMNS.map(() => []);
const planFifoQueue = [];
const colOccupied = [false, false, false, false, false, false, false];
const stageProgressSamples = [];

function measureColumns() {
  if (!boardGridRef.value) return;
  const gridRect = boardGridRef.value.getBoundingClientRect();
  colElements.value.forEach((el, idx) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = rect.left - gridRect.left + 6;
    const width = Math.max(134, rect.width - 12);
    const height = Math.max(rect.height, CARD_STRIDE * 5);

    colWidths[idx] = width;
    colRects[idx]
      .setSize(scratchVec2A.setScalar(width, height))
      .setPosition(scratchVec2B.setScalar(x + width * 0.5, COL_HEADER_OFFSET + height * 0.5));
    colNodes[idx].setPosition(
      scratchPos3D.setScalar(colRects[idx].topLeftCorner.x, COL_HEADER_OFFSET, 0)
    );
  });
  rootBoardNode.computeWorldMatrix(boardSceneGraph);
}

function sortPlanBucket(a, b) {
  if (a.planCompletedAt > 0 && b.planCompletedAt > 0) {
    return a.planCompletedAt - b.planCompletedAt;
  }
  return a.index - b.index;
}

function sortPlanFifo(a, b) {
  return (a.planCompletedAt || a.index) - (b.planCompletedAt || b.index);
}

function sortDownstreamFirst(a, b) {
  const colA = a.inFlight ? a.targetColIndex : a.colIndex;
  const colB = b.inFlight ? b.targetColIndex : b.colIndex;
  if (colB !== colA) return colB - colA;
  return a.index - b.index;
}

// Recompute column slot coordinates, occupancy, and Plan FIFO queue in a single O(N) pass
function recomputeBoardLayoutAndQueues() {
  for (let c = 0; c < COLUMNS.length; c++) {
    colBuckets[c].length = 0;
    colOccupied[c] = false;
  }
  planFifoQueue.length = 0;

  for (let i = 0; i < tickets.length; i++) {
    const t = tickets[i];
    t.planFifoRank = 0;
    const effectiveCol = t.inFlight ? t.targetColIndex : t.colIndex;
    // A ticket stopped for developer help in Prove stays on the board but releases the FIFO runner lock
    if (!t.isStoppedForDev) {
      colOccupied[effectiveCol] = true;
    }

    if (t.spawned) {
      colBuckets[effectiveCol].push(t);
      if (!t.inFlight && t.colIndex === 2 && t.stageProgress >= 1) {
        planFifoQueue.push(t);
      }
    } else {
      // Unspawned tickets still reserve their initial Triage slot coordinate
      colNodes[0].getWorldPosition(scratchColOrigin);
      t.slotX = scratchColOrigin.x;
      t.slotY = scratchColOrigin.y + t.index * CARD_STRIDE;
    }
  }

  if (colBuckets[2].length > 1) {
    colBuckets[2].sort(sortPlanBucket);
  }
  if (planFifoQueue.length > 1) {
    planFifoQueue.sort(sortPlanFifo);
  }
  for (let i = 0; i < planFifoQueue.length; i++) {
    planFifoQueue[i].planFifoRank = i + 1;
  }

  for (let c = 0; c < COLUMNS.length; c++) {
    const bucket = colBuckets[c];
    columnCounts[c] = bucket.length;
    if (bucket.length === 0) continue;
    colNodes[c].getWorldPosition(scratchColOrigin);
    for (let slotIdx = 0; slotIdx < bucket.length; slotIdx++) {
      const t = bucket[slotIdx];
      t.slotX = scratchColOrigin.x;
      t.slotY = scratchColOrigin.y + slotIdx * CARD_STRIDE;
    }
  }
}

function canEnterColumn(ticket, nextColIndex) {
  // Think (1), Plan (2), and Done (6) execute without single-occupancy blocking
  if (nextColIndex === 1 || nextColIndex === 2 || nextColIndex === 6) {
    return true;
  }
  // Entering Code (col 3) from Plan requires the Code -> Prove delivery lock
  // (cols 3, 4) to be free (unlocked as soon as PR merges and enters Release)
  // and the ticket to be #1 at the head of the Plan FIFO queue
  if (nextColIndex === 3) {
    if (colOccupied[3] || colOccupied[4]) {
      return false;
    }
    return planFifoQueue.length > 0 && planFifoQueue[0].id === ticket.id;
  }
  // Within the delivery pipeline (Code -> Prove -> Release), enforce single occupancy
  if (colOccupied[nextColIndex]) {
    return false;
  }
  return true;
}

function computeTicketStepText(ticket, fr) {
  if (ticket.colIndex === 4 && ticket.isStoppedForDev) {
    return fr
      ? '🛑 Erreur 2/2 · Appel développeur'
      : '🛑 Error 2/2 · Calling developer';
  }
  if (ticket.colIndex === 4 && ticket.isProveFailing) {
    if (ticket.proveFailCount >= 1) {
      return fr
        ? '🛑 ÉCHEC 2/2 · ARRÊT & APPEL DEV'
        : '🛑 ERROR 2/2 · STOP & CALL DEV';
    }
    return fr ? '⚠ ÉCHEC PROVE · RETOUR → CODE' : '⚠ GATE FAILED · RETRY → CODE';
  }
  if (ticket.colIndex === 3 && ticket.proveFailedOnce) {
    return ticket.stageProgress < 0.58
      ? fr
        ? 'Correction auto du test Prove...'
        : 'Auto-fixing failing Prove test...'
      : fr
        ? `Correctif poussé · ${ticket.prNumber} ✓`
        : `Fix committed · retry ${ticket.prNumber} ✓`;
  }
  if (ticket.colIndex === 4 && ticket.proveFailedOnce) {
    return ticket.stageProgress < 0.58
      ? fr
        ? 'Nouvel essai Prove & revue...'
        : 'Re-running Prove gates & review...'
      : fr
        ? 'Contrôles Prove & revue validés ✓'
        : 'Prove gates & review passed ✓';
  }
  const colId = COLUMNS[ticket.colIndex]?.id;
  const stepPair = ticket.steps[colId];
  if (!stepPair) return '';
  return ticket.stageProgress < 0.58 ? stepPair[0] : stepPair[1];
}

function computeTicketCumulativeCost(ticket) {
  const c = ticket.costs;
  if (!c || !ticket.spawned) return 0;

  const col = ticket.colIndex;
  const target = ticket.targetColIndex;
  const fly = ticket.inFlight;
  const prog = ticket.stageProgress;

  // Triage (before entering Think)
  if (col === 0 && (!fly || target === 0)) {
    return 0;
  }

  // Think (col 1)
  if (col === 1 && !fly) {
    return c.think * prog;
  }
  if (fly && col === 0 && target === 1) {
    return 0;
  }

  let total = c.think;

  // Plan (col 2)
  if (fly && col === 1 && target === 2) {
    return total;
  }
  if (col === 2 && !fly) {
    return total + c.plan * prog;
  }

  total += c.plan;

  // Code & Prove (cols 3 & 4, including first-attempt Prove failure, Code retry & second Prove failure)
  if (ticket.proveFailCount === 0) {
    if (fly && col === 2 && target === 3) {
      return total;
    }
    if (col === 3 && !fly) {
      return total + c.code * prog;
    }
    total += c.code;

    if (fly && col === 3 && target === 4) {
      return total;
    }
    if (col === 4 && !fly) {
      if (ticket.maxProveFailures > 0) {
        const failRatio = Utils.clamp(prog / 0.84, 0, 1);
        return total + (c.proveFail || c.prove) * failRatio;
      }
      return total + c.prove * prog;
    }
    total += c.prove;
  } else {
    // Ticket already failed Prove at least once -> accrued initial Code + Prove-fail cost
    total += c.code + (c.proveFail || 0);

    // Flying back from Prove (4) to Code (3)
    if (fly && col === 4 && target === 3) {
      return total;
    }
    if (col === 3 && !fly) {
      return total + (c.codeFix || 0) * prog;
    }
    total += c.codeFix || 0;

    if (fly && col === 3 && target === 4) {
      return total;
    }
    if (ticket.isStoppedForDev || ticket.proveFailCount >= 2) {
      return total + (c.proveFail2 || c.prove);
    }
    if (col === 4 && !fly) {
      if (ticket.maxProveFailures >= 2) {
        const failRatio = Utils.clamp(prog / 0.84, 0, 1);
        return total + (c.proveFail2 || c.prove) * failRatio;
      }
      return total + c.prove * prog;
    }
    total += c.prove;
  }

  // Release (col 5) & Done (col 6)
  if (fly && col === 4 && target === 5) {
    return total;
  }
  if (col === 5 && !fly) {
    return total + c.release * prog;
  }

  return total + c.release;
}

function syncSceneGraphAndViewStates() {
  const fr = isFr.value;

  // 1. Update RoostR scene graph world matrices across all column & card nodes
  rootBoardNode.computeWorldMatrix(boardSceneGraph);

  let fifoWaitingForProve = 0;
  let fifoWaitingForRelease = 0;
  let cycleCostSum = 0;

  // 2. Sync each ticket's world transform and derived UI flags
  for (let i = 0; i < tickets.length; i++) {
    const ticket = tickets[i];
    const node = cardNodes[i];
    node.getWorldPosition(scratchWorldPos);

    ticket.x = scratchWorldPos.x - ticket.shakeOffsetX;
    ticket.y = scratchWorldPos.y;
    ticket.elevation = scratchWorldPos.z;
    ticket.scale = node.scale.x;
    ticket.tiltDeg = Trigo.radianToDegree(node.rotation.z);

    const effectiveCol = ticket.inFlight ? ticket.targetColIndex : ticket.colIndex;
    ticket.cardWidth = `${colWidths[effectiveCol] || 160}px`;
    ticket.opacityCss = ticket.opacity.toFixed(3);
    ticket.transformStyle = `translate3d(${scratchWorldPos.x.toFixed(1)}px, ${scratchWorldPos.y.toFixed(1)}px, ${scratchWorldPos.z.toFixed(1)}px) scale(${ticket.scale.toFixed(3)}) rotate(${ticket.tiltDeg.toFixed(2)}deg)`;

    const waitingDownstreamFifo =
      !ticket.isStoppedForDev &&
      (ticket.colIndex === 3 || ticket.colIndex === 4) &&
      ticket.stageProgress >= 1;
    if (ticket.spawned && !ticket.inFlight && !ticket.isStoppedForDev) {
      if (ticket.colIndex === 3 && ticket.stageProgress >= 1) fifoWaitingForProve++;
      if (ticket.colIndex === 4 && ticket.stageProgress >= 1) fifoWaitingForRelease++;
    }

    ticket.isQueuedFifo =
      !ticket.inFlight && !ticket.isStoppedForDev && (ticket.planFifoRank > 0 || waitingDownstreamFifo);
    ticket.isProcessing =
      !ticket.inFlight &&
      !ticket.isProveFailing &&
      !ticket.isStoppedForDev &&
      ticket.colIndex >= 1 &&
      ticket.colIndex <= 5 &&
      ticket.planFifoRank === 0 &&
      !waitingDownstreamFifo;

    if (
      !ticket.inFlight &&
      ticket.colIndex === 4 &&
      (ticket.isStoppedForDev || (ticket.isProveFailing && ticket.proveFailCount >= 1))
    ) {
      ticket.stageColor = '#f85149';
    } else if (!ticket.inFlight && ticket.colIndex === 4 && ticket.isProveFailing) {
      ticket.stageColor = '#f59e0b';
    } else if (ticket.inFlight && ticket.targetColIndex < ticket.colIndex) {
      ticket.stageColor = '#f59e0b';
    } else {
      ticket.stageColor = COLUMNS[effectiveCol]?.color || '#3fb950';
    }

    ticket.stepText = computeTicketStepText(ticket, fr);
    ticket.progressPct = `${Math.max(6, Math.round(ticket.stageProgress * 100))}%`;

    const currentCost = computeTicketCumulativeCost(ticket);
    ticket.costUsd = currentCost;
    ticket.costText = `$${currentCost.toFixed(2)}`;
    ticket.showCostPill =
      ticket.colIndex >= 1 || (ticket.inFlight && ticket.targetColIndex >= 1);
    cycleCostSum += currentCost;

    ticket.showThink =
      ticket.colIndex >= 2 ||
      (ticket.inFlight && ticket.targetColIndex >= 2) ||
      (ticket.colIndex === 1 && !ticket.inFlight && ticket.stageProgress >= 0.95);

    ticket.showPlan =
      ticket.colIndex >= 3 ||
      (ticket.inFlight && ticket.targetColIndex >= 3) ||
      (ticket.colIndex === 2 && !ticket.inFlight && ticket.stageProgress >= 1);

    const showFail2 =
      Boolean(ticket.proveFail2Content) &&
      (ticket.isStoppedForDev ||
        ticket.proveFailCount >= 2 ||
        (ticket.isProveFailing && ticket.proveFailCount >= 1));
    ticket.showProveFail2 = showFail2;

    const showFail =
      !showFail2 &&
      Boolean(ticket.proveFailContent) &&
      (ticket.isProveFailing ||
        (ticket.proveFailCount === 1 &&
          ((ticket.inFlight && ticket.targetColIndex <= 4) ||
            ticket.colIndex === 3 ||
            (ticket.colIndex === 4 && ticket.stageProgress < 0.95))));
    ticket.showProveFail = showFail;

    ticket.showProveFix =
      !showFail &&
      !showFail2 &&
      Boolean(ticket.proveFixContent) &&
      ticket.proveFailCount === 1 &&
      ((ticket.inFlight && ticket.targetColIndex >= 5) ||
        ticket.colIndex >= 5 ||
        (ticket.colIndex === 4 && !ticket.inFlight && ticket.stageProgress >= 0.95));
  }

  totalCycleCostText.value = `$${cycleCostSum.toFixed(2)}`;

  // 3. Sync top Autonomous Pipelines telemetry strip using @1pizzateam/spock NumArray
  let runningTotal = 0;
  for (let s = 0; s < activeWorkflows.length; s++) {
    const wf = activeWorkflows[s];
    const stCol = wf.colIndex;
    stageProgressSamples.length = 0;
    let primary = null;
    let stoppedHere = null;

    for (let i = 0; i < tickets.length; i++) {
      const t = tickets[i];
      if (!t.spawned) continue;
      if (t.isStoppedForDev && t.colIndex === stCol) {
        stoppedHere = t;
        continue;
      }
      const isRunningHere =
        stCol >= 2 && stCol <= 4
          ? (!t.inFlight && t.colIndex === stCol && t.stageProgress < 1) ||
            (t.inFlight && t.targetColIndex === stCol)
          : (!t.inFlight && t.colIndex === stCol) ||
            (t.inFlight && t.targetColIndex === stCol);

      if (isRunningHere) {
        if (!primary) primary = t;
        stageProgressSamples.push(t.inFlight ? 0.08 : t.stageProgress);
      }
    }

    const runningCount = stageProgressSamples.length;
    runningTotal += runningCount;
    const avgProgress = runningCount > 0 ? NumArray.average(stageProgressSamples) : 0;
    const isFailing = wf.id === 'prove' && Boolean(primary && primary.isProveFailing);
    const isSecondFail = isFailing && Boolean(primary && primary.proveFailCount >= 1);

    let activeBadge = null;
    if (!wf.isFifo && runningCount > 1) {
      activeBadge = fr ? `${runningCount} en parallèle` : `${runningCount} in parallel`;
    } else if (primary) {
      if (isSecondFail) {
        activeBadge = fr ? '🛑 ERREUR 2/2 · APPEL DEV' : '🛑 ERROR 2/2 · CALL DEV';
      } else if (isFailing) {
        activeBadge = fr ? '⚠ ÉCHEC · RETOUR → CODE' : '⚠ GATE FAILED · RETRY → CODE';
      } else if (wf.id === 'code' && primary.proveFailedOnce) {
        activeBadge = `${primary.repo} ${primary.number} ↺`;
      } else {
        activeBadge = `${primary.repo} ${primary.number}`;
      }
    } else if (stoppedHere) {
      activeBadge = '🛑 needs:developer';
    }

    let queuedCount = 0;
    if (wf.id === 'code') queuedCount = planFifoQueue.length;
    else if (wf.id === 'prove') queuedCount = fifoWaitingForProve;
    else if (wf.id === 'release') queuedCount = fifoWaitingForRelease;

    wf.color = isSecondFail ? '#f85149' : isFailing ? '#f59e0b' : wf.baseColor;
    wf.isFailing = isFailing;
    wf.modeLabel = wf.isFifo ? 'FIFO' : fr ? 'PARALLÈLE' : 'PARALLEL';
    wf.runningCount = runningCount;
    wf.queuedCount = queuedCount;
    wf.activeTicket = activeBadge;
    wf.progress = avgProgress;
    wf.progressPct = `${Math.round(avgProgress * 100)}%`;
  }

  totalRunningWorkflows.value = runningTotal;
}

function snapAllTicketPositions() {
  recomputeBoardLayoutAndQueues();
  for (let i = 0; i < tickets.length; i++) {
    const ticket = tickets[i];
    ticket.x = ticket.slotX;
    ticket.y = ticket.slotY;
    ticket.fromX = ticket.slotX;
    ticket.fromY = ticket.slotY;
    ticket.toX = ticket.slotX;
    ticket.toY = ticket.slotY;

    const node = cardNodes[i];
    node.setPosition(scratchPos3D.setScalar(ticket.x, ticket.y, 0));
    node.setRotation(scratchRot3D.origin());
    node.setScale(scratchScale3D.setScalar(ticket.scale, ticket.scale, 1));
  }
  syncSceneGraphAndViewStates();
}

function resetSimulation() {
  elapsedCycleTime = 0;
  pauseHoldTimer = 0;
  for (let index = 0; index < tickets.length; index++) {
    const ticket = tickets[index];
    ticket.spawned = prefersReducedMotion.value;
    ticket.spawnTime = 0.08 + index * SPAWN_STAGGER;
    ticket.colIndex = 0;
    ticket.targetColIndex = 0;
    ticket.inFlight = false;
    ticket.flightProgress = 0;
    ticket.stageTimer = 0;
    ticket.stageProgress = 0;
    ticket.hasTriggerLabel = false;
    ticket.triggerTime = 1.85 + index * TICKET_STAGGER;
    ticket.planCompletedAt = 0;
    ticket.proveFailCount = 0;
    ticket.proveFailedOnce = false;
    ticket.isProveFailing = false;
    ticket.isStoppedForDev = false;
    ticket.proveFailTimer = 0;
    ticket.shakeOffsetX = 0;
    ticket.tiltDeg = 0;
    ticket.scale = prefersReducedMotion.value ? 1 : 0.94;
    ticket.opacity = prefersReducedMotion.value ? 1 : 0;
    ticket.elevation = 0;
  }
  snapAllTicketPositions();
}

function startFlightToColumn(ticket, nextColIndex) {
  const prevCol = ticket.colIndex;
  if (prefersReducedMotion.value) {
    ticket.colIndex = nextColIndex;
    ticket.targetColIndex = nextColIndex;
    ticket.inFlight = false;
    ticket.stageTimer = 0;
    ticket.stageProgress = 0;
    recomputeBoardLayoutAndQueues();
    ticket.x = ticket.slotX;
    ticket.y = ticket.slotY;
    cardNodes[ticket.index].setPosition(scratchPos3D.setScalar(ticket.x, ticket.y, 0));
    return;
  }

  ticket.fromX = ticket.x;
  ticket.fromY = ticket.y;
  ticket.targetColIndex = nextColIndex;
  ticket.inFlight = true;
  ticket.flightProgress = 0;
  ticket.stageTimer = 0;
  ticket.stageProgress = 0;

  // Immediately update occupancy & slot targets so upstream FIFO tickets can advance in the same tick
  colOccupied[prevCol] = false;
  colOccupied[nextColIndex] = true;
  recomputeBoardLayoutAndQueues();
  ticket.toX = ticket.slotX;
  ticket.toY = ticket.slotY;
}

function getStageDuration(ticket, colIndex) {
  if (colIndex === 0) return STAGE_DURATIONS.triageWait;
  // Per-ticket spread in parallel Think & Plan so all stacked cards visibly progress simultaneously
  // and finish in a deterministic FIFO order for Code
  if (colIndex === 1) return STAGE_DURATIONS.think + ticket.index * 0.5;
  if (colIndex === 2) return STAGE_DURATIONS.plan + ticket.index * 0.65;
  if (colIndex === 3) return STAGE_DURATIONS.code;
  if (colIndex === 4) return STAGE_DURATIONS.prove;
  if (colIndex === 5) return STAGE_DURATIONS.release;
  return Infinity;
}

let looprPlayer = null;
let looprQuality = null;
let resizeObserver = null;
let intersectionObserver = null;
let motionMediaQuery = null;

function onMotionPreferenceChange(e) {
  prefersReducedMotion.value = e.matches;
}

function updateSimulation(rawDt) {
  const dt = Utils.clamp(rawDt || 0.016, 0.001, 0.08) * speedMultiplier.value;

  // Adaptive frame pacing via @1pizzateam/loopr Quality
  if (looprQuality && looprPlayer) {
    const updatedScale = looprQuality.update(rawDt || 0.016);
    if (updatedScale !== null) {
      looprPlayer.capFPS(updatedScale < 0.75 ? 30 : 60);
    }
  }

  // Check if all tickets have reached Done (colIndex === 6 and not inFlight) or halted for developer help
  let allDone = true;
  for (let i = 0; i < tickets.length; i++) {
    const t = tickets[i];
    const isTerminal = (t.colIndex === 6 && !t.inFlight) || t.isStoppedForDev;
    if (!isTerminal) {
      allDone = false;
      break;
    }
  }
  if (allDone) {
    pauseHoldTimer += dt;
    if (pauseHoldTimer >= 2.6) {
      resetSimulation();
    }
    return;
  }

  elapsedCycleTime += dt;
  recomputeBoardLayoutAndQueues();

  // Process downstream columns first (Release -> Prove -> Code -> Plan -> Think -> Triage)
  // in-place on pre-allocated array so vacated FIFO stages immediately admit waiting tickets.
  orderedTickets.sort(sortDownstreamFirst);

  for (let k = 0; k < orderedTickets.length; k++) {
    const ticket = orderedTickets[k];
    const node = cardNodes[ticket.index];

    // 0. Spawn issues 1 by 1 into the Triage column at the start of the cycle
    if (!ticket.spawned) {
      if (prefersReducedMotion.value || elapsedCycleTime >= ticket.spawnTime) {
        ticket.spawned = true;
        recomputeBoardLayoutAndQueues();
        if (prefersReducedMotion.value) {
          ticket.x = ticket.slotX;
          ticket.y = ticket.slotY;
          ticket.scale = 1;
          ticket.opacity = 1;
        } else {
          ticket.x = ticket.slotX - 18;
          ticket.y = ticket.slotY + 18;
          ticket.scale = 0.94;
          ticket.opacity = 0;
        }
        node.setPosition(scratchPos3D.setScalar(ticket.x, ticket.y, 0));
        node.setScale(scratchScale3D.setScalar(ticket.scale, ticket.scale, 1));
      } else {
        continue;
      }
    }

    // 1. Trigger 4-release label in Triage
    if (ticket.colIndex === 0 && !ticket.hasTriggerLabel && elapsedCycleTime >= ticket.triggerTime) {
      ticket.hasTriggerLabel = true;
      ticket.stageTimer = 0;
    }

    // 2. If flying between columns, interpolate 3D Cubic Bezier & tangent banking via @1pizzateam/spock & @1pizzateam/roostr
    if (ticket.inFlight) {
      ticket.opacity = 1;
      ticket.flightProgress = Utils.clamp(ticket.flightProgress + dt / FLIGHT_DURATION, 0, 1);
      const t = Utils.smoothstep(0, 1, ticket.flightProgress);

      ticket.toX = ticket.slotX;
      ticket.toY = ticket.slotY;

      const minY = Math.min(ticket.fromY, ticket.toY);
      const arcLift = -26;
      scratchP0.setScalar(ticket.fromX, ticket.fromY, 0);
      scratchP1.setScalar(Utils.lerp(ticket.fromX, ticket.toX, 0.35), minY + arcLift, 22);
      scratchP2.setScalar(Utils.lerp(ticket.fromX, ticket.toX, 0.68), minY + arcLift * 0.6, 22);
      scratchP3.setScalar(ticket.toX, ticket.toY, 0);

      // 3D position and tangent velocity vector along the cubic Bezier spline
      scratchPos3D.cubicBezier(scratchP0, scratchP1, scratchP2, scratchP3, t);
      scratchTangent3D.cubicBezierDerivative(scratchP0, scratchP1, scratchP2, scratchP3, t);

      const flightWave = Trigo.sine(ticket.flightProgress * Trigo.pi);
      const scale = 1 + flightWave * 0.035;
      const slopeBank = Utils.clamp(
        (scratchTangent3D.y / Math.max(120, Math.abs(scratchTangent3D.x))) * 0.06,
        -0.04,
        0.04
      );
      const rollRad =
        slopeBank + Trigo.sine(ticket.flightProgress * Trigo.twopi) * Trigo.degreeToRadian(1.9);

      node.setPosition(scratchPos3D);
      node.setRotation(scratchRot3D.setScalar(0, 0, rollRad));
      node.setScale(scratchScale3D.setScalar(scale, scale, 1));

      if (ticket.flightProgress >= 1) {
        ticket.inFlight = false;
        ticket.colIndex = ticket.targetColIndex;
        ticket.flightProgress = 0;
        ticket.stageTimer = 0;
        ticket.stageProgress = 0;
        node.setPosition(scratchPos3D.setScalar(ticket.toX, ticket.toY, 0));
        node.setRotation(scratchRot3D.origin());
        node.setScale(scratchScale3D.setScalar(1, 1, 1));
        recomputeBoardLayoutAndQueues();
      }
      continue;
    }

    // 3. Smoothly damp card into its vertical column slot using Utils.damp from @1pizzateam/spock
    const nextX = prefersReducedMotion.value
      ? ticket.slotX
      : Utils.damp(ticket.x, ticket.slotX, 14, dt);
    const nextY = prefersReducedMotion.value
      ? ticket.slotY
      : Utils.damp(ticket.y, ticket.slotY, 12, dt);
    const nextScale = prefersReducedMotion.value ? 1 : Utils.damp(ticket.scale, 1, 14, dt);
    ticket.opacity = prefersReducedMotion.value ? 1 : Utils.damp(ticket.opacity, 1, 16, dt);

    // 4. Advance pipeline stage progress if triggered and not yet in Done or stopped for developer help
    if (!ticket.isStoppedForDev && (ticket.colIndex > 0 || ticket.hasTriggerLabel)) {
      if (ticket.colIndex < 6) {
        const duration = getStageDuration(ticket, ticket.colIndex);

        // Simulate designated issues failing Prove:
        // - LoopR.js #14 (maxProveFailures = 1): fails once -> returns to Code -> fixes -> passes Prove on retry
        // - BumpR.js #19 (maxProveFailures = 2): fails once -> returns to Code -> retries -> fails a 2nd time in Prove -> stops & calls for developer help (needs:developer)
        if (ticket.colIndex === 4 && ticket.proveFailCount < ticket.maxProveFailures) {
          const failProgressCutoff = 0.84;
          const failTimeCutoff = duration * failProgressCutoff;
          if (!ticket.isProveFailing) {
            ticket.stageTimer += dt;
            ticket.stageProgress = Utils.clamp(ticket.stageTimer / duration, 0, failProgressCutoff);
            if (ticket.stageTimer >= failTimeCutoff) {
              ticket.isProveFailing = true;
              ticket.proveFailTimer = 0;
            }
          } else {
            ticket.proveFailTimer += dt;
            if (!prefersReducedMotion.value) {
              const decay = Utils.clamp(1 - ticket.proveFailTimer / 1.15, 0, 1);
              ticket.shakeOffsetX = Trigo.sine(ticket.proveFailTimer * 52) * 5.5 * decay;
            }
            if (ticket.proveFailTimer >= 1.15) {
              ticket.isProveFailing = false;
              ticket.proveFailCount += 1;
              ticket.proveFailedOnce = true;
              ticket.proveFailTimer = 0;
              ticket.shakeOffsetX = 0;

              if (ticket.proveFailCount >= 2) {
                // Second failure in Prove: stop automatic remediation, apply needs:developer, and release FIFO lock
                ticket.isStoppedForDev = true;
                recomputeBoardLayoutAndQueues();
              } else {
                startFlightToColumn(ticket, 3);
                continue;
              }
            }
          }
        } else {
          ticket.stageTimer += dt;
          ticket.stageProgress = Utils.clamp(ticket.stageTimer / duration, 0, 1);

          if (ticket.stageProgress >= 1) {
            if (ticket.colIndex === 2 && ticket.planCompletedAt === 0) {
              ticket.planCompletedAt = elapsedCycleTime + ticket.index * 0.0001;
              recomputeBoardLayoutAndQueues();
            }

            const nextCol = ticket.colIndex + 1;
            if (canEnterColumn(ticket, nextCol)) {
              startFlightToColumn(ticket, nextCol);
              continue;
            }
          }
        }
      }
    }

    node.setPosition(scratchPos3D.setScalar(nextX + ticket.shakeOffsetX, nextY, 0));
    node.setRotation(scratchRot3D.origin());
    node.setScale(scratchScale3D.setScalar(nextScale, nextScale, 1));
  }

  syncSceneGraphAndViewStates();
}

function togglePlay() {
  if (!looprPlayer) return;
  const active = looprPlayer.toggle();
  isPlaying.value = active;
  userPaused.value = !active;
}

function toggleSpeed() {
  speedMultiplier.value = speedMultiplier.value === 1 ? 2 : 1;
}

watch(isFr, () => {
  syncSceneGraphAndViewStates();
});

onMounted(() => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.value = motionMediaQuery.matches;
    motionMediaQuery.addEventListener?.('change', onMotionPreferenceChange);
  }

  measureColumns();
  snapAllTicketPositions();

  if (typeof ResizeObserver !== 'undefined' && boardGridRef.value) {
    resizeObserver = new ResizeObserver(() => {
      measureColumns();
      recomputeBoardLayoutAndQueues();
      for (let i = 0; i < tickets.length; i++) {
        const ticket = tickets[i];
        if (!ticket.inFlight) {
          ticket.x = ticket.slotX;
          ticket.y = ticket.slotY;
          cardNodes[i].setPosition(scratchPos3D.setScalar(ticket.x + ticket.shakeOffsetX, ticket.y, 0));
        }
      }
      syncSceneGraphAndViewStates();
    });
    resizeObserver.observe(boardGridRef.value);
  }

  looprQuality = new Quality();
  looprPlayer = new Player((dt) => {
    updateSimulation(dt);
  });
  looprPlayer.capFPS(60);
  looprPlayer.capDelta(0.1);
  looprPlayer.start();
  isPlaying.value = true;

  // Pause simulation automatically when scrolled offscreen to save CPU/GPU cycles
  if (typeof IntersectionObserver !== 'undefined' && showcaseRootRef.value) {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !looprPlayer) return;
        if (entry.isIntersecting) {
          if (!userPaused.value && !looprPlayer.isActive()) {
            looprPlayer.start();
            isPlaying.value = true;
          }
        } else if (looprPlayer.isActive()) {
          looprPlayer.pause();
          isPlaying.value = false;
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(showcaseRootRef.value);
  }
});

onBeforeUnmount(() => {
  if (looprPlayer) {
    looprPlayer.stop();
    looprPlayer = null;
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  if (intersectionObserver) {
    intersectionObserver.disconnect();
    intersectionObserver = null;
  }
  if (motionMediaQuery) {
    motionMediaQuery.removeEventListener?.('change', onMotionPreferenceChange);
    motionMediaQuery = null;
  }
});
</script>

<template>
  <section
    ref="showcaseRootRef"
    class="kanban-factory-showcase"
    :aria-label="
      isFr
        ? 'Animation du tableau Kanban de l’Agentic Software Factory en action'
        : 'Live Agentic Software Factory Kanban board animation'
    "
  >
    <div class="showcase-container">
      <!-- Section Heading -->
      <div class="showcase-header">
        <div class="showcase-eyebrow">
          <span class="eyebrow-dot" />
          <span>{{
            isFr
              ? 'USINE LOGICIELLE AGENTIQUE EN ACTION'
              : 'AGENTIC FACTORY IN ACTION'
          }}</span>
        </div>
        <h2 class="showcase-title">
          {{
            isFr
              ? 'Du Triage à Done : livraison autonome de bout en bout'
              : 'From Triage to Done: Autonomous Delivery at Work'
          }}
        </h2>
        <p class="showcase-subtitle">
          {{
            isFr
              ? 'Les tickets avancent automatiquement dans le Kanban.'
              : 'Watch issues move automatically across the Kanban board.'
          }}
        </p>
      </div>

      <!-- Dark Board Window (Faithful to Provided Screenshots) -->
      <div class="gh-project-window">
        <!-- Top Bar: Project Title & Right Action Buttons -->
        <div class="gh-top-bar">
          <div class="gh-project-title-group">
            <!-- Lock Icon matching screenshot -->
            <svg class="gh-lock-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
              <path
                d="M4 4a4 4 0 0 1 8 0v2h.25c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 12.25 15h-8.5A1.75 1.75 0 0 1 2 13.25v-5.5C2 6.784 2.784 6 3.75 6H4Zm8.25 3.5h-8.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25ZM10.5 6V4a2.5 2.5 0 1 0-5 0v2Z"
              />
            </svg>
            <span class="gh-project-name">1PizzaTeam</span>
            <div class="gh-repo-chips">
              <span v-for="t in INITIAL_TICKETS" :key="t.id" class="gh-repo-chip">
                {{ t.repo }}
              </span>
            </div>
          </div>

          <div class="gh-top-actions">
            <!-- Interactive Animation Controls (Pause / Speed / Reset) -->
            <div class="factory-sim-controls">
              <button
                type="button"
                class="gh-btn sim-btn"
                :title="isPlaying ? (isFr ? 'Mettre en pause' : 'Pause animation') : (isFr ? 'Reprendre' : 'Resume animation')"
                @click="togglePlay"
              >
                <span class="sim-icon">{{ isPlaying ? '⏸' : '▶' }}</span>
                <span>{{ isPlaying ? 'Pause' : (isFr ? 'Lecture' : 'Play') }}</span>
              </button>
              <button
                type="button"
                class="gh-btn sim-btn"
                :title="isFr ? 'Vitesse de simulation' : 'Simulation speed'"
                @click="toggleSpeed"
              >
                <span>{{ speedMultiplier }}x</span>
              </button>
              <button
                type="button"
                class="gh-btn sim-btn"
                :title="isFr ? 'Relancer le cycle' : 'Restart cycle'"
                @click="resetSimulation"
              >
                <span>↺</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Views Tab Bar matching screenshot -->
        <div class="gh-tabs-bar">
          <div
            v-for="tab in VIEW_TABS"
            :key="tab.name"
            class="gh-tab"
            :class="{ active: tab.active }"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
              <path :d="tab.iconPath" />
            </svg>
            <span>{{ tab.name }}</span>
            <span v-if="tab.caret" class="gh-tab-caret">▾</span>
          </div>
          <div class="gh-tab gh-new-view">+ New view</div>
        </div>

        <!-- Filter Bar matching screenshot -->
        <div class="gh-filter-bar">
          <div class="gh-filter-input">
            <svg class="gh-search-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
            </svg>
            <span class="gh-filter-placeholder">Filter by keyword or by field</span>
          </div>
          <div class="gh-btn gh-view-btn">
            <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
              <path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.039.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.218c-.428.609-1.176.806-1.82.63l-1.103-.303c-.066-.019-.176-.011-.299.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.212.224l-.288 1.107c-.17.645-.716 1.195-1.459 1.259A8.206 8.206 0 0 1 8 16a8.2 8.2 0 0 1-.701-.031c-.743-.064-1.289-.614-1.459-1.259l-.288-1.107c-.018-.066-.079-.158-.212-.224a5.909 5.909 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a7.977 7.977 0 0 1-.704-1.218c-.315-.675-.111-1.422.364-1.891l.814-.806c.049-.048.098-.147.088-.294a6.207 6.207 0 0 1 0-.772c.01-.147-.039-.246-.088-.294l-.814-.806c-.475-.469-.679-1.216-.364-1.891.198-.426.434-.833.704-1.218.428-.609 1.176-.806 1.82-.63l1.103.303c.066.019.176.011.299-.071.214-.143.437-.272.668-.386.133-.066.194-.158.212-.224l.288-1.107C6.01.645 6.556.095 7.299.031A8.2 8.2 0 0 1 8 0Zm0 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
            <span>View</span>
          </div>
        </div>

        <!-- Live Autonomous Pipeline Telemetry Strip -->
        <div class="gh-actions-strip">
          <div class="actions-strip-meta">
            <div class="actions-strip-label">
              <span class="actions-live-dot" :class="{ active: totalRunningWorkflows > 0 }" />
              <span>{{ isFr ? 'PIPELINES AUTONOMES' : 'AUTONOMOUS PIPELINES' }}</span>
            </div>
            <div class="actions-cost-pill">
              <span class="actions-cost-label">💰 {{ isFr ? 'COÛT IA' : 'AI COST' }}</span>
              <span class="actions-cost-value">{{ totalCycleCostText }}</span>
            </div>
          </div>
          <div class="actions-runners-grid">
            <div
              v-for="wf in activeWorkflows"
              :key="wf.id"
              class="runner-pill"
              :class="{ 'is-active': wf.runningCount > 0, 'is-failing': wf.isFailing }"
              :style="{ '--wf-color': wf.color }"
            >
              <div class="runner-pill-top">
                <span
                  class="runner-spinner"
                  :class="{ spinning: wf.runningCount > 0 && !wf.isFailing && isPlaying, failing: wf.isFailing }"
                />
                <span class="runner-name">{{ wf.name }}</span>
                <span class="runner-mode-tag" :class="wf.isFifo ? 'mode-fifo' : 'mode-parallel'">
                  {{ wf.modeLabel }}
                </span>
              </div>
              <div class="runner-pill-status">
                <span
                  v-if="wf.activeTicket"
                  class="runner-ticket"
                  :class="{ 'is-failing-ticket': wf.isFailing }"
                >
                  {{ wf.activeTicket }}
                </span>
                <span v-else class="runner-idle">{{ isFr ? 'En attente' : 'Idle' }}</span>
                <span v-if="wf.queuedCount > 0" class="runner-queue-badge">
                  +{{ wf.queuedCount }} {{ isFr ? 'en file' : 'queued' }}
                </span>
              </div>
              <div class="runner-progress-track">
                <div
                  class="runner-progress-fill"
                  :style="{
                    width: wf.progressPct,
                    backgroundColor: wf.color,
                  }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 7-Column Kanban Board Area -->
        <div class="gh-kanban-scroll">
          <div ref="boardGridRef" class="gh-kanban-board">
            <!-- 7 Columns Backdrop -->
            <div
              v-for="(col, colIdx) in COLUMNS"
              :key="col.id"
              :ref="(el) => (colElements[colIdx] = el)"
              class="gh-kanban-col"
              :class="{
                'col-has-active': colIdx >= 1 && colIdx <= 5 && columnCounts[colIdx] > 0,
              }"
              :style="{ '--col-color': col.color }"
            >
              <!-- Column Header (Matching Screenshots) -->
              <div class="gh-col-header">
                <div class="gh-col-header-left">
                  <span
                    class="gh-col-ring"
                    :style="{
                      borderColor: col.color,
                      backgroundColor: col.ringBg,
                    }"
                  />
                  <span class="gh-col-title">{{ col.name }}</span>
                  <span class="gh-col-count">{{ columnCounts[colIdx] }}</span>
                </div>
                <div class="gh-col-header-actions">
                  <span>•••</span>
                  <span>+</span>
                </div>
              </div>

              <!-- Spacer for cards + "+ Add item" footer (Triage only) -->
              <div class="gh-col-body">
                <div
                  v-if="colIdx === 0"
                  class="gh-add-item"
                  :style="{
                    transform: `translateY(${
                      columnCounts[colIdx] * CARD_STRIDE - (columnCounts[colIdx] > 0 ? 2 : 0)
                    }px)`,
                  }"
                >
                  <span>+ Add item</span>
                </div>
              </div>
            </div>

            <!-- Floating / Animated Ticket Cards Overlay Driven by LoopR, Spock & RoostR -->
            <div class="gh-cards-layer">
              <div
                v-for="ticket in tickets"
                v-show="ticket.spawned"
                :key="ticket.id"
                class="gh-ticket-card"
                :class="{
                  'is-flying': ticket.inFlight,
                  'is-prove-failing':
                    !ticket.inFlight && ticket.isProveFailing && ticket.proveFailCount === 0,
                  'is-prove-failing-2':
                    !ticket.inFlight && ticket.isProveFailing && ticket.proveFailCount >= 1,
                  'is-stopped-dev': !ticket.inFlight && ticket.isStoppedForDev,
                  'is-processing': ticket.isProcessing,
                  'is-queued-fifo': ticket.isQueuedFifo,
                  'is-done': !ticket.inFlight && ticket.colIndex === 6,
                }"
                :style="{
                  width: ticket.cardWidth,
                  opacity: ticket.opacityCss,
                  transform: ticket.transformStyle,
                  '--ticket-accent': ticket.stageColor,
                }"
              >
                <!-- Hazard Banner Overlay on Prove Gate Failure -->
                <div
                  v-if="!ticket.inFlight && ticket.isProveFailing"
                  class="gh-card-fail-banner"
                  :class="{ 'is-second-fail': ticket.proveFailCount >= 1 }"
                >
                  <span class="gh-fail-banner-icon">{{
                    ticket.proveFailCount >= 1 ? '🛑' : '⚠'
                  }}</span>
                  <span class="gh-fail-banner-text">
                    {{
                      ticket.proveFailCount >= 1
                        ? isFr
                          ? 'ERREUR 2/2 · ARRÊT & APPEL DEV'
                          : 'ERROR 2/2 · STOP & CALL DEV'
                        : isFr
                          ? 'ÉCHEC PROVE · RETOUR → CODE'
                          : 'GATE FAILED · RETRY → CODE'
                    }}
                  </span>
                </div>

                <!-- Card Top Row: Issue Icon + Repo #Number + Top-Right Cumulative AI Cost -->
                <div class="gh-card-top">
                  <div class="gh-card-issue-id">
                    <!-- Open Issue Icon (Green circle-dot) vs Closed Completed Icon (Purple check-circle) -->
                    <svg
                      v-if="ticket.colIndex < 6 || ticket.inFlight"
                      class="gh-issue-icon open"
                      viewBox="0 0 16 16"
                      width="13"
                      height="13"
                      fill="currentColor"
                    >
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
                    </svg>
                    <svg
                      v-else
                      class="gh-issue-icon done"
                      viewBox="0 0 16 16"
                      width="13"
                      height="13"
                      fill="currentColor"
                    >
                      <path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z" />
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z" />
                    </svg>
                    <span class="gh-card-repo">{{ ticket.repo }} {{ ticket.number }}</span>
                  </div>
                  <span
                    v-if="ticket.showCostPill"
                    class="gh-cost-pill"
                    :title="
                      isFr
                        ? 'Champ GitHub Project : Coût IA cumulé'
                        : 'GitHub Project field: Cumulative AI Cost'
                    "
                  >
                    {{ ticket.costText }}
                  </span>
                  <span v-else class="gh-card-dots">•••</span>
                </div>

                <!-- Card Issue Title -->
                <div class="gh-card-title">
                  {{ ticket.title }}
                </div>

                <!-- Enriched Issue Sections (# Think, # Plan & # Prove failure/fix report appended as stages run) -->
                <div class="gh-card-enriched">
                  <div v-if="ticket.showThink" class="gh-enriched-block enriched-think">
                    <span class="gh-enriched-tag"># Think ✓</span>
                    <span class="gh-enriched-text">{{ ticket.thinkContent }}</span>
                    <span class="gh-enriched-cost">{{ ticket.thinkCostLabel }}</span>
                  </div>
                  <div v-if="ticket.showPlan" class="gh-enriched-block enriched-plan">
                    <span class="gh-enriched-tag"># Plan ✓</span>
                    <span class="gh-enriched-text">{{ ticket.planContent }}</span>
                    <span class="gh-enriched-cost">{{ ticket.planCostLabel }}</span>
                  </div>
                  <div v-if="ticket.showProveFail2" class="gh-enriched-block enriched-prove-fail-2">
                    <span class="gh-enriched-tag"># Error 2 ✗</span>
                    <span class="gh-enriched-text">{{ ticket.proveFail2Content }}</span>
                    <span class="gh-enriched-cost">{{ ticket.proveFail2CostLabel }}</span>
                  </div>
                  <div v-else-if="ticket.showProveFail" class="gh-enriched-block enriched-prove-fail">
                    <span class="gh-enriched-tag"># Error ✗</span>
                    <span class="gh-enriched-text">{{ ticket.proveFailContent }}</span>
                    <span class="gh-enriched-cost">{{ ticket.proveFailCostLabel }}</span>
                  </div>
                  <div v-else-if="ticket.showProveFix" class="gh-enriched-block enriched-prove-fix">
                    <span class="gh-enriched-tag"># Fixed ✓</span>
                    <span class="gh-enriched-text">{{ ticket.proveFixContent }}</span>
                    <span class="gh-enriched-cost">{{ ticket.proveFixCostLabel }}</span>
                  </div>
                </div>

                <!-- Card Bottom Row: Priority Pill + 4-release / needs:developer Label + Live Pipeline Runner -->
                <div class="gh-card-footer">
                  <div class="gh-card-pills">
                    <span
                      v-if="!ticket.isStoppedForDev"
                      class="gh-priority-pill"
                      :class="ticket.priority === 'High' ? 'priority-high' : 'priority-medium'"
                    >
                      {{ ticket.priority }}
                    </span>

                    <span v-if="ticket.isStoppedForDev" class="gh-needs-dev-pill">
                      needs:developer
                    </span>
                    <span
                      v-else-if="ticket.hasTriggerLabel && ticket.colIndex < 6"
                      class="gh-trigger-pill"
                    >
                      4-release
                    </span>

                    <span v-if="!ticket.inFlight && ticket.colIndex === 6" class="gh-done-pill">
                      ✓ {{ ticket.releaseTag }}
                    </span>
                  </div>

                  <!-- Active Pipeline Status Micro-Bar (when in Think, Plan, Code, Prove, Release) -->
                  <div
                    v-if="!ticket.inFlight && ticket.colIndex >= 1 && ticket.colIndex <= 5"
                    class="gh-card-pipeline"
                  >
                    <div class="gh-card-pipeline-row">
                      <span
                        v-if="
                          ticket.isStoppedForDev ||
                          (ticket.isProveFailing && ticket.proveFailCount >= 1)
                        "
                        class="gh-stop-dot"
                      />
                      <span v-else-if="ticket.isProveFailing" class="gh-fail-dot" />
                      <span
                        v-else-if="ticket.isProcessing"
                        class="gh-mini-spinner"
                        :class="{ spinning: isPlaying }"
                        :style="{ borderTopColor: ticket.stageColor }"
                      />
                      <span v-else class="gh-fifo-wait-dot" />
                      <span
                        class="gh-card-step-text"
                        :class="{
                          'is-stopped-text':
                            ticket.isStoppedForDev ||
                            (ticket.isProveFailing && ticket.proveFailCount >= 1),
                          'is-failing-text':
                            ticket.isProveFailing && ticket.proveFailCount === 0,
                        }"
                      >
                        {{ ticket.stepText }}
                      </span>
                    </div>
                    <div class="gh-card-progress-bg">
                      <div
                        class="gh-card-progress-bar"
                        :class="{ 'is-waiting-fifo': ticket.isQueuedFifo }"
                        :style="{
                          width: ticket.progressPct,
                          backgroundColor: ticket.stageColor,
                        }"
                      />
                    </div>
                  </div>

                  <!-- In-flight Transition Badge -->
                  <div v-else-if="ticket.inFlight" class="gh-card-flight-badge">
                    <span v-if="ticket.targetColIndex < ticket.colIndex" class="is-retrying-flight">
                      ⚠ ↺ {{ isFr ? 'RETOUR → CODE (CORRECTIF)' : 'RETRY → CODE (FIX)' }}
                    </span>
                    <span v-else>→ {{ COLUMNS[ticket.targetColIndex]?.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.kanban-factory-showcase {
  width: 100%;
  padding: 8px 24px 48px;
  box-sizing: border-box;
}

.showcase-container {
  max-width: 1280px;
  margin: 0 auto;
}

.showcase-header {
  text-align: center;
  margin-bottom: 22px;
}

.showcase-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #3b82f6;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 10px;
}

.dark .showcase-eyebrow {
  color: #60a5fa;
  background: rgba(37, 99, 235, 0.18);
}

.eyebrow-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.showcase-title {
  font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
  border-top: none;
  padding-top: 0;
}

.showcase-subtitle {
  font-size: 15px;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  max-width: 780px;
  margin: 0 auto;
}

/* GitHub Projects Dark Board Chrome */
.gh-project-window {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 12px;
  box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(48, 54, 61, 0.6);
  overflow: hidden;
  color: #e6edf3;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
  user-select: none;
}

/* Top Bar */
.gh-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 16px;
  background: #010409;
  border-bottom: 1px solid #21262d;
  flex-wrap: wrap;
}

.gh-project-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.gh-lock-icon {
  color: #8b949e;
  flex-shrink: 0;
}

.gh-project-name {
  font-size: 15px;
  font-weight: 700;
  color: #f0f6fc;
  letter-spacing: -0.01em;
}

.gh-repo-chips {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 6px;
  flex-wrap: wrap;
}

.gh-repo-chip {
  font-size: 10.5px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: #8b949e;
  background: #161b22;
  border: 1px solid #30363d;
  padding: 1px 7px;
  border-radius: 999px;
}

.gh-top-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.factory-sim-controls {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 4px;
}

.gh-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  padding: 0 9px;
  border-radius: 6px;
  background: #21262d;
  border: 1px solid #30363d;
  color: #c9d1d9;
  font-size: 11.5px;
  font-weight: 500;
  line-height: 1;
}

.sim-btn {
  cursor: pointer;
  background: #161b22;
  border-color: #388bfd66;
  color: #79c0ff;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.sim-btn:hover {
  background: rgba(56, 139, 253, 0.18);
  border-color: #58a6ff;
}

/* Tabs Bar */
.gh-tabs-bar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 12px 0;
  background: #010409;
  border-bottom: 1px solid #21262d;
  overflow-x: auto;
}

.gh-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #8b949e;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  white-space: nowrap;
}

.gh-tab.active {
  color: #f0f6fc;
  background: #0d1117;
  border: 1px solid #21262d;
  border-bottom-color: #0d1117;
  font-weight: 600;
}

.gh-tab-caret {
  font-size: 10px;
  color: #8b949e;
  background: #21262d;
  border-radius: 4px;
  padding: 0 4px;
}

.gh-new-view {
  color: #8b949e;
}

/* Filter Bar */
.gh-filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 14px;
  background: #0d1117;
  border-bottom: 1px solid #21262d;
}

.gh-filter-input {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 28px;
  padding: 0 10px;
  background: #010409;
  border: 1px solid #30363d;
  border-radius: 6px;
  font-size: 12px;
  color: #8b949e;
  overflow: hidden;
  white-space: nowrap;
}

.gh-search-icon {
  color: #6e7681;
  flex-shrink: 0;
}

.gh-filter-placeholder {
  color: #6e7681;
}

/* Live GitHub Actions Pipeline Strip */
.gh-actions-strip {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 7px 14px;
  background: #161b22;
  border-bottom: 1px solid #21262d;
  flex-wrap: wrap;
}

.actions-strip-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  flex-shrink: 0;
}

.actions-strip-label {
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #8b949e;
  white-space: nowrap;
}

.actions-cost-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.32);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 9.5px;
  line-height: 14px;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.actions-cost-label {
  font-weight: 600;
  color: #7dd3fc;
  letter-spacing: 0.03em;
}

.actions-cost-value {
  font-weight: 700;
  color: #f0f9ff;
}

.actions-live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #484f58;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.actions-live-dot.active {
  background: #3fb950;
  box-shadow: 0 0 8px #3fb950;
}

.actions-runners-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, minmax(136px, 1fr));
  gap: 8px;
}

.runner-pill {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 6px 10px;
  border-radius: 6px;
  background: #0d1117;
  border: 1px solid #21262d;
  min-width: 0;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.runner-pill.is-active {
  border-color: var(--wf-color);
  box-shadow: 0 0 12px -4px var(--wf-color);
}

.runner-pill.is-failing {
  border-color: #f59e0b;
  background: repeating-linear-gradient(
      -45deg,
      rgba(245, 158, 11, 0.14),
      rgba(245, 158, 11, 0.14) 8px,
      rgba(13, 17, 23, 0.95) 8px,
      rgba(13, 17, 23, 0.95) 16px
    ),
    #0d1117;
  box-shadow: 0 0 16px -2px rgba(245, 158, 11, 0.55);
}

.runner-pill-top {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  min-width: 0;
}

.runner-pill-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  min-height: 17px;
  min-width: 0;
}

.runner-spinner {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1.6px solid #30363d;
  flex-shrink: 0;
}

.runner-pill.is-active .runner-spinner {
  border-color: rgba(255, 255, 255, 0.2);
  border-top-color: var(--wf-color);
}

.runner-pill.is-failing .runner-spinner.failing {
  border-color: #fbbf24;
  background: #f59e0b;
  box-shadow: 0 0 8px #f59e0b;
}

.runner-spinner.spinning {
  @media (prefers-reduced-motion: no-preference) {
    animation: gh-spin 0.8s linear infinite;
  }
}

.runner-name {
  font-weight: 600;
  color: #c9d1d9;
  white-space: nowrap;
}

.runner-mode-tag {
  margin-left: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 0 5px;
  border-radius: 999px;
  line-height: 15px;
  white-space: nowrap;
  flex-shrink: 0;
}

.runner-mode-tag.mode-parallel {
  color: #cbd5e1;
  background: rgba(148, 163, 184, 0.14);
  border: 1px solid rgba(148, 163, 184, 0.36);
}

.runner-mode-tag.mode-fifo {
  color: #f1f5f9;
  background: rgba(241, 245, 249, 0.08);
  border: 1px solid rgba(203, 213, 225, 0.45);
}

.runner-ticket {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 10px;
  font-weight: 600;
  color: #f0f6fc;
  background: rgba(255, 255, 255, 0.07);
  padding: 0 5px;
  border-radius: 4px;
  white-space: nowrap;
}

.runner-ticket.is-failing-ticket {
  color: #fde68a;
  background: rgba(245, 158, 11, 0.24);
  border: 1px solid rgba(251, 191, 36, 0.65);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.runner-idle {
  font-size: 10px;
  color: #6e7681;
}

.runner-queue-badge {
  margin-left: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 9.5px;
  font-weight: 700;
  color: #e3b341;
  background: rgba(210, 153, 34, 0.16);
  border: 1px solid rgba(210, 153, 34, 0.4);
  padding: 0 5px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
}

.runner-progress-track {
  width: 100%;
  height: 2.5px;
  background: #21262d;
  border-radius: 2px;
  overflow: hidden;
}

.runner-progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.08s linear;
}

/* 7-Column Kanban Board */
.gh-kanban-scroll {
  width: 100%;
  overflow-x: auto;
  background: #0d1117;
  padding: 10px;
  box-sizing: border-box;
}

.gh-kanban-board {
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, minmax(158px, 1fr));
  gap: 8px;
  min-width: 1154px;
  min-height: 955px;
}

.gh-kanban-col {
  background: #010409;
  border: 1px solid #21262d;
  border-radius: 8px;
  padding: 10px 6px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.gh-kanban-col.col-has-active {
  border-color: color-mix(in srgb, var(--col-color) 48%, #21262d);
  box-shadow: inset 0 1px 0 0 color-mix(in srgb, var(--col-color) 35%, transparent);
}

.gh-col-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  margin-bottom: 6px;
}

.gh-col-header-left {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.gh-col-ring {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid;
  flex-shrink: 0;
  box-sizing: border-box;
}

.gh-col-title {
  font-size: 13px;
  font-weight: 600;
  color: #f0f6fc;
  white-space: nowrap;
}

.gh-col-count {
  font-size: 11px;
  font-weight: 600;
  color: #8b949e;
  background: rgba(110, 118, 129, 0.2);
  padding: 0 6px;
  border-radius: 999px;
  line-height: 18px;
}

.gh-col-header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6e7681;
  font-size: 12px;
  flex-shrink: 0;
}

.gh-col-body {
  position: relative;
  flex: 1;
}

.gh-add-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 0;
  font-size: 12px;
  color: #6e7681;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Floating Animated Ticket Cards Layer */
.gh-cards-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.gh-ticket-card {
  position: absolute;
  top: 0;
  left: 0;
  height: 170px;
  box-sizing: border-box;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 8px;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: 16px 28px 57px 1fr;
  gap: 4px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  will-change: transform;
  z-index: 2;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.gh-ticket-card.is-processing {
  border-color: color-mix(in srgb, var(--ticket-accent) 60%, #30363d);
  box-shadow: 0 4px 14px -2px color-mix(in srgb, var(--ticket-accent) 28%, transparent);
}

.gh-ticket-card.is-prove-failing {
  border-color: #fbbf24;
  border-width: 1.5px;
  background: repeating-linear-gradient(
      -45deg,
      rgba(245, 158, 11, 0.16),
      rgba(245, 158, 11, 0.16) 9px,
      rgba(22, 27, 34, 0.96) 9px,
      rgba(22, 27, 34, 0.96) 18px
    ),
    #161b22;
  box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.4), 0 8px 24px -2px rgba(245, 158, 11, 0.55);
  z-index: 15;
}

.gh-ticket-card.is-prove-failing-2 {
  border-color: #f85149;
  border-width: 1.5px;
  background: repeating-linear-gradient(
      -45deg,
      rgba(248, 81, 73, 0.2),
      rgba(248, 81, 73, 0.2) 9px,
      rgba(22, 27, 34, 0.96) 9px,
      rgba(22, 27, 34, 0.96) 18px
    ),
    #161b22;
  box-shadow: 0 0 0 1px rgba(248, 81, 73, 0.5), 0 8px 24px -2px rgba(248, 81, 73, 0.6);
  z-index: 15;
}

.gh-ticket-card.is-stopped-dev {
  border-color: #f85149;
  border-width: 1.5px;
  background: linear-gradient(180deg, rgba(248, 81, 73, 0.12) 0%, rgba(22, 27, 34, 0.98) 100%),
    #161b22;
  box-shadow: 0 0 0 1px rgba(248, 81, 73, 0.35), 0 6px 18px -4px rgba(248, 81, 73, 0.45);
}

.gh-card-fail-banner {
  position: absolute;
  top: 26px;
  left: 6px;
  right: 6px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 4px 6px;
  border-radius: 5px;
  background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%);
  border: 1px solid #fef08a;
  color: #0d1117;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.75), 0 0 12px rgba(245, 158, 11, 0.65);
}

.gh-card-fail-banner.is-second-fail {
  background: linear-gradient(90deg, #dc2626 0%, #ef4444 50%, #dc2626 100%);
  border-color: #fecaca;
  color: #ffffff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.8), 0 0 14px rgba(248, 81, 73, 0.75);
}

.gh-fail-banner-icon {
  font-size: 11px;
  line-height: 1;
}

.gh-fail-banner-text {
  overflow: hidden;
  text-overflow: ellipsis;
}

.gh-ticket-card.is-queued-fifo {
  border-color: rgba(148, 163, 184, 0.45);
  box-shadow: 0 2px 10px -2px rgba(148, 163, 184, 0.18);
}

.gh-ticket-card.is-flying {
  z-index: 20;
  border-color: var(--ticket-accent);
  background: #1c2129;
  box-shadow: 0 14px 28px -4px rgba(0, 0, 0, 0.7), 0 0 16px -2px var(--ticket-accent);
}

.gh-ticket-card.is-done {
  border-color: rgba(63, 185, 80, 0.35);
}

.gh-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  min-width: 0;
  width: 100%;
}

.gh-card-issue-id {
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  overflow: hidden;
}

.gh-issue-icon.open {
  color: #3fb950;
  flex-shrink: 0;
}

.gh-issue-icon.done {
  color: #a371f7;
  flex-shrink: 0;
}

.gh-card-repo {
  font-size: 11px;
  color: #8b949e;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gh-card-dots {
  font-size: 10px;
  color: #6e7681;
  flex-shrink: 0;
}

.gh-card-title {
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  height: 28px;
  min-height: 0;
  max-height: 28px;
  min-width: 0;
  width: 100%;
  color: #e6edf3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.gh-card-enriched {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 3px;
  height: 57px;
  min-height: 0;
  min-width: 0;
  width: 100%;
}

.gh-enriched-block {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 17px;
  padding: 0 5px;
  border-radius: 3px;
  border-left: 2.5px solid;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 9px;
  line-height: 15px;
}

.gh-enriched-block.enriched-think {
  border-left-color: #db61a2;
  background: rgba(219, 97, 162, 0.12);
}

.gh-enriched-block.enriched-plan {
  border-left-color: #2f81f7;
  background: rgba(47, 129, 247, 0.12);
}

.gh-enriched-block.enriched-prove-fail {
  border-left-color: #f59e0b;
  background: rgba(245, 158, 11, 0.18);
  border: 1px solid rgba(251, 191, 36, 0.35);
  border-left-width: 2.5px;
  border-left-color: #fbbf24;
}

.gh-enriched-block.enriched-prove-fail-2 {
  background: rgba(248, 81, 73, 0.2);
  border: 1px solid rgba(248, 81, 73, 0.45);
  border-left-width: 2.5px;
  border-left-color: #f85149;
}

.gh-enriched-block.enriched-prove-fix {
  border-left-color: #3fb950;
  background: rgba(63, 185, 80, 0.12);
}

.gh-enriched-tag {
  font-weight: 700;
  flex-shrink: 0;
  white-space: nowrap;
}

.enriched-think .gh-enriched-tag {
  color: #f778ba;
}

.enriched-plan .gh-enriched-tag {
  color: #58a6ff;
}

.enriched-prove-fail .gh-enriched-tag {
  color: #fbbf24;
}

.enriched-prove-fail .gh-enriched-text {
  color: #fde68a;
}

.enriched-prove-fail-2 .gh-enriched-tag {
  color: #ff7b72;
}

.enriched-prove-fail-2 .gh-enriched-text {
  color: #fecaca;
}

.enriched-prove-fix .gh-enriched-tag {
  color: #3fb950;
}

.gh-enriched-text {
  flex: 1;
  min-width: 0;
  color: #c9d1d9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gh-enriched-cost {
  flex-shrink: 0;
  margin-left: auto;
  font-size: 8.5px;
  font-weight: 600;
  color: #8b949e;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.enriched-prove-fail .gh-enriched-cost {
  color: #fcd34d;
}

.enriched-prove-fail-2 .gh-enriched-cost {
  color: #fca5a5;
}

.enriched-prove-fix .gh-enriched-cost {
  color: #86efac;
}

.gh-card-footer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3px;
  min-height: 0;
  min-width: 0;
  width: 100%;
}

.gh-card-pills {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 18px;
  flex-shrink: 0;
  flex-wrap: nowrap;
}

.gh-priority-pill {
  display: inline-flex;
  align-items: center;
  height: 18px;
  flex-shrink: 0;
  box-sizing: border-box;
  font-size: 10px;
  font-weight: 600;
  padding: 0 7px;
  border-radius: 999px;
  line-height: 1;
  white-space: nowrap;
}

.priority-high {
  color: #ff7b72;
  background: rgba(248, 81, 73, 0.15);
  border: 1px solid rgba(248, 81, 73, 0.4);
}

.priority-medium {
  color: #e3b341;
  background: rgba(210, 153, 34, 0.15);
  border: 1px solid rgba(210, 153, 34, 0.4);
}

.gh-trigger-pill {
  display: inline-flex;
  align-items: center;
  height: 18px;
  flex-shrink: 0;
  box-sizing: border-box;
  font-size: 9.5px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 600;
  color: #f0883e;
  background: rgba(219, 109, 40, 0.15);
  border: 1px solid rgba(219, 109, 40, 0.45);
  padding: 0 6px;
  border-radius: 999px;
  line-height: 1;
  white-space: nowrap;
}

.gh-needs-dev-pill {
  display: inline-flex;
  align-items: center;
  height: 18px;
  flex-shrink: 0;
  box-sizing: border-box;
  font-size: 9px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 700;
  color: #fecaca;
  background: rgba(248, 81, 73, 0.22);
  border: 1px solid rgba(248, 81, 73, 0.65);
  padding: 0 6px;
  border-radius: 999px;
  line-height: 1;
  white-space: nowrap;
  box-shadow: 0 0 8px rgba(248, 81, 73, 0.3);
}

.gh-done-pill {
  display: inline-flex;
  align-items: center;
  height: 18px;
  flex-shrink: 0;
  box-sizing: border-box;
  font-size: 9.5px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 600;
  color: #3fb950;
  background: rgba(63, 185, 80, 0.14);
  border: 1px solid rgba(63, 185, 80, 0.35);
  padding: 0 6px;
  border-radius: 999px;
  line-height: 1;
  white-space: nowrap;
}

.gh-cost-pill {
  display: inline-flex;
  align-items: center;
  height: 16px;
  margin-left: auto;
  flex-shrink: 0;
  box-sizing: border-box;
  font-size: 9.5px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #7dd3fc;
  background: rgba(56, 189, 248, 0.14);
  border: 1px solid rgba(56, 189, 248, 0.4);
  padding: 0 5px;
  border-radius: 999px;
  line-height: 1;
  white-space: nowrap;
}

.gh-card-pipeline {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
  min-width: 0;
  width: 100%;
}

.gh-card-pipeline-row {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 13px;
  flex-shrink: 0;
  min-width: 0;
  width: 100%;
}

.gh-mini-spinner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  flex-shrink: 0;
}

.gh-mini-spinner.spinning {
  @media (prefers-reduced-motion: no-preference) {
    animation: gh-spin 0.75s linear infinite;
  }
}

.gh-fifo-wait-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #cbd5e1;
  box-shadow: 0 0 6px rgba(203, 213, 225, 0.7);
  flex-shrink: 0;
}

.gh-fail-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fbbf24;
  box-shadow: 0 0 6px #f59e0b;
  flex-shrink: 0;
}

.gh-stop-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #f85149;
  box-shadow: 0 0 7px #f85149;
  flex-shrink: 0;
}

.gh-card-step-text {
  flex: 1;
  min-width: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 9.5px;
  line-height: 13px;
  color: #8b949e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gh-card-step-text.is-failing-text {
  color: #fde68a;
  font-weight: 700;
}

.gh-card-step-text.is-stopped-text {
  color: #fca5a5;
  font-weight: 700;
}

.gh-card-progress-bg {
  width: 100%;
  box-sizing: border-box;
  height: 4px;
  min-height: 4px;
  flex-shrink: 0;
  background: #21262d;
  border-radius: 999px;
  overflow: hidden;
}

.gh-card-progress-bar {
  height: 100%;
  border-radius: 999px;
  box-shadow: 0 0 8px var(--ticket-accent);
  transition: width 0.08s linear;
}

.gh-card-progress-bar.is-waiting-fifo {
  opacity: 0.85;
}

.gh-card-flight-badge {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 9.5px;
  font-weight: 700;
  color: var(--ticket-accent);
}

.gh-card-flight-badge .is-retrying-flight {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: #0d1117;
  background: #fbbf24;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 800;
}

@keyframes gh-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 960px) {
  .actions-runners-grid {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
  }
  .showcase-title {
    font-size: 22px;
  }
}
</style>
