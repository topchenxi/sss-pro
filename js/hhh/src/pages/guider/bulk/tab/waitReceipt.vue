<template>
  <section>
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item w360">
            <el-input v-model="requestData.key" name="keyword" placeholder="订单号/采购商/供应商" @keyup.enter.native="requestListAllOrder"></el-input>
          </div>
          <el-button type="primary" @click.native="search">搜索</el-button>
        </div>
        <div class="row">
          <div class="item">
            <el-select v-model="requestData['bulk.salerId']" placeholder="全部销售员" @change="requestListAllOrder">
              <el-option label="全部销售员" value=""></el-option>
              <el-option :label="item.realName" :value="item.id" v-for="item in sales"></el-option>
            </el-select>
          </div>
          <div class="item">
            <el-date-picker v-model="requestData.createTimeBegin" type="date" size="small" placeholder="开始时间" :picker-options="pickerOptions0"></el-date-picker>
          </div>
          <div class="item">
            <el-date-picker v-model="requestData.createTimeEnd" type="date" size="small" placeholder="结束时间" :picker-options="pickerOptions1"></el-date-picker>
          </div>
        </div>
      </div>
    </div>
    <div class="table-warp">
      <div class="table-content">
        <el-table :data="result" :resizable="false" :height="height" border="">
          <el-table-column label="出仓单号" prop="number" align="center" width="140px">
          </el-table-column>
          <el-table-column label="订单号" prop="bulk.number" align="center" width='220px'>
          </el-table-column>
          <el-table-column label="通知发货时间" align="center" width="190px" inline-template>
            <div>{{row.assignTime | formatTime}}</div>
          </el-table-column>
          <el-table-column align="center" label="出仓货款" width="150px" inline-template>
            <div>{{row.totalMoney | formatMoney}}</div>
          </el-table-column>
          <el-table-column label="采购商" align="left" width="240px" show-overflow-tooltip>
            <template scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.bulk.customerCompany + '/' + scope.row.bulk.customerNumber" placement="top">
                <p class="ellipsis">
                  <span class="icon" :class="scope.row.bulk.customerHasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span>
                  <span class="icon" :class="scope.row.bulk.customerHasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span> {{scope.row.bulk.customerCompany + '/' + scope.row.bulk.customerNumber}}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="供应商" prop="bulk.showShopCompany" align="center" width="200px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="是否验货" align="center" width="110px" inline-template>
            <span>{{row.bulk.checkCloth ? '验货' : '不验货'}}</span>
          </el-table-column>
          <el-table-column label="配送方式" align="center" width="120px" inline-template>
            <span>{{row.bulk.sendType | sendTypeFilter}}</span>
          </el-table-column>
          <el-table-column label="通知出仓实数" align="center" width="180px" inline-template>
            <span>{{row.quantity + row.quantityUnit}}</span>
          </el-table-column>
          <el-table-column label="销售员" prop="bulk.salerName" align="left" width="120px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="230px" inline-template>
            <div class="operate-btn">
              <el-button class="table-btn" @click.native="confirmGood(row)">确认收货</el-button>
              <!-- <router-link :to="{path: '/index/guider/bulk/dhOrderDetail', query: {detailType: 'waitReceipt', id: row.id, reqNumber: row.orderNumber, hasInRepsoity: true} }" v-if="row.bulk.checkCloth ==1">
                <el-button class="table-btn">详情</el-button>
              </router-link>
              <router-link :to="{path: '/index/guider/bulk/dhOrderDetail', query: {detailType: 'waitReceipt', id: row.id, reqNumber: row.orderNumber} }" v-if="row.bulk.checkCloth == 0">
                <el-button class="table-btn">详情</el-button>
              </router-link> -->
              <router-link :to="{name: 'allAllDetail', query: {id: row.bulk.id}}" target="_blank">
                <el-button class="table-btn">详情</el-button>
              </router-link>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <footer class="pagation">
        <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="requestListAllOrder" :options="requestData" />
      </footer>
    </div>
    <!-- 确认收货 -->
    <el-dialog title="确认收货" v-model="confirmtakegood" custom-class="common-pop" size="small" :close-on-click-modal="false">
      <div class="table-wrap">
        <table class="table">
          <colgroup>
            <col width="25%">
            <col width="25%">
            <col width="50%">
          </colgroup>
          <thead>
            <tr>
              <th>订单号</th>
              <th>采购商</th>
              <th>发货内容</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{confirmtakegoodData.bulk.number}}</td>
              <td>{{confirmtakegoodData.bulk.customerCompany}}</td>
              <td>
                <div class="r-line" v-for='(checkb, index) in confirmtakegoodData.clothLoneList'>
                  {{checkb.productNumber}} | {{checkb.color}} | {{checkb.quantity}}{{checkb.quantityUnit}} | {{checkb.number}}
                  <template v-if="checkb.rank">({{checkb.rank}}/{{checkb.average}}分)</template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="confirmTakeit(confirmtakegoodData)">确认收货</el-button>
        <el-button @click.native="confirmtakegood=false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 确认收货 end -->
  </section>
