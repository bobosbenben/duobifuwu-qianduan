var app = getApp()
var routes = require('../../utils/routes');
Page({
  data: {
    userInfo: {},
    cellHeight: '90rpx',
    items: [],
    serverPageItems: []
  },
  //事件处理函数  
  onLoad: function () {
    var that = this

    //获取首页数据
    wx.request({
      url: app.globalData.baseUrl + 'xiaochengxu/getgroupitems.do',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          items: res.data.data
        });
      }
    })

    //调用应用实例的方法获取全局数据  
    // app.getUserInfo(function (userInfo) {
      wx.setNavigationBarTitle({
        title: '多比信息服务',
        success: function (res) {
          // success  
        }
      })
    //   that.setData({
    //     userInfo: userInfo
    //   });
    // })
  },

  //开通分享页面
  onShareAppMessage: function (res) {

  }
  
})  