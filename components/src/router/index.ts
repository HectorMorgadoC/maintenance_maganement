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
        },
        {
          path: 'clients',
          name: 'client',
          component: () => import("../module/client/layout/ListClient.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'process',
          name: 'process',
          component: () => import("../module/client/layout/ListClient.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'teams',
          name: 'team',
          component: () => import("../module/client/layout/ListClient.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'orders',
          name: 'order',
          component: () => import("../module/client/layout/ListClient.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'reports',
          name: 'report',
          component: () => import("../module/client/layout/ListClient.vue"),
          beforeEnter: isAuthenticatedGuard
        },
        {
          path: 'createClient',
          name: 'createClient',
          component: () => import("../module/client/view/CreateClient.vue"),
          beforeEnter: isAuthenticatedGuard
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
