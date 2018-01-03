<template>
  <div class="detail">
    <div class="detail-title">
      <span @click="$router.go(-1)"></span>
      <p>详情</p>
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
    <div class="detail-group" v-if="product">
      <div class="detail-item order-product pb20">
        <h6>产品信息</h6>
        <dl class="info-item">
          <dt>原供应商</dt>
          <dd>
            <p class="bold">{{product.shopCompany}} ( ID : {{product.sellerNumber}}) </p>
            <p class="c151515">{{product.shopTel}}</p>
            <p class="c151515">{{product.shopProvince}}{{product.shopCity}}{{product.shopArea}}{{product.shopAddr}}</p>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>原供应商货号</dt>
          <dd>{{product.shopOriginalNumber}}</dd>
        </dl>
        <dl class="info-item">
          <dt>原供应商图片</dt>
          <dd>
            <div class="image-list">
              <div class="show-image">
                <el-col class="card" :href="item" :key="item" v-lightbox="shopOriginalImgUrls" v-for="(item, index) in shopOriginalImgUrls" v-show="index == 0">
                  <el-card :body-style="{ padding: '5px' }">
                    <img :src="item" class="image">
                    <div style="padding: 0;">
                      <p>商品图片
                        <span>({{shopOriginalImgUrls.length}}张)</span>
                      </p>
                    </div>
                  </el-card>
                </el-col>
              </div>
              <div class="show-image">
                <el-col class="card" :href="item" :key="item" v-lightbox="shopOriginalColorUrls" v-for="(item, index) in shopOriginalColorUrls" v-show="index == 0">
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
            </div>
          </dd>
        </dl>
        <div class="table-warp table-product" style="width:50%">
          <h5>产品信息</h5>
          <table class="table-normal table-center">
            <colgroup>
              <col width="20%">
              <col width="20%">
              <col width="20%">
              <col width="20%">
              <col width="20%">
            </colgroup>
            <tbody>
              <tr>
                <td>品名</td>
                <td>{{product.title}}</td>
                <td>成分</td>
                <td colspan="2" class="ta-l">{{product.composition}}</td>
              </tr>
              <tr>
                <td>幅宽</td>
                <td>克重</td>
                <td>空差</td>
                <td>纸筒</td>
                <td>公斤出米数</td>
              </tr>
              <tr>
                <td>
                  <span v-if="!product.width || product.width == -1"></span>
                  <span v-else> {{product.width}}{{product.widthUnit}}</span>
                </td>
                <td>
                  <span v-if="!product.weight || product.weight == -1"></span>
                  <span v-else> {{product.weight}}{{product.weightUnit}}</span>
                </td>
                <td>{{product.shortWeight}}</td>
                <td>{{product.paperTube}}</td>
                <td>
                  <span v-if="!product.metrePerKilo || product.metrePerKilo == -1"></span>
                  <span v-else> {{product.metrePerKilo}}米/公斤</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item" style="width:100%">
        <h6>报价信息</h6>
        <div class="image-list m14">
          <router-link class="show-image" :to="{name: 'guiderSalesTable', query: {orderNumber: order.orderNumber, status: 2}}" target="_blank">
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
          </router-link>
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
      <div class="detail-item" style="width:100%;">
        <h6>供应商退款信息</h6>
        <dl class="info-item">
          <dt>申请取消时间</dt>
          <dd>{{createTime | formatData}}</dd>
        </dl>
        <dl class="info-item">
          <dt>供应商退款时间</dt>
          <dd>{{financeReviewTime | formatData}}</dd>
        </dl>
        <dl class="info-item">
          <dt>供应商退款金额</dt>
          <dd class="red"> &yen;{{sellerRefund}}</dd>
        </dl>
        <div class="table-warp p14" style="width:90%">
          <table class="table-normal table-center" v-if="productList.length > 0">
            <thead>
              <tr>
                <th> 货号 </th>
                <th> 色号 </th>
                <th> 细码数 </th>
                <th> 采购数量({{quantityUnit}}) </th>
                <th> 原大货价({{priceUnit}}) </th>
                <th> 成本价({{priceUnit}}) </th>
                <th> 成本小计 </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="width:15%;text-align:center;" :rowspan="productList.length +1">
                  {{order.productNumber}}
                </td>
              </tr>
              <tr v-for="(item, index) in productList">
                <td>
                  {{item.color}}
                </td>
                <td>
                  {{item.xiMaShu}}
                </td>
                <td>
                  {{item.quantity}}
                </td>
                <td>
                  {{item.salePrice}}
                </td>
                <td>
                  {{item.price}}
                </td>
                <td class="ta-r">
                  &yen; {{item.total}}
                </td>
              </tr>
              <tr>
                <td colspan="7" class="ta-r">
                  <span v-if="order.productSource == 1">
                  订金: <span class="red"> &yen;{{order.earnestMoney}}</span>
                  </span>
                  <span v-else></span>
                  <span v-if="order.productSource == 1"> </span>
                  <span v-else> 成本货款 : <span class="red">&yen;{{order.costMoneyOffTax}}</span> </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <el-form label-position="top" class="detail-form" :rules="formRules" :model="form" ref="form" v-if="detailType == 'edit'">
          <el-form-item label="供应商应退" prop="sellerRefund" required>
            <el-input style="width:220px" v-model="form.sellerRefund"></el-input>
          </el-form-item>
          <el-form-item label="退款原因" prop="reason" required>
            <el-input type="textarea" v-model="form.reason" :maxlength="500"></el-input>
            <p class="font-total">{{reasonLength}}/500</p>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-left: 5px;" type="primary" @click="submit('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <lightbox />
  </div>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import {
  newRequest,
  formatTimeString
} from 'utils/tool'
export default {
  components: {
    Lightbox
  },
  data() {
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error('应退金额不能为空'));
      } else {
        setTimeout(() => {
          var reg = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/
          if (!reg.test(value)) {
            callback(new Error('请输入数字,小数点后最多两位'));
          } else {
            if (value > 100000) {
              callback(new Error('数值不能大于100000'));
            } else {
              callback();
            }
          }
        }, 300);
      }
    }
    return {
      saleMadanImgUrls: [],
      detailType: null,
      order: {
        serviceNumber: '',
        customerAccount: '',
        address: '',
      },
      product: {},
      productList: [],
      priceUnit: '',
      quantityUnit: '',
      shopOriginalImgUrls: [],
      shopOriginalColorUrls: [],
      sellerMadanImgUrls: [],
      buyerCertificateList: [],
      soouyaCertificateList: [],
      sendCertificateList: [],
      imgPath: 'http://www.soouya.com',
      createTime: null,
      financeReviewTime: null,
      sellerRefund: null,
      form: {
        sellerRefund: '',
        reason: '',
      },
      reasonLength: 0,
      formRules: {
        sellerRefund: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        reason: [{
            required: true,
            trigger: 'blur',
            message: '请输入5-500字数内退款原因'
          },
          {
            min: 5,
            max: 500,
            trigger: 'blur',
            message: '请输入5-500字数内退款原因'
          }
        ],
      },
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
    this.getData()
    this.detailType = this.$route.query.detailType
  },
  watch: {
    form: {
      handler: function(form) {
        this.reasonLength = form.reason.length
      },
      deep: true
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('changeload', true)
      newRequest({
        url: '/redwood/returnReplaceOnlyRefund/getDetailForGruider/',
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
          this.productList = this.order.productList
          if (this.productList.length > 0) {
            this.priceUnit = this.productList[0].priceUnit
            this.quantityUnit = this.productList[0].quantityUnit
          }
          this.productList.forEach((item) => {
            let val = null;
            val = (item.quantity * item.price).toFixed(0)
            this.$set(item, 'total', val);
          })
          this.createTime = res.obj.createTime;
          this.financeReviewTime = res.obj.financeReviewTime;
          this.sellerRefund = res.obj.sellerRefund;
          this.form.sellerRefund = res.obj.sellerRefund
          this.form.reason = res.obj.reason
          if (this.product) {
            this.shopOriginalImgUrls = this.formateImgList(this.product.shopOriginalImgUrls)
            this.shopOriginalColorUrls = this.formateImgList(this.product.shopOriginalColorUrls)
          }
          if (this.price) {
            this.sellerMadanImgUrls = this.formateImgList(this.price.sellerMadanImgUrls)
            this.buyerCertificateList = this.formateImgList(this.price.buyerCertificateList)
            this.soouyaCertificateList = this.formateImgList(this.price.soouyaCertificateList)
            this.sendCertificateList = this.formateImgList(this.price.sendCertificateList)
            this.saleMadanImgUrls = this.formateImgList(this.price.saleMadanImgUrls)
          }
          this.$store.dispatch('changeload', false)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.id = this.$route.query.id
          newRequest({
            url: '/redwood/returnReplaceOnlyRefund/edit',
            data: this.form,
            contentType: 'application/json',
            method: 'post',
          }).then(res => {
            if (res.success == 1) {
              this.$message.success(res.msg)
              var self = this;
              setTimeout(function() {
                self.$router.push({ path: '/index/guider/refund/guidershopcompanyrefunding' })
              }, 300)
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false;
        }
      });
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
      console.log(list)
      if (list) {
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


</style>
