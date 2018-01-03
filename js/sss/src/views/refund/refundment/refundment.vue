<template>
<div class="pending-account" v-loading.fullscreen="fullscreenLoading">
  <h1 class="title" style="font-size: 25px; padding: 15px">退款处理</h1>
  <HeadFilter v-on:getParams="getFilter" :param="filters"></HeadFilter>
  <p style='margin: 15px 0'>
    <el-button type="primary" @click.native="handleDispatch" :disabled="!hasSelect">批量退款</el-button>
  </p>
  <div class="">
    <el-table class="fixed-table" :data="pendingAccountListData.result"border :height="height" @selection-change="handleMultipleSelectionChange">

      <el-table-column type="selection" width="50" fixed="left"></el-table-column>
      <el-table-column show-tooltip-when-overflow property="confirmPayTime" label="进入待退款时间" width="160" :formatter="formatTime"></el-table-column>
      <el-table-column property="serviceNumber" label="订单号" width="200" show-tooltip-when-overflow></el-table-column>
      <el-table-column inline-template width='200' label="退换货单号">
        <div>
          <div v-if="row.replaceOrReturnNo.length > 1">
            <select>
              <option v-for="item in row.replaceOrReturnNo">{{item}}</option>
            </select>
          </div>
          <div v-else>
            <p v-for="item in row.replaceOrReturnNo">{{item}}</p>
          </div>
        </div>
      </el-table-column>
      <el-table-column property="buyerCompany" label="采购商" width="150" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="sellerCompany" label="供应商" width="150" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="refundMoney" label="搜芽应退款金额/元" show-tooltip-when-overflow width="140"></el-table-column>
      <el-table-column property="replaceOrReturnType" label="退换类型" width="150" show-tooltip-when-overflow :formatter="formatType"> </el-table-column>
      <el-table-column property="payStatus" label="退款状态" width="150" show-tooltip-when-overflow :formatter="formatStatus"> </el-table-column>

      <el-table-column inline-template label="操作" width="190" fixed="right">
        <div>
          <template v-if="row.refundMoney != 0">
            <router-link :to="{ path:'/refund/refundment/accountInfo/'+row.id }"><el-button size="mini">退款</el-button></router-link>
            <router-link :to="{ path:'/refund/refundment/payOutline/'+row.id }"><el-button size="mini">线下退款</el-button></router-link>
          </template>
          <template v-else>
            <el-button size="mini" @click.prevent="closeDeal(row.id)">关闭</el-button>
          </template>
          <el-button size="mini" @click.prevent="showDialogForm(row.id)">异常</el-button>
          <router-link :to="{ path:'/refund/refundment/detail/'+row.id }"><el-button size="mini">明细</el-button></router-link>
        </div>
      </el-table-column>
    </el-table>
    <div class="page">
      <pagination :page="pendingAccountListData.pageNumber" :total="pendingAccountListData.totalCount" :render="pageChange" :options="filters"></pagination>
    </div>
  </div>

  <el-dialog title="异常" v-model="dialogFormVisible" >
    <el-form :model="sendbackIncomeForm" :rules="errorRules" ref="sendbackIncomeForm">
      <el-form-item label="退款异常" prop="exceptionMsg">
        <el-input type="textarea" v-model="sendbackIncomeForm.exceptionMsg" placeholder="请描述异常问题（限120字）" ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="submitDialogForm">确 定</el-button>
    </span>
  </el-dialog>

  <el-dialog title="备注" v-model="descrDialogFormVisible">
    <el-form :model="descrForm">
      <el-form-item label="备注">
        <el-input type="textarea" v-model="descrForm.descr" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="descrDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="submitDescrDialogForm">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import HeadFilter from 'components/headFilter/HeadFilter.vue'
