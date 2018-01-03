<template>
  <section style="min-width:1300">
    <Tabs></Tabs>
    <div class="search-box">
      <el-select placeholder="" v-model="requestParams.type">
        <el-option v-for="item in rrOptions" :key="item.value" :label="item.label" :value="item.value" style="width:230px;margin-left:20px;">
        </el-option>
      </el-select>
      <el-input placeholder="订单号/采购商/供应商" v-model="requestParams.keyword" style="width:230px; margin-left:20px;" @keyup.enter.native="search"></el-input>
      <el-button type="primary" @click.native="search" style="margin-left:20px;">搜索</el-button>
    </div>
    <template v-for="item in allData">
      <template>
        <div class="tableTitle-box">
          <span>订单号:{{item.order.serviceNumber}}</span>
          <span>采购商:{{item.order.customerCompany}}</span>
          <span>供应商:{{item.order.shopCompany}}</span>
          <span>订单总金额:￥{{item.order.saleMoney | formatMoney}}</span>
          <span>订单发布时间:{{item.order.createTime | formatTime}}</span>
          <span>跟单员:{{item.order.followerName}}</span>
          <span style="border-right: 0px;">买货员:{{item.order.purchaserName}}</span>
        </div>
        <div class="table-box">
          <el-table :data="item.list" class="fixed-table" border>
            <el-table-column prop="number" label="退换货单号" align="left"></el-table-column>
            <el-table-column prop="createTime" label="退换货申请时间" align="left" :formatter="formatTime"></el-table-column>
            <!-- <el-table-column prop="inReposityNumber" label="入仓单号" align="left"></el-table-column>
              <el-table-column prop="outReposityNumber" label="出仓单号" align="left"></el-table-column> -->
            <el-table-column prop="purcahserReviewTime" label="退换货审核时间" :formatter="formatTime" align="left"></el-table-column>
            <el-table-column prop="" label="退换货数量" align="left">
              <template scope="scope">
                <span>{{scope.row.quantity}}{{scope.row.quantityUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column label="现采购数量" prop="">
              <template scope="scope">
                <template v-if="scope.row.type == 2 || scope.row.type == 4">
                  <span>{{scope.row.needBuyQuantity}}{{scope.row.needBuyQuantityUnit}}</span>
                </template>
                <template v-if="scope.row.type == 1 || scope.row.type == 3">
                  <span>--</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="款项类型" align="right">
              <template scope="scope">
                <template v-if="scope.row.moneyType == 1">
                  <span>供应商退款</span>
                </template>
                <template v-if="scope.row.moneyType == 2">
                  <span>搜芽补款</span>
                </template>
              </template>
            </el-table-column>
            <el-table-column label="当前退换货退补金额">
              <template scope="scope">
                <template v-if="scope.row.moneyType == 1">
                  <span>￥{{scope.row.money | formatMoney}}(退)</span>
                </template>
                <template v-if="scope.row.moneyType == 2">
                  <span>￥{{scope.row.money| formatMoney}}(补)</span>
                </template>
              </template>
            </el-table-column>
            <!-- <el-table-column label="原销售货款值" align="right">
                <template scope="scope">
                  <template v-if="scope.row.type < 3">
                    <span>--</span>
                  </template>
                  <template v-else>
                    <span>￥{{scope.row.soouyaPayToBuyer.toFixed(2)}}</span>
                  </template>
                </template>
              </el-table-column> -->
            <el-table-column label="退换货类型" align="left">
              <template scope="scope">
                <template v-if="scope.row.type == 1">
                  <span>售前退货</span>
                </template>
                <template v-if="scope.row.type == 2">
                  <span>售前换货</span>
                </template>
                <template v-if="scope.row.type == 3">
                  <span>售后退货</span>
                </template>
                <template v-if="scope.row.type == 4">
                  <span>售后换货</span>
                </template>
              </template>
            </el-table-column>
            <!--按钮需添加事件  -->
            <el-table-column min-width="100px" fixed="right" label="操作">
              <template scope="scope">
                <router-link :to="{name: 'finishDetail', query:{id: scope.row.id}}">
                  <el-button type="primary" size="mini">详情</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </template>
    <div style="width:100%;height:100px;"></div>
    <div class="page-box">
      <Pagination :pageSize="page.pageSize" :page="page.pageNumber" :total="page.totalCount" :options="requestParams" :render="search"></Pagination>
    </div>
  </section>
</template>

<script>
import Tabs from './buyerTab.vue'
import Pagination from 'components/pagination.vue'
// import config from '../data.json'
import {
  newRequest,
} from 'utils/tool'
export default {
  components: {
    Tabs,
    Pagination
  },
  data() {
    return {
      rrOptions: [
        {
          label: '全部退换类型',
          value: '',
        },
        {
          label: '售前退货',
          value: 1,
        },
        {
          label: '售前换货',
          value: 2,
        },
        {
          label: '售后退货',
          value: 3,
        },
        {
          label: '售后换货',
          value: 4
        }
      ],
      page: {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 10,
      },
      requestParams: {
        keyword: '',
        type: '',
        pageSize: 10,
        pageNumber: 1,
      },
      allData: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      // let res = config.finish
      // console.log(res)
      newRequest({
        url: '/redwood/returnreplace/listFinishedForPurchaserAndGuider',
        data: this.requestParams,
        method: 'get',
        contentType: 'application/json',
      }).then((res) => {
        if (res.success == 1) {
          this.allData = res.page.result
          this.page.pageNumber = res.page.pageNumber
          this.page.pageSize = res.page.pageSize
          this.page.totalCount = res.page.totalCount
        } else {
          this.$message.error(res.msg)
        }
      })
      this.$store.dispatch('changeload', false)
    },
    search() {
      // this.requestParams.pageSize = this.page.pageSize
      // this.requestParams.pageNumber = this.page.pageNumber
      this.$store.dispatch('changeload', true)
      this.getData()
    }
  }
}
</script>

<style scoped>
.search-box {
  height: auto;
  position: relative;
}

.tableTitle-box {
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  display: inline-table;
}

.tableTitle-box>span {
  border-right: 1px solid #3b3b3b;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 14px;
}

.table-box {
  padding-bottom: 40px;
}

.page-box {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  opacity: 1.0;
  z-index: 20;
}

.el-form .el-form-item {
  padding: 0;
  margin: 0;
}
</style>
