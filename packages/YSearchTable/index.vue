<template>
  <div class="SearchTable">
    <!-- 搜索框 -->
    <a-card :bodyStyle="{ padding: '24px 24px 0' }">
      <y-search-form
        ref="searchFromRef"
        :FormProps="FormProps"
        :FormListColumns="FormListColumns"
        @getFromData="getFromData"
        @onValuesChange="onValuesChange"
      ></y-search-form>
    </a-card>
    <!-- table 表格-->
    <a-card
      :style="{ marginTop: '16px' }"
      :title="(TableProps && TableProps.title) || ''"
      :headStyle="titleStyle"
      class="talbleCard"
    >
      <!-- 右上角按钮部分 -->
      <template slot="extra">
        <slot name="extra"></slot>
      </template>

      <div :class="$slots.left ? 'tableBox' : ''">
        <template v-if="$slots.left">
          <slot name="left"></slot>
        </template>
        <!-- table表格 -->
        <div :class="$slots.left ? 'rightBox' : ''">
          <a-table
            :loading="TableProps && TableProps.loading"
            :columns="TableColumns"
            :dataSource="TableData"
            :expandedRowKeys="expandedRowKeys"
            :expandedRowRender="expandedRowRender"
            :rowSelection="
              selectedRows
                ? { selectedRowKeys: selectedRowKeys, onChange: updateSelect }
                : undefined
            "
            :rowKey="(TableProps && TableProps.rowKey) || 'key'"
            :pagination="
              TableProps && TableProps.pagination === false
                ? false
                : Object.assign(pagination, TableProps.pagination)
            "
            :scroll="{ x: (TableProps && TableProps.scrollX) || 1500 }"
            @change="onChange"
          >
            <template :slot="slot" v-for="slot in Object.keys($slots)">
              <slot :name="slot"></slot>
            </template>

            <template
              slot-scope="text, record, index"
              :slot="slot"
              v-for="slot in Object.keys($scopedSlots).filter(
                (key) => key !== 'expandedRowRender'
              )"
            >
              <slot :name="slot" v-bind="{ text, record, index }"></slot>
            </template>

            <template
              slot-scope="record, index, indent, expanded"
              :slot="$scopedSlots.expandedRowRender ? 'expandedRowRender' : ''"
            >
              <slot
                v-bind="{ record, index, indent, expanded }"
                :name="
                  $scopedSlots.expandedRowRender ? 'expandedRowRender' : ''
                "
              ></slot>
            </template>
          </a-table>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import YSearchForm from "../YSearchForm";

export default {
  name: "YSearchTable",
  components: { YSearchForm },
  props: {
    FormProps: {
      type: Object,
      required: false,
      default: () => {
        return {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        };
      },
    },
    FormListColumns: {
      type: [Array, Object],
      required: false,
      default: () => {},
    },
    TableColumns: {
      type: Array,
      required: true,
      default: () => [],
    },
    TableData: {
      type: Array,
      required: false,
      default: () => [],
    },
    TableProps: {
      type: Object,
      required: false,
      default: () => {},
    },
    selectedRows: Array,
    expandedRowKeys: Array,
    expandedRowRender: Function,
  },
  data() {
    return {
      pagination: {
        position: "bottom",
        current: 1,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      tableChangeData: {},
      titleStyle:{"font-size": "16px", "font-family": "PingFangSC-Medium, PingFang SC", "font-weight": "500", "color": "#1A2031"}
    };
  },
  watch: {
    selectedRows(selectedRows) {
      console.log("selectedRows", selectedRows);
    },
  },
  computed: {
    selectedRowKeys() {
      return this.selectedRows.map((record) => {
        return typeof this.TableProps.rowKey === "function"
          ? this.TableProps.rowKey(record)
          : record[this.TableProps.rowKey];
      });
    },
  },
  mounted() {
    // 查询
    this.$refs.searchFromRef?.queryClick();
  },
  methods: {
    // 查询
    queryClick() {
      this.$refs.searchFromRef?.queryClick();
    },
    // 设置表单的数据值
    setFromValue(values) {
      this.$refs.searchFromRef?.setFromValue(values);
    },
    // 重置表单数据
    resetFromValue(valuse) {
      this.$refs.searchFromRef?.resetFromValue(valuse);
    },
    // 表单数据改变
    onValuesChange(props, values) {
      this.$emit("onValuesChange", props, values);
    },
    // 获取查询参数 查询按钮的回调函数
    getFromData(values = {}, isInit) {
      if (isInit) this.pagination.current = 1;
      this.$emit(
        "change",
        values,
        this.pagination,
        this.tableChangeData.filters,
        this.tableChangeData.sorter,
        this.tableChangeData.currentDataSource
      );
    },
    // 表格改变的触发事件 {} 表示 空查询数据，占位用
    onChange(pagination, filters, sorter, { currentDataSource }) {
      this.pagination = Object.assign(this.pagination, pagination);
      this.tableChangeData = {
        filters,
        sorter,
        currentDataSource,
      };
      this.$refs.searchFromRef?.getFromValue();
    },
    updateSelect(selectedRowKeys, selectedRows) {
      this.$emit("update:selectedRows", selectedRows);
      this.$emit("selectedRowChange", selectedRowKeys, selectedRows);
    },
    onClear() {
      this.updateSelect([], []);
      this.$emit("clear");
    },
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>
