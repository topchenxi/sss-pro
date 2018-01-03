<template>
  <div>
    <div class="block-title">订单基本信息 <el-button type="primary" size="mini" @click.native="getHistory">历史时刻表</el-button></div>
    <table class='custom-table'>
      <tr>
        <td>订单号： {{newOrderDetail.serviceNumber}}</td>
        <td>发布时间： {{newOrderDetail.createTime | convertTime}}</td>
        <td>大货类型： {{newOrderDetail.type == 1 ? '服务单 ' : '贸易单'}}</td>
      </tr>
      <tr>
        <td>验货： {{newOrderDetail.checkCloth == 1 ? '验货' : '不验货'}}</td>
        <td>实版： {{newOrderDetail.haveRealVersion == 1 ? '有实版' : '无实版'}}</td>
        <td>期望货期： {{newOrderDetail.expectedTime | convertTime}}</td>
      </tr>
      <tr>
        <td>采购商： {{newOrderDetail.company}}</td>
        <td>采购商发票： {{newOrderDetail.invoiceStatus == 1 ? '需要' : '不需要'}}</td>
        <td>结算周期：{{newOrderDetail.billingCycle}}</td>
      </tr>
      <tr v-if="newOrderDetail.seller">
        <td>供应商： {{ newOrderDetail.seller.company}}</td>
        <td>档口电话： {{newOrderDetail.seller.tel}}</td>
        <td>详细地址： {{newOrderDetail.seller.province}}{{newOrderDetail.seller.city}}{{newOrderDetail.seller.area}}{{newOrderDetail.seller.addr}}</td>
      </tr>
      <tr v-if="newOrderDetail.sellerBankAccount">
        <td>银行账号开户名： {{newOrderDetail.sellerBankAccount.type == 1 ? newOrderDetail.sellerBankAccount.company : newOrderDetail.sellerBankAccount.realName}}</td>
        <td>银行卡卡号： {{newOrderDetail.sellerBankAccount.number}}</td>
        <td>银行名称： {{newOrderDetail.sellerBankAccount.bank}}</td>
      </tr>
      <tr v-if="newOrderDetail.sellerBankAccount">
        <td>账户类型： {{newOrderDetail.sellerBankAccount.type == 1 ? '企业' : '个人'}}</td>
        <td>开户支行： {{newOrderDetail.sellerBankAccount.branch}}</td>
        <td>供应商发票： {{newOrderDetail.sellerInvoiceStatus == 1 ? '提供' : '不提供'}}</td>
      </tr>
      <tr>
        <td colspan="3">是否需要付款给供应商: {{newOrderDetail.needToPaySeller == 0 ? '不需要' : '需要'}}</td>
      </tr>
    </table>

    <div class="block-title">颜色及数量</div>
    <table class='custom-table'>
      <tr>
        <td>货号： {{newOrderDetail.productNumber}}</td>
        <td :colspan="buyerRole?4:3">单位： {{newOrderDetail.productList && newOrderDetail.productList.length ? newOrderDetail.productList[0].quantityUnit : ''}}</td>
        <td>
          <el-row>
            <el-col :span="12">
              税点： {{newOrderDetail.taxPoint}}%
            </el-col>
            <el-col v-if="newOrderDetail.type == 1" :span="12">
              服务费单价： {{newOrderDetail.servicePrice}}{{newOrderDetail.servicePriceUnit}}
            </el-col>
          </el-row>
        </td>
      </tr>
      <tr>
        <td class="no-right-border" style="color: #8e8e8e;">色号</td>
        <td style="color: #8e8e8e;">采购数量</td>
        <td style="color: #8e8e8e;">销售单价</td>
        <td style="color: #8e8e8e;">采购单价</td>
        <td style="color: #8e8e8e;" v-if="buyerRole">成本单价</td>
        <td style="color: #8e8e8e;">客户设计款号</td>
        <!-- <td style="color: #8e8e8e;">客户设计款号</td>
          <td style="color: #8e8e8e;">操作</td> -->
      </tr>

      <tr v-for="(item, index) in newOrderDetail.productList">
        <td class="no-right-border">{{item.color}}</td>
        <td>{{item.quantity | convertNumber}}{{item.quantityUnit}}</td>
        <td>{{item.salePrice | convertNumber}}{{item.salePriceUnit}}</td>
        <td>{{item.buyPrice | convertNumber}}{{item.buyPriceUnit}}</td>
        <td v-if="buyerRole">{{item.price | convertNumber}}{{item.priceUnit}}</td>
        <td>
          <el-row type="flex" align="middle">
            <el-col>
              <template v-if='item.editStatus'>
                <el-input size="small" v-model="item.outMaZhiRemark" :maxlength="20"></el-input>
              </template>
              <template v-else>
                {{item.outMaZhiRemark}}
              </template>
            </el-col>
            <el-col>
              <el-button type="text" style="margin-left:10px" @click="saveEdit(item, index, newOrderDetail.orderNumber)">
                {{item.editStatus ? '保存': (item.outMaZhiRemark ? '编辑客户设计款号' : '新建客户设计款号')}}
              </el-button>
            </el-col>
          </el-row>
        </td>
      </tr>

    </table>
    <!-- <div class="block-title">跟单备注</div>
    <p style="border:1px solid #ccc;margin-bottom:20px;padding:10px">{{orderDetail.leaveMessage}}</p> -->
    <el-dialog title="历史任务列表" v-model="$store.state.b.popLoad" size="tiny">
      <div class="history-list">
        <ul>
          <li v-for="item in historyList">
            <div class="circle"></div>
            <div class="history-content">
              {{item.preHandlerRoleName}}{{item.preHandler}}&nbsp;&nbsp;{{item.preHandlerAction}}
            </div>
            <div class="history-time">
              {{item.createTime | convertTime}}
            </div>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AuthSub from 'utils/subNav'
