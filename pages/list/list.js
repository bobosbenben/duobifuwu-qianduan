// list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listUnits: [],
    cellid: null,
    pageNum: 1,
    listLock: false, 
    listLoadingComplete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var cellid = options.cellid;

    // wx.request({
    //   url: app.globalData.baseUrl + 'xiaochengxu/getlist.do',
    //   data: {
    //     id: cellid
    //   },
    //   success: function (res) {
    //     that.setData({
    //       listUnits: res.data.data
    //     });
    //     console.log(res.data.data);
    //   }
    // })
    that.setData({
      cellid: cellid,
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

    var listUnits = that.data.listUnits;
    if (this.data.cellid != null && this.data.pageNum) {
      wx.request({
        url: app.globalData.baseUrl + 'xiaochengxu/getlist.do',
        data: {
          id: this.data.cellid,
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
            listUnits = listUnits.concat(units);
          }

          that.setData({
            listUnits: listUnits
          });

        },
        complete: function(){
          that.setData({
            listLock: false
          });
          wx.hideLoading();
        }
      })
    }
  },

  onListPhoneTap:function(event){
    var phone_number = event.currentTarget.dataset.num;

    wx.makePhoneCall({
      phoneNumber: phone_number,
    });
  },

  onCellTap: function(event){
    var unitId = event.currentTarget.dataset.unitid;

    wx.navigateTo({
      url: '../detail/detail?id='+unitId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onLongTap: function (event) {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (!that.data.listLoadingComplete && !that.data.listLock) {
      that.setData({
        pageNum: that.data.pageNum + 1  //每次触发上拉事件，把searchPageNum+1  
        // isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      that.fetchList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})