<template>
  <section>
    <template v-if="status == 1">
      <div class="guider-print-wrap">
        <table>
          <colgroup>
            <!-- 货号 -->
            <col width="5%">
            <!-- 色号 -->
            <col width="5%">
            <!-- 1 -->
            <col width="3%">
            <col width="3%">
            <col width="3%">
            <col width="3%">
            <col width="3%">
            <col width="3%">
            <col width="3%">
            <col width="3%">
            <col width="3%">
            <col width="3%">
            <!-- 10 -->
            <col width="7%">
            <!-- 采购数量 -->
            <col width="8%">
            <!-- 销售单价 -->
            <col width="5%">
            <!-- 金额 -->
          </colgroup>
          <thead>
            <tr>
              <th colspan="15">
                <span class="title">搜芽码单</span>
                <div class="print-btn fr">
                  <el-button :plain="true" type="success" size="small" @click.native="handlePrint">打印</el-button>
                </div>
              </th>
            </tr>
            <tr>
              <td colspan="10">
                <span class="bold">档口名称:</span>
                <template v-if="obj.needSoouyaMadan==1">
                  {{shopObj.company}}
                </template>
                <template v-else>
                  {{obj.shopCompany}}
                </template>
              </td>
              <td colspan="5">
                <span class="bold">订单日期:</span> {{obj.createTime | date}}
              </td>
            </tr>
            <tr>
              <td colspan="10">
                <span class="bold">档口地址:</span>
                <template v-if="obj.needSoouyaMadan==1">
                  {{shopObj.province}}{{shopObj.city}}{{shopObj.area}}{{shopObj.addr}}
                </template>
                <template v-else>
                  {{obj.shopProvince}}{{obj.shopCity}}{{obj.shopArea}}{{obj.shopAddr}}
                </template>
              </td>
              <td colspan="5">
                <span class="bold">订单号:</span> {{obj.serviceNumber}}
              </td>
            </tr>
            <tr>
              <td colspan="10">
                <span class="bold">档口电话:</span>
                <template v-if="obj.needSoouyaMadan==1">
                  {{shopObj.tel}}
                </template>
                <template v-else>
                  {{obj.shopTel}}
                </template>
              </td>
              <td colspan="5">
                <span class="bold">采购商名称:</span> {{obj.customerCompany}}
              </td>
            </tr>
            <tr class="bg">
              <th>货号</th>
              <th>色号</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8</th>
              <th>9</th>
              <th>10</th>
              <th>采购数量 ({{obj.unit}})
              </th>
              <th>销售单价 ({{obj.priceUnit}})
              </th>
              <th>金额(元)</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in obj.productList">
              <tr>
                <td :rowspan="numberLen" v-if="index==0">{{obj.productNumber}}</td>
                <tr v-for="(colItem,colIndex) in item.colspanArray" :key="colIndex">
                  <td v-if="colIndex==0" :rowspan="item.colspanArray.length">{{item.color}}</td>
                  <td v-if="sizeIndex>=colIndex*10&&sizeIndex<(colIndex+1)*10" v-for="(sizeItem,sizeIndex) in item.ximaArray" :key="sizeIndex">
                    {{sizeItem}}
                  </td>
                  <td v-if="colIndex==0" :rowspan="item.colspanArray.length">{{item.quantity | formatMoney}}</td>
                  <td v-if="colIndex==0" :rowspan="item.colspanArray.length">{{item.salePrice | formatMoney}}</td>
                  <td v-if="colIndex==0" :rowspan="item.colspanArray.length">{{item.totalMoney | formatMoney}}</td>
                </tr>
              </tr>
            </template>
            <tr>
              <td>合计</td>
              <td>{{obj.productList.length}}个色号</td>
              <td colspan="10">共{{len}}匹</td>
              <td>{{totalQuantity | formatMoney}}{{obj.unit}}</td>
              <td colspan="2">
                <div v-if="obj.productSource == 0">
                  总金额(元): <strong>{{obj.saleMoney | formatMoney}}</strong>
                </div>
                <div v-else>
                  <template v-if="obj.earnestMoney">
                    销售订金(元): <strong>{{obj.earnestMoney | formatMoney}}</strong>
                  </template>
                  <template v-if="obj.finalMoney">
                    销售尾款(元): <strong>{{obj.finalMoney | formatMoney}}</strong>
                  </template>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="15" class="info">
                <i>销售员: </i>
                <span>{{obj.salesName}}</span>
              </td>
            </tr>
            <tr>
              <td colspan="15">
                备注:请核对本单后验收，如发现质量问题，应于交货之日起五天内与本公司联系，协商解决；一经裁剪或超出本期限，本公司概不负责；看布购货，非质量问题，恕不退换，谢谢合作！
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template v-else>
      <div class="printTable-box">
        <div class="guider-print-wrap">
          <table>
            <colgroup>
              <!-- 货号 -->
              <col width="5%">
              <!-- 色号 -->
              <col width="5%">
              <!-- 1 -->
              <col width="3%">
              <col width="3%">
              <col width="3%">
              <col width="3%">
              <col width="3%">
              <col width="3%">
              <col width="3%">
              <col width="3%">
              <col width="3%">
              <col width="3%">
              <!-- 10 -->
              <col width="7%">
              <!-- 采购数量 -->
              <col width="8%">
              <!-- 销售单价 -->
              <col width="5%">
              <!-- 金额 -->
            </colgroup>
            <thead>
              <tr>
                <th colspan="15">
                  <span class="title">搜芽码单</span>
                  <div class="print-btn fr">
                    <el-button :plain="true" type="success" size="small" @click.native="handlePrint">打印</el-button>
                  </div>
                </th>
              </tr>
              <tr>
                <td colspan="10">
                  <span class="bold">档口名称:</span>
                  <template v-if="obj1.order.needSoouyaMadan==1">
                    {{shopObj.company}}
                  </template>
                  <template v-else>
                    {{obj1.order.shopCompany}}
                  </template>
                </td>
                <td colspan="5">
                  <span class="bold">订单日期:</span> {{obj1.order.createTime | date}}
                </td>
              </tr>
              <tr>
                <td colspan="10">
                  <span class="bold">档口地址:</span>
                  <template v-if="obj1.order.needSoouyaMadan==1">
                    {{shopObj.province}}{{shopObj.city}}{{shopObj.area}}{{shopObj.addr}}
                  </template>
                  <template v-else>
                    {{obj1.order.shopProvince}}{{obj1.order.shopCity}}{{obj1.order.shopArea}}{{obj1.order.shopAddr}}
                  </template>
                </td>
                <td colspan="5">
                  <span class="bold">订单号:</span> {{obj1.order.serviceNumber}}
                </td>
              </tr>
              <tr>
                <td colspan="10">
                  <span class="bold">档口电话:</span>
                  <template v-if="obj1.order.needSoouyaMadan==1">
                    {{shopObj.tel}}
                  </template>
                  <template v-else>
                    {{obj1.order.shopTel}}
                  </template>
                </td>
                <td colspan="5">
                  <span class="bold">采购商名称:</span> {{obj1.order.customerCompany}}
                </td>
              </tr>
              <tr class="bg">
                <th>货号</th>
                <th>色号</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
                <th>10</th>
                <th>采购数量 ({{obj1.order.unit}})
                </th>
                <th>销售单价 ({{obj1.order.salePriceUnit}})
                </th>
                <th>金额(元)</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in obj1.order.productList">
                <tr>
                  <td :rowspan="numberLen" v-if="index==0">{{obj1.order.productNumber}}</td>
                  <tr v-for="(colItem,colIndex) in item.colspanArray" :key="colIndex">
                    <td v-if="colIndex==0" :rowspan="item.colspanArray.length">{{item.color}}</td>
                    <td v-if="sizeIndex>=colIndex*10&&sizeIndex<(colIndex+1)*10" v-for="(sizeItem,sizeIndex) in item.ximaArray" :key="sizeIndex">
                      {{sizeItem}}
                    </td>
                    <td v-if="colIndex==0" :rowspan="item.colspanArray.length">{{item.quantity | formatMoney}}</td>
                    <td v-if="colIndex==0" :rowspan="item.colspanArray.length">{{item.salePrice | formatMoney}}</td>
                    <td v-if="colIndex==0" :rowspan="item.colspanArray.length">{{item.totalMoney | formatMoney}}</td>
                  </tr>
                </tr>
              </template>
              <tr>
                <td>合计</td>
                <td>{{obj1.order.productList.length}}个色号</td>
                <td colspan="10">共{{len}}匹</td>
                <td>{{totalQuantity | formatMoney}}{{obj1.order.unit}}</td>
                <td colspan="2">
                  <div v-if="obj1.order.productSource == 0">
                    总金额(元): <strong>{{obj1.order.saleMoney | formatMoney}}</strong>
                  </div>
                  <div v-else>
                    <template v-if="obj1.order.earnestMoney">
                      销售订金(元): <strong>{{obj1.order.earnestMoney | formatMoney}}</strong>
                    </template>
                    <template v-if="obj1.order.finalMoney">
                      销售尾款(元): <strong>{{obj1.order.finalMoney | formatMoney}}</strong>
                    </template>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="15" class="info">
                  <i>销售员: </i>
                  <span>{{obj1.order.salesName}}</span>
                </td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </section>
