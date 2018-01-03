<template>
  <section v-loading.body="fullscreenLoading">
    <i @click="goback" class="el-icon-arrow-left" style="color:#333;cursor:pointer">返回</i>
    <div class="message-content">
      <el-row :gutter="20">
        <el-col :span="2">
          <h4>退换货信息：</h4>
        </el-col>
        <el-col :span="8" style="text-align:left">
          <span style="margin-top: 10px;margin-bottom: 10px;">退换货申请时间：{{obj.createTime | formatTime}}</span>
        </el-col>
      </el-row>
      <table border="1">
        <tbody>
          <tr>
            <td width="25%">退换货单号：{{obj.number}}</td>
            <td width="25%">退换货类型
              <template v-if="obj.type == 1">售前退货</template>
              <template v-if="obj.type == 2">售前换货</template>
              <template v-if="obj.type == 3">售后退货</template>
              <template v-if="obj.type == 4">售后换货</template>
            </td>
            <td width="25%">
              <template v-if="obj.type == 1 || obj.type == 3">退货原数：{{obj.quantity | formateNumber}}{{obj.quantityUnit}}</template>
              <template v-if="obj.type == 2 || obj.type == 4">换货原数：{{obj.quantity | formateNumber}}{{obj.quantityUnit}}</template>
            </td>
            <td width="25%">
              <template v-if="obj.type == 1 || obj.type == 3">退货实数：{{obj.realQuantity | formateNumber}}{{obj.realQuantityUnit}}</template>
              <template v-if="obj.type == 2 || obj.type == 4">换货实数：{{obj.realQuantity | formateNumber}}{{obj.realQuantityUnit}}</template>
            </td>
          </tr>
          <tr>
            <td>
              <template v-if="obj.type < 3">入仓单号：{{obj.inReposityNumber}}</template>
              <template v-if="obj.type > 2">出仓单号：{{obj.outReposityNumber}}</template>
            </td>
            <td>当前状态：
              <span style="color:#2FB468">{{obj.statusDescr}}</span>
            </td>
            <template v-if="obj.type == 2 || obj.type == 4">
              <td>现采购数：{{obj.needBuyQuantity | formateNumber}}{{obj.needBuyQuantityUnit}}</td>
              <td>采购员退货备注：{{obj.guiderRemark}}</td>
            </template>
            <template v-if="obj.type == 1 || obj.type == 3">
              <td colspan="2">采购员退货备注：{{obj.guiderRemark}}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="detail-content">
      <template v-if="obj.type == 1 || obj.type == 3">
        <h4>退货明细：</h4>
      </template>
      <template v-if="obj.type == 4 || obj.type == 2">
        <h4>换货明细：</h4>
      </template>
      <table border="1">
        <tr>
          <th></th>
          <th>色号</th>
          <template v-if="obj.type == 1 || obj.type == 3">
            <th>退货实数</th>
          </template>
          <template v-if="obj.type == 2 || obj.type == 4">
            <th>换货实数</th>
          </template>
          <template v-if="obj.type == 2 || obj.type == 4">
            <th>现采购数</th>
          </template>
          <th>匹号</th>
          <th>入仓实数</th>
          <th>实际布长</th>
          <th>验布结果</th>
        </tr>
        <template v-for="(item, index) in obj.beforeList">
          <tr :key="index">
            <td v-if="index == 0 && (obj.type == 1 || obj.type == 3)" :rowspan="blen - 1" style="background-color:#2fb468">退前</td>
            <td v-if="index == 0 && (obj.type == 2 || obj.type == 4)" :rowspan="blen - 1" style="background-color:#2fb468">换前</td>
            <td :rowspan="item.clothLoneList.length + 2">{{item.color}}</td>
            <td :rowspan="item.clothLoneList.length + 2">{{item.realQuantity}}{{item.realQuantityUnit}}</td>
            <td v-if="obj.type == 2 || obj.type == 4" :rowspan="item.clothLoneList.length + 2">{{item.needBuyQuantity}}{{obj.needBuyQuantityUnit}}</td>
            <tr v-for="(color, index1) in item.clothLoneList" :key="index1">
              <td>{{color.number}}</td>
              <td>{{color.quantity | formateNumber}}{{color.quantityUnit}}</td>
              <td>{{color.buchang | formateNumber}}{{color.buchangUnit}}</td>
              <td style="color: #2fb468">{{color.checkFlaws}}</td>
            </tr>
            <tr :key="index" style="background-color: #f2f2f2">
              <td>{{item.totalPi}}匹</td>
              <td>{{item.totalRucang | formateNumber}}{{item.totalRucangUnit}}</td>
              <td>{{item.totalBuchang | formateNumber}}{{item.totalBuchangUnit}}</td>
              <td></td>
            </tr>
          </tr>
        </template>
        <template v-if="blen && (obj.type == 2 || obj.type == 4)">
          <template v-for="(item, index) in obj.afterList">
            <tr :key="index">
              <td v-if="index == 0 " :rowspan="alen - 1" style="background-color:#f5a623">换后</td>
              <td :rowspan="item.clothLoneList.length + 2">{{item.color}}</td>
              <td :rowspan="item.clothLoneList.length + 2">{{item.realQuantity}}{{item.realQuantityUnit}}</td>
              <td v-if="obj.type == 2 || obj.type == 4" :rowspan="item.clothLoneList.length + 2">{{item.needBuyQuantity}}{{obj.needBuyQuantityUnit}}</td>
              <tr v-for="(color, index1) in item.clothLoneList" :key="index1">
                <td>{{color.number}}</td>
                <td>{{color.quantity | formateNumber}}{{color.quantityUnit}}</td>
                <td>{{color.buchang | formateNumber}}{{color.buchangUnit}}</td>
                <td style="color: #2fb468">{{color.checkFlaws}}</td>
              </tr>
              <tr :key="index" style="background-color: #f2f2f2">
                <td>{{item.totalPi}}匹</td>
                <td>{{item.totalRucang | formateNumber}}{{item.totalRucangUnit}}</td>
                <td>{{item.totalBuchang | formateNumber}}{{item.totalBuchangUnit}}</td>
                <td></td>
              </tr>
            </tr>
          </template>
        </template>
      </table>
    </div>
  </section>
