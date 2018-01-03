<template>
  <section>
    <ul class="allDetail-tab">
      <li @click="changeTab('报价信息')" :class="activeName == '报价信息' ? 'isActive' : ''">报价信息</li>
      <li @click="changeTab('分账信息')" :class="activeName == '分账信息' ? 'isActive' : ''">分账信息</li>
    </ul>
    <div v-if="activeName=='报价信息'" class="shareClass quote-msg">
      <p>
        <el-row :gutter="10">
          <el-col :span="4">
            <span>
              <span class="bold-text">供应商：{{config.showShopCompany}}</span>
            </span>
          </el-col>
          <el-col :span="8">
            <p>
              <span class="bold-text">货号：{{config.productNumber}}</span>
              <img class="ml10" v-if="!config.ziyingShopId" src="~assets/images/feiziying.png" alt="" height="20">
              <img class="ml10" v-else="config.ziyingShopId" src="~assets/images/ziying.png" alt="" height="20">
            </p>
          </el-col>
        </el-row>
      </p>
      <p v-if="config.status != 304&&config.status != 100">
        <span v-if="config.needSoouyaMadan == 1" class="bg-madan">需要开搜芽码单</span>
        <span v-if="config.needSoouyaMadan == 0" class="bg-madan">不需要开搜芽码单</span>
        <span class="bg-taxPoint ml10">{{(Number(config.sellerTaxPoint) > 0 || config.sellerTaxPoint === null) ? '发票税率：' + config.sellerTaxPoint + '%' : '不需要发票'}}</span>
        <span v-if="config.productSource == 1" class="bg-source ml10">订货</span>
        <span v-if="config.productSource == 0" class="bg-source ml10">现货</span>
        <span v-if="config.needToPaySeller == 1" class="bg-pay ml10">需要付款给供应商</span>
        <span v-if="config.needToPaySeller == 0" class="bg-pay ml10">不需要付款给供应商</span>
      </p>
      <el-row :gutter="10">
        <el-col :span="4">
          <p class="label">销售货款</p>
          <p class="money-label">￥{{config.saleMoney | formatNumber}}</p>
        </el-col>
        <el-col :span="4">
          <p class="label">成本货款(不含税)</p>
          <p class="money-label">￥{{config.costMoneyOffTax | formatNumber}}</p>
        </el-col>
        <el-col :span="4">
          <p class="label">采购货款(不含税)</p>
          <p class="money-label">￥{{config.buyMoneyOffTax | formatNumber}}</p>
        </el-col>
        <el-col :span="4">
          <p class="label">毛利率</p>
          <p class="money-label">{{maoliPoint}}%</p>
        </el-col>
      </el-row>
      <div class="bb1se9"></div>
      <p class="bold-text">供应商收款方式</p>
      <p>
        <el-row :gutter="10">
          <el-col :span="6">
            <span v-if="config.bankCompany">收款企业：{{config.bankCompany}}</span>
            <span v-if="!config.bankCompany">收款人：{{config.bankRealName}}</span>
            <span class="bg-bank ml15" v-if="config.bankCompany">{{config.bankCompany ? '企业' : '个人'}}</span>
          </el-col>
          <el-col :span="6">
            <span>收款账号：{{config.bankNumber}}</span>
          </el-col>
          <el-col :span="6">
            <span>收款银行：{{config.bankName}}</span>
          </el-col>
        </el-row>
      </p>
      <p class="bole-text">细码单详情</p>
      <el-table :data="colors" border>
        <el-table-column label="色号" align="left" prop="color"></el-table-column>
        <el-table-column label="细码数" align="left" prop="xiMaShu" show-overflow-tooltip></el-table-column>
        <el-table-column label="采购数量" align="right" prop="">
          <template scope="scope">
            <span>{{scope.row.quantity | formatNumber}}&nbsp;{{scope.row.quantityUnit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="成本价" align="right" prop="">
          <template scope="scope">
            <span>{{scope.row.price | formatNumber}}&nbsp;{{scope.row.priceUnit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="采购价" align="right" prop="">
          <template scope="scope">
            <span>{{scope.row.buyPrice | formatNumber}}&nbsp;{{scope.row.buyPriceUnit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售价" align="right" prop="">
          <template scope="scope">
            <span>{{scope.row.salePrice | formatNumber}}&nbsp;{{scope.row.salePriceUnit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户设计款号" align="left" prop="outMaZhiRemark"></el-table-column>
      </el-table>
      <div class="show-image" style="margin-top: 20px;">
        <el-col class="card" v-if="config.madanUrls && config.madanUrls.length" :href="item" v-lightbox="config.madanUrls" v-for="(item, index) in config.madanUrls" v-show="index == 0">
          <div class="length-text">
            <p>销售码单({{config.madanUrls.length}}张)</p>
          </div>
          <el-card :body-style="{ padding: '5px' }">
            <img :src="item" class="image">
          </el-card>
        </el-col>
        <el-col class="card" @click.native="toSalerTable" v-if="!config.madanUrls || !config.madanUrls.length" v-for="(item, index) in ['http://www.soouya.com/upload/redwood/madan/61d98194-4960-4a48-a72a-90e89017fb33.jpg']" v-show="index == 0">
          <div class="length-text">
            <p>销售码单(1张)</p>
          </div>
          <el-card :body-style="{ padding: '5px' }">
            <img :src="item" class="image">
          </el-card>
        </el-col>
        <el-col class="card" v-if="!isSaler" @click.native="toGuiderTable" v-for="(item, index) in ['http://www.soouya.com/upload/redwood/madan/61d98194-4960-4a48-a72a-90e89017fb33.jpg']" v-show="index == 0">
          <div class="length-text">
            <p>采购员报价单(1张)</p>
          </div>
          <el-card :body-style="{ padding: '5px' }">
            <img :src="item" class="image">
          </el-card>
        </el-col>
        <el-col class="card" :href="item" v-lightbox="config.customerPayCredentialUrls" v-for="(item, index) in config.customerPayCredentialUrls" v-show="index == 0">
          <div class="length-text">
            <p>客户付款凭据({{config.customerPayCredentialUrls.length}}张)</p>
          </div>
          <el-card :body-style="{ padding: '5px' }">
            <img :src="item" class="image">
          </el-card>
        </el-col>
        <el-col class="card" v-if="!isSaler" :href="item" v-lightbox="config.sellerMadanUrls" v-for="(item, index) in config.sellerMadanUrls" v-show="index == 0">
          <div class="length-text">
            <p>原供应商码单({{config.sellerMadanUrls.length}}张)</p>
          </div>
          <el-card :body-style="{ padding: '5px' }">
            <img :src="item" class="image">
          </el-card>
        </el-col>
        <el-col class="card" v-if="!isSaler" :href="item" v-lightbox="config.sendCredentialUrls" v-for="(item, index) in config.sendCredentialUrls" v-show="index == 0">
          <div class="length-text">
            <p>物流凭据({{config.sendCredentialUrls.length}}张)</p>
          </div>
          <el-card :body-style="{ padding: '5px' }">
            <img :src="item" class="image">
          </el-card>
        </el-col>
      </div>
    </div>
    <div v-if="activeName=='分账信息'" class="shareClass pending-msg">
      <div v-if="!pendingData || !pendingData.length" style="height:100;text-align:center">
        <span>暂无数据</span>
      </div>
      <div v-else v-for="item in pendingData">
        <p v-if="item.status == 0" class="bg-wait">
          <i class='el-icon-information color2f'></i>
          <span class="color2f ml15">待分账</span>
          <span class="ml15">进入分账时间：{{item.statusTime | formatTime}}</span>
        </p>
        <p v-if="item.status == 1" class="bg-had">
          <i class='el-icon-information color4a'></i>
          <span class="color4a ml15">已分账</span>
          <span class="ml15">分账时间：{{item.statusTime | formatTime}}</span>
          <span class="ml15">付款方式：
            <span class="color4a" v-if="item.payWay == 'offline'">线下支付</span>
            <span class="color4a" v-else-if="item.payWay == 'yfb_pc'">线上支付</span>
            <span class="color4a" v-else>无需分账</span>
          </span>
        </p>
        <el-row :gutter="10" style="margin-top:10px;">
          <el-col :span="3" class="br1se9">
            <p class="label">款项类型</p>
            <p class="money-label" v-if="item.fundType == 1">全款</p>
            <p class="money-label" v-if="item.fundType == 2">定金</p>
            <p class="money-label" v-if="item.fundType == 3">尾款</p>
          </el-col>
          <el-col :span="3">
            <p class="label">成本货款(不含税)</p>
            <p class="money-label">￥{{item.costMoneyOffTax | formatNumber}}</p>
          </el-col>
          <el-col :span="3" :class="item.fundType == 1 ? 'br1se9' : ''">
            <p class="label">供应商税款</p>
            <p class="money-label">￥{{item.sellerTaxMoney | formatNumber}}</p>
          </el-col>
          <el-col :span="3" :class="item.fundType == 2 ? 'br1se9' : ''" v-if="item.fundType == 2 || item.fundType == 3">
            <p class="label">定金</p>
            <p class="money-label">{{item.earnestMoney | formatNumber}}</p>
          </el-col>
          <el-col :span="3" class="br1se9" v-if="item.fundType == 3">
            <p class="label">尾款</p>
            <p class="money-label">￥{{item.finalMoney | formatNumber}}</p>
          </el-col>
          <el-col :span="3">
            <p class="label">应付款</p>
            <p class="money-redLabel" v-if="item.fundType == 1">￥{{(Number(item.costMoneyOffTax) + Number(item.sellerTaxMoney)).toFixed(2)}}</p>
            <p class="money-redLabel" v-if="item.fundType == 2">￥{{item.earnestMoney | formatNumber}}</p>
            <p class="money-redLabel" v-if="item.fundType == 3">￥{{item.finalMoney | formatNumber}}</p>
          </el-col>
          <el-col :span="3" v-if="item.status == 1">
            <p class="label">已付款</p>
            <p class="money-redLabel" v-if="item.fundType == 1">￥{{(Number(item.costMoneyOffTax) + Number(item.sellerTaxMoney)).toFixed(2)}}</p>
            <p class="money-redLabel" v-if="item.fundType == 2">￥{{item.earnestMoney | formatNumber}}</p>
            <p class="money-redLabel" v-if="item.fundType == 3">￥{{item.finalMoney | formatNumber}}</p>
          </el-col>
        </el-row>
        <div v-if="item.status == 0">
          <p>通知付款备注：{{item.guiderRemark || '--'}}</p>
        </div>
        <div v-if="item.status == 1">
          <p class="bold-text">收款人信息</p>
          <p>
            <el-row :gutter="10">
              <el-col :span="6">
                <span>
                  <span class="bold-text">户名：</span>{{item.accountName || '--'}}
                </span>
              </el-col>
              <el-col :span="6">
                <span>
                  <span class="bold-text">银行账号：</span>{{item.accountNumber || '--'}}
                </span>
              </el-col>
              <el-col :span="6">
                <span>
                  <span class="bold-text">开户行：</span>{{item.accountBankName || '--'}}
                </span>
              </el-col>
            </el-row>
          </p>
          <el-row class="mb20">
            <el-col :span="4" class="show-image" style="margin-top: 20px; min-width:150px;">
              <el-col class="card" v-if="item.payUrls && item.payUrls.length" :href="urlitem" v-lightbox="urlitem.payUrls" v-for="(urlitem, urlindex) in item.payUrls" v-show="urlindex == 0">
                <div class="length-text">
                  <p>搜芽付款凭据({{item.payUrls.length}}张)</p>
                </div>
                <el-card :body-style="{ padding: '5px' }">
                  <img :src="urlitem" class="image">
                </el-card>
              </el-col>
              <div v-if="!item.payUrls.length">
                <img src="~assets/default_pic_detail.png" alt="" width="120">
              </div>
            </el-col>
            <el-col :span="16">
              <p style="margin-top:25px;">通知付款备注：{{item.guiderRemark || '--'}}</p>
              <p style="margin-top:25px;">财务付款备注：{{item.payRemark || '--'}}</p>
            </el-col>
          </el-row>
        </div>
      </div>
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
  name: 'quote_pending_msg',
  props: {
    'config': {
      type: Object,
      default: () => { }
    }
  },
  components: {
    Lightbox,
  },
  data() {
    let auth = getCache({ key: 'currentUser' })
    if (!auth) {
      auth = {}
    }
    return {
      activeName: '报价信息',
      colors: [],
      maoliPoint: '',
      isSaler: auth.loginInfo && (auth.loginInfo.woodSalesLeader || auth.loginInfo.woodSales),
      pendingData: []
    }
  },
  watch: {
    config() {
      this.colors = []
      this.config.colors.map(item => {
        if (item.category == 2) {
          this.colors.push(item)
        }
      })
      this.maoliPoint = ((Number(this.config.saleMoney) - Number(this.config.taxMoney) - Number(this.config.costMoneyOffTax)) / (Number(this.config.saleMoney) - Number(this.config.taxMoney)) * 100)
      this.maoliPoint = this.maoliPoint.toFixed(2);
      this.getData()
    }
  },
  mounted() {
    let tab = getCache({
      key: 'quotePendingMsgTab',
    })
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    getData() {
      newRequest({
        url: '/redwood/payGroupBulkDetail',
        data: {
          bulkId: this.config.id
        },
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          res.result.forEach(item => {
            // item.payUrls.push('/upload/redwood/madan/6fb4ba87-2483-49cf-b210-9b483b521851.png')
            for (let i = 0; i < item.payUrls.length; i++) {
              item.payUrls[i] = `http://www.soouya.com${item.payUrls[i]}`
            }
          })
          this.pendingData = res.result
        }
      })
    },
    changeTab(tab) {
      this.activeName = tab
      setCache({
        key: 'quotePendingMsgTab',
        value: this.activeName
      })
    },
    toGuiderTable() {
      window.open(`/print/guiderquotetable?orderNumber=${this.config.id}`)
    },
    toSalerTable() {
      window.open(`/print/guidersalestable?orderNumber=${this.config.id}&status=2`)
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
