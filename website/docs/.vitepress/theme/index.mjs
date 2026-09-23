import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import AnimatedLogo from './AnimatedLogo.vue';
import HomeHeroInfo from './HomeHeroInfo.vue';
import DeliveryFlowchart from './DeliveryFlowchart.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-info': () => h(HomeHeroInfo),
      'home-hero-image': () => h(AnimatedLogo),
    });
  },
  enhanceApp({ app }) {
    app.component('DeliveryFlowchart', DeliveryFlowchart);
  },
};
