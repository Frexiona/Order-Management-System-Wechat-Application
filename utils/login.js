import { language } from './language'
/*
  setStorageSync中
    token用来存 登录信息的token
    loginToken用来存储头像等

*/

const WXAPI = require('apifm-wxapi');

// 专属域名
const personalUrl = '49c1dad08119b7605a22163ec2629512';

// 初始化专属域名，必须放在onLoad事件下
const initalFetch = () => {
  WXAPI.init(personalUrl)
}

// 设置登录后的code
const setCode = (code) => {
  wx.setStorageSync('code', code, )
}

// 获取用户登录后的code
const getCode = () => {
  return wx.getStorageSync('code')
};

const goLogin = (cb)=> {
  wx.login({
    success: function (res) {
      const code = res.code; // 微信登录接口返回的 code 参数，下面登录接口需要用到
      WXAPI.login_wx(code).then(function (res) {
        // 登录接口返回结果
        console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: `${language._t()["registerTips"]}`,
            icon: 'none'
          })
        } else if (res.code == 0) {
          const preToken = wx.getStorageSync("token");

          if(preToken){
          // wx.showToast({
          //   title: `${language._t()["loginTips"]}`,
          //   icon: 'success'
          // })
        }

          wx.setStorageSync('token', res.data)
          // wx.navigateBack()
         if (cb) cb();
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
    }
  })
}

const goLoinAdvance = () => {
  wx.login({
    success: function (res) {
      const code = res.code; // 微信登录接口返回的 code 参数，下面登录接口需要用到
      WXAPI.login_wx(code).then(function (res) {
        // 登录接口返回结果
        console.log(res)
        if (res.code == 10000) {
          wx.showToast({
            title: `${language._t()["registerTips"]}`,
            icon: 'none'
          })
        } else if (res.code == 0) {
          const preToken = wx.getStorageSync("token");

          if(preToken){
          // wx.showToast({
          //   title: `${language._t()["loginTips"]}`,
          //   icon: 'success'
          // })
        }

          wx.setStorageSync('token', res.data)
          // wx.navigateBack()
         if (cb) cb();
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
    }
  })
}

// 利用API工厂进行注册
const registerApifm = async () => {
  const code = await getCode();
  const res = WXAPI.register_simple({
    code: code
  })
 
  return res;
}


module.exports = {
  getCode,
  setCode,
  registerApifm,
  initalFetch,
  goLogin
}