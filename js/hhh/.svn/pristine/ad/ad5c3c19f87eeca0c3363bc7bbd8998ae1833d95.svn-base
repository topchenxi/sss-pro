<template>
  <section style="min-width:1600px;">
    <h2>采购订单 | 订单编辑</h2>
    <template v-if="formData">
      <ul class="audit-list">
        <li>
          <div class="left-item">审核状态</div>
          <div class="right-item">{{formData.status === 20 ? '待审核' : '审核不通过'}}</div>
        </li>
        <li>
          <div class="left-item">订单号</div>
          <div class="right-item">{{formData.number}}</div>
        </li>
        <li>
          <div class="left-item">发布时间</div>
          <div class="right-item">{{formData.createTime | formatTime}}</div>
        </li>
      </ul>
      <el-form ref="audit-form" label-width="170px" :model="formData">
        <dl>
          <dt>
            <span>采购商供应商信息</span>
          </dt>
          <dd>
            <el-form-item label="大货类型" :rules="{required:true,type:'number',message:'大货类型不能为空'}" prop="type">
              <el-radio-group v-model="formData.type">
                <el-radio-button :label="1">服务单</el-radio-button>
                <el-radio-button :label="2">贸易单</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="采购商" required>
              <el-row>
                <el-col :span="4">采购商ID:{{formData.customerNumber}} </el-col>
                <el-col :span="5">公司名称:{{formData.customerCompany}} </el-col>
                <el-col :span="5">联系电话:{{formData.customerMobilePhone}} </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="配送方式" :rules="{required:true,type:'number',message:'配送方式不能为空'}" prop="sendType">
              <el-radio-group v-model="formData.sendType">
                <el-radio-button :label="0">搜芽配送</el-radio-button>
                <el-radio-button :label="1">采购商自提</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="收货地址" v-if="formData.sendType === 0" :rules="{required:true,message:'收货地址不能为空'}" prop="addressId">
              <el-select v-model="formData.addressId" @change="handleAddressChange">
                <el-option v-for="item in address" :label="`${item.name}   ${item.tel}    ${item.province}${item.city}${item.area}${item.addr}`" :value="item.id" :key="item.id">
                </el-option>
              </el-select>
              <a class="addAddress" @click="showAddAddressDialog">添加</a>
              <!--<el-button @click="addBuyFollowAddressDialogConfig.isShow = true">添加</el-button>-->
            </el-form-item>
            <el-form-item label="供应商" :rules="{required:true,message:'供应商不能为空'}" prop="shopId">
              <el-button type="text" @click="shopAddressDialogConfig.isShow = true">请选择</el-button>
              <el-button @click="addShopAddressDialogConfig.isShow = true">添加</el-button>
              <ul v-if="extendFormData">
                <li>供应商ID:{{extendFormData.sellerNumber}}</li>
                <li>店铺名称:{{extendFormData.sellerCompany}}</li>
                <li>档口名称:{{formData.shopCompany}}</li>
                <li>档口地区:{{formData.shopProvince}}{{formData.shopCity}}{{formData.shopArea}}</li>
                <li>详细地址:{{formData.shopAddr}}</li>
                <li>档口电话:{{formData.shopTel}}</li>
              </ul>
            </el-form-item>
          </dd>
        </dl>
        <dl>
          <dt>
            <span>货号</span>
          </dt>
          <dd>
            <template v-if="true">
              <el-form-item label="图片">
                <article class="media" v-if='formData.imgUrls && formData.imgUrls.length'>
                  <a :href="'http://www.soouya.com'+val" class="image media-left is-64x64" v-lightbox="formData.imgUrls" v-for="val in formData.imgUrls">
                    <img :src="'http://www.soouya.com'+val+'@200h_200w_1e'" alt="Image" width="60" height="60">
                  </a>
                </article>
                <el-upload action="/redwood/sys/Common/uploadFile.do?type=check" v-if="formData.imgUrls && formData.imgUrls.length < 9" :multiple="true" :show-file-list="false" :on-success="handleSuccess" style="display:inline-block;vertical-align:top;">
                  <div class="upImg">+</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="品类" :rules="{required:true,type:'number',message:'品类不能为空'}" prop="category">
                <el-radio-group v-model="formData.category">
                  <el-radio-button :label="1">面料</el-radio-button>
                  <el-radio-button :label="0">辅料</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="实版" :rules="{required:true,type:'number',message:'实版不能为空'}" prop="haveRealVersion">
                <el-radio-group v-model="formData.haveRealVersion">
                  <el-radio-button :label="1">有实版</el-radio-button>
                  <el-radio-button :label="0">无实版</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="验货" :rules="{required:true,type:'number',message:'验货不能为空'}" prop="needCheck">
                <el-radio-group v-model="formData.needCheck">
                  <el-radio-button :label="1">验货</el-radio-button>
                  <el-radio-button :label="0">不验货</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="期望期货">
                <el-date-picker v-model="formData.expectedTime" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="货号" :rules="{required:true,message:'货号不能为空'}" prop="productNumber">
                <el-input v-model="formData.productNumber"></el-input>
              </el-form-item>
              <el-form-item label="单位" :rules="{required:true,message:'单位不能为空'}" prop="servicePriceUnit">
                <template v-if="formData.category === 1">
                  <el-select v-model="formData.servicePriceUnit" @change="handleServicePriceUnitChange">
                    <el-option label="元/米" value="元/米"></el-option>
                    <el-option label="元/码" value="元/码"></el-option>
                    <el-option label="元/千克" value="元/千克"></el-option>
                  </el-select>
                </template>
                <template v-else>
                  <span class="unit">元/</span>
                  <el-input v-model="formData.servicePriceUnit" @change="handleServicePriceUnitChange"></el-input>
                </template>
              </el-form-item>
              <el-form-item label="服务费单价" v-if="formData.type == 1" :rules="{required:true,message:'服务费单价不能为空'}" prop="servicePrice">
                <el-input v-model="formData.servicePrice"></el-input>{{formData.servicePriceUnit}}
              </el-form-item>
              <el-row v-for="(item,index) in formData.colors">
                <el-col :span="4">
                  <el-form-item label="色号" :rules="{required:true,message:'色号不能为空'}" :prop="'colors.' + index + '.color'">
                    <el-input v-model="item.color"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="销售单价" class="inline-item" :rules="{required:true,type:'number',message:'销售单价不能为空'}" :prop="'colors.' + index + '.salePrice'">
                    <div class="flex-row">
                      <el-input v-model.number="item.salePrice" style="margin-right:5px"></el-input>{{item.salePriceUnit}}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="单价" class="inline-item">
                    <div class="flex-row">
                      <el-input v-model.number="item.price" style="margin-right:5px"></el-input>{{item.priceUnit}}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="采购数量" class="inline-item" :rules="{required:true,type:'number',message:'采购数量不能为空'}" :prop="'colors.' + index + '.quantity'">
                    <div class="flex-row">
                      <el-input v-model.number="item.quantity" style="margin-right:5px"></el-input>{{item.quantityUnit}}
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="客户设计款号" class="inline-item">
                    <el-input v-model="item.designStyle"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </dd>
        </dl>
        <dl>
          <dt>
            <span>费用信息</span>
          </dt>
          <dd>
            <el-form-item label="采购商是否需要发票" :rules="{required:true,type:'number',message:'采购商是否需要发票不能为空'}" prop="needInvoice">
              <el-radio-group v-model="formData.needInvoice">
                <el-radio-button :label="1">要</el-radio-button>
                <el-radio-button :label="0">不要</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="采购商税率" v-if="formData.needInvoice === 1" :rules="{required:true,type:'number',message:'采购商税率不能为空'}" prop="taxPoint">
              <el-input v-model.number="formData.taxPoint" style="margin-right:5px;"></el-input>%
            </el-form-item>
            <el-form-item label="结算周期">
              <span v-if="formData.currentBillingCycle === 0">
                周结
              </span>
              <span v-if="formData.currentBillingCycle === 1">
                半月结
              </span>
              <span v-if="formData.currentBillingCycle === 2">
                月结
              </span>
              <span v-if="formData.currentBillingCycle == null">
                其它
              </span>
  
            </el-form-item>
            <el-form-item label="销售货款">
              {{saleMoney}}
            </el-form-item>
            <el-form-item label="采购商留言">
              <el-input type="textarea" v-model="formData.remark"></el-input>
            </el-form-item>
          </dd>
        </dl>
      </el-form>
      <footer>
        <el-button @click="$router.go(-1)">返回</el-button>
        <el-button @click="failed">审核不通过</el-button>
        <el-button type="primary" :disabled="isNext" @click="publish('audit-form')">保存并审核通过</el-button>
      </footer>
    </template>
    <Lightbox></Lightbox>
    <ShopAddress :config="shopAddressDialogConfig" v-on:selectedAddress="setShopAddress"></ShopAddress>
    <AddShopAddress :config="addShopAddressDialogConfig" v-on:selectedAddress="setShopAddress"></AddShopAddress>
    <AddBuyFollowAddress :config="addBuyFollowAddressDialogConfig"></AddBuyFollowAddress>
    <newAddress :config="addressConfig" v-on:success="getAddress(addressConfig.id)"></newAddress>
  </section>
