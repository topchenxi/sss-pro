<template>
  <div class="input-jb-publish detail">
    <div class="detail-title">
      <span @click="back"></span>
      <p>详情</p>
    </div>
    <div class="detail-group">
      <div class="detail-item w100p">
        <h6>采购商供应商信息</h6>
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
            <div class="line-item-r">
              <el-select v-model="addressId" placeholder="请选择收货人" class="w400" :disabled="!canEdit">
                <el-option v-for="item in addressList" :label="`${item.name}  ${item.tel}  ${item.province}${item.city}${item.area}${item.addr}`" :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="line-item clearfix">
            <div class="line-item-l">
              <span style="position: relative; top: 10px;">
                  <b style="color: red;">*</b>供应商:</span>
            </div>
            <div class="line-item-r">
              <el-button @click.native="changeShop" :disabled="!canEdit" type="primary" icon="edit">修改供应商</el-button>
              <div class="mt10">
                <p>{{details.shopCompany}}</p>
                <p>{{details.shopTel}}</p>
                <p>{{details.shopProvince}}{{details.shopCity}}{{details.shopArea}}{{details.shopAddr}}</p>
              </div>
              <!-- <div class="buyer-select-info">
                <RuleInput v-model="shopCompany" class="input-lg" :rule="rules.madan" :disabled="!canEditShopCompany"></RuleInput>
                {{details.shopTel}} {{details.shopProvince}}{{details.shopCity}}{{details.shopArea}}{{details.shopAddr}}
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="jb-content">
      <div>
        <el-form v-for="(product,productIdx) in productNumbers" :label-position="right" label-width="100px">
          <div class="detail-group">
            <div class="detail-item w100p">
              <h6>货号{{productIdx+1}}</h6>
              <el-row v-if="product.shopId != ''">
                <el-col>
                  <label class="el-form-item__label" style="width:95px;">原供应商:</label>
                  <p style="font-size:14px;margin-top:9px;">{{product.shopCompany}}&nbsp;&nbsp;&nbsp;&nbsp;{{product.shopTel}}&nbsp;&nbsp;&nbsp;&nbsp;{{product.shopProvince}}{{product.shopCity}}{{product.shopArea}}{{product.shopAddr}}&nbsp;&nbsp;&nbsp;&nbsp;原货号：{{product.shopOriginalNumber}}</p>
                </el-col>
              </el-row>
              <el-form-item label="商品图片：">
                <el-row>
                  <el-col class="position-center product-img-list" style="float:left">
                    <div class="img-wrap" v-for="(url,urlIdx) in product.imgUrls">
                      <img :src="'http://www.soouya.com' + url" />
                      <i class="el-icon-close" @click="removeImg(productIdx,urlIdx)" v-if="canEdit"></i>
                    </div>
                    <el-col>
                      <el-upload class="product-img-upload" drag action="/redwood/sys/Common/uploadFile.do?type=0" multiple width="100" :on-success="handleUploadImg" :before-upload="handleUploadBefore.bind(this,productIdx)" v-if="product.imgUrls.length < 9 && canEdit">
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
                    <div class="img-wrap" v-for="(url,urlIdx) in product.colorUrls">
                      <img :src="'http://www.soouya.com' + url" />
                      <i class="el-icon-close" @click="removeColor(productIdx,urlIdx)" v-if="canEdit"></i>
                    </div>
                    <el-col>
                      <el-upload class="product-img-upload" drag action="/redwood/sys/Common/uploadFile.do?type=0" multiple width="100" :on-success="handleUploadColor" :before-upload="handleUploadBefore.bind(this,productIdx)" v-if="product.colorUrls.length < 9 && canEdit">
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
                <RuleInput v-model="product.title" class="input-md" :disabled="!canEdit" :rule="rules.number"></RuleInput>
              </el-form-item>
              <el-form-item label="货号：" required>
                <RuleInput v-model="product.number" class="input-md" :rule="rules.number" :disabled="!canEdit"></RuleInput>
              </el-form-item>
              <el-form :inline="true" v-for="(color,colorIdx) in product.colors" :label-position="right">
                <el-form-item label="色号：" required style="padding-left:35px;">
                  <RuleInput v-model="color.color" class="input-sm" :rule="rules.number" :disabled="!canEdit || Number(color.status) == 0"></RuleInput>
                </el-form-item>
                <el-form-item label="销售价：" required>
                  <RuleInput v-model="color.salePriceMoney" class="input-sm" :rule="rules.price" :disabled="!canEdit || Number(color.status) == 0">
                  </RuleInput>
                  <el-select v-model="color.salePriceUnit" class="input-select" :disabled="!canEdit || Number(color.status) == 0">
                    <el-option v-for="item in priceUnitList" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="数量：" required>
                  <RuleInput v-model="color.followerQuantity" class="input-sm" :rule="rules.num" :disabled="!canEdit || Number(color.status) == 0"></RuleInput>
                  <span class="unit">{{color.salePriceUnit | shortUnit}}</span>
                </el-form-item>
                <el-form-item label="成本单价：" required v-if="details.status > 500">
                  <RuleInput v-model="color.followerPriceMoney" class="input-sm" :rule="rules.price" :disabled="!canEdit || Number(color.status) == 0">
                  </RuleInput>
                  {{color.salePriceUnit}}
                </el-form-item>
                <el-form-item label="采购数量：" required v-if="details.status > 500">
                  <RuleInput v-model="color.cutterQuantity" class="input-sm" :rule="rules.num" :disabled="!canEdit || Number(color.status) == 0"></RuleInput>
                  {{color.cutterPriceUnit | shortUnit}}
                </el-form-item>
                <el-form-item label="采购单价：" v-if="details.status > 500">
                  <RuleInput v-model="color.cutterPriceMoney" class="input-sm" :rule="rules.priceCanNull" :disabled="!canEdit || Number(color.status) == 0">
                  </RuleInput>
                  <el-select v-model="color.cutterPriceUnit" class="input-select" :disabled="!canEdit || Number(color.status) == 0">
                    <el-option v-for="item in priceUnitList" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <span v-if="Number(color.status) == 0" style="color:red">无货</span>
              </el-form>
            </div>
          </div>
        </el-form>
      </div>
      <div class="detail-group">
        <div class="detail-item w100p">
          <el-form :label-position="right" label-width="140px">
            <h6>其它</h6>
            <div class="jb-info-content clearfix">
              <el-form-item label="是否需要发票：" required>
                <el-radio-group v-model="needInvoice" :disabled="!canEdit">
                  <el-radio-button :label="1">
                    需要
                  </el-radio-button>
                  <el-radio-button :label="0">
                    不需要
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="税率：" v-if="needInvoice" required>
                <RuleInput v-model="taxPoint" :rule="rules.taxPoint" :disabled="!canEdit">
                </RuleInput>%
              </el-form-item>
              <el-form-item label="备注：">
                <textarea rows="3" style="width: 300px; height: 100px; resize: none; border: 1px solid #ccc; padding: 5px;" v-model.trim="followerRemark" :disabled="!canEdit"></textarea>
                <span>
                <b style="color: red; padding-left: 5px;">{{leftnumber}}</b>/100字</span>
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
                    <span @click="delMadan(item, key)" class="del-arrow" v-if="canEdit">X</span>
                  </a>
                  </div>
                  <el-upload action="/redwood/sys/Common/uploadFile.do?type=0" multiple style="float: left; width: auto;" :on-success="handleUploadMadan" :before-upload="handleUploadBefore.bind(-1)" v-if="madanUrls.length < 9 && canEdit">
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
                  <RuleInput v-model="madan" size="small" style="width: 150px;" :rule="rules.madan" :disabled="!canEdit"></RuleInput>
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
                      <b style="color:red; font-size: 18px; margin-right: 10px;">{{Number(costMoney).toFixed(2)}}</b>元
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
                      <b style="color:red; font-size: 18px; margin-right: 10px;">{{Number(totalMoney).toFixed(2)}}</b>元
                    </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="p20 m20 mb0 pb0" style="text-align: center;border-top:1px solid #ddd">
                <el-button @click.native="back">返回</el-button>
                <el-button type="primary" @click.native="save" :disabled="!canSubmitUpdate500" v-if="details.status == 500">保存</el-button>
                <el-button type="primary" @click.native="save" :disabled="!canSubmitUpdateExcept50" v-else>保存</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <lightbox></lightbox>
    <el-dialog v-model="shopDialogVisible" title="修改供应商" class="shop-dialog">
      <el-input v-model="reqShopParams.keyword" @keyup.enter.native="getShopList" class="w300" placeholder="供应商名称/供应商电话"></el-input>
      <el-button @click.native="getShopList" class="left-margin25" type="primary">搜索</el-button>
      <el-button @click.native="resetShop" class="left-margin25">重置</el-button>
      <el-table :data="shopList" :height="500" border class="mt20">
        <el-table-column label="供应商Id" prop="sellerNumber"></el-table-column>
        <el-table-column label="店铺名称" prop="sellerCompany"></el-table-column>
        <el-table-column label="档口名称" prop="company"></el-table-column>
        <el-table-column label="店铺电话" prop="tel"></el-table-column>
        <el-table-column label="所在地区" prop="">
          <template slot-scope="scope">
            {{scope.row.province + scope.row.city + scope.row.area}}
          </template>
        </el-table-column>
        <el-table-column label="详细地址" prop="addr"></el-table-column>
        <el-table-column label="操作" prop="">
          <template slot-scope="scope">
            <el-button size="small" type="primary" :disabled="scope.row.id == details.shopId" @click.native="confirmSelectShop(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-content">
        <pagination :page="page.pageNumber" :total="page.totalCount" :render="getShopList" :options="reqShopParams"></pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import allApi from 'api/allApi'
