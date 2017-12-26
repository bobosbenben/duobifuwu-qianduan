var util = require('util.js')


var hotPerson = {
  categoryTitle: '热门工匠',
  units:[
    {
      name: '开锁:石伊波',
      coverImage: '/image/ren.jpg',
      zanedTimes: 12,
      focusedTimes: 55,
      unitId: 1292052
    },{
      name: '通下水:石磊',
      coverImage: '/image/ren2.jpg',
      zanedTimes: 12,
      focusedTimes: 55,
      unitId: 1292052
    },{
      name: '修暖气:章泽天和刘',
      // coverageUrl: '/image/ren3.jpg',
      coverImage: 'https://img3.doubanio.com\/view\/movie_poster_cover\/lpst\/public\/p480747492.jpg',
      zanedTimes: 12,
      focusedTimes: 55,
      unitId: 1292052
    }
  ]
};

var hotShop={
  categoryTitle: '热门店铺',
  units: [
    {
      name: '金顶横超市',
      coverImage: '/image/dian1.jpg',
      zanedTimes: 12,
      focusedTimes: 55,
      unitId: 1292052
    }, {
      name: '百利购物超市',
      coverImage: '/image/dian2.jpg',
      zanedTimes: 12,
      focusedTimes: 55,
      unitId: 1292052
    }, {
      name: '飞龙五金建材',
      coverImage: '/image/dian3.jpg',
      // coverageUrl: 'https://img3.doubanio.com\/view\/movie_poster_cover\/lpst\/public\/p480747492.jpg',
      zanedTimes: 12,
      focusedTimes: 55,
      unitId: 1292052
    }
  ]
};

var recentOnline= {
  categoryTitle: '最新上线',
  units: [
    {
      name: '体育彩票',
      coverImage: '/image/ren2.jpg',
      zanedTimes: 12,
      focusedTimes: 55,
      unitId: 1292052
    }, {
      name: '小区门口超市',
      coverImage: '/image/dian4.jpg',
      zanedTimes: 12,
      focusedTimes: 55,
      unitId: 1292052
    }, {
      name: '曲美家具批发',
      coverImage: '/image/dian5.jpg',
      // coverageUrl: 'https://img3.doubanio.com\/view\/movie_poster_cover\/lpst\/public\/p480747492.jpg',
      zanedTimes: 12,
      focusedTimes: 55,
      unitId: 1292052
    }
  ]
}

var casts = [
  {
      "alt": "https:\/\/movie.douban.com\/celebrity\/1054521\/",
    "avatars": {
        "small": "https://img3.doubanio.com\/img\/celebrity\/small\/17525.jpg",
      "large": "https://img3.doubanio.com\/img\/celebrity\/large\/17525.jpg",
      "medium": "https://img3.doubanio.com\/img\/celebrity\/medium\/17525.jpg"
    },
    "name": "\u8482\u59c6\u00b7\u7f57\u5bbe\u65af",
    "id": "1054521"
  },
  {
      "alt": "https:\/\/movie.douban.com\/celebrity\/1054534\/",
    "avatars": {
        "small": "https://img3.doubanio.com\/img\/celebrity\/small\/34642.jpg",
      "large": "https://img3.doubanio.com\/img\/celebrity\/large\/34642.jpg",
      "medium": "https://img3.doubanio.com\/img\/celebrity\/medium\/34642.jpg"
    },
    "name": "\u6469\u6839\u00b7\u5f17\u91cc\u66fc",
    "id": "1054534"
  },
  {
      "alt": "https:\/\/movie.douban.com\/celebrity\/1041179\/",
    "avatars": {
        "small": "https://img1.doubanio.com\/img\/celebrity\/small\/5837.jpg",
      "large": "https://img1.doubanio.com\/img\/celebrity\/large\/5837.jpg",
      "medium": "https://img1.doubanio.com\/img\/celebrity\/medium\/5837.jpg"
    },
    "name": "\u9c8d\u52c3\u00b7\u5188\u987f",
    "id": "1041179"
  },
  {
      "alt": "https:\/\/movie.douban.com\/celebrity\/1000095\/",
    "avatars": {
        "small": "https://img1.doubanio.com\/img\/celebrity\/small\/7827.jpg",
      "large": "https://img1.doubanio.com\/img\/celebrity\/large\/7827.jpg",
      "medium": "https://img1.doubanio.com\/img\/celebrity\/medium\/7827.jpg"
    },
    "name": "\u5a01\u5ec9\u59c6\u00b7\u8d5b\u5fb7\u52d2",
    "id": "1000095"
  }
]

var genres = ["开锁","剧情"]

var movie = {
    id: 11,
    movieImg: '/image/dian1.jpg',
    country: '阿镇',
    title: '开锁:石伊波',
    originalTitle: '开锁:石伊波',
    wishCount: 45,
    commentCount: 10,
    year: 2017,
    generes: genres.join("、"),
    stars: [1,1,1,1,0],
    score: 9.6,
    director: '石伊波',
    casts: util.convertToCastString(casts),
    castsInfo: util.convertToCastInfos(casts),
    address:{
      haveAddress: true,
      address: '鄂尔多斯市伊金霍洛旗阿镇通格朗街与广场路交汇处',
      longitude: '113.324520',
      latitude: '23.099994',
      scale: 14,
      controls: [{
        id: 1,
        iconPath: '/image/icon-address.png',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        clickable: true
      }],
      markers: [{
        iconPath: "/image/address.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 40,
        height: 40
      }]
    },
    summary: '&emsp;工匠石伊波，自2017年以来一直从事与开锁工作，已在公安局备案开锁，获得开锁资质，是鄂尔多斯锁业协会会员。同时兼职换锁。\n&emsp;这里是第二行',
    contactInfo:[
      {
        type: '手机',
        value: '13948171521',
        icon: '/image/dh.jpg'
      },{
        type: '微信',
        value: 'w_id1524',
        icon: '/image/weixin.jpg'
      },{
        type: 'QQ',
        value: '1219115654',
        icon: '/image/qq.jpg'
      }
    ]
}

module.exports = {
  hotPerson: hotPerson,
  hotShop: hotShop,
  recentOnline: recentOnline,
  movie: movie
}  