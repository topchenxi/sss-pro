<template>
  <div class="detail bill-detail">
    <div class="detail-title"> <span @click="$router.go(-1)"></span>
      <p>新增对账单</p>
    </div>
    <div class="detail-group">
      <div class="detail-item w100p">
        <dl class="info-item">
          <dt><span class="red">*</span>采购商</dt>
          <dd>
            <el-button type="primary" @click.native="selectCustomer">选择采购商</el-button>
            <div class="mt10" v-if="hadSelectCustomer&&hadSelectCustomer.id">
              <p> <span class="icon" :class="hadSelectCustomer.hasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span> <span class="icon mr5" :class="hadSelectCustomer.hasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span>{{hadSelectCustomer.company}} / {{hadSelectCustomer.tel}}</p>
            </div>
          </dd>
        </dl>
        <dl class="info-item">
          <dt><span class="red">*</span> 实际付款金额</dt>
          <dd>
            <div class="w200 mr5 el-input">
              <input v-model="params.payMoney" class="el-input__inner"> </div>元 </dd>
        </dl>
        <dl class="info-item">
          <dt><span class="red">*</span>付款凭据</dt>
          <dd>
            <div class="imgs" v-if="params.payCredentialUrls.length > 0"> <a class="item mb5" :href="imgPath + item" :key="item" v-lightbox="params.payCredentialUrls" v-for="(item, index) in params.payCredentialUrls"> <img :src="imgPath + item" width='86' height="86" /> <i class="remove el-icon-circle-close" @click="remove(index)"></i> </a> </div>
            <el-upload action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-file-list="false" class="fl" :on-success="handleSuccess" :on-error="handleError" v-if="params.payCredentialUrls.length < 9">
              <div class="icon-upload"></div>
            </el-upload>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>备注</dt>
          <dd>
            <div class="form-warp pl0">
              <textarea v-model="params.remark" maxlength="500"></textarea> <span class="font-count">{{params.remark.length}}/500</span> </div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item w100p">
        <div class="btns-group">
          <el-button type="primary" icon="plus" @click.native="selectOrder">新增订单</el-button>
          <el-button type="warning" icon="close" @click.native="deleteOrder" v-if="listOfBulk.length||listOfCut.length">删除</el-button>
          <p v-if="listOfBulk.length||listOfCut.length"> 总订单金额：<span class="red">{{params.totalMoney | formateNumber}}</span> 元 <span class="mr20"></span>总滞纳金：<span class="red">{{params.lateFeesMoney | formateNumber}}</span> 元</p>
        </div>
        <div class="list-wrap p10">
          <div class="table-wrap bulk-wrap mb20" v-if="listOfBulk.length">
            <h6 class="h20">大货({{listOfBulk.length}})</h6>
            <table class="table">
              <colgroup>
                <!-- 全选 -->
                <col width="40">
                <!-- 出仓单号 -->
                <col width="8%">
                <!-- 订单号/扣数单号 -->
                <col width="8%">
                <!-- 订单日期/扣数单日期 -->
                <col width="8%">
                <!-- 货号 -->
                <col width="8%">
                <!-- 采购商 -->
                <col width="12%">
                <!-- 供应商 -->
                <col width="5%">
                <!-- 色号匹号数量 -->
                <col width="6%">
                <!-- 总入仓实数/采购数量 -->
                <col width="8%">
                <!-- 支付时间 -->
                <col width="8%">
                <!-- 支付方式 -->
                <col width="4%">
                <!-- 付款人 -->
                <col width="4%">
                <!-- 支付金额/总费用(元) -->
                <!-- 滞纳金(元) -->
              </colgroup>
              <thead>
                <tr>
                  <th>
                    <el-checkbox v-model="checkAllOfBulk" @change="bulkCheckAllChange"></el-checkbox>
                  </th>
                  <th>出仓单号</th>
                  <th>订单号/扣数单号</th>
                  <th>订单日期/扣数单日期</th>
                  <th>货号</th>
                  <th>采购商</th>
                  <th>供应商</th>
                  <th>色号匹号数量</th>
                  <th>总入仓实数/采购数量</th>
                  <th>支付时间</th>
                  <th>支付方式</th>
                  <th>付款人</th>
                  <th>支付金额/总费用(元)</th>
                  <th>滞纳金(元)</th>
                  <th>采购员/跟单员</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in listOfBulk" :key="index" v-if="item.bulk">
                  <!-- 选择 -->
                  <td>
                    <el-checkbox v-model="item.checked"></el-checkbox>
                  </td>
                  <!-- 出仓单号 -->
                  <td>{{item.number}}
                    <el-tooltip v-if="item.billCancelRemark" effect="dark" :content="item.billCancelRemark" placement="top">
                      <span class="icon-callback"></span>
                    </el-tooltip>
                  </td>
                  <!-- 订单号/扣数单号 -->
                  <td>
                    <p :class="{'green':item.isOutRepo==0}">{{item.bulk.number}}</p>
                  </td>
                  <!-- 订单日期/扣数单日期 -->
                  <td>
                    <p v-if="item.isOutRepo==1">{{item.bulk.createTime | date}}</p>
                    <p v-if="item.isOutRepo==0">{{item.createTime | date}}</p>
                  </td>
                  <!-- 货号 -->
                  <td>{{item.bulk.productNumber}}</td>
                  <!-- 采购商 -->
                  <td> <span class="icon" :class="item.bulk.customerHasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span> <span class="icon mr5" :class="item.bulk.customerHasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span> {{item.bulk.customerCompany || '--'}} / {{item.bulk.customerNumber || '--'}}</td>
                  <!-- 供应商 -->
                  <td>{{item.bulk.shopCompany || '--'}}</td>
                  <!-- 色号匹号数量 -->
                  <td>{{item.num}}</td>
                  <!-- 总入仓实数/采购数量 -->
                  <td>
                    <p :class="{'green':item.isOutRepo==0}">{{item.quantity}}{{item.quantityUnit}}</p>
                  </td>
                  <!-- 支付时间 -->
                  <td>
                    <p v-if="item.isOutRepo==1&&item.bulk.type==3">{{item.payTime | date}}</p>
                    <p v-else>--</p>
                  </td>
                  <!-- 支付方式 -->
                  <td>
                    <p v-if="item.isOutRepo==1&&item.bulk.type==3">{{item.creditType | creditTypeFilter}}</p>
                    <p v-else>--</p>
                  </td>
                  <!-- 付款人 -->
                  <td>
                    <p v-if="item.isOutRepo==1&&item.bulk.type==3">{{item.payer | payerFilter}}</p>
                    <p v-else>--</p>
                  </td>
                  <!-- 支付金额/总费用 -->
                  <td> <span class="money"> {{item.totalMoney | formatMoney}}</span> </td>
                  <!-- 滞纳金 -->
                  <td> <span class="money"> {{item.lateFeesMoney | formatMoney}}</span> </td>
                  <td> {{item.bulk.guiderName || '--' }} / {{item.bulk.followerName || '--' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-wrap" v-if="listOfCut.length">
            <h6 class="h20">剪版({{listOfCut.length}})</h6>
            <table class="table">
              <colgroup>
                <!-- 全选 -->
                <col width="40">
                <!-- 订单号/扣数单号 -->
                <col width="9%">
                <!-- 订单日期/扣数单日期 -->
                <col width="9%">
                <!-- 货号 -->
                <col width="9%">
                <!-- 采购商 -->
                <col width="10%">
                <!-- 供应商 -->
                <col width="10%">
                <!-- 支付时间 -->
                <col width="10%">
                <!-- 支付方式 -->
                <col width="8%">
                <!-- 付款人 -->
                <col width="6%">
                <!-- 支付金额/总费用 -->
                <col width="9%">
                <!-- 滞纳金(元) -->
                <col width="6%"> </colgroup>
              <thead>
                <tr>
                  <th>
                    <el-checkbox v-model="checkAllOfCut" @change="cutCheckAllChange"></el-checkbox>
                  </th>
                  <th>订单号</th>
                  <th>订单日期</th>
                  <th>货号</th>
                  <th>采购商</th>
                  <th>供应商</th>
                  <th>支付时间</th>
                  <th>支付方式</th>
                  <th>付款人</th>
                  <th>支付金额/总费用(元)</th>
                  <th>滞纳金(元)</th>
                  <th>剪版员</th>
                  <th>跟单员</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item,index) in listOfCut">
                  <tr>
                    <!-- 选择 -->
                    <td>
                      <el-checkbox v-model="item.checked"></el-checkbox>
                    </td>
                    <!-- 订单号/扣数单号 -->
                    <td> {{item.number}}
                      <el-tooltip v-if="item.billCancelRemark" effect="dark" :content="item.billCancelRemark" placement="top">
                        <span class="icon-callback"></span>
                      </el-tooltip>
                      <p v-if="item.delayTime > 0" class="green"> {{item.delayTime | date}}发货 </p>
                    </td>
                    <!-- 订单日期/扣数单日期 -->
                    <td>{{item.createTime | date}}</td>
                    <!-- 货号 -->
                    <td>
                      <div class="number-wrap" @click="changeShow(item)"> {{item.productNumbers | productNumbersFilter}} <i class="el-icon-arrow-up" v-if="item.isShow"></i> <i class="el-icon-arrow-down" v-if="!item.isShow"></i> </div>
                    </td>
                    <!-- 采购商 -->
                    <td class="ta-l">{{item.customerCompany}}/{{item.customerNumber}}</td>
                    <!-- 供应商 -->
                    <td>{{item.shopCompany}}</td>
                    <td>
                      <p v-if="item.guiderId">{{item.payTime | date}} </p>
                      <p v-else>--</p>
                    </td>
                    <!-- 支付方式 -->
                    <td>
                      <p v-if="item.guiderId">{{item.creditType | cutCreditTypeFilter}} </p>
                      <p v-else>--</p>
                    </td>
                    <!-- 付款人 -->
                    <td>
                      <p v-if="item.guiderId">采购支付</p>
                      <p v-else>--</p>
                    </td>
                    <!-- 支付金额/总费用 -->
                    <td> <span class="money">{{item.totalMoney | formatMoney}}</span> </td>
                    <!-- 滞纳金 -->
                    <td><span class="money">{{item.lateFeesMoney | formatMoney}}</span></td>
                    <!-- 剪版员 -->
                    <td>{{item.cutterName || '--'}}</td>
                    <td>{{item.followerName || '--'}}</td>
                  </tr>
                  <tr class="number-bg" v-if="item.isShow">
                    <td colspan="3">
                      <p>采购商：{{item.customerCompany}}/{{item.customerNumber}}</p>
                      <p>供应商：{{item.shopCompany}}</p>
                      <p>支付总费用：<span class="money">{{item.totalMoney | formatMoney}}</span> 元</p>
                    </td>
                    <td colspan="10">
                      <table class="color-table" style="width:60%;">
                        <colgroup>
                          <col width="33%">
                          <col width="33%">
                          <col width="33%"> </colgroup>
                        <thead>
                          <tr>
                            <th>货号</th>
                            <th>色号匹号数量</th>
                            <th>总入仓实数/采购数量</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(numItem,numIndex) in item.productNumbers">
                            <td>{{numItem.number}}</td>
                            <td>{{numItem.colors.length}}个色号</td>
                            <td>{{numItem.colors | colorsFilter}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="btns-group m20 ta-c">
          <el-button type="primary" @click.native="save">提交</el-button>
          <el-button type="default" @click.native="close">关闭</el-button>
        </div>
      </div>
    </div>
    <lightbox></lightbox>
    <selectCustomer v-if="customerFlag" :customerInfo="hadSelectCustomer" :showFlag="customerFlag" @changeCustomer="changeCustomer" @closeMember="closeMember"></selectCustomer>
    <selectOrder v-if="orderFlag" :customerId="hadSelectCustomer.id" :hadSelectList="hadSelectList" :orderFlag="orderFlag" @changeOrder="changeOrder" @closeOrder="closeOrder"></selectOrder>
  </div>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox';
import selectCustomer from './dialogs/selectCustomer.vue';
import selectOrder from './dialogs/selectOrder.vue';
import { saveBill, getDebtList, getCustomerList } from 'src/service/saler';
export default {
  components: {
    Lightbox,
    selectCustomer,
    selectOrder,
  },
  data() {
    return {
      customerFlag: false,
      orderFlag: false,
      imgPath: 'http://www.soouya.com',
      checkAllOfBulk: false,
      checkAllOfCut: false,
      // 已选项
      hadSelectCustomer: {},
      hadSelectList: {
        bulk: [],
        cut: []
      },
      limitTotal: 50,
      numbers: this.$route.query.numbers,
      numbersOfCut: this.$route.query.numbersOfCut,
      // 导入excel 的参数
      listParams: {
        key: '',
        type: '1',
        _function: 'toBill',
        numbers: '',
        createTimeBegin: '',
        createTimeEnd: '',
        pageSize: 100,
        pageNumber: 1,
      },
      customerNumber: this.$route.query.customerNumber,
      // 保存 参数
      params: {
        'customerId': '',
        'customerCompany': '',
        'customerTel': '',
        'customerNumber': '',
        'customerHasOpenedBaitiao': 0,
        'customerHasOpenedYanzhen': 0,
        'payCredentialUrls': [],
        'payMoney': '',
        // 传递时删掉
        'totalMoney': 0,
        'lateFeesMoney': 0,
        'remark': '',
        'outRepoIds': [],
        'cutIds': []
      },
      listOfBulk: [],
      listOfCut: [],
    };
  },
  methods: {
    bulkCheckAllChange() {
      this.listOfBulk.forEach(item => {
        item.checked = this.checkAllOfBulk
      })
    },
    cutCheckAllChange() {
      this.listOfCut.forEach(item => {
        item.checked = this.checkAllOfCut
      })
    },
    async save() {
      if (!this.validate()) return;
      let params = Object.assign({}, this.params);
      Object.assign(params, {
        'customerId': this.hadSelectCustomer.id,
        'customerCompany': this.hadSelectCustomer.company,
        'customerTel': this.hadSelectCustomer.tel,
        'customerNumber': this.hadSelectCustomer.number,
        'customerHasOpenedBaitiao': this.hadSelectCustomer.hasOpenedBaitiao,
        'customerHasOpenedYanzhen': this.hadSelectCustomer.hasOpenedYanzhen,
      });
      params.outRepoIds = this.listOfBulk.map(item => item.id);
      params.cutIds = this.listOfCut.map(item => item.id);
      params.payCredentialUrls = params.payCredentialUrls;
      delete params.totalMoney;
      delete params.lateFeesMoney;
      this.$store.dispatch('changeload', true);
      let res = await saveBill(params);
      this.$store.dispatch('changeload', false);
      if (res.success !== '1') return;
      this.$message.success(res.msg);
      this.$router.push({ name: 'debtOfSubmit' })
    },
    async close() {
      try {
        let res = await this.$confirm('请确认是否关闭页面?', '提示');
        if (res === 'confirm') {
          this.$router.go(-1);
        }
      } catch (e) {
        console.log(e);
      }
    },
    changeShow(item) {
      item.isShow = !item.isShow;
    },
    selectCustomer() {
      this.customerFlag = true;
    },
    changeCustomer(data) {
      this.hadSelectCustomer = data;
      this.listOfBulk = [];
      this.listOfCut = [];
      this.customerFlag = false;
    },
    closeMember() {
      this.customerFlag = false;
    },
    // 新加订单
    selectOrder() {
      if (!this.hadSelectCustomer.id) {
        this.$message.error('请先选择采购商');
        return;
      }
      console.log(this.listOfBulk.length, this.listOfCut.length)
      if (this.listOfBulk.length + this.listOfCut.length > this.limitTotal) {
        this.$message.error(`账单最多支持${this.limitTotal}条数据`);
        return;
      }
      this.hadSelectList.bulk = [...this.listOfBulk];
      this.hadSelectList.cut = [...this.listOfCut];
      this.orderFlag = true;
    },
    closeOrder() {
      this.orderFlag = false;
    },
    // 删掉订单
    async deleteOrder() {
      let res = await this.$confirm('请确认是否删除?', '提示');
      if (res !== 'confirm') return;
      let tmpBulk = [];
      this.listOfBulk.forEach(item => {
        if (!item.checked) tmpBulk.push(item);
      })
      this.listOfBulk = tmpBulk;
      let tmpCut = [];
      this.listOfCut.forEach(item => {
        if (!item.checked) tmpCut.push(item);
      })
      this.listOfCut = tmpCut;
      this.calTotalMoney();
    },
    buildBulkList(srcList) {
      this.checkAllOfBulk = false;
      srcList.forEach(item => {
        if (!this.listOfBulk.find(n => n.id == item.id)) {
          this.listOfBulk.push(item);
        }
      })
      this.listOfBulk.forEach(item => {
        item.checked = false;
      })
    },
    buildCutList(srcList) {
      this.checkAllOfCut = false;
      srcList.forEach(item => {
        if (!this.listOfCut.find(n => n.id == item.id)) {
          this.listOfCut.push(item);
        }
      })
      this.listOfCut.forEach(item => {
        item.checked = false;
      })
    },
    changeOrder(data) {
      if (data.items.length > this.limitTotal) {
        this.$message.error(`账单最多支持${this.limitTotal}条数据`);
        return;
      }
      this.orderFlag = false;
      data.type == 1 ? this.buildBulkList(data.items) : this.buildCutList(data.items);
      this.calTotalMoney();
    },
    calTotalMoney() {
      this.params.totalMoney = 0;
      this.params.lateFeesMoney = 0;
      let [sum, lateFeesMoneySum] = [0, 0];
      this.listOfBulk.forEach(item => {
        sum += item.totalMoney;
        if (item.lateFeesMoney >= 0) lateFeesMoneySum += item.lateFeesMoney;
      })
      this.listOfCut.forEach(item => {
        sum += item.totalMoney;
        if (item.lateFeesMoney >= 0) lateFeesMoneySum += item.lateFeesMoney;
      })
      this.params.totalMoney = sum;
      this.params.lateFeesMoney = lateFeesMoneySum;
    },
    remove(index) {
      this.params.payCredentialUrls.splice(index, 1);
    },
    handleSuccess(file) {
      this.params.payCredentialUrls.push(file.imgUrl);
    },
    handleError() {
      // this.$store.dispatch('changeload', false)
    },
    validate() {
      // 必填项
      if (!this.hadSelectCustomer.id) {
        this.$message.error('请先选择采购商');
        return false;
      }
      // 必填项
      if (!this.params.payMoney) {
        this.$message.error('请先填写实际付款金额');
        return false;
      }
      // 必填项
      if (!this.params.payCredentialUrls.length) {
        this.$message.error('请先填写付款凭据');
        return false;
      }
      // 必填项
      if (!this.listOfBulk.length && !this.listOfCut.length) {
        this.$message.error('请先选择订单');
        return false;
      }
      // 提交规则
      if (!/^[-]?[0-9]*\.?[0-9]+(eE?[0-9]+)?$/.test(this.params.payMoney)) {
        this.$message.error('请输入正确格式的付款金额');
        return false;
      }
      if (this.params.totalMoney < 0) {
        this.$message.error('总订单金额不能小于0，请重新选择订单');
        return false;
      }
      if (this.params.payMoney <= 0 || this.params.payMoney < this.params.totalMoney - 10) {
        this.$message.error('实际付款金额必须大于等于（总订单金额-10）且大于0');
        return false;
      }
      if (this.listOfBulk.length + this.listOfCut.length > this.limitTotal) {
        this.$message.error(`账单最多支持${this.limitTotal}条数据`);
        return false;
      }
      return true;
    },
    handleList() {
      if (this.params.type != '2') return;
      this.list.forEach(item => {
        this.$set(item, 'isShow', false);
      })
    },
    async getBulkList() {
      this.listParams.type = '1';
      this.listParams.numbers = this.numbers;
      let res = await getDebtList(this.listParams);
      if (res.success !== '1') return;
      this.listOfBulk = res.page.result;
      this.listOfBulk.forEach(item => {
        this.$set(item, 'checked', false);
      })
      this.calTotalMoney();
    },
    async getCutList() {
      this.listParams.type = '2';
      this.listParams.numbers = this.numbersOfCut;
      let res = await getDebtList(this.listParams);
      if (res.success !== '1') return;
      this.listOfCut = res.page.result;
      this.listOfCut.forEach(item => {
        this.$set(item, 'checked', false);
        this.$set(item, 'isShow', false);
      })
      this.calTotalMoney();
    },
    async getCustomerList() {
      let res = await getCustomerList({ 'number': this.customerNumber });
      if (res.success !== '1') return;
      this.hadSelectCustomer = res.page.result[0];
    },
  },
  mounted() {
    this.$store.dispatch('changeload', false);
    this.numbers && this.getBulkList();
    this.numbersOfCut && this.getCutList();
    this.customerNumber && this.getCustomerList();
  },
  filters: {
    cutCreditTypeFilter(value) {
      switch ('' + value) {
        case '1':
          return '垫付支付';
        case '3':
          return '余额支付';
        default:
          return '--';
      }
    },
    payerFilter(value) {
      switch ('' + value) {
        case '0':
          return '客户支付';
        case '1':
          return '采购支付';
        default:
          return '--';
      }
    },
    productNumbersFilter(value) {
      if (!value || !value.length) return '';
      return value.map(item => item.number).join(' , ');
    },
    colorsFilter(value) {
      if (!value || !value.length) return '';
      let sum = 0;
      value.forEach(item => { sum += Number(item.followerQuantity) })
      return sum.toFixed(2) + value[0].followerQuantityUnit;
    }
  }
}

</script>
<style lang="scss" scoped>
.detail .detail-group .detail-item .h20 {
  height: 20px;
  line-height: 20px;
}

.bill-detail {
  .detail-group {

    .detail-item {
      padding-top: 20px;
      .info-item {
        margin-bottom: 20px;
        dt,
        dd {
          color: #333;
        }
        dt {
          text-align: right;
        }
      }
    }
  }
}

.imgs {
  float: left;

  img {
    margin-right: 10px;
  }
  .item {
    float: left;
    position: relative;
  }

  .remove {
    position: absolute;
    top: -8px;
    right: 0px;
    cursor: pointer;
    color: #999;
    font-size: 16px;
    background-color: #fff;
    border-radius: 50%;
  }
}

.btns-group {
  padding: 0 10px;
  position: relative;

  p {
    position: absolute;
    top: 0;
    right: 20px;
    height: 32px;
    line-height: 32px;
  }
}

.bulk-wrap {
  overflow-x: auto;
  .table {
    width: 2400px;
  }
}

</style>
