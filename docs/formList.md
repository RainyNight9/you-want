# FormList 组件使用文档说明

>让表单简易化，配置一下就可以！不用再堆积大量的HTML标签了，代码层次逻辑清晰明了！JSON配置简单易上手！

## Attributes

### FormListColumns

>FormListColumns 参数为对象object，必传。

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| key     | key值,对应接口字段 | string | — | — |
| tag | 标签,首字母大写 | string | 见[tag](#tag) | — |
| options | [form组件配置](https://www.antdv.com/components/form-cn/) | object | — | {} |
| formItemProps | [formItem 配置项](https://www.antdv.com/components/form-cn/) | object | {label: "名称"} | {} |
| nodeProps | [内置标签节点对应的属性](https://1x.antdv.com/components/input-cn/) | object | — | {} |
| hidden | 配置节点的显示/隐藏(可通过配置表达式智能联动) | boolean/表达式 | true/false/"{{formData.key === value}}" | false |
| afterProps | 节点后边可能出现单位、按钮、或说明... | object | — | {} |
| colSpan | 栅格布局占位 | number | 1~24 | 24 |
| otherNode | 其他特殊节点 | object[array] | — | — |

#### tag

>tag 参数为字符串string，标签介绍，首字母大写。现在支持一下标签：

| tag | 说明 | 配置文档 |
|------|------|------|
| `Input` | Input输入框 | [文档](https://1x.antdv.com/components/input-cn/) |
| `Badge` | Badge徽标数 | [文档](https://1x.antdv.com/components/badge-cn/)|
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
| `Cascader` | Cascader级联选择 | [文档](https://1x.antdv.com/components/cascader-cn/)|
| `Span` | Span展示 | 值为：options.initialValue 或 DetailData[key]|
| `InputNumberSelect` | InputNumberSelect数字带单位 | 参考`InputNumber` 和 `Select`配置 |
| `RangeTimePicker` | RangeTimePicker时间区间 | 见[RangeTimePicker](#RangeTimePicker) |
| `InputSelect` | InputSelect文本带选择框 | 参考`Input` 和 `Select`配置 |
| `Slot` | 插槽渲染，可自定义复杂的表单 | 额外单独配置 |

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

>FormProps 参数为对象object，非必传，Form 表单属性，[配置参考](https://www.antdv.com/components/form-cn/)

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| labelCol | label 标签布局 | object | — | {span: 6} |
| wrapperCol | 节点标签布局 | object | — | {span: 18} |
| ... | ... | ... | ... | ... |

### DetailData

>DetailData 参数为对象object，非必传，只有在需要回显数据的时候（详情/编辑）传递该参数。

## 使用案例

> 文字表述感觉不明朗，不直观，直接上案例代码吧，简单粗暴明朗，朗朗上手！

:::整体代码配置示例。

```html
<template>
  <form-list 
    ref="formListRef"
    :FormProps="FormProps"
    :FormListColumns="FormListColumns"
  >
  </form-list>
  <a-button type="primary" @click="getData">获取表单数据</a-button>
</template>

<script>
// 可忽略不用配置，内置默认值
const FormProps =  {
  labelCol: { span: 5 },
  wrapperCol: { span: 13 },
};
// 生成表单配置，必传
const FormListColumns = {
  key0: {
    tag: "Input",
    formItemProps: { label: "Input" },
    options: {
      rules: [{ required: true, message: "必选!" }],
    },
    nodeProps: {
      disabled: false,
    },
    afterProps: {
      tag: "Button",
      label: "选择",
      click: () => { },
    },
    hidden: false,
  },
  key1: {
    tag: 'Badge',
    formItemProps: {
      label: "Badge",
    },
    nodeProps: {
      text: '已解决'
    }
  },
  key2: {
    tag: "Select",
    formItemProps: {
      label: "Select",
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
  key3: {
    type: "RadioGroup",
    formItemProps: { label: "RadioGroup" },
    options: {
      initialValue: 1,
    },
    nodeProps: {
      options: [
        { label: "时间区间", value: 1 },
        { label: "间隔区间", value: 2 },
      ],
    },
  },
  key4: {
    type: "DatePicker",
    formItemProps: { label: "DatePicker" },
    options: {
      rules: [{ required: true, message: "必选!" }],
    },
    nodeProps: {
    },
  },
  key5: {
    tag: "Textarea",
    formItemProps: { label: "Textarea" },
    options: {
      rules: [{ required: true, message: "必填!" }],
    },
    nodeProps: {},
  },
  key6: {
    tag: "InputNumber",
    formItemProps: { label: "InputNumber" },
    options: {
      rules: [
        { required: true, message: "必选!" },
        { pattern: /^[1-9]\d*$/, message: "请输入正整数!" },
      ],
    },
    nodeProps: {
      placeholder: "请输入正整数",
      min: 1
    },
  },
  key7: {
    tag: "RangePicker",
    formItemProps: { label: "RangePicker" },
    options: {
      rules: [{ required: true, message: "必选!" }],
    },
    nodeProps: {
      format: "YYYY-MM-DD HH:mm:ss",
      disabledDate(current) {
        return current && current < moment().add(-1, "days");
      },
    },
  },
  key8: {
    type: "TimePicker",
    formItemProps: { label: "TimePicker" },
    options: {
      rules: [
        { required: true, message: "必选!" }, 
      ],
    },
    nodeProps: {
    },
  },
  key9: {
    tag: "Span",
    formItemProps: {
      label: "Span",
    },
    options: {
      initialValue: '我是Span',
    },
    nodeProps: {
    },
  },
  key10: {
    type: "InputNumberSelect",
    formItemProps: { label: "InputNumberSelect" },
    options: {
      initialValue: { number: 0, unit: '分' },
      rules: [
        { required: true, message: "必填!" }, 
      ],
    },
    nodeProps: {
      options: [
        { label: "秒", value: "s" },
        { label: "分", value: "m" },
      ],
    },
  },
  key11: {
    tag: "RangeTimePicker",
    formItemProps: {
      label: "RangeTimePicker",
    },
    options: {
      initialValue: [moment("10:20", "HH:mm:ss"), moment("20:30", "HH:mm:ss")],
      rules: [{ required: true, message: "必选!" }],
    },
    nodeProps: {
      format: "HH:mm:ss",
      disabled: false,
      disabledStartTime: '09:10',
      disabledEndTime: '21:30',
      hourStep: 1,
      minuteStep: 1,
      secondStep: 1,
    },
  },
}

export default {
  name: "Demo",
  data() {
    return {
      FormProps,
      FormListColumns
    };
  },
  computed: {
  },
  methods: {
    getData() {
      this.$refs.formListRef?.getFromValue((values) => {
        // values 是表单的值
        console.log(values);
      });
    },
  },
};
</script>  
```

:::

### 效果图

![formList](https://git.100tal.com/jituan_bigdata_fe/dfe-you-want/blob/master/public/formList.jpg)

## bug修复

暂无

## 下期优化

1、Select模糊查询的UI美化
