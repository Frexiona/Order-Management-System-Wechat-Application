<<<<<<< HEAD
import  { _ , _t } from './language'
=======
import {
  _,
  _t
} from './language'
>>>>>>> develope/1.1.0
/*
  setStorageSync中
    token用来存 登录信息的token
    loginToken用来存储头像等

*/
<<<<<<< HEAD
const languageObj =  _;
=======
>>>>>>> develope/1.1.0
const WXAPI = require('apifm-wxapi');

// 专属域名
const personalUrl = '49c1dad08119b7605a22163ec2629512';

// 初始化专属域名，必须放在onLoad事件下
const initalFetch = () => {
  WXAPI.init(personalUrl)
}

// 设置登录后的code
const setCode = (code) => {
<<<<<<< HEAD
  wx.setStorageSync('code', code, )
=======
  wx.setStorageSync('code', code)
>>>>>>> develope/1.1.0
}

// 获取用户登录后的code
const getCode = () => {
<<<<<<< HEAD
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
            title: `${languageObj["registerTips"]}`,
            icon: 'none'
          })
        } else if (res.code == 0) {
          const preToken = wx.getStorageSync("token");

          if(preToken){
          // wx.showToast({
          //   title: `${languageObj["loginTips"]}`,
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
            title: `${languageObj["registerTips"]}`,
=======
  return wx.getStorageSync('code');
};

// 此login是一次性的 在你使用工厂API登录后他返回的code即会失效需要你重新获取
const wxLoogin = () => {
  return new Promise((resolve,reject) => {
    wx.login({
      success:function(res){
        resolve(res);
      }
    })
  })

}

// 微信初始化时会调用一次
const goLogin = (cb) => {
  wx.login({
    success: function (res) {
      const code = res.code; // 微信登录接口返回的 code 参数，下面登录接口需要用到
      console.log("微信登录接口返回", res)
      setCode(code);  // 设置用户code

      WXAPI.login_wx(code).then(function (res) {
        // 登录接口返回结果
        console.log('API工厂登录接口返回结果:', res)
        if (res.code == 10000) { // 1000代表没有注册
          wx.showToast({
            title: `${_('registerTips')}`,
>>>>>>> develope/1.1.0
            icon: 'none'
          })
        } else if (res.code == 0) {
          const preToken = wx.getStorageSync("token");

<<<<<<< HEAD
          if(preToken){
          // wx.showToast({
          //   title: `${language._t()["loginTips"]}`,
          //   icon: 'success'
          // })
        }

          wx.setStorageSync('token', res.data)
          // wx.navigateBack()
         if (cb) cb();
=======
          if (preToken) {
            // wx.showToast({
            //   title: `${_("loginTips")}`,
            //   icon: 'success'
            // })
          }

          wx.setStorageSync('token', res.data)
          if (cb) cb();
>>>>>>> develope/1.1.0
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
<<<<<<< HEAD
const registerApifm = async () => {
  const code = await getCode();
  const res = WXAPI.register_simple({
    code: code
  })
 
=======
const registerApifm = async (userInfo) => {
  const resp = await wxLoogin();
  const code = resp.code;
  let res;

  if (userInfo) {   // 复杂注册
    res = await WXAPI.register_complex({
      code: code,
      encryptedData: userInfo.encryptedData,
      iv: userInfo.iv
    })
    
  } else { // 简单注册
    res = await WXAPI.register_simple({
      code: code
    })
  }

>>>>>>> develope/1.1.0
  return res;
}


module.exports = {
  getCode,
  setCode,
  registerApifm,
  initalFetch,
  goLogin
}