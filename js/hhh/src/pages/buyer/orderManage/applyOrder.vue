<template>
  <div class="apply-list-order">
   <!-- 订单信息 -->
    <div class="section clearfix">
      <h3 class="tit">
        订单信息
      </h3>
      <div class="line-item clearfix">
							<div class="line-item-l">
									<span>已选订单</span>
							</div>
        <div class="line-item-r">
          <div class="item-table" v-if="orderDetail">
            <el-table
              :data="[orderDetail]"
              border
              style="width: 100%">
              <el-table-column prop="serviceNumber" label="订单号" min-width="180"></el-table-column>
              <el-table-column inline-template label="订单类型" min-width="180">
                <div>
                  <template v-if="row.type == '1'">服务单</template>
                  <template v-if="row.type == '2'">贸易单</template>
                </div>
              </el-table-column>
              <el-table-column prop="buyerCompany" label="采购商" min-width="180"></el-table-column>
              <el-table-column prop="sellerCompany" label="供应商" min-width="180"></el-table-column>
              <el-table-column inline-template label="原订单总金额" min-width="150">
                <div>
                  ¥{{row.total && row.total.toFixed(2)}}
                </div>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="line-item clearfix">
        <div class="line-item-l">
          <span>采购商备注</span>
        </div>
        <div class="line-item-r">
          {{orderDetail.leaveMessage}}
        </div>
      </div>
    </div>
    <!-- 订单信息 end -->
