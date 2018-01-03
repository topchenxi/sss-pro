<template>
  <section style="min-width:1300">
    <Tabs></Tabs>
    <div class="search-box">
      <el-input placeholder="订单号/采购商/供应商" v-model="requestParams.keyword" style="width:230px; margin-left:20px;" @keyup.enter.native="search"></el-input>
      <el-button type="primary" @click.native="search" style="margin-left:20px;">搜索</el-button>
    </div>
    <template>
      <div class="table-box">
        <el-table :data="allData" class="fixed-table" border>
          <el-table-column prop="serviceNumber" label="订单号" align="left"></el-table-column>
          <el-table-column prop="createTime" label="退换货申请时间" align="left" :formatter="formatTime"></el-table-column>
          <el-table-column prop="cancelTime" label="退换货取消时间" :formatter="formatTime" align="left"></el-table-column>
          <el-table-column prop="customerCompany" label="采购商" align="left"></el-table-column>
          <el-table-column prop="shopCompany" label="供应商" align="left"></el-table-column>
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
          <el-table-column label="取消人" prop="cancelUserName"></el-table-column>
          <el-table-column label="取消原因" prop="cancelReason" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
      </div>
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
      // let res = config.cancel
      // console.log(res)
      newRequest({
        url: '/redwood/returnreplace/listCancel',
        method: 'get',
        data: this.requestParams,
        contentType: 'application/json'
      }).then((res) => {
        if (res.success == 1) {
          this.allData = res.page.result
          this.page.pageSize = res.page.pageSize
          this.page.pageNumber = res.page.pageNumber
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
      this.$store.dispatch('changeload', false)
      this.getData()
    }
  }
}
</script>

<style scoped>
.search-box {
  padding-bottom: 20px;
  padding-top: 10px;
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
