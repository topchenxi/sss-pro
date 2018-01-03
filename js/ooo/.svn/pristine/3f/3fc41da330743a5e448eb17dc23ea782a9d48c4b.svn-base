<template>
  <section class="printTable_content"  v-loading.fullscreen.lock="fullscreenLoading">
    <div class="printTable-box">
      <table border="1" border-spacing="0" class="table-box">
        <tr>
          <th style="width: 900px;height:70px;" :colspan="10">
            <div class="seller-box">
              <template v-if="obj.order.shopCompany">
                <span style="font-size:15px;font-weight:500;">{{obj.order.shopCompany}}</span>
              </template>
              <template v-else>
                <span style="font-size:15px;font-weight:500;">{{obj.order.customerCompany}}</span>
              </template>
            </div>
            <span style="font-size:25px;font-weight:500">采购报价单</span>
            <div class="print-btn">
              <el-button :plain="true" type="success" size="small" @click.native="handlePrint">打印</el-button>
            </div>
          </th>
        </tr>
        <tr style="height:40px;">
          <td style=" text-align:center" :colspan="2">
            <span style="font-weight:700;">客户名称</span>
          </td>
          <td style="text-align:center;" :colspan="2">
            <span>{{obj.order.customerCompany}}</span>
          </td>
          <td style="text-align:center;" :colspan="1">
            <span style="font-weight:700">销售员/采购员</span>
          </td>
          <td style="text-align:center;" :colspan="1">
            <span>{{obj.order.salesName}}/{{obj.order.guiderName}}</span>
          </td>
          <td style="text-align:center;" :colspan="1">
            <span style="font-weight:700">下单时间</span>
          </td>
          <td style="text-align:center;" :colspan="1">
            <span>{{obj.order.createTime | formatDate}}</span>
          </td>
          <td style="text-align:center;" :colspan="1">
            <span style="font-weight:700">订单号</span>
          </td>
          <td>
            <span>{{obj.order.serviceNumber}}</span>
          </td>
        </tr>
        <tr style="height:40px;">
          <td style="text-align:center;max-width:90px;" :colspan="1">
            <span style="font-weight:bold;">货物品名及规格</span>
          </td>
          <td style="text-align:center; min-width:80px;" :colspan="1">
            <span style="font-weight:700;">色号</span>
          </td>
          <td style="text-align:center" :colspan="2">
            <span style="font-weight:700">细码数</span>
          </td>
          <td style="text-align:center" :colspan="2">
            <span style="font-weight:700">采购数量</span>
          </td>
          <td style="text-align:center" :colspan="1">
            <span style="font-weight:700">销售单价</span>
          </td>
          <td style="text-align:center" :colspan="1">
            <span style="font-weight:700">采购单价</span>
          </td>
          <td style="text-align:center" :colspan="1">
            <span style="font-weight:700">成本单价</span>
          </td>
          <td style="text-align:center" :colspan="1">
            <span style="font-weight:700">合计</span>
          </td>
        </tr>
        <tr>
          <td :rowspan="obj.order.productList.length + 1" :colspan="1" style="text-align:center">
            <span>{{obj.order.productNumber}}</span>
          </td>
          <tr v-for="(item, index) in obj.order.productList">
            <td style="text-align:center;height:35px;" :colspan="1">
              <span>{{item.color}}</span>
            </td>
            <td style="text-align:center; max-width:160px;padding:7px;" :colspan="2">
              <span>{{item.xiMaShu}}</span>
            </td>
            <td style="text-align:center;" :colspan="2">
              <span>{{item.quantity | formatMoney}}{{item.quantityUnit}}</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span>{{item.salePrice | formatMoney}}{{item.salePriceUnit}}</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span>{{item.buyPrice | formatMoney}}{{item.buyPriceUnit}}</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span>{{item.price | formatMoney}}{{item.priceUnit}}</span>
            </td>
            <td :colspan="1">{{item.salePrice * item.quantity | formatMoney}}元</td>
          </tr>
        </tr>
        <tr style="height:70px;">
          <td :colspan="1">
            <span style="font-weight:700">总计</span>
          </td>
          <td :colspan="3">
            <span>共{{len}}匹/{{obj.order.productList.length}}色</span>
          </td>
          <td :colspan="2">
            <span>{{totalQuantity | formatMoney}}{{totalQuantityUnit}}</span>
          </td>
          <!-- 待定 -->
          <td :colspan="4" style="text-align: left; padding-left: 10px; padding-top:5px;padding-bottom:5px;">
            <template v-if="obj.order.productSource == 0">
              <p style="font-weight:700">销售货款：
                <b style="color:#f00">￥{{obj.order.saleMoney | formatMoney}}</b>
              </p>
              <p style="font-weight:700">成本货款(不含税)：
                <b style="color: #f00">￥{{obj.order.costMoneyOffTax | formatMoney}}</b>
              </p>
              <template v-if="obj.order.invoiceStatus == 1">
                <p style="font-weight:700">采购商税款：
                  <template v-if="obj.order.invoiceStatus == 1">
                    <b style="color: #f00">￥{{obj.order.taxMoney | formatMoney}}</b>({{obj.order.taxPoint | formatMoney}}%)
                  </template>
                  <template v-else>
                    <span>--</span>
                  </template>
                </p>
              </template>
              <template v-if="obj.order.sellerInvoiceStatus == 1">
                <p style="font-weight:700">供应商税款：
                  <template v-if="obj.order.sellerInvoiceStatus == 1">
                    <b style="color: #f00">￥{{obj.order.sellerTaxMoney | formatMoney}}</b>({{obj.order.sellerTaxPoint | formatMoney}}%)
                  </template>
                  <template v-else>
                    <span>--</span>
                  </template>
                </p>
              </template>
              <p style="font-weight:700">毛利率：
                <b style="color: #f00">{{obj.order.maoliPoint | formatMoney}}%</b>
              </p>
            </template>
            <template v-if="obj.order.productSource == 1">
              <p style="font-weight:700">销售订金：
                <b style="color:#f00">￥{{obj.order.earnestMoney | formatMoney}}</b>
              </p>
              <p style="font-weight:700">销售尾款：
                <b style="color:#f00">￥{{obj.order.finalMoney | formatMoney}}</b>
              </p>
              <p style="font-weight:700">成本货款(不含税)：
                <b style="color: #f00">￥{{obj.order.costMoneyOffTax | formatMoney}}</b>
              </p>
              <template v-if="obj.order.invoiceStatus == 1">
                <p style="font-weight:700">采购商税款：
                  <template v-if="obj.order.invoiceStatus == 1">
                    <b style="color: #f00">￥{{obj.order.taxMoney | formatMoney}}</b>({{obj.order.taxPoint | formatMoney}}%)
                  </template>
                  <template v-else>
                    <span>--</span>
                  </template>
                </p>
              </template>
              <template v-if="obj.order.sellerInvoiceStatus == 1">
                <p style="font-weight:700">供应商税款：
                  <template v-if="obj.order.sellerInvoiceStatus == 1">
                    <b style="color: #f00">￥{{obj.order.sellerTaxMoney | formatMoney}}</b>({{obj.order.sellerTaxPoint | formatMoney}}%)
                  </template>
                  <template v-else>
                    <span>--</span>
                  </template>
                </p>
              </template>
              <p style="font-weight:700">毛利率：
                <b style="color: #f00">{{obj.order.maoliPoint | formatMoney}}%</b>
              </p>
            </template>
          </td>
        </tr>
        <tr>
          <td :colspan="10" style="padding: 5px 10px; text-align:left">
            <b>供应商：</b>
            <span>{{obj.order.shopCompany}}</span>
            </br>
            <b>货源：</b>
            <span>
              <template v-if="obj.order.productSource == 1">
                订货
              </template>
              <template v-else>
                现货
              </template>
            </span>
            </br>
            <b>是否付款供应商：</b>
            <span>
              <template v-if="obj.order.needToPaySeller == 1">
                需要付款
              </template>
              <template v-else>
                无需付款
              </template>
            </span>
            </br>
            <template v-if="obj.order.sellerBankAccount.id">
              <b>供应商收款方式：</b>
              <template v-if="obj.order.sellerBankAccount.type == 1">
                <span>{{obj.order.sellerBankAccount.company}}</span>
              </template>
              <template v-if="obj.order.sellerBankAccount.type == 2">
                <span>{{obj.order.sellerBankAccount.realName}}</span>
              </template>
              </br>
              <span class="sellerGetPay-box">{{obj.order.sellerBankAccount.number}}</span>
              </br>
              <span class="sellerGetPay-box">{{obj.order.sellerBankAccount.bank}}</span>
              </br>
              <span class="sellerGetPay-box">
                <template v-if="obj.order.sellerBankAccount.type == 1">企业</template>
                <template v-if="obj.order.sellerBankAccount.type == 2">个人</template>
              </span>
              </br>
            </template>
            <b>供应商发票：</b>
            <span>
              <template v-if="obj.order.sellerInvoiceStatus == 1">要发票({{obj.order.sellerTaxPoint}}%)</template>
              <template v-else>不要发票</template>
            </span>
          </td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      totalQuantity: 0,
      totalQuantityUnit: '',
      fullscreenLoading: true,
      len: 0,
      obj: {
        order: {
          address: {},
          customerAccount: {},
          productList: [],
          sellerBankAccount: {}
        },
        product: {},
        price: {},
        inreposity: {},
        outreposity: {}
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.fullscreenLoading = true
      this.totalQuantity = 0
      request('/redwood/bulk/getDetail', {
        data: {
          orderNumber: this.$route.query.orderNumber
        },
        method: 'GET'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success === '1') {
          this.obj = res.obj
          this.len = 0
          this.totalQuantityUnit = this.obj.order.productList[0].quantityUnit
          for (let i = 0; i < this.obj.order.productList.length; i++) {
            this.totalQuantity = Number(this.obj.order.productList[i].quantity) + Number(this.totalQuantity)
            if (this.obj.order.productList[i].xiMaShu) {
              // this.obj.order.productList[i].xiMaShu = '45646546465546/45/6/68456456/46/4564564567456/7864564567/64/68468/46/4/864/84/68/468/4/684/68/4/886/456/456456/456/7864564/564564864/56/546546456/456/4/56456' +
              // '/54678674645/786/7456456456/7/86756/456/78/6745/6/456/78/6/4/56/786/7456/456/456/45/6/786/456/456/7/86/45/6/786/4/25/6/45/6456/78/6/45/6/45/64/56456/546/456/4'
              let arr = this.obj.order.productList[i].xiMaShu.split('/')
              for (let i = 0; i < arr.length; i++) {
                if (Number(arr[i])) {
                  this.len += 1
                }
              }
            }
          }
          this.obj.order.maoliPoint = (this.obj.order.saleMoney - this.obj.order.costMoneyOffTax - this.obj.order.taxMoney) / (this.obj.order.saleMoney - this.obj.order.taxMoney) * 100
          this.obj.order.maoliPoint = this.obj.order.maoliPoint.toFixed(2)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handlePrint() {
      window.print()
    }
  },
  filters: {
    formatDate(val) {
      let date = new Date(val)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      if (Number(m) < 10) {
        m = '0' + m
      }
      let d = date.getDate()
      if (Number(d) < 10) {
        d = '0' + d
      }
      let dd = y + '-' + m + '-' + d
      return dd
    }
  }
}
</script>

<style lang="scss" scoped>
.printTable_content {
  width: 100%;
  max-width: 1920px;
  font-size: 14px;
  // position: fixed;
  .printTable-box {
    width: 900px;
    margin: 10px auto;
    overflow: hidden;
    .seller-box {
      position: absolute;
      padding: 5px 10px;
      margin: 0px 10px;
      border: 2px solid #25b060;
      font-size: 14px;
    }
    .print-btn {
      position: absolute;
      margin-right: 10px;
      margin-left: 800px;
      margin-top: -30px;
    }
    .table-box {
      border-collapse: collapse;
      border: 1px solid #25B060;
      word-break: break-all;
      td {
        text-align: center;
        padding: 2px 5px;
      }
    }
    .sellerGetPay-box {
      margin-left: 110px;
    }
  }
  @media print {
    font-size: 16px;
    .printTable_content {
      max-width: 900px;
      height: 670px;
      max-height: 100%;
      box-sizing: border-box;
    }
    .print-btn {
      display: none
    }
    .sellerGetPay-box {
      margin-left: 180px;
    }
  }
}
</style>
