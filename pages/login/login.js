// pages/login/login.js
Page({
  /**
 * 页面的初始数据
 */
  data: {
    phone:'',
    pass1:'',
    pass2: '',
  },

  bindBlur1: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  bindBlur2: function (e) {
    this.setData({
      pass1: e.detail.value
    })
  },

  bindBlur3: function (e) {
    this.setData({
      pass2: e.detail.value
    })
  },

  primary: function () {
     var that=this;
     var phone,pass1,pass2,valueid;
     try {
       valueid = wx.getStorageSync('iclassd');
     } catch (e) { }
     phone=that.data.phone;
     pass1=that.data.pass1;
     pass2=that.data.pass2;
     if (phone != '' && (pass1 == pass2) && (pass1 !='') && (pass2 !='')){
       wx.request({
         url: 'https://www.joango.cn/wmp', //写入班级数据
         data: {
           pho: phone,
           pas:pass1,
           ids: valueid,
           actions: 'register'
         },
         success: function (res) {
           wx.showToast({
             title: '绑定成功',
             icon: 'success',
             duration: 2000
           });
           wx.switchTab({
             url: '../main/main',
             success:function(ress){
               //console.log('success');
             },
             fail: function (ress) {
               //console.log('fail');
             }
           });
         },
         fail: function (res) {
           wx.showToast({
             title: '绑定失败',
             icon: 'success',
             image: '../image/defualt.png',
             duration: 2000
           });
         }
       });
     }
     else if (phone==''){
       wx.showToast({
         title: '手机空！',
         icon: 'success',
         image: '../image/defualt.png',
         duration: 2000
       });
     }
     else if (pass1 == '' || pass2 == '') {
       wx.showToast({
         title: '密码空！',
         icon: 'success',
         image: '../image/defualt.png',
         duration: 2000
       });
     } else if (pass1 == '' || pass2 == '') {
       wx.showToast({
         title: '密码空！',
         icon: 'success',
         image: '../image/defualt.png',
         duration: 2000
       });
     }
     else if (pass1 !=pass2) {
       wx.showToast({
         title: '密码不同！',
         icon: 'success',
         image: '../image/defualt.png',
         duration: 2000
       });
     }
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