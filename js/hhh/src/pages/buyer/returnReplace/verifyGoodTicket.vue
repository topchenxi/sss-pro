<template>
  <div class="verify-list">
    <go-back :goback="{ link: 'reject', name: '审核退换货单', back: 0 }"><el-button size="mini" type="primary" style="margin-left: 5px;" @click.native="$router.go(-1)">返回</el-button></go-back>
   <!-- 订单信息 -->
    <div class="section clearfix">
      <h3 class="tit">
        订单信息
      </h3>
      <div class="line-item clearfix">
        <div class="line-item-l">
          <span>已选订单</span>
        </div>
        <div class="line-item-r">
          <div class="item-table" v-if="orderDetail.order">
            <el-table
              :data="[order]"
              border
              style="width: 100%">
              <el-table-column prop="serviceNumber" label="订单号" width="180"></el-table-column>
              <el-table-column inline-template label="订单类型" width="180">
                <div>
                  <template v-if="row.type == '1'">服务单</template>
                  <template v-if="row.type == '2'">贸易单</template>
                </div>
              </el-table-column>
              <el-table-column prop="buyerCompany" label="采购商" width="180"></el-table-column>
              <el-table-column prop="sellerCompany" label="供应商" width="180"></el-table-column>
              <el-table-column inline-template label="原订单总金额" width="150">
                <div>
                  ¥{{row.total && row.total.toFixed(2)}}
                </div>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="line-item clearfix">
        <div class="line-item-l">
          <span>跟单员备注</span>
        </div>
        <div class="line-item-r">
          {{orderDetail.order && orderDetail.order.leaveMessage}}
        </div>
      </div>
    </div>
    <!-- 订单信息 end -->
<!-- 退换货信息 -->
    <div class="section" style="border-bottom: 0;">
      <h3 class="tit">
        退换货信息
      </h3>
      <div class="line-item clearfix">
        <div class="line-item-l">
          <span>退换类型</span>
        </div>
        <div class="line-item-r">
          <template v-if="changeType == 0">售前退货</template>
          <template v-if="changeType == 1">售前换货</template>
          <template v-if="changeType == 2">售后退货</template>
          <template v-if="changeType == 3">售后换货</template>
          <template v-if="changeType == 4">仅退款</template>
        </div>
      </div>

      <div class="line-item clearfix">
        <div class="line-item-l">
          <span>
           <template v-if="changeType == 0 || changeType == 2 || changeType == 4">退</template><template v-if="changeType == 1  || changeType == 3">换</template>货原因</span>
        </div>
        <div class="line-item-r clearfix">
          <div style="float:left;">
            {{replace.reason}}
        </div>
        </div>
      </div>

      <div class="line-item clearfix">
        <div class="line-item-l">
          <span>
          <template v-if="changeType == 0 || changeType == 2 || changeType == 4">退</template><template v-if="changeType == 1 || changeType == 3">换</template>货明细</span>
        </div>
        <div class="line-item-r"  v-if="replace.colorList">
            <el-table
              :data="filterColorList"
              border
              style="width: 100%">
              <el-table-column prop="outReposityNumber" v-if="changeType == 2 || changeType == 3"  label="出仓单号" width="180"></el-table-column>
              <el-table-column prop="productNumber" label="货号" width="180"></el-table-column>
              <el-table-column prop="color" label="色号" width="180"></el-table-column>

              <el-table-column inline-template label="成本价(含税)" width="180">
                <div>
                  <span v-if="row.priceWithTax != ''">{{row.priceWithTax}}{{row.priceUnit}}</span>
                </div>
              </el-table-column>
              <el-table-column inline-template label="成本价(不含税)" width="180">
                <div>
                  <span v-if="row.price != ''">{{row.price}}{{row.priceUnit}}</span>
                </div>
              </el-table-column>
              <el-table-column inline-template label="供应商税点" width="180">
                <div>
                  <span>{{row.sellerTaxPoint ? row.sellerTaxPoint + '%' : ''}}</span>
                </div>
              </el-table-column>

              <el-table-column inline-template label="售后入仓总数" v-if="changeType == 2 || changeType == 3" width="150">
                <div>{{row.totalQuantity}}{{row.priceUnit.split('/')[1]}}/{{row.clothLoneListForSelect.length}}匹</div>
              </el-table-column>
              <el-table-column inline-template :label="(changeType == 0 || changeType == 2) ? '退货匹号' : '换货匹号'" width="180">
                <div>{{row.pihao}}</div>
              </el-table-column>
              <el-table-column inline-template :label=" (changeType == 1 || changeType == 3) ? '换货原数' : '退货原数'" v-if="changeType == 1" width="180">
                <div>{{row.originNumber}}{{row.priceUnit.split('/')[1]}}</div>
              </el-table-column>
            </el-table>
          </div>
      </div>
  <!-- 退货 -->
    <template v-if="changeType == 0 || changeType == 2 || changeType == 4">
      <p style="padding-left: 25px; margin-bottom: 10px;">费用明细</p>
      <div class="line-item clearfix">
        <div class="line-item-l">
          <span>退货数量</span>
        </div>
        <div class="line-item-r">
           <span style="padding-right: 5px;">{{returnNumber}}</span>{{replace.colorList[0] && replace.colorList[0].priceUnit.split('/')[1]}}
        </div>
      </div>
      <div class="line-item clearfix">
        <div class="line-item-l">
          <span>退货成本货款</span>
        </div>
        <div class="line-item-r">
            <span>¥{{returnSaleMoney.priceTotalMoney}}(含税)</span>
            <span style="margin-left: 20px;">¥{{returnSaleMoney.UnTaxPriceTotalMoney}}(不含税)</span>
        </div>
      </div>


      <div class="line-item clearfix">
        <div class="line-item-l">
           <b style="color: red">*</b><span>供应商退款</span>
        </div>
        <div class="line-item-r">
          <template v-if="changeType == 4">
            <y-input size="small" style="margin-right: 10px;" v-model="soouyaPayToBuyer" max="6" placeholder="请输入0-9999"></y-input>元
            <span style="color: #45494a"> &nbsp;&nbsp;&nbsp;({{order.tips}})</span>
          </template>
          <template v-else="">
            <y-input size="small" style="margin-right: 10px;" v-model="sellerRefund" max="6" placeholder="请输入0-9999"></y-input>元
          </template>
        </div>
      </div>

    </template>
