// pages/main/Cjuan/Sign/Sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['点击选择', '1分钟', '2分钟', '3分钟', '4分钟', '5分钟', '6分钟', '7分钟', '8分钟', '9分钟', '10分钟', '11分钟', '12分钟', '13分钟', '14分钟', '15分钟', '16分钟', '17分钟', '18分钟', '19分钟', '20分钟', '21分钟', '22分钟', '23分钟', '24分钟', '25分钟', '26分钟', '27分钟', '28分钟', '29分钟', '30分钟'],
    index: 0,
    ids: '签到码生成中。。。',
    imgsrc: '',
    showModal: false,
    second: 30,
    qdh:'签到码生成中。。。',
    result:[],
    Tip:'点击选择.....',
    classid: 'nulls',
    dis:'none'
  },

  bindPickerChange: function (e) {
    if (e.detail.value > 0 || e.detail.value < 31) {
      this.setData({
        second: e.detail.value * 60
      })
    }
    else { this.setData({ second: 120 }) }
    this.setData({
      index: e.detail.value
    })
  },
  
  /**
   * 下拉
   */
  showDrop: function(options) {
     this.setData({
     dis:'block'
     })
  },

  Drops: function (e) {
    //console.log(e.currentTarget.dataset.value); 
      this.setData({
        dis: "none",
        Tip: e.currentTarget.id,
        qdh: e.currentTarget.dataset.value,
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
        actions: 'SignTip',
        SignId: this.data.classid,
        SignClassify: 'Signgo',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (typeof (res.data.Tip) =='undefined')
        {
          that.setData(
            {
              ids: res.data.id,
              imgsrc: res.data.src,
              result: ''
            });
        }
        else{
          that.setData(
            {
              ids: res.data.id,
              imgsrc: res.data.src,
              result: JSON.parse(res.data.Tip)
            });
        }
      
        

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
   * 生命周期函数--监听页面显示点击选择.....
   */
  onShow: function () {
    var that=this;
  
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
  onShareAppMessage: function (res) {
    var that = this;
    //wx.navigateTo({url: '../Sign/share/share?code=' + that.data.ids + '&classid=' + that.data.classid,})

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
  /**
     * 弹窗
     */
  showDialogBtn: function () {
    if (this.data.Tip ==='点击选择.....') {
      console.log(this.data.Tip)
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
    if (this.data.index == 0) {
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
   
    var that=this;
    countdown(this);
    this.setData({
      showModal: true,
    });
    //开始签到
    wx.request({
      url: 'https://www.joango.cn/wmp',
      data: {
        actions: 'Signgo',
        tip: this.data.qdh,
        Time: this.data.index+1,
        Local: 2,
        qdh: this.data.ids,
        Classify:'Signgo'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(that.data.qdh)
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
    if (that.data.second == 0) {
      that.setData({
        second: "签到结束"
      });
    }
    else {
      that.setData({
        second: second - 1
      });
      countdown(that);
    }
  }
    , 1000)
}
