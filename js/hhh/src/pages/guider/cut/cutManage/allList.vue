<template>
  <div class="cutMange-list tab-wrap">
    <el-tabs class="tabs-container" type="card" v-model="tabIndex" @tab-click="handleTableClick">
      <el-tab-pane :label="label" :name="index + ''" v-for="(label,index) in tabLabel">
        <a slot="label">
          <p v-if="index==0"> {{countAll}}</p>
          <p v-if="index==1"> {{countDebt}}</p>
          <p>{{label}}</p>
        </a>
      </el-tab-pane>
    </el-tabs>
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item w360">
            <el-input placeholder="订单号/采购商/供应商" v-model="filters.key">
            </el-input>
          </div>
          <el-button @click.native="search">
            搜索
          </el-button>
          <el-button @click.native="resetSubmit">
            重置
          </el-button>
          <el-button class="fr" :disabled="canDownExcel" @click.native="exportExcel">导出excel</el-button>
        </div>
        <div class="row">
          <div class="item">
            <el-select :key="randomKey" v-model="filters.salerId" placeholder="全部销售">
              <el-option label="全部销售" value=""></el-option>
              <el-option v-for="(item,idx) in salers" :label="item.realName || item.userName" :value="item.id" :key="idx">
              </el-option>
            </el-select>
          </div>
          <div class="item" v-if="isWoodGuiderAdmin || isWoodFinance || isWoodCutClothLeader">
            <el-select :key="randomKey" v-model="filters.guiderAdminId" placeholder="全部采购组">
              <el-option label="全部采购组" value=""></el-option>
              <el-option v-for="(item,idx) in guiderLeaders" :label="item.realName || item.userName" :value="item.id" :key="idx">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <el-select :key="randomKey" v-model="filters.guiderId" placeholder="全部采购">
              <el-option label="全部采购" value=""></el-option>
              <el-option v-for="(item,idx) in guiders" :label="item.realName || item.userName" :value="item.id" :key="idx">
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <el-select v-model="filters.status" placeholder="全部状态">
              <el-option label="全部状态" :value="status50x"></el-option>
              <el-option :label="statusDesc[500]" :value="500" size="small"></el-option>
              <el-option :label="statusDesc[501]" :value="501" size="small"></el-option>
              <el-option :label="statusDesc[502]" :value="502" size="small"></el-option>
              <el-option :label="statusDesc[503]" :value="503" size="small"></el-option>
              <el-option :label="statusDesc[520]" :value="520" size="small"></el-option>
              <el-option :label="statusDesc[521]" :value="521" size="small"></el-option>
              <el-option :label="statusDesc[522]" :value="522" size="small"></el-option>
              <el-option :label="statusDesc[523]" :value="523" size="small"></el-option>
              <el-option :label="statusDesc[530]" :value="530" size="small"></el-option>
            </el-select>
          </div>
          <div class="item">
            <el-date-picker v-model="filters.createTimeBegin" type="datetime" placeholder="开始时间">
            </el-date-picker>
          </div>
          <div class="item">
            <el-date-picker v-model="filters.createTimeEnd" type="datetime" placeholder="结束时间">
            </el-date-picker>
          </div>
        </div>
      </div>
    </div>
    <div class="table-warp">
      <div class="table-content">
        <el-table border :data="result" :resizable="false" :height="height" v-if="result.length>0">
          <el-table-column align="center" min-width="200" label="订单编号">
            <template scope="scope">
              {{scope.row.number}}
              <br/>
              <span v-if="scope.row.delayTime > 0" style="color:red;">
                {{scope.row.delayTime | formatDate}}发货
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="200" label="订单时间">
            <template scope="scope">
              {{scope.row.createTime | formatTime}}
            </template>
          </el-table-column>
          <el-table-column prop="customerCompany" align="left" label="采购商名称" width="300">
          </el-table-column>
          <el-table-column prop="shopCompany" align="left" width="160" label="供应商名称">
          </el-table-column>
          <el-table-column align="center" :render-header="title" width="770" class="product-td" class-name="product-column">
            <template scope="scope">
              <ul class="product-wrap">
                <li v-for='(product, index) in scope.row.productNumbers' class="product-item">
                  <div style="border-right: 1px solid #ddd;">
                    {{product.number}}
                  </div>
                  <div style="border-right: 1px solid #ddd;">
                    {{product.title}}
                  </div>
                  <div>
                    <ul class="item-table">
                      <li v-for='(color, key_2) in product.colors' class="color-item">
                        <span>
                          {{color.color}}
                          <label v-if="color.status == 0" style="color:red;">
                            (无货)
                          </label>
                        </span>
                        <span>
                          {{color.followerQuantity > 0 ? color.followerQuantity.toFixed(2) + color.followerQuantityUnit : '--'}}
                        </span>
                        <span>
                          {{color.salePriceMoney > 0 ? color.salePriceMoney + color.salePriceUnit : '--'}}
                        </span>
                        <span>
                          {{color.cutterQuantity > 0 ? color.cutterQuantity.toFixed(2) + color.cutterQuantityUnit: '--'}}
                        </span>
                        <span>
                          {{color.followerPriceMoney > 0 ? color.followerPriceMoney + color.followerPriceUnit : '--' }}
                        </span>
                        <span>
                          {{color.cutterPriceMoney > 0 ? color.cutterPriceMoney + color.cutterPriceUnit : '--'}}
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column align="center" label="总费用" width="160">
            <template scope="scope">
              <template v-if="scope.row.totalMoney && scope.row.totalMoney > 0">
                {{scope.row.totalMoney | formateNumber}}元
              </template>
              <template v-else>
                --
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" label="销售员" width="160" prop="salerName">
          </el-table-column>
          <el-table-column align="center" label="采购员" width="160" prop="guiderName">
          </el-table-column>
          <el-table-column align="center" label="剪版员" width="160">
            <template scope="scope">
              <template v-if="scope.row.cutterChanges != ''">
                <el-popover ref="cutterChangePopover" placement="top" trigger="hover">
                  <ul class="sy-cutter-change">
                    <li v-for="item in scope.row.cutterChanges" v-html="item.replace(/\(/g,'<span>').replace(/\)/g,'</span>')"></li>
                  </ul>
                </el-popover>
                <strong class="sy-current-cutter" v-popover:cutterChangePopover>{{scope.row.cutterName}}</strong>
              </template>
              <template v-else>{{scope.row.cutterName}}</template>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单状态" width="160">
            <template scope="scope">
              <template v-if="tabIndex == 0 && scope.row.status == '500'">{{statusDesc[500]}}</template>
              <template v-if="tabIndex == 0 && scope.row.status == '501'">{{statusDesc[501]}}</template>
              <template v-if="tabIndex == 0 && scope.row.status == '502'">{{statusDesc[502]}}</template>
              <template v-if="tabIndex == 0 && scope.row.status == '503'">{{statusDesc[503]}}</template>
              <template v-if="tabIndex == 0 && scope.row.status == '520'">{{statusDesc[520]}}</template>
              <template v-if="tabIndex == 0 && scope.row.status == '521'">{{statusDesc[521]}}</template>
              <template v-if="tabIndex == 0 && scope.row.status == '522'">{{statusDesc[522]}}</template>
              <template v-if="tabIndex == 0 && scope.row.status == '523'">{{statusDesc[523]}}</template>
              <template v-if="tabIndex == 0 && scope.row.status == '530'">{{statusDesc[530]}}</template>
              <template v-if="tabIndex == 1 && scope.row.reconciliationStatus == 0">未结清</template>
              <template v-if="tabIndex == 1 && scope.row.reconciliationStatus == 1">已结清</template>
            </template>
          </el-table-column>
          <el-table-column inline-template align="center" label="操作" width="240" fixed="right">
            <div class="operate-btn">
              <el-button class="table-btn" @click.native="showUpdateDialog(row)" v-if="row.status == 502">指派剪版员</el-button>
              <router-link :to="{name: 'guiderCutDetail', query: { id: row.id}}">
                <el-button class="table-btn">详情</el-button>
              </router-link>
            </div>
          </el-table-column>
        </el-table>
        <div class="empty" v-else :style="{'height':height+'px'}">
        </div>
      </div>
      <div class="bottom">
        <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
      </div>
    </div>
    <el-dialog v-model="assignVisible" title="指派剪版员" size="mini" :close-on-click-modal="false">
      <el-select :key="randomKey" v-model="cutterId" size="small" style="width: 120px; display: inline-block;" placeholder="请选择">
        <el-option label="请选择" value=""></el-option>
        <el-option v-for="(item,idx) in cutters" :label="item.realName || item.userName" :value="`${JSON.stringify({cutterId:item.id,cutterName:item.realName})}`" :key="idx">
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click.native="clearTemData">取 消</el-button>
        <el-button type="primary" @click.native="submitUpdate" :disabled="cutterId == ''">确 定</el-button>
      </div>
    </el-dialog>
    <lightbox></lightbox>
  </div>