<!-- 换货 -->

<!-- 采购商收款方式 当采购商为搜芽给采购商商 buyerPay == 1时，显示采购商收款方式，当供应商为搜芽给供应商时，显示供应商收款方式-->


    <!-- 供应商收款方式 -->
     <!-- <div class="line-item clearfix" v-if="replace.sellerBank && this.buyerPay == '0'"> -->

    <div class="line-item clearfix" v-if="replace.followerRemark">
      <div class="line-item-l">
        <span>跟单员<template v-if="changeType == '0' || changeType == 2 || changeType == 4">退</template><template v-if="changeType == 1 || changeType == 3">换</template>货备注</span>
      </div>
      <div class="line-item-r">
        <textarea rows="3" style="width: 300px; height: 100px; resize: none; border: 1px solid #ccc; padding: 5px;" disabled="disabled" v-model.trim="replace.followerRemark"></textarea>
      </div>
    </div>
    <div class="line-item clearfix">
      <div class="line-item-l">
        <span>买货员<template v-if="changeType == '0' || changeType == 2 || changeType == 4">退</template><template v-if="changeType == 1 || changeType == 3">换</template>货备注</span>
      </div>
      <div class="line-item-r">
         <textarea rows="3" style="width: 300px; height: 100px; resize: none; border: 1px solid #ccc; padding: 5px;" v-model.trim="purchaserRemark"></textarea>
         <span><b style="color: red; padding-left: 5px;">{{leftnumber}}</b>/500字</span>
      </div>
    </div>
    <div class="y-submit">
         <el-button :disabled="isSubmit" type='primary' @click.native="handleSubmit">
          <div>
           <template v-if="$route.query.type == 1 || $route.query.type == 3">退货出仓</template>
            <template v-else="$route.query.type == 5">审核通过</template>
           <template v-else>换货出仓</template>
          </div>
         </el-button>
         <el-button @click.native="rejectShow=true" v-if="$route.query.type == 1 || $route.query.type == 2 || $route.query.type == 5">退回此单</el-button>
    </div>
    </div>
