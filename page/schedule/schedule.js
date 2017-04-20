// page/schedule/schedule.js

var util = require('../../utils/util');

Page({

  data: {

    // 时间步长
    step: 4,

    // 接口的开始和结束时间
    time: {
      start: '',
      end: ''
    },

    // 是否有更多数据
    hasMore: true,

    // 列表数据
    list: []
  },

  onLoad: function (options) {
    var that = this;
    var time = new Date();

    this.setData({
      time: {
        start: util.formatDate(time),
        end: util.formatDate(time.setDate(time.getDate() + that.data.step))
      }
    });

    this.getListData(this.data.time);

  },

  onReady: function () {
    // 页面渲染完成
  },

  onShow: function () {
    // 页面显示
  },

  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭
  },

  // 赛程列表请求
  getListData: function (time) {
    var that = this;

    this.setData({
      hasMore: false,
    });

    wx.request({
      url: 'https://sportswebapi.qq.com/kbs/list',
      data: {
        columnId: 100000,
        startTime: time.start,
        endTime: time.end
      },
      success: function (res) {
        var result = res.data.data;
        var list = [];

        if (util.isEmptyObject(result)) {
          return false;
        }

        for (var item in result) {
          for (var i = 0, len = result[item].length; i < len; i++) {
            result[item][i].startTime = result[item][i].startTime.substr(11, 5);
          }
          list.push({
            day: item,
            match: result[item]
          });
        }

        that.setData({
          list: that.data.list.concat(list),
          hasMore: true,
        });
      }
    });
  },

  loadMore: function () {
    console.log("loadMore...");
    var that = this;

    if (!this.data.hasMore) {
      return false;
    }

    var end = new Date(this.data.time.end);

    this.setData({
      time: {
        start: util.formatDate(end.setDate(end.getDate() + 1)),
        end: util.formatDate(end.setDate(end.getDate() + that.data.step))
      }
    });

    this.getListData(this.data.time);
  },

  loadUp: function () {
    console.log("loadUp...");
    var that = this;

    if (!this.data.hasMore) {
      return false;
    }

    var start = new Date(this.data.time.start);
    console.log(util.formatDate(start.setDate(start.getDate() - that.data.step)), util.formatDate(start.setDate(start.getDate() - 1)))

    this.setData({
      time: {
        start: util.formatDate(start.setDate(start.getDate() - that.data.step)),
        end: util.formatDate(start.setDate(start.getDate() - 1))
      }
    });

    this.getListData(this.data.time);
  },


});