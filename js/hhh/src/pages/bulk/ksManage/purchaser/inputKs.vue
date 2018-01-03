<template>
  <div class="wrap-body">
    <div class="title">
      <span>编辑扣数单</span>
      <el-button type="primary" size="small" @click="goBack">返回</el-button>
    </div>
    <div class="wrap-content">
      <div class="form-data">
        <div class="form-title">订单信息：</div>
        <div class="info">
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
        <div class="form-data">
          <div class="form-title">货号信息：</div>
          <div class="info">
            <table class="product" v-if="orderInfo.colorList && orderInfo.colorList.length > 0">
              <tr>
                <td width="12%">出仓单号</td>
                <td width="12%">货号</td>
                <td width="12%">色号</td>
                <td width="13%">采购单价</td>
                <td width="13%">成本单价</td>
                <td width="13%">发货数量</td>
                <td>出仓匹数</td>
              </tr>
              <tr v-for="(color, index) in orderInfo.colorList">
                <td rowspan="orderInfo.colorList.length">{{orderInfo.outReposityNumber}}</td>
                <td rowspan="orderInfo.colorList.length">{{color.productNumber}}</td>
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
                <td width="11%">货号</td>
                <td width="11%">色号</td>
                <td width="11%">发货数量</td>
                <td width="11%">采购单价</td>
                <td width="11%">成本单价</td>
                <td width="12%">扣数</td>
                <td width="12%">扣数单价</td>
                <td width="12%">退款金额</td>
                <td>操作</td>
              </tr>
              <tr v-for="(color, index2) in ksProductList.colors">
                <td :rowspan="ksProductList.colors.length">{{ksProductList.productNumber}}</td>
                <td>{{color.color}}</td>
                <td>{{color.quantity | formatNumber}}{{color.quantityUnit}}</td>
                <td>{{color.buyPrice | formatNumber}}{{color.buyPriceUnit}}</td>
                <td>{{color.price | formatNumber}}{{color.priceUnit}}</td>
                <td>{{color.ksQuanity | formatNumber}}{{color.ksQuanityUnit}}</td>
                <td>{{color.ksPrice | formatNumber}}{{color.ksPriceUnit}}</td>
                <td>{{color.total | formatNumber}} 元</td>
                <td>
                  <el-button type="text" @click="editKs(index2)">修改</el-button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="form-data">
          <div class="form-title">买货员扣数备注：</div>
          <div class="info">
            <textarea rows="8" cols="40" v-model="remark" class="data-text"></textarea><span style="margin-left:40px;">{{countWord}}/500字</span>
          </div>
        </div>
        <div class="form-data">
          <div class="form-title">退款凭证：</div>
          <div class="info">
            <el-row>
                <el-col class="position-center product-img-list">
                    <div class="img-wrap" v-for="(url,urlIdx) in images" @click="removeImg(urlIdx)" style="display:inline-block;float:left;">
                        <img :src="'http://www.soouya.com' + url" />
                        <i class="el-icon-close"></i>
                    </div>
                    <el-col style="width:30%;">
                        <el-upload class="product-img-upload" drag action="/redwood/sys/Common/uploadFile.do?type=0" multiple width="100" :on-success="handleuploadImg" v-if="images.length < 6">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或
                                <em>点击上传</em>
                            </div>
                        </el-upload>
                    </el-col>
                </el-col>
            </el-row>
          </div>
          <div class="clear"></div>
        </div>
        <el-button type="primary" :size="small" @click="commitData">保存</el-button>
    </div>

    <el-dialog
      title="扣数明细"
      v-model="detailPop"
      :lock-scroll="false"
      :close-on-click-modal="false"
      size="tiny"
    >
      <el-form v-model="formData" label-width="100px">
        <el-form-item label="货号" class="need">
          <el-input v-model="formData.productNumber" class="no-border" :readonly="true" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="色号" class="need">
          <el-input v-model="formData.color" class="no-border" :readonly="true" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="扣数数量" class="need">
          <el-input v-model="formData.ksQuanity" style="width:120px;" type="number" @keyup.native="calcTotal"></el-input> {{formData.ksQuanityUnit}}
        </el-form-item>
        <el-form-item label="扣数单价" class="need">
          <el-input v-model="formData.ksPrice" style="width:120px;" type="number" @keyup.native="calcTotal"></el-input> {{formData.ksPriceUnit}}
        </el-form-item>
        <el-form-item label="合计">
          <el-input v-model="formData.total" style="width:120px;" type="number"></el-input> 元
        </el-form-item>
        <el-button type="primary" @click="saveProduct()">保存</el-button><el-button @click.native="detailPop=false">取消</el-button>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
import ksApi from 'api/ksApi'
import {
  newRequest
} from 'utils/tool'

