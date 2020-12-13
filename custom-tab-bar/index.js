import language from '../utils/language';

Component({
  data: {
    selected: 2,
    color: "#6e6d6b",
    selectedColor: "#1296db",
    borderStyle: "white",
    backgroundColor: "#fff",
    list: [{
        pagePath: "/pages/status/status",
        iconPath: "/images/mp/pro.png",
        selectedIconPath: "/images/mp/proa.png",
        text: language._t()['status'] || 'status'
      }, {
        pagePath: "/pages/form/form",
        iconPath: "/images/mp/mp.png",
        selectedIconPath: "/images/mp/mpa.png",
        text: language._t()['newOrder'] || 'New Order'
      },
      {
        pagePath: "/pages/index/index",
        iconPath: "/images/mp/dt.png",
        selectedIconPath: "/images/mp/dta.png",
        text: language._t()['mine'] || 'Mine'
      }
    ],
    _t: {},
  },
  attached: function () {
    this.setData({
      _t: language._t(),
    })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      console.log("url:", url)
      wx.switchTab({
        url
      })

      this.setData({
        selected: data.index
      })
      console.log("down", data)
    }
  }
})