<template>
  <div class="pending-account" v-loading.body="fullscreenLoading">
    <!-- <h1 class="title" style="font-size: 25px; padding: 15px">分账列表</h1> -->
    <HeadFilter v-on:getParams="getFilter" :param="filters"></HeadFilter>
    <el-button style='position:absolute;right:50px;z-index:1000;margin-top: 10px;' type="primary" size="small" @click.native="handlePrint" :disabled="!orderNumberList.length">批量打印</el-button>
    <Tabs></Tabs>
    <p style='margin: 15px 0'>
      <span style='margin-left: 15px;'>待分账总金额：
        <span class='red'>{{Number(pendingAccountListData.total).toFixed(2)||0.00}}</span> 元</span>
    </p>
    <div class="">
      <el-table class="fixed-table" :data="pendingAccountListData.result" border :height="height" @selection-change="handleMultipleSelectionChange">
        <el-table-column type="selection" min-width="50" fixed="left"></el-table-column>
        <el-table-column property="confirmPayTime" label="进入待分账日期" min-width="170" :formatter="formatTime"></el-table-column>
        <el-table-column property="serviceNumber" label="订单号" min-width="200"></el-table-column>
        <el-table-column label="定金/元" min-width="100">
          <template scope="scope">
            <template v-if="scope.row.fundType == 3 || scope.row.fundType == 2">
              {{parseFloat(scope.row.earnestMoney).toFixed(2)}}
            </template>
            <template v-else>--</template>
          </template>
        </el-table-column>
        <el-table-column label="尾款/元" min-width="100">
          <template scope="scope">
            <template v-if="scope.row.fundType == 3">
              {{parseFloat(scope.row.finalMoneySoouyaToSeller).toFixed(2)}}</template>
            <template v-else>--</template>
          </template>
        </el-table-column>
        <el-table-column label="全款/元" min-width="100">
          <template scope="scope">
            <template v-if="scope.row.fundType == 5">{{parseFloat(scope.row.costMoney).toFixed(2)}}</template>
            <template v-else>--</template>
          </template>
        </el-table-column>
        <el-table-column inline-template label="采购货款/元" min-width="120">
          <span>{{Number(row.buyMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="成本货款/元" min-width="120">
          <span>{{Number(row.costMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="供应商税款/元" min-width="130">
          <span>{{Number(row.sellerTaxMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column inline-template label="供应商税点" min-width="120">
          <span>{{row.sellerTaxPoint | formateNumber}}%</span>
        </el-table-column>
        <el-table-column inline-template label="应付款/元" min-width="100">
          <span>{{Number(row.toPayMoney).toFixed(2)}}</span>
        </el-table-column>
        <el-table-column property="buyerCompany" label="采购商" min-width="120"> </el-table-column>
        <el-table-column property="buyerNumber" label="采购商ID" min-width="120"> </el-table-column>
        <el-table-column label="供应商" min-width="120">
          <template scope="scope">
            <template v-if="scope.row.shopCheck === 1">
              <img src="../../../assets/success.png" alt="" width="24" height="24">
            </template>
            <template v-if="scope.row.shopCheck === 0">
              <img src="../../../assets/warning.png" alt="" width="24" height="24">
            </template>
            <template v-if="scope.row.shopCheck === -1">
              <img src="../../../assets/delete.png" alt="" width="24" height="24">
            </template>
            {{scope.row.shopName}}
          </template>
        </el-table-column>
        <el-table-column property="sellerNumber" label="供应商ID" min-width="120"> </el-table-column>
        <el-table-column inline-template label="采购员" min-width="130">
          <div>{{row.guiderName}}/{{row.guiderTel}}</div>
        </el-table-column>
        <el-table-column inline-template label="销售员" min-width="130">
          <div>{{row.salesName}}/{{row.salesTel}}</div>
        </el-table-column>
        <el-table-column label="金融客户" min-width="100">
          <template scope="scope">
            <template v-if="scope.row.hasOpenedBaitiao == 1">
              <span class="icon-baitiao"></span>
            </template>
            <template v-else>
              <span class="icon-feibaitiao"></span>
            </template>
            <template v-if="scope.row.hasOpenedYanzhen == 1">
              <span class="icon-yanzhen"></span>
            </template>
            <template v-else>
              <span class="icon-feiyanzhen"></span>
            </template>
          </template>
        </el-table-column>
        <el-table-column property="fundType" label="款项类型" min-width="100" :formatter="getFundTypeStr"></el-table-column>
        <el-table-column property="payStatus" label="分账状态" min-width="120" :formatter="payStatus"> </el-table-column>
        <el-table-column inline-template label="操作" min-width="200" fixed="right">
          <div class="operate-btn">
            <template v-if="row.toPayMoney == 0 && row.fundType == 7">
              <el-button size='mini' @click.prevent="closeDeal(row.id)" type="warning">关闭</el-button>
              <el-button size='mini' @click.prevent="toPrint(row.orderNumber)" class="forgive-color">打印</el-button>
              <router-link :to="{ path:'/finance/pendingAccount/detail/'+row.id }">
                <el-button size='mini' class="forgive-color">明细</el-button>
              </router-link>
            </template>
            <template v-else-if='!row.needToPaySeller'>
              <el-button size='mini' @click.native='passPayHandle(row.id)' type="warning">无需分账</el-button>
              <el-button size='mini' @click.prevent="toPrint(row.orderNumber)" class="forgive-color">打印</el-button>
              <router-link :to="{ path:'/finance/pendingAccount/detail/'+row.id }">
                <el-button size='mini' class="forgive-color">明细</el-button>
              </router-link>
            </template>
            <template v-else>
              <el-button size='mini' @click.native='splitOnOrOffLine(row, "online")' type="warning">分账</el-button>
              <el-button size='mini' @click.prevent="toPrint(row.orderNumber)" class="forgive-color">打印</el-button>
              <router-link :to="{ path:'/finance/pendingAccount/detail/'+row.id }">
                <el-button size='mini' class="forgive-color">明细</el-button>
              </router-link>
              <el-button size='mini' @click.native='splitOnOrOffLine(row, "offline")' type="primary">线下分账</el-button>
            </template>
            <template v-if="row.type == 3">
              <el-button size='mini' v-if='row.payType === 0' @click.prevent="showDialogForm(row.id)" type="primary">打回采购</el-button>
            </template>
            <template v-else>
              <el-button size='mini' v-if='row.payType === 0' @click.prevent="showDialogForm(row.id)" type="primary">打回跟单</el-button>
            </template>
          </div>
        </el-table-column>
      </el-table>
      <div class="pagination-content">
        <pagination :page="pendingAccountListData.pageNumber" :total="pendingAccountListData.totalCount" :render="pageChange" :options="filters"></pagination>
      </div>
    </div>

    <el-dialog title="异常" v-model="dialogFormVisible" size="tiny">
      <el-form :model="sendbackIncomeForm" :rules="errorRules" ref="sendbackIncomeForm" :close-on-click-modal="true">
        <el-form-item label="分账异常" prop="exceptionMsg">
          <el-input type="textarea" :autosize="{minRows: 6, maxRows: 6}" resize="none" v-model="sendbackIncomeForm.exceptionMsg" placeholder="请描述异常问题（限500字）"></el-input>
          <p v-if="sendbackIncomeForm.exceptionMsg" class="remark-font">{{sendbackIncomeForm.exceptionMsg.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
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
    <!-- 分账3.1dialog -->
    <!-- <el-dialog size="tiny" v-model="subAccountVisible" title="提醒">
      <p class="warn-msg" v-if="subAccountData.templateId == '1-1'">该客户垫付额度不足，该订单可使用余额，请确定是否继续分账？</p>
      <p class="warn-msg" v-if="subAccountData.templateId == '1-2'">该客户垫付额度不足，且余额也不足，请确定是否继续分账？</p>
      <p class="warn-msg" v-if="subAccountData.templateId == '2-1'">该客户白条额度不足，该订单可以使用垫付，请确定是否继续分账？</p>
      <p class="warn-msg" v-if="subAccountData.templateId == '2-2'">该客户白条额度不足，且垫付额度也不足，可以使用余额，请确定是否继续分账？</p>
      <p class="warn-msg" v-if="subAccountData.templateId == '2-3'">该客户白条额度不足，且垫付额度也不足、余额也不足，请确定是否继续分账？</p>
      <p class="warn-msg" v-if="subAccountData.templateId == '3-1'">该客户雁阵额度不足，该订单可以使用垫付，请确定是否继续分账？</p>
      <p class="warn-msg" v-if="subAccountData.templateId == '3-2'">该客户雁阵额度不足，且垫付额度也不足，可以使用余额，请确定是否继续分账？</p>
      <p class="warn-msg" v-if="subAccountData.templateId == '3-3'">该客户雁阵额度不足，且垫付额度也不足、余额也不足，请确定是否继续分账？</p>
      <p class="warn-msg" v-if="subAccountData.templateId == '4-1'">该客户金融额度不足，该订单可以使用垫付，请确定是否继续分账？</p>
      <p class="warn-msg" v-if="subAccountData.templateId == '4-2'">该客户金融额度不足，且垫付额度也不足，可以使用余额，请确定是否继续分账？</p>
      <p class="warn-msg" v-if="subAccountData.templateId == '4-3'">该客户金融额度不足，且垫付额度也不足、余额也不足，请确定是否继续分账？</p>
      <el-form label-width="160" label-position="right">
        <el-form-item label="该订单销售货款：">
          <span class="red-color">{{subAccountData.saleMoney | formateNumber}}元</span>
        </el-form-item>
        <el-form-item v-if="['2-1','2-2','2-3','4-1','4-2','4-3'].indexOf(subAccountData.templateId) > -1" label="该客户可用白条额度：">
          <span class="red-color">{{Number(subAccountData.baitiaoRemainLine).toFixed(2)}}元</span>
        </el-form-item>
        <el-form-item v-if="['3-1','3-2','3-3','4-1','4-2','4-3'].indexOf(subAccountData.templateId) > -1" label="该客户可用雁阵额度：">
          <span class="red-color">{{Number(subAccountData.yanzhenRemainLine).toFixed(2)}}元</span>
        </el-form-item>
        <el-form-item label="该客户可用垫付额度：">
          <span class="red-color">{{Number(subAccountData.remainLine).toFixed(2)}}元</span>
        </el-form-item>
        <el-form-item label="该客户可用余额：">
          <span class="red-color">{{Number(subAccountData.availableBalance).toFixed(2)}}元</span>
        </el-form-item>
      </el-form>
      <footer>
        <el-button @click.native="subAccountVisible = false" size="small">取消</el-button>
        <el-button v-if="subAccountData.canPay" @click.native="toConfirmPending" size="small" type="primary">确定</el-button>
        <el-button v-if="!subAccountData.canPay" @click.native="toAdjust" size="small" type="primary">去调整</el-button>
      </footer>
    </el-dialog> -->
    <!-- 分账4.0dialog -->
    <el-dialog v-model="subAccountVisible" title="提示" size="tiny">
      <p class="warn-msg" v-if="subAccountData.templateId == 2">客户可用余额
        <span v-if="subAccountData.hasOpenedBaitiao">、可用徙木额度</span>
        <span v-if="subAccountData.hasOpenedYanzhen">、可用雁阵额度</span>和可用搜芽额度不足！请确认是否需要调整。</p>
      <p class="warn-msg" v-if="subAccountData.templateId == 3">客户可用余额、可用搜芽额度不足！请确认是否需要调整。</p>
      <p class="warn-msg" v-if="subAccountData.templateId == 4">客户存在未提交支付的订单！请确认是否需要调整</p>
      <p class="warn-msg" v-if="subAccountData.templateId == 5">客户存在未提交支付的订单！请确认是否需要调整。</p>
      <el-form label-width="140px" label-position="right">
        <el-form-item label="应付款：">
          <span class="red-color">{{subAccountData.toPayMoney | formateNumber}}元</span>
        </el-form-item>
        <el-form-item label="可用余额：">
          <span>{{Number(subAccountData.availableBalance).toFixed(2)}}元</span>
        </el-form-item>
        <el-form-item v-if="subAccountData.hasOpenedBaitiao" label="可用徙木额度：">
          <span>{{Number(subAccountData.realBaitiaoRemainLine).toFixed(2)}}元</span>
        </el-form-item>
        <el-form-item v-if="subAccountData.hasOpenedYanzhen" label="可用雁阵额度：">
          <span>{{Number(subAccountData.realYanzhenRemainLine).toFixed(2)}}元</span>
        </el-form-item>
        <el-form-item label="可用搜芽额度：">
          <span>{{Number(subAccountData.remainLine).toFixed(2)}}元</span>
        </el-form-item>
        <p style="text-align:left;margin-left:20px;line-height: 35px;">已分账但未支付的订单金额为：{{subAccountData.splitNotPayMoney | formateNumber}}元</p>
        <p style="border-bottom: 1px solid #ddd"></p>
        <el-form-item label="采购商付款金额：">
          <span>{{Number(subAccountData.buyerPayedMoney).toFixed(2)}}元</span>
        </el-form-item>
        <el-form-item label="采购商付款凭据：">
          <article class="media" v-if='subAccountData.buyerCertificateList && subAccountData.buyerCertificateList.length'>
            <a :href="'http://test.soouya.com'+val.imgUrl" class="image media-left is-64x64" v-lightbox="buyerCertificateList" v-for="(val, valIndex) in subAccountData.buyerCertificateList" :key="valIndex">
              <img :src="'http://test.soouya.com'+val.imgUrl+'@200h_200w_1e'" alt="Image" width="60" height="60">
            </a>
          </article>
        </el-form-item>
        <el-form-item label="通知付款备注：">
          <span>{{subAccountData.followerRemark}}</span>
        </el-form-item>
      </el-form>
      <footer>
        <el-button @click.native="subAccountVisible = false" size="small">取消</el-button>
        <el-button v-if="subAccountData.templateId ==4 ||subAccountData.templateId == 5" @click.native="toConfirmPending" size="small" type="primary">去分账</el-button>
        <el-button @click.native="toAdjust" size="small" type="primary">去调整</el-button>
      </footer>
    </el-dialog>
    <el-dialog v-model="passPayDialogConfig.isShow" size="tiny">
      <el-form :model="passPayDialogConfig.formData" :rules="passPayDialogConfig.rules">
        <el-form-item>
          <i class="el-icon-information important"></i>
          <span>确认无需给供应商付款</span>
        </el-form-item>
        <el-form-item prop="descr" label="财务备注" class="nowrap">
          <el-input :autosize="{minRows:6, maxRows:6}" resize="none" v-model="passPayDialogConfig.formData.descr" type="textarea"></el-input>
          <p v-if="sendbackIncomeForm.exceptionMsg" class="remark-font">{{sendbackIncomeForm.exceptionMsg.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close" size="small">取 消</el-button>
        <el-button type="primary" @click="savePassPayHandle" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <lightbox></lightbox>
  </div>
</template>
<script>
import HeadFilter from 'components/headFilter/HeadFilter'
import pagination from 'components/pagination'
import Tabs from 'components/splitTabs'
import Lightbox from 'components/lightbox/lightbox'
import limitInput from 'components/limitInput.vue'
import {
  request,
  newRequest,
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
    pagination,
    Tabs,
    limitInput
  },
  data() {
    const filters = Object.assign({
      pageNumber: 1,
      pageSize: 20,
    }, getCache({
      key: 'pendingAccountFilters',
    }));
    const validaeExceptionMsg = (rule, value, callback) => {
      if (value && value.length > 500) {
        callback(new Error('异常描述不能超过500字!'));
      } else {
        callback();
      }
    }
    const validateLength = (rule, value, callback) => {
      if (value.length > 500) {
        callback(new Error('备注不能超过500字'));
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
      orderNumberList: [],
      dialogVisible: false,
      customerAccount: {},
      subAccountVisible: false, // 对账模态框的切换
      subAccountData: {}, // 对账标题的切换
      hasOpenedYanzhen: false,
      splitType: '',
      id: '',
      errorRules: {
        exceptionMsg: [
          { validator: validaeExceptionMsg, trigger: 'change' }
        ]
      },
      passPayDialogConfig: {
        isShow: false,
        formData: {
          descr: '',
          id: '',
        },
        rules: {
          descr: [
            { validator: validateLength, trigger: 'blur' }
          ]
        }
      },
    }
  },
  computed: {},
  mounted() {
    this.height = String(document.body.clientHeight - 402);
    const params = getCache({ key: 'pendingAccountFilters' })
    if (params) {
      this.getList(params); // 获取待分账列表
    } else {
      this.getList(); // 获取待分账列表
    }
  },
  methods: {
    close() {
      this.passPayDialogConfig.isShow = false
    },
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
      console.log(this.filters, 'filter')
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
      if (params.customerCompany) {
        this.filters.buyerCompany = params.customerCompany
      } else {
        this.filters.buyerCompany = ''
      }
      if (params.shopCompany) {
        this.filters.shopName = params.shopCompany
      } else {
        this.filters.shopName = ''
      }
      delete this.requestParams.shopCompany
      delete this.requestParams.customerCompan
    },
    pageChange() {
      this.getList()
    },
    /**
     * 获取待分账列表
     * @params this.filters
     */
    getList(req) {
      this.fullscreenLoading = true;
      const option = Object.assign(this.filters, req)
      let obj = {}
      for (const key of Object.keys(option)) {
        if (option[key]) {
          obj[key] = option[key]
        }
      }
      obj = Object.assign(obj, {
        payStatus: 2,
      })
      newRequest({
        url: '/redwood/account/PayGroupOrderX/list',
        method: 'get',
        data: obj
      }).then(data => {
        this.fullscreenLoading = false;
        if (data.success === '1') {
          setCache({
            key: 'pendingAccountFilters',
            value: this.filters,
          });
          this.pendingAccountListData = data.page;
          this.getSumary(obj)
        } else {
          Message({
            message: '请求数据失败,请手动刷新！',
            type: 'error',
            duration: 1000
          })
        }
      })
    },
    getSumary(obj) {
      newRequest({
        url: '/redwood/account/PayGroupOrderX/getSumary',
        data: obj,
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.$set(this.pendingAccountListData, 'total', 0)
          this.pendingAccountListData.total = res.obj.totalMoney
        }
      })
    },
    formatTime(row, column) { // 格式化时间
      if (row.confirmPayTime > 0 && row.confirmPayTime !== null) {
        return formatTimeString(row.confirmPayTime)
      } else {
        return '--'
      }
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
      this.orderNumberList = [];
      this.hasSelect = !!val.length
      for (let i = 0; i < val.length; i++) {
        this.orderNumberList.push(val[i].orderNumber)
      }
      console.log('aa', this.orderNumberList)
    },
    handleCurrentChange(val) { // 切换页面
      // console.log(`当前页: ${val}`);
      this.filters.pageNumber = val;
      this.getList();
    },
    passPayHandle(id) { // 无需分账
      this.passPayDialogConfig.isShow = true
      this.passPayDialogConfig.formData.id = id
    },
    savePassPayHandle() {
      newRequest({
        url: AccountApi.PayGroupOrderX.passPay,
        method: 'post',
        contentType: 'application/json',
        data: Object.assign({}, this.passPayDialogConfig.formData, { _time: +new Date() })
      }).then(data => {
        this.fullscreenLoading = false;
        this.passPayDialogConfig.isShow = false
        if (data.success === '1') {
          // this.$router.push(`/finance/splitAccount`)
          const params = getCache({ key: 'pendingAccountFilters' })
          if (params) {
            this.getList(params); // 获取待分账列表
          } else {
            this.getList(); // 获取待分账列表
          }
        } else {
          this.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    toConfirmPending() {
      this.subAccountVisible = false
      this.splitType == 'online' ? this.$router.push(`/finance/pendingAccount/list/${this.id}`) : this.$router.push(`/finance/pendingAccount/payOutline/${this.id}`)
    },
    splitOnOrOffLine(row, splitType) {
      this.splitType = splitType
      this.fullscreenLoading = true
      if (row.hasOpenedYanzhen) {
        this.hasOpenedYanzhen = true
      }
      this.id = row.id
      newRequest({
        url: '/redwood/splitConfirm/getById',
        method: 'get',
        data: { id: row.id }
      }).then(data => {
        this.subAccountVisible = true
        console.log(this.subAccountVisible)
        if (data.success == '1') {
          if (data.obj.templateId != '100') {
            this.subAccountVisible = true
            this.subAccountData = data.obj;
          } else {
            splitType == 'online' ? this.$router.push(`/finance/pendingAccount/list/${row.id}`) : this.$router.push(`/finance/pendingAccount/payOutline/${row.id}`)
          }
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
        this.fullscreenLoading = false
      })
    },
    toAdjust() { // 去调整额度
      this.subAccountVisible = false
      window.open(`/finance/moneyManage/moneyManageDetail?id=${this.subAccountData.customerId}`)
      // this.$router.push(`/finance/moneyManage/moneyManageDetail?id=${this.customerAccount.id}`)
    },
    toPrint(orderNumber) { // 去打印
      window.open(`/common/printDetail/${orderNumber}`)
    },
    handleDispatch() { // 批量分账
      const id = this.multipleSelection.map((obj) => {
        return obj.id
      })
      console.log('id', id);
      this.$router.push('/finance/pendingAccount/list/' + id.join(','))
    },
    handlePrint() { // 批量打印
      // const numberList = this.orderNumberList.map((obj) => {
      //   return obj
      // })
      window.open(`/common/printDetail/` + this.orderNumberList)
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
          newRequest({
            url: AccountApi.PayGroupOrderX.sendbackIncome,
            method: 'post',
            data: this.sendbackIncomeForm,
            contentType: 'application/json'
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
        contentType: 'application/json',
        data: JSON.stringify(this.descrForm)
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
    filters: function (newValue, oldVal) {
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}

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

.el-table {
  .el-button {
    margin: 2px;
  }
}
</style>
