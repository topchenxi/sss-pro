<template>
  <div class="content box">
    <h4 style="display: inline-block">出仓信息</h4>
    <el-select v-model="checkCloth" placeholder="请选择" style="display: inline-block; width: 160px;" @change="selectPiHao">
      <el-option label="全部出仓单" value="0">全部出仓单</el-option>
      <el-option :label="item.number" :value="item.number" v-for="item in outReposityList" :key="item.number"></el-option>
    </el-select>
    <!-- <span style="display: inline-block; padding-left: 15px; color: red;" v-if="totalCompare != 0">温馨提示：出仓总数比入仓总数{{totalCompare}}</span> -->
    <table class="custom-table" style="margin-top: 15px;">
      <tr>
        <th>匹号信息</th>
        <th>成本单价</th>
        <th>销售单价</th>
        <th>出仓实数</th>
        <th>实际布长</th>
        <th>出仓时间</th>
        <th>出仓类型</th>
      </tr>
      <template v-for="item in result">
        <tr v-for="value in item.clothLoneList" :key="value.number">
          <td>
            <p>匹号：{{value.number}}</p>
            <p>色号：{{value.color}}</p>
            <el-popover trigger="hover" placement="top">
              <div class="pop-content" style="width: 400px;">
                <p>出仓单号: {{ item.number}}</p>
                <p>通知出仓时间: {{ item.createTime | formateTime}}</p>
                <p>指派出仓时间: {{ item.assignTime | formateTime}}</p>
                <p>发货时间: {{ item.outTime | formateTime}}</p>
                <p>出仓人: {{ item.outReposityRealName }}</p>
                <p>出仓明细: {{ item.outReposityDetail }}</p>
                <p>配送方式: {{ item.sendTypeStr }}</p>
                <p>客户名称: {{item.buyerCompany}}</p>
                <p>收货信息: {{item.contactName}}/{{item.contactTel}}</p>
                <p>收货地址: {{ item.province }}{{ item.city }}{{ item.area }}{{ item.addr }}</p>
                <p>出仓备注: {{ item.remark }}</p>
                <p>
                  <label>物流凭据: </label>
                  <article class="media" v-if='item.sendCertificateList && item.sendCertificateList.length'>
                    <a :href="'http://test.soouya.com'+val" class="image media-left is-64x64" v-lightbox="item.sendCertificateList" :key="index" v-for="(val, index) in item.sendCertificateList">
                      <img :src="'http://test.soouya.com'+val+'@200h_200w_1e'" alt="Image" width="60" height="60">
                    </a>
                  </article>
                </p>
              </div>
              <div slot="reference" class="name-wrapper" style="text-align: left;">
                <el-button type='text' size="small">出仓信息</el-button>
              </div>
            </el-popover>
          </td>
          <td>{{value.costPrice | formateNumber}}{{value.costPriceUnit}}</td>
          <td>{{value.salePrice | formateNumber}}{{value.salePriceUnit}}</td>
          <td>{{value.quantity | formateNumber}}{{value.quantityUnit}}</td>
          <td>{{value.buchang | formateNumber}}{{value.buchangUnit}}</td>
          <td>{{item.createTime | formatDate}}</td>
          <td>{{item.outType | formateText}}</td>
        </tr>
      </template>
      <tr>
        <td colspan="7" align="right">
          <span>出仓总数：{{totalInrepo}}</span>
          <template v-if="outReposityInfo">
            <span>出仓销售货款：{{totalSaleMoney}}元</span>
            <span>运费：{{totalFreight}}元</span>
          </template>
          <span v-if="freightMoneyNoTax || outReposityInfo">仓库运费：{{totalFreightNoTax}}元</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss">
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
  tr {
    height: 35px;
  }
  .color-list {
    min-width: 200px;
    span {
      display: inline-block;
      width: 32%;
      text-align: center;
    }
  }
  .no-right-border {
    border-right: none;
  }
  td {
    padding: 5px 10px;
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
    label {
      display: inline-block;
      vertical-align: top;
      line-height: 40px;
    }
    span {
      padding-right: 10px;
    }
    p {
      display: inline-block;
      padding-right: 10px;
    }
    .imgShow {
      display: inline-block;
    }
  }
}
.pop-content {
  min-width: 200px;
  p {
    line-height: 25px;
  }
}
</style>
<script>
import {
  formatTimeString,
} from 'src/common/utils.js'
export default {
  props: ['outReposityList', 'outNumber', 'freight', 'outData', 'inReposityList'],
  data() {
    return {
      result: [],
      checkCloth: '0',
    }
  },
  mounted() {
    if (this.outReposityNumber) {
      this.selectPiHao(this.outReposityNumber)
      this.checkCloth = this.outReposityNumber
    } else {
      this.selectPiHao(0)
    }
  },
  computed: {
    outReposity() {
      if (this.outReposityList) {
        return this.outReposityList
      }
    },
    outReposityNumber() {
      if (this.outNumber) {
        return this.outNumber
      }
    },
    freightMoneyNoTax() {
      if (this.freight) {
        return this.freight
      }
    },
    outReposityInfo() {
      if (this.outData) {
        return this.outData
      }
    },
    totalInrepo() {
      let count = 0
      let countUnit = ''
      this.result.forEach((item) => {
        if (item.clothLoneList) {
          item.clothLoneList.forEach((item) => {
            count += Number(item.quantity)
            countUnit = item.quantityUnit
          })
        }
      })
      return Number(count).toFixed(2) + countUnit
    },
    totalFreightNoTax() {
      let count = 0
      this.result.forEach((item) => {
        count += Number(item.freightMoneyNoTax)
      })
      return Number(count).toFixed(2)
    },
    totalFreight() {
      let count = 0
      this.result.forEach((item) => {
        count += Number(item.freightMoney)
      })
      return Number(count).toFixed(2)
    },
    totalSaleMoney() {
      let count = 0
      this.result.forEach((item) => {
        count += Number(item.saleMoney)
      })
      return Number(count).toFixed(2)
    },
    totalCompare() {
      let count = 0
      let outrepo = 0
      let totalCount = 0
      let countUnit = ''
      this.result.forEach((item) => {
        if (item.clothLoneList) {
          item.clothLoneList.forEach((item) => {
            outrepo += Number(item.quantity)
          })
        }
      })
      this.inReposityList.forEach((item) => {
        if (item.clothLoneList) {
          item.clothLoneList.forEach((item) => {
            count += Number(item.quantity)
            countUnit = item.quantityUnit
          })
        }
      })
      totalCount = Number(outrepo - count).toFixed(2)
      console.log(outrepo)
      console.log(count)
      if (totalCount > 0) {
        return '多' + totalCount + countUnit
      } else if (totalCount < 0) {
        return '少' + Math.abs(totalCount) + countUnit
      } else {
        return 0
      }
    },
  },
  watch: {
  },
  filters: {
    formateNumber(val) {
      if (val === null) {
        return ''
      } else {
        return Number(val).toFixed(2)
      }
    },
    formateTime(val) {
      return Number(val) > 0 ? formatTimeString(val) : '--'
    },
    formateText(val) {
      if (val == 1) {
        return '采购出仓'
      } else if (val == 2) {
        return '换货出仓'
      } else if (val == 3) {
        return '退货出仓'
      } else {
        return ''
      }
    },
  },
  methods: {
    selectPiHao(val) {
      if (val == 0) {
        this.result = this.outReposity.map((item) => item)
      } else {
        this.result = this.outReposity.filter((item) => {
          return item.number == val
        })
      }
    }
  }
}
</script>
