<template>
  <div  v-loading.body.lock="fullscreenLoading" element-loading-text="拼命加载中">
    <h4>订单详情
      <el-button style="margin-left: 5px;" size="mini" type="primary" @click="$router.go(-1)">返回</el-button>
    </h4>
    <div class="order-detail">
      <el-form label-width="200px" :model="order">
        <el-form-item label="订单号:">
          <el-col :span="18">
            {{order.serviceNumber}}
          </el-col>
        </el-form-item>
        <el-form-item label="下单时间:">
          <el-col :span="18">
            {{order.createTime | formatData}} (销售员
            <span class="split"></span>{{order.salesName}}
            <span class="split"></span>{{order.salesTel}})
          </el-col>
        </el-form-item>
        <el-form-item label="采购商:">
          <el-col :span="18">
            <span>{{order.customerCompany}}</span>
            <table class="shop-company-table">
              <thead>
                <tr>
                  <th style="width:180px;background:white">
                    可用余额（元）
                  </th>
                  <th style="width:180px">
                    搜芽额度（元）
                  </th>
                  <th style="width:180px">
                    可用搜芽额度（元）
                  </th>
                  <th style="width:180px">
                    徙木额度（元）
                  </th>
                  <th style="width:180px">
                    可用徙木额度（元）
                  </th>
                  <th style="width:180px">
                    雁阵额度（元）
                  </th>
                  <th style="width:180px">
                    可用雁阵额度（元）
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="width:180px;text-align:center;background:white">
                    {{order.customerAccount.availableBalance | formatNumber}}
                  </td>
                  <td style="width:180px;text-align:center">
                    {{order.customerAccount.creditLine | formatNumber}}
                  </td>
                  <td style="width:180px;text-align:center">
                    {{order.customerAccount.remainLine | formatNumber}}
                  </td>
                  <td style="width:180px;text-align:center">
                    <span v-if="order.customerAccount.baitiaoCreditLine && order.customerAccount.hasOpenedBaitiao == 1">
                      {{order.customerAccount.baitiaoCreditLine | formatNumber}}
                    </span>
                    <span v-if="order.customerAccount.hasOpenedBaitiao == 0">
                      --
                    </span>
                    <span v-if="order.customerAccount.hasOpenedBaitiao != 0 && !order.customerAccount.baitiaoCreditLine">
                      0.00
                    </span>
                  </td>
                  <td style="width:180px;text-align:center">
                    <span v-if="order.customerAccount.baitiaoRemainLine && order.customerAccount.hasOpenedBaitiao == 1">
                      {{order.customerAccount.baitiaoRemainLine | formatNumber}}
                    </span>
                    <span v-if="order.customerAccount.hasOpenedBaitiao == 0">
                      --
                    </span>
                    <span v-if="order.customerAccount.hasOpenedBaitiao != 0 && !order.customerAccount.baitiaoRemainLine">
                      0.00
                    </span>
                  </td>
                  <td style="width:180px;text-align:center">
                    <span v-if="order.customerAccount.baitiaoCreditLine && order.customerAccount.hasOpenedBaitiao == 1">
                      {{order.customerAccount.yanzhenCreditLine | formatNumber}}
                    </span>
                    <span v-if="order.customerAccount.hasOpenedBaitiao == 0">
                      --
                    </span>
                    <span v-if="order.customerAccount.hasOpenedBaitiao != 0 && !order.customerAccount.baitiaoCreditLine">
                      0.00
                    </span>
                  </td>
                  <td style="width:180px;text-align:center">
                    <span v-if="order.customerAccount.baitiaoRemainLine && order.customerAccount.hasOpenedBaitiao == 1">
                      {{order.customerAccount.yanzhenRemainLine | formatNumber}}
                    </span>
                    <span v-if="order.customerAccount.hasOpenedBaitiao == 0">
                      --
                    </span>
                    <span v-if="order.customerAccount.hasOpenedBaitiao != 0 && !order.customerAccount.baitiaoRemainLine">
                      0.00
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </el-col>
        </el-form-item>
        <el-form-item label="销售员备注:">
          <el-col :span="18">
            <p class="order-msg"> {{order.leaveMessage}}</p>
          </el-col>
        </el-form-item>
        <el-form-item label="采购员备注:">
          <el-col :span="18">
            <p class="order-msg"> {{order.guiderRemark}}</p>
          </el-col>
        </el-form-item>
        <hr>
        <el-form-item label="发票:">
          <el-col :span="18">
            <span v-if="order.invoiceStatus">要</span>
            <span v-else>不要</span>
          </el-col>
        </el-form-item>
        <el-form-item label="单位:">
          <el-col :span="18">
            {{order.unit}}
          </el-col>
        </el-form-item>
        <el-form-item label="配送方式:">
          <el-col :span="18">
            <span v-if="order.sendType == 0">搜芽配送</span>
            <span v-if="order.sendType == 1">采购商自提 </span>
          </el-col>
        </el-form-item>
        <el-form-item label="收货人信息:" v-if="order.sendType == 0">
          <el-col :span="18">
            <h4 class="order-msg">{{order.address.name}}</h4>
            <p class="order-msg">
              {{order.address.tel}}
            </p>
            <p class="order-msg">
              {{order.address.province}} {{order.address.city}} {{order.address.area}} {{order.address.addr}}
            </p>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <template v-if="product">
      <h4>产品信息</h4>
      <div class="product-msg">
        <el-form ref="form" label-width="200px">
          <el-form-item label="原供应商:">
            <el-col :span="18">
              <h4 class="order-msg">{{product.shopCompany}}(ID:{{product.sellerNumber}})</h4>
              <p class="order-msg">
                {{product.shopTel}}
              </p>
              <p class="order-msg">
                {{product.shopProvince}} {{product.shopCity}} {{product.shopArea}} {{product.shopAddr}}
              </p>
            </el-col>
          </el-form-item>
          <el-form-item label="原供应商货号:">
            <el-col :span="18">
              {{product.shopOriginalNumber}}
            </el-col>
          </el-form-item>
          <el-form-item label="原供应商图片:">
            <el-col :span="18">
              <div class="show-image">
                <el-col style="margin-right: 10px;" class="card" :href="item" :key="item" v-lightbox="shopOriginalImgUrls" v-for="(item, index) in shopOriginalImgUrls" v-show="index == 0">
                  <el-card :body-style="{ padding: '5px' }">
                    <img :src="item" class="image">
                    <div style="padding: 0;">
                      <p>商品图片
                        <span>({{shopOriginalImgUrls.length}}张)</span>
                      </p>
                    </div>
                  </el-card>
                </el-col>
                <el-col style="margin-right: 10px;" class="card" :href="item" :key="item" v-lightbox="shopOriginalColorUrls" v-for="(item, index) in shopOriginalColorUrls" v-show="index == 0">
                  <el-card :body-style="{ padding: '5px' }">
                    <img :src="item" class="image">
                    <div style="padding: 0;">
                      <p>色卡图片
                        <span>({{shopOriginalColorUrls.length}}张)</span>
                      </p>
                    </div>
                  </el-card>
                </el-col>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="商品信息:">
            <el-col :span="18">
              <table class="product-msg-table">
                <thead>
                  <tr>
                    <th style="width:180px;">
                      品名
                    </th>
                    <th style="width:180px">
                      成分
                    </th>
                    <th style="width:180px">
                      幅宽
                    </th>
                    <th style="width:180px">
                      克重
                    </th>
                    <th style="width:180px">
                      空差
                    </th>
                    <th style="width:180px">
                      纸筒
                    </th>
                    <th style="width:180px">
                      公斤出米数
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="width:180px;text-align:center;">
                      {{product.title}}
                    </td>
                    <td style="width:180px;text-align:center">
                      {{product.composition}}
                    </td>
                    <td style="width:180px;text-align:center">
                      <span v-if="!product.width || product.width == -1"></span>
                      <span v-else> {{product.width}}{{product.widthUnit}}</span>
                    </td>
                    <td style="width:180px;text-align:center">
                      <span v-if="!product.weight || product.weight == -1"></span>
                      <span v-else> {{product.weight}}{{product.weightUnit}}</span>
                    </td>
                    <td style="width:180px;text-align:center">
                      {{product.shortWeight}}
                    </td>
                    <td style="width:180px;text-align:center">
                      {{product.paperTube}}
                    </td>
                    <td style="width:180px;text-align:center">
                      <span v-if="!product.metrePerKilo || product.metrePerKilo == -1"></span>
                      <span v-else> {{product.metrePerKilo}}米/公斤</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <h4>报价信息</h4>
    <div class="price-msg">
      <el-col :span="22">
        <div class="price-show-image">
          <!-- 待定 -->
          <template v-if="saleMadanImgUrls.length">
            <el-col style="margin-right: 10px;" class="card" :href="item" :key="item" v-lightbox="saleMadanImgUrls" v-for="(item, index) in saleMadanImgUrls" v-show="index == 0">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
                <div style="padding: 0;">
                  <p>销售码单
                    <span>({{saleMadanImgUrls.length}}张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </template>
          <template v-else>
            <router-link :to="{name: 'bulkSalesTable', query: {orderNumber: order.orderNumber, status: 2}}" target="_blank">
              <el-col style="margin-right: 10px;" class="card" :key="item" v-for="(item, index) in ['http://www.soouya.com/upload/redwood/madan/61d98194-4960-4a48-a72a-90e89017fb33.jpg']" v-show="index == 0">
                <el-card :body-style="{ padding: '5px' }">
                  <img :src="item" class="image">
                  <div style="padding: 0;">
                    <p>销售码单
                      <span>(1张)</span>
                    </p>
                  </div>
                </el-card>
              </el-col>
            </router-link>
          </template>
          <el-col style="margin-right: 10px;" class="card" :href="item" :key="item" v-lightbox="buyerCertificateList" v-for="(item, index) in buyerCertificateList" v-show="index == 0">
            <el-card :body-style="{ padding: '5px' }">
              <img :src="item" class="image">
              <div style="padding: 0;">
                <p>销售付款凭据
                  <span>({{buyerCertificateList.length}}张)</span>
                </p>
              </div>
            </el-card>
          </el-col>
          <el-col style="margin-right: 10px;" class="card" :href="item" :key="item" v-lightbox="sendCertificateList" v-for="(item, index) in sendCertificateList" v-show="index == 0">
            <el-card :body-style="{ padding: '5px' }">
              <img :src="item" class="image">
              <div style="padding: 0;">
                <p>物流凭据
                  <span>({{sendCertificateList.length}}张)</span>
                </p>
              </div>
            </el-card>
          </el-col>
          <span class="split-line">

          </span>
          <el-col style="margin-right: 10px;" class="card" :href="item" :key="item" v-lightbox="soouyaCertificateList" v-for="(item, index) in soouyaCertificateList" v-show="index == 0">
            <el-card :body-style="{ padding: '5px' }">
              <img :src="item" class="image">
              <div style="padding: 0;">
                <p>搜芽付款凭据
                  <span>({{soouyaCertificateList.length}}张)</span>
                </p>
              </div>
            </el-card>
          </el-col>
          <el-col style="margin-right: 10px;" class="card" :href="item" :key="item" v-lightbox="sellerMadanImgUrls" v-for="(item, index) in sellerMadanImgUrls" v-show="index == 0">
            <el-card :body-style="{ padding: '5px' }">
              <img :src="item" class="image">
              <div style="padding: 0;">
                <p>原供应商码单
                  <span>({{sellerMadanImgUrls.length}}张)</span>
                </p>
              </div>
            </el-card>
          </el-col>
          <router-link :to="{name: 'bulkQuoteTable', query: {orderNumber: order.orderNumber}}" target="_blank">
            <el-col style="margin-right: 10px;" class="card" :key="item" v-for="(item, index) in ['http://www.soouya.com/upload/redwood/madan/61d98194-4960-4a48-a72a-90e89017fb33.jpg']" v-show="index == 0">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
                <div style="padding: 0;">
                  <p>采购员报价单
                    <span>(1张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </router-link>
        </div>
      </el-col>
    </div>
    <lightbox />
  </div>
</template>
<script>
import Lightbox from '@/components/light-box/lightbox'
import formatTime from '@/utils/formatTime'
import request from '@/utils/request'
export default {
  components: {
    Lightbox
  },
  data() {
    return {
      saleMadanImgUrls: [],
      detailType: null,
      order: {
        serviceNumber: '',
        customerAccount: {},
        address: {}
      },
      product: {
      },
      shopOriginalImgUrls: [],
      shopOriginalColorUrls: [],
      sellerMadanImgUrls: [],
      buyerCertificateList: [],
      soouyaCertificateList: [],
      sendCertificateList: [],
      fullscreenLoading: false,
      imgPath: 'http://www.soouya.com'
    }
  },
  filters: {
    formatData(val) {
      return Number(val) !== 0 ? formatTime(val) : '--'
    },
    formatNumber(val) {
      if (val) {
        val = val.toFixed(2)
        return val
      } else {
        return '0.00'
      }
    }
  },
  mounted() {
    this.detailType = this.$route.query.detailType
    this.getData()
  },
  methods: {
    getData() {
          request('/redwood/bulk/' + this.$route.query.orderNumber, {
            method: 'GET',
          }).then((res) => {
            this.fullscreenLoading = false
            if (res.success == 1) {
              this.order.orderNumber = this.$route.query.orderNumber/* 把路由的orderunmber获取了用于上面销售码单跳转路由的时候用 */
              this.order.serviceNumber = res.obj.number
              this.order.createTime = res.obj.createTime
              this.order.salesName = res.obj.salerName
              this.order.salesTel = res.obj.salerTel
              this.order.customerCompany = res.obj.customerCompany
              this.order.leaveMessage = res.obj.remark
              this.order.guiderRemark = res.obj.guiderRemark
              this.order.invoiceStatus = res.obj.needInvoice
              this.order.unit = res.obj.colors[0].quantityUnit
              this.order.sendType = res.obj.sendType
              this.order.address.name = res.obj.addressName
              this.order.address.province = res.obj.addressProvince
              this.order.address.city = res.obj.addressCity
              this.order.address.area = res.obj.addressArea
              this.order.address.addr = res.obj.addressAddr
              this.order.address.tel = res.obj.addressTel
              this.saleMadanImgUrls = this.formateImgList(res.obj.madanUrls)
                this.buyerCertificateList = this.formateImgList(res.obj.customerPayCredentialUrls)
                this.sendCertificateList = this.formateImgList(res.obj.sendCredentialUrls)
                this.soouyaCertificateList = this.formateImgList(res.obj.soouyaPayCredentialUrls)
                this.sellerMadanImgUrls = this.formateImgList(res.obj.sellerMadanUrls)
              if (res.obj.ziyingShopId) { // 判断是否有产品信息
                this.product = {}
                this.product.shopCompany = res.obj.shopCompany
                this.product.sellerNumber = res.obj.sellerNumber
                this.product.shopTel = res.obj.shopTel
                this.product.shopProvince = res.obj.shopProvince
                this.product.shopCity = res.obj.shopCity
                this.product.shopArea = res.obj.shopArea
                this.product.shopAddr = res.obj.shopAddr
                this.product.shopOriginalNumber = res.obj.clothShopOriginalNumber
                this.shopOriginalImgUrls = this.formateImgList(res.obj.clothShopOriginalImgUrls)
                this.shopOriginalColorUrls = this.formateImgList(res.obj.clothShopOriginalColorUrls)
                this.product.title = res.obj.clothTitle
                this.product.composition = res.obj.clothComposition
                this.product.width = res.obj.clothWidth
                this.product.widthUnit = res.obj.clothWidthUnit
                this.product.weight = res.obj.clothWeight
                this.product.shortWeight = res.obj.clothShortWeight
                this.product.paperTube = res.obj.clothPaperTube
                this.product.metrePerKilo = res.obj.clothMetrePerKilo
              } else {
                this.product = null
              }
            } else {
              this.$message.error(res.msg)
            }
          })
          request('/redwood/account/CustomerAccount/getSummary', {
            method: 'GET',
            data: {
              id: this.$route.query.customerId
            }
          }).then(res => {
            if (res.success == 1) {
              this.order.customerAccount = res.obj
            }
          })
    },
    formateImgList(list) {
      let arr = []
      if (Array.isArray(list)) {
        arr = list.map((item) => {
          return this.imgPath + item
        })
      }
      return arr
    }
  }
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
}

.order-detail {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 15px;
  .el-form-item {
    margin-bottom: 0;
  }
  hr {
    border: none;
    border-top: 1px solid #ddd;
  }
}

.product-msg {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 15px;
  .el-form-item {
    margin-bottom: 0;
  }
}

.price-msg {
  border: 1px solid #ddd;
  padding: 15px;
  height: 192px;
  margin-bottom: 15px;
}

.split {
  display: inline-block;
  width: 1px;
  height: 12px;
  background: black;
  margin: -1px 8px;
}

table {
  border: 1px solid #ddd;
  border-collapse: collapse;
  &.shop-company-table {
    tr {
      background: #f5f5f5;
    }
    td {
      background: #f5f5f5;
    }
  }
  &.product-msg-table {
    margin-top: 10px;
  }
  &.outreposity-table {
    width: 100%;
    th {
      height: 37px;
    }
  }
  &.inreposity-table {
    th {
      height: 37px;
    }
  }
  th {
    border: 1px solid #ddd;
  }
  td {
    border: 1px solid #ddd;
    word-break: break-all;
    line-height: 20px;
  }
}

.order-msg {
  line-height: 20px;
  margin: 8px 0;
  word-break: break-all;
}

.show-image {
  .card {
    width: 200px;
  }
  .image {
    width: 100%;
    height: 200px;
    cursor: pointer;
  }
}

.order-msg {
  line-height: 20px;
  margin: 8px 0;
  word-break: break-all;
}

.price-show-image {
  font-size: 14px;
  .card {
    width: 140px;
  }
  .image {
    width: 100%;
    height: 120px;
    cursor: pointer;
  }
}

.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

strong {
  color: red;
}

.split-line {
  display: inline-block;
  height: 160px;
  width: 2px;
  background: red;
  float: left;
  margin: 0 20px;
}
</style>
