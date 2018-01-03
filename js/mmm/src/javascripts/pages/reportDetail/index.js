/*
  author  yonghuang  验布报告
 */
import '../../common/base.js'
import { getParam, getCache, getLastPage, imgPath } from '../../common/utils'
import reposityApi from '../../api/reposity'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.clothLoneId = getParam('clothLoneId')
    this.getMoneyDetail()
  }
  getMoneyDetail() {
    const that = this
    request({
      url: reposityApi.getCheckClothReport,
      data: {
        param: JSON.stringify({
          clothLoneId: that.clothLoneId,
          _time: that._time
        })
      },
      callback(data) {
        $.hidePreloader()
        if (data.success == 1) {
          that.renderDetail(data)
        } else {
          $.alert(data.msg)
        }
      }
    })
  }
  renderDetail(renderData) {
    const reportDetailtpl = 'reportDetail/index.html'
    switch (Number(renderData.rank)) {
      case 1:
        renderData.rankStr = 'A'
        break;
      case 2:
        renderData.rankStr = 'B'
        break;
      case 3:
        renderData.rankStr = 'C'
        break;
      case 4:
        renderData.rankStr = 'D'
        break;
    }
    renderData.flawMarkBoList && renderData.flawMarkBoList.map((item, index) => {
      item.toatalCount = Number(item.score1) * 1 + Number(item.score2) * 2 + Number(item.score3) * 3 + Number(item.score4) * 4
    })
    renderData.imgPath = imgPath
    this.renderData = renderData
    nunjucks.render(reportDetailtpl, renderData).then((reportDetailHtml) => {
      $('.J_content').html(reportDetailHtml)
      this.bindEvent()
    })
  }
  bindEvent() {
    const backBtn = $('.J_back')
    const lastPage = getLastPage();
    const that = this;
    backBtn.on('click', () => {
      if (lastPage) {
        location.href = lastPage
        return false
      } else {
        history.go(-1)
        return false
      }
    })
    $(document).on('click', '.J_pop', (e) => {
      const index = $(e.currentTarget).data('index')
      console.log(index);
      let photos = that.renderData.flawMarkBoList[index - 1].imgUrls;
      if (!photos.length) { return false }
      photos = photos.map((url) => imgPath + url)
      const myPhotoBrowserPopup = $.photoBrowser({
        photos,
        type: 'popup'
      });
      myPhotoBrowserPopup.open();
    });
  }
  // formatCurrency(number) {
  //   let val = Number(number)
  //   let backVal = parseFloat(val, 10).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  //   if (String(backVal) == '-0.00') {
  //     backVal = '0.00'
  //   }
  //   return backVal
  // }
  // UnformatCurrency(number) {
  //   const str = number.split(',')
  //   let realVal = ''
  //   str.map((key) => {
  //     realVal = realVal + key
  //   })
  //   return Number(realVal)
  // }
}
export default new Page()
