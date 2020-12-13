// 显示购物车tabBar的Badge
function showTabBarBadge() {
  wx.getStorage({
    key: 'shopCarInfo',
    success: function (res) {
      if (res.data.shopNum > 0) {
        wx.setTabBarBadge({
          index: 2,
          text: `${res.data.shopNum}`
        });
      } else {
        wx.removeTabBarBadge({
          index: 2
        });
      }
    }
  });
}

function initalTableBar(index, that) {
  if (typeof that.getTabBar === 'function' &&
    that.getTabBar()) {
    that.getTabBar().setData({
      selected: index
    })
  }
}

module.exports = {
  showTabBarBadge: showTabBarBadge,
  initalTableBar
}