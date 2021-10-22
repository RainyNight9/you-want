import DataView from '@/layouts/tabs/DataView'
import BlankView from '@/layouts/BlankView'
// import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/pages/demo'),
    },
    {
      path: '/',
      name: '',
      component: DataView,
      children: [
        {
          path: 'demo',
          name: 'demo',
          meta: {
            icon: 'line-chart',
          },
          component: BlankView,
          children: [
            {
              path: 'demo',
              name: 'demo',
              meta: {},
              component:  () => import('@/pages/demo')
            }
          ]
        }
      ]
    }
  ]
}

export default options
