<template>
  <a-modal v-model="visible" title="提示" @ok="handleOk" centered>
     <p><a-icon type="info-circle" theme="filled" class="warnIcon" style="color: #E6A23C;border-radius: 50%;margin-right: 8px"/>
      确认删除改任务么？</p>
  </a-modal>
</template>

<script>
export default {
  name: 'DelModal',
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
  },
}
</script>

<style scoped lang="less">
@import "index";
</style>