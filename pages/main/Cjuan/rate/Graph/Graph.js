// pages/main/Cjuan/Online/Onlion.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    chartTitle: '签到统计(点击查看)',
    isMainChartDisplay: true,
    num:[],
    numbers: [],
    count: [],//不是总人数，而是缺旷人数
    classid:'',
    qdh:'',
    max:0,
    an: 0,
    chi: 0,
    que: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.data.num[0] = parseInt(options.num);
    this.data.numbers[0] = parseInt(options.number);
    this.data.count[0] = parseInt(options.count) - (parseInt(options.number) + parseInt(options.num));
    console.log(that.data.numbers)
    this.setData({
      classid: options.classid,
      qdh:options.qdh,
      max: that.data.count[0] + that.data.num[0] + that.data.numbers[0] + (5 - ((that.data.count[0] + that.data.num[0] + that.data.numbers[0]) % 5)),
      an: parseInt(options.number),
      chi: parseInt(options.num),
      que: parseInt(options.count) - (parseInt(options.number) + parseInt(options.num))
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
    var wxCharts = require('../../../../../utils/wxcharts.js');
    var app = getApp();
    var columnChart = null;
    var chartData = {
      main: {
        title: '人数统计',
        categories1: ['按时'],
        categories2: ['迟到'],
        categories3: ['缺旷'],
      }
    };

    var windowWidth = 300;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new wxCharts({
      canvasId: 'columnCanvas1',
      type: 'column',
      animation: true,
      dataLabel :true,
      legend :false,
      categories: chartData.main.categories1,
      series: [{
        name: '按时上课',
        color: '#ADFF2F',
        legend :false,
        data: that.data.numbers,
        format: function (val, name) {
          return val.toFixed(0) + '人';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '人';
        },
        min: 0,
        max: that.data.max,
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 20,
        },
        legendTextColor: '#000000'
      },
      width: windowWidth/3.2,
      height: 200,
     
    });

    columnChart = new wxCharts({
      canvasId: 'columnCanvas2',
      type: 'column',
      animation: true,
      dataLabel: true,
      legend: false,
      categories: chartData.main.categories2,
      series: [{
        name: '迟到人数',
        color: '#188df0',
        legend: false,
        data: that.data.num,
        format: function (val, name) {
          return val.toFixed(0) + '人';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '人';
        },
        disabled: true,
        min: 0,
        max: that.data.max,
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 20,
        },
        legendTextColor: '#000000'
      },
      width: windowWidth / 3.2,
      height: 200,

    });

    columnChart = new wxCharts({
      canvasId: 'columnCanvas3',
      type: 'column',
      animation: true,
      dataLabel: true,
      legend: false,
      categories: chartData.main.categories3,
      series: [{
        name: '缺旷人数',
        color: '#EE4000',
        legend: false,
        data: that.data.count,
        format: function (val, name) {
          return val.toFixed(0) + '人';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '人';
        },
        disabled:true,
        min: 0,
        max: that.data.max,
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 20,
        },
        legendTextColor: '#000000'
      },
      width: windowWidth /3.2,
      height: 200,

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

  touch1: function () {
    var that=this;
    wx.navigateTo({ url: '../touchAn/touchAn?qdh=' + that.data.qdh + '&classid=' + that.data.classid})
  },
  
  touch2: function () {
    var that = this;
    wx.navigateTo({ url: '../touchChi/touchChi?qdh=' + that.data.qdh + '&classid=' + that.data.classid })
  },
  
  touch3: function () {
    var that = this;
    wx.navigateTo({ url: '../touchQue/touchQue?qdh=' + that.data.qdh + '&classid=' + that.data.classid })
  }
})