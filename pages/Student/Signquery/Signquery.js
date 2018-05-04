// pages/main/Cjuan/rate/touchQiaodao/signInRecording.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signNewsArray: [],
    sysTime: "",
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
    var that = this;
    var signNews = {
      id: '1',
      className: '数据结构',
      classTime: '2018年4月27日',
      classTimeDay: '1-2节',
      classTeacher: '李',
      classAddr: '绣山实验楼D',
      signMode: '已签到'
    };
    var signNews2 = {
      id: '1',
      className: '数据结构',
      classTime: '2018年4月27日',
      classTimeDay: '1-2节',
      classTeacher: '李',
      classAddr: '绣山实验楼D',
      signMode: '未签到'
    };
    var signNews3 = {
      id: '1',
      className: '数据结构',
      classTime: '2018年4月27日',
      classTimeDay: '1-2节',
      classTeacher: '李',
      classAddr: '绣山实验楼D',
      signMode: '迟到签到'
    };
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    that.setData({
      sysTime: Y + "/" + M + "/" + D + " " + h + ":" + m + ":" + s,
      signNewsArray: [signNews, signNews2, signNews3],
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