import { getJWT, removeJWT, getToken } from '@/utils/authority-utils.js'
import { getUserBasicInfo, ssoLogout } from '@/services/user.js'
import { getdbList } from "@/services/space"

export default {
  namespaced: true,
  state: {
    user: undefined,
    permissions: null,
    roles: null,
    routesConfig: null,
    jwt: getJWT(),
    token: getToken(),
    userBasicInfo: {},
    spaceId: sessionStorage.getItem('spaceId') || '',
    spaceName: sessionStorage.getItem('spaceName') || '我的空间',
    dbList: []
  },
  getters: {
    user: state => {
      if (!state.user) {
        try {
          const user = localStorage.getItem(process.env.VUE_APP_USER_KEY)
          state.user = JSON.parse(user)
        } catch (e) {
          console.error(e)
        }
      }
      return state.user
    },
    permissions: state => {
      if (!state.permissions) {
        try {
          const permissions = localStorage.getItem(process.env.VUE_APP_PERMISSIONS_KEY)
          state.permissions = JSON.parse(permissions)
          state.permissions = state.permissions ? state.permissions : []
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.permissions
    },
    roles: state => {
      if (!state.roles) {
        try {
          const roles = localStorage.getItem(process.env.VUE_APP_ROLES_KEY)
          state.roles = JSON.parse(roles)
          state.roles = state.roles ? state.roles : []
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.roles
    },
    routesConfig: state => {
      if (!state.routesConfig) {
        try {
          const routesConfig = localStorage.getItem(process.env.VUE_APP_ROUTES_KEY)
          state.routesConfig = JSON.parse(routesConfig)
          state.routesConfig = state.routesConfig ? state.routesConfig : []
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.routesConfig
    },
    userBasicInfo: state => {
      if (!state.userBasicInfo) {
        try {
          const userBasicInfo = localStorage.getItem('userBasicInfo')
          state.userBasicInfo = JSON.parse(userBasicInfo)
        } catch (e) {
          console.error(e)
        }
      }
      return state.userBasicInfo
    },
    spaceId: state => {
      return state.spaceId
    },
    spaceName: state => {
      return state.spaceName
    },
    dbList: state => {
      return state.dbList
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem(process.env.VUE_APP_USER_KEY, JSON.stringify(user))
    },
    setPermissions(state, permissions) {
      state.permissions = permissions
      localStorage.setItem(process.env.VUE_APP_PERMISSIONS_KEY, JSON.stringify(permissions))
    },
    setRoles(state, roles) {
      state.roles = roles
      localStorage.setItem(process.env.VUE_APP_ROLES_KEY, JSON.stringify(roles))
    },
    setRoutesConfig(state, routesConfig) {
      state.routesConfig = routesConfig
      localStorage.setItem(process.env.VUE_APP_ROUTES_KEY, JSON.stringify(routesConfig))
    },
    SET_USERBASICINFO(state, userBasicInfo) {
      state.userBasicInfo = userBasicInfo;
      // localStorage.setItem('user', 'administrator');
      localStorage.setItem('userBasicInfo', JSON.stringify(userBasicInfo));
      localStorage.setItem('user', userBasicInfo?.userName);
    },
    setSpaceId(state, spaceId) {
      state.spaceId = spaceId;
      sessionStorage.setItem('spaceId', spaceId);
    },
    setSpaceName(state, spaceName) {
      state.spaceName = spaceName;
      sessionStorage.setItem('spaceName', spaceName);
    },
    setDblist(state, dbList) {
      state.dbList = dbList;
    }
  },
  actions: {
    // remove token
    // resetToken({ commit }) {
    //   return new Promise(resolve => {
    //     removeToken(); // must remove  token  first
    //     commit('RESET_STATE');
    //     resolve();
    //   });
    // },
    setSpaceName({ commit }, data) {
      commit('setSpaceName', data.spaceName);
      commit('setSpaceId', data.spaceId);
      //
      getdbList({
        spaceName: data.spaceName,
      }).then((res) => {
        res.data?.map(item => {
          item.label = item.dbName
          // item.value = item.dbId
          item.value = item.dbName
        })
        commit('setDblist', res.data || []);
      });
    },
    getUserBasicInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserBasicInfo().then(response => {
          const { data } = response || {};
          commit('SET_USERBASICINFO', data);
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    },
    logout() {
      removeJWT();
      ssoLogout();
    }
  }
}
