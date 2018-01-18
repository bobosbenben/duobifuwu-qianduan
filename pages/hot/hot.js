// hot.js
var util = require('../../utils/util.js')
var route = require('../../utils/routes');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotPerson: {},
    recentOnline: {},
    hotShop: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
    search: {},
    searchLoadingComplete: false,
    searchPageNum: 1,
    searchKeyWord: '',
    searchLock: false  //解决请求数据时多次触底导致的错误
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowHeight: app.globalData.systemInfo.windowHeight
    });
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + 'hotunit/get.do',
      success: function(res){
        
        var hotData = res.data.data;
        that.setData({
          hotPerson: hotData[0],
          hotShop: hotData[1],
          recentOnline: hotData[2]
        });
      }
    })
  },

  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "../more-units/more-units?category=" + category
    })
  },

  onUnitTap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../detail/detail?id=" + id
    })
  },

  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {},
      searchKeyWord: ''
    });
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onBindBlur: function (event) {
    this.setData({
      searchPageNum: 1,
      searchLoadingComplete: false,
      searchResult:{},
      searchKeyWord: event.detail.value
    });
    this.fetchSearchList();
  },

  fetchSearchList: function(){
    var that = this;
    if (that.data.searchLock||that.data.searchKeyWord == '' || that.data.searchKeyWord == undefined || that.data.searchKeyWord == null) return;
    //加锁
    that.setData({
      searchLock: true
    });
    wx.showLoading({
      title: '正在加载',
    })
    var searchUrl = app.globalData.baseUrl + "hotunit/search.do";
    
    var originalSearchResultList = that.data.searchResult.units;
    if(originalSearchResultList == undefined || originalSearchResultList == null){
      originalSearchResultList = [];
    }
    wx.request({
      url: searchUrl,
      data: {
        searchkeyword: that.data.searchKeyWord,
        searchpagenum: that.data.searchPageNum
      },
      success: function (res) {
        var units = res.data.data;
        var count = res.data.total;
      
        if(count == 0){
          that.setData({
            searchLoadingComplete: true
          })
        }else if(count==undefined){

        }else{
          originalSearchResultList = originalSearchResultList.concat(units);
        }

        that.setData({
          searchResult: {
            units: originalSearchResultList,
            searchLoadingComplete: that.data.searchLoadingComplete,
            windowHeight: that.data.windowHeight - 20 //为了实现下拉加载时触底
          }
        });
      },
      fail: function () {
        console.log('获取搜索数据时失败');
      },
      complete:function(){
        that.setData({
          searchLock: false
        });
        wx.hideLoading();
      }
    })

  },

  //滚动到底部触发事件  
  onScrollLower: function (e) {
    var that = this;
    if (!that.data.searchLoadingComplete && !that.data.searchLock) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1  //每次触发上拉事件，把searchPageNum+1  
        // isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      that.fetchSearchList();
    }
  },

  onShareAppMessage: function (res) {}

})