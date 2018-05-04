// pages/join/join.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SerchNames:'',
    show:'none'
  },

  bindBlur: function (e) {
    this.setData({
      SerchNames: e.detail.value
    })
  },


  serch: function () {//查询群
    var that = this;
    //console.log(that.data.SerchNames);
    wx.request({
      url: 'https://www.joango.cn/wmp', //写入班级数据
      data: {
        SerchName: that.data.SerchNames,
        actions: 'serch'
      },
      success: function (res) {
        that.setData(
          {
            show: 'inline' 
          });
        var resu = JSON.parse(res.data.classs);
        if (resu[0].classs == 'fail') {
          wx.showToast({
            title: '没有找到群！',
            icon: 'success',
            image: '../image/defualt.png',
            duration: 3000
          });
          that.setData(
            {
              results: '' //jsonj解析为数组
            });
        }
        else {
          that.setData({ currentTab: 2 });
          that.setData(
            {
              results: JSON.parse(res.data.classs) //jsonj解析为数组
            });
        }
        
      },
    
    });

  },

  join: function (e) {
    var that = this;
    try {
      var value = wx.getStorageSync('iclassd');
      wx.request({
        url: 'https://www.joango.cn/wmp', //加入班级
        data: {
          iclassd: e.currentTarget.id,
          idben: value,
          actions: 'join'
        },
        success: function (res) {
          if (res.data == 'success') {
            wx.showToast({
              title: '加入成功！',
              icon: 'success',
              duration: 3000
            });
            that.setData({ currentTab: 0 });
            that.onShow();
          }
          else if (res.data == 'primary') {
            wx.showToast({
              title: '已经加入！',
              icon: 'success',
              image: '../image/defualt.png',
              duration: 4000
            });
          }
          else {
            wx.showToast({
              title: '加入失败！',
              icon: 'success',
              image: '../image/defualt.png',
              duration: 4000
            });

          }
        },
        fail: function (res) {
          console.log("失败了 ")
        }
      });
    }
    catch (e) { }
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (typeof (options.classid) != 'undefined') {
      wx.request({
        url: 'https://www.joango.cn/wmp', //写入班级数据
        data: {
          SerchName: options.classid,
          actions: 'serch'
        },
        success: function (res) {
          var resu = JSON.parse(res.data.classs);
          if (resu[0].classs == 'fail') {
            wx.showToast({
              title: '请输入班级号或名称！',
              icon: 'success',
              image: '../image/defualt.png',
              duration: 3000
            });
            that.setData(
              {
                results: '',
                show: 'inline'
              });
          }
          else {
            that.setData({ currentTab: 2 });
            that.setData(
              {
                results: JSON.parse(res.data.classs), //jsonj解析为数组
                show: 'inline'
              });
          }
        },
        fail: function (res) {
        }
      });
    }
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
  
  },
  defaults: function () {
    wx.switchTab({ url: '../main/main' })
  },
  //添加班级
  primary: function () {
    var that = this;
    var Cname = that.data.Cnames;
    try {
      var value = wx.getStorageSync('iclassd');
    } catch (e) { }
    if (Cname != '') {
      wx.request({
        url: 'https://www.joango.cn/wmp', //写入班级数据
        data: {
          x: Cname,
          iclassd: value,
          actions: 'go'
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
                that.setData({ currentTab: 0 });
                that.onShow();
                /*关闭页面并跳转到上一个页面
                var pages = getCurrentPages()
                var num = pages.length
                wx.navigateBack({
                  delta: num
                })*/

              } else if (res.cancel) {
                that.setData({ currentTab: 0 });
                that.onShow();
              }
            },
            fail: function (res) {
              wx.showToast({
                title: '创建失败！',
                icon: 'success',
                image: '../image/defualt.png',
                duration: 2000
              });
            }
          })

        }
      });
    }
    else {
      wx.showToast({
        title: '请输入群名称',
        icon: 'success',
        image: '../image/defualt.png',
        duration: 2000
      });
    }
  },
})