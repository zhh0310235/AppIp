// pages/template/tems.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nnichen:'',
    touImage:''
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
    var that=this;
    wx.request({

      method: "GET",
      url: 'https://www.joango.cn/wmp', //请求班级数据 
      data: {
        actions: 'Teacher',
        iclassd: wx.getStorageSync('iclassd'),
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) { 
        that.setData({
          nnichen: res.data.nnichen,
          touImage:res.data.touImage
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '信息拉取失败！',
          icon: 'success',
          image: '../image/defualt.png',
          duration: 2000
        })
      }
    })
    
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
  goback:function(){
    this.loginid();
    /*
    wx.navigateTo({
      url: 'Juan/Juan'?classid=' + e.currentTarget.dataset.text,
    })
    */
  },
  goJuan:function() {
    wx.navigateTo({
      url: 'Juan/Juan',/*?classid=' + e.currentTarget.dataset.text,*/
    })
  },
 
})