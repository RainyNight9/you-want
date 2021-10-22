# 布局

页面整体布局是一个产品最外层的框架结构，往往会包含导航、页脚、侧边栏、通知栏以及内容等。

## 可用布局

抽离了使用过程中一些常用的布局，都放在 layouts 目录中，分别为：

* [DataLayout](./DataLayout.vue) / **T-Data布局**，包含头部（用户，空间，退出，消息...），左侧菜单，内容区域，常用于T-Data系列项目统一整体布局

* [AdminLayout](./AdminLayout.vue) / **管理后台布局**，包含了头部导航，侧边导航、内容区和页脚，一般用于后台系统的整体布局

* [PageLayout](./PageLayout.vue) / **页面布局**，包含了页头和内容区，常用于需要页头（包含面包屑、标题、额外操作等）的页面

* [CommonLayout](./CommonLayout.vue) / **通用布局**，仅包含内容区和页脚的简单布局，项目中常用于注册、登录或展示页面

## 可用视图

除了基本布局外，通常有很多页面的结构是相似的。因此，把这部分结构抽离为视图组件。

一个视图组件通常包含一个基本布局组件、视图公共区块、路由视图内容区、页脚等，常常结合路由配置使用。它们也被放入了 layouts 目录中，分别为：

* [DataView](./tabs/DataView.vue) / **T-Data视图**，包含了 DataLayout 布局、多页签头和路由视图内容区,是TabsView改进版本，配合DataLayout使用。

* [TabsView](./tabs/TabsView.vue) / **多页签视图**，包含了 AdminLayout 布局、多页签头和路由视图内容区

* [PageView](./PageView.vue) / **页面视图**，包含了 PageLayout 布局和路由视图内容区

* [BlankView](./BlankView.vue) / **空白视图**，仅包含一个路由视图内容区

## 如何使用

通常会把视图组件和路由配置结合一起使用，把配置信息抽离在路由配置文件中 [src/router/config.js](../router/config.js) 。如下：

```jsx
{
  path: '/',
  name: '',
  component: DataView,
  children: [
    {
      path: 'accuracy',
      name: '准确性监控',
      component: () => import('@/pages/monitor/accuracy'),
    },
  ]
}
```

当然，如果这满足不了的需求，也可以自定义一些视图组件，或者直接在页面组件中使用布局。

### 根据不同场景区分抽离布局组件

在大部分场景下，需要基于上面两个组件封装一些适用于当下具体业务的组件，包含了通用的导航、侧边栏、顶部通知、页面标题等元素。

通常，把抽象出来的布局组件，放到 layouts 文件夹中方便管理。需要注意的是，这些布局组件和平时使用的其它组件并没有什么不同，只不过功能性上是为了处理布局问题而单独归类。
