
<template>
  <div class="printDetail">
    <div v-loading.fullscreen="fullscreenLoading"></div>
    <div v-for="(item, index) in printData" :key="index">
      <div class="container-detail new-page">
        <div class="content-header">
          <div class="logo">
            <img src="./img/soouyalogo@2x.png" />
            <!-- <h1 class="title">付款申请单</h1> -->
            <a v-if="index == 0" class="print-btn" href="javascript: window.print();">
              <el-button type="primary">打印</el-button>
            </a>
          </div>
        </div>
        <div class="content-table">
          <!-- 服务单 -->
          <table v-if='item.type == 1'>
            <tbody>
              <tr>
                <td colspan="10">
                  <div class="pull-left">
                    <span class="text-green">订单编号：</span>{{ item.serviceNumber }}
                    <span class='icon-shu'>|</span> 服务单</div>
                  <!-- <div class="pull-left"><span class="text-green" style='margin-left: 25px;'>成本价：</span>￥ {{ item.costMoney }} </div> -->
                  <div class="pull-right">跟单员：{{ item.realName }} 买货员：{{ item.purchaser }} | 订单状态：{{ item.statusShortDescr }}</div>
                </td>
              </tr>
              <tr>
                <td class='td-title'>类别</td>
                <td class='td-title'>提交时间</td>
                <td class='td-title'>销售货款</td>
                <td class='td-title' colspan="2">收款明细</td>
                <td class='td-title'>成本货款</td>
                <td class='td-title' colspan="2">付款明细</td>
                <td class='td-title' colspan="1">通知付款备注</td>
                <td class='td-title' colspan="1">是否验布</td>
                <!-- <td class='td-title'>垫付</td> -->
              </tr>
              <template v-if="item.category == 'all-all' || item.category == 'dh-zy'">
                <!-- 现货 -->
                <template v-if="item.productSource == 0">
                  <tr>
                    <td rowspan="4">现货</td>
                    <td rowspan="4">{{ item.fullTime }}</td>
                    <td rowspan="4" class="text-red">￥{{ item.total }}</td>
                    <td class='td-title'>服务费</td>
                    <td class="text-red">￥{{ item.serviceMoney }}</td>
                    <td class="text-red" rowspan="4">￥{{ item.costMoney }}</td>
                    <td class='td-title'>税前成本货款</td>
                    <td class="text-red">￥{{ item.sellerInvoiceStatus == 1 ? item.costMoneyOffTax : item.costMoney }}</td>
                    <td rowspan="4" colspan="1"> {{item.remark ? item.remark : '√'}} </td>
                    <td rowspan="4" colspan="1">
                      <template v-if="item.checkCloth">
                        <span>是</span>
                      </template>
                      <template v-else>
                        <span>否</span>
                      </template>
                    </td>
                    <!-- <td rowspan="4"><span v-if="item.payType == 0">{{item.remark ? item.remark : '√'}}</span></td> -->
                  </tr>
                  <tr>
                    <td class='td-title'>采购商税费</td>
                    <td class='text-red'>￥{{ item.buyTaxMoney == null?'--':(item.buyTaxMoney).toFixed(2) }}</td>
                    <td class='td-title'>供应商税费</td>
                    <td class='text-red'>￥{{ item.sellerTaxMoney }}</td>
                  </tr>
                  <tr>
                    <td class='td-title'>采购商税点</td>
                    <td class='text-red'>{{ item.taxPoint | formateNumber}} %</td>
                    <td class='td-title'>供应商税点</td>
                    <td class='text-red'>
                      <span v-if="item.sellerInvoiceStatus">{{ item.sellerTaxPoint | formateNumber}}%</span>
                      <span v-else>0%</span>
                    </td>
                  </tr>
                  <tr>
                    <td class='td-title'>服务费单价</td>
                    <td class='text-red'>￥{{ item.servicePrice | formateNumber}}</td>
                    <td class='td-title'>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <!-- <td class='td-title'>回扣单价</td> -->
                    <!-- <td class='text-red'>￥{{ item.servicePrice }}</td> -->
                    <!-- <td class='td-title'>-</td> -->
                    <!-- <td>-</td> -->
                  </tr>
                </template>
                <!-- 现货 end-->
                <!-- fundType 2 订金  3 尾款  5 全款  -->
                <!-- 订货 -->
                <template v-if="item.productSource == 1">
                  <template v-if="item.fundType == 3">
                    <tr>
                      <td rowspan="7">订货</td>
                      <td rowspan="7">{{ item.finalTime }}</td>
                      <td rowspan="7" class="text-red">￥{{ item.saleMoney }}</td>
                      <td class='td-title'>定金</td>
                      <td class="text-red">￥{{ item.earnestMoney }}</td>
                      <td class="text-red" rowspan="7">￥{{ item.costMoney }}</td>
                      <td class='td-title'>定金</td>
                      <td class="text-red">￥{{ item.earnestMoney }}</td>
                      <td rowspan="7" colspan="1"> {{item.remark ? item.remark : '√'}} </td>
                      <td rowspan="7" colspan="1">
                        <template v-if="item.checkCloth">
                          <span>是</span>
                        </template>
                        <template v-else>
                          <span>否</span>
                        </template>
                      </td>
                      <!-- <td rowspan="7"><span v-if="item.payType == 0">{{item.remark ? item.remark : '√'}}</span></td> -->
                      <!-- <td rowspan="5">{{ item.remark }}</td> -->
                    </tr>
                    <tr>
                      <td class='td-title'>尾款（收）</td>
                      <td class='text-red'>￥{{ item.finalMoney }}</td>
                      <td class='td-title'>尾款（付）</td>
                      <td class='text-red'>￥{{ item.weikuangfu}}</td>
                    </tr>
                    <tr>
                      <td class='td-title'>服务费</td>
                      <td class='text-red'>￥{{ item.serviceMoney }}</td>
                      <td class='td-title'>税前成本货款</td>
                      <td class='text-red'>￥{{ item.sellerInvoiceStatus == 1 ? item.costMoneyOffTax : item.costMoney }}</td>
                    </tr>
                    <tr>
                      <td class='td-title'>采购商税费</td>
                      <td class='text-red'>￥{{ item.buyTaxMoney == null?'--':(item.buyTaxMoney).toFixed(2)}}</td>
                      <td class='td-title'>供应商税费</td>
                      <td class='text-red'>￥{{ item.sellerTaxMoney }}</td>
                    </tr>
                    <tr>
                      <td class='td-title'>采购商税点</td>
                      <td class='text-red'>{{ item.taxPoint | formateNumber}}%</td>
                      <td class='td-title'>供应商税点</td>
                      <td class='text-red'>
                        <span v-if="item.sellerInvoiceStatus">{{ item.sellerTaxPoint | formateNumber}}%</span>
                        <span v-else>0%</span>
                      </td>
                    </tr>
                    <tr>
                      <td class='td-title'>服务费单价</td>
                      <td class='text-red'>￥{{ item.servicePrice | formateNumber}}</td>
                      <td class='td-title'>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <!-- <td class='td-title'>回扣单价</td> -->
                      <!-- <td class='text-red'>￥{{ item.servicePrice }}</td> -->
                      <!-- <td class='td-title'>-</td> -->
                      <!-- <td >-</td> -->
                    </tr>
                  </template>
                  <tr v-if="item.fundType == 2">
                    <td>订货</td>
                    <td width='150'>{{ item.earnestTime }}</td>
                    <td class="text-red">￥{{ item.saleMoney }}</td>
                    <td class='td-title'>定金</td>
                    <td class="text-red">￥{{ item.earnestMoney }}</td>
                    <td class="text-red">￥{{ item.costMoney }}</td>
                    <td class='td-title'>定金</td>
                    <td class="text-red">￥{{ item.earnestMoney }}</td>
                    <td colspan="1">{{item.remark ? item.remark : '√'}}</td>
                    <td colspan="1">
                      <template v-if="item.checkCloth">
                        <span>是</span>
                      </template>
                      <template v-else>
                        <span>否</span>
                      </template>
                    </td>
                  </tr>
                </template>

              </template>
              <!-- 流水订单 -->
              <template v-if="item.category == 'dhls-all'">
                <tr>
                  <td rowspan="3">现货</td>
                  <td rowspan="3">{{ item.fullTime }}</td>
                  <td rowspan="3" class="text-red">￥{{ item.total }}</td>
                  <!-- <td class='td-title'>货款</td>
                                          <td class="text-red">￥{{ item.saleMoney }}</td> -->
                  <td class='td-title'>服务费</td>
                  <td class='text-red'>￥{{ item.serviceMoney }}</td>
                  <td rowspan="3">
                    <span v-if="item.fullCashStatus">√</span>
                  </td>
                  <td rowspan="3">
                    <span v-if="item.fullAdvanceStatus">√</span>
                  </td>
                  <!-- <td rowspan="3">{{ item.remark }}</td> -->
                </tr>
                <tr>
                  <td class='td-title'>服务费</td>
                  <td class='text-red'>￥{{ item.serviceMoney }}</td>
                </tr>
                <tr>
                  <td class='td-title'>税款</td>
                  <td class='text-red'>￥{{ item.taxMoney }}</td>
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
                <td colspan="2">{{ item.company }}</td>
                <td>{{ item.sellerCompany }}</td>
                <td>{{ item.replyAccountType == 1 ? item.replyAccountCompany : item.replyAccountUser }}</td>
                <td>{{ item.replyAccountBank }}</td>
                <td>{{ item.replyAccountBranch }}</td>
                <td colspan="4">{{ item.replyAccountNumber }}</td>
              </tr>
              <tr>
                <td colspan="4" class='td-title'>跟单员备注</td>
                <td colspan="4" class='td-title'>买货员备注</td>
                <td class='td-title'>采购商ID</td>
                <td class='td-title'>供应商ID</td>
              </tr>
              <tr>
                <td colspan="4">{{ item.leaveMessage || '无'}}</td>
                <td colspan="4">{{ item.sellerMessage || '无'}}</td>
                <td class='td-title'>{{item.buyerNumber}}</td>
                <td class='td-title'>{{item.sellerNumber}}</td>
              </tr>
            </tbody>
          </table>
          <!-- 贸易单 -->
          <table v-if="item.type==2">
            <tbody>
              <tr>
                <td colspan="10">
                  <div class="pull-left">
                    <span class="text-green">订单编号：</span>{{ item.serviceNumber }}
                    <span class='icon-shu'>|</span>贸易单</div>
                  <!-- <div class="pull-left"><span class="text-green" style='margin-left: 25px;'>成本价：</span>￥ {{ item.costMoney }} </div> -->
                  <div class="pull-right">跟单员：{{ item.realName }} 买货员：{{ item.purchaser }} | 订单状态：{{ item.statusShortDescr }}</div>
                </td>
              </tr>
              <tr>
                <td class='td-title'>类别</td>
                <td class='td-title'>提交时间</td>
                <td class='td-title'>销售货款</td>
                <td class='td-title' colspan="2">收款明细</td>
                <td class='td-title'>成本货款</td>
                <td class='td-title' colspan="2">付款明细</td>
                <td class='td-title' colspan="1">通知付款备注</td>
                <td class='td-title' colspan="1">是否验布</td>
                <!-- <td class='td-title'>垫付</td> -->
              </tr>
              <template v-if="item.category == 'all-all' || item.category == 'dh-zy'">
                <!-- 现货 -->
                <template v-if="item.productSource == 0">
                  <tr>
                    <td rowspan="3">现货</td>
                    <td rowspan="3">{{ item.fullTime }}</td>
                    <td rowspan="3" class="text-red">￥{{ item.total }}</td>
                    <td class='td-title'>采购商税费</td>
                    <td class='text-red'>￥{{ item.buyTaxMoney == null? '--':(item.buyTaxMoney).toFixed(2) }}</td>
                    <td class="text-red" rowspan="3">￥{{ item.costMoney }}</td>
                    <td class='td-title'>税前成本货款</td>
                    <td class="text-red">￥{{ item.sellerInvoiceStatus == 1 ? item.costMoneyOffTax : item.costMoney }}</td>
                    <td rowspan="3" colspan="1"> {{item.remark ? item.remark : '√'}} </td>
                    <td rowspan="3" colspan="1">
                      <template v-if="item.checkCloth">
                        <span>是</span>
                      </template>
                      <template v-else>
                        <span>否</span>
                      </template>
                    </td>
                    <!-- <td rowspan="3"><span v-if="item.payType == 0">{{item.remark ? item.remark : '√'}}</span></td> -->
                  </tr>
                  <tr>
                    <td class='td-title'>采购商税点</td>
                    <td class='text-red'>{{ item.taxPoint | formateNumber}} %</td>
                    <td class='td-title'>供应商税费</td>
                    <td class='text-red'>￥{{ item.sellerTaxMoney }}</td>
                  </tr>
                  <tr>
                    <td class='td-title'>-</td>
                    <td class='text-red'>-</td>
                    <td class='td-title'>供应商税点</td>
                    <td class='text-red'>
                      <span v-if="item.sellerInvoiceStatus">{{ item.sellerTaxPoint | formateNumber}}%</span>
                      <span v-else>0%</span>
                    </td>
                  </tr>
                </template>
                <!-- 现货 end-->
                <!-- fundType 2 订金  3 尾款  5 全款  -->
                <!-- 订货 -->
                <template v-if="item.productSource == 1">
                  <template v-if="item.fundType == 3">
                    <tr>
                      <td rowspan="5">订货</td>
                      <td rowspan="5">{{ item.finalTime }}</td>
                      <td rowspan="5" class="text-red">￥{{ item.total }}</td>
                      <td class='td-title'>定金</td>
                      <td class="text-red">￥{{ item.earnestMoney }}</td>
                      <td class="text-red" rowspan="5">￥{{ item.costMoney }}</td>
                      <td class='td-title'>定金</td>
                      <td class="text-red">￥{{ item.earnestMoney }}</td>
                      <td rowspan="5" colspan="1">{{item.remark ? item.remark : '√'}}</td>
                      <td rowspan="5" colspan="1">
                        <template v-if="item.checkCloth">
                          <span>是</span>
                        </template>
                        <template v-else>
                          <span>否</span>
                        </template>
                      </td>
                      <!-- <td rowspan="5"><span v-if="item.payType == 0">{{item.remark ? item.remark : '√'}}</span></td> -->
                      <!-- <td rowspan="5">{{ item.remark }}</td> -->
                    </tr>
                    <tr>
                      <td class='td-title'>尾款（收）</td>
                      <td class='text-red'>￥{{ item.finalMoney }}</td>
                      <td class='td-title'>尾款（付）</td>
                      <td class='text-red'>￥{{ item.weikuangfu }}</td>
                    </tr>
                    <tr>
                      <td class='td-title'>采购商税费</td>
                      <td class='text-red'>￥{{ item.buyTaxMoney == null?'--':item.buyTaxMoney.toFixed(2) }}</td>
                      <td class='td-title'>税前成本货款</td>
                      <td class='text-red'>￥{{ item.sellerInvoiceStatus == 1 ? item.costMoneyOffTax : item.costMoney }}</td>
                    </tr>
                    <tr>
                      <td class='td-title'>采购商税点</td>
                      <td class='text-red'>{{ item.taxPoint | formateNumber}}%</td>
                      <td class='td-title'>供应商税费</td>
                      <td class='text-red'>￥{{ item.sellerTaxMoney }}</td>
                    </tr>
                    <tr>
                      <td class='td-title'>-</td>
                      <td class='text-red'>-</td>
                      <td class='td-title'>供应商税点</td>
                      <td class='text-red'>
                        <span v-if="item.sellerInvoiceStatus">{{ item.sellerTaxPoint | formateNumber}}%</span>
                        <span v-else>0%</span>
                      </td>
                    </tr>
                  </template>
                  <tr v-if="item.fundType == 2">
                    <td>订货</td>
                    <td width='150'>{{ item.earnestTime }}</td>
                    <td class="text-red">￥{{ item.total }}</td>
                    <td class='td-title'>定金</td>
                    <td class="text-red">￥{{ item.earnestMoney }}</td>
                    <td class="text-red">￥{{ item.costMoney }}</td>
                    <td class='td-title'>定金</td>
                    <td class="text-red">￥{{ item.earnestMoney }}</td>
                    <td colspan="1">{{item.remark ? item.remark : '√'}}</td>
                    <td colspan="1">
                      <template v-if="item.checkCloth">
                        <span>是</span>
                      </template>
                      <template v-else>
                        <span>否</span>
                      </template>
                    </td>
                    <!-- <td><span v-if="item.payType == 0">{{item.remark ? item.remark : '√'}}</span></td> -->
                    <!-- <td>{{ item.remark }}</td> -->
                  </tr>
                </template>

              </template>
              <!-- 流水订单 现已作废 -->
              <template v-if="item.category == 'dhls-all'">
                <tr>
                  <td rowspan="3">现货</td>
                  <td rowspan="3">{{ item.fullTime }}</td>
                  <td rowspan="3" class="text-red">￥{{ item.total }}</td>
                  <!-- <td class='td-title'>货款</td>
                                          <td class="text-red">￥{{ item.saleMoney }}</td> -->
                  <td class='td-title'>服务费</td>
                  <td class='text-red'>￥{{ item.serviceMoney }}</td>
                  <td rowspan="3">
                    <span v-if="item.fullCashStatus">√</span>
                  </td>
                  <td rowspan="3">
                    <span v-if="item.fullAdvanceStatus">√</span>
                  </td>
                  <!-- <td rowspan="3">{{ item.remark }}</td> -->
                </tr>
                <tr>
                  <td class='td-title'>服务费</td>
                  <td class='text-red'>￥{{ item.serviceMoney }}</td>
                </tr>
                <tr>
                  <td class='td-title'>税款</td>
                  <td class='text-red'>￥{{ item.taxMoney }}</td>
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
                <td colspan="2">{{ item.company }}</td>
                <td>{{ item.sellerCompany }}</td>
                <td>{{ item.replyAccountType == 1 ? item.replyAccountCompany : item.replyAccountUser }}</td>
                <td>{{ item.replyAccountBank }}</td>
                <td>{{ item.replyAccountBranch }}</td>
                <td colspan="4">{{ item.replyAccountNumber }}</td>
              </tr>
              <tr>
                <td colspan="4" class='td-title'>跟单员备注</td>
                <td colspan="4" class='td-title'>买货员备注</td>
                <td class='td-title'>采购商ID</td>
                <td class='td-title'>供应商ID</td>
              </tr>
              <tr>
                <td colspan="4">{{ item.leaveMessage || '无'}}</td>
                <td colspan="4">{{ item.sellerMessage || '无'}}</td>
                <td class='td-title'>{{item.buyerNumber}}</td>
                <td class='td-title'>{{item.sellerNumber}}</td>
              </tr>
            </tbody>
          </table>
          <!-- 采购单 -->
          <table v-if='item.type == 3'>
            <tbody>
              <tr>
                <td colspan="10">
                  <div class="pull-left">
                    <span class="text-green">订单编号：</span>{{ item.serviceNumber }}
                    <span class='icon-shu'>|</span> 采购单</div>
                  <!-- <div class="pull-left"><span class="text-green" style='margin-left: 25px;'>成本价：</span>￥ {{ item.costMoney }} </div> -->
                  <div class="pull-right">销售员：{{ item.salesName }} 采购员：{{ item.guiderName }} | 订单状态：{{ item.statusShortDescr }}</div>
                </td>
              </tr>
              <tr>
                <td class='td-title'>类别</td>
                <td class='td-title'>提交时间</td>
                <td class='td-title'>销售货款</td>
                <td class='td-title' colspan="2">收款明细</td>
                <td class='td-title'>成本货款</td>
                <td class='td-title' colspan="2">付款明细</td>
                <td class='td-title' colspan="1">通知付款备注</td>
                <td class='td-title' colspan="1">是否验布</td>
                <!-- <td class='td-title'>垫付</td> -->
              </tr>
              <template v-if="item.category == 'all-all' || item.category == 'dh-zy'">
                <!-- 现货 -->
                <template v-if="item.productSource == 0">
                  <template v-if="item.type != 3">
                    <tr>
                      <td rowspan="4">现货</td>
                      <td rowspan="4">{{ item.fullTime }}</td>
                      <td rowspan="4" class="text-red">￥{{ item.total }}</td>
                      <td class='td-title'>服务费</td>
                      <td class="text-red">￥{{ item.serviceMoney }}</td>
                      <td class="text-red" rowspan="4">￥{{ item.costMoney }}</td>
                      <td class='td-title'>税前成本货款</td>
                      <td class="text-red">￥{{ item.sellerInvoiceStatus == 1 ? item.costMoneyOffTax : item.costMoney }}</td>
                      <td rowspan="4" colspan="1"> {{item.remark ? item.remark : '√'}} </td>
                      <td rowspan="4" colspan="1">
                        <template v-if="item.checkCloth">
                          <span>是</span>
                        </template>
                        <template v-else>
                          <span>否</span>
                        </template>
                      </td>
                      <!-- <td rowspan="4"><span v-if="item.payType == 0">{{item.remark ? item.remark : '√'}}</span></td> -->
                    </tr>
                    <tr>
                      <td class='td-title'>供应商税费</td>
                      <td class='text-red'>￥{{ item.sellerTaxMoney }}</td>
                    </tr>
                    <tr>
                      <td class='td-title'>采购商税点</td>
                      <td class='text-red'>{{ item.taxPoint | formateNumber }} %</td>
                      <td class='td-title'>供应商税点</td>
                      <td class='text-red'>
                        <span v-if="item.sellerInvoiceStatus">{{ item.sellerTaxPoint | formateNumber}}%</span>
                        <span v-else>0%</span>
                      </td>
                    </tr>
                    <tr>
                      <td class='td-title'>服务费单价</td>
                      <td class='text-red'>￥{{ item.servicePrice | formateNumber}}</td>
                      <td class='td-title'>-</td>
                      <td>-</td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td rowspan="4">现货</td>
                      <td rowspan="4">{{ item.fullTime }}</td>
                      <td rowspan="4" class="text-red">￥{{ item.total }}</td>
                      <!-- <td class='td-title'>服务费</td>
                          <td class="text-red">￥{{ item.serviceMoney }}</td> -->
                      <td class='td-title' rowspan="1">采购商税费</td>
                      <td class='text-red' rowspan="1">￥{{ item.buyTaxMoney == null?'--':(item.buyTaxMoney).toFixed(2) }}</td>
                      <td class="text-red" rowspan="4">￥{{ item.costMoney }}</td>
                      <td class='td-title'>税前成本货款</td>
                      <td class="text-red">￥{{ item.sellerInvoiceStatus == 1 ? item.costMoneyOffTax : item.costMoney }}</td>
                      <td rowspan="4" colspan="1"> {{item.remark ? item.remark : '√'}} </td>
                      <td rowspan="4" colspan="1">
                        <template v-if="item.checkCloth">
                          <span>是</span>
                        </template>
                        <template v-else>
                          <span>否</span>
                        </template>
                      </td>
                      <!-- <td rowspan="4"><span v-if="item.payType == 0">{{item.remark ? item.remark : '√'}}</span></td> -->
                    </tr>
                    <tr>
                      <td class='td-title' rowspan="1">采购商税点</td>
                      <td class='text-red' rowspan="1 ">{{ item.taxPoint | formateNumber }} %</td>
                      <td class='td-title'>供应商税费</td>
                      <td class='text-red'>￥{{ item.sellerTaxMoney }}</td>
                    </tr>
                    <tr>
                      <td class='td-title'>-</td>
                      <td>-</td>
                      <td class='td-title'>供应商税点</td>
                      <td class='text-red'>
                        <span v-if="item.sellerInvoiceStatus">{{ item.sellerTaxPoint | formateNumber}}%</span>
                        <span v-else>0%</span>
                      </td>
                    </tr>
                    <tr>
                      <!-- <td class='td-title'>服务费单价</td>
                          <td class='text-red'>￥{{ item.servicePrice | formateNumber}}</td> -->
                      <!-- <td class='td-title'>-</td>
                      <td>-</td> -->
                    </tr>
                  </template>
                  <tr>
                    <!-- <td class='td-title'>回扣单价</td> -->
                    <!-- <td class='text-red'>￥{{ item.servicePrice }}</td> -->
                    <!-- <td class='td-title'>-</td> -->
                    <!-- <td>-</td> -->
                  </tr>
                </template>
                <!-- 现货 end-->
                <!-- fundType 2 订金  3 尾款  5 全款  -->
                <!-- 订货 -->
                <template v-if="item.productSource == 1">
                  <template v-if="item.fundType == 3">
                    <template v-if="item.type != 3">
                      <tr>
                        <td rowspan="7">订货</td>
                        <td rowspan="7">{{ item.finalTime }}</td>
                        <td rowspan="7" class="text-red">￥{{ item.saleMoney }}</td>
                        <td class='td-title'>定金</td>
                        <td class="text-red">￥{{ item.earnestMoney }}</td>
                        <td class="text-red" rowspan="7">￥{{ item.costMoney }}</td>
                        <td class='td-title'>定金</td>
                        <td class="text-red">￥{{ item.earnestMoney }}</td>
                        <td rowspan="7" colspan="1"> {{item.remark ? item.remark : '√'}} </td>
                        <td rowspan="7" colspan="1">
                          <template v-if="item.checkCloth">
                            <span>是</span>
                          </template>
                          <template v-else>
                            <span>否</span>
                          </template>
                        </td>
                        <!-- <td rowspan="7"><span v-if="item.payType == 0">{{item.remark ? item.remark : '√'}}</span></td> -->
                        <!-- <td rowspan="5">{{ item.remark }}</td> -->
                      </tr>
                      <tr>
                        <td class='td-title'>尾款（收）</td>
                        <td class='text-red'>￥{{ item.finalMoney }}</td>
                        <td class='td-title'>尾款（付）</td>
                        <td class='text-red'>￥{{ item.weikuangfu}}</td>
                      </tr>
                      <tr>
                        <td class='td-title'>服务费</td>
                        <td class='text-red'>￥{{ item.serviceMoney }}</td>
                        <td class='td-title'>税前成本货款</td>
                        <td class='text-red'>￥{{ item.sellerInvoiceStatus == 1 ? item.costMoneyOffTax : item.costMoney }}</td>
                      </tr>
                      <tr>
                        <td class='td-title'>采购商税费</td>
                        <td class='text-red'>￥{{ item.buyTaxMoney == null?'--':(item.buyTaxMoney).toFixed(2)}}</td>
                        <td class='td-title'>供应商税费</td>
                        <td class='text-red'>￥{{ item.sellerTaxMoney }}</td>
                      </tr>
                      <tr>
                        <td class='td-title'>采购商税点</td>
                        <td class='text-red'>{{ item.taxPoint | formateNumber }}%</td>
                        <td class='td-title'>供应商税点</td>
                        <td class='text-red'>
                          <span v-if="item.sellerInvoiceStatus">{{ item.sellerTaxPoint | formateNumber}}%</span>
                          <span v-else>0%</span>
                        </td>
                      </tr>
                      <tr>
                        <td class='td-title'>服务费单价</td>
                        <td class='text-red'>￥{{ item.servicePrice | formateNumber}}</td>
                        <td class='td-title'>-</td>
                        <td>-</td>
                      </tr>
                      <tr>
                        <!-- <td class='td-title'>回扣单价</td> -->
                        <!-- <td class='text-red'>￥{{ item.servicePrice }}</td> -->
                        <!-- <td class='td-title'>-</td> -->
                        <!-- <td >-</td> -->
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td rowspan="7">订货</td>
                        <td rowspan="7">{{ item.finalTime }}</td>
                        <td rowspan="7" class="text-red">￥{{ item.saleMoney }}</td>
                        <td class='td-title'>定金</td>
                        <td class="text-red">￥{{ item.earnestMoney }}</td>
                        <td class="text-red" rowspan="7">￥{{ item.costMoney }}</td>
                        <td class='td-title'>定金</td>
                        <td class="text-red">￥{{ item.earnestMoney }}</td>
                        <td rowspan="7" colspan="1"> {{item.remark ? item.remark : '√'}} </td>
                        <td rowspan="7" colspan="1">
                          <template v-if="item.checkCloth">
                            <span>是</span>
                          </template>
                          <template v-else>
                            <span>否</span>
                          </template>
                        </td>
                        <!-- <td rowspan="7"><span v-if="item.payType == 0">{{item.remark ? item.remark : '√'}}</span></td> -->
                        <!-- <td rowspan="5">{{ item.remark }}</td> -->
                      </tr>
                      <tr>
                        <td class='td-title'>尾款（收）</td>
                        <td class='text-red'>￥{{ item.finalMoney }}</td>
                        <td class='td-title'>尾款（付）</td>
                        <td class='text-red'>￥{{ item.weikuangfu}}</td>
                      </tr>
                      <tr>
                        <!-- <td class='td-title'>服务费</td>
                        <td class='text-red'>￥{{ item.serviceMoney }}</td> -->
                        <td class='td-title' rowspan="1">采购商税费</td>
                        <td class='text-red' rowspan="1">￥{{ item.buyTaxMoney == null?'--':(item.buyTaxMoney).toFixed(2)}}</td>
                        <td class='td-title'>税前成本货款</td>
                        <td class='text-red'>￥{{ item.sellerInvoiceStatus == 1 ? item.costMoneyOffTax : item.costMoney }}</td>
                      </tr>
                      <tr>
                        <td class='td-title' rowspan="1">采购商税点</td>
                        <td class='text-red' rowspan="1">{{ item.taxPoint | formateNumber }}%</td>
                        <td class='td-title'>供应商税费</td>
                        <td class='text-red'>￥{{ item.sellerTaxMoney }}</td>
                      </tr>
                      <tr>
                        <td class='td-title'>-</td>
                        <td>-</td>
                        <td class='td-title'>供应商税点</td>
                        <td class='text-red'>
                          <span v-if="item.sellerInvoiceStatus">{{ item.sellerTaxPoint | formateNumber}}%</span>
                          <span v-else>0%</span>
                        </td>
                      </tr>
                      <tr>
                        <!-- <td class='td-title'>服务费单价</td>
                        <td class='text-red'>￥{{ item.servicePrice | formateNumber}}</td> -->
                        <!-- <td class='td-title'>-</td>
                        <td>-</td> -->
                      </tr>
                      <tr>
                        <!-- <td class='td-title'>回扣单价</td> -->
                        <!-- <td class='text-red'>￥{{ item.servicePrice }}</td> -->
                        <!-- <td class='td-title'>-</td> -->
                        <!-- <td >-</td> -->
                      </tr>
                    </template>
                  </template>
                  <tr v-if="item.fundType == 2">
                    <td>订货</td>
                    <td width='150'>{{ item.earnestTime }}</td>
                    <td class="text-red">￥{{ item.saleMoney }}</td>
                    <td class='td-title'>定金</td>
                    <td class="text-red">￥{{ item.earnestMoney }}</td>
                    <td class="text-red">￥{{ item.costMoney }}</td>
                    <td class='td-title'>定金</td>
                    <td class="text-red">￥{{ item.earnestMoney }}</td>
                    <td colspan="1">{{item.remark ? item.remark : '√'}}</td>
                    <td colspan="1">
                      <template v-if="item.checkCloth">
                        <span>是</span>
                      </template>
                      <template v-else>
                        <span>否</span>
                      </template>
                    </td>
                  </tr>
                </template>

              </template>
              <!-- 流水订单 -->
              <template v-if="item.category == 'dhls-all'">
                <tr>
                  <td rowspan="3">现货</td>
                  <td rowspan="3">{{ item.fullTime }}</td>
                  <td rowspan="3" class="text-red">￥{{ item.total }}</td>
                  <!-- <td class='td-title'>货款</td>
                                          <td class="text-red">￥{{ item.saleMoney }}</td> -->
                  <td class='td-title'>服务费</td>
                  <td class='text-red'>￥{{ item.serviceMoney }}</td>
                  <td rowspan="3">
                    <span v-if="item.fullCashStatus">√</span>
                  </td>
                  <td rowspan="3">
                    <span v-if="item.fullAdvanceStatus">√</span>
                  </td>
                  <!-- <td rowspan="3">{{ item.remark }}</td> -->
                </tr>
                <tr>
                  <td class='td-title'>服务费</td>
                  <td class='text-red'>￥{{ item.serviceMoney }}</td>
                </tr>
                <tr>
                  <td class='td-title'>税款</td>
                  <td class='text-red'>￥{{ item.taxMoney }}</td>
                </tr>
              </template>
              <!-- 流水订单 end -->
              <tr>
                <td class='text-green' colspan="3">采购商</td>
                <td class="text-green" colspan="1">自营供应商</td>
                <td class='text-green' colspan="6">原供应商</td>
              </tr>
              <tr>
                <td class='td-title' colspan="2">采购商名称</td>
                <td class="td-title" colspan="1">所在区域</td>
                <td class='td-title'>供应商名称</td>
                <td class='td-title'>供应商名称</td>
                <td class='td-title'>银行卡户名</td>
                <td class='td-title'>银行卡名称</td>
                <td class='td-title' colspan="1">所属支行</td>
                <td class='td-title' colspan="3">银行卡卡号</td>
              </tr>
              <tr>
                <!-- 自营供应商 -->
                <td colspan="2">{{ item.company }}</td>
                <td>{{item.customerProvince}}{{item.customerCity}}</td>
                <td>{{item.ziyingShopCompany}}</td>
                <td>{{ item.sellerCompany }}</td>
                <td>{{ item.replyAccountType == 1 ? item.replyAccountCompany : item.replyAccountUser }}</td>
                <td>{{ item.replyAccountBank }}</td>
                <td colspan="1">{{ item.replyAccountBranch }}</td>
                <td colspan="3">{{ item.replyAccountNumber }}</td>
              </tr>
              <tr>
                <td colspan="4" class='td-title'>销售员备注</td>
                <td colspan="4" class='td-title'>采购员备注</td>
                <td class='td-title'>采购商ID</td>
                <td class='td-title'>供应商ID</td>
              </tr>
              <tr>
                <!-- 参数名待定 -->
                <td colspan="4">{{ item.leaveMessage || '无'}}</td>
                <td colspan="4">{{ item.sellerMessage || '无'}}</td>
                <td class='td-title'>{{item.buyerNumber}}</td>
                <td class='td-title'>{{item.sellerNumber}}</td>
              </tr>
            </tbody>
          </table>
          <div style='margin: 10px 0; overflow:hidden' class='text-green'>
            数量/单价（数量合计：{{totalQuantity[index]}}&nbsp 毛利率：{{item.maoliPoint | formateNumber}}%）
          </div>
          <table>
            <tr>
              <td class='td-title'>采购数量</td>
              <td class='td-title'>采购单价</td>
              <td class='td-title'>成本单价</td>
              <td class='td-title'>销售单价</td>
              <td class='td-title'>采购小计</td>
              <td class='td-title'>成本小计</td>
              <td class='td-title'>销售小计</td>
            </tr>
            <tr v-for='color in item.colorList'>
              <td>{{color.quantity}}{{color.quantityUnit}}</td>
              <td>{{color.buyPrice}}{{color.buyPriceUnit}}</td>
              <td>{{color.costPrice}}{{color.costPriceUnit}}</td>
              <td>{{color.salePrice}}{{color.salePriceUnit}}</td>
              <td>{{Number(color.quantity * color.buyPrice).toFixed(2)}} 元</td>
              <td>{{Number(color.quantity * color.costPrice).toFixed(2)}} 元</td>
              <td>{{Number(color.quantity * color.salePrice).toFixed(2)}} 元</td>
            </tr>
          </table>
        </div>
      </div>
      <div v-for="(url, key) in item.madanImgUrls">
        <div class="container-img container-detail get-img" :class="index == (printData.length -1) && !item.certificateImgUrls.length && (!item.certificateImgUrls && (key = (item.madanImgUrls.length - 1))) ? '' : 'new-page'">
          <p class="title">码单图片</p>
          <img class="imgs" :src="imgPath+url" id="perfectyang">
        </div>
      </div>
      <div v-for="(certificalUrl, key) in item.certificateImgUrls">
        <div class="container-img container-detail get-img" :class="index == (printData.length -1) && key == (item.madanImgUrls.length - 1) ? '' : 'new-page'">
          <p class="title">采购商付款凭据</p>
          <img class="imgs" :src="imgPath + certificalUrl">
        </div>
      </div>
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
  .text-green {
    color: #37B36B;
  }
  .text-red {
    color: red;
  }
  .logo {
    position: relative;

    img {
      width: 8rem;
    }
    .print-btn {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
  .title {
    position: relative;
    display: inline;
    vertical-align: bottom;
    padding-left: 1rem;
  }
  .content-header {
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
      th {
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
  text-align: center; // padding: 0.5rem;
  // padding-top: 2.2rem;
  // padding-bottom: 2.2rem;
  .title {
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
      -ms-transform: rotate(-90deg) scale(1, 1.5);
      /* IE 9 */
      -moz-transform: rotate(-90deg) scale(1, 1.5);
      /* Firefox */
      -webkit-transform: rotate(-90deg) scale(1, 1.5);
      /* Safari and Chrome */
      transform: rotate(-90deg) scale(1, 1.5);
    }
    &.scale {
      -ms-transform: scale(1);
      /* IE 9 */
      -moz-transform: scale(1);
      /* Firefox */
      -webkit-transform: scale(1);
      /* Safari and Chrome */
      transform: scale(1);
    }
  }
}

@media print {
  .container-detail {
    display: block;
    max-width: 900px;
    min-height: 660px;
    max-height: 100%;
  }
  .new-page {
    page-break-after: always;
  }
  .container-img {
    border: none;
  }
}
</style>

<script type="text/javascript">
import { newRequest, formatTimeString } from '../../../common/utils'
import Account from 'api/account'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      imgPath: 'http://test.soouya.com',
      item: {},
      printData: [],
      totalQuantity: [],
      orderNumberList: '',
      fullscreenLoading: true
    }
  },
  mounted() {
    this.orderNumberList = this.$route.params.orderNumber.split(',');
    this.getDetail()
    console.log('params', this.$route.params)
  },
  updated() {
    this.fixImgSize()
  },
  computed: {
  },
  methods: {
    getDetail() {
      newRequest({
        url: Account.OrderProcess.getPayApplyList,
        contentType: 'application/json',
        data: {
          orderNumberList: this.orderNumberList
        },
        method: 'post'
      }, (res) => {
        this.fullscreenLoading = false
        if (res.success == 1) {
          // let colorTotal = 0
          // res.result.colorList && res.result.colorList.map((item) => {
          //   colorTotal = colorTotal + Number(item.quantity)
          // })
          // res.obj.colorTotal = colorTotal + res.obj.colorList[0].quantityUnit
          // this.item = this.PayReqFormat(res.obj)
          res.result && res.result.map((item) => {
            if (!item.madanImgUrls) {
              item.madanImgUrls = []
            }
            this.printData.push(this.PayReqFormat(item))
            let count = 0
            let countUnit = ''
            item.colorList && item.colorList.map((item) => {
              count = count + Number(item.quantity)
              countUnit = Number(count).toFixed(2) + item.quantityUnit
            })
            this.totalQuantity.push(countUnit)
          })
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
          this.item = this.PayReqFormat(res.obj)
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
      let backVal = Number(parseFloat(val, 10)).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      if (String(backVal) == '-0.00') {
        backVal = '0.00'
      }
      return backVal
    },
    fixImgSize() {
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
            imgs[i].style.minHeight = '400px'
            imgs[i].classList.add('rote90')
          } else {
            imgs[i].style.width = img.width > 900 ? 'auto' : '100%'
            imgs[i].style.height = 'auto'
            imgs[i].style.minHeight = '400px'
            imgs[i].style.maxHeight = '595px'
          }
        }
      }
    }
  }
}
</script>
