# FormList 组件使用文档说明

>该组件不要自行改动!!! 后续该组件会做组件库来维护使用！！！有需求需要改动请联系 zhangbin19，感谢支持！

> 文字表述感觉不明朗，不直观，直接上案例代码吧，简单粗暴明朗，朗朗上手！

## 使用案例

``` code
// 引入模块
import FormList from "@/components/formList";

// vue 组件注册
components: { FormList },

// template 中使用组件渲染
<form-list
    :FormProps="FormProps"
    :FormListColumns="FormListColumns"
/>

// FormProps 参数配置 Object {}
// 介绍：Form 表单属性
// 其实 里边的参数 是根据 Ant Design of Vue 的 Form 组件的 参数配置，可以查看官方文档
// 文档地址：https://www.antdv.com/components/form-cn/
const FormProps =  {
  labelCol: { span: 5 },
  wrapperCol: { span: 13 },
};

// FormListColumns 参数配置 Object
// 介绍：Form 内每一项配置
// tag：表单内部 组件类型 首字母大写
// type可选范围: ['Span', 'RadioGroup', 'DatePicker', 'Textarea', 'Select', 'InputNumber', 'Switch', 'Slider', 'Rate', 'Upload', 'InputNumberSelect', 'RangePicker', 'TimePicker']
// key: 接口值/接口提交参数 对应字段 按照接口文档来填写
// formItemProps: Form表单组件 内部 Form.item 组件的属性，参考组件文档属性
// nodeProps: 内部表单节点的属性，可参考组件库的每个组件的文档

const FormListColumns = {
    appId: {
        tag: "Select", // 内置标签名字
        key: "appId", // 接口对应或者叫数据对应的字段，这个可以忽略可配置可不配
        options: {    // form组件配置 https://www.antdv.com/components/form-cn/
            rules: [{ required: true, message: "必填!" }],
        },
        formItemProps: { label: "选择所属项目" }, // formItem 配置项 https://www.antdv.com/components/form-cn/
        nodeProps: { // 内置标签节点对应的属性 参考 antd vue 组件配置
            showSearch: true,
            mode: "multiple",
        },
        hidden: false, // 配置组件显示隐藏
        afterProps: { // 配置组件后边可能出现一个单位，或者一个按钮，或者一个说明
            tag: ''
        }
    },
}
```
