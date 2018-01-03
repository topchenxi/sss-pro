import '../../common/base.js'
import {
  scrollGetData,
  getParam,
  getCache,
  setCache,
  imgPath,
  checkLogin,
  setLastPage
} from '../../common/utils'
import Footer from '../orderDetail/footer'
import OrderApi from '../../api/order'
// import DebtApi from '../../api/debt'
class Page extends Footer {
  constructor() {
    super()
    const that = this
    that._time = new Date().getTime()
    that.tabKey = getParam('Tabkey')
    that.category = getParam('category')
    checkLogin({
      lastPage: location.href
    }, (res) => {
      that.loginInfo = res.loginInfo
      const href = location.href
      const pageCache = getCache({
        key: `pagecache-${href}`,
        type: 'sessionStorage',
        dataType: 'json'
      })
      that.reqOptions = getCache({
        key: 'reqOptions',
        type: 'sessionStorage',
        dataType: 'json'
      })
      if (pageCache) {
        // 存在缓存 获取缓存
        $('.page-current').html(pageCache)
        const scrolltopBackUp = getCache({
          key: `scrolltop-${href}`,
          type: 'sessionStorage',
          dataType: 'json'
        })
        that.doms = {
          container: $('#orderList'),
          searchValue: $('#search')
        }
        that.doms.searchValue.val(that.reqOptions.keyword || '')
        that.bindEvents()
        that.loadingMore = getCache({
          key: 'loadingMore',
          type: 'sessionStorage',
          dataType: 'json'
        })
        $('.J_content').scrollTop(scrolltopBackUp)
        that.scrollInit()
        sessionStorage.removeItem('loadingMore')
        sessionStorage.removeItem(`scrolltop-${href}`)
        sessionStorage.removeItem(`pagecache-${href}`)
      } else {
        that.pageinit()
      }

      sessionStorage.removeItem('reqOptions')
    })
  }
  pageinit() {
    const that = this
    that.doms = {};
    that.doms.container = $('#orderList')
    that.doms.searchValue = $('#search')
    const headTpl = 'orderList/head.html'
    nunjucks.render(headTpl, {
      title: that.showTitle(that.tabKey)
    }).then((headHtml) => {
      $('.J_index_head', that.doms.container).html(headHtml)
      if (!that.reqOptions) {
        that.reqOptions = {
          pageSize: 20,
          pageNumber: 1
        }
      } else {
        that.doms.searchValue.val(that.reqOptions.keyword || '')
      }
      that.reqOptions.tabKey = that.tabKey
      that.reqOptions.category = that.category
      that.renderList()
      that.bindEvents()
    })
  }
  goBack() {
    let that = this
    $('.J_goBack').on('click', function() {
      location.href = '/?category=' + that.category
      return false
    })
  }
  // 判断
  showTitle(tabKey) {
    let title
    if (this.category == 'all-all') {
      // 大货
      switch (tabKey) {
        case 'tzxj':
          title = '通知询价';
          break;
        case 'fk':
          title = '付款';
          break;
        case 'ddfy':
          title = '订单复议';
          break;
        case 'tzqh':
          title = '通知取货';
          break;
        case 'cjqk':
          title = '催缴欠款';
          break;
        case 'zpxj':
          title = '指派询价';
          break;
        case 'xj':
          title = '询价';
          break;
        case 'dhwk':
          title = '订货尾款';
          break;
        case 'tzfk':
          title = '通知付款';
          break;
        case 'th':
          title = '提货';
          break;
        case 'csh':
          title = '催送货';
          break;
        case 'hh':
          title = '换货';
          break;
        case 'fh':
          title = '发货';
          break;
        case 'zpyh':
          title = '指派验货';
          break;
        case 'yh':
          title = '验货';
          break;
        case 'dsh':
          title = '待收货';
          break;
        case 'zpfh':
          title = '指派发货';
          break;
        case 'zprw':
          title = '指派提货';
          break;
        case 'df':
          title = '垫付';
          break;
        case 'sfk':
          title = '收付款';
          break;
        case 'sqk':
          title = '收欠款';
          break;
        case 'dqrsh':
          title = '确认收货';
          break;
      }
    } else if (this.category == 'zb-all' || this.category == 'zb-zy') {
      // 找版
      switch (tabKey) {
        case 'tzzb':
          title = '通知找版';
          break;
        case 'dssk':
          title = '待收色卡';
          break;
        case 'djsk':
          title = '待寄色卡';
          break;
        case 'dqrsh':
          title = '待确认收货';
          break;
        case 'dfprw':
          title = '待分配任务';
          break;
        case 'dsh':
          title = '待审核';
          break;
        case 'dzb':
          title = '待找版';
          break;
      }
    } else if (this.category == 'jb-all') {
      // 剪版
      switch (tabKey) {
        case 'tzjb':
          title = '通知剪版';
          break;
        case 'dsb':
          title = '待收版';
          break;
        case 'dfh':
          title = '待发货';
          break;
        case 'dqrsh':
          title = '待确认收货';
          break;
        case 'dqrsk':
          title = '待确认收款';
          break;
        case 'dfprw':
          title = '待分配任务';
          break;
        case 'dsh':
          title = '待审核';
          break;
        case 'djb':
          title = '待剪版';
          break;
      }
    }
    return title
  }
  searchResult() {
    const that = this;
    const doms = that.doms
    console.log(doms)
    doms.searchBtn = $('.J_search_btn');
    doms.searchBtn.on('click', () => {
      that.reqOptions.keyword = doms.searchValue.val();
      that.reqOptions.pageNumber = 1
      if (that.reqOptions.keyword) {
        that.reqOptions.searchType = 0
      } else if (!that.reqOptions.keyword) {
        delete that.reqOptions.searchType
        delete that.reqOptions.keyword
      }
      $('.J_scroll_dom', doms.container)
        .scrollTop(0);
      that.renderList();
    })
  }

