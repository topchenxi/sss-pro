<template>
  <section v-loading.body="fullScreenLoading">
    <div class="detail-title big-font">
      <i @click="goBack" class="el-icon-arrow-left"></i>
      <span @click="goBack">订单详情</span>
    </div>
    <div class="bulkMsg-content">
      <p class="msg-title">订单详情</p>
      <p class="bold-font">订单号：{{obj.number}}</p>
      <span>下单时间：{{obj.createTime | formatTime}}</span>
      <span class="left-margin25">销售员：{{obj.salerName ? obj.salerName : '--'}}</span>
      <span class="left-margin25">采购商：{{obj.customerCompany}}</span>
      <table class="bulkDetail-table" border="1">
        <tbody>
          <tr>
            <td colspan="4" class="bold-font left-align">可用余额：
              <span class="red-color">{{customerObj.availableBalance | formatNumber}}元</span>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <span class="icon-green"></span>搜芽额度</td>
            <td>
              <span class="icon-yellow"></span>徙木额度</td>
            <td>
              <span class="icon-blue"></span>雁阵额度</td>
          </tr>
          <tr>
            <td class="left-align">可用额度</td>
            <td class="right-align">{{customerObj.remainLine | formatNumber}}元</td>
            <td class="right-align">{{customerObj.baitiaoRemainLine | formatNumber}}</td>
            <td class="right-align">{{customerObj.yanzhenRemainLine | formatNumber}}</td>
          </tr>
          <tr>
            <td class="left-align">总额度</td>
            <td class="right-align">{{customerObj.creditLine | formatNumber}}</td>
            <td class="right-align">{{customerObj.baitiaoCreditLine | formatNumber}}</td>
            <td class="right-align">{{customerObj.yanzhenCreditLine | formatNumber}}</td>
          </tr>
        </tbody>
      </table>
      <p>销售员备注：{{obj.leaveMessage}}</p>
      <p>采购员备注：{{obj.guiderRemark}}</p>
      <div class="f9-bg">
        <p>发票：{{obj.invoiceStatus == 1 ? '要' : '不要'}}</p>
        <p class="bottom-border-dashed"></p>
        <p>单位：{{obj.unit}}</p>
        <p>配送方式：
          <span v-if="obj.sendType == 0">搜芽配送</span>
          <span v-if="obj.sendType == 1">采购商自提</span>
          <span v-if="obj.sendType == 2">档口直发</span>
        </p>
        <p>收货信息：
          <span class="bold-font">{{obj.addressName}}</span>
          <span class="bold-font left-margin25">{{obj.addressTel}}</span>
        </p>
        <p class="left-margin72">{{obj.addressProvince + ' ' + obj.addressCity + ' ' + obj.addressArea + ' ' + obj.addressAddr}}</p>
      </div>
    </div>
    <div class="bulkMsg-content">
      <p class="msg-title">产品信息</p>
      <template v-if="obj.category != 3 && obj.shopId">
        <p>原供应商：
          <span class="bold-font">{{obj.shopCompany}}
            <span style="color:#3f3f3f;">(ID:{{obj.sellerNumber}})</span>
          </span>
        </p>
        <p class="left-margin72">{{obj.shopTel}}</p>
        <p class="left-margin72">{{obj.shopProvince + ' ' + obj.shopCity + ' ' + obj.shopArea + ' ' + obj.shopAddr}}</p>
      </template>
      <template v-if="obj.category == 3 && obj.ziyingSellerId">
        <p>原供应商：
          <span class="bold-font">{{obj.ziyingShopCompany}}
            <span style="color:#3f3f3f;">(ID:{{obj.ziyingSellerNumber}})</span>
          </span>
        </p>
        <p class="left-margin72">{{obj.ziyingShopTel}}</p>
        <p class="left-margin72">{{obj.ziyingShopProvince + ' ' + obj.ziyingShopCity + ' ' + obj.ziyingShopArea + ' ' + obj.ziyingShopAddr}}</p>
      </template>
      <p>原供应商货号：{{obj.clothShopOriginalNumber}}</p>
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="show-image-big">
            <el-col class="card" :href="item" :key="item" v-lightbox="obj.clothShopOriginalImgUrls" v-for="(item, index) in obj.clothShopOriginalImgUrls" v-show="index == 0">
              <div class="length-text">
                <p>商品图片
                  <span>({{obj.clothShopOriginalImgUrls.length}}张)</span>
                </p>
              </div>
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
              </el-card>
            </el-col>
          </div>
          <div class="show-image-big">
            <el-col class="card" :href="item" :key="item" v-lightbox="obj.clothShopOriginalColorUrls" v-for="(item, index) in obj.clothShopOriginalColorUrls" v-show="index == 0">
              <div class="length-text">
                <p>色卡图片
                  <span>({{obj.clothShopOriginalColorUrls.length}}张)</span>
                </p>
              </div>
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
              </el-card>
            </el-col>
          </div>
        </el-col>
        <el-col :span="17">
          <p class="f9-bg-p">品名：{{obj.clothTitle}}</p>
          <p class="f9-bg-p">幅宽：{{obj.clothWidth + ' ' + obj.clothWidthUnit}}
            <span class="left-margin30p">克重：{{obj.clothWeight + ' ' + obj.clothWeightUnit}}</span>
          </p>
          <p class="f9-bg-p">纸筒：{{obj.clothPaperTube}}
            <span class="left-margin30p">空差：{{obj.clothShortWeight}}</span>
          </p>
          <p class="f9-bg-p">公斤出米数：{{obj.clothMetrePerKilo}}公斤/米</p>
          <p class="f9-bg-p">成分：{{obj.clothComposition}}</p>
        </el-col>
      </el-row>
    </div>
    <div class="bulkMsg-content">
      <el-row :gutter="0">
        <div class="show-image">
          <template v-if="obj.madanUrls && obj.madanUrls.length">
            <el-col class="card" :href="item" :key="item" v-lightbox="obj.madanUrls" v-for="(item, index) in obj.madanUrls" v-show="index == 0">
              <div class="length-text">
                <p>销售码单
                  <span>({{obj.madanUrls.length}}张)</span>
                </p>
              </div>
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
              </el-card>
            </el-col>
          </template>
          <template v-else>
            <router-link :to="{name: 'bulkSalesTable', query: {orderNumber: obj.id, status: 2}}" target="_blank">
              <el-col class="card" :key="item" v-for="(item, index) in ['http://www.soouya.com/upload/redwood/madan/61d98194-4960-4a48-a72a-90e89017fb33.jpg']" v-show="index == 0">
                <div class="length-text">
                  <p>销售码单
                    <span>(1张)</span>
                  </p>
                </div>
                <el-card :body-style="{ padding: '5px' }">
                  <img :src="item" class="image">
                </el-card>
              </el-col>
            </router-link>
          </template>
        </div>
        <div class="show-image">
          <el-col class="card" :href="item" :key="item" v-lightbox="obj.customerPayCredentialUrls" v-for="(item, index) in obj.customerPayCredentialUrls" v-show="index == 0">
            <div class="length-text">
              <p>销售付款凭据
                <span>({{obj.customerPayCredentialUrls.length}}张)</span>
              </p>
            </div>
            <el-card :body-style="{ padding: '5px' }">
              <img :src="item" class="image">
            </el-card>
          </el-col>
        </div>
        <div class="show-image">
          <el-col class="card" :href="item" :key="item" v-lightbox="obj.sendCredentialUrls" v-for="(item, index) in obj.sendCredentialUrls" v-show="index == 0">
            <div class="length-text">
              <p>物流凭据
                <span>({{obj.sendCredentialUrls.length}}张)</span>
              </p>
            </div>
            <el-card :body-style="{ padding: '5px' }">
              <img :src="item" class="image">
            </el-card>
          </el-col>
        </div>
        <div class="show-image">
          <el-col class="card" :href="item" :key="item" v-lightbox="obj.soouyaPayCredentialUrls" v-for="(item, index) in obj.soouyaPayCredentialUrls" v-show="index == 0">
            <div class="length-text">
              <p>搜芽付款凭据
                <span>({{obj.soouyaPayCredentialUrls.length}}张)</span>
              </p>
            </div>
            <el-card :body-style="{ padding: '5px' }">
              <img :src="item" class="image">
            </el-card>
          </el-col>
        </div>
        <div class="show-image">
          <el-col class="card" :href="item" :key="item" v-lightbox="obj.sellerMadanUrls" v-for="(item, index) in obj.sellerMadanUrls" v-show="index == 0">
            <div class="length-text">
              <p>原供应商码单
                <span>({{obj.sellerMadanUrls.length}}张)</span>
              </p>
            </div>
            <el-card :body-style="{ padding: '5px' }">
              <img :src="item" class="image">
            </el-card>
          </el-col>
        </div>
        <div class="show-image">
          <router-link :to="{name: 'bulkQuoteTable', query: {orderNumber: obj.id}}" target="_blank">
            <el-col class="card" :key="item" v-for="(item, index) in ['http://www.soouya.com/upload/redwood/madan/61d98194-4960-4a48-a72a-90e89017fb33.jpg']" v-show="index == 0">
              <div class="length-text">
                <p>采购员报价单
                  <span>(1张)</span>
                </p>
              </div>
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
              </el-card>
            </el-col>
          </router-link>
        </div>
      </el-row>
    </div>
    <Lightbox></Lightbox>
  </section>
