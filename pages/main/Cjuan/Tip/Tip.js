// pages/main/Cjuan/Tip/Tip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    wx.request({

      method: "GET",
      url: 'https://www.joango.cn/wmp', //请求班级数据 
      data: {
        actions: 'questionLook',
        iclassd: wx.getStorageSync('iclassd'),
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if ((typeof (res.data.questiontitle) == 'undefined')) {
          that.setData(
            {
              result: '',
            });
        }
        else {
          that.setData(
            {
              result: JSON.parse(res.data.questiontitle),
            });
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '信息拉取失败！',
          icon: 'success',
          image: '../image/defualt.png',
          duration: 2000
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})