  convertData(data) {
    const that = this
    data.page.result = data.page.result.map((obj) => {
      let payStatus
      let wordList = []
      if (obj.status === 325) { // 显示订金
        payStatus = obj.earnestMoneyPayStatus
        obj.earnestMoney = that.formatCurrency(obj.earnestMoney)
      }
      if (obj.status === 327) { // 显示货款
        payStatus = obj.fullMoneyPayStatus
        obj.fullMoney = that.formatCurrency(obj.fullMoney)
      }
      if (obj.status === 345) { // 显示尾款
        payStatus = obj.finalMoneyPayStatus
        obj.finalMoney = that.formatCurrency(obj.finalMoney)
      }
      if (obj.salesName && obj.salesName != '') {
        wordList.push('销售单')
      }
      if (obj.haveRealVersion != null && obj.haveRealVersion != undefined) {
        if (obj.haveRealVersion && obj.haveRealVersion == 1) {
          wordList.push('有实版')
        } else {
          wordList.push('无实版')
        }
      }
      if (obj.changeCard != null && obj.changeCard != undefined) {
        if (obj.changeCard && obj.changeCard == 1) {
          wordList.push('换卡头')
        } else {
          wordList.push('不换卡头')
        }
      }
      obj.payStatus = payStatus
      obj.words = wordList.length > 0 ? wordList.join('/') : ''
      obj.itemString = JSON.stringify(obj)
      return obj
    })
    return data
  }
  // 筛选列表的url
  // filterUrl() {
  //   let loginInfo = this.loginInfo
  //   let tabKey = this.tabKey
  //   let url
  //   if (loginInfo.woodFollowLeader && tabKey == 'cjqk') {
  //     url = DebtApi.listDhDebtTask
  //   } else if (loginInfo.woodFollowLeader && tabKey == 'dqrsk') {
  //     url = DebtApi.listFollowerJbTask
  //   } else if ((loginInfo.woodCutCloth || loginInfo.woodCutClothLeader) && tabKey == 'dqrsk' ) {
  //     url = DebtApi.listCutClothJbTask
  //   } else if (loginInfo.woodFinance && tabKey == 'sqk') {
  //     url = DebtApi.listDebtOrder
  //   } else {
  //     url = OrderApi.searchOrderList
  //   }
  //   return url
  // }
  renderList(loadType) {
    const that = this
    const scrollContent = $('.J_list_dom');
    that.reqOptions._time = that._time
    if (!loadType) {
      $.showPreloader()
    }
    let url = OrderApi.searchOrderList
    request({
      url,
      data: that.reqOptions,
      cache: false,
      callback(data) {
        if (data.success === '1') {
          // alert(JSON.stringify(data))
          data = that.convertData(data)
          const tpl = 'orderList/index.html'
          data.loginInfo = that.loginInfo
          data.page.imgPath = imgPath
          data.page.tabKey = that.tabKey
          data.page.category = that.category
          // Tabkey --- 作为确认收版的标志
          data.loginInfo.tabKey = that.tabKey;
          console.log('data', data.loginInfo);
          // urgeMoney --- 作为催款欠款标志
          let urgeMoney = getParam('urgeMoney')
          // 收欠款
          let collectDebts = getParam('collectDebts')
          if (urgeMoney) {
            data.loginInfo.urgeMoney = urgeMoney
          }
          let unGetPay = getParam('unGetPay')
          if (unGetPay) {
            data.loginInfo.unGetPay = unGetPay
          }
          // 剪版的待收款
          let jbCollection = getParam('jbCollection')

          if (jbCollection) {
            data.loginInfo.jbCollection = jbCollection
          }
          if (collectDebts) {
            data.loginInfo.collectDebts = collectDebts
          }
          data.page.result.map((item, i) => {
            item.source = encodeURIComponent(location.pathname + location.search);
            const tabKey = getParam('Tabkey')
            item.standAlone = (tabKey == 'dqrsk') ? 1 : 0;
            let ygj = 0;
            const checkFlawList = []
            if (item.checkFlawList && item.checkFlawList.length) {
              item.checkFlawList && item.checkFlawList.map((obj, index) => {
                if (obj.result == 2) {
                  checkFlawList.push(obj.number)
                }
              })
              // 将不合格的数据收集起来
              item.checkFlawList = checkFlawList.length ? checkFlawList.join(',') : ''
              // 是否显示换货按钮
              if (checkFlawList.length) {
                item.notifyReplaceBtnShow = true
              } else {
                item.notifyReplaceBtnShow = false
              }
            }
            item.wantProductList && item.wantProductList.map(function(obj, index) {
              for (let i = 0, l = obj.colorList ? obj.colorList.length : 0; i < l; i++) {
                let color = obj.colorList[i]
                ygj += color.price * color.quantity
              }
            });
            item.ygj = ygj;
            // 判断是否加急
            item.urgent = Number(item.expectedTime) != 0 ? ((Number(item.expectedTime) - Number(item.createTime) <= 24 * 3600 * 1000)) : false
            // 总金额 四舍五入 保留两位小数点
            if (item.totalDebtMoney) {
              item.totalDebtMoney =  parseFloat(item.totalDebtMoney, 10).toFixed(2).toString()
            }

          });
          console.log('data', data)
          nunjucks.render(tpl, data).then((resHtml) => {
            that.loadingMore = data.page.hasNextPage;
            setCache({
              type: 'sessionStorage',
              dataType: 'json',
              value: that.loadingMore,
              key: 'loadingMore'
            })
            if (loadType === 'append') {
              scrollContent.append(resHtml)
              if (data.page.result.length == 0) {
                $('.J_empty_tips').text('没有更多数据了')
              }
            } else {
              scrollContent.html(resHtml)
              if (data.page.result.length == 0) {
                $('.J_empty_tips').text('暂无数据')
              }
            }
            $.hidePreloader()
            that.scrollInit();
          })
        } else {
          $.alert(data.msg);
        }
        $.hidePreloader();
      }
    })
  }
  scrollInit() { // 无限滚动
    const that = this;
    const doms = this.doms;
    const scrollOption = {
      reqOptions: that.reqOptions,
      scrollDom: $('.J_scroll_dom', doms.container), // 因为是绝对定位
      listDom: $('.J_list_dom ', doms.container), // 所以需要传 真正能够计算高度的div进去
      loadingMore: that.loadingMore
    };
    scrollGetData(scrollOption, () => {
      that.reqOptions = $.extend(that.reqOptions, scrollOption.reqOptions);
      // console.log('滚动条件', that.reqOptions)
      that.renderList('append');
    });
  }

