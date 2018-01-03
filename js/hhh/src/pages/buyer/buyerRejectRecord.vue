
<template>

<div class="reject-record">

    <fliter :category="{name: 'buyerpr', index: tabIndex }" :params="filters" @getParams="search" />
    <!-- 已收付款 -->
    <div class="y_table">
        <div class="y_table_wrap">
            <el-table :data="result" :resizable="false" :height="height">
                <el-table-column prop="number" label="退换货单号" min-width="130" align="center">
                </el-table-column>
                <el-table-column prop="serviceNumber" align="center" label="订单号" min-width='155'>
                </el-table-column>
                <el-table-column inline-template align="center" label="订单类型" width='130'>
                    <div>
                        <template v-if="row.dhOrderType == '1'">服务单</template>
                        <template v-if="row.dhOrderType == '2'">贸易单</template>
                    </div>
                </el-table-column>
                <el-table-column prop="createTime" align="center" width="150" label="退换货申请时间">
                </el-table-column>
                <el-table-column prop="buyerCompany" align="center" label="采购商" width="165">
                </el-table-column>
                <el-table-column prop="sellerCompany" align="center" width="165" label="供应商">
                </el-table-column>
                <el-table-column inline-template align="center" label="品类" width="80">
                    <div>
                        <template v-if="row.productType == '1'">面料</template>
                        <template v-if="row.productType == '2'">辅料</template>
                        <template v-if="row.productType == '0'">花型</template>
                        <template v-if="row.productType == '3'">底布</template>
                        <template v-if="row.productType == '4'">花布</template>
                    </div>
                </el-table-column>

                <el-table-column width="130" align="center" label="采购数量">
                  <template scope="scope">
                    {{scope.row.buyQuantity}}{{scope.row.buyQuantityUnit}}
                  </template>
                </el-table-column>

                <el-table-column width="130" align="center" label="入仓数量">
                  <template scope="scope">
                    {{scope.row.inReposityQuantity}}{{scope.row.buyQuantityUnit}}
                  </template>
                </el-table-column>

                <!--<el-table-column width="130" align="center" label="实际布长">
                  <template scope="scope">
                    {{scope.row.buchang}}{{scope.row.buchangUnit}}
                  </template>
                </el-table-column>-->

                <el-table-column width="130" align="center" label="应收应付金额">
                  <template scope="scope">
                    {{scope.row.money}}元
                  </template>
                </el-table-column>
                <!--<el-table-column width="130" align="center" label="实收实付金额">
                   <template scope="scope">
                     {{scope.row.moneyReal}}元
                   </template>
                </el-table-column>-->
                <el-table-column inline-template width="130" align="center" label="退换类型">
                    <div>
                        <template v-if="row.type == '1'">售前退货</template>
                        <template v-if="row.type == '2'">售前换货</template>
                        <template v-if="row.type == '3'">售后退货</template>
                        <template v-if="row.type == '4'">售后换货</template>
                    </div>
                </el-table-column>
                <el-table-column inline-template width="130" align="center" label="款项类型">
                    <div>
                        <template v-if="row.moneyType == '1'">搜芽补款</template>
                        <template v-if="row.moneyType == '2'">供应商退款</template>
                    </div>
                </el-table-column>
                <el-table-column inline-template width="130" align="center" label="异常备注">
                    <div>
                        <template>{{row.exceptReson == ''?"——":row.exceptReson}}</template>
                    </div>
                </el-table-column>
                <el-table-column inline-template width="200" align="center" label="操作" fixed="right">
                    <div class="operate-btn">
                        <template v-if="row.moneyType == '1'">
                            <el-button class="o-btn" size="small" :disabled="!row.money" type="primary" @click.native="confirmPaid(row, 0)">已付款</el-button>
                        </template>
                        <template v-if="row.moneyType == '2'">
                            <el-button class="o-btn" size="small" :disabled="!row.money" type="primary" @click.native="onlinePay(row)">线上收款</el-button>
                            <el-button class="o-btn" size="small" :disabled="!row.money" type="primary" @click.native="confirmPaid(row, 1)">线下收款</el-button>
                        </template>
                    </div>
                </el-table-column>
            </el-table>
        </div>
        <div class="bottom">
            <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
        </div>
    </div>
    <!-- 已收款/线下收款 -->
    <el-dialog :title="flagMark == 0 ? '已付款' : '线下收款'" v-model="confirmShow" custom-class="common-pop" size="tiny" :close-on-click-modal="false">
        <div class="center-info">
          {{flagMark == 0 ? '确定已付款给供应商' : '确定已向供应商收款？'}}
        </div>
        <div class="take-good clearfix" style="padding-top: 15px;">
            <div class="t-item">
                <div class="t-item-l"><b style="color: red;">* </b>{{flagMark == 0 ? '付款' : '收款'}}金额</div>
                <div class="t-item-r">
                  <el-input v-model.trim="realnum" style="width:217px;"></el-input>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" :disabled="realnum ? false : true"  @click.native="confirmInfo(paidData); flagMark=''">确认</el-button>
            <el-button @click.native="confirmShow=false; realnum=''; flagMark=''">取消</el-button>
        </div>
    </el-dialog>
    <!-- 线上收款 -->
    <el-dialog title="线上收款" v-model="onlineShow" custom-class="common-pop" size="tiny" :close-on-click-modal="false">
        <div class="take-good clearfix send-good">
            <div class="t-item">
                <div class="t-item-l"><b style="color: red;">* </b>财务收款账号</div>
                <div class="t-item-r">
                  <el-select v-model="account" placeholder="请选择收款账号">
                    <el-option
                      v-for="item in FinanceAccount"
                      :label="item.bankName + (item.bankName == '支付宝' ? `(${item.bankNumber})` : (item.bankName == '其他' || item.bankName == '现金' ? '' : `(${item.bankNumber.slice(item.bankNumber.length-4)})`))"
                      :value="item.bankNumber">
                    </el-option>
                  </el-select>
                </div>
            </div>
            <div class="t-item">
                <div class="t-item-l"><b style="color: red;">* </b>收款金额</div>
                <div class="t-item-r">
                  <el-input v-model="num" style="width:217px;"></el-input>
                </div>
            </div>
            <div class="t-item">
                <div class="t-item-l"><b style="color: red;">* </b>收款凭据</div>
                <div class="t-item-r">
                  <div class="showmadan">
                    <a :href="item" :key="item" v-lightbox="imgUrls" v-for="(item, index) in imgUrls" class="madan-wrap">
                       <img  :src="item" width='40' height="40" />
                       <span @click="del(item)" class="del-arrow">X</span>
                    </a>
                  </div>
                  <el-upload
                   action="/redwood/sys/Common/uploadFile.do"
                   :multiple="false"
                   :show-upload-list="false"
                   style="display:inline-block; width: auto; margin-bottom: 8px;"
                   :before-upload="beforeUpload"
                   :on-success="handleSuccess"
                   :on-error="handleError"
                  >
                  <el-button size="small" type="primary" v-show="imgUrls.length == 0 ? true : false">点击上传</el-button>
                  </el-upload>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" :disabled="vilidateOnline" @click.native="confirmOnline(onlineData)">提交</el-button>
            <el-button @click.native="clearCacheData()">取消</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
