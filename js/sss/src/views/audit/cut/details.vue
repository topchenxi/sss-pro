<template>
  <section class="detail-container">
    <div class="crumbs"> <span>订单审核</span> <span class="arrow"></span> <span class="current">剪版订单编辑</span> </div>
    <div class="detail-content" v-if="formData && pageData.status === 1 ">
      <div class="o-row">
        <dl class="o-item">
          <dt>订单号:</dt>
          <dd>{{formData.number}}</dd>
        </dl>
        <dl class="o-item">
          <dt>发布时间:</dt>
          <dd>{{formData.createTime | formatTime}}</dd>
        </dl>
      </div>
      <div class="status-wrap"> 审核状态 : {{formData.status === 20 ? '待审核' : '审核不通过'}} </div>
      <el-form class="edit-form" ref="audit-form" :model="formData" label-width="150px">
        <div class="o-title">采购商供应商信息</div>
        <el-form-item label="采购商" required>
          <el-col :span="24">
            <p>采购商ID : {{formData.customerNumber}}</p>
            <p>公司名称 : {{formData.customerCompany}}</p>
            <p>联系电话 : {{formData.customerMobilePhone}}</p>
          </el-col>
        </el-form-item>
        <el-form-item label="收货地址" prop="addressId" :rules="[{ required: true, trigger: 'change', message:'请选择收货地址',type:'number' }]">
          <el-select class="w550" v-model="formData.addressId" @change="setAddress">
            <el-option v-for="item in address" :label="`${item.name}   ${item.tel}    ${item.province}${item.city}${item.area}${item.addr}`" :value="item.id" :key="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商" :rules="{required:true,message:'供应商不能为空'}" prop="shopId">
          <el-button class="btn-choose" @click="shopAddressDialogConfig.isShow = true">选择供应商</el-button>
          <el-button class="btn-choose" @click="addShopAddressDialogConfig.isShow = true">新增供应商</el-button>
          <ul class="seller-wrap" v-if="extendFormData">
            <li>供应商ID ：{{extendFormData.sellerNumber}}</li>
            <li>店铺名称 ：{{extendFormData.sellerCompany}}</li>
            <li>档口名称 ：{{formData.shopCompany}}</li>
            <li>档口地区 ：{{formData.shopProvince}}{{formData.shopCity}}{{formData.shopArea}}</li>
            <li>详细地址 ：{{formData.shopAddr}}</li>
            <li>档口电话 ：{{formData.shopTel}}</li>
          </ul>
        </el-form-item>
        </dd>
        </dl>
        <dl v-for="(product,productIdx) in formData.productNumbers">
          <div class="o-title">货物信息</div>
          <el-form-item label="图片">
            <el-row>
              <div class="img-list">
                <a :href="'http://www.soouya.com'+url" class="image" v-lightbox="product.imgUrls" v-for="(url,urlIdx) in product.imgUrls">
                    <img :src="'http://www.soouya.com' + url" width="86" height="86" />
                    <i class="icon-close" @click="removeImg(productIdx,urlIdx)"></i>
                  </a>
              </div>
              <!-- <el-upload style="display:inline-block;vertical-align:top;" action="/redwood/sys/Common/uploadFile.do?type=0" multiple width="100" :on-success="handleuploadImg" :before-upload="handleuploadBefore.bind(this,productIdx)" v-if="product.imgUrls.length < 6">
                    <div class="icon-upload"></div>
                  </el-upload> -->
              <el-upload action="/redwood/sys/Common/uploadFile.do?type=0" v-if="product.imgUrls.length < 6" :multiple="true" :show-file-list="false" :on-success="handleuploadImg" style="display:inline-block;vertical-align:top;">
                <div class="icon-upload"></div>
              </el-upload>
            </el-row>
          </el-form-item>
          <el-form-item label="品类："> <span v-if="product.category==1">面料</span> <span v-if="product.category==0">辅料</span> </el-form-item>
          <el-form-item :label="product.category == 1 ? '货号：' : '品名：'" required>
            <el-input class="input" v-model="product.number"></el-input>
          </el-form-item>
          <el-form-item label="单位：" required v-if="product.category == 1">
            <el-select v-model="product.priceUnit" @change="handleUnitChange(productIdx)">
              <el-option v-for="item in productUnitOptions" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务费单价：" required>
            <RuleInput class="input" v-model="product.price" :rule="rules.price" type="number"> </RuleInput>
            <template v-if="product.category == 1"> <span class="unit"> {{product.priceUnit && product.priceUnit.indexOf('元/')<0?'元/' + product.priceUnit :product.priceUnit}} </span> </template>
            <template v-else> <span class="unit" v-if="product.priceUnit.indexOf('元/')<0">元/</span>
              <el-input class="input" v-model="product.priceUnit"></el-input>
            </template>
          </el-form-item>
          <div class="d-line"></div>
          <el-row :inline="true" v-for="(color,colorIdx) in product.colors" :label-position="right" label-width="180px">
            <el-row>
              <el-col :span="8">
                <el-form-item :label="product.category == 1 ? '色号：' : '颜色：'" required>
                  <el-input class="input" v-model="color.color"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="单价：">
                  <template v-if="product.category == 1">
                    <RuleInput v-model="color.followerPriceMoney" :rule="rules.followerPriceMoney"> </RuleInput> <span class="unit">{{color.followerPriceUnit && color.followerPriceUnit.indexOf('元/')<0?'元/' + color.followerPriceUnit:color.followerPriceUnit}}</span> </template>
                  <template v-else>
                    <RuleInput v-model="color.followerPriceMoney" :rule="rules.followerPriceMoney"> </RuleInput> <span class="unit" v-if="color.followerPriceUnit.indexOf('元/')<0">元/</span>
                    <el-input class="input" v-model="color.followerPriceUnit" @change="handleFollowerPriceUnitChange" @focus="handleFollowerPriceUnitFocus(productIdx,colorIdx)"> </el-input>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="数量：" required>
                  <el-input class="input" v-model="color.followerQuantity"></el-input> <span class="unit">{{color.followerQuantityUnit}}</span> </el-form-item>
              </el-col>
            </el-row>
          </el-row>
          </dd>
        </dl>
        <div class="o-title">费用信息</div>
        <!-- <dt> <span>费用信息</span> </dt> -->
        <el-form-item label="是否需要发票：" required>
          <el-radio v-model="formData.needInvoice" :label="1"> 需要 </el-radio>
          <el-radio v-model="formData.needInvoice" :label="0"> 不需要 </el-radio>
        </el-form-item>
        <el-form-item label="采购商税率：" v-if="formData.needInvoice" required>
          <RuleInput class="input" v-model="formData.taxPoint" :rule="rules.taxPoint" type="number"> </RuleInput>% </el-form-item>
        <el-form-item label="跟单员留言：">
          <div class="textarea">
            <textarea rows="3" maxlength="100" v-model.trim="formData.followerRemark"></textarea>
            <span class="length"> {{leftnumber}} / 100字</span>
          </div>
        </el-form-item>
      </el-form>
      <footer class="btns-group">
        <el-button class="btn-large" :disabled="isNext" @click="publish('audit-form')">保存并审核通过</el-button>
        <el-button class="btn-error btn-large" @click="failed">审核不通过</el-button>
      </footer>
    </div>
    <Lightbox></Lightbox>
    <ShopAddress :config="shopAddressDialogConfig" v-on:selectedAddress="setShopAddress"></ShopAddress>
    <AddShopAddress :config="addShopAddressDialogConfig" v-on:selectedAddress="setShopAddress"></AddShopAddress>
    <AddBuyFollowAddress :config="addBuyFollowAddressDialogConfig"></AddBuyFollowAddress>
  </section>
