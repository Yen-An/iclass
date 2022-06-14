
let routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/index.vue') },
      {
        path: '/Chooseclass',
        component: () => import('pages/Chooseclass.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/main',
        component: () => import('pages/main.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/class',
        component: () => import('pages/class.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/chatroom',
        component: () => import('pages/chatroom.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/post',
        component: () => import('pages/post.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/feedback',
        component: () => import('pages/feedback.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/hw',
        component: () => import('pages/hw.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/irs',
        component: () => import('pages/irs.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/test',
        component: () => import('pages/test.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/mark',
        component: () => import('pages/mark.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/uploader',
        component: () => import('pages/uploader.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
