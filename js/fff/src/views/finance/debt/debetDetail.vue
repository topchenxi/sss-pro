<template id="">
  <div class="content checkAccountDetail">
    <div class="clear" style="height:50px;">
      <!-- <h1 class="title" style="font-size: 25px; padding: 15px; float: left;">{{title}}</h1> -->
      <el-button @click.native="handleReturn" style="float: right;margin-top: 10px;" type="info" v-if="detailData.payStatus != 1">返回</el-button>
    </div>
    <div class="content box" v-if="detailData.payStatus == 2">
      <h4>欠款详情</h4>
      <table class="custom-table">
        <tr>
          <td>进入待收欠款时间：{{detailData.createTime}}</td>
          <td>欠款备注：{{detailData.followerRemark}}</td>
          <td>财务收款账户：{{detailData.financeBank}}／{{detailData.financeAccount}} </td>
          <td>
            <label>催缴欠款凭证：</label>
            <article class="media imgShow" v-if='detailData.debtCertificateList && detailData.debtCertificateList.length'>
              <a :href="'http://test.soouya.com'+ val.imgUrl " class="image media-left" v-lightbox="detailData.debtCertificateList" v-for="val in detailData.debtCertificateList">
                <img :src="'http://test.soouya.com'+ val.imgUrl +'@200h_200w_1e'" alt="Image" width="40" height="40">
              </a>
            </article>
          </td>
        </tr>
        <tr>
          <td>
            催缴状态：
            <span>已催缴</span>
          </td>
          <td>
            <span v-if="detailData.creditType =='1'">已用搜芽额度：{{detailData.usedMoney | formateNumber}}元</span>
            <span v-else>已用搜芽额度：--元</span>
          </td>
          <td>
            <span v-if="detailData.creditType =='2'">已用徙木额度：{{detailData.baitiaoUsedMoney | formateNumber}}元</span>
            <span v-else>已用徙木额度：--元</span>
          </td>
          <td>实收滞纳金：{{detailData.lateFeesMoney | formateNumber}}元</td>
        </tr>
        <tr>
          <td>
            财务备注：{{detailData.financeRemark}}
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="4" align="right">实收欠款：{{detailData.realDebtMoney | formateNumber}}元</td>
        </tr>
      </table>
    </div>
    <div class="content box" v-if="detailData.payStatus != 2">
      <h4>欠款详情</h4>
      <table class="custom-table">
        <tr>
          <td>进入待收欠款时间：{{detailData.createTime}}</td>
          <td>欠款备注：{{detailData.followerRemark}}</td>
          <td>财务收款账户：{{detailData.financeBank}}／{{detailData.financeAccount}} </td>
          <td>
            <label>催缴欠款凭证：</label>
            <article class="media imgShow" v-if='detailData.debtCertificateList && detailData.debtCertificateList.length'>
              <a :href="'http://test.soouya.com'+ val.imgUrl " class="image media-left" v-lightbox="detailData.debtCertificateList" v-for="val in detailData.debtCertificateList">
                <img :src="'http://test.soouya.com'+ val.imgUrl +'@200h_200w_1e'" alt="Image" width="40" height="40">
              </a>
            </article>
          </td>
        </tr>
        <tr>
          <td>
            催缴状态：
            <span>待催缴</span>
          </td>
          <td>
            <span v-if="detailData.creditType =='1'">已用搜芽额度：{{detailData.usedMoney | formateNumber}}元</span>
            <span v-else>已用搜芽额度：--元</span>
          </td>
          <td>
            <span v-if="detailData.creditType =='2'">已用徙木额度：{{detailData.baitiaoUsedMoney | formateNumber}}元</span>
            <span v-else>已用徙木额度：--元</span>
          </td>
          <td>应收滞纳金：{{detailData.expectedLateFeesMoney | formateNumber}}元</td>
        </tr>
        <tr>
          <td colspan="4" align="right">应收欠款：{{detailData.expectedDebtMoney | formateNumber}}元</td>
        </tr>
      </table>
    </div>
    <order-detail :basicData="basicData"></order-detail>
    <div class="content box">
      <h4>商品信息</h4>
      <table class="custom-table">
        <tr>
          <th>色号</th>
          <th>采购数量</th>
          <th>成本单价</th>
          <th>销售单价</th>
          <th>成本小计</th>
          <th>销售小计</th>
        </tr>
        <tr v-for="item in basicData.colorList">
          <td>{{item.color}}</td>
          <td>{{item.quantity}}{{item.quantityUnit}}</td>
          <td>{{item.price}}{{item.priceUnit}}</td>
          <td>{{item.salePrice}}{{item.salePriceUnit}}</td>
          <td>{{item.quantity * item.price | formateNumber}}元</td>
          <td>{{item.quantity * item.salePrice | formateNumber}}元</td>
        </tr>
        <tr>
          <td colspan="6" align="right">
            货号：{{basicData.productNumber}}&nbsp;&nbsp;采购总数：{{basicData.quantity}}{{basicData.quantityUnit}} &nbsp;&nbsp;销售货款：{{basicData.saleMoney}}元 &nbsp;&nbsp;毛利率：{{basicData.maoliPoint | formateNumber}}%&nbsp;&nbsp;|&nbsp;&nbsp;
            <template v-if="basicData.type = 1">服务费单价：{{basicData.servicePrice | formateNumber}}{{basicData.servicePriceUnit}} &nbsp;&nbsp;服务费：{{basicData.serviceMoney | formateNumber}}</template>
            &nbsp;&nbsp;采购商税款：{{basicData.taxMoney | formateNumber}}元 &nbsp;&nbsp;供应商税款：{{basicData.sellerTaxMoney | formateNumber}}元
          </td>
        </tr>
      </table>
    </div>
    <in-reposity v-if="inReposityList.length" :inReposityList="inReposityList" :quantity="basicData.quantity"></in-reposity>
    <out-reposity v-if="outReposityList.length" :outReposityList="outReposityList" :inReposityList="inReposityList"></out-reposity>
    <el-dialog title="图片预览" v-model="previewVisible" ref="dialogPreview">
      <img :src="previewSrc" alt="图片预览" class="preview-img" />
    </el-dialog>
    <lightbox></lightbox>
    <!--  确认催缴弹框 -->
    <el-dialog title="确认催缴" v-model="reminderVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="200px" :rules="rules">
        <el-form-item label="到账时间:" required>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="财务备注:" style="margin-bottom: 40px; " prop="remark">
          <limitInput :maxLength="500" :model="form.remark" type="textarea" v-on:update="updateRemark"></limitInput>
        </el-form-item>
        <el-form-item :label="model.limitType">
          <template scope="scope">
            {{model.limit | formateNumber}}元
          </template>
        </el-form-item>
        <el-form-item label="实收滞纳金">
          <el-input readonly="readonly" @click.native="getLateFees" v-model="model.lateFee" v-if="batchVisible"></el-input>
          <el-input v-model="model.lateFee" v-else></el-input>
        </el-form-item>
        <el-form-item label="应收欠款">
          <template scope="scope">
            {{model.expectedDebtMoney | formateNumber}}元
          </template>
        </el-form-item>
        <el-form-item label="可用余额抵扣">
          <template scope="scope">
            {{model.usedBalance | formateNumber}}元
          </template>
        </el-form-item>
        <el-form-item>
          <el-button @click="reminderVisible = false">取消</el-button>
          <el-button type="primary" v-if="model.usedBalance < model.expectedDebtMoney">预存</el-button>
          <el-button type="primary" v-else @click="saveReminder">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="bottom" v-if="detailData.payStatus == 1">
      <el-button type="primary" @click="confirmReminder">确认催缴</el-button>
      <!-- <template v-if="basicData.type == 3">
        <el-button type="danger" @click='PayGroupSendbackIncome'>打回采购</el-button>
      </template>
      <template v-else>
        <el-button type="danger" @click='PayGroupSendbackIncome'>打回跟单</el-button>
      </template> -->
      <el-button type="danger" @click.native="showYichangDialog">异常</el-button>
      <el-button @click="handleReturn">返回</el-button>
    </div>
    <el-dialog v-model="yichangDialogVisible" size="tiny" title="提示">
      <span>
        <i class="el-icon-warning"></i>欠款异常</span>
      </br>
      <el-form label-width="100px" label-position="right">
        <el-form-item label="异常备注">
          <el-input type="textarea" style="margin-top:12px; width:250px;" v-model="reqYichangParams.exceptionMsg"></el-input>
          </br>
          <span style="color:#f00; margin-top:220px;">{{reqYichangParams.exceptionMsg.length}}/500</span>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click.native="yichangDialogVisible = false, reqYichangParams.exceptionMsg = ''">取消</el-button>
          <!-- 点击事件待定 -->
          <el-button size="small" type="primary" style="width:100px;" :disabled="reqYichangParams.exceptionMsg.length > 500" @click.native="confirmYichang">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  request,
  newRequest,
  formatTimeString,
  getCategoryStr,
  getPayWayStr,
  getSourceStr,
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
import Lightbox from 'components/lightbox/lightbox'
import orderDetail from 'components/detail/orderDetail'
import inReposity from 'components/detail/inReposity'
import limitInput from 'components/limitInput.vue'
import outReposity from 'components/detail/outReposity'
export default {
  components: {
    Lightbox,
    limitInput,
    orderDetail,
    inReposity,
    outReposity
  },
  filters: {
    formateNumber(val) {
      let result = '--'
      if (val !== null && val >= 0) {
        result = Number(val).toFixed(2)
      } else if (!val) {
        result = '--'
      }
      return result
    },
    formateTime(val) {
      return val ? formatTimeString(val) : '--'
    },
    formateStatus(val) {
      if (val == 200) {
        return '待录入色卡信息'
      } else if (val == 201) {
        return '待提交审核'
      } else if (val == 202) {
        return '待审核'
      } else if (val == 220) {
        return '待发货'
      } else if (val == 221) {
        return '待提交支付'
      } else if (val == 222) {
        return '待销账'
      } else if (val == 223) {
        return '已完成'
      } else if (val == 230) {
        return '已取消'
      } else if (val == 210) {
        return '待报账'
      } else {
        return '已报账'
      }
    },
    formatePayStatus(val) {
      if (val == 1) {
        return '待对账'
      } else if (val == 2) {
        return '已对账'
      } else if (val == -1) {
        return '异常'
      } else if (val == -2) {
        return '新建/待付款'
      } else {
        return '已删除'
      }
    },
  },
  computed: {
    madan() {
      const arr = []
      if (this.orderList[0]) {
        this.orderList[0].madanImgUrls.map((item) => {
          arr.push({ url: 'http://test.soouya.com' + item })
        })
      }
      return arr
    }
  },
  data() {
    const validateLength = (rule, value, callback) => {
      console.log(this.form.remark.length)
      if (this.form.remark.length > 500) {
        return callback(new Error('备注不能超过500字'));
      } else {
        callback();
      }
    }
    return {
      yichangDialogVisible: false,
      reqYichangParams: {
        id: '',
        exceptionMsg: '',
        _time: 0,
      },
      batchVisible: false,
      time: new Date().getTime(),
      title: '',
      id: '', // 分账ＩＤ
      payInfo: {}, // 支付信息
      orderList: [], // 订单详情列表
      replaceOrReturnList: [], // 退换货信息
      previewVisible: false, // 图片预览
      dialogSureShow: false, // 对账
      previewSrc: '', // 图片预览previewSrc
      detailData: {}, // 分账明细data
      basicData: {}, // 基本信息
      inReposityList: [], // 入仓单号
      outReposityList: [], // 出仓单号
      dialogFormVisible: false, // 异常弹出框显隐
      fullscreenLoading: true,
      sendbackIncomeForm: {}, // 异常弹出框表单模型
      statusText: '已收欠款（元）',
      moneyString: 'totalMoney',
      singleData: null,
      model: { // 弹框的值
        limitType: null,
        limit: null,
        debtType: null,
        debt: null,
        balance: null,
        expectedDebtMoney: null,
        usedBalance: null,
        lateFee: null
      },
      reminderVisible: false, // 弹框的flag值
      form: { // 弹框
        date: '',
        remark: ''
      },
      rules: {
        remark: [
          { validator: validateLength, trigger: 'blur' }
        ]
      }
    }
  },
  route: {
    data: function(transition) {
      console.log(transition)
    }
  },
  watch: {
    'form.date': function(newValue, oldValue) {
      let timeStr = new Date(this.singleData.expectedRepaymentTime).toLocaleString();
      timeStr = timeStr.substr(0, 10) + '00:00:00'
      this.singleData.expectedRepaymentTime = timeStr
      if (newValue.getTime() - Date.parse(this.singleData.expectedRepaymentTime) > 0) {
        this.singleData.time = (newValue.getTime() - Date.parse(this.singleData.expectedRepaymentTime)) / 86400000
        if (this.singleData.creditType == '0') {
          this.model.lateFee = Number(this.singleData.usedMoney * 0.18 * 1.5 * this.singleData.time / 360).toFixed(2)
        } else {
          this.model.lateFee = Number(this.singleData.baitiaoUsedMoney * 0.18 * 1.5 * this.singleData.time / 360).toFixed(2)
        }
      } else {
        this.model.lateFee = 0;
      }
      this.model.expectedDebtMoney = Number(this.model.limit) + Number(this.model.lateFee)
    }
  },
  mounted() {
    this.payNumber = this.$route.query.payNumber;
    this.id = this.$route.params.id;
    this.getDetail();
  },
  methods: {
    /**
     * 获取分账明细
     */
    getDetail() {
      const reqUrl = AccountApi.PayDebt.getDetail
      const options = {
        id: this.id
      }
      this.title = '欠款明细'
      newRequest({
        url: reqUrl,
        method: 'get',
        data: options
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.detailData = data.obj;
           let y = new Date(this.detailData.createTime).getFullYear()
           let m = new Date(this.detailData.createTime).getMonth() + 1
           let d = new Date(this.detailData.createTime).getDate()
           let h = new Date(this.detailData.createTime).getHours()
           let min = new Date(this.detailData.createTime).getMinutes()
           let s = new Date(this.detailData.createTime).getSeconds()
           this.detailData.createTime = y + '/' + m + '/' + d + ' ' + h + ':' + min + ':' + s
          // this.detailData.createTime = new Date(this.detailData.createTime).toLocaleString(); // 时间戳转换为时间
          this.basicData = data.obj.order;
          this.inReposityList = data.obj.inReposityList;
          this.outReposityList = data.obj.outReposityList;
          this.payInfo = {
            checkedOrder: [data.obj],
            buyerCertificateList: data.obj.certificateList,
            content: data.obj.content,
            buyerPayedMoney: data.obj.buyerPayedMoney
          }
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    showYichangDialog() {
      this.reqYichangParams._time = Date.parse(new Date())
      this.reqYichangParams.exceptionMsg = this.detailData.exceptionMsg
      this.yichangDialogVisible = true
      console.log(this.reqYichangParams)
    },
    confirmYichang() {
      this.reqYichangParams.id = this.$route.params.id
      newRequest({
        data: this.reqYichangParams,
        url: '/redwood/payDebt/updateExceptionMsg',
        method: 'post',
        contentType: 'application/json',
      }).then(res => {
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg,
          })
          this.yichangDialogVisible = false
          this.search()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    confirmReminder(data) { // 确认催缴
      this.singleData = this.detailData;
      this.reminderVisible = true;
      newRequest({
        url: AccountApi.Account.getById,
        method: 'get',
        data: {
          id: this.detailData.customerId
        }
      }).then((res) => {
        if (res.success == '1') {
          this.model.usedBalance = res.obj.availableBalance;
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
      this.model.expectedDebtMoney = this.singleData.expectedDebtMoney
      if (this.singleData.creditType == 1) {
        this.model.limitType = '已用搜芽额度:'
        this.model.limit = this.singleData.usedMoney
      } else {
        this.model.limitType = '已用徙木额度:'
        this.model.limit = this.singleData.baitiaoUsedMoney
      }
    },
    updateRemark() {
    },
    saveReminder() { // 保存确认催缴的数据
      var arr = [];
      var obj = {};
      obj.id = this.singleData.id
      obj.lateFeesMoney = this.model.lateFee
      obj.receivedTime = this.form.date.getTime()
      obj.financeRemark = this.form.remark
      arr.push(obj)
      newRequest({
        url: AccountApi.PayDebt.batchConfirmIncome,
        contentType: 'application/json',
        method: 'post',
        data: {
          list: arr
        }
      }).then((res) => {
        if (res.success == '1') {
          this.form.date = ''
          this.model.lateFee = '';
          this.reminderVisible = false
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
      console.log(arr)
    },
    PayGroupSendbackIncome() { // 打回跟单
      this.$prompt('请描述异常问题（120个字以内）', '异常', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        newRequest({
          url: AccountApi.PayDebt.sendbackIncome,
          method: 'post',
          contentType: 'application/json',
          data: {
            id: this.detailData.id,
            exceptionMsg: value,
            _time: new Date().getTime()
          }
        }).then((res) => {
          if (res.success == '1') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            setTimeout(() => {
              window.location.reload();
            }, 200)
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
          console.log(res)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      });
    },
    /**
     * 返回列表页
     */
    handleReturn() {
      this.$router.go(-1)
    },
    /**
     * 打开图片预览
     */
    openDialog(src) {
      this.previewSrc = src;
      this.$refs.dialogPreview.open();
    },
    /**
    * 确认对账
    */
    PayGroupConfirmIncome() { // 实款-确认对账
      const self = this
      console.log(this.$route)
      this.$confirm('一旦确认提交，将不可修改。', '确认对账', {
        type: 'warning'
      }).then(() => {
        self.fullscreenLoading = true
        request({
          url: AccountApi.PayDebt.confirmIncome,
          data: {
            payNumber: self.payNumber,
            id: self.id,
            _time: self.time
          },
          method: 'post'
        }).then(res => {
          self.fullscreenLoading = false
          if (res.success == '1') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            self.$router.push('/finance/reconciliation')
          } else {
            res.msg && this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }).catch(() => {
      })
    },
    // PayGroupSendbackIncome () { // 实款-对账异常
    //   const self = this
    //   const _time = new Date().getTime()
    //   this.$prompt('请描述异常问题（30个字以内）', '异常', {
    //     inputPattern: /^\S{0,30}$/,
    //     inputErrorMessage: '格式不正确'
    //   }).then(data => {
    //     self.fullscreenLoading = true
    //     request({
    //       url: AccountApi.PayDebt.sendbackIncome,
    //       data: {
    //         payNumber: self.payNumber,
    //         id: self.id,
    //         exceptionMsg: data.value || '',
    //         _time: _time
    //       },
    //       method: 'post'
    //     }).then(res => {
    //       self.fullscreenLoading = false
    //       if (res.success == '1') {
    //         this.$message({
    //           type: 'success',
    //           message: '操作成功!'
    //         })
    //         self.$router.push('/finance/checkAccount?type=-1')
    //       } else {
    //         res.msg && this.$message({
    //           type: 'info',
    //           message: res.msg
    //         })
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '取消'
    //     })
    //   })
    // },
    getCurrentPayWayStr(row, column) { // 支付方式映射
      console.log('row:', row)
      return getPayWayStr(row.payWay)
    },
    getTypeStr(row, column) { // 对账类型映射
      return '欠款'
    },
    getStatus(row, column) { // 对账状态
      if (row.status) {
        const statusString = {
          '1': '待对账',
          '2': '已对账',
          '101': '已分账',
          '-1': '作废'
        }
        return statusString[String(row.status)]
      } else if (row.payStatus) {
        const statusString = {
          '1': '待对账',
          '2': '已对账',
          '-1': '待对账',
          '-2': '待对账',
        }
        return statusString[String(row.payStatus)]
      }
    },
    formatTime(row, column) { // 格式化时间
      return formatTimeString(row.createTime)
    },
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.category)
    },
    getSourceStr(row, column) { // 订单来源映射
      return getSourceStr(row.source)
    },
    // getStatus(row, column) { // 分账状态
    //   const statusString = {
    //     '1': 'redwood支付',
    //     '2': 'redwood垫付',
    //     '3': 'app线上支付',
    //     '4': 'app线下支付'
    //   }
    //   return statusString[row.status]
    // },
    payType(row, column) { // 分账类型映射
      return row.payType === 0 ? '垫付' : '实付'
    },
    getInvoiceStatusStr(row, column) { // 采购发票映射
      return row.order.invoiceStatus == 0 ? '不需要' : '需要'
    },
    getPayInvoiceInneedStr(row, column) { // 采购发票映射
      return row.order.payInvoiceInneed == 0 ? '没有' : '有'
    },
    showDialogForm(id) { // 设置异常弹出框
      this.dialogFormVisible = true;
    },
    /**
     * 提交对账异常
     */
    submitDialogForm() {
      this.sendbackIncomeForm.id = this.id;
      request({
        url: AccountApi.PayGroupOrderXSendbackIncome,
        method: 'post',
        data: this.sendbackIncomeForm
      }).then(data => {
        // console.log('data', data);
        if (data.success === '1') {
          this.$router.push('/finance/pendingAccount');
        } else {
          this.$message({
            message: data.message,
            type: 'error'
          });
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  position: fixed;
  bottom: 10px;
  left: 15%
}

.checkAccountDetail {
  .is-64x64 {
    overflow: hidden
  }
  .el-table td {
    position: inherit;
  }
  p {
    margin: 10px 0;
  }
  h1 {
    font-size: 20px;
  }
  h4 {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 18px;
  }
  .box {
    margin-left: 10px;
  }
}
</style>
