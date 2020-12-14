//app.js
import {  goLogin } from './utils/login';
<<<<<<< HEAD
import { language } from './utils/language'

const WXAPI = require('apifm-wxapi');


=======
>>>>>>> develope/1.1.0

App({
  onLaunch: function () {

    wx.getSystemInfo({
      success (res) {
        wx.setStorageSync('Language', res.language)
      }
    })
     // 获取用户已经授权信息
    const getSetting = wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 对API工厂进行登录
    goLogin(getSetting);
  },

  globalData: {
    userInfo: null
  }
})