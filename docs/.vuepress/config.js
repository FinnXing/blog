module.exports = {
  title: 'Mr.Finn`Blog',
  dest: './html',
  theme: 'reco',
  permalink: "/pages/:year:month:day",
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['link', { rel: 'icon', href: 'https://img.xing666.net/blog/img/favicon.ico' }]
  ],
  themeConfig: {
    type: 'blog',
    author: 'Mr.Finn',
    nav:[
      { text: '首页', link: '/', icon: 'reco-home'},
      { text: '时间轴', link: '/timeline/', icon: 'reco-date' }
    ],
    sidebar: 'auto', //在所有页面中启用自动生成侧栏
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认文案 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认文案 “标签”
      }
    },
    valineConfig: {
      appId: 'bd53gbJ5cc0D0shcdgsPRzsG-gzGzoHsz',// your appId
      appKey: 'Giwu4BSKaxvNoGYD9dVOKMBC', // your appKey
    },
    // 右侧信息栏头像
    authorAvatar: 'https://img.xing666.net/blog/img/logo.png',
    // 备案
    record: '京ICP备17027294号-2',
    recordLink: 'http://www.beian.miit.gov.cn/',
    startYear: '2019',
  }
};
