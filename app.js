//app.js
App({
  //全局变量
  data: {
    vs:''
  } , 

  onLaunch: function () {
    this.getId();//检查登录状态
  },
  
  //检查登录状态
  getId:function (){
    var that = this;
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
                    try {
                      getApp().data.vs=res1.data.iclassd,
                      wx.setStorageSync('iclassd', res1.data.iclassd)
                    } catch (e) {
                    }
                    if (res1.data.Result == 'first') {
                      var that = this;
                      wx.getSetting({
                        success(res) {
                          if (!res.authSetting['scope.userInfo']) {
                            wx.authorize({
                              scope: 'scope.userInfo',
                              success() {
                                wx.getUserInfo({
                                  withCredentials: false,
                                  success: function (res) {
                                    var userInfo = res.userInfo
                                    //console.log(userInfo),
                                    //发起网络请求    
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
                                        profession: ''
                                      },
                                      success: function (res) { wx.navigateTo({ url: '/pages/select/select' });},
                                      fail: function (res) { wx.navigateTo({ url: '/pages/select/select' }); }
                                    });
                                  }
                                })
                              },
                              fail() {
                               wx.reLaunch({ url: 'main'})
                              },
                            })
                          }
                        },
                        fail() {
                         wx.reLaunch({ url: 'main'})
                        },
                      });
                      
                    }
                  },
                  fail: function (res) {
                    wx.navigateTo({ url: '/pages/select/select' });
                  }
                });
              } else {
                console.log('获取用户登录态失败1！' + res.errMsg)

              }
            }
          });
        }
  
})





