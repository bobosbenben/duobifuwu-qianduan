// pages/more-units/more-units.js
var app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    units: [],
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true,
    pageNum: 1,
    listLock: false,
    searchLoadingComplete: false,
    windowHeight: 0,
    data:{
      units: [],
      searchLoadingComplete: false,
      windowHeight: 0
    }
  },
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    
    var dataUrl = "";
    switch (category) {
      case "热门工匠":
        dataUrl = app.globalData.baseUrl + "/hotunit/morehotperson.do";
        break;
      case "热门店铺":
        dataUrl = app.globalData.baseUrl + "/hotunit/morehotshop.do";
        break;
      case "最新上线":
        dataUrl = app.globalData.baseUrl + "/hotunit/morerecentonline.do";
        break;
    }
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
    
    this.setData({
      requestUrl: dataUrl,
      pageNum: 1
    });
    
    this.fetchList();
  },

  fetchList: function(){
    var that = this;
    that.setData({
      listLock: true
    });

    wx.showLoading({
      title: '正在加载',
    })

    var units = that.data.data.units; 
    wx.request({
      url: that.data.requestUrl,
      data: {
        currentpage: that.data.pageNum
      },
      success: function (res) {
        var count = res.data.total;
        var returnUnits = res.data.data;

        if (count == 0) {
          that.setData({
            searchLoadingComplete: true
          })
        } else if (count == undefined) {

        } else {
          units = units.concat(returnUnits);
        }

        that.setData({
          data: {
            units: units,
            searchLoadingComplete: that.data.searchLoadingComplete,
            windowHeight: app.globalData.systemInfo.windowHeight - 20
          }
          
        });

      },
      complete: function () {
        that.setData({
          listLock: false
        });
        wx.hideLoading();
      }
    })

  },

  onScrollLower: function (event) {
    var that = this;
    if (!that.data.searchLoadingComplete && !that.data.listLock) {
      that.setData({
        pageNum: that.data.pageNum + 1  //每次触发上拉事件，把searchPageNum+1  
      });
      that.fetchList();
    }
  },

  onReady: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },

  onUnitTap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },
})