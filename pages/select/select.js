// pages/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  //获取用户信息
  tescher: function () {
  var that=this;
  //发起网络请求    
  wx.request({
    url: 'https://www.joango.cn/wmp',
    data: {
      actions: 'StuOrTea',
      iclassd: wx.getStorageSync('iclassd'),
      profession: 'teacher'
    },
    success: function (res) { wx.reLaunch({ url: '/pages/main/main' }); },
    fail: function (res) { wx.reLaunch({ url: '/pages/main/main' }); }
  });
  },
  //获取学生信息
  student: function () {
   var that=this;
   //发起网络请求    
   wx.request({
     url: 'https://www.joango.cn/wmp',
     data: {
       actions: 'StuOrTea',
       iclassd: wx.getStorageSync('iclassd'),
       profession: 'student'
     },
     success: function (res) { wx.reLaunch({ url: '/pages/main/main' }); },
     fail: function (res) { wx.reLaunch({ url: '/pages/main/main' }); }
   });
  }
})