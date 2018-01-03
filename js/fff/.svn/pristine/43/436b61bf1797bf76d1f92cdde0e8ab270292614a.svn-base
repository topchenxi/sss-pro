<template>
<div v-loading.body="fullscreenLoading">
  <!-- <h1 class="title" style="font-size: 25px; padding: 15px">待收付</h1> -->
  <HeadFilter v-on:getParams="getFilter" :param="filters"></HeadFilter>
  <el-tabs type="border-card"  @tab-click="switchTab" style = "width: 100%;" :active-name="String(currentTab)">
    <el-tab-pane label="线上收款" name="1">
    </el-tab-pane>
    <el-tab-pane label="线下销账" name="2">
    </el-tab-pane>
    <el-tab-pane label="待退款" name="3">
    </el-tab-pane>
    <div class='title-tab'>{{currentTab == 1 ? '待收款总金额' : (currentTab == 2 ? '销账总金额' : '退款总金额')}} :<span class='red'>{{Number(listData.total).toFixed(2)||0.00}}</span> 元
      <el-button type="primary" :disabled='!xiaozhangDialog.row.ids.length' @click.prevent="batchXiaoZhangHandle" v-if='currentTab == 2'>批量销账</el-button>
      <el-button type="primary" :disabled='!refundHandleDialog.row.idList.length' @click.prevent="batchReturnd" v-if='currentTab == 3'>批量操作</el-button></div>
      <br/>
        <el-table class="fixed-table" :data="listData.page.result" border :height="height"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" min-width="50" fixed="left"></el-table-column>
          <el-table-column inline-template
            :label="currentTab == 1 ? '进入待收款日期' : (currentTab == 2 ? '进入待销账日期' : '进入待退款日期')" min-width="170">
              <span>{{formatTime(row.createTime)}}</span>
          </el-table-column>
          <el-table-column property="returnReplaceNumber" label="单号" min-width="170"></el-table-column>
          <el-table-column property="serviceNumber" label="订单号" min-width="170"></el-table-column>
          <el-table-column v-if='currentTab == 1' inline-template label="供应商退款/元"  min-width="140">
             <span>{{Number(row.refundMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column v-if='currentTab == 1' inline-template label="到账金额/元"  min-width="140">
            <span>{{Number(row.incomeMoney).toFixed(2)}}</span>
          </el-table-column>
           <el-table-column v-if='currentTab == 2' inline-template label="销账金额/元"  min-width="140">
             <span>{{row.xiaozhangMoney > 0 ? '+' : ''}}{{Number(row.xiaozhangMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column v-if='currentTab == 3' inline-template label="退款金额/元"  min-width="140">
            <span>{{Number(row.refundMoney).toFixed(2)}}</span>
          </el-table-column>
          <el-table-column property="sellerCompany" label="供应商" min-width="120"> </el-table-column>
          <el-table-column property="sellerNumber" label="供应商ID" min-width="120"> </el-table-column>
          <el-table-column property="buyerCompany" label="采购商" min-width="120"> </el-table-column>
          <el-table-column property="buyerNumber" label="采购商ID" min-width="120"> </el-table-column>
          <el-table-column inline-template label="销账人员" min-width="120">
            <div>{{row.purchaserName}}/{{row.purchaserTel}}</div>
          </el-table-column>
          <el-table-column inline-template label="销账类型" min-width="100">
            <span>{{replaceOrReturnTypeList[row.returnReplaceType - 1]}}</span>
          </el-table-column>
          <el-table-column v-if='currentTab != 3' inline-template property="returnReplaceCreateTime" label="申请退换货时间" min-width="170">
            <span v-if='row.returnReplaceType > 4'>--</span>
            <span v-else>{{formatTime(row.returnReplaceCreateTime)}}</span>
          </el-table-column>
          <el-table-column v-if='currentTab == 1' inline-template label="财务收款账户" width='200'>
            <div><p>{{ row.financeAccountBank }}</p><p>{{ row.financeAccount }}</p></div>
          </el-table-column>
          <el-table-column v-if='currentTab == 2' inline-template label="销账备注" width='200'>
            <div><p>{{row.remark}}</p></div>
          </el-table-column>
          <el-table-column inline-template label="操作" min-width="160" fixed="right">
            <div class="operate-btn">
              <template v-if='currentTab == 1'>
                <el-button size='mini' @click.prevent="handleGet(row)">确认收款</el-button>
                <!-- <el-button size='mini' @click.prevent="showDialogForm(row.id)">异常</el-button> -->
              </template>
              <template v-if='currentTab == 2'>
                <el-button size='mini' @click.prevent="xiaoZhangShow(row)">销账</el-button>
              </template>
              <template v-if='currentTab == 3'>
                <el-button size='mini' @click.native="refundHandle(row)">同意退款</el-button>
              </template>
              <el-button size='mini' @click.native='jumpToDebtDetail(row.id, row.returnReplaceType)'>明细</el-button>
            </div>
          </el-table-column>
        </el-table>
  </el-tabs>
  <div class="pagination-content">
    <pagination :page="listData.page && listData.page.pageNumber" :total="listData.page && listData.page.totalCount" :render="getList" :options="filters"></pagination>
  </div>
  <lightbox></lightbox>
  <el-dialog title="提示" v-model="handleGetDialog.show"  size="tiny">
    <span style='padding: 10px 0; font-size: 16px'> 确认已收回供应商退款 ?</span>
    <div style='font-size: 16px; text-align: left; padding-left: 20px'>
      <div style='margin-top: 20px;'>
        供应商退款凭据:
        <article class="media">
          <a :href="'http://test.soouya.com'+ imgUrl" class="image media-left is-64x64"
            v-lightbox="sellerCertificateList"
            v-for="(imgUrl, i) in sellerCertificateList"
            >
            <img :src="'http://test.soouya.com'+ imgUrl+'@200h_200w_1e'" alt="Image" width="60" height="60" :key='i'>
          </a>
        </article>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleGetDialog.show = false">取 消</el-button>
      <el-button type="primary" @click="handleGetSave">确定</el-button>
    </span>
  </el-dialog>
  <el-dialog title="异常" v-model="dialogFormVisible" >
    <el-form :model="sendbackIncomeForm" :rules="errorRules" ref="sendbackIncomeForm" :close-on-click-modal="true">
      <el-form-item label="收款异常" prop="exceptionMsg">
        <el-input type="textarea" v-model="sendbackIncomeForm.exceptionMsg" placeholder="请描述异常问题（限120字）" ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.native="submitDialogForm">确 定</el-button>
    </span>
  </el-dialog>
  <!-- 若销账类型不一致 -->
  <el-dialog title="提示" v-model="cannotxiaozhang" :close-on-click-modal="true">
    <span style='padding: 20px 0; font-size: 20px'> 请选择相同销账类型的订单</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="cannotxiaozhang = false">取 消</el-button>
      <el-button type="primary" @click.native="cannotxiaozhang = false">确 定</el-button>
    </span>
  </el-dialog>
  <!-- 收款销账弹窗提示 -->
  <el-dialog title="提示" v-model="xiaozhangDialog.show" :close-on-click-modal="true">
    <span style='padding: 20px 0; font-size: 20px'> 确认与销账人员进行销账 ?</span>
    <div style='text-align: left; padding-left: 20px; padding-top: 20px;'>
      <span>销账金额:  <span style='margin-left: 15px'>{{xiaozhangDialog.row.xiaozhangMoney > 0 ? '+' : ''}}{{Number(xiaozhangDialog.row.xiaozhangMoney || 0).toFixed(2)}}</span></span> <br/><br/><br/>
      <template v-if='xiaozhangDialog.row.xiaozhangMoney >= 0'>
        <span style='color: red'>*</span>实收销账金额: <span class='real-money' style='margin-left: 15px'><el-input type="text" v-model='xiaozhangDialog.form.shishouTkMoney' placeholder="请输入正值"></el-input></span>
      </template>
      <template v-else>
        <el-radio class="radio" v-model="xiaozhangDialog.form.fukuanType" label="1">现金销账</el-radio>
        <el-radio class="radio" v-model="xiaozhangDialog.form.fukuanType" label="2">线上转账</el-radio><br/><br/><br/>
        <div class="upload-img">
        上传销账凭据：
          <div class="report-block">
            <a :href="item" :key='item' v-lightbox="xiaozhangimgUrls" v-for="item in xiaozhangimgUrls" class="report-block-imgs pull-left">
              <img :src="item" width='40' height="40" />
              <span @click="delImg(item)" class="del-arrow">X</span>
            </a>
            <el-upload
              action="/redwood/sys/Common/uploadFile.do?type=4"
              :multiple="true"
              :show-upload-list="false"
              :on-preview="handlePreview"
              :before-upload="beforeUpload"
              :on-success="onLoadSuccess"
              :on-error="onLoadError"
              clas='pull-left'
            >
            <i class="el-icon-upload2"></i>
            </el-upload>
          </div>
        </div>
      </template>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="xiaozhangDialog.show = false">取 消</el-button>
      <el-button type="primary" @click.native="xiaoZhangSave" :disabled='!(xiaozhangDialog.form.shishouTkMoney >= 0 || xiaozhangDialog.row.xiaozhangMoney < 0)'>确 定</el-button>
    </span>
  </el-dialog>
  <!-- 同意退款弹窗提示 -->
  <el-dialog title="提示" v-model="refundHandleDialog.show" :close-on-click-modal="true">
    <span style='padding: 10px 0; font-size: 16px'> 同意退款给采购商 ?</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="refundHandleDialog.show= false">取 消</el-button>
      <el-button type="primary" @click.native="refundhandleSave">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<style lang="scss" scoped>
  .real-money{
    display: inline-block;
    width: 200px
  }
  .upload-img{
    display: block;
    .report-block{
      display: inline-block;
    }
  }
</style>
<script>
import HeadFilter from 'components/headFilter/HeadFilter.vue'
import pagination from 'components/pagination'
import Lightbox from 'components/lightbox/lightbox'
import lrz from 'lrz'
import {
  request,
  formatTimeString,
  getCache,
  setCache
} from 'src/common/utils.js'
import _ from 'lodash'
import AccountApi from 'api/account.js'
import { Message } from 'element-ui'
export default {
  components: {
    HeadFilter,
    Lightbox,
    pagination
  },
  data() {
    const filters = getCache({
      key: 'unGetAndPayFilters',
    }) || {
      pageNumber: 1,
      pageSize: 20
    };
    const validaeExceptionMsg = (rule, value, callback) => {
      if (value && value.length > 120) {
        callback(new Error('异常描述不能超过120字!'));
      } else {
        callback();
      }
    }
    return {
      time: new Date().getTime(),
      height: '600',
      fullscreenLoading: true,
      filters: filters,
      listData: {
        total: 0,
        page: {
          result: []
        }
      },
      result: [],
      replaceOrReturnTypeList: ['售前退货', '售前换货', '售后退货', '售后换货', '运费', '剪版'],
      handleGetDialog: {
        show: false,
        row: {}
      },
      sellerCertificateList: [], // 供应商退款凭据
      dialogFormVisible: false, // 异常
      sendbackIncomeForm: {}, // 异常弹出框表单内容
      errorRules: {
        exceptionMsg: [
          { validator: validaeExceptionMsg, trigger: 'change' }
        ]
      },
      multipleSelection: [],
      xiaozhangDialog: {
        show: false,
        row: {
          ids: []
        },
        form: {
          shishouTkMoney: '',
          fukuanType: '1'
        }
      }, // 销账弹窗
      cannotxiaozhang: false,
      refundHandleDialog: {
        show: false,
        row: {
          idList: []
        }
      }, // 确认退款弹窗
      xiaozhangimgUrls: []
    }
  },
  created() {
    this.currentTab = getCache({
      key: 'unGetAndPayTabType'
    }) || 1
  },
  mounted () {
    this.height = String(document.documentElement.clientHeight - 950);
    this.$nextTick(function () {
      const tabs = document.getElementsByClassName('el-tabs__item')
      tabs[0].click()
    })
  },
  watch: {
    filters: function (newValue, oldVal) {
      newValue.currentTab = this.currentTab
      this.getList()
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.currentTab == 2) {
        this.xiaozhangDialog.row.ids = []
        this.xiaozhangDialog.row.type = []
        let returnReplaceType = []
        this.xiaozhangDialog.row.xiaozhangMoney = []
        for (let i = 0; i < val.length; i++) {
          this.xiaozhangDialog.row.xiaozhangMoney = Number(this.xiaozhangDialog.row.xiaozhangMoney) + Number(val[i].xiaozhangMoney)
          this.xiaozhangDialog.row.ids.push(val[i].id)
          returnReplaceType.push(val[i].returnReplaceType)
          delete this.xiaozhangDialog.row.id
        }
        var items = new Set(returnReplaceType)
        for (let item of items.values()) {
          this.xiaozhangDialog.row.type.push(item)
        }
      } else if (this.currentTab == 3) {
        this.refundHandleDialog.row.idList = []
        for (let i = 0; i < val.length; i++) {
          this.refundHandleDialog.row.idList.push(val[i].id)
        }
      }
    },
    getList() {
      this.fullscreenLoading = true
      const url = [AccountApi.OnlineReceiveSeller.list, AccountApi.ChargeOffRecords.waitHandleList, AccountApi.BuyerRefund.list]
      const that = this
      if (this.filters && !this.filters.pageNumber) {
        this.filters.pageNumber = 1
      }
      if (this.filters && !this.filters.pageSize) {
        this.filters.pageSize = 20
      }
      this.filters._time = this.time;
      const param = _.cloneDeep(that.filters)
      const currentUrl = url[this.currentTab - 1]
      console.log('param', param)
      if (param.shopName) {
        param.sellerCompany = param.shopName
        delete param.shopName
      }
      request({
        url: currentUrl,
        method: 'post',
        data: {
          param: JSON.stringify(param)
        }
      }).then(data => {
        that.fullscreenLoading = false
        if (Number(data.success) === 1) {
          that.listData.page = data.page;
          that.listData.total = data.total;
          // data.page.result.forEach((item, index) => {
          //   if (index == 0) {
          //     item.sellerCertificateList = ['/upload/redwood/soouyaCertificate/1ea4345d-5f6a-4142-b6c2-eee1c42369a7.jpg']
          //   }
          //   if (index == 1) {
          //     item.sellerCertificateList = ['/upload/flower/e2060cad-a94b-47f9-a9c0-daa3eedbab57.jpg', '/upload/flower/8a2d9bbd-99f8-4d36-8b1f-814420c500b5.jpg']
          //   }
          //   if (index == 2) {
          //     item.sellerCertificateList = ['/upload/flower/99e90ec9-f376-4474-9c65-316002c707da.jpg', '/upload/flower/3191f572-6b75-4f21-84eb-3f3c17331073.jpg']
          //   }
          // }) 测试代码
          that.result = data.page.result
          setCache({
            key: 'unGetAndPayFilters',
            value: that.filters,
          });
        } else {
          Message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    jumpToDebtDetail(id, returnReplaceType) {
      if (returnReplaceType == 5) { // 运费
        this.$router.push(`/exchange/unGetAndPay/yfDetail?id=${id}`)
      } else if (returnReplaceType == 6) { // 剪版
        this.$router.push(`/exchange/unGetAndPay/jbDetail?id=${id}`)
      } else {
        this.$router.push(`/exchange/unGetAndPay/detail?id=${id}`)
      }
    },
    switchTab(tabObj) {
      this.fullscreenLoading = false
      this.currentTab = (Number(tabObj.index) + 1)
      this.filters = {
        pageNumber: 1,
        currentTab: this.currentTab,
        pageSize: 20
      }
      setCache({
        key: 'unGetAndPayTabType',
        value: this.currentTab
      })
    },
    getFilter(params) {
      this.filters = params
      this.filters.pageNumber = 1
    },
    handleGet(row) {
      // 确认收款 弹窗
      this.handleGetDialog.show = true
      this.handleGetDialog.row = _.cloneDeep(row)
      this.handleGetDialog._time = new Date().getTime()
      this.sellerCertificateList = row.sellerCertificateList
    },
    handleGetSave() {
      const that = this
       this.fullscreenLoading = true
       request({
        url: AccountApi.OnlineReceiveSeller.confirmIncome,
        method: 'post',
        data: {
          param: JSON.stringify({
            id: that.handleGetDialog.row.id,
            _time: that.handleGetDialog._time
          })
        }
      }).then(data => {
        that.fullscreenLoading = false
        if (data.success === '1') {
          setCache({
            key: 'hasGetAndPayTabType',
            value: 1
          })
          this.$router.push(`/exchange/hasGetAndPay`)
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
      // 确认收款
    },
    showDialogForm(id) { // 设置异常弹出框
      this.dialogFormVisible = true;
      this.sendbackIncomeForm.id = id;
      this.multipleSelection = null
      this.sendbackIncomeForm._time = new Date().getTime();
    },
    /**
     * 提交对账异常
     */
    submitDialogForm() {
      this.$refs.sendbackIncomeForm.validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          request({
            url: AccountApi.OnlineReceiveSeller.sendbackIncome,
            method: 'post',
            data: {
              param: JSON.stringify(this.sendbackIncomeForm)
            }
          }).then(data => {
            // console.log('data', data);
            this.fullscreenLoading = false;
            this.dialogFormVisible = false;
            if (data.success === '1') {
              this.listData.page.result = this.listData.page.result.filter((obj, i) => {
                return obj.id !== this.sendbackIncomeForm.id
              });
              this.$message({
                type: 'success',
                message: '提交异常成功'
              })
            } else {
              this.$message({
                type: 'success',
                message: '提交异常失败'
              })
            }
          })
        } else {
          return false;
        }
      });
    },
    xiaoZhangShow(row) {
      this.xiaozhangDialog.show = true
      this.xiaozhangDialog.row = _.cloneDeep(row)
      this.xiaozhangDialog.row.ids = []
      if (this.xiaozhangDialog.row.xiaozhangMoney >= 0) {
        this.xiaozhangDialog.form.shishouTkMoney = this.xiaozhangDialog.row.xiaozhangMoney
      }
      this.xiaozhangDialog._time = new Date().getTime()
    },
    xiaoZhangSave() {
      const that = this
      const xiaozhangDialog = that.xiaozhangDialog
      const params = {
        xiaozhangMoney: xiaozhangDialog.row.xiaozhangMoney,
        shifuXzMoney: xiaozhangDialog.row.shifuXzMoney,
        _time: xiaozhangDialog._time
      }
      if (xiaozhangDialog.row.id) {
        params.id = xiaozhangDialog.row.id
      } else {
        params.ids = xiaozhangDialog.row.ids
      }
      if (xiaozhangDialog.row.xiaozhangMoney >= 0) {
        params.shishouTkMoney = xiaozhangDialog.form.shishouTkMoney
      } else {
        params.fukuanType = xiaozhangDialog.form.fukuanType
      }
      that.fullscreenLoading = true
      request({
        url: params.id ? AccountApi.ChargeOffRecords.xiaozhang : AccountApi.ChargeOffRecords.batchXiaozhang,
        method: 'post',
        data: {
          param: JSON.stringify(params)
        }
      }).then(data => {
        that.fullscreenLoading = false;
        if (data.success === '1') {
          that.xiaozhangDialog.show = false;
          that.$message({
            type: 'success',
            message: data.msg,
            duration: 500,
            onClose() {
                that.getList()
            }
          })
          // setCache({
          //   key: 'unGetAndPayTabType',
          //   value: 2
          // })
          // setTimeout(() => {
          //   this.$router.push(`/exchange/unGetAndPay`)
          // }, 500);
        } else {
          that.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    refundHandle(row) {
      this.refundHandleDialog.row.idList = [row.id]
      this.refundHandleDialog.show = true
      this.refundHandleDialog._time = new Date().getTime()
    },
    refundhandleSave() {
      let that = this
      that.fullscreenLoading = true;
       request({
        url: AccountApi.BuyerRefund.confirmIncome,
        method: 'post',
        data: {
          param: JSON.stringify({
            idList: that.refundHandleDialog.row.idList,
            _time: that.refundHandleDialog._time
          })
        }
      }).then(data => {
        that.fullscreenLoading = false;
        if (data.success === '1') {
          setCache({
            key: 'hasGetAndPayTabType',
            value: 3
          })
          this.$router.push(`/exchange/hasGetAndPay`)
        } else {
          that.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    batchXiaoZhangHandle() {
      console.log(this.xiaozhangDialog.row.type.length)
      if (this.xiaozhangDialog.row.type.length > 1) {
        this.cannotxiaozhang = true
      } else {
        this.xiaozhangDialog.show = true
      }
    },
    batchReturnd() {
      this.refundHandleDialog.show = true
    },
    formatTime(time) { // 格式化时间
      return formatTimeString(time)
    },
    delImg (url) {
      this.xiaozhangimgUrls = this.xiaozhangimgUrls.filter((item, key) => item != url)
    },
    onLoadSuccess(file, fileList) {
      const url = this.imgHost + file.imgUrl
      this.confirmDialog.detail.imgUrls.push(url)
    },
    beforeUpload (file) {
      const that = this
      that.dialogLoading = true
      let quality = 1
      if (file.size <= 204800) {
        quality = 1
      } else if (file.size <= 512000) {
        quality = 0.6
      } else {
        quality = 0.4
      }
      lrz(file, {
        quality,
        width: 1280,
        height: 1280
      })
      .then(function (rst) {
        // 处理成功会执行
        rst.formData.append('field', 'imgUrl')
        request({
          url: '/redwood/sys/Common/uploadFile.do?type=4',
          method: 'post',
          data: rst.formData,
          dataType: 'FormData'
        }).then(data => {
          that.dialogLoading = false;
          if (data.success === '1') {
            that.onLoadSuccess(data)
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
    onLoadError (file) {
      return true
    },
    handleRemove(file, fileList) { // 移除图片
      console.log(file, fileList);
    },
    handlePreview(file) { // 预览图片
      console.log(file);
    },
  }
}
</script>
