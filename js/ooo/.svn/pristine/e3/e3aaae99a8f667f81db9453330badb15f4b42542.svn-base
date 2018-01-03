<template>
  <div class="input-jb-publish">
    <div class="jb-content" style="min-width: 1500px;">

      <div style="padding-left: 10px; margin: 10px 0;">
        <div class="section">
          <div class="jb-content-buyer-info top-line clearfix">
            <span class="jb-info">采购商供应商信息</span>
          </div>
          <div class="jb-info-content clearfix">
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">订单号:</span>
              </div>
              <div class="line-item-r">
                <div class="buyer-select-info">
                  <p>{{details.number}}</p>
                </div>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">订单时间:</span>
              </div>
              <div class="line-item-r">
                <div class="buyer-select-info">
                  <p>{{details.createTime | formatTime}}</p>
                </div>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">采购商:</span>
              </div>
              <div class="line-item-r">
                <div class="buyer-select-info">
                  <p>{{details.customerCompany}} {{details.customerTel}}</p>
                </div>
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l clearfix">
                <span>
                  <b style="color: red;">*</b>收货地址:</span>
              </div>
                <div class="line-item-r"  v-if="!specialType">
                <el-select v-model="addressId" placeholder="请选择收货人" style="width: 60%;" size="small">
                  <el-option v-for="item in addressList" :label="`${item.name}  ${item.tel}  ${item.province}${item.city}${item.area}${item.addr}`" :key="item.id" :value="item.id">
                  </el-option>
                </el-select>
              </div>
                <div class="line-item-r" v-else>
              {{addressName}}&nbsp; {{addressTel}}{{addressProvince}}{{addressCity}}{{addressArea}}{{addressAddr}}
              </div>
            </div>
            <div class="line-item clearfix">
              <div class="line-item-l">
                <span style="position: relative; top: 10px;">
                  <b style="color: red;">*</b>供应商:</span>
              </div>
              <div class="line-item-r">
                <div class="buyer-select-info">
                  <RuleInput v-model="shopCompany" class="input-lg" :rule="rules.madan" v-if="!specialType"></RuleInput>
                  <span style="display:inline-block;margin-top:10px" v-else>{{shopCompany}}</span>
                  {{details.shopTel}} {{details.shopProvince}}{{details.shopCity}}{{details.shopArea}}{{details.shopAddr}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-form v-for="(product,productIdx) in productNumbers" :key="productIdx" label-position="right" label-width="100px">
          <el-row type="flex" class="product-header" align="middle">
            <el-col class="product-title">
              <span>货号{{productIdx+1}}</span>
            </el-col>
          </el-row>
          <el-row v-if="product.shopId != ''">
            <el-col>
              <label class="el-form-item__label" style="width:95px;">原供应商:</label>
              <p style="font-size:14px;margin-top:9px;">{{product.shopCompany}}&nbsp;&nbsp;&nbsp;&nbsp;{{product.shopTel}}&nbsp;&nbsp;&nbsp;&nbsp;{{product.shopProvince}}{{product.shopCity}}{{product.shopArea}}{{product.shopAddr}}&nbsp;&nbsp;&nbsp;&nbsp;原货号：{{product.shopOriginalNumber}}</p>
            </el-col>
          </el-row>
          <el-form-item label="商品图片：">
            <el-row>
              <el-col class="position-center product-img-list" style="float:left">
                <div class="img-wrap" v-for="(url,urlIdx) in product.imgUrls" :key="urlIdx">
                  <img :src="'http://www.soouya.com' + url" />
                  <!-- <i class="el-icon-close" @click="removeImg(productIdx,urlIdx)" v-if="canEditProductNumber"></i> -->
                </div>
                <el-col>
                  <el-upload class="product-img-upload" drag action="/redwood/sys/Common/uploadFile.do?type=0" multiple width="100" :on-success="handleUploadImg" :before-upload="handleUploadBefore.bind(this,productIdx)" v-if="product.imgUrls.length < 0">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                      <em>点击上传</em>
                    </div>
                  </el-upload>
                </el-col>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="色卡图片：">
            <el-row>
              <el-col class="position-center product-img-list" style="float:left">
                <div class="img-wrap" v-for="(url,urlIdx) in product.colorUrls" :key="urlIdx">
                  <img :src="'http://www.soouya.com' + url" />
                  <!-- <i class="el-icon-close" @click="removeColor(productIdx,urlIdx)" v-if="canEditProductNumber"></i> -->
                </div>
                <el-col>
                  <el-upload class="product-img-upload" drag action="/redwood/sys/Common/uploadFile.do?type=0" multiple width="100" :on-success="handleUploadColor" :before-upload="handleUploadBefore.bind(this,productIdx)" v-if="product.colorUrls.length < 0">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                      <em>点击上传</em>
                    </div>
                  </el-upload>
                </el-col>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="品名：">
            <RuleInput v-model="product.title" class="input-md"  :rule="rules.number" v-if="!specialType"></RuleInput>
            <span v-else>{{product.title}}</span>
          </el-form-item>
          <el-form-item label="货号：" required>
            <RuleInput v-model="product.number" class="input-md" :rule="rules.number"  v-if="!specialType"></RuleInput>
             <span v-else>{{product.number}}</span>
          </el-form-item>
          <el-form :inline="true" v-for="(color,colorIdx) in product.colors" label-position="right" :key="colorIdx">
            <el-form-item label="色号：" required style="padding-left:35px;">
              <RuleInput v-model="color.color" class="input-sm" :rule="rules.number" :disabled="Number(color.status) == 0"  v-if="!specialType"></RuleInput>
               <span v-else>{{color.color}}</span>
            </el-form-item>
            <el-form-item label="销售单价：" required>
              <RuleInput @input="handleSaleChange" v-model="color.salePriceMoney" class="input-sm" :rule="rules.price" :disabled="Number(color.status) == 0" v-if="!specialType">
              </RuleInput>
                 <span v-else>{{color.salePriceMoney}}</span>
              <el-select v-model="color.salePriceUnit" class="input-select" :disabled="Number(color.status) == 0" v-if="!specialType">
                <el-option v-for="item in priceUnitList" :label="item" :key="item" :value="item">
                </el-option>
              </el-select>
                <span v-else>{{color.salePriceUnit}}</span>
            </el-form-item>
            <el-form-item label="数量：" required>
              <RuleInput v-model="color.followerQuantity" class="input-sm" :rule="rules.num" :disabled="Number(color.status) == 0" v-if="!specialType"></RuleInput>
                 <span v-else>{{color.followerQuantity}}</span>
              <span class="unit">{{color.salePriceUnit | shortUnit}}</span>
            </el-form-item>
            <el-form-item label="成本单价：" required v-if="details.status > 500">
              <RuleInput @input="handlePriceChange" v-model="color.followerPriceMoney" class="input-sm" :rule="rules.price" :disabled="Number(color.status) == 0">
              </RuleInput>
              {{color.salePriceUnit}}
            </el-form-item>
            <el-form-item label="采购数量：" required v-if="details.status > 500">
              <RuleInput @input="handleQuantityChange" v-model="color.cutterQuantity" class="input-sm" :rule="rules.num" :disabled="Number(color.status) == 0" v-if="!specialType"></RuleInput>
              <span v-else>{{color.cutterQuantity}}</span>
              {{color.cutterPriceUnit | shortUnit}}
            </el-form-item>
            <el-form-item label="采购单价：" v-if="details.status > 500">
              <RuleInput v-model="color.cutterPriceMoney" class="input-sm" :rule="rules.priceCanNull" :disabled="Number(color.status) == 0"  v-if="!specialType">
              </RuleInput>
               <span v-else>{{color.cutterPriceMoney}}</span>
              <el-select v-model="color.cutterPriceUnit" class="input-select" :disabled="Number(color.status) == 0"  v-if="!specialType">
                <el-option v-for="item in priceUnitList" :label="item" :key="item" :value="item">
                </el-option>
              </el-select>
                <span v-else>{{color.cutterPriceUnit}}</span>
            </el-form-item>
            <!-- <span v-if="Number(color.status) == 0" style="color:red">无货</span> -->
            <el-select @change="handleQuantityChange" v-model="color.status" style="width:100px;"  v-if="!specialType">
              <el-option label="有货" :value="1"></el-option>
              <el-option label="无货" :value="0"></el-option>
            </el-select>
             <span style="display:inline-block;margin-top:7px" v-else>
               <span v-if="color.status">有货</span>
               <span v-else>无货</span>
               </span>
          </el-form>
        </el-form>
      </div>
      <div class="section">
        <el-form label-position="right" label-width="140px">
          <div class="jb-content-buyer-info top-line clearfix">
            <span class="jb-info">其它</span>
          </div>
          <div class="jb-info-content clearfix">
            <el-form-item label="是否需要发票：" required>
              <el-radio-group v-model="needInvoice" v-if="!specialType">
                <el-radio-button :label="1">
                  需要
                </el-radio-button>
                <el-radio-button :label="0">
                  不需要
                </el-radio-button>
              </el-radio-group>
               <span  v-else>
               <span v-if="needInvoice">需要</span>
               <span v-else>不需要</span>
               </span>
            </el-form-item>
            <el-form-item label="税率：" v-if="needInvoice" required>

              <RuleInput v-model="taxPoint" :rule="rules.taxPoint"  v-if="!specialType">
              </RuleInput>
              <span v-else>{{taxPoint}}</span>%
            </el-form-item>
            <el-form-item label="备注：">
              <textarea rows="3" style="width: 300px; height: 100px; resize: none; border: 1px solid #ccc; padding: 5px;" v-model.trim="followerRemark" v-if="!specialType"></textarea>
              <span v-if="!specialType">
                <b style="color: red; padding-left: 5px;">{{leftnumber}}</b>/100字</span>
                <span v-if="specialType">{{followerRemark}}</span>
            </el-form-item>
            <div class="line-item clearfix" v-if="details.status > 500">
              <div class="line-item-l" style="width:130px;color:grey;">
                <span style="position: relative; top: 10px;">
                  <b style="color: red;">*</b>档口码单：</span>
              </div>
              <div class="line-item-r">
                <div class="showmadan">
                  <a :name="index" :href="'http://www.soouya.com' + item" :key="item" v-lightbox="madanUrls" v-for="(item, index) in madanUrls" class="madan-wrap">
                    <img :src="'http://www.soouya.com' + item" width='40' height="40" />
                    <!-- <span @click="delMadan(item, key)" class="del-arrow" v-if="canEditMadan">X</span> -->
                  </a>
                </div>
                <el-upload action="/redwood/sys/Common/uploadFile.do?type=0" multiple style="float: left; width: auto;" :on-success="handleUploadMadan" :before-upload="handleUploadBefore.bind(-1)" v-if="madanUrls.length < 0">
                  <div class="upImg">+</div>
                </el-upload>
              </div>
            </div>
            <div class="line-item clearfix" v-if="details.status > 500">
              <div class="line-item-l" style="width:130px;color:#48576a;">
                <span>
                  <b style="color: red;">*</b>码单号码：
                </span>
              </div>
              <div class="line-item-r">
                <RuleInput v-model="madan" size="small" style="width: 150px;" :rule="rules.madan" v-if="!specialType"></RuleInput>
                  <span v-else>{{madan}}</span>
              </div>
            </div>
            <div class="line-item clearfix" v-if="details.status > 500">
              <div class="line-item-l" style="width:130px;color:#48576a;">
                <span>成本货款：</span>
              </div>
              <div class="line-item-r">
                <div class="money-info clearfix">
                  <p class="money-info-item clearfix">
                    <span style="width: 100px; margin-right: 10px;">
                       <RuleInput v-model="costMoney" size="small" :disabled="hadProduct" style="width: 150px;" :rule="rules.total" ></RuleInput>
                          元
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="line-item clearfix" v-if="details.status > 500">
              <div class="line-item-l" style="width:130px;color:#48576a;">
                <span>总费用：</span>
              </div>
              <div class="line-item-r">
                <div class="money-info clearfix">
                  <p class="money-info-item clearfix">
                    <span style="width: 100px; margin-right: 10px;">
                       <RuleInput v-model="totalMoney" size="small" :disabled="hadProduct" style="width: 150px;" :rule="rules.total"  v-if="!specialType"></RuleInput>
                       <span v-else>{{totalMoney}}</span>
                          元
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="line-item clearfix" >
              <div class="line-item-l" style="width:130px;color:#48576a;">
                <span>支付方式：</span>
              </div>
              <div class="line-item-r">
                <div class="money-info clearfix">
                  <p class="money-info-item clearfix">
                    <span style="width: 100px; margin-right: 10px;">
                      <span>{{creditType | creditTypeFilter}}</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="line-item clearfix" v-if="creditType == 1">
              <div class="line-item-l" style="width:130px;color:#48576a;">
                <span>回款时间：</span>
              </div>
              <div class="line-item-r">
                <div class="money-info clearfix">
                  <p class="money-info-item clearfix">
                    <span style="width: 100px; margin-right: 10px;">
                      <el-date-picker v-model="returnDate" type="date" size="small" placeholder="选择时间" :picker-options="pickerOptions1"> </el-date-picker>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div style="text-align: center;">
              <el-button @click.native="back">返回</el-button>
              <el-button type="primary" @click.native="save" :disabled="!canSubmitUpdate500" v-if="details.status == 500">保存</el-button>
              <el-button type="primary" @click.native="save" :disabled="!canSubmitUpdateExcept50" v-else>保存</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <lightbox></lightbox>
  </div>
</template>

<script>
import Lightbox from '@/components/light-box/lightbox'
// import allApi from 'api/allApi'
// import lrz from 'lrz'
import { Message } from 'element-ui'
import RuleInput from '@/components/ruleInput'
const regFloat = /^\d+(\.\d{1,2})?$/
const buyRegFloat = /^\d+(\.\d{1,6})?$/
import request from '@/utils/request'
export default {
  components: {
    Lightbox,
    RuleInput
  },
  data() {
    return {
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      addressList: [],
      addressId: '',
      addressName: '',
      addressTel: '',
      addressProvince: '',
      addressCity: '',
      addressArea: '',
      addressAddr: '',
      shopCompany: '',
      productNumbers: [],
      needInvoice: '',
      taxPoint: '',
      followerRemark: '',
      madanUrls: [],
      madan: '',
      details: {},
      costMoney: '',
      specialType: null,
      totalMoney: '',
      priceUnitList: [
        '元/米',
        '元/码',
        '元/千克',
        '元/条',
        '元/罗',
        '元/对'
      ],
      currentUploadIndex: 0,
      creditType: null,
      returnDate: null,
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
        priceCanNull: {
          message: '请输入大于0小于1万且最多六位小数的值',
          rule(val) {
            if (val == '') {
              return false
            }
            if (buyRegFloat.test(val) && val < 10000 && val > 0) {
              return false
            } else {
              return true
            }
          }
        },
        price: {
          message: '请输入大于0小于1万且最多六位小数的值',
          rule(val) {
            if (buyRegFloat.test(val) && val < 10000 && val > 0) {
              return false
            } else {
              return true
            }
          }
        },
        num: {
          message: '请输入大于0小于10万且最多六位小数的值',
          rule(val) {
            if (buyRegFloat.test(val) && val < 100000 && val > 0) {
              return false
            } else {
              return true
            }
          }
        },
        total: {
          message: '请输入正确的数字',
          rule(val) {
            if (buyRegFloat.test(val) && val > 0) {
              return false
            } else {
              return true
            }
          }
        },
        madan: {
          message: '请输入1~100字',
          rule(val) {
            if (val.length <= 100 && val.length > 0) {
              return false
            } else {
              return true
            }
          }
        },
        number: {
          message: '请输入1~30字',
          rule(val) {
            if (val.length <= 30 && val.length > 0) {
              return false
            } else {
              return true
            }
          }
        }
      }
    }
  },
  mounted() {
    this.specialType = this.$route.query.special // 新增510，522两个状态的编辑入口，且只能编辑成本单价和成本货款
    this.getDetail()
  },
  computed: {
    canEditAddr() {
      if (this.details.status == 521 || this.details.status == 522) {
        return false
      }
      return true
    },
    canEditShopCompany() {
      if (this.details.status == 503 || this.details.status == 520) {
        return false
      }
      return true
    },
    canEditMadan() {
      if (this.details.status == 501 || this.details.status == 502) {
        return true
      }
      return false
    },
    canEditProductNumber() {
      if (this.details.status == 500 || this.details.status == 501 || this.details.status == 502) {
        return true
      }
      return false
    },
    canSubmitUpdate500() {
      if (this.shopCompany == '' || this.shopCompany.length > 100) {
        return false
      }
      if (!this.returnDate && this.creditType == 1) { // 支付方式是垫付支付的时候必须选择回款时间
        return false
      }
      if (this.needInvoice == 1 && (this.taxPoint == '' || this.taxPoint <= 0 || this.taxPoint > 100)) {
        return false
      }
      //  if (/^\d+(\.\d{1,6})?$/.test(this.costMoney) == false) { /* 500 状态的时候这两个值都没显示出来所以判断是多余的暂时注释 */
      //   return false
      // }
      //  if (/^\d+(\.\d{1,6})?$/.test(this.totalMoney) == false) {
      //   return false
      // }
      for (var i = 0; i < this.productNumbers.length; i++) {
        var productNumber = this.productNumbers[i]
        if (productNumber.number == '' || productNumber.number.length > 30) {
          return false
        }
        for (var j = 0; j < productNumber.colors.length; j++) {
          var color = productNumber.colors[j]
          if (Number(color.status) == 0) {
            continue
          }
          if (color.color == '' || color.color.length > 30) {
            return false
          }
          var failed = this.rules.price.rule(color.salePriceMoney) || this.rules.num.rule(color.followerQuantity)
          if (this.canEditMadan) {
            failed = failed || this.rules.madan.rule(this.madan)
          }
          if (this.canEditShopCompany) {
            failed = failed || this.rules.madan.rule(this.shopCompany)
          }
          if (color.salePriceMoney == '' || color.salePriceUnit == '' || color.followerQuantity == '') {
            return false
          }
          if (failed) {
            return false
          }
        }
      }
      return true
    },
    canSubmitUpdateExcept50() {
      if (this.madanUrls.length == 0 || this.madan == '' || this.madan.length > 100 || this.shopCompany == '' || this.shopCompany.length > 100) {
        return false
      }
      if (!this.returnDate && this.creditType == 1) { // 支付方式是垫付支付的时候必须选择回款时间
        return false
      }
      if (this.needInvoice == 1 && (this.taxPoint == '' || this.taxPoint <= 0 || this.taxPoint > 100)) {
        return false
      }
      if (/^\d+(\.\d{1,6})?$/.test(this.costMoney) == false) {
        return false
      }
        if (/^\d+(\.\d{1,6})?$/.test(this.totalMoney) == false) {
        return false
      }
      for (var i = 0; i < this.productNumbers.length; i++) {
        var productNumber = this.productNumbers[i]
        if (productNumber.number == '' || productNumber.number.length > 30) {
          return false
        }
        for (var j = 0; j < productNumber.colors.length; j++) {
          var color = productNumber.colors[j]
          if (Number(color.status) == 0) {
            continue
          }
          if (color.color == '' || color.color.length > 30) {
            return false
          }
          var failed = this.rules.price.rule(color.salePriceMoney) || this.rules.price.rule(color.followerPriceMoney) || this.rules.priceCanNull.rule(color.cutterPriceMoney) || this.rules.num.rule(color.cutterQuantity) || this.rules.num.rule(color.followerQuantity)
          if (this.canEditMadan) {
            failed = failed || this.rules.madan.rule(this.madan)
          }
          if (this.canEditShopCompany) {
            failed = failed || this.rules.madan.rule(this.shopCompany)
          }
          if (color.salePriceUnit == '' || color.followerPriceUnit == '' || (color.cutterPriceMoney != '' && color.cutterPriceUnit == '')) {
            return false
          }
          if (failed) {
            return false
          }
        }
      }
      return true
    },
    hadProduct: {
      get() {
        let bool = true
        this.productNumbers && this.productNumbers.length && this.productNumbers.forEach((item) => {
          item.colors && item.colors.forEach((val) => {
            if (val.status != 0) {
              bool = false
            }
          })
        })
        return bool
      },
      set() {
      }
    },
    leftnumber() {
      return 100 - String(this.followerRemark).length
    }
  },
  watch: {
    followerRemark(val) {
      if (val.length >= 100) {
        this.followerRemark = val.slice(0, 100)
      }
    }
  },
  filters: {
    shortUnit(val) {
      var index = val.indexOf('/')
      if (index < 0) {
        return val
      }
      return val.substring(index + 1)
    },
    creditTypeFilter(val) {
      switch (val) {
        case 1:
            return '垫付支付';
          case 3:
            return '余额支付';
          default:
            return '--';
        }
    }
  },
  methods: {
    handlePriceChange() {
      let total = 0
      this.productNumbers && this.productNumbers.length && this.productNumbers.forEach((item) => {
        let temTotal = 0
        item.colors && item.colors.forEach((val) => {
          if (val.status != 0) {
            temTotal += Number(val.followerPriceMoney) * Number(val.cutterQuantity)
          }
        })
        total += temTotal
      })
      this.costMoney = Number(total).toFixed(2)
    },
    handleSaleChange() {
      let total = 0
      this.productNumbers && this.productNumbers.length && this.productNumbers.forEach((item) => {
        let temTotal = 0
        item.colors && item.colors.forEach((val) => {
          if (val.status != 0) {
            temTotal += Number(val.salePriceMoney) * Number(val.cutterQuantity)
          }
        })
        total += temTotal
      })
      this.totalMoney = Number(total).toFixed(2)
    },
    handleQuantityChange() {
      this.handleSaleChange()
      this.handlePriceChange()
    },
    getTemAddressData() {
      let addressData = {}
      this.addressList.forEach((item) => {
        if (item.id == this.addressId) {
          addressData = item
        }
      })
      return addressData
    },
    getAddressList(customerId) {
      this.addressId = ''
      request('/redwood/buyfollow/Address/list', {
        method: 'POST',
        data: {
          userId: customerId
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.success == 1) {
          this.addressList = res.result
        }
      })
    },
    getDetail() {
      const id = this.$route.query.id
      request(`/redwood/ziying/cut/${id}`, {
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.success == 1) {
          this.details = res.obj
          console.log(this.details)
          this.getAddressList(this.details.customerId)
          this.convertData()
        }
      })
    },
    convertData() {
      this.shopCompany = this.details.shopCompany
      this.productNumbers = this.details.productNumbers
      this.needInvoice = this.details.needInvoice
      this.taxPoint = this.details.taxPoint >= 0 ? this.details.taxPoint : ''
      this.followerRemark = this.details.followerRemark
      this.madanUrls = this.details.madanUrls
      this.madan = this.details.madan
      this.totalMoney = this.details.totalMoney
      this.costMoney = this.details.costMoney
      this.addressId = Number(this.details.addressId)
      this.addressName = this.details.addressName
      this.addressTel = this.details.addressTel
      this.addressProvince = this.details.addressProvince
      this.addressCity = this.details.addressCity
      this.addressArea = this.details.addressArea
      this.addressAddr = this.details.addressAddr
      this.creditType = this.details.creditType
      this.creditType = this.details.creditType
      this.returnDate = (this.details.returnDate > 0) ? this.details.returnDate : null
      for (var i = 0; i < this.productNumbers.length; i++) {
        var productNumber = this.productNumbers[i]
        for (var j = 0; j < productNumber.colors.length; j++) {
          var color = productNumber.colors[j]
          if (color.salePriceMoney < 0) {
            color.salePriceMoney = ''
          }
          if (color.followerPriceMoney < 0) {
            color.followerPriceMoney = ''
          }
          if (color.cutterPriceMoney < 0) {
            color.cutterPriceMoney = ''
          }
          if (color.cutterQuantity < 0) {
            color.cutterQuantity = ''
          }
          if (color.followerQuantity < 0) {
            color.followerQuantity = ''
          }
          if (color.status == 0) {
            color.statusBox = true
          }
          if (color.status < 0) {
            color.status = 1
          }
        }
      }
    },
    handleUploadMadan(response, file, fileList) {
      if (response.success === '1') {
        if (this.madanUrls.length < 9) {
          this.madanUrls.push(response.imgUrl)
        }
      } else {
        Message.error(response.msg)
      }
    },
    handleUploadImg(response, file, fileList) {
      if (response.success === '1') {
        if (this.productNumbers[this.currentUploadIndex].imgUrls.length < 9) {
          this.productNumbers[this.currentUploadIndex].imgUrls.push(response.imgUrl)
        }
      } else {
        Message.error(response.msg)
      }
    },
    handleUploadColor(response, file, fileList) {
      if (response.success === '1') {
        if (this.productNumbers[this.currentUploadIndex].colorUrls.length < 9) {
          this.productNumbers[this.currentUploadIndex].colorUrls.push(response.imgUrl)
        }
      } else {
        Message.error(response.msg)
      }
    },
    handleUploadBefore(productIdx) {
      this.currentUploadIndex = productIdx
      return true
    },
    delMadan(url) {
      this.madanUrls = this.madanUrls.filter((item, key) => item != url)
    },
    removeImg(productIdx, urlIdx) {
      this.productNumbers[productIdx].imgUrls.splice(urlIdx, 1)
    },
    removeColor(productIdx, urlIdx) {
      this.productNumbers[productIdx].colorUrls.splice(urlIdx, 1)
    },
    handleError(file, fileList) {
      // this.$store.dispatch('changeload', false)
    },
    back() {
      this.$confirm('点击返回已填写的信息将会丢失，是否确认返回？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.go(-1)
      }).catch(() => {
      })
    },
    save() {
      const addressData = this.getTemAddressData()
      for (var i = 0; i < this.productNumbers.length; i++) {
        var productNumber = this.productNumbers[i]
        for (var j = 0; j < productNumber.colors.length; j++) {
          var color = productNumber.colors[j]
          // if (this.details.status > 500) {
          //   if (Number(color.salePriceMoney) > Number(color.followerPriceMoney)) {
          //   } else if (Number(color.status) != 0) {
          //     this.$message.error('销售价需>成本单价');
          //     this.$store.dispatch('changeload', false)
          //     return;
          //   }
          // }
          var index = color.cutterPriceUnit.indexOf('/')
          if (index >= 0) {
            color.cutterQuantityUnit = color.cutterPriceUnit.substring(index + 1)
          }
          var index2 = color.salePriceUnit.indexOf('/')
          if (index2 >= 0) {
            color.followerQuantityUnit = color.salePriceUnit.substring(index2 + 1)
          }
          if (color.cutterPriceMoney == '') {
            color.cutterPriceMoney = -1
          }
        }
        color.followerPriceUnit = color.salePriceUnit
      }
      const obj = {
        addressProvince: addressData.province,
        addressCity: addressData.city,
        addressArea: addressData.area,
        addressAddr: addressData.addr,
        addressName: addressData.name,
        addressTel: addressData.tel,
        addressId: this.addressId,
        shopCompany: this.shopCompany,
        productNumbers: this.productNumbers,
        needInvoice: this.needInvoice,
        taxPoint: this.taxPoint,
        followerRemark: this.followerRemark,
        madanUrls: this.madanUrls,
        madan: this.madan,
        totalMoney: this.totalMoney,
        costMoney: this.costMoney
      }
      if (!this.returnDate && this.creditType == 1) { // 支付方式是垫付支付的时候必须选择回款时间
        this.$message.error('必须选择回款时间')
        return
      } else {  /* 选择时间以后自动取到那一天的23：59：59 */
        obj.returnDate = +new Date(this.returnDate) + 86399000
      }
      // this.$store.dispatch('changeload', true)
      // 是否存在put方法
      request(`/redwood/cut/${this.details.number}?_function=updateByNumber`, {
        method: 'PUT',
        data: obj,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        // this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000
          })
          window.history.go(-1)
        } else {
          Message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    }
  },
  update() {
  }
}
</script>
<style src="@/assets/style/table.scss" lang="scss"></style>
<style lang="scss">
p {
  margin: 0;
}

