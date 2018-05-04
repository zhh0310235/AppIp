// pages/main/Cjuan/Mstu/Mstu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classid:'',
    result: [],
    name:'',
    img:''
    
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
        actions: 'stu',
        iclassd: that.data.classid,
      },
      header: {
        'content-type': 'application/json' 
      },
      success: function (res) {
        that.setData(
          { 
            result: JSON.parse(res.data.student)
          });
          for(var i=0;i<that.data.result.length;i++){
            if (that.data.result[i].ids == wx.getStorageSync('iclassd')){
              that.setData(
                {
                  name: that.data.result[i].nnichen,
                  img: that.data.result[i].touImage,
                 // result: that.data.result.splice(i,0)
                });
                break;
            }
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
  //查看学生信息
  gostudent: function (res) {
    console.log(res.currentTarget.dataset.text);
  }
})