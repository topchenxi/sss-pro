<template>
  <div class="oms-content">
    <el-menu mode="horizontal" default-active="2" class="el-menu-demo">
      <a href="/buyerDebt/buyerDebtBulk" key="1">
        <el-menu-item index="1">
          大货({{countBulk}})
        </el-menu-item>
      </a>
      <a href="/buyerDebt/buyerDebtCut" key="2">
        <el-menu-item index="2">
          剪版({{countCut}})
        </el-menu-item>
      </a>
    </el-menu>
    <div class="search-content">
      <div class="row">
        <div class="item w360">
          <el-input placeholder="订单号，采购商名称，供应商名称，销售员，剪版员" size="small" v-model="filters.key" @keyup.enter.native="search"> </el-input>
        </div>
        <el-button type="primary" @click.native="search"> 搜索 </el-button>
        <el-button type="primary" @click.native="resetSubmit"> 重置 </el-button>
      </div>
      <div class="row">
        <div class="item">
          <el-select v-model="filters.statuses" placeholder="全部" @change="search">
            <el-option v-for="item in statusArray" :key="item.value" :label="item.key" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div class="item">
          <el-date-picker v-model="filters.createTimeBegin" type="datetime" size="small" placeholder="开始时间" @change="search"> </el-date-picker>
        </div>
        <div class="item">
          <el-date-picker v-model="filters.createTimeEnd" type="datetime" size="small" placeholder="结束时间" @change="search"> </el-date-picker>
        </div>
        <el-button type="primary" class="fr" :disabled="!canDownExcel" @click.native="exportExcel">导出excel</el-button>
      </div>
    </div>
    <div class="main-wrap">
      <div class="main-content style-1">
        <el-table :data="result" :resizable="false" border :height="height" v-if="result.length>0">
          <el-table-column type="selection" width="55" fixed="left" v-if="isNeedselection"> </el-table-column>
          <el-table-column align="center" min-width="140" label="订单编号">
            <template scope="scope"> {{scope.row.number}} <span v-if="scope.row.delayTime > 0" style="color:red;"> {{scope.row.delayTime | formatDate}}发货 </span> </template>
          </el-table-column>
          <el-table-column align="center" width="160" label="订单时间">
            <template scope="scope"> {{scope.row.createTime | formatTime}} </template>
          </el-table-column>
          <el-table-column prop="customerCompany" align="center" label="采购商名称" width="120"> </el-table-column>
          <el-table-column prop="shopCompany" align="center" width="120" label="供应商名称"> </el-table-column>
          <el-table-column align="center" :render-header="title" width="770" class="product-td" class-name="product-column">
            <template scope="scope">
              <ul class="product-wrap">
                <li v-for='(product, index) in scope.row.productNumbers' class="product-item">
                  <div style="border-right: 1px solid #bfbfbf;"> {{product.number}} </div>
                  <div style="border-right: 1px solid #bfbfbf;"> {{product.title}} </div>
                  <div>
                    <ul class="item-table">
                      <li v-for='(color, key_2) in product.colors' class="color-item">
                        <span> {{color.color}} <label v-if="color.status == 0" style="color:red;"> (无货) </label> </span>
                        <span> {{color.followerQuantity > 0 ? color.followerQuantity + color.followerQuantityUnit : '--'}} </span>
                        <span> {{color.salePriceMoney > 0 ? color.salePriceMoney + color.salePriceUnit : '--'}} </span>
                        <span> {{color.cutterQuantity > 0 ? color.cutterQuantity + color.cutterQuantityUnit: '--'}} </span>
                        <span> {{color.followerPriceMoney > 0 ? color.followerPriceMoney + color.followerPriceUnit : '--' }} </span>
                        <span> {{color.cutterPriceMoney > 0 ? color.cutterPriceMoney + color.cutterPriceUnit : '--'}} </span> </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column align="center" label="应收账款" width="80">
            <template scope="scope">
              <template v-if="scope.row.totalMoney && scope.row.totalMoney > 0"> {{scope.row.totalMoney | formatNumber}}元 </template>
              <template v-else> -- </template>
            </template>
          </el-table-column>
          <el-table-column align="center" label="销售员" width="80" prop="salerName"> </el-table-column>
          <el-table-column align="center" label="剪版员" width="80" prop="cutterName"> </el-table-column>
          <el-table-column align="center" label="订单状态" width="120">
            <template scope="scope">
              <template v-if="scope.row.status == '540'">{{statusDesc[540]}}</template>
              <template v-if="scope.row.status == '541'">{{statusDesc[541]}}</template>
            </template>
          </el-table-column>
          <el-table-column inline-template align="center" label="操作" width="150" fixed="right">
            <div class="operate-btn"> -- </div>
          </el-table-column>
        </el-table>
        <div class="empty" v-else :style="{'height':height+'px'}"></div>
      </div>
      <div class="page-wrap" style="float:right;margin-top:20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagation.pageNumber" :page-sizes="[10, 20, 30, 100]" :page-size="pagation.pageSize" layout="total, sizes, prev, pager, next" :total="pagation.totalCount">
        </el-pagination>
      </div>
      <el-dialog v-model="moneyVisible" title="编辑金额" size="mini" :close-on-click-modal="false"> 编辑金额:
        <RuleInput v-model="totalMoney" class="input-md" :rule="rules.totalMoney"></RuleInput>
        <div slot="footer" class="dialog-footer" style="text-align: right;">
          <el-button @click.native="clearTemData">取 消</el-button>
          <el-button type="primary" @click.native="confirmMoney" :disabled="!canSubmitMoney">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request';
