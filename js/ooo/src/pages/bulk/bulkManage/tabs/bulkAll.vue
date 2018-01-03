<template>
  <section v-loading.body="fullScreenLoading">
    <div class="search-content">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input @keyup.enter.native="getData" v-model="reqParams.key" placeholder="订单号/供应商名称/采购商名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="reqParams.followerId" class="width251" @change="search">
            <el-option label="全部跟单员" value=""></el-option>
            <el-option v-for="(item,index) in followerLeadersList" :key="index" :value="item.id" :label="item.realName ? item.realName : item.userName"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="reqParams.salerId" class="width251" @change="search">
            <el-option label="全部销售员" value=""></el-option>
            <el-option v-for="(item,index) in salersList" :key="index" :value="item.id" :label="item.realName ? item.realName : item.userName"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="reqParams.purchaserId" class="width251" @change="search">
            <el-option label="全部买货员" value=""></el-option>
            <el-option v-for="(item,index) in buyersList" :key="index" :value="item.id" :label="item.realName ? item.realName : item.userName"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="reqParams.guiderId" class="width251" @change="search">
            <el-option label="全部采购员" value=""></el-option>
            <el-option v-for="(item,index) in guidersList" :key="index" :value="item.id" :label="item.realName ? item.realName : item.userName"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="reqParams.statuses" placeholder="全部订单状态" class="width251 top-margin12" @change="search">
            <el-option label="全部订单状态" value="10,300,303,304,305,311,312,316,328,326,335,338,339,346,347,351,352,310,388,100,366,368"></el-option>
            <el-option label="等待通知询价" value="300"></el-option>
            <el-option label="等待报价" value="304"></el-option>
            <el-option label="等待录入大货信息" value="305"></el-option>
            <el-option label="等待销售入仓" value="310"></el-option>
            <el-option label="履约中" value="388"></el-option>
            <el-option label="等待采购商支付订金" value="312"></el-option>
            <el-option label="等待采购商付款" value="316"></el-option>
            <el-option label="等待收付订金" value="326"></el-option>
            <el-option label="等待收付款" value="328"></el-option>
            <el-option label="等待录入尾款信息" value="335"></el-option>
            <el-option label="等待采购商支付尾款" value="339"></el-option>
            <el-option label="等待收付尾款" value="346"></el-option>
            <el-option label="等待指派提货" value="347"></el-option>
            <el-option label="等待确认提货时间" value="351"></el-option>
            <el-option label="等待确认供应商送货时间" value="352"></el-option>
            <el-option label="供应商退款申请中" value="366"></el-option>
            <el-option label="财务处理退款中" value="368"></el-option>
            <el-option label="已完成" value="10"></el-option>
            <el-option label="已取消" value="100"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8" class="time-minWidth top-margin12">
          <el-date-picker v-model="reqParams.createTimeBegin" type="date" placeholder="选择日期时间">
          </el-date-picker>
          -
          <el-date-picker v-model="reqParams.createTimeEnd" type="date" placeholder="选择日期时间">
          </el-date-picker>
        </el-col>
        <el-col :span="4" class="top-margin12">
          <el-button type="primary" @click.native="search">搜索</el-button>
          <el-button @click.native="reset">重置</el-button>
          <el-button @click.native="getData(1)" type="primary">导出excel</el-button>
        </el-col>
      </el-row>
    </div>
    <Tab></Tab>
    <div class="el-bulkTable-content">
      <el-table :data="tableData" :height="tableHeight" border>
        <el-table-column label="大货类型" prop="" width="100" class="left">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">服务单</span>
            <span v-if="scope.row.type == 2">贸易单</span>
            <span v-if="scope.row.type == 3">采购单</span>
          </template>
        </el-table-column>
        <el-table-column label="货源" prop="" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.productSource == 0">现货</span>
            <span v-if="scope.row.productSource == 1">订货</span>
          </template>
        </el-table-column>
        <el-table-column label="订单号" prop="number" width="200" align="left"></el-table-column>
        <el-table-column label="订单发布时间" prop="createTime" width="160" align="left" :formatter="formatTime"></el-table-column>
        <el-table-column label="订单状态" prop="" width="120" align="left">
          <template slot-scope="scope">
            <span class="forgive-color">{{scope.row.statusDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="金融客户" prop="" width="100">
          <template slot-scope="scope">
            <span class="icon-baitiao" v-if="scope.row.customerHasOpenedBaitiao == 1"></span>
            <span class="icon-feibaitiao" v-if="scope.row.customerHasOpenedBaitiao == 0"></span>
            <span class="icon-yanzhen" v-if="scope.row.customerHasOpenedYanzhen == 1"></span>
            <span class="icon-feiyanzhen" v-if="scope.row.customerHasOpenedYanzhen == 0"></span>
          </template>
        </el-table-column>
        <el-table-column label="采购商名称" prop="customerCompany" width="180" align="left"></el-table-column>
        <el-table-column label="供应商名称" prop="showShopCompany" width="160" align="left"></el-table-column>
        <el-table-column label="采购数量" prop="" width="140" align="right">
          <template slot-scope="scope">
            <span>{{scope.row.quantity | formatNumber}}{{scope.row.quantityUnit}}/{{scope.row.colorNumber}}色</span>
          </template>
        </el-table-column>
        <el-table-column label="销售货款" prop="saleMoney" width="120" align="right" :formatter="formatNumber"></el-table-column>
        <el-table-column label="采购商税款" width="140" align="right">
          <template slot-scope="scope">
            <span>{{scope.row.taxMoney | formatNumber}}({{scope.row.taxPoint | formatNumber }}%)</span>
          </template>
        </el-table-column>
        <el-table-column label="服务费" prop="serviceMoney" width="120" align="right" :formatter="formatNumber"></el-table-column>
        <el-table-column label="跟单员" prop="" width="120" align="left">
          <template slot-scope="scope">
            <span v-if="scope.row.type < 3">{{scope.row.followerName}}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="买货员" prop="purchaserName" width="120" align="left"></el-table-column>
        <el-table-column label="销售员" prop="salerName" width="120" align="left"></el-table-column>
        <el-table-column label="采购员" prop="guiderName" width="120" align="left"></el-table-column>
        <el-table-column label="操作" prop="" width="150" align="left" fixed="right">
          <template slot-scope="scope">
            <!-- <router-link :to="{name: 'bulkDetail', query: {id: scope.row.id, customerId: scope.row.customerId}}">
              <el-button class="width50" type="primary" size="mini">详情</el-button>
            </router-link> -->
            <a :href="formatHongshanUrl(`/guider/allAllDetail?id=${scope.row.id}`)" target="_blank">
              <el-button class="width50" type="primary" size="mini">详情</el-button>
            </a>
            <el-button v-if="([305,304].indexOf(scope.row.status) > -1) &&  (!woodFinance || woodAdmin)" @click.native="showOrderDialog(scope.row)" size="mini" type="warning">指派询价</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-content">
      <pagination :page="page.pageNumber" :total="page.totalCount" :render="getData" :options="reqParams"></pagination>
    </div>
    <el-dialog v-model="orderDialogVisible" size="tiny" title="指派询价" class="order-dialog">
      <el-form>
        <el-form-item>
          <p>订单号：{{dialogData.number}}</p>
        </el-form-item>
        <el-form-item>
          <p>订单状态：
            <span class="forgive-color">{{dialogData.statusDesc}}</span>
          </p>
        </el-form-item>
        <el-form-item>
          <p>
            <i class="icon-cai">采</i> 采购商：{{dialogData.customerCompany}}
          </p>
        </el-form-item>
        <el-form-item>
          <p>
            <i class="icon-gong">供</i> 供应商：{{dialogData.showShopCompany}}
          </p>
        </el-form-item>
        <el-form-item>
          <p>采购数量：{{dialogData.quantity | formatNumber}} {{dialogData.quantityUnit}}</p>
        </el-form-item>
        <el-form-item style="margin-top: 10px;">
          <p>订单总金额：
            <span class="red-color">￥{{dialogData.saleMoney | formatNumber}}</span>
          </p>
        </el-form-item>
        <el-form-item required label="选择采购员" v-if="dialogData.status == 304">
          <el-select style="margin-left:15px;width:250px;" v-model="reqOrderParams.guiderId">
            <el-option v-for="(item,index) in guidersList" :value="item.id" :key="index" :label="item.realName || item.uesrName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="选择买货员" v-if="dialogData.status == 305">
          <el-select style="margin-left:15px;width:250px;" v-model="reqOrderParams.id">
            <el-option v-for="(item,index) in buyersList" :value="item.id" :key="index" :label="item.realName || item.uesrName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <footer>
        <el-button @click.native="orderDialogVisible = false" size="small">取消</el-button>
        <el-button @click.native="confirmOrder" :disabled="!reqOrderParams.id && !reqOrderParams.guiderId" type="primary" size="small">确定</el-button>
      </footer>
    </el-dialog>
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
      orderDialogVisible: false,
      fullScreenLoading: false,
      guidersList: [],
      buyersList: [],
      salersList: [],
      followerLeadersList: [],
      tableData: [],
      dialogData: {},
      tableHeight: 600,
      woodAdmin: auth.woodAdmin,
      woodFinance: auth.woodFinance,
      reqOrderParams: {
        _time: '',
        guiderId: '',
        orderNumber: '',
        id: ''
      },
      reqParams: {
        key: '',
        pageSize: 20,
        pageNumber: 1,
        _function: 'all',
        listAll: 1,
        export: 0,
        createTimeBegin: '',
        createTimeEnd: '',
        followerId: '',
        purchaserId: '',
        salerId: '',
        guiderId: '',
        statuses: '10,300,303,304,305,311,312,316,328,326,335,338,339,346,347,351,352,310,388,100,366,368'
      },
      page: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 20,
      }
    }
  },
  mounted() {
    this.tableHeight = document.body.clientHeight - 250
    this.getData()
    this.getSeedList()
  },
  methods: {
    getData(exportExcel = 0) {
      this.fullScreenLoading = true
      this.reqParams.export = exportExcel
      if (this.reqParams.createTimeBegin) {
        this.reqParams.createTimeBegin = new Date(this.reqParams.createTimeBegin).getTime()
      }
      if (this.reqParams.createTimeEnd) {
        let cte = new Date(this.reqParams.createTimeEnd).getTime()
        let cty = new Date(cte).getFullYear()
        let ctm = new Date(cte).getMonth() + 1
        let ctd = new Date(cte).getDate()
        let ctimee = new Date(cty + '/' + ctm + '/' + ctd).getTime()
        this.reqParams.createTimeEnd = ctimee + 24 * 3600 * 1000 - 1000
      }
      request('/redwood/bulk', {
        data: this.reqParams,
        method: 'GET',
      }).then(res => {
        if (res.success == 1) {
          if (this.reqParams.export == 0) {
            this.tableData = res.page.result
            this.page.pageSize = res.page.pageSize
            this.page.pageNumber = res.page.pageNumber
            this.page.totalCount = res.page.totalCount
          } else {
            window.open(`${res.obj}`)
          }
        } else {
          this.$message.error(res.msg)
        }
        this.fullScreenLoading = false
      })
    },
    confirmOrder() {
      this.fullScreenLoading = true
      if (this.dialogData.status == 304) {
        request('/redwood/bulk/reAssignGuider', {
          data: this.reqOrderParams,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          this.fullScreenLoading = false
          if (res.success == 1) {
            this.orderDialogVisible = false
            this.$message.success(res.msg)
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        request('/redwood/buyfollow/OrderProcess/assignAskPrice.do', {
          data: this.reqOrderParams,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          this.fullScreenLoading = false
          if (res.success == 1) {
            this.orderDialogVisible = false
            this.$message.success(res.msg)
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    search() {
      this.reqParams.export = 0
      this.getData()
    },
    getSeedList() {
      request('/crm/user/User/listRedSeedByCodes', {
        data: {
          param: JSON.stringify({ code: 'woodGuider,woodGuiderLeader' })
        },
        method: 'POST'
      }).then(res => {
        if (res.success == 1) {
          this.guidersList = res.list
        } else {
          this.$message.error(res.msg)
        }
      })
      request('/crm/user/User/listRedSeedByCodes', {
        data: {
          param: JSON.stringify({ code: 'woodFollowLeader' })
        },
        method: 'POST'
      }).then(res => {
        if (res.success == 1) {
          this.followerLeadersList = res.list
        } else {
          this.$message.error(res.msg)
        }
      })
      request('/redwood/sys/OmsSeed/listPurchaser4OMS', {
        data: {
          param: JSON.stringify({ status: 1 })
        },
        method: 'POST'
      }).then(res => {
        if (res.success == 1) {
          this.buyersList = res.result
        } else {
          this.$message.error(res.msg)
        }
      })
      request('/redwood/sys/OmsSeed/listXiaoShou4OMS', {
        data: {
          param: JSON.stringify({ status: 1 })
        },
        method: 'POST'
      }).then(res => {
        if (res.success == 1) {
          this.salersList = res.result
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showOrderDialog(item) {
      this.dialogData = item
      this.reqOrderParams._time = new Date().getTime()
      this.reqOrderParams.orderNumber = item.id
      if (item.status == 304) {
        this.reqOrderParams.guiderId = item.guiderId
        this.reqOrderParams.id = ''
      } else {
        this.reqOrderParams.id = item.purchaserId
        this.reqOrderParams.guiderId = ''
      }
      this.orderDialogVisible = true
    },
    reset() {
      this.reqParams.key = ''
      this.reqParams.createTimeBegin = ''
      this.reqParams.createTimeEnd = ''
      this.reqParams.followerId = ''
      this.reqParams.salerId = ''
      this.reqParams.purchaserId = ''
      this.reqParams.guiderId = ''
      this.reqParams.statuses = '10,300,303,304,305,311,312,316,328,326,335,338,339,346,347,351,352,310,388,100,366,368'
      this.getData()
    }
  }
}

</script>
<style lang="scss">
.order-dialog {
  .el-form {
    .el-form-item {
      margin-bottom: 0px;
    }
  }
}

.top-margin12 {
  margin-top: 12px;
}

</style>
