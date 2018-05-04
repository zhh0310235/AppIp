// pages/main/Cjuan/Sign/Sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['点击选择', '1分钟', '2分钟', '3分钟', '4分钟', '5分钟', '6分钟', '7分钟', '8分钟', '9分钟', '10分钟', '11分钟', '12分钟', '13分钟', '14分钟', '15分钟', '16分钟', '17分钟', '18分钟', '19分钟', '20分钟', '21分钟', '22分钟', '23分钟', '24分钟', '25分钟', '26分钟', '27分钟', '28分钟', '29分钟', '30分钟'],
    local: ['点击选择', '10米', '20米', '40米', '80米', '200米', '500米', '1公里', '2公里', '5公里', '10公里'],
    index: 0,
    index1: 0,
    ids:'签到码生成中。。。',
    imgsrc:'',
    showModal: false,
    second: 120,
    SignTip:'',
    classid:'nulls',
    localtion:'456'
  },
//时间选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    if (e.detail.value > 0 || e.detail.value<31){
      this.setData({
        second: e.detail.value*60
      })
    } 
    else {
      this.setData({second: 120})}
    
      this.setData({
      index: e.detail.value
    })
  },

  //位置误差选择
  bindLocalChange: function (e) {
    console.log('Local发送选择改变，携带值为', e.detail.value);
    this.setData({
      index1: e.detail.value
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
    var that = this;
    //发起生成签到码
    wx.request({
      url: 'https://www.joango.cn/wmp',
      data: {
        actions: 'Sign',
        SignId: this.data.classid,
        SignClassify: 'Sign',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData(
          {
            ids: res.data.id,//jsonj解析为数组
            imgsrc: res.data.src //jsonj解析为数组
          });

      },
      fail: function (res) {
        wx.showToast({
          title: '签到失败！',
          icon: 'success',
          image: '../image/defualt.png',
          duration: 2000
        })
      }
    })
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
    console.log('页面返回');
    var that = this;
    //发起生成签到码
    wx.request({
      url: 'https://www.joango.cn/wmp',
      data: {
        actions: 'Signdelete',
        SignId: this.data.classid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
      },
      fail: function (res) {
      }
    })
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
  //分享签到码
  onShareAppMessage: function (res) {
    var that = this;
    //wx.navigateTo({url: 'share/share?code=' + that.data.ids + '&classid=' + that.data.classid,})
    
    if (res.from === 'button') {
      return {
        title: "签到码",
        imageUrl: this.data.imgsrc,
        path: 'pages/main/Cjuan/Sign/share/share?code=' + that.data.ids + '&classid=' + that.data.classid,
        success: function (res) {
         
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
  },
  
  bindBlur: function (e) {
    this.setData({
      SignTip:e.detail.value
    })
  }, 
  /**
     * 弹窗
     */
    showDialogBtn: function() {
      if (this.data.SignTip==='') {
        wx.showModal({
          title: '提示',
          content: '请填写签到标题',
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        });
        return;
      }
      if (this.data.index==0){
        wx.showModal({
          title: '提示',
          content: '请选择签到时间限制',
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        });
        return;
      }
      if (this.data.index1 == 0) {
        wx.showModal({
          title: '提示',
          content: '请选择签到范围限制',
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        });
        return; 
      }
     

      countdown(this);
    this.setData({
      showModal: true,
    });
    //开始签到
    wx.request({
      url: 'https://www.joango.cn/wmp',
      data: {
        actions: 'Signgo',
        tip: this.data.SignTip,
        Time: this.data.index,
        Local: this.data.index1, 
        qdh: this.data.ids,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        
       

      },
      fail: function (res) {
        wx.showToast({
          title: '签到失败！',
          icon: 'success',
          image: '../image/defualt.png',
          duration: 2000
        })
      }
    });
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
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  }
})
//倒计时函数
function countdown(that) {
  var second = that.data.second
  if (second == 0) {
    that.setData({
      second: "签到结束"
    });
    return;
  }
  var time = setTimeout(function () {
    if(that.data.second==0){
      that.setData({
        second: "签到结束"
      });
    }
    else{
      that.setData({
        second: second - 1
      });
      countdown(that);
    }
  }
    , 1000)
}
