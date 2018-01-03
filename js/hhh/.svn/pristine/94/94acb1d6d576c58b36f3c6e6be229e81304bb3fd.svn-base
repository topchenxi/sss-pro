<template>
  <section>
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item w360">
            <el-input v-model="requestParams.keyword" @keyup.enter.native="search" placeholder="订单号/采购商/供应商"></el-input>
          </div>
          <el-button @click.native="search" type="primary">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="main-wrap">
      <div class="main-content style-1">
        <div class="table-wrap" v-if="result.length" :style="{height:windowHeight-297+'px'}">
          <table class="table">
            <colgroup>
              <col width="11%">
              <col width="11%">
              <col width="11%">
              <col width="11%">
              <col width="11%">
              <col width="11%">
              <col width="11%">
            </colgroup>
            <thead>
              <tr>
                <th>订单号</th>
                <th>退换货申请时间</th>
                <th>退换货取消时间</th>
                <th>采购商</th>
                <th>供应商</th>
                <th>退换货类型</th>
                <th>取消人</th>
                <th>取消原因</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tableItem,tableIndex) in result" :key="tableIndex">
                <!-- 退换货单号 -->
                <td>{{tableItem.serviceNumber}}</td>
                <!-- 退换货申请时间 -->
                <td>{{tableItem.createTime | formatTime}}</td>
                <!-- 退换货取消时间 -->
                <td>{{tableItem.cancelTime | formatTime}}</td>
                <!-- 采购商 -->
                <td>{{tableItem.customerCompany}}</td>
                <!-- 供应商 -->
                <td>{{tableItem.shopCompany}}</td>
                <!-- 退换货类型 -->
                <td>
                  <template v-if="tableItem.type == 1">
                    售前退货
                  </template>
                  <template v-if="tableItem.type == 2">
                    售前换货
                  </template>
                </td>
                <!-- 取消人 -->
                <td>{{tableItem.cancelUserName}}</td>
                <!-- 取消原因 -->
                <td class="ta-l">{{tableItem.cancelReason}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="empty" v-if="!result.length"></div>
      </div>
      <div class="page-wrap">
        <Pagination :pageSize="page.pageSize" :page="page.pageNumber" :total="page.totalCount" :options="requestParams" :render="search"></Pagination>
      </div>
    </div>
  </section>
</template>
<script>
import { newRequest } from 'utils/tool'
import Pagination from 'components/pagination.vue'
import bus from '../eventBus'
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      page: {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 10,
      },
      requestParams: {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 10,
        keyword: '',
      },
      result: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
      // 获取上面所有的统计数
      getCount() {
        newRequest({
          url: '/redwood/returnreplace/getCount',
          data: {},
          contentType: 'application/json',
          method: 'get'
        }).then(res => {
          if (res.success == 1) {
            var obj = {}
            obj.guiderReviewed = res.guiderReviewed
            obj.guiderFinished = res.guiderFinished
            obj.guiderCanceled = res.guiderCanceled
            bus.$emit('count', obj)
          } else {}
        })
      },
      // 获取数据
    getData() {
      this.getCount()
      newRequest({
        url: '/redwood/returnreplace/listCancel',
        data: this.requestParams,
        contentType: 'application/json',
        method: 'get',
      }).then(res => {
        if (res.success == 1) {
          this.result = res.page.result
          this.page.pageSize = res.page.pageSize
          this.page.pageNumber = res.page.pageNumber
          this.page.totalCount = res.page.totalCount
          bus.$emit('guiderCanceled', res.page.totalCount)
        } else {
          this.$message.error(res.msg)
        }
        this.$store.dispatch('changeload', false)
      })
    },
    search() {
      this.getData()
    },
  },
  destroyed() {
    window.removeEventListener('resize', this.countHeight)
  }
}
</script>
