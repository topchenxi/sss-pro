<template>
  <div class="oms-content money-manage-detail">
    <div class="detail">
      <div class="detail-title">
        <span @click="$router.go(-1)"></span>
        <p>详情</p>
      </div>
      <div class="detail-group mb0">
        <div class="detail-item" style="width:100%;">
          <h6>采购商资金信息</h6>
          <dl class="info-item">
            <dt>采购商/ID</dt>
            <dd>{{costomerInfo.buyerCompanyId}}</dd>
            <div @mouseover="textDialogVisible=true" style="position:relative;display:inline-block;">
              <i class="el-icon-warning"></i>
              <span>说明</span>
              <div v-show="textDialogVisible" @mouseleave="setVisibleFalse()" class="textBox">
                <li style="list-style:none; color:#696969">
                  <ul style="font-size:0.8rem;line-height:22px;">1、可用总额是指可用于支付的资金，为可用余额、可用搜芽额度和可用白条额度总计。</ul>
                  <ul style="font-size: 0.8rem;line-height:22px;">2、欠款总额是指采购商欠款，为已用搜芽额度和已用白条额度总计。</ul>
                  <ul style="font-size:0.8rem;line-height:22px;">3、已用搜芽额度/已用白条额度是指客户订单支出额度，反映的是客户当前欠款。</ul>
                  <ul style="font-size:0.8rem;line-height:22px;">4、不可用余额/不可用搜芽额度/不可用白条额度是指不能用于支付的金额。</ul>
                  <ul style="font-size:0.8rem;line-height:22px;">5、余额是可用余额和不可用余额的总计。</ul>
                  <ul style="font-size:0.8rem;line-height:22px;">6、搜芽额度/白条额度为搜芽给采购商可透支的总资金额度，不能提现。</ul>
                </li>
              </div>
            </div>
          </dl>
          <div class="table-warp m14">
            <table class="table-normal">
              <colgroup>
                <col width="10%">
                <col width="22%">
                <col width="10%">
                <col width="22%">
                <col width="10%">
                <col width="22%">
              </colgroup>
              <tbody>
                <tr>
                  <td class="ta-r">可用总额</td>
                  <td colspan="4" class="money">{{costomerInfo.available | formatMoney}}</td>
                  <td class="c999 ta-r">单位：元</td>
                </tr>
                <tr>
                  <td class="ta-r">欠款总额</td>
                  <td class="red">{{costomerInfo.debt | formatMoney}}</td>
                  <td class="ta-r">预扣总额</td>
                  <td class="red">{{costomerInfo.totalHold | formatMoney}}</td>
                  <td class="ta-r">采购商可用额度</td>
                  <td class="red">{{costomerInfo.customerRemainLine| formatMoney}}</td>
                </tr>
                <tr>
                  <td class="ta-r">余额</td>
                  <td>
                    <span class="red">{{costomerInfo.balance | formatMoney}}</span>
                    <p> (不可用余额：<span class="red">{{costomerInfo.unavailableBalance | formatMoney}}</span>)</p>
                  </td>
                  <td class="ta-r">可用余额</td>
                  <td>
                    <span class="red">  {{costomerInfo.availableBalance | formatMoney}}</span>
                    <div class="mt10">
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="ta-r">搜芽额度</td>
                  <td>
                    <span class="red">{{costomerInfo.creditLine | formatMoney}}</span>
                    <div class="mt10">
                    </div>
                  </td>
                  <td class="ta-r">可用搜芽额度
                  </td>
                  <td>
                    <span class="red">{{costomerInfo.remainLine | formatMoney}}</span>
                    <p>(不可用额度：{{costomerInfo.holdMoney | formatMoney}})</p>
                  </td>
                  <td class="ta-r">已用搜芽额度</td>
                  <td>
                    <span class="red">{{costomerInfo.usedMoney | formatMoney}}</span>
                  </td>
                </tr>
                <tr>
                  <td class="ta-r">白条额度</td>
                  <td>
                    <div v-if="costomerInfo.hasOpenedBaitiao">
                      <span class="red">{{costomerInfo.baitiaoCreditLine | formatMoney}}</span>
                      <div class="mt10">
                        <!-- <button class="btn btn-default" @click="adjustXimuMoneyVisible=true">额度调整</button> -->
                      </div>
                    </div>
                    <span v-else>
                      --
                    </span>
                  </td>
                  <td class="ta-r">可用白条额度
                  </td>
                  <td>
                    <span v-if="costomerInfo.hasOpenedBaitiao" class="red">
                      {{costomerInfo.baitiaoRemainLine | formatMoney}}
                    </span>
                    <span v-else>
                      --
                    </span>
                    <p>
                      (不可用白条额度： <span v-if="costomerInfo.hasOpenedBaitiao"> {{costomerInfo.baitiaoHoldMoney | formatMoney}} </span> <span v-else> -- </span> )
                    </p>
                  </td>
                  <td class="ta-r">已用白条额度</td>
                  <td>
                    <span v-if="costomerInfo.hasOpenedBaitiao" class="red">
                      {{costomerInfo.baitiaoUsedMoney | formatMoney}}
                    </span>
                    <span v-else>
                      --
                    </span>
                  </td>
                </tr>
                <tr>
                    <td class="ta-r">信贷额度</td>
                    <td>
                      <div v-if="costomerInfo.hasOpenedYanzhen">
                        <span class="red">{{costomerInfo.yanzhenCreditLine | formatMoney}}</span>
                        <div class="mt10">
                        </div>
                      </div>
                      <span v-else>
                        --
                      </span>
                    </td>
                    <td class="ta-r">可用信贷额度
                    </td>
                    <td>
                      <span v-if="costomerInfo.hasOpenedYanzhen" class="red">
                        {{costomerInfo.yanzhenRemainLine | formatMoney}}
                      </span>
                      <span v-else>
                        --
                      </span>
                      <p>
                        (不可用信贷额度： <span v-if="costomerInfo.hasOpenedYanzhen"> {{costomerInfo.yanzhenHoldMoney | formatMoney}} </span> <span v-else> -- </span> )
                      </p>
                    </td>
                    <td class="ta-r">已用信贷额度</td>
                    <td>
                      <span v-if="costomerInfo.hasOpenedYanzhen" class="red">
                        {{costomerInfo.yanzhenUsedMoney | formatMoney}}
                      </span>
                      <span v-else>
                        --
                      </span>
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="search-content">
      <div class="row">
        <div class="item w360">
          <input class="search-input" type="number" v-model="conditionFilter.deltaMoney" @keyup.enter.native="search" placeholder="金额">
        </div>
        <el-button @click.native="search">搜索</el-button>
        <el-button @click.native="resetSearch">重置</el-button>
      </div>
      <div class="row">
        <div class="item">
          <el-select v-model="conditionFilter.type" placeholder="全部费用类型">
            <el-option label="全部费用类型" value=""></el-option>
            <el-option label="充值" :value="1"></el-option>
            <el-option label="提现" :value="2"></el-option>
            <el-option label="支出" :value="3"></el-option>
            <el-option label="额度调整" :value="4"></el-option>
            <el-option label="还款" :value="5"></el-option>
            <el-option label="退款" :value="6"></el-option>
            <el-option label="预扣" :value="7"></el-option>
            <el-option label="预扣解除" :value="8"></el-option>
            <el-option label="转入" :value="9"></el-option>
            <el-option label="转出" :value="10"></el-option>
          </el-select>
        </div>
        <div class="item">
          <el-date-picker v-model="conditionFilter.createTimeBegin" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <div class="item">
          <el-date-picker v-model="conditionFilter.createTimeEnd" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <el-button class="fr" @click.native="exportHandle">导出</el-button>
      </div>
    </div>
    <div class="main-wrap">
      <div class="main-content style-1 " style="height:600px;">
        <div class="table-wrap mt0">
          <table class="table" v-if="result.length">
            <colgroup>
              <!-- 序号 -->
              <col width="4%">
              <!-- 时间 -->
              <col width="9%">
              <!-- 费用类型 -->
              <col width="8%">
              <!-- 交易信息 -->
              <col width="15%">
              <!-- 金额/元 -->
              <col width="8%">
              <!-- 可用余额/元 -->
              <col width="9%">
              <!-- 可用搜芽额度/元 -->
              <col width="9%">
              <!-- 可用白条额度/元 -->
              <col width="9%">
              <!-- 可用信贷额度/元 -->
              <col width="9%">
              <!-- 经办人 -->
              <col width="9%">
              <!-- 账户 -->
              <col width="7%">
            </colgroup>
            <thead>
              <tr>
                <th>序号</th>
                <th>时间</th>
                <th>费用类型</th>
                <th class="ta-l">交易信息</th>
                <th>金额/元</th>
                <th>可用余额/元</th>
                <th>可用搜芽额度/元</th>
                <th>可用白条额度/元</th>
                <th>可用信贷额度/元</th>
                <th>经办人</th>
                <th>账户</th>
                <!-- <th>备注</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for=" (item,index) in result " :key="index">
                <!-- 序号 -->
                <td>{{ index + 1 }}</td>
                <!-- 时间 -->
                <td>{{Number(item.createTime) | formatTime}}</td>
                <!-- 费用类型 -->
                <td>{{item.type | expensesType}} </td>
                <!-- 交易信息 -->
                <td class="ta-l">{{item.tradeInfo}}</td>
                <!-- 金额/元 -->
                <td :class="{'red': Number(item.deltaMoney) < 0 }"> {{Number(item.deltaMoney) | formatMoney}} </td>
                <!-- 可用余额/元 -->
                <td>{{Number(item.availableBalance) | formatMoney}} </td>
                <!-- 可用搜芽额度/元 -->
                <td>{{Number(item.remainLine) | formatMoney}} </td>
                <!-- 可用白条额度/元 -->
                <td>{{Number(item.baitiaoRemainLine) | formatMoney}} </td>
                 <!-- 可用信贷额度/元 -->
                 <td>{{Number(item.yanzhenRemainLine) | formatMoney}} </td>
                <!-- 经办人 -->
                <td>{{item.operator}} </td>
                <!-- 账户 -->
                <td>{{item.moneyType | moneyType}} </td>
              </tr>
            </tbody>
          </table>
        </div>
          <div class="empty" v-if="!result.length"></div>
      </div>
      <div class="page-wrap">
        <pagination :page="page.pageNumber" :total="page.totalCount" :render="requestList" :options="filters"></pagination>
      </div>
    </div>
    <!-- 充值 -->
    <el-dialog v-model="dialogVisible" size="tiny" title="充值" custom-class="bill-pay-money-detail" :show-close="false" :close-on-click-modal="false">
      <div class="pay-content">
        <div class="pay-item">
          <span class="pay-item-l">
            <strong class="star">*</strong>充值金额:</span>
          <span class="pay-item-r">
            <el-input v-model="foreStoreMoney.deltaMoney" type="number" style="width: 250px;"></el-input>
          </span>
        </div>
        <div class="pay-item">
          <span class="pay-item-l">
            <strong class="star">*</strong>采购商付款名称:</span>
          <span class="pay-item-r">
            <el-input v-model="foreStoreMoney.customerPaymentName" style="width: 250px;"></el-input>
          </span>
        </div>
        <div class="pay-item">
          <span class="pay-item-l">
            <strong class="star">*</strong>收款账号:</span>
          <span class="pay-item-r">
            <el-select style="width: 250px;" v-model="foreStoreMoney.collectMoneyAccount" placeholder="请选择收款账号">
              <el-option v-for="item in accountList" :label="`${item.bankName}(尾号${item.bankNumber.substring(item.bankNumber.length - 4, item.bankNumber.length)})`" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </span>
        </div>
        <div class="pay-item">
          <span class="pay-item-l">
            <strong class="star">*</strong>到账日期:</span>
          <span class="pay-item-r">
            <el-date-picker style="width: 250px;" v-model="foreStoreMoney.collectMoneyDate" type="date" placeholder="选择日期">
            </el-date-picker>
          </span>
        </div>
        <div class="pay-item">
          <span class="pay-item-l">备注:</span>
          <div style="width: 238px; height: 50px;display:inline-block;vertical-align:middle;">
            <textarea placeholder="最多输入500个字符" rows="3" style="width: 238px; height: 50px; resize: none; border: 1px solid #c0ccda;border-radius: 4px; padding: 5px;" v-model.trim="foreStoreMoney.remark"></textarea>
            <label v-show="foreStoreMoneyShow" style="margin:5px;display:inline-block;color:#f00;">最多输入500个字符</label>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click.native="clearForeStoreMoney">取 消</el-button>
        <el-button type="primary" :disabled="foreStoreMoneyStatus" @click.native="confirmPrestore">确定 </el-button>
      </div>
    </el-dialog>
    <!-- 提现 -->
    <el-dialog v-model="drawCashDialogVisible" size="tiny" title="提现" custom-class="bill-pay-money-detail" :show-close="false" :close-on-click-modal="false">
      <div class="pay-content">
        <div class="pay-item">
          <span class="pay-item-l">
            <strong class="star">*</strong>提现金额:</span>
          <span class="pay-item-r">
            <el-input v-model="drawCashMoney.deltaMoney" type="number" style="width: 250px;"></el-input>
          </span>
        </div>
        <div class="pay-item">
          <span class="pay-item-l">
            <strong class="star">*</strong>转账日期:</span>
          <span class="pay-item-r">
            <el-date-picker style="width: 250px;" v-model="drawCashMoney.transferDate" type="date" placeholder="选择日期">
            </el-date-picker>
          </span>
        </div>
        <div class="pay-item">
          <span class="pay-item-l">备注:</span>
          <div style="width: 238px; height: 50px;display:inline-block;vertical-align:middle;">
            <textarea rows="3" placeholder="最多输入500个字符" style="width: 238px; height: 50px; resize: none; border: 1px solid #c0ccda;border-radius: 4px; padding: 5px;" v-model.trim="drawCashMoney.remark"></textarea>
            <label v-show="drawCashShow" style="margin:5px;display:inline-block;color:#f00;">最多输入500个字符</label>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click.native="clearForeStoreMoney">取 消</el-button>
        <el-button type="primary" :disabled="drawCashStatus" @click.native="confirmDrawCashMoney">确定 </el-button>
      </div>
    </el-dialog>
    <!-- 调整额度 -->
    <el-dialog v-model="adjustMoneyVisible" size="tiny" title="搜芽额度调整" custom-class="bill-pay-money-detail" :show-close="false" :close-on-click-modal="false">
      <div class="pay-content">
        <div class="pay-item">
          <span class="pay-item-l">原额度:</span>
          <span class="pay-item-r">
            <strong>{{Number(costomerInfo.creditLine).toFixed(2)}}元</strong>
            </el-input>
          </span>
        </div>
        <div class="pay-item">
          <span class="pay-item-l">
            <strong class="star">*</strong>修改后额度:</span>
          <span class="pay-item-r">
            <el-input v-model="deltaMoney" type="number" style="width: 250px;"></el-input>
          </span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click.native="clearForeStoreMoney">取 消</el-button>
        <el-button type="primary" :disabled="moneyStatus" @click.native="lineAdjust">确定 </el-button>
      </div>
    </el-dialog>
    <!-- 调整白条额度 -->
    <el-dialog v-model="adjustXimuMoneyVisible" size="tiny" title="白条额度调整" custom-class="bill-pay-money-detail" :show-close="false" :close-on-click-modal="false">
      <div class="pay-content">
        <div class="pay-item">
          <span class="pay-item-l">原额度:</span>
          <span class="pay-item-r">
            <strong>{{Number(costomerInfo.baitiaoCreditLine).toFixed(2)}}元</strong>
            </el-input>
          </span>
        </div>
        <div class="pay-item">
          <span class="pay-item-l">
            <strong class="star">*</strong>修改后额度:</span>
          <span class="pay-item-r">
            <el-input v-model="adjustXimuMoney" type="number" style="width: 250px;"></el-input>
          </span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click.native="cancelAdjustXimuMoney">取 消</el-button>
        <el-button type="primary" :disabled="adjustXimuMoneyStatus" @click.native="confirmAajustXimuMoney">确定 </el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改备注" v-model="editStatus" :close-on-click-modal="false">
      <div>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="temRemark">
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearForeStoreMoney">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!--转账-->
    <el-dialog v-model="transDialogVisible" title="余额转移">
      <el-form class="confirmDialog">
        <el-form-item label="采购商/ID：" style="width: 350px;">
          <span>{{confirmTrans.buyerCompanyId}}</span>
        </el-form-item>
        <el-form-item label="可用余额：">
          <span>{{confirmTrans.availableBalance}}元</span>
        </el-form-item>
        <el-form-item label="">
          <span class="toLeft">
            <strong>*</strong>转移金额:</span>
          <el-input v-model="confirmTrans.money" style="width:250;"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="toLeft">
            <strong>*</strong>选择采购商:</span>
          <template v-if="confirmTrans.getMoneyCompany != ''">
            <span>{{confirmTrans.getMoneyCompany}}</span>
            <el-button type="primary" @click="showCompanySelectDialog()" size="mini">选择采购商</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="showCompanySelectDialog()" size="small">选择采购商</el-button>
          </template>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="confirmTrans.transferRemark" style="width:250" :rows="2" placeholder="请输入内容" @input="updateVal"></el-input>
          <p style="color:#f00; text-align:right; margin-right:10%;">{{remarkLength}}/{{remarkTotalLength}}</p>
        </el-form-item>
        <el-form-item>
          <el-button @click="transDialogVisible=false">取消</el-button>
          <el-button type="primary" @click="congfirmTransferEvent()" :disabled="unableConfirm">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="选择采购商" v-model="selectDialogVisible">
      <el-input v-model="list.keyword" type="text" style="width:250;float:left" placeholder="采购商/Id" @keydown.enter.native="searchCompany()"></el-input>
      <!-- <el-button @click="selectDialogVisible=false" style="float:left;margin-left:25%">取消</el-button> -->
      <el-button @click="searchCompany()" stylr="float:right;margin-right:25%;" type="primary">搜索(Enter)</el-button>
      <div style="margin-top:20px">
        <el-table :data="buyerCompanyList" :height="400" border>
          <el-table-column prop="company" label="采购商名称" align="center" min-width="120">
          </el-table-column>
          <el-table-column prop="number" label="采购商Id" align="center" min-width="120">
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="100">
            <template scope="scope">
              <el-button @click.native="handleSelect(scope.row)" type="primary" :disabled="scope.row.id == confirmTrans.srcCustomerAccountId">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :page="dialogPage.pageNumber" :total="dialogPage.totalCount" :pageSize="dialogPage.pageSize" :render="changePage" :options="list"></pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagination from 'components/pagination'