  bindEvents() {
    $(document).on('click', '.J_jump_to_detail', (e) => {
      setLastPage();
      const pageCacheName = `pagecache-${location.href}`
      setCache({
        key: `scrolltop-${location.href}`,
        value: $('.J_content').scrollTop(),
        type: 'sessionStorage',
        dataType: 'json'
      })
      setCache({
        key: 'reqOptions',
        value: this.reqOptions,
        type: 'sessionStorage',
        dataType: 'json'
      })
      setCache({
        key: pageCacheName,
        value: $('.page-current').html(),
        type: 'sessionStorage',
        dataType: 'json'
      })
      // 进去详情之前删除用来更新的供应商信息
      sessionStorage.removeItem('updateSellerInfo')
    });
    $(document).on('click', '.J_list_cache', (e) => {
      setLastPage();
      const pageCacheName = `pagecache-${location.href}`
      setCache({
        key: `scrolltop-${location.href}`,
        value: $('.J_content').scrollTop(),
        type: 'sessionStorage',
        dataType: 'json'
      })
      setCache({
        key: 'reqOptions',
        value: this.reqOptions,
        type: 'sessionStorage',
        dataType: 'json'
      })
      setCache({
        key: pageCacheName,
        value: $('.page-current').html(),
        type: 'sessionStorage',
        dataType: 'json'
      })
    });
    if (this.category === 'zb-all' || this.category === 'zb-zy') { // 找版
      this.bindZBFooterEvents()
    } else if (this.category === 'jb-all') { // 剪版
      this.bindJBFooterEvents()
    } else if (this.category === 'all-all') { // 大货
      this.bindDHFooterEvents()
    }
    this.bindFooterEvents()
    this.searchResult() // 搜索事件
    this.goBack()
  }
  formatCurrency(number) {
    let val = Number(number)
    let backVal = parseFloat(val, 10).toFixed(2).toString()
    if (String(backVal) == '-0.00') {
      backVal = '0.00'
    }
    return backVal
  }
}

export default new Page()
