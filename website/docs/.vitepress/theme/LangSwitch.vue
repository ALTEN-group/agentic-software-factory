<script setup>
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';

const { lang, page } = useData();

const isFr = computed(() => lang.value === 'fr' || page.value.relativePath.startsWith('fr/'));

const targetHref = computed(() => {
  const rel = page.value.relativePath || 'index.md';
  // Strip leading 'fr/' if present
  const cleanRel = rel.replace(/^fr\//, '');
  // Convert markdown relative path to route path
  const routePath = cleanRel === 'index.md'
    ? '/'
    : `/${cleanRel.replace(/\.md$/, '')}`;

  const targetPath = isFr.value ? routePath : (routePath === '/' ? '/fr/' : `/fr${routePath}`);
  return withBase(targetPath);
});

const label = computed(() => (isFr.value ? 'EN' : 'FR'));
const title = computed(() => (isFr.value ? 'Switch to English' : 'Passer en français'));
</script>

<template>
  <div class="VPNavBarTranslations vp-lang-switch">
    <a
      :href="targetHref"
      class="vp-lang-switch-btn"
      :title="title"
      :aria-label="title"
    >
      {{ label }}
    </a>
  </div>
</template>