<!-- 退换货信息 -->
    <div class="section" style="border-bottom: 0;">
      <h3 class="tit">
        退换货信息
      </h3>
      <div class="line-item clearfix">
        <div class="line-item-l">
          <span><b class="mark">*</b>退换类型</span>
        </div>
        <div class="line-item-r">
          <el-radio-group v-model="changeType" size="small" @change="selectType">
            <el-radio :label="0">售前退货</el-radio>
            <el-radio :label="1">售前换货</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="line-item clearfix">
        <div class="line-item-l">
          <span>
            <b class="mark">*</b><template v-if="changeType == 0 || changeType == 2">退</template><template v-if="changeType == 1 || changeType == 3">换</template>货原因</span>
        </div>
        <div class="line-item-r clearfix">
          <div style="float:left;">
          <el-select v-model="reason" size="small" @change="changeReason" v-if="changeType == 1 || changeType == 3" :key="randKey">
            <el-option label="客户要求换货" value="0">客户要求换货</el-option>
            <el-option label="验货不合格换货" value="1">验货不合格换货</el-option>
            <el-option label="其它" value="2"></el-option>
          </el-select>
          <el-select v-model="reason" size="small" @change="changeReason" v-if="changeType == 0 || changeType == 2" :key="randKey">
           <el-option label="客户要求退货" value="0">客户要求退货</el-option>
           <el-option label="验货不合格退货" value="1">验货不合格退货</el-option>
            <el-option label="其它" value="2"></el-option>
          </el-select>
        </div>
        <div style="float:left; margin-left: 10px;" v-if="reason == 2">
            <el-input size="small" v-model="fillReason" style="display: inline-block; width: 400px;"></el-input>
        </div>
        </div>
      </div>

      <div class="line-item clearfix">
        <div class="line-item-l">
          <span><b class="mark">*</b><template v-if="changeType == 0 || changeType == 2">退</template><span v-if="changeType == 1 || changeType == 3">换</span>货明细</span>
        </div>
        <div class="line-item-r" style="overflow-x: auto;">
            <!-- <table class="pure-table pure-table-bordered fix-table">
               <thead>
                   <tr class="th">
                       <th style="width:70px;">选择</th>
                       <th v-if="changeType == 2 || changeType == 3"><div class="cellw">出仓单号</div></th>
                       <th><div class="cellw">货号</div></th>
                       <th><div class="cellw">色号</div></th>
                       <th><div class="cellw cellw2">销售单价</div></th>
                       <th v-if="orderDetail.type != '2'"><div class="cellw">成本价</div></th>
                       <th><div class="cellw">税点</div></th>
                       <th><div class="cellw">入仓总数</div></th>
                       <th>
                        <div class="cellw">
                          <b style="color:red;">*</b>
                          <span v-if="changeType == 0 || changeType == 2">退</span>
                          <span v-if="changeType == 1 || changeType == 3">换</span>货匹号
                        </div>
                      </th>
                       <th v-if="changeType == 1 || changeType == 3"><div class="cellw" v-if="changeType == 1 || changeType == 3">换货原数</div></th>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="(val, index) in colorList">
                       <td><input type="checkbox" class="radio" v-model="val.check" name="pp" :value="val.productNumber+val.color" :disabled="val.clothLoneListForSelect.length > 0 ? false : true" /></td>
                       <td v-if="changeType == 2 || changeType == 3"><div class='cellw'>{{val.productNumber}}</div></td>
                       <td><div class='cellw'>{{val.productNumber}}</div></td>
                       <td><div class='cellw'>{{val.color}}</div></td>
                       <td><div class='cellw cellw2'>¥{{val.salePrice}}/{{val.salePriceUnit}}</div></td>
                       <td v-if="orderDetail.type != '2'"><div class='cellw'>¥{{val.price}}/{{val.priceUnit}}</div></td>
                       <td><div class='cellw'>{{val.taxPoint}}%</div></td>
                       <td><div class='cellw'>{{val.totalQuantity.toFixed(2)}}{{val.quantityUnit}}/{{val.clothLoneListForSelect.length}}匹</div></td>
                       <td>
                         <div class='cellw'>
                          <div>
                           <span>{{val.pihao}}</span>
                           <template v-if="!!val.clothLoneListForSelect.length">
                            <el-button size="small" type='info' @click.native="choosePihao(val)">选择</el-button>
                           </template>
                          </div>
                        </div>
                      </td>
                      <td v-if="changeType == 1 || changeType == 3">
                        <div class='cellw cellw2'>
                          <span  v-if="val.originNumber">
                             {{val.originNumber}}{{val.quantityUnit}}
                          </span>
                        </div>
                     </td>
                   </tr>
               </tbody>
           </table> -->

           <el-table :data="colorList" border @selection-change="handleSelectionChange">
             <el-table-column type="selection"  width="55" :selectable="selectData"></el-table-column>
             <el-table-column prop="productNumber" label="货号" min-width='120' show-overflow-tooltip></el-table-column>
             <el-table-column prop="color" label="色号" min-width='80' show-overflow-tooltip></el-table-column>
             <el-table-column label="供应商税点" min-width='120'>
                <template scope="scope">
                  {{scope.row.sellerTaxPoint}}%
                </template>
             </el-table-column>
             <!-- 贸易单不显示成本价 -->
             <el-table-column min-width='120' label="成本价(含税)" v-if="orderDetail.type != '2'" show-overflow-tooltip>
                <template scope="scope">
                    ¥{{scope.row.priceWithTax}}{{scope.row.priceUnit}}
                </template>
             </el-table-column>
             <el-table-column min-width='120' label="成本价(不含税)" v-if="orderDetail.type != '2'" show-overflow-tooltip>
                <template scope="scope">
                  ¥{{scope.row.price}}{{scope.row.priceUnit}}
                </template>
             </el-table-column>
             <el-table-column class-name="red" min-width='140' :label="(changeType == 0 || changeType == 2) ? '退货匹号(至少选一匹)' : '换货匹号(至少选一匹)'" show-overflow-tooltip>
                <template scope="scope">
                  <div>{{scope.row.pihao}}</div>
                  <div><el-button size="mini" type='info' @click.native="choosePihao(scope.row)">选择</el-button></div>
                </template>
             </el-table-column>
             <el-table-column min-width='120' label="*换货原数" v-if="orderDetail.type != '2'" show-overflow-tooltip>
                <template scope="scope">
                    {{scope.row.originNumber}}<template v-if="scope.row.originNumber">{{scope.row.quantityUnit}}</template>
                </template>
             </el-table-column>
           </el-table>



          </div>
      </div>
  <!-- 退货 -->
    <template>
     <div  v-if="changeType == 2 || changeType == 3">
      <p style="padding-left: 25px; margin-bottom: 10px;">费用明细</p>
      <div class="line-item clearfix">
        <div class="line-item-l">
          <span v-if="changeType == 2">退货数量</span>
          <span v-if="changeType == 3">换货原数</span>
        </div>
        <div class="line-item-r">
           <span style="padding-right: 5px;">{{returnNumber}}</span>{{orderDetail.colorList && orderDetail.colorList[0].priceUnit.split('/')[1]}}
        </div>
      </div>
      <div class="line-item clearfix">
        <div class="line-item-l">
          <span v-if="changeType == 2">退货销售货款</span>
          <span v-if="changeType == 3">换货原销售货款</span>
        </div>
        <div class="line-item-r">
           <span>¥{{returnMoney}}</span>
        </div>
      </div>


      <div class="line-item clearfix">
        <div class="line-item-l">
          <span><b class="mark">*</b>搜芽退款采购商</span>
        </div>
        <div class="line-item-r">
           <y-input size="small" type="number"  v-model="soouyaPayToBuyer" />
           <span class="unit">元</span>
        </div>
      </div>
      <div class="line-item clearfix">
        <div class="line-item-l">
          <span>其中扣服务费</span>
        </div>
        <div class="line-item-r">
           <y-input size="small"
           type="number"
           v-model="serviceMoney"
           >
           </y-input>
           <span class="unit">元</span>
        </div>
      </div>
      <div class="line-item clearfix">
        <div class="line-item-l">
          <span>其中扣税费</span>
        </div>
        <div class="line-item-r">
           <y-input size="small" type="number" v-model="taxMoney" />
           <span class="unit">元</span>
        </div>
      </div>
     </div>
    </template>
    <div v-if="false">
      <!-- changeType == 1 本来是 -->
      <div class="line-item clearfix">
        <div class="line-item-l">
          <span  class="mark-point">{{orderDetail.a}}换货数量</span>
        </div>
        <div class="line-item-r">
          <y-input type="number" v-model="quantity" />
          <span class="unit">{{orderDetail.colorList && orderDetail.colorList[0].priceUnit.split('/')[1]}}</span>
        </div>
      </div>
      <div class="line-item clearfix">
        <div class="line-item-l">
          <span class="mark-point">{{orderDetail.a}}换货销售单价</span>
        </div>
        <div class="line-item-r">
           <y-input v-model="salePrice" type="number" />
           <span class="unit">{{orderDetail.colorList && orderDetail.colorList[0].salePriceUnit}}</span>
        </div>
      </div>

       <div class="line-item clearfix">
        <div class="line-item-l">
          <span>{{orderDetail.a}}换货货款</span>
        </div>
        <div class="line-item-r">
          <span>{{replaceFullMoney}}</span>元
        </div>
      </div>
      <div class="line-item clearfix">
        <div class="line-item-l radio-tit">
          <span class="mark-point">{{orderDetail.a}}采购商换货费用</span>
        </div>
        <div class="line-item-r">
          <div class="radio-item">
             <el-radio class="soouya-radio"  v-model="buyerPay" label="0">采购商给搜芽</el-radio>
             <y-input
               v-model="buyerReplenishment"
               type="number"
               :disabled="buyerPay == '0' ? false : true" class="y-unit"/>元
           </div>
           <div class="radio-item">
              <el-radio class="soouya-radio" size="small" v-model="buyerPay" label="1">搜芽给采购商</el-radio>
              <y-input
                v-model="sellerRefund"
                size="small" type="number"
                :disabled="buyerPay == '1' ? false : true" class="y-unit"/>元
            </div>
        </div>
      </div>
      <div class="line-item clearfix">
        <div class="line-item-l radio-tit">
          {{orderDetail.a}}其中换货服务费
        </div>
        <div class="line-item-r">
          <div class="radio-item">
             <el-radio class="soouya-radio"  size="small" v-model="soouyaPay" label="0">采购商给搜芽</el-radio>
             <y-input :disabled="soouyaPay == '0' ? false : true" v-model="serviceReplenishment" class="y-unit" />元
           </div>
           <div class="radio-item">
              <el-radio class="soouya-radio"  size="small" v-model="soouyaPay" label="1">搜芽给采购商</el-radio>
              <y-input :disabled="soouyaPay == '1' ? false : true" v-model="serviceRefund" class="y-unit" />元
            </div>
        </div>
      </div>

      <div class="line-item clearfix">
        <div class="line-item-l radio-tit">
          其中换货税费
        </div>
        <div class="line-item-r">
          <div class="radio-item">
             <el-radio class="soouya-radio" v-model="soouyaGet" label="0">采购商给搜芽</el-radio>
             <y-input
                v-model="taxReplenishment"
                type="number"
                :disabled="soouyaGet == '0' ? false : true" class="y-unit"/>元
           </div>
           <div class="radio-item">
              <el-radio class="soouya-radio" size="small" v-model="soouyaGet" label="1">搜芽给采购商</el-radio>
              <y-input
                  v-model="taxRefund"
                  size="small"
                  type="number"
                  :disabled="soouyaGet == '1' ? false : true" class="y-unit"/>元
            </div>
        </div>
      </div>
    </div>

   <!-- 采购商收款方式 -->
   <!-- 当是退货 或者是 换货且供应商退款金额 才显示采购商收款方式-->
   <!-- changeType == '0' || (changeType == '1' && buyerPay == '1' 原来判断 -->
    <div class="line-item clearfix" v-if="false">
      <div class="line-item-l">
        <span><b class="mark">*</b>采购商收款方式</span>
      </div>
      <div class="line-item-r">
        <table class="pure-table pure-table-bordered fix-table">
           <thead>
               <tr class="th">
                   <th style="width:70px;">选择</th>
                   <th><div class="cellw">银行名称</div></th>
                   <th><div class="cellw">银行账号开户名</div></th>
                   <th><div class="cellw cellw2">银行卡卡号</div></th>
                   <th><div class="cellw">账户类型</div></th>
                   <th><div class="cellw">开户支行</div></th>
               </tr>
           </thead>
           <tbody>
               <tr v-for="(val, index) in orderDetail.buyerBankList">
                   <td><input type="radio" class="radio" v-model="buyerBankAccountId" name="bank1" :value="val.id" /></td>
                   <td><div class='cellw'>{{val.bank}}</div></td>
                   <td><div class='cellw'>{{val.type == '1' ? val.company : val.realName}}</div></td>
                   <td><div class='cellw cellw2'>{{val.number}}</div></td>
                   <td><div class='cellw'>{{val.type == '1' ? '企业' : '个人'}}</div></td>
                   <td><div class='cellw cellw2'>{{val.branch}}</div></td>
               </tr>
           </tbody>
       </table>
        </div>
    </div>
    <div class="line-item clearfix">
      <div class="line-item-l">
        <span>买货员<template v-if="changeType == '0'">退</template><template v-if="changeType == '1'">换</template>货备注</span>
      </div>
      <div class="line-item-r">
         <textarea rows="3" style="width: 300px; height: 100px; resize: none; border: 1px solid #ccc; padding: 5px;" v-model.trim="purchaserRemark"></textarea>
         <span><b style="color: red; padding-left: 5px;">{{leftnumber}}</b>/500字</span>
      </div>
    </div>
    <div class="y-submit">
         <el-button :disabled="isSubmit" type="primary" @click.native="handleSubmit">提交审核</el-button>
    </div>
    </div>
<!-- 退换货信息 end -->
    <!-- 换货匹号弹窗 -->
       <el-dialog
           title="请选择"
           v-model="changepiShow"
           custom-class="common-pop"
           size="tiny"
           :close-on-click-modal="false"
           >
          <div class="y-take-good clearfix send-good">
            <div class="t-item">
              <div class="t-item-r">
                  <div class="r-line">
                    <input type='checkbox' class='input-checkbox' id="chk" :checked="checked" @click='checkedAll'>
                      <label for="chk">全选</label>
                 </div>
                <div class="r-line" v-for='(checkb, index) in checkboxData'>
                  <input
                   type="checkbox"
                   v-model="clothLoneIdList"
                   :value='checkb.id'
                   :id='checkb.id'
                   >
                  <label :for="checkb.id">
                    {{checkb.number}}|{{checkb.quantity}}{{checkb.quantityUnit}}|
                    <template v-if="checkb.isChecked == '1' && checkb.rank">
                      {{checkb.rank}}/{{checkb.average}}分
                    </template>
                    <template v-if="checkb.isChecked == '0'">未验货</template>
                    <template v-if="checkb.isChecked == '1'">
                      <span v-if="checkb.type == '1'">售后</span>
                      <span v-if="checkb.type == '2'">未发货</span>
                    </template>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="cancelConfirm">取消</el-button>
            <el-button type="primary" :disabled="clothLoneIdList.length > 0 ? false : true" @click.native="confirmPihao">确定</el-button>
          </div>
       </el-dialog>
   <!-- 通知出仓 end -->
  </div>
</template>

<script>
import GoBack from 'components/goBack'
import Api from 'api/orderprocess'
import reposityApi from 'api/reposity'
import YInput from 'components/yInput'
import { mapActions } from 'vuex'
import {
  request,
  // setCache,
  // formatTimeString
} from 'utils/tool'
export default {
  components: {
    GoBack,
    'y-input': YInput
  },
  directives: {},
  data () {
    return {
      serviceMoney: 0, // 服务费
      taxMoney: 0,  // 税费
      soouyaPayToBuyer: '', // 搜芽退款金额
      quantity: 0,
      randKey: 0,
      quantityUnit: '',
      salePrice: 0,
      salePriceUnit: '',
      changeType: 0, // 退货与换货标志
      reason: '0', // 退换货原因
      fillReason: '', // 其它原因填写
      // 换货弹窗数据配置
      tempMark: '', // 临时变量作标志
      changepiShow: false,
      checkboxData: [], // 列出全部列表
      clothLoneIdList: [], // 选中的值
      // 换货弹窗数据配置end
      checked: false,
      purchaserRemark: '', // 跟单员备注
      buyerBankAccountId: '', // 选中采购商收款方式的id
      buyerBankList: [], // 采购商收款方式列表
      multipleSelection: [], // 明细选中
      orderDetail: {}, // 订单详情
      colorList: [], // 退换货明细
      count: 0, // 为了computed能调用
      soouyaPay: '0', // 换货服务费
      soouyaGet: '0', // 换货税费
      buyerPay: '0', // 采购商
      serviceReplenishment: 0, //  服务费，soouya退
      serviceRefund: 0, // 服务费，soouya补
      taxRefund: 0, // 税费，soouya退
      taxReplenishment: 0, // 税费，soouya补
      buyerReplenishment: 0, // 采购商补款金额
      sellerRefund: '', // 供应商退款金额
      originNumber: 0, // 原数据
      currentChoseId: '', // 费用明细选择
      _time: 0
    }
  },
  mounted () {
    this.getDetail()
    this._time = (new Date()).getTime()
    // this.changeType = Number(this.$route.query.type)
  },
  methods: {
    ...mapActions([
      'updateVuexData'
    ]),
    selectData(row, index) {
      if (row.pihao) {
        return true
      } else {
        return false
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      // console.log('count', this.count)
    },
    isSelectable (row) {
      if (row.clothLoneListForSelect.length > 0) {
        return true
      } else {
        return false
      }
    },
    getDetail () {
      this.$store.dispatch('changeload', true)
      const obj = {
        orderNumber: this.$route.query.id,
        type: Number(this.changeType) + 1
      }
      request({
        url: Api.getOrderForReplaceReturn,
        data: {
          param: JSON.stringify(obj)
        }
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.convertData(res.obj)
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    getFinancialWay () {
      request({
       url: reposityApi.BankAccount_listByBuyerId,
       data: {
         param: JSON.stringify({buyerId: this.$route.query.buyerId})
       }
      }, (res) => {
        if (res.success == 1) {
           console.log('res', res);
           this.buyerBankAccountId = res.page.result[0].id
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    convertData (obj) {
      this.orderDetail = obj
      this.buyerBankAccountId = this.orderDetail.buyerBankList.length > 0 ? this.orderDetail.buyerBankList[0].id : ''   // 默认选中
      this.colorList = this.orderDetail.colorList
      this.colorList.map((item) => {
        let totalQuantity = 0
        item.clothLoneListForSelect.map((val) => {
          totalQuantity += Number(val.quantity)
          item.quantityUnit = val.quantityUnit
        })
        this.salePriceUnit = item.salePriceUnit
        item.totalQuantity = totalQuantity
        item.pihao = ''
        item.originNumber = ''
        item.check = false
      })
      // this.getFinancialWay()
    },
    changeReason (val) {
      this.reason = val
    },
    selectType (val) {
      this.reason = '0'
      this.getDetail()
    },
    collectDatas () {
      const req = {}
      const pihaoIdList = []
      this.multipleSelection.map((item) => {
        item.pihao.split(',').forEach((val, index) => {
          item.clothLoneListForSelect.map((value, key) => {
            if (val == value.number) { // 选中的匹号
              pihaoIdList.push(value.id)
            }
          })
        })
      })
      req.purchaserRemark = this.purchaserRemark
      if (this.changeType == 0 || this.changeType == 2) { // 退货数据
        req.lstToReturn = pihaoIdList
        if (this.reason == 0) {
          req.reason = '客户要求退货'
        }
        if (this.reason == 1) {
          req.reason = '验货不合格退货'
        }
        if (this.reason == 2) {
          req.reason = this.fillReason
        }
        // req.bankAccountId = this.buyerBankAccountId
      }

      if (this.changeType == 1 || this.changeType == 3) { // 换货数据
        req.lstToReplace = pihaoIdList
        if (this.reason == 0) {
          req.reason = '客户要求换货'
        }
        if (this.reason == 1) {
          req.reason = '验货不合格换货'
        }
        if (this.reason == 2) {
          req.reason = this.fillReason
        }
        // req.salePrice = this.salePrice
        // req.salePriceUnit = this.orderDetail.colorList[0].salePriceUnit
        // req.quantity = this.quantity
        // req.quantityUnit = this.orderDetail.colorList[0].quantityUnit
        req.salePrice = this.salePrice
        req.salePriceUnit = this.salePriceUnit
        req.quantity = this.quantity
        req.quantityUnit = this.quantityUnit

        if (this.soouyaPay == 0) {
          req.serviceReplenishment = this.serviceReplenishment
          req.serviceRefund = ''
        }
        if (this.soouyaPay == 1) {
          req.serviceReplenishment = ''
          req.serviceRefund = this.serviceRefund
        }
        // 换货税费
        if (this.soouyaGet == 0) {
          req.taxRefund = ''
          req.taxReplenishment = this.taxReplenishment
        }
        if (this.soouyaGet == 1) {
          req.taxRefund = this.taxRefund
          req.taxReplenishment = ''
        }
        // 采购商
        if (this.buyerPay == 0) {
          req.buyerReplenishment = this.buyerReplenishment
          req.sellerRefund = ''
        }
        if (this.buyerPay == 1) {
          req.buyerReplenishment = ''
          req.sellerRefund = this.sellerRefund
        }
        req.buyerBankAccountId = this.buyerBankAccountId
      }
      if (this.changeType == 0 || this.changeType == 1) { // 售前
        req.category = 1
      }
      if (this.changeType == 2 || this.changeType == 3) { // 售后
        req.category = 2
        req.serviceMoney = this.serviceMoney
        req.taxMoney = this.taxMoney
        req.soouyaPayToBuyer = this.soouyaPayToBuyer
      }
      return req
    },
    handleSubmit () {
      this.$store.dispatch('changeload', true)
      let url
      if (this.changeType == 0 || this.changeType == 2) { // 退货接口
        url = reposityApi.Return_commit
      } else { // 换货接口
        url = reposityApi.Replace_commit
      }
      const obj = this.collectDatas()
      obj._time = this._time
      request({
        url,
        data: {
          param: JSON.stringify(obj)
        }
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          const that = this
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose () {
              that.updateVuexData({ module: 'buyerReject', tabIndex: '2' })
              that.$router.replace({ name: 'buyerReject' })
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
    // changeGoodSelect (val) {
    //   this.multipleSelection = []
    //   this.multipleSelection = val
    // },
    // 取消弹窗
    cancelConfirm () {
      this.changepiShow = false
    },
    // 弹窗确定选择匹号
    confirmPihao () {
      const that = this
      this.changepiShow = false
      let totalOriginNumber = 0
      let numbers = []
      this.clothLoneIdList.map((id) => {
        that.checkboxData.map((item) => {
          if (id == item.id) {
            totalOriginNumber += item.quantity
            numbers.push(item.number)
          }
        })
      })
      this.colorList.map((val, index) => {
        let temCurrent = (val.productNumber + val.color)
        if (temCurrent == this.tempMark) {
          val.originNumber = totalOriginNumber
          val.pihao = numbers.join(',') // 显示匹号
          this.colorList.splice(index, 1, this.colorList[index])
        }
      })
      this.count ++
    },
    // 弹窗内选择匹号
    choosePihao (obj) {
      this.clothLoneIdList = []
      const that = this
      this.changepiShow = true
      this.tempMark = (obj.productNumber + obj.color)
      this.checkboxData = obj.clothLoneListForSelect
      // clothLoneIdList 选中值回填
      if (obj.pihao) {
        obj.pihao.split(',').map((number) => {
          this.checkboxData.map((item) => {
            if (item.number == number) {
              that.clothLoneIdList.push(item.id)
            }
          })
        })
      }
    },
    checkedAll () {
      if (this.checked) {
        this.clothLoneIdList = []
      } else {
        this.clothLoneIdList = []
        this.checkboxData.forEach((item) => {
          this.clothLoneIdList.push(item.id)
        })
      }
    }
  },
  updated () {},
  computed: {
   commonFn () {
     let num = 0 // 计算退换货总数
     let originNum = 0 // 计算原数总数
     let salePrice = 0
     let totalMoney = 0 // 计算总货款
     this.multipleSelection.map((obj) => {  // 明细原数据列表
       let temSingleMoney = 0 // 计算当前行选中后的退货销售贷款
       if (obj.pihao) { // 有选择中的匹号
         salePrice = obj.salePrice
         obj.pihao.split(',').map((number) => {
           obj.clothLoneListForSelect.map((items) => {
             if (items.number == number) {
               num += Number(items.quantity) // 退换货总数量加起来
               originNum += Number(items.quantity) // 退换货总原数加起来
               temSingleMoney += (items.quantity * salePrice)
             }
           })
         })
       }
       totalMoney += temSingleMoney
     })
     const obj = {
       num,
       totalMoney,
       originNum
     }
     return obj
    },
    // 换货货款
    replaceFullMoney () {
      return ((Number(this.quantity) - Number(this.commonFn.originNum)) * Number(this.salePrice)).toFixed(2)
    },
    // 退货数量
    returnNumber () {
      return Number(this.commonFn.num).toFixed(2)
    },
    // 退货销售额
    returnMoney () {
      return Number(this.commonFn.totalMoney).toFixed(2)
    },
    leftnumber () {
      return 500 - Number(this.purchaserRemark.length)
    },
    // 提交校验规则
    isSubmit () {
      this.count++
      // 退货条件筛选
      if (this.reason == 2 && !this.fillReason) {
        return true
      }
      // 退换货明细校检 这是原来单选检验
      // if (!this.currentChoseId) {
      //   return true
      // } else if (this.currentChoseId) {
      //   let on = false
      //   this.colorList.map((item) => {
      //     const tem = (item.productNumber + item.color)
      //     if (tem == this.currentChoseId) {
      //       if (!item.pihao) {
      //         on = true
      //       }
      //     }
      //   })
      //   if (on) {
      //     return true
      //   }
      // }

      // 多选校验
      if (this.multipleSelection.length == 0) {
        return true
      }

      // 当是退货要校验
      if (this.changeType == 0) {
        // if (String(this.serviceMoney) == '' || String(this.taxMoney) == '') {  // 服务费和税费不非必填
        //   return true
        // }
        // if (!this.soouyaPayToBuyer) {
        //   return true
        // }
      }
      if (this.changeType == 1) {
        // if (!this.quantity) { // 换货数量
        //   return true
        // }
        // if (!this.salePrice) { // 换货销售单价
        //   return true
        // }
        // 换货服务费判断
        // if ((this.soouyaPay == 0 && !this.serviceReplenishment)) {
        //   return true
        // }
        // if (this.soouyaPay == 1 && !this.serviceRefund) {
        //   return true
        // }
        // 换货税费
        // if ((this.soouyaGet == 0 && !this.taxReplenishment)) {
        //   return true
        // }
        // if (this.soouyaGet == 1 && !this.taxRefund) {
        //   return true
        // }
        // 采购商
        // if ((this.buyerPay == 0 && this.buyerReplenishment === '')) {
        //   return true
        // }
        // if (this.buyerPay == 1 && this.sellerRefund === '') {
        //   return true
        // }
      }
      if (this.changeType == 2 || this.changeType == 3) {
         if (String(this.soouyaPayToBuyer) == '') {
           return true
         }
      }
    }
  },
  filters: {},
  watch: {
    changeType (val) {
      this.reason = String(this.reason)
      this.randKey = (Math.random() * 10 + 1)
    },
    purchaserRemark (val) {
      if (val.length >= 500) {
        this.purchaserRemark = val.slice(0, 500)
      }
    },
    serviceMoney (val) { this.count++ },
    clothLoneIdList: {
      handler: function (val, oldVal) {
        if (this.clothLoneIdList.length === this.checkboxData.length) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
      deep: true
    },
    taxMoney (val) { this.count-- },
    soouyaPayToBuyer (val) { this.count-- },
    quantity (val) { this.count++ },
    salePrice (val) { this.count++ },
    serviceRefund (val) { this.count++ },
    serviceReplenishment (val) { this.count++ },
    taxReplenishment (val) { this.count-- },
    taxRefund (val) { this.count-- },
    buyerReplenishment (val) { this.count++ },
    sellerRefund (val) { this.count-- },
    currentChoseId (val) {
      this.count--
    },
  }
}
</script>
<style src="assets/style/table.scss" lang="scss"></style>
<style lang="scss">
.apply-list-order {
   .radio-item {
     margin-bottom: 8px;
     .soouya-radio {
       display: inline-block;
       width: 125px;
     }
   }
   .el-table {
    th.star{
      .cell {
        position: relative;
        &:before {
          display: inline-block ;
          content: "*";
          padding-right: 3px;
          color: red;
        }
      }
    }
   }
   .mark-point {
     position: relative;
     &:before {
       display: inline-block ;
       content: "*";
       padding-right: 3px;
       color: red;
     }
   }
   .mark {
     color: red;
   }
   .y-submit {
     margin-bottom: 20px;
     margin-left: 130px;
   }
   .cell {
     word-break: break-word;
   }
  .fix-table {

    .el-radio__label {
      display: none;
    }
    th {
      text-align: center;
    }
    td {
      background-color: #fff;
      text-align: center;
    }
    .cellw {
      width:100px;
      word-break:break-all;
      overflow:auto;
    }
    .cellw2 {
      width: 110px;
    }
  }
  th.red {
    .cell:before {
      display: inline-block;;
      content: '*';
      color: red;
      position: relative;
      top: 8px;
      font-size: 20px;
      padding-right: 5px;
    }
  }
  .section {
    border-bottom: 1px dotted #ccc;
    .tit {
      margin-top: 10px;
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      color: #000;
    }
    .line-item {
      margin-bottom: 10px;
      .line-item-l {
        float: left;
        font-size: 14px;
        width: 130px;
        text-align: right;
        padding-right: 10px;
      }
      .radio-tit {
        padding-top: 5px;
      }
      .line-item-r {
        font-size: 14px;
        width: 88%;
        float: left;
        overflow: auto;
      }
      .unit {
        padding-left: 10px;
      }
    }
  }
}
.y-unit {
  margin-right: 10px;
}
.common-pop {
  min-width: 500px;
}
.y-take-good {
  max-height: 450px;
  min-width: 460px;
  overflow-y: auto;
  .t-item {
    position: relative;
    margin-bottom: 8px;
  }
  .t-item-r {
    display: inline-block;
    min-width: 320px;
    .r-line {
      padding-bottom: 5px;
    }
  }
}
.send-good {
  max-height: 450px;
  overflow-y: auto;
}
</style>