</template>

<script>
import { request } from 'src/common/utils.js'
import Lightbox from 'src/components/lightbox/lightbox'
import ShopAddress from 'src/components/shopAddress'
import AddShopAddress from 'src/components/addShopAddress'
const regFloat = /^\d+(\.\d{1,2})?$/
import AddBuyFollowAddress from 'src/components/addBuyfollowAddress'
import newAddress from 'src/components/newAddress.vue'
export default {
  components: {
    Lightbox,
    ShopAddress,
    AddShopAddress,
    AddBuyFollowAddress,
    newAddress,
  },
  data() {
    return {
      addressConfig: {
        id: '',
        isShow: false,
      },
      saleMoney: 0,
      formData: null,
      address: [],
      shopAddressDialogConfig: {
        isShow: false,
      },
      addShopAddressDialogConfig: {
        isShow: false,
      },
      addBuyFollowAddressDialogConfig: {
        isShow: false,
        buyerId: ''
      },
      extendFormData: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    isNext() {
      let on = false
      if (this.formData.type == 2) {
        this.formData.servicePrice = 0
      }
      if (!this.formData.type || !regFloat.test(this.formData.sendType) || !regFloat.test(this.formData.category) || !regFloat.test(this.formData.needCheck) || !this.formData.productNumber || !regFloat.test(this.formData.servicePrice) || !this.formData.servicePriceUnit || !regFloat.test(this.formData.haveRealVersion)) {
        on = true
      }
      if (!this.formData.shopId || !this.formData.shopProvince || !this.formData.shopCity || !this.formData.shopAddr || !this.formData.shopCompany || !this.formData.shopTel) {
        on = true
      }
      if (this.formData.sendType == 0 && (!this.formData.addressId || !this.formData.addressProvince || !this.formData.addressCity || !this.formData.addressAddr || !this.formData.addressName || !this.formData.addressTel)) {
        on = true
      }
      // 货号校验
      this.formData.colors.forEach((item) => {
        if (String(item.color) == '' || String(item.quanlity) == '' || String(item.quanlityQuantity) == '' || !regFloat.test(item.salePrice)) {
          on = true
        }
      })
      // 费用信息校验
      if (this.formData.needInvoice == 1 && !regFloat.test(this.formData.taxPoint)) {
        on = true
      }
      return on
    }
  },
  watch: {
    formData: {
      handler: function (val, oldVal) {
        if (this.formData.needInvoice == 0) {
          this.formData.taxPoint = 0
        }
        let total = 0
        let unit = this.formData.servicePriceUnit
        if (unit == null) {
          unit = ''
        }
        this.formData.colors && this.formData.colors.length && this.formData.colors.forEach((item) => {
          if (unit.indexOf('元/') == 0) {
            item.quantityUnit = unit.substring(2)
          } else {
            item.quantityUnit = unit
          }
          if (this.formData.category == 0 && unit != '') {
            item.priceUnit = '元/' + unit
            item.salePriceUnit = '元/' + unit
            item.buyPriceUnit = '元/' + unit
          }
          total += Number(item.salePrice) * Number(item.quantity)
        })
        this.saleMoney = total
      },
      deep: true
    },
  },
  methods: {
    showAddAddressDialog() {
      this.addressConfig.isShow = true
    },
    handleServicePriceUnitChange(value) {
      this.formData.colors.forEach(item => {
        item.priceUnit = value
        item.salePriceUnit = value
        item.buyPriceUnit = value
      })
    },
    handleAddressChange(val) {
      let currentAddress = this.address.find(item => {
        return item.id === val
      })
      Object.assign(this.formData, {
        addressId: currentAddress.id,
        addressProvince: currentAddress.province,
        addressCity: currentAddress.city,
        addressArea: currentAddress.area,
        addressAddr: currentAddress.addr,
        addressName: currentAddress.name,
        addressTel: currentAddress.tel
      })
    },
    failed() {
      request({
        url: `/redwood/check/bulk/${this.$route.query.id}?_function=disagree`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({})
      }).then((response) => {
        if (response.success == '1') {
          this.$message.success(response.msg);
          this.$router.go(-1)
        } else {
          this.$message.error(response.msg);
        }
      })
    },
    getData() {
      request({
        url: `/redwood/check/bulk/${this.$route.query.id}`,
      }).then((response) => {
        this.$store.dispatch('changeload', false)
        if (this.requestIsSuccess(response)) {
          this.formData = response.obj
          this.addBuyFollowAddressDialogConfig.buyerId = response.obj.customerId
          this.addressConfig.id = response.obj.customerId
          this.getAddress(response.obj.customerId)
        }
      })
    },
    getAddress(buyerId) {
      request({
        url: '/redwood/buyfollow/Address/list',
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({
          _time: +new Date(),
          userId: buyerId
        })
      }).then((response) => {
        if (this.requestIsSuccess(response) && response.result.length) {
          this.address = response.result
        }
      });
    },
    publish() {
      request({
        url: `/redwood/check/bulk/${this.$route.query.id}?_function=agree`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(Object.assign({}, this.formData, {
          expectedTime: this.formData.expectedTime ? +new Date(this.formData.expectedTime) : null
        }))
      }).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.$message.success(response.msg);
          this.$router.replace({ name: 'checkBulkList' })
        } else {
          this.$message.error(response.msg);
        }
      }
        )
    },
    setBuyerAddress(data) {
    },
    setShopAddress(data) {
      Object.assign(this.formData, {
        shopId: data.id,
        sellerId: data.sellerId,
        shopProvince: data.province,
        shopCity: data.city,
        shopArea: data.area,
        shopAddr: data.addr,
        shopCompany: data.company,
        shopTel: data.tel
      })
      this.extendFormData = {
        sellerCompany: data.sellerCompany,
        sellerNumber: data.sellerNumber
      }
    },
    handleSuccess(response) {
      if (this.requestIsSuccess(response)) {
        this.formData.imgUrls.push(response.imgUrl)
      }
    },
  }
}
</script>

