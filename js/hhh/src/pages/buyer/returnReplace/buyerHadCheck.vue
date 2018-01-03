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
            <el-table-column prop="purcahserReviewTime" label="退换货审核时间" align="left" :formatter="formatTime"></el-table-column>
            <el-table-column prop="inReposityNumber" label="入仓单号" align="left"></el-table-column>
            <el-table-column prop="outReposityNumber" label="出仓单号" align="left"></el-table-column>
            <el-table-column prop="" label="退换货数量" align="left">
              <template scope="scope">
                <span>{{scope.row.quantity}}{{scope.row.quantityUnit}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="现采购数量" prop="">
                      <template scope="scope">
                        <span>{{scope.row.needBuyQuantity}}{{scope.row.needBuyQuantityUnit}}</span>
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
            <el-table-column label="当前状态" align="left" prop="statusDescr">
            </el-table-column>
            <el-table-column min-width="100px" fixed="right" label="操作">
              <template scope="scope">
                <template v-if="scope.row.status == 3460 || scope.row.status == 3310">
                  <el-button type="primary" size="mini" @click.native="showCancelApplyDialog(item,scope.row)">取消退换货</el-button>
                  <router-link :to="{name: 'buyerEditOrder', query: {id: scope.row.id}}">
                    <el-button type="primary" size="mini">编辑</el-button>
                  </router-link>
                  <router-link :to="{name: 'hadCheckDetail', query:{id: scope.row.id}}">
                    <el-button type="primary" size="mini">详情</el-button>
                  </router-link>
                </template>
                <template v-if="scope.row.status == 3810">
                  <router-link :to="{name: 'buyerEditOrder', query: {id: scope.row.id}}">
                    <el-button type="primary" size="mini">编辑</el-button>
                  </router-link>
                </template>
                <template v-if="scope.row.status == 3810 || scope.row.status == 3820">
                  <router-link :to="{name: 'enterRrMessage', query:{id: scope.row.id}}">
                    <el-button type="primary" size="mini">录入换货信息</el-button>
                  </router-link>
                  <router-link :to="{name: 'hadCheckDetail', query:{id: scope.row.id}}">
                    <el-button type="primary" size="mini">详情</el-button>
                  </router-link>
                </template>
                <template v-if="scope.row.status == 3470 || scope.row.status == 3210 || scope.row.status == 3211 || scope.row.status == 3220 || scope.row.status == 3510">
                  <router-link :to="{name: 'hadCheckDetail', query:{id: scope.row.id}}">
                    <el-button type="primary" size="mini">详情</el-button>
                  </router-link>
                </template>
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
    <el-dialog v-model="cancelApplyDialogVisible" title="取消退换货">
      <div style="padding-left:25%; padding-right:25%;">
        <el-form label-position="right" label-width="100px">
          <el-form-item label="订单号">
            <span>{{cancelApplyDialogData.serviceNumber}}</span>
          </el-form-item>
          <el-form-item label="采购商">
            <span>{{cancelApplyDialogData.customerCompany}}</span>
          </el-form-item>
          <el-form-item label="退换货类型">
            <template v-if="cancelApplyDialogData.type == 1">
              <span>售前退货</span>
            </template>
            <template v-if="cancelApplyDialogData.type == 2">
              <span>售前换货</span>
            </template>
            <template v-if="cancelApplyDialogData.type == 3">
              <span>售后退货</span>
            </template>
            <template v-if="cancelApplyDialogData.type == 4">
              <span>售后换货</span>
            </template>
          </el-form-item>
          <el-form-item label="退换数量">
            <span>{{cancelApplyDialogData.quantity}}{{cancelApplyDialogData.quantityUnit}}</span>
          </el-form-item>
          <el-form-item label="取消原因" :required="true">
            <el-input v-model="cancelApplyData.cancelReason" type="textarea" @input="calWordCount" placeholder="请输入取消原因"></el-input>
            <span style="color:#f00;margin-left:90%;">{{wordCount}}/500</span>
          </el-form-item>
          <el-form-item style="display: inline-block">
            <el-button :disabled="unableConfirmBtn" type="primary" @click.native="confirmCancel" size="small">确认取消</el-button>
            <el-button size="small" @click.native="cancelApplyDialogVisible = false">暂不取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
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
      cancelApplyDialogVisible: false,
      wordCount: 0,
      unableConfirmBtn: true,
      cancelApplyDialogData: {
        serviceNumber: '',
        customerCompany: '',
        type: 1,
        quantity: 1,
        quantityUnit: '',
      },
      cancelApplyData: {
        id: '',
        cancelReason: '',
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
      // let res = config.hadCheck
      // console.log(res)
      newRequest({
        url: '/redwood/returnreplace/listReviewedForPurchaserAndGuider',
        method: 'get',
        data: this.requestParams,
        contentType: 'application/json',
      }).then((res) => {
        if (res.success == 1) {
          this.allData = res.page.result
          this.page.pageSize = res.page.pageSize
          this.page.pageNumber = res.page.pageNumber
          this.page.totalCount = res.page.totalCount
          console.log(this.page)
        } else {
          this.$message.error(res.msg)
        }
      })
      Tabs.methods.getTab()
      this.$store.dispatch('changeload', false)
    },
    confirmCancel() {
      this.$store.dispatch('changeload', true)
      newRequest({
        url: '/redwood/returnreplace/cancel',
        method: 'post',
        data: this.cancelApplyData,
        contentType: 'application/json',
      }).then((res) => {
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.cancelApplyDialogVisible = false
          this.getData()
          Tabs.methods.getTab()
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
    },
    showCancelApplyDialog(item, data) {
      console.log(item, data)
      this.cancelApplyData.id = data.id
      this.cancelApplyDialogData.serviceNumber = item.order.serviceNumber
      this.cancelApplyDialogData.customerCompany = item.order.customerCompany
      this.cancelApplyDialogData.type = data.type
      this.cancelApplyDialogData.quantity = data.quantity
      this.cancelApplyDialogData.quantityUnit = data.quantityUnit
      this.cancelApplyDialogVisible = true
    },
    calWordCount() {
      this.wordCount = this.cancelApplyData.cancelReason.length
      if (this.wordCount > 500) {
        this.$message('备注不能超500字')
        this.unableConfirmBtn = true
      } else if (this.wordCount < 5) {
        this.unableConfirmBtn = true
      } else {
        this.unableConfirmBtn = false
      }
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
