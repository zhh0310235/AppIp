// pages/Student/Sign/Sign.js
Page({

  /**
   * 页面的初始数据 bindinput="bindBlur"
   *  
   */
  data: {
    tip:'签到成功！',
    buttonDisabled: false,
    modalHidden: true,
    show: false,
    classid:'',
    qdh:'',
  },


  bindBlur: function (e) {
    this.setData({
      qdh: e.detail.value
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
  
  defaults: function () {
    wx.switchTab({ url: '../../main/main'})
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
//扫码
  iscode: function () {
    var that=this;
    wx.scanCode({
      //onlyFromCamera: true,
      success: (res) => {
        that.setData(
          {
            qdh:res.result,
          });
        //发起签到
        wx.request({
          url: 'https://www.joango.cn/wmp',
          data: {
            actions: 'StudentSign',
            qdh: this.data.qdh,
            SignClassify: 'iscode',
            ids: wx.getStorageSync('iclassd'),
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData(
              {
                //显示弹窗
                modalHidden: !that.data.modalHidden,
                tip: res.data,
              });

          },
          fail: function (res) {
            wx.showToast({
              title: '签到失败lea！',
              icon: 'success',
              image: '../image/defualt.png',
              duration: 2000
            });
          }
        })
        
      }
      
    });
    
   
  },
  //扫码
  ismunber: function () {
    var that=this;
    //发起签到
    wx.request({
      url: 'https://www.joango.cn/wmp',
      data: {
        actions: 'StudentSign',
        qdh:this.data.qdh,
        SignClassify: 'number',
        ids: wx.getStorageSync('iclassd'),
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData(
          {
            //显示弹窗
            modalHidden: !that.data.modalHidden,
            tip: res.data, 
          });

      },
      fail: function (res) {
        wx.showToast({
          title: '签到失败！',
          icon: 'success',
          image: '../image/defualt.png',
          duration: 2000
        });
      }
    })
   
    
  },

  modalBindaconfirm: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      show: !this.data.show,
      tip: '签到成功！',
      buttonDisabled: !this.data.buttonDisabled
    })
  },
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      tip: '签到失败！'
    })
  }


})