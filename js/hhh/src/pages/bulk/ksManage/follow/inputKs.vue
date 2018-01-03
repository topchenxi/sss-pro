<template>
  <div class="wrap-body">
    <div class="title">
      <span v-if="addAction">新增扣数单</span>
      <span v-else>编辑扣数单</span>
      <el-button type="primary" size="small" @click="goBack">返回</el-button>
    </div>
    <div class="wrap-content">
      <div class="form-data">
        <div class="form-title">订单信息：</div>
        <div class="info">
          <p v-if="addAction">
            <el-button type="text" @click.native="$store.dispatch('changePopLoad', true)" style="padding-top:5px;">重新选择</el-button>
          </p>
          <p>
            订单号：{{ orderInfo.serviceNumber }}
          </p>
          <p>
            采购商：{{ orderInfo.customerCompany }}
          </p>
          <p>
            供应商：{{ orderInfo.shopCompany }}
          </p>
        </div>
      </div>
      <div class="form-data" v-if="orderInfo">
        <div class="form-title">货号信息：</div>
        <div class="info">
          <table class="product" v-if="orderInfo.colorList && orderInfo.colorList.length > 0">
            <tr>
              <td width="12%">出仓单号</td>
              <td width="12%">货号</td>
              <td width="12%">色号</td>
              <td width="12%">采购单价</td>
              <td width="12%">成本单价</td>
              <td width="12%">发货数量</td>
              <td>出仓匹数</td>
            </tr>
            <tr v-for="(color, index) in orderInfo.colorList">
              <td v-if="index==0" :rowspan="orderInfo.colorList.length">{{orderInfo.outReposityNumber}}</td>
              <td v-if="index==0" :rowspan="orderInfo.colorList.length">{{ksProductList.productNumber}}</td>
              <td>{{color.color}}</td>
              <td>{{color.buyPrice | formatNumber}}{{color.buyPriceUnit}}</td>
              <td>{{color.price | formatNumber}}{{color.priceUnit}}</td>
              <td>{{color.quantity | formatNumber}}{{color.quantityUnit}}</td>
              <td>{{color.outPi}}匹</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="form-data">
        <div class="form-title">扣数明细：</div>
        <div class="info">
          <table class="product" v-if="ksProductList.colors.length > 0">
            <tr>
              <td width="10%">扣数类型</td>
              <td width="10%">货号</td>
              <td width="10%">色号</td>
              <td width="10%">发货数量</td>
              <td width="10%">销售单价</td>
              <td width="10%">扣数</td>
              <td width="10%">扣数单价</td>
              <td width="10%">扣数金额</td>
              <td>操作</td>
            </tr>
            <tr v-for="(color, index2) in ksProductList.colors">
              <td v-if="index2==0" :rowspan="ksProductList.colors.length">{{ksProductList.type | typeFilter}}</td>
              <td v-if="index2==0" :rowspan="ksProductList.colors.length">{{ksProductList.productNumber}}</td>
              <td>{{color.color}}</td>
              <td>{{color.quantity | formatNumber}}{{color.quantityUnit}}</td>
              <td>{{color.salePrice | formatNumber}}{{color.salePriceUnit}}</td>
              <td>{{color.ksQuanity | formatNumber}}{{color.ksQuanityUnit}}</td>
              <td>{{color.ksPrice | formatNumber}}{{color.ksPriceUnit}}</td>
              <td>{{color.total | totalFilter}} 元</td>
              <td>
                <el-button type="primary" @click="editKs(index2)" style="margin-right:5px;">修改</el-button>
                <el-button type="primary" @click="delKs(index2)">删除</el-button>
              </td>
            </tr>
          </table>
          <el-button type="primary" @click.native="addNew">新增明细+</el-button>
        </div>
      </div>
      <div class="form-data">
        <div class="form-title">跟单扣数备注：</div>
        <div class="info">
          <textarea rows="8" cols="40" v-model="remark" class="data-text"></textarea><span style="margin-left:40px;">{{countWord}}/500字</span>
        </div>
      </div>
      <div class="form-data">
        <div class="form-title">&nbsp;</div>
        <div class="info">
          <el-button type="primary" :size="small" @click.native="commitData">保存</el-button>
        </div>
      </div>
    </div>
    <chooseOrder v-if="$store.state.b.popLoad" @callbackFunction="updateOrder" />
    <el-dialog title="扣数明细" v-model="detailPop" :lock-scroll="false" :close-on-click-modal="false" size="tiny" @close="closeDialog">
      <el-form :model="formData" ref="formData" :rules="formRule" label-width="140px">
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
            <el-option v-for="item in orderInfo.colorList" v-if="orderInfo && orderInfo.colorList" :label="item.color" :value="item.color" :disabled="selected.indexOf(item.color) > -1 || currentEdit">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="扣数数量" class="need" prop="ksQuanity">
          <el-input v-model="formData.ksQuanity" style="width:120px;" type="number" step="0.01" @keyup.native="calcTotal"></el-input> {{formData.ksQuanityUnit}}
        </el-form-item>
        <el-form-item label="扣数单价" class="need" prop="ksPrice">
          <el-input v-model="formData.ksPrice" style="width:120px;" type="number" step="0.01" @keyup.native="calcTotal"></el-input> {{formData.ksPriceUnit}}
        </el-form-item>
        <el-form-item label="合计" prop="total">
          <el-input v-model="formData.total" style="width:120px;" type="number" step="0.01"></el-input> 元
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
      orderInfo: {
        colorList: []
      },
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
        ksQuanity: 0, // 扣数数量
        ksQuanityUnit: '', // 扣数数量单位
        ksPrice: 0, // 扣数单价
        ksPriceUnit: '', // 扣数单价单位
        total: 0,
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
        ksQuanity: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        ksPrice: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        total: [
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
    totalFilter(value) {
      return (0 - Math.abs(Number(value))).toFixed(2);
    },
    typeFilter(val) {
      switch (val) {
        case '1':
          return '损耗';
        case '2':
          return '运费';
        case '3':
          return '售后退换货';
        default:
          return '其他';
      }
    }
  },

  mounted() {
    const currentUser = getCache({ key: 'currentUser' })
    if (currentUser.loginInfo.woodPurchaser) {
      this.$message({
        type: 'error',
        message: '你不是跟单员，不能编辑',
        duration: 1000
      })
      setTimeout(function() {
        window.location.href = '/index/bulk/ksManage/purchaser/ksManage'
      }, 1000)
    }
    this.orderId = this.$route.query.id
    this.outReposityId = this.$route.query.outReposityId
    // 修改
    if (this.orderId && this.orderId != '') {
      this.addAction = false
      this.getKsOrderInfo()
    } else {
      this.addAction = true
      this.getOutReposityOrder()
    }
  },

  computed: {
    countWord: function() {
      if (this.remark.length > 500) {
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
    convertKsData(data) {
      this.ksOrderInfo = data
      this.ksOrderInfo.detailList.forEach((ks) => {
        let color = {}
        color = Object.assign({}, ks)
        color.ksQuanity = ks.buyerKouShu // 扣数数量
        color.ksQuanityUnit = ks.quantityUnit // 扣数数量单位
        color.ksPrice = ks.buyerKouShuPrice // 扣数单价
        color.ksPriceUnit = ks.salePriceUnit // 扣数单价单位
        color.total = ks.kouShuMoney
        this.ksProductList.colors.push(color)
        this.selected.push(ks.color)
      })

      this.ksProductList.productNumber = this.ksOrderInfo.detailList[0].productNumber
      // 扣数单类型(新增的)
      this.ksProductList.type = this.ksOrderInfo.type.toString()
      this.formData.type = this.ksProductList.type // 因为扣数类型一个扣数单只能有一种所以编辑的时候上来就回显
      this.remark = this.ksOrderInfo.genDanRemark
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
          this.formData.ksPrice = color.salePrice
          this.formData.ksPriceUnit = color.salePriceUnit
          this.formData.ksQuanityUnit = color.quantityUnit
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
          this.formData.ksQuanity = Number(this.formData.ksQuanity).toFixed(2);
          this.formData.ksPrice = Number(this.formData.ksPrice).toFixed(2);
          this.formData.total = Number(this.formData.total).toFixed(2);
          if (this.currentEdit && this.currentEditIndex > -1) {
            this.ksProductList.colors[this.currentEditIndex] = Object.assign({}, this.formData)
          } else {
            this.ksProductList.productNumber = this.formData.productNumber
            this.ksProductList.colors.push(Object.assign({
                id: '', // 修改id
                productNumber: '', // 货号
                color: '', // 色号
                ksQuanity: 0, // 扣数数量
                ksQuanityUnit: '', // 扣数数量单位
                ksPrice: 0, // 扣数单价
                ksPriceUnit: '', // 扣数单价单位
                total: 0,
                salePrice: 0, // 销售单价
                salePriceUnit: '', // 销售单位
                quantity: 0, // 发货量
                quantityUnit: '', // 发货单位
                price: 0, // 成本单价
                priceUnit: '', // 成本单价单位
                buyPrice: 0, // 采购单价
                buyPriceUnit: 0, // 采购单价单位
              },
              this.formData))
            this.selected.push(this.formData.color)
          }
          this.formData = {
            id: '', // 修改id
            type: '', // 扣数类型
            productNumber: '', // 货号
            color: '', // 色号
            ksQuanity: 0, // 扣数数量
            ksQuanityUnit: '', // 扣数数量单位
            ksPrice: 0, // 扣数单价
            ksPriceUnit: '', // 扣数单价单位
            total: 0,
            salePrice: 0, // 销售单价
            salePriceUnit: '', // 销售单位
            quantity: 0, // 发货量
            quantityUnit: '', // 发货单位
            price: 0, // 成本单价
            priceUnit: '', // 成本单价单位
            buyPrice: 0, // 采购单价
            buyPriceUnit: 0, // 采购单价单位
          }
          this.detailPop = false
          this.ksCellHeight.height = this.ksCellHeight['line-height'] = (this.ksProductList.colors.length * 40) + 'px'
        }
      })
    },
    calcTotal() {
      console.log(this.formData.ksPrice)
      console.log(this.formData.ksQuanity)
      if (parseFloat(this.formData.ksPrice) > 0 && parseFloat(this.formData.ksQuanity) > 0) {
        this.formData.total = Number(parseFloat(this.formData.ksPrice) * parseFloat(this.formData.ksQuanity)).toFixed(2)
      }
    },
    editKs(index) {
      this.formData = Object.assign({}, this.ksProductList.colors[index])
      this.formData.productNumber = this.productNumber
      this.formData.total = Math.abs(this.formData.total);
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
            // this.ksProductList = this.ksProductList.slice()
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
        if (parseFloat(color.ksQuanity) < 0) {
          errorText = '扣数数量不能少于０'
          flag = false
          return false
        }
        if (parseFloat(color.ksQuanity) > 10000000) {
          errorText = '扣数数量小于10000000'
          flag = false
          return false
        }
        if (parseFloat(color.ksPrice) < 0) {
          errorText = '扣数单价不能少于０'
          flag = false
          return false
        }
        if (parseFloat(color.ksQuanity) > 10000000000) {
          errorText = '扣数单价小于10000000000元'
          flag = false
          return false
        }
        if (parseFloat(color.total) > 10000000000) {
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
          buyerKouShu: parseFloat(color.ksQuanity),
          buyerKouShuPrice: Number(color.ksPrice),
          kouShuMoney: 0 - Math.abs(Number(color.total)),
          sellerKouShu: parseFloat(color.ksQuanity),
          sellerKouShuPrice: Number(color.price),
          tuiKuanMoney: Number(color.ksQuanity) * Number(color.price)
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
        genDanRemark: this.remark,
        detailList: list,
        isGenOpen: 1
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
          let router = this.$router;
          this.$message({
            type: 'success',
            message: response.msg,
            duration: 1000,
            onClose() {
              router.push({ 'name': 'KsFollowManage' })
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
      this.formData.ksQuanity = 0
      this.formData.ksPrice = 0
      this.formData.total = 0
      this.formData.ksQuanityUnit = ''
      this.formData.ksPriceUnit = ''
    }
  }
}

</script>
<style lang="scss">
.wrap-body {
  width: 100%;

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
            font-size: 14px;
            text-align: center;
            line-height: 42px;
            border-left: 1px solid #c6c6c6;
            border-bottom: 1px solid #c6c6c6;
          }
        } // display: block;
        // border: 1px solid #c6c6c6;
        //
        // .product-title {
        //   height: 100%;
        //   .color-item-title {
        //     float:left;
        //     width: 14.2%;
        //     line-height: 40px;
        //     text-align: center;
        //     font-size: 14px;
        //     border-right: 1px solid #c6c6c6;
        //   }
        // }
        //
        // .product-data {
        //   display: block;
        //   border-top: 1px solid #c6c6c6;
        //
        //   .product-data-cell {
        //     float:left;
        //     width: 14.2%;
        //     text-align: center;
        //     font-size: 14px;
        //     border-right: 1px solid #c6c6c6;
        //     white-space: nowrap;
        //     overflow: hidden;
        //   }
        //
        //   .color-data {
        //     float: left;
        //     width: 71.6%;
        //
        //     .color-block {
        //       border-bottom: 1px solid #c6c6c6;
        //     }
        //
        //     .color-data-cell {
        //       float:left;
        //       width: 19.84%;
        //       line-height: 40px;
        //       text-align: center;
        //       font-size: 14px;
        //       border-right: 1px solid #c6c6c6;
        //       white-space: nowrap;
        //       overflow: hidden;
        //     }
        //   }
        // }
      }

      .ks-product {
        display: block;
        border: 1px solid #c6c6c6;

        .ks-product-title {
          height: 100%;
          .ks-color-item-title {
            float: left;
            width: 12.5%;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            border-right: 1px solid #c6c6c6;
          }
        }

        .ks-product-data {
          display: block;
          border-top: 1px solid #c6c6c6;

          .ks-product-data-cell {
            float: left;
            width: 12.5%;
            text-align: center;
            font-size: 14px;
            border-right: 1px solid #c6c6c6;
            white-space: nowrap;
            overflow: hidden;
          }

          .ks-color-data {
            float: left;
            width: 87.5%;

            .ks-color-block {
              border-bottom: 1px solid #c6c6c6;
            }

            .ks-color-data-cell {
              float: left;
              width: 14.28%;
              line-height: 40px;
              text-align: center;
              font-size: 14px;
              border-right: 1px solid #c6c6c6;
              white-space: nowrap;
              overflow: hidden;
            }
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

.el-form-item.need label:before {
  content: '*';
  color: red;
}

</style>
