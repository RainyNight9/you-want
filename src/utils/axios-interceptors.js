// import Cookie from 'js-cookie'
import store from '@/store'
import { getJWT, getToken } from '@/utils/authority-utils.js'

// 401拦截
const resp401 = {
  /**
   * 响应数据之前做点什么
   * @param response 响应对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(response, options) {
    const {message} = options
    if (response?.status === 401) {
      message.error('无此权限')
    }
    return response
  },
  /**
   * 响应出错时执行
   * @param error 错误对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const {message} = options
    const {response} = error
    if (response?.status === 401) {
      message.error('无此权限')
    }
    return Promise.reject(error)
  }
}

const resp403 = {
  onFulfilled(response, options) {
    const {message} = options
    if (response?.status === 403) {
      message.error('请求被拒绝')
    }
    return response
  },
  onRejected(error, options) {
    const {message} = options
    const {response} = error
    if (response?.status === 403) {
      message.error('请求被拒绝')
    }
    return Promise.reject(error)
  }
}

// 登录失效，重新跳转登录页
const respLogout = {
  onFulfilled(response, options) {
    const {message} = options
    if (response.data?.code === 2001 || response.data?.code === 5000) {
      // store.dispatch('account/logout');
      message.error('登录失效，重新跳转登录页')
    }
    return response
  },
  onRejected(error, options) {
    const {message} = options
    const {response} = error
    if (response.data?.code === 2001 || response.data?.code === 5000) {
      // store.dispatch('account/logout');
      message.error('登录失效，重新跳转登录页')
    }
    return Promise.reject(error)
  }
}

const resp200 = {
  /**
   * 响应数据之前做点什么
   * @param response 响应对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(response) {
    // const { message } = options;
    if (response.request.responseType == "blob") {
      return response;
    }
    // const codeNameMap = {
    // };
    // let userCanLookCode = [500];
    if (response.data?.code !== 200 && response.data?.errcode !== 0) {
      // if (userCanLookCode.includes(response.data?.code)) {
      //   message.error(response.data?.msg || "失败，请联系管理员！");
      // } else {
      //   message.error(codeNameMap[response.data?.code] || "失败，请联系管理员！");
      // }
    }
    return Promise.resolve(response.data || {});
  },
  /**
   * 响应出错时执行
   * @param error 错误对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const { message } = options;
    // 对响应错误做点什么
    console.error(error.response);
    message.error("接口失败，请联系管理员！");
    return error.response;
  },
};

const reqCommon = {
  /**
   * 发送请求之前做些什么
   * @param config axios config
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(config) {
    // const {message} = options
    // const {url, xsrfCookieName} = config
    // if (url.indexOf('login') === -1 && xsrfCookieName && !Cookie.get(xsrfCookieName)) {
    //   message.warning('认证 token 已过期，请重新登录')
    // }
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken();
    }
    // 添加jwt
    const jwt = getJWT();
    // if (jwt) {
    config.headers['JWT'] = jwt;
    // }

    return config
  },
  /**
   * 请求出错时做点什么
   * @param error 错误对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const {message} = options
    message.error(error.message)
    return Promise.reject(error)
  }
}

export default {
  request: [reqCommon], // 请求拦截
  response: [resp401, resp403, respLogout, resp200] // 响应拦截
}
