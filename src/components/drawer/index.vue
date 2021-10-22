<template>
  <div class="drawer">
    <a-drawer
      :destroyOnClose="DrawerProps.destroyOnClose || false"
      :width="DrawerProps.width || 640"
      :visible="DrawerProps.visible || false"
      placement="right"
      :closable="false"
    >
    <div slot="title" class="drawer-title" style="display: flex;justify-content: space-between;">
      <div>{{ DrawerProps.title || '' }}</div>
        <a-popconfirm placement="bottomRight" ok-text="确定" cancel-text="取消" @confirm="confirm" class="popConfirm">
          <template slot="title">
            <p class="title-mes-one">确认关闭么？</p>
            <p class="title-mes-two">关闭页面所填写的信息将全部清空</p>
          </template>
          <a-button type="link" icon="close" @close="onClose" class="drawer-close" style="color:#797B84"></a-button>
        </a-popconfirm>
    </div>
      <div ref="drawer" class="content beauty-scroll">
        <slot></slot>
      </div>
      <div
        v-if="DrawerProps.cancelText || DrawerProps.okText"
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 10,
        }"
      >
      
        <a-button
          v-if="DrawerProps.cancelText"
          :style="{ marginRight: '8px' }"
          @click="onCancel"
        >
          {{ DrawerProps.cancelText || '取消' }}
        </a-button>
        <a-button type="primary" @click="okClick">
          {{ DrawerProps.okText || '确定' }}
        </a-button>
      </div>
    </a-drawer>
    
  </div>
</template>

<script>
export default {
  name: "Drawer",
  model: {
    prop: "visible",
    event: "change",
  },
  props: {
    DrawerProps: {
      type: Object,
      required: false,
      default: ()=>{},
    },
    change: event
  },
  data() {
    return {
      popconfirmShow: false,
    };
  },
  mounted() {},
  methods: {
    // 回调用外部父组件的 change 方法，参数配置如下
    // drawerChange(visible, isOk, isCancel){
    //   console.log(visible, isOk, isCancel)
    // }
    onClose() {
      console.log(1111111);
      this.popconfirmShow = false;
    },
    confirm() {
      this.popconfirmShow = true;
      this.$emit("change", false);
    },
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
:global {
    ::v-deep .ant-popover-inner{
      background-color: #ccc;
    }
    // .ant-popover-inner-content{
    //   width: 320px;
    //   height: 171px;
    //   padding: 24px;
    // }
  }
</style>
<style lang="less">
  
</style>
