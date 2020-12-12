//index.js
//获取应用实例
import {
  registerApifm,
  initalFetch,
  goLogin
} from '../../utils/login';
import language from '../../utils/language';
import { initalTableBar } from '../../utils/tools'


const app = getApp();

// 定义BarTitle
const setBarTitle = (that) => {
  wx.setNavigationBarTitle({
      title: that.data._t["mine"] || "我的(Mine)" 
    })
}

Page({
  data: {
    motto: 'Thanks for Trusting Nailed it 😆',
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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

    app.globalData.userInfo = e.detail.userInfo
    wx.setStorageSync('loginToken', e.detail)
    registerApifm().then(res => {
      goLogin()
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

})


