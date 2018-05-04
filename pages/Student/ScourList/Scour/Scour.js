// pages/Student/ScourList/Scour/Scour.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classArray:['工程数学',2,3,4,5,6,7,8,9,10,11],
    name:'张**',
    sclass:'15软件',
    term:'第一周'
  
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
      url: 'https://www.joango.cn/wmp',
      data: {
        actions: 'yzmImg',
      },
      success: function (res) {
        console.log(that.data.name)
       // that.setData({name: res.data,}),
      },
      fail: function (res) {
        wx.showToast({
          title: '登录失败！',
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
  
  }
})