</template>

<script>
import { newRequest } from 'common/utils'
export default {
  data() {
    return {
      fullscreenLoading: false,
      obj: {},
      blen: 0,
      alen: 0,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/returnreplace/getById',
        method: 'get',
        data: {
          id: this.$route.query.id
        }
      }).then(res => {
        if (res.success == 1) {
          this.obj = res.obj
          this.blen = 0
          if (this.obj.beforeList && this.obj.beforeList.length) {
            this.blen = 1
            this.obj.beforeList.map(item => {
              if (item.clothLoneList && item.clothLoneList.length) {
                this.blen += item.clothLoneList.length + 2
                this.$set(item, 'totalPi', item.clothLoneList.length)
                this.$set(item, 'totalRucang', 0)
                this.$set(item, 'totalRucangUnit', '')
                this.$set(item, 'totalBuchang', 0)
                this.$set(item, 'totalBuchangUnit', '')
                item.clothLoneList.map(color => {
                  item.totalRucang += Number(color.quantity)
                  item.totalRucangUnit = color.quantityUnit
                  item.totalBuchang += Number(color.buchang)
                  item.totalBuchangUnit = color.buchangUnit
                })
              }
            })
          }
          this.alen = 0
          if (this.obj.afterList && this.obj.afterList.length) {
            this.alen = 1
            this.obj.afterList.map(item => {
              if (item.clothLoneList && item.clothLoneList.length) {
                this.alen += item.clothLoneList.length + 2
                this.$set(item, 'totalPi', item.clothLoneList.length)
                this.$set(item, 'totalRucang', 0)
                this.$set(item, 'totalBuchang', 0)
                item.clothLoneList.map(color => {
                  item.totalRucang += color.quantity
                  item.totalBuchang += color.buchang
                })
              }
            })
          }
        } else {
          this.$message.error(res.msg)
        }
        this.fullscreenLoading = false
      })
    },
    goback() {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.message-content {
  margin-top: 10px;
  padding: 15px;
  background-color: #fff;
  h4 {
    font-size: 15px;
  }
  table {
    margin-top: 10px;
    border-collapse: collapse;
    width: 100%;
    border: 0px;
    td {
      padding: 10px;
      border: 1px solid #bbb;
      word-break: break-all;
    }
  }
}

.detail-content {
  margin-top: 10px;
  padding: 15px;
  background-color: #fff;
  h4 {
    font-size: 15px;
  }
  table {
    text-align: center;
    margin-top: 10px;
    border-collapse: collapse;
    width: 75%;
    border: 0px;
    th {
      padding: 10px;
      border: 1px solid #bbb;
      word-break: break-all;
    }
    td {
      padding: 10px;
      border: 1px solid #bbb;
      word-break: break-all;
    }
  }
}
</style>
