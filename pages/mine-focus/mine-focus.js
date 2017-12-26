// pages/mine-focus/mine-focus.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: null,
    focusUnits: [],
    pageNum: 1,
    listLock: false,
    listLoadingComplete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    console.log('openid:');console.log(app.globalData.openid);

    that.setData({
      openid: app.globalData.openid,
      pageNum: 1
    });
    
    that.fetchList();
  },

  fetchList: function(){
    var that = this;
    //加锁
    that.setData({
      listLock: true
    });
    wx.showLoading({
      title: '正在加载',
    })

    var focusUnits = that.data.focusUnits;
    if (this.data.openid && this.data.pageNum) {
      wx.request({
        url: app.globalData.baseUrl + 'mine/getfocusedunits.do',
        data: {
          openid: this.data.openid,
          pagenum: this.data.pageNum
        },
        success: function (res) {
          var count = res.data.total;
          var units = res.data.data;
          if (count == 0) {
            that.setData({
              listLoadingComplete: true
            })
          } else if (count == undefined) {

          } else {
            focusUnits = focusUnits.concat(units);
          }

          that.setData({
            focusUnits: focusUnits
          });

        },
        complete: function () {
          that.setData({
            listLock: false
          });
          wx.hideLoading();
        }
      })
    }
  },

  onListPhoneTap: function (event) {
    var phone_number = event.currentTarget.dataset.num;

    wx.makePhoneCall({
      phoneNumber: phone_number,
    });
  },

  onCellTap: function (event) {
    var unitId = event.currentTarget.dataset.unitid;

    wx.navigateTo({
      url: '../detail/detail?id=' + unitId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  onLongTap:function(event){
    var that = this;
    var unitId = event.currentTarget.dataset.unitid;
    var name = event.currentTarget.dataset.name;
    wx.showModal({
      title: '取消',
      content: '取消对'+name+'的关注？',
      success: function(res){
        if(res.confirm){
          wx.request({
            url: app.globalData.baseUrl+ 'zanfocus/focus.do',
            data:{
              unitid: unitId,
              openid: app.globalData.openid
            }
          });
          that.setData({
            focusUnits: [],
            pageNum: 1,
            listLock: false,
            listLoadingComplete: false
          });
          that.fetchList();
        }
        else if(res.cancel){

        }
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (!that.data.listLoadingComplete && !that.data.listLock) {
      that.setData({
        pageNum: that.data.pageNum + 1  //每次触发上拉事件，把searchPageNum+1  
      });
      that.fetchList();
    }
  }
  
})