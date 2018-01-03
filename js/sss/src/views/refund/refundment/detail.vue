<template id="">
<div class="content">
  <h1 class="title" style="font-size: 25px; padding: 15px">退款处理明细</h1>
  <div class="content">
    <h4>总退款明细</h4>
    <div class='box'>
      <el-table :data="detailData" border>
        <el-table-column property="buyerReplenishmentMoney" label="采购商补款金额小计（元）" min-width='210'></el-table-column>
        <el-table-column property="soouyaRefundMoney" label="搜芽退款金额小计（元）" min-width='200'></el-table-column>
        <el-table-column property="debtMoney" label="应退小计（元）" min-width='180'></el-table-column>
      </el-table>
    </div>
  </div>

  <div class="content">
    <h4>
      订单详情
      <a class="print-btn" :href="'/common/printDetail/'+(detailData[0] && detailData[0].order.orderNumber)" target="_blank"><el-button type="primary" size="small">打印</el-button></a>
    </h4>
    <div class="box">
      <p> 订单信息：{{detailData[0] && detailData[0].order && detailData[0].order.statusDesc}} </p>
      <el-table :data="detailData" border v-if="detailData.length">
        <el-table-column property="order.serviceNumber" label="订单编号" width="200" show-tooltip-when-overflow></el-table-column>
        <el-table-column property="order.createTime" label="发布时间" width="180" :formatter="formatTime"></el-table-column>
        <el-table-column property="order.category" label="订单类型" :formatter="getCategoryStr"  show-tooltip-when-overflow width="100"></el-table-column>
        <el-table-column inline-template label="大货类型" width="100">
            <div>{{row.order.type == 1 ? '服务单' : '贸易单'}}</div>
        </el-table-column>
        <el-table-column property="fundType" label="款项类型" :formatter="getFundTypeStr" show-tooltip-when-overflow width="100"></el-table-column>
        <el-table-column property="order.source" label="订单来源" :formatter="getSourceStr" show-tooltip-when-overflow width="100"> </el-table-column>
        <el-table-column property="payType" label="对账类型" :formatter="payType" show-tooltip-when-overflow width="100"> </el-table-column>
        <el-table-column inline-template label="跟单员"  width="180" show-tooltip-when-overflow v-if="detailData.length && detailData[0].order.follower">
          <div>{{row.order && row.order.follower}} {{row.order && row.order.followerTel}}</div>
        </el-table-column>
        <el-table-column inline-template label="销售员" show-tooltip-when-overflow v-if="detailData.length && detailData[0].order.salesName">
          <div>{{row.order && row.order.salesName}} {{row.order && row.order.salesTel}}</div>
        </el-table-column>
        <el-table-column property="order.invoiceStatus" label="采购发票" :formatter="getInvoiceStatusStr" v-if="detailData.length && detailData[0].order.category == 'all-all'" width="100"></el-table-column>
        <el-table-column inline-template  label="税点"  width="100" show-tooltip-when-overflow>
          <div>{{row.order.taxPoint}}</div>
        </el-table-column>
        <el-table-column property="order.payInvoiceInneed" label="供应商发票" width="120" :formatter="getPayInvoiceInneedStr" v-if="detailData.length && detailData[0].order.category == 'all-all'"></el-table-column>
        <el-table-column property="order.sellerMessage" label="供应商留言" show-tooltip-when-overflow  width="180"></el-table-column>
        <el-table-column property="order.leaveMessage" label="采购商留言" show-tooltip-when-overflow  width="180"></el-table-column>
      </el-table>
      <div class="content" style='margin-top: 20px;'>
        <p>码单</p>
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
        <p> 采购商基本信息</p>
        <el-table :data="detailData" border>
          <el-table-column property="order.buyerNumber" label="采购商ID"></el-table-column>
          <el-table-column property="order.buyerCompany" label="采购商公司名称" width="150" show-tooltip-when-overflow></el-table-column>
          <el-table-column property="order.buyerTel" label="公司电话" show-tooltip-when-overflow></el-table-column>
          <el-table-column inline-template label="公司地址" show-tooltip-when-overflow>
            <span>{{row.order && row.order.buyerProvince}}{{row.order && row.order.buyerCity}}{{row.order && row.order.buyerArea}}{{row.order && row.order.buyerAddr}}</span>
          </el-table-column>
        </el-table>
      </div>

      <div class="content">
        <p> 采购商收款方式</p>
        <el-table :data="detailData" border v-if="detailData.length">
          <el-table-column property="order.accountUser" label="银行账号开户名"  ></el-table-column>
          <el-table-column property="order.accountBank" label="银行名称" ></el-table-column>
          <el-table-column property="order.accountAddr" label="开户地区" ></el-table-column>
          <el-table-column property="order.accountBranch" label="开户支行" ></el-table-column>
          <el-table-column property="order.accountNumber" label="银行卡号"></el-table-column>
          <el-table-column inline-template label="账户类型"  width="100">
            <span>{{row.order && row.order.accountType == 1 ? '企业' : '个人'}}</span>
          </el-table-column>
        </el-table>
      </div>

      <div class="content">
        <p> 费用明细</p>
        <FeeDetail :order="detailData[0].order" :statusText="statusText" :moneyString="moneyString" :payType="1" v-if="detailData[0] && detailData[0].order"></FeeDetail>
      </div>

    </div>
  </div>
  <!--退换货信息-->
  <div class="content" v-for="(order, index) in replaceOrReturnList">
    <h4>
      退换货信息-{{index+1}}
    </h4>
    <div class="box">
      <p>退换类型</p>
      <el-table v-if="order.orderInfo[0] && order.orderInfo[0].type == 1" :data="order.orderInfo" border>
        <el-table-column inline-template label="退换类型">
          <span>退货</span>
        </el-table-column>
        <el-table-column inline-template label="退换货单号">
          <span>{{row.number}}</span>
        </el-table-column>
        <el-table-column inline-template label="退货原因">
          <span>{{row.reason}}</span>
        </el-table-column>
        <el-table-column inline-template label="跟单员备注">
          <span>{{row.followerRemark}}</span>
        </el-table-column>
        <el-table-column inline-template label="买货员备注">
          <span>{{row.purchaserRemark}}</span>
        </el-table-column>
      </el-table>
      <el-table v-if="order.orderInfo[0] && order.orderInfo[0].type == 2" :data="order.orderInfo" border>
        <el-table-column inline-template label="退换类型">
          <span>换货</span>
        </el-table-column>
        <el-table-column inline-template label="退换货单号">
          <span>{{row.number}}</span>
        </el-table-column>
        <el-table-column inline-template label="换货原因">
          <span>{{row.reason}}</span>
        </el-table-column>
        <el-table-column inline-template label="跟单员备注">
          <span>{{row.followerRemark}}</span>
        </el-table-column>
        <el-table-column inline-template label="买货员备注">
          <span>{{row.purchaserRemark}}</span>
        </el-table-column>
      </el-table>
      <br/>
      <!-- <div v-if="order.orderInfo[0] && order.orderInfo[0].type == 1">
        <p>退货明细</p>
        <el-table :data="order.orderInfo" border>
          <el-table-column inline-template label="货号">
            <span>{{Number(row.earnestMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="色号">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="销售单价">
            <span>{{Number(row.taxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="税点">
            <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="退换货入仓总数">
            <span>{{Number(row.sumMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="退货匹号">
            <span>{{Number(row.sumMoney).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
        <br/>
      </div>
      <div v-if="order.orderInfo[0] && order.orderInfo[0].type == 2">
        <p>换货明细</p>
        <el-table :data="order.orderInfo" border>
          <el-table-column inline-template label="货号">
            <span>{{Number(row.earnestMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="色号">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="销售单价">
            <span>{{Number(row.taxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="税点">
            <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="退换货入仓总数">
            <span>{{Number(row.sumMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="换货匹号">
            <span>{{Number(row.sumMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="换货原数">
            <span>{{Number(row.sumMoney).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
        <br/>
      </div> -->
      <div>
        <p>退款费用</p>
        <el-table v-if="order.buyerDebtMoneyType == 1" :data="order.orderInfo" border>
          <el-table-column inline-template label="退货销售货款/元">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="退货税费/元">
            <span>{{Number(row.taxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="退货服务费/元">
            <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="搜芽退款金额/元">
            <span>{{Number(row.buyerDebtMoney).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
        <el-table v-if="order.buyerDebtMoneyType == 2" :data="order.orderInfo" border>
          <el-table-column inline-template label="换货销售货款/元">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="换货税费/元">
            <span>{{Number(row.taxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="换货服务费/元">
            <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="采购商补款金额/元">
            <span>{{Number(row.buyerDebtMoney).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
  <!--/退换货信息-->

  <!--退换货信息-->
  <!-- <div class="content" v-for="(order, index) in detailData.replaceOrReturnList">
    <h4>
      退换货信息-{{index+1}}
    </h4>
    <div class="box">
      <p>退换类型</p>
      <el-table :data="order.moenyDetail" border>
        <el-table-column inline-template label="退换类型">
          <span>{{Number(row.earnestMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="退换货单号">
          <span>{{Number(row.saleMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="换货原因">
          <span>{{Number(row.taxMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="跟单员备注">
          <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="买货员备注">
          <span>{{Number(row.sumMoney).toFixed(2)}}</span>
        </el-table-column>
      </el-table>
      <br/>
      <p>退货明细</p>
      <el-table :data="order.moenyDetail" border>
        <el-table-column inline-template label="货号">
          <span>{{Number(row.earnestMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="色号">
          <span>{{Number(row.saleMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="销售单价">
          <span>{{Number(row.taxMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="税点">
          <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="退换货入仓总数">
          <span>{{Number(row.sumMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="换货匹号">
          <span>{{Number(row.sumMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="换货原数">
          <span>{{Number(row.sumMoney).toFixed(2)}}</span>
        </el-table-column>
      </el-table>
      <br/>
      <div>
        <p>退款费用</p>
        <el-table v-if="退货" :data="order.moenyDetail" border>
          <el-table-column inline-template label="退货销售货款/元">
            <span>{{Number(row.earnestMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="退货税费/元">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="退货服务费/元">
            <span>{{Number(row.taxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="搜芽退款金额/元">
            <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
        <el-table v-if="!退货" :data="order.moenyDetail" border>
          <el-table-column inline-template label="换货货款/元">
            <span>{{Number(row.earnestMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="换货税费/元">
            <span>{{Number(row.saleMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="换货服务费/元">
            <span>{{Number(row.taxMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column inline-template label="采购商补款金额/元">
            <span>{{Number(row.serviceMoney).toFixed(2)}}</span>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div> -->
  <!--/退换货信息-->

  <el-button type="primary" @click.native="handleDispatch">退款</el-button>
  <el-button type="primary" @click.native="handleOutlineDispatch">线下退款</el-button>
  <el-button v-if='detailData.length && detailData[0].payType === 0' type="danger" @click.native="showDialogForm">异常</el-button>
  <el-button @click.native="handleReturn">返回</el-button>

  <el-dialog title="图片预览" v-model="previewVisible" ref="dialogPreview">
    <img :src="previewSrc" alt="图片预览" class="preview-img" />
  </el-dialog>

  <el-dialog title="异常" v-model="dialogFormVisible">
    <el-form :model="sendbackIncomeForm" :rules="errorRules" ref="sendbackIncomeForm">
      <el-form-item label="退款异常" prop="exceptionMsg">
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
      this.detailData[0].order.madanImgUrls.map((item) => {
        arr.push({ url: 'http://www.soouya.com' + item })
      })
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
      id: '', // 退款ＩＤ
      previewVisible: false, // 图片预览
      previewSrc: '', // 图片预览previewSrc
      detailData: [], // 退款明细data
      replaceOrReturnList: [], // 退换货信息
      dialogFormVisible: false, // 异常弹出框显隐
      sendbackIncomeForm: {}, // 异常弹出框表单模型
      descrDialogFormVisible: false, // 备注弹出框显隐
      descrForm: {}, // 备注弹出框表单内容
      errorRules: {
        exceptionMsg: [
          { validator: validaeExceptionMsg, trigger: 'change' }
        ]
      },
      statusText: '已收款',
      moneyString: 'totalMoney'
    }
  },
  mounted () {
    this.id = this.$route.params.id; // 退款ＩＤ
    this.getDetail();
  },
  methods: {
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
        // update datalist by id
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
     * 获取退款明细
     */
    getDetail() {
      request({
        url: AccountApi.BuyerRefund.getDetail,
        method: 'post',
        data: {
          param: JSON.stringify({ id: this.id })
        }
      }).then(data => {
        if (data.success === '1') {
          this.detailData = [data.obj];
          this.replaceOrReturnList = data.obj.replaceOrReturnList
          for (let i = 0; i < this.replaceOrReturnList.length; i++) {
            this.replaceOrReturnList[i].orderInfo = [this.replaceOrReturnList[i]]
          }
        }
      })
    },
    /**
     * 退款
     */
    handleDispatch() {
      this.$router.push('/refund/refundment/accountInfo/' + this.id)
    },
    /**
     * 线下退款
     */
    handleOutlineDispatch() {
      this.$router.push('/refund/refundment/payOutline/' + this.id)
    },
    /**
     * 返回列表页
     */
    handleReturn() {
      this.$router.push('/refund/refundment')
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
    getCategoryStr(row, column) { // 订单类型映射
      return getCategoryStr(row.order.category)
    },
    getSourceStr(row, column) { // 订单来源映射
      return getSourceStr(row.order.source)
    },
    getFundTypeStr(row, column) { // 款项类型映射
      return getFundTypeStr(row.order.fundType)
    },
    payStatus(row, column) { // 退款状态
      return '待退款'
    },
    payType(row, column) { // 退款类型映射
      return row.payType == 0 ? '欠款' : '实款'
    },
    getInvoiceStatusStr(row, column) { // 采购发票映射
      return row.order.invoiceStatus === 0 ? '不需要' : '需要'
    },
    getPayInvoiceInneedStr(row, column) { // 供应商发票映射
      return row.order.sellerInvoiceStatus === 0 ? '没有' : '有'
    },
    showDialogForm(id) { // 设置异常弹出框
      this.dialogFormVisible = true;
      this.time = new Date().getTime();
    },
    /**
     * 提交退款异常
     */
    submitDialogForm() {
      this.$refs.sendbackIncomeForm.validate((valid) => {
        this.sendbackIncomeForm._time = this.time;
        if (valid) {
          this.sendbackIncomeForm.id = this.id;
          request({
            url: AccountApi.BuyerRefund.sendbackIncome,
            method: 'post',
            data: {
              param: JSON.stringify(this.sendbackIncomeForm)
            }
          }).then(data => {
            // console.log('data', data);
            this.dialogFormVisible = false
            if (data.success === '1') {
              this.$router.push('/finance/pendingAccount');
            } else {
              this.$message({
                message: data.message,
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
.box {
  .media {
    overflow: hidden;
  }
  p {
    margin: 10px 0;
  }
}
</style>
