/*
  author  yonghuang
  供应商收款方式列表
 */
import '../../common/base.js'
import { setCache, getCache, getParam, getLastPage } from '../../common/utils.js'
import bankAccount from '../../api/bankAccount.js'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.shopId = getParam('shopId')
    this.render()
    this.sellerAccounts = getCache({
      key: 'sellerAccounts',
      type: 'sessionStorage'
    })
  }
  getList() {
    const reqOption = {
      shopId: this.shopId,
      _time: this._time
    }
    $.showPreloader();
    request({
      url: bankAccount.list,
      data: reqOption,
      cache: false,
      callback: (data) => {
        $.hidePreloader();
        if (data.success == '1') {
          this.renderList(data.page)
        } else {
          $.toast(data.msg)
        }
      }
    })
  }
  render() {
    const that = this
    const tpl = 'sellerAccountsList/index.html'
    this.data = {
      title: '供应商收款方式',
      shopId: that.shopId
    }
    nunjucks.render(tpl, this.data).then((sellerAccountsListHtml) => {
      that.$page = $('#sellerAccountsList')
      that.$page.html(sellerAccountsListHtml)
      this.getList()
    })
  }
  renderList(pages) {
    const typeString = {
      '2': '个人', 
      '1': '企业' 
    }
    pages.result.length && pages.result.map((item, index) => {
      item.typeString = typeString[item.type]
      item.obj = JSON.stringify(item)
      if (this.sellerAccounts) {
        if (this.sellerAccounts.id == item.id) {
          item.isDefault = 1 // 标记被选中的
        } else {
          item.isDefault = 0
        }
      }
    })
    const addrTpl = 'sellerAccountsList/listTpl.html'
    nunjucks.render(addrTpl, pages).then((sellerAccountsListHtml) => {
      $('.J_address_block').html(sellerAccountsListHtml)
      this.bindEvents()
    })
  }
  bindEvents() {
    const accountList = $('.J_account_list')
    const backBtn = $('.J_back')
    const addBtn = $('.J_add_more')
    // const editBtn = $('.J_edit')
    const delBtn = $('.J_del')
    backBtn.on('click', () => {
      sessionStorage.removeItem('sourcePage')
      location.href = getLastPage()
      return false
    })
    // 新增采购商收款方式
    addBtn.unbind('click').on('click', (e) => {
      sessionStorage.removeItem('sellerAccounts')
      // setLastPage()
    })
    // 选择收款方式
    accountList.unbind('click').on('click', (e) => {
      const target = $(e.currentTarget)
      const sellerAccounts = JSON.parse(target.parents('li').attr('data-obj'))
      setCache({
        type: 'sessionStorage',
        key: 'sellerAccounts',
        dataType: 'json',
        value: sellerAccounts
      })
      location.href = getLastPage()
      return false
    })
    // // 编辑收款方式
    // editBtn.unbind('click').on('click', (e) => {
    //   const target = $(e.currentTarget)
    //   const sellerAccounts = JSON.parse(target.parents('li').attr('data-obj'))
    //   setCache({
    //     type: 'sessionStorage',
    //     key: 'sellerAccounts',
    //     dataType: 'json',
    //     value: sellerAccounts
    //   })
    //   setLastPage()
    // })
    // 删除收款方式
    delBtn.unbind('click').on('click', (e) => {
      const target = $(e.currentTarget)
      console.log(target.parents('li').attr('data-obj'))
      const sellerAccounts = JSON.parse(target.parents('li').attr('data-obj'))
      $.showPreloader();
      request({
        url: bankAccount.delete,
        data: {
          id: sellerAccounts.id
        },
        cache: false,
        callback: (data) => {
          $.hidePreloader();
          if (data.success == '1') {
            $.alert(data.msg, () => {
              sessionStorage.removeItem('sellerAccounts')
              location.reload()
            })
          } else {
            $.toast(data.msg)
          }
        }
      })
      return false
    })
  }
}
export default new Page()
