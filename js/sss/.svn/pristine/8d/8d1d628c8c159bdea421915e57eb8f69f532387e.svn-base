<template id="">
<div class="content" v-loading.fullscreen="fullscreenLoading">
  <h1 class="title" style="font-size: 25px; padding: 15px">分账明细</h1>
  <div class="content"> <!-- 实付 -->
    <h4>支付信息</h4>
    <div class="box" v-if="detailData[0] && detailData[0].payWay === 'offline'"><!-- 线下 -->
      <p>采购商付款凭证</p>
      <article class="media" v-for="item in detailData[0].buyerCertificateList">
        <div class="media-left">
          <!-- <figure class="image is-64x64" @click="openDialog('http://www.soouya.com'+item.imgUrl)">
            <img :src="'http://www.soouya.com'+item.imgUrl" alt="Image">
          </figure> -->
          <a
            :href="val.url"
            class="image is-64x64"
            v-lightbox="[{url: imgPath + item.imgUrl}]"
            v-for="val in [{url: imgPath + item.imgUrl}]">
            <img :src="val.url+'@200h_200w_1e'" alt="Image">
          </a>
        </div>
        <!-- <div class="media-content">
          <div class="content">
            <p>备注：{{item.remark}}</p>
          </div>
        </div> -->
      </article>
      <p style='margin-top: 30px; margin-left: 10px; float: left'> 结算备注：{{detailData[0].content}} </p>
      <br/>
      <br/>
      <p style="clear:both; padding: 10px 0;">搜芽付款凭证</p>
      <article class="media" v-for="item in detailData[0].sellerCertificateList">
        <div class="media-left">
          <!-- <figure class="image is-64x64" @click="openDialog('http://www.soouya.com'+item.imgUrl)">
            <img :src="'http://www.soouya.com'+item.imgUrl" alt="Image">
          </figure> -->
          <a
            :href="val.url"
            class="image is-64x64"
            v-lightbox="[{url: imgPath + item.imgUrl}]"
            v-for="val in [{url: imgPath + item.imgUrl}]">
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
    <div class="box" v-if="detailData[0] && detailData[0].payWay !== 'offline'">
      <p> 采购商付款信息 </p>
      <el-table :data="detailData" border>
        <el-table-column property="payWay" label="支付方式" :formatter="getPayWayStr"></el-table-column>
        <el-table-column property="confirmPayTime" label="支付日期" :formatter="formatconfirmPayTime"></el-table-column>
        <el-table-column property="order.serviceNumber" label="订单号"></el-table-column>
        <el-table-column property="payNumber" label="支付流水号"></el-table-column>
      </el-table>
      <p>搜芽付款凭证</p>
      <article class="media" v-for="item in detailData[0].sellerCertificateList">
        <div class="media-left">
          <figure class="image is-64x64" @click="openDialog('http://www.soouya.com'+item.imgUrl)">
            <img :src="'http://www.soouya.com'+item.imgUrl" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>备注：{{item.remark}}</p>
          </div>
        </div>
      </article>
    </div>
  </div>
  <div class="content">
    <h4>订单详情
    <a class="print-btn" :href="`/common/printDetail/${(detailData[0] && detailData[0].order.orderNumber)}`" target="_blank"><el-button type="primary" size="small">打印</el-button></a></h4>
    <div class="box">
      <p> 订单信息：{{detailData[0] && detailData[0].order && detailData[0].order.statusShortDescr}}</p>
      <el-table :data="detailData" border>
        <el-table-column property="transactionTime" label="分账日期" width="170" :formatter="formatTransactionTime"></el-table-column>
        <el-table-column property="order.serviceNumber" label="订单号" width="200" show-tooltip-when-overflow></el-table-column>
        <!-- <el-table-column property="payNumber" label="支付编号/入金" width="200" show-tooltip-when-overflow></el-table-column> -->
        <el-table-column property="transactionNo" label="支付流水号/出金" width="200" show-tooltip-when-overflow></el-table-column>
        <el-table-column property="order.createTime" label="发布时间" width="170" :formatter="formatCreateTime"  show-tooltip-when-overflow></el-table-column>
        <el-table-column property="order.buyerCompany" label="采购商" show-tooltip-when-overflow> </el-table-column>
        <el-table-column property="order.shopName" label="供应商" width="150" show-tooltip-when-overflow> </el-table-column>
        <!-- <el-table-column property="payType" label="分账类型" :formatter="payType" show-tooltip-when-overflow> </el-table-column> -->
        <el-table-column property="order.fundType" label="款项类型" :formatter="getFundTypeString" show-tooltip-when-overflow></el-table-column>
        <el-table-column property="payStatus" label="分账状态" :formatter="payStatus" show-tooltip-when-overflow> </el-table-column>
        <el-table-column property="payWay" label="采购商支付方式" :formatter="getPayWayStr" show-tooltip-when-overflow  width="150"></el-table-column>
        <el-table-column inline-template label="财务收款账户" width="200" show-tooltip-when-overflow>
          <div style='text-align:center;'>
            <span>{{row.financeBank}}</span><span style="margin-left:15px">{{row.financeAccount}}</span>
          </div>
        </el-table-column>
        <el-table-column property="order.category" label="订单类型" :formatter="getCategoryStr"  show-tooltip-when-overflow></el-table-column>
        <el-table-column inline-template label="大货类型" width="100">
            <div>{{row.order.type == 1 ? '服务单' : '贸易单'}}</div>
        </el-table-column>
        <el-table-column property="order.source" label="订单来源" :formatter="getSourceStr" show-tooltip-when-overflow> </el-table-column>
        <el-table-column inline-template label="跟单员" width="180" show-tooltip-when-overflow v-if="detailData[0] && detailData[0].showFollower">
          <div>{{row.order && row.order.follower}}/{{row.order && row.order.followerTel}}</div>
        </el-table-column>
        <el-table-column inline-template label="销售员" width="180" show-tooltip-when-overflow v-if="detailData[0] && detailData[0].showSales">
          <div>{{row.order && row.order.salesName}} {{row.order && row.order.salesTel}}</div>
        </el-table-column>
        <el-table-column inline-template label="采购商发票" width="100" >
          <div>{{ row.order.invoiceStatus == '0' ? '不需要' : '需要' }}</div>
        </el-table-column>
        <el-table-column inline-template label="采购商税点" width="100" >
          <div>{{ row.order.invoiceStatus == '0' ? '--' : Number(row.order.taxPoint).toFixed(2) }}</div>
        </el-table-column>
        <el-table-column inline-template label="供应商发票" width="100" >
          <div>{{ row.order.payInvoiceInneed == '0' ? '没有' : '有' }}</div>
        </el-table-column>
        <el-table-column inline-template label="供应商税点" width="100" >
          <div>{{ row.order.payInvoiceInneed == '0' ? '--' : Number(row.order.sellerTaxPoint).toFixed(2) }}</div>
        </el-table-column>

        <el-table-column property="order.sellerLeaveMessage" label="供应商留言" show-tooltip-when-overflow  width="180"></el-table-column>
        <el-table-column property="order.leaveMessage" label="采购商留言" show-tooltip-when-overflow  width="180"></el-table-column>
      </el-table>
      <p v-if='detailData.length && detailData[0].payType === 0'>垫付备注： {{detailData[0].order.content}}</p>
    </div>
  </div>

  <div class="content">
    <h4>码单</h4>
    <div class="box">
      <article class="media" v-if="detailData[0]">
        <!--
        <div class="media-left" v-for="item in detailData[0].order.madanImgUrls">
          <figure class="image is-64x64 " @click="openDialog('http://www.soouya.com'+item)">
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
  </div>

  <div class="content">
    <h4>供应商基本信息</h4>
    <el-table :data="detailData" border >
      <el-table-column property="order.sellerNumber" label="供应商ID"></el-table-column>
      <el-table-column property="order.sellerCompany" label="供应商店铺名称" width="150" show-tooltip-when-overflow></el-table-column>
      <el-table-column property="order.shopName" label="供应商档口名称" show-tooltip-when-overflow></el-table-column>
      <el-table-column inline-template label="档口地区" show-tooltip-when-overflow>
        <span>{{row.order && row.order.sellerProvince}}{{row.order && row.order.sellerCity}}{{row.order && row.order.sellerArea}}</span>
      </el-table-column>
      <el-table-column property="order.sellerAddr" label="详细地址" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="order.sellerTel" label="档口电话" show-tooltip-when-overflow> </el-table-column>
    </el-table>
  </div>

  <div class="content">
    <h4>供应商收款方式</h4>
    <el-table :data="detailData" border>
      <el-table-column property="order.replyAccountUser" label="银行账号开户名" min-width="130"></el-table-column>
      <el-table-column property="order.replyAccountBank" label="银行名称"  min-width="100"></el-table-column>
      <el-table-column property="order.replyAccountAddr" label="开户地区"  min-width="120"></el-table-column>
      <el-table-column property="order.replyAccountBranch" label="开户支行" min-width="200"></el-table-column>
      <el-table-column property="order.replyAccountNumber" label="银行卡号"  min-width="200"></el-table-column>
      <el-table-column inline-template label="账户类型"  width="100">
        <div>{{row.order && row.order.accountType == '2' ? '个人' : '企业'}}</div>
      </el-table-column>
    </el-table>
  </div>

  <div class="content">
    <h4>费用明细</h4>
    <FeeDetail :order="detailData[0].order" :statusText="statusText" :moneyString="moneyString" :payType="10" v-if="detailData[0] && detailData[0].order"></FeeDetail>
  </div>

 <!--  <el-button type="primary" @click.native="handleDispatch">分账</el-button> -->
