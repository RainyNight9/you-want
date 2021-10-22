<template>
  <a-layout-header :class="[headerTheme, 'admin-header']">
    <div :class="['admin-header-wide', layout, pageWidth]">
      <!-- logo 系统名字 -->
      <router-link
        v-if="!isMobile || layout === 'head'"
        to="/"
        :class="['logo', isMobile ? null : 'pc', headerTheme]"
      >
        <!-- logo图 -->
        <!-- <img height="32" src="@/assets/img/logo_quality.png" /> -->
      </router-link>

      <a-divider class="divider" type="vertical" />

      <span v-if="!isMobile" class="systemName">{{ systemName }}</span>

      <a-divider v-if="isMobile" class="divider" type="vertical" />

      <!-- 切换菜单隐藏 -->
      <a-icon
        v-if="false && layout !== 'head'"
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="toggleCollapse"
      />

      <!-- 头部菜单栏 -->
      <div
        v-if="layout !== 'side' && !isMobile"
        class="admin-header-menu"
        :style="`width: ${menuWidth};`"
      >
        <i-menu
          class="head-menu"
          :theme="headerTheme"
          mode="horizontal"
          :options="menuData"
          @select="onSelect"
        />
      </div>

      <!-- 头部右侧 部分 -->
      <div :class="['admin-header-right', headerTheme]">
        <!-- 搜索 暂时隐藏掉，不需要的需求-->
        <header-search
          v-if="false"
          class="header-item"
          @active="(val) => (searchActive = val)"
        />
        <!-- 帮助文档 暂时隐藏掉，不需要的需求-->
        <a-tooltip
          v-if="false"
          class="header-item"
          title="帮助文档"
          placement="bottom"
        >
          <a href="" target="_blank">
            <a-icon type="question-circle-o" />
          </a>
        </a-tooltip>
        <!-- 消息 notice -->
        <a-tooltip v-if="false" placement="bottom">
          <template slot="title">
            消息中心
          </template>
          <header-notice />
        </a-tooltip>
        <a-divider v-if="false" class="divider" type="vertical" />
        <!-- 空间 -->
        <header-space />
        <a-divider class="divider" type="vertical" />
        <!-- 头像 avatar -->
        <header-avatar />
        <a-divider class="divider" type="vertical" />
        <!-- 退出按钮 -->
        <a-tooltip placement="bottom">
          <template slot="title">
            退出
          </template>
           <span class="imgBox">
            <img src="@/assets/img/tuichu.png" @click="logoutClick" class="imgIcon" />
          </span>
        </a-tooltip>
        <!-- 语言 lang -->
        <a-dropdown v-if="showLang" class="lang header-item">
          <div><a-icon type="global" /> {{ langAlias }}</div>
          <a-menu
            @click="(val) => setLang(val.key)"
            :selected-keys="[lang]"
            slot="overlay"
          >
            <a-menu-item v-for="lang in langList" :key="lang.key">{{
              lang.key.toLowerCase() + " " + lang.name
            }}</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import HeaderSearch from "./HeaderSearch";
import HeaderNotice from "./HeaderNotice";
import HeaderSpace from "./HeaderSpace";
import HeaderAvatar from "./HeaderAvatar";
import IMenu from "@/components/menu/menu";
import { mapState, mapMutations } from "vuex";

export default {
  name: "AdminHeader",
  components: { IMenu, HeaderAvatar, HeaderSpace, HeaderNotice, HeaderSearch },
  props: ["collapsed", "menuData"],
  data() {
    return {
      langList: [
        { key: "CN", name: "简体中文", alias: "简体" },
        { key: "HK", name: "繁體中文", alias: "繁體" },
        { key: "US", name: "English", alias: "English" },
      ],
      searchActive: false,
      spaceDeatil: {},
    };
  },
  computed: {
    ...mapState("setting", [
      "theme",
      "isMobile",
      "layout",
      "systemName",
      "lang",
      "showLang",
      "pageWidth",
    ]),
    headerTheme() {
      return this.theme.mode;
    },
    langAlias() {
      let lang = this.langList.find((item) => item.key == this.lang);
      return lang.alias;
    },
    menuWidth() {
      const { layout, searchActive } = this;
      const headWidth = layout === "head" ? "100% - 188px" : "100%";
      const extraWidth = searchActive ? "600px" : "400px";
      return `calc(${headWidth} - ${extraWidth})`;
    },
  },
  methods: {
    async logoutClick() {
      window.localStorage.removeItem(process.env.VUE_APP_USER_KEY);
      await this.$store.dispatch('account/logout');
    },
    toggleCollapse() {
      this.$emit("toggleCollapse");
    },
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    },
    ...mapMutations("setting", ["setLang"]),
  },
};
</script>

<style lang="less" scoped>
@import "index";
</style>
