<template>
  <section>
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item">
            <el-select v-model="filter.buyerCompanyValue" placeholder="请选择">
              <el-option v-for="item in buyerCompanyArray" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <el-select v-model="filter.accountTypeValue" placeholder="请选择">
              <el-option v-for="item in accountTypeArray" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="item w360">
            <el-input placeholder="采购商" v-model="requestData.keyword"></el-input>
          </div>
          <el-button type="primary" @click="reqList">搜索</el-button>
        </div>
      </div>
    </div>
    <!-- <el-form :inline="true">
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-select v-model="filter.buyerCompanyValue" placeholder="请选择">
              <el-option v-for="item in buyerCompanyArray" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="filter.accountTypeValue" placeholder="请选择">
              <el-option v-for="item in accountTypeArray" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="text-align:right">
          <el-form-item>
            <el-input placeholder="采购商" v-model="requestData.keyword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="reqList">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> -->
    <div class="main-wrap">
      <div class="main-content wait-submit">
        <el-row v-if="shopList.length" v-for="(item,idx) in shopList" class="order-item" v-show="canShowBuyerShop(idx)">
          <!-- <header @click="getOrderDeatails(item,idx)">
            <span>{{item.company}}</span>
            <template v-if="item.hasOpenedBaitiao">
              <el-tooltip class="item" effect="dark" content="已开通白条" placement="top-start">
                <img width="12px" height="12px" src="../../assets/credit.png"></img>
              </el-tooltip>
            </template>
            <span>{{item.dhCount}}个大货出仓单</span>
            <span>{{item.jbCount}}个剪版单</span>
            <span>待对账总金额：&yen;{{item.totalMoney}}</span>
            <label v-if="item.hasException > 0" class="error-flag">有异常</label>
          </header> -->
          <header @click="getOrderDeatails(item,idx)">
            <div class="fl">
              <span class="green">{{item.company}}</span>
              <span v-if="item.hasOpenedBaitiao" class="baitiao">白条客户</span>
              <span v-if="item.hasException > 0" class="exception">有异常</span>
            </div>
            <div class="fr">
              <span class="count"><i class="green">{{item.dhCount}}</i> 个大货出仓单</span>
              <span class="count"><i class="green">{{item.jbCount}}</i> 个剪版单</span>
              <span class="count">待对账总金额: <i class="red">&yen;{{item.totalMoney}}</i></span>
            </div>
          </header>
          <div class="sy-order-main" v-if="item.hasDetails" v-show="item.detailsShow">
            <el-row class="mb10">
              <el-col :span="20">
                <el-checkbox v-model="item.checked" @change="handleOutReposityChange(1,item)">全选</el-checkbox>
                <span>支付总计：
              <strong>{{item.checkedTotalMoney}}元</strong>
            </span>
                <el-button type="primary" size="mini" v-if="item.showEdit" @click="handleChangeOrderEditType(item)">{{item.editType ? '保存' : '批量修改'}}</el-button>
              </el-col>
              <el-col :span="4" style="text-align:right">
                <el-button type="primary" size="mini" @click="submitAccout(item)">提交结算</el-button>
              </el-col>
            </el-row>
            <div class="sy-dh-order" v-for="(order,orderIdx) in item.orderList" v-show="canShow('orderList',idx)">
              <header>
                <el-checkbox v-model="order.checked" @change="handleOutReposityChange(2,item)"></el-checkbox>
                <span>大货单</span>
                <span>订单号：{{order.serviceNumber}}</span>
                <span>货号：{{order.productNumber }}</span>
                <span>供应商：{{order.shopCompany}}</span>
              </header>
              <table class="order-info-table table">
                <colgroup>
                  <col width="5%">
                </colgroup>
                <tbody>
                  <tr>
                    <th></th>
                    <th>出仓单号</th>
                    <th>出仓色号/数量明细</th>
                    <th>出仓销售货款</th>
                    <th>应收出仓销售货款</th>
                    <th>运费</th>
                    <th>已垫付运费</th>
                    <th>支付小计</th>
                    <th>异常原因</th>
                    <th></th>
                  </tr>
                  <tr v-for="(outReposity,outReposityIdx) in order.outReposityList">
                    <td>
                      <el-checkbox v-model="outReposity.checked" @change="handleOutReposityChange(3,item,order)"></el-checkbox>
                    </td>
                    <td>
                      {{outReposity.outReposityNumber}}
                    </td>
                    <td>
                      <el-tooltip placement="top" effect="dark">
                        <ul slot="content">
                          <li v-for="(color,idx) in outReposity.colorList">
                            色号{{idx + 1}}：{{color.color}}/{{color.quantity + color.quantityUnit}}*{{color.salePrice | formatMoney}}
                          </li>
                        </ul>
                        <span class="has-tooltip">{{renderColorListCount(outReposity.colorList)}}</span>
                      </el-tooltip>
                    </td>
                    <td>{{outReposity.saleMoney }}</td>
                    <td>
                      <template v-if="outReposity.editType">
                        <el-input size="mini" type="number" v-model.number="outReposity.needSaleMoney" @change="countCheckedTotalMoney(outReposity.checked, item)"></el-input>
                      </template>
                      <template v-else>
                        {{outReposity.needSaleMoney }}
                      </template>
                    </td>
                    <td>
                      <template v-if="outReposity.editType">
                        <el-input size="mini" type="number" v-model.number="outReposity.freightMoney" @change="countCheckedTotalMoney(outReposity.checked, item)"></el-input>
                      </template>
                      <template v-else>
                        {{outReposity.freightMoney }}
                      </template>
                    </td>
                    <td>{{outReposity.freightMoneyNoTax | formatMoney}}</td>
                    <td>{{Number(outReposity.needSaleMoney + outReposity.freightMoney).toFixed(2) }}</td>
                    <td>{{outReposity.exceptionMsg }}</td>
                    <td>
                      <el-button type="primary" size="mini" @click.native="handleChangeOutReposityEditType(item,order,outReposity)">
                        {{outReposity.editType ? '保存' : '修改'}}
                      </el-button>
                      <el-button type="primary" size="mini" @click="goDetails('dh',order)">详情</el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="sy-jb-order" v-for="(order,orderIdx) in item.cutList" v-show="canShow('cutList',idx)">
              <header>
                <el-checkbox v-model="order.checked" @change="handleOutReposityChange(2,item)"></el-checkbox>
                <span>剪版单</span>
                <span>订单号：{{order.number}}</span>
                <span>供应商：{{order.shopCompany}}</span>
              </header>
              <table class="order-info-table">
                <tr>
                  <th>剪版明细</th>
                  <th>成本货款</th>
                  <th>服务费</th>
                  <th>税费</th>
                  <th>运费</th>
                  <th>总费用</th>
                  <th>异常原因</th>
                  <th></th>
                </tr>
                <tr>
                  <td>
                    <el-tooltip placement="top" effect="dark">
                      <ul slot="content">
                        <li v-for="(product,idx) in order.productNumberList">
                          {{renderProductInfo(product,idx)}}
                        </li>
                      </ul>
                      <span class="has-tooltip">{{order.productNumberList.length + '货号' + order.productNumberList.reduce((acc,val)=>{return acc + val.colors.length}, 0) + '色号'}}</span>
                    </el-tooltip>
                  </td>
                  <td>{{order.costMoney }}</td>
                  <td>{{order.serviceMoney }}</td>
                  <td>{{order.taxMoney }}</td>
                  <td>
                    <template v-if="order.editType">
                      <el-input size="mini" type="number" v-model.number="order.freightMoney" @change="countCutOrderTotalMonet(order.checked, item, order)"></el-input>
                    </template>
                    <template v-else>
                      {{order.freightMoney}}
                    </template>
                  </td>
                  <td>{{order.totalMoney}}</td>
                  <td>{{order.exceptionMsg}}</td>
                  <td>
                    <el-button type="primary" size="mini" @click="handleChangeCutOrderEditType(item,order)">{{order.editType ? '保存' : '修改'}}</el-button>
                    <el-button type="primary" size="mini" @click="goDetails('cut',order)">详情</el-button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </el-row>
      </div>
    </div>
  </section>
