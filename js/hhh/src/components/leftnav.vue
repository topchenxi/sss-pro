<template>
  <div class="leftnav ">
    <div class="nav-wrap">
      <div class="title-wrap">
        红杉系统
      </div>
      <div class="menu-wrap scrollbar" :style="{height: windowHeight-160 + 'px'}">
        <el-menu mode="vertical" :default-active="String($route.query.pathIndex) != 'undefined' ? String($route.query.pathIndex) : String($route.meta.index)" theme="dark" :unique-opened="false" class="el-menu-vertical-demo">
          <el-menu-item-group index="14" v-if="orderRoleControl">
            <template slot="title">订单审核</template>
            <router-link :to="{name: 'checkFindList'}" tag="span">
              <el-menu-item index="141"><i class="menu-icon icon-dahuo"></i>订单审核</el-menu-item>
            </router-link>
          </el-menu-item-group>
          <el-menu-item-group index="49" v-if="orderRoleControl">
            <template slot="title">大货</template>
            <router-link :to="{name: 'dhManage'}" tag="span">
              <el-menu-item index="102"><i class="menu-icon icon-dahuo"></i>大货订单</el-menu-item>
            </router-link>
            <router-link :to="{name: 'deliver'}" tag="span">
              <el-menu-item index="2"><i class="menu-icon icon-check"></i>出入仓管理</el-menu-item>
              <!--name待处理  -->
            </router-link>
            <!-- <router-link :to="{name: 'rrWaitCheck'}" tag="span">
              <el-menu-item index="3"><i class="menu-icon icon-returngoods"></i>退换货管理</el-menu-item>
            </router-link> -->
            <router-link :to="{name: 'bulkRRWaitAudit'}" tag="span">
              <el-menu-item index="31"><i class="menu-icon icon-returngoods"></i>退换货管理</el-menu-item>
            </router-link>
            <!-- <router-link :to="{name: 'salesOrder'}" tag="span">
              <el-menu-item index="4"><i class="menu-icon icon-dahuo"></i>大货销售单</el-menu-item>
            </router-link> -->
            <router-link :to="{name: 'salesTicket'}" tag="span">
              <el-menu-item index="4"><i class="menu-icon icon-dahuo"></i>大货销售单</el-menu-item>
            </router-link>
            <router-link :to="{name: 'KsFollowManage'}" tag="span">
              <el-menu-item index="133"><i class="menu-icon icon-koushu"></i>扣数单</el-menu-item>
            </router-link>
          </el-menu-item-group>
          <el-menu-item-group index="1414" v-if="orderRoleControl">
            <template slot="title">剪版</template>
            <!--  <router-link :to="{name: 'jbPublish'}" tag="span">
            <el-menu-item index="491">剪版发布</el-menu-item>
          </router-link> -->
            <!--  <a href="javascript:void(0);" @click="undercarriage">
              <el-menu-item index="9999"><i class="menu-icon icon-jianban"></i>剪版发布</el-menu-item>
            </a> -->
            <router-link :to="{name: 'cutManage'}" tag="span">
              <el-menu-item index="12"><i class="menu-icon icon-jianban"></i>剪版订单</el-menu-item>
            </router-link>
          </el-menu-item-group>
          <el-menu-item-group index="51" v-if="orderRoleControl || checkerRole">
            <template slot="title">找版</template>
            <!--  <a class="link" :href="`${currentUrl}/zhaoBanPublish.html`" target="_blank" v-if="orderRoleControl">
            <el-menu-item index="200">找版发布</el-menu-item>
          </a> -->
            <!-- <a href="javascript:void(0);" @click="undercarriage">
              <el-menu-item index="9998">找版发布</el-menu-item>
            </a> -->
            <a v-if="orderRoleControl" class="link" :href="`${currentUrl}/?category=zb-all`" target="_blank">
              <el-menu-item index="100"><i class="menu-icon icon-dahuo"></i>找版订单</el-menu-item>
            </a>
            <!-- 自营找版 -->
            <!--  <router-link :to="{name: 'zbNotice'}" tag="span" v-if="checkerRole">
              <el-menu-item index="1110">通知找版</el-menu-item>
            </router-link> -->
            <router-link :to="{name: 'checkFindWait'}" tag="span" v-if="checkerRole">
              <el-menu-item index="1113"><i class="menu-icon icon-tongzhi"></i>通知找版</el-menu-item>
            </router-link>
          </el-menu-item-group>
          <el-menu-item-group index="54" v-if="orderRoleControl">
            <template slot="title">货款管理</template>
            <a class="link" :href="`${currentUrl}/orderList.html?Tabkey=cjqk&urgeMoney=1&category=all-all`" target="_blank">
              <el-menu-item index="100"><i class="menu-icon icon-arrears"></i>催缴欠款</el-menu-item>
            </a>
            <router-link :to="{name: 'notifyPayView'}" tag="span">
              <el-menu-item index="7"><i class="menu-icon icon-zijin"></i>通知付款</el-menu-item>
            </router-link>
            <router-link :to="{name: 'refundApply'}" tag="span">
              <el-menu-item index="55"><i class="menu-icon icon-refunds"></i>供应商退款</el-menu-item>
            </router-link>
            <router-link :to="{name: 'payView'}" tag="span">
              <el-menu-item index="9"><i class="menu-icon icon-check"></i>出仓货款核对</el-menu-item>
            </router-link>
            <router-link :to="{name: 'loanSoouyaRefunding'}" tag="span">
              <el-menu-item index="61"><i class="menu-icon icon-chargeback"></i>搜芽退款单</el-menu-item>
            </router-link>
          </el-menu-item-group>
          </el-menu-item-group>
          <!-- 买货员 -->
          <template v-if="buyerRole">
            <router-link :to="{name: 'buyerOrderManage'}" tag="span">
              <el-menu-item index="10">订单管理</el-menu-item>
            </router-link>
            <el-menu-item-group index="">
              <template slot="title">
                <router-link :to="{name: 'buyerWaitCheck'}" style="color:#B2C0CB;text-decoration:none">退换货管理</router-link>
              </template>
              <!-- <router-link :to="{name: 'buyerReject'}" tag="span">
                <el-menu-item index="5">退换货管理</el-menu-item>
              </router-link> -->
              <router-link :to="{name: 'rrSellerRefunding'}" tag="span">
                <el-menu-item index="52">退换货退补款单</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <router-link :to="{name: 'buyerWaitRefund'}" tag="span">
              <el-menu-item index="121">供应商退款</el-menu-item>
            </router-link>
            <router-link :to="{name: 'KsPurcherManage'}" tag="span">
              <el-menu-item index="133"><i class="menu-icon icon-koushu"></i>扣数单</el-menu-item>
            </router-link>
            <router-link :to="{name: 'weixin'}" tag="span">
              <el-menu-item index="119">设置</el-menu-item>
            </router-link>
          </template>
          <template v-if="orderTraceRoleControl">
            <a class="link" :href="'http://testorder.soouya.com/login'" target="_blank">
              <el-menu-item index="120">订单跟踪管理系统</el-menu-item>
            </a>
          </template>
          <el-menu-item-group v-if="cutRole" index="151">
            <template slot="title">订单管理</template>
            <router-link :to="{name: 'cutManage'}" tag="span">
              <el-menu-item index="122"><i class="menu-icon icon-jianban"></i>剪版管理</el-menu-item>
            </router-link>
          </el-menu-item-group>
          <!-- 8.18自营版本更新新增采货员菜单栏 -->
          <!-- router-link to待添加,建议to方法参考上面的to方法，以name作为主要参数 -->
          <!-- 建议以后的版本index以一定规律进行填写，避免出现上面的index混乱的情况 -->
          <template v-if="pickerRole">
            <el-menu-item-group index="85">
              <template slot="title">分拣中心</template>
              <router-link :to="{name: 'pickerOrderList'}" tag="span">
                <el-menu-item index="86"><i class="menu-icon icon-shoufa"></i>收发货管理</el-menu-item>
              </router-link>
              <!-- <router-link :to="{name: 'transportingOrder'}" tag="span">
              <el-menu-item index="86">在途订单</el-menu-item>
            </router-link> -->
            </el-menu-item-group>
          </template>
          <template v-if="guiderRole">
            <el-menu-item-group index="1010">
              <template slot="title">大货</template>
              <router-link :to="{name: 'allOrder', query: { type: 'all' }}" tag="span">
                <el-menu-item index="1011">
                  <i class="menu-icon icon-dahuo"></i> 大货订单
                </el-menu-item>
              </router-link>
              <router-link :to="{name: 'guiderRring'}" tag="span">
                <el-menu-item index="1012"><i class="menu-icon icon-returngoods"></i>退换货管理</el-menu-item>
              </router-link>
              <router-link :to="{name: 'guiderKsManage'}">
                <el-menu-item index="1013"><i class="menu-icon icon-koushu"></i>扣数单</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group index="1020">
              <template slot="title">剪版</template>
              <router-link :to="{name: 'guiderCutList'}" tag="span">
                <el-menu-item index="1021"><i class="menu-icon icon-jianban"></i>剪版订单</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group index="1030">
              <template slot="title">货款管理</template>
              <router-link :to="{name: 'guiderMoneWaitSubmit'}" tag="span">
                <el-menu-item index="1041"><i class="menu-icon icon-check"></i>提交应收</el-menu-item>
              </router-link>
              <router-link :to="{name: 'guidershopcompanyrefunding'}" tag="span">
                <el-menu-item index="1040"><i class="menu-icon icon-refunds"></i>供应商退款</el-menu-item>
              </router-link>
              <router-link :to="{name: 'guiderRrRefunding'}" tag="span">
                <el-menu-item index="1033"><i class="menu-icon icon-chargeback"></i>退换货退补款单</el-menu-item>
              </router-link>
              <router-link :to="{name: 'buyerDebt'}" tag="span">
                <el-menu-item index="1043"><i class="menu-icon icon-arrears"></i>采购商欠款记录</el-menu-item>
              </router-link>
              <router-link :to="{name: 'moneyManageList'}" tag="span">
                <el-menu-item index="1014"><i class="menu-icon icon-zijin"></i>采购商资金管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group index="1050">
              <template slot="title">商品管理</template>
              <router-link :to="{name: 'guiderClothList'}" tag="span">
                <el-menu-item index="1051"><i class="menu-icon icon-goodslist"></i>商品列表</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </template>
          <template v-if="saleControl">
            <el-menu-item-group index="1030">
              <template slot="title">货款管理</template>
              <!-- <router-link :to="{name: 'buyerDebt'}" tag="span">
                <el-menu-item index="1043"><i class="menu-icon icon-arrears"></i>采购商欠款记录</el-menu-item>
              </router-link> -->
              <router-link :to="{name: 'debtOfUncleared'}" tag="span">
                <el-menu-item index="1042"><i class="menu-icon icon-arrears"></i>采购商欠款记录</el-menu-item>
              </router-link>
              <router-link :to="{name: 'moneyManageList'}" tag="span">
                <el-menu-item index="1014"><i class="menu-icon icon-zijin"></i>采购商资金管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </template>
          <template v-if="guiderAdminRole || guiderLeaderRole || guiderAdminRole">
            <el-menu-item-group index="1130">
              <template slot="title">数据统计</template>
              <router-link :to="{name: 'guiderAllBulkList'}" tag="span">
                <el-menu-item index="1032"><i class="menu-icon icon-dahuo"></i>大货小组订单</el-menu-item>
              </router-link>
              <router-link :to="{name: 'guiderAllCutList'}" tag="span">
                <el-menu-item index="1031"><i class="menu-icon icon-jianban"></i>剪版小组订单</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </template>
          <!-- 新登录角色-数据员 -->
          <template v-if="dataClerkRole">
            <el-menu-item-group index="1210">
              <template slot="title">产品中心</template>
              <!-- <router-link :to="{name: 'cardManage'}" tag="span">
                <el-menu-item index="1211">换卡头管理</el-menu-item>
              </router-link> -->
              <router-link :to="{name: 'cardWait'}" tag="span">
                <el-menu-item index="1213"><i class="menu-icon icon-huankatou"></i>换卡头管理</el-menu-item>
              </router-link>
              <!-- <router-link :to="{name: 'findClothList'}" tag="span">
                <el-menu-item index="1212">商品管理</el-menu-item>
              </router-link> -->
              <router-link :to="{name: 'productCardList'}" tag="span">
                <el-menu-item index="1214"><i class="menu-icon icon-goods"></i>商品管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </template>
        </el-menu>
      </div>
      <div class="userinfo-wrap">
        <span class="font-username" :title="userName">{{userName}}</span>
        <span class="icon-logout" @click="logout"></span>
      </div>
    </div>
  </div>
  <!--以上注释均为7.25版本注释，再往后一个版本可删除  -->
