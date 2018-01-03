/*
  * author  yonghuang
  * 供应商列表
 */
// import { request } from '../../common/base' 
import '../../common/base.js'
import {
  setCache,
  getCache,
  scrollGetData,
  getParam,
  getLastPage,
  setLastPage
} from '../../common/utils'
import shopApi from '../../api/shop.js'
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
    this.source = getParam('source')
    this.render()
  }
  getList(type) {
    $.showPreloader()
    request({
      url: shopApi.list,
      data: JSON.stringify(this.reqOptions),
      contentType: 'application/json',
      cache: false,
      method:'post',
      callback: (data) => {
        $.hidePreloader();
        if (data.success == '1') {
          this.listData = data.page
          if (!type && !this.listData.result.length) {
            this.listData.noneData = true
          }
          this.listRender(type)
        } else {
          $.toast(data.msg)
        }
      }
    })
  }
  render() {
    const tpl = 'sellerList/index.html'
    this.source = getParam('source')
    const renderData = {
      title: '供应商',
      loginInfo: this.loginInfo
    }
    nunjucks.render(tpl, renderData).then((sellerListHtml) => {
      const $page = $('#sellerList')
      $page.html(sellerListHtml)
      this.getList()
      this.baseBindEvents()
    })
  }
  listRender(type) {
    const that = this
    const listTpl = 'sellerList/listTpl.html'
    that.loadingMore = this.listData.hasNextPage;
    nunjucks.render(listTpl, this.listData).then((listHtml) => {
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
    const $addBtn = $('.J_add')
    this.hasSearch = false
    $search.on('keydown', (e) => {
      const val = $(e.currentTarget).val()
      if (e.keyCode === 13 && val) {
        this.reqOptions.keyword = val
        this.reqOptions.pageNumber = 1
        this.getList()
        this.hasSearch = true
      }
    })
    $search.on('blur', (e) => {
      const val = $(e.currentTarget).val()
      if (val && !this.hasSearch) {
        this.reqOptions.keyword = val
        this.reqOptions.pageNumber = 1
        this.getList()
      }
      this.hasSearch = false
    })
    $backBtn.on('click', (e) => {
      location.href = getLastPage()
      // history.go(-1)
      return false
    })
    $addBtn.on('click', () => {
      sessionStorage.removeItem('sellerAccounts')
      sessionStorage.removeItem('sellerInfo')
      setLastPage()
      const hrefParam = getParam('source') ? `&source=${getParam('source')}` : ''
      location.href = `/sellerEdit.html?type=add${hrefParam}`
    })
  }
  listEventBind() {
    const that = this
    const $selectSeller = $('.J_single_seller')
    $selectSeller.on('click', (e) => {
      const index = $(e.currentTarget).attr('data-index')
      const sellerInfo = this.listData.result[index]
      setCache({
        type: 'sessionStorage',
        key: 'sellerInfo',
        dataType: 'json',
        value: sellerInfo
      })
      that.sellerAccountsClear()
      if (this.source == 'orderDetailEdit') {
        const orderDetail = getCache({
          key: 'orderDetail',
          type: 'sessionStorage',
        })
        const updateSellerInfo = $.extend({
          orderNumber: orderDetail.obj.orderNumber
        }, sellerInfo)
        setCache({
          type: 'sessionStorage',
          key: 'updateSellerInfo',
          value: updateSellerInfo,
          dataType: 'json'
        })
      }
      location.href = getLastPage()
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
      that.getList('append');
    });
  }
  sellerAccountsClear() {
    const sellerAccounts = {
      id: '',
      shopId: '',
      replyAccountBank: '',
      replyAccountBranch: '',
      replyAccountUser: '',
      replyAccountNumber: '',
      replyAccountNumber: '',
      replyAccountNumber: '',
      isDefaulted: 0
    }
    setCache({
      type: 'sessionStorage',
      key: 'sellerAccounts',
      value: sellerAccounts,
      dataType: 'json'
    })
  }
}
export default new Page()
