<template>
  <div class="oms-content">
    <div class="search-content">
      <div class="row">
        <div class="item w360">
          <el-input placeholder="订单号，采购商名称，供应商名称，销售员，剪版员" size="small" v-model="filters.key" @keyup.enter.native="search">
          </el-input>
        </div>
        <el-button type="primary" @click.native="search">
          搜索
        </el-button>
        <el-button type="primary" @click.native="resetSubmit">
          重置
        </el-button>
      </div>
      <div class="row">
        <div class="item">
          <el-select v-model="filters.reconciliationStatus" placeholder="全部" @change="search">
            <el-option v-for="item in reconciliationStatusArray" :key="item.value" :label="item.key" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div class="item">
          <el-date-picker v-model="filters.createTimeBegin" type="datetime" size="small" placeholder="开始时间" @change="search">
          </el-date-picker>
        </div>
        <div class="item">
          <el-date-picker v-model="filters.createTimeEnd" type="datetime" size="small" placeholder="结束时间" @change="search">
          </el-date-picker>
        </div>
        <el-button type="primary" class="fr" :disabled="!canDownExcel" @click.native="exportExcel">导出excel</el-button>
      </div>
    </div>
    <div class="main-wrap">
      <div class="main-content style-1">
        <el-table :data="result" :resizable="false" border :height="height" v-if="result.length>0">
          <el-table-column type="selection" width="55" fixed="left" v-if="isNeedselection">
          </el-table-column>
          <el-table-column label="订单编号" align="center" width="180px">
            <template scope="scope">
              {{scope.row.number}}<el-tooltip v-if="scope.row.billCancelRemark" effect="dark" :content="scope.row.billCancelRemark" placement="top">
                <span class="icon-callback"></span>
              </el-tooltip>
              <span v-if="scope.row.delayTime > 0" style="color:red;">
                                  {{scope.row.delayTime | formatDate}}发货
                              </span>
            </template>
          </el-table-column>
          <el-table-column label="订单时间" align="center" width="160px">
            <template scope="scope">
              {{scope.row.createTime | formatTime}}
            </template>
          </el-table-column>
          <el-table-column label="采购商名称" align="center" width="240px" show-overflow-tooltip>
            <template scope="scope">
              {{scope.row.customerCompany}}
              <span v-if="scope.row.customerNumber"> / {{scope.row.customerNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column label="供应商名称" prop="shopCompany" align="center" width="170px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column :render-header="title" class="product-td" class-name="product-column" align="center" width="770px">
            <template scope="scope">
              <ul class="product-wrap">
                <li v-for='(product, index) in scope.row.productNumbers' class="product-item">
                  <div style="border-right: 1px solid rgb(223, 230, 236);">
                    {{product.number}}
                  </div>
                  <div style="border-right: 1px solid rgb(223, 230, 236);">
                    {{product.title}}
                  </div>
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
          <el-table-column label="应收账款" align="center" width="80px">
            <template scope="scope">
              {{scope.row.totalMoney | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="销售员" prop="salerName" align="center" width="180">
          </el-table-column>
          <el-table-column label="剪版员" prop="cutterName" align="center" width="180">
          </el-table-column>
          <el-table-column label="订单状态" align="center" width="120px">
            <template scope="scope">
              <template v-if="scope.row.reconciliationStatus == 0">未结清</template>
              <template v-if="scope.row.reconciliationStatus == 1">已结清</template>
            </template>
          </el-table-column>
        </el-table>
        <div class="empty" v-else :style="{'height':height+'px'}">
        </div>
      </div>
      <div class="page-wrap">
        <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="pageNext" :options="filters" />
      </div>
    </div>
    <el-dialog v-model="moneyVisible" title="编辑金额" size="mini" :close-on-click-modal="false">
      编辑金额:
      <RuleInput v-model="totalMoney" class="input-md" :rule="rules.totalMoney"></RuleInput>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click.native="clearTemData">取 消</el-button>
        <el-button type="primary" @click.native="confirmMoney" :disabled="!canSubmitMoney">确 定</el-button>
      </div>
    </el-dialog>
    <lightbox />
  </div>
</template>
<script>
import Fliter from 'components/filter'
import Pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
import {
  newRequest,
  formatTimeString
}
from 'utils/tool'
import {
  request
} from 'utils/request'
import bus from './eventBus';
import getCutList from 'api/cut/getZiyingCutList';
import RuleInput from 'components/ruleInput'
const regFloat = /^\d+(\.\d{1,2})?$/
export default {
  components: {
    Fliter,
    Pagination,
    Lightbox,
    RuleInput
  },
  data() {
    return {
      moneyVisible: false,
      temId: '',
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1,
      },
      reconciliationStatusArray: [{
        key: '全部',
        value: ''
      }, {
        key: '未结清',
        value: 0
      }, {
        key: '已结清',
        value: 1
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
        _function: 'debt',
        reconciliationStatus: 0
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
      hasEdit: false
    }
  },
  mounted() {
    this.countH()
    window.addEventListener('resize', this.countH)
    this.reqList()
  },
  filters: {
    formatMoney(val) {
      return Number(val) >= 0 ? '￥' + val.toFixed(2) : '--'
    },
    formatTime(val) {
      return formatTimeString(val)
    },
    formatDate(val) {
      return formatTimeString(val).substring(0, 10)
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
      this.filters.export = ''
      this.reqList()
    },
    // 获取上面所有的统计数
    getCount() {
      newRequest({
        url: '/redwood/count/debt',
        method: 'get',
      }).then((res) => {
        if (res.success == 1) {
          bus.$emit('countBuyerDebt', res.obj);
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    reqList(req = {}) {
      this.$store.dispatch('changeload', true)
      this.getCount()
      this.hasEdit = false
      let reqs = {}
      Object.assign(reqs, this.filters)
      console.log(reqs);
      getCutList(reqs).then((res) => {
        this.$store.dispatch('changeload', false)
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
    pageNext() {
      this.filters.export = ''
      this.reqList()
    },
    // 公共请求
    confirmMoney() {
      this.$store.dispatch('changeload', true)
      request('/redwood/ziying/cut/' + this.temId + '?_function=updateInfo', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          totalMoney: this.totalMoney
        }
      }).then((res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.clearTemData()
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
          })
          this.reqList()
        } else {
          this.$message.error(res.msg)
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
        pageSize: 20,
        pageNumber: 1,
        export: '',
        key: '',
        createTimeBegin: '',
        createTimeEnd: '',
        _function: 'debt',
        reconciliationStatus: 0
      })
    },
    title(h, {
      column,
      $index
    }) {
      const productWrapProps = {
        'class': {
          'product-table-wrap': true
        }
      }
      const productItemProps = {
        'class': {
          'product-item': true
        }
      }
      const colorItemProps = {
        'class': {
          'color-item': true
        }
      }
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
        return {
          el,
          props,
          subEl
        }
      }

      function renderElement(obj) {
        return h(obj.el, obj.props, typeof obj.subEl === 'object' ? obj.subEl.map(item => {
          return renderElement(item)
        }) : obj.subEl)
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
.product-wrap {
  min-height: 60px;
}

.main-wrap {
  .el-table__header-wrapper,
  .el-table__fixed-header-wrapper {
    .product-item {
      background: #f9f9f9;
      >div {
        background: #f9f9f9;
      }
    }
    .color-item {
      background: #f9f9f9;
    }
    thead {
      tr {
        th {
          background: #f9f9f9;
          .cell {
            text-align: center;

            background: #f9f9f9;
          }
        }
      }
    }
  }
}

.product-item {
  display: table-row;
  &:not(:first-child) {
    border-top: 1px solid rgb(223, 230, 236);
  }
  >div {
    display: table-cell;
    &:nth-child(1) {
      width: 85px; // bordquedinger-right:0;
      vertical-align: middle; // border-left: 0;
    }
    &:nth-child(2) {
      width: 85px; // bordquedinger-right:0;
      vertical-align: middle; // border-left: 1px solid rgb(223, 230, 236);
      // border-right: 1px solid rgb(223, 230, 236);
    }
    &:nth-child(3) {
      width: 600px;
      vertical-align: middle; // border-right: 1px solid rgb(223, 230, 236);
    }
  }
  .price-input {
    width: 60px;
    border: 1px solid rgb(223, 230, 236);
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
    // height: 100%;
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
}

.item-table {
  display: flex;
  flex-direction: column;
  height: 100%;
}

td {
  .color-item {
    span {
      border-left: 1px solid rgb(223, 230, 236);
      &:first-child {
        border-left: 0;
      }
    }
  }
}

.color-item {
  display: flex;
  flex: 1;
  min-height: 43px;
  &:not(:first-child) {
    border-top: 1px solid rgb(223, 230, 236);
  }
  span {
    width: 20%;
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

.el-table .cell {
  padding: 0;
}

</style>
