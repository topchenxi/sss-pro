<template>
  <section v-loading.body="fullScreenLoading">
    <div class="detail-title big-font">
      <i @click="goBack" class="el-icon-arrow-left"></i>
      <span @click="goBack">编辑</span>
    </div>
    <div class="cutMsg-content" style="padding-bottom: 25px;">
      <p class="msg-title">采购商/供应商信息</p>
      <span>订单号：{{obj.number}}</span>
      <span class="left-margin25">订单时间：{{obj.createTime | formatTime}}</span>
      <p class="bottom-border-dashed"></p>
      <el-row :gutter="20">
        <el-col :span="11">
          <p>
            <i class="icon-cai">采</i>&nbsp;采购商：</p>
          <span class="bold-font">{{obj.customerCompany}}</span>
          <span class="bold-font left-margin25">{{obj.customerTel}}</span>
          <p>
            <span class="red-color">*</span>收货地址：</p>
          <template v-if="!noEdit && woodAdmin">
            <el-select style="width: 500px;" v-model="obj.addressId" @change="handleAddrChange" placeholder="请选择">
              <el-option v-for="(addrItem, addrIndex) in addressList" :label="addrItem.name + ' ' + addrItem.tel + ' ' + addrItem.province + ' ' + addrItem.city + ' ' + addrItem.area + ' ' + addrItem.addr" :key="addrIndex" :value="addrItem.id">
              </el-option>
            </el-select>
          </template>
          <template v-else>
            <p>{{obj.addressName + ' ' + obj.addressTel + ' ' + obj.addressProvince + obj.addressCity + obj.addressArea + obj.addressAddr}}</p>
          </template>
        </el-col>
        <el-col :span="11">
          <p>
            <i class="icon-gong">供</i>&nbsp;供应商：
            <el-button style="margin-left:25px;" size="mini" @click.native="showShopDialog" v-if="!noEdit && woodGuiderAdmin" type="text">修改供应商</el-button>
          </p>
          <span class="bold-font">{{obj.shopCompany}}</span>
          <p class="bold-font">{{obj.shopTel}}</p>
          <p>{{obj.shopProvince}}{{obj.shopCity}}{{obj.shopArea}}{{obj.shopAddr}}</p>
        </el-col>
      </el-row>
    </div>
    <div class="cutMsg-content">
      <p class="msg-title">货号信息</p>
      <template v-for="(productItem, productIndex) in obj.productNumbers">
        <div class="product-content" :key="productIndex">
          <el-form label-width="70px" label-position="right" :model="productItem" :rules="productItemRules" ref="productItem">
            <el-form-item class="forgive-color" label="货号：" prop="number">
              <template v-if="!noEdit && woodAdmin">
                <el-input class="width250" v-model="productItem.number"></el-input>
              </template>
              <template v-else>
                <p>{{productItem.number}}</p>
              </template>
            </el-form-item>
            <el-form-item label="品名：" prop="title">
              <template v-if="!noEdit && woodAdmin">
                <el-input class="width250" v-model="productItem.title"></el-input>
              </template>
              <template v-else>
                <p>{{productItem.title}}</p>
              </template>
            </el-form-item>
          </el-form>
          <el-row>
            <el-col :span="10">
              <div class="show-image">
                <el-col class="card" :href="item" :key="item" v-lightbox="productItem.imgUrls" v-for="(item, index) in productItem.imgUrls" v-show="index == 0">
                  <div class="length-text">
                    <p>商品图片({{productItem.imgUrls.length}}张)</p>
                  </div>
                  <el-card :body-style="{ padding: '5px' }">
                    <img :src="item" class="image">
                  </el-card>
                </el-col>
                <el-col class="card" :href="item" :key="item" v-lightbox="productItem.colorUrls" v-for="(item, index) in productItem.colorUrls" v-show="index == 0">
                  <div class="length-text">
                    <p>色卡图片({{productItem.colorUrls.length}}张)</p>
                  </div>
                  <el-card :body-style="{ padding: '5px' }">
                    <img :src="item" class="image">
                  </el-card>
                </el-col>
              </div>
            </el-col>
          </el-row>
          <template v-for="(colorItem, colorIndex) in productItem.colors">
            <div :key="colorIndex">
              <el-form :rules="colorItemRules" :model="colorItem" ref="colorItem" label-width="100px" class="inline-form">
                <el-form-item label="色号:" prop="color">
                  <template v-if="!noEdit && woodAdmin">
                    <el-input class="width75" v-model="colorItem.color" :disabled="colorItem.status==0"></el-input>
                  </template>
                  <template v-else>
                    <span>{{colorItem.color}}</span>
                  </template>
                </el-form-item>
                <el-form-item label="销售单价:" prop="salePriceMoney">
                  <template v-if="!noEdit && woodAdmin">
                    <el-input class="width75" v-model="colorItem.salePriceMoney" :disabled="colorItem.status==0"></el-input>
                    <el-select v-model="colorItem.followerQuantityUnit" :disabled="colorItem.status==0" class="width100" @change="handleSaleUnitChange(colorItem)">
                      <el-option v-for="(optionItem,optionIndex) in unitOptions" :value="optionItem.value" :label="optionItem.label" :key="optionIndex"></el-option>
                    </el-select>
                  </template>
                  <template v-else>
                    <span>{{colorItem.salePriceMoney + ' ' + colorItem.followerQuantityUnit}}</span>
                  </template>
                </el-form-item>
                <el-form-item label="数量:" prop="followerQuantity">
                  <template v-if="!noEdit && woodAdmin">
                    <el-input class="width75" v-model="colorItem.followerQuantity" :disabled="colorItem.status==0"></el-input>
                  </template>
                  <template v-else>
                    <span>{{colorItem.followerQuantity + ' '}}</span>
                  </template>
                  <span>{{colorItem.followerQuantityUnit}}</span>
                </el-form-item>
                <el-form-item label="成本单价:" prop="followerPriceMoney" v-if="obj.status > 500">
                  <template v-if="woodAdmin">
                    <el-input class="width75" @change="handleMoneyChange" v-model="colorItem.followerPriceMoney" :disabled="colorItem.status==0"></el-input>
                  </template>
                  <template v-else>
                    <span>{{colorItem.followerPriceMoney}}</span>
                  </template>
                  <span>{{colorItem.followerPriceUnit}}</span>
                </el-form-item>
                <el-form-item label="采购数量：" prop="cutterQuantity" v-if="obj.status > 500">
                  <template v-if="!noEdit && woodAdmin">
                    <el-input class="width75" @change="handleMoneyChange" v-model="colorItem.cutterQuantity" :disabled="colorItem.status==0"></el-input>
                  </template>
                  <template v-else>
                    <span>{{colorItem.cutterQuantity}}</span>
                  </template>
                  <span>{{colorItem.cutterQuantityUnit}}</span>
                </el-form-item>
                <el-form-item label="采购单价:" v-if="obj.status > 500">
                  <template v-if="!noEdit && woodAdmin">
                    <el-input class="width75" @change="handleMoneyChange" v-model="colorItem.cutterPriceMoney" :disabled="colorItem.status==0"></el-input>
                    <el-select v-model="colorItem.cutterPriceUnit" :disabled="colorItem.status==0" class="width100">
                      <el-option v-for="(optionItem,optionIndex) in unitOptions1" :disabled="colorItem.status==0" :value="optionItem.value" :label="optionItem.label" :key="optionIndex"></el-option>
                    </el-select>
                  </template>
                  <template v-else>
                    <span>{{colorItem.cutterPriceMoney + ' ' + colorItem.cutterPriceUnit}}</span>
                  </template>
                  <el-form-item>
                    <template v-if="!noEdit && woodAdmin">
                      <el-select v-model="colorItem.status" class="width100">
                        <el-option label="有货" :value="1"></el-option>
                        <el-option label="无货" :value="0"></el-option>
                      </el-select>
                    </template>
                    <template v-else>
                      <span v-if="colorItem.status">有货</span>
                      <span v-if="!colorItem.status">无货</span>
                    </template>
                  </el-form-item>
                </el-form-item>
              </el-form>
            </div>
          </template>
        </div>
      </template>
    </div>
    <div class="cutMsg-content">
      <p class="msg-title">其他</p>
      <el-form label-position="right" label-width="140px" :model="obj" :rules="objRules" ref="obj">
        <el-form-item label="是否需要发票：" required>
          <template v-if="!noEdit && woodAdmin">
            <el-radio-group v-model="obj.needInvoice">
              <el-radio-button :label="1">需要</el-radio-button>
              <el-radio-button :label="0">不需要</el-radio-button>
            </el-radio-group>
          </template>
          <template v-else>
            <span v-if="obj.needInvoice">需要</span>
            <span v-if="!obj.needInvoice">不需要</span>
          </template>
        </el-form-item>
        <el-form-item v-if="obj.needInvoice" label="税率：" prop="taxPoint">
          <template v-if="!noEdit && woodAdmin">
            <el-input v-model="obj.taxPoint" class="width250"></el-input>%
          </template>
          <template v-else>
            <span>{{obj.taxPoint | formatNumber}}</span>
          </template>
        </el-form-item>
        <el-form-item label="档口码单：" v-if="obj.status > 500">
          <div class="showmadan">
            <a :name="index" :href="'http://www.soouya.com' + item" :key="index" v-lightbox="obj.madanUrls" v-for="(item, index) in obj.madanUrls" class="madan-wrap">
              <img :src="'http://www.soouya.com' + item" width='40' height="40" />
            </a>
          </div>
        </el-form-item>
        <el-form-item label="码单号码：" v-if="obj.status > 500" prop="madan">
          <template v-if="!noEdit && woodAdmin">
            <el-input v-model="obj.madan" class="width250"></el-input>
          </template>
          <template v-else>
            <span>{{obj.madan}}</span>
          </template>
        </el-form-item>
        <el-form-item label="成本货款：" v-if="obj.status > 500">
          <template v-if="woodAdmin">
            <el-input v-model="obj.costMoney" class="width250"></el-input> &nbsp;元
          </template>
          <template v-else>
            <span>{{obj.costMoney}}元</span>
          </template>
        </el-form-item>
        <el-form-item label="总费用：" v-if="obj.status > 500">
          <template v-if="!noEdit && woodAdmin">
            <el-input v-model="obj.totalMoney" class="width250"></el-input> &nbsp;元
          </template>
          <template v-else>
            <span>{{obj.totalMoney | formatNumber}}</span>
          </template>
        </el-form-item>
        <el-form-item label="支付方式：">
          <span v-if="obj.creditType == 1">垫付支付</span>
          <span v-if="obj.creditType == 3">余额支付</span>
          <span v-if="obj.creditType != 3 && obj.creditType != 1">--</span>
        </el-form-item>
        <el-form-item v-if="obj.creditType == 1" label="回款时间：">
          <template v-if="woodAdmin">
            <el-date-picker v-model="obj.returnDate" type="date" size="small" placeholder="选择时间" :picker-options="pickerOptions1"> </el-date-picker>
          </template>
          <template v-else>{{obj.returnDate | formatTime}}</template>
        </el-form-item>
        <el-form-item label="备注：">
          <template v-if="!noEdit">
            <el-input class="width250" type="textarea" resize="none" :autosize="{minRows: 4,maxRows: 4}" v-model="obj.followerRemark"></el-input>
            <p style="margin-left:200px;" v-if="!obj.followerRemark">0/100字</p>
            <p style="margin-left:200px;" v-if="obj.followerRemark">{{obj.followerRemark.length}}/100字</p>
          </template>
          <template v-else>{{obj.followerRemark}}</template>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: center;">
      <el-button @click.native="back">返回</el-button>
      <el-button type="primary" :disabled="!canSubmitUpdate500" @click.native="confirmSave" v-if="obj.status == 500">保存</el-button>
      <el-button type="primary" :disabled="!canSubmitUpdateExcept50" @click.native="confirmSave" v-else>保存</el-button>
    </div>
    <!-- 选择供应商弹窗 -->
    <el-dialog v-model="shopDialogVisible" title="修改供应商" class="shop-dialog">
      <el-input v-model="reqShopParams.keyword" @keyup.enter.native="getShopList" class="width250" placeholder="供应商名称/供应商电话"></el-input>
      <el-button @click.native="getShopList" class="left-margin25" type="primary">搜索</el-button>
      <el-button @click.native="resetShop" class="left-margin25">重置</el-button>
      <el-table :data="shopList" :height="500" border>
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
            <el-button size="small" type="primary" :disabled="scope.row.id == obj.shopId" @click.native="confirmSelectShop(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-content">
        <pagination :page="page.pageNumber" :total="page.totalCount" :render="getShopList" :options="reqShopParams"></pagination>
      </div>
    </el-dialog>
    <Lightbox/>
  </section>
