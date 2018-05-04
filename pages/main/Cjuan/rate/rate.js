// pages/main/Cjuan/rate/rate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classid:'',
    result: [],
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
    var that=this;
    wx.request({
      method: "GET",
      url: 'https://www.joango.cn/wmp', //请求班级数据 
      data: {
        actions: 'rate',
        classids: this.data.classid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.SignRow);
        if (typeof (res.data.SignRow) == 'undefined') {
          that.setData(
            {
              result: '' //jsonj解析为数组
            });
        }
        else {
          that.setData(
            {
              result: JSON.parse(res.data.SignRow) //jsonj解析为数组
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
  
  },
  //跳转到饼图
  goGraph: function (res) {
    var that=this;
    wx.navigateTo({
      url: 'Graph/Graph?number=' + res.currentTarget.dataset.number + '&num=' + res.currentTarget.dataset.num + '&count=' + res.currentTarget.dataset.count + '&qdh=' + res.currentTarget.id + '&classid=' + that.data.classid,
    })
  },


  
})