import pagination from 'components/pagination'
import {
  request,
  formatTimeString,
  getCategoryStr,
  getSourceStr,
  getFundTypeStr,
  getPayWayStr,
  getCache,
  setCache,
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
import { Message } from 'element-ui'
export default {
  components: {
    HeadFilter,
    pagination
  },
  data() {
    const filters = Object.assign({
      pageNumber: 1,
      pageSize: 20,
    }, getCache({
      key: 'refundmentFilters',
    }));
    const validaeExceptionMsg = (rule, value, callback) => {
      if (value && value.length > 120) {
        callback(new Error('异常描述不能超过120字!'));
      } else {
        callback();
      }
    }
    return {
      time: new Date().getTime(),
      filters: filters, // 筛选参数
      hasSelect: false,
      pendingAccountListData: {}, // 待退款列表
      multipleSelection: [],
      dialogFormVisible: false, // 异常弹出框显隐
      descrDialogFormVisible: false, // 备注弹出框显隐
      sendbackIncomeForm: {}, // 异常弹出框表单内容
      descrForm: {}, // 备注弹出框表单内容
      fullscreenLoading: true,
      height: '600',
      errorRules: {
        exceptionMsg: [
          { validator: validaeExceptionMsg, trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  mounted() {
    this.height = String(document.documentElement.clientHeight - 400);
    this.getList(); // 获取待退款列表
  },
  methods: {
    formatType (row, column) {
      let typeString = ''
      switch (row.replaceOrReturnType) {
        case 1:
          typeString = '退货'
          break
        case 2:
          typeString = '换货'
          break
      }
      return typeString
    },
    formatStatus (row, column) {
      let statusString = ''
      switch (row.payStatus) {
        case -2:
          statusString = '未激活'
          break
        case -1:
          statusString = '异常'
          break
        case 1:
          statusString = '待退款'
          break
        case 2:
          statusString = '退款中'
          break
        case 3:
          statusString = '已退款'
          break
      }
      return statusString
    },
    closeDeal (id) {
      const _time = new Date().getTime()
      this.$confirm('确定无需给采购商退款?', '提示', {
        type: 'warning'
      }).then(() => {
        request({
          url: AccountApi.BuyerRefund.close,
          method: 'post',
          data: {
            param: JSON.stringify({ id: id, _time: _time })
          }
        }).then(data => {
          if (data.success === '1') {
            this.$message({
              type: 'success',
              message: '关闭成功'
            })
            location.reload()
          } else {
            data.msg && Message({
              message: data.msg,
              type: 'error',
              duration: 1000
            })
          }
        })
      }).catch(() => {
      });
    },
    /**
     * 获取筛选参数
     */
    getFilter(params) {
      this.filters = params;
      this.filters = Object.assign({
        pageNumber: 1,
        pageSize: 20,
      }, this.filters)
    },
    pageChange() {
      this.getList()
    },
    /**
     * 获取待退款列表
     * @params this.filters
     */
    getList() {
      this.fullscreenLoading = true;
      this.filters.payStatus = 2
      setCache({
        key: 'refundmentFilters',
        value: this.filters,
      });
      request({
        url: AccountApi.BuyerRefund.list,
        method: 'post',
        data: {
          param: JSON.stringify(this.filters)
        }
      }).then(data => {
        console.log('data', data);
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.pendingAccountListData = data.page;
          this.pendingAccountListData.total = data.total;
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    formatTime(row, column) { // 格式化时间
      return formatTimeString(row.createTime)
    },
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.category)
    },
    getSourceString(row, column) { // 订单来源映射
      return getSourceStr(Number(row.source))
    },
    getFundTypeStr(row, column) { // 款项类型映射
      return getFundTypeStr(row.fundType)
    },
    getPayWayStr(row, column) { // 支付方式映射
      return getPayWayStr(row.payWay)
    },
    payStatus(row, column) { // 退款状态
      return '待退款'
    },
    payType(row, column) { // 退款类型映射
      return row.payType === 0 ? '垫付' : '实付'
    },
    handleMultipleSelectionChange(val) {
      // console.log('multipleSelection', val);
      this.multipleSelection = val;
      this.hasSelect = !!val.length
    },
    handleCurrentChange(val) { // 切换页面
      // console.log(`当前页: ${val}`);
      this.filters.pageNumber = val;
      this.getList();
    },
    handleDispatch() { // 批量退款
      const id = this.multipleSelection.map((obj) => {
        return obj.id
      })
      // console.log('id', id);
      this.$router.push('/refund/refundment/accountInfo/' + id.join(','))
    },
    showDialogForm(id) { // 设置异常弹出框
      this.dialogFormVisible = true;
      this.sendbackIncomeForm.id = id;
    },
    /**
     * 提交对账异常
     */
    submitDialogForm() {
      this.$refs.sendbackIncomeForm.validate((valid) => {
        this.sendbackIncomeForm._time = new Date().getTime();
        if (valid) {
          this.fullscreenLoading = true;
          request({
            url: AccountApi.BuyerRefund.sendbackIncome,
            method: 'post',
            data: { param: JSON.stringify(this.sendbackIncomeForm) }
          }).then(data => {
            // console.log('data', data);
            this.fullscreenLoading = false;
            this.dialogFormVisible = false;
            if (data.success === '1') {
            // del datalist by id
              this.pendingAccountListData.result = this.pendingAccountListData.result.filter((obj, i) => {
                return obj.id !== this.sendbackIncomeForm.id
              });
              this.$message({
                type: 'success',
                message: '提交退款异常成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '提交退款异常失败'
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    showDescrDialogForm(id, descr) { // 设置备注弹出框
      this.descrDialogFormVisible = true;
      this.descrForm.id = id;
      this.descrForm.descr = descr;
    },
    /**
     * 修改对账备注
     */
    submitDescrDialogForm() {
      this.fullscreenLoading = true;
      this.descrForm._time = this.time;
      request({
        url: AccountApi.PayGroupOrderX.updateDescr,
        method: 'post',
        data: this.descrForm
      }).then(data => {
        this.fullscreenLoading = false;
        // console.log('data', data);
        if (data.success === '1') {
        // update datalist by id
          this.descrDialogFormVisible = false;
          this.pendingAccountListData.result = this.pendingAccountListData.result.map(obj => { // 必须返回一个新数组才会更新view
            if (obj.id == this.descrForm.id) {
              obj.descr = this.descrForm.descr;
            }
            return obj;
          });
          this.$message({
            type: 'success',
            message: '修改备注成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '修改备注失败'
          })
        }
      })
    }
  },
  watch: {
    /**
     * 点击搜索或分页时，更改filters，并请求列表
     */
    filters: function(newValue, oldVal) {
      this.getList()
    }
  }
}
</script>

<style lang="scss">
.pending-account {
    .button {
        vertical-align: middle;
    }
    .number {
        border-radius: 0;
    }
    .text-r {
        text-align: right;
    }
}
</style>
