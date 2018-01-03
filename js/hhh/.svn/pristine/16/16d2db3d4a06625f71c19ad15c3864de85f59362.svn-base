<template>
  <section style="min-width:1300">
    <div class="oms-content">
      <div class="search-content">
        <div class="row">
          <div class="item w360">
            <el-input placeholder="订单号/采购商/供应商" v-model="params.keyword" @keyup.enter.native="search"></el-input>
          </div>
          <el-button type="primary" @click.native="search">搜索</el-button>
        </div>
      </div>
      <div class="main-wrap">
        <div class="main-content style-1" :style="{height:windowHeight-275+'px'}">
          <div class="table-wrap" v-if="list.length">
            <table class="table">
              <colgroup>
                <!-- 订单号 -->
                <col width="8%">
                <!-- 申请退款时间 -->
                <col width="8%">
                <!-- 销售员 -->
                <col width="10%">
                <!-- 订单总金额(元) -->
                <col width="8%">
                <!-- 采购商 -->
                <col width="10%">
                <!-- 供应商 -->
                <col width="7%">
                <!-- 品类 -->
                <col width="6%">
                <!-- 货源 -->
                <col width="6%">
                <!-- 采购数量 -->
                <col width="8%">
                <!-- 供应商应退(元) -->
                <col width="8%">
                <!-- 操作 -->
              </colgroup>
              <thead>
                <tr>
                  <th>订单号</th>
                  <th>申请退款时间</th>
                  <th>销售员</th>
                  <th>订单总金额(元)</th>
                  <th>采购商</th>
                  <th>供应商</th>
                  <th>品类</th>
                  <th>货源</th>
                  <th>采购数量</th>
                  <th>供应商应退(元)</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <!-- 订单号 -->
                  <td>{{item.serviceNumber}}</td>
                  <!-- 申请退款时间 -->
                  <td>
                    <p>{{item.createTime | date('yyyy-MM-dd')}}</p>
                    <p>{{item.createTime | date('hh:mm:ss')}}</p>
                  </td>
                  <!-- 销售员 -->
                  <td>{{item.salesName}}</td>
                  <!-- 订单总金额 -->
                  <td><span class="money">{{item.saleMoney | formatMoney}}</span></td>
                  <!-- 采购商 -->
                  <td class="ta-l">{{item.customerCompany}}</td>
                  <!-- 供应商 -->
                  <td>{{item.shopCompany}} <br> {{item.customerNumber}}</td>
                  <!-- 品类 -->
                  <td>
                    {{item.productType | productTypeFilter}}
                  </td>
                  <!-- 货源 -->
                  <td>
                    <span v-if="item.productSource == 0">现货</span>
                    <span v-if="item.productSource == 1">订货</span>
                  </td>
                  <!-- 采购数量 -->
                  <td>{{item.totalQuantity}} {{item.quantityUnit}}/{{item.colorCount}}色</td>
                  <!-- 供应商应退 -->
                  <td><span class="money">{{item.sellerRefund | formatMoney}}</span></td>
                  <td>
                    <el-button class="table-btn submit" @click="cancelApply(item)">取消申请</el-button>
                    <router-link :to="{path: '/index/guider/refund/guiderShopCompanyRefundDetail', query: {detailType: 'edit',id: item.id } }">
                      <el-button class="table-btn submit">编辑</el-button>
                    </router-link>
                    <router-link :to="{path: '/index/guider/refund/guiderShopCompanyRefundDetail', query: {detailType: 'detail',id: item.id}}">
                      <el-button class="table-btn">详情</el-button>
                    </router-link>
                    <el-tooltip placement="top">
                      <span slot="content">{{item.reason}}</span>
                      <span class="font-reason" style="width:70px;">退款原因</span>
                    </el-tooltip>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="empty" v-if="!list.length"></div>
        </div>
        <Page :total="total" :params="params" @toSearch="getList"></Page>
      </div>
    </div>
    <el-dialog :visible.sync="cancelVisible" size="tiny" title="取消申请">
      <el-form :model="cancelForm" class="form-dialog">
        <el-form-item label="订单号">
          {{cancelForm.serviceNumber}}
        </el-form-item>
        <el-form-item label="采购商">
          {{cancelForm.customerCompany}}
        </el-form-item>
      </el-form>
      <div class="form-btn-group">
        <el-button type="primary" class="btn-submit" @click.native="confirmCancel">确定取消</el-button>
        <el-button type="primary" class="btn-cancel" @click.native="cancelVisible = false">暂不取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import Pagination from 'components/pagination.vue'
import { newRequest } from 'utils/tool';
import { sellerRefundingList } from 'src/service/guider';
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      params: {
        pageSize: 10,
        pageNumber: 1,
        keyword: '',
        orderStatus: 368,
      },
      list: [],
      total: 0,
      cancelForm: {},
      cancelVisible: false
    }
  },
  mounted() {
    this.getList()
  },
  filters: {
    productTypeFilter(value) {
      switch ('' + value) {
        case '0':
          return '花型';
        case '1':
          return '面料';
        case '2':
          return '辅料';
        case '3':
          return '底布';
        case '4':
          return '花布';
        default:
          return '';
      }
    }
  },
  methods: {
    async getList() {
      this.$store.dispatch('changeload', true)
      let res = await sellerRefundingList(this.params);
      if (res.success == 1) {
        this.total = res.page.totalCount
        this.list = res.page.result
      }
      this.$store.dispatch('changeload', false)
    },
    search() {
      this.getList()
    },
    cancelApply(row) {
      this.cancelForm = row
      this.cancelVisible = true
    },
    confirmCancel() {
      newRequest({
        url: '/redwood/returnReplaceOnlyRefund/cancelApply',
        data: this.cancelForm.id,
        method: 'post',
        contentType: 'application/json'
      }).then((res) => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.cancelVisible = false
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}

</script>
