/*
 *供应商收款方式编辑
*/
/*
  author  yonghuang
 */
import '../../common/base.js'
import {
  setCache,
  getCache,
  getParam,
  scrollTo,
  getLastPage
} from '../../common/utils'
import bankAccount from '../../api/bankAccount.js'
import '../../vendor/jquery.autocomplete.min.js'
// const vConsole = require('vconsole')
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.bankTree = getCache({
      type: 'localStorage',
      key: 'bankTree',
      dataType: 'json'
    })
    if (!this.bankTree) {
      this.getBankTree()
    } else {
      this.render()
    }
  }
  getBankTree() {
    const that = this
    $.showPreloader('银行列表加载中，约15秒钟')
    request({
      url: bankAccount.tree,
      data: '',
      timeout: 1000000,
      callback (data) {
        $.hidePreloader();
        if (data.success == '1') {
          setCache({
            time: 100000000000,
            key: 'bankTree',
            dataType: 'json',
            value: data.result,
            type: 'localStorage'
          })
          that.bankTree = data.result
          that.render()
        } else {
          $.alert(data.msg);
        }
      }
    })
  }
  render() {
    const that = this
    that.change = false
    that.source = getParam('source')
    that.shopId = getParam('shopId')
    that.type = 2 // 默认是个人的
    const tpl = 'sellerAccounts/index.html'
    that.sellerAccounts = getCache({
      type: 'sessionStorage',
      dataType: 'json',
      key: 'sellerAccounts'
    }) || {}
    that.data = {
      title: '供应商收款方式',
      replyAccountUser: that.sellerAccounts.replyAccountUser || '',
      replyAccountCompany: that.sellerAccounts.replyAccountCompany || '',
      replyAccountNumber: that.sellerAccounts.replyAccountNumber || '',
      replyAccountBank: that.sellerAccounts.replyAccountBank || '',
      province: that.sellerAccounts.province || '',
      city: that.sellerAccounts.city || '',
      bankId: that.sellerAccounts.bankId || '',
      bankShort: that.sellerAccounts.bankShort || '',
      type: that.sellerAccounts.type || '',
      // replyAccountBranch: that.sellerAccounts.replyAccountBranch || ''
    }
    if (that.sellerAccounts.id) {
      that.data.id = that.sellerAccounts.id
    }
    nunjucks.render(tpl, that.data).then((sellerAccountsHtml) => {
      that.$page = $('#sellerAccounts')
      that.$page.html(sellerAccountsHtml)
      that.bindEvents()
    })
  }
  renderBankArea() {
    const that = this
    const bankArae = $('.J_select_bank_area')
    const bankName = $('.J_select_bank')
    bankArae.addClass('active')
    const cityPickerOpt = {
      toolbarTemplate: `<header class="bar bar-nav">
        <button class="button button-link pull-left"></button>
        <button class="button button-link pull-right close-picker">确定</button>
        <h1 class="title">开户地区</h1>
        </header>`,
      onClose: function(e) {
        that.doChecked(bankArae)
        that.province = e.value ? e.value[0] : '广东' // 开户所在省
        that.city = e.value ? e.value[1] : '广州'// 开户所在市
        // $('.J_replyAccountBranch').val('') // 清空支行
        that.getBankBranch(bankName.val()) // 获取支行
      }
    }
    if (that.bankExist) {
      cityPickerOpt.cityData = that.getBankArea(bankName.val())
    }
    bankArae.cityPicker(cityPickerOpt);
  }
  // 获取地区
  getBankArea(bankSelected) {
    const that = this
    const bankAraeArr = []
    let bankSelectedTree
    for(var i in this.bankTree) {
      if(i.indexOf(bankSelected) != -1) {
        bankSelectedTree = this.bankTree[i]
        that.bankShort = i.split('-')[1]
      }
    }
    for(const i in bankSelectedTree) {
      const child = bankSelectedTree[i]
      const obj_1 = {}
      obj_1.name = i
      obj_1.type = 0
      obj_1.sub = [{
        "name":"请选择"
      }]
      for(const j in child) {
        const obj_2 = {}
        obj_2.name = j
        obj_1.sub.push(obj_2)
      }
      bankAraeArr.push(obj_1)
    }
    return bankAraeArr
  }
  // 获取支行
  getBankBranch(bankSelected) {
    const that = this
    let bankSelectedTree
    const branchArr = []
    for(var i in this.bankTree) {
      if(i.indexOf(bankSelected) != -1) {
        bankSelectedTree = this.bankTree[i]
      }
    }
    const branchObj = (bankSelectedTree && bankSelectedTree[that.province]) ? bankSelectedTree[that.province][that.city] : {}
    for (let i in branchObj) {
      const obj = {
        value: i,
        data: branchObj[i]
      }
      branchArr.push(obj)
    }
    that.branchSelected = branchObj // 选中的银行支行 数组 暴露到全局
    that.acInstance.setOptions({
      minChars: 0, //表示在自动完成激活之前填入的最小字符
      autoSelectFirst: true, //表示自动填充
      maxHeight: 200,
      lookup: branchArr,
      onSelect: function (suggestion) {
        that.bankId = suggestion.data
        that.replyAccountBranch = suggestion.value
        // that.doChecked($('.J_replyAccountBranch'))
      }
    })
  }
  bindEvents() {
    const that = this
    const saveBtn = $('.J_save')
    const backBtn = $('.J_back')
    // 校验
    const $replyAccountUser = $('.J_account_input')
    const $accountType = $('.J_account_type') // 账户类型
    const $replyAccountNumber = $('input[name="replyAccountNumber"]')
    // const $replyAccountBank = $('input[name="replyAccountBank"]')
    const $replyAccountBranch = $('.J_replyAccountBranch')
    const bankName = $('.J_select_bank')
    const bankArae = $('.J_select_bank_area')
    // 账户类型切换
    $accountType.on('click', (e) => {
      // $('.J_replyAccountBranch').parents('form').scrollTop = 100
      $accountType.removeClass('active')
      $(e.currentTarget).addClass('active')
      that.type = $(e.currentTarget).attr('data-type')
      this.doChecked($replyAccountUser)
    })

    $replyAccountUser.on('input', (e) => {
      this.doChecked(e)
    })
    // 银行账号验证
    $replyAccountNumber.on('input', (e) => {
      let str = $(e.currentTarget).val()
      let c = str.replace(/\s/g,  "")
      if(str != "" && c.length > 4 && c.length % 4 == 1){
        $(e.currentTarget).val(str.substring(0, str.length - 1)+ " " + str.substring(str.length - 1, str.length));
      }
      this.doChecked(e)
    })
    $replyAccountNumber.on('blur', (e) => {
      const val = String($(e.currentTarget).val()).replace(/\s+/g, '')
      if (that.type == 2 && (val.length > 19 || val.length < 16)) {
        $.toast('请输入正确的银行卡号')
        saveBtn.addClass('disable')
        that.showTips($replyAccountNumber)
        return
      }
      if (that.type == 1 && (val.length > 19 || val.length < 10)) {
        $.toast('请输入正确的银行卡号')
        saveBtn.addClass('disable')
        that.showTips($replyAccountNumber)
        return
      }
    })
    // 输入支行的时候 滚动条往下滚动
    // $replyAccountBranch.on('focus', function(){
    //   scrollTo($replyAccountBranch, 50, $replyAccountBranch.parents('form'))
    // })
    // $replyAccountBranch.on('input', (e) => {
    //   this.replyAccountBranch = $(e.currentTarget).val()
    //   this.doChecked($replyAccountBranch)
    // })
    delete this.bankTree.expiredTime
    const bankNameArr = Object.keys(this.bankTree)
    bankNameArr.map((bak, i) => {
      bankNameArr[i] = bak.split('-')[0]
    })
    // 20161009 v1.4版本 去除银行强筛选 增加可手动输入功能
    // bankName.picker({
    //   toolbarTemplate: `<header class="bar bar-nav">
    //     <button class="button button-link pull-left"></button>
    //     <button class="button button-link pull-right close-picker">确定</button>
    //     <h1 class="title">银行列表</h1>
    //     </header>`,
    //   cols: [
    //     {
    //       textAlign: 'center',
    //       values: bankNameArr
    //     }
    //   ],
    //   onClose: function(e) {
    //     bankArae.val('')
    //     that.renderBankArea()
    //     that.doChecked(bankName)
    //   }
    // });

    // 银行筛选 + 手动输入
    that.acInstanceForBankName = bankName.autocomplete({
      showNoSuggestionNotice: true,
      noSuggestionNotice: '未找到，可自定义',
      minChars: 0, //表示在自动完成激活之前填入的最小字符
      autoSelectFirst: true, //表示自动填充
      maxHeight: 200,
      lookup: bankNameArr,
      onSelect: function (suggestion) {
        !that.bankExist && checkBankExist()
      },
      appendTo: $('.autocomplete-dom')
    });
    // bankName.on('focus', function(){
    //   scrollTo($('.J_replyAccountBranch'), 150, $('.J_replyAccountBranch').parents('form'))
    // })
    bankName.on('blur', function(){
      checkBankExist()
    })
    // 检查银行是否存在数据库
    function checkBankExist() {
      const bankSelected = bankName.val()
      that.bankExist = false
      bankNameArr && bankNameArr.map((item, index) => {
        if(item == bankSelected) {
          that.bankExist = true
        }
      })
      // that.bankExist = !!bankNameArr.find((v, i ,a) => {
      //   return (bankSelected == v)
      // })
      setTimeout(function () {
        that.renderBankArea()
        // $('.J_replyAccountBranch').val('')
        that.province = '广东'
        that.city = '广州'
        bankArae.val('广东 广州')
        if (!that.bankExist) {
          that.getBankBranch()
        } else {
          that.getBankBranch(bankName.val())
        }
        that.doChecked(bankName)
      }, 100);
    }
    if (bankName.val()) {
      that.renderBankArea()
    }
    backBtn.on('click', () => {
      if (this.change) {
        $.modal({
          title: '是否确定返回',
          text: '继续返回，新内容将不会被保留',
          buttons: [
            {
              text: '不保存',
              onClick: () => {
                location.href = getLastPage()
                return false
              }
            },
            {
              text: '取消'
            }
          ]
        })
      } else {
        location.href = getLastPage()
      }
      return false
    })
    // 开户地区
    bankArae.on('focus', (e) => {
      if(!bankName.val()) {
        bankArae.val('')
        $.alert('请先输入银行')
      }
    })
    // 支行筛选
    // that.acInstance = $('.J_replyAccountBranch').autocomplete({
    //   showNoSuggestionNotice: true,
    //   noSuggestionNotice: '未有相关支行，可自定义， 并确保正确',
    //   lookup: function (query, done) {
    //     var result = {
    //       suggestions: []
    //     };
    //     done(result);
    //   },
    //   appendTo: $('.autocomplete-dom')
    // });
    // $('.J_replyAccountBranch').on('focus', function(e) {
    //   // const top = $('.J_replyAccountBranch').offset().top
    //   scrollTo($('.J_replyAccountBranch'))
    //   if (!that.province) {
    //     that.acInstance.disable()
    //     $.alert('请先选择开户地区')
    //     $('.J_replyAccountBranch').val('')
    //     return false
    //   } else {
    //     that.acInstance.enable()
    //   }
    // })
    // 保存
    saveBtn.on('click', (e) => {
      const target = $(e.target)
      if (target.hasClass('disabled')) return
      // 校验开户名
      const userName = $replyAccountUser.val()
      if (that.type == 2 && userName.length > 10) {
        $.toast('开户名过长')
        saveBtn.addClass('disable')
        that.showTips($replyAccountUser)
        return false
      }
      if (that.type == 1 && userName.length > 30) {
        $.toast('开户名过长')
        saveBtn.addClass('disable')
        that.showTips($replyAccountUser)
        return false
      }

      let accountNumber = $replyAccountNumber.val()
      accountNumber = accountNumber.replace(/\s/g, '')
      console.log(accountNumber)
      if (that.type == 2 && (accountNumber.length > 19 || accountNumber.length < 16)) {
        $.toast('请输入正确的银行卡号')
        saveBtn.addClass('disable')
        that.showTips($replyAccountNumber)
        return false
      }
      if (that.type == 1 && (accountNumber.length > 19 || accountNumber.length < 10)) {
        $.toast('请输入正确的银行卡号')
        saveBtn.addClass('disable')
        that.showTips($replyAccountNumber)
        return false
      }
      // if (!that.branchSelected[that.replyAccountBranch]) {
      //   saveBtn.addClass('disabled')
      //   $.toast('支行有误')
      //   return false
      // }
      const $form = target.parents('form')
      const formArr = $form.serializeArray()
      const formData = {}
      formArr.map((key) => {
        formData[key.name] = key.value
      })
      formData._time = that._time
      formData.type = that.type
      formData.province = that.province
      formData.city = that.city
      formData.bankShort = that.bankShort
      formData.bankId = that.bankId
      formData.replyAccountBranch = that.replyAccountBranch
      if(that.type == 1) {
        formData.replyAccountCompany = $replyAccountUser.val()
      } else {
        formData.replyAccountUser = $replyAccountUser.val()
      }
      formData.replyAccountNumber = formData.replyAccountNumber.replace(/\s+/g, '')
      const reqOptions = $.extend({
        shopId: that.shopId
      }, formData)
      $.showPreloader()
      request({
        url: bankAccount.add,
        data: reqOptions,
        callback (data) {
          $.hidePreloader();
          if (data.success == '1') {
            setCache({
              key: 'sellerAccounts',
              dataType: 'json',
              value: data.obj,
              type: 'sessionStorage'
            })
            $.alert(data.msg, () => {
              location.href = getLastPage()
            })
          } else {
            $.alert(data.msg);
          }
        }
      })
    })
  }
  bankEvent() {
    const that = this
    const bankSelect = $('.J_bank')
    bankSelect.on('click', (e) => {
      const bankText = $(e.currentTarget).text()
      $('input[name="replyAccountBank"]').val(bankText)
      $('.J_bank_show').html(bankText)
      $('.J_select_bank').removeClass('gray-text')
      history.back();
      that.doChecked($('.J_select_bank'))
    })
  }
  doChecked(e) {
    const target = e.currentTarget ? $(e.currentTarget) : e
    const items = target.parents('.J_need_item')
    const validArr = []
    this.change = true
    items.prevAll().each((i, item) => {
      const input = $(item).find('input')
      let val = ''
      if (input.length > 1) {
        val = $(input[0]).val()
      } else {
        val = input.val()
      }
      if (val === '' || val === undefined) {
        this.showTips(input)
      }
    })
    $('.J_need_item').each((i, item) => {
      const input = $(item).find('input')
      let val = ''
      if (input.length > 1) {
        val = $(input[0]).val()
      } else if (input.length === 0) {
        val = String($(item).find('textarea').val()).replace(/[\r\n]/g, '').replace(/\ +/g, '')
      } else {
        val = input.val()
      }
      if (val === '' || val === undefined) {
        validArr.push('false')
      }
    })
    if (target.val() === '') {
      validArr.push('false')
      this.showTips(target)
    } else {
      this.hideTips(target)
    }

    if (!validArr.length) {
      $('.J_save').removeClass('disabled')
    } else {
      $('.J_save').addClass('disabled')
    }
  }
  showTips(doms) {
    doms.parents('.item-inner').find('.tips').removeClass('fn-hide')
  }
  hideTips(doms) {
    doms.parents('.item-inner').find('.tips').addClass('fn-hide')
  }
}
export default new Page()