</template>
<script>
import { request, getCache } from 'utils/tool';
import AuthSub from 'utils/subNav';
import tokenApi from 'api/account';
export default {
  data() {
    return {
      userName: '',
      height: '',
      nav: {
        follow: {
          index: 1,
          subnav: []
        }
      },
      currentUrl: '',
      omsUrl: ''
    }
  },
  mounted() {
    // 获取用户名
    const currentUser = getCache({ key: 'currentUser' })
    this.currentUserInfo = currentUser.loginInfo
    this.userName = (currentUser && currentUser.loginInfo.user.realName)
    // console.log('test');
    const testUrl = 'http://testmhongshan.soouya.com'
    const proUrl = 'http://mhongshan.soouya.com'
    const testOmsUrl = 'http://testoms.soouya.com'
    const proOmsUrl = 'http://oms.soouya.com'
    const url = location.href
    if (url.indexOf('hspc') > -1 || url.indexOf('testhongshan') > -1) {
      this.currentUrl = testUrl
      this.omsUrl = testOmsUrl
    } else {
      this.currentUrl = proUrl
      this.omsUrl = proOmsUrl
    }
    this.countH()
    window.addEventListener('resize', this.countH)
  },
  methods: {
    undercarriage() {
      this.$message('该功能已下架');
    },
    countH() {
      let windowHeight = document.documentElement.clientHeight;
      this.height = String(windowHeight)
    },
    logout() {
      console.log(1);
      request({
        url: tokenApi.logout,
        data: {},
        method: 'post'
      }, (res) => {
        const that = this
        if (res.success == 1) {
          clearInterval(this.timer)
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1000,
            onClose() {
              sessionStorage.removeItem('currentUser')
              that.$router.push({ name: 'login' })
            }
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    }
  },
  computed: {
    isLogin() {
      return new AuthSub().isLogin()
    },
    pickerRole() {
      return new AuthSub().pickerRole()
    },
    guiderAdminRole() {
      return new AuthSub().guiderAdminRole()
    },
    guiderLeaderRole() {
      return new AuthSub().guiderLeaderRole()
    },
    guiderRole() {
      return new AuthSub().guiderRole()
    },
    checkerRole() {
      return new AuthSub().checkerRole()
    },
    dataClerkRole() {
      return new AuthSub().dataClerkRole()
    },
    cutRole() {
      return new AuthSub().cutRole()
    },
    buyerRole() {
      return new AuthSub().buyerRole()
    },
    buyerLeaderRole() {
      return new AuthSub().buyerLeaderRole()
    },
    orderRoleControl() { // 订单管理
      return new AuthSub().orderRoleControl()
    },
    deliverRoleControl() { // 发货管理
      return new AuthSub().deliverRoleControl()
    },
    returnReplaceRoleControl() { // 退换货管理
      return new AuthSub().returnReplaceRoleControl()
    },
    payRoleControl() { // 支付
      return new AuthSub().payRoleControl()
    },
    billRoleControl() { // 账单管理
      return new AuthSub().billRoleControl()
    },
    orderTraceRoleControl() {
      return new AuthSub().orderTraceRoleControl()
    },
    saleControl() {
      return new AuthSub().saleRole()
    }
  },
  updated() {}
}

</script>
<style lang="scss">


</style>
