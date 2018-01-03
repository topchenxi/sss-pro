/*
  author  yonghuang
 */
// import { request } from '../../common/base'
import '../../common/base.js'
import {
  setCache,
  getCache,
  imgPath,
  scrollGetData,
  getParam,
  getLastPage
} from '../../common/utils'
import buyerApi from '../../api/buyer.js'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.reqOptions = {
      pageSize: 20,
      pageNumber: 1,
      keyword: '',
      _time: this._time
    }
    this.currentUser = getCache({
      key: 'currentUser',
      type: 'sessionStorage',
      dataType: 'json'
    })
    this.loginInfo = this.currentUser.loginInfo
    this.cacheData = {
      result: []
    }
    this.render()
  }
  getList(type, isScroll) {
    const that = this
    $.showPreloader()
    request({
      url: buyerApi.select,
      data: that.reqOptions,
      cache: false,
      callback: (data) => {
        if (data.success === '1') {
          setTimeout(() => {
            $.hidePreloader();
          }, 100);
          that.listData = data.page
          if (!isScroll) {
            that.cacheData = {
              result: []
            }
          }
          that.listRender(type, isScroll)
        } else {
          $.toast(data.msg)
        }
      }
    })
  }
  render() {
    const tpl = 'buyerList/index.html'
    this.source = getParam('source')
    const renderData = {
      title: '采购商',
      // backLink: this.source ? `/${this.source}.html` : '/orderPublish.html',
      loginInfo: this.loginInfo
    }
    nunjucks.render(tpl, renderData).then((buyerListHtml) => {
      const $page = $('#buyerList')
      $page.html(buyerListHtml)
      this.getList()
      this.baseBindEvents()
    })
  }
  listRender(type, isScroll) {
    const that = this
    const listTpl = 'buyerList/listTpl.html'
    // const levelImg = {
    //   0: '',
    //   1: './images/pages/buyerList/tongpaiRz.png',
    //   2: './images/pages/buyerList/yinpaiRz.png',
    //   3: './images/pages/buyerList/jinpaiRz.png',
    //   4: './images/pages/buyerList/bojinRz.png',
    //   5: './images/pages/buyerList/zhuanshiRz.png'
    // }
    if (this.listData.result) {
      this.listData.result.forEach((value) => {
        // value.levelImg = levelImg[value.myLevel]
        value.imgPath = imgPath
      })
    }
    that.loadingMore = that.listData.hasNextPage;
    that.cacheData.result = that.cacheData.result.concat(that.listData.result)
    nunjucks.render(listTpl, that.cacheData).then((listHtml) => {
      const $listContDom = $('.J_list_dom')
      if (type && type === 'append') {
        $listContDom.append(listHtml)
      } else {
        $listContDom.html(listHtml)
      }
      this.listEventBind();
    })
  }
  baseBindEvents() {
    const $search = $('input[type="search"]')
    const $backBtn = $('.J_back')
    this.hasSearch = false
    $search.on('keydown', (e) => {
      const val = $(e.currentTarget).val()
      if (e.keyCode === 13 && val) {
        this.reqOptions.keyword = val
        this.getList()
        this.hasSearch = true
      }
    })
    $search.on('blur', (e) => {
      const val = $(e.currentTarget).val()
      if (val && !this.hasSearch) {
        this.reqOptions.keyword = val
        this.getList()
      }
      this.hasSearch = false
    })
    $backBtn.on('click', (e) => {
      location.href = getLastPage()
      return false
    })
  }
  listEventBind() {
    const $singBuyerDom = $('.J_single_buyer')
    $singBuyerDom.unbind('click').on('click', (e) => {
      const index = $(e.currentTarget).attr('data-index')
      const buyerInfo = this.cacheData.result[index]
      setCache({
        type: 'sessionStorage',
        key: 'buyerInfo',
        dataType: 'json',
        value: buyerInfo
      })
      sessionStorage.removeItem('defaultAddr')
      sessionStorage.removeItem('addressInfo')
      const lastPage = getLastPage()
      if (lastPage) {
        location.href = lastPage
      }
      // if (sourcePage) {
      //   sessionStorage.removeItem('sourcePage')
      //   location.href = sourcePage
      // } else if (that.source) {
      //   location.href = `${that.source}.html`
      // }
    })
    this.scrollInit()
  }
  scrollInit() { // 无限滚动
    const that = this;
    const scrollOption = {
      reqOptions: that.reqOptions,
      scrollDom: $('.J_scroll_dom'), // 因为是绝对定位
      listDom: $('.J_list_dom'), // 所以需要传 真正能够计算高度的div进去
      loadingMore: that.loadingMore //
    };
    scrollGetData(scrollOption, () => {
      that.reqOptions = $.extend(that.reqOptions, scrollOption.reqOptions);
      that.getList('append', true);
    });
  }
}
export default new Page()