</template>
<script>
import { request } from 'src/common/utils.js'
import ShopAddress from 'components/shopAddress'
import AddShopAddress from 'components/addShopAddress'
import Lightbox from 'components/lightbox/lightbox'
import RuleInput from 'components/ruleInput'
import AddBuyFollowAddress from 'components/addBuyfollowAddress'
import { getTaxMoney, getTotalMoney } from 'common/getMoney'
const regFloat = /^\d+(\.\d{1,2})?$/
export default {
  components: {
    Lightbox,
    ShopAddress,
    AddShopAddress,
    RuleInput,
    AddBuyFollowAddress
  },
  data() {
    return {
      right: '',
      productUnitOptions: [{
        label: '元/米',
        value: '米'
      }, {
        label: '元/码',
        value: '码'
      }, {
        label: '元/千克',
        value: '千克'
      }],
      showShopData: {},
      currentUploadIndex: 0,
      waitChangeFollowerPriceUnitIndex: [],
      rules: {
        taxPoint: {
          message: '请输入大于0小于100且最多两位小数的值',
          rule(val) {
            if (regFloat.test(val) && val <= 100 && val > 0) {
              return false
            } else {
              return true
            }
          }
        },
        price: {
          message: '小数点后两位长度不能大于2',
          rule(val) {
            if (regFloat.test(val) || val === '') {
              return false
            } else {
              return true
            }
          }
        },
        followerPriceMoney: {
          message: '小数点后两位长度不能大于2',
          rule(val) {
            if (regFloat.test(val) || val === '') {
              return false
            } else {
              return true
            }
          }
        }
      },
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
      pageData: {
        status: 1
      }
    }
  },
  computed: {
    // 预估货款
    leftnumber() {
      return 100 - Number(this.formData.followerRemark.length)
    },
    isNext() {
      let on = false
      if (!this.formData.shopId || !this.formData.shopProvince || !this.formData.shopCity || !this.formData.shopAddr || !this.formData.shopCompany || !this.formData.shopTel) {
        on = true
      }
      if (!this.formData.addressId || !this.formData.addressProvince || !this.formData.addressCity || !this.formData.addressAddr || !this.formData.addressName || !this.formData.addressTel) {
        on = true
      }
      // 货号校验
      this.formData.productNumbers.forEach((item) => {
        if (String(item.category) == '' || String(item.number) == '' || !regFloat.test(item.price) || item.priceUnit == '') {
          on = true
        }
        item.colors.forEach((val) => {
          if (String(val.color) == '' || String(val.followerQuantity) == '' || (!regFloat.test(val.followerPriceMoney) && val.followerPriceMoney)) {
            on = true
          }
        })
      })
      // 费用信息校验
      if (this.formData.needInvoice && !regFloat.test(this.formData.taxPoint) || this.formData.needInvoice === '') {
        on = true
      }
      return on
    }
  },
  watch: {
    // 备注限定
    followerRemark(val) {
      if (val.length >= 100) {
        this.formData.followerRemark = val.slice(0, 100)
      }
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    setAddress(val) {
      let currentAddress = this.address.find((item) => item.id === val);
      Object.assign(this.formData, {
        addressAddr: currentAddress.addr,
        addressArea: currentAddress.area,
        addressCity: currentAddress.city,
        addressName: currentAddress.name,
        addressProvince: currentAddress.province,
        addressTel: currentAddress.tel,
      })
    },
    failed() {
      request({
        url: `/redwood/check/cut/${this.$route.query.id}?_function=disagree`,
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
        url: `/redwood/check/cut/${this.$route.query.id}`,
        data: {
          _time: +new Date()
        }
      }).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.formData = response.obj
          if (this.formData.followerRemark == null) {
            this.formData.followerRemark = ''
          }
          this.getAddress(response.obj.customerId)
        }
      })
    },
    fillInfo(param) {
      this.showShopData = param
      if (!this.showShopData.shopCompany || !this.showShopData.sellerAddr || !this.showShopData.sellerTel) {
        this.$message({
          type: 'error',
          message: '请维护此供应商信息,否则不能提交订单',
          duration: 1500
        })
      }
      this.shopId = param.id
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
      let countEstimatedCostMoney = this.formData.productNumbers.reduce((productAss, productVal) => {
        let countColor = productVal.colors.reduce((colorAss, colorVal) => {
          return colorAss + colorVal.followerPriceMoney * colorVal.followerQuantity
        }, 0)
        return productAss + countColor
      }, 0)
      this.formData.estimatedCostMoney = countEstimatedCostMoney.toFixed(2)

      let countServiceMoney = this.formData.productNumbers.reduce((productAcc, productVal) => {
        if (productVal.priceUnit && productVal.priceUnit.indexOf('元/') < 0) {
          productVal.priceUnit = '元/' + productVal.priceUnit
        }
        console.log(productVal.priceUnit)
        let countQuantity = productVal.colors.reduce((colorAcc, colorVal) => {
          if (colorVal.cutterPriceUnit && colorVal.cutterPriceUnit.indexOf('元/') < 0) {
            colorVal.cutterPriceUnit = '元/' + colorVal.cutterPriceUnit
          }
          if (colorVal.followerPriceUnit && colorVal.followerPriceUnit.indexOf('元/') < 0) {
            colorVal.followerPriceUnit = '元/' + colorVal.followerPriceUnit
          }
          return Number(colorAcc) + Number(colorVal.followerQuantity)
        }, 0)
        let currentProductPrice = countQuantity * productVal.price
        return (productAcc + currentProductPrice)
      }, 0)
      this.formData.serviceMoney = countServiceMoney.toFixed(2)

      // 计算税费
      this.formData.taxMoney = getTaxMoney(Number(this.formData.estimatedCostMoney), Number(this.formData.serviceMoney), Number(this.formData.taxPoint))
      console.log(this.formData.taxMoney)

      // 总费用
      this.formData.totalMoney = getTotalMoney(Number(this.formData.estimatedCostMoney), Number(this.formData.serviceMoney), Number(this.formData.taxMoney))
      console.log(this.formData.totalMoney)

      this.formData.costMoney = 0
      request({
        url: `/redwood/check/cut/${this.$route.query.id}?_function=agree`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(Object.assign({}, this.formData))
      }).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.$message.success(response.msg);
          this.$router.replace({ name: 'auditCutList' })
        } else {
          this.$message.error(response.msg);
        }
      })
    },
    handleuploadImg(response, file, fileList) {
      console.log(response, file, fileList)
      if (response.success === '1') {
        this.formData.productNumbers[this.currentUploadIndex].imgUrls.push(response.imgUrl)
      } else {
        this.$message.error(response.msg);
      }
    },
    handleuploadBefore(productIdx) {
      this.currentUploadIndex = productIdx
      return true
    },
    removeImg(productIdx, urlIdx) {
      this.formData.productNumbers[productIdx].imgUrls.splice(urlIdx, 1)
    },
    handleFollowerPriceUnitChange(val) {
      let productIdx = this.waitChangeFollowerPriceUnitIndex[0]
      let colorIdx = this.waitChangeFollowerPriceUnitIndex[1]
      this.productNumbers[productIdx].colors[colorIdx].followerQuantityUnit = val
    },
    handleFollowerPriceUnitFocus(productIdx, colorIdx) {
      this.waitChangeFollowerPriceUnitIndex = [productIdx, colorIdx]
    },
    formatPrice(e) {
      e.target.value = (parseFloat(e.target.value) || 0).toFixed(2)
    },
    beforeUpload() {},
    handleError() {},
    handleUnitChange(productIdx) {
      let product = this.formData.productNumbers[productIdx]
      const followerQuantityUnit = product.priceUnit
      let followerPriceUnit = `${followerQuantityUnit}`
      if (product.category == 0) {
        followerPriceUnit = '元/' + followerPriceUnit
      }
      product.colors.forEach(color => {
        color.followerPriceUnit = followerPriceUnit
        color.followerQuantityUnit = followerQuantityUnit
      })
    },
    handleCategoryChange(val) {
      this.productNumbers.forEach(product => {
        product.category = val
        product.followerQuantityUnit = ''
        product.colors.forEach((color) => {
          color.followerPriceUnit = ''
          color.followerQuantityUnit = ''
          product.priceUnit = ''
        })
      })
    },
    setBuyerAddress(data) {},
    setShopAddress(data) {
      Object.assign(this.formData, {
        shopId: data.id,
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
  }
}

</script>
<style lang="scss">
.product-img-upload {
  .el-upload-dragger {
    width: 200px;
    height: 100px;
    overflow: hidden;
  }
  .el-icon-upload {
    margin-top: 7px;
  }
}

</style>
<style lang="scss" scoped>
// h2 {
//   font-size: 24px;
//   margin: 15px 0;
// }
// dt {
//   margin: 20px 0;
//   border-top: 1px solid #20a0ff;
//   span {
//     font-size: 18px;
//     text-indent: 1em;
//     background: #20a0ff;
//     color: #fff;
//     display: inline-block;
//     width: 200px;
//     height: 40px;
//     line-height: 40px;
//   }
// }
// .audit-list {
//   list-style: none;
//   font-size: 14px;
//   >li {
//     display: flex;
//     align-items: center;
//     .left-item {
//       box-sizing: border-box;
//       padding: 11px 12px 11px 0;
//       text-align: right;
//       width: 150px;
//       color: #48576a;
//     }
//   }
// }
// .el-dialog__body {
//   display: flex;
// }
// .el-input {
//   width: 200px;
//   display: inline-block;
// }
// .tag-aside {
//   width: 150px;
//   text-align: left;
//   .el-radio-button {
//     display: block;
//   }
//   .el-radio-button__inner {
//     border: 0 !important;
//     display: block;
//   }
//   dt {
//     background: #ccc;
//     padding: 10px 0;
//     border-bottom: 1px solid #000;
//   }
//   dd {
//     >div {
//       background: #eee;
//       padding: 5px 0;
//       &.current {
//         background: #2fb468;
//         color: #fff;
//       }
//     }
//   }
// }
// .tag-main {
//   text-align: left;
//   dt {
//     padding: 10px;
//   }
//   dd {
//     >span {
//       display: inline-block;
//       margin: 5px;
//       padding: 5px;
//       background: #ddd;
//       cursor: pointer;
//       &.current {
//         background: #2fb468;
//         color: #fff;
//       }
//     }
//   }
// }
// .position-center {
//   display: flex;
//   align-items: center;
// }
// .product-img-list {
//   .img-wrap {
//     width: 80px;
//     height: 80px;
//     position: relative;
//     margin-right: 10px;
//     &:hover {
//       cursor: pointer;
//     }
//     img {
//       width: 100%;
//       height: 100%;
//     }
//     .el-icon-close {
//       position: absolute;
//       right: -5px;
//       top: -5px;
//       background: rgba(0, 0, 0, .5);
//       border-radius: 50%;
//       overflow: hidden;
//       color: #fff;
//       font-size: 12px;
//       padding: 5px;
//     }
//   }
// }
// .del-arrow {
//   position: absolute;
//   text-align: center;
//   width: 20px;
//   height: 20px;
//   line-height: 20px;
//   border-radius: 50%;
//   top: -10px;
//   right: -10px;
//   background-color: #ccc;
//   color: #fff;
//   border: 1px solid #fff;
// }
// .product-header {
//   border-top: 2px solid #bfcbd9;
//   .product-title {
//     background: #20a0ff;
//     color: #fff;
//     width: 150px;
//     height: 40px;
//     text-align: center;
//     line-height: 40px;
//   }
// }
// .input-lg {
//   width: 200px;
// }
// .input-md {
//   width: 150px;
// }
// .input-sm {
//   width: 100px;
// }
// .el-form-item {
//   white-space: nowrap;
// }
// .flex-auto {
//   flex: 1;
// }
// .upImg {
//   float: left;
//   width: 42px;
//   height: 42px;
//   line-height: 42px;
//   background: #ccc;
//   text-align: center;
//   color: #fff;
//   font-size: 40px;
//   cursor: pointer;
//   &:active {
//     background: #999;
//   }
// }

</style>
