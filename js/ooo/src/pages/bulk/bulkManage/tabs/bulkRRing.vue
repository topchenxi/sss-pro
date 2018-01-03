<template>
  <section v-loading.body="fullScreenLoading">
    <div class="search-content">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input @keyup.enter.native="getData" v-model="reqParams.key" placeholder="订单号/供应商名称/采购商名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click.native="getData">搜索</el-button>
          <el-button @click.native="reset">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <Tab></Tab>
    <div class="el-bulkCollapse-content" :style="'height:' + height + 'px'">
      <template v-for="(item, index) in tableData">
        <div @click="getClothLone(index)" class="fold-content" :key="index">
          <i v-if="!item.showDetail" class="el-icon-arrow-right"></i>
          <i v-if="item.showDetail" class="el-icon-arrow-down"></i>
          <el-row :gutter="10">
            <el-col :span="6">
              <span class="forgive-color">订单号：{{item.number}}</span>
            </el-col>
            <el-col :span="4">
              <span>采购数量：{{item.quantity | formatNumber}}{{item.quantityUnit}}</span>
            </el-col>
            <el-col :span="10">
              <span>订单总金额：
                <span class="red-color">￥{{item.saleMoney}}</span>
              </span>
            </el-col>
            <el-col :span="5">
              <span>采购商：{{item.customerCompany}}</span>
              <span v-if="item.guiderId == ''" class="icon-daicai">待采</span>
            </el-col>
            <el-col :span="4">
              <span>供应商：{{item.showShopCompany}}</span>
            </el-col>
            <el-col :span="item.followerName ? 4 : 2">
              <span>跟单员：{{item.followerName}}</span>
            </el-col>
            <el-col :span="item.buyerName ? 4 : 2">
              <span>买货员：{{item.buyerName}}</span>
            </el-col>
            <el-col :span="item.salerName ? 4 : 2">
              <span>销售员：{{item.salerName}}</span>
            </el-col>
            <el-col :span="item.guiderName ? 4 : 2">
              <span>采购员：{{item.guiderName}}</span>
            </el-col>
          </el-row>
          <!-- <transition name="fade"> -->
          <div v-show="item.showDetail" style="" class="fold-content-wrap">
            <template v-if="item.clothLoneList && item.clothLoneList.length">
              <template v-for="(clothItem,clothIndex) in item.clothLoneList">
                <div :key="clothIndex" class="clothLone-content">
                  <p class="forgive-color">{{clothItem.statusDesc}}</p>
                  <span>待发货数量：</span>
                  <template v-for="(numItem, numIndex) in clothItem.numList">
                    <span class="icon-ff left-margin15" :key="numIndex"></span>
                    <span :key="numItem">{{numItem}}</span>
                  </template>
                </div>
              </template>
            </template>
            <template v-else>
              <p style="text-align:center;color:#999;padding: 10px;">暂无数据</p>
            </template>
          </div>
          <!-- </transition> -->
        </div>
      </template>
    </div>
    <div class="page-content">
      <pagination :page="page.pageNumber" :total="page.totalCount" :render="getData" :options="reqParams"></pagination>
    </div>
  </section>
</template>

<script>
import getCache from '@/utils/getCache'
import Tab from '../tab.vue'
import pagination from '@/components/pagination'
import request from '@/utils/request'
export default {
  components: {
    Tab,
    pagination,
  },
  data() {
    const auth = JSON.parse(getCache({
      key: 'currentUser'
    }))
    return {
      fullScreenLoading: false,
      tableData: [],
      height: 300,
      woodAdmin: auth.woodAdmin,
      woodFinance: auth.woodFinance,
      reqParams: {
        key: '',
        pageSize: 20,
        pageNumber: 1,
        _function: 'returnReplace',
      },
      page: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 20,
      }
    }
  },
  mounted() {
    this.height = document.body.clientHeight - 238
    this.getData()
  },
  methods: {
    getData() {
      this.fullScreenLoading = true
      request('/redwood/bulk', {
        data: this.reqParams,
        method: 'GET',
      }).then(res => {
        if (res.success == 1) {
          this.tableData = res.page.result
          this.page.pageSize = res.page.pageSize
          this.page.pageNumber = res.page.pageNumber
          this.page.totalCount = res.page.totalCount
          this.tableData.forEach(item => {
            this.$set(item, 'showDetail', false)
          })
        } else {
          this.$message.error(res.msg)
        }
        this.fullScreenLoading = false
      })
    },
    getClothLone(index) {
      this.fullScreenLoading = true
      if (!this.tableData[index].showDetail) {
        request('/redwood/trace/clothLone', {
          data: {
            orderNumber: this.tableData[index].id,
            _function: 'returnReplace'
          },
          method: 'GET'
        }).then(res => {
          this.fullScreenLoading = false
          this.tableData[index].showDetail = true
          if (res.success == 1) {
            this.$set(this.tableData[index], 'clothLoneList', [])
            this.tableData[index].clothLoneList = res.result
            if (this.tableData[index].clothLoneList && this.tableData[index].clothLoneList.length) {
              this.tableData[index].clothLoneList.forEach(item => {
                this.$set(item, 'numList', [])
                item.numList = item.num.split(',')
              })
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.tableData[index].showDetail = false
        this.fullScreenLoading = false
      }
    },
    reset() {
      this.reqParams.key = ''
      this.getData()
    }
  }
}
</script>

<style>

</style>
