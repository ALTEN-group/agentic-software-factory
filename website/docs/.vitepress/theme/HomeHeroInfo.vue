<script setup>
import { useData } from 'vitepress';

const { frontmatter } = useData();
</script>

<template>
  <div class="hero-brand-lockup">
    <!-- Brand Title Lockup with Monogram Emblem -->
    <div class="hero-brand-header">
      <div class="hero-brand-emblem-wrap">
        <svg viewBox="0 0 40 40" fill="none" class="hero-emblem-svg">
          <defs>
            <linearGradient id="hIsoTop" x1="6" y1="5" x2="34" y2="19" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#60A5FA"/>
              <stop offset="100%" stop-color="#3B82F6"/>
            </linearGradient>
            <linearGradient id="hIsoLeft" x1="6" y1="13" x2="20" y2="35" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#2563EB"/>
              <stop offset="100%" stop-color="#1D4ED8"/>
            </linearGradient>
            <linearGradient id="hIsoRight" x1="20" y1="13" x2="34" y2="35" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#1D4ED8"/>
              <stop offset="100%" stop-color="#0F172A"/>
            </linearGradient>
            <linearGradient id="hCyanCore" x1="16" y1="16" x2="24" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#38BDF8"/>
              <stop offset="100%" stop-color="#06B6D4"/>
            </linearGradient>
            <filter id="heroEmblemGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#38BDF8" flood-opacity="0.3" />
            </filter>
          </defs>
          <g transform="translate(0, 1)" filter="url(#heroEmblemGlow)">
            <!-- Isometric Top Roof Plane (Sawtooth Factory Pattern) -->
            <path d="M20 3L35 11.5L28 15.5L20 11L12 15.5L5 11.5L20 3Z" fill="url(#hIsoTop)"/>
            <path d="M20 3L35 11.5L28 15.5L20 11L12 15.5L5 11.5L20 3Z" stroke="#93C5FD" stroke-width="0.75" stroke-linejoin="round"/>

            <!-- Left Architectural Facet -->
            <path d="M5 11.5L20 20V37L5 28.5V11.5Z" fill="url(#hIsoLeft)"/>

            <!-- Right Architectural Facet -->
            <path d="M20 20L35 11.5V28.5L20 37V20Z" fill="url(#hIsoRight)"/>

            <!-- Center Cutout: Glowing Autonomous Delta Conduit (The 'A') -->
            <path d="M20 13L29 28H23L20 23L17 28H11L20 13Z" fill="url(#hCyanCore)"/>
            <!-- Delta Core Cross-bar / Energy Node -->
            <polygon points="20,18 22.5,23 17.5,23" fill="#FFFFFF"/>
            
            <!-- Fine Structural Isometric Seam -->
            <line x1="20" y1="11" x2="20" y2="37" stroke="#38BDF8" stroke-width="1" stroke-opacity="0.6"/>
          </g>
        </svg>
      </div>

      <div class="hero-brand-titles">
        <h1 class="brand-title-agentic">AGENTIC</h1>
        <div class="brand-title-factory">SOFTWARE FACTORY</div>
      </div>
    </div>

    <!-- Operating Model Headline -->
    <h2 class="hero-headline" v-if="frontmatter.hero?.text">
      {{ frontmatter.hero.text }}
    </h2>

    <!-- Tagline -->
    <p class="hero-tagline" v-if="frontmatter.hero?.tagline">
      {{ frontmatter.hero.tagline }}
    </p>
  </div>
</template>
