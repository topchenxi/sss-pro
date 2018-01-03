import '../../common/base.js'
import Footer from '../orderDetail/footer'
import OrderApi from '../../api/order'
import {
  scrollGetData,
  imgPath,
  checkLogin,
  getCache,
  setCache,
  getParam,
  formatTimeString,
  setLastPage
} from '../../common/utils'

class Page {
  constructor () {
    const that = this
    checkLogin({
      lastPage: location.href
    }, (res) => {
      that.loginInfo = res.loginInfo
      const href = location.href
      that.pageCache = getCache({
        key: `pagecache-${href}`,
        type: 'sessionStorage',
        dataType: 'json'
      })
      that.reqOptions = getCache({
        key: 'reqOptions',
        type: 'sessionStorage',
        dataType: 'json'
      })
      if (that.pageCache) {
        // 存在缓存 获取缓存
        $('.page-current').html(that.pageCache)
        const scrolltopBackUp = getCache({
          key: `scrolltop-${href}`,
          type: 'sessionStorage',
          dataType: 'json'
        })
        that.loadingMore = getCache({
          key: 'loadingMore',
          type: 'sessionStorage',
          dataType: 'json'
        })
        $('.J_content').scrollTop(scrolltopBackUp)
        sessionStorage.removeItem('loadingMore')
        sessionStorage.removeItem(`scrolltop-${href}`)
        sessionStorage.removeItem(`pagecache-${href}`)
        sessionStorage.removeItem('reqOptions')
      }
      that.init()
    })
  }
  init() {
    const that = this
    const listKey = getParam('listKey')
    that._time = new Date().getTime()
    that.doms = {
      container: $('#orderList'),
      searchValue: $('#search'),
      searchBtn: $('.J_search_btn'),
      scrollContent: $('.J_list_dom'),
      filter: $('.J_filter'),
      statusTitle: $('.statusTitle'),
      listBuyer: $('.list-buyer'),
      listStatus: $('.list-status')
    }
    that.showTitle(listKey)
    if (!that.reqOptions) {
      that.reqOptions = {
        pageSize: 20
      }
    }
    if (!that.reqOptions.keyword) {
      delete that.reqOptions.keyword
    }
    that.reqOptions._time = that._time
    that.reqOptions.pageNumber = 1
    if (getParam('listKey')) {
      that.reqOptions.listKey = getParam('listKey')
      that.reqOptions.freezStatus = true
    } else {
      $('.button-nav.pull-left').hide()
      that.renderList()
    }
    if (that.pageCache) {
      that.doms.searchValue.val(that.reqOptions.keyword || '')
      that.scrollInit();
    } else {
      if (getParam('keyword')) {
        that.reqOptions.searchType = 0
        that.reqOptions.keyword = getParam('keyword', decodeURIComponent(location.href))
        $('#search').val(that.reqOptions.keyword)
        that.buyerReqOptions = {
          pageSize: 50,
          pageNumber: 1,
          _time: that._time
        }
      }
      that.renderList()
    }
    // that.renderBuyer()
    // that.renderStatus()
    that.renderTab()
    that.bindEvents()
  }
  renderTab() {
    const that = this
    const tpl = 'buyList/tabTpl.html'
    const category = that.reqOptions.category || getParam('category')
    const showTabArr = getCache({
      type: 'sessionStorage',
      dataType: 'json',
      key: 'showTabArr'
    })
    const renderTabData = {
      showTabArr,
      category
    }
    console.log(renderTabData)
    nunjucks.render(tpl, renderTabData).then((tabHtml) => {
      const $tabPage = $('.J_tabContent')
      $tabPage.html(tabHtml)
      that.changeTab()
    })
  }
  // 切换tab
  changeTab() {
    let that = this
    $('.J_tabContent a', this.$page).on('click', function() {
      $(this).addClass('active').siblings('a').removeClass('active')
      let category = $(this).attr('data-index')
      that.reqOptions.category = category
      that.reqOptions.keyword = that.doms.searchValue.val()
      that.reqOptions.pageNumber = 1
      that.renderList()
    })
  }
  showTitle(listKey) {
    let title
    switch (listKey) {
      case 'xjz':
        title = '询价中';
        break;
      case 'sfkz':
        title = '收付款中';
        break;
      case 'thz':
        title = '提货中';
        break;
      case 'yhz':
        title = '验货中';
        break;
      case 'hhz':
        title = '换货中';
        break;
      case 'fhz':
        title = '发货中';
        break;
      case 'gd':
        title = '归档';
        break;
      case 'skz':
        title = '收款中';
        break;
      case 'fkz':
        title = '付款中';
        break;
      case 'sfk':
        title = '收付款';
        break;
      case 'yqx':
        title = '已取消';
        break;
      case 'ywc':
        title = '已完成';
        break;
        //
      case 'dfprw':
        title = '待分配任务';
        break;
      case 'zbz':
        title = '找版中';
        break;

      case 'jbz':
        title = '剪版中';
        break;

      case 'dsh':
        title = '待审核';
        break;

      case 'ytjsh':
        title = '已提交审核';
        break;

      case 'yshwb':
        title = '已审核完毕';
        break;
        //
      case 'all':
        title = '全部';
        break;
      default :
        title = '订单列表';
    }
    $('.J_entry_title').text(title)
  }
  /**
   * 获取订单列表
   */
  renderList(loadType, category) {
    const that = this

    if ($('.modal-in').length === 0 && !loadType) {
      $.showPreloader()
    }

    var comeFromIndex = getParam('comeFrom') == 'index'
    if (comeFromIndex) {
      $('.J_back').attr('href', '/')
    }

    var apiUrl = comeFromIndex ? OrderApi.searchAll : OrderApi.searchOrderByListKey
    that.reqOptions.category = that.reqOptions.category || getParam('category')
    request({
      url: apiUrl,
      data: that.reqOptions,
      callback (data) {
        if (data.success === '1') {
          const doms = that.doms;
          const tpl = 'buyList/index.html'
          data.loginInfo = that.loginInfo
          data.page.imgPath = imgPath
          data.page.category = that.reqOptions.category
          data.page.listKey = getParam('listKey')
          data.page.result.map((item, i) => {
            item.createTimeString = formatTimeString(item.createTime)
          })
          nunjucks.render(tpl, data.page).then((resHtml) => {
            if (loadType === 'append') {
              doms.scrollContent.append(resHtml)
              if (data.page.result.length == 0) {
                $('.J_empty_tips').text('没有更多数据了')
              }
            } else {
              doms.scrollContent.html(resHtml)
              if (data.page.result.length == 0) {
                $('.J_empty_tips').text('暂无数据')
              }
            }
          })
          that.loadingMore = !!data.page.result.length;
          setCache({
            type: 'sessionStorage',
            dataType: 'json',
            value: that.loadingMore,
            key: 'loadingMore'
          })
          that.scrollInit();
        } else {
          $.hidePreloader()
          $.alert(data.msg);
        }
        $.hidePreloader();
      }
    })
  }
  /**
   * 获取采购商列表
   */
  /* renderBuyer () {
    let that = this
    request({
      url: OrderApi.selectBuyer,
      data: that.buyerReqOptions,
      callback (res) {
        if (res.page && res.page.result && res.page.result.length > 0) {
          nunjucks.render('buyList/buyer.html', res.page).then((renderHtml) => {
            that.doms.listBuyer.html(renderHtml)
          })
        } else {
          $('.list-buyer').hide()
        }
      }
    })
  }*/
  /**
   * 获取状态列表
   */
  /* renderStatus() {
    let that = this
    request({
      url: OrderApi.getStatusGroup,
      callback (res) {
        let statusList = []
        res.xjz && statusList.push(res.xjz)
        res.sfkz && statusList.push(res.sfkz)
        res.thz && statusList.push(res.thz)
        res.yhz && statusList.push(res.yhz)
        res.hhz && statusList.push(res.hhz)
        res.fhz && statusList.push(res.fhz)
        res.gd && statusList.push(res.gd)
        res.skz && statusList.push(res.skz)
        res.fkz && statusList.push(res.fkz)

        nunjucks.render('buyList/status.html', {statusList: statusList}).then((renderHtml) => {
          that.doms.listStatus.html(renderHtml)
          if (that.reqOptions.freezStatus) {
            const $this = $('[data-listKey="' + that.reqOptions.listKey + '"]')
            that.listKeyFilter($this)
            $('[data-type="status"]').addClass('active')
          }
        })
      }
    })
  }*/
  /**
   * 滚动加载
   */
  scrollInit() {
    const that = this;
    const doms = this.doms;
    const scrollOption = {
      reqOptions: that.reqOptions,
      scrollDom: $('.J_scroll_dom', doms.container), // 因为是绝对定位
      listDom: $('.J_list_dom ', doms.container), // 所以需要传 真正能够计算高度的div进去
      loadingMore: that.loadingMore, //
    };
    scrollGetData(scrollOption, () => {
      that.reqOptions = $.extend(that.reqOptions, scrollOption.reqOptions);
      // console.log('滚动条件', that.reqOptions)
      that.renderList('append');
    });
  }

