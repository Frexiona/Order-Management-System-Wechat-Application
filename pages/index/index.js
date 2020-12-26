//index.js
//获取应用实例
import {
  registerApifm,
  initalFetch,
  goLogin
} from '../../utils/login';
import language from '../../utils/language';
import { initalTableBar } from '../../utils/tools';


const app = getApp();
const WXAPI = require('apifm-wxapi');
initalFetch();

// 定义BarTitle
const setBarTitle = (that) => {
  wx.setNavigationBarTitle({
      title: that.data._t["mine"] || "我的(Mine)" 
    })
}

Page({
  data: {
    motto: `${language._('motto')}`,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    _t: {},
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  onLoad: function () {
    initalFetch();
    this.setData({
      _t: language._t(),
  })
  // token存在 注册登录按钮才会显示
  const token = wx.getStorageSync('token')
  console.log("324432432",token)
    if (app.globalData.userInfo && token) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse && token) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      if(token)
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          wx.setStorageSync('loginToken', res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true  
          })
        }
      })
    }
  },

  onReady:function() {
    setBarTitle(this);
  },

  onShow:function() {
    initalTableBar(2,this);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  getUserInfo: function (e) {
    if (!e.detail.userInfo) {
      // 你点了取消授权
      return;
    }

    const that = this;
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorageSync('loginToken', e.detail)

    console.log("用户信息为：", e.detail)
    registerApifm(e.detail).then(res => {
      console.log("注册接口返回结果：", res)
      // 注册成功code返回为0 或者用户存在时执行goLoging
      if(res.code == 0){
        wx.showToast({
          title: `${language._('registerOk')}`,
        })
        // 注册成功才去二次登录
        goLogin(() =>{
          const token = wx.getStorageSync('token')

          if(token)
          that.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })
        })
       
      }
      else if(res.msg == "user has exists"){
        wx.showToast({
          title: `${language._('loginTips')}`,
        })
        goLogin(() =>{
          const token = wx.getStorageSync('token')

          if(token)
          that.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })
        })
      }
      else {
        wx.showToast({
          title: `${res.msg}`,
          icon:'none'
        })
      }
      
      
    })
    .catch( err => console.error("eerr",err))
    
  },

})


