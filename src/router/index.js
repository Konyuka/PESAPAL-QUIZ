import { createRouter, createWebHistory } from 'vue-router'
import RenderComponent from '../components/RenderPages.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: () => import('../components/RenderPages.vue'), dont lazy load
      component: RenderComponent,
      props: { source: "../../pages/home.md" }
    },
    {
      path: '/about',
      name: 'about',
      component: RenderComponent,
      props: { source: "../../pages/about.md" }
    },
    {
      path: '/*',
      name: 'error',
      component: () => import('../components/RenderPages.vue'),
      props: { source: "../../pages/error.md" }
    }
  ]
})

// catch undefined routes
router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next({ name: 'error' });
  } else {
    next();
  }
});

export default router
