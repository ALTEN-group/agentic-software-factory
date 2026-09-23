import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const defaultBase = process.env.NODE_ENV === 'production'
  ? (process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : '/agentic-software-factory/')
  : '/docs/'
const rawBase = process.env.VITEPRESS_BASE || defaultBase
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`

export default withMermaid(defineConfig({
  title: 'Agentic Software Factory',
  description: 'The operating layer that connects strategy, execution, AI, and delivery into one continuous system.',
  base,
  vite: {
    server: {
      port: 5175,
      host: true,
    },
    // mermaid >= 11.16 pulls CJS-only fastdom, which vitepress-plugin-mermaid does not pre-bundle
    optimizeDeps: {
      include: ['fastdom', 'fastdom/extensions/fastdom-promised.js'],
    },
  },
  mermaid: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    flowchart: {
      htmlLabels: true,
      padding: 18,
      nodeSpacing: 50,
      rankSpacing: 45,
      curve: 'basis',
    },
    themeVariables: {
      fontSize: '13.5px',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      edgeLabelBackground: 'transparent',
    },
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: false,
    sidebar: [
      {
        items: [
          { text: 'Overview', link: '/guide/overview' },
          { text: 'Principles', link: '/guide/principles' },
        ],
      },
      {
        text: 'The Stack',
        items: [
          { text: '0 — Foundation', link: '/guide/layer-foundation' },
          { text: '1 — Need', link: '/guide/layer-need' },
          { text: '2 — Plan', link: '/guide/layer-plan' },
          { text: '3 — Code', link: '/guide/layer-code' },
          { text: '4 — Proof', link: '/guide/layer-proof' },
          { text: '5 — Release', link: '/guide/layer-release' },
          { text: '6 — Learn', link: '/guide/layer-learn' },
        ],
      },
      {
        text: 'People',
        items: [
          { text: 'Squads', link: '/guide/squads' },
          { text: 'Roles', link: '/guide/roles' },
          { text: 'Enablement', link: '/guide/enablement' },
        ],
      },
      {
        text: 'Governance',
        items: [
          { text: 'Decision Rights', link: '/guide/decision-rights' },
          { text: 'AI Usage Policy', link: '/guide/ai-policy' },
          { text: 'Guardrails', link: '/guide/guardrails' },
        ],
      },
      {
        text: 'AI Operating Layer',
        items: [
          { text: 'Context Layer', link: '/guide/context-layer' },
          { text: 'Tooling', link: '/guide/tooling' },
        ],
      },
      {
        text: 'Running the Model',
        items: [
          { text: 'Cadence', link: '/guide/cadence' },
          { text: 'Metrics', link: '/guide/metrics' },
          { text: 'Adoption Roadmap', link: '/guide/adoption' },
          { text: 'Anti-patterns', link: '/guide/anti-patterns' },
        ],
      },
    ],
    socialLinks: [],
    footer: {
      message: 'Published and maintained by ALTEN',
    },
  },
}))
