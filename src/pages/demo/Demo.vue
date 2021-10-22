<template>
  <a-space direction="vertical">
    <y-search-table
      :FormProps="FormProps"
      :FormListColumns="SearchTableColumns"
      :TableColumns="columns"
      :TableData="data"
      :TableProps="TableProps"
    ></y-search-table>

    <a-card>
      <y-form-list
        ref="formListRef"
        :FormListColumns="FormListColumns"
      ></y-form-list>
      <a-button @click="getData">获取表单数据</a-button>
    </a-card>
  </a-space>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

const FormProps = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};
const SearchTableColumns = {
  isMonitor: {
    tag: "Select",
    formItemProps: {
      label: "是否监控",
    },
    options: {
      initialValue: "all",
    },
    nodeProps: {
      options: [
        { label: "全部", value: "all" },
        { label: "是", value: "open" },
        { label: "否", value: "colse" },
      ],
    },
  },
  tableType: {
    tag: "Select",
    formItemProps: { label: "表类型" },
    options: {
      initialValue: "offOline",
    },
    nodeProps: {
      options: [
        { label: "全部", value: "all" },
        { label: "离线表", value: "offOline" },
        // { label: '否', value: 'colse' }
      ],
    },
  },
  principal: {
    tag: "Input",
    formItemProps: { label: "负责人" },
    nodeProps: {
      placeholder: "请输入负责人",
    },
  },
  dataSource: {
    tag: "Select",
    formItemProps: { label: "数据源" },
    options: {
      initialValue: "all",
    },
    nodeProps: {
      options: [
        { label: "全部", value: "all" },
        { label: "hive", value: "hive" },
        // { label: 'p1', value: '1' },
        // { label: 'p2', value: '2' },
      ],
    },
  },
  database: {
    tag: "Select",
    formItemProps: { label: "数据库" },
    options: {
      initialValue: "all",
    },
    nodeProps: {
      options: [
        { label: "全部", value: "all" },
        // { label: 'p0', value: '0' },
        // { label: 'p1', value: '1' },
        // { label: 'p2', value: '2' },
      ],
    },
  },
  dataTable: {
    tag: "Select",
    formItemProps: { label: "数据表" },
    options: {
      initialValue: "all",
    },
    nodeProps: {
      options: [
        { label: "全部", value: "all" },
        // { label: 'p0', value: '0' },
        // { label: 'p1', value: '1' },
        // { label: 'p2', value: '2' },
      ],
    },
  },
};

const FormListColumns = {
  time: {
    tag: "RangeTimePicker",
    formItemProps: {
      label: "时间区间",
    },
    options: {
      initialValue: [moment("10:20", "HH:mm:ss"), moment("20:30", "HH:mm:ss")],
      rules: [{ required: true, message: "必选!" }],
    },
    nodeProps: {
      format: "HH:mm:ss",
      disabled: false,
      disabledStartTime: "09:10",
      disabledEndTime: "21:30",
      // hourStep: 2,
      // minuteStep: 5,
      // secondStep: 10,
    },
  },
  money: {
    type: "InputNumberSelect",
    formItemProps: { label: "运行时长" },
    options: {
      initialValue: { number: 0, unit: "分" },
      rules: [{ required: true, message: "必填!" }],
    },
    nodeProps: {
      options: [
        { label: "秒", value: "s" },
        { label: "分", value: "m" },
      ],
    },
  },
  isMonitor: {
    tag: "Select",
    formItemProps: {
      label: "是否监控",
    },
    options: {
      initialValue: "all",
    },
    nodeProps: {
      options: [
        { label: "全部", value: "all" },
        { label: "是", value: "open" },
        { label: "否", value: "colse" },
      ],
    },
  },
  tableType: {
    tag: "Select",
    formItemProps: { label: "表类型" },
    options: {
      initialValue: "offOline",
    },
    nodeProps: {
      options: [
        { label: "全部", value: "all" },
        { label: "离线表", value: "offOline" },
        // { label: '否', value: 'colse' }
      ],
    },
  },
  principal: {
    tag: "Input",
    formItemProps: { label: "负责人" },
    nodeProps: {
      placeholder: "请输入负责人",
    },
  },
  dataSource: {
    tag: "Select",
    formItemProps: { label: "数据源" },
    options: {
      initialValue: "all",
    },
    nodeProps: {
      options: [
        { label: "全部", value: "all" },
        { label: "hive", value: "hive" },
        // { label: 'p1', value: '1' },
        // { label: 'p2', value: '2' },
      ],
    },
  },
  database: {
    tag: "Select",
    formItemProps: { label: "数据库" },
    options: {
      initialValue: "all",
    },
    nodeProps: {
      options: [
        { label: "全部", value: "all" },
        // { label: 'p0', value: '0' },
        // { label: 'p1', value: '1' },
        // { label: 'p2', value: '2' },
      ],
    },
  },
  dataTable: {
    tag: "Select",
    formItemProps: { label: "数据表" },
    options: {
      initialValue: "all",
    },
    nodeProps: {
      options: [
        { label: "全部", value: "all" },
        // { label: 'p0', value: '0' },
        // { label: 'p1', value: '1' },
        // { label: 'p2', value: '2' },
      ],
    },
  },
};

const columns = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  { title: "Age", width: 100, dataIndex: "age", key: "age", fixed: "left" },
  { title: "Column 1", dataIndex: "address", key: "1", width: 150 },
  { title: "Column 2", dataIndex: "address", key: "2", width: 150 },
  { title: "Column 3", dataIndex: "address", key: "3", width: 150 },
  { title: "Column 4", dataIndex: "address", key: "4", width: 150 },
  { title: "Column 5", dataIndex: "address", key: "5", width: 150 },
  { title: "Column 6", dataIndex: "address", key: "6", width: 150 },
  { title: "Column 7", dataIndex: "address", key: "7", width: 150 },
  { title: "Column 8", dataIndex: "address", key: "8" },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    scopedSlots: { customRender: "action" },
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

export default {
  name: "Demo",
  i18n: require("./i18n"),
  components: {},
  data() {
    return {
      FormProps,
      SearchTableColumns,
      FormListColumns,
      columns,
      data,
      TableProps: {
        title: "表格",
        loading: false,
        rowKey: (record) => record.key,
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
        },
      },
    };
  },
  computed: {
    ...mapState("setting", ["pageMinHeight"]),
    desc() {
      return this.$t("description");
    },
  },
  methods: {
    getData() {
      this.$refs.formListRef?.getFromValue((value) => {
        console.log(value);
      });
    },
  },
};
</script>

<style scoped lang="less">
.new-page {
  height: 100%;
  background-color: @base-bg-color;
  text-align: center;
  padding: 100px;
  border-radius: 4px;
}
</style>