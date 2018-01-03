<template>
  <div v-loading.body="fullscreenLoading">
    <Tabs></Tabs>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.orderNumber">
          <template slot="prepend">订单号</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.outReposityNumber">
          <template slot="prepend">出仓单号</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.customerCompany">
          <template slot="prepend">欠款用户</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.customerNumber">
          <template slot="prepend">用户ID</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.followerLike">
          <template slot="prepend">跟单员</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.purchaserLike">
          <template slot="prepend">买货员</template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <span class='el-input-group__prepend'>是否还款给徒木</span>
        <el-select v-model="searchData.hasPayedXimu" class='c-select funtype-select'>
          <el-option v-for="option in repaymentItems" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span class='el-input-group__prepend'>赊销类型</span>
        <el-select v-model="searchData.creditType" class='c-select funtype-select'>
          <el-option v-for="option in creditSaleItems" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span class='el-input-group__prepend'>财务收款账户</span>
        <el-select v-model="searchData.financeAccountId" class='c-select funtype-select'>
          <el-option v-for="option in collectAccounts" :label="option.bankName" :value="option.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入内容" style="max-width:250px" class='fl' v-model="searchData.expectedDebtMoney">
          <template slot="prepend">应收欠款金额</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row class='bottom-row'>
      <el-col :span="10">
        <span class='front-label'>收欠款时间</span>
        <el-date-picker class='c-date-start' :editable="false" type="datetime" disabledDate='disabledStartDate' placeholder="选择开始时间" v-model="searchData.createTimeBegin">
        </el-date-picker>
        <span class='split-text'>至</span>
        <el-date-picker class='c-date-end' :editable="false" type="datetime" disabledDate='disabledEndDate' placeholder="选择结束时间" v-model="searchData.createTimeEnd">
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click.prevent="search">搜索</el-button>
        <el-button type="primary" @click.native="exportHandle">导出</el-button>
      </el-col>
    </el-row>
    <div class="msg_summary">
      <span>收回欠款总金额:
        <strong>{{totalRealDebtMoney}}元</strong>
      </span>
      <span>已用搜芽额度:
        <strong>{{totalUsedMoney}}元</strong>
      </span>
      <span>已用徙木额度:
        <strong>{{totalBaitiaoUsedMoney}}元</strong>
      </span>
      <span>滞纳金:
        <strong>{{totalLateFeesMoney}}元</strong>
      </span>
    </div>
    <el-table class="fixed-table" :data="list.length > 0 ? list : []" border :height="height">
      <el-table-column label="操作" width='100' fixed='right'>
        <template scope="scope">
          <template v-if="scope.row.category == 'jb-all' || scope.row.category == 'shop-dh'"></template>
          <template v-else>
            <router-link :to="{ path:'/finance/debt/debetDetail/' + scope.row.id }">
              <el-button size="mini">详情</el-button>
            </router-link>
          </template>
          <!--  <el-button size="mini" @click="jumpToPayDetail(scope.row.id, scope.row.type, scope.row.outReposityNumberList)">详情</el-button> -->
        </template>
      </el-table-column>
      <el-table-column label="收欠款时间" width="160">
        <template scope="scope">
          {{scope.row.confirmPayTime ? scope.row.confirmPayTime : '--'}}
        </template>
      </el-table-column>
      <el-table-column prop="serviceNumber" label="订单编号" width="160"></el-table-column>
      <el-table-column label="出仓单号" width="160">
        <template scope="scope">
          <template v-if="scope.row.category == 'all-all' || scope.row.category == 'dh-zy'">
            <span>{{scope.row.outReposityNumber}}</span>
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="已用搜芽额度/元" width="160">
        <template scope="scope">
          <template v-if="scope.row.category == 'all-all' || scope.row.category == 'dh-zy'">
            {{scope.row.creditType === 1 ? scope.row.usedMoney : '--'}}
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="已用徙木额度/元" width="160">
        <template scope="scope">
          <template v-if="scope.row.category == 'shop-dh' || scope.row.category == 'all-all' || scope.row.category == 'dh-zy'">
            {{scope.row.creditType === 2 ? scope.row.baitiaoUsedMoney : '--' }}
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="应收滞纳金/元" width="160">
        <template scope="scope">
          <template v-if="scope.row.category == 'shop-dh' || scope.row.category == 'all-all' || scope.row.category == 'dh-zy'">
            {{scope.row.expectedLateFeesMoney === null ? '--' : scope.row.expectedLateFeesMoney}}
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="实收滞纳金/元" width="160">
        <template scope="scope">
          {{scope.row.lateFeesMoney === null ? '--' : scope.row.lateFeesMoney }}
        </template>
      </el-table-column>
      <el-table-column label="应收欠款/元" width="160">
        <template scope="scope">
          {{scope.row.expectedDebtMoney === null ? '--' : scope.row.expectedDebtMoney}}
        </template>
      </el-table-column>
      <el-table-column label="实收欠款/元" width="160">
        <template scope="scope">
          {{scope.row.realDebtMoney === null ? '--' : scope.row.realDebtMoney}}
        </template>
      </el-table-column>
      <el-table-column label="赊销类型" width="160">
        <template scope="scope">
          <template v-if="scope.row.category != 'jb-all'">
            <template v-if="scope.row.creditType == '1'">
              <p>搜芽额度</p>
            </template>
            <template v-else>徙木额度</template>
          </template>
          <template v-else>--</template>
        </template>
      </el-table-column>
      <el-table-column label="欠款用户" prop="customerCompany" width="160"></el-table-column>
      <el-table-column label="欠款用户类型" width="160">
        <template scope="scope">
          <p>采购商</p>
        </template>
      </el-table-column>
      <el-table-column label="到账时间" width="160">
        <template scope="scope">
          {{scope.row.receivedTime ? scope.row.receivedTime : '--'}}
        </template>
      </el-table-column>
      <el-table-column label="用户ID" prop="customerNumber" width="160"></el-table-column>
      <el-table-column label="跟单员" width="160">
        <template scope="scope">
          {{scope.row.followerName}}/{{scope.row.followerTel}}
        </template>
      </el-table-column>
      <el-table-column label="买货员" prop="purchaserName" width="160"></el-table-column>
      <el-table-column label="财务收款账户" width="165">
        <template scope="scope">
          <template v-if="scope.row.category == 'all-all' || scope.row.category =='dh-zy'">
            {{scope.row.financeBank}}<br>{{scope.row.financeAccount}}
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="催缴状态" width="165">
        <template scope="scope">
          <p class="forgive-color">已催缴</p>
        </template>
      </el-table-column>
      <el-table-column label="财务备注" width="165" show-overflow-tooltip>
        <template scope="scope">
          <template v-if="scope.row.isEdit">
            <el-input v-model="scope.row.financeRemark" @keyup.enter.native="editRemark(scope.row)"></el-input>
          </template>
          <template v-else>
            <div @click="scope.row.isEdit = true">{{scope.row.financeRemark}}&nbsp;</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="是否还款给徙木" width="165">
        <template scope="scope">
          <template v-if="scope.row.category == 'shop-dh' || scope.row.category == 'all-all' || scope.row.category == 'dh-zy'">
            <template v-if="scope.row.hasPayedXimu == '1'">
              <p>是</p>
            </template>
            <template v-else>
              <p>否</p>
            </template>
          </template>
          <template v-else>
            <span>--</span>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <Pagination :page="pagination.pageNumber" :total="pagination.totalCount" :render="reqList" :options="pagination"></Pagination>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.pageNumber" :page-sizes="[20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import HeadFilter from 'components/headFilter/HeadFilter'
import Tabs from 'components/debtTabs'
import Lightbox from 'components/lightbox/lightbox'
import limitInput from 'components/limitInput.vue'
import AccountApi from 'api/account'
import Pagination from 'components/pagination'
import {
  newRequest,
  getCache,
  setCache,
  formatTimeString
} from 'common/utils'
export default {
  components: {
    Pagination,
    Lightbox,
    HeadFilter,
    Tabs,
    limitInput
  },
  data() {
    const filters = getCache({ // 通过方法里面调取缓存看sessionStorage里面是否存储的有数据没有的话就把下面的初始值付给他
      key: 'debtFilters',
    }) || {
        pageNumber: 1,
        pageSize: 20,
      };
    return {
      pickerOptions0: {
        disabledDate(time) {
          return Date.now() < time.getTime();
        }
      },
      height: '600',
      filters,
      searchData: {
        orderNumber: null, // 订单号
        outReposityNumber: null, // 出仓单号
        customerCompany: null, // 欠款用户
        customerNumber: null, // 用户Id
        followerLike: null, // 跟单员
        purchaserLike: null, // 买货员
        hasPayedXimu: null, // 是否还款给徒木
        creditType: null, // 赊销类型
        financeAccountId: null, // 财务收款账户
        expectedDebtMoney: null, // 应收欠款金额
        createTimeBegin: null, // 开始时间
        createTimeEnd: null, // 结束时间
      },
      fullscreenLoading: false,
      creditSaleItems: [ // 赊销类型种类
        { label: '全部', value: '' },
        { label: '徙木额度', value: '2' },
        { label: '搜芽额度', value: '1' }],
      repaymentItems: [ // 还款给徒木
        { label: '全部', value: '' },
        { label: '是', value: '1' },
        { label: '否', value: '0' }],
      collectAccounts: [], // 所有财务收款的账户
      pagination: {
        pageNumber: 1,
        totalCount: null,
        pageSize: 20,
      },
      list: [], // 列表的所有数据
      param: {}, // 列表的所有数据
      totalRealDebtMoney: null, // 实收欠款总金额
      totalUsedMoney: null, // 已用搜芽额度
      totalBaitiaoUsedMoney: null, // 已用徙木额度
      totalLateFeesMoney: null, // 实收滞纳金总和
    }
  },
  mounted() {
    this.height = String(window.document.body.clientHeight - 420);
    this.reqList();
    this.reqList();
    this.getCollectionAccount();
    this.getSummary()
  },
  filters: {
    formatNumber(val) {
      return Number(val).toFixed(2)
    }
  },
  methods: {
    getCollectionAccount() { // 获取财务收款账户
      newRequest({
        url: AccountApi.FinanceAccount.list,
        method: 'post'
      }).then((res) => {
        if (res.success == '1') {
          this.collectAccounts = res.result
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    search() { // 搜索的按钮
      this.param = {};
      for (let i in this.searchData) {
        if (this.searchData.hasOwnProperty(i) && this.searchData[i]) {
          this.param[i] = this.searchData[i];
        }
      }
      this.reqList();
      this.getSummary();
    },
    getSummary() { // 获取列表上面的那几条信息
      newRequest({
        url: AccountApi.PayDebt.getDoneSumary,
        method: 'get',
        data: this.param
      }).then((res) => {
        if (res.success == '1') {
          this.totalRealDebtMoney = res.obj.totalRealDebtMoney
          this.totalUsedMoney = res.obj.totalUsedMoney
          this.totalBaitiaoUsedMoney = res.obj.totalBaitiaoUsedMoney
          this.totalLateFeesMoney = res.obj.totalLateFeesMoney
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    exportHandle() { // 导出
      for (let i in this.searchData) {
        if (this.searchData.hasOwnProperty(i) && this.searchData[i]) {
          this.param[i] = this.searchData[i];
        }
      }
      newRequest({
        url: AccountApi.PayDebt.exportDone,
        method: 'get',
        data: this.param
      }).then((res) => {
        if (res.success == '1') {
          window.open(`http://www.soouya.com${res.obj}`)
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    reqList() { // 请求列表
      if (this.param.hasOwnProperty('createTimeBegin')) {
        this.param.createTimeBegin = this.param.createTimeBegin.getTime();
      }
      if (this.param.hasOwnProperty('createTimeEnd')) {
        this.param.createTimeEndcreateTimeEnd = this.param.createTimeEndcreateTimeEnd.getTime();
      }
      var param = Object.assign({}, this.pagination, this.param)
      console.log(this.pagination)
      console.log(param)
      newRequest({
        url: AccountApi.PayDebt.listDone,
        method: 'get',
        data: param
      }).then(data => {
        if (data.success === '1') {
          this.list = data.page.result;
          this.list.forEach((item) => {
            item.receivedTime = new Date(item.receivedTime).toLocaleString().replace(/\//g, '-').slice(0, 9);
            item.receivedTime = formatTimeString(item.receivedTime)
            item.confirmPayTime = formatTimeString(item.confirmPayTime)
            this.$set(item, 'isEdit', false);
          })
          this.pagination.pageNumber = data.page.pageNumber;
          this.pagination.totalCount = data.page.totalCount;
          this.pagination.pageSize = data.page.pageSize;
          setCache({
            key: 'debtFilters',
            value: this.filters,
          });
        } else {
          this.$message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1500
          })
        }
      })
    },
    handleCurrentChange(val) {  // 切换页数
      console.log(val)
      this.pagination.pageNumber = val
      this.reqList()
    },
    handleSizeChange(val) { // 切换每天的数据条数
      this.pagination.pageSize = val
      this.reqList();
    },
    editRemark(data) {
      newRequest({
        url: AccountApi.PayDebt.updateFinanceRemark,
        method: 'post',
        contentType: 'application/json',
        data: { id: data.id, financeRemark: data.financeRemark, _time: +new Date() }
      }).then((res) => {
        if (res.success == 1) {
          this.$message.success('修改成功')
          data.isEdit = false
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.bottom-row {
  margin-bottom: 15px
}

.el-pagination {
  margin-top: 15px;
  float: right
}

.el-form-item__content {
  text-align: left
}

.el-col-6 {
  margin-bottom: 15px;
}

.msg_summary {
  margin-bottom: 15px;
  span {
    display: inline-block;
    margin-right: 5%;
    strong {
      color: #f00;
    }
  }
}
</style>

