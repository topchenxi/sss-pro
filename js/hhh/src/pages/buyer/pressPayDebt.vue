<template>
  <div class="press-pay-list">
    <div class="y_tab tab-wrap">
      <el-tabs type="card" :active-name="tabIndex" @tab-click="handleClick">
         <el-tab-pane name="1" :label="'待缴欠款'+(num1 ? '(' : '')+num1+''+(num1 ? ')' : '')"></el-tab-pane>
         <el-tab-pane name="2" :label="'已缴欠款'+(num2 ? '(' : '')+num2+''+(num2 ? ')' : '')"></el-tab-pane>
       </el-tabs>
    </div>
    <div class="y_table">
      <div class="y_table_wrap">
       <el-table
         :data="result"
         :resizable="false"
         :height="height"
       >
         <el-table-column prop="serviceNumber" label="订单号" align="center" >
        </el-table-column>

        <el-table-column prop="shopName" align="center"  label="供应商">
        </el-table-column>

        <el-table-column prop="buyerCompany" align="center" label="采购商">
        </el-table-column>

        <el-table-column inline-template align="center" label="退换货单号">
          <div>
            <template v-if="row.tuihuanNoList.length > 1">
             <el-select v-model="row.tuihuanNoList[0]" @change="goDetail" size="small">
              <el-option
                v-for="item in row.tuihuanNoList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
           </template>
           <span v-if="row.tuihuanNoList.length == 1">{{row.tuihuanNoList[0]}}</span>
          </div>
        </el-table-column>

         <el-table-column inline-template align="center" label="订单类型">
           <div>
             <template v-if="row.type == '1'">服务单</template>
             <template v-if="row.type == '2'">贸易单</template>
           </div>
         </el-table-column>

        <el-table-column prop="returnOrReplaceTime" align="center" label="申请退换货时间" v-if="tabIndex == '1'">
        </el-table-column>

         <el-table-column inline-template align="center" label="供应商退款金额">
           <div>{{row.totalMoney}}元</div>
         </el-table-column>

         <el-table-column  v-if="tabIndex == '1'" inline-template align="center" label="操作" width="100" fixed="right">
           <div class="operate-btn">
            <el-button class="o-btn" size="small" type="primary" @click.native="payDialog(row)">支付</el-button>
           </div>
         </el-table-column>

       </el-table>
     </div>
        <div class="bottom">
          <pagination
            :page="pagation.pageNumber"
            :total="pagation.totalCount"
            :pagesize="pagation.pageSize"
            :render="reqList"
            :options="filters"
          />
        </div>
    </div>
    <!-- 支付弹窗 -->

    <el-dialog
      v-model="dialogVisible"
      size="small"
      custom-class="y-pay-money"
      :close-on-click-modal="false">

      <div class="pay-content">
        <div class="pay-item">
          <span class="pay-item-l">支付总额:</span>
          <span style="color: red;">{{payDialogData.totalMoney && payDialogData.totalMoney.toFixed(2)}}元</span>
        </div>

        <div class="pay-item">
          <span class="pay-item-l">供应商:</span><span>{{payDialogData.shopName}}</span>
        </div>

        <div class="pay-item">

          <span class="pay-item-l" style="position: absolute; top: 0; left: 0;">
            <strong style="color: red;">*</strong>支付凭据:
          </span>

          <div style="width: 300px; display: inline-block;margin-left: 110px;">
              <div class="showmadan">
                <a :href="item" :key="item" v-lightbox="imgUrls" v-for="(item, index) in imgUrls" class="madan-wrap">
                  <img  :src="item" width='40' height="40" />
                  <span @click="del(item)" class="del-arrow">X</span>
                </a>
              </div>

              <el-upload
                action="/redwood/sys/Common/uploadFile.do"
                :multiple="true"
                :show-upload-list="false"
                style="display:inline-block; width: auto; margin-bottom: 8px;"
                :before-upload="beforeUpload"
                :on-success="handleSuccess"
                :on-error="handleError"
              >
              <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
          </div>
       </div>
        <div class="pay-item">
          <span class="pay-item-l"><strong style="color: red;">*</strong>财务收款账户:</span>
          <!-- 传bankNumber  -->
          <el-select v-model="accountName" size="small" style="width: 150px; display: inline-block;">
            <el-option
              v-for="item in accountList"
              :label="item.bankName"
              :key="item.bankNumber"
              :value="item.bankNumber"
              >
            </el-option>
          </el-select>
        </div>
        <div class="pay-item">
          <span class="pay-item-l">备注:</span>
          <el-input type="textarea" v-model="remark" :autosize="{ minRows: 2, maxRows: 3 }" style="display: inline-block; width: 200px; resize: none;"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click.native="clearTemData">取 消</el-button>
        <el-button type="primary" :disabled="imgUrls.length > 0 ? false : true" @click.native="confirmPay">确 定</el-button>
      </div>

    </el-dialog>
    <lightbox />

  </div>
