<template>
  <section v-loading.body="fullScreenLoading">
    <div class="detail-title big-font">
      <i @click="goBack" class="el-icon-arrow-left"></i>
      <span @click="goBack">订单详情</span>
    </div>
    <div class="cutMsg-content">
      <p class="msg-title">采购商/供应商信息</p>
      <span>订单号：{{obj.number}}</span>
      <span class="left-margin25">订单时间：{{obj.createTime | formatTime}}</span>
      <p class="bottom-border-dashed"></p>
      <el-row :gutter="20" style="margin-top: 5px;">
        <el-col :span="11">
          <p>
            <i class="icon-cai">采</i>&nbsp;采购商：</p>
          <span class="bold-font">{{obj.customerCompany}}</span>
          <span class="left-margin25 bold-font">{{obj.customerTel}}</span>
          <p>收货地址：</p>
          <span class="bold-font">{{obj.addressName}}</span>
          <span class="bold-font left-margin25">{{obj.addressTel}}</span>
          <p>{{obj.addressProvince}}{{obj.addressCity}}{{obj.addressArea}}{{obj.addressAddr}}</p>
        </el-col>
        <el-col :span="11">
          <p>
            <i class="icon-gong">供</i>&nbsp;供应商：</p>
          <span class="bold-font">{{obj.shopCompany}}</span>
          <span class="bold-font left-margin25">{{obj.shopTel}}</span>
          <p>{{obj.shopProvince + obj.shopCity + obj.shopArea + obj.shopAddr}}</p>
        </el-col>
      </el-row>
    </div>
    <div class="cutMsg-content">
      <p class="msg-title">货号信息</p>
      <template v-for="(productItem, productIndex) in obj.productNumbers">
        <div class="product-msg" :key="productIndex">
          <p class="forgive-color">货号：{{productItem.number}}</p>
          <p>品名：{{productItem.title}}</p>
          <el-row>
            <el-col :span="4" style="min-width: 280px;">
              <div class="show-image">
                <el-col class="card" :href="item" :key="item" v-lightbox="productItem.imgUrls" v-for="(item, index) in productItem.imgUrls" v-show="index == 0">
                  <div class="length-text">
                    <p>商品图片({{productItem.imgUrls.length}}张)</p>
                  </div>
                  <el-card :body-style="{ padding: '5px' }">
                    <img :src="item" class="image">
                  </el-card>
                </el-col>
                <el-col style="margin-left:20px;" class="card" :href="item" :key="item" v-lightbox="productItem.colorUrls" v-for="(item, index) in productItem.colorUrls" v-show="index == 0">
                  <div class="length-text">
                    <p>色卡图片({{productItem.colorUrls.length}}张)</p>
                  </div>
                  <el-card :body-style="{ padding: '5px' }">
                    <img :src="item" class="image">
                  </el-card>
                </el-col>
              </div>
            </el-col>
            <el-col :span="10">
              <table class="detail-table" v-if="productItem.colors && productItem.colors.length">
                <thead>
                  <tr>
                    <th width="100">色号</th>
                    <th width="100">数量</th>
                    <th width="100">采购数量</th>
                    <th width="100">销售价</th>
                    <th width="100">采购单价</th>
                    <th width="100">成本单价</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(colorItem,colorIndex) in productItem.colors">
                    <tr :key="colorIndex">
                      <td>{{colorItem.color}}
                        <span v-if="colorItem.status == 0">无货</span>
                      </td>
                      <td>{{colorItem.followerQuantity | formatNumber}}{{colorItem.followerQuantityUnit}}</td>
                      <td>{{colorItem.cutterPriceMoney | formatNumber}}{{colorItem.cutterPriceMoneyUnit}}</td>
                      <td>{{colorItem.salePriceMoney | formatNumber}}{{colorItem.salePriceUnit}}</td>
                      <td>{{colorItem.cutterPriceMoney | formatNumber}}{{colorItem.cutterPriceMoneyUnit}}</td>
                      <td>{{colorItem.followerPriceMoney | formatNumber}}{{colorItem.followerPriceMoneyUnit}}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </div>
      </template>
    </div>
    <div class="cutMsg-content">
      <p class="msg-title">其他</p>
      <p>是否需要发票：{{obj.needInvoice == 1 ? '需要' : '不需要'}}</p>
      <p>发票税率：{{obj.taxPoint | formatNumber}}%</p>
      <p>期待发货时间：{{obj.expectedSendTime | formatDate}}</p>
      <p class="bottom-border-dashed"></p>
      <p>码单号：{{obj.madan}}</p>
      <el-row>
        <el-col :span="10">
          <div class="show-image">
            <el-col v-if="obj.status != 500 && obj.status != 530" class="card" :href="item" :key="item" v-lightbox="obj.madanUrls" v-for="(item, index) in obj.madanUrls" v-show="index == 0">
              <div class="length-text">
                <p>档口码单({{obj.madanUrls.length}}张)</p>
              </div>
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
              </el-card>
            </el-col>
            <el-col v-if="obj.status == 522 || obj.status == 523" class="card" :href="item" :key="item" v-lightbox="obj.payCredentialUrls" v-for="(item, index) in obj.payCredentialUrls" v-show="index == 0">
              <div class="length-text">
                <p>支付凭据({{obj.payCredentialUrls.length}}张)</p>
              </div>
              <el-card :body-style="{ padding: '5px' }">
                <img :src="item" class="image">
              </el-card>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <p v-if="obj.status != 500 && obj.status != 530">成本货款：
        <span class="red-color">{{obj.costMoney | formatNumber}}</span>
      </p>
      <p v-if="obj.status != 500 && obj.status != 530">总费用：
        <span class="red-color">{{obj.totalMoney | formatNumber}}</span>
      </p>
      <p v-if="obj.status == 520 || obj.status == 521 || obj.status == 522 || obj.status == 523">收货备注：{{obj.receiveRemark}}</p>
    </div>
    <div class="cutMsg-content" v-if="obj.status == 521 || obj.status == 522 || obj.status == 523">
      <p class="msg-title">物流信息</p>
      <el-row>
        <div class="show-image">
          <el-col class="card" :href="item" :key="item" v-lightbox="obj.sendCredentialUrls" v-for="(item, index) in obj.sendCredentialUrls" v-show="index == 0">
            <div class="length-text">
              <p>发货({{obj.sendCredentialUrls.length}}张)</p>
            </div>
            <el-card :body-style="{ padding: '5px' }">
              <img :src="item" class="image">
            </el-card>
          </el-col>
        </div>
      </el-row>
    </div>
    <Lightbox/>
  </section>
