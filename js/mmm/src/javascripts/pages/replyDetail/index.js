import '../../common/base.js'
import { getCache, getLastPage, getParam, setCache, imgPath } from '../../common/utils'
import OrderApi from '../../api/order'
import AccountApi from '../../api/account'
 class Page {
  constructor() {
    let that = this
    this._time = new Date().getTime()
    this.index = getParam('index')
    this.getDetail()
  }
  getDetail(){
    const that = this
    const orderDetail = getCache({
      key: 'orderDetail',
      type: 'sessionStorage',
      dataType: 'json'
    })
    that.replyList = orderDetail.obj.replyList
    that.replyList && that.replyList.map((item, index) => {
      if(item.colorUrl) {
        item.colorUrl = item.colorUrl.split(',')
        item.imgPath = imgPath
      }
      if(item.color) {
        item.color = item.color.split(',')
      }
    })

    console.log(that.replyList)
    nunjucks.render('replyDetail/index.html', that.replyList[that.index-1]).then((renderHtml) => {
      $('.J_content').html(renderHtml)
      that.btnEvent()
    })
  }
  btnEvent() {
    const that = this
    const backBtn = $('.J_back')
    backBtn.on('click', () => {
      history.go(-1)
    })
    $(document).on('click', '.pb-popup', (e) => {
      console.log(that.replyList[that.index-1])
      console.log(that.replyList[that.index-1].colorUrl)
      let photos = that.replyList[that.index-1].colorUrl || []
      if (!photos.length) { photos = ['/upload/util/default_buy.jpg'] }
      photos = photos.map((url) => imgPath + url)
      const myPhotoBrowserPopup = $.photoBrowser({
        photos,
        type: 'popup'
      });
      myPhotoBrowserPopup.open();
    });
  }
}

export default new Page()
