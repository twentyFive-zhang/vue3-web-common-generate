export const routes = [
  {
    path: '/pc',
    name: 'Pc',
    component: () => import('@/views/pc/layout'),
    redirect: '/pc/home',
    children: [
      {
        path: 'home',
        name: 'PcHome',
        component: () => import('@/views/pc/home')
      },
      {
        path: 'aboutUs',
        name: 'PcAboutUs',
        component: () => import('@/views/pc/aboutUs')
      }
    ]
  },
  {
    path: '/mobile',
    name: 'Mobile',
    component: () => import('@/views/mobile/layout'),
    redirect: '/mobile/home',
    children: [
      {
        path: 'home',
        name: 'MobileHome',
        component: () => import('@/views/mobile/home')
      },
      {
        path: 'space',
        name: 'MobileSpace',
        component: () => import('@/views/mobile/space')
      },
      {
        path: 'detail',
        name: 'MobileDetail',
        component: () => import('@/views/mobile/detail')
      }
    ]
  }
]
