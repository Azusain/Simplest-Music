// pages/navigator/navigator.js

Page({
  data: {
    powerList:[
      {
        title: "基础版",
        tip: "基础功能"
      },
      {
        title: "进阶版",
        tip: "进阶功能"
      },
      {
        title: "高级版",
        tip: "高级功能"
      }
    ]
  },
  onClickPowerInfo:function(){
    wx.navigateTo({
      url: '../main/main'
    })
  }
})