.clearfix:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}

.clearfix {
  zoom: 1;
}

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

.input-jb-publish {
  // min-width: 1300px;
  .jb-title {
    font-size: 18px;
    font-weight: normal;
  }
  .jb-progress {
    padding-top: 20px;
    text-align: center;
  }
  .el-upload-list {
    display: none;
  }
  .bot-line {
    position: relative;
    &:after {
      position: absolute;
      display: block;
      content: '';
      height: 2px;
      width: 100%; // top: 35px;
      background: #bfcbd9;
    }
  }
  .top-line {
    position: relative;

    &:before {
      position: absolute;
      display: block;
      content: '';
      height: 2px;
      width: 100%; // top: 36px;
      background: #bfcbd9;
    }
  }

  .jb-info {
    float: left;
    width: 150px;
    padding: 10px 0;
    background: #20a0ff;
    text-align: center;
    color: #fff;
  }
  .jb-info-content {
    padding-bottom: 20px;
    .line-item {
      margin-bottom: 10px;
      .line-item-l {
        float: left;
        font-size: 14px;
        width: 100px;
        text-align: right;
        padding-right: 10px;
      }
      .radio-tit {
        padding-top: 5px;
      }
      .line-item-r {
        font-size: 14px;
        min-width: 500px;
        float: left;
      }
      .buyer-select-info {
        p {
          padding: 10px 0;
        }
      }
      .mark {
        color: red;
      }
    }
  }
  .product-list {
    .pro-title {
      position: relative;
      top: 10px;
      float: left;
      margin-right: 10px;
    }
    .pro-list-item {
      float: left;
      margin-right: 20px;
    }
  }
  .jb-content-buyer-info {
    margin-bottom: 10px;
  }
  .operate-wrap {
    .operate {
      float: right;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #20a0ff;
      border-radius: 50%;
      cursor: pointer;
      color: #fff;
      &:hover {
        color: #000;
        background: #0c95fb;
      }
    }
    .add {
      margin-right: 20px;
    }
    .plus {
      background: #FF4949;
      &:hover {
        color: #000;
        background: #FF4949;
      }
    }
  }
  .jb-content-title {
    margin: 30px 0;
  }
  .showmadan {
    float: left;
    .madan-wrap {
      position: relative;
      float: left;
      margin-right: 10px;
      margin-bottom: 10px;
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
  }
  .input-select {
    width: 100px;
  }
  .upImg {
    float: left;
    width: 40px;
    height: 40px;
    line-height: 36px;
    background: #ccc;
    text-align: center;
    color: #fff;
    font-size: 40px;
    cursor: pointer;
    &:active {
      background: #999;
    }
  }
  .money-info {
    .money-info-ls {
      float: left;
      width: 100px;
    }
    .money-info-item {
      margin-bottom: 10px;
    }
  }
}

.product-header {
  border-top: 2px solid #bfcbd9;
  .product-title {
    background: #20a0ff;
    color: #fff;
    width: 150px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
}

.position-center {
  display: flex;
  align-items: center;
}

.product-img-list {
  .img-wrap {
    width: 80px;
    height: 80px;
    position: relative;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .el-icon-close {
      position: absolute;
      right: -5px;
      top: -5px;
      background: rgba(0, 0, 0, .5);
      border-radius: 50%;
      overflow: hidden;
      color: #fff;
      font-size: 12px;
      padding: 5px;
    }
  }
}

.input-lg {
  width: 200px;
}

.input-md {
  width: 150px;
}

.input-sm {
  width: 80px;
}
</style>