</template>

<script>
import Lightbox from '@/components/light-box/lightbox'
import request from '@/utils/request'
export default {
  components: {
    Lightbox,
  },
  data() {
    return {
      fullScreenLoading: false,
      id: '',
      obj: {},
    }
  },
  mounted() {
    this.id = this.$route.query.id
    if (this.id) {
      this.getData()
    } else {
      this.$message.error('id为空')
    }
  },
  methods: {
    getData() {
      this.fullScreenLoading = true
      request(`/redwood/ziying/cut/${this.id}`, {
        method: 'GET',
        data: {},
      }).then(res => {
        if (res.success == 1) {
          this.obj = res.obj
          if (this.obj.madanUrls) {
            for (let i = 0; i < this.obj.madanUrls.length; i++) {
              console.log(this.obj.madanUrls[i])
              this.obj.madanUrls[i] = 'http://www.soouya.com' + this.obj.madanUrls[i]
            }
          }
          if (this.obj.payCredentialUrls) {
            for (let i = 0; i < this.obj.payCredentialUrls.length; i++) {
              this.obj.payCredentialUrls[i] = 'http://www.soouya.com' + this.obj.payCredentialUrls[i]
            }
          }
          if (this.obj.sendCredentialUrls) {
            for (let i = 0; i < this.obj.sendCredentialUrls.length; i++) {
              this.obj.sendCredentialUrls[i] = 'http://www.soouya.com' + this.obj.sendCredentialUrls[i]
            }
          }
          if (this.obj.productNumbers) {
            this.obj.productNumbers.forEach(item => {
              if (item.colorUrls && item.colorUrls.length) {
                for (let i = 0; i < item.colorUrls.length; i++) {
                  item.colorUrls[i] = 'http://www.soouya.com' + item.colorUrls[i]
                }
                // item.colorUrls.forEach(color => {
                //   color = 'http://www.soouya.com' + color
                // })
              }
              if (item.imgUrls && item.imgUrls.length) {
                for (let i = 0; i < item.imgUrls.length; i++) {
                  item.imgUrls[i] = 'http://www.soouya.com' + item.imgUrls[i]
                }
              }
            })
          }
        } else {
          this.$message.error(res.msg)
        }
        this.fullScreenLoading = false
      })
    },
    goBack() {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="scss">

</style>