</template>
<script>
import Fliter from 'components/filter'
import Pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
import {
  formatTimeString,
  getCache
}
from 'utils/tool'
import {
  request
} from 'utils/request'
import getCutList from 'api/cut/getZiyingCutList'
import getCutCount from 'api/cut/getCutCount'
export default {
  components: {
    Fliter,
    Pagination,
    Lightbox
  },
  data() {
    let createTimeEnd = '' // new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime()
    let createTimeBegin = '' // new Date(new Date().toLocaleDateString()).getTime()
    const auth = getCache({ key: 'currentUser' })
    return {
      status: '',
      isWoodAdmin: auth.loginInfo.woodAdmin,
      isWoodCutClothLeader: auth.loginInfo.woodCutClothLeader,
      isWoodFinance: auth.loginInfo.woodFinance,
      isWoodGuiderAdmin: auth.loginInfo.woodGuiderAdmin,
      isWoodGuiderLeader: auth.loginInfo.woodGuiderLeader,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      imgPath: 'http://www.soouya.com',
      assignVisible: false,
      temId: '',
      cutterId: '',
      cutters: [],
      guiders: [],
      guiderLeaders: [],
      salers: [], // 包括销售员和销售组长
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1
      },
      statusDesc: {
        500: '待录入剪版信息',
        501: '待通知提货',
        502: '待提货',
        503: '待收版',
        520: '待发货',
        521: '待提交支付',
        522: '待对账',
        523: '已完成',
        530: '已取消'
      },
      num1: '',
      num2: '',
      tabIndex: 0,
      filters: {
        _function: '',
        listAll: 1,
        pageSize: 20,
        pageNumber: 1,
        export: '',
        key: '',
        createTimeBegin: createTimeBegin,
        createTimeEnd: createTimeEnd,
        status: '',
        cutterId: '',
        guiderId: '',
        guiderAdminId: '',
        salerId: ''
      },
      height: 600,
      result: [],
      tabLabel: [],
      countAll: 0,
      countDebt: 0
    }
  },
  mounted() {
    this.countH()
    window.addEventListener('resize', this.countH)
    this.$store.dispatch('changeload', true)
    this.reqList()
    this.getSeedList('woodCutCloth')
    this.getSeedList('woodGuider,woodGuiderLeader')
    this.getSeedList('woodGuiderLeader')
    this.getSeedList('woodSales,woodSalesLeader')
  },
  filters: {
    formateNumber(val) {
      return Number(val).toFixed(2)
    },
    formatTime(val) {
      return formatTimeString(val)
    },
    formatDate(val) {
      return formatTimeString(val).substring(0, 10)
    },
    shortUnit(val) {
      if (val === undefined) {
        return ''
      }
      var index = val.indexOf('/')
      if (index < 0) {
        return val
      }
      return val.substring(index + 1)
    }
  },
  methods: {
    showUpdateDialog(orderData) {
      // this.cutterId = orderData.cutterId
      this.temId = orderData.id
      this.assignVisible = true
    },
    submitUpdate() {
      var obj = JSON.parse(this.cutterId)
      obj.id = this.temId
      request(`/redwood/cut/${this.temId}?_function=updateCutter`, {
        method: 'PUT',
        data: obj,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.success === '1') {
          this.assignVisible = false
          this.reqList()
        } else {
          this.$message.error(response.msg)
        }
      })
    },
    getSeedList(code) {
      this.$store.dispatch('changeload', true)
      request('/crm/user/User/listRedSeedByCodes', {
        method: 'post',
        data: {
          param: JSON.stringify({ code: code })
        }
      }).then(data => {
        this.$store.dispatch('changeload', false)
        if (data.success === '1') {
          if (code === 'woodCutCloth') {
            this.cutters = data.list
          } else if (code === 'woodGuider,woodGuiderLeader') {
            this.guiders = data.list
          } else if (code === 'woodGuiderLeader') {
            this.guiderLeaders = data.list
          } else if (code === 'woodSales,woodSalesLeader') {
            this.salers = data.list
          }
        } else {
          this.$message.error('系统异常')
        }
      })
    },
    handleTableClick(table) {
      this.filters = Object.assign({}, this.filters, {
        status: '',
        listAll: 1,
        pageSize: 20,
        pageNumber: 1,
        export: '',
        key: '',
        createTimeBegin: '',
        createTimeEnd: '',
        cutterId: '',
        guiderId: '',
        guiderAdminId: '',
        salerId: ''
      })
      this.reqList()
    },
    exportExcel() {
      this.filters.export = 1
      this.filters.createTimeBegin = new Date(this.filters.createTimeBegin).getTime() || ''
      this.filters.createTimeEnd = new Date(this.filters.createTimeEnd).getTime() || ''
      this.reqList()
    },
    search() {
      this.filters.pageNumber = '1'
      this.filters.createTimeBegin = new Date(this.filters.createTimeBegin).getTime() || ''
      this.filters.createTimeEnd = new Date(this.filters.createTimeEnd).getTime() || ''
      this.reqList()
    },
    reqList(req = {}) {
      this.$store.dispatch('changeload', true)
      this.hasEdit = false
      if (this.tabIndex === '1') {
        this.filters._function = 'debt'
      } else {
        this.filters._function = ''
      }
      if (this.filters.createTimeBegin === undefined) {
        this.filters.createTimeBegin = ''
      }
      if (this.filters.createTimeEnd === undefined) {
        this.filters.createTimeEnd = ''
      }
      getCutList(this.filters).then((res) => {
        this.$store.dispatch('changeload', false)
        this.tabLabel[0] = '订单动态'
        this.tabLabel[1] = '采购商欠款动态'
        getCutCount({ _function: 'all' }).then((res) => {
          this.countAll = res.obj.all;
          this.countDebt = res.obj.debt;
        })
        if (res.success === '1') {
          if (res.page) {
            this.convertData(res.page)
          } else if (res.obj) {
            window.open(res.obj)
          } else {
            this.result = []
            this.num1 = ''
            this.num2 = ''
            this.num3 = ''
            const currentNumber = 'num' + this.tabIndex
            this[currentNumber] = '0'
          }
          this.filters.export = 0
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
    clearTemData() {
      this.temId = ''
      this.cutterId = ''
      this.assignVisible = false
    },
    countH() {
      this.height = String(document.documentElement.clientHeight - 320)
    },
    resetSubmit() {
      Object.assign(this.filters, {
        statuses: '',
        listAll: 1,
        pageSize: 20,
        pageNumber: 1,
        export: '',
        key: '',
        createTimeBegin: '',
        createTimeEnd: '',
        cutterId: '',
        guiderId: '',
        guiderAdminId: '',
        salerId: ''
      })
    },
    title(h, { column, $index }) {
      let createElementObj = function(el, props, subEl) {
        return { el, props, subEl }
      }
      let renderElement = function(obj) {
        return h(obj.el, obj.props, typeof obj.subEl === 'object' ? obj.subEl.map(item => { return renderElement(item) }) : obj.subEl)
      }
      const productWrapProps = { 'class': { 'product-wrap': true } }
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
    }
  },
  computed: {
    canDownExcel() {
      return false
    }
  },
  watch: {},
  destroyed() {
    window.removeEventListener('resize', this.countH)
  }
}

</script>
<style lang="scss">
.el-table__footer-wrapper thead div,
.el-table__header-wrapper thead div {
  background-color: transparent;
}

.product-item {
  display: table-row;
  &:not(:first-child) {
    border-top: 1px solid #ddd;
  }
  >div {
    display: table-cell;
    border-right: 1px solid #ddd;
    border-color: #ddd !important;
    &:nth-child(1) {
      width: 85px; // bordquedinger-right:0;
      vertical-align: middle; // border-left: 0;
    }
    &:nth-child(2) {
      width: 85px; // bordquedinger-right:0;
      vertical-align: middle; // border-left: 1px solid #ddd;
      // border-right: 1px solid #ddd;
    }
    &:nth-child(3) {
      width: 600px;
      vertical-align: middle; // border-right: 1px solid #ddd;
    }
  }
  .price-input {
    width: 60px;
    border: 1px solid #ddd;
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
  min-height: 40px;
}

.item-table {
  display: flex;
  flex-direction: column;
  height: 100%;
}

td {
  .color-item {
    span {
      border-left: 1px solid #ddd;
      &:first-child {
        border-left: 0;
      }
    }
  }
}

.color-item {
  display: flex;
  flex: 1;
  min-height: 50px;
  &:not(:first-child) {
    border-top: 1px solid #ddd;
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
      margin-left: 0;
      margin-right: 5px;
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
  .line {
    border-bottom: 1px solid #ddd;
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
    width: 85px;
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
  width: 55px;
}

.input-select {
  width: 90px;
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

.sy-current-cutter {
  color: #f00;
}

.sy-cutter-change {
  li {
    white-space: nowrap;
    margin: 10px 0;
    span {
      color: #20a0ff;
    }
  }
}

</style>
