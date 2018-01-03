<template>
  <section class="printTable_content">
    <template v-if="status == 1">
      <div class="printTable-box">
        <table border="1" border-spacing="0" class="table-box">
          <tr>
            <th style="width: 900px;height:70px;" :colspan="8">
              <div class="seller-box">
                <template v-if="obj.needSoouyaMadan == 1">
                  <span style="font-size:15px;font-weight:500;">搜芽</span>
                </template>
                <template v-else>
                  <span style="font-size:15px;font-weight:500;">{{obj.shopCompany}}</span>
                </template>
              </div>
              <span style="font-size:25px;font-weight:500">销售码单</span>
              <div class="print-btn">
                <el-button :plain="true" type="success" size="small" @click.native="handlePrint">打印</el-button>
              </div>
            </th>
          </tr>
          <tr style="height:40px;">
            <td style=" text-align:center" :colspan="1">
              <span style="font-weight:700;">客户名称</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span>{{obj.customerCompany}}</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span style="font-weight:700">销售员/采购员</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span>{{obj.salesName}}/{{obj.guiderName}}</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span style="font-weight:700">下单时间</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span>{{obj.createTime | formatDate}}</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span style="font-weight:700">订单号</span>
            </td>
            <td>
              <span>{{obj.serviceNumber}}</span>
            </td>
          </tr>
          <tr style="height:40px;">
            <td style="text-align:center;max-width:90px;" :colspan="1">
              <span style="font-weight:700">货物品名及规格</span>
            </td>
            <td style="text-align:center" :colspan="1">
              <span style="font-weight:700">色号</span>
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
              <span style="font-weight:700">合计</span>
            </td>
          </tr>
          <tr>
            <td :rowspan="obj.productList.length + 1" :colspan="1" style="text-align:center">
              <span>{{obj.productNumber}}</span>
            </td>
            <tr v-for="(item, index) in obj.productList">
              <td style="text-align:center;height:35px;" :colspan="1">
                <span>{{item.color}}</span>
              </td>
              <td style="text-align:center; max-width:160px;padding:7px;" :colspan="2">
                <span>{{item.xiMaShu}}</span>
              </td>
              <td style="text-align:center;" :colspan="2">
                <span>{{item.quantity | formatMoney}}{{obj.quantityUnit}}</span>
              </td>
              <td style="text-align:center;" :colspan="1">
                <span>{{item.salePrice | formatMoney}}{{obj.salePriceUnit}}</span>
              </td>
              <td :colspan="1">
                <span>{{item.totalMoney | formatMoney}}{{totalMoneyUnit}}</span>
              </td>
            </tr>
          </tr>
          <tr style="height:70px;">
            <td :colspan="1">
              <span style="font-weight:700">总计</span>
            </td>
            <td :colspan="3">
              <span>共{{len}}匹/{{obj.productList.length}}色</span>
            </td>
            <td :colspan="2">
              <span>{{totalQuantity | formatMoney}}{{totalQuantityUnit}}</span>
            </td>
            <td :colspan="2" style="text-align: left; padding-left: 10px; padding-top:5px;padding-bottom:5px;">
              <template v-if="obj.productSource == 0">
                <span style="font-weight:700">销售货款：
                  <b style="color: #f00">{{obj.saleMoney | formatMoney}}{{totalMoneyUnit}}</b>
                </span>
              </template>
              <template v-else>
                <template v-if="obj.earnestMoney">
                  <span style="font-weight:700">销售订金：
                    <b style="color:#f00">{{obj.earnestMoney | formatMoney}}{{totalMoneyUnit}}</b>
                  </span>
                </template>
                <template v-if="obj.finalMoney">
                  <span style="margin-left: 20px; font-weight:700">销售尾款：
                    <b style="color:#f00">{{obj.finalMoney | formatMoney}}{{totalMoneyUnit}}</b>
                  </span>
                </template>
              </template>
            </td>
          </tr>
        </table>
      </div>
    </template>
    <template v-else>
      <div class="printTable-box">
        <table border="1" border-spacing="0" class="table-box">
          <tr>
            <th style="width: 900px;height:70px;" :colspan="8">
              <div class="seller-box">
                <template v-if="obj1.order.needSoouyaMadan == 1">
                  <span style="font-size:15px;font-weight:500;">搜芽</span>
                </template>
                <template v-else>
                  <template v-if="obj1.order.shopCompany">
                    <span style="font-size:15px;font-weight:500;">{{obj1.order.shopCompany}}</span>
                  </template>
                  <template v-else>
                    <span style="font-size:15px;font-weight:500;">{{obj1.order.customerCompany}}</span>
                  </template>
                </template>
              </div>
              <span style="font-size:25px;font-weight:500">销售码单</span>
              <div class="print-btn">
                <el-button :plain="true" type="success" size="small" @click.native="handlePrint">打印</el-button>
              </div>
            </th>
          </tr>
          <tr style="height:40px;">
            <td style=" text-align:center" :colspan="1">
              <span style="font-weight:700;">客户名称</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span>{{obj1.order.customerCompany}}</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span style="font-weight:700">销售员/采购员</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span>{{obj1.order.salesName}}/{{obj1.order.guiderName}}</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span style="font-weight:700">下单时间</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span>{{obj1.order.createTime | formatDate}}</span>
            </td>
            <td style="text-align:center;" :colspan="1">
              <span style="font-weight:700">订单号</span>
            </td>
            <td>
              <span>{{obj1.order.serviceNumber}}</span>
            </td>
          </tr>
          <tr style="height:40px;">
            <td style="text-align:center;max-width:90px;" :colspan="1">
              <span style="font-weight:700">货物品名及规格</span>
            </td>
            <td style="text-align:center" :colspan="1">
              <span style="font-weight:700">色号</span>
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
              <span style="font-weight:700">合计</span>
            </td>
          </tr>
          <tr>
            <td :rowspan="obj1.order.productList.length + 1" :colspan="1" style="text-align:center">
              <span>{{obj1.order.productNumber}}</span>
            </td>
            <tr v-for="(item, index) in obj1.order.productList">
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
              <td :colspan="1">
                <span>{{item.totalMoney | formatMoney}}{{totalMoneyUnit}}</span>
              </td>
            </tr>
          </tr>
          <tr style="height:70px;">
            <td :colspan="1">
              <span style="font-weight:700">总计</span>
            </td>
            <td :colspan="3">
              <span>共{{len}}匹/{{obj1.order.productList.length}}色</span>
            </td>
            <td :colspan="2">
              <span>{{totalQuantity | formatMoney}}{{totalQuantityUnit}}</span>
            </td>
            <!-- 待定 -->
            <td :colspan="2" style="text-align: left; padding-left: 10px; padding-top:5px;padding-bottom:5px;">
              <template v-if="obj1.order.productSource == 0">
                <span style="font-weight:700; ">销售货款：
                  <b style="color: #f00">{{obj1.order.saleMoney | formatMoney}}{{totalMoneyUnit}}</b>
                </span>
              </template>
              <template v-else>
                <template v-if="obj1.order.earnestMoney">
                  <span style="font-weight:700">销售订金：
                    <b style="color: #f00">{{obj1.order.earnestMoney | formatMoney}}{{totalMoneyUnit}}</b>
                  </span>
                </template>
                <template v-if="obj1.order.finalMoney">
                  <span style="margin-left:20px;font-weight: 700">销售尾款：
                    <b style="color: #f00">{{obj1.order.finalMoney | formatMoney}}{{totalMoneyUnit}}</b>
                  </span>
                </template>
              </template>
            </td>
          </tr>
        </table>
      </div>
    </template>
  </section>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      len: 0,
      status: 1,
      totalQuantity: 0,
      totalQuantityUnit: '',
      totalMoney: 0,
      totalMoneyUnit: '',
      obj: {
        productList: []
      },
      obj1: {
        order: {
          productList: []
        }
      }
    }
  },
  mounted() {
    if (this.$route.query.status) {
      this.status = this.$route.query.status
    }
    this.getData()
  },
  methods: {
    getData() {
      this.len = 0
      if (this.status === 1) {
        console.log(this.status)
        this.totalQuantity = 0
        this.totalMoney = 0
        console.log(sessionStorage.guiderSalesTable)
        // let res = config.table
        this.obj = JSON.parse((sessionStorage.guiderSalesTable))
        console.log(this.obj)
        if (!this.obj.product) {
          this.obj.product = {}
        }
        this.totalQuantityUnit = this.obj.productList[0].quantityUnit
        for (let i = 0; i < this.obj.productList.length; i++) {
          console.log(this.obj.productList[i].quantity)
          this.totalQuantity += Number(this.obj.productList[i].quantity)
          this.obj.productList[i].totalMoney = this.obj.productList[i].quantity * this.obj.productList[i].salePrice
          if (this.obj.productList[i].xiMaShu != null) {
            let arr = this.obj.productList[i].xiMaShu.split('/')
            for (let i = 0; i < arr.length; i++) {
              if (Number(arr[i])) {
                this.len += 1
              }
            }
          }
          this.totalMoney += Number(this.obj.productList[i].totalMoney)
          this.totalMoneyUnit = '元'
        }
      } else {
        request('/redwood/bulk/getDetail', {
          data: {
            orderNumber: this.$route.query.orderNumber
          },
          method: 'GET'
        }).then(res => {
          if (res.success === '1') {
            this.obj1 = res.obj
            console.log(this.obj1)
            for (let i = 0; i < this.obj1.order.productList.length; i++) {
              this.totalQuantity = Number(this.obj1.order.productList[i].quantity) + Number(this.totalQuantity)
              this.totalQuantityUnit = this.obj1.order.productList[i].quantityUnit
              this.obj1.order.productList[i].totalMoney = this.obj1.order.productList[i].quantity * this.obj1.order.productList[i].salePrice
              if (this.obj1.order.productList[i].xiMaShu) {
                let arr = this.obj1.order.productList[i].xiMaShu.split('/')
                console.log(arr)
                for (let i = 0; i < arr.length; i++) {
                  if (Number(arr[i])) {
                    this.len += 1
                  }
                }
              }
              this.totalMoney = Number(this.obj1.order.productList[i].totalMoney) + Number(this.totalMoney)
              this.totalMoneyUnit = '元'
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      }
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
  position: fixed;
  .printTable-box {
    width: 900px;
    margin: 10px auto;
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
      }
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
  }
}
</style>
