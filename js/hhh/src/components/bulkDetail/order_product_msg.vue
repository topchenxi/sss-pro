<template>
  <section>
    <ul class="allDetail-tab">
      <li @click="changeTab('订单信息')" :class="activeName == '订单信息' ? 'isActive' : ''">订单信息</li>
      <li @click="changeTab('商品信息')" :class="activeName == '商品信息' ? 'isActive' : ''">商品信息</li>
    </ul>
    <div v-if="activeName=='订单信息'" class="order-msg shareClass">
      <p class="color26">
        <span class="bold-text">订单号：{{config.number}}</span>
        <span class="ml25" v-if="config.status == 304">等待报价</span>
        <span class="ml25" v-if="config.status == 326">等待收付订金</span>
        <span class="ml25" v-if="config.status == 328">等待收付款</span>
        <span class="ml25" v-if="config.status == 335">等待录入尾款信息</span>
        <span class="ml25" v-if="config.status == 346">等待收付尾款</span>
        <span class="ml25" v-if="config.status == 347">等待通知提货</span>
        <span class="ml25" v-if="config.status == 351">等待确认提货时间</span>
        <span class="ml25" v-if="config.status == 352">等待确认供应商送货时间</span>
        <span class="ml25" v-if="config.status == 310">等待销售入仓</span>
        <span class="ml25" v-if="config.status == 388">履约中</span>
        <span class="ml25" v-if="config.status == 100">订单已经取消</span>
        <span class="ml25" v-if="config.status == 10">已完成</span> </p>
      <p class="status-spans">
        <span>{{(Number(config.taxPoint) > 0 || config.taxPoint === null) ? '发票税率：' + config.taxPoint + '%' : '不需要发票'}}</span>
        <span class="check" v-if="config.checkCloth == 1">验货</span>
        <span class="check" v-if="config.checkCloth == 0">不验货</span>
        <span class="sendType" v-if="config.sendType == 0">搜芽配送</span>
        <span class="sendType" v-if="config.sendType == 1">采购商自提</span> </p>
      <p>
        <el-row :gutter="10">
          <el-col :span="8">
            <span>下单时间：</span>{{config.createTime | formatTime}}</span>
          </el-col>
          <el-col :span="8">
            <p v-if="config.type < 3">
              <span>跟单员：</span>{{config.followerName || '--'}} / {{config.followerTel || '--'}}
            </p>
            <p v-if="config.type >= 3">
              <span>采购员：</span>{{config.guiderName || '--'}} / {{config.guiderTel || '--'}}
            </p>
          </el-col>
          <el-col :span="8">
            <p v-if="config.type < 3">
              <span>买货员：</span>{{config.purchaserName || '--'}} / {{config.purchaserTel || '--'}}
            </p>
            <p v-if="config.type >= 3">
              <span>销售员：</span>{{config.salerName || '--'}} / {{config.salerTel || '--'}}
            </p>
          </el-col>
        </el-row>
      </p>
      <p>
        <el-row :gutter="10">
          <el-col :span="8">
            <span>采购商：</span>{{config.customerCompany || '--'}} ( ID : {{config.customerNumber || '--'}} )
          </el-col>
          <el-col :span="8">
            <span>供应商：</span>{{config.showShopCompany}}
          </el-col>
          <el-col :span="8">
            <span>期待发货时间：</span>
            <template v-if="config.expectedSendTime">
              {{config.expectedSendTime | date('yyyy-MM-dd')}}
            </template>
            <template v-else>
              --
            </template>
          </el-col>
        </el-row>
      </p>
      <p>
        <span class="bold-text">收货人信息：</span>
        <template v-if="config.sendType == 0">
          {{config.addressName || '--'}} / {{config.addressTel || '--'}} / {{config.addressProvince}}{{config.addressCity}}{{config.addressArea}}{{config.addressAddr}}
        </template>
        <template v-if="config.sendType == 1">
          --
        </template>
      </p>
      <p>
        <span class="bold-text">备注：</span>{{config.remark}} </p>
      <div class="bb1se9 mb10"></div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="money-content" style="padding-bottom: 30px;">
            <el-row :gutter="10">
              <el-col :span="6">
                <span class="bg-yue">余额</span> </el-col>
              <el-col :span="16">
                <p class="label">可用余额：</p>
                <p class="bold-text size16">￥{{moneyObj.availableBalance | formatNumber}}</p>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6" v-if="moneyObj.hasOpenedBaitiao == 1">
          <div class="money-content">
            <el-row :gutter="10">
              <el-col :span="6"> <span class="bg-baitiao">白条</span> </el-col>
              <el-col :span="16">
                <p class="label">可用额度</p>
                <p class="bold-text size16">￥{{moneyObj.baitiaoRemainLine | formatNumber}}</p>
              </el-col>
            </el-row>
            <div class="bb1se9 mb10"></div>
            <el-row>
              <el-col :span="12" class="br1se9">
                <p class="edu-label ml25">总额：￥{{moneyObj.baitiaoCreditLine | formatNumber}}</p>
              </el-col>
              <el-col :span="12">
                <p class="edu-label ml25">预扣：￥{{moneyObj.baitiaoHoldMoney | formatNumber}}</p>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6" v-if="moneyObj.hasOpenedYanzhen == 1">
          <div class="money-content">
            <el-row :gutter="10">
              <el-col :span="6"> <span class="bg-yanzhen">信贷</span> </el-col>
              <el-col :span="16">
                <p class="label">可用额度</p>
                <p class="bold-text size16">￥{{moneyObj.yanzhenRemainLine | formatNumber}}</p>
              </el-col>
            </el-row>
            <div class="bb1se9 mb10"></div>
            <el-row>
              <el-col :span="12" class="br1se9">
                <p class="edu-label ml25">总额：￥{{moneyObj.yanzhenCreditLine | formatNumber}}</p>
              </el-col>
              <el-col :span="12">
                <p class="edu-label ml25">预扣：￥{{moneyObj.yanzhenHoldMoney | formatNumber}}</p>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="money-content">
            <el-row :gutter="10">
              <el-col :span="6"> <span class="bg-soouya">垫付</span> </el-col>
              <el-col :span="16">
                <p class="label">可用额度</p>
                <p class="bold-text size16">￥{{moneyObj.remainLine | formatNumber}}</p>
              </el-col>
            </el-row>
            <div class="bb1se9 mb10"></div>
            <el-row>
              <el-col :span="12" class="br1se9">
                <p class="edu-label ml25">总额：￥{{moneyObj.creditLine | formatNumber}}</p>
              </el-col>
              <el-col :span="12">
                <p class="edu-label ml25">预扣：￥{{moneyObj.holdMoney | formatNumber}}</p>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="activeName=='商品信息'" class="shareClass product-msg">
      <p class="bold-text">货号：{{config.productNumber}} <i :class="config.ziyingShopId ? 'bg-ziying ml25' : 'bg-feiziying ml25'"></i> </p>
      <el-table :data="colors" border>
        <el-table-column label="色号" align="left" prop="color"></el-table-column>
        <el-table-column label="销售单价" align="right">
          <template scope="scope"> <span>{{scope.row.salePrice | formatNumber}}&nbsp;{{scope.row.salePriceUnit}}</span> </template>
        </el-table-column>
        <el-table-column label="采购数量" align="right">
          <template scope="scope"> <span>{{scope.row.quantity | formatNumber}}&nbsp;{{scope.row.quantityUnit}}</span> </template>
        </el-table-column>
        <el-table-column label="客户设计款号" align="left" prop="outMaZhiRemark"></el-table-column>
      </el-table>
      <template v-if="config.ziyingShopId">
        <p class="bold-text">原供应商：{{config.shopCompany}}</p>
        <p>
          <el-row :gutter="10">
            <el-col :span="6"> <span>电话：{{config.shopTel}}</span> </el-col>
            <el-col :span="8">地址：{{`${config.shopProvince}${config.shopCity}${config.shopArea}${config.shopAddr}`}}</el-col>
          </el-row>
        </p>
        <p class="bold-text">原货号：{{config.clothShopOriginalNumber}}</p>
        <el-row>
          <el-col :span="4" style="min-width: 320px;">
            <div class="show-image">
              <el-col class="card" :href="item" v-lightbox="config.clothShopOriginalImgUrls" v-for="(item, index) in config.clothShopOriginalImgUrls" v-show="index == 0">
                <div class="length-text">
                  <p>商品图({{config.clothShopOriginalImgUrls.length}}张)</p>
                </div>
                <el-card :body-style="{ padding: '5px' }"> <img :src="item" class="image"> </el-card>
              </el-col>
              <el-col class="card" :href="item" v-lightbox="config.clothShopOriginalColorUrls" v-for="(item, index) in config.clothShopOriginalColorUrls" v-show="index == 0">
                <div class="length-text">
                  <p>色卡图({{config.clothShopOriginalColorUrls.length}}张)</p>
                </div>
                <el-card :body-style="{ padding: '5px' }"> <img :src="item" class="image"> </el-card>
              </el-col>
            </div>
          </el-col>
          <el-col :span="16">
            <p class="bold-text">品名：{{config.clothTitle}}</p>
            <p class="bgf8">
              <el-row :gutter="10">
                <el-col :span="11" class="pl15"> <span> <span class="bold-text">成分：</span>{{config.clothComposition}}</span>
                </el-col>
                <el-col :span="11" class="pl15"> <span> <span class="bold-text">幅宽：</span>{{config.clothWidth}}{{config.clothWidthUnit}}</span>
                </el-col>
              </el-row>
            </p>
            <p class="bgf8">
              <el-row :gutter="10">
                <el-col :span="11" class="pl15"> <span> <span class="bold-text">克重：</span>{{config.clothWeight}}{{config.clothWeightUnit}}</span>
                </el-col>
                <el-col :span="11" class="pl15"> <span> <span class="bold-text">空差：</span>{{config.clothShortWeight}}</span>
                </el-col>
              </el-row>
            </p>
            <p class="bgf8">
              <el-row :gutter="10">
                <el-col :span="11" class="pl15"> <span> <span class="bold-text">纸筒：</span>{{config.clothPaperTube}}</span>
                </el-col>
                <el-col :span="11" class="pl15"> <span> <span class="bold-text">公斤出米数：</span>{{config.clothMetrePerKilo}}米/公斤</span>
                </el-col>
              </el-row>
            </p>
          </el-col>
        </el-row>
      </template>
    </div>
    <Lightbox></Lightbox>
  </section>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import {
  newRequest,
  setCache,
  getCache,
} from 'utils/tool'
export default {
  name: 'order_product_msg',
  props: {
    'config': {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Lightbox,
  },
  data() {
    return {
      activeName: '订单信息',
      moneyObj: {},
      colors: [],
      reqing: false,
    }
  },
  watch: {
    config() {
      this.colors = []
      this.config.colors.map(item => {
        if (this.config.type < 3 && item.category == 1) {
          this.colors.push(item)
        }
        if (this.config.type == 3) {
          this.colors.push(item)
        }
      })
      if (!this.reqing) {
        this.getData()
      }
    }
  },
  mounted() {
    let tab = getCache({
      key: 'orderProductMsgTab',
    })
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    changeTab(tab) {
      this.activeName = tab
      setCache({
        key: 'orderProductMsgTab',
        value: this.activeName
      })
    },
    getData() {
      newRequest({
        url: '/redwood/account/CustomerAccount/getSummary',
        data: {
          id: this.config.customerId
        },
        method: 'get',
      }).then(res => {
        if (res.success == 1) {
          this.moneyObj = res.obj
        } else {
          this.$message.error(res.msg)
        }
        this.reqing = false
      })
    }
  },
  filters: {
    formatNumber(val) {
      if (Number(val) < 0 || val == null) {
        return '--'
      } else {
        return Number(val).toFixed(2)
      }
    }
  }
}

</script>
<style>


</style>
