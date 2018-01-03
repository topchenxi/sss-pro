<template>
  <div class="printDetail">
    <div v-loading.fullscreen="fullscreenLoading"></div>
    <div class="container-detail">
        <div class="content-header">
          <div class="logo">
              <img src="./img/soouyalogo@2x.png" />
              <h1 class="title">付款申请单</h1>
              <a class="print-btn" href="javascript: window.print();">打印</a>
          </div>
        </div>
        <div class="content-table">
          <!-- 服务单 -->
            <table v-if ='resData.type == 1'>
                <tbody>
                        <tr>
                          <td colspan="10">
                            <div class="fl"><span class="text-green">订单编号：</span>{{ resData.serviceNumber }} <span class='icon-shu'>|</span> 服务单</div>
                            <!-- <div class="fl"><span class="text-green" style='margin-left: 25px;'>成本价：</span>￥ {{ resData.costMoney }} </div> -->
                            <div class="fr">跟单员：{{ resData.realName }} | 订单状态：{{ resData.statusShortDescr }}</div>
                          </td>
                        </tr>
                        <tr>
                            <td class='td-title'>类别</td>
                            <td class='td-title'>提交时间</td>
                            <td class='td-title'>销售货款</td>
                            <td class='td-title' colspan="2">收款明细</td>
                            <td class='td-title'>成本货款</td>
                            <td class='td-title' colspan="2">付款明细</td>
                            <td class='td-title' colspan="2">通知付款备注</td>
                            <!-- <td class='td-title'>垫付</td> -->
                        </tr>
                        <template v-if="resData.category == 'all-all'">
                        <!-- 现货 -->
                          <template v-if="resData.productSource == 0">
                            <tr>
                              <td rowspan="4">现货</td>
                              <td rowspan="4">{{ resData.fullTime }}</td>
                              <td rowspan="4" class="text-red">￥{{ resData.total }}</td>
                              <td class='td-title'>服务费</td>
                              <td class="text-red">￥{{ resData.serviceMoney }}</td>
                              <td class="text-red" rowspan="4">￥{{ resData.costMoney }}</td>
                              <td class='td-title'>税前成本货款</td>
                              <td class="text-red">￥{{ resData.sellerInvoiceStatus == 1 ? resData.costMoneyOffTax : resData.costMoney }}</td>
                              <td rowspan="4" colspan="2"> {{resData.remark ? resData.remark : '√'}} </td>
                              <!-- <td rowspan="4"><span v-if="resData.payType == 0">{{resData.remark ? resData.remark : '√'}}</span></td> -->
                            </tr>
                            <tr>
                                <td class='td-title'>采购商税费</td>
                                <td class='text-red'>￥{{ resData.taxMoney }}</td>
                                <td class='td-title'>供应商税费</td>
                                <td class='text-red'>￥{{ resData.sellerTaxMoney }}</td>
                            </tr>
                            <tr>
                                <td class='td-title'>采购商税点</td>
                                <td class='text-red'>{{ resData.taxPoint }} %</td>
                                <td class='td-title'>供应商税点</td>
                                <td class='text-red'><span v-if="resData.sellerInvoiceStatus">{{ resData.sellerTaxPoint }}%</span><span v-else>0%</span></td>
                            </tr>
                            <tr>
                                <td class='td-title'>服务费单价</td>
                                <td class='text-red'>￥{{ resData.servicePrice }}</td>
                                <td class='td-title'>-</td>
                                <td>-</td>
                            </tr>
                          </template>
                      <!-- 现货 end-->
                      <!-- fundType 2 订金  3 尾款  5 全款  -->
                          <!-- 订货 -->
                          <template v-if="resData.productSource == 1">
                            <template v-if="resData.fundType == 3">
                              <tr>
                                <td rowspan="6">订货</td>
                                <td rowspan="6">{{ resData.finalTime }}</td>
                                <td rowspan="6" class="text-red">￥{{ resData.saleMoney }}</td>
                                <td class='td-title'>定金</td>
                                <td class="text-red">￥{{ resData.earnestMoney }}</td>
                                <td class="text-red" rowspan="6">￥{{ resData.costMoney }}</td>
                                <td class='td-title'>定金</td>
                                <td class="text-red">￥{{ resData.earnestMoney }}</td>
                                <td rowspan="6" colspan="2"> {{resData.remark ? resData.remark : '√'}} </td>
                                <!-- <td rowspan="6"><span v-if="resData.payType == 0">{{resData.remark ? resData.remark : '√'}}</span></td> -->
                                <!-- <td rowspan="5">{{ resData.remark }}</td> -->
                              </tr>
                              <tr>
                                  <td class='td-title'>尾款（收）</td>
                                  <td class='text-red'>￥{{ resData.finalMoney }}</td>
                                  <td class='td-title'>尾款（付）</td>
                                  <td class='text-red'>￥{{ resData.weikuangfu}}</td>
                              </tr>
                              <tr>
                                  <td class='td-title'>服务费</td>
                                  <td class='text-red'>￥{{ resData.serviceMoney }}</td>
                                  <td class='td-title'>税前成本货款</td>
                                  <td class='text-red'>￥{{ resData.sellerInvoiceStatus == 1 ? resData.costMoneyOffTax : resData.costMoney }}</td>
                              </tr>
                              <tr>
                                  <td class='td-title'>采购商税费</td>
                                  <td class='text-red'>￥{{ resData.taxMoney }}</td>
                                  <td class='td-title'>供应商税费</td>
                                  <td class='text-red'>￥{{ resData.sellerTaxMoney }}</td>
                              </tr>
                              <tr>
                                  <td class='td-title'>采购商税点</td>
                                  <td class='text-red'>{{ resData.taxPoint }}%</td>
                                  <td class='td-title'>供应商税点</td>
                                  <td class='text-red'><span v-if="resData.sellerInvoiceStatus">{{ resData.sellerTaxPoint }}%</span><span v-else>0%</span></td>
                              </tr>
                              <tr>
                                  <td class='td-title'>服务费单价</td>
                                  <td class='text-red'>￥{{ resData.servicePrice }}</td>
                                  <td class='td-title'>-</td>
                                  <td >-</td>
                              </tr>
                            </template>
                            <tr v-if="resData.fundType == 2">
                              <td>订货</td>
                              <td width='150'>{{ resData.earnestTime }}</td>
                              <td class="text-red">￥{{ resData.saleMoney }}</td>
                              <td class='td-title'>定金</td>
                              <td class="text-red">￥{{ resData.earnestMoney }}</td>
                              <td class="text-red">￥{{ resData.costMoney }}</td>
                              <td class='td-title'>定金</td>
                              <td class="text-red">￥{{ resData.earnestMoney }}</td>
                              <td colspan="2">{{resData.remark ? resData.remark : '√'}}</td>
                            </tr>
                          </template>

                      </template>
                    <!-- 流水订单 -->
                    <template v-if="resData.category == 'dhls-all'">
                    <tr>
                      <td rowspan="3">现货</td>
                      <td rowspan="3">{{ resData.fullTime }}</td>
                      <td rowspan="3" class="text-red">￥{{ resData.total }}</td>
                      <!-- <td class='td-title'>货款</td>
                      <td class="text-red">￥{{ resData.saleMoney }}</td> -->
                      <td class='td-title'>服务费</td>
                      <td class='text-red'>￥{{ resData.serviceMoney }}</td>
                      <td rowspan="3"><span v-if="resData.fullCashStatus">√</span></td>
                      <td rowspan="3"><span v-if="resData.fullAdvanceStatus">√</span></td>
                      <!-- <td rowspan="3">{{ resData.remark }}</td> -->
                    </tr>
                    <tr>
                        <td class='td-title'>服务费</td>
                        <td class='text-red'>￥{{ resData.serviceMoney }}</td>
                    </tr>
                    <tr>
                        <td class='td-title'>税款</td>
                        <td class='text-red'>￥{{ resData.taxMoney }}</td>
                    </tr>
                  </template>
                    <!-- 流水订单 end -->
                    <tr>
                        <td class='text-green' colspan="2">采购商</td>
                        <td class='text-green' colspan="8">供应商</td>
                    </tr>
                    <tr>
                        <td class='td-title' colspan="2">采购商名称</td>
                        <td class='td-title'>供应商名称</td>
                        <td class='td-title'>银行卡户名</td>
                        <td class='td-title'>银行卡名称</td>
                        <td class='td-title'>所属支行</td>
                        <td class='td-title' colspan="4">银行卡卡号</td>
                    </tr>
                    <tr>
                        <td colspan="2">{{ resData.company }}</td>
                        <td>{{ resData.sellerCompany }}</td>
                        <td>{{ resData.replyAccountType == 1 ? resData.replyAccountCompany  : resData.replyAccountUser }}</td>
                        <td>{{ resData.replyAccountBank }}</td>
                        <td>{{ resData.replyAccountBranch }}</td>
                        <td colspan="4">{{ resData.replyAccountNumber }}</td>
                    </tr>
                    <tr>
                        <td colspan="4" class='td-title'>跟单员备注</td>
                        <td colspan="4" class='td-title'>买货员备注</td>
                        <td class='td-title'>采购商ID</td>
                        <td class='td-title'>供应商ID</td>
                    </tr>
                    <tr>
                        <td colspan="4">{{ resData.leaveMessage || '无'}}</td>
                        <td colspan="4">{{ resData.sellerMessage || '无'}}</td>
                        <td class='td-title'>{{resData.buyerNumber}}</td>
                        <td class='td-title'>{{resData.sellerNumber}}</td>
                    </tr>
                </tbody>
            </table>
            <!-- 贸易单 -->
            <table v-else>
                <tbody>
                        <tr>
                          <td colspan="10">
                            <div class="fl"><span class="text-green">订单编号：</span>{{ resData.serviceNumber }} <span class='icon-shu'>|</span>贸易单</div>
                            <!-- <div class="fl"><span class="text-green" style='margin-left: 25px;'>成本价：</span>￥ {{ resData.costMoney }} </div> -->
                            <div class="fr">跟单员：{{ resData.realName }} | 订单状态：{{ resData.statusShortDescr }}</div>
                          </td>
                        </tr>
                        <tr>
                            <td class='td-title'>类别</td>
                            <td class='td-title'>提交时间</td>
                            <td class='td-title'>销售货款</td>
                            <td class='td-title' colspan="2">收款明细</td>
                            <td class='td-title'>成本货款</td>
                            <td class='td-title' colspan="2">付款明细</td>
                            <td class='td-title' colspan="2">通知付款备注</td>
                            <!-- <td class='td-title'>垫付</td> -->
                        </tr>
                        <template v-if="resData.category == 'all-all'">
                        <!-- 现货 -->
                          <template v-if="resData.productSource == 0">
                            <tr>
                              <td rowspan="3">现货</td>
                              <td rowspan="3">{{ resData.fullTime }}</td>
                              <td rowspan="3" class="text-red">￥{{ resData.total }}</td>
                              <td class='td-title'>采购商税费</td>
                              <td class='text-red'>￥{{ resData.taxMoney }}</td>
                              <td class="text-red" rowspan="3">￥{{ resData.costMoney }}</td>
                              <td class='td-title'>税前成本货款</td>
                              <td class="text-red">￥{{ resData.sellerInvoiceStatus == 1 ? resData.costMoneyOffTax : resData.costMoney }}</td>
                              <td rowspan="3" colspan="2"> {{resData.remark ? resData.remark : '√'}} </td>
                              <!-- <td rowspan="3"><span v-if="resData.payType == 0">{{resData.remark ? resData.remark : '√'}}</span></td> -->
                            </tr>
                            <tr>
                              <td class='td-title'>采购商税点</td>
                              <td class='text-red'>{{ resData.taxPoint }} %</td>
                                <td class='td-title'>供应商税费</td>
                                <td class='text-red'>￥{{ resData.sellerTaxMoney }}</td>
                            </tr>
                            <tr>
                                <td class='td-title'>-</td>
                                <td class='text-red'>-</td>
                                <td class='td-title'>供应商税点</td>
                                <td class='text-red'><span v-if="resData.sellerInvoiceStatus">{{ resData.sellerTaxPoint }}%</span><span v-else>0%</span></td>
                            </tr>
                          </template>
                      <!-- 现货 end-->
                           <!-- fundType 2 订金  3 尾款  5 全款  -->
                          <!-- 订货 -->
                          <template v-if="resData.productSource == 1">
                            <template v-if="resData.fundType == 3">
                              <tr>
                                <td rowspan="5">订货</td>
                                <td rowspan="5">{{ resData.finalTime }}</td>
                                <td rowspan="5" class="text-red">￥{{ resData.total }}</td>
                                <td class='td-title'>定金</td>
                                <td class="text-red">￥{{ resData.earnestMoney }}</td>
                                <td class="text-red" rowspan="5">￥{{ resData.costMoney }}</td>
                                <td class='td-title'>定金</td>
                                <td class="text-red">￥{{ resData.earnestMoney }}</td>
                                <td rowspan="5" colspan="2">{{resData.remark ? resData.remark : '√'}}</td>
                                <!-- <td rowspan="5"><span v-if="resData.payType == 0">{{resData.remark ? resData.remark : '√'}}</span></td> -->
                                <!-- <td rowspan="5">{{ resData.remark }}</td> -->
                              </tr>
                              <tr>
                                  <td class='td-title'>尾款（收）</td>
                                  <td class='text-red'>￥{{ resData.finalMoney }}</td>
                                  <td class='td-title'>尾款（付）</td>
                                  <td class='text-red'>￥{{ resData.weikuangfu }}</td>
                              </tr>
                              <tr>
                                <td class='td-title'>采购商税费</td>
                                <td class='text-red'>￥{{ resData.taxMoney }}</td>
                                  <td class='td-title'>税前成本货款</td>
                                  <td class='text-red'>￥{{ resData.sellerInvoiceStatus == 1 ? resData.costMoneyOffTax : resData.costMoney }}</td>
                              </tr>
                              <tr>
                                  <td class='td-title'>采购商税点</td>
                                  <td class='text-red'>{{ resData.taxPoint }}%</td>
                                  <td class='td-title'>供应商税费</td>
                                  <td class='text-red'>￥{{ resData.sellerTaxMoney }}</td>
                              </tr>
                              <tr>
                                  <td class='td-title'>-</td>
                                  <td class='text-red'>-</td>
                                  <td class='td-title'>供应商税点</td>
                                  <td class='text-red'><span v-if="resData.sellerInvoiceStatus">{{ resData.sellerTaxPoint }}%</span><span v-else>0%</span></td>
                              </tr>
                            </template>
                            <tr v-if="resData.fundType == 2">
                              <td>订货</td>
                              <td width='150'>{{ resData.earnestTime }}</td>
                              <td class="text-red">￥{{ resData.total }}</td>
                              <td class='td-title'>定金</td>
                              <td class="text-red">￥{{ resData.earnestMoney }}</td>
                              <td class="text-red">￥{{ resData.costMoney }}</td>
                              <td class='td-title'>定金</td>
                              <td class="text-red">￥{{ resData.earnestMoney }}</td>
                              <td colspan="2">{{resData.remark ? resData.remark : '√'}}</td>
                              <!-- <td><span v-if="resData.payType == 0">{{resData.remark ? resData.remark : '√'}}</span></td> -->
                              <!-- <td>{{ resData.remark }}</td> -->
                            </tr>
                          </template>

                      </template>
                    <!-- 流水订单 现已作废 -->
                    <template v-if="resData.category == 'dhls-all'">
                    <tr>
                      <td rowspan="3">现货</td>
                      <td rowspan="3">{{ resData.fullTime }}</td>
                      <td rowspan="3" class="text-red">￥{{ resData.total }}</td>
                      <!-- <td class='td-title'>货款</td>
                      <td class="text-red">￥{{ resData.saleMoney }}</td> -->
                      <td class='td-title'>服务费</td>
                      <td class='text-red'>￥{{ resData.serviceMoney }}</td>
                      <td rowspan="3"><span v-if="resData.fullCashStatus">√</span></td>
                      <td rowspan="3"><span v-if="resData.fullAdvanceStatus">√</span></td>
                      <!-- <td rowspan="3">{{ resData.remark }}</td> -->
                    </tr>
                    <tr>
                        <td class='td-title'>服务费</td>
                        <td class='text-red'>￥{{ resData.serviceMoney }}</td>
                    </tr>
                    <tr>
                        <td class='td-title'>税款</td>
                        <td class='text-red'>￥{{ resData.taxMoney }}</td>
                    </tr>
                  </template>
                    <!-- 流水订单 end -->
                    <tr>
                        <td class='text-green' colspan="2">采购商</td>
                        <td class='text-green' colspan="8">供应商</td>
                    </tr>
                    <tr>
                        <td class='td-title' colspan="2">采购商名称</td>
                        <td class='td-title'>供应商名称</td>
                        <td class='td-title'>银行卡户名</td>
                        <td class='td-title'>银行卡名称</td>
                        <td class='td-title'>所属支行</td>
                        <td class='td-title' colspan="4">银行卡卡号</td>
                    </tr>
                    <tr>
                        <td colspan="2">{{ resData.company }}</td>
                        <td>{{ resData.sellerCompany }}</td>
                        <td>{{ resData.replyAccountType == 1 ? resData.replyAccountCompany  : resData.replyAccountUser }}</td>
                        <td>{{ resData.replyAccountBank }}</td>
                        <td>{{ resData.replyAccountBranch }}</td>
                        <td colspan="4">{{ resData.replyAccountNumber }}</td>
                    </tr>
                    <tr>
                        <td colspan="4" class='td-title'>跟单员备注</td>
                        <td colspan="4" class='td-title'>买货员备注</td>
                        <td class='td-title'>采购商ID</td>
                        <td class='td-title'>供应商ID</td>
                    </tr>
                    <tr>
                        <td colspan="4">{{ resData.leaveMessage || '无'}}</td>
                        <td colspan="4">{{ resData.sellerMessage || '无'}}</td>
                        <td class='td-title'>{{resData.buyerNumber}}</td>
                        <td class='td-title'>{{resData.sellerNumber}}</td>
                    </tr>
                </tbody>
            </table>
            <div style='margin: 10px 0; overflow:hidden' class='text-green'>
              数量/单价(数量合计：{{resData.colorTotal}})
            </div>
            <table>
              <tr>
                <td class='td-title'>采购数量</td>
                <td class='td-title'>成本单价</td>
                <td class='td-title'>销售单价</td>
                <td class='td-title'>成本小计</td>
                <td class='td-title'>销售小计</td>
              </tr>
              <tr v-for='color in resData.colorList'>
                <td>{{color.quantity}}{{color.quantityUnit}}</td>
                <td>{{color.costPrice}}{{color.costPriceUnit}}</td>
                <td>{{color.salePrice}}{{color.salePriceUnit}}</td>
                <td>{{Number(color.quantity * color.costPrice).toFixed(2)}} 元</td>
                <td>{{Number(color.quantity * color.salePrice).toFixed(2)}} 元</td>
              </tr>
            </table>
        </div>
    </div>
    <div class="container-img container-detail get-img" v-for="(url, index) in resData.madanImgUrls">
      <p class="title">码单图片</p>
      <img class="imgs" :src="imgPath+url" alt="码单index图片" id="perfectyang">
    </div>
    <div class="container-img container-detail get-img" v-for="certificalUrl in resData.certificateImgUrls">
      <p class="title">采购商付款凭据</p>
      <img class="imgs" :src="imgPath +certificalUrl" alt="采购商付款凭据">
    </div>
  </div>
