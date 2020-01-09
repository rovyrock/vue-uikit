const { resolve } = require('path')

module.exports = {
  base: '/',
  title: 'MWeUI',
  description: '一个基础的vue组件库框架',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/' },
      { text: 'Git', link: 'https://github.com/' },
    ],
    sidebar: [
      {
        title: '简介',
        collapsable: false,
        children: [
          'introduction/guide'
        ]
      },
      {
        title: '组件',
        collapsable: false,
        children: [
          'components/icon',
          'components/button'
        ]
      }
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        'mweui': resolve(__dirname, '../../src')
      }
    }
  }
}