<template>
  <section>
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item w360">
            <el-input v-model="requestData.key" name="keyword" placeholder="采购商名称/供应商名称/销售员/订单号/出仓单号" @keydown.enter.native="requestListAllOrder"></el-input>
          </div>
          <el-button type="primary" @click.native="search">搜索</el-button>
          <el-button type="primary" size="small" @click.native="reset">重置</el-button>
        </div>
        <div class="row">
          <div class="item">
            <el-select v-model="requestData.customerPayStatuses" placeholder="全部支付状态" @change="requestListAllOrder">
              <el-option label="全部" value=""></el-option>
              <el-option label="已支付" value="1"></el-option>
              <el-option label="未支付" value="0,2"></el-option>
            </el-select>
          </div>
          <div class="item">
            <el-date-picker v-model="requestData.createTimeBegin" type="date" placeholder="开始时间" :picker-options="pickerOptions0"></el-date-picker>
          </div>
          <div class="item">
            <el-date-picker v-model="requestData.createTimeEnd" type="date" placeholder="结束时间" :picker-options="pickerOptions1"></el-date-picker>
          </div>
          <el-button type="primary" size="small" @click.native="exportExcel">导出Excel</el-button>
        </div>
      </div>
    </div>
    <div class="table-warp">
      <div class="table-content">
        <el-table :data="result" :height="windowHeight-320" :resizable="true" border>
          <el-table-column label="出仓单号" prop="number" align="left" width="160px"></el-table-column>
          <el-table-column label="订单号" prop="bulk.number" align="left" width="200px"></el-table-column>
          <el-table-column label="订单日期" align="center" width="180px" inline-template>
            <span>{{row.bulk.createTime | formatTime}}</span>
          </el-table-column>
          <el-table-column label="采购商" align="left" width="220px" show-overflow-tooltip>
            <template scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.bulk.customerCompany + '/' + scope.row.bulk.customerNumber" placement="top">
                <p class="ellipsis">
                  <span class="icon" :class="scope.row.bulk.customerHasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span>
                  <span class="icon" :class="scope.row.bulk.customerHasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span> {{scope.row.bulk.customerCompany + '/' + scope.row.bulk.customerNumber}}</p>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="供应商" prop="bulk.showShopCompany" align="center" width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column label="货号" prop="bulk.productNumber" align="center" width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column label="色号匹号数量" prop="num" align="left" width="130px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="总入仓实数" align="center" width="120px" show-overflow-tooltip inline-template>
            <span>{{row.quantity + row.quantityUnit}}</span>
          </el-table-column>
          <el-table-column label="支付时间" align="center" width="120px" show-overflow-tooltip inline-template>
            <span>{{row.payTime | formatTime}}</span>
          </el-table-column>
          <el-table-column label="支付方式" align="center" width="120px" show-overflow-tooltip inline-template>
            <span>{{row.creditType | creditTypeFilter}}</span>
          </el-table-column>
          <el-table-column label="付款人" align="center" width="120px" show-overflow-tooltip inline-template>
            <span>{{row.payer ? '采购支付' : '客户支付'}}</span>
          </el-table-column>
          <el-table-column label="支付状态" align="center" width="150px">
            <template scope="scope">
              <span v-if="scope.row.customerPayStatus == 0">未支付</span>
              <span v-if="scope.row.customerPayStatus == 1">已支付</span>
              <p v-if="scope.row.customerPayStatus == 2 && scope.row.creditType == 2">
                <span style="display:block">未支付</span>
                <span style="color:red">(白条申请失败)</span>
              </p>
              <p v-if="scope.row.customerPayStatus == 2 && scope.row.creditType == 4">
                <span style="display:block">未支付</span>
                <span style="color:red">(信贷申请失败)</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column label="是否已发货" align="center" width="120px" show-overflow-tooltip inline-template>
            <span>{{row.status > 0 ? '已发货' : '未发货'}}</span>
          </el-table-column>
          <el-table-column label="销售员" prop="bulk.salerName" align="center" width="120px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="支付金额" align="center" width="120px" show-overflow-tooltip inline-template>
            <span>{{row.totalMoney | formatMoney }}</span>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="230px">
            <template scope="scope">
              <el-button class="table-btn submit" v-if="scope.row.customerPayStatus == 0 || scope.row.customerPayStatus == 2" @click.native="cancelPay(scope.row)">取消支付</el-button>
              <!-- <router-link :to="{path: '/index/guider/bulk/dhOrderDetail', query: {detailType: 'all',payType: true, reqNumber: scope.row.orderNumber,customerId: scope.row.bulk.customerId, outRepositId: scope.row.id, hasInRepsoity: true} }" v-if="scope.row.bulk.checkCloth ==1">
                <el-button class="table-btn">详情</el-button>
              </router-link>
              <router-link :to="{path: '/index/guider/bulk/dhOrderDetail', query: {detailType: 'all', payType: true, reqNumber: scope.row.orderNumber,customerId: scope.row.bulk.customerId, outRepositId: scope.row.id} }" v-if="scope.row.bulk.checkCloth ==0">
                <el-button class="table-btn">详情</el-button>
              </router-link> -->
              <router-link :to="{name: 'allAllDetail', query: {id: scope.row.bulk.id}}" target="_blank">
                <el-button class="table-btn">详情</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <footer class="pagation">
        <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="requestListAllOrder" :options="requestData" />
      </footer>
    </div>
    <el-dialog v-model="cancelShow" title="取消订单" size="tiny">
      <p class="red">以下2种情况不能“取消支付”：</p>
      <p class="red">1.客户已在App上使用白条支付了该订单，则不能“取消支付”</p>
      <p class="red mb10">2.财务已收到金融公司对该订单的放款，则不能“取消支付”</p>
      <p>请确定这2点后，再决定是否“取消支付”</p>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmCancel()">确认取消</el-button>
        <el-button @click="cancelShow = false">暂不取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import Pagination from 'components/pagination'
