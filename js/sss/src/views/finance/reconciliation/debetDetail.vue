<template id="">
<div class="content checkAccountDetail" v-loading.fullscreen="fullscreenLoading">
  <h1 class="title" style="font-size: 25px; padding: 15px">{{title}}</h1>
  <div class="content">
    <h4>支付信息</h4>
    <div class='box'>
      <p>已对账订单</p>
      <el-table :data="payInfo.checkedOrder" border>
        <el-table-column property="confirmPayTime" label="对账日期" :formatter="formatTime" width='170'></el-table-column>
        <el-table-column property="user" label="欠款用户" width='170'></el-table-column>
        <el-table-column inline-template label="欠款用户类型" width='120'>
          <span>{{row.userType == 1 ? '采购商' : '供应商'}}</span>
        </el-table-column>
        <el-table-column property="userNumber" label="用户ID" width='100'></el-table-column>
        <el-table-column inline-template label="应收欠款/元"  width='180'>
          <span>{{Number(row.totalMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="可用余额抵扣/元"  width='190'>
          <span>{{Number(row.available).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="滞纳金/元"  width='180'>
          <span>{{Number(row.lateFee).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="实际应收/元"  width='180'>
          <span>{{Number(row.realTotalMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="实际进账/元"  width='180'>
          <span>{{Number(row.realMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column property="receivedTime" label="进账日期" :formatter="formatTime" width='170'></el-table-column>
        <el-table-column property="financeAccount" label="财务收款账户"  width='190'></el-table-column>
        <el-table-column property="type" label="对账类型" :formatter="getTypeStr"  width='100'></el-table-column>
        <el-table-column property="status" label="对账状态" :formatter="getStatus"  width='100'></el-table-column>
      </el-table>
      <br/>
      <p>采购商付款凭证</p>
      <article class="media" v-for="item in payInfo.buyerCertificateList">
        <div class="media-left">
          <a :href="val.url" class="image is-64x64" v-lightbox="[{url: 'http://www.soouya.com'+item.imgUrl}]" v-for="val in [{url: 'http://www.soouya.com'+item.imgUrl}]">
            <img :src="val.url+'@200h_200w_1e'" alt="Image">
          </a>
        </div>
        <!-- <div class="media-content">
          <div class="content">
            <p>备注：{{item.remark}}</p>
          </div>
        </div> -->
      </article>
      <p style='margin-top: 30px; margin-left: 10px;float: left'>结算备注：{{payInfo.content}}</p>
      <p style='clear: both; padding: 10px  0'>欠款催缴凭证</p>
      <article class="media" v-for="item in payInfo.debtCertificateList">
        <div class="media-left">
          <a :href="val.url" class="image is-64x64" v-lightbox="[{url: 'http://www.soouya.com'+item.imgUrl}]" v-for="val in [{url: 'http://www.soouya.com'+item.imgUrl}]">
            <img :src="val.url+'@200h_200w_1e'" alt="Image">
          </a>
        </div>
        <div class="media-content">
          <div class="content">
            <p>备注：{{item.remark}}</p>
          </div>
        </div>
      </article>
    </div>
  </div>
  <div class="content" v-for="(order, index) in orderList">
    <h4>
      订单详情-{{index+1}}
      <a class="print-btn" :href="'/common/printDetail/'+(order && order.orderNumber)" target="_blank"><el-button type="primary" size="small">打印</el-button></a>
    </h4>
    <div class="box">
      <p> 订单信息：{{order.statusShortDescr}}</p>
      <el-table :data="order.orderInfo" border style='max-width:1452px'>
        <el-table-column property="serviceNumber" label="订单编号" width="200"></el-table-column>
        <el-table-column property="outReposityNumber" label="出仓单号" width="200"></el-table-column>
        <el-table-column property="createTime" label="发布时间" width="170" :formatter="formatTime"></el-table-column>
        <el-table-column property="category" label="订单类型" width="170" :formatter="getCategoryStr"></el-table-column>
        <el-table-column inline-template label="大货类型" width="170">
          <div>{{row.type == 1 ? '服务单' : '贸易单'}}</div>
        </el-table-column>
        <el-table-column property="source" label="订单来源" width="170" :formatter="getSourceStr"></el-table-column>
        <el-table-column inline-template label="跟单员" width="200" show-tooltip-when-overflow v-if='order.showFollower'>
          <div>{{row.follower}}/{{row.followerTel}}</div>
        </el-table-column>
        <el-table-column inline-template label="销售员" width="200" show-tooltip-when-overflow v-if='order.showSales'>
          <div>{{row.salesName}}/{{row.salesTel}}</div>
        </el-table-column>
        <template v-if="order.orderInfo[0].category != 'dhls-all' && order.orderInfo[0].category != 'jb-all'">
          <el-table-column inline-template label="采购商发票" width="170" >
            <div>{{ row.invoiceStatus == '0' ? '不需要' : '需要' }}</div>
          </el-table-column>
          <el-table-column inline-template label="采购商税点" width="170" >
            <div>{{ row.invoiceStatus == '0' ? '--' : Number(row.taxPoint) }}</div>
          </el-table-column>
          <el-table-column inline-template label="供应商发票" width="170" >
            <div>{{ row.payInvoiceInneed == '0' ? '没有' : '有' }}</div>
          </el-table-column>
          <el-table-column inline-template label="供应商税点" width="170" >
            <div>{{ row.payInvoiceInneed == '0' ? '--' : Number(row.sellerTaxPoint) }}</div>
          </el-table-column>
        </template>
        <el-table-column property="sellerLeaveMessage" label="供应商留言" show-tooltip-when-overflow  width="180"></el-table-column>
        <el-table-column property="leaveMessage" label="采购商留言" show-tooltip-when-overflow  width="180"></el-table-column>
      </el-table>
      <br/>
      <p>码单</p>
      <div class="box">
        <article class="media" v-if="order.madanImgUrls.length">
          <!-- <div class="media-left" v-for="item in madan">
            <figure class="image is-64x64"  style='overflow: hidden'@click="openDialog('http://www.soouya.com'+item)">
              <img :src="'http://www.soouya.com'+item" alt="码单">
            </figure>
          </div> -->
          <a :href="val.url" class="image media-left is-64x64"
            v-lightbox="madan"
            v-for="val in madan"
            >
            <img :src="val.url+'@200h_200w_1e'" alt="Image" width="60" height="60">
          </a>
        </article>
      </div>
      <br/>
      <p>供应商基本信息</p>
      <el-table :data="order.seller" border style='max-width:1280px'>
        <el-table-column property="sellerNumber" label="供应商ID" min-width="150"></el-table-column>
        <el-table-column property="sellerCompany" label="供应商店铺名称" min-width="170"></el-table-column>
        <el-table-column property="shopName" label="供应商档口名称" min-width="150" ></el-table-column>
        <el-table-column inline-template label="档口地区" min-width="150" show-tooltip-when-overflow>
          <div>{{row.follower}}{{row.sellerArea}}{{row.sellerCity}}</div>
        </el-table-column>
        <el-table-column property="sellerAddr" label="详细地址" width="300" show-tooltip-when-overflow></el-table-column>
        <el-table-column property="sellerTel" label="档口电话" width="170" ></el-table-column>
      </el-table>
      <br/>
      <div v-if="detailData.userType == 1">
        <p>供应商收款方式</p>
        <el-table :data="order.sellerAccounts" border style='max-width:1280px'>
          <el-table-column property="accountUser" label="银行账号开户名" min-width="150"></el-table-column>
          <el-table-column property="accountBank" label="银行名称" min-width="150"></el-table-column>
          <el-table-column property="accountAddr" label="开户地区" min-width="300" show-tooltip-when-overflow></el-table-column>
          <el-table-column property="accountBranch" label="开户支行" min-width="200"></el-table-column>
          <el-table-column property="accountNumber" label="银行卡号" min-width="170"></el-table-column>
          <el-table-column property="accountType" label="账户类型" min-width="100"></el-table-column>
        </el-table>
        <br/>
        <p>费用明细</p>
        <FeeDetail :order="order" :statusText="statusText" :moneyString="moneyString" :payType="0" v-if="order"></FeeDetail>
      </div>
    </div>
  </div>
  <el-button @click.native="handleReturn">返回</el-button>
  <el-dialog title="图片预览" v-model="previewVisible" ref="dialogPreview">
    <img :src="previewSrc" alt="图片预览" class="preview-img" />
  </el-dialog>
  <lightbox></lightbox>
</div>
</template>

<script>
import {
  request,
  formatTimeString,
  getCategoryStr,
  getPayWayStr,
  getSourceStr,
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
import Lightbox from 'components/lightbox/lightbox'
import FeeDetail from 'components/FeeDetail/feeDetail.vue'
export default {
  components: {
    Lightbox,
    FeeDetail
  },
  fliters: {},
  computed: {
    madan () {
      const arr = []
      if (this.orderList[0]) {
        this.orderList[0].madanImgUrls.map((item) => {
          arr.push({ url: 'http://www.soouya.com' + item })
        })
      }
      return arr
    }
  },
  data () {
    return {
      time: new Date().getTime(),
      title: '',
      id: '', // 分账ＩＤ
      payInfo: {}, // 支付信息
      orderList: [], // 订单详情列表
      replaceOrReturnList: [], // 退换货信息
      previewVisible: false, // 图片预览
      dialogSureShow: false, // 对账
      previewSrc: '', // 图片预览previewSrc
      detailData: {}, // 分账明细data
      dialogFormVisible: false, // 异常弹出框显隐
      fullscreenLoading: true,
      sendbackIncomeForm: {}, // 异常弹出框表单模型
      statusText: '已收欠款（元）',
      moneyString: 'totalMoney'
    }
  },
  route: {
    data: function (transition) {
       console.log(transition)
    }
  },
  mounted () {
    this.payNumber = this.$route.query.payNumber;
    this.id = this.$route.params.id;
    this.getDetail();
  },
  methods: {
    /**
     * 获取分账明细
     */
    getDetail() {
      const reqUrl = AccountApi.PayDebt.getDetail
      const options = {
        id: this.id
      }
      this.title = '账单明细'
      request({
        url: reqUrl,
        method: 'post',
        data: {
          param: JSON.stringify(options)
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.detailData = data.obj;
          this.payInfo = {
            checkedOrder: [data.obj],
            buyerCertificateList: data.obj.buyerCertificateList,
            debtCertificateList: data.obj.debtCertificateList
          }
          if (!data.obj.orderList) {
            data.obj.orderList = []
            data.obj.orderList.push(data.obj.order)
          }
          data.obj.orderList.map((arr, i) => {
            arr.showFollower = arr.category == 'dhls-all' ? !!arr.follower : true
            arr.showSales = arr.category == 'dhls-all' ? !!arr.salesName : true
            arr.outReposityNumber = data.obj.outReposityNumber
            arr.totalMoney = data.obj.totalMoney
            arr.orderInfo = [arr]
            arr.seller = [{
              sellerNumber: arr.sellerNumber,
              sellerCompany: arr.sellerCompany,
              shopName: arr.shopName,
              sellerAddr: arr.sellerAddr,
              sellerProvince: arr.sellerProvince,
              sellerArea: arr.sellerArea,
              sellerCity: arr.sellerCity,
              sellerTel: arr.sellerTel,
            }]
            arr.sellerAccounts = [{
              accountUser: arr.accountUser || arr.replyAccountCompany,
              accountBank: arr.accountBank,
              accountAddr: arr.accountAddr || '',
              accountBranch: arr.accountBranch,
              accountNumber: arr.accountNumber,
              accountType: arr.accountType == 1 ? '企业' : '个人'
            }]
          })
          this.orderList = data.obj.orderList
        } else {
          this.$message({
           type: 'error',
           message: data.msg
          })
        }
      })
    },
    /**
     * 返回列表页
     */
    handleReturn() {
      this.$router.go(-1)
    },
    /**
     * 打开图片预览
     */
    openDialog(src) {
      this.previewSrc = src;
      this.$refs.dialogPreview.open();
    },
    /**
    * 确认对账
    */
    PayGroupConfirmIncome () { // 实款-确认对账
      const self = this
      console.log(this.$route)
      this.$confirm('一旦确认提交，将不可修改。', '确认对账', {
        type: 'warning'
      }).then(() => {
        self.fullscreenLoading = true
        request({
          url: AccountApi.PayDebt.confirmIncome,
          data: {
            payNumber: self.payNumber,
            id: self.id,
            _time: self.time
          },
          method: 'post'
        }).then(res => {
          self.fullscreenLoading = false
          if (res.success == '1') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            self.$router.push('/finance/reconciliation')
          } else {
            res.msg && this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }).catch(() => {
      })
    },
    PayGroupSendbackIncome () { // 实款-对账异常
      const self = this
      const _time = new Date().getTime()
      this.$prompt('请描述异常问题（30个字以内）', '异常', {
        inputPattern: /^\S{0,30}$/,
        inputErrorMessage: '格式不正确'
      }).then(data => {
        self.fullscreenLoading = true
        request({
          url: AccountApi.PayDebt.sendbackIncome,
          data: {
            payNumber: self.payNumber,
            id: self.id,
            exceptionMsg: data.value || '',
            _time: _time
          },
          method: 'post'
        }).then(res => {
          self.fullscreenLoading = false
          if (res.success == '1') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            self.$router.push('/finance/checkAccount?type=-1')
          } else {
            res.msg && this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    getCurrentPayWayStr(row, column) { // 支付方式映射
      console.log('row:', row)
      return getPayWayStr(row.payWay)
    },
    getTypeStr(row, column) { // 对账类型映射
      return '欠款'
    },
    getStatus(row, column) { // 对账状态
      if (row.status) {
        const statusString = {
          '1': '待对账',
          '2': '已对账',
          '101': '已分账',
          '-1': '作废'
        }
        return statusString[String(row.status)]
      } else if (row.payStatus) {
        const statusString = {
          '1': '待对账',
          '2': '已对账',
          '-1': '待对账',
          '-2': '待对账',
        }
        return statusString[String(row.payStatus)]
      }
    },
    formatTime(row, column) { // 格式化时间
      return formatTimeString(row.createTime)
    },
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.category)
    },
    getSourceStr(row, column) { // 订单来源映射
      return getSourceStr(row.source)
    },
    // getStatus(row, column) { // 分账状态
    //   const statusString = {
    //     '1': 'redwood支付',
    //     '2': 'redwood垫付',
    //     '3': 'app线上支付',
    //     '4': 'app线下支付'
    //   }
    //   return statusString[row.status]
    // },
    payType(row, column) { // 分账类型映射
      return row.payType === 0 ? '垫付' : '实付'
    },
    getInvoiceStatusStr(row, column) { // 采购发票映射
      return row.order.invoiceStatus == 0 ? '不需要' : '需要'
    },
    getPayInvoiceInneedStr(row, column) { // 采购发票映射
      return row.order.payInvoiceInneed == 0 ? '没有' : '有'
    },
    showDialogForm(id) { // 设置异常弹出框
      this.dialogFormVisible = true;
    },
    /**
     * 提交对账异常
     */
    submitDialogForm() {
      this.sendbackIncomeForm.id = this.id;
      request({
        url: AccountApi.PayGroupOrderXSendbackIncome,
        method: 'post',
        data: this.sendbackIncomeForm
      }).then(data => {
        // console.log('data', data);
        if (data.success === '1') {
          this.$router.push('/finance/pendingAccount');
        } else {
          this.$message({
            message: data.message,
            type: 'error'
          });
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .checkAccountDetail {
    .is-64x64 {
      overflow: hidden
    }
    .el-table td {
      position: inherit;
    }
    p {
      margin: 10px 0;
    }
    h1 {
      font-size: 20px;
    }
    h4 {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 18px;
    }
    .box {
      margin-left: 10px;
    }
  }
</style>
