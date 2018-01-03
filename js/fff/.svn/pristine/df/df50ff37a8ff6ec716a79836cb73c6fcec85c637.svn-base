<template>
<div class='dsf-detail' v-loading.body="fullscreenLoading">
  <!-- <h1 class="title" style="font-size: 25px; padding: 15px">详情页</h1> -->
  <div class="content box">
    <h4>销账信息</h4>
    <table class="custom-table">
      <tr>
        <td>进入待销账时间：{{detailData.createTime | formateTime}}</td>
        <td>销账人员：{{detailData.creatorName}}/{{detailData.creatorTel }}</td>
        <td>销账类型：{{detailData.type | formateType}}</td>
        <td>
          <label>物流凭据：</label>
          <article class="media imgShow" v-if='detailData.sendCertificateList && detailData.sendCertificateList.length'>
            <a :href="'http://test.soouya.com'+ val" class="image media-left"
              v-lightbox="detailData.sendCertificateList"
              v-for="val in detailData.sendCertificateList"
              >
              <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
            </a>
          </article>
        </td>
      </tr>
      <tr>
        <td colspan="4" align="right"><span style="color: #999;">（报销运费））</span>报销金额：{{detailData.xiaozhangMoney | formateNumber}}元</td>
      </tr>
    </table>
  </div>

  <order-detail :basicData="basicData"></order-detail>
  <div class="content box">
    <h4>商品信息</h4>
    <table class="custom-table">
      <tr>
        <th>色号</th>
        <th>采购数量</th>
        <th>成本单价</th>
        <th>销售单价</th>
        <th>成本小计</th>
        <th>销售小计</th>
      </tr>
      <tr v-for="item in basicData.colorList">
        <td>{{item.color}}</td>
        <td>{{item.quantity}}{{item.quantityUnit}}</td>
        <td>{{item.price}}{{item.priceUnit}}</td>
        <td>{{item.salePrice}}{{item.salePriceUnit}}</td>
        <td>{{Number(item.quantity * item.price).toFixed(2)}}元</td>
        <td>{{Number(item.quantity * item.salePrice).toFixed(2)}}元</td>
      </tr>
      <tr>
        <td colspan="6" align="right">
          货号：{{basicData.productNumber}}&nbsp;&nbsp;采购总数：{{basicData.quantity}}{{basicData.quantityUnit}} &nbsp;&nbsp;销售货款：{{basicData.saleMoney}}元 &nbsp;&nbsp;毛利率：{{basicData.maoliPoint | formateNumber}}%&nbsp;&nbsp;|&nbsp;&nbsp;
          <template v-if="basicData.type = 1">服务费单价：{{basicData.servicePrice | formateNumber}}{{basicData.servicePriceUnit}} &nbsp;&nbsp;服务费：{{basicData.serviceMoney | formateNumber}}</template>
          &nbsp;&nbsp;采购商税款：{{basicData.taxMoney | formateNumber}}元 &nbsp;&nbsp;供应商税款：{{basicData.sellerTaxMoney | formateNumber}}元
        </td>
      </tr>
    </table>
  </div>
  <in-reposity  v-if="inReposityList.length" :inReposityList="inReposityList" :quantity="basicData.quantity"></in-reposity>
  <out-reposity  v-if="outReposityList.length" :outReposityList="outReposityList" :outData="true"></out-reposity>

  <section class='fixed-footer'>
    <el-button type='primary' @click.prevent="xiaoZhangShow(detailData)">销账</el-button>
    <el-button @click.prevent="back">返回</el-button>
  </section>

  <lightbox></lightbox>
  <!-- 收款销账弹窗提示 -->
  <el-dialog title="提示" v-model="xiaozhangDialog.show" :close-on-click-modal="true">
    <span style='padding: 20px 0; font-size: 20px'> 确认与销账人员进行销账 ?</span>
    <div style='text-align: left; padding-left: 20px; padding-top: 20px;'>
      <span>销账金额:  <span style='margin-left: 15px'>{{xiaozhangDialog.row.xiaozhangMoney > 0 ? '+' : ''}}{{Number(xiaozhangDialog.row.xiaozhangMoney || 0).toFixed(2)}}</span></span> <br/><br/><br/>
      <template v-if='xiaozhangDialog.row.xiaozhangMoney >= 0'>
        <span style='color: red'>*</span>实际退款金额: <span class='real-money' style='margin-left: 15px'><el-input type="text" v-model='xiaozhangDialog.form.shishouTkMoney' placeholder="请输入正值"></el-input></span>
      </template>
      <template v-else>
        <el-radio class="radio" v-model="xiaozhangDialog.form.fukuanType" label="1">现金销账</el-radio>
        <el-radio class="radio" v-model="xiaozhangDialog.form.fukuanType" label="2">线上转账</el-radio>
      </template>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="xiaozhangDialog.show = false">取 消</el-button>
      <el-button type="primary" @click.native="xiaoZhangSave" :disabled='!(xiaozhangDialog.form.shishouTkMoney > 0 || xiaozhangDialog.row.xiaozhangMoney < 0)'>确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<style lang="scss">
  .dsf-detail {
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
    .el-tabs__content {
      position: static
    }
    .el-table td .cell {
      padding: 5px;
    }
    .line{
      height: 1px;
      border-bottom: 1px solid dashed;
    }
    .red{
      color: red;
    }
    .real-money{
      display: inline-block;
      width: 200px
    }
}
</style>
<script>
import HeadFilter from 'components/headFilter/HeadFilter.vue'
import pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
import orderDetail from 'components/detail/orderDetail'
import inReposity from 'components/detail/inReposity'
import outReposity from 'components/detail/outReposity'
import {
  request,
  newRequest,
  formatTimeString,
  getCache,
  setCache,
} from 'src/common/utils.js'
import _ from 'lodash'
import AccountApi from 'api/account.js'
import { Message } from 'element-ui'
export default {
  components: {
    HeadFilter,
    Lightbox,
    pagination,
    orderDetail,
    inReposity,
    outReposity
  },
  data() {
    return {
      time: new Date().getTime(),
      currentTab: 1,
      fullscreenLoading: false,
      detailData: {}, // 分账明细data
      basicData: {}, // 基本信息
      inReposityList: [], // 入仓单号
      outReposityList: [], // 出仓单号
      multipleSelection: [],
      xiaozhangDialog: {
        show: false,
        row: {},
        form: {
          shishouTkMoney: '',
          fukuanType: '1'
        }
      }, // 销账弹窗
    }
  },
  mounted () {
    this.currentTab = getCache({
      key: 'unGetAndPayTabType',
    }) || 1
    this.getDetail()
  },
  watch: {

  },
  computed: {
    clothLoneListSort: function () {
      return _.sortBy(this.orderDetail.clothLoneList, 'number')
    },

  },
  filters: {
    formateText (val) {
      if (val == 1) {
        return '采购入仓'
      } else if (val == 2) {
        return '换货入仓'
      } else {
        return '售后入仓'
      }
    },
     formateNumber (val) {
      let result = '--'
      if (val !== null && val >= 0) {
        result = Number(val).toFixed(2)
      }
      return result
    },
    formateTime (val) {
      return val ? formatTimeString(val) : '--'
    },
    formateType (val) {
      if (val == 1) {
        return '售前退货'
      } else if (val == 2) {
        return '售前换货'
      } else if (val == 3) {
        return '售后退货'
      } else if (val == 4) {
        return '售后换货'
      } else if (val == 5) {
        return '运费'
      } else if (val == 6) {
        return '剪版'
      } else {
        return ''
      }
    },
  },

  methods: {
    getDetail() {
      const that = this
      newRequest({
        url: AccountApi.ChargeOffRecords.waitHandleYfDetail,
        method: 'post',
        contentType: 'application/json',
        data: {id: that.$route.query.id}
      }).then(data => {
        that.fullscreenLoading = false
        if (data.success === '1') {
          this.detailData = data.obj;
          this.basicData = data.obj.order;
          this.inReposityList = data.obj.inReposityList;
          this.outReposityList = data.obj.outReposityList;
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    xiaoZhangShow(row) {
      this.xiaozhangDialog.show = true
      this.xiaozhangDialog.row = row
      this.xiaozhangDialog._time = new Date().getTime()
    },
    xiaoZhangSave() {
      const that = this
      const xiaozhangDialog = that.xiaozhangDialog
      const params = {
        xiaozhangMoney: xiaozhangDialog.row.xiaozhangMoney,
        shifuXzMoney: xiaozhangDialog.row.shifuXzMoney,
        _time: xiaozhangDialog._time
      }
      if (xiaozhangDialog.row.id) {
        params.id = xiaozhangDialog.row.id
      } else {
        params.ids = xiaozhangDialog.row.ids
      }
      if (xiaozhangDialog.row.xiaozhangMoney >= 0) {
        params.shishouTkMoney = xiaozhangDialog.form.shishouTkMoney
      } else {
        params.fukuanType = xiaozhangDialog.form.fukuanType
      }
      that.fullscreenLoading = true
      request({
        url: params.id ? AccountApi.ChargeOffRecords.xiaozhang : AccountApi.ChargeOffRecords.batchXiaozhang,
        method: 'post',
        data: {
          param: JSON.stringify(params)
        }
      }).then(data => {
        that.fullscreenLoading = false;
        if (data.success === '1') {
          that.$message({
            type: 'success',
            message: data.msg
          })
          setCache({
            key: 'hasGetAndPayTabType',
            value: 2
          })
          setTimeout(() => {
            this.$router.push(`/exchange/hasGetAndPay`)
          }, 500);
        } else {
          that.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    back() {
      history.go(-1)
    },
  }
}
</script>
