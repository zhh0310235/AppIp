// pages/CreateClass/Cclass.js
Page({
  primary:function(){
    var value;
    try {
      value = wx.getStorageSync('iclassd');
    } catch (e) {

      // Do something when catch error
    }
    if (this.data.Cnames!=''){
    wx.request({
      url: 'https://www.joango.cn/wmp', //写入班级数据
      data: {
        x: this.data.Cnames,
        iclassd:value,
        actions:'go'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        wx.showModal({
          title: '创建成功',
          content: res.data,
          success: function (res) {
            if (res.confirm) {
              var pages = getCurrentPages()
              var num = pages.length
              wx.navigateBack({
                delta: num
              })

            } else if (res.cancel) {
              var pages = getCurrentPages()
              var num = pages.length
              wx.navigateBack({
                delta: num
              })
            }
          }
        })

      }
    });
  }
  else{
    wx.showToast({
      title: '请输入群名称',
      icon: 'success',
      image:'../image/defualt.png',
      duration: 2000
    })  
  }
   
  },
//焦点离开获取值
  bindBlur: function (e) {
    this.setData({
      Cnames: e.detail.value
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    Cnames: '',
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
  
  }
})