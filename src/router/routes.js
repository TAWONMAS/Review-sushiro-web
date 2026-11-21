const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/pages/MenuPage.vue') },
      {
        path: '/reviews',
        name: 'reviews',
        component: () => import('@/pages/ReviewPage.vue'),
        meta: {
          requiresAuth: true,
          roles: ['user', 'admin'],
        },
      },
      { path: '/menu', name: 'menu', component: () => import('@/pages/MenuPage.vue') },
      { path: '/about', name: 'about', component: () => import('@/pages/AboutusPage.vue') },
      { path: '/login', name: 'login', component: () => import('@/pages/LoginPage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
]

export default routes
