<template>
  <div class="content box">
    <h4>基本信息</h4>
    <template v-if="basicInfo.category == 'all-all' || basicInfo.category == 'dh-zy'">
      <table class='custom-table'>
        <tr>
          <td>订单号：{{basicInfo.serviceNumber}}</td>
          <td>采购商：{{basicInfo.buyerCompany}}</td>
          <td>供应商：
            <template v-if="basicInfo.shopCheck === 1">
              <img src="../../assets/success.png" alt="" width="24" height="24">
            </template>
            <template v-if="basicInfo.shopCheck === 0">
              <img src="../../assets/warning.png" alt="" width="24" height="24">
            </template>
            <template v-if="basicInfo.shopCheck === -1">
              <img src="../../assets/delete.png" alt="" width="24" height="24">
            </template>
            {{basicInfo.shopCompany}}
          </td>
        </tr>
        <tr>
          <td>发布时间：{{basicInfo.createTime | formateTime}}</td>
          <td>采购商发票：{{basicInfo.invoiceStatus == 0 ? '不需要' : '需要'}}</td>
          <td>供应商发票：{{basicInfo.sellerInvoiceStatus == 0 ? '不提供' : '提供'}}</td>
        </tr>
        <tr>
          <td>订单状态：
            <span class="forgive-color">{{basicInfo.statusDesc}}</span>
          </td>
          <td>采购商税点：{{(basicInfo.taxPoint === null || basicInfo.taxPoint
            < 0 || basicInfo.invoiceStatus==0 ) ? '--' : basicInfo.taxPoint + '%'}}</td>
              <td>供应商税点：{{(basicInfo.sellerTaxPoint === null || basicInfo.sellerTaxPoint
                < 0 || basicInfo.sellerInvoiceStatus==0 ) ? '--' : basicInfo.sellerTaxPoint + '%'}}</td>
        </tr>
        <tr>
          <td>订单类型：{{basicInfo.category == 'jb-all'? '剪版' : '大货'}}</td>
          <td>结算周期：{{basicInfo.billingCycle}}</td>
          <td>档口电话：{{basicInfo.shopTel }}</td>
        </tr>
        <tr>
          <td>大货类型：
            <template v-if="basicInfo.type == 1">服务单</template>
            <template v-if="basicInfo.type == 2">贸易单</template>
            <template v-if="basicInfo.type == 3">采购单</template>
          </td>
          <td>跟单员：{{basicInfo.follower}}/{{basicInfo.followerTel}}</td>
          <td>详细地址：{{basicInfo.shopProvince}}{{basicInfo.shopCity}}{{basicInfo.shopArea}}{{basicInfo.shopAddr}}</td>
        </tr>
        <tr>
          <td>实版：{{basicInfo.haveRealVersion == 0 ? '无实版' : '有实版'}}</td>
          <td>买货员：{{basicInfo.purchaser}}/{{basicInfo.purchaserTel }}</td>
          <td>银行账户用户名：{{basicInfo.bankAccountUser}}</td>
        </tr>
        <tr>
          <td>验货：{{basicInfo.checkCloth == 0 ? '不验货' : '验货'}}</td>
          <td>销售员：{{basicInfo.salesName}}/{{basicInfo.salesTel}}</td>
          <td>银行卡卡号：{{basicInfo.bankAccountNumber}}</td>
        </tr>
        <tr>
          <td>货源：{{basicInfo.productSource == 0 ? '现货' : '订货'}}</td>
          <td>采购员：{{basicInfo.guiderName}}/{{basicInfo.guiderTel}}</td>
          <td>银行名称：{{basicInfo.bankAccountBank}}</td>
        </tr>
        <tr>
          <td>跟单员备注：{{basicInfo.followerMessage}}</td>
          <td>付款给供应商：{{basicInfo.needToPaySeller == 0 ? '不需要' : '需要' }}</td>
          <td>开户支行：{{basicInfo.bankAccountBranch}}</td>
        </tr>
        <tr>
          <td>买货员备注：{{basicInfo.purchaserMessage}}</td>
          <td>配送方式：{{basicInfo.sendType == 0 ? '搜芽配送' : '采购商自提'}}</td>
          <td>账户类型：{{basicInfo.bankAccountType == 1 ? '企业' : '个人'}}</td>
        </tr>
        <tr>
          <td>
            <label>码单：</label>
            <article class="media imgShow" v-if='basicInfo.madanImgUrls && basicInfo.madanImgUrls.length'>
              <a :href="'http://test.soouya.com'+ val" class="image media-left" v-lightbox="basicInfo.madanImgUrls" v-for="(val,index) in basicInfo.madanImgUrls" :key="index">
                <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
              </a>
            </article>
          </td>
          <td>自营供应商：{{basicInfo.ziyingShopCompany}}</td>
          <td></td>
        </tr>
      </table>
    </template>
    <template v-else>
      <table class='custom-table'>
        <tr>
          <td>订单号：{{basicInfo.number}}</td>
          <td>码单编号：{{basicInfo.madan}}</td>
          <td>采购商：{{basicInfo.customerCompany}}</td>
        </tr>
        <tr>
          <td>发布时间：{{basicInfo.createTime | formateTime}}</td>
          <td>跟单员：{{basicInfo.followerName}}/{{basicInfo.followerTel}}</td>
          <td>采购商发票：{{basicInfo.needInvoice == 0 ? '不需要' : '需要'}}</td>
        </tr>
        <tr>
          <td>订单状态：
            <span class="forgive-color">{{basicInfo.status | formateStatus}}</span>
          </td>
          <td>剪版员：{{basicInfo.cutterName}}/{{basicInfo.cutterTel }}</td>
          <td>采购商税点：{{basicInfo.taxPoint | formateNumber}}%</td>
        </tr>
        <tr>
          <td colspan="2">订单类型：{{(basicInfo.category == 'all-all' || basicInfo.category == 'dh-zy') ? '大货' : '剪版'}}</td>
          <td>供应商：{{basicInfo.shopCompany}}</td>
        </tr>
        <tr>
          <td colspan="2">跟单员备注：{{basicInfo.followerRemark}}</td>
          <td>档口电话：{{basicInfo.shopTel}}</td>
        </tr>
        <tr>
          <td colspan="2">剪版员备注：{{basicInfo.cutterRemark}}</td>
          <td>详细地址：{{basicInfo.shopProvince}}{{basicInfo.shopCity}}{{basicInfo.shopArea}}{{basicInfo.shopAddr}}</td>
        </tr>
        <tr>
          <td colspan="3">
            <el-row>
              <el-col :span="12" style="border-right:1px solid #ddd">
                <label>码单：</label>
                <article class="media imgShow" v-if='basicInfo.madanUrls && basicInfo.madanUrls.length'>
                  <a :href="'http://test.soouya.com'+ val" class="image media-left is-64x64" v-lightbox="basicInfo.madanUrls" v-for="(val,index) in basicInfo.madanUrls" :key="index">
                    <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="60" height="60">
                  </a>
                </article>
              </el-col>
              <el-col :span="12" style="padding-left: 10px">
                <label>发货凭据：</label>
                <article class="media imgShow" v-if='basicInfo.sendCredentialUrls && basicInfo.sendCredentialUrls.length'>
                  <a :href="'http://test.soouya.com'+ val" class="image media-left is-64x64" v-lightbox="basicInfo.sendCredentialUrls" v-for="(val,index) in basicInfo.sendCredentialUrls" :key="index">
                    <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="60" height="60">
                  </a>
                </article>
              </el-col>
            </el-row>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<style lang="scss">
.content {
  border-radius: 0px;
}

.box {
  margin-top: 10px;
  margin-bottom: 10px;
}

h4 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
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
  margin-bottom: 10px;
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
</style>
<script>
import Lightbox from 'components/lightbox/lightbox'
import {
  formatTimeString,
} from 'src/common/utils.js'
export default {
  components: {
    Lightbox
  },
  props: ['basicData'],
  data() {
    return {
    }
  },
  mounted() {
    console.log('this.basicInfo', this.basicInfo)
  },
  computed: {
    basicInfo() {
      if (this.basicData) {
        return this.basicData
      }
    },
  },
  watch: {},
  filters: {
    formateText(val) {
      if (val == 1) {
        return '采购入仓'
      } else if (val == 2) {
        return '换货入仓'
      } else {
        return '售后入仓'
      }
    },
    formateTime(val) {
      return Number(val) > 0 ? formatTimeString(val) : '--'
    },
    formateStatus(val) {
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
  methods: {}
}
</script>