</template>
<script>
import { setCache } from 'utils/tool'
import { request } from 'utils/request'
export default {
  data() {
    return {
      buyerCompanyArray: [{
        label: '全部采购商',
        value: ''
      }],
      filter: {
        buyerCompanyValue: '',
        accountTypeValue: ''
      },
      accountTypeArray: [{
          label: '全部对账类型',
          value: ''
        },
        {
          label: '只看大货单',
          value: 'orderList'
        },
        {
          label: '只看剪版单',
          value: 'cutList'
        }
      ],
      activeNames: [0],
      requestData: {
        keyword: ''
      },
      shopList: [],
    }
  },
  mounted() {
    this.reqList()
  },
  methods: {
    reqList(req) {
      this.$store.dispatch('changeload', true)
      request('/redwood/buyfollow/Order/listForPay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: this.requestData
      }).then(response => {
        this.$store.dispatch('changeload', false)
        if (response.success === '1') {
          let result = response.result
          let buyerCompanyArray = [{ label: '全部采购商', value: '' }]
          result.forEach((item, idx) => {
            item.checked = false
            item.editType = false
            item.showEdit = false
            item.show = true
            item.hasDetails = false
            item.detailsShow = true
            item.checkedTotalMoney = 0
            buyerCompanyArray.push({
              label: item.company,
              value: idx
            })
          })
          this.buyerCompanyArray = buyerCompanyArray
          this.shopList = result
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1200
          })
        }
      })
    },
    getData(activeNames) {
      activeNames.forEach((index) => {
        let currentOrder = this.shopList[index]
        if (!currentOrder.orderList) {
          this.getOrderDeatails(currentOrder.id, index)
        }
      })
    },
    getOrderDeatails(item, index) {
      if (item.hasDetails) {
        item.detailsShow = !item.detailsShow
        return false
      }
      request('/redwood/buyfollow/Order/listForPayByBuyerId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: { 'buyerId': item.id }
      }).then(response => {
        if (response.success) {
          let orderList = response.orderList
          let cutList = response.cutList
          orderList.forEach((order) => {
            order.checked = false
            order.outReposityList.forEach((outReposity) => {
              outReposity.checked = false
              outReposity.editType = false
            })
          })
          cutList.forEach((order) => {
            order.checked = false
            order.editType = false
          })
          let shopItem = JSON.parse(JSON.stringify(this.shopList[index]))
          shopItem.orderList = orderList
          shopItem.cutList = cutList
          shopItem.hasDetails = true
          this.shopList.splice(index, 1, shopItem)
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1200
          })
        }
      })
    },
    handleOutReposityChange(type, item, order) {
      let isChecked = false
      if (type === 3) {
        // 判断出仓单勾选
        order.checked = order.outReposityList.every(item => {
          return item.checked
        })
        if (order.checked) {
          isChecked = true
          item.showEdit = true
          this.handleOutReposityChange(2, item)
        } else {
          item.showEdit = this.canShowEdit(item)
        }
      } else if (type === 2) {
        // 判断大货订单、剪版订单勾选
        let orderListChecked = true
        item.orderList.forEach(order => {
          order.outReposityList.forEach(outReposityList => {
            outReposityList.checked = order.checked
          })
          if (orderListChecked && !order.checked) {
            orderListChecked = false
          }
        })
        let cutListChecked = item.cutList.every(item => {
          return item.checked
        })
        isChecked = orderListChecked || cutListChecked
        item.showEdit = this.canShowEdit(item)
        item.checked = orderListChecked && cutListChecked
        this.countCheckedTotalMoney(isChecked, item)
      } else if (type === 1) {
        // 判断顶端勾选
        let checked = item.checked
        isChecked = checked
        item.showEdit = checked
        item.orderList.forEach(order => {
          order.checked = checked
          order.outReposityList.forEach(outReposity => {
            outReposity.checked = checked
          })
        })
        item.cutList.forEach(order => {
          order.checked = checked
        })
      }
      this.countCheckedTotalMoney(true, item)
    },
    canShowEdit(item) {
      let orderListChecked = item.orderList.some(order => {
        return order.outReposityList.some(outReposity => {
          return outReposity.checked
        })
      })
      let cutListChecked = item.cutList.some(order => {
        return order.checked
      })
      return orderListChecked || cutListChecked
    },
    canShowEditType(item) {
      let orderListEditType = item.orderList.some(order => {
        return order.outReposityList.some(outReposity => {
          return outReposity.editType
        })
      })
      let cutListEditType = item.cutList.some(order => {
        return order.editType
      })
      return orderListEditType || cutListEditType
    },
    canShow(orderType, idx) {
      let result = true
      if (this.filter.buyerCompanyValue !== '') {
        result = this.filter.buyerCompanyValue === idx
      }
      if (this.filter.accountTypeValue !== '') {
        result = this.filter.accountTypeValue === orderType
      }
      return result
    },
    canShowBuyerShop(index) {
      let result = true
      if (this.filter.buyerCompanyValue !== '' && index !== this.filter.buyerCompanyValue) {
        result = false
      }
      return result
    },
    handleChangeOrderEditType(item) {
      if (item.editType) {
        for (let i = 0; i < item.orderList.length; i++) {
          let order = item.orderList[i];
          for (let j = 0; j < order.outReposityList.length; j++) {
            let reItem = order.outReposityList[j]
            if (Number(reItem.needSaleMoney) < 0) {
              this.$message.error('请输入大于零数字');
              return;
            }
            if (Number(reItem.freightMoney) < 0) {
              this.$message.error('请输入大于零数字');
              return;
            }
          }
        }
      }
      let cb = function(item) {
        if (item.editType) {
          item.orderList.forEach(order => {
            order.outReposityList.forEach(outReposity => {
              outReposity.editType = outReposity.checked
            })
          })
          item.cutList.forEach(order => {
            order.editType = order.checked
          })
        } else {
          item.orderList.forEach(order => {
            order.outReposityList.forEach(outReposity => {
              outReposity.editType = false
            })
          })
          item.cutList.forEach(order => {
            order.editType = false
          })
        }
        this.countCheckedTotalMoney(true, item)
      }
      item.editType = !item.editType
      if (item.editType) {
        cb.call(this, item)
      } else {
        this.saveMoney('item', '', item, cb.bind(this, item))
      }
    },
    handleChangeOutReposityEditType(item, order, outReposity) {
      if (outReposity.editType) {
        if (outReposity.freightMoney && Number(outReposity.freightMoney) < 0) {
          this.$message.error('请输入正确的运费')
          return false
        }
        if (outReposity.needSaleMoney && Number(outReposity.needSaleMoney) < 0) {
          this.$message.error('请输入正确的应收出仓销售货款')
          return false
        }
      }
      let cb = function(item, order, outReposity) {
        outReposity.editType = !outReposity.editType
        item.editType = this.canShowEditType(item)
        this.countCheckedTotalMoney(true, item)
      }
      if (outReposity.editType) {
        this.saveMoney('order', 'order', outReposity, cb.bind(this, item, order, outReposity))
      } else {
        cb.call(this, item, order, outReposity)
      }
    },
    handleChangeCutOrderEditType(item, order) {
      let cb = function(item, order) {
        order.editType = !order.editType
        item.editType = this.canShowEditType(item)
        this.countCheckedTotalMoney(true, item)
      }
      if (order.editType) {
        this.saveMoney('order', 'cut', order, cb.bind(this, item, order))
      } else {
        cb.call(this, item, order)
      }
    },
    countCheckedTotalMoney(isChecked, item) {
      console.log(item)
      if (isChecked) {
        let dahuoOrderTotal = item.orderList.reduce((orderAcc, orderVal) => {
          return orderAcc + orderVal.outReposityList.reduce((subAcc, subVal) => {
            return subAcc + (subVal.checked ? (subVal.freightMoney + subVal.needSaleMoney) : 0)
          }, 0)
        }, 0)
        let cutOrderTotal = item.cutList.reduce((orderAcc, orderVal) => {
          return orderAcc + (orderVal.checked ? orderVal.totalMoney : 0)
        }, 0)
        item.checkedTotalMoney = parseFloat(dahuoOrderTotal + cutOrderTotal).toFixed(2)
      }
      this.countTotalMoney(item)
    },
    countTotalMoney(item) {
      let count = 0
      count = item.orderList.reduce((acc, val) => {
        return acc + val.outReposityList.reduce((subAcc, subVal) => {
          return subAcc + (subVal.freightMoney + subVal.needSaleMoney)
        }, 0)
      }, count)
      count = item.cutList.reduce((acc, val) => {
        return acc + (val.totalMoney)
      }, count)
      item.totalMoney = Math.floor(count * 100) / 100
    },
    countCutOrderTotalMonet(isChecked, item, order) {
      order.taxMoney = Math.floor((order.costMoney + order.serviceMoney + order.freightMoney) * order.taxPoint) / 100
      order.totalMoney = Math.floor((order.costMoney + order.serviceMoney + order.freightMoney + order.taxMoney) * 100) / 100
      this.countCheckedTotalMoney(isChecked, item)
    },
    renderProductInfo(product, idx) {
      let colorStr = product.colors.map(color => {
        return `${color.color}/${(color.cutterQuantity || 0) + color.cutterQuantityUnit}*${(color.cutterPriceMoney || 0).toFixed(2)}`
      })
      return `货号${idx + 1}：${colorStr.join('、')}`
    },
    renderColorListCount(colorList) {
      let quantityCount = colorList.reduce((acc, val) => {
        return acc + val.quantity
      }, 0)
      if (colorList.length) {
        return `${colorList.length}色/${parseFloat(quantityCount).toFixed(2) + colorList[0].quantityUnit}`
      } else {
        return ''
      }
    },
    saveMoney(type, orderType, data, callback) {
      let orderList = []
      let _time = +new Date()
      if (type === 'order') {
        let orderItem
        if (orderType === 'order') {
          orderItem = {
            outReposityId: data.id,
            freightMoney: data.freightMoney,
            needSaleMoney: data.needSaleMoney
          }
        } else {
          orderItem = {
            orderId: data.id,
            freightMoney: data.freightMoney
          }
        }
        orderList.push(orderItem)
      } else {
        data.cutList.forEach(item => {
          orderList.push({
            orderId: item.id,
            freightMoney: item.freightMoney
          })
        })
        data.orderList.forEach(order => {
          order.outReposityList.forEach(outReposity => {
            orderList.push({
              outReposityId: outReposity.id,
              freightMoney: outReposity.freightMoney,
              needSaleMoney: outReposity.needSaleMoney
            })
          })
        })
      }
      request('/redwood/reposity/OutReposity/saveFreightAndNeedSaleMoney', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          orderList: orderList,
          _time
        }
      }).then(response => {
        if (response.success === '1') {
          callback()
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1200
          })
        }
      })
    },
    submitAccout(item) {
      let orderIdList = [];
      let cutlist = item.cutList.filter(order => {
        if (order.checked) {
          return order
        }
      })
      let bulklist = [];
      item.orderList.forEach(order => {
        order.outReposityList.forEach(outReposity => {
          outReposity.checked && bulklist.push({
            outReposityId: outReposity.id
          })
        })
      })
      if (cutlist.length > 0 && bulklist.length > 0) {
        this.$message.error('大货，剪版订单请分开提交')
        return false
      }
      item.orderList.forEach(order => {
        order.outReposityList.forEach(outReposity => {
          outReposity.checked && orderIdList.push({
            outReposityId: outReposity.id
          })
        })
      })
      item.cutList.forEach(order => {
        order.checked && orderIdList.push({
          orderId: order.id
        })
      })
      if (!orderIdList.length) {
        return false
      }
      setCache({
        type: 'sessionStorage',
        dataType: 'json',
        key: 'orderIdAndOutReposityIdList',
        value: orderIdList
      })
      this.$router.push({ name: 'submitChargeView' })
    },
    goDetails(type, order) {
      if (type === 'dh') {
        this.$router.push({
          name: 'orderDetail',
          query: {
            orderNumber: order.orderNumber,
            pathIndex: 8,
            columnName: 'payView'
          }
        })
      } else {
        this.$router.push({
          name: 'cutDetail',
          query: {
            id: order.id
          }
        })
      }
    }
  }
}

