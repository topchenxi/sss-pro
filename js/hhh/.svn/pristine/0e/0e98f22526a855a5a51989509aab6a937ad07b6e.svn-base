import { getCache } from './tool'
// 角色控制class
export default class AuthSub {
  constructor() {
    this.isRole = []
    this.getRoleInfo()
  }
  getRoleInfo() {
    const currentUser = getCache({ key: 'currentUser' })
    const loginInfo = currentUser.loginInfo
    for (let k in loginInfo) {
      if (loginInfo[k]) {
        this.isRole.push(k)
      }
    }
  }
  commonRole(targetArr) {
    const that = this
    let flag = false
    targetArr.map((item) => {
      that.isRole.map((val) => {
        if (item == val) {
          flag = true
        }
      })
    })
    return flag
  }
  isLogin() {
    const currentUser = getCache({ key: 'currentUser' })
    return currentUser != undefined
  }
  // 8.18自营版本新增登录角色
  pickerRole() {
    const roleControlArr = [
      'woodPicker',
    ]
    return this.commonRole(roleControlArr)
  }
  guiderRole() {
    const roleControlArr = [
      'woodGuider',
    ]
    return this.commonRole(roleControlArr)
  }
  guiderLeaderRole() {
    const roleControlArr = [
      'woodGuiderLeader',
    ]
    return this.commonRole(roleControlArr)
  }
  guiderAdminRole() {
    const roleControlArr = [
      'woodGuiderAdmin',
    ]
    return this.commonRole(roleControlArr)
  }
  // 自营新增登录角色-审核员
  checkerRole() {
    const roleControlArr = [
      'woodZbAuditor',
    ]
    return this.commonRole(roleControlArr)
  }
  dataClerkRole() {
    const roleControlArr = [
      'woodDataClerk',
    ]
    return this.commonRole(roleControlArr)
  }
  cutRole() { // 剪版员
    const roleControlArr = [
      'woodCutCloth',
      'woodCutClothLeader'
    ]
    return this.commonRole(roleControlArr)
  }
  buyerRole() { // 买货员
    const roleControlArr = [
      'woodPurchaser',
      //  'woodPurchaserLeader',
      'woodAdmin'
    ]
    return this.commonRole(roleControlArr)
  }
  buyerLeaderRole() {
    const roleControlArr = [
      'woodPurchaserLeader'
    ]
    return this.commonRole(roleControlArr)
  }
  orderRoleControl() { // 订单管理权限
    const roleControlArr = [
      'woodFollowLeader',
      'woodAdmin'
    ]
    return this.commonRole(roleControlArr)
  }
  orderTraceRoleControl() { // 订单跟踪管理权限
    const roleControlArr = [
      // 'woodFollowLeader',
      'woodFollowTeamLeader',
      // 'woodCutClothLeader',
      'woodFinance',
      'woodAdmin',
      'woodPurchaserLeader'
    ]
    return this.commonRole(roleControlArr)
  }
  bindWeixinRoleControl() { // showWeixin
    const roleControlArr = [
      'woodFollowLeader',
      'woodPurchaser'
    ]
    return this.commonRole(roleControlArr)
  }
  deliverRoleControl() { // 发货管理权限
    const roleControlArr = [
      'woodFollowLeader',
      'woodAdmin'
    ]
    return this.commonRole(roleControlArr)
  }
  returnReplaceRoleControl() { // 退换货管理权限
    const roleControlArr = [
      'woodFollowLeader',
      'woodAdmin'
    ]
    return this.commonRole(roleControlArr)
  }
  payRoleControl() { // 支付权限
    const roleControlArr = [
      'woodFollowLeader',
      'woodAdmin'
    ]
    return this.commonRole(roleControlArr)
  }
  billRoleControl() { // 账单管理权限
    const roleControlArr = [
      'woodFollowLeader',
      'woodAdmin'
    ]
    return this.commonRole(roleControlArr)
  }
  saleRole() {
    const roleControlArr = [
      'woodSales',
      'woodSalesLeader'
    ]
    return this.commonRole(roleControlArr)
  }
}
