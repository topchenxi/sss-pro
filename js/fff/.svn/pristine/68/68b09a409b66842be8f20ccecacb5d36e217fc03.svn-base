<template>
  <section v-loading.body="fullscreenLoading" class="body-content">
    <i class="el-icon-arrow-left goback-icon" @click="$router.go(-1)">返回</i>
    <!-- <el-button type="primary" size="small" style="float:right">返回</el-button> -->
    <!-- <h1>详情页</h1> -->
    <div class="payDetail-content">
      <span class="detail-title">支付信息：</span>
      <span>支付时间：{{obj.payTime | formatTime}}</span>
      <table border="1">
        <tbody>
          <tr>
            <td width="25%">支付状态：
              <span v-if="obj.payStatus == 1" class="forgive-color">支付成功</span>
            </td>
            <td width="25%">
              <template v-if="obj.category == 'cut'">--</template>
              <template v-else>应收出仓销售货款：{{obj.needSaleMoney | formateNumber}}元</template>
            </td>
            <td width="25%">
              <template v-if="obj.category == 'cut'">--</template>
              <template v-else>原订单销售货款：{{obj.orderSaleMoney | formateNumber}}元</template>
            </td>
            <td width="25%">支付来源：
              <template v-if="obj.paySource == 1">客户支付</template>
              <template v-if="obj.paySource == 2">采购代付</template>
              <template v-if="obj.paySource == 3">财务代付</template>
            </td>
          </tr>
          <tr>
            <td colspan="2">支付金额：{{(Number(obj.needSaleMoney) + Number(obj.freightMoney)) | formateNumber}}
              <span style="color:#999;float:right">(应收出仓销售货款+运费)</span>
            </td>
            <td>
              <template v-if="obj.category == 'cut'">--</template>
              <template v-else>出仓销售货款：{{obj.saleMoney | formateNumber}}元</template>
            </td>
            <td>支付方式：
              <template v-if="obj.creditType == 1">搜芽额度</template>
              <template v-if="obj.creditType == 2">白条额度</template>
              <template v-if="obj.creditType == 3">余额</template>
              <template v-if="obj.creditType == 4">雁阵额度</template>
            </td>
          </tr>
          <tr>
            <td colspan="2" rowspan="2" align="left">
              <label>付款/垫付凭据：</label>
              <article class="media imgShow" v-if='obj.payCredentialUrls && obj.payCredentialUrls.length'>
                <a :key="val" :href="'http://test.soouya.com'+ val" class="image media-left" v-lightbox="obj.payCredentialUrls" v-for="val in obj.payCredentialUrls">
                  <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
                </a>
              </article>
              <article class="media imgShow" v-if='obj.prepayCredentialUrls && obj.prepayCredentialUrls.length'>
                <a :key="val" :href="'http://test.soouya.com'+ val" class="image media-left" v-lightbox="obj.prepayCredentialUrls" v-for="val in obj.prepayCredentialUrls">
                  <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
                </a>
              </article>
            </td>
            <td colspan="2">运费：{{obj.freightMoney | formateNumber}}元({{obj.freightMoneyNoTax | formateNumber}}元)</td>
          </tr>
          <tr>
            <!-- 暂定为空 -->
            <td colspan="2">结算备注:</td>
          </tr>
        </tbody>
      </table>
    </div>
    <order-detail v-if="obj.category != 'cut'" :basicData="obj.order" class="orderDetail-content"></order-detail>
    <order-detail v-if="obj.category == 'cut'" :basicData="obj.cut" class="orderDetail-content"></order-detail>
    <DahuoInformation v-if="obj.category != 'cut'" class="content box" :basicData="obj.order"></DahuoInformation>
    <CutInformation v-if="obj.category == 'cut'" class="content box" :cutData="obj.cut"></CutInformation>
    <in-reposity v-if="obj.inReposityList && obj.inReposityList.length" :inReposityList="obj.inReposityList" :quantity="obj.order.quantity"></in-reposity>
    <out-reposity v-if="obj.outReposityList && obj.outReposityList.length" :outReposityList="obj.outReposityList" :inReposityList="obj.inReposityList" :outNumber="outNumber" :freight="true"></out-reposity>
    <lightbox></lightbox>
  </section>
</template>

<script>
import DahuoInformation from 'components/detail/dahuoInformation'
import CutInformation from 'components/detail/cutInformation'
import { newRequest } from 'common/utils'
import OrderDetail from 'components/detail/orderDetail.vue'
import Lightbox from 'components/lightbox/lightbox'
import inReposity from 'components/detail/inReposity'
import outReposity from 'components/detail/outReposity'
export default {
  components: {
    'order-detail': OrderDetail,
    Lightbox,
    inReposity,
    outReposity,
    CutInformation,
    DahuoInformation,
  },
  data() {
    return {
      fullscreenLoading: false,
      id: '',
      outNumber: '',
      obj: {
        order: {},
        inReposityList: [],
        outReposityList: [],
        payCredentialUrls: [],
        prepayCredentialUrls: [],
      },
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    getData() {
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/reconciliation/getDetail',
        data: {
          id: this.id
        },
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.obj = res.obj
        } else {
          this.$message.error(res.msg)
        }
        this.fullscreenLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.body-content {
  padding-bottom: 150px;
  h1 {
    font-size: 25px;
    border-bottom: 2px solid #bbb;
  }
  .payDetail-content {
    background-color: #fff;
    border: 1px solid #ccc;
    margin-top: 10px;
    padding: 20px;
    table {
      border-collapse: collapse;
      word-break: break-all;
      width: 100%;
      border: 0px;
      td {
        border-color: #bbb;
        padding: 10px;
      }
    }
  }
  .productDetail-content {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 20px;
    table {
      border-collapse: collapse;
      word-break: break-all;
      width: 100%;
      border: 0px;
      text-align: center;
      th {
        text-align: center;
        border-color: #bbb;
        padding: 10px;
      }
      td {
        border-color: #bbb;
        padding: 10px;
      }
      tr:last-child {
        text-align: right;
      }
      span {
        font-size: 13px;
        margin-right: 5px;
      }
    }
  }
}
</style>