</template>
<script>
import Pagination from 'components/pagination'
import {
  newRequest,
  formatTimeString
} from 'utils/tool'
import Tab from '../index.vue'
import bus from '../eventBus';
export default {
  components: {
    Tab,
    Pagination
  },
  data() {
    var that = this
    return {
      pickerOptions0: {
        disabledDate(time) {
          if (that.requestData.createTimeEnd) {
            if (time.getTime() > +new Date(that.requestData.createTimeEnd)) {
              return true
            }
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          if (that.requestData.createTimeBegin) {
            if (time.getTime() > Date.now()) {
              return true
            }
            return +new Date(that.requestData.createTimeBegin) > time.getTime();
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      requestData: {
        _function: 'toReceive',
        pageSize: 20,
        pageNumber: 1,
        createTimeBegin: '',
        createTimeEnd: '',
        key: '',
        'bulk.salerId': ''
      },
      sales: [],
      result: [],
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 0,
      },
      _time: 0, // 确认收货用到的数据
      confirmtakegood: false, // 确认收货用到的数据
      confirmtakegoodData: {
        bulk: {
          number: '',
          customerCompany: '',
        }
      }, // 确认收货用到的数据
      height: 600
    }
  },
  filters: {
    formatTime(val) {
      return Number(val) > 0 ? formatTimeString(val) : '--'
    },
    formatMoney(val) {
      return Number(val) >= 0 ? '￥' + val.toFixed(2) : '--'
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
    }
  },
  mounted() {
    window.addEventListener('resize', this.countHeight)
    this.countHeight()
    this.requestListAllOrder()
    this.getSales()
  },
  methods: {
    // 获取销售员
    getSales() {
      newRequest({
        url: '/crm/user/User/getSales',
        method: 'get',
      }).then((res) => {
        if (res.success == 1) {
          this.sales = res.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取上面所有的统计数
    getCount() {
      newRequest({
        url: '/redwood/count/bulk',
        method: 'get',
      }).then((res) => {
        if (res.success == 1) {
          bus.$emit('count', res.obj);
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 处理请求参数
    preRequestData() {
      this.requestData.key = this.requestData.key == undefined ? '' : this.requestData.key
      this.requestData.createTimeBegin = this.requestData.createTimeBegin ? new Date(this.requestData.createTimeBegin).getTime() : ''
      this.requestData.createTimeEnd = this.requestData.createTimeEnd ? new Date(this.requestData.createTimeEnd).getTime() + 86399000 : ''
      if (this.requestData.createTimeBegin && this.requestData.createTimeEnd && this.requestData.createTimeBegin > this.requestData.createTimeEnd) {
        this.$message.error('订单开始时间不能大于结束时间')
        return
      }
    },
    // 请求数据
    requestListAllOrder() {
      this.preRequestData()
      this.getCount()
      this.$store.dispatch('changeload', true)
      newRequest({
        url: '/redwood/repo/out',
        method: 'get',
        data: this.requestData
      }).then(res => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.result = res.page.result
          this.pagation.pageNumber = res.page.pageNumber
          this.pagation.pageSize = res.page.pageSize
          this.pagation.totalCount = res.page.totalCount
          this.requestData.pageSize = res.page.pageSize
          this.requestData.pageNumber = res.page.pageNumber
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 点击搜索
    search() {
      Object.assign(this.requestData, {
        pageNumber: 1
      })
      this.requestListAllOrder()
    },
    // 请求确认收货的数据
    confirmGood(row) {
      this.confirmtakegoodData = row
      this._time = (new Date()).getTime()
      newRequest({
        url: '/redwood/reposity/OutReposity/getClothLoneListWaitReceive',
        method: 'get',
        data: { id: row.id }
      }).then(res => {
        if (res.success == 1) {
          this.$set(this.confirmtakegoodData, 'clothLoneList', res.result)
          this.confirmtakegood = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 确认收货请求
    confirmTakeit(row) {
      const obj = { outReposityNumber: row.number, _time: this._time }
      newRequest({
        url: '/redwood/reposity/OutReposity/confirmReceive',
        method: 'post',
        contentType: 'application/json',
        data: obj
      }).then((res) => {
        this.$store.dispatch('changeload', false)
        this.confirmtakegood = false
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.requestListAllOrder()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    countHeight() {
      this.height = String(document.documentElement.clientHeight - 320)
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.countHeight)
  }
}

</script>
<style lang="scss">


</style>
