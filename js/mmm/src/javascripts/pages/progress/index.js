import '../../common/base.js'
import OrderApi from '../../api/order'
import {
  checkLogin,
  getParam,
  unique,
  setCache,
  sortByObject
} from '../../common/utils'
class Page {
  constructor() {
    const that = this
    this._time = new Date().getTime()
    this.doms = {
      container: $('.J_list_dom')
    }
    checkLogin({
      lastPage: location.href
    }, (res) => {
      that.loginInfo = res.loginInfo
      this.renderFirst()
    })
  }

  renderFirst () {
    this.renderHead()
    let condition = this.filterCondition()
    this.renderList({
      category: getParam('category') || condition.category
    })
  }
  renderHead() {
    const Ttpl = 'progress/tabTpl.html'
    let obj = this.filterCondition()
    setCache({
      type: 'sessionStorage',
      dataType: 'json',
      key: 'showTabArr',
      value: obj.openArr
    })
    let resData = {
      showTabArr: obj.openArr,
      category: getParam('category') || obj.category
    }
    nunjucks.render(Ttpl, resData).then((renderHtml) => {
      $('.J_tabcontent').html(renderHtml)
      this.changeTab()
    })
  }
  // 筛选角色条件
  filterCondition() {
    let zbArr = [
      'woodClothHunterLeader',
      'woodClothHunterAdmin',
      'woodClothHunter',
      'woodFollowLeader',
      'woodAdmin'
    ]
    let jbArr = [
      'woodCutCloth',
      'woodCutClothLeader',
      'woodFollowLeader',
      'woodFinance',
      'woodAdmin'
    ]
    let dhArr = [
      'woodFollowLeader',
      'woodBuyerManager',
      'woodBuyerManagerAdmin',
      'woodBuyerManagerLeader',
      'woodChecker',
      'woodCheckerLeader',
      'woodFinance',
      'woodLogistics',
      'woodLogisticsLeader',
      'woodPurchaser',
      'woodPurchaserLeader',
      'woodTaker',
      'woodTakerLeader',
      'woodSales', // 销售员
      'woodSalesLeader' // 销售组长
    ]
    let loginInfo = this.loginInfo
    delete loginInfo.user
    console.log('筛条件', loginInfo)
    let filterArr = []
    for (let k in loginInfo) {
      if (loginInfo[k]) {
        filterArr.push(k)
      }
    }
    let openArr = []
    filterArr.map((item) => {
      let zbIndex = $.inArray(item, zbArr)
      let jbIndex = $.inArray(item, jbArr)
      let dhIndex = $.inArray(item, dhArr)
      if (zbIndex > -1) {
        openArr.push('zb')
      }
      if (jbIndex > -1) {
        openArr.push('jb')
      }
      if (dhIndex > -1) {
        openArr.push('dh')
      }
    })
    openArr = unique(openArr)
    let temArr = []
    openArr.map((item) => {
      if (item == 'zb') {
        temArr.push({key: 'a', value: 'zb'})
      } else if (item == 'jb') {
        temArr.push({key: 'b', value: 'jb'})
      } else {
        temArr.push({key: 'c', value: 'dh'})
      }
    })
    temArr.sort(sortByObject('key'))
    let reaArr = []
    temArr.map((item) => {
      reaArr.push(item.value)
    })
    openArr = reaArr
    // console.log('openArr', openArr)
    // 判断显示什么tab模板
    let category = ''
    if (openArr.length == 1) {
      if ($.inArray('zb', openArr) > -1) {
        category = 'zb-all'
      } else if ($.inArray('jb', openArr) > -1) {
        category = 'jb-all'
      } else if ($.inArray('dh', openArr) > -1) {
        category = 'all-all'
      }
    } else if (openArr.length == 2) {
      if ($.inArray('dh', openArr) > -1) {
        if ($.inArray('zb', openArr) > -1) {
          category = 'zb-all'
        } else {
          category = 'jb-all'
        }
      } else {
        category = 'zb-all'
      }
    } else if (openArr.length == 3) {
      category = 'zb-all'
    }
    return {category, openArr}
  }
  search() {
    let that = this
    $('.J_search_btn').on('click', function () {
      var keyword = encodeURIComponent($('#search').val())
      let category = that.doms.container.data('category')
      let redirectUrl = `/buyList.html?listKey=all&keyword=${keyword}&category=${category}`
      console.log('redirectUrl:', redirectUrl)
      location.href = redirectUrl
    });
  }
  changeTab() {
    let that = this
    $('.J_tabcontent').on('click', 'a', function() {
      const category = $(this).attr('data-index')
      $(this).addClass('active').siblings('a').removeClass('active')
      that.renderList({
        category
      })
    });
  }
  renderList(params) {
    let that = this
    let doms = this.doms;
    let reqOptions = {}

    reqOptions.category = params.category
    // reqOptions._time = this._time
    const tpl = 'progress/index.html'
    $.showPreloader()
    console.log('reqOptions', reqOptions)
    request({
      url: OrderApi.getOrderSummary,
      data: reqOptions,
      callback (res) {
        $.hidePreloader()
        // res.category = that.category
        /* res.xjz = res.xjz || 0
        res.sfkz = res.sfkz || 0
        res.thz = res.thz || 0
        res.yhz = res.yhz || 0
        res.hhz = res.hhz || 0
        res.fhz = res.fhz || 0
        res.gd = res.gd || 0
        res.skz = res.skz || 0
        res.fkz = res.fkz || 0
        res.sfk = res.sfk || 0 */
        if (res.success == 1) {
          nunjucks.render(tpl, res).then((renderHtml) => {
            doms.container.html(renderHtml)
            doms.container.attr('data-category', reqOptions.category)
            that.search()
            that.jumpBuyList()
          })
        } else {
          $.alert(res.msg)
        }
      }
    })
  }
  jumpBuyList() {
    let doms = this.doms
    doms.container.find('.J_jumpBuyList').on('click', function() {
      let category = doms.container.data('category')
      location.href = $(this).attr('href') + '&category=' + category
      return false
    })
  }
}

export default new Page()
