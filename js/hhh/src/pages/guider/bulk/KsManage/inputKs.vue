<template>
  <div class="detail">
    <div class="detail-title">
      <span @click="goBack"></span>
      <p v-if="addAction">新增扣数单</p>
      <p v-else>编辑扣数单</p>
    </div>

    <div class="detail-group">
      <div class="detail-item pb20" style="width:100%">
        <h6>订单信息</h6>
        <p class="link pl14 mb10" @click="$store.dispatch('changePopLoad', true)">重新选择 ></p>
        <dl class="info-item">
          <dt>订单号</dt>
          <dd>{{ orderInfo.serviceNumber }}</dd>
        </dl>
        <dl class="info-item">
          <dt>采购商</dt>
          <dd>{{ orderInfo.customerCompany }}</dd>
        </dl>
        <dl class="info-item">
          <dt>供应商</dt>
          <dd>{{ orderInfo.shopCompany }}</dd>
        </dl>
        <dl class="info-item" v-if="orderInfo">
          <dt class="c333">货号信息</dt>
          <dd></dd>
        </dl>
        <div class="table-warp p14 pt10" v-if="orderInfo">
          <table class="table-normal" v-if="orderInfo.colorList && orderInfo.colorList.length > 0">
            <colgroup>
            </colgroup>
            <thead>
              <tr>
                <th>出仓单号</th>
                <th>货号</th>
                <th>色号</th>
                <th>销售单价</th>
                <th>成本单价</th>
                <th>发货数量</th>
                <th>出仓匹数</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(color, index) in orderInfo.colorList">
                <td class="ta-c" :rowspan="orderInfo.colorList.length" v-if="index == 0">{{orderInfo.outReposityNumber}}</td>
                <td :rowspan="orderInfo.colorList.length" v-if="index == 0">{{productNumber}}</td>
                <td>{{color.color}}</td>
                <td class="ta-r">{{color.salePrice | formatNumber}}{{color.salePriceUnit}}</td>
                <td class="ta-r">{{color.price | formatNumber}}{{color.priceUnit}}</td>
                <td class="ta-r">{{color.quantity | formatNumber}}{{color.quantityUnit}}</td>
                <td class="ta-r">{{color.outPi}}匹</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item pb20" style="width:100%">
        <h6>扣数明细</h6>
        <div class="table-warp p14 pt10">
          <table class="table-normal" v-if="ksProductList && ksProductList.colors.length > 0">
            <colgroup>
            </colgroup>
            <thead>
              <tr>
                <th>扣数类型</th>
                <th>货号</th>
                <th>色号</th>
                <th>采购商扣数</th>
                <th>供应商扣数</th>
                <th>采购商扣数单价</th>
                <th>供应商扣数单价</th>
                <th>采购商扣数金额</th>
                <th>供应商扣数金额</th>
                <th class="ta-c">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(color, index2) in ksProductList.colors">
                <td :rowspan="ksProductList.colors.length" v-if="index2 == 0">{{ksProductList.type | typeFilter}}</td>
                <td :rowspan="ksProductList.colors.length" v-if="index2 == 0">{{ksProductList.productNumber}}</td>
                <td class="ta-c">{{color.color}}</td>
                <td class="ta-c">{{color.buyerKsQuanity | formatNumber}}{{color.quantityUnit}}</td>
                <td class="ta-c">{{color.sellerKsQuanity | formatNumber}}{{color.quantityUnit}}</td>
                <td class="ta-c">{{color.buyerKsPrice | formatNumber}}{{color.buyPriceUnit}}</td>
                <td class="ta-c">{{color.sellerKsPrice | formatNumber}}{{color.salePriceUnit}}</td>
                <td class="ta-c">{{color.buyerSign | signCheck }}{{color.buyerTotal | formatNumber}}元</td>
                <td class="ta-c">{{color.sellerSign | signCheck }}{{color.sellerTotal | formatNumber}}元</td>
                <td class="ta-c">
                  <span class="icon-notify mr20" title="修改" @click="editKs(index2)"></span>
                  <span class="icon-del" title="删除" @click="delKs(index2)"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <el-button type="primary" class="ml14 mb10" @click.native="addNew">新增明细</el-button>
        <dl class="info-item">
          <dt>扣数备注</dt>
        </dl>
        <div class="form-warp">
          <textarea v-model="remark"></textarea><span class="font-count">{{countWord}}/500字</span>
        </div>
        <el-button type="primary" class="m20 ml14 " @click.native="commitData">保存</el-button>
      </div>
    </div>
    <div class="wrap-content">
    </div>
    <chooseOrder v-if="$store.state.b.popLoad" @callbackFunction="updateOrder" />
    <el-dialog title="扣数明细" v-model="detailPop" :lock-scroll="false" :close-on-click-modal="false" size="tiny" @close="closeDialog">
      <el-form :model="formData" ref="formData" :rules="formRule" label-width="120px">
          <el-form-item label="扣数类型" class="need" prop="type">
              <el-radio-group v-model="formData.type">
                <el-radio label="1">损耗</el-radio>
                <el-radio label="2">运费</el-radio>
                <el-radio label="3">售后退换货</el-radio>
              </el-radio-group>
            </el-form-item>
        <el-form-item label="货号" class="need">
          <span>{{formData.productNumber}}</span>
        </el-form-item>
        <el-form-item label="色号" class="need" prop="color">
          <el-select v-model="formData.color" @change="changeColor">
            <el-option v-for="item in orderInfo.colorList" :label="item.color" :value="item.color" :disabled="selected.indexOf(item.color) > -1 || currentEdit">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购商款项类型" class="need" prop="buyerSign">
          <el-radio-group v-model="formData.buyerSign">
            <el-radio label="0">退采购商</el-radio>
            <el-radio label="1">收采购商</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="供应商款项类型" class="need" prop="sellerSign">
          <el-radio-group v-model="formData.sellerSign">
            <el-radio label="0">退供应商</el-radio>
            <el-radio label="1">收供应商</el-radio>
            <!-- <el-radio label="2">无供应商</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="采购商扣数数量" prop="buyerKsQuanity">
          <el-input v-model.number="formData.buyerKsQuanity" style="width:120px;" type="number"  step="0.01" @keyup.native="calcTotal"></el-input> {{formData.buyerKsQuanityUnit}}
        </el-form-item>
        <el-form-item label="供应商扣数数量" v-if="formData.sellerSign != 2" prop="sellerKsQuanity">
          <el-input v-model="formData.sellerKsQuanity" style="width:120px;" type="number" step="0.01" @keyup.native="calcTotal"></el-input> {{formData.sellerKsQuanityUnit}}
        </el-form-item>
        <el-form-item label="采购商扣数单价" prop="buyerKsPrice">
          <el-input v-model="formData.buyerKsPrice" style="width:120px;" type="number" step="0.01" @keyup.native="calcTotal"></el-input> {{formData.buyerKsPriceUnit}}
        </el-form-item>
        <el-form-item label="供应商扣数单价" v-if="formData.sellerSign != 2" prop="sellerKsPrice">
          <el-input v-model="formData.sellerKsPrice" style="width:120px;" type="number" step="0.01" @keyup.native="calcTotal"></el-input> {{formData.sellerKsPriceUnit}}
        </el-form-item>
        <el-form-item label="采购商合计" prop="buyerTotal" >
          <el-input v-model="formData.buyerTotal" style="width:120px;" step="0.01" type="number"></el-input> 元
        </el-form-item>
        <el-form-item label="供应商合计" v-if="formData.sellerSign != 2" prop="sellerTotal">
          <el-input v-model="formData.sellerTotal" style="width:120px;" step="0.01" type="number"></el-input> 元
        </el-form-item>
        <el-button type="primary" @click="saveProduct('formData')">保存</el-button>
        <el-button @click.native="detailPop=false">取消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import ksApi from 'api/ksApi'
  import {
    getCache
  } from 'utils/tool'
  import {
    request
  } from 'utils/request'
  import chooseOrder from './chooseOrder'

  export default {
    components: {
      chooseOrder
    },
    data() {
      var checkNumber = (rule, value, callback) => {
      if (value == null) {
        callback('请输入正确的数字');
      } else {
        setTimeout(() => {
          var reg = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/
          if (!reg.test(value)) {
            callback(new Error('数值必须大于等于零,小数点后最多两位'));
          } else {
            if (value > 1000000) {
              callback(new Error('数值不能大于100000'));
            } else {
              callback();
            }
          }
        }, 300);
      }
    }
      return {
        addAction: true, // 是否添加
        outReposityId: '', // 出仓单的ＩＤ
        seller: {},
        orderId: '',
        ksProductList: {
          colors: [],
          productNumber: ''
        },
        orderInfo: {},
        ksOrderInfo: {},
        word: 0,
        remark: '',
        cellHeight: {
          height: '40px',
          'line-height': '40px'
        },
        ksCellHeight: {
          height: '40px',
          'line-height': '40px'
        },
        detailPop: false,
        formData: {
          id: '', // 修改id
          type: '', // 扣数类型
          productNumber: '', // 货号
          color: '', // 色号
          buyerKsQuanity: 0, // 采购商扣数数量
          buyerKsQuanityUnit: '', // 采购商扣数数量单位
          buyerKsPrice: 0, // 采购商扣数单价
          buyerKsPriceUnit: '', // 采购商扣数单价单位
          sellerKsQuanity: 0, // 供应商扣数数量
          sellerKsQuanityUnit: '', // 供应商扣数数量单位
          sellerKsPrice: 0, // 供应商扣数单价
          sellerKsPriceUnit: '', // 供应商扣数单价单位
          buyerSign: -1, // 采购商退/收标志
          sellerSign: -1, // 供应商退/收标志
          buyerTotal: 0, // 采购商扣数金额
          sellerTotal: 0, // 供应商扣数金额
          salePrice: 0, // 销售单价
          salePriceUnit: '', // 销售单位
          quantity: 0, // 发货量
          quantityUnit: '', // 发货单位
          price: 0, // 成本单价
          priceUnit: '', // 成本单价单位
          buyPrice: 0, // 采购单价
          buyPriceUnit: 0, // 采购单价单位
        },
        formRule: {
          type: [{
            required: true,
            trigger: 'blur',
            message: '必须选择扣数类型'
          }],
          color: [{
            required: true,
            trigger: 'blur',
            message: '必须选择色号'
          }],
          buyerSign: [{
            required: true,
            trigger: 'blur',
            message: '必须选择采购商款项类型'
          }],
          sellerSign: [{
            required: true,
            trigger: 'blur',
            message: '必须选择供应商款项类型'
          }],
          buyerKsQuanity: [
          { validator: checkNumber, trigger: 'blur' }
          ],
          sellerKsQuanity: [
          { validator: checkNumber, trigger: 'blur' }
          ],
          buyerKsPrice: [
          { validator: checkNumber, trigger: 'blur' }
          ],
          sellerKsPrice: [
          { validator: checkNumber, trigger: 'blur' }
          ],
          buyerTotal: [
          { validator: checkNumber, trigger: 'blur' }
          ],
          sellerTotal: [
          { validator: checkNumber, trigger: 'blur' }
          ],
        },
        selected: [],
        currentEdit: false,
        currentEditIndex: -1,
        productNumber: '',
      }
    },
    filters: {
      formatNumber(val) {
        return Number(val).toFixed(2)
      },
      signCheck(val) {
        return Number(val) > 0 ? '' : '-'
      },
      typeFilter(val) {
        switch (val) {
          case '1': return '损耗';
          case '2': return '运费';
          case '3': return '售后退换货';
          default: return '其他';
        }
      }
    },

    mounted() {
      const currentUser = getCache({
        key: 'currentUser'
      })
      if (!currentUser.loginInfo.woodGuider && !currentUser.loginInfo.woodGuiderLeader) {
        this.$message.error('你不是跟采货员，不能编辑')
        setTimeout(function () {
          this.$router.push({
            name: 'guiderKsManage'
          })
        }, 1000)
      }
      this.orderId = this.$route.query.id
      this.outReposityId = this.$route.query.outReposityId
      // 修改
      if (this.orderId && this.orderId != '') {
        this.addAction = false
        this.getKsOrderInfo() // 获取订单详情
      } else {
        this.addAction = true
        this.getOutReposityOrder() // 获取出仓单详情
      }
    },

    computed: {
      countWord: function () {
        if (this.remark && this.remark.length > 500) {
          this.$alert('备注不能超过500个字')
          this.remark = this.remark.substr(0, 500)
          return 500
        }
        return this.remark.length
      },
    },

    methods: {
      getOutReposityOrder() {
        this.$store.dispatch('changeload', true)
        let data = {}
        data = {
          id: this.outReposityId
        }
        request(ksApi.getOutReposityDetail, {
          data: data,
          method: 'GET'
        }).then((response) => {
          this.$store.dispatch('changeload', false)
          if (response && response.success == 1) {
            this.convertFollowerData(response.obj)
            if (!this.orderId) {
              this.addNew() // 上来的时候直接执行新增明细这个按钮的逻辑提高用户体验
            }
          } else {
            this.$message.error(response.msg)
          }
        })
      },
      convertFollowerData(data) { /* format数据 */
        this.orderInfo = data
        this.cellHeight.height = this.cellHeight['line-height'] = (this.orderInfo.colorList.length * 40) + 'px';
        this.productNumber = this.orderInfo.colorList[0].productNumber
      },
      getKsOrderInfo() {
        this.$store.dispatch('changeload', true)
        let data = {}
        data = {
          id: this.orderId
        }
        request(ksApi.getKsDetail, {
          data: data,
          method: 'GET'
        }).then((response) => {
          if (response && response.success == 1) {
            this.convertKsData(response.obj)
            this.outReposityId = response.obj.outReposityId
            this.getOutReposityOrder()
          } else {
            this.$message.error(response.msg)
            this.$store.dispatch('changeload', false)
          }
        })
      },
      convertKsData(data) {  /* format数据 */
        this.ksOrderInfo = data
        this.ksOrderInfo.detailList.forEach((ks) => {
          let color = {}
          color = Object.assign({}, ks)
          // 采购商扣数数量与单价
          color.buyerKsQuanity = ks.buyerKouShu
          color.buyerKsQuanityUnit = ks.quantityUnit
          color.buyerKsPrice = ks.buyerKouShuPrice
          color.buyerKsPriceUnit = ks.salePriceUnit
          // 供应商扣数数量与单价
          color.sellerKsQuanity = ks.sellerKouShu
          color.sellerKsQuanityUnit = ks.quantityUnit
          color.sellerKsPrice = ks.sellerKouShuPrice
          color.sellerKsPriceUnit = ks.saleQuanityUnit
          // 标志设置
          color.buyerSign = ks.buyerFundDirection
          color.sellerSign = ks.sellerFundDirection
          // 总数
          color.buyerTotal = ks.kouShuMoney
          color.sellerTotal = ks.tuiKuanMoney
          this.ksProductList.colors.push(color)
          this.selected.push(ks.color)
        })
        this.ksProductList.productNumber = this.ksOrderInfo.detailList[0].productNumber
         // 扣数单类型(新增的)
        this.ksProductList.type = this.ksOrderInfo.type.toString()
        this.formData.type = this.ksProductList.type // 因为扣数类型一个扣数单只能有一种所以编辑的时候上来就回显
        this.remark = this.ksOrderInfo.guiderRemark ? this.ksOrderInfo.guiderRemark : ''
        this.ksCellHeight.height = this.ksCellHeight['line-height'] = (this.ksProductList.colors.length * 40) + 'px'
      },
      updateOrder(row) {
        this.orderInfo = {}
        this.outReposityId = row.outReposityId
        this.ksProductList = {
          productNumber: '',
          colors: []
        }
        this.remark = ''
        this.getOutReposityOrder()
      },
      addNew() {
        this.detailPop = true
        if (this.ksProductList.type && this.ksProductList.colors.length != 0) {
          this.formData.type = this.ksProductList.type
        } else {
          this.formData.type = ''
        }
        this.formData.productNumber = this.productNumber
      },
      goBack() {
        window.history.back(-1)
      },
      // 选择色号时获取对应的销售单价和单位
      changeColor(value) {
        this.orderInfo.colorList.forEach((color) => {
          if (color.color == value) {
            this.formData.buyerKsPrice = color.salePrice
            this.formData.buyerKsPriceUnit = color.salePriceUnit
            this.formData.buyerKsQuanityUnit = color.quantityUnit
            this.formData.sellerKsPrice = color.price
            this.formData.sellerKsPriceUnit = color.priceUnit
            this.formData.sellerKsQuanityUnit = color.quantityUnit

            this.formData.salePrice = color.salePrice
            this.formData.salePriceUnit = color.salePriceUnit
            this.formData.quantity = color.quantity // 发货
            this.formData.quantityUnit = color.quantityUnit
            this.formData.buyPrice = color.buyPrice
            this.formData.buyPriceUnit = color.buyPriceUnit
            this.formData.price = color.price
            this.formData.priceUnit = color.priceUnit

            this.calcTotal()
            return false
          }
        })
      },
      // 添加扣数色号
      saveProduct(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ksProductList.type = this.formData.type // 类型改变以后所有的扣数类型都跟着改变
            // 供应商
        if (this.formData.sellerSign == 2) {
          this.formData.sellerKsQuanity = null
          this.formData.sellerKsPrice = null
          this.formData.sellerTotal = null
        }
        this.formData.buyerKsQuanity = Number(this.formData.buyerKsQuanity).toFixed(2);
        this.formData.buyerKsPrice = Number(this.formData.buyerKsPrice).toFixed(2);
        this.formData.buyerTotal = Number(this.formData.buyerTotal).toFixed(2);
        this.formData.sellerKsQuanity = Number(this.formData.sellerKsQuanity).toFixed(2);
        this.formData.sellerKsPrice = Number(this.formData.sellerKsPrice).toFixed(2);
        this.formData.sellerTotal = Number(this.formData.sellerTotal).toFixed(2);
        if (this.currentEdit && this.currentEditIndex > -1) {
          this.ksProductList.colors[this.currentEditIndex] = Object.assign({}, this.formData)
        } else {
          this.ksProductList.productNumber = this.formData.productNumber
          this.ksProductList.colors.push(Object.assign({
              id: '', // 修改id
              productNumber: '', // 货号
              color: '', // 色号
              buyerKsQuanity: 0, // 采购商扣数数量
              buyerKsQuanityUnit: '', // 采购商扣数数量单位
              buyerKsPrice: 0, // 采购商扣数单价
              buyerKsPriceUnit: '', // 采购商扣数单价单位
              buyerTotal: 0, // 采购商扣数合计
              sellerKsQuanity: 0, // 供应商扣数数量
              sellerKsQuanityUnit: '', // 供应商扣数数量单位
              sellerKsPrice: 0, // 供应商扣数单价
              sellerKsPriceUnit: '', // 供应商扣数单价单位
              sellerTotal: 0, // 供应商扣数合计
              salePrice: 0, // 销售单价
              salePriceUnit: '', // 销售单位
              quantity: 0, // 发货量
              quantityUnit: '', // 发货单位
              price: 0, // 成本单价
              priceUnit: '', // 成本单价单位
              buyPrice: 0, // 采购单价
              buyPriceUnit: 0, // 采购单价单位
              buyerSign: -1,
              sellerSign: -1
            },
            this.formData))
          this.selected.push(this.formData.color)
        }
        this.formData = {
          id: '', // 修改id
          type: '', // 扣数类型
          productNumber: '', // 货号
          color: '', // 色号
          buyerKsQuanity: 0, // 采购商扣数数量
          buyerKsQuanityUnit: '', // 采购商扣数数量单位
          buyerKsPrice: 0, // 采购商扣数单价
          buyerKsPriceUnit: '', // 采购商扣数单价单位
          buyerTotal: 0, // 采购商扣数合计
          sellerKsQuanity: 0, // 供应商扣数数量
          sellerKsQuanityUnit: '', // 供应商扣数数量单位
          sellerKsPrice: 0, // 供应商扣数单价
          sellerKsPriceUnit: '', // 供应商扣数单价单位
          sellerTotal: 0, // 供应商扣数合计
          salePrice: 0, // 销售单价
          salePriceUnit: '', // 销售单位
          quantity: 0, // 发货量
          quantityUnit: '', // 发货单位
          price: 0, // 成本单价
          priceUnit: '', // 成本单价单位
          buyPrice: 0, // 采购单价
          buyPriceUnit: 0, // 采购单价单位
          buyerSign: -1,
          sellerSign: -1
        }
        this.detailPop = false
        this.ksCellHeight.height = this.ksCellHeight['line-height'] = (this.ksProductList.colors.length * 40) + 'px'
          } else {
            return false;
          }
        })
      },
      calcTotal() {
        if (parseFloat(this.formData.buyerKsPrice) > 0 && parseFloat(this.formData.buyerKsQuanity) > 0) {
          this.formData.buyerTotal = Number(parseFloat(this.formData.buyerKsPrice) * parseFloat(this.formData.buyerKsQuanity))
            .toFixed(2)
        }

        if (parseFloat(this.formData.sellerKsPrice) > 0 && parseFloat(this.formData.sellerKsQuanity) > 0) {
          this.formData.sellerTotal = Number(parseFloat(this.formData.sellerKsPrice) * parseFloat(this.formData.sellerKsQuanity))
            .toFixed(2)
        }
      },
      editKs(index) {
        this.formData = Object.assign({}, this.ksProductList.colors[index])
        this.formData.productNumber = this.productNumber
        this.formData.buyerSign = this.formData.buyerSign.toString()
        this.formData.sellerSign = this.formData.sellerSign.toString()
        this.detailPop = true
        this.currentEdit = true
        this.currentEditIndex = index
        this.$set(this.formData, 'type', this.ksProductList.type) // 动态的绑定值不然换类型没反应
      },
      delKs(index) {
        this.$msgbox({
          title: '提示',
          message: '是否确认删除扣数明细？',
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.removeColor(index, instance, done)
            } else {
              done()
            }
          }
        }).then(action => {})
      },
      removeColor(index, instance, done) {
        this.ksProductList.colors = this.removeItem(this.ksProductList.colors, index)
        this.selected = this.removeItem(this.selected, index)
        this.ksCellHeight.height = this.ksCellHeight['line-height'] = (this.ksProductList.colors.length * 40) + 'px'
        done && done()
      },
      removeItem(list, index) {
        let save = list.slice(0, index)
        let last = list.slice(index + 1)
        return save.concat(last)
      },
      commitData() {
        const that = this
        let flag = true
        let postData = {}
        let list = []
        let errorText = ''

        if (this.ksProductList.colors.length == 0) {
          this.$alert('请输入扣数明细')
          return
        }

        this.ksProductList.colors.forEach((color) => {
          if (color.color == '') {
            errorText = '请选择色号'
            flag = false
            return false
          }
          // 采购商
          if (parseFloat(color.buyerKsQuanity) < 0) {
            errorText = '采购商扣数数量不能少于０'
            flag = false
            return false
          }
          if (parseFloat(color.buyerKsQuanity) > 10000000) {
            errorText = '采购商扣数数量小于10000000'
            flag = false
            return false
          }
          if (parseFloat(color.buyerKsPrice) < 0) {
            errorText = '采购商扣数单价不能少于０元'
            flag = false
            return false
          }
          if (parseFloat(color.buyerKsQuanity) > 10000000000) {
            errorText = '采购商扣数单价小于10000000000元'
            flag = false
            return false
          }
          if (parseFloat(color.buyerTotal) < 0) {
            errorText = '采购商合计不能少于０元'
            flag = false
            return false
          }
          if (parseFloat(color.buyerKsQuanity) > 10000000000) {
            errorText = '采购商合计小于10000000000元'
            flag = false
            return false
          }
          // 供应商
          if (parseFloat(color.sellerKsQuanity) < 0) {
            errorText = '供应商扣数数量不能少于０'
            flag = false
            return false
          }
          if (parseFloat(color.sellerKsQuanity) > 10000000) {
            errorText = '供应商扣数数量小于10000000'
            flag = false
            return false
          }
          if (parseFloat(color.sellerKsPrice) < 0) {
            errorText = '供应商扣数单价不能少于０元'
            flag = false
            return false
          }
          if (parseFloat(color.sellerKsQuanity) > 10000000000) {
            errorText = '供应商扣数单价小于10000000000元'
            flag = false
            return false
          }
          if (parseFloat(color.sellerTotal) < 0) {
            errorText = '供应商合计不能少于０元'
            flag = false
            return false
          }
          if (parseFloat(color.buyerKsQuanity) > 10000000000) {
            errorText = '合计小于10000000000元'
            flag = false
            return false
          }
          let d = {
            productNumber: that.productNumber,
            color: color.color,
            quantity: Number(color.quantity),
            quantityUnit: color.quantityUnit,
            salePrice: Number(color.salePrice),
            salePriceUnit: color.salePriceUnit,
            buyPrice: Number(color.buyPrice),
            buyPriceUnit: color.buyPriceUnit,
            price: Number(color.price),
            priceUnit: color.priceUnit,
            // 采购商扣数
            buyerKouShu: parseFloat(color.buyerKsQuanity),
            buyerKouShuPrice: Number(color.buyerKsPrice),
            kouShuMoney: Number(color.buyerTotal),
            buyerFundDirection: Number(color.buyerSign),
            // 供应商扣数
            sellerKouShu: parseFloat(color.sellerKsQuanity),
            sellerKouShuPrice: Number(color.sellerKsPrice),
            tuiKuanMoney: Number(color.sellerTotal),
            sellerFundDirection: Number(color.sellerSign)
          }
          if (!this.addAction) {
            d['id'] = color.id
          }
          list.push(d)
        })

        if (!flag && errorText != '') {
          this.$alert(errorText)
          return false
        }

        postData = {
          orderNumber: this.orderInfo.orderNumber,
          type: Number(this.ksProductList.type),
          outReposityId: this.orderInfo.outReposityId,
          guiderRemark: this.remark,
          detailList: list
        }
        if (!this.addAction) {
          postData['id'] = this.orderId
        }

        request(this.addAction ? ksApi.addItem : ksApi.editItem, {
          method: 'POST',
          data: postData,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          if (response.success == '1') {
            this.$message({
              type: 'success',
              message: response.msg,
              duration: 1000,
              onClose() {
                that.$router.push({
                  name: 'guiderKsManage'
                })
              }
            })
          } else {
            this.$message.error(response.msg)
          }
        })
      },
      closeDialog() {
        if (this.currentEdit) {
          this.currentEdit = false
          this.currentEditIndex = -1
        }
        this.formData.color = ''
        this.formData.buyerKsQuanity = 0
        this.formData.buyerKsPrice = 0
        this.formData.buyerTotal = 0
        this.formData.buyerKsQuanityUnit = ''
        this.formData.buyerKsPriceUnit = ''
        this.formData.buyerSign = -1
        this.formData.sellerKsQuanity = 0
        this.formData.sellerKsPrice = 0
        this.formData.sellerTotal = 0
        this.formData.sellerKsQuanityUnit = ''
        this.formData.sellerKsPriceUnit = ''
        this.formData.sellerSign = -1
      }
    }
  }

