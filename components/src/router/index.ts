import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../landing/Landing.vue';
import isNotAuthenticatedGuard from '../module/auth/guards/is-not-authenticated.guard';
import isAuthenticatedGuard from '../module/auth/guards/is-authenticated.guard';

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
          component: () => import("../module/common/components/MenuMain.vue"),
          beforeEnter: isAuthenticatedGuard,
        }
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../module/common/components/NotFound.vue')
    },
    {
      path: '/error-500',
      name: 'ServerError',
      component: () => import('../module/common/components/ServerError.vue')
    }
    
  ],
});

export default router;
