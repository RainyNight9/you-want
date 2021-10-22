import {LOGIN, ROUTES} from '@/services/api'
import {request, METHOD, removeAuthorization} from '@/utils/request'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
  return request(LOGIN, METHOD.POST, {
    name: name,
    password: password
  })
}

export async function getRoutesConfig() {
  return request(ROUTES, METHOD.GET)
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}

/**
 * sso 单点登录退出
 */
export function ssoLogout() {
  const { VUE_APP_SSO_LOGIN_URL, VUE_APP_SSO_LOGOUT_URL, VUE_APP_APPID } = process.env;
  window.location.href = VUE_APP_SSO_LOGOUT_URL + VUE_APP_SSO_LOGIN_URL + VUE_APP_APPID + `?redirect=${location.href}`;
}

/**
 * sso 获取用户基本信息
 */
export async function getUserBasicInfo() {
  // return request(`/manageCenter/api/server/getUserInfo`, METHOD.GET);
  return request(`/manageCenter/api/server/getUserInfo`, METHOD.GET);
  // const data = {
  //   'errcode': 0,
  //   'errmsg': '请求成功',
  //   'data': {
  //     name: '美少女',
  //     avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606111168957&di=e2f38b7eb4211c2db97f3461c29d8794&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-12-01%2F032328668.jpg',
  //     watermark: 'meishaonv',
  //     enName: 'admin'
  //   }
  // };
  // return new Promise((resolve) => {
  //   resolve(data);
  // })
}

export async function verify(data) {
  return request({
    url: '/login/verify',
    method: 'get',
    params: data
  });
}

/**
 * 获取用户的空间及对应角色(角色包括amind,plat_owner等)
 */
export async function getUserSpace() {
  return request(`/api/server/getUserSpace`, METHOD.GET);
}

/**
 * 获取用户的空间及对应角色(角色包括amind,plat_owner等)
 */
export async function alarmGetUserSpace() {
  return request(`/dataQualityCenter/alarm/getUserSpace`, METHOD.GET);
}

export default {
  login,
  logout,
  getRoutesConfig
}