const regFloat = /^\d+(\.\d{1,2})?$/
export default {
  data() {
    return {
      moneyVisible: false,
      temId: '',
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1,
      },
      statusDesc: {
        540: '未结清',
        541: '已结清'
      },
      statusArray: [{
        key: '全部',
        value: '540,541'
      }, {
        key: '未结清',
        value: '540'
      }, {
        key: '已结清',
        value: '541'
      }],
      num1: '',
      num2: '',
      filters: {
        pageSize: 20,
        pageNumber: 1,
        export: '',
        key: '',
        createTimeBegin: '',
        createTimeEnd: '',
        statuses: '540',
        listAll: 1
      },
      height: 600,
      result: [],
      totalMoney: '',
      rules: {
        totalMoney: {
          message: '请输入大于0小于1百万且最多两位小数的值',
          rule(val) {
            if (regFloat.test(val) && val < 1000000 && val > 0) {
              return false
            } else {
              return true
            }
          }
        }
      },
      hasEdit: false,
      countBulk: 0,
      countCut: 0,
    }
  },
  mounted() {
    this.countH()
    window.addEventListener('resize', this.countH)
    this.reqList()
    request('/redwood/bulk/debt', {
      method: 'GET',
      data: {}
    }).then(res => {
      console.log(res.count);
      if (res.success === '1') {
        this.countBulk = res.count.bulk;
        this.countCut = res.count.cut;
      }
    })
  },
  filters: {
    formatNumber(val) {
      return Number(val).toFixed(2)
    },
    formatTime(val) {
      return '';
    },
    formatDate(val) {
      return '';
    },
    shortUnit(val) {
      var index = val.indexOf('/')
      if (index < 0) {
        return val
      }
      return val.substring(index + 1)
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.filters.pageNumber = 1;
      this.filters.pageSize = pageSize;
      this.reqList();
    },
    handleCurrentChange(pageNumber) {
      this.filters.pageNumber = pageNumber;
      this.reqList();
    },
    exportExcel() {
      this.filters.export = 1
      this.filters.createTimeBegin = new Date(this.filters.createTimeBegin).getTime() || '';
      this.filters.createTimeEnd = new Date(this.filters.createTimeEnd).getTime() || '';
      this.reqList()
    },
    search() {
      this.filters.pageNumber = '1'
      this.filters.createTimeBegin = new Date(this.filters.createTimeBegin).getTime() || '';
      this.filters.createTimeEnd = new Date(this.filters.createTimeEnd).getTime() || '';
      this.reqList()
    },
    reqList(req = {}) {
      this.hasEdit = false
      let reqs = {}
      Object.assign(reqs, this.filters)
      return request('/redwood/ziying/cut', {
        method: 'GET',
        data: reqs
      }).then((res) => {
        // res = cutData;
        if (res.success == 1) {
          if (res.page) {
            this.convertData(res.page)
          } else if (res.obj) {
            window.open(res.obj)
            this.filters.export = 0
          } else {
            this.result = []
            this.num1 = ''
            this.num2 = ''
            this.num3 = ''
            const currentNumber = 'num' + this.tabIndex
            this[currentNumber] = '0'
          }
        }
      })
    },
    convertData(page) {
      this.pagation.pageNumber = page.pageNumber
      this.pagation.pageSize = page.pageSize
      this.pagation.totalCount = page.totalCount
      this.filters.pageSize = page.pageSize
      this.filters.pageNumber = page.pageNumber
      this.num1 = ''
      this.num2 = ''
      this.num3 = ''
      const currentNumber = 'num' + this.tabIndex
      this[currentNumber] = page.totalCount
      this.result = page.result
    },
    // 公共请求
    confirmMoney() {
      request('/redwood/ziying/cut/' + this.temId + '?_function=updateInfo', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        data: { totalMoney: this.totalMoney }
      }).then((res) => {
        if (res.success == 1) {
          this.clearTemData()
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
          })
          this.reqList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    money(row) {
      this.moneyVisible = true
      this.totalMoney = row.totalMoney
      this.temId = row.id
    },
    clearTemData() {
      this.moneyVisible = false
      this.totalMoney = ''
      this.temId = ''
    },
    countH() {
      this.height = String(document.documentElement.clientHeight - 320)
    },
    resetSubmit() {
      Object.assign(this.filters, {
        key: '',
        createTimeBegin: '',
        createTimeEnd: '',
        statuses: '540,541'
      })
    },
    title(h, { column, $index }) {
      const productWrapProps = { 'class': { 'product-table-wrap': true } }
      const productItemProps = { 'class': { 'product-item': true } }
      const colorItemProps = { 'class': { 'color-item': true } }
      const renderTree = createElementObj('div', productWrapProps, [
        createElementObj('div', productItemProps, [
          createElementObj('div', null, '货号'),
          createElementObj('div', null, '品名'),
          createElementObj('div', null, [
            createElementObj('div', colorItemProps, [
              createElementObj('span', null, '色号'),
              createElementObj('span', null, '数量'),
              createElementObj('span', null, '销售价'),
              createElementObj('span', null, '采购数量'),
              createElementObj('span', null, '成本单价'),
              createElementObj('span', null, '采购单价')
            ])
          ])
        ])
      ])
      return renderElement(renderTree)

      function createElementObj(el, props, subEl) {
        return { el, props, subEl }
      }

      function renderElement(obj) {
        return h(obj.el, obj.props, typeof obj.subEl === 'object' ? obj.subEl.map(item => { return renderElement(item) }) : obj.subEl)
      }
    }
  },
  computed: {
    isNeedselection() {
      return this.filters.status == 501
    },
    canDownExcel() {
      return true
    },
    canSubmitMoney() {
      return !this.rules.totalMoney.rule(this.totalMoney)
    }
  },
  watch: {},
  destroyed() {
    window.removeEventListener('resize', this.countH)
  },
}

