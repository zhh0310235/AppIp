// pages/Student/question/que/que.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    results:[],
    classid:'',
    titleId:'',
    complete:false,
    JsonQuestion:{},
    news:'',
    Scor:0,
  },

  /** var Jsons=JSON.stringify(JsonQuestion)
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.setData({
      classid: options.classid,
      titleId: options.titleId,
      news: options.new,
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
        actions: 'QuestionDetail',
        titleId: that.data.titleId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data.question)
        if ((typeof (res.data.question) == 'undefined')) {
          that.setData(
            {
              results: '',
              complete: false,
            });
        }
        else {
          that.setData(
            {
              results: res.data.question,
              complete: true,
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
  //单选变化
  radioChange:function(e){
    var that = this;
    var JsonQuestion = that.data.JsonQuestion;
    if (typeof (e.detail.value) == 'string'){
      JsonQuestion[e.currentTarget.dataset.number] = e.detail.value;
    
    } 
    else{
        var ans = e.detail.value.join("").replace("[^a-zA-Z]", "").split("").sort().join("")
        JsonQuestion[e.currentTarget.dataset.number] = e.detail.value.join("").replace("[^a-zA-Z]", "").split("").sort().join("");  
        console.log(that.data.results[e.currentTarget.dataset.number - 1].answergo.length); 
    }
   
  },
 
  /**
   * 弹窗
   */
  showDialogBtn: function () {
    var that = this; 
    var cor =0;
    var i=0;
    for (i = 0; i < that.data.results.length;i++){
      var index=i+1+'';
      if (that.data.results[i].answer == that.data.JsonQuestion[index]){
        var c = new Number(that.data.results[i].qScor)
        cor = cor +c ;
      }
      this.data.Scor = cor;
    }

    wx.showModal({
      title: '确认框',
      content: '确认提交答案?',
      success: function (res) {
        that.setData(
          {
            news: 'false',
          });
        if (res.confirm) {
          //var Jsons = JSON.stringify(that.data.JsonQuestion)
          wx.request({
            method: "POST",
            url: 'https://www.joango.cn/wmp', //请求班级数据 
            data: {
              actions: 'AnwerJson',
              Answer: JSON.stringify(that.data.JsonQuestion),
              OpenId: wx.getStorageSync('iclassd'),
              TitleId: that.data.titleId,
              Scor: that.data.Scor,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              wx.showModal({
                title: '测试结果',
                content: that.data.Scor+'分' ,
                showCancel:false,
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '../que/que?classid=' + that.data.classid + '&titleId=' + that.data.titleId + '&new=' + that.data.news,
                    })
                  }
                   
                }
              })
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

        } else if (res.cancel) {
          
        }
      }
    })
  }
 
})