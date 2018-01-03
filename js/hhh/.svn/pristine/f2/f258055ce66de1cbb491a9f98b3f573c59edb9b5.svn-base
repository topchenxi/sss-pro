<template>
  <section>
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item">
            <el-select v-model="requestParams.type" placeholder="请选择">
              <el-option :key="0" :value="''" label="全部类型"></el-option>
              <el-option :key="1" :value="1" label="售前退货"></el-option>
              <el-option :key="2" :value="2" label="售前换货"></el-option>
            </el-select>
          </div>
          <div class="item w360">
            <el-input v-model="requestParams.keyword" @keyup.enter.native="search" placeholder="订单号/采购商/供应商"></el-input>
          </div>
          <el-button @click.native="search" type="primary">搜索</el-button>
        </div>
      </div>
    </div>
    <div class="main-wrap">
      <div class="main-content style-1" :style="{height: windowHeight - 280 + 'px'}">
        <div class="item" v-for="(item,index) in result" :key="index">
          <h5>订单号 : {{item.order.serviceNumber}}</h5>
          <div class="info-wrap">
            <dl>
              <dt>采购商 :</dt>
              <dd>{{item.order.customerCompany}}</dd>
            </dl>
            <dl>
              <dt>供应商 :</dt>
              <dd>{{item.order.shopCompany}}</dd>
            </dl>
            <dl>
              <dt>订单总金额 :</dt>
              <dd class="red">￥{{item.order.saleMoney | formatMoney}}</dd>
            </dl>
            <dl>
              <dt>订单发布时间 :</dt>
              <dd>{{item.order.createTime | formatTime}}</dd>
            </dl>
            <dl>
              <dt>销售员 :</dt>
              <dd>{{item.order.salesName}}</dd>
            </dl>
          </div>
          <div class="table-wrap">
            <table class="table">
              <colgroup>
                <col width="16%">
                <col width="16%">
                <col width="16%">
                <col width="16%">
                <col width="16%">
              </colgroup>
              <thead>
                <tr>
                  <th>退换货单号</th>
                  <th>退换货申请时间</th>
                  <th>退换货数量</th>
                  <th>现采购数量</th>
                  <th>退换货类型</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tableItem,tableIndex) in item.list" :key="tableIndex">
                  <!-- 退换货单号 -->
                  <td>{{tableItem.number}}</td>
                  <!-- 退换货申请时间 -->
                  <td>{{tableItem.createTime | formatTime}}</td>
                  <!-- 退换货数量 -->
                  <td>{{tableItem.quantity}}{{tableItem.quantityUnit}}/{{tableItem.clothLoneListSize}}匹</td>
                  <!-- 现采购数量 -->
                  <td>
                    <template v-if="tableItem.type == 1">
                      --
                    </template>
                    <template v-if="tableItem.type == 2">
                      {{tableItem.needBuyQuantity | formatMoney}} {{tableItem.needBuyQuantityUnit}}
                    </template>
                  </td>
                  <!-- 退换货类型 -->
                  <td>
                    <template v-if="tableItem.type == 1">
                      售前退货
                    </template>
                    <template v-if="tableItem.type ==2">
                      售前换货
                    </template>
                  </td>
                  <!-- 操作 -->
                  <td>
                    <router-link :to="{name: 'guiderRrDetail', query: {id: tableItem.id}}">
                      <el-button class="table-btn">详情</el-button>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
      requestParams: {
        type: '',
        keyword: '',
        pageSize: 10,
        pageNumber: 1,
      },
      page: {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 10,
      },
      result: {}
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
        url: '/redwood/returnreplace/listFinishedForPurchaserAndGuider',
        data: this.requestParams,
        contentType: 'application/json',
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.result = res.page.result
          this.page.pageSize = res.page.pageSize
          this.page.pageNumber = res.page.pageNumber
          this.page.totalCount = res.page.totalCount
        } else {
          this.$message.error(res.msg)
        }
        this.$store.dispatch('changeload', false)
      })
    },
    search() {
      this.getData()
    },
  }
}

</script>
