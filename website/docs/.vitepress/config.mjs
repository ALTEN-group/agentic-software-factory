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
        ],
      },
      {
        text: 'Stages',
        items: [
          { text: '🎙️ 0 — Meet', link: '/guide/stage-meet' },
          { text: '🎯 1 — Triage', link: '/guide/stage-triage' },
          { text: '💡 2 — Think', link: '/guide/stage-think' },
          { text: '📋 3 — Plan', link: '/guide/stage-plan' },
          { text: '⚡ 4 — Code', link: '/guide/stage-code' },
          { text: '✅ 5 — Prove', link: '/guide/stage-prove' },
          { text: '🚀 6 — Release', link: '/guide/stage-release' },
          { text: '📈 7 — Learn', link: '/guide/stage-learn' },
        ],
      },
      {
        text: 'Enablers',
        items: [
          { text: '🛤️ Platform Rails', link: '/guide/platform-rails' },
          { text: '🧰 Tooling', link: '/guide/tooling' },
          { text: '🧠 Persistent Context', link: '/guide/persistent-context' },
          { text: '🛡️ Deterministic Controls', link: '/guide/deterministic-controls' },
          { text: '📦 Forge', link: '/guide/forge' },
        ],
      },
      {
        text: 'Organization',
        items: [
          { text: 'Team', link: '/guide/team' },
          { text: 'Cadence', link: '/guide/cadence' },
          { text: 'Governance', link: '/guide/governance' },
          { text: 'Metrics', link: '/guide/metrics' },
        ],
      },
      {
        text: 'Adoption',
        items: [
          { text: 'Roadmap', link: '/guide/adoption' },
          { text: 'Anti-patterns', link: '/guide/anti-patterns' },
        ],
      },
    ],
    socialLinks: [],
    footer: {
      message: 'Published and maintained by <strong>ALTEN</strong>',
    },
  },
}))