</template>

<script>
import request from '@/utils/request'
import Lightbox from '@/components/light-box/lightbox'
export default {
  components: {
    Lightbox
  },
  data() {
    return {
      fullScreenLoading: false,
      id: '',
      customerId: '',
      obj: {},
      customerObj: {},
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.customerId = this.$route.query.customerId
    this.getData()
    this.getCustomerData()
  },
  methods: {
    getData() {
      this.fullScreenLoading = true
      request(`/redwood/bulk/${this.id}`, {
        data: {},
        method: 'GET'
      }).then(res => {
        if (res.success == 1) {
          this.obj = res.obj
          // test
          // this.obj.clothShopOriginalColorUrls = ['/upload/redwood/madan/a4c54b9a-d2e3-4f6a-b970-122269e8b546.png']
          // this.obj.clothShopOriginalImgUrls = ['/upload/redwood/madan/a4c54b9a-d2e3-4f6a-b970-122269e8b546.png']
          // this.obj.madanUrls = ['/upload/redwood/madan/a4c54b9a-d2e3-4f6a-b970-122269e8b546.png']
          // this.obj.customerPayCredentialUrls = ['/upload/redwood/madan/a4c54b9a-d2e3-4f6a-b970-122269e8b546.png']
          // this.obj.sendCredentialUrls = ['/upload/redwood/madan/a4c54b9a-d2e3-4f6a-b970-122269e8b546.png']
          if (this.obj.clothShopOriginalColorUrls) {
            for (let i = 0; i < this.obj.clothShopOriginalColorUrls.length; i++) {
              this.obj.clothShopOriginalColorUrls[i] = 'http://www.soouya.com' + this.obj.clothShopOriginalColorUrls[i]
            }
          }
          if (this.obj.clothShopOriginalImgUrls) {
            for (let i = 0; i < this.obj.clothShopOriginalImgUrls.length; i++) {
              this.obj.clothShopOriginalImgUrls[i] = 'http://www.soouya.com' + this.obj.clothShopOriginalImgUrls[i]
            }
          }
          if (this.obj.madanUrls) {
            for (let i = 0; i < this.obj.madanUrls.length; i++) {
              this.obj.madanUrls[i] = 'http://www.soouya.com' + this.obj.madanUrls[i]
            }
          } else {
            this.obj.madanUrls = []
          }
          if (this.obj.customerPayCredentialUrls) {
            for (let i = 0; i < this.obj.customerPayCredentialUrls.length; i++) {
              this.obj.customerPayCredentialUrls[i] = 'http://www.soouya.com' + this.obj.customerPayCredentialUrls[i]
            }
          } else {
            this.obj.customerPayCredentialUrls = []
          }
          if (this.obj.sendCredentialUrls) {
            for (let i = 0; i < this.obj.sendCredentialUrls.length; i++) {
              this.obj.sendCredentialUrls[i] = 'http://www.soouya.com' + this.obj.sendCredentialUrls[i]
            }
          } else {
            this.obj.sendCredentialUrls = []
          }
          if (this.obj.soouyaPayCredentialUrls) {
            for (let i = 0; i < this.obj.soouyaPayCredentialUrls.length; i++) {
              this.obj.soouyaPayCredentialUrls[i] = 'http://www.soouya.com' + this.obj.soouyaPayCredentialUrls[i]
            }
          } else {
            this.obj.soouyaPayCredentialUrls = []
          }
          if (this.obj.sellerMadanUrls) {
            for (let i = 0; i < this.obj.sellerMadanUrls.length; i++) {
              this.obj.sellerMadanUrls[i] = 'http://www.soouya.com' + this.obj.sellerMadanUrls[i]
            }
          } else {
            this.obj.sellerMadanUrls = []
          }
        } else {
          this.$message.error(res.msg)
        }
        this.fullScreenLoading = false
      })
    },
    getCustomerData() {
      request('/redwood/account/CustomerAccount/getSummary', {
        data: {
          id: this.customerId
        },
        method: 'GET'
      }).then(res => {
        if (res.success == 1) {
          if (res.obj) {
            this.customerObj = res.obj
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    goBack() {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.bulkDetail-table {
  width: 65%;
  border-collapse: collapse;
  border-spacing: 0;
  border-color: #ddd;
  text-align: center;
  td {
    padding: 5px 10px;
    border: 1px solid #ddd;
  }
}
.icon-green {
  background-color: #2fb468;
  display: inline-block;
  width: 6px !important;
  height: 6px !important;
  border-radius: 3px;
  margin-right: 3px;
  vertical-align: middle;
}
.icon-yellow {
  background-color: #fa9d3b;
  display: inline-block;
  width: 6px !important;
  height: 6px !important;
  border-radius: 3px;
  margin-right: 3px;
  vertical-align: middle;
}
.icon-blue {
  background-color: #4990e2;
  display: inline-block;
  width: 6px !important;
  height: 6px !important;
  border-radius: 3px;
  margin-right: 3px;
  vertical-align: middle;
}
.left-margin72 {
  margin-left: 72px;
}
.show-image-big {
  .card {
    margin-top: -25px;
    width: 200px;
  }
  .image {
    width: 100%;
    height: 200px;
    cursor: pointer;
  }
  .length-text {
    position: relative;
    top: 212px;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    border-radius: 0 0 5px 5px;
    p {
      color: #f6f6f6;
      height: 25px;
      line-height: 25px;
    }
  }
}
.f9-bg-p {
  background-color: #f9f9f9;
  padding: 0px 15px;
}
.left-margin30p {
  margin-left: 30%;
}
.show-image {
  .card {
    margin-right: 15px;
  }
}
</style>
