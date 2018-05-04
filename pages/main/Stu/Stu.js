// pages/main/Stu/Stu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classid:'',
  },
  //签到
  Sign: function (e) {
    wx.navigateTo({
      url: '../../Student/Sign/Sign?classid='+this.data.classid,
    })
  }, 
  //签到查询
  Signquery: function (e) {
    wx.navigateTo({
      url: '../../Student/Signquery/Signquery?classid=' + this.data.classid,
    })
  }, 
  //课堂练习
  question: function (e) {
    wx.navigateTo({
      url: '../../Student/question/question?classid=' + this.data.classid,
    })
  }, 
  //课程表
  Scour: function (e) {
    wx.navigateTo({
      url: '../../Student/ScourList/Scour/Scour?classid=' + this.data.classid,
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classid: options.classid
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