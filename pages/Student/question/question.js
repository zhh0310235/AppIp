// pages/main/main.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    classid: '',
    titleId: '',
    complete:false,
    /** 
        * 页面配置 
        */

    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ classid: options.classid });
  },

  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
 * 点击tab切换 
 */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    var that = this;
    var vs;
    /** 
    * 获取系统信息 
    */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    //console.log('本地读取 id:'+vs);
    wx.request({

      method: "GET",
      url: 'https://www.joango.cn/wmp', //请求班级数据 
      data: {
        actions: 'StuQuestion',
        classid: that.data.classid,
        Openid: wx.getStorageSync('iclassd'),
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        
        if ((typeof (res.data.question) == 'undefined')) {
          that.setData(
            {
              result: '',
              complete: false,
            });
        }
        else {
          that.setData(
            {
              result: JSON.parse(res.data.question),
              complete: true,
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    this.onShow()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //做题
  juan: function (res) {
    wx.navigateTo({
      url: 'que/que?classid=' + this.data.classid + '&titleId=' + res.currentTarget.dataset.text + '&new=' + res.currentTarget.dataset.new,
    })
  },
 






})





