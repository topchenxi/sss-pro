<template id="">
<div class="content checkAccountDetail" v-loading.fullscreen="fullscreenLoading">
  <h1 class="title" style="font-size: 25px; padding: 15px">{{title}}</h1>
  <div class="content">
    <h4>支付信息</h4>
    <div class='box'>
      <p>已对账订单</p>
      <el-table :data="payInfo.checkedOrder" border>
        <el-table-column property="createTime" label="对账时间" :formatter="formatTime" width='170'></el-table-column>
        <el-table-column property="buyerCompany" label="采购商" width='170'></el-table-column>
        <el-table-column property="buyerNumber" label="采购商ID" width='170'></el-table-column>
        <el-table-column inline-template label="总销售货款/元" width='220'>
          <span>{{row.totalSaleMoney.toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="总采购商税款/元" width='220'>
          <span>{{row.totalTaxMoney.toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="总服务费/元" width='220'>
          <span>{{row.totalServiceMoney.toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="总应收款/元" width='220'>
          <span>{{row.totalMoney.toFixed(2)}}</span>
        </el-table-column>
        <el-table-column property="payWay" label="采购商支付方式" :formatter="getCurrentPayWayStr"  width='140'></el-table-column>
        <el-table-column property="status" label="对账状态" :formatter="getStatus"  width='100'></el-table-column>
        <el-table-column property="financeAccount" label="财务收款账户"  width='190'></el-table-column>
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
    </div>
  </div>
  <div class="content" v-for="(order, index) in orderList">
    <h4>
      订单详情-{{index+1}}
      <a class="print-btn" :href="'/common/printDetail/'+(order && order.orderNumber)" target="_blank"><el-button type="primary" size="small">打印</el-button></a>
    </h4>
    <div class="box">
      <p> 订单信息：{{order.statusShortDescr}}</p>
      <el-table :data="order.orderInfo" border>
        <el-table-column property="serviceNumber" label="订单编号" width="200"></el-table-column>
        <el-table-column property="outReposityNumber" label="出仓单号" width="200"></el-table-column>
        <el-table-column property="createTime" label="发布时间" width="170" :formatter="formatTime"></el-table-column>
        <el-table-column property="category" label="订单类型" width="170" :formatter="getCategoryStr"></el-table-column>
        <el-table-column inline-template label="大货类型" width="170">
          <div>{{row.type == 1 ? '服务单' : '贸易单'}}</div>
        </el-table-column>
        <!-- <el-table-column property="fundType" label="款项类型" width="170" :formatter="getFundTypeStr"></el-table-column> -->
        <el-table-column property="source" label="订单来源" width="170" :formatter="getSourceStr"></el-table-column>
        <el-table-column inline-template label="跟单员" width="200" show-tooltip-when-overflow v-if='order.showFollower'>
          <div>{{row.follower}}/{{row.followerTel}}</div>
        </el-table-column>
        <el-table-column inline-template label="销售员" width="200" show-tooltip-when-overflow v-if='order.showSales'>
          <div>{{row.salesName}}/{{row.salesTel}}</div>
        </el-table-column>
        <template v-if="order.orderInfo[0].category != 'dhls-all' && order.orderInfo[0].category != 'jb-all'">
          <el-table-column inline-template label="采购商发票" width="100" >
            <div>{{ row.invoiceStatus == '0' ? '不需要' : '需要' }}</div>
          </el-table-column>
          <el-table-column inline-template label="采购商税点" width="100" >
            <div>{{ row.invoiceStatus == '0' ? '--' : Number(row.taxPoint).toFixed(2) }}</div>
          </el-table-column>
          <el-table-column inline-template label="供应商发票" width="100" >
            <div>{{ row.payInvoiceInneed == '0' ? '没有' : '有' }}</div>
          </el-table-column>
          <el-table-column inline-template label="供应商税点" width="100" >
            <div>{{ row.payInvoiceInneed == '0' ? '--' : Number(row.sellerTaxPoint).toFixed(2)}}</div>
          </el-table-column>
        </template>
        <el-table-column property="sellerLeaveMessage" label="供应商留言" show-tooltip-when-overflow  width="180"></el-table-column>
        <el-table-column property="leaveMessage" label="采购商留言" show-tooltip-when-overflow  width="180"></el-table-column>
      </el-table>
      <br/>
      <p>码单</p>
      <div class="box">
        <article class="media" v-if="order.madanImgUrls.length">
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
        <el-table-column property="sellerNumber" label="供应商ID" width="150"></el-table-column>
        <el-table-column property="sellerCompany" label="供应商店铺名称" width="170"></el-table-column>
        <el-table-column property="shopName" label="供应商档口名称"></el-table-column>
        <el-table-column inline-template label="档口地区" width="150" show-tooltip-when-overflow>
          <div>{{row.follower}}{{row.sellerArea}}{{row.sellerCity}}</div>
        </el-table-column>
        <el-table-column property="sellerAddr" label="详细地址" width="300" show-tooltip-when-overflow></el-table-column>
        <el-table-column property="sellerTel" label="档口电话" width="170" ></el-table-column>
      </el-table>
      <br/>
      <div>
        <p>供应商收款方式</p>
        <el-table :data="order.sellerAccounts" border style='max-width:1280px'>
          <el-table-column property="replyAccountUser" label="银行账号开户名" min-width="150"></el-table-column>
          <el-table-column property="replyAccountBank" label="银行名称" min-width="150"></el-table-column>
          <el-table-column property="replyAccountAddr" label="开户地区" min-width="300" show-tooltip-when-overflow></el-table-column>
          <el-table-column property="replyAccountBranch" label="开户支行" min-width='200'></el-table-column>
          <el-table-column property="replyAccountNumber" label="银行卡号" min-width="170"></el-table-column>
          <el-table-column property="accountType" label="账户类型" width="100"></el-table-column>
        </el-table>
        <br/>
        <p>费用明细</p>
        <FeeDetail :order="order" :statusText="statusText" :moneyString="moneyString" :payType="1" v-if="order"></FeeDetail>
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
  getFundTypeStr,
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
      previewVisible: false, // 图片预览
      dialogSureShow: false, // 对账
      previewSrc: '', // 图片预览previewSrc
      detailData: {}, // 分账明细data
      dialogFormVisible: false, // 异常弹出框显隐
      fullscreenLoading: true,
      sendbackIncomeForm: {}, // 异常弹出框表单模型
      statusText: '已收款（元）',
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
     * 返回列表页
     */
    handleReturn() {
      this.$router.go(-1)
    },
    /**
     * 获取分账明细
     */
    getDetail() {
      const reqUrl = AccountApi.Reconciliation.getPostDetail
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
        // console.log('data', data);
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.detailData = data.obj;
          this.payInfo = {
            checkedOrder: [data.obj],
            buyerCertificateList: data.obj.buyerCertificateList,
            content: data.obj.content
          }
          if (!data.obj.orderList) {
            data.obj.orderList = []
            data.obj.orderList.push(data.obj.order)
          }
          data.obj.orderList.map((obj, i) => {
            obj.showFollower = obj.category == 'dhls-all' ? !!obj.follower : true
            obj.showSales = obj.category == 'dhls-all' ? !!obj.salesName : true
            obj.orderInfo = [obj]
            console.log('obj.orderInfo:', obj.orderInfo)
            obj.seller = [{
              sellerNumber: obj.sellerNumber,
              sellerCompany: obj.sellerCompany,
              shopName: obj.shopName,
              sellerAddr: obj.sellerAddr,
              sellerProvince: obj.sellerProvince,
              sellerArea: obj.sellerArea,
              sellerCity: obj.sellerCity,
              sellerTel: obj.sellerTel,
            }]
            obj.sellerAccounts = [{
              replyAccountUser: obj.replyAccountUser || obj.replyAccountCompany,
              replyAccountBank: obj.replyAccountBank,
              replyAccountAddr: obj.replyAccountAddr || '',
              replyAccountBranch: obj.replyAccountBranch,
              replyAccountNumber: obj.replyAccountNumber,
              accountType: obj.accountType == 1 ? '企业' : '个人'
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
     * 打开图片预览
     */
    openDialog(src) {
      this.previewSrc = src;
      this.$refs.dialogPreview.open();
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
    getFundTypeStr(row, column) { // 款项类型映射
      return getFundTypeStr(row.fundType)
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
