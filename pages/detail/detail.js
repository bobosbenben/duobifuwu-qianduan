// detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: null,
    unitid: null,

    unit:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var unitid = options.id;
    var that = this;
    var openid = app.globalData.openid;

    this.setData({
      unitid: unitid,
      openid: openid
    });

    wx.request({
      url: app.globalData.baseUrl + 'xiaochengxu/getunitdetail.do',
      data:{
        openid: openid,
        unitid: unitid
      },
      header:{
        'content-type': 'application/json'
      },
      success:function(res){
        that.setData({
          unit: res.data.data
        });
        console.log('unit:'); console.log(that.data.unit);
      }
    })
  },

  /**
   * 查看“相关信息”中的单张图片
   */
  previewSingleImage: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },

  /**
   * 点击联系电话时拨打号码
   */
  onPhoneTap: function(event){
    var phone_number = event.currentTarget.dataset.num;
   
    wx.makePhoneCall({
      phoneNumber: phone_number,
    });
  },

  /**
   * 点击关注
   */
  onFocusTap: function(event){
    var that = this;
    var focused = this.data.unit.focused;
    var openid = this.data.openid;
    var unitid = this.data.unitid;

    wx.request({
      url: app.globalData.baseUrl + 'zanfocus/focus.do?',
      data: {
        openid: openid,
        unitid: unitid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (!focused) {
          wx.showToast({
            title: '关注成功',
            icon: 'success',
            duration: 1500
          });
          that.setData({
            'unit.focused': true
          })
        } else {
          wx.showToast({
            title: '取消关注',
            icon: 'fail'
          });
          that.setData({
            'unit.focused': false
          })
        }
      }
    })
    
  },

  /**
   * 点击赞
   */
  onZanTap: function(event){
    var that = this;
    var zaned = this.data.unit.zaned;
    var openid = this.data.openid;
    var unitid = this.data.unitid;    

    wx.request({
      url: app.globalData.baseUrl + 'zanfocus/zan.do?',
      data: {
        openid: openid,
        unitid: unitid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (!zaned) {
          wx.showToast({
            title: '谢客官点赞',
            icon: 'success',
            duration: 1500
          });
          that.setData({
            'unit.zaned': true
          })
        } else {
          wx.showToast({
            title: '取消赞',
            icon: 'fail'
          });
          that.setData({
            'unit.zaned': false
          })
        }
      }
    })

    
    
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})