</script>ks-product-title
<style lang="scss">
  .table-normal tbody > tr > td {
    text-align: center
  }
  .title {
    font-size: 24px;
    font-weight: bolder;
    margin-left: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid #9c9c9c;
  }

  .wrap-content {
    width: 100%;
    margin-left: 20px;

    .form-data {
      width: 100%;
      clear: both;
      min-height: 180px;
      margin: 20px 0;

      .product {
        width: 100%;
        border-top: 1px solid #c6c6c6;
        border-right: 1px solid #c6c6c6;
        border-spacing: 0;

        tr {
          td {
            text-align: center;
            line-height: 32px;
            border-left: 1px solid #c6c6c6;
            border-bottom: 1px solid #c6c6c6;
          }
        }
      }

      .ks-product {
        width: 100%;
        border-top: 1px solid #c6c6c6;
        border-right: 1px solid #c6c6c6;
        border-spacing: 0;

        tr {
          td {
            text-align: center;
            line-height: 32px;
            border-left: 1px solid #c6c6c6;
            border-bottom: 1px solid #c6c6c6;
          }
        }
      }

      .form-title {
        width: 120px;
        float: left;
        display: inline;
        text-align: right;
        margin-right: 20px;
      }

      .info {
        width: 75%;
        float: left;
        display: inline;

        p {
          min-width: 30%;
          margin-bottom: 20px;
        }

        .data-text {
          border-radius: 4px;
          border: 1px solid #9c9c9c;
          padding: 5px;
        }
      }
    }
  }

  a,
  a:hover,
  a:link {
    color: #169BD5;
    text-decoration: none;
  }

  .clear {
    clear: both;
  }

  .no-border {
    border: none !important;
  }
  .el-form-item__label {
    width: 140px !important
  }
  .el-form-item__content {
    margin-left: 140px !important
  }
  .need .el-form-item__label:before {
    content: '*';
    color: red;
  }

</style>