</template>

<style lang="scss">
.app-main {
  padding-top: 0;
  margin-left: 0;
}
.app-content {
  padding: 0;
}
body {
    margin: 1px;
    overflow: scroll;
}
.printDetail {
  font-family: 'SimSun';
  position: relative;
  font-size: 0.85rem;
  line-height: 1.5;
}
.content,
.page {
    position: relative;
    overflow: inherit;
    height: auto;
}
.container-detail {
    width: 100%;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    background-color: #fff;
    border: 1px solid #37B36B;
    .text-green{
      color: #37B36B;
    }
    .text-red{
      color: red;
    }
    .logo {
      position: relative;

      img {
          width: 8rem;
      }
      .print-btn{
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 0.6rem;
        background-color: #fff;
        color: #666;
        border: 1px solid #ededed;
        border-radius: 3px;
        padding: 0 1rem;
      }
    }
    .title {
        position: relative;
        display: inline;
        vertical-align: bottom;
        padding-left: 1rem;
    }
    .content-header{
      padding: 0.5rem;
      border-bottom: 1px dotted #37B36B;
    }
    .content-table {
        margin: 0 auto;
        padding: 0.5rem;
        table {
            width: 100%;
            font-size: 0.5rem;
            color: #333;
            border-top: 1px solid #37B36B;
            border-left: 1px solid #37B36B;
            border-spacing: 0;
            th{
              border-bottom: 1px solid #37B36B;
              border-right: 1px solid #37B36B;
            }
            tr {
                td {
                    text-align: center;
                    border-bottom: 1px solid #37B36B;
                    border-right: 1px solid #37B36B;
                    padding: 0.4rem 0.2rem;
                    vertical-align: middle;
                    font-size: 1.0rem;
                    min-width: 80px;
                    &.td-title {
                      color: #999;
                      font-weight: bolder;
                    }
                    &.td-h {
                      font-size: 1.2rem;
                    }
                    img {
                      width: 90%;
                    }
                }
            }
        }
    }
    .imgs {
      width: auto;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }
}
.container-img {
  position: relative;
  text-align: center;
  // padding: 0.5rem;
  // padding-top: 2.2rem;
  // padding-bottom: 2.2rem;
  .title{
    position: absolute;
    top: 0.1rem;
    left: 0.5rem;
    right: 0;
    margin: 0;
    padding: 0;
    line-height: 1.9rem;
    font-size: 1.8rem;
    font-weight: bolder;
  }
  img {
    margin: 2.5rem 0;
    width: 100%;
    overflow: hidden;
    &.rote90 {
      -ms-transform:rotate(-90deg) scale(1, 1.5); /* IE 9 */
      -moz-transform:rotate(-90deg) scale(1, 1.5); /* Firefox */
      -webkit-transform:rotate(-90deg) scale(1, 1.5); /* Safari and Chrome */
      transform:rotate(-90deg) scale(1, 1.5);
    }
    &.scale {
      -ms-transform: scale(1); /* IE 9 */
      -moz-transform: scale(1); /* Firefox */
      -webkit-transform: scale(1); /* Safari and Chrome */
      transform: scale(1);
    }
  }
}
@media print {
  .container-detail{
    display: block;
    max-width: 900px;
    min-height: 660px;
    max-height: 100%;
    page-break-after: always;
  }
  .container-img{
    border: none;
  }
}
</style>

