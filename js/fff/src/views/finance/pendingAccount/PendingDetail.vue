<template id="">
  <div class="content" v-loading.fullscreen="fullscreenLoading" style="padding-bottom:100px;">
    <!-- <h1 class="title" style="font-size: 25px; padding: 15px">分账明细</h1> -->
    <i class="el-icon-arrow-left goback-icon" @click="handleReturn">返回</i>
    <div class="content box">
      <span class="detail-title">分账信息:</span>
      <span>进入待分账时间：{{detailData.createTime | formateTime}}</span>
      <table class="custom-table">
        <tr>
          <td>分账状态：
            <span class="forgive-color">{{detailData.payStatus | formatePayStatus}}</span>
          </td>
          <td>
            应付款：
            <span class="red-color">{{detailData.toPayMoney | formateNumber}}</span>元
          </td>
          <td>采购商税款：{{detailData.taxMoney | formateNumber}}元</td>
          <td>定金：
            <template v-if="detailData.fundType === 2">
              {{detailData.earnestMoney | formateNumber}}元
            </template>
            <template v-else>
              --
            </template>
          </td>
        </tr>
        <tr>
          <td>款项类型：{{detailData.fundType | formatefundType}}</td>
          <td>采购商付款金额：{{detailData.buyerPayedMoney | formateNumber}}元</td>
          <td>供应商税款：{{detailData.sellerTaxMoney | formateNumber}}元</td>
          <td>已付定金：
            <template v-if="detailData.fundType === 3">{{detailData.payedEarnestMoney | formateNumber}}元</template>
            <template v-else>--</template>
          </td>
        </tr>
        <tr>
          <td :colspan="2">通知付款备注：{{detailData.content }}</td>
          <td>成本货款：
            <template v-if="detailData.fundType === 5">{{detailData.costMoney | formateNumber}}元</template>
            <template v-else>--</template>
          </td>
          <td>尾款：
            <template v-if="detailData.fundType === 3">{{detailData.finalMoneySoouyaToSeller | formateNumber}}元</template>
            <template v-else>--</template>
          </td>
        </tr>
        <tr>
          <td colspan="4" align="left">
            <label>采购商付款凭证：</label>
            <article class="media imgShow" v-if='detailData.buyerCertificateList && detailData.buyerCertificateList.length'>
              <a :href="'http://test.soouya.com'+ val.imgUrl " class="image media-left" v-lightbox="detailData.buyerCertificateList" v-for="(val,index) in detailData.buyerCertificateList" :key="index">
                <img :src="'http://test.soouya.com'+ val.imgUrl +'@200h_200w_1e'" alt="Image" width="40" height="40">
              </a>
            </article>
          </td>
        </tr>
      </table>
    </div>
     <div class="basic-print">
      <a class="print-btn" :href="`/common/printDetail/${(detailData && basicData.orderNumber)}`" target="_blank">
        <el-button style="width: 100px;" type="primary" size="mini">打印</el-button>
      </a>
      </h4>
      <order-detail :basicData="basicData"></order-detail>
    </div>
    <DahuoInformation class="content box" :basicData="basicData"></DahuoInformation>
    <!-- 增加的分账的弹框 -->
    <el-dialog title="提示" v-model="subAccountVisible" size="tiny" v-if="subAccountData">
      <span style='padding: 10px 0; font-size: 16px'>{{subAccountData.templateDescr}}</span>
      <div style='font-size: 16px; text-align: left; padding-left: 20px'>
        <div style='margin-top: 20px;'>
          <strong>应付款：</strong>
          <strong class="red">{{subAccountData.toPayMoney}}</strong>元</div>
        <div style='margin-top: 20px;'>
          <strong>可用余额：</strong>{{subAccountData.availableBalance}}元</div>
        <div style='margin-top: 20px;' v-if="subAccountData.templateId == '2'">
          <strong>可用徙木额度：</strong>{{subAccountData.baitiaoRemainLine}}元</div>
        <div style='margin-top: 20px;' v-if="subAccountData.templateId == '2' || subAccountData.templateId == '3'">
          <strong>可用搜芽额度：</strong>{{subAccountData.remainLine}}元</div>
        <div style='margin-top: 20px; border-top: 1px dashed #999; padding-top: 20px'>
          <strong>采购商付款金额：</strong>
          <span class="red">{{subAccountData.buyerPayedMoney}}</span>元</div>
        <div style='margin-top: 20px;'>
          <strong>采购商付款凭据:</strong>
          <article class="media" v-if='subAccountData.buyerCertificateList && subAccountData.buyerCertificateList.length'>
            <a :href="'http://test.soouya.com'+val.imgUrl" class="image media-left is-64x64" v-lightbox="subAccountData.buyerCertificateList" v-for="(val,index) in subAccountData.buyerCertificateList" :key="index">
              <img :src="'http://test.soouya.com'+val.imgUrl+'@200h_200w_1e'" alt="Image" width="60" height="60">
            </a>
          </article>
        </div>
        <div style='margin-top: 20px; font-size: 16px;'>
          <strong>通知付款备注：</strong> {{subAccountData.followerRemark}}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subAccountVisible = false">取 消</el-button>
        <el-button type="primary" @click="toAdjust">去调整</el-button>
      </span>
    </el-dialog>

    <!-- <div class="fixed-footer">
                <template v-if="detailData && detailData.toPayMoney == 0 && detailData.fundType == 7">
                  <a @click.prevent="closeDeal(detailData.id)">关闭</a>
                </template>
                <template v-else-if="detailData && basicData && needToPaySeller == 0">
                  <el-button type="primary" @click.native='passPayHandle(detailData.id)'>无需分账</el-button>
                </template>
                <template v-else>
                  <el-button type="primary" @click.native="splitOnOrOffLine(detailData, 'online')">分账</el-button>
                  <el-button type="primary" @click.native="splitOnOrOffLine(detailData, 'offline')">线下分账</el-button>
                </template>
                  <template v-if="basicData.type == 3">
                    <el-button type="danger" @click.native="showDialogForm">打回采购</el-button>
                  </template>
                  <template v-else>
                    <el-button type="danger" @click.native="showDialogForm">打回跟单</el-button>
                  </template>
                  <el-button @click.native="handleReturn">返回</el-button>
              </div> -->

    <el-dialog title="图片预览" v-model="previewVisible" ref="dialogPreview">
      <img :src="previewSrc" alt="图片预览" class="preview-img" />
    </el-dialog>

    <el-dialog :title="basicData.type == 3 ? '打回采购' : '打回跟单'" v-model="dialogFormVisible">
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
  newRequest,
  request,
  formatTimeString,
} from 'src/common/utils.js'
import DahuoInformation from 'components/detail/dahuoInformation'
import AccountApi from 'api/account.js'
import orderDetail from 'components/detail/orderDetail'
import Lightbox from 'components/lightbox/lightbox'
import FootInfomation from 'components/detail/footInfomation'
export default {
  components: {
    Lightbox,
    orderDetail,
    FootInfomation,
    DahuoInformation
  },
  computed: {
    totalCost() {
      let cost = 0
      if (this.basicData.colorList) {
        this.basicData.colorList.forEach((item) => {
          cost += Number(item.quantity * item.price)
        })
      }
      return Number(cost).toFixed(2)
    },
  },
  filters: {
    formateNumber(val) {
      return Number(val).toFixed(2)
    },
    formateTime(val) {
      return val && Number(val) > 0 ? formatTimeString(val) : '--'
    },
    formatePayStatus(val) {
      if (val == 1) {
        return '待收款'
      } else if (val == 2) {
        return '待分账'
      } else if (val == 100) {
        return '分账中'
      } else if (val == 101) {
        return '已分账'
      } else if (val == -1) {
        return '作废'
      } else if (val == -2) {
        return '未启用'
      } else {
        return ''
      }
    },
    formatefundType(val) {
      if (val == 2) {
        return '定金'
      } else if (val == 3) {
        return '尾款'
      } else if (val == 5) {
        return '全款'
      } else if (val == 7) {
        return '补款'
      } else {
        return ''
      }
    },
  },
  data() {
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
      needToPaySeller: 0,
      previewSrc: '', // 图片预览previewSrc
      detailData: {}, // 分账明细data
      basicData: {}, // 基本信息
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
      customerAccount: {},
      subAccountVisible: false, // 分账弹框的切换值
      subAccountData: null, // 对账内容
    }
  },
  mounted() {
    this.id = this.$route.params.id; // 分账ＩＤ
    this.getDetail();
  },
  methods: {
    closeDeal(id) {
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
        contentType: 'application/json',
        data: JSON.stringify(this.descrForm)
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
      newRequest({
        url: AccountApi.PayGroupOrderX.getDetail,
        method: 'get',
        data: { id: this.id }
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.detailData.toPayMoney = data.obj.toPayMoney
          this.detailData = data.obj;
          this.basicData = data.obj.order;
          this.needToPaySeller = this.basicData.needToPaySeller;
          this.basicData.colorList = data.obj.order.colorList;
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
        newRequest({
          url: AccountApi.PayGroupOrderX.passPay,
          method: 'post',
          contentType: 'application/json',
          data: {
            id: this.detailData.id,
            _time: _time
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
    splitOnOrOffLine(detailData, splitType) {
      newRequest({
        url: AccountApi.Account.splitAccountConfirmById,
        method: 'get',
        data: { id: detailData.id }
      }).then(data => {
        this.subAccountVisible = true;
        console.log(this.subAccountVisible)
        if (data.success == '1') {
          if (data.obj.templateId != '100') {
            this.subAccountVisible = true;
            this.subAccountData = data.obj;
            console.log(this.subAccountData)
          } else {
            splitType == 'online' ? this.$router.push(`/finance/pendingAccount/list/${detailData.id}`) : this.$router.push(`/finance/pendingAccount/payOutline/${detailData.id}`)
          }
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    },
    toAdjust() { // 去调整额度
      this.subAccountVisible = false;
      window.open(`/finance/moneyManage/moneyManageDetail?id=${this.detailData.buyerId}`)
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
          newRequest({
            url: AccountApi.PayGroupOrderX.sendbackIncome,
            method: 'post',
            data: this.sendbackIncomeForm,
            contentType: 'application/json'
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
.basic-print {
  position: relative;
  .print-btn {
    float: right;
    margin-top: 30px;
    margin-right: 50px;
  }
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

.fixed-footer {
  position: fixed;
  left: 201px;
  right: 0;
  bottom: 0;
  background: #fff;
  height: 50px;
  padding-top: 10px;
  padding-left: 15px;
}

.custom-table {
  width: 100%;
  border-spacing: 0;
  border: 1px solid #ccc;
  border-bottom: 0;
  border-right: 0;
  border-collapse: separate;
  table-layout: fixed;
  text-align: left;
  margin-bottom: 20px;
  th {
    white-space: nowrap;
    overflow: hidden;
    background-color: #fff;
    height: 20px;
    line-height: 40px;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    color: #1f2d3d;
    padding: 0 10px;
  }
  tr {
    height: 35px;
  }
  td {
    padding: 5px 10px;
    font-size: 14px;
    position: relative;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    min-width: 0;
    min-width: 100px;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    label {
      display: inline-block;
      vertical-align: top;
      line-height: 40px;
    }
    p {
      display: inline-block;
      padding-right: 10px;
    }
    .imgShow {
      display: inline-block;
      a {
        margin-right: 5px;
      }
    }
    .left-img {
      float: left;
    }
    .right-info {
      float: right;
      line-height: 40px;
    }
  }
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
