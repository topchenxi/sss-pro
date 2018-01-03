<template>
  <div class="content box">
    <h4 style="display: inline-block">入仓信息</h4>
    <el-select v-model="checkCloth" placeholder="请选择" style="display: inline-block; width: 160px;" @change="selectPiHao">
      <el-option label="全部入仓单" value="0">全部入仓单</el-option>
      <el-option :label="item.number" :value="item.number" v-for="item in inReposityList" :key="item.number"></el-option>
    </el-select>
    <span style="display: inline-block; padding-left: 15px; color: red;" v-if="totalCompare != 0">温馨提示：入仓总数比采购总数{{totalCompare}}</span>
    <table class="custom-table" style="margin-top: 15px;">
      <tr>
        <th>匹号信息</th>
        <th>成本单价</th>
        <th>销售单价</th>
        <th>入仓实数</th>
        <th>实际布长</th>
        <th>入仓时间</th>
        <th>入仓类型</th>
      </tr>
      <template v-for="item in inReposityModule">
        <tr v-for="value in item.clothLoneList" :key="value.number">
          <td>
            <p>匹号：{{value.number}}</p>
            <p>色号：{{value.color}}</p>
          </td>
          <td>{{value.costPrice | formateNumber}}{{value.costPriceUnit}}</td>
          <td>{{value.salePrice | formateNumber}}{{value.salePriceUnit}}</td>
          <td>{{value.quantity | formateNumber}}{{value.quantityUnit}}</td>
          <td>{{value.buchang | formateNumber}}{{value.buchangUnit}}</td>
          <td>{{item.createTime | formatDate}}</td>
          <td>{{item.inType | formateText}}</td>
        </tr>
      </template>
      <tr>
        <td colspan="7" align="right">
          入仓总数：{{totalInrepo}}
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
  th {
    white-space: nowrap;
    overflow: hidden;
    background-color: #fff;
    height: 20px;
    line-height: 40px;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    color: #1f2d3d;
    padding: 0 10px;
  }
  tr {
    height: 35px;
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
    p {
      display: inline-block;
      padding-right: 10px;
    }
    .imgShow {
      display: inline-block;
    }
  }
}
</style>
<script>
import {
  formatTimeString,
} from 'src/common/utils.js'
export default {
  props: ['inReposityList', 'quantity'],
  data() {
    return {
      inReposityModule: [],
      checkCloth: '0',
    }
  },
  mounted() {
    this.selectPiHao(0);
  },
  computed: {
    inReposity() {
      if (this.inReposityList) {
        return this.inReposityList
      }
    },
    totalQuantity() {
      if (this.quantity) {
        return this.quantity
      }
    },
    totalInrepo() {
      let count = 0
      let countUnit = ''
      this.inReposityModule.forEach((item) => {
        if (item.clothLoneList) {
          item.clothLoneList.forEach((item) => {
            count += Number(item.quantity)
            countUnit = item.quantityUnit
          })
        }
      })
      return Number(count).toFixed(2) + countUnit
    },
    totalCompare() {
      let inrepo = 0
      let totalCount = 0
      let countUnit = ''
      this.inReposityModule.forEach((item) => {
        if (item.clothLoneList) {
          item.clothLoneList.forEach((item) => {
            inrepo += Number(item.quantity)
            countUnit = item.quantityUnit
          })
        }
      })
      totalCount = Number(inrepo - this.totalQuantity).toFixed(2)
      if (totalCount > 0) {
        return '多' + totalCount + countUnit
      } else if (totalCount < 0) {
        return '少' + Math.abs(totalCount) + countUnit
      } else {
        return 0
      }
    },
  },
  watch: {},
  filters: {
    formateNumber(val) {
      if (val === null) {
        return ''
      } else {
        return Number(val).toFixed(2)
      }
    },
    formateTime(val) {
      return val && Number(val) > 0 ? formatTimeString(val) : '--'
    },
    formateText(val) {
      if (val == 1) {
        return '采购入仓'
      } else if (val == 2) {
        return '换货入仓'
      } else if (val == 3) {
        return '售后入仓'
      } else {
        return ''
      }
    },
  },
  methods: {
    selectPiHao(val) {
      console.log(val)
      if (val == 0) {
        this.inReposityModule = this.inReposity.map((item) => item)
      } else {
        this.inReposityModule = this.inReposity.filter((item) => {
          return item.number == val
        })
      }
      console.log(this.inReposityModule)
    }
  }
}
</script>
