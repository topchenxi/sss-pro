<template>
  <section style="min-width:1300">
    <div class="title-box">
      <span style="font-weight:600;">基本信息</span>
      <el-button type="primary" size="small" style="margin-left:50px;" @click.native="toBack">返回</el-button>
    </div>
    <div class="form-box" style="padding-top:40px">
      <el-form label-position="right" label-width="120px">
        <el-form-item label="订单号">
          <span>{{obj.order.serviceNumber}}</span>
        </el-form-item>
        <el-form-item label="采购商">
          <el-popover placement="bottom-start" title="" trigger="click" width="300">
            <el-form label-position="right" label-width="120px">
              <el-form-item label="采购商ID:" height="25">
                <span>{{obj.order.customerNumber}}</span>
              </el-form-item>
              <el-form-item label="联系手机:">
                <span>{{obj.order.customerMobile}}</span>
              </el-form-item>
              <el-form-item label="联系电话:">
                <span>{{obj.order.customerTel}}</span>
              </el-form-item>
              <el-form-item label="下单总数:">
                <span>{{obj.order.orderTotalCount}}单</span>
              </el-form-item>
              <el-form-item label="下单总金额:">
                <span>{{obj.order.totalOrderSaleMoney | formatMoney}}</span>
              </el-form-item>
              <el-form-item label="有效出仓总金额:">
                <span>{{obj.order.tatalOutRepositySaleMoney | formatMoney}}</span>
              </el-form-item>
            </el-form>
            <el-button slot="reference" type="text" style="font-size: 15px;">{{obj.order.customerCompany}}</el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="供应商">
          <el-popover placement="bottom-start" title="" trigger="click">
            <el-form label-position="right" label-width="80px">
              <el-form-item label="联系电话:">
                <span>{{obj.order.shopTel}}</span>
              </el-form-item>
              <el-form-item label="联系地址:">
                <span>{{obj.order.shopFullAddr}}</span>
              </el-form-item>
            </el-form>
            <el-button slot="reference" type="text" style="font-size: 15px;">{{obj.order.shopCompany}}</el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="订单类型">
          <template v-if="obj.order.type == 1">
            <span>服务单</span>
          </template>
          <template v-if="obj.order.type == 2">
            <span>贸易单</span>
          </template>
        </el-form-item>
        <el-form-item label="下单时间">
          <span>{{obj.order.createTime | formatTime}}</span>
        </el-form-item>
        <template v-if="obj.order.expectedTime">
          <el-form-item label="期望货期">
            <span>{{formatDate(obj.order.expectedTime)}}</span>
          </el-form-item>
        </template>
        <template v-if="obj.order.leaveMessage">
          <el-form-item label="跟单员备注">
            <span style="text-align: justify; display:block; width: 90%; float:left">{{obj.order.leaveMessage}}</span>
          </el-form-item>
        </template>
        <template v-if="obj.order.sellerMessage">
          <el-form-item label="买货员备注">
            <span style="text-align: justify; display:block; width: 90%; float:left">{{obj.order.sellerMessage}}</span>
          </el-form-item>
        </template>
        <el-form-item label="采购明细">
          <table style="border-collapse:collapse; border: 1px solid #969696" border="1" border-spacing="0" class="table-box">
            <tr>
              <th style="width:120px;">货号</th>
              <th style="width:120px" colspan="1">色号</th>
              <th style="width:100px" colspan="1">采购数量</th>
              <th style="width:100px" colspan="1">销售单价</th>
              <th style="width:100px" colspan="1">采购单价</th>
              <th  style="width:100px" colspan="1">成本单价</th>
            </tr>
            <tr ref="rightTd">
              <td :rowspan="obj.order.colorList.length + 1" class="rightTd" style="text-align:center">{{obj.order.productNumber}}</td>
              <tr v-for="(item,index) in obj.order.colorList">
                <td style="text-align:center">{{item.color}}</td>
                <td style="text-align:center">{{item.quantity | formatMoney}}{{item.quantityUnit}}</td>
                <td style="text-align:center">{{item.salePrice | formatMoney}}{{item.salePriceUnit}}</td>
                <td style="text-align:center">{{item.buyPrice | formatMoney}}{{item.buyPriceUnit}}</td>
                <td  style="text-align:center">{{item.price | formatMoney}}{{item.priceUnit}}</td>
              </tr>
            </tr>
            <tr>
              <!-- <td :colspan="buyerRole? 6:5" style="text-align: right;padding-right: 8px;">
                      <template v-if="obj.order.productSource">
                        <label style="display: inline-block; padding-left:8px; padding-right: 8px;">销售货款:
                          <strong style="color: #f00">￥{{obj.order.saleMoney | formatMoney}}</strong>
                        </label>
                        <span style="border-right: 1px solid #3b3b3b;"></span>
                        <label style="display: inline-block; padding-left:8px; padding-right: 8px;">已付订金:
                          <strong style="color: #f00">￥{{obj.order.earnestMoney | formatMoney}}</strong>
                        </label>
                        <span style="border-right: 1px solid #3b3b3b;"></span>
                        <label style="display: inline-block; padding-left:8px; padding-right: 8px;">已付尾款:
                          <strong style="color: #f00">￥{{obj.order.finalMoney | formatMoney}}</strong>
                        </label>
                        <span style="border-right: 1px solid #3b3b3b;"></span>
                        <label style="display: inline-block; padding-left:8px; padding-right: 8px;">采购商税款:
                          <strong style="color: #f00">￥{{obj.order.taxMoney | formatMoney}}({{obj.order.taxPoint}}%)</strong>
                        </label>
                        <span style="border-right: 1px solid #3b3b3b;"></span>
                        <label style="padding-right:8px; padding-left:8px;display: inline-block">服务费:
                          <strong style="color:#f00">￥{{obj.order.serviceMoney | formatMoney}}</strong>
                        </label>
                      </template>
                      <template v-else>
                        <label style="display: inline-block; padding-left:8px; padding-right: 8px;">销售货款:
                          <strong style="color: #f00">￥{{obj.order.saleMoney | formatMoney}}</strong>
                        </label>
                        <span style="border-right: 1px solid #3b3b3b;"></span>
                        <label style="display: inline-block; padding-left:8px; padding-right: 8px;">采购货款:
                          <strong style="color: #f00">￥{{obj.order.buyMoney | formatMoney}}</strong>
                        </label>
                        <span style="border-right: 1px solid #3b3b3b;"></span>
                        <label style="display: inline-block; padding-left:8px; padding-right: 8px;">采购商税款:
                          <strong style="color: #f00">￥{{obj.order.taxMoney | formatMoney}}({{obj.order.taxPoint}}%)</strong>
                        </label>
                        <span style="border-right: 1px solid #3b3b3b;"></span>
                        <label style="padding-right:8px;padding-left:8px; display: inline-block">服务费:
                          <strong style="color:#f00">￥{{obj.order.serviceMoney | formatMoney}}</strong>
                        </label>
                      </template>
                      缺图片  
                    </td> -->
            </tr>
          </table>
        </el-form-item>
      </el-form>
    </div>
    <div class="title-box">
      <span style="font-weight:600;">退款内容</span>
    </div>
    <div>
      <table style="border-collapse:collapse; border: 1px solid #969696; font-size:14px;" border="1" border-spacing="0" class="table-box">
        <tr>
          <th style="width:120px; height:35px;">货源</th>
          <th style="width:120px">销售货款(元)</th>
          <th style="width:120px">采购货款(元)</th>
          <th style="width:120px">已付订金(元)</th>
          <th style="width:120px">已付尾款(元)</th>
          <template >
            <th style="width:140px">已付成本货款(元)</th>
          </template>
          <th style="width:180px">申请时间</th>
          <th style="width:120px">申请人</th>
          <th style="width:180px">取消申请订单的原因</th>
        </tr>
        <tr>
          <td style="height:35px; text-align:center;">
            <template v-if="obj.order.productSource == 1">
              <span>订货</span>
            </template>
            <template v-if="obj.order.productSource == 0">
              <span>现货</span>
            </template>
          </td>
          <td style="text-align:center">
            <span>{{obj.order.saleMoney | formatMoney}}</span>
          </td>
          <td style="text-align:center">
            <span>{{obj.order.buyMoney | formatMoney}}</span>
          </td>
          <td style="text-align:center">
            <template v-if="obj.fundType == 2">
              <span>{{obj.order.earnestMoney | formatMoney}}</span>
            </template>
            <template v-if="obj.fundType == 3">
              <span>{{obj.order.earnestMoney | formatMoney}}</span>
            </template>
            <template v-if="obj.fundType == 5">
              <span>--</span>
            </template>
          </td>
          <td style="text-align:center">
            <template v-if="obj.fundType == 2">
              <span>--</span>
            </template>
            <template v-if="obj.fundType == 3">
              <span>{{obj.order.finalMoney | formatMoney}}</span>
            </template>
            <template v-if="obj.fundType == 5">
              <span>--</span>
            </template>
          </td>
          <template >
            <td style="text-align:center">
              <span>{{obj.order.costMoney | formatMoney}}</span>
            </td>
          </template>
          <td style="text-align:center">
            <span>{{obj.createTime | formatTime}}</span>
          </td>
          <td style="text-align:center">
            <span>{{obj.followerName}}</span>
          </td>
          <td style="text-align:center;">
            <el-tooltip class="item" effect="dark" :content="obj.reason" placement="top">
              <div style="margin-left:15px;overflow:hidden; width:150px; text-overflow:ellipsis; text-align:center">{{obj.reason}}</div>
            </el-tooltip>
          </td>
        </tr>
      </table>
      <!-- <table style="border-collapse:collapse; border: 1px solid #969696; font-size:14px;" border="1" border-spacing="0" class="table-box">
        <tr>
          <th style="text-align:center;width:180px;height:35px">买货员审核时间</th>
          <th style="text-align:center;width:120px;height:35px">审核人</th>
          <th style="text-align:center;width:180px;height:35px">供应商退款金额(元)</th>
          <template v-if="obj.fundType == 3 || obj.fundType == 5">
            <th style="text-align:center;width:180px;height:35px">财务退款时间</th>
            <th style="text-align:center;width:120px;height:35px">财务退款人</th>
          </template>
        </tr>
        <tr>
          <td style="text-align:center; height:35px">
            <span>{{obj.purcahserReviewTime | formatTime}}</span>
          </td>
          <td style="text-align:center">
            <span>{{obj.purchaserName}}</span>
          </td>
          <td style="text-align:center">
            <template v-if="orderRole">
              <span>{{obj.sellerRefund}}</span>
            </template>
            <template v-else>
              <span>{{obj.sellerRefundForFollower | formatMoney}}</span>
            </template>
          </td>
          <template v-if="obj.fundType == 3 || obj.funType == 5">
            <td style="text-align:center">
              <span>{{obj.financeReviewTime | formatTime}}</span>
            </td>
            <td style="text-align:center">
              <span>{{obj.financeName}}</span>
            </td>
          </template>
        </tr>
      </table> -->
    </div>
    <div class="title-box">
      <span style="font-weight:600;">供应商应退</span>
    </div>
    <diV>
      <el-input placeholder="请填写退款金额" style="width:200px;margin-top: 15px;" v-model="requestParams.sellerRefund"></el-input>
      <span>元</span>
      </br>
      <el-button type="primary" size="small" style="margin-top: 20px; margin-left:10px;width:100px;" @click.native="confirmSubmit">提交</el-button>
    </diV>
  </section>
