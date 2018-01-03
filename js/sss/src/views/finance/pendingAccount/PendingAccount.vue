<template>
<div class="pending-account" v-loading.body="fullscreenLoading">
  <h1 class="title" style="font-size: 25px; padding: 15px">待分账</h1>
  <HeadFilter v-on:getParams="getFilter" :param="filters"></HeadFilter>
  <p style='margin: 15px 0'>
    <!-- <el-button type="primary" @click.native="handleDispatch" :disabled="!hasSelect">批量分账</el-button> --> <!-- 批量分账功能暂时隐藏 -->
    <span style='margin-left: 15px;'>待分账总金额：<span class='red'>{{Number(pendingAccountListData.total).toFixed(2)||0.00}}</span> 元</span>
  </p>
  <div class="">
    <el-table class="fixed-table" :data="pendingAccountListData.result" border :height="height" @selection-change="handleMultipleSelectionChange">
      <el-table-column type="selection" min-width="50" fixed="left"></el-table-column>
      <el-table-column show-tooltip-when-overflow property="confirmPayTime" label="进入待分账日期" min-width="170" :formatter="formatTime"></el-table-column>
      <el-table-column property="serviceNumber" label="订单号" min-width="170" show-tooltip-when-overflow></el-table-column>
      <el-table-column inline-template label="定金/元"  min-width="100" show-tooltip-when-overflow>
        <span>{{Number(row.earnestMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="尾款/元"  min-width="100" show-tooltip-when-overflow>
        <span>{{Number(row.finalMoneySoouyaToSeller).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="成本货款/元"  min-width="120" show-tooltip-when-overflow>
        <span>{{Number(row.costMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="供应商税款/元"  min-width="130" show-tooltip-when-overflow>
        <span>{{Number(row.sellerTaxMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="供应商税点"  min-width="120" show-tooltip-when-overflow>
        <span>{{Number(row.sellerTaxPoint).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column inline-template label="应付款/元"  min-width="100" show-tooltip-when-overflow>
        <span>{{Number(row.toPayMoney).toFixed(2)}}</span>
      </el-table-column>
      <el-table-column property="buyerCompany" label="采购商" min-width="120" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="buyerNumber" label="采购商ID" min-width="120" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="shopName" label="供应商" min-width="120" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="sellerNumber" label="供应商ID" min-width="120" show-tooltip-when-overflow> </el-table-column>
      <el-table-column inline-template label="跟单员" min-width="120" show-tooltip-when-overflow>
        <div>{{row.follower}}/{{row.followerTel}}</div>
      </el-table-column>
      <el-table-column property="fundType" label="款项类型" min-width="100" :formatter="getFundTypeStr" show-tooltip-when-overflow></el-table-column>
      <el-table-column property="payStatus" label="分账状态" min-width="120" :formatter="payStatus" show-tooltip-when-overflow> </el-table-column>
       <el-table-column inline-template label="操作" min-width="200" fixed="right">
        <div class="operate-btn">
          <template v-if="row.toPayMoney == 0 && row.fundType == 7">
            <el-button size='mini' @click.prevent="closeDeal(row.id)">关闭</el-button>
          </template>
          <template v-else-if='!row.needToPaySeller'>
            <el-button size='mini' @click.native='passPayHandle(row.id)'>无需分账</el-button>
          </template>
          <template v-else>
            <el-button size='mini' @click.native='splitOnOrOffLine(row, "online")'>分账</el-button>
            <el-button size='mini' @click.native='splitOnOrOffLine(row, "offline")'>线下分账</el-button>
          </template>
          <el-button size='mini' v-if='row.payType === 0' @click.prevent="showDialogForm(row.id)">异常</el-button>
          <el-button size='mini' @click.prevent="toPrint(row.orderNumber)">打印</el-button>
          <router-link :to="{ path:'/finance/pendingAccount/detail/'+row.id }"><el-button size='mini'>明细</el-button></router-link>
        </div>
      </el-table-column>
    </el-table>
    <div class="page">
      <pagination :page="pendingAccountListData.pageNumber" :total="pendingAccountListData.totalCount" :render="pageChange" :options="filters"></pagination>
    </div>
  </div>

  <el-dialog title="异常" v-model="dialogFormVisible" >
    <el-form :model="sendbackIncomeForm" :rules="errorRules" ref="sendbackIncomeForm" :close-on-click-modal="true">
      <el-form-item label="分账异常" prop="exceptionMsg">
        <el-input type="textarea" v-model="sendbackIncomeForm.exceptionMsg" placeholder="请描述异常问题（限120字）" ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="submitDialogForm">确 定</el-button>
    </span>
  </el-dialog>

  <el-dialog title="备注" v-model="descrDialogFormVisible" :close-on-click-modal="true">
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
  <el-dialog title="提示" v-model="dialogVisible" size="tiny">
    <span style='padding: 10px 0; font-size: 16px'>客户可用总额不足！请确认是否需要预存或调整授信额度。</span>
    <div style='font-size: 16px; text-align: left; padding-left: 20px'>
      <div style='margin-top: 30px;'>可用总额：{{Number(customerAccount.available).toFixed(2)}} 元</div>
      <div style='margin-top: 20px; border-top: 1px dashed #999; padding-top: 20px'>采购商付款金额：{{buyerPayedMoney && Number(buyerPayedMoney).toFixed(2)}} 元</div>
      <div style='margin-top: 20px;'>
        采购商付款凭据:
        <article class="media" v-if='buyerCertificateList && buyerCertificateList.length'>
          <a :href="'http://www.soouya.com'+val.imgUrl" class="image media-left is-64x64"
            v-lightbox="buyerCertificateList"
            v-for="val in buyerCertificateList"
            >
            <img :src="'http://www.soouya.com'+val.imgUrl+'@200h_200w_1e'" alt="Image" width="60" height="60">
          </a>
        </article>
      </div>
      <div style='margin-top: 20px; font-size: 16px;'>
        结算备注: {{content}}
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="toAdjust">去调整</el-button>
    </span>
  </el-dialog>
  <lightbox></lightbox>
</div>
</template>
<script>
import HeadFilter from 'components/headFilter/HeadFilter.vue'
import pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
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
    Lightbox,
    pagination
  },
  data() {
    const filters = Object.assign({
      pageNumber: 1,
      pageSize: 20,
    }, getCache({
      key: 'pendingAccountFilters',
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
      pendingAccountListData: {}, // 待分账列表
      multipleSelection: [],
      dialogFormVisible: false, // 异常弹出框显隐
      descrDialogFormVisible: false, // 备注弹出框显隐
      sendbackIncomeForm: {}, // 异常弹出框表单内容
      descrForm: {}, // 备注弹出框表单内容
      buyerPayedMoney: '', // 采购商付款金额
      buyerCertificateList: [], // 采购商付款金额
      content: '', // 跟单员结算备注
      fullscreenLoading: true,
      height: '600',
      dialogVisible: false,
      customerAccount: {},
      errorRules: {
        exceptionMsg: [
          { validator: validaeExceptionMsg, trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  mounted() {
    this.height = String(document.documentElement.clientHeight - 850);
    this.getList(); // 获取待分账列表
  },
  methods: {
    closeDeal (id) {
      const _time = new Date().getTime()
      this.$confirm('确定无需给供应商付款?', '提示', {
        type: 'warning'
      }).then(() => {
        request({
          url: AccountApi.PayGroupOrderX.close,
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
      if (params.createTimeBegin) {
        this.filters.confirmPayTimeBegin = new Date(params.createTimeBegin).getTime()
        delete params.createTimeBegin
      }
      if (params.createTimeEnd) {
        this.filters.confirmPayTimeEnd = new Date(params.createTimeEnd).getTime()
        delete params.createTimeEnd
      }
      this.filters = Object.assign({
        pageNumber: 1,
        pageSize: 20,
      }, this.filters)
    },
    pageChange() {
      this.getList()
    },
    /**
     * 获取待分账列表
     * @params this.filters
     */
    getList() {
      this.fullscreenLoading = true;
      setCache({
        key: 'pendingAccountFilters',
        value: this.filters,
      });
      request({
        url: AccountApi.PayGroupOrderX.list,
        method: 'post',
        data: {
          param: JSON.stringify(this.filters)
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          // const resultArray = []
          // if (data.page.result && data.page.result.length > 0) {
          //   const resultLength = data.page.result.length
          //   for (let i = 0; i < resultLength; i++) {
          //     if (data.page.result[i]) {
          //       const orderNumber = data.page.result[i].orderNumber
          //       if (orderNumber != '12930174' && orderNumber != '12930246' && orderNumber != '12945659') {
          //         resultArray.push(data.page.result[i])
          //         // data.page.result.splice(i, 1)
          //       }
          //     }
          //   }
          // }
          // console.log('resultArray', resultArray)
          // data.page.result = resultArray
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
      return formatTimeString(row.confirmPayTime)
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
    payStatus(row, column) { // 分账状态
      return '待分账'
    },
    // payType(row, column) { // 分账类型映射
    //   return row.payType === 0 ? '垫付' : '实付'
    // },
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
    passPayHandle(id) { // 无需分账
      const that = this
      const _time = new Date().getTime()
      that.$confirm('确定无需给供应商付款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.fullscreenLoading = true;
        request({
          url: AccountApi.PayGroupOrderX.passPay,
          method: 'post',
          data: {
            param: JSON.stringify({
              id,
              _time
            })
          }
        }).then(data => {
          that.fullscreenLoading = false;
          if (data.success === '1') {
            that.$router.push(`/finance/splitAccount`)
          } else {
            this.$message({
              type: 'success',
              message: data.msg
            })
          }
        })
      }).catch(() => {

      })
    },
    splitOnOrOffLine(row, splitType) {
      const that = this
      this.fullscreenLoading = true;
      request({
        url: AccountApi.Account.getById,
        method: 'post',
        data: {
          param: JSON.stringify({
            id: row.buyerId
          })
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          that.customerAccount = data.obj
          if (data.obj.available < row.toPayMoney) {
            that.customerAccount = data.obj
            if (data.obj.available < row.toPayMoney) {
              that.dialogVisible = true
              that.buyerPayedMoney = row.buyerPayedMoney
              that.buyerCertificateList = row.buyerCertificateList
              that.content = row.content
            } else {
              splitType == 'online' ? that.$router.push(`/finance/pendingAccount/list/${row.id}`) : that.$router.push(`/finance/pendingAccount/payOutline/${row.id}`)
            }
          } else {
            splitType == 'online' ? that.$router.push(`/finance/pendingAccount/list/${row.id}`) : that.$router.push(`/finance/pendingAccount/payOutline/${row.id}`)
          }
        } else {
          this.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    toAdjust() { // 去调整额度
      this.dialogVisible = false
      window.open(`/finance/moneyManage/moneyManageDetail?id=${this.customerAccount.id}`)
      // this.$router.push(`/finance/moneyManage/moneyManageDetail?id=${this.customerAccount.id}`)
    },
    toPrint(orderNumber) { // 去打印
      window.open(`/common/printDetail/${orderNumber}`)
    },
    handleDispatch() { // 批量分账
      const id = this.multipleSelection.map((obj) => {
        return obj.id
      })
      // console.log('id', id);
      this.$router.push('/finance/pendingAccount/list/' + id.join(','))
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
            url: AccountApi.PayGroupOrderX.sendbackIncome,
            method: 'post',
            data: {
              param: JSON.stringify(this.sendbackIncomeForm)
            }
          }).then(data => {
            // console.log('data', data);
            this.fullscreenLoading = false;
            this.dialogFormVisible = false;
            if (data.success === '1') {
              this.pendingAccountListData.result = this.pendingAccountListData.result.filter((obj, i) => {
                return obj.id !== this.sendbackIncomeForm.id
              });
              this.$message({
                type: 'success',
                message: '提交分账异常成功'
              })
            } else {
              this.$message({
                type: 'success',
                message: '提交分账异常失败'
              })
            }
          })
        } else {
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