import bus from '../eventBus';
import {
  newRequest,
  formatTimeString,
} from 'utils/tool'
import Tab from '../index.vue'
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
        _function: 'toPay',
        key: '',
        createTimeBegin: '',
        createTimeEnd: '',
        pageSize: 20,
        pageNumber: 1,
        customerPayStatuses: '0,2'
      },
      result: [],
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1,
      },
      cancelShow: false, // 取消订单用到的数据
      orderId: '', // 取消订单用到的数据
    }
  },
  filters: {
    formatTime(val) {
      return Number(val) > 0 ? formatTimeString(val) : '--'
    },
    formatMoney(val) {
      return Number(val) >= 0 ? '￥' + val.toFixed(2) : '--'
    },
    creditTypeFilter(value) {
      switch (value) {
        case -1:
          return '未支付';
        case 1:
          return '垫付支付';
        case 2:
          return '白条支付';
        case 3:
          return '余额支付';
        case 4:
          return '信贷支付';
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
        return
      }
    },
    // 获取表格数据
    requestListAllOrder() {
      this.preRequestData()
      this.requestData.export = '' // 清空导出的状态值防止导出后再搜索数据还是错误
      var prams = JSON.parse(JSON.stringify(this.requestData))
      this.getCount()
      this.$store.dispatch('changeload', true)
      newRequest({
        url: '/redwood/repo/out',
        method: 'get',
        data: prams
      }).then(res => {
        this.$store.dispatch('changeload', false)
        if (res.success == '1') {
          this.pagation.pageNumber = res.page.pageNumber
          this.pagation.pageSize = res.page.pageSize
          this.pagation.totalCount = res.page.totalCount
          this.requestData.pageSize = res.page.pageSize
          this.requestData.pageNumber = res.page.pageNumber
          this.result = res.page.result
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
    // 重置按钮
    reset() {
      this.requestData.pageNumber = 1
      this.requestData.customerPayStatuses = ''
      this.requestData.key = ''
      this.requestData.createTimeBegin = ''
      this.requestData.createTimeEnd = ''
    },
    // 导出
    exportExcel() {
      this.preRequestData()
      this.requestData.export = 1
      newRequest({
        url: '/redwood/repo/out',
        data: this.requestData,
        method: 'get'
      }).then(res => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          window.open(res.obj)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 点击取消支付
    cancelPay(row) {
      this.cancelShow = true
      this.orderId = row.id
    },
    // 确定取消支付
    confirmCancel() {
      this.$store.dispatch('changeload', true)
      newRequest({
        url: '/redwood/repo/out/' + this.orderId,
        method: 'delete'
      }).then(res => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.requestListAllOrder()
          this.cancelShow = false
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  }
}

</script>