<script type="text/javascript">
import { request, formatTimeString } from '../../../common/utils'
import Account from 'api/account'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      imgPath: 'http://www.soouya.com',
      resData: {},
      fullscreenLoading: true
    }
  },
  mounted () {
    this.getDetail()
  },
  updated () {
    this.fixImgSize()
  },
  computed: {
  },
  methods: {
    getDetail () {
      request({
        url: Account.OrderProcess.getPayApply,
        data: {
          orderNumber: this.$route.params.orderNumber
        },
        method: 'post'
      }, (res) => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          let colorTotal = 0
          res.obj.colorList && res.obj.colorList.map((item) => {
            colorTotal = colorTotal + Number(item.quantity)
          })
          res.obj.colorTotal = colorTotal + res.obj.colorList[0].quantityUnit
          this.resData = this.PayReqFormat(res.obj)
        } else {
          Message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch((e) => {
        console.log(e)
      })
      /* request({
        url: ,
        data: {
        },
        method: 'post'
      }, (res) => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          console.log('res', res.obj)
          this.resData = this.PayReqFormat(res.obj)
        } else {
          Message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch((e) => {
        Message({
          message: e,
          type: 'error'
        })
      }) */
    },
    PayReqFormat(orderInfo) {
      orderInfo.fullTime = orderInfo.fullTime ? formatTimeString(orderInfo.fullTime) : '';
      orderInfo.earnestTime = orderInfo.earnestTime ? formatTimeString(orderInfo.earnestTime) : '';
      orderInfo.finalTime = orderInfo.finalTime ? formatTimeString(orderInfo.finalTime) : '';
      orderInfo.total = orderInfo.saleMoney
      orderInfo.weikuangfu = orderInfo.costMoney - orderInfo.earnestMoney
      // if (orderInfo.category == 'dhls-all') {
      //   orderInfo.total = orderInfo.saleMoney
      //   // orderInfo.total = culAdd(culAdd(orderInfo.saleMoney, orderInfo.taxMoney), orderInfo.serviceMoney);
      // } else {
      //   if (orderInfo.productSource == '0') {
      //     orderInfo.total = orderInfo.saleMoney
      //     // orderInfo.total = culAdd(culAdd(orderInfo.saleMoney, orderInfo.taxMoney), orderInfo.serviceMoney);
      //   } else if (orderInfo.productSource == '1') {
      //     if (orderInfo.finalMoney) {
      //       orderInfo.total = orderInfo.finalMoney
      //     } else {
      //       orderInfo.total = orderInfo.earnestMoney
      //     }
      //     // orderInfo.total = culAdd(culAdd(culAdd(orderInfo.earnestMoney, orderInfo.finalMoney), orderInfo.taxMoney), orderInfo.serviceMoney);
      //   }
      // }
      orderInfo.saleMoney = this.formatCurrency(orderInfo.saleMoney)
      orderInfo.sellerTaxMoney = this.formatCurrency(orderInfo.sellerTaxMoney)
      orderInfo.taxMoney = this.formatCurrency(orderInfo.taxMoney)
      orderInfo.serviceMoney = this.formatCurrency(orderInfo.serviceMoney)
      orderInfo.servicePrice = this.formatCurrency(orderInfo.servicePrice)
      orderInfo.costMoney = this.formatCurrency(orderInfo.costMoney)
      orderInfo.costMoneyOffTax = this.formatCurrency(orderInfo.costMoneyOffTax)
      orderInfo.earnestMoney = this.formatCurrency(orderInfo.earnestMoney)
      orderInfo.finalMoney = this.formatCurrency(orderInfo.finalMoney)
      orderInfo.total = this.formatCurrency(orderInfo.total)
      orderInfo.weikuangfu = this.formatCurrency(orderInfo.weikuangfu)
      return orderInfo;
    },
    formatCurrency(number) {
      const val = Number(number)
      let backVal = parseFloat(val, 10).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      if (String(backVal) == '-0.00') {
        backVal = '0.00'
      }
      return backVal
    },
    fixImgSize () {
      const imgs = this.$el.querySelectorAll('.imgs')
      for (let i = 0; i < imgs.length; i++) {
        var img = new Image();
        img.src = imgs[i].src;
        img.onload = function() {
          console.dir(imgs[i])
          console.log('img.height', imgs[i].height)
          if (imgs[i].naturalWidth <= imgs[i].naturalHeight) {
            imgs[i].style.width = '100%'
            imgs[i].style.maxWidth = '500px'
            imgs[i].style.maxHeight = '590px'
            imgs[i].style.height = 'auto'
            imgs[i].classList.add('rote90')
          } else {
            imgs[i].style.width = img.width > 900 ? 'auto' : '100%'
            imgs[i].style.height = 'auto'
            imgs[i].style.maxHeight = '595px'
          }
        }
      }
    }
  }
}
</script>
