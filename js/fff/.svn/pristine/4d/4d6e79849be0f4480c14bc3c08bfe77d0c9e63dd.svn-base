<template id="">
  <div class="content" v-loading.fullscreen="fullscreenLoading">
    <i class="el-icon-arrow-left goback-icon" @click="handleReturn">返回</i>
    <div class="content box">
      <span class="detail-title">分账信息：</span>
      <span>已分账时间：{{detailData.transactionTime | formateTime}}</span>
      <table class="custom-table">
        <tr>
          <td>分账状态：
            <span class="forgive-color">{{detailData.payStatus | formatePayStatus}}</span>
          </td>
          <td>
            应付款：
            <span class="red-color">{{detailData.toPayMoney | formateNumber}}</span>元
          </td>
          <td>采购商税款：{{detailData.taxMoney | formateNumber}}元</td>
          <td>定金：
            <template v-if="detailData.fundType === 2">{{detailData.earnestMoney | formateNumber}}元</template>
            <template v-else>--</template>
          </td>
        </tr>
        <tr>
          <td>款项类型：{{detailData.fundType | formatefundType}}</td>
          <td>采购商付款金额：{{detailData.buyerPayedMoney | formateNumber}}元</td>
          <td>已付定金：
            <template v-if="detailData.fundType === 3">{{detailData.payedEarnestMoney | formateNumber}}元</template>
            <template v-else>--</template>
          </td>
          <td>供应商税款：{{detailData.sellerTaxMoney | formateNumber}}元</td </tr>
          <tr>
            <td>成本货款：
              <template v-if="detailData.fundType === 5">{{detailData.costMoney | formateNumber}}元</template>
              <template v-else>--</template>
            </td>
            <td>尾款：
              <template v-if="detailData.fundType === 3">{{detailData.finalMoneySoouyaToSeller | formateNumber}}元</template>
              <template v-else>--</template>
            </td>
            <td>通知付款备注：{{detailData.content}}</td>
            <td :colspan="1">财务分账备注：{{detailData.descr}}</td>
          </tr>
          <tr>
            <td :colspan="4">
              <label>搜芽付款凭证：</label>
              <article class="media imgShow" v-if='detailData.sellerCertificateList && detailData.sellerCertificateList.length'>
                <a :href="'http://test.soouya.com'+ val.imgUrl " class="image media-left" v-lightbox="detailData.sellerCertificateList" v-for="(val, index) in detailData.sellerCertificateList" :key="index">
                  <img :src="'http://test.soouya.com'+ val.imgUrl +'@200h_200w_1e'" alt="Image" width="40" height="40">
                </a>
              </article>
            </td>
          </tr>
          <tr>
            <td colspan="4" align="left">
              <label>采购商付款凭证：</label>
              <article class="media imgShow" v-if="detailData.buyerCertificateList && detailData.buyerCertificateList.length">
                <a :href="'http://test.soouya.com'+ val.imgUrl " class="image media-left" v-lightbox="detailData.buyerCertificateList" v-for="(val,index) in detailData.buyerCertificateList" :key="index">
                  <img :src="'http://test.soouya.com'+ val.imgUrl +'@200h_200w_1e'" alt="Image" width="40" height="40">
                </a>
              </article>
            </td>
          </tr>
      </table>
    </div>
    <div class="basic-print">
      <a class="print-btn" :href="`/common/printDetail/${(detailData && basicData.orderNumber)}`" target="_blank">
        <el-button style="width:100px;" type="primary" size="mini">打印</el-button>
      </a>
      </h4>
      <order-detail :basicData="basicData"></order-detail>
    </div>
    <DahuoInformation class="content box" :basicData="basicData"></DahuoInformation>
    <!--  <el-button type="primary" @click.native="handleDispatch">分账</el-button> -->
    <!--   <el-button v-if='detailData[0] && detailData[0].payType === 2' type="danger" @click.native="showDialogForm">异常</el-button> -->
    <el-dialog title="图片预览" v-model="previewVisible" ref="dialogPreview">
      <img :src="previewSrc" alt="图片预览" class="preview-img" />
    </el-dialog>
    <lightbox></lightbox>
  </div>
</template>

