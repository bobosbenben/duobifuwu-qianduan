// mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    phoneNumber: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = app.globalData.openid;

    wx.login({
      success: function (loginRes) {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo
            })
          }
        })

      }
    })

  },

  onContactUs:function(){
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + 'mine/getmaincontactnumber.do',
      success: function(res){
        var phoneNumber = res.data.data;
        if (phoneNumber != null && phoneNumber != undefined) {
          wx.makePhoneCall({
            phoneNumber: phoneNumber
          })
        }
        
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})