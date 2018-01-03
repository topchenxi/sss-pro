<template>
    <section>
        <template v-if="customerDetails">
            <el-row style="font-size:18px">
                {{customerDetails.buyerCompany}}
            </el-row>
            <el-row class="buyer-info-row">
                <el-col>
                    <span>采购商ID：{{customerDetails.buyerId}}</span>
                </el-col>
            </el-row>
            <el-row class="buyer-info-row">
                <el-col :span="12">
                    账单号：{{customerDetails.buyerNumber}}
                </el-col>
                <el-col :span="12">
                    还款到期日：{{customerDetails.returnDate | formatData}}
                </el-col>
            </el-row>
            <el-row class="buyer-info-row">
                <el-col :span="12">
                    账单日期：{{customerDetails.beginTime | formatData}} - {{customerDetails.endTime | formatData}}
                </el-col>
                <el-col :span="12">
                    清偿日：{{customerDetails.dischargeTime | formatData}}
                </el-col>
            </el-row>
            <el-row class="buyer-info-row">
                <el-col :span="12">
                    结算周期：{{customerDetails.billingCycle}}
                </el-col>
                <el-col :span="12">
                    跟单员：{{customerDetails.followerName}}
                </el-col>
            </el-row>
            <el-row style="padding:10px">
                <el-col>
                    <span style="font-size:18px;padding:5px 20px;border:1px solid #999">
                            <template v-if="customerDetails.status == '1'">未提交</template>
                        <template v-else-if="customerDetails.status == '2'">审核中</template>
                        <template v-else-if="customerDetails.status == '3'">审核不通过</template>
                        <template style="font-size:18px" v-else>已清偿</template>
                        </span>
                </el-col>
            </el-row>
        </template>
        <template v-if="billDetails">
            <p class="list-title">账单明细列表</p>
            <el-tabs v-model="tabActive"
                     @tab-click="handleTabChange">
                <el-tab-pane label="当前订单"
                             name="first">
                    <template v-if="billDetails">
                        <table class="transaction-table">
                            <tr>
                                <th>交易时间</th>
                                <th>订单类型</th>
                                <th>订单号</th>
                                <th>货号</th>
                                <th>供应商档口名称</th>
                                <th>交易类型</th>
                                <th>出仓单号</th>
                                <th>出仓时间</th>
                                <th>色号</th>
                                <th>销售单价</th>
                                <th>数量\单位\出仓细码</th>
                                <th>销售货款</th>
                                <th>出仓销售货款</th>
                                <th>运费</th>
                                <th>订单总金额</th>
                                <th>订单退款</th>
                                <th>订单欠款</th>
                            </tr>
                            <tr v-for="order in billDetails">
                                <td :rowspan="order.rowspan"
                                    v-if="order.hasOwnProperty('createTime')">{{order.createTime}}</td>
                                <td :rowspan="order.rowspan"
                                    v-if="order.hasOwnProperty('orderType')">{{order.orderType}}</td>
                                <td :rowspan="order.rowspan"
                                    v-if="order.hasOwnProperty('orderNumber')">{{order.orderNumber}}</td>
                                <td :rowspan="order.rowspan"
                                    v-if="order.hasOwnProperty('orderNumber')">{{order.productNumber}}</td>
                                <td :rowspan="order.rowspan"
                                    v-if="order.hasOwnProperty('shopCompany')">{{order.shopCompany}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('type')">{{order.type}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('outReposityNumber')">{{order.outReposityNumber}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('outReposityTime')">{{order.outReposityTime}}</td>
                                <td>{{order.color}}</td>
                                <td>{{order.price}}</td>
                                <td>{{order.num?order.num:'--'}}</td>
                                <td>{{order.salePrice}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('outReposityMoney')">{{order.outReposityMoney ? order.outReposityMoney : '--'}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('freight')">{{order.freight?order.freight:'--'}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('totalMoney')">{{order.totalMoney?order.totalMoney : '--'}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('refund')">{{order.refund?order.refund : '--'}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('debt')">{{order.debt?order.debt : '--'}}</td>
                            </tr>
                        </table>
                    </template>
                    <template v-else>
                        <div>暂无数据</div>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="顺延订单"
                             name="second">
                    <template v-if="delayBillDetails">
                        <table class="transaction-table">
                            <tr>
                                <th>交易时间</th>
                                <th>订单类型</th>
                                <th>订单号</th>
                                <th>货号</th>
                                <th>供应商档口名称</th>
                                <th>交易类型</th>
                                <th>出仓单号</th>
                                <th>出仓时间</th>
                                <th>色号</th>
                                <th>销售单价</th>
                                <th>数量\单位\出仓细码</th>
                                <th>销售货款</th>
                                <th>出仓销售货款</th>
                                <th>运费</th>
                                <th>订单总金额</th>
                                <th>订单退款</th>
                                <th>订单欠款</th>
                            </tr>
                            <tr v-for="order in delayBillDetails">
                                <td :rowspan="order.rowspan"
                                    v-if="order.hasOwnProperty('createTime')">{{order.createTime}}</td>
                                <td :rowspan="order.rowspan"
                                    v-if="order.hasOwnProperty('orderType')">{{order.orderType}}</td>
                                <td :rowspan="order.rowspan"
                                    v-if="order.hasOwnProperty('orderNumber')">{{order.orderNumber}}</td>
                                <td :rowspan="order.rowspan"
                                    v-if="order.hasOwnProperty('orderNumber')">{{order.productNumber}}</td>
                                <td :rowspan="order.rowspan"
                                    v-if="order.hasOwnProperty('shopCompany')">{{order.shopCompany}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('type')">{{order.type}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('outReposityNumber')">{{order.outReposityNumber}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('outReposityTime')">{{order.outReposityTime}}</td>
                                <td>{{order.color}}</td>
                                <td>{{order.price}}</td>
                                <td>{{order.num?order.num:'--'}}</td>
                                <td>{{order.salePrice}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('outReposityMoney')">{{order.outReposityMoney ? order.outReposityMoney : '--'}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('freight')">{{order.freight?order.freight:'--'}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('totalMoney')">{{order.totalMoney?order.totalMoney : '--'}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('refund')">{{order.refund?order.refund : '--'}}</td>
                                <td :rowspan="order.categoryRowspan"
                                    v-if="order.hasOwnProperty('debt')">{{order.debt?order.debt : '--'}}</td>
                            </tr>
                        </table>
                    </template>
                    <template v-else>
                        <div>暂无数据</div>
                    </template>
                </el-tab-pane>
            </el-tabs>
            <el-row style="padding:30px 0">
                <el-col :span="16">
                    <span>备注：</span>
                    <span>{{customerDetails.financeRemark}}</span>
                </el-col>
                <el-col :span="8" style="text-align:right">
                    <el-col>应收款：<span style="color:red">{{customerDetails.totalMoney}}</span></el-col>
                    <el-col>余额抵扣：<span style="color:red">-{{customerDetails.freezeMoney}}</span></el-col>
                    <el-col>滞纳金：<span style="color:red">{{customerDetails.lateFeesMoney}}</span></el-col>
                    <el-col>总计：<span style="color:red">{{customerDetails.totalMoney - customerDetails.freezeMoney + customerDetails.lateFeesMoney}}</span></el-col>
                </el-col>
            </el-row>
        </template>
    </section>
</template>
<script>
import {
    request,
    // setCache,
    formatTimeString,
    newRequest
} from 'common/utils'
import CrmApi from 'api/crm'
export default {
    data() {
        return {
            customerDetails: null,
            billDetails: null,
            delayBillDetails: null,
            tabActive: 'first'
        }
    },
    mounted() {
        this.getUserDetails(this.$route.params.billId)
        this.getTransactionDetail({
            customerId: this.$route.params.customerId,
            billId: this.$route.params.billId,
            export: 0
        })
    },
    filters: {
        formatData(val) {
            return formatTimeString(val)
        },
    },
    methods: {
        getUserDetails(customerId) {
            request({
                url: CrmApi.bill.userDetails,
                data: {
                    id: customerId
                }
            }).then((response) => {
                if (response.success === '1') {
                    this.customerDetails = response.entry
                }
            })
        },
        getTransactionDetail(options) {
            newRequest({
                url: CrmApi.omsTransactionDetail.omsTransactionDetail,
                method: 'get',
                data: options
            }).then((response) => {
                if (response.success === '1') {
                    this.billDetails = formatData(response.result)
                }
            })
            function formatData(data) {
                let result = []
                let lastOrderNumber
                let lastOrderType
                let lastOrderOutReposityNumber
                let lastItem
                let lastCategory
                data.forEach((item, index) => {
                    item.rowspan = 1
                    item.categoryRowspan = 1
                    item.outReposityMoney = item.outReposityMoney || ''
                    if (result.length > 0 && lastOrderNumber === item.orderNumber) {
                        lastItem.rowspan++
                        if (lastOrderType === item.type && lastOrderOutReposityNumber === item.outReposityNumber) {
                            lastCategory.categoryRowspan++
                            result.push({
                                color: item.color,
                                price: item.price,
                                num: item.num,
                                numUnit: item.numUnit,
                                salePrice: item.salePrice
                            })
                        } else {
                            let category = {
                                outReposityTime: item.outReposityTime,
                                outReposityMoney: item.outReposityMoney,
                                freight: item.freight,
                                totalMoney: item.totalMoney,
                                refund: item.refund,
                                debt: item.debt,
                                type: item.type,
                                outReposityNumber: item.outReposityNumber,
                                categoryRowspan: item.categoryRowspan,
                                color: item.color,
                                price: item.price,
                                num: item.num,
                                numUnit: item.numUnit,
                                salePrice: item.salePrice
                            }
                            lastOrderOutReposityNumber = item.outReposityNumber
                            lastOrderType = item.type
                            lastCategory = category
                            result.push(category)
                        }
                    } else {
                        lastOrderNumber = item.orderNumber
                        lastOrderOutReposityNumber = item.outReposityNumber
                        lastOrderType = item.type
                        lastCategory = item
                        lastItem = item
                        result.push(item)
                    }
                })
                return result
              }
        },
        getDelayTransactionDetail(options) {
newRequest({
                url: CrmApi.omsTransactionDetail.omsTransactionDetail,
                method: 'get',
                data: options
            }).then((response) => {
                if (response.success === '1') {
                    this.delayBillDetails = formatData(response.result)
                }
            })
            function formatData(data) {
                let result = []
                let lastOrderNumber
                let lastOrderType
                let lastOrderOutReposityNumber
                let lastItem
                let lastCategory
                data.forEach((item, index) => {
                    item.rowspan = 1
                    item.categoryRowspan = 1
                    item.outReposityMoney = item.outReposityMoney || ''
                    if (result.length > 0 && lastOrderNumber === item.orderNumber) {
                        lastItem.rowspan++
                        if (lastOrderType === item.type && lastOrderOutReposityNumber === item.outReposityNumber) {
                            lastCategory.categoryRowspan++
                            result.push({
                                color: item.color,
                                price: item.price,
                                num: item.num,
                                numUnit: item.numUnit,
                                salePrice: item.salePrice
                            })
                        } else {
                            let category = {
                                outReposityTime: item.outReposityTime,
                                outReposityMoney: item.outReposityMoney,
                                freight: item.freight,
                                totalMoney: item.totalMoney,
                                refund: item.refund,
                                debt: item.debt,
                                type: item.type,
                                outReposityNumber: item.outReposityNumber,
                                categoryRowspan: item.categoryRowspan,
                                color: item.color,
                                price: item.price,
                                num: item.num,
                                numUnit: item.numUnit,
                                salePrice: item.salePrice
                            }
                            lastOrderOutReposityNumber = item.outReposityNumber
                            lastOrderType = item.type
                            lastCategory = category
                            result.push(category)
                        }
                    } else {
                        lastOrderNumber = item.orderNumber
                        lastOrderOutReposityNumber = item.outReposityNumber
                        lastOrderType = item.type
                        lastCategory = item
                        lastItem = item
                        result.push(item)
                    }
                })
                return result
              }
        },
        handleTabChange(tab) {
            if (tab.index == 1) {
                this.getTransactionDetail({
                    customerId: this.$route.params.customerId,
                    billId: this.$route.params.billId,
                    export: 0,
                    billTimeEnd: this.$route.params.billTimeEnd,
                })
            }
        }
    }
}
</script>
<style scoped lang="scss">
.list-title{
    font-size: 18px;
    padding: 10px 0;
}
.buyer-info-row{
    height: 40px;
    line-height: 40px
}
.transaction-table{
     border-collapse: collapse;
     width: 100%;
     th{
         background: #eef1f6;
         padding: 10px;
         border: 1px solid #ccc;
     }
    td{
        border: 1px solid #ccc;
        text-align: center;
        padding: 5px;
    }
}
</style>
