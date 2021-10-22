import { hasAuthority } from '@/utils/authority-utils'
// import { loginIgnore } from '@/router/index'
// import { checkAuthorization } from '@/utils/request'
// import store from '@/store'
// import { getJWT } from '@/utils/authority-utils.js'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

/**
 * 进度条开始
 * @param to
 * @param form
 * @param next
 */
const progressStart = (to, from, next) => {
  // start progress bar
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  next()
}

/**
 * 登录守卫
 * @param to 即将要进入的目标路由对象
 * @param form 当前导航正要离开的路由对象
 * @param next 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
 * @param options
 */
const loginGuard = async (to, from, next, options) => {
  const { message } = options
  // if (!loginIgnore.includes(to) && !checkAuthorization()) {
  //   message.warning('登录已失效，请重新登录')
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }

  // Json Web Token（Json表示令牌的原始值是一个Json格式的数据，web表示是在互联网传播的，token表示令牌，简称JWT)
  // 获取存储在 cookie 中的jwt
  // const jwt = getJWT();
  // if (!loginIgnore.includes(to) && !jwt) {
  //   message.warning('登录已失效，请重新登录')
  //   // 退出登录，重新跳转登录页
  //   store.dispatch('account/logout');
  // } else {
  //   // 获取基础用户信息
  //   if (!store.getters['account/userBasicInfo'].realName) {
  //     await store.dispatch('account/getUserBasicInfo');
  //   }
  //   next()
  // }

  message.success('欢迎👏')
  next()
}

/**
 * 权限守卫
 * @param to 即将要进入的目标路由对象
 * @param form
 * @param next
 * @param options
 */
const authorityGuard = (to, from, next, options) => {
  const { store, message } = options
  const permissions = store.getters['account/permissions']
  const roles = store.getters['account/roles']
  if (!hasAuthority(to, permissions, roles)) {
    message.warning(`对不起，您无权访问页面: ${to.fullPath}，请联系管理员`)
    next({ path: '/403' })
    // NProgress.done()
  } else {
    next()
  }
}

/**
 * 混合导航模式下一级菜单跳转重定向
 * @param to 
 * @param from
 * @param next
 * @param options
 * @returns {*}
 */
const redirectGuard = (to, from, next, options) => {
  const { store } = options
  const getFirstChild = (routes) => {
    const route = routes[0]
    if (!route.children || route.children.length === 0) {
      return route
    }
    return getFirstChild(route.children)
  }
  if (store.state.setting.layout === 'mix') {
    const firstMenu = store.getters['setting/firstMenu']
    if (firstMenu.find(item => item.fullPath === to.fullPath)) {
      store.commit('setting/setActivatedFirst', to.fullPath)
      const subMenu = store.getters['setting/subMenu']
      if (subMenu.length > 0) {
        const redirect = getFirstChild(subMenu)
        return next({ path: redirect.fullPath })
      }
    }
  }
  next()
}

/**
 * 进度条结束
 * @param to
 * @param form
 * @param options
 */
const progressDone = () => {
  // finish progress bar
  NProgress.done()
}

export default {
  beforeEach: [progressStart, loginGuard, authorityGuard, redirectGuard],
  afterEach: [progressDone]
}
