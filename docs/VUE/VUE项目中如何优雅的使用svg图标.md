---
title: VUE项目中如何优雅的使用svg图标
date: 2020-03-18
categories:
 - 前端
tags:
 - VUE
---
## 前言

> 在前端的项目中经常会用到很多 icon，随着项目的不断迭代，icon会越来越多，之前的项目是使用html和jq的传统项目，项目中有上百个icon，使用阿里的iconfont的font-class模式，维护起来很麻烦，而且只支持单色图标。现在项目要使用vue重构，想趁此机会改善一下icon的使用方法，以便使用和后期维护更加的简单和优雅。

## iconfont的使用方式

iconfont为我们提供了三种使用方式，分别是Unicode、Font class 和 Symbol。

**Unicode方法** 兼容性最好，支持IE6+，支持按字体的方式去动态调整图标大小，颜色等等，但是不支持多色图标，而且在不同的设备浏览器下渲染会有差别，显示的位置和大小调整起来比较困难。

**Font class方法** 兼容性良好，支持IE8+，相比Unicode方法语义更加明确，书写起来也很直观，可以很容易的分辨出是哪个icon，但是如果不做好命名空间的话，引用起来会有很大的坑，不好维护。

**Symbol方法** 使用的是svg-icon形式，随着某些浏览器突出历史舞台，逐渐成为了主流推荐的使用方法，Symbol有以下优点：

* 支持多色图标，不受单色图标的限制
* 支持像文字那样使用`font-size`，`color`等CSS属性来调整样式
* 可以利用css实现动画
* 减少HTTP请求
* 矢量图，放大缩小不失真，可以精细的控制SVG的每一个部分

这三种使用方法在iconfont官网都有详细的使用步骤说明，在这里我们之说下Symbol方法在vue项目中的使用

**Symbol方法第一步：** 在`main.js`中引入生成的symbol代码：

```js
import "@/assets/fonts/iconfont.js";
```

**Symbol方法第二步：** 在`App.vue`中引入通用样式

```css
.icon {
  width: 40px;
  height: 40px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
```

**Symbol方法第三步：** 在页面中用类名调用

```html
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-xxx"></use>
</svg>
```

以上，就可以在项目中使用svg图标了，使用svg-icon的好处是再也不用请求很多歌`woff|eot|ttf|` 字体库了，减少了HTTP请求，所有的svg都内联到了html中

![2020-03-18-17608](https://img.xing666.net/blog/img/2020-03-18-17608.png)



## 创建svg-icon组件

上面介绍了svg图标的一个简单使用方法，但是还是不够优雅，我们需要创建一个svg-icon组件，以便全局注册以后在代码中优雅的使用：

```vue
<template>
  <svg class="icon-svg" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
export default {
  name: "icon-svg",
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-cma${this.iconClass}`;
    }
  }
};
</script>

<style lang="less" scoped>
.icon-svg {
  width: 40px;
  height: 40px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

```js
// 在main.js中引入
import IconSvg from "@/components/IconSvg";

// 全局注册icon-svg组件
Vue.component("icon-svg", IconSvg);
```

```vue
// 页面中使用，只需要传入icon的类名后半部分就行了
<icon-svg icon-class="12" />
```



## 优化和改造

创建好我们的icon-svg组件以后使用起来也方便了很多，但是还有很多的缺点和不方便之处：

* `iconfont.js`生成的svg代码很不直观，而且有大量的无用信息；
* 不能按需加载
* 要对图标做增删改不友好，如果我们要对图标做增删改的话需要先上传到iconfont上，然后再下载`iconfont.js`替换项目里的`iconfont.js`。
* 生成的图标有自有样式，比如颜色，不好替换

针对以上的不便之处，我们需要做一些优化和改造，这里我们需要用到`svg-sprite`技术的两个插件，神器`svg-sprite-loader`插件和`svgo-loader`插件

1. **安装`svg-sprite-loader`插件和`svgo-loader`插件：** `svg-sprite-loader`用来打包svg图标，`svgo-loader`来精简我们的svg内容。

   ```yarn add svg-sprite-loader svgo-loader -D```    

2. **在`vue.config.js`中添加配置**，我们把iconfont里的图标都以svg形式下载下来放到`src/icons`目录中

   ```js
   chainWebpack: config => {
       // 添加svg-sprite-loader处理svgIcon
       config.module
         .rule("svgIcon")
         .test(/\.svg$/)
         .include.add(resolve("src/icons"))
         .end()
         .use("svg-sprite-loader")
         .loader("svg-sprite-loader")
         .tap(options => {
           options = {
             symbolId: "icon-[name]"
           };
           return options;
         })
         .end()
         .use("svgo-loader")
         .loader("svgo-loader")
         .tap(options => {
           options = {
             plugins: [
               { removeXMLNS: true }, // 删除xmlns属性（对于内联svg，默认情况下禁用）
               { convertStyleToAttrs: true }, // 将css样式转换为svg元素属性
               { removeAttrs: { attrs: "fill" } } // 删除svg中fill
             ]
           };
           return options;
         });
   
       // 原有的svg图像处理loader添加exclude
       config.module
         .rule("svg")
         .exclude.add(resolve("src/icons"))
         .end();
       config.resolve.alias
         .set("@", resolve("src"))
         .set("assets", resolve("src/assets"))
         .set("components", resolve("src/components"));
     },
   ```

3. **自动引入`src/icons`中的图标：** 需要用到webpack的`require.context`（具体请参照webpack官方文档）

   ```js
   // 在main.js 中添加代码
   const requireAll = requireContext => requireContext.keys().map(requireContext);
   const req = require.context("@/icons", false, /\.svg$/);
   requireAll(req);
   ```



重启项目，就会发现`src/icons`目录中的svg图标都自动导入到了页面`body`中，而且较之前的代码精简和清晰了很多，如果之后需要修改或者删除图标，只需要操作`src/icons`里对应的图标就行了，新增图标就放到`src/icons`目录里就好了，这样对于后期的维护方便了很多，优雅了很多。



## 写在最后

上面介绍了svg图标的优化历程，虽然这种方式看上去还不错，但是**适合的才是最好的**，具体用什么方法还得看个人喜好，所有的方案没有绝对的好坏，适合自己的业务场景，能解决痛点，提高开发效率就是好的方案。



>  参考：
>
> https://github.com/JetBrains/svg-sprite-loader
>
> https://www.npmjs.com/package/svgo