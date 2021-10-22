<template>
  <a-layout :class="['admin-layout', 'beauty-scroll']">
    <!-- 设置菜单 -->
    <drawer v-if="!hideSetting" v-model="showSetting" placement="right">
      <div class="setting" slot="handler">
        <a-icon :type="showSetting ? 'close' : 'setting'" />
      </div>
      <setting />
    </drawer>

    <!-- 移动端菜单 -->
    <drawer v-if="isMobile" v-model="drawerOpen">
      <side-menu
        :theme="theme.mode"
        :menuData="menuData"
        :collapsed="false"
        :collapsible="false"
        @menuSelect="onMenuSelect"
      />
    </drawer>

    <!-- 页面header -->
    <admin-header
      :class="[
        {
          'fixed-tabs': fixedTabs,
          'fixed-header': fixedHeader,
          'multi-page': multiPage,
        },
      ]"
      :style="headerStyle"
      :menuData="headMenuData"
      :collapsed="collapsed"
      @toggleCollapse="toggleCollapse"
    />
    <a-layout-header
      :class="[
        'virtual-header',
        {
          'fixed-tabs': fixedTabs,
          'fixed-header': fixedHeader,
          'multi-page': multiPage,
        },
      ]"
      v-show="fixedHeader"
    ></a-layout-header>

    <a-layout>
      <!-- PC端菜单 -->
      <side-menu
        :class="[fixedSideBar ? 'fixed-side' : '']"
        :theme="theme.mode"
        v-if="layout === 'side' || layout === 'mix'"
        :menuData="sideMenuData"
        :collapsed="collapsed"
        :collapsible="true"
        @toggleCollapse="toggleCollapse"
      />
      <div
        v-if="fixedSideBar && !isMobile"
        :style="`width: ${sideMenuWidth}; min-width: ${sideMenuWidth};max-width: ${sideMenuWidth};`"
        class="virtual-side"
      ></div>

      <a-layout>
        <!-- 面包屑菜单 -->
        <div class="breadcrumb">
          <a-breadcrumb>
            <a-breadcrumb-item :key="index" v-for="(item, index) in breadcrumb">
              <span>{{item}}</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <!-- 页面内容 -->
        <a-layout-content
          class="admin-layout-content"
          :style="`min-height: ${minHeight}px;`"
        >
          <div style="position: relative">
            <slot></slot>
          </div>
        </a-layout-content>

        <!-- 页脚 -->
        <a-layout-footer v-if="showFooter" style="padding: 0px">
          <page-footer :link-list="footerLinks" :copyright="copyright" />
        </a-layout-footer>
      </a-layout>
    </a-layout>

  </a-layout>
</template>

<script>
import AdminHeader from "./header/AdminHeader";
import PageFooter from "./footer/PageFooter";
import Drawer from "../components/tool/Drawer";
import SideMenu from "../components/menu/SideMenu";
import Setting from "../components/setting/Setting";
import { mapState, mapMutations, mapGetters } from "vuex";
import {getI18nKey} from '@/utils/routerUtil'

export default {
  name: "AdminLayout",
  components: { Setting, SideMenu, Drawer, PageFooter, AdminHeader },
  data() {
    return {
      minHeight: window.innerHeight - 64 - 122 + 76,
      collapsed: false,
      showSetting: false,
      drawerOpen: false,
      page: {}
    };
  },
  provide() {
    return {
      adminLayout: this,
    };
  },
  watch: {
    $route(val) {
      this.setActivated(val);
      this.page = this.$route.meta.page
    },
    layout() {
      this.setActivated(this.$route);
    },
    isMobile(val) {
      if (!val) {
        this.drawerOpen = false;
      }
    },
  },
  computed: {
    ...mapState("setting", [
      "isMobile",
      "theme",
      "layout",
      "footerLinks",
      "copyright",
      "fixedHeader",
      "fixedSideBar",
      "fixedTabs",
      "hideSetting",
      "multiPage",
      "showFooter",
    ]),
    ...mapGetters("setting", ["firstMenu", "subMenu", "menuData"]),
    sideMenuWidth() {
      return this.collapsed ? "60px" : "200px";
    },
    headerStyle() {
      let width =
        this.fixedHeader && this.layout !== "head" && !this.isMobile
          ? `calc(100%)`
          : "100%";
      let position = this.fixedHeader ? "fixed" : "static";
      return `width: ${width}; position: ${position};`;
    },
    headMenuData() {
      const { layout, menuData, firstMenu } = this;
      return layout === "mix" ? firstMenu : menuData;
    },
    sideMenuData() {
      const { layout, menuData, subMenu } = this;
      return layout === "mix" ? subMenu : menuData;
    },
    breadcrumb() {
      let page = this.page
      let breadcrumb = page && page.breadcrumb
      if (breadcrumb) {
        let i18nBreadcrumb = []
        breadcrumb.forEach(item => {
          i18nBreadcrumb.push(this.$t(item))
        })
        return i18nBreadcrumb
      } else {
        return this.getRouteBreadcrumb()
      }
    },
  },
  methods: {
    ...mapMutations("setting", ["correctPageMinHeight", "setActivatedFirst"]),
    getRouteBreadcrumb() {
      let routes = this.$route.matched
      let breadcrumb = []
      routes.forEach(route => {
        const path = route.path.length === 0 ? '/home' : route.path
        breadcrumb.push(this.$t(getI18nKey(path)))
      })
      let pageTitle = this.page && this.page.title
      if (pageTitle) {
        breadcrumb[breadcrumb.length - 1] = pageTitle
      }
      return breadcrumb
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    onMenuSelect() {
      this.toggleCollapse();
    },
    setActivated(route) {
      if (this.layout === "mix") {
        let matched = route.matched;
        matched = matched.slice(0, matched.length - 1);
        const { firstMenu } = this;
        for (let menu of firstMenu) {
          if (matched.findIndex((item) => item.path === menu.fullPath) !== -1) {
            this.setActivatedFirst(menu.fullPath);
            break;
          }
        }
      }
    },
  },
  created() {
    this.correctPageMinHeight(this.minHeight - 24);
    this.setActivated(this.$route);
  },
  beforeDestroy() {
    this.correctPageMinHeight(-this.minHeight + 24);
  },
};
</script>

<style lang="less" scoped>
.admin-layout {
  .side-menu {
    &.fixed-side {
      position: fixed;
      height: 100vh;
      left: 0;
      top: 0;
    }
  }
  .virtual-side {
    transition: all 0.2s;
  }
  .virtual-header {
    transition: all 0.2s;
    opacity: 0;
    &.fixed-tabs.multi-page:not(.fixed-header) {
      height: 0;
    }
  }
  .admin-layout-main {
    .admin-header {
      top: 0;
      right: 0;
      overflow: hidden;
      transition: all 0.2s;
      &.fixed-tabs.multi-page:not(.fixed-header) {
        height: 0;
      }
    }
  }
  .admin-layout-content {
    padding: 24px 24px 0;
    /*overflow-x: hidden;*/
    /*min-height: calc(100vh - 64px - 122px);*/
  }
  .setting {
    background-color: @primary-color;
    color: @base-bg-color;
    border-radius: 5px 0 0 5px;
    line-height: 40px;
    font-size: 22px;
    width: 40px;
    height: 40px;
    box-shadow: -2px 0 8px @shadow-color;
  }
  .breadcrumb{
    padding: 24px 24px 0;
  }
}
</style>
