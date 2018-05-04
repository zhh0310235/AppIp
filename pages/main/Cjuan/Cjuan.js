// pages/main/Cjuan/Cjuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classid:'',
    classname:''
   
  },
  //签到
  Sign: function (e) {
    wx.navigateTo({
      url: 'Sign/Sign?classid=' + this.data.classid,
    })
  }, 
  //签迟到
  Signgo: function (e) {
    
    wx.navigateTo({
      url: 'Signgo/Signgo?classid=' + this.data.classid,
    })
  }, 
//签退
  Tui: function (e) {

    wx.navigateTo({
      url: 'Tui/Tui?classid=' + this.data.classid,
    })
  },
  //到课率
  rate: function (e) {
    wx.navigateTo({
      url: 'rate/rate?classid=' + this.data.classid,
    })
  },
  //在线答疑
  online: function (e) {
    wx.navigateTo({
      url: 'Online/Onlion?classid=' + this.data.classid,
    })
  },
  //试卷库
  goclass: function (e) {
    /*
    wx.navigateTo({
      url: 'Study/study?classid=' + this.data.classid,
    })*/
    wx.navigateTo({
      url: '../../template/Juan/Juan?classid=' + this.data.classid,
    })
  },

  //学生管理
  Mstu: function (e) {
    wx.navigateTo({
      url: 'Mstu/Mstu?classid=' + this.data.classid,
    })
  },

  //试题库
  gotip: function (e) {
    wx.navigateTo({
      url: 'Tip/Tip?classid=' + this.data.classid,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classid: options.classid,
      classname: options.classname
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
  onShareAppMessage: function (res) {
    var that=this;
    if (res.from === 'button') {
      return {
        title: '加入　' + that.data.classname +'　班级',
        path: 'pages/join/join?classid=' + this.data.classid,
        imageUrl: 'https://joango.cn/Img/join.png',
        success: function (res) {
        },
        fail: function (res) {
        }
      }
    }

  },

})