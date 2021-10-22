<template>
  <div class="SearchTable">
    <!-- 搜索框 -->
    <a-card :bodyStyle="{ padding: '24px 24px 0' }">
      <search-from
        ref="searchFromRef"
        :FormProps="FormProps"
        :FormListColumns="FormListColumns"
        @getFromData="getFromData"
        @onValuesChange="onValuesChange"
      ></search-from>
    </a-card>
    <!-- table 表格-->
    <a-card
      :style="{ marginTop: '24px' }"
      :title="(TableProps && TableProps.title) || ''"
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
import SearchFrom from "@/components/searchFrom";

export default {
  name: "SearchTable",
  components: { SearchFrom },
  props: {
    FormProps: {
      type: Object,
      required: false,
      default: () => {},
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
          : record[this.rowKey];
      });
    },
  },
  mounted() {
  },
  methods: {
    queryClick() {
      this.$refs.searchFromRef?.queryClick();
    },
    resetFromValue() {
      this.$refs.searchFromRef?.resetFromValue();
    },
    onValuesChange(props, values){
      this.$emit("onValuesChange", props, values);
    },
    // 获取查询参数
    getFromData(values = {}) {
      this.$emit("getFromData", values);
    },
    onChange(pagination, filters, sorter, { currentDataSource }) {
      console.log(1111, pagination, filters, sorter, currentDataSource);
      console.log(this);
      this.$emit("change", pagination, filters, sorter, currentDataSource);
      // 修改页码
      // 触发请求数据
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