</script>
<style lang="scss">
// .order-info-table {
//   margin: 0 23px;
//   width: 100%;
//   text-align: center;
//   border-collapse: collapse;
//   th {
//     border-bottom: 1px dashed #999;
//     padding: 5px 0;
//   }
//   td {
//     background: #fff;
//     padding: 5px 20px;
//     width: 10%;
//     border-bottom: 1px dashed #999;
//     &:nth-child(7) {
//       color: #f00;
//     }
//   }
// }
// .sy-dh-order,
// .sy-jb-order {
//   margin-top: 20px;
//   >header {
//     >span:not(:last-child) {
//       border-right: 1px solid #666;
//       padding-right: 10px;
//       margin-right: 5px;
//     }
//   }
// }
// .error-flag {
//   color: #f00;
//   margin-left: 30px;
// }
// .order-item {
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   margin-bottom: 10px;
//   overflow: hidden;
//   padding: 10px;
//   >header {
//     cursor: pointer;
//     span:not(:first-child) {
//       border-left: 1px solid #666;
//       padding-left: 10px;
//       margin-left: 5px;
//     }
//   }
//   .sy-order-main {
//     margin-top: 10px;
//     font-size: 14px;
//   }
// }
// .has-tooltip {
//   color: #1d90e6;
//   cursor: pointer;
// }

</style>
