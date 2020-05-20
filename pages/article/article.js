// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ArticleData: [],
    ArticleContent : ""
  },

  getArticleById(id){
    let that = this
    wx.request({
      url: 'https://bzzb.top/laravel_blog/wx/article?id='+id,
      success(res) {
        
        var content = res.data[0].content;
        content = content.replace(/<img/gi, '<img style="max-width:100%;height:auto;" ');
        content = content.replace(/(<\/?code.*?>)/g, '');
        content = content.replace(/(<\/?br.*?>)/g, '\n');
        that.setData({
          ArticleData: res.data[0],
          ArticleContent: content
        })
        
        
      }
    })
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleById(options.id)
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

  }
})