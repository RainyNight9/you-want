# SearchFrom 组件使用文档说明

>该组件不要自行改动!!! 后续该组件会做组件库来维护使用！！！有需求需要改动请联系 zhangbin19，感谢支持！

> 该组件的设计只为UI组件封装，统一方法处理，统一页面适配，不造成多余学习成本，主要还是学习UI组件库的使用。

> 文字表述感觉不明朗，不直观，直接上案例代码吧，简单粗暴明朗，朗朗上手！

## 使用案例

``` code
// 引入模块
import SearchFrom from "@/components/searchFrom";

// vue 组件注册
components: { SearchFrom },

// template 中使用组件渲染
<search-from
  ref="searchFrom"
  :FormProps="FormProps"
  :FormListColumns="FormListColumns"
></search-from>

// FormProps 参数配置 Object {}
// 介绍：Form 表单属性
// 其实 里边的参数 是根据 Ant Design of Vue 的 Form 组件的 参数配置，可以查看官方文档
// 文档地址：https://www.antdv.com/components/form-cn/

const FormProps = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

// FormListColumns 参数配置 Array []
// 介绍：Form 内每一项配置
// tag：表单内部 组件类型 首字母大写
// type可选范围: ['Input', 'DatePicker', 'Select', 'InputNumber', 'RangePicker']
// key: 接口值/接口提交参数 对应字段 按照接口文档来填写
// formItemProps: Form表单组件 内部 Form.item 组件的属性，参考组件文档属性
// nodeProps: 内部表单节点的属性，可参考组件库的每个组件的文档。如：Input，就找Input文档：https://www.antdv.com/components/input-cn/

const FormListColumns = [
  {
    tag: "Select",
    key: "appId",
    options: {
        rules: [{ required: true, message: "必填!" }],
    },
    formItemProps: { label: "选择所属项目" },
    nodeProps: {
        showSearch: true,
        mode: "multiple",
    }
  }
]
```