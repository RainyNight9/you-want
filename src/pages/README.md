# 页面

这里的『页面』包含新建页面文件，配置路由、样式文件等。通常情况下，你仅需简单的配置就可以添加一个新的页面。

## 新建页面文件

在 src/pages 下创建一个文件夹来放置这些文件。

```diff
  ├── public
  ├── src
  │   ├── assets               # 本地静态资源
  :   :
  │   ├── pages                # 页面组件和通用模板
+ │   │   └── newPage          # 为新页面创建一个文件夹
+ │   │       ├── components   # 新页面相关的组件
+ │   │       ├── newPage.vue  # 新页面文件
+ │   │       ├── index.less   # 页面样式文件
+ │   │       └── data.js      # 配置模板数据文件
+ │   │       └── index.js     # import 引导文件
  :   :
  │   └── main.js              # 应用入口js
  ├── package.json             # package.json
  ├── README.md                # README.md
  └── vue.config.js            # vue 配置文件
```

为了更好更快速的创建，可以copy初始化 newPage 文件如下：

```vue
<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <h1>演示页面</h1>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'NewPage',
  data() {
    return {
      desc: '这是一个演示页面'
    }
  },
  computed: {
    ...mapState('setting', ['pageMinHeight']),
  }
}
</script>

<style scoped lang="less">
@import "index.less";
</style>
```

index.less 文件：

```less
.new-page{
  height: 100%;
  background-color: @base-bg-color;
  text-align: center;
  padding: 200px 0 0 0;
  margin-top: -24px;
  h1{
    font-size: 48px;
  }
}
```

index.js 文件：

```js
import NewPage from './newPage'
export default NewPage
```

## 配置路由

路由配置在 src/router/config.js 文件中，我们把上面创建的页面文件加入路由配置中

```js
const options = {
  routes: [
    {
      path: '/',
      name: '首页',
      component: DataView,
      redirect: '/login',
      children: [
        {
          path: 'newPage',
          name: '新页面',
          component: () => import('@/pages/newPage'),
        }
        ...
      ]
      ...
    }
    ...
  ]
}
```