</template>

<script>
// import config from '../data.json'
import { newRequest } from 'utils/tool'
export default {
  data() {
    return {
      requestParams: {
        id: '',
        sellerRefund: '',
        purchaserRemark: '',
      },
      obj: {
        order: {
          colorList: [],
        },
      },
    }
  },
  mounted() {
    this.requestParams.id = this.$route.query.id
    this.getData()
    // let res = config.newDetail
    // this.obj = res.obj
  },

  methods: {
    getData() {
      newRequest({
        url: '/redwood/returnReplaceOnlyRefund/getById',
        method: 'get',
        data: this.requestParams,
        contentType: 'application/json'
      }).then((res) => {
        if (res.success == 1) {
          this.obj = res.obj
          this.$store.dispatch('changeload', false)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    confirmSubmit() {
      this.$store.dispatch('changeload', true)
      newRequest({
        url: '/redwood/returnReplaceOnlyRefund/commitToFinance',
        data: this.requestParams,
        method: 'post',
        contentType: 'application/json',
      }).then((res) => {
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.$store.dispatch('changeload', false)
          this.toBack()
        } else {
          this.$message.error(res.msg)
          this.$store.dispatch('changeload', false)
        }
      })
    },
    toBack() {
      window.history.go(-1)
    },
    formatDate(val) {
      let date = new Date(val)
      // console.log(date)
      if (val) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
      } else {
        return '--'
      }
      return y + '-' + m + '-' + d
    },
    formateImgList(list) {
      let arr = []
      list.map((item) => {
        arr = arr.concat(item.imgList)
      })
      arr = arr.map((item) => {
        return this.imgPath + item
      })
      return arr
    },
  },
  beforeRouteEnter(to, from, next) {
    to.meta.index = from.meta.index
    next()
  },
}
</script>

<style>
.title-box {
  padding-bottom: 8px;
  border-bottom: 1px dashed #3b3b3b;
  width: 100%;
  margin-top: 15px;
}

.form-box {
  padding-left: 20px;
}

.form-box .el-form-item {
  margin: 0px;
  padding: 0px;
  padding-left: 20px;
}

.table-box {
  margin-top: 12px;
  ;
}
</style>
