<template id="">
<div class="content checkAccountDetail" v-loading.fullscreen="fullscreenLoading">
  <div class="clear" style="height:50px;">
    <!-- <h1 class="title" style="font-size: 25px; padding: 15px; float: left;">{{title}}</h1> -->
    <el-button @click.native="handleReturn" style="float: right;margin-top: 10px;" type="info">返回</el-button>
  </div>
  <div class="content box">
    <h4>对账信息</h4>
    <table class="custom-table">
      <tr>
        <td>对账时间：{{detailData.confirmTime | formateTime}}</td>
        <td>原订单销售货款：
          <template v-if="detailData.category === 'all-all' || detailData.category == 'dh-zy'">
            {{detailData.totalOrderSaleMoney | formateNumber}}元
          </template>
          <template v-else>
            --
          </template>
        </td>
        <td>服务费：{{detailData.totalServiceMoney | formateNumber}}元</td>
        <td>
          <label>采购商付款凭证：</label>
          <article class="media imgShow" v-if='detailData.certificateList && detailData.certificateList.length'>
            <a :href="'http://test.soouya.com'+ val" class="image media-left"
              v-lightbox="detailData.certificateList"
              v-for="val in detailData.certificateList"
              >
              <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
            </a>
          </article>
        </td>
      </tr>
      <tr>
        <td>对账状态：{{detailData.status == 1 ? '待对账' : '已对账'}}</td>
        <td>采购商税款：{{detailData.totalTaxMoney | formateNumber}}</td>
        <td>运费：{{detailData.totalFreightMoney | formateNumber}}元</td>
        <td>采购商付款金额：{{detailData.buyerPayedMoney | formateNumber}}元</td>
      </tr>
      <tr>
        <td>财务收款账户：{{detailData.financeAccount}}</td>
        <td>出仓销售货款：{{detailData.totalSaleMoney | formateNumber}}元</td>
        <td>应收出仓销售货款：{{detailData.totalNeedSaleMoney | formateNumber}}元</td>
        <td>结算备注：{{detailData.content}}</td>
      </tr>
      <tr>
        <td colspan="4" align="right">
        <template v-if="detailData.category === 'jb-all'"><span style="color: #999;">（应收出仓销售货款+运费+服务费+采购商税款）</span>应收款：{{detailData.totalMoney | formateNumber}}元</template>
        <template v-if="detailData.category === 'all-all' || detailData.category == 'dh-zy'"><span style="color: #999;">（应收出仓销售货款+运费）</span>已收款：{{Number(detailData.totalNeedSaleMoney + detailData.totalFreightMoney) | formateNumber}}元</template>
        </td>
      </tr>
    </table>
  </div>
  <template v-if="detailData.category == 'all-all' || detailData.category == 'dh-zy'">
    <order-detail :basicData="basicData"></order-detail>
    <DahuoInformation class="content box" :basicData="basicData"></DahuoInformation>
    <in-reposity  v-if="inReposityList.length" :inReposityList="inReposityList" :quantity="basicData.quantity"></in-reposity>
    <out-reposity  v-if="outReposityList.length" :outReposityList="outReposityList" :inReposityList="inReposityList" :outNumber="outNumber" :freight="true"></out-reposity>
  </template>
  <template v-else>
    <div class="content box">
      <h4>基本信息</h4>
      <table class='custom-table'>
        <tr>
          <td>订单号：{{cutData.number}}</td>
          <td>采购商：{{cutData.customerCompany}}</td>
          <td>供应商：{{cutData.shopCompany}}</td>
        </tr>
        <tr>
          <td>发布时间：{{cutData.createTime | formateTime}}</td>
          <td>采购商发票：{{cutData.needInvoice = 0 ? '不需要' : '需要'}}</td>
          <td>档口电话：{{cutData.shopTel}}</td>
        </tr>
        <tr>
          <td>订单状态：{{cutData.status | formateStatus}}</td>
          <td>采购商税率：{{cutData.taxPoint | formateNumber}}%</td>
          <td>详细地址：{{cutData.shopProvince}}{{cutData.shopCity}}{{cutData.shopArea}}{{cutData.shopAddr}}</td>
        </tr>
        <tr>
          <td>订单类型：{{(cutData.category == 'all-all' || cutData.category == 'dh-zy') ? '大货' : '剪版'}}</td>
          <td>跟单员：{{cutData.followerName}}/{{cutData.followerTel}}</td>
          <td>
            <label>码单：</label>
            <article class="media imgShow" v-if='cutData.madanUrls && cutData.madanUrls.length'>
              <a :href="'http://test.soouya.com'+ val" class="image media-left is-64x64"
                v-lightbox="cutData.madanUrls"
                v-for="val in cutData.madanUrls"
                >
                <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="60" height="60">
              </a>
            </article>
          </td>
        </tr>
        <tr>
          <td>跟单员备注：{{cutData.followerRemark}}</td>
          <td>剪版员：{{cutData.cutterName}}/{{cutData.cutterTel }}</td>
          <td>
            <label>发货凭据：</label>
            <article class="media imgShow" v-if='cutData.sendCredentialUrls && cutData.sendCredentialUrls.length'>
              <a :href="'http://test.soouya.com'+ val" class="image media-left is-64x64"
                v-lightbox="cutData.sendCredentialUrls"
                v-for="val in cutData.sendCredentialUrls"
                >
                <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="60" height="60">
              </a>
            </article>
          </td>
        </tr>
        <tr>
          <td>剪版员备注：{{cutData.cutterRemark}}</td>
          <td>码单编号：{{cutData.madan}}</td>
          <td></td>
        </tr>
      </table>
    </div>
    <CutInformation v-if="cutData.hasOwnProperty('productNumberList')" :cutData="cutData"></CutInformation>
  </template>

  <el-dialog title="图片预览" v-model="previewVisible" ref="dialogPreview">
    <img :src="previewSrc" alt="图片预览" class="preview-img" />
  </el-dialog>
  <lightbox></lightbox>
