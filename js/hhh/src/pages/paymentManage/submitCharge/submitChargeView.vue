<template>
    <section class="detail">
      <div class="detail-title">
        <span @click="$router.back(-1)"></span>
        <p>对账清单</p>
      </div>
      <!-- <el-row class="sy-header" type="flex" justify="space-between" align="middle">
        <span>对账清单11</span>
        <span>
                  <el-button type="text" @click="$router.back(-1)">返回采购商对账列表修改&gt;&gt;</el-button>
              </span>
      </el-row> -->
      <div class="detail-group">
        <div class="detail-item w100p p14">
          <template v-if="orderDetail">
            <div v-if="orderDetail.hasOwnProperty('dhOrderList') && orderDetail.dhOrderList.length" v-for="(order,index) in orderDetail.dhOrderList">
              <dl class="info-item">
                <dt>大货单</dt>
                <dd></dd>
              </dl>
              <dl class="info-item">
                <dt>订单号：</dt>
                <dd>{{order.serviceNumber}}</dd>
              </dl>
              <dl class="info-item">
                <dt>采购商：</dt>
                <dd>{{order.buyerCompany}}</dd>
              </dl>
              <dl class="info-item">
                <dt>供应商：</dt>
                <dd>{{order.shopCompany}}</dd>
              </dl>
              <dl class="info-item">
                <dt>订单总金额：</dt>
                <dd class="red">{{order.saleMoney | formatMoney}}元</dd>
              </dl>
              <dl class="info-item">
                <dt>订单发布时间：</dt>
                <dd>{{order.createTime | formatTime}}</dd>
              </dl>
              <dl class="info-item">
                <dt>待对账金额：</dt>
                <dd class="red">{{order.totalMoney | formatMoney}}元</dd>
              </dl>
              <!-- <header>
                <span>大货单</span>
                <span>订单号：{{order.serviceNumber}}</span>
                <span>采购商：{{order.buyerCompany}}</span>
                <span>供应商：{{order.shopCompany}}</span>
                <span>订单总金额：{{order.saleMoney | formatMoney}}元</span>
                <span>订单发布时间：{{order.createTime | formatTime}}</span>
                <span>待对账金额
                          <strong>{{order.totalMoney | formatMoney}}元</strong>
                      </span>
              </header> -->
              <div class="table-warp p14" style="width:90%">
                <el-table :data="order.outReposityList" class="table-normal">
                  <el-table-column label="出仓单号" prop="outReposityNumber" align="center"></el-table-column>
                  <el-table-column label="出仓销售货款" prop="saleMoney" align="center" :formatter="formatMoney"></el-table-column>
                  <el-table-column label="应收出仓销售货款" prop="needSaleMoney" align="center" :formatter="formatMoney"></el-table-column>
                  <el-table-column label="运费" prop="freightMoney" align="center" :formatter="formatMoney"></el-table-column>
                  <el-table-column label="提交对账金额" prop="totalMoney" align="center" :formatter="formatMoney"></el-table-column>
                  <el-table-column label="出仓时间" prop="outTime" :formatter="formatTime" align="center"></el-table-column>
                </el-table>
              </div>
            </div>
            <div class="sy-order-wrap" v-if="orderDetail.hasOwnProperty('cutList') && orderDetail.cutList.length" v-for="(order,index) in orderDetail.cutList">
              <dl class="info-item">
                <dt>剪版单</dt>
                <dd></dd>
              </dl>
              <dl class="info-item">
                <dt>订单号：</dt>
                <dd>{{order.number}}</dd>
              </dl>
              <dl class="info-item">
                <dt>采购商：</dt>
                <dd>{{order.customerCompany}}</dd>
              </dl>
              <dl class="info-item">
                <dt>供应商：</dt>
                <dd>{{order.shopCompany}}</dd>
              </dl>
              <dl class="info-item">
                <dt>订单总金额：</dt>
                <dd class="red">{{order.costMoney | formatMoney}}元</dd>
              </dl>
              <dl class="info-item">
                <dt>订单发布时间：</dt>
                <dd>{{order.createTime | formatTime}}</dd>
              </dl>
              <dl class="info-item">
                <dt>待对账金额：</dt>
                <dd class="red">{{order.totalMoney | formatMoney}}元</dd>
              </dl>
              <!-- <header>
                <span>剪版单</span>
                <span>订单号：{{order.number}}</span>
                <span>采购商：{{order.customerCompany}}</span>
                <span>供应商：{{order.shopCompany}} </span>
                <span>订单总金额：&yen;{{order.costMoney | formatMoney}}</span>
                <span>订单发布时间：{{order.createTime | formatTime}}</span>
                <span>待对账金额：
                          <strong>{{order.totalMoney | formatMoney}}元</strong>
                      </span>
              </header> -->
              <div class="table-warp p14" style="width:90%">
                <el-table :data="[order]" class="table-normal">
                  <el-table-column label="成本货款" align="center" prop="costMoney" :formatter="formatMoney">
                  </el-table-column>
                  <el-table-column label="服务费" align="center">
                    <template scope="scope">
                      <template v-if="scope.row.serviceMoney < 0 || scope.row.servicceMoney == null">
                        <span>--</span>
                      </template>
                      <template v-else>
                        <span>{{scope.row.serviceMoney | formatMoney}}</span>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="税费" align="center">
                    <template scope="scope">
                      <template v-if="scope.row.taxMoney < 0 || scope.row.taxMoney == null">
                        <span>--</span>
                      </template>
                      <template v-else>
                        <span>{{scope.row.taxMoney | formatMoney}}</span>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="运费" align="center" prop="freightMoney" :formatter="formatMoney">
                  </el-table-column>
                  <el-table-column label="总费用" align="center" prop="totalMoney" :formatter="formatMoney">
                  </el-table-column>
                  <el-table-column label="提交对账金额" align="center" prop="totalMoney" :formatter="formatMoney">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="table-warp p14" style="width:90%">
              <table class="table-normal">
                <colgroup>
                  <col width="25%">
                  <col width="25%">
                  <col width="25%">
                  <col width="25%">
                </colgroup>
                <tbody>
                  <tr>
                    <td>账户可用总额</td>
                    <td>可用余额</td>
                    <td>白条额度</td>
                    <td>可用白条额度</td>
                  </tr>
                  <tr>
                    <td>&yen;{{orderDetail.available | formateMoney}}</td>
                    <td>&yen;{{orderDetail.availableBalance | formateMoney}}</td>
                    <td>&yen;{{orderDetail.allCreditLine | formateMoney}}</td>
                    <td>&yen;{{orderDetail.allRemainLine | formateMoney}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <dl class="info-item">
              <dt>支付总计：</dt>
              <dd><span class="red f24 mr10">{{orderDetail.totalMoney | formateMoney}}元</span>
                <el-button type="primary" @click.native="submitAccount">提交对账</el-button>
              </dd>
            </dl>
            <el-dialog v-model="dialogVisible" size="small" custom-class="submit-pay-money" title="提交对账" :close-on-click-modal="false">
              <div class="pay-content">
                <div class="pay-item">
                  <span class="pay-item-l">采购商:</span>
                  <span>{{orderDetail.buyerCompany}}</span>
                </div>
                <div class="pay-item">
                  <p><span class="pay-item-l">可用余额:</span><strong style="color:red">&yen;{{informShowData.availableBalance}}</strong> </p>
                  <p><span class="pay-item-l">可用白条额度:</span><strong style="color:red">&yen;{{informShowData.baitiaoRemainLine}}</strong>（白条额度：&yen;{{informShowData.baitiaoCreditLine}} 预扣金额：&yen;{{informShowData.baitiaoHoldMoney}}） </p>
                  <p><span class="pay-item-l">可用垫付额度:</span><strong style="color:red">&yen;{{informShowData.remainLine}}</strong>（垫付额度：&yen;{{informShowData.creditLine}} 预扣金额：&yen;{{informShowData.holdMoney}}） </p>
                </div>
                <div class="pay-item">
                  <span class="pay-item-l">支付总计:</span>
                  <span>&yen;{{orderDetail.totalMoney | formateMoney}}</span>
                </div>
                <div class="pay-item">
                  <span class="pay-item-l"><span class="red">*</span>支付方式:</span>
                  <!-- <span>垫付支付</span> -->
                  <el-radio-group v-model="creditType">
                    <el-radio :label="3" v-if="!isCut">余额支付</el-radio>
                    <el-radio :label="2" v-if="!isCut" :disabled="!canBaitiaoPay">白条支付</el-radio>
                    <el-radio :label="1" :disabled="!canDianfuPay">垫付支付</el-radio>
                  </el-radio-group>
                </div>
                <div class="pay-item">
                  <p v-if="creditType == 3" style="font-size: 12px;color:red;margin: 0px 0"> <span class="pay-item-l"></span>提醒：使用余额前请先跟销售或财务确认！</p>
                </div>
                <div class="pay-item" v-if="creditType==1">
                  <span class="pay-item-l"><span class="red">*</span>回款日期:</span>
                  <span><el-date-picker v-model="returnDate" type="date"placeholder="选择日期":picker-options="pickerOptions"> </el-date-picker></span> </div>
                <div class="pay-item" v-if="creditType==1">
                  <span class="pay-item-l" style="position: absolute; top: 0; left: 0;">
                              <span class="red"  v-if="!isCut">*</span>垫付凭证:
                  </span>
                  <div style="width: 300px; display: inline-block;margin-left: 150px;">
                    <div class="showmadan">
                      <a :href="item" :key="item" v-lightbox="imgUrls1" v-for="(item, index) in imgUrls1" class="madan-wrap">
                                      <img :src="item" width='40' height="40" />
                                      <span @click="del1(item)" class="del-arrow">X</span>
                                  </a>
                    </div>
                    <el-upload action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-upload-list="false" style="display:inline-block; width: auto; margin-bottom: 8px;" :before-upload="beforeUpload1" :on-success="handleSuccess1" :on-error="handleError1">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="pay-item">
                  <span class="pay-item-l" style="position: absolute; top: 0; left: 0;">
                              <!-- <strong style="display:inline-block;color:red;margin-right:5px">*</strong> -->
                             付款凭据:
              </span>
                  <div style="width: 300px; display: inline-block;margin-left: 150px;">
                    <div class="showmadan">
                      <a :href="item" :key="item" v-lightbox="imgUrls" v-for="(item, index) in imgUrls" class="madan-wrap">
                                      <img :src="item" width='40' height="40" />
                                      <span @click="del(item)" class="del-arrow">X</span>
                                  </a>
                    </div>
                    <el-upload action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-upload-list="false" style="display:inline-block; width: auto; margin-bottom: 8px;" :before-upload="beforeUpload" :on-success="handleSuccess" :on-error="handleError">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="pay-item" v-if="!isCut">
                  <span class="pay-item-l" style="position: absolute; top: 0; left: 0;line-height: 36px;">出仓备注:</span>
                  <textarea rows="3" style="    border: 1px solid #ddd;display: inline-block; width: 200px; resize: none;margin-left: 150px; padding:5px; height: 100px;" v-model.trim="remark"></textarea>
                  <span>
                              <b style="color: red; padding-left: 5px;">{{remark.length}}</b>/100字</span>
                </div>
                <div class="pay-item">
                  <span class="pay-item-l" style="position: absolute; top: 0; left: 0;line-height: 36px;">结算备注:</span>
                  <textarea rows="3" style="    border: 1px solid #ddd;display: inline-block; width: 200px; resize: none;margin-left: 150px; padding:5px; height: 100px;" v-model.trim="payRemark"></textarea>
                  <span>
                              <b style="color: red; padding-left: 5px;">{{payRemark.length}}</b>/100字</span>
                </div>
              </div>
              <div slot="footer" class="dialog-footer" style="text-align: right;">
                <el-button type="primary" @click.native="confirmPay(1)" v-if="!isCut" :disabled="!canInformPay">采购确认支付</el-button>
                <el-button type="primary" @click.native="confirmPay(0)" v-if="!isCut" :disabled="!canSubmitPay">提交客户支付</el-button>
                <el-button type="primary" @click.native="cutConfirmPay()" v-if="isCut" :disabled="!canCutSubmitPay">确定支付</el-button>
                <el-button @click.native="clearTemData">暂不提交</el-button>
              </div>
            </el-dialog>
            <lightbox />
          </template>
        </div>
      </div>
    </section>
  </template>
  <script>
  import allApi from 'api/allApi'
  import Lightbox from 'components/lightbox/lightbox'
  import lrz from 'lrz'
  import {
    request,
    getCache
  } from 'utils/tool'
  import { request as newRequest } from 'utils/request';
  console.log(request);
  export default {
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        orderDetail: null,
        dialogVisible: false,
        isCut: false,
        // 出仓备注:
        remark: '',
        // 出仓备注
        payRemark: '',
        imgPath: 'http://www.soouya.com',
        // 付款凭据:
        imgUrls: [],
        // 垫付凭据
        imgUrls1: [],
        // 回执日期
        returnDate: '',
        creditType: 3,
        informShowData: {
          colors: [],
          priceUnit: '',
          customerCompany: '',
          availableBalance: '',
          baitiaoRemainLine: '',
          baitiaoCreditLine: '',
          baitiaoHoldMoney: '',
          remainLine: '',
          creditLine: '',
          holdMoney: '',
          payMoney: '',
          mobliePhone: '',
          hasOverdueDebt: null,
          hasOpenedBaitiao: ''
        }
      }
    },
    components: {
      Lightbox
    },
    computed: {
      canBaitiaoPay() {
        if (this.informShowData.hasOverdueDebt == 1 || this.informShowData.hasOpenedBaitiao == 0) {
          return false
        }
        return true
      },
      canDianfuPay() {
        if (this.informShowData.hasOverdueDebt == 1) {
          return false
        }
        return true
      },
      canCutSubmitPay() {
        if (this.creditType == '') {
          return false
        }
        if (this.creditType == 1) {
          if (!this.returnDate) {
            return false
          }
        }
        return true
      },
      canInformPay() {
        if (this.creditType == 2 || !this.creditType) {
          return false
        }
        if (this.creditType == 1 && this.informShowData.hasOpenedBaitiao == 1) {
          return false
        }
        return true
      },
      canSubmitPay() {
        if (this.creditType == 3 || !this.creditType) {
          return false
        }
        if (!this.informShowData.mobliePhone) {
          return false
        }
        return true
      },
      leftnumber() {
        return 100 - String(this.remark).length
      },
    },
    filters: {
      cutString(val) {
        return val && val.substring(0, 8)
      },
      formateMoney(val) {
        if (String(val) == '0') {
          return '0.00'
        } else if (String(val) == '') {
          return '--'
        } else {
          return (Number(val).toFixed(2))
        }
      },
    },
    mounted() {
      this._time = (new Date()).getTime()
      this.getDetail()
    },
    watch: {
      remark(val) {
        if (val.length >= 100) {
          this.remark = val.slice(0, 100)
        }
      }
    },
    methods: {
      getDetail() {
        this.$store.dispatch('changeload', true)
        this.orderIdAndOutReposityIdList = getCache({
          type: 'sessionStorage',
          dataType: 'json',
          key: 'orderIdAndOutReposityIdList'
        })
        if (this.orderIdAndOutReposityIdList[0]['orderId']) {
          this.isCut = true
        } else {
          this.isCut = false
        }
        newRequest(allApi.Account_Bill.review, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { _time: this._time, orderIdAndOutReposityIdList: this.orderIdAndOutReposityIdList }
        }).then(response => {
          this.$store.dispatch('changeload', false)
          if (response.success == 1) {
            this.orderDetail = response.obj
            console.log(this.orderDetail)
          } else {
            const self = this
            this.$message({
              type: 'error',
              message: response.msg,
              duration: 1200,
              onClose() {
                self.$router.go(-1)
              }
            })
          }
        })
      },
      beforeUpload(file) { // 预览图片
        const that = this
        this.$store.dispatch('changeload', true)
        lrz(file, {
            quality: 1
          })
          .then(function(rst) {
            // 处理成功会执行
            rst.formData.append('field', 'imgUrl')
            request({
              url: '/redwood/sys/Common/uploadFile.do?type=1',
              method: 'post',
              data: rst.formData,
              dataType: 'FormData'
            }).then(data => {
              that.$store.dispatch('changeload', false)
              if (data.success === '1') {
                that.handleSuccess(data)
              } else {
                that.$alert(data.msg, '', {
                  callback: action => {
                    return true
                  }
                });
              }
            })
            return rst
          })
        return false
      },
      handleSuccess(file) {
        this.$store.dispatch('changeload', false)
        this.imgUrls.push(this.imgPath + file.imgUrl)
      },
      handleError(err, response, file) {
        this.$store.dispatch('changeload', false)
        console.log('error', err)
      },
      beforeUpload1(file) { // 预览图片
        const that = this
        this.$store.dispatch('changeload', true)
        lrz(file, {
            quality: 1
          })
          .then(function(rst) {
            // 处理成功会执行
            rst.formData.append('field', 'imgUrl')
            request({
              url: '/redwood/sys/Common/uploadFile.do?type=1',
              method: 'post',
              data: rst.formData,
              dataType: 'FormData'
            }).then(data => {
              that.$store.dispatch('changeload', false)
              if (data.success === '1') {
                that.handleSuccess1(data)
              } else {
                that.$alert(data.msg, '', {
                  callback: action => {
                    return true
                  }
                });
              }
            })
            return rst
          })
        return false
      },
      handleSuccess1(file) {
        this.$store.dispatch('changeload', false)
        this.imgUrls1.push(this.imgPath + file.imgUrl)
      },
      handleError1(err, response, file) {
        this.$store.dispatch('changeload', false)
        console.log('error', err)
      },
      del(url) {
        this.imgUrls = this.imgUrls.filter((item, key) => item != url)
      },
      del1(url) {
        this.imgUrls1 = this.imgUrls1.filter((item, key) => item != url)
      },
      clearTemData() {
        this.imgUrls = []
        this.remark = ''
        this.dialogVisible = false
      },
      submitAccount() {
        console.log(this.isCut)
        if (this.isCut) {
          this.$message.warning('剪版请找财务线下对账')
          return false
        }
        request({
          url: '/redwood/account/CustomerAccount/getSummary',
          method: 'get',
          data: { id: this.orderDetail.buyerId }
        }).then(data => {
          if (data.success === '1') {
            this.informShowData.availableBalance = data.obj.availableBalance
            this.informShowData.baitiaoRemainLine = data.obj.baitiaoRemainLine
            this.informShowData.baitiaoCreditLine = data.obj.baitiaoCreditLine
            this.informShowData.baitiaoHoldMoney = data.obj.baitiaoHoldMoney
            this.informShowData.remainLine = data.obj.remainLine
            this.informShowData.creditLine = data.obj.creditLine
            this.informShowData.holdMoney = data.obj.holdMoney
            this.informShowData.mobliePhone = data.obj.mobliePhone
            this.informShowData.hasOverdueDebt = data.obj.hasOverdueDebt
            this.informShowData.hasOpenedBaitiao = data.obj.hasOpenedBaitiao
            this.returnDate = null
            this.imgUrls1 = []
            this.imgUrls = []
            if (this.isCut) {
              this.creditType = 1
            } else {
               this.creditType = 3
            }
            this.dialogVisible = true
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      confirmPay(pagerType) {
        // if (this.imgUrls.length == 0) {
        //     this.$message.error('必须上传付款凭据')
        //     return;
        // }
        const tmpCredentialUrls = this.imgUrls1.map((item) => {
          return item.replace(this.imgPath, '')
        })
        const temimgUrls = this.imgUrls.map((item) => {
          return item.replace(this.imgPath, '')
        })
        if (this.creditType == 3 && this.orderDetail.totalMoney > this.informShowData.availableBalance) {
          this.$message.error('金额不足，请保证账户资金充足')
          return false
        }
        if (this.creditType == 1 && this.orderDetail.totalMoney > this.informShowData.remainLine) {
          this.$message.error('金额不足，请保证账户资金充足')
          return false
        }
        if (this.creditType == 2 && this.orderDetail.totalMoney > this.informShowData.baitiaoRemainLine) {
          this.$message.error('金额不足，请保证账户资金充足')
          return false
        }
        if (this.creditType == 1 && (!this.returnDate || !tmpCredentialUrls.length)) {
          this.$message({
            message: '请填写垫付信息',
            type: 'warning'
          })
          return;
        }
        this.$store.dispatch('changeload', true)
        console.log({ orderDetail: this.orderDetail });
        let req = {
          _time: this._time,
          // id: this.orderDetail.id,
          // 付款凭据
          payCredentialUrl: temimgUrls,
          // saleMoney: this.payedMoney,
          orderIdAndOutReposityIdList: this.orderIdAndOutReposityIdList,
          // 接口
          // 采购商id
          customerId: this.orderDetail.buyerId,
          // 支付方式,3:余额支付,2:徒木额度,1:垫付支付
          creditType: this.creditType,
          // 出仓备注
          remark: this.remark,
          // 结算备注
          payRemark: this.payRemark,
          // 回款日期
          returnDate: new Date(this.returnDate).getTime() + 86399000,
          // 垫付凭证
          prepayCredentialUrl: tmpCredentialUrls,
          // 付款人 0 : 客户支付, 1 : 采购支付
          payer: pagerType
        };
        if (this.creditType != 1) {
          delete req.returnDate;
          delete req.prepayCredentialUrl;
        }
        console.log(req);
      newRequest('/redwood/reconciliation/pay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: req
        }).then(res => {
          this.$store.dispatch('changeload', false)
          if (res.success == 1) {
            const self = this
            this.$message({
              type: 'success',
              message: res.msg,
              duration: 1200,
              onClose() {
                self.$router.push({ name: 'waitSubmit' })
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1200
            })
          }
        })
      },
      cutConfirmPay() {
        if (this.creditType == 3 && this.orderDetail.totalMoney > this.informShowData.availableBalance) {
          this.$message.error('金额不足，请保证账户资金充足')
          return false
        }
        if (this.creditType == 1 && this.orderDetail.totalMoney > this.informShowData.remainLine) {
          this.$message.error('金额不足，请保证账户资金充足')
          return false
        }
        const tmpCredentialUrls = this.imgUrls1.map((item) => {
          return item.replace(this.imgPath, '')
        })
        const temimgUrls = this.imgUrls.map((item) => {
          return item.replace(this.imgPath, '')
        })
        this.$store.dispatch('changeload', true)
        let req = {
          // id: this.orderDetail.id,
          // 付款凭据
          payCredentialUrls: temimgUrls,
            // saleMoney: this.payedMoney,
          orderIdAndOutReposityIdList: this.orderIdAndOutReposityIdList,
          // 接口
          // 支付方式,3:余额支付,2:徒木额度,1:垫付支付
          creditType: this.creditType,
          // 结算备注
          payRemark: this.payRemark,
          // 回款日期
          returnDate: new Date(this.returnDate).getTime() + 86399000,
          // 垫付凭证
          prepayCredentialUrls: tmpCredentialUrls,
        };
        if (this.creditType != 1) {
          delete req.returnDate;
          delete req.prepayCredentialUrl;
        }
        var idArr = this.orderIdAndOutReposityIdList.map(item => {
          return item.orderId
        })
        var ids = idArr.join(',')
        console.log(ids)
       newRequest('/redwood/reconciliation/pay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: req
        }).then(res => {
          this.$store.dispatch('changeload', false)
          if (res.success == 1) {
            const self = this
            this.$message({
              type: 'success',
              message: res.msg,
              duration: 1200,
              onClose() {
                self.$router.push({ name: 'waitSubmit' })
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1200
            })
          }
        })
      }
    }
  };
  
  </script>
  <style lang="scss">
  .sy-order-wrap {
    >header {
      margin: 20px 0;
      >span:not(:last-child) {
        border-right: 1px solid #666;
        padding-right: 10px;
        margin-right: 5px;
      }
    }
  }
  
  .sy-header {
    font-size: 18px;
  }
  
  .sy-footer {
    margin-top: 10px;
    .sy-footer-left {
      span {
        color: #999;
        &:not(:first-child) {
          border-left: 1px solid #666;
          margin-left: 10px;
          padding-left: 10px;
        }
      }
    }
    strong {
      color: #f00;
      font-size: 24px;
      vertical-align: middle;
    }
  }
  
  .el-upload-list {
    display: none;
  }
  
  .pay-detail {
    background: #fff;
    padding: 5px 10px;
    .title {
      font-weight: bolder;
      margin-bottom: 8px;
      margin-top: 8px;
      font-size: 16px;
    }
    .showTotal {
      margin-bottom: 20px;
      line-height: 50px;
      height: 50px;
      padding: 0 10px;
      border: 1px solid #cad3de;
      overflow: hidden;
      background-color: #fff;
    }
    .section-wrap {
      border-bottom: 2px solid #cad3de;
      padding-bottom: 10px;
      .section {
        font-size: 14px;
        color: #383838;
        li {
          float: left;
          margin-right: 40px;
          margin-bottom: 10px;
          list-style: none;
          .fw {
            text-align: right;
            display: inline-block;
          }
          .l {
            width: 110px;
            padding-right: 2px;
          }
        }
      }
    }
  }
  
  .submit-pay-money {
    min-width: 500px;
    .pay-content {
      min-width: 500px;
      .pay-item {
        position: relative;
        padding-bottom: 10px;
        .pay-item-l {
          width: 150px;
          white-space: nowrap;
          display: inline-block;
          text-align: right;
          padding-right: 10px;
        }
      }
    }
    .showmadan {
      float: left;
    }
    .madan-wrap {
      position: relative;
      display: inline-block;
      margin-right: 15px;
      margin-bottom: 15px;
    }
    .del-arrow {
      position: absolute;
      text-align: center;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
      top: -10px;
      right: -10px;
      background-color: #ccc;
      color: #fff;
      border: 1px solid #fff;
    }
  }
  
  </style>
  