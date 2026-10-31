import DefaultTheme, { VPButton } from 'vitepress/theme';
import { useData } from 'vitepress';
import { h } from 'vue';
import AnimatedLogo from './AnimatedLogo.vue';
import HomeHeroInfo from './HomeHeroInfo.vue';
import KanbanFactoryAnimation from './KanbanFactoryAnimation.vue';
import DeliveryFlowchart from './DeliveryFlowchart.vue';
import SquadFlowchart from './SquadFlowchart.vue';
import MetricChart from './MetricChart.vue';
import EnablerBlock from './EnablerBlock.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  Layout() {
    const { frontmatter } = useData();
    return h(DefaultTheme.Layout, null, {
      'home-hero-info': () => h(HomeHeroInfo),
      'home-hero-image': () => h(AnimatedLogo),
      'home-features-before': () => h(KanbanFactoryAnimation),
      'home-features-after': () => {
        const actions = frontmatter.value.hero?.actions;
        if (!actions?.length) return null;
        return h(
          'div',
          { class: 'home-bottom-actions' },
          actions.map((action) =>
            h('div', { key: action.link, class: 'action' }, [
              h(VPButton, {
                tag: 'a',
                size: 'medium',
                theme: action.theme,
                text: action.text,
                href: action.link,
                target: action.target,
                rel: action.rel,
              }),
            ])
          )
        );
      },
    });
  },
  enhanceApp({ app }) {
    app.component('KanbanFactoryAnimation', KanbanFactoryAnimation);
    app.component('DeliveryFlowchart', DeliveryFlowchart);
    app.component('SquadFlowchart', SquadFlowchart);
    app.component('MetricChart', MetricChart);
    app.component('EnablerBlock', EnablerBlock);
  },
};
