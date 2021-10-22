<template>
  <div class="DetailTitle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DetailTitle",
}
</script>

<style lang="less" scoped>
.DetailTitle {
  height: 24px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #1A2031;
  line-height: 24px;
  margin-bottom: 20px;
}
.DetailTitle:before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background: #1890FF;
  margin-right: 8px;
  position: relative;
  top: 0.1rem;
}
</style>>