<!-- 退换货信息 end -->
  <lightbox />
  <!-- 点击拒绝 -->
  <el-dialog
      title="退回此单"
      v-model="rejectShow"
      custom-class="common-pop"
      size="tiny"
      :close-on-click-modal="false"
      >
     <div class="take-good clearfix send-good">
       <div class="t-item">
         <div class="t-item-l">订单号</div>
         <div class="t-item-r">{{order.serviceNumber}}</div>
       </div>
       <div class="t-item">
         <div class="t-item-l">采购商</div>
         <div class="t-item-r">{{order.buyerCompany}}</div>
       </div>
       <!-- <div class="t-item">
         <div class="t-item-l">退换类型</div>
         <div class="t-item-r">{{changeType == '0' ? '退货' : '换货'}}</div>
       </div>
       <div class="t-item">
         <div class="t-item-l">{{changeType == '0' ? '退' : '换'}}数量</div>
         <div class="t-item-r">
           <template v-if="changeType == '1'">{{sendParams.quantity}}{{sendParams.quantityUnit}}</template>
           <template v-if="changeType == '0'">{{returnNumber}}{{replace.colorList && replace.colorList[0].quantityUnit}}</template>
         </div>
       </div> -->
       <div class="t-item">
         <div class="t-item-l" style="position: absolute; top:0;"><b style="color: red;">*</b>退回原因</div>
         <div class="t-item-r" style="margin-left: 100px;">
           <textarea rows="3" style="width: 300px; height: 100px; resize: none; border: 1px solid #ccc; padding: 5px;"
           v-model.trim="purcahserExceptReson"></textarea>
           <span><b style="color: red; padding-left: 5px;">{{leftnumber2}}</b>/500字</span>
          </div>
       </div>
     </div>
     <div slot="footer" class="dialog-footer">
       <el-button type="primary" :disabled="purcahserExceptReson ? false : true" @click.native="confirmReject">
         <template v-if="changeType == 0 || changeType == 1 || changeType == 2 || changeType == 3">
           确认拒绝
         </template>
         <template v-if="changeType == 4">
           审核
         </template>
       </el-button>
       <el-button @click.native="rejectShow=false; purcahserExceptReson=''">取消拒绝</el-button>
     </div>
  </el-dialog>
  </div>
</template>

