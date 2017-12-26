//app.js
App({
  onLaunch: function () {
    var that = this;
    //获取用户信息
    var userInfo;
    wx.login({
      success: function (loginRes) {
        if (loginRes.code) {
          wx.request({
            url: that.globalData.baseUrl + 'xiaochengxu/onLogin.do',
            data: {
              code: loginRes.code
            },
            dataType: 'json',
            success: function (res) {
              if(!res.data.success) console.log('获取openId失败');
              var openid = res.data.data.openId;
              that.globalData.openid = openid
              wx.setStorage({
                key: 'openid',
                data: openid
              })

              that.getUserInfo(function(userInfo){})
            },
            fail: function(res){
              console.log('request失败'); console.log(res);
            },
            complete: function(res){
              console.log('reques结束'); console.log(res);
            }
          })
        }
        
      }
    })
    //获取用户手机信息
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.systemInfo = res;
      }
    })
  },


  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail: function () {
              that.globalData.userInfo = {
                avatarUrl:'http://b25.photo.store.qq.com/psu?/4c18405d-6bf7-4eed-87bf-7da723987a0b/J0.rR3VZYtMz.qu7qSmk.NuBmYyk1JcXuTKXlpCXZ04!/b/YdoS*A7*ugAAYgDb7A7huwAA&bo=kADiAAAAAAABAFU!&rf=viewer_4',
                nickName: '客官'
              }
            }
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    openid: null,
    //baseUrl: "https://39465100.qcloud.la/exam/",
    baseUrl: "https://48358943.duobifuwu.com/weixin/",
    systemInfo: null
  }
})