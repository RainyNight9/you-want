<template>
  <a-layout-sider
    :theme="sideTheme"
    :class="['side-menu', 'beauty-scroll', isMobile ? null : 'shadow']"
    width="200px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <!-- logo 项目名称 -->
    <div v-if="false" :class="['logo', theme]">
      <router-link to="/dashboard/workplace">
        <!-- logo图 -->
        <img src="" />
        <h1>{{ systemName }}</h1>
      </router-link>
    </div>
    <!-- 菜单 -->
    <i-menu
      :theme="theme"
      :collapsed="collapsed"
      :options="menuData"
      @select="onSelect"
      class="menu"
    />
    <!-- 切换菜单隐藏 -->
    <a-icon
      v-if="layout !== 'head'"
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="toggleCollapse"
    />
  </a-layout-sider>
</template>

<script>
import IMenu from "./menu";
import { mapState, mapMutations } from "vuex";
export default {
  name: "SideMenu",
  components: { IMenu },
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false,
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
    menuData: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      required: false,
      default: "dark",
    },
  },
  watch: {
    $route(val) {
      this.setActivated(val)
    },
    layout() {
      this.setActivated(this.$route)
    }
  },
  computed: {
    sideTheme() {
      return this.theme == "light" ? this.theme : "dark";
    },
    ...mapState("setting", ["isMobile", "layout", "systemName"]),
  },
  methods: {
    ...mapMutations('setting', ['setActivatedFirst']),
    setActivated(route) {
      if (this.layout === 'mix') {
        let matched = route.matched
        matched = matched.slice(0, matched.length - 1)
        const {firstMenu} = this
        for (let menu of firstMenu) {
          if (matched.findIndex(item => item.path === menu.fullPath) !== -1) {
            this.setActivatedFirst(menu.fullPath)
            break
          }
        }
      }
    },
    toggleCollapse() {
      this.$emit("toggleCollapse");
    },
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    },
  },
};
</script>

<style lang="less" scoped>
@import "index";
</style>