<script>
import GoBack from 'components/goBack'
import Lightbox from 'components/lightbox/lightbox'
import StoreApi from 'api/reposity'
import YInput from 'components/yInput'
import lrz from 'lrz'
import {
  request,
  newRequest,
  // setCache,
  // formatTimeString
} from 'utils/tool'
export default {
  components: {
    GoBack,
    Lightbox,
    'y-input': YInput
  },
  directives: {},
  data () {
    return {
      imgPath: 'http://www.soouya.com',
      rejectShow: false,
      minlength: 1,
      maxlength: 4,
      madanImgUrls: [],
      changeType: 1, // 换货类型
      reason: '0',
      radio: 0,
      soouyaPay: '0', // 换货服务费
      soouyaGet: '0', // 换货税费
      buyerPay: '0', // 采购商
      supllyPay: '0', // 供应商
      serviceRefund: '', //  服务费，搜芽给采购商
      serviceReplenishment: '', // 服务费， 采购商给搜芽
      taxRefund: '', // 税费，soouya退
      taxReplenishment: '', // 税费，soouya补
      buyerReplenishment: '', // 采购商给搜芽
      sellerRefund: '', // 供应商给搜芽
      soouyaPayToBuyer: '', // 供应商给搜芽
      soouyaToBuyerMoney: '', // 搜芽给采购商
      soouyaToSellerMoney: '', // 搜芽给供应商
      purchaserRemark: '', // 买货员备注
      purcahserExceptReson: '', // 拒绝原因
      sendParams: {
        price: '',
        priceUnit: '',
        salePrice: '',
        salePriceUnit: '',
        quantity: '',
        quantityUnit: '',
      },
      orderDetail: {},
      order: {},
      replace: {},
      multipleSelection: [],
      colorList: [],
      count: 0, // 校验规则标识
      _time: 0
    }
  },
  mounted () {
    this.getDetail()
    this._time = (new Date()).getTime()
  },
  updated () {},
  computed: {
    // 去除不要匹号筛选出
    filterColorList () {
//      this.replace.colorList = this.replace.colorList.filter(item => item.clothLoneListForSelect.length > 0)
      return this.replace.colorList
    },
    // 公共计算明细原数据列表处理函数
    commonMoneyDetail () {
      let totalOriginNum = 0 // 计算原数
      let totalNumber = 0  // 计算入仓总数
      this.replace.colorList && this.replace.colorList.map((obj) => {  // 明细原数据列表
        let singleNum = 0 // 单行总和
        let singleTotalNumber = 0 // 单行总和
        obj.clothLoneListForSelect.map((items) => {
          singleTotalNumber += Number(items.quantity) // 不论是否售后，都计算
          singleNum += Number(items.quantity) // 是售后才计算原数
        })
        totalOriginNum += singleNum
        totalNumber += singleTotalNumber
      })
      return {
        totalOriginNum,
        totalNumber
      }
    },
    // 换货销售货款
    saleFullMoney () {
      // （总数 － 原数）＊销售单价
      return ((Number(this.sendParams.quantity) - Number(this.commonMoneyDetail.totalOriginNum)) * Number(this.sendParams.salePrice)).toFixed(2)
    },
    returnNumber () {
      return this.commonMoneyDetail.totalNumber.toFixed(2)
    },
    leftnumber () {
      return 500 - Number(this.purchaserRemark.length)
    },
    leftnumber2 () {
      return 500 - Number(this.purcahserExceptReson.length)
    },
    // 退货销售货款和退货成本货款
    returnSaleMoney () {
      let totalMoney = 0
      let priceTotalMoney = 0
      let UnTaxPriceTotalMoney = 0
      this.replace.colorList && this.replace.colorList.map((item) => {
        let singleTotalNumber = 0 // 单行总和
        item.clothLoneListForSelect.map((val) => {
          singleTotalNumber += Number(val.quantity)
        })
        totalMoney += singleTotalNumber * Number(item.salePrice)
        priceTotalMoney += singleTotalNumber * Number(item.priceWithTax)
        UnTaxPriceTotalMoney += singleTotalNumber * Number(item.price)
      })
      return {
        totalMoney: totalMoney.toFixed(2),
        priceTotalMoney: priceTotalMoney.toFixed(2),
        UnTaxPriceTotalMoney: UnTaxPriceTotalMoney.toFixed(2)
      }
    },
    // 供应商给搜芽
    supplyPaySoouya () {
      let totalMoney = 0
      this.replace.colorList && this.replace.colorList.map((item) => {
        let singleTotalNumber = 0 // 单行总和
        item.clothLoneListForSelect.map((val) => {
          singleTotalNumber += Number(val.quantity)
        })
        totalMoney += singleTotalNumber * Number(item.price)
      })
      return totalMoney.toFixed(2)
    },
    isSubmit () {
      this.count++
      const type = this.$route.query.type
      if (type == 1 || type == 3) {
        if (String(this.sellerRefund) == '') {
          return true
        }
      }
      if (type == 1) { // 退货
        return false
      } else { // 换货校验
        // if (this.madanImgUrls.length == 0) { // 码单
        //   return true
        // }
        // if (!this.sendParams.price || !this.sendParams.salePrice || !this.sendParams.quantity) {
        //   return true
        // }

        // if ((this.soouyaPay == 1 && !this.serviceRefund) || (this.soouyaPay == 0 && !this.serviceReplenishment)) {  // 换货服务费 选中的
        //   return true
        // }

        // if ((this.soouyaGet == 1 && !this.taxRefund) || (this.soouyaGet == 0 && !this.taxReplenishment)) {  // 换货税费 选中的
        //   return true
        // }

        // if ((this.buyerPay == 1 && this.soouyaToBuyerMoney === '') || (this.buyerPay == 0 && this.buyerReplenishment === '')) {  // 采购商 选中的
        //   return true
        // }
        //
        // if ((this.supllyPay == 0 && this.soouyaToSellerMoney === '') || (this.supllyPay == 1 && this.sellerRefund === '')) {  // 供应商 选中的
        //   return true
        // }
      }
    }
  },
  watch: {
    purchaserRemark (val) {
      if (String(val).length >= 500) {
        this.purchaserRemark = val.slice(0, 500)
      }
    },
    purcahserExceptReson (val) {
      if (String(val).length >= 500) {
        this.purcahserExceptReson = val.slice(0, 500)
      }
    },
    madanImgUrls (val) {
      this.count++
    },
    'sendParams.price' () {
      this.count--
    },

    'sendParams.salePrice' () {
      this.count++
    },

    'sendParams.quantity' () {
      this.count--
    },
    serviceRefund () {
      this.count--
    },
    serviceReplenishment () {
      this.count--
    },
    taxRefund () {
      this.count--
    },
    taxReplenishment () {
      this.count--
    },
    soouyaToBuyerMoney () {
      this.count--
    },
    buyerReplenishment () {
      this.count--
    },
    soouyaToSellerMoney () {
      this.count--
    },
    sellerRefund () {
      this.count--
    }
  },
  methods: {
    getDetail () {
        if (this.$route.query.type == 5) {
          this.$store.dispatch('changeload', true)
          const obj = {
            number: this.$route.query.id
          }
          newRequest({
            url: StoreApi.Replace_getRefundForReview,
            contentType: 'application/json',
            data: obj
          }, (res) => {
            this.$store.dispatch('changeload', false)
            if (res.success == 1) {
              this.convertData(res)
            } else {
              this.$message({
                type: 'error',
                message: res.msg,
                duration: 1000
              })
            }
          })
        } else {
          this.$store.dispatch('changeload', true)
          const obj = {
            number: this.$route.query.id
          }
          request({
            url: (this.$route.query.type == 2 || this.$route.query.type == 4) ? StoreApi.Replace_getReplaceForReview : StoreApi.Return_getReplaceForReview,
            data: {
              param: JSON.stringify(obj)
            }
          }, (res) => {
            this.$store.dispatch('changeload', false)
            if (res.success == 1) {
              this.convertData(res)
            } else {
              this.$message({
                type: 'error',
                message: res.msg,
                duration: 1000
              })
            }
          })
        }
    },
    convertData (res) {
      this.orderDetail.order = res.order
      this.orderDetail.replace = (Number(this.$route.query.type) == 1 || Number(this.$route.query.type) == 3 || Number(this.$route.query.type) == 5) ? res.returnObj : res.replace
      this.order = res.order
      this.replace = this.orderDetail.replace
      if (!this.replace.colorList) {
        this.replace.colorList = [{priceUnit: '', price: '', clothLoneListForSelect: []}]
      }
      this.replace.colorList && this.replace.colorList.map((item) => {
        let totalQuantity = 0
        let originNumber = 0
        let pihao = []
        if (!item.clothLoneListForSelect) {
          item.clothLoneListForSelect = []
        }
        item.clothLoneListForSelect && item.clothLoneListForSelect.map((val) => {
          totalQuantity += Number(val.quantity)
          // if (val.type == 1) { // 是售后再计算换货原数
            originNumber += Number(val.quantity)
            item.quantityUnit = val.quantityUnit
          // }
          pihao.push(val.number)
        })
        item.totalQuantity = totalQuantity
        item.pihao = pihao.join(',')
        item.originNumber = originNumber
        // sellerRefund
        if (this.$route.query.type == 5) { // 仅退款
          this.soouyaPayToBuyer = this.orderDetail.replace.soouyaPayToBuyer
//          alert(this.soouyaPayToBuyer)
        }
      })
      this.changeType = Number(this.$route.query.type) - 1
      if (this.changeType == 1) { // 换货
        this.fillOriginData(this.replace)
      }
    },
    // 换货原数据填充
    fillOriginData (replaceData) {
        if (Number(this.$route.query.type) == 5) {
            return
        }
      this.sendParams.quantity = replaceData.quantity
      this.sendParams.quantityUnit = replaceData.colorList[0].priceUnit.split('/')[1]
      this.sendParams.salePrice = replaceData.salePrice
      this.sendParams.salePriceUnit = replaceData.salePriceUnit
      this.sendParams.price = replaceData.colorList[0].price
      this.sendParams.priceUnit = replaceData.colorList[0].priceUnit

      if (replaceData.serviceRefund && replaceData.serviceRefund > 0) { // 换货服务费 选中的
        this.soouyaPay = '1'
        this.serviceRefund = replaceData.serviceRefund
      } else {
        this.soouyaPay = '0'
        this.serviceReplenishment = replaceData.serviceReplenishment
      }

      if (replaceData.taxRefund && replaceData.taxRefund > 0) { // 换货税费 选中的
        this.soouyaGet = '1'
        this.taxRefund = replaceData.taxRefund
      } else {
        this.soouyaGet = '0'
        this.taxReplenishment = replaceData.taxReplenishment
      }

      if (replaceData.buyerReplenishment && replaceData.buyerReplenishment > 0) { // 采购商 选中的
        this.buyerPay = '0'
        this.buyerReplenishment = replaceData.buyerReplenishment
        this.supllyPay = '0'
      } else {
        this.buyerPay = '1'
        this.soouyaToBuyerMoney = replaceData.sellerRefund
        this.supllyPay = '1'
      }
    },
    // 收集退货数据提交
    collectReturnData () {
        let sellerRefund = this.sellerRefund
        if (this.$route.query.type == 5) {
          sellerRefund = this.soouyaPayToBuyer
        }
      const req = {
        number: this.$route.query.id,
        agreeOrNot: 1,
        purchaserRemark: this.purchaserRemark,
        sellerRefund: sellerRefund
      }
      return req
    },
    // 收集换货数据提交
    collectReplaceData () {
      const req = {}
      if (this.soouyaPay == '1') { // 换货服务费
        req.serviceRefund = (this.serviceRefund || 0)
        req.serviceReplenishment = ''
      } else {
        req.serviceReplenishment = (this.serviceReplenishment || 0)
        req.serviceRefund = ''
      }
      if (this.soouyaGet == '1') { // 税费
        req.taxRefund = (this.taxRefund || 0)
        req.taxReplenishment = ''
      } else {
        req.taxRefund = ''
        req.taxReplenishment = (this.taxReplenishment || 0)
      }

      if (this.buyerPay == '1') { // 采购商
        req.soouyaToBuyerMoney = (this.soouyaToBuyerMoney || 0)
        req.buyerReplenishment = ''
      } else {
        req.soouyaToBuyerMoney = ''
        req.buyerReplenishment = (this.buyerReplenishment || 0)
      }
      if (this.supllyPay == '1') { // 供应商
        req.sellerRefund = (this.sellerRefund || 0)
        req.soouyaToSellerMoney = ''
      } else {
        req.sellerRefund = ''
        req.soouyaToSellerMoney = (this.soouyaToSellerMoney || 0)
      }
      // req.madanImgUrls = this.madanImgUrls.map((item) => {
      //   return item.replace(this.imgPath, '')
      // })
      req.number = this.$route.query.id
      req.purchaserRemark = this.purchaserRemark
      req.agreeOrNot = 1
      const options = Object.assign({}, req, this.sendParams)
      return options
    },
    // 同意
    handleSubmit () {
      if (this.$route.query.type == 5) {
        this.$store.dispatch('changeload', true)
        const obj = (this.$route.query.type == 1 || this.$route.query.type == 3 || this.$route.query.type == 5) ? this.collectReturnData() : this.collectReplaceData()
        obj._time = this._time
        newRequest({
          url: StoreApi.Return_commitToFinance,
          contentType: 'application/json',
          data: obj
        }, (res) => {
          this.$store.dispatch('changeload', false)
          if (res.success == 1) {
            const that = this
            this.$message({
              type: 'success',
              message: res.msg,
              duration: 1000,
              onClose () {
                that.$router.go(-1)
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1000
            })
          }
        })
      } else {
        this.$store.dispatch('changeload', true)
        const obj = (this.$route.query.type == 1 || this.$route.query.type == 3) ? this.collectReturnData() : this.collectReplaceData()
        obj._time = this._time
        request({
          url: (this.$route.query.type == 2 || this.$route.query.type == 4) ? StoreApi.Replace_review : StoreApi.Return_review,
          data: {
            param: JSON.stringify(obj)
          }
        }, (res) => {
          this.$store.dispatch('changeload', false)
          if (res.success == 1) {
            const that = this
            this.$message({
              type: 'success',
              message: res.msg,
              duration: 1000,
              onClose () {
                that.$router.go(-1)
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1000
            })
          }
        })
      }
    },
    // 确认拒绝
    confirmReject () {
        // Return_commitToFinance
        if (this.$route.query.type == 5) {
          this.$store.dispatch('changeload', true)
          const obj = {number: this.$route.query.id, agreeOrNot: 0, purcahserExceptReson: this.purcahserExceptReson, _time: this._time}
          newRequest({
            url: StoreApi.Return_sendbackToFollower,
            contentType: 'application/json',
            data: obj
          }, (res) => {
            this.$store.dispatch('changeload', false)
            this.purcahserExceptReson = ''
            this.rejectShow = false
            this.cancelgoodShow = false
            if (res.success == 1) {
              const that = this
              this.$message({
                type: 'success',
                message: res.msg,
                duration: 1000,
                onClose () {
                  that.$router.go(-1)
                }
              })
            } else {
              this.$message({
                type: 'error',
                message: res.msg,
                duration: 1000
              })
            }
          })
        } else {
          this.$store.dispatch('changeload', true)
          const obj = JSON.stringify({number: this.$route.query.id, agreeOrNot: 0, purcahserExceptReson: this.purcahserExceptReson, _time: this._time})
          request({
            url: (this.$route.query.type == 2 || this.$route.query.type == 4) ? StoreApi.Replace_review : StoreApi.Return_review,
            data: {
              param: obj
            }
          }, (res) => {
            this.$store.dispatch('changeload', false)
            this.purcahserExceptReson = ''
            this.rejectShow = false
            this.cancelgoodShow = false
            if (res.success == 1) {
              const that = this
              this.$message({
                type: 'success',
                message: res.msg,
                duration: 1000,
                onClose () {
                  that.$router.go(-1)
                }
              })
            } else {
              this.$message({
                type: 'error',
                message: res.msg,
                duration: 1000
              })
            }
          })
        }
    },
    beforeUpload(file) { // 预览图片
      const that = this
      this.$store.dispatch('changeload', true)
      lrz(file, {
        quality: 0.5
      })
      .then(function (rst) {
        // 处理成功会执行
        rst.formData.append('field', 'imgUrl')
        request({
          url: '/redwood/sys/Common/uploadFile.do?type=0',
          method: 'post',
          data: rst.formData,
          dataType: 'FormData'
        }).then(data => {
          that.$store.dispatch('changeload', false)
          if (data.success === '1') {
            that.handleSuccess(data)
          } else {
            that.$alert(data.msg, '', {
              callback: action => {
                return true
              }
            });
          }
        })
        return rst
      })
      return false
    },
    handleSuccess (file, fileList) {
      this.$store.dispatch('changeload', false)
      this.madanImgUrls.push(this.imgPath + file.imgUrl)
    },
    handleError (file, fileList) {
      this.$store.dispatch('changeload', false)
      console.log('file', fileList)
    },
    del (url) {
      this.madanImgUrls = this.madanImgUrls.filter((item, key) => item != url)
    }
  }
}
</script>
<style src="assets/style/table.scss" lang="scss"></style>
<style lang="scss">
.verify-list {
   .radio-item {
     margin-bottom: 8px;
     .soouya-radio {
       display: inline-block;
       width: 125px;
     }
   }
   .el-table {
    th.star{
      .cell {
        position: relative;
        &:before {
          display: inline-block ;
          content: "*";
          padding-right: 3px;
          color: red;
        }
      }
    }
   }
   .mark {
     color: red;
   }
   .madan-wrap {
     position: relative;
     display: inline-block;
     margin-right: 15px;
     margin-bottom: 15px;
   }
   .del-arrow {
    position: absolute;
    text-align: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    top: -10px;
    right: -10px;
    background-color: #ccc;
    color: #fff;
    border: 1px solid #fff;
   }
   .y-submit {
     margin-top: 30px;
     margin-bottom: 30px;
     margin-left: 130px;
     .el-button {
       margin-right: 20px;
     }
   }

  .fix-table {
    .el-radio__label {
      display: none;
    }
    th {
      text-align: center;
    }
    td {
      background-color: #fff;
      text-align: center;
    }
    .cellw {
      width:120px;
      word-break:break-all;
      overflow:auto;
    }
    .cellw2 {
      width: 200px;
    }
  }
  .section {
    border-bottom: 1px dotted #ccc;
    .tit {
      margin-top: 10px;
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      color: #000;
    }
    .line-item {
      margin-bottom: 10px;
      .line-item-l {
        float: left;
        font-size: 14px;
        width: 130px;
        text-align: right;
        padding-right: 10px;
      }
      .radio-tit {
        padding-top: 5px;
      }
      .line-item-r {
        font-size: 14px;
        max-width: 88%;
        min-width: 500px;
        float: left;
      }
      .unit {
        padding-left: 10px;
      }
    }
  }
}
.common-pop {
  min-width: 500px;
}
.take-good {
  max-height: 450px;
  min-width: 460px;
  overflow-y: auto;
  .t-item {
    position: relative;
    margin-bottom: 8px;
  }
  .t-item-l {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 10px;
  }
  .t-item-r {
    display: inline-block;
    min-width: 320px;
    .r-line {
      padding-bottom: 5px;
    }
  }
}
.send-good {
  max-height: 450px;
  overflow-y: auto;
}

</style>
