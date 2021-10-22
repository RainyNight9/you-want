<template>
  <a-dropdown placement="bottomRight">
    <div class="header-avatar" style="cursor: pointer; height: 64px;">
      <a-avatar class="avatar" size="small" shape="circle" :src="userBasicInfo.avatar" />
      <span class="name">{{ userBasicInfo.userCnName }}</span>
      <a-icon class="icon" type="down" />
    </div>
    <a-card class="avatar-card" slot="overlay">
      <p><span>姓名：</span>{{ userBasicInfo.userCnName }}</p>
      <p><span>账号：</span>{{ userBasicInfo.userName }}</p>
      <p><span>邮箱：</span>{{ userBasicInfo.email }}</p>
      <p><span>组织：</span>{{ userBasicInfo.yachDep }}</p>
    </a-card>
  </a-dropdown>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HeaderAvatar",
  computed: {
    ...mapGetters("account", ["user", "userBasicInfo"]),
  },
  mounted(){
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
.header-avatar {
  display: inline-flex;
  .avatar,
  .name,
  .icon {
    align-self: center;
    font-size: 14px;
    margin-left: 4px;
  }
  .avatar {
    margin-right: 8px;
    width: 32px;
    height: 32px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
}
.avatar-card {
  padding: 24px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 12px 0px rgba(24, 86, 237, 0.08);
  border: 1px solid rgba(232, 235, 241, 1);
  p {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(26, 32, 49, 1);
    line-height: 22px;
    span {
      display: inline-block;
      text-align: right;
      width: 50px;
      color: rgba(121, 123, 132, 1);
    }
  }
  p:last-child{
    margin-bottom: 0
  }
}
</style>