// import lrz from 'lrz'
import RuleInput from 'components/ruleInput'
import pagination from 'components/pagination'
const regFloat = /^\d+(\.\d{1,2})?$/
const buyRegFloat = /^\d+(\.\d{1,6})?$/
import {
  request,
  newRequest,
  // unique,
  // setCache,
  formatTimeString
}
from 'utils/tool'
export default {
  components: {
    Lightbox,
    pagination,
    RuleInput
  },
  data() {
    return {
      reqShopParams: {
        keyword: '',
        pageSize: 20,
        pageNumber: 1,
      },
      page: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 20
      },
      shopList: [],
      shopDialogVisible: false,
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
      priceUnitList: [
        '元/米',
        '元/码',
        '元/千克',
        '元/条',
        '元/罗',
        '元/对'
      ],
      currentUploadIndex: 0,
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
              return false;
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
      },
    }
  },
  mounted() {
    this.getDetail()
  },
  computed: {
    canEdit() {
      console.log(this.details.status);
      // 待录入剪版信息，待通知提货，待提货，待收版，待提交支付  可以编辑全部
      switch ('' + this.details.status) {
        case '500':
          // 待录入剪版信息
          return true;
        case '501':
          // 待通知提货
          return true;
        case '502':
          // 待提货
          return true;
        case '503':
          // 待收版
          return true;
        case '521':
          // 待提交支付
          return true;
        default:
          return false;
      }
    },
    canEditAddr() {
      if (this.details.status == 521 || this.details.status == 522) {
        return false;
      }
      return true;
    },
    canEditShopCompany() {
      if (this.details.status == 520) {
        return false;
      }
      return true;
    },
    canEditMadan() {
      if (this.details.status == 501 || this.details.status == 502) {
        return true;
      }
      return false;
    },
    canEditProductNumber() {
      if (this.details.status == 500 || this.details.status == 501 || this.details.status == 502) {
        return true;
      }
      return false;
    },
    canSubmitUpdate500() {
      if (this.shopCompany == '' || this.shopCompany.length > 100) {
        return false
      }
      if (this.needInvoice == 1 && (this.taxPoint == '' || this.taxPoint <= 0 || this.taxPoint > 100)) {
        return false
      }
      for (var i = 0; i < this.productNumbers.length; i++) {
        var productNumber = this.productNumbers[i];
        if (productNumber.number == '' || productNumber.number.length > 30) {
          return false
        }
        for (var j = 0; j < productNumber.colors.length; j++) {
          var color = productNumber.colors[j]
          if (Number(color.status) == 0) {
            continue;
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
            return false;
          }
        }
      }
      return true;
    },
    canSubmitUpdateExcept50() {
      if (this.madanUrls.length == 0 || this.madan == '' || this.madan.length > 100 || this.shopCompany == '' || this.shopCompany.length > 100) {
        return false
      }
      if (this.needInvoice == 1 && (this.taxPoint == '' || this.taxPoint <= 0 || this.taxPoint > 100)) {
        return false
      }
      for (var i = 0; i < this.productNumbers.length; i++) {
        var productNumber = this.productNumbers[i];
        if (productNumber.number == '' || productNumber.number.length > 30) {
          return false
        }
        for (var j = 0; j < productNumber.colors.length; j++) {
          var color = productNumber.colors[j]
          if (Number(color.status) == 0) {
            continue;
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
            return false;
          }
        }
      }
      return true;
    },
    totalMoney() {
      // totalMoney += colorVo.getSalePriceMoney() * colorVo.getCutterQuantity() * (taxPoint == null || taxPoint < 0 ? 1 : (1 + (taxPoint / 100)));
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
      return Number(total).toFixed(2)
    },
    costMoney() {
      // totalMoney += colorVo.getSalePriceMoney() * colorVo.getCutterQuantity() * (taxPoint == null || taxPoint < 0 ? 1 : (1 + (taxPoint / 100)));
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
      return Number(total).toFixed(2)
    },
    leftnumber() {
      return 100 - String(this.followerRemark).length
    },
  },
  watch: {
    followerRemark(val) {
      if (val.length >= 100) {
        this.followerRemark = val.slice(0, 100)
      }
    }
  },
  filters: {
    formatTime(val) {
      return formatTimeString(val)
    },
    shortUnit(val) {
      var index = val.indexOf('/')
      if (index < 0) {
        return val
      }
      return val.substring(index + 1)
    }
  },
  methods: {
    getShopList() {
      newRequest({
        method: 'post',
        url: '/redwood/sys/Shop/list',
        data: this.reqShopParams,
        contentType: 'application/json',
      }).then(res => {
        if (res.success !== '1') {
          this.$message.error(res.msg);
        } else {
          this.shopList = res.page.result
          this.page.pageSize = res.page.pageSize
          this.page.pageNumber = res.page.pageNumber
          this.page.totalCount = res.page.totalCount
        }
      })
    },
    resetShop() {
      this.reqShopParams.keyword = ''
      this.reqShopParams.pageSize = 20
      this.reqShopParams.pageNumber = 1
      this.getShopList()
    },
    changeShop() {
      this.shopDialogVisible = true;
      this.getShopList();
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
      newRequest({
        url: allApi.Address.list,
        contentType: 'application/json',
        data: {
          userId: customerId
        }
      }, (res) => {
        if (res.success == 1) {
          this.addressList = res.result
        }
      })
    },
    getDetail() {
      this.$store.dispatch('changeload', true)
      const id = this.$route.query.id
      request({
        url: `/redwood/ziying/cut/${id}`,
        method: 'get',
        data: {}
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.details = res.obj
          this.getAddressList(this.details.customerId)
          this.convertData()
          console.log(this.canEdit);
        }
      })
    },
    confirmSelectShop(item) {
      this.shopDialogVisible = false
      this.details.shopAddr = item.addr
      this.details.shopArea = item.area
      this.details.shopCity = item.city
      this.details.shopCompany = item.sellerCompany ? item.sellerCompany : item.company
      this.details.shopId = item.id
      this.details.shopProvince = item.province
      this.details.shopTel = item.tel
    },
    convertData() {
      this.shopCompany = this.details.shopCompany
      this.productNumbers = this.details.productNumbers
      this.needInvoice = this.details.needInvoice
      this.taxPoint = this.details.taxPoint >= 0 ? this.details.taxPoint : ''
      this.followerRemark = this.details.followerRemark
      this.madanUrls = this.details.madanUrls
      this.madan = this.details.madan
      // this.totalMoney = this.details.totalMoney
      // this.costMoney = this.details.costMoney
      this.addressId = Number(this.details.addressId)
      this.addressName = this.details.addressName
      this.addressTel = this.details.addressTel
      this.addressProvince = this.details.addressProvince
      this.addressCity = this.details.addressCity
      this.addressArea = this.details.addressArea
      this.addressAddr = this.details.addressAddr
      for (var i = 0; i < this.productNumbers.length; i++) {
        var productNumber = this.productNumbers[i];
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
        }
      }
    },
    handleUploadMadan(response, file, fileList) {
      if (response.success === '1') {
        if (this.madanUrls.length < 9) {
          this.madanUrls.push(response.imgUrl)
        }
      } else {
        this.$message.error(response.msg);
      }
    },
    handleUploadImg(response, file, fileList) {
      if (response.success === '1') {
        if (this.productNumbers[this.currentUploadIndex].imgUrls.length < 9) {
          this.productNumbers[this.currentUploadIndex].imgUrls.push(response.imgUrl)
        }
      } else {
        this.$message.error(response.msg);
      }
    },
    handleUploadColor(response, file, fileList) {
      if (response.success === '1') {
        if (this.productNumbers[this.currentUploadIndex].colorUrls.length < 9) {
          this.productNumbers[this.currentUploadIndex].colorUrls.push(response.imgUrl)
        }
      } else {
        this.$message.error(response.msg);
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
      this.$store.dispatch('changeload', false)
    },
    back() {
      this.$confirm('点击返回已填写的信息将会丢失，是否确认返回？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.go(-1)
      }).catch(() => {})
    },
    save() {
      const addressData = this.getTemAddressData()
      for (var i = 0; i < this.productNumbers.length; i++) {
        var productNumber = this.productNumbers[i];
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
        // 供应商 信息编辑
        shopId: this.details.shopId,
        shopAddr: this.details.shopAddr,
        shopArea: this.details.shopArea,
        shopCity: this.details.shopCity,
        shopCompany: this.details.shopCompany,
        shopProvince: this.details.shopProvince,
        shopTel: this.details.shopTel,
        addressId: this.addressId,
        productNumbers: this.productNumbers,
        needInvoice: this.needInvoice,
        taxPoint: this.taxPoint,
        followerRemark: this.followerRemark,
        madanUrls: this.madanUrls,
        madan: this.madan
      }
      this.$store.dispatch('changeload', true)
      newRequest({
        url: `/redwood/ziying/cut/${this.$route.query.id}?_function=updateInfo`,
        method: 'put',
        contentType: 'application/json',
        data: obj
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose: () => {
              this.$router.go(-1);
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
  update() {}
};

</script>
<style src="assets/style/table.scss" lang="scss"></style>
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

.input-jb-publish {
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