</script>
<style lang="scss">
.el-table td,
.el-table th {
  height: 40px !important;
}

.y_table_wrap .el-table td .cell {
  padding: 0 !important;
}

.product-item {
  display: table-row;
  &:not(:first-child) {
    border-top: 1px solid #bfbfbf;
  }
  >div {
    display: table-cell;
    &:nth-child(1) {
      width: 85px; // bordquedinger-right:0;
      vertical-align: middle; // border-left: 0;
    }
    &:nth-child(2) {
      width: 85px; // bordquedinger-right:0;
      vertical-align: middle; // border-left: 1px solid #bfbfbf;
      // border-right: 1px solid #bfbfbf;
    }
    &:nth-child(3) {
      width: 600px;
      vertical-align: middle; // border-right: 1px solid #bfbfbf;
    }
  }
  .price-input {
    width: 60px;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
  }
  select {
    width: 30px;
  }
}

.product-td {
  height: 100%;
}

.product-column {
  .cell {
    height: 100%;
    padding: 0;
    padding-left: 0;
    padding-right: 0;
  }
}

.product-wrap {
  display: table;
  border: 0;
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.item-table {
  display: flex;
  flex-direction: column;
  height: 100%;
}

td {
  .color-item {
    span {
      border-left: 1px solid #bfbfbf;
      &:first-child {
        border-left: 0;
      }
    }
  }
}

.color-item {
  display: flex;
  flex: 1;
  &:not(:first-child) {
    border-top: 1px solid #bfbfbf;
  }
  span {
    width: 25%;
    text-align: center;
    padding: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  span:nth-child(1) {
    width: 200px;
  }

  .alert-red {
    color: red;
  }
}

.list-import {
  background: #20a0ff;
  color: #fff;
}

.cutMange-list {
  .y_table {
    clear: both;
  }

  .y_table_wrap {
    td.is-center {
      text-align: center;
      border-right: 1px solid #e0e6ed;
    }
    th.is-center {
      text-align: center;
    }
    .combine {
      .cell {
        padding: 0;
        .t-title {
          width: 300px;
          float: left;
          .t-item {
            float: left;
            width: 75px;
          }
          .t-item1 {
            width: 60px;
          }
          .t-item2 {
            width: 80px;
          }
          .t-item3 {
            width: 80px;
          }
          .t-item3 {
            width: 80px;
          }
        }
      }
    }
    .el-upload-list {
      display: none;
    }
  }
  .bottom {
    text-align: right;
    background: #fff;
    padding: 10px;
  }
  .operate-btn {
    text-align: left;
    margin-left: 0;
    .o-btn {
      // width: 80px;
      margin-left: 5px;
      margin-right: 5px;
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
  .line {
    border-bottom: 1px solid #e0e6ed;
  }
}

.common-pop {
  min-width: 500px;
}

.take-good {
  max-height: 450px;
  min-width: 460px;
  overflow-y: auto;
  .t-item {
    position: relative;
    margin-bottom: 8px;
  }
  .t-item-l {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 10px;
  }
  .t-item-r {
    display: inline-block; // min-width: 320px;
    .r-line {
      padding-bottom: 5px;
    }
  }
}

.send-good {
  max-height: 450px;
  overflow-y: auto;
}

.unnormal {
  .un-line {
    margin-bottom: 5px;
    position: relative;
    .un-l-left {
      display: inline-block;
      width: 70px;
      padding-right: 5px;
      text-align: right;
    }
    .un-l-r {
      width: 150px;
      display: inline-block;
    }
  }
}

.cutManage-pay-money {
  min-width: 500px;
  .pay-content {
    min-width: 500px;
    .pay-item {
      position: relative;
      padding-bottom: 10px;
      .pay-item-l {
        width: 110px;
        display: inline-block;
        text-align: right;
        padding-right: 10px;
      }
    }
  }
  .showmadan {
    float: left;
  }
  .madan-wrap {
    position: relative;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .del-arrow {
    position: absolute;
    text-align: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    top: -10px;
    right: -10px;
    background-color: #ccc;
    color: #fff;
    border: 1px solid #fff;
  }
  .el-upload-list {
    display: none;
  }
}

.input-product {
  .el-col-24 {
    height: 30px;
    color: blue;
    font-size: 16px;
  }
  .el-col-4 {
    height: 30px;
  }
}

.line-item {
  min-height: 40px;
  margin-bottom: 10px;
  .line-item-l {
    float: left;
    font-size: 14px;
    width: 80px;
    text-align: right;
    padding-right: 10px;
  }
  .radio-tit {
    padding-top: 5px;
  }
  .line-item-r {
    font-size: 14px;
    min-width: 500px;
    float: left;
  }
  .buyer-select-info {
    p {
      padding: 10px 0;
    }
  }
  .mark {
    color: red;
  }
}

.showmadan {
  float: left;
  .madan-wrap {
    position: relative;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px; // border: 1px solid #ccc;
  }
  .del-arrow {
    position: absolute;
    text-align: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    top: -10px;
    right: -10px;
    background-color: #ccc;
    color: #fff;
    border: 1px solid #fff;
  }
}

.el-upload-list {
  display: none;
}

.el-table td,
.el-table th {
  min-height: 40px;
  height: auto;
}

.input-dialog {
  min-width: 1200px;
  input {
    height: 26px;
  }
}

.input-number {
  width: 50px;
}

.input-select {
  width: 100px;
}

.upImg {
  float: left;
  width: 40px;
  height: 40px;
  line-height: 36px;
  background: #ccc;
  text-align: center;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  &:active {
    background: #999;
  }
}

</style>
