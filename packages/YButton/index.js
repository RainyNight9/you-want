// 导入组件，组件必须声明 name
import YButton from './src'

// 为组件提供 install 安装方法，供按需引入
YButton.install = function (Vue) {
  Vue.component(YButton.name, YButton)
}

// 导出组件
export default YButton