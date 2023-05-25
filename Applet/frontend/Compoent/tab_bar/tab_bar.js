// pages/Compoent/tab_bar/tab_bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected_idx:0,
    list: [{
      "pagePath": "/pages/main/mine/mine",
      "text": "首页"
    },
    {
      "pagePath": "/pages/index/index",
      "text": "工具"
    },
    {
      "pagePath": "/pages/main/mine/mine",
      "text": "我的"
    }]
  },

  /**
   * 组件的方法列表
   */
  
  methods: {
    switch_tab(e){
      const data = e.currentTarget.dataset
      // const url = data.path
      // console.log(url)
      // 不知道为什么用参数传进来的url不能用
      // 明明一模一样
      const url = "/pages/main/mine/mine"
      wx.navigateTo({
        url: url,
      })
      this.setData({
        selected_idx: data.index
      })
    }
  }
})