</template>

<script>
import Pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
import StoreApi from 'api/reposity'
import { mapActions, mapState } from 'vuex'
import lrz from 'lrz'
import {
  request,
  setCache,
  getCache,
  formatTimeString
} from 'utils/tool'
export default {
  components: {
    Pagination,
    Lightbox
  },
  data () {
    return {
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1,
      },
      filters: {
        pageSize: 20,
        pageNumber: 1
      },
      accountName: '',
      accountList: [],
      dialogVisible: false,
      payDialogData: {},
      remark: '',
      num1: 2,
      num2: 12,
      tabIndex: '1',
      height: 600,
      result: [],
      imgUrls: [],
      imgPath: 'http://www.soouya.com',
      _time: 0
    }
  },
  mounted () {
    this.countH()
    window.addEventListener('resize', this.countH)
    this.initCondition()
    this.reqList()
    this.financialAccount()
  },
  computed: {
    ...mapState({
      condition: state => {
        return {
          tabIndex: state.pressPayDebt.tabIndex
        }
      }
    })
  },
  methods: {
    initCondition () {
      this.tabIndex = this.condition.tabIndex
    },
    ...mapActions([
      'updateVuexData'
    ]),
    financialAccount () {
      const accountList = getCache({key: 'accountList'})
      if (!accountList) {
        request({
          url: StoreApi.FinanceAccount_list,
          data: {}
        }, (res) => {
          if (res.success == 1) {
            setCache({
              key: 'accountList',
              value: res.result
            })
            this.accountName = res.result[0].bankNumber
            this.accountList = res.result
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1000
            })
          }
        })
      } else {
        this.accountList = accountList
        this.accountName = accountList[0].bankNumber
      }
    },
    handleClick (val) {
      this.tabIndex = String(val.name)
      this.updateVuexData({ module: 'pressPayDebt', tabIndex: this.tabIndex })
      this.reqList({type: '', status: '', keyword: ''})
    },
    reqList (req = {}) {
      this.$store.dispatch('changeload', true)
      this.filters = Object.assign({}, this.filters, req)
      const reqs = {}
      for (const key of Object.keys(this.filters)) {
        if (this.filters[key]) {
          reqs[key] = this.filters[key]
        }
      }
      request({
        url: this.tabIndex == '1' ? StoreApi.PayDebt_listPurchaserTask : StoreApi.PayDebt_listPurchaserPayedTask,
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
    convertData (page) {
      this.pagation.pageNumber = page.pageNumber
      this.pagation.pageSize = page.pageSize
      this.pagation.totalCount = page.totalCount
      this.filters.pageSize = page.pageSize
      this.filters.pageNumber = page.pageNumber
      this.num1 = ''
      this.num2 = ''
      const currentNumber = 'num' + this.tabIndex
      this[currentNumber] = String(page.totalCount)
      page.result.map((item) => {
        item.returnOrReplaceTime = Number(item.returnOrReplaceTime) ? formatTimeString(item.returnOrReplaceTime) : '--'
      })
      this.result = page.result
    },
    // 退换货单号
    goDetail (id) {
      console.log('id', id)
    },
    clearTemData () {
      this.dialogVisible = false
      this.remark = ''
      this.imgUrls = []
    },
    confirmPay () {
      this.$store.dispatch('changeload', true)
      const imgUrls = this.imgUrls.map((val) => {
        return val.replace(this.imgPath, '')
      })
      const obj = {
        id: this.payDialogData.id,
        financeAccount: this.accountName,
        imgUrls: imgUrls,
        remark: this.remark,
        _time: this._time
      }
      request({
        url: StoreApi.PayDebt_inputSellerDebtPayCertificate,
        data: {
          param: JSON.stringify(obj)
        }
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
            const that = this
            this.clearTemData()
            this.$message({
              type: 'success',
              message: res.msg,
              duration: 1000,
              onClose () {
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
    payDialog (row) {
      this.dialogVisible = true
      this.payDialogData = row
      this._time = (new Date()).getTime()
      console.log('_time', this._time);
    },
    countH () {
      this.height = String(document.documentElement.clientHeight - 190)
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
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.countH)
  }
}
</script>
<style lang="scss">
  .y-pay-money {
    min-width: 500px;
    .pay-content {
      min-width: 500px;
      .pay-item {
        position: relative;
        padding-bottom: 10px;
        .pay-item-l {
          width: 110px;
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

  .press-pay-list {
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

     .operate-btn {
       text-align: center;
       .o-btn {
         width: 80px;
         margin-right: 5px;
         margin-bottom: 5px;
       }
     }
     .bottom {
       text-align: right;
       background: #fff;
       padding: 10px;
     }
  }
</style>
