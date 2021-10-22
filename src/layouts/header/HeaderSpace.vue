<template>
  <a-dropdown placement="bottomRight">
    <div
      class="header-avatar ant-dropdown-link"
      style="cursor: pointer; height: 64px;"
    >
      <span class="name">当前空间：</span>
      <a-select
        show-search
        ref="typeSelect"
        option-filter-prop="children"
        :value="spaceId"
        :filter-option="filterOption"
        style="width: 120px;background-color: #001529 !important;"
        class="selectSpace"
        dropdownClassName="aSelect"
      >
        <a-select-option
          v-for="item in spaceData"
          :key="item.spaceId"
          :value="item.spaceId"
          class="aOption"
          @click="selectedClick(item)"
         >
         {{ item.spaceName }}
        </a-select-option>
      </a-select>
      <!-- <span  class="name">{{ spaceDeatil.name }}</span>
      <a-icon
        v-if="spaceData && spaceData.total > 1"
        class="icon"
        type="down"
      /> -->
    </div>
    <!-- <a-menu
      v-if="spaceData && spaceData.total > 1"
      slot="overlay" 
      style="max-height:328px;overflow-y: auto;"
    >
      <a-menu-item
        v-for="(item, index) in spaceData.data || []"
        :key="index"
        @click="selectedClick(item)"
      >
        <a>{{ item.name }}</a>
      </a-menu-item>
    </a-menu> -->
  </a-dropdown>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { alarmGetUserSpace } from "@/services/user";

export default {
  name: "HeaderSpace",
  computed: {
    ...mapGetters("account", ["spaceId", "spaceName"]),
  },
  props: [],
  data() {
    return {
      spaceData: [],
    };
  },
  created() {
    this.userMine();
  },
  mounted() {
  },
  updated(){
  },
  methods: {
    ...mapMutations("account", ["setSpaceId","setSpaceName"]),
   
    selectedClick(item) {
      const _self = this;
      this.$confirm({
        title:
          "即将切换到其他空间，是否确认切换？",
        okText: "确定",
        cancelText: "取消",
        centered: true,
        onOk() {
          _self.$store.dispatch('account/setSpaceName', item||{})
          // _self.setSpaceId(item.spaceId)
          // _self.setSpaceName(item.spaceName)
        },
        onCancel() {
          _self.$store.dispatch('account/setSpaceName', {
            spaceId: _self.spaceId,
            spaceName: _self.spaceName,
          })
          // _self.setSpaceId(_self.spaceId)
          // _self.setSpaceName(_self.spaceName)
        }
      });
    },
    userMine() {
      alarmGetUserSpace().then((result) => {
        if (result.code === 0) {
          this.spaceData = result.data || [];
          let spaceData = this.spaceData[0] || {}
          if(sessionStorage.getItem('spaceName')) {
            spaceData.spaceId = sessionStorage.getItem('spaceId')
            spaceData.spaceName = sessionStorage.getItem('spaceName')
          }
          this.$store.dispatch('account/setSpaceName', spaceData)
          // this.setSpaceId(this.spaceData[0]?.spaceId)
          // this.setSpaceName(this.spaceData[0]?.spaceName)
        }
      })
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    }
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
    margin-left: 4px;
    color: rgba(254, 254, 254, 0.65);
  }
  .selectSpace {
    line-height: 22px;
    width: 120px;
    margin-top: 15px;
    // ant-select-selection ant-select-selection--single
    ::v-deep .ant-select-selection{
      background-color: #001529 !important;
      border-color: #001529;
      color: rgba(254, 254, 254, 0.65);
    }
    ::v-deep .ant-select-arrow{
      color: rgba(254, 254, 254, 0.65);
    }
    ::v-deep .ant-select-selection-selected-value{
      opacity: 1;
    }
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 22px;
    color: rgba(254, 254, 254, 0.65);
  }
}

.avatar-menu {
  width: 150px;
}
.avatar-card {
  padding: 29px 24px 24px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 12px 0px rgba(24, 86, 237, 0.08);
  border: 1px solid rgba(232, 235, 241, 1);
  .space-item {
    padding: 3px 5px;
    cursor: pointer;
  }
  p {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(26, 32, 49, 1);
    line-height: 22px;
    span {
      display: inline-block;
      text-align: right;
      width: 70px;
      color: rgba(121, 123, 132, 1);
    }
  }
}
</style>
