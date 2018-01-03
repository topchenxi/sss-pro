<template>
  <div class="cutMange-list tab-wrap">
    <el-tabs v-model="tabIndex" type="card" class="tabs-container">
      <el-tab-pane name="">
        <a slot="label">
          <p>{{pagation.totalCount}}</p>
          <p>全部</p>
        </a>
      </el-tab-pane>
    </el-tabs>
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item w360">
            <el-input placeholder="订单号/采购商/供应商" size="small" v-model="filters.key">
            </el-input>
          </div>
          <el-button @click.native="search">
            搜索
          </el-button>
          <el-button @click.native="resetSubmit">
            重置
          </el-button>
          <el-button class="fr" @click.native="exportExcel">导出excel</el-button>
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
            <el-select v-model="filters.statuses" placeholder="全部状态">
              <el-option label="全部订单状态" value=""></el-option>
              <el-option label="等待报价" value="304"></el-option>
              <el-option label="等待收付订金" value="326"></el-option>
              <el-option label="等待收付款" value="328"></el-option>
              <el-option label="等待录入尾款信息" value="335"></el-option>
              <el-option label="等待收付尾款" value="346"></el-option>
              <el-option label="等待通知提货" value="347"></el-option>
              <el-option label="等待确认提货时间" value="351"></el-option>
              <el-option label="等待确认供应商送货时间" value="352"></el-option>
              <el-option label="等待销售入仓" value="310"></el-option>
              <el-option label="履约中" value="388"></el-option>
              <el-option label="订单已经取消" value="100"></el-option>
              <el-option label="已完成" value="10"></el-option>
            </el-select>
          </div>
          <div class="item">
            <el-date-picker v-model="filters.createTimeBegin" type="datetime" size="small" placeholder="开始时间">
            </el-date-picker>
          </div>
          <div class="item">
            <el-date-picker v-model="filters.createTimeEnd" type="datetime" size="small" placeholder="结束时间">
            </el-date-picker>
          </div>
        </div>
      </div>
    </div>
    <div class="table-warp">
      <div class="table-content">
        <el-table border :data="result" :resizable="false" :height="height" v-if="result.length>0">
          <el-table-column label="订单号" prop="number" align="left" width="205">
          </el-table-column>
          <el-table-column label="订单发布时间" align="left" width="180">
            <template scope="scope">
              <div>{{scope.row.createTime | formatTime}}</div>
            </template>
          </el-table-column>
          <el-table-column label="订单总金额" align="center" min-width="140px">
            <template scope="scope">
              &yen;{{scope.row.saleMoney | formatMoney}}
            </template>
          </el-table-column>
          <el-table-column label="采购商" align="left" width="220px" show-overflow-tooltip>
            <template scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.customerCompany + '/' + scope.row.customerNumber" placement="top">
                <p class="ellipsis">
                  <span class="icon" :class="scope.row.customerHasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span>
                  <span class="icon" :class="scope.row.customerHasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span> {{scope.row.customerCompany + '/' + scope.row.customerNumber}}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="供应商" prop="showShopCompany" align="center" width="160px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="是否验货" align="center" width="100px">
            <template scope="scope">
              {{scope.row.checkCloth == '1' ? '验货' : '不验货'}}
            </template>
          </el-table-column>
          <el-table-column label="配送方式" align="center" width="120px">
            <template scope="scope">
              <span>{{scope.row.sendType | sendTypeFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column label="提货方式" align="center" width="120px">
            <template scope="scope">
              <span>{{scope.row.sendInneed | sendInneedFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column label="采购数量" align="center" width="120px" show-overflow-tooltip>
            <template scope="scope">
              {{scope.row.quantity + scope.row.quantityUnit}}/{{scope.row.colorNumber || 0}}色
            </template>
          </el-table-column>
          <el-table-column label="当前状态" prop="statusDesc" align="left" min-width="110px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="销售员" width="100px" prop="salerName" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="采购员" width="100px" prop="guiderName" show-overflow-tooltip>
          </el-table-column>
          <el-table-column inline-template align="center" label="操作" width="200" fixed="right">
            <div class="operate-btn">
              <!-- <router-link :to="{path: '/index/guider/bulk/dhOrderDetail', query: {detailType: 'all', reqNumber: row.id, customerId: row.customerId} }" v-if="row.guiderId">
                <el-button class="table-btn">详情</el-button>
              </router-link> -->
              <router-link :to="{name: 'allAllDetail', query: {id: row.id}}" target="_blank">
                <el-button class="table-btn">详情</el-button>
              </router-link>
              <el-button v-if="(row.status == 305 || row.status == 304)" class="table-btn submit" @click="showAssignAskPriceDialog(row)">指派询价</el-button>
            </div>
          </el-table-column>
        </el-table>
        <div class="empty" v-else :style="{'height':height+'px'}">
        </div>
        <div class="pagination">
          <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
        </div>
      </div>
      <el-dialog title="指派询价" v-model="assignAskPriceDialog.isShow" :modal="false" size="tiny">
        <div class="sy-update-buyer-wrap" style="padding:20px;">
          <div v-if="assignAskPriceDialog.waitUpdateData" style="width:100%;padding-left:40px;">
            <el-row>
              <el-col :span="5">订单号</el-col>
              <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.number}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">采购商</el-col>
              <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.customerCompany}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">供应商</el-col>
              <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.shopCompany}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">采购数量</el-col>
              <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.quantity + assignAskPriceDialog.waitUpdateData.quantityUnit}}/{{assignAskPriceDialog.waitUpdateData.colorNumber || 0}}色</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">订单总金额</el-col>
              <el-col :span="10" style="color:red;"> &yen;{{assignAskPriceDialog.waitUpdateData.saleMoney | formatMoney}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">当前状态</el-col>
              <el-col :span="10">{{assignAskPriceDialog.waitUpdateData.statusDesc}}</el-col>
            </el-row>
            <el-row v-if="assignAskPriceDialog.waitUpdateData.status == 305">
              <el-col :span="5">
                <font color="red">*</font>选择买货员</el-col>
              <el-select size="small" v-model="assignAskPriceDialog.currentId" placeholder="请选择">
                <el-option v-for="item in allBuyer" :label="item.realName" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-row>
            <el-row v-if="assignAskPriceDialog.waitUpdateData.status == 304">
              <el-col :span="5">
                <font color="red">*</font>选择采购员</el-col>
              <el-select size="small" v-model="assignAskPriceDialog.currentId" placeholder="请选择">
                <el-option v-for="item in guiders" :label="item.realName" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-row>
          </div>
          <footer slot="footer" style="text-align: right;margin-top:20px">
            <el-button @click="assignAskPriceDialog.isShow = false">取 消</el-button>
            <el-button type="primary" @click="submitAssignAskPrice">确 定</el-button>
          </footer>
        </div>
      </el-dialog>
    </div>
    <lightbox></lightbox>
  </div>
</template>
<script>
import Fliter from 'components/filter'
import Pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
import assignAskPrice from 'api/assignAskPrice'
import {
  formatTimeString,
  newRequest,
  getCache
}
from 'utils/tool'
import {
  request
} from 'utils/request'
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
      isWoodAdmin: auth.loginInfo.woodAdmin,
      isWoodGuiderAdmin: auth.loginInfo.woodGuiderAdmin,
      isWoodGuiderLeader: auth.loginInfo.woodGuiderLeader,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      imgPath: 'http://www.soouya.com',
      guiders: [],
      guiderLeaders: [],
      salers: [], // 包括销售员和销售组长
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1
      },
      num1: '',
      num2: '',
      tabIndex: 0,
      assignAskPriceDialog: {
        isShow: false,
        waitUpdateData: null,
        currentId: ''
      },
      filters: {
        _function: 'all',
        listAll: 1,
        pageSize: 20,
        pageNumber: 1,
        export: '',
        key: '',
        createTimeBegin: createTimeBegin,
        createTimeEnd: createTimeEnd,
        status: '',
        guiderId: '',
        guiderAdminId: '',
        salerId: ''
      },
      height: 600,
      result: [],
      tabLabel: []
    }
  },
  mounted() {
    this.countH()
    window.addEventListener('resize', this.countH)
    this.$store.dispatch('changeload', true)
    this.reqList()
    this.getSeedList('woodGuider,woodGuiderLeader')
    this.getSeedList('woodGuiderLeader')
    this.getSeedList('woodSales,woodSalesLeader')
  },
  filters: {
    formatTime(val) {
      return Number(val) > 0 ? formatTimeString(val) : '--'
    },
    formatMoney(val) {
      return Number(val) >= 0 ? val : '--'
    },
    sendTypeFilter(value) {
      switch (value) {
        case 0:
          return '搜芽配送';
        case 1:
          return '采购商自提';
        case 2:
          return '档口直发';
        default:
          return '--';
      }
    },
    sendInneedFilter(value) {
      switch (value) {
        case 0:
          return '提货员提货';
        case 1:
          return '供应商送货';
        case 2:
          return '档口直发';
        default:
          return '--';
      }
    }
  },
  methods: {
    showAssignAskPriceDialog(orderData) {
      this.assignAskPriceDialog.waitUpdateData = orderData
      this.assignAskPriceDialog.isShow = true
      if (orderData.status === 304) {
        this.assignAskPriceDialog.currentId = orderData.guiderId
      } else {
        this.assignAskPriceDialog.currentId = orderData.buyerId
      }
    },
    submitAssignAskPrice() {
      let od = this.assignAskPriceDialog.waitUpdateData
      let param = {}
      param.orderNumber = od.id
      if (od.status === 304) {
        param.guiderId = this.assignAskPriceDialog.currentId
      } else {
        param.id = this.assignAskPriceDialog.currentId
      }
      param._time = new Date().getTime()
      assignAskPrice(param)
        .then(response => {
          if (response.success === '1') {
            this.$message.success(response.msg)
            this.assignAskPriceDialog.isShow = false
            this.reqList()
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
          if (code === 'woodGuider,woodGuiderLeader') {
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
      if (this.filters.createTimeBegin === undefined) {
        this.filters.createTimeBegin = ''
      }
      if (this.filters.createTimeEnd === undefined) {
        this.filters.createTimeEnd = ''
      }
      newRequest({
        url: '/redwood/bulk',
        method: 'get',
        data: this.filters
      }).then(res => {
        this.$store.dispatch('changeload', false)
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
    countH() {
      this.height = String(document.documentElement.clientHeight - 320)
    },
    resetSubmit() {
      Object.assign(this.filters, {
        status: '',
        listAll: 1,
        pageSize: 20,
        pageNumber: 1,
        export: '',
        key: '',
        createTimeBegin: '',
        createTimeEnd: '',
        guiderId: '',
        guiderAdminId: '',
        salerId: ''
      })
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
      border-right: 1px solid #ddd;
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

</style>