</div>
</template>

<script>
import {
  newRequest,
  // request,
  formatTimeString,
  getCategoryStr,
  getPayWayStr,
  getSourceStr,
  getFundTypeStr
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
import orderDetail from 'components/detail/orderDetail'
import inReposity from 'components/detail/inReposity'
import outReposity from 'components/detail/outReposity'
import Lightbox from 'components/lightbox/lightbox'
import DahuoInformation from 'components/detail/dahuoInformation'
import CutInformation from 'components/detail/cutInformation'
export default {
  components: {
    Lightbox,
    orderDetail,
    inReposity,
    outReposity,
    DahuoInformation,
    CutInformation
  },
  data () {
    return {
      time: new Date().getTime(),
      title: '',
      id: '', // 分账ＩＤ
      outNumber: '',
      payInfo: {}, // 支付信息
      previewVisible: false, // 图片预览
      previewSrc: '', // 图片预览previewSrc
      detailData: {}, // 分账明细data
      basicData: {}, // 基本信息
      cutData: {}, // 剪版数据
      inReposityList: [], // 入仓单号
      outReposityList: [], // 出仓单号
      fullscreenLoading: true,
      sendbackIncomeForm: {}, // 异常弹出框表单模型
      statusText: '总应收款（元）',
      moneyString: 'totalMoney'
    }
  },
  route: {
    data: function (transition) {
       console.log(transition)
    }
  },
  mounted () {
    this.id = this.$route.params.id;
    this.outNumber = this.$route.query.outNumber;
    this.getDetail();
  },
  filters: {
    formateNumber (val) {
      return (val === null || val === -1) ? '--' : Number(val).toFixed(2)
    },
    formateTime (val) {
      return val ? formatTimeString(val) : '--'
    },
    formateStatus (val) {
      if (val == 200) {
        return '待录入色卡信息'
      } else if (val == 201) {
        return '待提交审核'
      } else if (val == 202) {
        return '待审核'
      } else if (val == 220) {
        return '待发货'
      } else if (val == 221) {
        return '待提交支付'
      } else if (val == 222) {
        return '待销账'
      } else if (val == 223) {
        return '已完成'
      } else if (val == 230) {
        return '已取消'
      } else if (val == 210) {
        return '待报账'
      } else if (val == 211) {
        return '已报账'
      } else {
        return ''
      }
    },
  },
  computed: {
  },
  methods: {
    /**
     * 获取分账明细
     */
    getDetail() {
      const reqUrl = AccountApi.Reconciliation.getPostDetail
      const options = {
        id: this.id
      }
      this.title = '对账明细'
      newRequest({
        url: reqUrl,
        method: 'get',
        data: options
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.detailData = data.obj;
          this.basicData = data.obj.order;
          this.cutData = data.obj.cut;
          this.inReposityList = data.obj.inReposityList;
          this.outReposityList = data.obj.outReposityList;
          this.payInfo = {
            checkedOrder: [data.obj],
            buyerCertificateList: data.obj.certificateList,
            content: data.obj.content,
            buyerPayedMoney: data.obj.buyerPayedMoney
          }
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
    toAdjust() { // 去调整额度
      this.checkYuerDialogVisible = false
      window.open(`/finance/moneyManage/moneyManageDetail?id=${this.customerAccount.id}`)
    },
    getCurrentPayWayStr(row, column) { // 支付方式映射
      console.log('row:', row)
      return getPayWayStr(row.payWay)
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
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.category)
    },
    getSourceStr(row, column) { // 订单来源映射
      return getSourceStr(row.source)
    },
    getFundTypeStr(row, column) { // 款项类型映射
      console.log('row', row)
      return getFundTypeStr(row.fundType)
    },
    payType(row, column) { // 分账类型映射
      return row.payType === 0 ? '垫付' : '实付'
    },
    getInvoiceStatusStr(row, column) { // 采购发票映射
      return row.order.invoiceStatus == 0 ? '不需要' : '需要'
    },
    getPayInvoiceInneedStr(row, column) { // 采购发票映射
      return row.order.payInvoiceInneed == 0 ? '没有' : '有'
    }
  }
}
</script>

<style lang="scss">
  .checkAccountDetail {
    .is-64x64 {
    }
    .clear{
      clear: both;
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
    .fixed-footer{
      position: fixed;
      left: 201px;
      right: 0;
      bottom: 0;
      background: #fff;
      height: 50px;
      padding-top: 10px;
      padding-left: 15px;
    }
    .custom-table{
      width: 100%;
      border-spacing: 0;
      border: 1px solid #ccc;
      border-bottom: 0;
      border-right: 0;
      border-collapse: separate;
      table-layout: fixed;
      text-align: left;
      margin-bottom: 20px;
      th{
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
      td{
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
        label{
          display: inline-block;
          vertical-align: top;
          line-height: 40px;
        }
        p{
          display: inline-block;
          padding-right: 10px;
        }
        .imgShow{
          display: inline-block;
          a{
            margin-right: 5px;
          }
        }
        .left-img{
          float: left;
        }
        .right-info{
          float: right;
          line-height: 40px;
        }
      }
    }
  }
</style>
