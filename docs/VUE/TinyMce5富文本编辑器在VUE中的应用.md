---
title: TinyMce5富文本编辑器在VUE中的应用
date: 2020-11-08
categories:
 - 前端
tags:
 - VUE
---

近期在为公司搭建CMS系统，其中一个很重要的功能就是富文本编辑器，市面上的富文本编辑器很多，但是正真符合使用场景的并不多，最终我选择TinyMCE。

TinyMCE is the world's most customizable, and flexible, rich text editor。

正如TinyMCE官网所说，TinyMCE是世界上最可定制、最灵活的富文本编辑器，易用且功能强大的所见即所得的富文本编辑器，最主要的是对word的支持很好，这篇文章主要介绍VUE项目中使用TinyMCE5的方法，以此记录自己的实践总结和经验，希望能帮到一些人解决自己的问题。

> 官方文档是英文的，可参考中文文档：http://tinymce.ax-z.cn/



## 安装

TinyMCE官方提供了一个vue的组件tinymce-vue，单独使用tinymce-vue需要注册或购买服务，然后配置api-key使用，使用中请求的TinyMCE CDN的js文件，可能会很慢，为避免此情况，可以直接下载TinyMCE使用。

```shell
npm install @tinymce/tinymce-vue -S
npm install tinymce -S
```
TinyMCE默认是英文界面，中文界面需先下载官方中文语言包（ https://www.tiny.cloud/get-tiny/language-packages/）。

在public目录下新建tinymce文件夹，将解压后的中文语言包复制到该文件夹中，以备使用。

## 初始化配置

首先引入tinymce

```javascript
import tinymce from "tinymce/tinymce";
```

然后单独引入皮肤样式，如果不引入皮肤样式编辑器无法显示，一片空白

 ```javascript
import "tinymce/skins/ui/oxide/skin.min.css";
 ```

再引入主题

```javascript
import "tinymce/themes/silver";
// 如果不引入主题，可能会出现如下错误
// theme.js:1 Uncaught SyntaxError: Unexpected token '<'    theme.js:1 
```
引入icon  
```javascript
import "tinymce/icons/default/icons";
// 不引入icon的话，界面的所有icon全部无法正常显示，并且报错
// Uncaught SyntaxError: Unexpected token '<' icons.js:1
```
最后引入tinymce-vue

```javascript
import Editor from "@tinymce/tinymce-vue";
```

初始化设置如下

```javascript
data() {
    return {
      init: {
        language_url: "/tinymce/langs/zh_CN.js", // 引入下载好的汉化js文件
        language: "zh_CN", // 设置语言
        height: 500,
        menubar: false,
        skin: "oxide", // 设置皮肤
        toolbar: " bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | media | removeformat",
        branding: false,
      }
    };
}
```

## 插件使用

1、引入所需插件

```javascript
import "tinymce/plugins/image"; // 以图片上传插件为例
```

2、在初始化配置中引入

```javascript
init: {
  plugins: "image", // 引入image
  toolbar: " bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | media | removeformat image", // 在toolbar中添加image
  images_upload_url: "/demo/upimg.php",
  images_upload_base_path: "",
  // 配置images_upload_url 和 images_upload_base_path 实现图片上传功能
}
```

具体的其他插件可以参照中文文档中的说明自行配置，这里着重介绍一下批量上传图片插件[axupimgs](http://tinymce.ax-z.cn/more-plugins/axupimgs.php)

首先引入插件

```javascript
import "tinymce/plugins/image"; // axupimgs依赖于image，所有需先引入image
// 单独下载axupimgs插件（详见链接http://tinymce.ax-z.cn/more-plugins/axupimgs.php）
// 下载成功后解压到node_moudules/tinymce/plugins 中，然后引入
import "tinymce/plugins/axupimgs/plugin.js"; 
// 然后
// 将tinymce/plugins/axupimgs文件夹中的Upfiles.html 复制到 public/tinymce/plugin/axupimgs/中，
// 修改tinymce/plugins/axupimgs/plugin.js 中 var iframe1 = '/tinymce/axupimgs/plugin/upfiles.html';

```

然后在init中配置上传处理程序

```js
init: {
  images_upload_handler: (blobInfo, succFun) => {
  	var formData;
  	var file = blobInfo.blob(); //转化为易于理解的file对象
  	formData = new FormData();
  	formData.append("pic", file, file.name);
  	// axios封装的图片上传接口
  	this.$api.upload(formData).then(res => {
  		succFun(res.url);
  	});
  }
},
```

## 封装

建议将tinymce单独封装成一个组件，这里不详细说明，直接贴代码

```vue
<template>
  <div class="editor">
    <editor v-model="editorValue" :init="init"></editor>
  </div>
</template>
<script>
import tinymce from "tinymce/tinymce";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/themes/silver";
import "tinymce/icons/default/icons";
import "tinymce/plugins/image"; 
import "tinymce/plugins/axupimgs/plugin.js"; 
import Editor from "@tinymce/tinymce-vue";
export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    baseUrl: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: "image axupimgs"
    },
    toolbar: {
      type: [String, Array],
      default:
        " bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | axupimgs | removeformat"
    }
  },
  data() {
    return {
      init: {
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        height: 500,
        menubar: false,
        skin: "oxide",
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        images_upload_url: "/demo/upimg.php",
        images_upload_base_path: "",
        images_upload_handler: (blobInfo, succFun) => {
          var formData;
          var file = blobInfo.blob(); 
          formData = new FormData();
          formData.append("pic", file, file.name);
          this.$api.upload(formData).then(res => {
            succFun(res.url);
          });
        }
      },
      editorValue: this.value
    };
  },
  mounted() {
    tinymce.init({});
  },
  watch: {
    value(newValue) {
      this.editorValue = newValue;
    },
    editorValue(newValue) {
      this.$emit("input", newValue);
    }
  },
  methods: {}
};
</script>

```

## 使用
```vue
<template>
<tinycme-editor v-model="content"></tinycme-editor>
</template>
<script>
import TinycmeEditor from "@/components/Editor/Editor.vue";
export default {
  components: {
    TinycmeEditor // 引入Editor
  },
  data:{
  	return: {
  		content: ''
  	}
  }
}
</script>
```



> 趟坑无数后终于把TinyMCE集成到了CMS系统中，也实现了批量上传图片的功能，运营人员可以直接粘贴排版好的文档到编辑器中即可发布使用了。