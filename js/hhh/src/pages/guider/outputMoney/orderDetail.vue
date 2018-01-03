<template>
  <div class="detail">
    <div class="detail-title">
      <span @click="$router.go(-1)"></span>
      <p>订单详情</p>
    </div>
    <div class="detail-group">
      <div class="detail-item order-left">
        <h6>订单详情</h6>
        <dl class="info-item">
          <dt>订单号</dt>
          <dd>{{order.serviceNumber}}</dd>
        </dl>
        <dl class="info-item">
          <dt>下单时间</dt>
          <dd>{{order.createTime | formatTime}} 销售员 | {{order.salesName}} | {{order.salesTel}}</dd>
        </dl>
        <dl class="info-item">
          <dt>采购商</dt>
          <dd>{{order.customerCompany}}</dd>
        </dl>
        <div class="table-warp p14" style="width:90%">
          <table class="table-normal">
            <colgroup>
              <col width="25%">
              <col width="25%">
              <col width="25%">
              <col width="25%">
            </colgroup>
            <tbody>
              <tr>
                <td>可用余额</td>
                <td colspan="2" class="money">{{order.customerAccount.availableBalance | formatMoney}}</td>
                <td class="c999 ta-r">单位：元</td>
              </tr>
              <tr>
                <td>搜芽额度</td>
                <td>可用搜芽额度</td>
                <td>白条额度</td>
                <td>可用白条额度</td>
              </tr>
              <tr>
                <td>{{order.customerAccount.creditLine | formatMoney}}</td>
                <td>{{order.customerAccount.remainLine | formatMoney}}</td>
                <td>
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
                <td>
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
              </tr>
            </tbody>
          </table>
        </div>
        <dl class="info-item">
          <dt>销售员备注</dt>
          <dd>{{order.leaveMessage}}</dd>
        </dl>
        <dl class="info-item">
          <dt>采购员备注</dt>
          <dd>{{order.guiderRemark}}</dd>
        </dl>
      </div>
      <div class="detail-item fr ticket-wrap order-right">
        <div class="ticket">
          <dl class="info-item">
            <dt>发票</dt>
            <dd>
              <span v-if="order.invoiceStatus">要</span>
              <span v-else>不要</span>
            </dd>
          </dl>
          <dl class="info-item">
            <dt>单位</dt>
            <dd>{{order.unit}}</dd>
          </dl>
          <dl class="info-item">
            <dt>配送方式</dt>
            <dd>
              <span v-if="order.sendType == 1">采购商自提</span>
              <span v-else>搜芽配送</span>
            </dd>
          </dl>
          <dl class="info-item" v-if="order.sendType == 0">
            <dt>收货人信息</dt>
            <dd>
              <p v-if="order.address.name">{{order.address.name}}</p>
              <p> {{order.address.province}} {{order.address.city}} {{order.address.area}} {{order.address.addr}}</p>
              <p v-if="order.address.tel">{{order.address.tel}}</p>
            </dd>
          </dl>
        </div>
      </div>
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
    <div class="detail-group">
      <div class="detail-item" style="width:100%">
        <h6>报价信息</h6>
        <div class="image-list m14">
          <div class="show-image" v-if="saleMadanImgUrls.length">
            <el-col class="card" :href="item" :key="item" v-lightbox="saleMadanImgUrls" v-for="(item, index) in saleMadanImgUrls" v-show="index == 0">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
                <div style="padding: 0;">
                  <p>销售码单
                    <span>({{saleMadanImgUrls.length}}张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </div>
          <template v-else>
            <router-link class="show-image" :to="{name: 'guiderSalesTable', query: {orderNumber: order.orderNumber, status: 2}}" target="_blank">
              <el-col class="card" :key="item" v-for="(item, index) in ['http://www.soouya.com/upload/redwood/madan/61d98194-4960-4a48-a72a-90e89017fb33.jpg']" v-show="index == 0">
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
          <div class="show-image">
            <el-col class="card" :href="item" :key="item" v-lightbox="buyerCertificateList" v-for="(item, index) in buyerCertificateList" v-show="index == 0">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
                <div style="padding: 0;">
                  <p>销售付款凭据
                    <span>({{buyerCertificateList.length}}张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </div>
          <div class="show-image">
            <el-col class="card" :href="item" :key="item" v-lightbox="sendCertificateList" v-for="(item, index) in sendCertificateList" v-show="index == 0">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
                <div style="padding: 0;">
                  <p>物流凭据
                    <span>({{sendCertificateList.length}}张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </div>
          <div class="show-image w20 h150">
          </div>
          <div class="show-image">
            <el-col class="card" :href="item" :key="item" v-lightbox="soouyaCertificateList" v-for="(item, index) in soouyaCertificateList" v-show="index == 0">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
                <div style="padding: 0;">
                  <p>搜芽付款凭据
                    <span>({{soouyaCertificateList.length}}张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </div>
          <div class="show-image">
            <el-col class="card" :href="item" :key="item" v-lightbox="sellerMadanImgUrls" v-for="(item, index) in sellerMadanImgUrls" v-show="index == 0">
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
                <div style="padding: 0;">
                  <p>原供应商码单
                    <span>({{sellerMadanImgUrls.length}}张)</span>
                  </p>
                </div>
              </el-card>
            </el-col>
          </div>
          <router-link class="show-image" :to="{name: 'guiderQuoteTable', query: {orderNumber: order.orderNumber}}" target="_blank">
            <el-col class="card" :key="item" v-for="(item, index) in ['http://www.soouya.com/upload/redwood/madan/61d98194-4960-4a48-a72a-90e89017fb33.jpg']" v-show="index == 0">
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
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item" style="width:100%">
        <h6>对账信息</h6>
        <div class="table-wrap p14" style="width:80%;">
          <el-table :data="table" border :summary-method="getSummaries" show-summary class="table">
          <el-table-column label="提交对账时间" width="180" v-if="detailType == 'finshSubmit' || detailType == 'finshAccount'">
            <template scope="scope">
              {{scope.row.toReconciliationTime | formatData}}
            </template>
          </el-table-column>
          <el-table-column label="财务对账时间" width="180" v-if="detailType == 'finshAccount'">
            <template scope="scope">
              {{scope.row.reconciliationTime | formatData}}
            </template>
          </el-table-column>
          <el-table-column label="出仓时间" width="180">
            <template scope="scope">
              {{scope.row.outTime | formatData}}
            </template>
          </el-table-column>
          <el-table-column label="出仓单号" prop="number" width="150">
          </el-table-column>
          <el-table-column label="色号/匹号" width="150">
            <template scope="scope">
              <ul>
                <li v-for="item in scope.row.clothLoneList">{{item.color}}/{{item.number}}</li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="入仓实数" width="120">
            <template scope="scope">
              <ul>
                <li v-for="item in scope.row.clothLoneList">{{item.quantity}}{{item.quantityUnit}}</li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="实际布长" width="120">
            <template scope="scope">
              <ul>
                <li v-for="item in scope.row.clothLoneList">{{item.buchang}}{{item.buchangUnit}}</li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="应收出仓销售货款" width="120">
            <template scope="scope">
              <span v-if="scope.row.needSaleMoney != null">{{scope.row.needSaleMoney}}元 </span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="运费" width="120">
            <template scope="scope">
              <span v-if="scope.row.freightMoney != null">{{scope.row.freightMoney}}元 </span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="已垫付运费">
            <template scope="scope">
              <span v-if="scope.row.freightMoneyNoTax != null">{{scope.row.freightMoneyNoTax}}元 </span>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
        </div>
        
      </div>
    </div>
    <lightbox />
  </div>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
// import config from './data.json'
import {
  newRequest,
  formatTimeString
} from 'utils/tool'
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
        customerAccount: '',
        address: '',
      },
      product: {},
      shopOriginalImgUrls: [],
      shopOriginalColorUrls: [],
      sellerMadanImgUrls: [],
      buyerCertificateList: [],
      soouyaCertificateList: [],
      sendCertificateList: [],
      inreposity: null,
      outreposity: null,
      imgPath: 'http://www.soouya.com',
      table: [],
    }
  },
  filters: {
    formatData(val) {
      return Number(val) != 0 ? formatTimeString(val) : '--'
    },
    formatNumber(val) {
      if (val) {
        val = val.toFixed(2)
        return val;
      } else {
        return '0.00'
      }
    }
  },
  mounted() {
    this.$store.dispatch('changeload', false)
    this.getData()
    // this.table.push(config.obj.outReposity)
    // console.log(this.table)
    this.detailType = this.$route.query.detailType
  },
  watch: {
    form: {
      handler: function(form) {
        this.reasonLength = form.reason.length
        console.log(form)
      },
      deep: true
    }
  },
  methods: {
    getData() {
      newRequest({
        url: '/redwood/reposity/OutReposity/getById/',
        data: {
          id: this.$route.query.id
        },
        contentType: 'application/json',
        method: 'get',
      }).then(res => {
        if (res.success == 1) {
          this.order = res.obj.order;
          this.product = res.obj.product;
          this.price = res.obj.price;
          if (res.obj.outReposity) {
            this.sendCertificateList = this.formateImgList(res.obj.outReposity.sendCertificateList)
          }
          if (this.product) {
            this.shopOriginalImgUrls = this.formateImgList(this.product.shopOriginalImgUrls)
            this.shopOriginalColorUrls = this.formateImgList(this.product.shopOriginalColorUrls)
          }
          if (this.price) {
            this.sellerMadanImgUrls = this.formateImgList(this.price.sellerMadanImgUrls)
            this.buyerCertificateList = this.formateImgList(this.price.buyerCertificateList)
            this.soouyaCertificateList = this.formateImgList(this.price.soouyaCertificateList)
            this.saleMadanImgUrls = this.formateImgList(this.price.saleMadanImgUrls)
          }
          this.table.push(res.obj.outReposity)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    culAdd(arr, type) {
      var val = '';
      if (arr) {
        val = arr.reduce(function(prev, current, index, array) {
          return prev + current[type]
        }, 0);
      }
      return +val;
    },
    formateImgList(list) {
      let arr = []
      if (Array.isArray(list)) {
        arr = list.map((item) => {
          return this.imgPath + item
        })
      }
      return arr
    },
    getSummaries(param) {
      const { columns, data } = param;
      console.log(data)
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '';
          return;
        }
        var allQuantity = data[0].clothLoneList.reduce(function(prev, current, index, array) {
          return prev + current.quantity
        }, 0);
        var allBuchang = data[0].clothLoneList.reduce(function(prev, current, index, array) {
          return prev + current.buchang
        }, 0);
        if (this.detailType == 'waitSubmit') {
          sums[3] = allQuantity + data[0].clothLoneList[0].quantityUnit;
          sums[4] = allBuchang + data[0].clothLoneList[0].buchangUnit;
          sums[5] = data[0].needSaleMoney ? data[0].needSaleMoney + '元' : null
          sums[6] = data[0].freightMoney ? data[0].freightMoney + '元' : null
          sums[7] = data[0].freightMoneyNoTax ? data[0].freightMoneyNoTax + '元' : null
        }
        if (this.detailType == 'finshSubmit') {
          sums[4] = allQuantity + data[0].clothLoneList[0].quantityUnit;
          sums[5] = allBuchang + data[0].clothLoneList[0].buchangUnit;
          sums[6] = data[0].needSaleMoney ? data[0].needSaleMoney + '元' : null
          sums[7] = data[0].freightMoney ? data[0].freightMoney + '元' : null
          sums[8] = data[0].freightMoneyNoTax ? data[0].freightMoneyNoTax + '元' : null
        }
        if (this.detailType == 'finshAccount') {
          sums[5] = allQuantity + data[0].clothLoneList[0].quantityUnit;
          sums[6] = allBuchang + data[0].clothLoneList[0].buchangUnit;
          sums[7] = data[0].needSaleMoney ? data[0].needSaleMoney + '元' : null
          sums[8] = data[0].freightMoney ? data[0].freightMoney + '元' : null
          sums[9] = data[0].freightMoneyNoTax ? data[0].freightMoneyNoTax + '元' : null
        }
      })
      return sums;
    }
  }
}

</script>
<style lang="scss">
.check-table {
  .el-table__footer-wrapper {
    tbody {
      td {
        color: red;
        font-weight: 700;
      }
    }
  }
}

</style>
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
