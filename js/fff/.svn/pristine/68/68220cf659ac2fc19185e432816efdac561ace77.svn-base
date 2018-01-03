<template>
<div class='dsf-detail' v-loading.body="fullscreenLoading">
  <!-- <h1 class="title" style="font-size: 25px; padding: 15px">详情页</h1> -->
  <div class="content box">
    <h4>对账信息</h4>
    <table class="custom-table">
      <tr>
        <td>进入待销账时间：{{detailData.createTime | formateTime}}</td>
        <td>销账人员：{{detailData.creatorName}}/{{detailData.creatorTel }}</td>
        <td>销账类型：{{detailData.type | formateType}}</td>
        <td>成本货款：{{detailData.costMoney | formateNumber}}元</td>
      </tr>
      <tr>
        <td colspan="4" align="right"><span style="color: #999;">（报销成本货款））</span>销账金额：{{detailData.costMoney | formateNumber}}元</td>
      </tr>
    </table>
  </div>
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
        <td>采购商发票：{{cutData.needInvoice == 0 ? '不需要' : '需要'}}</td>
        <td>档口电话：{{cutData.shopTel}}</td>
      </tr>
      <tr>
        <td>订单状态：{{cutData.statusDesc | formateStatus}}</td>
        <td>采购商税点：{{cutData.taxPoint | formateNumber}}%</td>
        <td>详细地址：{{cutData.shopProvince}}{{cutData.shopCity}}{{cutData.shopArea}}{{cutData.shopAddr}}</td>
      </tr>
      <tr>
        <td>订单类型：{{(cutData.category == 'all-all' || cutData.category == 'dh-zy')? '大货' : '剪版'}}</td>
        <td>跟单员：{{cutData.follower}}/{{cutData.followerTel}}</td>
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
  <div class="fixed-footer">
    <el-button type="primary" @click.prevent="xiaoZhangShow(detailData)">销账</el-button>
    <el-button @click.prevent="back">返回</el-button>
  </div>

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
    .is-64x64 {
      overflow: hidden
    }
    .clear{
      clear: both;
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
}
</style>
<script>
import HeadFilter from 'components/headFilter/HeadFilter.vue'
import pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
import CutInformation from 'components/detail/cutInformation'
import {
  request,
  newRequest,
  formatTimeString,
  getCache,
  setCache,
} from 'src/common/utils.js'
// import _ from 'lodash'
import AccountApi from 'api/account.js'
import { Message } from 'element-ui'
export default {
  components: {
    HeadFilter,
    Lightbox,
    pagination,
    CutInformation
  },
  data() {
    return {
      time: new Date().getTime(),
      currentTab: 1,
      fullscreenLoading: true,
      detailData: {}, // 分账明细data
      cutData: {}, // 剪版数据
      imgPath: 'http://test.soouya.com',
      tupianList: [],
      xiaozhangDialog: {
        show: false,
        row: {},
        form: {
          shishouTkMoney: '',
          fukuanType: '1'
        }
      },
    }
  },
  mounted () {
    this.currentTab = getCache({
      key: 'unGetAndPayTabType',
    }) || 1
    this.getDetail()
  },
  filters: {
    formateNumber (val) {
      let result = '--'
      if (val !== null || val >= 0) {
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
  watch: {

  },
  methods: {
    getDetail() {
      const that = this
      newRequest({
        url: AccountApi.ChargeOffRecords.waitHandleJbDetail,
        method: 'post',
        contentType: 'application/json',
        data: {id: that.$route.query.id}
      }).then(data => {
        that.fullscreenLoading = false
        if (data.success === '1') {
          this.detailData = data.obj
          // this.tupianList = this.formateImgList(this.detailData.cut.productNumberVoList)
          this.cutData = data.obj.cut;
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    formateImgList (list) {
      let arr = []
      list.map((item) => {
        arr = arr.concat(item.imgUrls)
      })
      arr = arr.map((item) => {
         return this.imgPath + item
      })
      return arr
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
    formatTime(time) { // 格式化时间
      return formatTimeString(time)
    },
  }
}
</script>
