<template id="">
<div class="content" v-loading.fullscreen="fullscreenLoading">
  <h1 class="title" style="font-size: 25px; padding: 15px">已退款明细</h1>

  <div class="content">
    <h4>总退款明细</h4>
    <div class='box'>
      <el-table :data="detailData" border>
        <el-table-column property="buyerReplenishmentMoney" label="采购商补款金额小计（元）" min-width='170'></el-table-column>
        <el-table-column property="soouyaRefundMoney" label="搜芽退款金额小计（元）" min-width='200'></el-table-column>
        <el-table-column property="debtMoney" label="已退小计（元）" min-width='180'></el-table-column>
      </el-table>
    </div>
  </div>

  <div class="content">
    <h4>
      订单详情
      <a class="print-btn" :href="'/common/printDetail/'+(detailData[0] && detailData[0].order.orderNumber)" target="_blank"><el-button type="primary" size="small">打印</el-button></a>
    </h4>
    <div class="box">
      <p> 订单信息：{{detailData[0] && detailData[0].order && detailData[0].order.statusShortDescr}} </p>
      <el-table :data="detailData" border v-if="detailData.length">
        <el-table-column property="order.serviceNumber" label="订单编号" width="200" show-tooltip-when-overflow></el-table-column>
        <el-table-column inline-template label="发布时间" width="160">
          <div>{{row.order.createTime | commonformatTime}}</div>
        </el-table-column>
        <el-table-column property="order.category" label="订单类型" :formatter="getCategoryStr"  show-tooltip-when-overflow></el-table-column>
        <el-table-column inline-template label="大货类型">
          <div>
            <template v-if="row.order.type == '1'">服务单</template>
            <template v-if="row.order.type == '2'">贸易单</template>
            <template v-if="row.order.type == '0'">错误类型</template>
          </div>
        </el-table-column>
        <el-table-column property="order.fundType" label="款项类型" :formatter="getFundTypeString" show-tooltip-when-overflow></el-table-column>
        <el-table-column property="order.source" label="订单来源" :formatter="getSourceStr" show-tooltip-when-overflow> </el-table-column>
        <el-table-column property="payType" label="对账类型" :formatter="payType" show-tooltip-when-overflow> </el-table-column>
        <el-table-column inline-template label="跟单员"  width="180" show-tooltip-when-overflow v-if="detailData.length && detailData[0].order.follower">
          <div>{{row.order && row.order.follower}} {{row.order && row.order.followerTel}}</div>
        </el-table-column>
        <el-table-column inline-template label="销售员" show-tooltip-when-overflow v-if="detailData.length && detailData[0].order.salesName">
          <div>{{row.order && row.order.salesName}} {{row.order && row.order.salesTel}}</div>
        </el-table-column>
        <!-- v-if="detailData.length && detailData[0].order.category == 'all-all'" -->
        <el-table-column property="order.invoiceStatus" label="采购发票" :formatter="getInvoiceStatusStr" ></el-table-column>
        <el-table-column inline-template  label="税点"  width="100" show-tooltip-when-overflow>
          <div>{{row.order && row.order.taxPoint}}%</div>
        </el-table-column>
        <!-- v-if="detailData.length && detailData[0].order.category == 'all-all'" -->
        <el-table-column inline-template label="供应商发票" width="100" >
          <div>
            <template v-if="row.order.sellerInvoiceStatus == '0'">没有</template>
            <template v-if="row.order.sellerInvoiceStatus == '1'">有</template>
          </div>
        </el-table-column>
        <el-table-column property="order.sellerMessage" label="供应商留言" show-tooltip-when-overflow  width="180"></el-table-column>
        <el-table-column property="order.leaveMessage" label="采购商留言" show-tooltip-when-overflow  width="180"></el-table-column>
      </el-table>
      <div class="content" style="margin-top: 20px">
        <p>码单</p>
        <div class="box">
          <article class="media" v-if="detailData.length">
            <a :href="val.url" class="image media-left is-64x64"
              v-lightbox="madan"
              v-for="val in madan"
              >
              <img :src="val.url+'@200h_300w_1e'" alt="Image" width="60" height="60">
            </a>
          </article>
        </div>
      </div>
      <div class="content">
        <p>采购商基本信息</p>
        <el-table :data="detailData" border>
          <el-table-column property="order.buyerNumber" label="采购商ID"></el-table-column>
          <el-table-column property="order.buyerCompany" label="采购商公司名称" width="150" show-tooltip-when-overflow></el-table-column>
          <el-table-column property="order.buyerTel" label="公司电话" show-tooltip-when-overflow></el-table-column>
          <el-table-column inline-template label="公司地址" show-tooltip-when-overflow>
            <span>{{row.order && row.order.buyerProvince}}{{row.order && row.order.buyerCity}}{{row.order && row.order.buyerArea}}{{row.order && row.order.buyerAddr}}</span>
          </el-table-column>
        </el-table>
      </div>

      <div class="content">
        <p>采购商收款方式</p>
        <el-table :data="detailData" border v-if="detailData.length">
          <el-table-column property="order.accountUser" label="银行账号开户名"  ></el-table-column>
          <el-table-column property="order.accountBank" label="银行名称" ></el-table-column>
          <el-table-column property="order.accountAddr" label="开户地区" ></el-table-column>
          <el-table-column property="order.accountBranch" label="开户支行" ></el-table-column>
          <el-table-column property="order.accountNumber" label="银行卡号"></el-table-column>
          <el-table-column inline-template label="账户类型"  width="100">
            <span>{{row.order && row.order.accountType == 1 ? '企业' : '个人'}}</span>
          </el-table-column>
        </el-table>
      </div>

      <div class="content">
        <p>费用明细</p>
        <FeeDetail :order="detailData[0].order" :statusText="statusText" :moneyString="moneyString" :payType="1" v-if="detailData[0] && detailData[0].order"></FeeDetail>
      </div>
    </div>
  </div>
  <!--退换货信息-->
  <div class="content" v-for="(order, index) in replaceOrReturnList">
    <h4>
      退换货信息-{{index+1}}
    </h4>
    <div class="box">
      <p>退换类型</p>
      <el-table v-if="order && order.type == 1" :data="[order]" border>
        <el-table-column inline-template label="退换类型">
          <span>退货</span>
        </el-table-column>
        <el-table-column inline-template label="退换货单号">
          <span>{{row.number}}</span>
        </el-table-column>
        <el-table-column inline-template label="退货原因">
          <span>{{row.reason}}</span>
        </el-table-column>
        <el-table-column inline-template label="跟单员备注">
          <span>{{row.followerRemark}}</span>
        </el-table-column>
        <el-table-column inline-template label="买货员备注">
          <span>{{row.purchaserRemark}}</span>
        </el-table-column>
      </el-table>
      <el-table v-if="order && order.type == 2" :data="[order]" border>
        <el-table-column inline-template label="退换类型">
          <span>换货</span>
        </el-table-column>
        <el-table-column inline-template label="退换货单号">
          <span>{{row.number}}</span>
        </el-table-column>
        <el-table-column inline-template label="换货原因">
          <span>{{row.reason}}</span>
        </el-table-column>
        <el-table-column inline-template label="跟单员备注">
          <span>{{row.followerRemark}}</span>
        </el-table-column>
        <el-table-column inline-template label="买货员备注">
          <span>{{row.purchaserRemark}}</span>
        </el-table-column>
      </el-table>
      <br/>
      <div>
        <p>退款费用</p>
        <el-table v-if="order && order.type == 1" :data="[order]" border>
          <el-table-column inline-template label="退货销售货款/元">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="退货税费/元">
            <span>{{Number(row.taxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="退货服务费/元">
            <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column v-if="order.buyerDebtMoneyType == 1" inline-template label="搜芽退款金额/元">
            <span>{{Number(row.buyerDebtMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column v-if="order.buyerDebtMoneyType == 2" inline-template label="采购商补款金额/元">
            <span>{{Number(row.buyerDebtMoney).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
        <el-table v-if="order && order.type == 2" :data="[order]" border>
          <el-table-column inline-template label="换货销售货款/元">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="换货税费/元">
            <span>{{Number(row.taxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="换货服务费/元">
            <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column v-if="order.buyerDebtMoneyType == 1" inline-template label="搜芽退款金额/元">
            <span>{{Number(row.buyerDebtMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column v-if="order.buyerDebtMoneyType == 2" inline-template label="采购商补款金额/元">
            <span>{{Number(row.buyerDebtMoney).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  <!--/退换货信息-->

 <!--  <el-button type="primary" @click.native="handleDispatch">分账</el-button> -->
<!--   <el-button v-if='detailData.length && detailData[0].payType === 2' type="danger" @click.native="showDialogForm">异常</el-button> -->
  <el-button @click.native="handleReturn">返回</el-button>
  <el-dialog title="图片预览" v-model="previewVisible" ref="dialogPreview">
    <img :src="previewSrc" alt="图片预览" class="preview-img"/>
  </el-dialog>
  <lightbox></lightbox>
</div>
</template>

<script>
import {
  request,
  getPayWayStr,
  formatTimeString,
  getCategoryStr,
  getSourceStr,
  getFundTypeStr,
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
import FeeDetail from 'components/FeeDetail/feeDetail.vue'
import Lightbox from 'components/lightbox/lightbox'
export default {
  components: {
    FeeDetail,
    Lightbox
  },
  data () {
    return {
      imgPath: 'http://www.soouya.com',
      id: '', // 分账ＩＤ
      previewVisible: false, // 图片预览
      previewSrc: '', // 图片预览previewSrc
      detailData: [], // 分账明细data
      dialogFormVisible: false, // 异常弹出框显隐
      fullscreenLoading: true,
      sendbackIncomeForm: {}, // 异常弹出框表单模型
      replaceOrReturnList: [],
      statusText: '已收款',
      moneyString: 'totalMoney'
    }
  },
  computed: {
    madan () {
      const arr = []
      this.detailData[0].order.madanImgUrls.map((item) => {
        arr.push({ url: 'http://www.soouya.com' + item })
      })
      return arr
    }
  },
  mounted () {
    this.id = this.$route.params.id; // 分账ID
    this.getDetail();
  },
  filters: {
    commonformatTime (val) {
      return formatTimeString(val)
    }
  },
  methods: {
    /**
     * 获取分账明细
     */
    getDetail() {
      request({
        url: AccountApi.BuyerRefund.getDetail,
        method: 'post',
        data: {
          param: JSON.stringify({ id: this.id })
        }
      }).then(data => {
        console.log('data', data);
        if (data.success === '1') {
          this.fullscreenLoading = false;
          this.detailData = [data.obj];
          // const obj = [
          //  {
          //     'type': 1,
          //     'number': 'TH16092110620602',
          //     'reason': '退换原因',
          //     'followerRemark': '跟单员备注留言',
          //     'purchaserRemark': '买货员备注留言',
          //     'saleMoney': 10,
          //     'taxMoney': 10,
          //     'serviceMoney': 10,
          //     'totalMoney': 10,
          //     'totalMoneyType': 1
          //   },
          //   {
          //      'type': 2,
          //      'number': 'TH16092110620602',
          //      'reason': '换货原因在这里啊',
          //      'followerRemark': '跟单员备注留言',
          //      'purchaserRemark': '买货员备注留言',
          //      'saleMoney': 10,
          //      'taxMoney': 10,
          //      'serviceMoney': 10,
          //      'totalMoney': 10,
          //      'totalMoneyType': 2
          //    }
          // ]  测试数据，需要看效果，打开就行了
          this.replaceOrReturnList = data.obj.replaceOrReturnList
          // this.replaceOrReturnList = obj
        } else {
          this.$message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    /**
     * 分账
     */
    // handleDispatch() {
    //   this.$router.push('/finance/pendingAccount/list/' + this.id)
    // },
    /**
     * 返回列表页
     */
    handleReturn() {
      this.$router.push('/refund/refunded')
    },
    /**
     * 打开图片预览
     */
    openDialog(src) {
      this.previewSrc = src;
      this.$refs.dialogPreview.open();
    },
    getPayWayStr(row, column) { // 支付方式映射
      return getPayWayStr(row.payWay)
    },
    formatconfirmPayTime(row, column) { // 格式化时间
      return formatTimeString(row.confirmPayTime)
    },
    formatCreateTime(row, column) { // 格式化时间
      return formatTimeString(row.order.createTime)
    },
    formatTransactionTime(row, column) { // 格式化时间
      return formatTimeString(row.transactionTime)
    },
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.order.category)
    },
    getSourceStr(row, column) { // 订单来源映射
      return getSourceStr(row.order.source)
    },
    getFundTypeString(row, column) { // 款项类型映射
      return getFundTypeStr(Number(row.order.fundType))
    },
    payStatus(row, column) { // 分账状态
      return '已分账'
    },
    payType(row, column) { // 分账类型映射
      return row.payType === 0 ? '欠款' : '实款'
    },
    getInvoiceStatusStr(row, column) { // 采购发票映射
      return row.order.invoiceStatus === 0 ? '不需要' : '需要'
    },
    getPayInvoiceInneedStr(row, column) { // 采购发票映射
      return row.order.payInvoiceInneed === 0 ? '没有' : '有'
    },
    showDialogForm(id) { // 设置异常弹出框
      this.dialogFormVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
 .is-64x64 {
  overflow: hidden
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
 .print-btn {
   margin-left: 10px;
 }
 .box {
   margin-left: 10px;
 }
</style>