</template>

<script>
import Lightbox from '@/components/light-box/lightbox'
import request from '@/utils/request'
import pagination from '@/components/pagination'
import getCache from '@/utils/getCache'
export default {
  components: {
    Lightbox,
    pagination
  },
  data() {
    const auth = JSON.parse(getCache({
      key: 'currentUser'
    }))
    return {
      fullScreenLoading: false,
      shopDialogVisible: false,
      woodGuiderAdmin: auth.woodGuiderAdmin,
      woodAdmin: auth.woodAdmin,
      id: '',
      noEdit: 0,
      obj: {},
      addressList: [],
      shopList: [],
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
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      unitOptions: [
        {
          label: '元/米',
          value: '米'
        },
        {
          label: '元/码',
          value: '码'
        },
        {
          label: '元/千克',
          value: '千克'
        },
        {
          label: '元/条',
          value: '条'
        },
        {
          label: '元/罗',
          value: '罗'
        },
        {
          label: '元/对',
          value: '对'
        },
      ],
      unitOptions1: [
        {
          label: '元/米',
          value: '元/米'
        },
        {
          label: '元/码',
          value: '元/码'
        },
        {
          label: '元/千克',
          value: '元/千克'
        },
        {
          label: '元/条',
          value: '元/条'
        },
        {
          label: '元/罗',
          value: '元/罗'
        },
        {
          label: '元/对',
          value: '元/对'
        },
      ],
      productItemRules: {
        number: [
          { required: true, message: '请输入1~30字', trigger: 'blur', min: 1, max: 30 }
        ],
        title: [
          { message: '请输入0~30字', trigger: 'blur', min: 0, max: 30 }
        ],
      },
      colorItemRules: {
        color: [
          { required: true, message: '请输入1~30字', trigger: 'blur', min: 1, max: 30 }
        ],
        salePriceMoney: [
          { required: true, message: '请输入0-10000中的任意数值', trigger: 'blur', min: 0, max: 5 }
        ],
        followerQuantity: [
          { required: true, message: '请输入0-10000中的任意数值', trigger: 'blur', min: 0, max: 5 }
        ],
        followerPriceMoney: [
          { required: true, message: '请输入0-10000中的任意数值', trigger: 'blur', min: 0, max: 5 }
        ],
        cutterQuantity: [
          { required: true, message: '请输入0-10000中的任意数值', trigger: 'blur', min: 0, max: 5 }
        ],
        cutterPriceMoney: [
          { message: '请输入0-10000中的任意数值', trigger: 'blur', min: 0, max: 5 }
        ],
      },
      objRules: {
        taxPoint: [
          { required: true, min: 0, max: 2, message: '请输入1~100之间的任意数值', trigger: 'blur' }
        ],
        madan: [
          { required: true, message: '请输入1~30字', trigger: 'blur', min: 1, max: 30 }
        ],
      }
    }
  },
  mounted() {
    console.log(this.woodGuiderAdmin)
    this.id = this.$route.query.id
    this.noEdit = this.$route.query.noEdit ? this.$route.query.noEdit : 0
    if (this.id) {
      this.getData()
    } else {
      this.$message.error('订单id不能传空')
    }
  },
  computed: {
    canSubmitUpdate500() {
      if (this.obj.shopCompany == '' || this.obj.shopCompany.length > 100) {
        return false
      }
      if (!this.obj.returnDate && this.obj.creditType == 1) { // 支付方式是垫付支付的时候必须选择回款时间
        return false
      }
      if (this.obj.needInvoice == 1 && (this.obj.taxPoint == '' || this.obj.taxPoint <= 0 || this.obj.taxPoint > 100)) {
        return false
      }
      for (var i = 0; i < this.obj.productNumbers.length; i++) {
        var productNumber = this.obj.productNumbers[i]
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
          if (color.salePriceMoney == '' || color.salePriceUnit == '' || color.followerQuantity == '') {
            return false
          }
        }
      }
      return true
    },
    canSubmitUpdateExcept50() {
      if (!this.obj.returnDate && this.obj.creditType == 1) { // 支付方式是垫付支付的时候必须选择回款时间
        return false
      }
      if (this.obj.needInvoice == 1 && (this.obj.taxPoint == '' || this.obj.taxPoint <= 0 || this.obj.taxPoint > 100)) {
        return false
      }
      // if (/^\d+(\.\d{1,6})?$/.test(this.obj.costMoney) == false) {
      //   return false
      // }
      //   if (/^\d+(\.\d{1,6})?$/.test(this.obj.totalMoney) == false) {
      //   return false
      // }
      if (this.obj.costMoney < 0) {
        return false
      }
      if (this.obj.totalMoney < 0) {
        return false
      }
      console.log('ss')
      if (this.obj.productNumbers) {
        this.obj.productNumbers.forEach(productNumber => {
          if (productNumber.number == '' || productNumber.number.length > 30) {
            return false
          }
          if (productNumber.colors) {
            productNumber.colors.forEach(color => {
              if (Number(color.status) == 0) {
              } else {
                if (color.color == '' || color.color.length > 30) {
                  return false
                }
                if (color.salePriceUnit == '' || color.followerPriceUnit == '' || (color.cutterPriceMoney != '' && color.cutterPriceUnit == '')) {
                  return false
                }
              }
            })
          }
        })
      }
      return true
    },
  },
  methods: {
    getData() {
      this.fullScreenLoading = true
      request(`/redwood/ziying/cut/${this.id}`, {
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.success == 1) {
          this.getAddressList(res.obj.customerId)
          this.obj = res.obj
          if (this.obj.productNumbers) {
            this.obj.productNumbers.forEach(item => {
              if (item.colorUrls && item.colorUrls.length) {
                for (let i = 0; i < item.colorUrls.length; i++) {
                  item.colorUrls[i] = 'http://www.soouya.com' + item.colorUrls[i]
                }
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
      })
    },
    confirmSelectShop(item) {
      this.shopDialogVisible = false
      console.log(item)
      this.obj.shopAddr = item.addr
      this.obj.shopArea = item.area
      this.obj.shopCity = item.city
      this.obj.shopCompany = item.sellerCompany ? item.sellerCompany : item.company
      this.obj.shopId = item.id
      this.obj.shopProvince = item.province
      this.obj.shopTel = item.tel
    },
    showShopDialog() {
      this.getShopList()
      this.shopDialogVisible = true
    },
    resetShop() {
      this.reqShopParams.keyword = ''
      this.reqShopParams.pageSize = 20
      this.reqShopParams.pageNumber = 1
      this.getShopList()
    },
    confirmSave() {
      this.fullScreenLoading = true
      if (this.obj.productNumbers) {
        this.obj.productNumbers.forEach(item => {
          if (item.colorUrls && item.colorUrls.length) {
            for (let i = 0; i < item.colorUrls.length; i++) {
              item.colorUrls[i] = item.colorUrls[i].split('http://www.soouya.com').join('')
            }
          }
          if (item.imgUrls && item.imgUrls.length) {
            for (let i = 0; i < item.imgUrls.length; i++) {
              item.imgUrls[i] = item.imgUrls[i].split('http://www.soouya.com').join('')
            }
          }
        })
      }
      if (this.obj.creditType && this.obj.returnDate) {
        this.obj.returnDate = new Date(this.obj.returnDate).getTime() + 86399000
      }
      request(`/redwood/cut/${this.obj.number}?_function=updateByNumber`, {
        method: 'PUT',
        data: this.obj,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        this.fullScreenLoading = false
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.goBack()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getShopList() {
      this.fullScreenLoading = true
      request('/redwood/sys/Shop/list', {
        data: this.reqShopParams,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.success == 1) {
          this.shopList = res.page.result
          this.page.pageSize = res.page.pageSize
          this.page.pageNumber = res.page.pageNumber
          this.page.totalCount = res.page.totalCount
        } else {
          this.$message.error(res.msg)
        }
        this.fullScreenLoading = false
      })
    },
    handleMoneyChange() {
      if (this.obj.productNumbers) {
        this.obj.totalMoney = 0
        this.obj.costMoney = 0
        this.obj.productNumbers.forEach(item => {
          item.colors.forEach(color => {
            this.obj.totalMoney += Number(color.salePriceMoney) * Number(color.cutterQuantity)
            this.obj.costMoney += Number(color.followerPriceMoney) * Number(color.cutterQuantity)
          })
        })
        this.obj.totalMoney = Number(this.obj.totalMoney).toFixed(2)
        this.obj.costMoney = Number(this.obj.costMoney).toFixed(2)
      }
    },
    handleSaleUnitChange(item) {
      // console.log(item)
      item.salePriceUnit = '元/' + item.followerQuantityUnit
      item.followerPriceUnit = '元/' + item.followerQuantityUnit
      item.cutterQuantityUnit = item.followerQuantityUnit
    },
    handleAddrChange(id) {
      this.addressList.map(item => {
        if (item.id == id) {
          this.obj.addressName = item.name
          this.obj.addressTel = item.tel
          this.obj.addressProvince = item.province
          this.obj.addressCity = item.city
          this.obj.addressArea = item.area
          this.obj.addressAddr = item.addr
        }
      })
    },
    getAddressList(userId) {
      request('/redwood/buyfollow/Address/list', {
        data: { userId: userId },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.success == 1) {
          this.addressList = res.result
          this.addressList.map(item => {
            item.id = item.id.toString()
          })
        } else {
          this.$message.error(res.msg)
        }
        this.fullScreenLoading = false
      })
    },
    ziyingBtnDisable() {
      let bool = false
      return bool
    },
    goBack() {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="scss">
.width250 {
  width: 250px;
}
.width75 {
  width: 75px;
}
.width100 {
  width: 100px;
}
.product-content {
  border-bottom: 1px dashed #ddd;
  &:last-child {
    border-bottom: 0;
  }
}
.inline-form {
  margin-left: -40px;
  margin-top: 10px;
  display: inline-block;
  .el-form-item {
    margin-bottom: 10px;
    display: inline-block;
    .el-form-item__error {
      display: block;
      word-break: keep-all;
      white-space: nowrap;
    }
  }
}
.shop-dialog {
  .el-table {
    margin-top: 25px;
    text-align: center;
    th {
      text-align: center;
      background-color: #f9f9f9;
      border-color: #ddd;
      padding: 5px !important;
      .cell {
        padding: 0 5px;
        background-color: #f9f9f9;
      }
    }
    td {
      border-color: #ddd;
      padding: 5px 0 !important;
      .cell {
        padding: 0 10px;
      }
    }
  }
}
</style>
