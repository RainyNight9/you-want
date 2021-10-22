<p align="center">
  <a href="/" target="_blank"><img src="./public/you-want1.png" alt="logo" width="59%"/></a>
</p>
<h1 align= "center">
<a href="/" target="_blank">you-want</a>
</h1>

>「表单/表格」开箱即用的解决方案。该组件库是在 Vue2 + Ant Design Vue 的基础进行二次开发的，所以项目必须是vue2+ antd架构（其他版本敬请期待...）。现主要收录了常用的几个组件。如果大家有其它组件需求，都可以给我提，我努力完成...

## 快速上手

### 首先,安装组件库

```bash
npm install you-want
#或
yarn add you-want
#或
pnpm install you-want
```

### 接着,在项目入口文件main.js注册组件

```js
import YouWant from 'you-want'

Vue.use(YouWant.YFormList)
Vue.use(YouWant.YSearchTable)
Vue.use(YouWant.YSearchForm)
```

### 最后，就可以在页面或组件里边直接使用

```vue
<template>
  <div class="new-page">
    <!-- 带检索功能的表格 -->
    <y-search-table
      :FormProps="FormProps"
      :FormListColumns="FormListColumns"
      :TableColumns="columns"
      :TableData="data"
      :TableProps="TableProps"
    ></y-search-table>
    <!-- 表单列表组件 -->
    <y-form-list 
      ref="formListRef" 
      :FormListColumns="FormListColumns"
    >
    </y-form-list>
  </div>
</template>
```

## 使用说明

* [FormList](https://git.100tal.com/jituan_bigdata_fe/dfe-you-want/blob/master/docs/formList.md) --- 让表单简单化，配置一下就可以

* [SearchTable](https://git.100tal.com/jituan_bigdata_fe/dfe-you-want/blob/master/docs/searchTable.md) --- 让表格固定化，做自己业务就好

* [SearchForm](https://git.100tal.com/jituan_bigdata_fe/dfe-you-want/blob/master/docs/searchForm.md) --- 让检索适配化，大小屏通吃

## Change Log

* 2021.07.23——v0.1.16
  * formList 表单配置增加`InputSelect`组件和`Slot`插槽自定义
* 2021.06.30——v0.1.11
  * formList 表单配置`hidden`表达式可智能联动
* 2021.06.29——v0.1.9
  * 修改文档说明
* 2021.06.29——v0.1.7
  * 增加了文档说明和使用示例
* 2021.06.28——v0.1.0
  * 第一次发布

## License
