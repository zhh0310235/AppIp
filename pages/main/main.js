// pages/main/main.js
Page({

  loginid:function(){//动态获取 id函数
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求    
          wx.request({
            url: 'https://www.joango.cn/wmp',
            data: {
              actions: 'openId',
              code: res.code
            },
            success: function (res1) {
             return res1.data.iclassd;
              
            },
            fail: function (res) {
              wx.showToast({
                title: '登录失败！',
                icon: 'success',
                image: '../image/defualt.png',
                duration: 2000
              })
            }
          })
        } else {
          console.log('获取用户登录态失败1！' + res.errMsg)
        }
      }
    });
    
  },
  
  deleteclass: function (e) { 
      console.log(e.currentTarget.id),
      wx.navigateTo({ url: '/pages/main/deleteclass/delClass?idclass=' + e.currentTarget.id })
     
      
  },

  goCjuan:function(e){
    wx.navigateTo({
      url: 'Cjuan/Cjuan?classid=' + e.currentTarget.dataset.text + '&classname='+e.currentTarget.dataset.name,
    })
   },

  goStu: function (e) {
    wx.navigateTo({
      url: 'Stu/Stu?classid=' + e.currentTarget.dataset.text,
    })
  },
//我要开课
  creatclass: function () {
    wx.navigateTo({
      url: '../CreateClass/Cclass',
    })
  },
//加入班级
  joinclass: function () {
    wx.navigateTo({
      url: '../join/join',
    })
  },


  /**
   * 页面的初始数据
   */
  data: {
    idclass:'123',
    result:[],
    /** 
        * 页面配置 
        */
      
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    show:'none',
    shows:'none',
    logins:'none'
  }, 

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  } ,

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  onShow: function () {
    this.onData();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    var that = this;
    var app = getApp();
    var vs=wx.getStorageSync("iclassd");
    
    if(!vs){
      console.log('openid本地读取失败')
      vs = app.data.vs; 
      if(!vs){
        console.log('openid全局变量读取失败')
      }
    }
      
      
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

    try {
      if (vs) {
        //console.log('本地读取 id:'+vs);
        wx.request({

          method: "GET",
          url: 'https://www.joango.cn/wmp', //请求班级数据 
          data: {
            actions: 'go1',
            iclassd: vs
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            if (typeof (res.data.classs) == 'undefined') {
              that.setData(
                {
                  result: '' ,//jsonj解析为数组
                });
              if (res.data.select == 'true') {
                that.setData(
                  {
                    show: 'inline',
                    shows: 'none'
                  });
              }
              else if (res.data.select == 'false') {
                that.setData(
                  {
                    show: 'none',
                    shows: 'inline'
                  });
              }
              else {
                that.setData(
                  {
                    logins: 'block',
                  });

              } 
             
            }
            else {
              that.setData(
                {
                  result: JSON.parse(res.data.classs) //jsonj解析为数组
                });
              if (res.data.select=='true'){
                that.setData(
                  {
                    show:'inline',
                    shows:'none'
                  });
              }
              else if (res.data.select == 'false'){
                that.setData(
                  {
                    show: 'none',
                    shows: 'inline'
                  });
              }
              else {
                that.setData(
                  {
                    logins: 'block',
                  });
                
                } 
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '信息拉取失败！',
              icon: 'success',
              image: '../image/defualt.png',
              duration: 2000
            });
            console.log('本地读取 id失败');
          }
        });
      }
      else {
        console.log('本地读取 id失败，3秒后再次读取！');
        setTimeout(function () { 
          that.onShow();
        }, 3000);
        
        /*
        wx.request({
          method: "GET",
          url: 'https://www.joango.cn/wmp', //请求班级数据
          data: {
            actions: 'go1',
            iclassd: vs
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {

            if (typeof (res.data.classs) == 'undefined') {

              that.setData(
                {
                  result: '' //jsonj解析为数组
                });
            }
            else {
              that.setData(
                {
                  result: JSON.parse(res.data.classs) //jsonj解析为数组
                });
              if (res.data.select == 'true') {

                that.setData(
                  {
                    show: 'inline',
                    shows: 'none'
                  });
              }
              else {
                that.setData(
                  {
                    show: 'none',
                    shows: 'inline'
                  });
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
        */
        
      }
    } catch (e) {
      // Do something when catch error
    };
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow();
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
//手动登录
  userInfoHandler: function(res) {
    console.log(res.detail.rawData)
    var userInfo = JSON.parse(res.detail.rawData);
    wx.showModal({
      title: '登录提示',
      content: '您是老师吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.joango.cn/wmp',
            data: {
              actions: 'userInfo',
              nickName: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl,
              gender: userInfo.gender, //性别 0：未知、1：男、2：女
              province: userInfo.province,
              city: userInfo.city,
              country: userInfo.country,
              iclassd: wx.getStorageSync('iclassd'),
              profession: 'teacher'
            },
            success: function (res) { wx.reLaunch({ url: '/pages/main/main' }); },
            fail: function (res) { wx.reLaunch({ url: '/pages/main/main' }); }
          });
        } else if (res.cancel) {
          wx.request({
            url: 'https://www.joango.cn/wmp',
            data: {
              actions: 'userInfo',
              nickName: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl,
              gender: userInfo.gender, //性别 0：未知、1：男、2：女
              province: userInfo.province,
              city: userInfo.city,
              country: userInfo.country,
              iclassd: wx.getStorageSync('iclassd'),
              profession: 'student'
            },
            success: function (res) { wx.reLaunch({ url: '/pages/main/main' }); },
            fail: function (res) { wx.reLaunch({ url: '/pages/main/main' }); }
          });
        }
      }
    })
    
    
  },




  
})





