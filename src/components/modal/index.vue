<template>
  <div class="modal">
    <a-modal
      :destroyOnClose="ModalProps.destroyOnClose || false"
      :title="ModalProps.title || ''"
      :visible="ModalProps.visible || false"
      :confirm-loading="ModalProps.confirmLoading || false"
      :cancelText="ModalProps.cancelText || '取消'"
      :okText="ModalProps.okText || '确定'"
      :okType="ModalProps.okType || 'primary'"
      :width="ModalProps.width || 640"
      :zIndex="ModalProps.zIndex || 1000"
      @ok="okClick"
      @cancel="onCancel"
    >
      <div ref="modal" class="content beauty-scroll">
        <slot></slot>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "Modal",
  model: {
    prop: "visible",
    event: "change",
  },
  props: {
    ModalProps: {
      type: Object,
      required: false,
      default: () => {},
    },
    change: event,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 回调用外部父组件的 change 方法，参数配置如下
    // modalChange(visible, isOk, isCancel){
    //   console.log(visible, isOk, isCancel)
    // }
    onCancel() {
      this.$emit("change", false, false, true);
    },
    okClick() {
      // 第一个参数 visible
      // 第二个参数 isOk
      // 第三个参数 isCancel
      this.$emit("change", false, true);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding-bottom: 52px;
}
</style>
