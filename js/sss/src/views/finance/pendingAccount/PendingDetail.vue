<template id="">
<div class="content" v-loading.fullscreen="fullscreenLoading">
  <h1 class="title" style="font-size: 25px; padding: 15px">分账明细</h1>
  <div class="content" v-if="detailData.length">
    <h4>支付信息</h4>
    <div class="box" v-if="detailData.length && detailData[0].payWay === 'offline'">
      <p>采购商付款凭证</p>
      <article class="media">
        <div class="media-left" v-for="item in detailData[0].buyerCertificateList">
          <a :href="val.url" class="image is-64x64"
            v-lightbox="[{url: 'http://www.soouya.com' + item.imgUrl}]"
            v-for="val in [{url: 'http://www.soouya.com' + item.imgUrl}]">
            <img :src="val.url+'@300h_300w_1e'" alt="Image">
          </a>
        </div>
        <div class="media-content">
          <div class="content">
            <p>通知付款备注：{{detailData[0].content}}</p>
          </div>
        </div>
      </article>
      <p>采购商付款金额：{{detailData[0].buyerPayedMoney && Number(detailData[0].buyerPayedMoney).toFixed(2)}}</p>
    </div>
    <div class="box" v-if="detailData.length && detailData[0].payWay !== 'offline'">
      <p> 采购商付款信息 </p>
      <el-table :data="detailData" border>
        <el-table-column property="payWay" label="支付方式" :formatter="getPayWayStr"></el-table-column>
        <el-table-column property="confirmPayTime" label="支付日期" :formatter="formatPayTime" width="160"></el-table-column>
        <el-table-column property="order.serviceNumber" label="订单号"></el-table-column>
        <el-table-column property="transactionNo" label="支付流水号"></el-table-column>
      </el-table>
    </div>
  </div>

  <div class="content">
    <h4>
      订单详情
      <a class="print-btn" :href="'/common/printDetail/'+(detailData[0] && detailData[0].order.orderNumber)" target="_blank"><el-button type="primary" size="small">打印</el-button></a>
    </h4>
    <div class="box">
      <p> 订单信息：{{detailData[0] && detailData[0].order && detailData[0].order.redwoodDescr}} </p>
      <el-table :data="detailData" border v-if="detailData.length">
        <el-table-column property="confirmPayTime" label="进入待分账日期" min-width="160" :formatter="formatPayTime"></el-table-column>
        <el-table-column property="order.serviceNumber" label="订单号" min-width="170" show-tooltip-when-overflow></el-table-column>
        <el-table-column property="createTime" label="发布时间" min-width="160" :formatter="formatTime"></el-table-column>
        <el-table-column property="order.buyerCompany" label="采购商" show-tooltip-when-overflow> </el-table-column>
        <el-table-column property="order.shopName" label="供应商" show-tooltip-when-overflow> </el-table-column>
        <el-table-column property="fundType" label="款项类型" :formatter="getFundTypeStr" min-width="100" show-tooltip-when-overflow></el-table-column>
        <el-table-column property="payStatus" label="分账状态" min-width="100" :formatter="payStatus" show-tooltip-when-overflow> </el-table-column>
        <el-table-column property="payWay" label="采购商支付方式" :formatter="getPayWayStr" show-tooltip-when-overflow  min-width="150"></el-table-column>
        <el-table-column property="order.category" label="订单类型" min-width="100" :formatter="getCategoryStr"  show-tooltip-when-overflow></el-table-column>
        <el-table-column inline-template label="大货类型" min-width="100" show-tooltip-when-overflow>
           <div>{{row.order.type == 1 ? '服务单' : '贸易单'}}</div>
        </el-table-column>
        <el-table-column property="order.source" label="订单来源" min-width="100" :formatter="getSourceStr" show-tooltip-when-overflow> </el-table-column>
        <el-table-column inline-template label="跟单员"  min-width="120" show-tooltip-when-overflow v-if="detailData.length && detailData[0].order.follower">
          <div>{{row.order && row.order.follower}} {{row.order && row.order.followerTel}}</div>
        </el-table-column>
        <el-table-column inline-template label="销售员" min-width="120" show-tooltip-when-overflow v-if="detailData.length && detailData[0].order.salesName">
          <div>{{row.order && row.order.salesName}} {{row.order && row.order.salesTel}}</div>
        </el-table-column>
        <el-table-column inline-template label="是否需要分账" min-width="120" show-tooltip-when-overflow>
          <div> {{detailData[0].order.needToPaySeller ? "需要" : '不需要'}}</div>
        </el-table-column>
        <el-table-column inline-template label="采购发票" min-width="100">
          <div>{{row.order.invoiceStatus == 0 ? '不需要' : '需要'}}</div>
        </el-table-column>
        <el-table-column inline-template label="采购商税点" width="140" >
          <div>{{ row.order.invoiceStatus == 0 ? '--' : row.order.sellerTaxPoint }}</div>
        </el-table-column>
        <el-table-column inline-template label="供应商发票" min-width="110" >
          <div>{{row.order.payInvoiceInneed == 0 ? '没有' : '有'}}</div>
        </el-table-column>
        <el-table-column inline-template label="供应商税点" width="140" >
          <div>{{ row.order.payInvoiceInneed == '0' ? '--' : row.order.sellerTaxPoint }}</div>
        </el-table-column>
        <el-table-column property="order.sellerLeaveMessage" label="供应商留言" show-tooltip-when-overflow  min-width="120"></el-table-column>
        <el-table-column property="order.leaveMessage" label="采购商留言" show-tooltip-when-overflow  min-width="120"></el-table-column>
      </el-table>
    </div>
  </div>

  <div class="content">
    <h4>码单</h4>
    <div class="box">
      <article class="media" v-if="detailData.length">
        <a :href="val.url" class="image media-left is-64x64"
          v-lightbox="madan"
          v-for="val in madan"
          >
          <img :src="val.url+'@200h_200w_1e'" alt="Image" width="60" height="60">
        </a>
      </article>
    </div>
  </div>

  <div class="content">
    <h4>供应商基本信息</h4>
    <el-table :data="detailData" border>
      <el-table-column property="order.sellerNumber" label="供应商ID"></el-table-column>
      <el-table-column property="order.sellerCompany" label="供应商店铺名称" width="150" show-tooltip-when-overflow></el-table-column>
      <el-table-column property="order.shopName" label="供应商档口名称" show-tooltip-when-overflow></el-table-column>
      <el-table-column inline-template label="档口地区" show-tooltip-when-overflow>
        <span>{{row.order && row.order.sellerProvince}}{{row.order && row.order.sellerCity}}{{row.order && row.order.sellerArea}}</span>
      </el-table-column>
      <el-table-column property="order.sellerAddr" label="详细地址" show-tooltip-when-overflow> </el-table-column>
      <el-table-column property="order.sellerTel" label="档口电话" show-tooltip-when-overflow> </el-table-column>
    </el-table>
  </div>

  <div class="content">
    <h4>供应商收款方式</h4>
    <el-table :data="detailData" border v-if="detailData.length">
      <el-table-column property="order.replyAccountUser" label="银行账号开户名"  ></el-table-column>
      <el-table-column property="order.replyAccountBank" label="银行名称" ></el-table-column>
      <el-table-column property="order.replyAccountAddr" label="开户地区" ></el-table-column>
      <el-table-column property="order.replyAccountBranch" label="开户支行" ></el-table-column>
      <el-table-column property="order.replyAccountNumber" label="银行卡号"></el-table-column>
      <el-table-column inline-template label="账户类型"  width="100">
        <span>{{row.order && row.order.accountType == 1 ? '企业' : '个人'}}</span>
      </el-table-column>
    </el-table>
  </div>

  <div class="content">
    <h4>费用明细</h4>
    <FeeDetail :order="detailData[0].order" :statusText="statusText" :moneyString="moneyString" :payType="10" v-if="detailData[0] && detailData[0].order"></FeeDetail>
  </div>

  <div style="margin-top: 15px;">
    <template v-if="detailData[0] && detailData[0].order && detailData[0].order.toPayMoney == 0 && detailData[0].order.fundType == 7">
      <a @click.prevent="closeDeal(detailData[0].order.id)">关闭</a>
    </template>
    <template v-else-if='detailData.length && detailData[0].order && !detailData[0].order.needToPaySeller'>
      <el-button type="primary" @click.native='passPayHandle(detailData[0].id)'>无需分账</el-button>
    </template>
    <template v-else>
      <el-button type="primary" @click.native="splitOnOrOffLine(detailData[0].order.buyerId, detailData[0].toPayMoney, 'online')">分账</el-button>
      <el-button type="primary" @click.native="splitOnOrOffLine(detailData[0].order.buyerId, detailData[0].toPayMoney, 'offline')">线下分账</el-button>
    </template>
      <el-button type="danger" @click.native="showDialogForm">异常</el-button>
      <el-button @click.native="handleReturn">返回</el-button>
  </div>

  <el-dialog title="图片预览" v-model="previewVisible" ref="dialogPreview">
    <img :src="previewSrc" alt="图片预览" class="preview-img" />
  </el-dialog>

  <el-dialog title="异常" v-model="dialogFormVisible">
    <el-form :model="sendbackIncomeForm" :rules="errorRules" ref="sendbackIncomeForm">
      <el-form-item label="分账异常" prop="exceptionMsg">
        <el-input type="textarea" v-model="sendbackIncomeForm.exceptionMsg" placeholder="请描述异常问题（限120字）" :maxlength="120"></el-input>
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
  <el-dialog title="提示" v-model="dialogVisible" size="tiny">
    <span style='padding: 10px 0; font-size: 16px'>客户可用总额不足！请确认是否需要预存或调整授信额度。</span>
    <div style='margin-top: 30px; font-size: 16px'>可用总额：{{Number(customerAccount.available).toFixed(2)}} 元</div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="toAdjust">去调整</el-button>
    </span>
  </el-dialog>
  <lightbox></lightbox>