<script>
import {
  newRequest,
  getPayWayStr,
  formatTimeString,
  getCategoryStr,
  getSourceStr,
  getFundTypeStr,
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
import { Message } from 'element-ui'
import orderDetail from 'components/detail/orderDetail'
import Lightbox from 'components/lightbox/lightbox'
import DahuoInformation from 'components/detail/dahuoInformation'
import FootInfomation from 'components/detail/footInfomation'
export default {
  components: {
    orderDetail,
    Lightbox,
    FootInfomation,
    DahuoInformation
  },
  data() {
    return {
      imgPath: 'http://test.soouya.com',
      id: '', // 分账ＩＤ
      previewVisible: false, // 图片预览
      previewSrc: '', // 图片预览previewSrc
      detailData: {}, // 分账明细data
      basicData: {}, // 基本信息
      dialogFormVisible: false, // 异常弹出框显隐
      fullscreenLoading: true,
      sendbackIncomeForm: {}, // 异常弹出框表单模型
      statusText: '已付款（元）',
      moneyString: 'toPayMoney'
    }
  },
  computed: {
    totalCost() {
      let cost = 0
      if (this.basicData.colorList) {
        this.basicData.colorList.forEach((item) => {
          cost += Number(item.quantity * item.price)
        })
      }
      return Number(cost).toFixed(2)
    },
  },
  filters: {
    formateNumber(val) {
      return Number(val).toFixed(2)
    },
    formateTime(val) {
      return val && Number(val) > 0 ? formatTimeString(val) : '--'
    },
    formatePayStatus(val) {
      if (val == 1) {
        return '待收款'
      } else if (val == 2) {
        return '待分账'
      } else if (val == 100) {
        return '分账中'
      } else if (val == 101) {
        return '已分账'
      } else if (val == -1) {
        return '作废'
      } else if (val == -2) {
        return '未启用'
      } else {
        return ''
      }
    },
    formatefundType(val) {
      if (val == 2) {
        return '定金'
      } else if (val == 3) {
        return '尾款'
      } else if (val == 5) {
        return '全款'
      } else if (val == 7) {
        return '补款'
      } else {
        return ''
      }
    },
  },
  mounted() {
    this.id = this.$route.params.id; // 分账ID
    this.getDetail();
  },
  methods: {
    /**
     * 获取分账明细
     */
    getDetail() {
      newRequest({
        url: AccountApi.PayGroupOrderX.getDetail,
        method: 'get',
        data: { id: this.id }
      }).then(data => {
        // console.log('data', data);
        if (data.success === '1') {
          this.fullscreenLoading = false;
          data.obj.showFollower = data.obj.order.category == 'dhls-all' ? !!data.obj.order.follower : true
          data.obj.showSales = data.obj.order.category == 'dhls-all' ? !!data.obj.order.salesName : true
          data.obj.order.toPayMoney = data.obj.toPayMoney
          this.detailData = data.obj;
          this.basicData = data.obj.order;
          this.basicData.colorList = data.obj.order.colorList;
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
.basic-print {
  position: relative;
  .print-btn {
    float: right;
    margin-top: 30px;
    margin-right: 50px;
  }
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

.fixed-footer {
  position: fixed;
  left: 201px;
  right: 0;
  bottom: 0;
  background: #fff;
  height: 50px;
  padding-top: 10px;
  padding-left: 15px;
}

.custom-table {
  width: 100%;
  border-spacing: 0;
  border: 1px solid #ccc;
  border-bottom: 0;
  border-right: 0;
  border-collapse: separate;
  table-layout: fixed;
  text-align: left;
  margin-bottom: 20px;
  th {
    white-space: nowrap;
    overflow: hidden;
    background-color: #fff;
    height: 20px;
    line-height: 40px;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    color: #1f2d3d;
    padding: 0 10px;
  }
  tr {
    height: 35px;
  }
  td {
    padding: 5px 10px;
    font-size: 14px;
    position: relative;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    min-width: 0;
    min-width: 100px;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    label {
      display: inline-block;
      vertical-align: top;
      line-height: 40px;
    }
    p {
      display: inline-block;
      padding-right: 10px;
    }
    .imgShow {
      display: inline-block;
      a {
        margin-right: 5px;
      }
    }
    .left-img {
      float: left;
    }
    .right-info {
      float: right;
      line-height: 40px;
    }
  }
}

.box {
  margin-left: 10px;
}

.box {
  .media {
    overflow: hidden;
  }
}
</style>