export default {
  filters: {
    formatNumber(val) {
      return Number(val).toFixed(2)
    }
  },
  data() {
    return {
      ksOrderId: '',
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
      selected: [],
      currentEdit: false,
      currentEditIndex: -1,
      images: [],
      outReposityId: '',
      productNumber: ''
    }
  },

  mounted() {
    this.ksOrderId = this.$route.query.id
    this.getKsOrderInfo()
  },

  computed: {
    countWord: function () {
      if (this.remark && this.remark.length > 500) {
        this.$alert('备注不能超过500个字')
        this.remark = this.remark.substr(0, 500)
        return 500
      }
      return this.remark ? this.remark.length : 0
    },
  },

  methods: {
    getKsOrderInfo() {
      this.$store.dispatch('changeload', true)
      console.log(this.ksOrderId)
      let data = {}
      data = {
        id: this.ksOrderId
      }
      newRequest({
        url: ksApi.getKsDetail,
        data: data,
        method: 'get'
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
    getOutReposityOrder() {
      newRequest({
        url: ksApi.getOutReposityDetail,
        data: {
          id: this.outReposityId
        },
        method: 'get'
      }).then(response => {
        this.$store.dispatch('changeload', false)
        this.convertOutReposityData(response.obj)
      })
    },
    convertOutReposityData(data) {
      this.orderInfo = data
      this.cellHeight.height = this.cellHeight['line-height'] = (this.orderInfo.colorList.length * 40) + 'px';
    },
    convertKsData(data) {
      console.log(data)
      this.ksOrderInfo = data
      if (this.ksOrderInfo.detailList && this.ksOrderInfo.detailList.length > 0) {
        this.ksOrderInfo.detailList.forEach((ks) => {
          let color = {}
          color = Object.assign({}, ks)
          color.ksQuanity = ks.sellerKouShu // 扣数数量
          color.ksQuanityUnit = ks.quantityUnit // 扣数数量单位
          color.ksPrice = ks.sellerKouShuPrice // 扣数单价
          color.ksPriceUnit = ks.priceUnit // 扣数单价单位
          color.total = ks.tuiKuanMoney
          this.ksProductList.colors.push(color)
        })
        this.ksProductList.productNumber = this.ksOrderInfo.detailList[0].productNumber
      }
      console.log(this.ksProductList)
      this.remark = this.ksOrderInfo.caiGouRemark
      this.images = this.ksOrderInfo.imgUrls
      this.ksCellHeight.height = this.ksCellHeight['line-height'] = (this.ksProductList.length * 40) + 'px';
    },
    goBack() {
      window.history.back(-1)
    },
    // 添加扣数色号
    saveProduct() {
      if (this.formData.color == '' || (!this.currentEdit && this.selected.indexOf(this.formData.color) > -1)) {
        this.$alert('请选择色号')
        return;
      }
      if (parseFloat(this.formData.ksQuanity) <= 0) {
        this.$alert('扣数数量大于０')
        return;
      }
      if (isNaN(parseFloat(this.formData.ksQuanity))) {
        this.$alert('请输入正确的扣数数量')
        return;
      }
      if (parseFloat(this.formData.ksPrice) <= 0) {
        this.$alert('扣数单价大于０')
        return;
      }
      if (isNaN(parseFloat(this.formData.ksQuanity))) {
        this.$alert('请输入正确的扣数单价')
        return;
      }
      if (parseFloat(this.formData.total) < 0) {
        this.$alert('合计不能少于０')
        return;
      }
      if (isNaN(parseFloat(this.formData.total))) {
        this.$alert('请输入正确的合计金额')
        return;
      }
      if (this.currentEdit && this.currentEditIndex > -1) {
        this.ksProductList.colors[this.currentEditIndex] = Object.assign({}, this.formData)
      } else {
        this.ksProductList.productNumber = this.formData.productNumber
        this.ksProductList.colors.push(Object.assign({
          color: '',
          ksQuanity: 0,
          ksQuanityUnit: '',
          ksPrice: 0,
          ksPriceUnit: '',
          total: 0,
          salePrice: 0,
          salePriceUnit: '',
          quantity: 0,
          quantityUnit: ''
        },
        this.formData))
        this.selected.push(this.formData.color)
      }
      this.formData = {
        productNumber: '',
        color: '',
        ksQuanity: 0,
        ksQuanityUnit: '',
        ksPrice: 0,
        ksPriceUnit: '',
        total: 0,
        salePrice: 0,
        salePriceUnit: '',
        quantity: 0,
        quantityUnit: ''
      }
      this.detailPop = false
    },
    calcTotal() {
      if (parseFloat(this.formData.ksPrice) > 0 && parseFloat(this.formData.ksQuanity) > 0) {
        this.formData.total = Number(parseFloat(this.formData.ksPrice) * parseFloat(this.formData.ksQuanity)).toFixed(2)
      }
    },
    editKs(index) {
      this.formData = Object.assign(this.formData, this.ksProductList.colors[index])
      this.formData.productNumber = this.ksProductList.productNumber
      this.detailPop = true
      this.currentEdit = true
      this.currentEditIndex = index
    },
    removeImg(index) {
      let save = this.images.slice(0, index)
      let last = this.images.slice(index + 1)
      console.log(save)
      console.log(last)
      this.images = save.concat(last)
    },
    handleuploadImg(response, file, fileList) {
        console.log(response, file, fileList)
        if (response.success === '1') {
          this.images.push(response.imgUrl)
        } else {
            this.$message.error(response.msg);
        }
    },
    commitData() {
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
        if (parseFloat(color.ksQuanity) <= 0) {
          errorText = '扣数数量大于０'
          flag = false
          return false
        }
        if (parseFloat(color.ksQuanity) > 10000000) {
          errorText = '扣数数量小于10000000'
          flag = false
          return false
        }
        if (parseFloat(color.ksPrice) <= 0) {
          errorText = '扣数单价大于０元'
          flag = false
          return false
        }
        if (parseFloat(color.ksPrice) > 10000000000) {
          errorText = '扣数单价小于10000000000元'
          flag = false
          return false
        }
        if (parseFloat(color.total) < 0) {
          errorText = '合计不能少于０元'
          flag = false
          return false
        }
        if (parseFloat(color.total) > 10000000000) {
          errorText = '合计小于10000000000元'
          flag = false
          return false
        }
        let d = {
          productNumber: color.productNumber,
          color: color.color,
          quantity: Number(color.quantity),
          quantityUnit: color.quantityUnit,
          salePrice: Number(color.salePrice),
          salePriceUnit: color.salePriceUnit,
          buyPrice: Number(color.buyPrice),
          buyPriceUnit: color.buyPriceUnit,
          price: Number(color.price),
          priceUnit: color.priceUnit,
          buyerKouShu: Number(color.buyerKouShu),
          buyerKouShuPrice: Number(color.buyerKouShuPrice),
          kouShuMoney: Number(color.kouShuMoney),
          sellerKouShu: Number(color.ksQuanity),
          sellerKouShuPrice: Number(color.ksPrice),
          tuiKuanMoney: Number(color.total)
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
      // console.log(list)

      postData = {
        orderNumber: this.orderInfo.orderNumber,
        outReposityId: this.orderInfo.outReposityId,
        caiGouRemark: this.remark,
        imgUrls: this.images,
        detailList: list,
        isGenOpen: 0
      }
      if (!this.addAction) {
        postData['id'] = this.ksOrderId
      }
      // console.log(postData)

      newRequest({
        url: this.addAction ? ksApi.addItem : ksApi.editItem,
        data: postData,
        contentType: 'application/json'
      }).then(response => {
        if (response.success == '1') {
          this.$message({
            type: 'success',
            message: response.msg,
            duration: 1000,
            onClose() {
              window.location.href = '/index/bulk/ksManage/purchaser/ksManage'
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1000
          })
        }
      })
    }
  }
}
</script>ks-product-title
<style lang="scss">
.wrap-body {
  width:100%;

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
        }
        // display: block;
        // border: 1px solid #c6c6c6;
        //
        // .product-title {
        //   height: 100%;
        //   .color-item-title {
        //     float:left;
        //     width: 12.5%;
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
        //     width: 12.5%;
        //     text-align: center;
        //     font-size: 14px;
        //     border-right: 1px solid #c6c6c6;
        //     white-space: nowrap;
        //     overflow: hidden;
        //   }
        //
        //   .color-data {
        //     float: left;
        //     width: 75%;
        //
        //     .color-block {
        //       border-bottom: 1px solid #c6c6c6;
        //     }
        //
        //     .color-data-cell {
        //       float:left;
        //       width: 16.66%;
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
            float:left;
            width: 11.11%;
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
            float:left;
            width: 11.11%;
            text-align: center;
            font-size: 14px;
            border-right: 1px solid #c6c6c6;
            white-space: nowrap;
            overflow: hidden;
          }

          .ks-color-data {
            float: left;
            width: 88.89%;

            .ks-color-block {
              border-bottom: 1px solid #c6c6c6;
            }

            .ks-color-data-cell {
              float:left;
              width: 12.5%;
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
        width: 140px;
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

a, a:hover, a:link {
  color: #169BD5;
  text-decoration: none;
}

.clear {
  clear:both;
}
.no-border {
  border:none !important;
}

.el-form-item.need label:before {
  content: '*';
  color: red;
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
    .el-upload-dragger {
      width: 180px;
    }
}
</style>
