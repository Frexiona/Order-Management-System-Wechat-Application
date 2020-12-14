import language from '../../utils/language';
import { initalFetch } from '../../utils/login';
import {
  initalTableBar
} from '../../utils/tools'

const orderMap = {
  20200105: '订单完成',
  20200104: '开始润色',
  20200103: '已完成2000字',
  20200102: '已完成1000字',
  20200101: '开始接单',
}

const WXAPI = require('apifm-wxapi')
const fetchForm = async () => {
  const tokenObj = wx.getStorageSync('token');

  return WXAPI.jsonList({
    token: tokenObj.token,
    type: 'apifm-wxapi-create-order'
  })
}

// 对订单重新进行一个排序
const resSort = (arr = []) => {
  const finishArr = []; // 已经完成的订单数组
  const currArr = []; // 正在进行的订单


  arr.forEach(item => {
    const hisList = item.jsonData.historyList;

    item.jsonData.historyList = JSON.parse(hisList);
    item.jsonData.historyList = item.jsonData.historyList.reverse();
    if (item.jsonData.currStatus === "20200101") {
      currArr.push(item)
    } else {
      finishArr.push(item);
    }
  });

  return [...finishArr, ...currArr]
}

// 定义BarTitle
const setBarTitle = (that) => {
  wx.setNavigationBarTitle({
    title: that.data._t["orderStatus"] || "状态(Status)"
  })
}

Page({

  /**
   * Page initial data
   */
  data: {
    thesisList: [],
    loading: true,
    _t: {},
    historyMap: {}, // 记录哪个历史记录应该打开
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    initalFetch();
    this.setData({
      _t: language._t(),
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    setBarTitle(this);
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    initalTableBar(0, this);
    fetchForm().then(res => {
      const list = resSort(res.data);
      const newMap = this.data.historyMap;

      if (res.data) {

        list.forEach(item => {
          const {
            id
          } = item;
          newMap[id] = false;
        })

        this.setData({
          thesisList: list,
          historyMap: newMap,
        })
      }

      this.setData({
        loading: false
      })
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  onCLickHistory: function (e) {
    const newHistoryMap = this.data.historyMap;
    const id = e.currentTarget.dataset.id

    newHistoryMap[id] = !this.data.historyMap[id];
    this.setData({
      historyMap: newHistoryMap,
    })
  },
  // thesisList() {
  //   const loginToken = wx.getStorageSync('token')
  //   console.log('loginToken', loginToken)
  //     if (!loginToken) {
  //       wx.showToast({
  //         title: '请先登录',
  //         icon: 'none'
  //       })
  //       return
  //     }
  //     WXAPI.jsonList({
  //       token: loginToken.token,
  //       // TODO: Remove on Prod
  //       type: 'apifm-wxapi-test'
  //     }).then(res => {
  //       console.log(`return from API 工厂, ${res}`,res)
  //       if (res.code == 0){
  //         this.setData({
  //           thesisList: res.data
  //         })
  //       } else {
  //         this.setData({
  //           thesisList: null
  //         })
  //         wx.showToast({
  //           title: res.msg,
  //           icon: 'none'
  //         })
  //       }
  //     })
  // }
})