var context = null;
Page({
  data: {
    save: false,
    src: '',
    hat: {
      url: '/pages/img/1.png',//Your Background-image
      w: 256,
      h: 256,
      x: 0,
      y: 0,
      b: 1,
    }
  },
  onLoad: function() {

  },

  upload() {
    var that = this;
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success(res) {
        console.log(res)
        that.setData({
          src: res.tempFilePaths[0]
        })
        that.drawAvatar()
      }
    })
  },


  drawAvatar() {
    var that = this;
    var p = that.data;
    context = wx.createCanvasContext('myAvatar', this);
    context.drawImage(p.src, 33, 33, 190, 190);
    context.draw(true)
    context.save();
    context.translate(p.hat.x, p.hat.y)
    context.scale(p.hat.b, p.hat.b)
    context.rotate(p.hat.rotate * Math.PI / 180)
    context.drawImage(p.hat.url, 0, 0, p.hat.w, p.hat.h)
    context.draw(true)
    this.setData({
      save: true
    })
  },

  saveImg() {
    wx.canvasToTempFilePath({
      canvasId: 'myAvatar',
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: 'Successfully Saved'
            })
          },
          fail(res) {
            wx.showToast({
              title: 'Cancelling...',
              icon: 'none'
            })
          }
        })
      }
    })
  }


})