<!--   <el-button v-if='detailData[0] && detailData[0].payType === 2' type="danger" @click.native="showDialogForm">异常</el-button> -->
  <el-button @click.native="handleReturn" style='margin-top: 15px;'>返回</el-button>
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
import { Message } from 'element-ui'
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
      statusText: '已付款（元）',
      moneyString: 'toPayMoney'
    }
  },
  computed: {
    madan () {
      const arr = []
      if (this.detailData[0]) {
        this.detailData[0].order.madanImgUrls.map((item) => {
          arr.push({ url: 'http://www.soouya.com' + item })
        })
      }
      return arr
    }
  },
  mounted () {
    this.id = this.$route.params.id; // 分账ID
    this.getDetail();
  },
  methods: {
    /**
     * 获取分账明细
     */
    getDetail() {
      request({
        url: AccountApi.PayGroupOrderX.getDetail,
        method: 'post',
        data: {
          param: JSON.stringify({ id: this.id })
        }
      }).then(data => {
        // console.log('data', data);
        if (data.success === '1') {
          this.fullscreenLoading = false;
          data.obj.showFollower = data.obj.order.category == 'dhls-all' ? !!data.obj.order.follower : true
          data.obj.showSales = data.obj.order.category == 'dhls-all' ? !!data.obj.order.salesName : true
          data.obj.order.toPayMoney = data.obj.toPayMoney
          this.detailData = [data.obj];
        } else {
          Message({
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
      this.$router.push('/finance/splitAccount')
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
      return row.payType === 0 ? '垫付' : '实付'
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
 .print-btn {
   margin-left: 10px;
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
</style>
