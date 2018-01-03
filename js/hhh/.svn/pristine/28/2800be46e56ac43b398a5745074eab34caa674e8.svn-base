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
            <el-table-column prop="inReposityNumber" label="入仓单号" align="left"></el-table-column>
            <el-table-column prop="outReposityNumber" label="出仓单号" align="left"></el-table-column>
            <el-table-column label="退换货数量" align="left">
              <template scope="scope">
                <!--检查参数是否完整  -->
                <span>{{scope.row.quantity}}{{scope.row.quantityUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column label="客户退回入仓时间" prop="sendbackInReposityTime" :formatter="formatTime"></el-table-column>
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
            <el-table-column label="制单人" align="center" prop="creatorName"></el-table-column>
            <el-table-column min-width="100px" fixed="right" label="操作">
              <template scope="scope">
                <!--按钮事件待添加  -->
                <template v-if="scope.row.status == 3400 || scope.row.status ==3300">
                  <router-link :to="{name: 'buyerCheck', query:{id: scope.row.id}}">
                    <el-button size="mini" type="primary">审核</el-button>
                  </router-link>
                  <el-button size="mini" type="primary" @click.native="showDialog(item, scope.row)">打回跟单</el-button>
                  <router-link :to="{name: 'waitCheckDetail', query: {id: scope.row.id}}">
                    <el-button size="mini" type="primary">详情</el-button>
                  </router-link>
                </template>
                <template v-if="scope.row.status == 3610 || scope.row.status == 3600">
                  <router-link :to="{name: 'waitCheckDetail', query: {id: scope.row.id}}">
                    <el-button type="primary" size="mini">详情</el-button>
                  </router-link>
                </template>
                <template v-if="scope.row.status == 3700 || scope.row.status == 3710">
                  <router-link :to="{name: 'buyerCheck', query:{id: scope.row.id}}">
                    <el-button size="mini" type="primary">审核</el-button>
                  </router-link>
                  <router-link :to="{name: 'waitCheckDetail', query: {id: scope.row.id}}">
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
    <el-dialog v-model="dialogVisible" title="打回跟单">
      <div style="margin-left:25%;">
        <el-form class="form-box" label-position="right" label-width="100px">
          <el-form-item label="订单号">
            <span>{{dialogData.serviceNumber}}</span>
          </el-form-item>
          <el-form-item label="采购商">
            <span>{{dialogData.customerCompany}}</span>
          </el-form-item>
          <el-form-item label="退换类型">
            <template v-if="dialogData.type == 1 || dialogData.type == 3">
              <span>退货</span>
            </template>
            <template v-if="dialogData.type == 2 || dialogData.type == 4">
              <span>换货</span>
            </template>
          </el-form-item>
          <el-form-item label="退换数量">
            <span>{{dialogData.quantity}}{{dialogData.quantityUnit}}</span>
          </el-form-item>
          <el-form-item label="打回原因" :required="true">
            <el-input type="textarea" style="width:250px; margin-top:12px;" @input="calWordCount" v-model="requestData.purcahserExceptReson"></el-input>
            </br>
            <span style="margin-left:220px; color:#f00">{{wordCount}}/500</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" :disabled="unableConfirmBtn" @click.native="confirmSubmit">确认打回</el-button>
            <el-button size="small" @click.native="dialogVisible = false">暂不打回</el-button>
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
      requestParams: {
        keyword: '',
        type: '',
        pageSize: 10,
        pageNumber: 1,
      },
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
      wordCount: 0,
      dialogData: {},
      requestData: {
        id: '',
        purcahserExceptReson: '',
        agreeOrNot: 0,
      },
      dialogVisible: false,
      unableConfirmBtn: true,
      page: {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 10,
      },
      // 待修改
      allData: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      newRequest({
        url: '/redwood/returnreplace/listWaitReviewForPurchaser',
        data: this.requestParams,
        contentType: 'application/json',
        method: 'get',
      }).then((res) => {
        if (res.success == 1) {
          this.allData = res.page.result
          this.page.pageNumber = res.page.pageNumber
          this.page.pageSize = res.page.pageSize
          this.page.totalCount = res.page.totalCount
          console.log(this.allData)
        } else {
          this.$message.error(res.msg)
        }
      })
      this.$store.dispatch('changeload', false)
      // let res = config.waitCheck
      // this.allData = res.page.result
    },
    confirmSubmit() {
      this.$store.dispatch('changeload', true)
      newRequest({
        url: '/redwood/returnreplace/review',
        method: 'post',
        data: this.requestData,
        contentType: 'application/json',
      }).then((res) => {
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.dialogVisible = false
          this.getData()
          Tabs.methods.getTab()
        } else {
          this.$message.error(res.msg)
        }
      })
      this.$store.dispatch('changeload', false)
    },
    search() {
      // this.requestParams.pageNumber = this.page.pageNumber
      // this.requestParams.pageSize = this.page.pageSize
      this.$store.dispatch('changeload', true)
      this.getData()
    },
    showDialog(item, row) {
      console.log(item)
      this.dialogData = row
      this.dialogData.serviceNumber = item.order.serviceNumber
      this.dialogData.customerCompany = item.order.customerCompany
      this.requestData.id = row.id
      console.log(this.dialogData)
      this.dialogVisible = true
    },
    calWordCount() {
      this.wordCount = this.requestData.purcahserExceptReson.length
      if (this.wordCount > 500) {
        this.$message('备注不能超500字')
        this.unableConfirmBtn = true
      } else if (this.wordCount < 5) {
        this.unableConfirmBtn = true
      } else {
        this.unableConfirmBtn = false
      }
    }
  },
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
