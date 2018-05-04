// pages/main/main.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['5分钟', '10分钟', '15分钟', '20分钟', '30分钟', '45分钟', '1小时', '2小时', '一天', '一个星期', '一个月', '一年', '永久'],
    index: 0,
    result: [],
    resultY: [],
    showModal: false,
    year:'点击选择做题时限',
    show:'none',
    classid:'',
    titleId:'',
    Time:0,
    complete:true,
    Nocomple:true,
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
    this.setData({ classid: options.classid});
  },

  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  // 选择做题时限
  showss: function (e) {
    this.setData({ 
      show:'inline',
      year: this.data.array[0],
      Time: 0,
    });
    
  },
 // 选择发布班级
  bindChangeper: function (e) {
    const val = e.detail.value
    console.log(val[0],)
    this.setData({
      year: this.data.array[val[0]],
      Time: val[0],
    })
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
            actions: 'questiongo',
            iclassd: wx.getStorageSync('iclassd'),
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            if ((typeof (res.data.NO) == 'undefined') & (typeof (res.data.YES) == 'undefined')){
              that.setData(
                {
                  result: '',
                  resultY: '',
                  complete: false,
                  Nocomple:false
                });
            }
            else if ((typeof (res.data.NO) == 'undefined') & (typeof (res.data.YES) != 'undefined')){
              that.setData(
                {
                  result: '',
                  resultY: JSON.parse(res.data.YES),
                  complete: true,
                  Nocomple: false
                });
            }
            else if ((typeof (res.data.NO) != 'undefined') & (typeof (res.data.YES) == 'undefined')) {
              that.setData(
                {
                  result: JSON.parse(res.data.NO),
                  resultY: '',
                  complete: false,
                  Nocomple: true
                });
            }
            else{
              that.setData(
                {
                  result: JSON.parse(res.data.NO),
                  resultY: JSON.parse(res.data.YES)
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
    /*
    wx.showToast({
      title: '测试 ',
      icon: 'success',
      duration: 2000
    });
    */
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
  //发布试卷showTitle
  showDialogBtn: function (e) {
    this.setData({
      showModal: true,
      titleId: e.currentTarget.id
    })
  },
  //查看试卷
  goCjuan: function (e) {
    wx.showToast({
      title: '开发中。。。',
      icon: 'success',
      duration: 1000
    })
  },

  
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    var that=this;
    this.hideModal();
    wx.showToast({
      title: '发布失败',
      icon: 'fail',
      duration: 1000
    })
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var that = this;
    this.hideModal();
    wx.request({
      method: "GET",
      url: 'https://www.joango.cn/wmp', //请求班级数据 
      data: {
        actions: 'titlePublish',
        titleId: that.data.titleId,
        classid: that.data.classid,
        Time: that.data.Time,
        Openid: wx.getStorageSync('iclassd'),
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1000
        });
        that.onShow();
      },
      fail: function (res) {
        wx.showToast({
          title: '发布失败',
          icon: 'success',
          duration: 1000
        })
      }
    });
    
  },






})





