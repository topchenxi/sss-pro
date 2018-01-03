<template>
  <section>
    <el-form :inline="true">
      <el-row style="margin-bottom:20px">
        <el-col :span="18">
          <el-form-item>
            <el-select v-model="requestData.status" placeholder="全部订单状态" style="width: 140px" @change="requestListAllOrder">
              <el-option label="全部订单状态" value=""></el-option>
              <el-option label="等待通知询价" value="300"></el-option>
              <el-option label="等待录入大货信息" value="305"></el-option>
              <el-option label="等待销售入仓" value="310"></el-option>
              <el-option label="履约中" value="388"></el-option>
              <el-option label="等待采购商支付订金" value="312"></el-option>
              <el-option label="等待采购商付款" value="316"></el-option>
              <el-option label="等待收付订金" value="326"></el-option>
              <el-option label="等待收付款" value="328"></el-option>
              <el-option label="等待录入尾款信息" value="335"></el-option>
              <el-option label="等待采购商支付尾款" value="339"></el-option>
              <el-option label="等待收付尾款" value="346"></el-option>
              <el-option label="等待指派提货" value="347"></el-option>
              <el-option label="等待确认提货时间" value="351"></el-option>
              <el-option label="等待确认供应商送货时间" value="352"></el-option>
              <el-option label="供应商退款申请中" value="366"></el-option>
              <el-option label="财务处理退款中" value="368"></el-option>
              <el-option label="已完成" value="10"></el-option>
              <el-option label="已取消" value="100"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="requestData.createTimeBegin" type="datetime" size="small" placeholder="开始时间" @change="requestListAllOrder"></el-date-picker>
            至
            <el-date-picker v-model="requestData.createTimeEnd" type="datetime" size="small" placeholder="结束时间" @change="requestListAllOrder"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="buyerIsFirstBulkBox" @change="requestListAllOrder">新客户</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="buyerLargeBox" @change="requestListAllOrder">大客户</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="requestData.keyword" name="keyword" placeholder="订单号/采购商/供应商"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="requestListAllOrder">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click.native="exportExcel">导出excel</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="result" :resizable="false" :height="height">
      <el-table-column label="订单号" prop="serviceNumber" align="left" width="200">
      </el-table-column>
      <el-table-column label="订单发布时间" align="left" width="200">
        <template scope="scope">
          <div>{{scope.row.createTime | formatData}}</div>
        </template>
      </el-table-column>
      <el-table-column label="订单总金额" align="right">
        <template scope="scope">
          ￥{{scope.row.saleMoney !== null ? scope.row.saleMoney : '--'}}
        </template>
      </el-table-column>
      <el-table-column label="采购商" prop="buyerCompany" align="left">
      </el-table-column>
      <el-table-column label="供应商" prop="shopCompany" align="left">
      </el-table-column>
      <el-table-column label="品类" align="left">
        <template scope="scope">
          <template v-if="scope.row.productType === 0">花型</template>
          <template v-else-if="scope.row.productType === 1">面料</template>
          <template v-else-if="scope.row.productType === 2">辅料</template>
          <template v-else-if="scope.row.productType === 3">底布</template>
          <template v-else="scope.row.productType === 4">花布</template>
        </template>
      </el-table-column>
      <el-table-column label="是否验货" align="left">
        <template scope="scope">
          {{scope.row.checkCloth == '1' ? '验货' : '不验货'}}
        </template>
      </el-table-column>
      <el-table-column label="配送方式" align="left">
        <template scope="scope">
          {{scope.row.sendType === 0 ? 'soouya配送' : '采购商自提'}}
        </template>
      </el-table-column>
      <el-table-column label="采购数量" align="right">
        <template scope="scope">
          {{scope.row.quantity + scope.row.quantityUnit}}/{{scope.row.colorCount || 0}}色
        </template>
      </el-table-column>
      <el-table-column label="当前状态" prop="statusDesc" align="left">
      </el-table-column>
      <el-table-column label="新客户" min-width="80">
        <template scope="scope">
          {{scope.row.buyerIsFirstBulk == 1?'√':''}}
        </template>
      </el-table-column>
      <el-table-column label="大客户" min-width="80">
        <template scope="scope">
          {{scope.row.buyerLarge == 1?'√':''}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="left" width="200">
        <template scope="scope">
          <div class="sy-operation" v-if="user.woodPurchaser">
            <router-link :to="{name: 'orderDetail', query: { id: scope.row.reposityNumber, pathIndex: 2, orderNumber: scope.row.orderNumber}}">
              <el-button class="o-btn" size="mini" type="primary">详情</el-button>
            </router-link>
            <el-button v-if="scope.row.status == 305" class="o-btn" size="mini" type="primary" @click.native="returnOrder(scope.row)">退回此单</el-button>
            <a v-if="scope.row.status == 305" :href="scope.row.webUrl" target="_blank">
              <el-button class="o-btn" size="mini" type="primary">录入大货</el-button>
            </a>
            <a :href="scope.row.deliveryUrl" v-if="scope.row.status == 347">
              <el-button class="o-btn" size="mini" type="primary">指派提货</el-button>
            </a>
            <a :href="scope.row.wkUrl" v-if="scope.row.status == 335">
              <el-button class="o-btn" size="mini" type="primary">录入尾款</el-button>
            </a>
            <router-link v-if="scope.row.opertionType == 1" :to="{name: 'applyOrder', query: {id: scope.row.orderNumber, type: 1} }">
              <el-button class="o-btn" size="mini" type="primary">申请退换货</el-button>
            </router-link>
            <router-link v-if="scope.row.opertionType == 1" :to="{name: 'orderDetail', query: { id: scope.row.reposityNumber, pathIndex: 2, orderNumber: scope.row.orderNumber}}">
              <el-button class="o-btn" size="mini" type="primary">查看验布报告</el-button>
            </router-link>
            <a :href="scope.row.editWK" v-if="scope.row.status == 338">
              <el-button class="o-btn" size="mini" type="primary">修改尾款信息</el-button>
            </a>
            <a :href="scope.row.editWK" v-if="scope.row.status == 311">
              <el-button class="o-btn" size="mini" type="primary">修改大货信息</el-button>
            </a>
          </div>
          <div class="sy-operation" v-if="user.woodFollowLeader">
            <router-link :to="{name: 'orderDetail', query: { id: scope.row.reposityNumber, pathIndex: 2, orderNumber: scope.row.orderNumber}}">
              <el-button class="o-btn" size="mini" type="primary">详情</el-button>
            </router-link>
            <a v-if="scope.row.status == 300" :href="scope.row.editUrl" target="_blank">
              <el-button type="primary" size="mini" class="o-btn">编辑</el-button>
            </a>
            <el-button v-if="[335, 338, 339, 351, 352, 310].indexOf(scope.row.status) > -1" type="primary" size="mini" @click="showRefund(scope.row)">申请退款</el-button>
            <el-button v-if="[300, 305, 311, 312, 315, 316].indexOf(scope.row.status) > -1" type="primary" size="mini" @click="showCancelDialog(scope.row)">取消订单</el-button>
            <!-- <el-tooltip v-if="scope.row.status == 366 || scope.row.status == 368" class="item" effect="dark" :content="scope.row.reason === null ? '加载中' : scope.row.reason" placement="top">
              <el-button type="primary" size="mini" @mouseenter.native="tkyy(scope.row)" class="o-btn">退款原因</el-button>
            </el-tooltip> -->
            <el-button type="primary" size="mini" @click="askPrice(scope.row)" v-if="scope.row.status == 300" style="margin-left:0;">通知询价</el-button>
            <el-button type="primary" size="mini" @click="backToCaiGou(scope.row)" v-if="[312, 316, 339].indexOf(scope.row.status) > -1">打回采购</el-button>
            <el-tooltip v-if="scope.row.status === 100" class="item" effect="dark" :content="scope.row.cancelReason" placement="top">
              <span style="color:#20A0FF; cursor:pointer">取消原因</span>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <footer class="pagation">
      <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="requestListAllOrder" :options="requestData" />
    </footer>
    <el-dialog v-model="cancelDialogConfig.isShow" title="取消订单" size="tiny">
      <el-form label-width="120px" :model="cancelForm" ref="cancelForm" :rules="cancelFormRule" v-if="cancelDialogConfig.data">
        <el-form-item label="订单号">
          {{cancelDialogConfig.data.serviceNumber}}
        </el-form-item>
        <el-form-item label="采购商">
          {{cancelDialogConfig.data.buyerCompany}}
        </el-form-item>
        <el-form-item label="供应商">
          {{cancelDialogConfig.data.shopCompany}}
        </el-form-item>
        <el-form-item label="采购数量">
          {{cancelDialogConfig.data.quantity}}{{cancelDialogConfig.data.quantityUnit}}
        </el-form-item>
        <el-form-item label="订单总金额">
          &yen;{{cancelDialogConfig.data.saleMoney}}
        </el-form-item>
        <el-form-item label="当前状态">
          {{cancelDialogConfig.data.statusDesc}}
        </el-form-item>
        <el-form-item label="取消原因" prop="content">
          <el-input v-model="cancelForm.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmCancel('cancelForm')">确认取消</el-button>
        <el-button @click="cancelDialogConfig.isShow = false">暂不取消</el-button>
      </div>
    </el-dialog>
    <el-dialog v-model="refundDialogConfig.isShow" title="申请退款" size="tiny">
      <el-form label-width="120px" ref="refundForm" :model="refundForm" :rules="refundFormRule" v-if="refundDialogConfig.data">
        <el-form-item label="订单号">
          {{refundDialogConfig.data.serviceNumber}}
        </el-form-item>
        <el-form-item label="采购商">
          {{refundDialogConfig.data.buyerCompany}}
        </el-form-item>
        <el-form-item label="供应商">
          {{refundDialogConfig.data.shopCompany}}
        </el-form-item>
        <el-form-item label="采购数量">
          {{refundDialogConfig.data.quantity}}{{refundDialogConfig.data.quantityUnit}}
        </el-form-item>
        <el-form-item label="订单总金额">
          &yen;{{refundDialogConfig.data.saleMoney}}
        </el-form-item>
        <hr>
        <template v-if="refundDialogConfig.data.productSource == 1">
          <el-form-item label="货源">
            订货
          </el-form-item>
          <el-form-item label="供应商退订金">
            <strong style="color:#f00">&yen;{{refundDialogConfig.data.earnestMoney}}</strong>
          </el-form-item>
          <el-form-item label="供应商退尾款" v-if="[339, 346, 338, 335].indexOf(refundDialogConfig.data.status) === -1">
            <strong style="color:#f00">&yen;{{refundDialogConfig.data.finalMoney}}</strong>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="货源">
            现货
          </el-form-item>
          <el-form-item label="供应商退款金额">
            <strong style="color:#f00">&yen;{{refundDialogConfig.data.buyMoney}}(全款)</strong>
          </el-form-item>
        </template>
        <el-form-item label="退款原因" prop="reason">
          <el-input v-model="refundForm.reason"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmRefund('refundForm')">确认退款</el-button>
        <el-button @click="refundDialogConfig.isShow = false">暂不退款</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import Pagination from 'components/pagination'
import Api from 'api/allApi'
import {
  // request,
  formatTimeString
} from 'utils/tool'
import { request } from 'utils/request'
export default {
  components: {
    Pagination
  },
  data() {
    let routeQuery = this.$route.query
    const validateStr = (rule, value, callback) => {
      if (value.length > 500 || value.length < 5) {
        callback(new Error('请输入5-500字数内取消原因'));
      } else {
        callback();
      }
    };
    return {
      buyerLargeBox: false,
      buyerIsFirstBulkBox: false,
      orderStautsArr: [{
          label: '全部订单状态',
          value: ''
        },
        {
          label: '等待通知询价',
          value: '300'
        },
        {
          label: '等待录入大货信息',
          value: '305'
        }
      ],
      requestData: {
        pageSize: 20,
        pageNumber: 1,
        createTimeBegin: '',
        createTimeEnd: '',
        export: '',
        keyword: routeQuery.keyword,
        status: '',
      },
      result: [],
      pagation: {
        pageNumber: 1,
        pageSize: 20,
        totalCount: 1,
      },
      user: JSON.parse(sessionStorage.getItem('currentUser')).loginInfo,
      // 这一块是通知出仓单全选
      checkboxData: [],
      clothLoneIdList: [],
      checked: false,
      _time: 0,
      height: 600,
      isTestEvn: location.hostname.indexOf('hspc') > -1 || location.hostname.indexOf('text') > -1,
      cancelDialogConfig: {
        isShow: false,
        data: null
      },
      cancelForm: {
        orderNumber: '',
        content: '',
        type: 1
      },
      cancelFormRule: {
        content: [
          { validator: validateStr, trigger: 'blur', required: true }
        ]
      },
      refundDialogConfig: {
        isShow: false,
        data: null,
      },
      refundForm: {
        orderNumber: '',
        reason: '',
      },
      refundFormRule: {
        reason: [
          { validator: validateStr, trigger: 'blur', required: true }
        ]
      },
      asking: false
    }
  },
  filters: {
    formatData(val) {
      return Number(val) != 0 ? formatTimeString(val) : '--'
    }
  },
  mounted() {
    window.addEventListener('resize', this.countHeight)
    this.countHeight()
    this.requestListAllOrder()
  },
  methods: {
    preRequestData() {
      this.requestData.keyword = this.requestData.keyword == undefined ? '' : this.requestData.keyword
      // for reportBulk
      this.requestData.key = this.requestData.keyword
      this.requestData.followerId = this.user.user.id

      this.requestData.buyerLarge = this.buyerLargeBox ? 1 : ''
      this.requestData.buyerIsFirstBulk = this.buyerIsFirstBulkBox ? 1 : ''
      this.requestData.createTimeBegin = this.requestData.createTimeBegin ? new Date(this.requestData.createTimeBegin).getTime() : ''
      this.requestData.createTimeEnd = this.requestData.createTimeEnd ? new Date(this.requestData.createTimeEnd).getTime() : ''
      if (this.requestData.createTimeBegin && this.requestData.createTimeEnd && this.requestData.createTimeBegin > this.requestData.createTimeEnd) {
        this.$message({
          message: '订单开始时间不能大于结束时间',
          type: 'error',
          duration: 1000
        })
        return
      }
    },
    exportExcel() {
      this.preRequestData()
      this.requestData.export = 1
      this.requestData._function = 'all'
      this.$store.dispatch('changeload', true)
      request('/redwood/bulk', {
        method: 'GET',
        data: this.requestData
      }).then(res => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          if (res.obj) {
            window.open(res.obj)
            this.requestData.export = 0
          } else {
            this.$message({
              type: 'error',
              message: res.msg,
              duration: 1000
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    requestListAllOrder() {
      this.preRequestData()
      request('/redwood/buyfollow/Order/listAllOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: this.requestData
      }).then(res => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          if (res.page) {
            convertData.call(this, res.page)
          } else {
            this.result = []
            this.num1 = ''
            this.num2 = ''
            this.num3 = ''
            const currentNumber = 'num' + this.tabIndex
            this[currentNumber] = '0'
          }
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }

        function convertData(page) {
          this.pagation.pageNumber = page.pageNumber
          this.pagation.pageSize = page.pageSize
          this.pagation.totalCount = page.totalCount
          this.requestData.pageSize = page.pageSize
          this.requestData.pageNumber = page.pageNumber
          page.result && page.result.forEach((val) => {
            const host = location.host
            let webUrl = ''
            if (host == 'hspc.soouya.com') {
              webUrl = 'http://localtestmhongshan.soouya.com'
            } else if (host.indexOf('test') != -1) {
              webUrl = 'http://testmhongshan.soouya.com'
            } else {
              webUrl = 'http://mhongshan.soouya.com'
            }
            val.webUrl = `${webUrl}/inputInfo.html?orderNumber=${val.orderNumber}&isEditOrNot=0&pcInputDh=1`
            val.noticePage = `${webUrl}/orderDetail.html?orderNumber=${val.orderNumber}&tabKey=tzxj&category=all-all&payDebtId=`
            val.deliveryUrl = `${webUrl}/orderList.html?Tabkey=zprw&category=all-all`
            val.wkUrl = `${webUrl}/orderList.html?Tabkey=dhwk&category=all-all`
            val.editUrl = `${webUrl}/orderDetail.html?orderNumber=${val.orderNumber}&tabKey=tzxj&category=all-all&payDebtId='`
            val.editWK = `${webUrl}/orderList.html?Tabkey=tzfk&category=all-all`
            val.reason = null
          })
          this.result = page.result
        }
      })
    },
    search() {
      Object.assign(this.filters, {
        pageNumber: 1
      })
      this.reqList()
    },
    returnOrder(row) {
      const self = this
      console.log(this.$confirm)
      this.$confirm('确认要将此订单打回？', '打回跟单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose(action, instance, done) {
          if (action === 'confirm') {
            self.confirmOrder(row, done)
          } else {
            done()
          }
        }
      }).then(() => {}).catch(() => {})
    },
    confirmOrder(row, done) {
      this.$store.dispatch('changeload', true)
      request(Api.OrderProcess.rejectToFollower, {
        method: 'POST',
        data: {
          param: JSON.stringify({
            orderNumber: row.orderNumber,
            _time: +new Date()
          })
        }
      }).then(res => {
        this.$store.dispatch('changeload', false)
        const self = this
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              done()
              self.requestListAllOrder()
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
    countHeight() {
      this.height = String(document.documentElement.clientHeight - 240)
    },
    showCancelDialog(data) {
      Object.assign(this.cancelDialogConfig, {
        data,
        isShow: true
      })
      Object.assign(this.cancelForm, {
        orderNumber: data.orderNumber
      })
    },
    confirmCancel(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request('/redwood/buyfollow/Order/cancel', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            data: this.cancelForm
          }).then((response) => {
            if (response.success === '1') {
              this.requestListAllOrder()
              Object.assign(this.cancelDialogConfig, {
                data: null,
                isShow: false
              })
            } else {
              this.$message({
                type: response.success == 1 ? 'success' : 'error',
                message: response.msg,
                duration: 1000
              })
            }
          })
        }
      })
    },
    showRefund(data) {
      request('/redwood/buyfollow/Order/getDhDetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: { orderNumber: data.orderNumber }
      }).then((response) => {
        if (response.success == '1') {
          Object.assign(this.refundDialogConfig, {
            isShow: true,
            data: Object.assign(data, {
              productSource: response.obj.productSource,
              earnestMoney: response.obj.earnestMoney,
              finalMoney: response.obj.finalMoney,
              costMoney: response.obj.costMoney,
              buyMoney: response.obj.buyMoney,
            })
          })
          Object.assign(this.refundForm, {
            orderNumber: data.orderNumber
          })
        } else {
          this.$message({
            type: response.success == 1 ? 'success' : 'error',
            message: response.msg,
            duration: 1000
          })
        }
      })
    },
    confirmRefund(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request('/redwood/returnReplaceOnlyRefund/apply', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            data: this.refundForm
          }).then((response) => {
            if (response.success == '1') {
              this.requestListAllOrder()
              Object.assign(this.refundDialogConfig, {
                data: null,
                isShow: false
              })
            } else {
              this.$message({
                type: response.success == 1 ? 'success' : 'error',
                message: response.msg,
                duration: 1000
              })
            }
          })
        }
      })
    },
    tkyy(data) {
      if (data.reason === null) {
        request('/redwood/buyfollow/Refund/getDetail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { orderNumber: data.orderNumber }
        }).then((response) => {
          if (response.success == '1') {
            data.reason = response.obj.reason
          } else {
            this.$message({
              type: response.success == 1 ? 'success' : 'error',
              message: response.msg,
              duration: 1000
            })
          }
        })
      }
    },
    askPrice(data) {
      const self = this
      this.$msgbox({
        title: '通知询价',
        message: '是否通知买货员询价？',
        showCancelButton: true,
        confirmButtonText: '立即通知',
        cancelButtonText: '稍后通知',
        beforeClose(action, instance, done) {
          if (self.asking) {
            return false
          }
          if (action == 'confirm') {
            self.postAskPrice(data, 0, instance, done)
          } else {
            self.postAskPrice(data, 1, instance, done)
          }
        }
      }).then(action => {})
    },
    postAskPrice(data, isAtOnce, instance, done) {
      const self = this
      this.asking = true
      request('/redwood/buyfollow/OrderProcess/notifyAskPrice.do', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          orderNumber: data.orderNumber,
          isAtOnce: isAtOnce,
          _time: new Date().getTime()
        }
      }).then(response => {
        self.asking = false
        this.$message({
          type: response.success == 1 ? 'success' : 'error',
          message: response.msg,
          duration: 1000
        })
        if (response.success == 1) {
          self.requestListAllOrder()
        }
      })
      done && done()
    },
    backToCaiGou(data) {
      const self = this
      this.$msgbox({
        title: '打回采购',
        message: '是否确认打入采购？',
        showCancelButton: true,
        confirmButtonText: '确认打回',
        cancelButtonText: '取消',
        beforeClose(action, instance, done) {
          if (action == 'confirm') {
            instance.confirmButtonText = '执行中...'
            instance.confirmButtonLoading = true
            request('/redwood/buyfollow/Order/sendbackToPurchaser', {
              headers: {
                'Content-Type': 'application/json'
              },
              data: {
                param: JSON.stringify({
                  orderNumber: data.orderNumber,
                  _time: new Date().getTime()
                })
              }
            }).then(response => {
              instance.confirmButtonText = '确定'
              instance.confirmButtonLoading = false
              this.$message({
                type: response.success == 1 ? 'success' : 'error',
                message: response.msg,
                duration: 1000
              })
              if (response.success == 1) {
                self.requestListAllOrder()
              }
            })
            done && done()
          } else {
            done()
          }
        }
      }).then(action => {})
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.countHeight)
  }
}

</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
}

</style>
<style lang="scss">
.pagation {
  margin-top: 15px;
}

.sy-operation {
  >* {
    margin: 5px 0;
  }
  .el-button+.el-button {
    margin-left: 0;
  }
}

</style>
