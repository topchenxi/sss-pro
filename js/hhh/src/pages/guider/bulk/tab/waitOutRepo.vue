<template>
  <section>
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item w360">
            <el-input v-model="requestData.key" name="keyword" placeholder="采购商名称/供应商名称/销售员/订单号" @keydown.enter.native="requestListAllOrder"></el-input>
          </div>
          <el-button type="primary" @click.native="search">搜索</el-button>
          <el-button type="primary" size="small" @click.native="reset">重置</el-button>
        </div>
        <div class="row">
          <div class="item">
            <el-date-picker v-model="requestData.createTimeBegin" type="date" placeholder="开始时间" :picker-options="pickerOptions0"></el-date-picker>
          </div>
          <div class="item">
            <el-date-picker v-model="requestData.createTimeEnd" type="date" placeholder="结束时间" :picker-options="pickerOptions1"></el-date-picker>
          </div>
        </div>
      </div>
      <div class="main-wrap">
        <div class="main-content">
          <el-table :data="result" :height="windowHeight-320" :resizable="true" border>
            <el-table-column label="出仓单号" prop="number" align="left" width="140px"></el-table-column>
            <el-table-column label="订单号" prop="bulk.number" align="left" width="220px"></el-table-column>
            <el-table-column label="出仓单时间" align="center" width="180px" inline-template>
              <span>{{row.createTime | formatTime}}</span>
            </el-table-column>
            <el-table-column label="出仓货款" align="center" width="150px" inline-template>
              <span>{{row.totalMoney | formatMoney}}</span>
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
            <el-table-column label="供应商" prop="bulk.showShopCompany" align="center" width="180px" show-overflow-tooltip></el-table-column>
            <el-table-column label="品类" aligh="center" width="70px" inline-template>
              <span>{{row.bulk.category ? '面料' : '辅料'}}</span>
            </el-table-column>
            <el-table-column label="验货" aligh="center" width="90px" inline-template>
              <span>{{row.bulk.checkCloth ? '验货' : '不验货'}}</span>
            </el-table-column>
            <el-table-column label="配送方式" align="center" width="120px" inline-template>
              <span>{{row.bulk.sendType | sendTypeFilter}}</span>
            </el-table-column>
            <el-table-column label="待发货数量" prop="num" align="left" width="180px" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="当前状态" align="left" width="120px" show-overflow-tooltip inline-template>
              <span>{{row.status | statusFilter}}</span>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="150px">
              <template scope="scope">
                <!-- <router-link :to="{path: '/index/guider/bulk/dhOrderDetail', query: {detailType: 'all', reqNumber: scope.row.orderNumber, customerId: scope.row.bulk.customerId,hasInRepsoity: true} }" v-if="scope.row.bulk.checkCloth == 1">
                  <el-button class="table-btn">详情</el-button>
                </router-link>
                <router-link :to="{path: '/index/guider/bulk/dhOrderDetail', query: {detailType: 'all', reqNumber: scope.row.orderNumber, customerId: scope.row.bulk.customerId} }" v-if="scope.row.bulk.checkCloth == 0">
                  <el-button class="table-btn">详情</el-button>
                </router-link> -->
                <router-link :to="{name: 'allAllDetail', query: {id: scope.row.bulk.id}}" target="_blank">
                  <el-button class="table-btn">详情</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <Page :total="total" :params="requestData" @toSearch="requestListAllOrder"></Page>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Pagination from 'components/pagination'
import YAddress from 'components/y-address/index'
import bus from '../eventBus';
import Tab from '../index.vue'
import {
  newRequest,
  formatTimeString
} from 'utils/tool'
export default {
  components: {
    Pagination,
    Tab,
    'y-address': YAddress,
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
        _function: 'toOut',
        pageSize: 20,
        pageNumber: 1,
        createTimeBegin: '',
        createTimeEnd: '',
        export: '',
        key: '',
      },
      total: 0,
      result: [],
      height: 600,
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
    },
    statusFilter(value) {
      switch (value) {
        case 0:
          return '等待出仓';
        case 1:
          return '已出仓';
        case 2:
          return '已确认收货';
        default:
          return '--';
      }
    }
  },
  mounted() {
    this.requestListAllOrder()
  },
  methods: {
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
        return false
      }
    },
    // 获取表格数据
    requestListAllOrder() {
      this.$store.dispatch('changeload', true)
      this.preRequestData()
      this.getCount()
      newRequest({
        url: '/redwood/repo/out',
        data: this.requestData,
        method: 'get'
      }).then(res => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.result = res.page.result
          this.total = res.page.totalCount
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
    // 重置数据
    reset() {
      this.requestData.pageNumber = 1
      this.requestData.key = ''
      this.requestData.createTimeBegin = ''
      this.requestData.createTimeEnd = ''
      this.requestListAllOrder()
    },
  }
}

</script>
