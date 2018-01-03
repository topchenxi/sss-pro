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
      <div class="main-content style-1 mb20" :style="{height: windowHeight - 300 + 'px'}">
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
                <col width="11%">
                <col width="12%">
                <col width="11%">
                <col width="9%">
                <col width="11%">
                <col width="11%">
                <col width="11%">
              </colgroup>
              <thead>
                <tr>
                  <th>退换货单号</th>
                  <th>退换货申请时间</th>
                  <th>入仓单号</th>
                  <th>出仓单号</th>
                  <th>退换货数量</th>
                  <th>退换货类型</th>
                  <th>当前状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tableItem,tableIndex) in item.list" :key="tableIndex">
                  <!-- 退换货单号 -->
                  <td>{{tableItem.number}}</td>
                  <!-- 退换货申请时间 -->
                  <td>{{tableItem.createTime | formatTime}}</td>
                  <!-- 入仓单号 -->
                  <td>{{tableItem.inReposityNumber}}</td>
                  <!-- 出仓单号 -->
                  <td>{{tableItem.outReposityNumber}}</td>
                  <!-- 退换货数量 -->
                  <td>{{tableItem.quantity}}{{tableItem.quantityUnit}}/{{tableItem.clothLoneListSize}}匹</td>
                  <!-- 退换货类型 -->
                  <td>
                    <template v-if="tableItem.type == 1">
                      售前退货
                    </template>
                    <template v-if="tableItem.type ==2">
                      售前换货
                    </template>
                  </td>
                  <!-- 当前状态 -->
                  <td>
                    {{tableItem.statusDescr}}
                  </td>
                  <!-- 操作 -->
                  <td class="op ta-l">
                    <template v-if="tableItem.status == 3310 || tableItem.status == 3460">
                      <!-- 操作待定 -->
                      <router-link :to="{name: 'guiderEditRrOrder', query: {id: tableItem.id}}">
                        <el-button class="table-btn">编辑</el-button>
                      </router-link>
                      <el-button class="table-btn" @click.native="showDialog(tableItem, item)">取消退换货</el-button>
                    </template>
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
    <el-dialog size="tiny" v-model="dialogVisible" title="取消退换货">
      <el-form label-width="100px" label-position="right">
        <el-form-item label="订单号">
          <span>{{item.order.serviceNumber}}</span>
        </el-form-item>
        <el-form-item label="采购商">
          <span>{{item.order.customerCompany}}</span>
        </el-form-item>
        <el-form-item label="退换货类型">
          <template v-if="dialogData.type == 1">
            <span>售前退货</span>
          </template>
          <template v-if="dialogData.type == 2">
            <span>售前换货</span>
          </template>
        </el-form-item>
        <el-form-item label="退换数量">
          <span>{{dialogData.quantity}}{{dialogData.quantityUnit}}</span>
        </el-form-item>
        <el-form-item required label="取消原因">
          <el-input style="width:220px;" type="textarea" v-model="reqCancelParams.cancelReason"></el-input>
          <span style="color:#f00; margin-left:190px;">{{reqCancelParams.cancelReason.length}}/500</span>
          <p class="red f12" v-if="reqCancelParams.cancelReason.length<5&&reqCancelParams.cancelReason.length!=0">取消原因不能少于5个字符</p>
        </el-form-item>
      </el-form>
      <footer style="padding-left:150px;">
        <el-button type="primary" size="small" @click.native="confirmCancel" :disabled="reqCancelParams.cancelReason.length<5||reqCancelParams.cancelReason.length>500">确认取消</el-button>
        <el-button size="small" @click.native="dialogVisible=false,reqCancelParams.cancelReason = ''">暂不取消</el-button>
      </footer>
    </el-dialog>
  </section>
</template>
<script>
import Tab from '../index.vue'
import Pagination from 'components/pagination.vue'
import bus from '../eventBus'
import { newRequest } from 'utils/tool'
export default {
  components: {
    Pagination,
    Tab,
  },
  data() {
    return {
      item: {
        order: {},
      },
      dialogData: {},
      dialogVisible: false,
      reqCancelParams: {
        id: '',
        cancelReason: '',
      },
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
      result: []
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
      this.$store.dispatch('changeload', true)
      newRequest({
        url: '/redwood/returnreplace/listReviewedForPurchaserAndGuider',
        data: this.requestParams,
        contentType: 'application/json',
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.result = res.page.result
          this.page.pageSize = res.page.pageSize
          this.page.pageNumber = res.page.pageNumber
          this.page.totalCount = res.page.totalCount
          bus.$emit('guiderReviewed', res.page.totalCount)
        } else {
          this.$message.error(res.msg)
        }
        this.$store.dispatch('changeload', false)
      })
    },
    // 点击确认取消退换货按钮响应
    confirmCancel() {
      newRequest({
        url: '/redwood/returnreplace/cancel',
        data: this.reqCancelParams,
        method: 'post',
        contentType: 'application/json',
      }).then((res) => {
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg,
          })
          this.dialogVisible = false
          this.search()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 点击申请退换货的响应
    showDialog(row, item) {
      this.item = item
      console.log(item)
      this.dialogData = row
      this.reqCancelParams.id = row.id
      this.dialogVisible = true
    },
    search() {
      this.getData()
    },
  }
}

</script>