</div>
</template>

<script>
import {
  request,
  getPayWayStr,
  formatTimeString,
  getCategoryStr,
  getSourceStr,
  getFundTypeStr,
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
import FeeDetail from 'components/FeeDetail/feeDetail.vue'
import Lightbox from 'components/lightbox/lightbox'
export default {
  components: {
    FeeDetail,
    Lightbox
  },
  computed: {
    madan () {
      const arr = []
      if (this.detailData[0] && this.detailData[0].order) {
        this.detailData[0].order.madanImgUrls.map((item) => {
          arr.push({ url: 'http://www.soouya.com' + item })
        })
      }
      return arr
    }
  },
  data () {
    const validaeExceptionMsg = (rule, value, callback) => {
      if (value && value.length > 120) {
        callback(new Error('异常描述不能超过120字!'));
      } else {
        callback();
      }
    }
    return {
      time: new Date().getTime(),
      fullscreenLoading: false,
      id: '', // 分账ＩＤ
      previewVisible: false, // 图片预览
      previewSrc: '', // 图片预览previewSrc
      detailData: [], // 分账明细data
      dialogFormVisible: false, // 异常弹出框显隐
      sendbackIncomeForm: {}, // 异常弹出框表单模型
      descrDialogFormVisible: false, // 备注弹出框显隐
      descrForm: {}, // 备注弹出框表单内容
      // replaceOrReturnList: [], // 退换货信息
      errorRules: {
        exceptionMsg: [
          { validator: validaeExceptionMsg, trigger: 'change' }
        ]
      },
      statusText: '总应付款（元）',
      moneyString: 'toPayMoney',
      dialogVisible: false,
      customerAccount: {}
    }
  },
  mounted () {
    this.id = this.$route.params.id; // 分账ＩＤ
    this.getDetail();
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
            history.back()
          } else {
            data.msg && this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      }).catch(() => {
      });
    },
    showDescrDialogForm(id, descr) { // 设置备注弹出框
      this.descrDialogFormVisible = true;
      this.descrForm.id = id;
      this.descrForm.descr = descr;
      this.time = new Date().getTime();
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
          this.descrDialogFormVisible = false;
          this.detailData = this.detailData.map(obj => { // 必须返回一个新数组才会更新view
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
    },
    /**
     * 获取分账明细
     */
    getDetail() {
      this.fullscreenLoading = true;
      request({
        url: AccountApi.PayGroupOrderX.getDetail,
        method: 'post',
        data: {
          param: JSON.stringify({ id: this.id })
        }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          data.obj.order.toPayMoney = data.obj.toPayMoney
          this.detailData = [data.obj];
        }
      })
    },
    /**
     * 无需支付
     */
    passPayHandle(id) {
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
    /**
     * 分账
     */
     splitOnOrOffLine(buyerId, toPayMoney, splitType) {
       const that = this
       console.log('splitType', splitType)
       this.fullscreenLoading = true;
       request({
         url: AccountApi.Account.getById,
         method: 'post',
         data: {
           param: JSON.stringify({
             id: buyerId
           })
         }
       }).then(data => {
         this.fullscreenLoading = false;
         if (data.success === '1') {
           that.customerAccount = data.obj
           if (data.obj.available < toPayMoney) {
             that.customerAccount = data.obj
             if (data.obj.available < toPayMoney) {
               that.dialogVisible = true
             } else {
               splitType == 'online' ? that.$router.push(`/finance/pendingAccount/list/${this.id}`) : that.$router.push(`/finance/pendingAccount/payOutline/${this.id}`)
             }
           } else {
             splitType == 'online' ? that.$router.push(`/finance/pendingAccount/list/${this.id}`) : that.$router.push(`/finance/pendingAccount/payOutline/${this.id}`)
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
    },
    /**
     * 返回列表页
     */
    handleReturn() {
      this.$router.push('/finance/pendingAccount')
    },
    /**
     * 打开图片预览
     */
    openDialog(src) {
      this.previewSrc = src;
      this.$refs.dialogPreview.open();
    },
    getPayWayStr(row, column) { // 支付方式映射
      return getPayWayStr(row.payWay)
    },
    formatTime(row, column) { // 格式化时间
      return formatTimeString(row.order.createTime)
    },
    formatPayTime(row, column) { // 格式化时间
      return formatTimeString(row.confirmPayTime)
    },
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.order.category)
    },
    getSourceStr(row, column) { // 订单来源映射
      return getSourceStr(row.order.source)
    },
    getFundTypeStr(row, column) { // 款项类型映射
      return getFundTypeStr(row.order.fundType)
    },
    payStatus(row, column) { // 分账状态
      return '待分账'
    },
    getInvoiceStatusStr(row, column) { // 采购发票映射
      return row.order.invoiceStatus === 0 ? '不需要' : '需要'
    },
    getPayInvoiceInneedStr(row, column) { // 采购发票映射
      return row.order.payInvoiceInneed === 0 ? '没有' : '有'
    },
    showDialogForm(id) { // 设置异常弹出框
      this.dialogFormVisible = true;
      this.time = new Date().getTime();
    },
    /**
     * 提交分账异常
     */
    submitDialogForm() {
      this.$refs.sendbackIncomeForm.validate((valid) => {
        this.sendbackIncomeForm._time = this.time;
        if (valid) {
          this.sendbackIncomeForm.id = this.id;
          request({
            url: AccountApi.PayGroupOrderX.sendbackIncome,
            method: 'post',
            data: {
              param: JSON.stringify(this.sendbackIncomeForm)
            }
          }).then(data => {
            this.dialogFormVisible = false
            if (data.success === '1') {
              this.$message({
                message: data.msg,
                type: 'success'
              });
              setTimeout(() => {
                this.$router.push('/finance/pendingAccount');
              }, 10);
            } else {
              this.$message({
                message: data.msg,
                type: 'error'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.is-64x64 {
  overflow: hidden
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
.box {
  .media {
    overflow: hidden;
  }
}
</style>
