// pages/message/message.js
const db = wx.cloud.database();
const table = db.collection('message');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input_v: ""
  },
  bindinput: function(e) {
    this.setData({
      input_v: e.detail.value
    })
  },
  sendMessage: function() {
    var that = this
    var msg = this.data.input_v
    if (msg == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入内容!',
      })
      return
    } else {
      table.add({
        data: {
          content: msg,
          time:this.formatDateTime(new Date())
        },
        success: function() {
          wx.showToast({
            title: '留言成功',
          })
          that.setData({
            input_v: ""
          })
          that.getMessage()
        }
      })
    }
  },
  formatDateTime: function(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
  getMessage:function(){
    table.orderBy('time', 'desc').get().then(res => {
      this.setData({
        msgData: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

   this.getMessage()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})