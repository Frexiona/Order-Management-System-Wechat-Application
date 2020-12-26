/*
  订单的map
  注意哦：如果已经存入了 数据库再去改变Map 就会发生字段不对应的问题 因此更改字段时慎重！
*/
import { _ } from 'language'

const orderMap = {
  // 订单完成
  orderComp: { 
    key: '20200105',
    word: `${_('orderComp')}`
  },
  // 开始润色
  startPoli: { 
    key: '20200104',
    word: `${_('startpoli')}`
  },
   // 已完成2000字
   twoThouWords: { 
    key: '20200103',
    word: `${_('2000words')}`
  },
    // 已完成1000字
    oneThouWords: { 
      key: '20200102',
      word: `${_('1000words')}`
    },
      // 开始接单
      orderStart: { 
    key: '20200101',
    word: `${_('orderSart')}`
  },
}

module.exports = {
  orderMap
}