  /* listKeyFilter ($this) {
    let doms = this.doms
    const listKey = $this.attr('data-listKey')
    const statusTitle = $this.attr('data-statusTitle')
    this.reqOptions.listKey = listKey
    this.reqOptions.pageNumber = 1
    delete this.reqOptions.status

    $('.level2 li').removeClass('active')
    $this.addClass('active')
    $('.list-status').hide()
    doms.statusTitle.text(statusTitle)
    this.renderList()
  }*/

  bindEvents () {
    let that = this
    let doms = this.doms

    /**
     * 切换筛选栏目
     */
    /* $('.buyerTitle, .statusTitle').on('click', function (e) {
      const $parent = $(this).parent()
      if ($parent.hasClass('active') && $parent.find('.container-list').eq(0).css('display') == 'block') {
        $parent.removeClass('active')
        $parent.find('.container-list').eq(0).hide()
        return
      }
      doms.filter.removeClass('active')
      $parent.addClass('active')
      let type = $parent.attr('data-type')
      if (type === 'status') {
        $('.list-buyer').hide()
        if (!that.reqOptions.freezStatus) {
          $parent.css('width', '200%')
          $('.list-status').show()
        }
      } else {
        $('.J_filter').css('width', '100%')
        $('.list-status').hide()
        $('.list-buyer').show()
      }
    })*/

    /**
     * 跳转到指定栏目通讯录
     */
    /* $(document).delegate('.nav-item', 'click', function () {
      let targetId = $(this).attr('data-targetId')
      let $target = $('#' + targetId)
      location.href = '/buyList.html#' + targetId
    })*/

    /**
     * 进度状态筛选
     */
    /* $(document).delegate('.item-status', 'click', function (e) {
      e.preventDefault();
      $('.item-status').removeClass('active')
      $(this).addClass('active')
      if ($(this).find('.list-status2').length == 0) {
        delete that.reqOptions.listKey
        delete that.reqOptions.status
        $('.list-status').hide()
        doms.statusTitle.text('全部')
        that.renderList()
      }
    })*/

    /**
     * 搜索
     */
    doms.searchBtn.on('click', () => {
      that.reqOptions.keyword = doms.searchValue.val()
      that.reqOptions.searchType = 0
      that.reqOptions.pageNumber = 1
      $('.J_scroll_dom', doms.container).scrollTop(0);
      that.renderList()
    })

    /**
     * 通过采购商进行筛选
     */
    /* $(document).delegate('.buyerItem', 'click', function () {
      const buyerId = $(this).attr('data-id')
      that.reqOptions.buyerId = buyerId

      $('.buyerItem').removeClass('active')
      $(this).addClass('active')

      $('.list-buyer').hide()
      that.renderList()
    })*/

    /**
     * 通过listKey进行状态筛选
     */
    /* $(document).delegate('.listKey', 'click', function () {
      that.listKeyFilter($(this))
    })*/

    /**
     * 通过status进行状态筛选
     */
    /* $(document).delegate('.status', 'click', function () {
      const status = $(this).attr('data-status')
      const statusTitle = $(this).attr('data-statusTitle')
      that.reqOptions.status = status
      $('.level2 li').removeClass('active')
      $(this).addClass('active')
      $('.list-status').hide()
      doms.statusTitle.text(statusTitle)
      that.reqOptions.pageNumber = 1
      that.renderList()
    })*/
        /**
     * 再来一单
     */
    $(document).on('click', '.J_publish_again', (e) => {
      const orderNumber = $(e.currentTarget).data('ordernumber');
      request({
        url: OrderApi.getDetail,
        data: {
          orderNumber,
          _time: that._time
        },
        callback(res) {
          $.hidePreloader();
          if (res.success == '1') {
            const obj = res.obj
            // // 色织
            // setCache({
            //   type: 'sessionStorage',
            //   dataType: 'json',
            //   key: 'orderDetail',
            //   value: res
            // })
            // 设置采购商
            const buyerInfo = obj.buyer
            setCache({
              dataType: 'json',
              type: 'sessionStorage',
              key: 'buyerInfo',
              value: buyerInfo
            })
            // 设置供应商
            const sellerInfo = {
              sellerCompany: obj.sellerCompany,
              sellerTel: obj.sellerTel,
              sellerAddr: obj.sellerAddr,
              sellerProvince: obj.sellerProvince,
              sellerArea: obj.sellerArea,
              sellerCity: obj.sellerCity,
              id: obj.shopId
            }
            setCache({
              dataType: 'json',
              type: 'sessionStorage',
              key: 'sellerInfo',
              value: sellerInfo
            })
            // 设置第一步的数据
            const firstStep = {
              imgUrls: obj.imgUrls,
              buyType: obj.buyType,
              buyerId: obj.buyer.id,
              sellerCompany: obj.sellerCompany,
              sellerProvince: obj.sellerProvince,
              sellerCity: obj.sellerCity,
              sellerArea: obj.sellerArea,
              sellerTel: obj.sellerTel,
              sellerAddr: obj.sellerAddr,
              productType: obj.productType,
              haveRealVersion: obj.haveRealVersion,
              checkCloth: obj.checkCloth,
              productNumber: obj.productNumber
            }
            setCache({
              dataType: 'json',
              type: 'sessionStorage',
              key: 'firstStep',
              value: firstStep
            })
            for (var i =0 ; i<obj.productList.length; i++) {
              delete obj.productList[i].buyProductId
            }
            // 设置色号信息
            setCache({
              dataType: 'json',
              type: 'sessionStorage',
              key: 'colorInfo',
              value: obj.productList
            })

            // 设置配送方式信息
            obj.expectedTime = Date.now() + 86400000; // 期望货期改成当天的第二天
            const sendWaysObj = {
              sendType: obj.sendType,
              invoiceStatus: obj.invoiceStatus,
              leaveMessage: obj.leaveMessage,
              expectedTimeString: Number(obj.expectedTime) === 0 ? '' : formatTimeString(obj.expectedTime).split(' ')[0],
              expectedTime: obj.expectedTime
            }
            setCache({ // 只有在发布订单的步骤中才会出现
              key: 'sendWaysObj',
              type: 'sessionStorage',
              dataType: 'json',
              value: sendWaysObj
            })
            setCache({ // 只有在发布订单的步骤中才会出现
              key: 'publishAgain',
              type: 'sessionStorage',
              dataType: 'json',
              value: true
            })
            location.href = `orderPublish.html?orderNumber=${orderNumber}`
          } else {
            $.alert(res.msg);
          }
        }
      })
    });
    $(document).delegate('.order-item', 'click', function () {
      setLastPage()
      const pageCacheName = `pagecache-${location.href}`
      setCache({
        key: `scrolltop-${location.href}`,
        value: $('.J_content').scrollTop(),
        type: 'sessionStorage',
        dataType: 'json'
      })
      setCache({
        key: 'reqOptions',
        value: that.reqOptions,
        type: 'sessionStorage',
        dataType: 'json'
      })
      setCache({
        key: pageCacheName,
        value: $('.page-current').html(),
        type: 'sessionStorage',
        dataType: 'json'
      })
    })
    // 返回
    this.goBack()
  }
  goBack() {
    let category = getParam('category')
    $('.J_back').on('click', function() {
      $('#search').val('')
      sessionStorage.removeItem('reqOptions')
      if (getParam('comeFrom')) {
        location.href = `/?category=${category}`
      } else if (listKey == 'ywc' && getParam('comeFrom')=='publishAgain'){
        location.href = `/?category=all-all`
      } else {
        location.href = `/progress.html?category=${category}`
      }
      return false
    })
  }
}

export default new Page()
