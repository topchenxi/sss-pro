/**
 * 指派
 */
import '../../common/base'
import { getParam, imgPath, clearListCache} from '../../common/utils'
import seedApi from '../../api/seed'
import OrderApi from '../../api/order'
class AssignTask {
  constructor () {
    this._time = new Date().getTime()
    let status = getParam('taskNumber')
    // -- 指派询价 ---买货组长 taskNumber 0
    //  --- 指派提货 -- 提货组长 taskNumber 1
    //  --- 指派验货 --验货组长  taskNumber 2
    //  --- 指派发货 -- 物流组长 taskNumber 3
    //  --- 指派换货 --提货组长 taskNumber 4

    //  --- 指派找版 --找版组长 taskNumber 5
    //  --- 指派剪版 --剪版组长 taskNumber 6
    //  --- 指派找版组长 --找版大组长 taskNumber 7
    this.doms = {}
    this.orderNumber = getParam('orderNumber')
    this.doms.container = ('#assignTask')
    this.doms.head = $('.J_assign_head', this.doms.container)
    this.doms.listMan = $('.J_assign_man', this.doms.container)
    this.doms.saveBtn = $('.J_save', this.doms.container)
    this.doms.formsList = $('.J_assign_man', this.doms.container)
    this.renderList(status)
    this.save(status)
    console.log('initTime', this._time)
  }
  renderList(status) {
    let obj ={}
    obj.status = status
    switch (~~status) {
      case 0:
          obj.url = seedApi.listPurchaser
          obj.title = '指派询价'
          obj.topTitle = '选择买货员'
          break
      case 1:
          obj.url = seedApi.listDeliver
          obj.title = '指派提货'
          obj.topTitle = '选择提货员'
          break
      case 2:
          obj.url = seedApi.listChecker
          obj.title = '指派验货'
          obj.topTitle = '选择验货员'
          break
      case 3:
          obj.url = seedApi.listSender
          obj.title = '指派发货'
          obj.topTitle = '选择发货员'
          break
      case 4:
          obj.url = seedApi.listDeliver
          obj.title = '指派换货'
          obj.topTitle = '选择换货员'
          break
      case 5:
          obj.url = seedApi.listClothHunter
          obj.title = '指派找版'
          obj.topTitle = '选择找版员'
          break
      case 6:
          obj.url = seedApi.listCutCloth
          obj.title = '指派剪版'
          obj.topTitle = '选择剪版员'
          break
      case 7:
          obj.url = seedApi.listClothHunterLeader
          obj.title = '指派找版'
          obj.topTitle = '选择找版组长'
          break
    }
    this.reqList(obj)
  }
  reqList(params) {
    let that = this
    let doms = this.doms
    let resData = {
      title: params.title,
      status: params.status,
      topTitle: params.topTitle
    }
    request({
      url: params.url,
      data: {
        _time: this._time
      },
      cache: false,
      callback: (data) => {
        if (data.success === '1' && data.page.result.length > 0) {
          let headTpl = 'assignTask/assignHead.html'
          let assignListTpl = 'assignTask/assignList.html'
          resData.result = data.page.result
          resData.imgPath = imgPath
          nunjucks.render(headTpl, resData).then((headHtml) => {
            doms.head.html(headHtml)
            that.goBack()
          })
          nunjucks.render(assignListTpl, resData).then((listManHtml) => {
            doms.listMan.html(listManHtml)
            that.listenTask()
          })
        } else {
          $.toast(data.msg)
        }
      }
    })
  }
  goBack() {
    const that = this
    $('.J_goBack').on('click', () => {
      that.goBackLink()
    })
  }
  // 监听
  listenTask() {
    let doms = this.doms
    $('.J_click').on('click', () => {
      doms.saveBtn.removeClass('disabled')
    })
  }
  save(status) {
    let that = this
    let doms = this.doms
    let url
    switch (~~status) {
      case 0:
        url = OrderApi.assignAskPrice
        break
      case 1:
        url = OrderApi.assignDeliver
        break
      case 2:
        url = OrderApi.assignCheck
        break
      case 3:
        url = OrderApi.assignSend
        break
      case 4:
        url = OrderApi.assignReplace
        break
      case 5:
        // 指派找版
        url = OrderApi.assignZb
        break
      case 6:
        // 指派剪版
        url = OrderApi.assignJb
        break
      case 7:
        // 找版大组长指派小组长
        url = OrderApi.assignZbZz
        break
    }
    doms.saveBtn.on('click', () => {
      let params = {}
      params.orderNumber = that.orderNumber
      params._time = that._time

      let values = $('.J_assign_man').serializeArray()
      values.map((items) => {
        if (items.value) {
          params[items.name] = items.value
        }
      })
      params.content = String($('textarea[name="content"]').val()).replace(/[\r\n]/g, '').replace(/\ +/g, '')
      if (params.content.length > 50) {
        $.toast('任务备注不能超过五十个字')
        return false
      }
      if (!params['id']) {
        return
      }
      $.showPreloader();
      request({
        url,
        data: params,
        callback: (data) => {
          $.hidePreloader()
          if (data.success == 1) {
            $.toast(data.msg)
            clearListCache()
            this.goBackLink()
          } else {
            $.toast(data.msg)
          }
        }
      })
    })
  }
  goBackLink() {
    let source = getParam('source')
    let url = decodeURIComponent(source)
    location.href = url
  }
}
export default new AssignTask()