<style lang="scss">
.addAddress {
  cursor: pointer;
  color: blue;
}
.aside-button {
  >span {
    display: block;
    border: 0 !important;
  }
}

.media {
  display: inline-block;
}

.upImg {
  width: 64px;
  height: 64px;
  line-height: 64px;
  border: 1px solid #ccc;
}
</style>

<style lang="scss" scoped>
.flex-row {
  display: flex;
  white-space: nowrap;
}

h2 {
  font-size: 24px;
  margin: 15px 0;
}

dt {
  margin: 20px 0;
  border-top: 1px solid #20a0ff;
  span {
    font-size: 18px;
    text-indent: 1em;
    background: #20a0ff;
    color: #fff;
    display: inline-block;
    width: 200px;
    height: 40px;
    line-height: 40px;
  }
}

.audit-list {
  list-style: none;
  font-size: 14px;
  >li {
    display: flex;
    align-items: center;
    .left-item {
      box-sizing: border-box;
      padding: 11px 12px 11px 0;
      text-align: right;
      width: 150px;
      color: #48576a;
    }
  }
}

.el-dialog__body {
  display: flex;
}

.el-input {
  max-width: 200px;
  display: inline-block;
}

.tag-aside {
  width: 150px;
  text-align: left;
  .el-radio-button {
    display: block;
  }
  .el-radio-button__inner {
    border: 0 !important;
    display: block;
  }
  dt {
    background: #ccc;
    padding: 10px 0;
    border-bottom: 1px solid #000;
  }
  dd {
    >div {
      background: #eee;
      padding: 5px 0;
      &.current {
        background: #2fb468;
        color: #fff;
      }
    }
  }
}

.tag-main {
  text-align: left;
  dt {
    padding: 10px;
  }
  dd {
    >span {
      display: inline-block;
      margin: 5px;
      padding: 5px;
      background: #ddd;
      cursor: pointer;
      &.current {
        background: #2fb468;
        color: #fff;
      }
    }
  }
}

.el-textarea {
  width: 450px;
}

footer {
  margin: 20px 0 50px 150px;
}
</style>
