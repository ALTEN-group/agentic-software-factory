import { fileURLToPath, URL } from 'node:url'
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
    resolve: {
      alias: [
        {
          find: /^.*\/VPNavBarTranslations\.vue$/,
          replacement: fileURLToPath(new URL('./theme/LangSwitch.vue', import.meta.url)),
        },
      ],
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
    socialLinks: [],
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      description: 'The operating layer that connects strategy, execution, AI, and delivery into one continuous system.',
      themeConfig: {
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
              { text: '👥 Team', link: '/guide/team' },
              { text: '🗓️ Cadence', link: '/guide/cadence' },
              { text: '⚖️ Governance', link: '/guide/governance' },
              { text: '📊 Metrics', link: '/guide/metrics' },
            ],
          },
          {
            text: 'Adoption',
            items: [
              { text: '🗺️ Roadmap', link: '/guide/adoption' },
              { text: '🚧 Anti-patterns', link: '/guide/anti-patterns' },
            ],
          },
        ],
        footer: {
          message: 'Published and maintained by <strong>ALTEN</strong>',
        },
      },
    },
    fr: {
      label: 'Français',
      lang: 'fr',
      description: 'Le modèle opérationnel qui connecte stratégie, exécution, IA et livraison en un système continu.',
      themeConfig: {
        sidebar: [
          {
            items: [
              { text: 'Vue d’ensemble', link: '/fr/guide/overview' },
            ],
          },
          {
            text: 'Étapes',
            items: [
              { text: '🎙️ 0 — Meet', link: '/fr/guide/stage-meet' },
              { text: '🎯 1 — Triage', link: '/fr/guide/stage-triage' },
              { text: '💡 2 — Think', link: '/fr/guide/stage-think' },
              { text: '📋 3 — Plan', link: '/fr/guide/stage-plan' },
              { text: '⚡ 4 — Code', link: '/fr/guide/stage-code' },
              { text: '✅ 5 — Prove', link: '/fr/guide/stage-prove' },
              { text: '🚀 6 — Release', link: '/fr/guide/stage-release' },
              { text: '📈 7 — Learn', link: '/fr/guide/stage-learn' },
            ],
          },
          {
            text: 'Fondations',
            items: [
              { text: '🛤️ Rails de plateforme', link: '/fr/guide/platform-rails' },
              { text: '🧰 Outillage', link: '/fr/guide/tooling' },
              { text: '🧠 Contexte persistant', link: '/fr/guide/persistent-context' },
              { text: '🛡️ Contrôles déterministes', link: '/fr/guide/deterministic-controls' },
              { text: '📦 Forge', link: '/fr/guide/forge' },
            ],
          },
          {
            text: 'Organisation',
            items: [
              { text: '👥 Équipe', link: '/fr/guide/team' },
              { text: '🗓️ Cadence', link: '/fr/guide/cadence' },
              { text: '⚖️ Gouvernance', link: '/fr/guide/governance' },
              { text: '📊 Métriques', link: '/fr/guide/metrics' },
            ],
          },
          {
            text: 'Adoption',
            items: [
              { text: '🗺️ Feuille de route', link: '/fr/guide/adoption' },
              { text: '🚧 Anti-patterns', link: '/fr/guide/anti-patterns' },
            ],
          },
        ],
        footer: {
          message: 'Publié et maintenu par <strong>ALTEN</strong>',
        },
        outline: {
          label: 'Sur cette page',
        },
        docFooter: {
          prev: 'Page précédente',
          next: 'Page suivante',
        },
        darkModeSwitchLabel: 'Apparence',
        lightModeSwitchTitle: 'Passer au thème clair',
        darkModeSwitchTitle: 'Passer au thème sombre',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Retour en haut',
        langMenuLabel: 'Changer de langue',
      },
    },
  },
}))
