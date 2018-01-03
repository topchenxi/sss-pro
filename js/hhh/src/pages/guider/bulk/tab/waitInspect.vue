<template>
  <section>
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item w360">
            <el-input v-model="requestData.key" name="keyword" placeholder="订单号/采购商/供应商" @keydown.enter.native="requestListAllOrder"></el-input>
          </div>
          <el-button type="primary" @click.native="requestListAllOrder">搜索</el-button>
        </div>
        <div class="row">
          <div class="item">
            <el-select v-model="requestData.inType" placeholder="入仓类型" @change="requestListAllOrder">
              <el-option label="入仓类型" value=""></el-option>
              <el-option label="采购入仓" value="1"></el-option>
              <el-option label="采购换货入仓" value="2"></el-option>
              <el-option label="售后换货入仓" value="3"></el-option>
              <el-option label="客户退回入仓" value="4"></el-option>
            </el-select>
          </div>
          <div class="item">
            <el-select v-model="requestData['bulk.salerId']" placeholder="全部订单状态" @change="requestListAllOrder">
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
        <el-table :data="result" :resizable="false" :height="height" border>
          <el-table-column label="入仓单号" prop="number" align="left" width="140px">
          </el-table-column>
          <el-table-column label="订单号" prop="bulk.number" align="left" width="220px">
          </el-table-column>
          <el-table-column label="验货地点" prop="reposityName" align="center" width="180px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="入仓时间" align="center" width="180px">
            <template scope="scope">
              <div>{{scope.row.createTime | formatTime}}</div>
            </template>
          </el-table-column>
          <el-table-column label="采购商" align="left" width="240px" show-overflow-tooltip>
              <template scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.bulk.customerCompany + '/' + scope.row.bulk.customerNumber" placement="top">
                  <p class="ellipsis">
                    <span class="icon" :class="scope.row.bulk.customerHasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' " ></span>
                    <span class="icon" :class="scope.row.bulk.customerHasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'" ></span>
                    {{scope.row.bulk.customerCompany + '/' + scope.row.bulk.customerNumber}}</p>
                </el-tooltip>
              </template>
            </el-table-column>
          <el-table-column label="供应商" prop="bulk.shopCompany" align="center" width="200px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="入仓类型" align="center" width="130px">
            <template scope="scope">
              <div>{{scope.row.inType | inTypeFilter}}</div>
            </template>
          </el-table-column>
          <el-table-column label="等待验货数量" prop="num" align="center" width="200px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="销售员" prop="bulk.salerName" align="center" width="100px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="入仓员" prop="createHanderName" align="center" width="100px" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="120px">
            <template scope="scope">
              <!-- <router-link :to="{path: '/index/guider/bulk/dhOrderDetail', query: {detailType: 'waitInspect', id: scope.row.id, reqNumber: scope.row.orderNumber} }">
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
        <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="requestListAllOrder"
          :options="requestData" />
      </footer>
    </div>
  </section>
</template>
<script>
  import Pagination from 'components/pagination'
  import bus from '../eventBus';
  import {
    newRequest,
    formatTimeString
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
        height: 500,
        sales: [],
        requestData: {
          _function: 'toCheck',
          pageSize: 20,
          pageNumber: 1,
          createTimeBegin: '',
          createTimeEnd: '',
          export: '',
          key: '',
          inType: '',
          'bulk.salerId': ''
        },
        result: [],
        pagation: {
          pageNumber: 1,
          pageSize: 20,
          totalCount: 1,
        }
      }
    },
    filters: {
      formatTime(val) {
        return Number(val) > 0 ? formatTimeString(val) : '--'
      },
      inTypeFilter(value) {
        switch (value) {
          case 1:
            return '采购入仓';
          case 2:
            return '换货入仓';
          case 3:
            return '售后入仓';
          default:
            return '--';
        }
      },
    },
    mounted() {
      this.requestListAllOrder()
      this.getSales();
      this.countHeight();
      window.addEventListener('resize', this.countHeight)
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
      // 整理请求数据
      preRequestData() {
        this.requestData.key = this.requestData.key
        this.requestData.createTimeBegin = this.requestData.createTimeBegin ? new Date(this.requestData.createTimeBegin)
          .getTime() : ''
        this.requestData.createTimeEnd = this.requestData.createTimeEnd ? new Date(this.requestData.createTimeEnd).getTime() +
          86399000 : ''
        if (this.requestData.createTimeBegin && this.requestData.createTimeEnd && this.requestData.createTimeBegin >
          this.requestData.createTimeEnd) {
          this.$message.error('订单开始时间不能大于结束时间')
          return
        }
      },
      // 获取数据
      requestListAllOrder() {
        this.$store.dispatch('changeload', true)
        this.preRequestData() // 处理请求数据
        this.getCount() // 请求数据的同时获取tab上面的统计数
        newRequest({
          url: '/redwood/repo/in',
          data: this.requestData,
          method: 'get',
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
      // 调整table的高度随着高度的变化而变化
      countHeight() {
        this.height = String(document.documentElement.clientHeight - 320)
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.countHeight);
    }
  }

</script>
<style lang="scss" scoped>


</style>