import {
  request,
  formatTimeString,
  getCache,
  setCache,
  newRequest
} from 'common/utils'
import allApi from 'api/buyerAccount'
export default {
  data() {
    return {
      tableHeight: 500,
      keyword: '',
      dialogVisible: false,
      drawCashDialogVisible: false,
      adjustMoneyVisible: false,
      temRemark: '',
      editStatus: false,
      temRow: {},
      foreStoreMoney: {
        remark: '',
        deltaMoney: '',
        customerPaymentName: '',
        collectMoneyDate: '',
        collectMoneyAccount: ''
      },
      drawCashMoney: {
        deltaMoney: '',
        transferDate: '',
        remark: ''
      },
      deltaMoney: '', // 额度调整
      adjustXimuMoneyVisible: false,
      adjustXimuMoney: '', // 额度调整
      adjustXimuMoneyStatus: true,
      moneyStatus: true,
      conditionFilter: {
        deltaMoney: '',
        type: '',
        createTimeBegin: '',
        createTimeEnd: ''
      },
      foreStoreMoneyStatus: true,
      foreStoreMoneyShow: false,
      drawCashStatus: true,
      drawCashShow: false,
      temCurrentRow: {},
      accountList: [],
      result: [],
      page: {
        pageNumber: 1,
        totalCount: 0
      },
      obj: {},
      costomerInfo: {},
      filters: {
        pageNumber: 1,
        pageSize: 10
      },
      fullscreenLoading: true,
      confirmTrans: {
        buyerCompanyId: '',
        availableBalance: 0,
        money: 0,
        transferRemark: '',
        srcCustomerAccountId: '',
        destCustomerAccountId: '',
        getMoneyCompany: '',
      },
      transDialogVisible: false,
      selectDialogVisible: false,
      list: {
        pageSize: 20,
        pageNumber: 1,
        keyword: '',
      },
      buyerCompanyList: [],
      dialogPage: {
        pageSize: 20,
        pageNumber: 1,
        totalCount: 0,
      },
      textDialogVisible: false,
      remarkLength: 0,
      remarkTotalLength: 500,
      unableConfirm: false,
    };
  },
  components: {
    pagination
  },
  computed: {},
  mounted() {
    this.$store.dispatch('changeload', false);
    this.tableHeight = String(document.documentElement.clientHeight - 850);
    this._time = (new Date()).getTime()
    this.requestList()
    this.getCostomerInfo()
    const accountList = getCache({ key: 'y-result' })
    if (accountList) {
      this.accountList = accountList
    } else {
      this.getAccountList()
    }
  },
  filters: {
    formateMoney(val) {
      return Number(val).toFixed(2)
    },
    formatTime(val) {
      return val != '' ? formatTimeString(val) : '--'
    },
    splitTime(val) {
      return val != '' ? formatTimeString(val) : '--'
    },
    moneyType(value) {
        switch (value) {
          case 1:
            return '余额';
          case 2:
            return '搜芽额度';
          case 3:
            return '白条额度';
          case 4:
            return '信贷额度';
          default:
            return ''
        }
    },
    expensesType(value) {
      switch (value) {
        case 0:
          return '全部';
        case 1:
          return '充值';
        case 2:
          return '提现';
        case 3:
          return '支出';
        case 4:
          return '额度调整';
        case 5:
          return '还款';
        case 6:
          return '退款';
        case 7:
          return '预扣';
        case 8:
          return '预扣解除';
        case 9:
          return '转入';
        case 10:
          return '转出';
        default:
          return '';
      }
    }
  },
  watch: {
    foreStoreMoney: {
      handler: function(val, oldVal) {
        let on = false
        for (const key of Object.keys(val)) {
          if (key != 'remark') {
            if (!val[key]) {
              on = true
            }
          }
          if (key == 'remark') {
            if (String(val[key]).length >= 500) {
              this.foreStoreMoneyShow = true
              on = true
              // this.foreStoreMoney.remark = String(val[key]).slice(0, 500)
            } else {
              this.foreStoreMoneyShow = false
            }
          }
        }
        this.foreStoreMoneyStatus = on
      },
      deep: true
    },
    drawCashMoney: {
      handler: function(val, oldVal) {
        let on = false
        for (const key of Object.keys(val)) {
          if (key == 'deltaMoney' || key == 'transferDate') {
            if (!val[key]) {
              on = true
            }
          }
          if (key == 'remark') {
            if (String(val[key]).length >= 500) {
              on = true
              this.drawCashShow = true
              // this.drawCashMoney.remark = String(val[key]).slice(0, 500)
            }
          } else {
            this.drawCashShow = false
          }
        }
        this.drawCashStatus = on
      },
      deep: true
    },
    deltaMoney: {
      handler: function(val, oldVal) {
        let on = true
        if (Number(val) >= 0 && String(val) != '') {
          on = false
        }
        this.moneyStatus = on
      },
      deep: true
    },
    adjustXimuMoney: {
      handler: function(val, oldVal) {
        let on = true
        if (Number(val) >= 0 && String(val) != '') {
          on = false
        }
        this.adjustXimuMoneyStatus = on
      },
      deep: true
    }
  },
  methods: {
    updateVal() {
      this.remarkLength = this.confirmTrans.transferRemark.length
      if (this.remarkLength > this.remarkTotalLength) {
        this.$message('备注过长')
        this.unableConfirm = true
      } else {
        this.unableConfirm = false
      }
    },
    handlefore() {
      var nameId = this.costomerInfo.buyerCompanyId;
      var name = nameId.split('/')
      this.foreStoreMoney.customerPaymentName = name[0]
    },
    setVisibleFalse() {
      this.textDialogVisible = false
    },
    enter(e) {},
    editRemark(row) {
      this.temRemark = row.remark
      this.temRow = row
      this.editStatus = true
    },
    confirmEdit() {
      const obj = {
        remark: this.temRemark,
        id: this.temRow.id
      }
      this.fullscreenLoading = true
      request({
        url: allApi.Account.CustomerAccount_updateRemark,
        data: {
          param: JSON.stringify(obj)
        },
        // 财务用的 get
        method: 'post'
      }, res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          const self = this
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              self.clearForeStoreMoney()
              self.requestList()
            }
          })
        } else {
          this.$message({
            type: 'error',
            duration: 1000,
            message: res.msg
          })
        }
      })
    },
    // 获取采购商信息
    getCostomerInfo() {
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/account/CustomerAccount/getSummary',
        data: ({ id: this.$route.query.id }),
        method: 'get'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          this.costomerInfo = res.obj
          // console.log(this.costomerInfo)
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    requestList(req) {
      this.fullscreenLoading = true
      const option = Object.assign({ _time: this._time, keyword: this.keyword, customerId: this.$route.query.id }, this.conditionFilter, this.filters, req)
      const obj = {}
      for (const key of Object.keys(option)) {
        if (option[key]) {
          if (key == 'createTimeBegin' || key == 'createTimeEnd') {
            obj[key] = (new Date(option[key])).getTime()
          } else {
            obj[key] = option[key]
          }
        }
      }
      newRequest({
        url: '/redwood/transactionrecord/list',
        method: 'get',
        data: obj
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          this.page.pageNumber = res.page.pageNumber
          this.page.pageSize = res.page.pageSize
          this.page.totalCount = res.page.totalCount
          this.filters.pageNumber = res.page.pageNumber
          this.filters.pageSize = res.page.pageSize
          this.result = res.page.result
          this.obj = res
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    search() {
      this.requestList()
      this.getCostomerInfo()
    },
    resetSearch() {
      for (const key of Object.keys(this.conditionFilter)) {
        this.conditionFilter[key] = ''
      }
      this.page.pageNumber = 1
      this.filters.pageNumber = 1
      this.filters.pageSize = 20
      this.requestList(this.filters)
    },
    // 获取账号信息
    getAccountList() {
      request({
        url: allApi.FinanceAccount.list,
        data: {},
        method: 'post'
      }).then(res => {
        if (res.success == 1) {
          this.accountList = res.result
          setCache({
            key: 'y-result',
            value: res.result
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
    clearForeStoreMoney() {
      for (const key of Object.keys(this.foreStoreMoney)) {
        this.foreStoreMoney[key] = ''
      }
      for (const key of Object.keys(this.drawCashMoney)) {
        this.drawCashMoney[key] = ''
      }
      this.dialogVisible = false
      this.drawCashDialogVisible = false
      this.adjustMoneyVisible = false
      this.editStatus = false
      this.temRemark = ''
      this.temCurrentRow = {}
      this.temRow = {}
    },
    // 提交充值
    confirmPrestore() {
      this.fullscreenLoading = true
      const obj = {
        remark: this.foreStoreMoney.remark,
        money: this.foreStoreMoney.deltaMoney,
        customerPaymentName: this.foreStoreMoney.customerPaymentName,
        collectMoneyDate: (new Date(this.foreStoreMoney.collectMoneyDate)).getTime(),
        collectMoneyAccount: this.foreStoreMoney.collectMoneyAccount,
        customerId: this.$route.query.id,
        _time: this._time
      }
      request({
        url: allApi.Account.prestore,
        data: {
          param: JSON.stringify(obj)
        },
        method: 'post'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          const self = this
          self.clearForeStoreMoney()
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              self.getCostomerInfo()
              self.requestList()
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
    // 提交提现
    confirmDrawCashMoney() {
      this.fullscreenLoading = true
      const obj = {
        remark: this.drawCashMoney.remark,
        money: this.drawCashMoney.deltaMoney,
        transferDate: (new Date(this.drawCashMoney.transferDate)).getTime(),
        customerId: this.$route.query.id,
        _time: this._time
      }
      newRequest({
        url: allApi.Account.drawCash,
        contentType: 'application/json',
        data: obj,
        method: 'post'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1 || res.success == 24000) {
          const self = this
          self.clearForeStoreMoney()
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              self.getCostomerInfo()
              self.requestList()
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
    cancelAdjustXimuMoney() {
      this.adjustXimuMoney = null
      this.adjustXimuMoneyVisible = false
    },
    // 调整白条额度
    confirmAajustXimuMoney() {
      this.fullscreenLoading = true
      const obj = {
        money: this.adjustXimuMoney,
        customerId: this.$route.query.id,
      }
      newRequest({
        url: allApi.Account.baiTiaoLineAdjust,
        contentType: 'application/json',
        data: obj,
        method: 'post'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          this.cancelAdjustXimuMoney()
          this.getCostomerInfo()
          this.requestList()
          this.$message.success(res.msg)
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1200
          })
        }
      })
    },
    // 调整搜芽额度
    lineAdjust() {
      this.fullscreenLoading = true
      const obj = {
        money: this.deltaMoney,
        customerId: this.$route.query.id,
        _time: this._time
      }
      request({
        url: allApi.Account.CustomerAccount_lineAdjust,
        data: {
          param: JSON.stringify(obj)
        },
        method: 'post'
      }).then(res => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          const self = this
          self.clearForeStoreMoney()
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
            onClose() {
              self.getCostomerInfo()
              self.requestList()
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
    back() {
      if (window.history.length != 1) {
        console.log(window.history)
        window.history.go(-1)
      } else {
        console.log('null')
        this.$router.push({ name: 'moneyManage' })
      }
    },
    exportHandle() {
      this.fullscreenLoading = true
      const option = Object.assign({ _time: this._time, keyword: this.keyword, customerId: this.$route.query.id }, this.conditionFilter, this.filters)
      const obj = {}
      for (const key of Object.keys(option)) {
        if (option[key]) {
          if (key == 'createTimeBegin' || key == 'createTimeEnd') {
            obj[key] = (new Date(option[key])).getTime()
          } else {
            obj[key] = option[key]
          }
        }
      }
      newRequest({
        url: '/redwood/transactionrecord/export',
        method: 'get',
        data: obj
      }).then((res) => {
        this.fullscreenLoading = false
        if (res.success == '1') {
          window.open('http://www.soouya.com/' + res.obj)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 转移系列操作
    showTransDialog() {
      this.confirmTrans.getMoneyCompany = ''
      this.confirmTrans.money = 0
      this.confirmTrans.transferRemark = ''
      this.confirmTrans.srcCustomerAccountId = this.$route.query.id
      newRequest({
        url: '/redwood/account/CustomerAccount/getSummary',
        method: 'get',
        data: { id: this.$route.query.id }
      }).then((res) => {
        // console.log(res)
        if (res.success == '1') {
          this.confirmTrans.buyerCompanyId = res.obj.buyerCompanyId
          this.confirmTrans.availableBalance = res.obj.availableBalance
          this.transDialogVisible = true
        } else {
          this.$message.error('加载转移模块失败')
        }
      })
      newRequest({
        url: '/redwood/sys/Buyer/list',
        method: 'get',
        data: this.list,
      }).then((response) => {
        this.buyerCompanyList = response.page.result
        this.buyerCompanyList.forEach((item) => {
          if (item.company) {
            item.value = item.company + '/' + item.number
          } else {
            item.value = item.number
          }
        })
      })
    },
    showCompanySelectDialog() {
      this.searchCompany()
      this.selectDialogVisible = true
    },
    changePage() {
      this.searchCompany()
    },
    searchCompany() {
      newRequest({
        url: '/redwood//sys/Buyer/list',
        method: 'get',
        data: this.list,
      }).then((res) => {
        if (res.success == '1') {
          this.dialogPage.pageSize = res.page.pageSize
          this.dialogPage.pageNumber = res.page.pageNumber
          this.dialogPage.totalCount = res.page.totalCount
          this.buyerCompanyList = res.page.result
        } else {
          this.$message.error('导出选择采购商模块失败')
        }
      })
    },
    handleSelect(data) {
      this.confirmTrans.destCustomerAccountId = data.id
      this.confirmTrans.getMoneyCompany = data.company + '/' + data.number
      // console.log(this.confirmTrans)
      this.selectDialogVisible = false
    },
    congfirmTransferEvent() {
      if (this.confirmTrans.destCustomerAccountId == '') {
        this.$message('请选择转移目标采购商')
      } else {
        if (!this.confirmTrans.money) {
          this.$message('请输入正确的转移金额')
        } else if (this.confirmTrans.money < 0.01) {
          this.$message('输入金额不得小于0.01')
        } else if (this.confirmTrans.money > this.confirmTrans.availableBalance) {
          this.$message('输入金额不得大于可用余额')
        } else {
          newRequest({
            url: '/redwood/account/CustomerAccount/transferAvailableBalance',
            method: 'post',
            contentType: 'application/json',
            data: this.confirmTrans
          }).then((res) => {
            if (res.success == '1') {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.transDialogVisible = false
              this._time = (new Date()).getTime()
              this.requestList()
              this.getCostomerInfo()
              const accountList = getCache({ key: 'y-result' })
              if (accountList) {
                this.accountList = accountList
              } else {
                this.getAccountList()
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      }
    },
  },
};

</script>
<style lang="scss">
.money-manage-detail {
  min-width: 900px;
  .company-list {
    overflow: hidden;
    margin: 10px 0;
    margin-left: 10px;
    width: 1300px;
    li {
      list-style: none;
      float: left;
      margin-right: 10px;
      margin-bottom: 10px;
      font-size: 20px;
      width: 250px;
      strong {
        font-size: 17px;
        color: red;
      }
    }
  }
  .money-list {
    overflow: hidden;
    margin: 10px 0;
    margin-left: 10px;
    min-width: 1300px;
    vertical-align: bottom;
    li {
      text-align: left;
      list-style: none;
      float: left;
      margin-right: 25px;
      margin-bottom: 10px;
      font-size: 15px;
      width: 25%;
      strong {
        color: red;
      }
    }
  }
  .condition {
    border-top: 2px solid #ccc;
    padding-top: 10px;
    .c-section {
      float: left;
      margin-right: 10px;
      margin-bottom: 10px;
      .c-title {
        height: 40px;
        float: left;
        line-height: 40px;
        margin-right: 10px;
      }
      .c-r-content {
        float: left;
      }
    }
  }
}

.textBox {
  text-align: left;
  border: 1px #ccc solid;
  max-width: 500px;
  width: auto;
  min-width: 300px;
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: #fff;
  opacity: 1;
  cursor: text;
  z-index: 100;
  min-height: 200px;
  padding-left: 5px;
}

.bill-pay-money-detail {
  min-width: 400px;
  .pay-content {
    min-width: 400px;
    text-align: left;
    .pay-item {
      position: relative;
      padding-bottom: 10px;
      .pay-item-l {
        width: 112px;
        display: inline-block;
        text-align: right;
        padding-right: 10px;
      }
    }
  }
}

.star {
  color: red;
}

span>strong {
  color: #f00;
}

.confirmDialog {
  margin-left: 20%;
  margin-right: 20%;
}

.toLeft {
  text-align: left;
  float: left;
  margin: 10, 0
}

</style>
