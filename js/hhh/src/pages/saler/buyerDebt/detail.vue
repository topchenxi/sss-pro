<template>
  <div class="detail bill-detail">
    <div class="detail-title"> <span @click="$router.go(-1)"></span>
      <p>账单明细</p>
    </div>
    <div class="detail-group">
      <div class="detail-item w100p">
        <dl class="info-item mb0">
          <dt> 账单号：</dt>
          <dd class="w200"> {{info.number}} </dd>
          <dt> 账单日期：</dt>
          <dd class="w200"> {{info.createTime | date}} </dd>
        </dl>
        <div class="line"></div>
        <dl class="info-item">
          <dt>采购商：</dt>
          <dd>
            <div v-if="info&&info.customerId">
              <p><span class="icon" :class="info.customerHasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span> <span class="icon mr5" :class="info.customerHasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span>{{info.customerCompany}} / {{info.customerTel}} </p>
            </div>
          </dd>
        </dl>
        <dl class="info-item">
          <dt> 实际付款金额：</dt>
          <dd> <span class="money">{{info.payMoney | formatMoney}}</span> 元 </dd>
        </dl>
        <dl class="info-item">
          <dt>付款凭据：</dt>
          <dd>
            <div class="imgs" v-if="info.payCredentialUrls&&info.payCredentialUrls.length > 0"> <a class="item" :href="imgPath + item" :key="item" v-lightbox="info.payCredentialUrls" v-for="(item, index) in info.payCredentialUrls"> <img :src="imgPath + item" width='86' height="86" /> </a> </div>
          </dd>
        </dl>
        <dl class="info-item">
          <dt>备注：</dt>
          <dd>{{info.remark}} </dd>
        </dl>
      </div>
    </div>
    <div class="detail-group">
      <div class="detail-item w100p">
        <p class="p10 o-money">总订单金额：<span class="money">{{info.totalMoney | formatMoney}}</span>元 <span class="mr20"></span>总滞纳金：<span class="money">{{info.lateFeesMoney | formatMoney}}</span>元</p>
        <div class="list-wrap p10">
          <div class="table-wrap bulk-wrap mb20" v-if="info.outRepos&&info.outRepos.length">
            <h6 class="h20">大货</h6>
            <table class="table">
              <colgroup>
                <!-- 出仓单号 -->
                <col width="7%">
                <!-- 订单号/扣数单号 -->
                <col width="7%">
                <!-- 订单日期/扣数单日期 -->
                <col width="7%">
                <!-- 货号 -->
                <col width="6%">
                <!-- 采购商 -->
                <col width="12%">
                <!-- 供应商 -->
                <col width="4%">
                <!-- 色号匹号数量 -->
                <col width="5%">
                <!-- 总入仓实数/采购数量 -->
                <col width="6%">
                <!-- 支付时间 -->
                <col width="8%">
                <!-- 支付方式 -->
                <col width="8%">
                <!-- 付款人 -->
                <!-- 支付金额/总费用(元) -->
                <!-- 滞纳金(元) -->
              </colgroup>
              <thead>
                <tr>
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
                  <th>订单类型</th>
                  <th>采购员/跟单员</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in info.outRepos" :key="index">
                  <!-- 出仓单号 -->
                  <td>
                    {{item.number}}
                    <el-tooltip v-if="item.billCancelRemark" effect="dark" :content="item.billCancelRemark" placement="top">
                      <span class="icon-callback"></span>
                    </el-tooltip>
                  </td>
                  <p v-if="item.delayTime > 0" class="green"> {{item.delayTime | date}}发货 </p>
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
                  <td>{{item.totalMoney | formatMoney}}</td>
                  <!-- 滞纳金 -->
                  <td>{{item.lateFeesMoney | formatMoney}}</td>
                  <!-- 订单类型 -->
                  <td>大货</td>
                  <!-- 采购员 -->
                  <td>{{item.bulk.guiderName || '--'}} / {{item.bulk.followerName || '--' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-wrap" v-if="info.cuts&&info.cuts.length">
            <h6 class="h20">剪版</h6>
            <table class="table">
              <colgroup>
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
                <col width="6%">
                <!-- 剪版员 -->
                <col width="6%">
                <!-- 订单类型 -->
              </colgroup>
              <thead>
                <tr>
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
                <template v-for="(item,index) in info.cuts">
                  <tr>
                    <!-- 订单号/扣数单号 -->
                    <td>
                      {{item.number}}
                      <el-tooltip v-if="item.billCancelRemark" effect="dark" :content="item.billCancelRemark" placement="top">
                        <span class="icon-callback"></span>
                      </el-tooltip>
                    </td>
                    <p v-if="item.delayTime > 0" class="green"> {{item.delayTime | date}}发货 </p>
                    </td>
                    <!-- 订单日期/扣数单日期 -->
                    <td>{{item.createTime | date}}</td>
                    <!-- 货号 -->
                    <td>
                      <div class="number-wrap" @click="changeShow(item)">
                        {{item.productNumbers | productNumbersFilter}}
                        <i class="el-icon-arrow-up" v-if="item.isShow"></i>
                        <i class="el-icon-arrow-down" v-if="!item.isShow"></i>
                      </div>
                    </td>
                    <!-- 采购商 -->
                    <td>{{item.customerCompany}}/{{item.customerNumber}}</td>
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
                    <td>
                      <span class="money">{{item.saleMoney | formatMoney}}</span>
                    </td>
                    <!-- 滞纳金 -->
                    <td><span class="money">{{item.lateFeesMoney | formatMoney}}</span></td>
                    <!-- 剪版员 -->
                    <td>{{item.cutterName || '--'}}</td>
                    <td>{{item.followerName || '--'}}</td>
                  </tr>
                  <tr class="number-bg" v-if="item.isShow">
                    <td colspan="2">
                      <p>采购商：{{item.customerCompany}}/{{item.customerNumber}}</p>
                      <p>供应商：{{item.shopCompany}}</p>
                      <p>支付总费用：<span class="money">{{item.totalMoney | formatMoney}}</span> 元</p>
                    </td>
                    <td colspan="10">
                      <table class="color-table">
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
      </div>
    </div>
    <lightbox></lightbox>
  </div>
</template>
<script>
import { getBillDetail } from 'src/service/saler';
import Lightbox from 'components/lightbox/lightbox';
export default {
  components: {
    Lightbox,
  },
  data() {
    return {
      imgPath: 'http://www.soouya.com',
      id: this.$route.query.id,
      info: {
        outRepos: [],
        cuts: []
      },
    };
  },
  methods: {
    handleList() {
      if (!this.info.cuts || !this.info.cuts.length) return;
      this.info.cuts.forEach(item => {
        this.$set(item, 'isShow', false);
      })
    },
    async getDetail() {
      let res = await getBillDetail(this.id);
      if (res.success !== '1') return;
      this.info = res.obj;
      this.handleList();
    },
    changeShow(item) {
      item.isShow = !item.isShow;
    }
  },
  mounted() {
    this.$store.dispatch('changeload', false);
    this.getDetail();
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
.detail .detail-group .detail-item .line {
  height: 1px;
  margin: 10px 14px 20px 14px;
  border-bottom: 1px solid #ddd;
}

.o-money {
  font-size: 16px;
  font-weight: bold;
}

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
          margin-right: 10px;
        }
        dt {
          text-align: left;
          min-width: 50px;
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
    width: 2600px;
  }
}

.color-table {
  width: 60%;
}

</style>