import {
  // setCache,
  formatTimeString,
  newRequest
} from 'utils/tool'
import Api from 'api/reposity'
export default {
  props: ['orderDetail', 'yesNotRequest'],
  data() {
    return {
      newOrderDetails: {},
      historyList: []
    };
  },
  mounted() {
    if (this.yesNotRequest) {
      this.getDetail()
    }
  },
  computed: {
    buyerRole() {
      return new AuthSub().buyerRole()
    },
    newOrderDetail() {
      if (this.yesNotRequest) {
        return this.newOrderDetails
      } else {
        return this.orderDetail
      }
    }
  },
  filters: {
    convertTime(val) {
      return val ? formatTimeString(val) : '--'
    },
    convertNumber(val) {
      return Number(val).toFixed(2)
    }
  },
  methods: {
    getDetail() {
      this.$store.dispatch('changeload', true)
      newRequest({
        url: Api.getDhDetail,
        contentType: 'application/json',
        data: {
          orderNumber: this.$route.query.orderNumber
        }
      }).then(data => {
        this.$store.dispatch('changeload', false)
        if (data.success === '1') {
          this.newOrderDetails = data.obj
          data.obj.productList.forEach((item) => {
            item.editStatus = false
          })
        } else {
          this.$message({
            type: 'error',
            message: data.msg,
            duration: 1000
          })
        }
      })
    },
    saveEdit(item, index, orderNumber) {
      if (!item.editStatus) {
        item.editStatus = !item.editStatus
        return
      }
      const obj = {
        id: item.id,
        outMaZhiRemark: item.outMaZhiRemark
      }
      this.$store.dispatch('changeload', true)
      newRequest({
        url: Api.updateOutMaZhiRemark,
        method: 'post',
        contentType: 'application/json',
        data: obj
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          item.editStatus = !item.editStatus
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    getHistory () {
      this.$store.dispatch('changePopLoad', true)
      if (this.historyList.length == 0) {
        newRequest({
          url: Api.getTaskList,
          method: 'get',
          data: {
            time: new Date().getTime(),
            orderNumber: this.$route.query.orderNumber
          }
        }).then(response => {
          if (response.success == 1) {
            this.historyList = response.result
          } else {
            this.$alert({
              type: 'error',
              message: response.msg,
              duration: 1000,
              onClose: () => {
                this.$store.dispatch('changePopLoad', false)
              }
            })
          }
        })
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.block-title {
  margin-top: 10px;
  margin-bottom: 5px;
}

.custom-table {
  width: 100%;
  border-spacing: 0;
  border: 1px solid #ccc;
  border-bottom: 0;
  border-right: 0;
  border-collapse: separate;
  table-layout: fixed;
  text-align: left;
  margin-bottom: 20px;
  th {
    white-space: nowrap;
    overflow: hidden;
    background-color: #EFF2F7;
    height: 20px;
    min-width: 0;
    line-height: 40px;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    color: #1f2d3d;
    padding: 0 10px;
    &.pro-info {
      min-width: 120px;
    }
  }
  tr {
    height: 30px;
  }
  th.w1 {
    width: 10%;
  }
  th.w2 {
    width: 20%;
  }
  th.w3 {
    width: 100px;
  }
  th.w4 {
    width: 110px;
  }
  .color-list {
    min-width: 200px;
    span {
      display: inline-block;
      width: 24%;
      text-align: center;
    }
  }
  .no-right-border {
    border-right: none;
  }
  td {
    padding: 0 10px;
    font-size: 14px;
    position: relative;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    min-width: 0;
    min-width: 100px;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    &.pro-info {
      padding: 10px;
      line-height: 16px;
      .pro-info-left {
        .name {
          width: 150px;
          padding: 15px;
          margin-bottom: 5px;
          text-align: center;
        }
      }
      .pro-info-right {
        padding-left: 20px;
        .status {
          margin-top: 20px;
        }
      }
    }
  }
}

.border {
  border-radius: 4px;
  border: 1px dotted #3c8dbc;
  padding: 5px;
}

.history-list {
    padding: 10px;
    max-height: 520px;
    overflow: auto;
    ul {
      li {
        border-left: 1px solid #ccc;
        padding-left: 5px;
        padding-bottom: 10px;
        .circle {
          border: 1px solid #ccc;
          border-radius: 50%;
          width: 0.8rem;
          height: 0.8rem;
          display: inline-block;
          position: relative;
          top: -5px;
          left: -12px;
          background-color: #ccc;
        }

        .history-content {
          width: 100%;
          display: inline-block;
          line-height: 25px;
          position: relative;
          top: -5px;
          padding-left: 15px;
        }
        .history-time {
          margin-left:15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #ccc;
        }
      }
    }
}
</style>
