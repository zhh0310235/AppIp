// pages/main/Cjuan/rate/touchAn/touchAn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qdh: '',
    classid: '',
    result: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      classid: options.classid,
      qdh: options.qdh,
    });
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
    var that = this;
    wx.request({
      url: 'https://www.joango.cn/wmp',
      data: {
        actions: 'TouchQue',
        qdh: that.data.qdh,
        classid: that.data.classid,
        OpenId: wx.getStorageSync('iclassd')
      },
      success: function (res1) {
        that.setData(
          {
            result: JSON.parse(res1.data.TouchAn) //jsonj解析为数组
          });

      },
      fail: function (res) {
        wx.showToast({
          title: '查询失败！',
          icon: 'success',
          image: '../image/defualt.png',
          duration: 2000
        })
      }
    })

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

  },
  /**
   * 查看学生详情
   */
  Gotail: function () {
    console.log('Gotail')
  }
})