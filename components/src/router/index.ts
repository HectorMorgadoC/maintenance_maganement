import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../landing/Landing.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ladding',
      component: Landing,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../module/auth/views/LoginView.vue'),
        },
        {
          path: 'menu',
          name: "menu",
          component: () => import("../module/common/components/MenuMain.vue")
        }
      ],
    },
  ],
});

export default router;