</template>
<script>
import { newRequest } from 'utils/tool'
export default {
  data() {
    return {
      numberLen: 0,
      len: 0,
      status: 1,
      totalQuantity: 0,
      obj: {
        productList: []
      },
      shopObj: {},
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
    this.$store.dispatch('changeload', false)
    this.getShop();
    this.getData();
  },
  methods: {
    getData() {
      this.len = 0
      if (this.status == 1) {
        this.totalQuantity = 0
        this.obj = JSON.parse((sessionStorage.guiderSalesTable))
        console.log(this.obj.needSoouyaMadan);
        this.obj.productList.forEach(item => {
          // 计算色号金额
          this.totalQuantity += Number(item.quantity);
          // 计算总采购数量
          item.totalMoney = item.quantity * item.salePrice;
          this.$set(item, 'colspanArray', []);
          this.$set(item, 'ximaArray', []);
          if (item.xiMaShu != null) {
            item.ximaArray = item.xiMaShu.split('/').filter(xm => !!xm);
            let colspan = Math.ceil(item.ximaArray.length / 10);
            item.colspanArray = Array.from(Array(colspan || 1).keys());
            this.numberLen += colspan + 1;
            // 补全整十
            for (let i = item.ximaArray.length; i < colspan * 10; i++) {
              item.ximaArray.push('');
            }
            // 计算总匹数
            this.len += item.ximaArray.filter(xm => !!Number(xm)).length;
          } else {
            item.colspanArray = Array.from(Array(1).keys());
            // 构建一个长度为10的空数组
            item.ximaArray = '          '.split('');
            this.numberLen += 2;
          }
        })
      } else {
        newRequest({
          url: '/redwood/bulk/getDetail',
          data: {
            orderNumber: this.$route.query.orderNumber
          },
          contentType: 'application/json',
          method: 'get'
        }).then(res => {
          if (res.success == 1) {
            res.obj.order.salePriceUnit = '';
            this.obj1 = res.obj;
            console.log(this.obj1.order.needSoouyaMadan);
            for (let i = 0; i < this.obj1.order.productList.length; i++) {
              let item = this.obj1.order.productList[i];
              if (i == 0) {
                this.obj1.order.salePriceUnit = item.salePriceUnit;
              }
              this.totalQuantity += Number(item.quantity)
              item.totalMoney = item.quantity * item.salePrice
              this.$set(item, 'colspanArray', []);
              this.$set(item, 'ximaArray', []);
              if (item.xiMaShu != null) {
                let arr = item.xiMaShu.split('/')
                let colspan = Math.ceil(arr.length / 10);
                item.ximaArray = arr;
                for (let i = arr.length; i < colspan * 10; i++) {
                  arr.push('');
                }
                this.numberLen += colspan + 1;
                item.colspanArray = Array.from(Array(colspan || 1).keys());
                for (let i = 0; i < arr.length; i++) {
                  if (Number(arr[i])) {
                    this.len += 1
                  }
                }
              } else {
                item.colspanArray = Array.from(Array(1).keys());
                item.ximaArray = '          '.split('');
                this.numberLen += 1 + 1;
              }
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    getShop() {
      newRequest({
        url: '/soouya/ziying/shop/5de95631-b4c7-481f-8d12-138084342890',
        contentType: 'application/json',
        method: 'get'
      }).then(res => {
        if (res.success === '1') {
          this.shopObj = res.obj;
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    handlePrint() {
      window.print()
    },
  }
}

</script>
<style lang="scss" scoped>
@media print {
  .print-btn {
    display: none !important;
  }
}

.guider-print-wrap {
  width: 1000px;
  margin: 0 auto;
  padding-top: 40px;
  .info {
    text-align: right;
    i {
      font-style: normal;
      display: inline-block;
      width: 60px;
      text-align: right;
      margin-right: 5px;
    }
    span {
      display: inline-block;
      min-width: 60px;
      text-align: left;
    }
  }
  >table {
    background-color: #fff;
    width: 100%;
    thead {
      .bg {
        background-color: #f0f0f0;
      }
      tr {
        th {
          font-size: 14px;
          font-weight: bold;
          padding: 10px;
          text-align: center;
          border: 1px solid #ddd;
        }
        td {
          font-size: 12px;
          padding: 10px 4px;
          text-align: left;
          border: 1px solid #ddd;
        }
        .title {
          font-size: 25px;
        }
      }
    }
    tbody {
      tr {
        td {
          font-size: 12px;
          padding: 10px 4px;
          text-align: center;
          border: 1px solid #ddd;
        }
      }
    }
  }
}

</style>