import Fliter from 'components/filter'
import Pagination from 'components/pagination'
import StoreApi from 'api/reposity'
import Lightbox from 'components/lightbox/lightbox'
import lrz from 'lrz'
import { mapActions, mapState } from 'vuex'
import {
    request,
    setCache,
    getCache,
    formatTimeString
}
from 'utils/tool'
export default {
    components: {
        Fliter,
        Pagination,
        Lightbox
    },
    data() {
        return {
            pagation: {
                pageNumber: 1,
                pageSize: 20,
                totalCount: 1,
            },
            flagMark: '',
            onlineShow: false,
            confirmShow: false,
            onlineData: {},
            paidData: {},
            FinanceAccount: {},
            imgUrls: [],
            imgPath: 'http://www.soouya.com',
            account: '',
            num: '',
            realnum: '',
            filters: {
                type: '',
                keyword: '',
                pageSize: 10,
                pageNumber: 1
            },
            height: 600,
            result: [],
            _time: 0
        }
    },
    mounted() {
      this.countH()
      window.addEventListener('resize', this.countH)
      this.initCondition()
      this.reqList()
    },
    watch: {
      realnum(val) {
          if (val.length >= 10) {
              const vals = val.slice(0, 10)
              this.realnum = vals
          }
      },
    },
    computed: {
      ...mapState({
        condition: state => {
          return {
            tabIndex: state.buyerReturnRepalce.tabIndex
          }
        }
      }),
      vilidateOnline() {
        let flag = true
        if (this.account != '' && this.num != '' && this.imgUrls.length != 0) {
          flag = false
        } else {
          flag = true
        }
        return flag
      },
    },
    methods: {
        initCondition () {
          this.tabIndex = this.condition.tabIndex
        },
        ...mapActions([
          'updateVuexData'
        ]),
        handleClick(val) {
                this.tabIndex = String(val.name)
                this.updateVuexData({ module: 'buyerReject', tabIndex: this.tabIndex })
                this.reqList({
                    type: '',
                    status: '',
                    keyword: ''
                })
            },
            search(params) {
                this.filters.pageNumber = '1'
                if (params.type == '0') {
                  params.type = ''
                }
                this.filters = Object.assign(this.filters, params)
                this.reqList()
            },
            reqList(req = {}) {
                this.$store.dispatch('changeload', true)
                this.filters = Object.assign({}, this.filters, req)
                const reqs = {}
                for (const key of Object.keys(this.filters)) {
                    if (this.filters[key]) {
                        reqs[key] = this.filters[key]
                    }
                }
                request({
                    url: StoreApi.listForSellerMoney.list,
                    data: {
                        param: JSON.stringify(reqs)
                    }
                }, (res) => {
                    this.$store.dispatch('changeload', false)
                    if (res.success == 1) {
                        this.convertData(res.page)
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg,
                            duration: 1000
                        })
                    }
                })
            },
            convertData(page) {
                this.pagation.pageNumber = page.pageNumber
                this.pagation.pageSize = page.pageSize
                this.pagation.totalCount = page.totalCount
                this.filters.pageSize = page.pageSize
                this.filters.pageNumber = page.pageNumber
                page.result.map((item) => {
                    item.createTime = Number(item.createTime) != 0 ? formatTimeString(item.createTime) : '--'
                    item.financeReviewTime = Number(item.financeReviewTime) != 0 ? formatTimeString(item.financeReviewTime) : '--'
                    item.purcahserReviewTime = Number(item.purcahserReviewTime) != 0 ? formatTimeString(item.purcahserReviewTime) : '--'
                })
                this.result = page.result
            },
            // 已收款弹窗
            confirmPaid(row, index) {
                this.confirmShow = true
                this.paidData = row
                this.flagMark = index
            },
            clearCacheData () {
                this.confirmShow = false
                this.flagMark = ''
                this.paidData = {}
                this.onlineShow = false
                this.incomeMoney = ''
            },
            // 已收款/线下收款确认
            confirmInfo(row) {
                this.$store.dispatch('changeload', true)
                request({
                    url: this.flagMark == 0 ? StoreApi.listForSellerMoney.confirmPayToSeller : StoreApi.listForSellerMoney.receiveOffline,
                    data: {
                        param: JSON.stringify({number: row.number, incomeMoney: this.realnum})
                    }
                }, (res) => {
                    this.$store.dispatch('changeload', false)
                    if (res.success == 1) {
                        const that = this
                        this.$message({
                            type: 'success',
                            message: res.msg,
                            duration: 1000,
                            onClose() {
                              that.clearCacheData()
                              that.reqList()
                            }
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg,
                            duration: 1000
                        })
                    }
                })
            },
            // 线上收款弹窗
            onlinePay(row) {
                this.onlineShow = true
                this.onlineData = row
                this._time = (new Date()).getTime()
                const res = getCache({key: 'finanicial'})
                if (res) {
                  this.FinanceAccount = res
                } else {
                  this.financeData()
                }
            },
            financeData() {
              this.$store.dispatch('changeload', true)
              request({
                    url: StoreApi.FinanceAccount_list,
                    data: {}
                }, (res) => {
                    this.$store.dispatch('changeload', false)
                    if (res.success == 1) {
                        this.FinanceAccount = res.result
                        setCache({
                          key: 'finanicial',
                          value: res.result
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg,
                            duration: 1000
                        })
                    }
                })
            },
            // 线上收款确认
            confirmOnline(row) {
                this.$store.dispatch('changeload', true)
                const submitImgUrl = this.imgUrls.map((item) => { return item.replace(this.imgPath, '') })
                const obj = JSON.stringify({
                    returnReplaceNumber: row.number,
                    financeAccount: this.account,
                    incomeMoney: this.num,
                    imgUrl: submitImgUrl[0],
                    _time: this._time
                })
                request({
                    url: StoreApi.listForSellerMoney.receiveOnline,
                    data: {
                        param: obj
                    }
                }, (res) => {
                    this.$store.dispatch('changeload', false)
                    if (res.success == 1) {
                        const that = this
                        this.$message({
                            type: 'success',
                            message: res.msg,
                            duration: 1000,
                            onClose() {
                               that.clearCacheData()
                               that.reqList()
                            }
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg,
                            duration: 1000
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
              .then(function (rst) {
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
            handleSuccess (file, fileList) {
              this.$store.dispatch('changeload', false)
              this.imgUrls.push(this.imgPath + file.imgUrl)
            },
            handleError (file, fileList) {
              this.$store.dispatch('changeload', false)
            },
            del (url) {
              this.imgUrls = this.imgUrls.filter((item, key) => item != url)
            },
            countH() {
                this.height = String(document.documentElement.clientHeight - 240)
            },
    },
    destroyed() {
        window.removeEventListener('resize', this.countH)
    }
}

</script>

<style lang="scss">

  .reject-record {
      .y_table {
          clear: both;
      }
      .y_table_wrap {
          td.is-center {
              text-align: center;
              border-right: 1px solid #ddd;
          }
          th.is-center {
              text-align: center;
          }
          .el-table td .cell {
              padding: 5px 0 0;
              line-height: 1.5;
              word-break: break-word;
          }
          position: relative;
      }
      .bottom {
          text-align: right;
          background: #fff;
          padding: 10px;
      }
      .operate-btn {
          text-align: left;
          padding-left: 10px;
          .o-btn {
              width: 80px;
              margin-right: 5px;
              margin-bottom: 5px;
              margin-left:0px;
          }
      }
  }

  .unnormal {
      .un-line {
          margin-bottom: 5px;
          position: relative;
          .un-l-left {
              display: inline-block;
              width: 70px;
              padding-right: 5px;
              text-align: right;
          }
          .un-l-r {
              width: 150px;
              display: inline-block;
          }
      }
  }

  .common-pop {
      min-width: 500px;
  }

  .take-good {
      max-height: 450px;
      min-width: 460px;
      overflow-y: auto;
      .t-item {
          position: relative;
          margin-bottom: 15px;
      }
      .t-item-l {
          display: inline-block;
          width: 130px !important;
          text-align: right;
          padding-right: 10px;
      }
      .t-item-r {
          display: inline-block;
          min-width: 320px;
          .r-line {
              padding-bottom: 5px;
          }
          .img-upload{
            width: 100px;
            height:100px;
            border:3px solid #ccc;
            border-radius:4px;
            text-align:center;
            line-height:100px;
            cursor:pointer;
            i{
              color:#ccc;
              font-size:32px;
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
  }
  .center-info{
    text-align: center;
    font-size: 16px;
  }
  .send-good {
      max-height: 450px;
      overflow-y: auto;
  }

</style>
