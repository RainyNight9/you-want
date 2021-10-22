# SearchFrom 组件使用文档说明

> 该组件的设计只为UI组件封装，统一方法处理，统一页面适配，不造成多余学习成本，主要还是学习UI组件库的使用。

## 特点

* SearchForm 头部的筛选框部分支持屏幕适配，根据窗口大小一排展示不同数量

## Attributes

### FormListColumns

>FormListColumns 参数为对象 object，必传。

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| key     | key值,对应接口字段 | string | — | — |
| tag | 标签,首字母大写 | string | 见[tag](#tag) | — |
| options | [form组件配置](https://www.antdv.com/components/form-cn/) | object | — | {} |
| formItemProps | [formItem 配置项](https://www.antdv.com/components/form-cn/) | object | {label: "名称"} | {} |
| nodeProps | [内置标签节点对应的属性](https://1x.antdv.com/components/input-cn/) | object | — | {} |

#### tag

>tag 参数为字符串 string，标签介绍，首字母大写。现在支持一下标签：

| tag | 说明 | 配置文档 |
|------|------|------|
| `Input` | Input输入框 | [文档](https://1x.antdv.com/components/input-cn/) |
| `RadioGroup` | RadioGroup单选框 | [文档](https://1x.antdv.com/components/radio-cn/)|
| `DatePicker` | DatePicker日期选择框 | [文档](https://1x.antdv.com/components/date-picker-cn/)|
| `Textarea` | Textarea输入框 | [文档](https://1x.antdv.com/components/input-cn/)|
| `Select` | Select选择器 | [文档](https://1x.antdv.com/components/select-cn/)|
| `InputNumber` | InputNumber数字输入框 | [文档](https://1x.antdv.com/components/input-number-cn/)|
| `Switch` | Switch开关 | [文档](https://1x.antdv.com/components/switch-cn/)|
| `Slider` | Slider滑动输入条 | [文档](https://1x.antdv.com/components/slider-cn/)|
| `Rate` | Rate评分组件 | [文档](https://1x.antdv.com/components/rate-cn/)|
| `Upload` | Upload上传 | [文档](https://1x.antdv.com/components/upload-cn/)|
| `RangePicker` | RangePicker日期区间 | [文档](https://1x.antdv.com/components/date-picker-cn/)|
| `TimePicker` | TimePicker时间选择框 | [文档](https://1x.antdv.com/components/time-picker-cn/)|
| `AutoComplete` | AutoComplete自动完成 | [文档](https://1x.antdv.com/components/auto-complete-cn/)|
| `InputNumberSelect` | InputNumberSelect数字带单位 | 参考`InputNumber` 和 `Select`配置 |
| `RangeTimePicker` | RangeTimePicker时间区间 | 见[RangeTimePicker](#RangeTimePicker) |

##### RangeTimePicker

>其它配置不变，和其它节点一样，仅 nodeProps 的配置如下：

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| format | 展示的时间格式 | string | — | "HH:mm:ss" |
| disabled | 禁用全部操作 | boolean | — | false |
| hourStep | 小时选项间隔 | number | — | 1 |
| minuteStep | 分钟选项间隔 | number | — | 1 |
| secondStep | 秒选项间隔 | number | — | 1 |
| disabledStartTime | 禁用的开始时间 | string | 例："09:10" | — |
| disabledEndTime | 禁用的结束时间 | string | 例："21:30" | — |

### FormProps

>FormProps 参数为对象 object，非必传，Form 表单属性，[配置参考](https://www.antdv.com/components/form-cn/)

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| labelCol | label 标签布局 | object | — | {span: 6} |
| wrapperCol | 节点标签布局 | object | — | {span: 18} |
| ... | ... | ... | ... | ... |

## 使用案例

> 文字表述感觉不明朗，不直观，直接上案例代码吧，简单粗暴明朗，朗朗上手！

:::整体代码配置示例。

```html
<template>
  <div>
    <search-form
      ref="searchFormRef"
      :FormProps="FormProps"
      :FormListColumns="FormListColumns"
      @getFromData="getFromData"
      @onValuesChange="onValuesChange"
    >
    </search-form>
  </div> 
</template>

<script>
// 这个是默认值，可以不传，如果需要定制，可选传
const FormPropsIndex = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
// 不传就是空
const FormListColumnsIndex = {
  monitor: {
    tag: "Select",
    formItemProps: {
      label: "是否监控",
    },
    options: {
      initialValue: '',
    },
    nodeProps: {
      options: [
        { label: "全部", value: '' },
        { label: "是", value: 1 },
        { label: "否", value: 2 },
      ],
    },
  },
  tableType: {
    tag: "Select",
    formItemProps: { label: "表类型" },
    options: {
      initialValue: 1,
    },
    nodeProps: {
      options: [
        { label: "离线表", value: 1 },
        { label: "实时表", value: 2 },
      ],
    },
  },
  tableImportance: {
    tag: "Select",
    formItemProps: { label: "表重要程度" },
    options: {
      initialValue: "",
    },
    nodeProps: {
      options: [
        { label: "全部", value: "" },
        { label: "P0", value: 0 },
        { label: "P1", value: 1 },
        { label: "P2", value: 2 },
        { label: "P3", value: 3 },
      ],
    },
  },
  source: {
    tag: "Select",
    formItemProps: { label: "数据源" },
    options: {
      initialValue: "hive",
    },
    nodeProps: {
      options: [
        { label: "全部", value: "" },
        { label: "hive", value: "hive" },
      ],
    },
  },
  database: {
    tag: "Select",
    formItemProps: { label: "数据库" },
    options: {},
    nodeProps: {
      options: [],
    },
  },
  tableName: {
    tag: "Select",
    formItemProps: { label: "数据表" },
    options: {},
    nodeProps: {
      options: [],
      placeholder: "可模糊搜索",
      showSearch: true,
      search: () => {}
    },
  },
  userName: {
    tag: "Select",
    formItemProps: { label: "负责人" },
    options: {
    },
    nodeProps: {
      options: [],
      placeholder: "请先选择数据库",
    },
  },
};

export default {
  name: "PageName",
  data(){
    return {
      FormProps: FormPropsIndex, // 该参数可以不传，有默认值
      FormListColumns: FormListColumnsIndex,
      feildValue: {},
      formData: {}
    }
  },
  mounted() {
  },
  methods: {
    // 监听刷选项发生改变事件
    onValuesChange(props, values) {
      this.formData = Object.assign(this.formData, values); // 缓存数据，做对比
      // Todo
    },
    // 请求表格列表数据
    getFromData(values){
      console.log(values)
      this.feildValue = values // 保存查询参数，切换页码时需要
      // Todo
    },
  }
}
</script>
```

:::
