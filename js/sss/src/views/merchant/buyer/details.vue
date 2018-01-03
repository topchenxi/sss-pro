<template>
    <main>
        <header class="buyer-details-head">
            <div class="buyer-avatar">
                <img :src="'http://www.soouya.com' + customerDetails.account.headUrl"
                     width="80"
                     height="80">
            </div>
            <p class="buyer-namer">{{customerDetails.account.nickName}}</p>
            <p>上次登录：{{customerDetails.activeTime | formatData}}</p>
            <p>注册时间：{{customerDetails.createTime | formatData}}</p>
        </header>
        <el-tabs type="border-card"
                 active-name="first"
                 v-model="tab"
                 @tab-click="handleTabChange">
            <el-tab-pane label="基本信息"
                         name="first">
                <el-button @click.native="goEditBuyer"
                           style="position:absolute;right:20px;z-index:99;">编辑</el-button>
                <el-row>
                    <el-col :span="24"
                            class="list-title">基本信息</el-col>
                </el-row>
                <el-row class="buyer-info-row">
                    <el-col :span="8">采购商ID：{{customerDetails.number}}</el-col>
                    <el-col :span="8">账号状态：{{customerDetails.status}}</el-col>
                    <el-col :span="8">注册手机号：{{customerDetails.account.mobilePhone}}</el-col>
                </el-row>
                <el-row class="buyer-info-row">
                    <el-col :span="8">用户名：{{customerDetails.account.userName}}</el-col>
                    <el-col :span="8">微信号：{{customerDetails.account.unionid}}</el-col>
                    <el-col :span="8">身份证：<img :src='"http://www.soouya.com" + customerDetails.account.idCardUrl'
                             width="40"
                             height="40"
                             style="vertical-align:top"></el-col>
                </el-row>
                <el-row class="buyer-info-row">
                    <el-col :span="8">联系电话：{{customerDetails.account.tel}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"
                            class="list-title">公司信息</el-col>
                </el-row>
                <el-row class="buyer-info-row">
                    <el-col :span="8">公司名称：{{customerDetails.company}}</el-col>
                    <el-col :span="8">公司电话：{{customerDetails.tel}}</el-col>
                    <el-col :span="8">公司地址：{{customerDetails.addr}}</el-col>
                </el-row>
                <el-row class="buyer-info-row">
                    <el-col :span="8">合作意向：{{customerDetails.intent | formatIntent}}</el-col>
                    <el-col :span="8">公司类型：{{customerDetails.type | formatCompanyType}}</el-col>
                    <el-col :span="8">生产类型：{{customerDetails.productType | formatproductType}}</el-col>
                </el-row>
                <el-row class="buyer-info-row">
                    <el-col :span="8">商家人数：{{customerDetails.people | formatCompanyPeople}}</el-col>
                    <el-col :span="8">email：{{customerDetails.email}}</el-col>
                </el-row>
                <el-row class="buyer-info-row">
                    <el-col :span="8">收货地址：</el-col>
                    <el-col :span="16">
                        <template v-if="customerDetails.addressList.length">
                            {{customerDetails.addressList[0].name}} {{customerDetails.addressList[0].tel}} {{customerDetails.addressList[0].addr}} {{customerDetails.addressList[0].sendCompany}} {{customerDetails.addressList[0].sendTel}}
                        </template>
                        <template v-else>
                            暂无收货地址
                        </template>
                    </el-col>
                </el-row>
                <el-row class="buyer-info-row">
                    <el-col :span="8">收款方式：</el-col>
                    <el-col :span="16">
                        <template v-if="customerBank">
                            aaa
                        </template>
                        <template v-else>
                            暂无收款方式
                        </template>
                    </el-col>
                </el-row>
                <el-row class="buyer-info-row">
                    <el-col :span="8">跟单员：</el-col>
                    <el-col :span="16">{{customerDetails.followerName}}{{customerDetails.followerTel}}</el-col>
                </el-row>
                <el-row class="buyer-info-row">
                    <el-col :span="8">销售员</el-col>
                    <el-col :span="16">{{customerDetails.salerName}}{{customerDetails.salerTel}}</el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="账户信息"
                         name="second">
                <template v-if="customerAccount.details">
                    <el-button @click.native="showAdjustmentDialog"
                               style="position:absolute;right:20px;z-index:99;">调整</el-button>
                    <el-row class="buyer-info-row">
                        <el-col style="font-size:18px">
                            可用总额： &yen;{{customerAccount.details.available}}
                        </el-col>
                    </el-row>
                    <el-row class="buyer-info-row">
                        <el-col :span="12">可用余额：{{customerAccount.details.availableBalance}}</el-col>
                        <el-col :span="12">剩余额度：{{customerAccount.details.remainLine}}</el-col>
                    </el-row>
                    <el-row class="buyer-info-row">
                        <el-col :span="12">不可用余额：{{customerAccount.details.unavailableBalance}}</el-col>
                        <el-col :span="12">授信额度：{{customerAccount.details.creditLine}}</el-col>
                    </el-row>
                    <el-row type="flex"
                            justify="space-between"
                            align="middle"
                            style="padding-bottom:10px">
                        <el-col style="font-size:18px">账户交易记录</el-col>
                        <el-col style="text-align: right">
                            <el-date-picker v-model="customerAccount.time"
                                            type="daterange"
                                            placeholder="选择日期范围">
                            </el-date-picker>
                            <el-button @click.native="searchAccountTransaction">查询</el-button>
                        </el-col>
                    </el-row>
                </template>
                <template v-if="customerAccount.recodeList">
                    <el-table :data="customerAccount.recodeList.result"
                              style="width: 100%">
                        <el-table-column prop="transactionTime"
                                         label="交易时间">
                        </el-table-column>
                        <el-table-column prop="typeString"
                                         label="交易类型"
                                         width="100">
                        </el-table-column>
                        <el-table-column prop="info"
                                         label="交易信息">
                        </el-table-column>
                        <el-table-column prop="category"
                                         label="订单类型"
                                         width="100">
                        </el-table-column>
                        <el-table-column label="金额">
                            <template scope="scope">
                                <template v-if="String(scope.row.money).indexOf('-') > -1">
                                    <span style="color:red">{{scope.row.money}}</span>
                                </template>
                                <template v-else>
                                    <span style="color:blue">+{{scope.row.money}}</span>
                                </template>
                                | {{scope.row.moneyType == '1' ? '额度' : '余额'}}
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination @current-change="handleCustomerAccountRecodeListChangePage"
                                   :current-page="customerAccount.recodeList.thisPageNumber"
                                   :page-size="20"
                                   layout="total, prev, pager, next, jumper"
                                   :total="customerAccount.recodeList.totalCount"
                                   style="text-align:right;padding-top:20px">
                    </el-pagination>
                    <el-dialog size="small"
                               v-model="adjustmentDialog.isShow">
                        <template v-if="adjustmentDialog.isShow">
                            <el-row class="adjustment-row"
                                    type="flex"
                                    align="middle">
                                <el-col :span="8">
                                    当前结算周期： {{customerAccount.details.currentBillingCycle | formatBillingCycle}}
                                </el-col>
                                <el-col :span="8">
                                    修改结算周期:
                                    <el-select placeholder="请选择"
                                               @change="handleChangeCycle"
                                               v-model="adjustmentDialog.toBill.cycle"
                                               style="width:200px">
                                        <el-option label="周结"
                                                   :value="0"></el-option>
                                        <el-option label="半月结"
                                                   :value="1"></el-option>
                                        <el-option label="月结"
                                                   :value="2"></el-option>
                                        <el-option label="其他"
                                                   :value="-1"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="8">
                                    新结算周期：{{customerAccount.details.currentBillingCycle | formatNextDate}}生效
                                </el-col>
                            </el-row>
                            <el-row class="adjustment-row"
                                    type="flex"
                                    align="middle">
                                <el-col :span="8">当前账单日 {{customerAccount.details | formatBillDate}}
                                </el-col>
                                <el-col :span="8">
                                    修改账单日：
                                    <el-select placeholder="请选择"
                                               v-model="adjustmentDialog.date1"
                                               @change="handleChangeDate"
                                               v-show="adjustmentDialog.toBill.cycle === 0"
                                               style="width:200px">
                                        <el-option v-for="number in 7"
                                                   :label="number - 1 | formatWeek"
                                                   :value="number - 1">
                                        </el-option>
                                    </el-select>
                                    <el-select placeholder="请选择"
                                               v-model="adjustmentDialog.date2"
                                               @change="handleChangeDate"
                                               v-show="adjustmentDialog.toBill.cycle === 1"
                                               style="width:200px">
                                        <el-option label="16号/次月1号"
                                                   :value="1">16号/次月1号</el-option>
                                    </el-select>
                                    <el-select placeholder="请选择"
                                               v-model="adjustmentDialog.date3"
                                               @change="handleChangeDate"
                                               v-show="adjustmentDialog.toBill.cycle === 2"
                                               style="width:200px">
                                        <el-option v-for="number in 15"
                                                   :label="number + '号'"
                                                   :value="number">
                                        </el-option>
                                    </el-select>
                                    <el-select placeholder="请选择"
                                               v-model="adjustmentDialog.date4"
                                               @change="handleChangeDate"
                                               v-show="adjustmentDialog.toBill.cycle === -1"
                                               style="width:200px">
                                        <el-option label="其他"
                                                   :value="-1"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row class="adjustment-row"
                                    type="flex"
                                    align="middle">
                                <el-col :span="8">
                                    当前回款日： {{customerAccount.details.currentBillingDate | formatReturnDate}}
                                </el-col>
                                <el-col :span="8">
                                    修改回款日： {{adjustmentDialog.toBill.cycle | formatReturnDate}}
                                </el-col>
                            </el-row>
                            <el-row style="text-align:right;margin-top:10px">
                                <el-button @click.native="adjustmentDialog.isShow = false">取消</el-button>
                                <el-button @click.native="submitAdjustment"
                                           type="primary">确定</el-button>
                            </el-row>
                        </template>
                    </el-dialog>
                </template>
            </el-tab-pane>
            <el-tab-pane label="交易记录"
                         name="third">
                <template v-if="transactionDetail.data">
                    <div style="text-align:right; padding-bottom:10px">
                        <el-date-picker v-model="transactionDetail.time"
                                        type="daterange"
                                        align="right"
                                        placeholder="选择日期范围">
                        </el-date-picker>
                        <el-button @click.native="searchTransactionDetail"
                                   :disabled="!(Array.isArray(transactionDetail.time) && transactionDetail.time.every((item)=>{return !!item}))">搜索</el-button>
                        <el-button @click.native="downTransactionDetail"
                                   :disabled="transactionDetail.data.length === 0 && canDown">下载最近两周订单</el-button>
                    </div>
                    <template v-if="transactionDetail.data.length > 0">
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
                            <tr v-for="order in transactionDetail.data">
                                <td :rowspan="order.rowspan"
                                    v-if="order.hasOwnProperty('createTime')">{{order.createTime | formatData}}</td>
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
                                    v-if="order.hasOwnProperty('outReposityTime')">{{order.outReposityTime | formatData}}</td>
                                <td>{{order.color}}</td>
                                <td>{{order.price}}</td>
                                <td>{{order.num?order.num:'--'}}{{order.numUnit}}</td>
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
                        <div style="text-align:center;height:300px;line-height:300px">暂无数据</div>
                    </template>
                </template>
            </el-tab-pane>
            <el-tab-pane label="已出账单"
                         name="fourth">
                <template v-if="bill.list">
                    <el-row type="flex"
                            justify="space-between"
                            align="middle"
                            style="padding-bottom:20px">
                        <el-col style="font-size:18px">已出账单列表</el-col>
                        <el-col style="text-align:right">出单日期
                            <el-date-picker v-model="bill.time"
                                            type="daterange"
                                            placeholder="选择日期范围">
                            </el-date-picker>
                            <el-button @click.native="searchBillList">查询</el-button>
                        </el-col>
                    </el-row>
                    <el-table :data="bill.list.result">
                        <el-table-column label="出单日期">
                            <template scope="scope">
                                {{scope.row.billTime | formatData}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="buyerNumber"
                                         label="账单号">
                        </el-table-column>
                        <el-table-column label="账单日期">
                            <template scope="scope">
                                <span>{{scope.row.beginTime | formatData}}</span>-
                                <span>{{scope.row.endTime | formatData}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="结算方式">
                            <template scope="scope">
                                <span v-if="scope.row.billingCycle == '0'">周结</span>
                                <span v-else-if="scope.row.billingCycle == '1'">半月结</span>
                                <span v-else-if="scope.row.billingCycle == '2'">月结</span>
                                <span v-else>其他</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="总计"
                                         prop="totalMoney">
                        </el-table-column>
                        <el-table-column label="账单状态">
                            <template scope="scope">
                                <span v-if="scope.row.status == '1'">待提交</span>
                                <span v-else-if="scope.row.status == '2'">审核中</span>
                                <span v-else-if="scope.row.status == '3'">审核不通过</span>
                                <span v-else>已清偿</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="跟单员"
                                         prop="followerName">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button @click.native="goBillDetails(scope.row)">明细</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination @current-change="handleChangeBillPage"
                                   :current-page="bill.list.thisPageNumber"
                                   :page-size="20"
                                   layout="total, prev, pager, next, jumper"
                                   :total="bill.list.totalCount"
                                   style="text-align:right;padding-top:20px">
                    </el-pagination>
                </template>
            </el-tab-pane>
        </el-tabs>
    </main>
</template>
<script>
import {
    request,
    formatTimeString,
    newRequest
} from 'common/utils'
import CrmApi from 'api/crm'
import moment from 'moment'
export default {
    data() {
        const nowTime = Math.round(new Date().getTime())
        return {
            customerDetails: {
                account: {},
                addressList: []
            },
            customerAccount: {
                details: null,
                recodeList: null,
                canRender: false,
                time: []
            },
            transactionDetail: {
                data: null,
                time: [nowTime - (1000 * 60 * 60 * 24 * 14), nowTime]
            },
            bill: {
                list: null,
                time: [],
                pageNumber: 1
            },
            customerBank: null,
            customerId: this.$route.params.id,
            tab: 'first',
            adjustmentDialog: {
                isShow: false,
                toBill: {
                    cycle: 0,
                    date: 0,
                    returnDate: 0
                },
                cycle: 0,
                date1: 0,
                date2: 1,
                date3: 1,
                date4: -1,
            },
            canDown: true
        }
    },
    filters: {
        formatData(val) {
            return formatTimeString(val)
        },
        formatIntent(val) {
            let intent = ''
            switch (val) {
                case -1:
                    intent = '未评级'
                    break
                case 1:
                    intent = '意向度很高'
                    break
                case 2:
                    intent = '1-2个月内会合作'
                    break
                case 3:
                    intent = '是需要培养的 '
                    break
                case 4:
                    intent = '已签约 '
                    break
            }
            return intent
        },
        formatCompanyType(val) {
            let type = ''
            switch (val) {
                case -1:
                    type = ''
                    break
                case 0:
                    type = 'ODM'
                    break
                case 1:
                    type = 'OEM'
                    break
                case 2:
                    type = '服装公司'
                    break
                case 3:
                    type = '纯贸易公司'
                    break
            }
            return type
        },
        formatproductType(val) {
            let productType = ''
            switch (val) {
                case -1:
                    productType = ''
                    break
                case 0:
                    productType = '女装'
                    break
                case 1:
                    productType = '男装'
                    break
                case 2:
                    productType = '童装'
                    break
                case 3:
                    productType = '内衣'
                    break
                case 4:
                    productType = '手袋箱包'
                    break
            }
            return productType
        },
        formatCompanyPeople(val) {
            let people = ''
            switch (val) {
                case 0:
                    people = '20人以下'
                    break
                case 1:
                    people = '20-100人'
                    break
                case 2:
                    people = '100-500人'
                    break
                case 3:
                    people = '500人以上'
                    break
            }
            return people
        },
        formatBillingCycle(val) {
            let cycle = ''
            switch (val) {
                case 0:
                    cycle = '周结'
                    break
                case 1:
                    cycle = '半月结'
                    break
                case 2:
                    cycle = '月结'
                    break
                case -1:
                    cycle = '其他'
                    break
            }
            return cycle
        },
        formatBillDate(val) {
            let typeString = ''
            switch (String(val.currentBillingCycle)) {
                case '0':
                    typeString = `星期${val.currentBillingDate}`
                    break
                case '1':
                    typeString = '16号/次月1号'
                    break
                case '2':
                    typeString = `${val.currentBillingDate}号`
                    break
                case '-1':
                    typeString = '其他'
                    break
            }
            return typeString
        },
        formatReturnDate(val) {
            let typeString = ''
            switch (String(val)) {
                case '0':
                    typeString = '账单日之后三天'
                    break
                case '1':
                    typeString = '20号/次月5号'
                    break
                case '2':
                    typeString = '账单日之后十天'
                    break
                case '-1':
                    typeString = '其他'
                    break
            }
            return typeString
        },
        formatWeek(val, a) {
            let day = ''
            switch (val) {
                case 0:
                    day = '星期一'
                    break
                case 1:
                    day = '星期二'
                    break
                case 2:
                    day = '星期三'
                    break
                case 3:
                    day = '星期四'
                    break
                case 4:
                    day = '星期五'
                    break
                case 5:
                    day = '星期六'
                    break
                case 6:
                    day = '星期天'
                    break
                default:
                    day = val
            }
            return day
        },
        formatNextDate(currentBillingCycle) {
            const date = new Date()
            const nowYear = date.getFullYear() //  Date 对象返回一个月中的某一天
            const nowMonth = moment().month() //  Date 对象返回一某月
            const nowDate = moment().date() //  Date 对象返回一个月中的某一天
            const nowDay = moment().day() // 对象返回一周中的某一天
            let after = ''
            if (currentBillingCycle == '0') { // 周结
                const left = 7 - nowDay
                after = moment().add(left + 1, 'd')
            } else if (currentBillingCycle == '1') { // 半月结
                after = nowDate > 15 ? moment([nowYear, nowMonth, '1']).add(1, 'M') : moment([nowYear, nowMonth, '16'])
            } else if (currentBillingCycle == '2') { // 月结
                after = moment([nowYear, nowMonth, '1']).add(1, 'M')
            } else if (currentBillingCycle == '-1') {
                after = moment().add(1, 'd')
            }
            return after.format('YYYY-MM-DD')
        }
    },
    mounted() {
        this.getCustomerDetails(this.customerId)
        this.getCustomerBank(this.customerId)
    },
    methods: {
        handleChangeDate(val) {
            this.adjustmentDialog.toBill.date = val
        },
        getCustomerDetails(customerId) {
            request({
                url: CrmApi.customer.getDetails,
                data: {
                    id: customerId
                }
            }).then((response) => {
                if (response.success === '1') {
                    this.customerDetails = response.entry
                }
            })
        },
        getCustomerBank(customerId) {
            request({
                url: CrmApi.bankAccount.getBankAccountList,
                data: {
                    customerId: customerId
                }
            }).then((response) => {
                if (response.success === '1') {
                    this.customerBank = response.result
                }
            })
        },
        getCustomerAccount(customerId) {
            request({
                url: CrmApi.customerAccount.accountDetails,
                data: {
                    id: customerId
                }
            }).then((response) => {
                if (response.success === '1') {
                    this.customerAccount.details = response.entry
                    this.canRenderCustomerAccount()
                    if (response.entry) {
                        this.adjustmentDialog.bill = {
                            cycle: response.entry.currentBillingCycle,
                            date: response.entry.currentBillingDate,
                            returnDate: response.entry.currentReturnDate,
                        }
                        this.adjustmentDialog.toBill = {
                            cycle: response.entry.toBillingCycle,
                            date: 0,
                            returnDate: response.entry.toReturnDate,
                        }
                    }
                }
            })
        },
        getTransactionRecordList(customerId, pageNumber) {
            let recordListTime = {}
            if (this.customerAccount.time.length > 0 && this.customerAccount.time.every((item) => { return !!item })) {
                recordListTime.transactionTimeBegin = new Date(this.customerAccount.time[0]).getTime()
                recordListTime.transactionTimeEnd = new Date(this.customerAccount.time[1]).getTime()
            }
            request({
                url: CrmApi.transactionRecord.list,
                data: Object.assign(recordListTime, {
                    customerId: customerId,
                    pageNumber: pageNumber || 1
                })
            }).then((response) => {
                if (response.success === '1') {
                    this.customerAccount.recodeList = response.page
                    this.canRenderCustomerAccount()
                }
            })
        },
        getTransactionDetail(options) {
            let transactionDetailTime = {}
            if (this.transactionDetail.time.length > 0 && this.transactionDetail.time.every((item) => { return !!item })) {
                transactionDetailTime.createTimeBegin = new Date(this.transactionDetail.time[0]).getTime()
                transactionDetailTime.createTimeEnd = new Date(this.transactionDetail.time[1]).getTime()
            }
            newRequest({
                url: CrmApi.omsTransactionDetail.omsTransactionDetail,
                method: 'get',
                data: Object.assign(transactionDetailTime, options, { export: 0 }),
            }).then((response) => {
                if (response.success === '1') {
                    this.transactionDetail.data = formatData(response.result)
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
        getBillList(customerId, pageNumber) {
            let billTime = {}
            if (this.bill.time.length > 0 && this.bill.time.every((item) => { return !!item })) {
                billTime.billTimeBegin = new Date(this.bill.time[0]).getTime()
                billTime.billTimeEnd = new Date(this.bill.time[1]).getTime()
            }
            newRequest({
                url: CrmApi.bill.list,
                method: 'get',
                data: Object.assign(billTime, {
                    customerId: customerId,
                    pageNumber: pageNumber || 1
                })
            }).then((response) => {
                if (response.success === '1') {
                    this.bill.list = response.page
                }
            })
        },
        canRenderCustomerAccount() {
            if (this.customerAccount.recodeList && this.customerAccount.details) {
                this.customerAccount.canRender = true
            }
        },
        handleTabChange(idx) {
            if (idx.index === '1') {
                if (!this.customerAccount.details && !this.customerAccount.recodeList) {
                    this.getCustomerAccount(this.customerId)
                    this.getTransactionRecordList(this.customerId, 1)
                }
            } else if (idx.index === '2') {
                if (!this.transactionDetail.data) {
                    this.getTransactionDetail({ customerId: this.customerId })
                }
            } else if (idx.index === '3') {
                this.getBillList(this.customerId)
            }
        },
        handleCustomerAccountRecodeListChangePage(currentPage) {
            this.getTransactionRecordList(this.customerId, currentPage)
        },
        goBillDetails(billData) {
            this.$router.push({
                name: 'billDetails',
                params: {
                    customerId: '70ff304d-d679-4d90-8133-06ebd4751f90',
                    billId: '1a4fdee6-e926-4d04-ab42-8c916e434345',
                    billTimeEnd: 1490976000000
                }
            })
        },
        searchTransactionDetail() {
            let createTimeBegin = new Date(this.transactionDetail.time[0]).getTime()
            let createTimeEnd = new Date(this.transactionDetail.time[1]).getTime()
            if (createTimeEnd - createTimeBegin > 1000 * 60 * 60 * 24 * 14) {
                this.$message.error('可选最大时间范围为两周');
            } else {
                this.getTransactionDetail({ customerId: this.customerId })
            }
        },
        downTransactionDetail() {
            this.canDown = false
            let transactionDetailTime = {
                export: 1,
                customerId: this.customerId
            }
            if (this.transactionDetail.time.length > 0 && this.transactionDetail.time.every((item) => { return !!item })) {
                transactionDetailTime.createTimeBegin = new Date(this.transactionDetail.time[0]).getTime()
                transactionDetailTime.createTimeEnd = new Date(this.transactionDetail.time[1]).getTime()
            }
            newRequest({
                url: CrmApi.omsTransactionDetail.omsTransactionDetail,
                method: 'get',
                data: transactionDetailTime
            }).then((response) => {
                if (response.success === '1') {
                    window.open(response.obj)
                    this.canDown = true
                }
            })
        },
        handleChangeBillPage(currentPage) {
            this.getBillList(this.customerId, currentPage)
        },
        searchBillList() {
            this.getBillList(this.customerId)
        },
        searchAccountTransaction() {
            this.getTransactionRecordList(this.customerId)
        },
        goEditBuyer() {
            let host = location.host.indexOf('test') > -1 ? 'http://testoms-n.soouya.com' : 'http://oms-n.soouya.com'
            location.href = `${host}/merchantSys/editBuyer?id=${this.customerId}&action=update`
            //   this.$router.push({
            //       name: 'editBuyer',
            //       params: {
            //           customerId: this.customerId
            //       }
            //   })
        },
        showAdjustmentDialog() {
            this.adjustmentDialog.isShow = true
        },
        handleChangeCycle(val) {
            if (val === 2) {
                this.adjustmentDialog.toBill.date = 1
            } else {
                this.adjustmentDialog.toBill.date = val
            }
        },
        submitAdjustment() {
            let postData = {
                id: this.customerId,
                toBillingCycle: this.adjustmentDialog.toBill.cycle,
                toBillingDate: this.adjustmentDialog.toBill.date,
                toReturnDate: this.adjustmentDialog.toBill.returnDate
            }
            request({
                url: CrmApi.customerAccount.update,
                method: 'post',
                data: postData
            }).then((response) => {
                if (response.success === '1') {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    this.adjustmentDialog.isShow = false
                }
            })
        }
    }
}
</script>


<style scoped lang="scss">
.adjustment-row{
    text-align: left;
    padding: 10px 0;
}
.buyer-info-row{
    height: 40px;
    line-height: 40px
}
.buyer-details-head{
    background: #fff;
    margin-bottom: 20px;
    padding: 20px;
    line-height: 1.5;
    text-align: right;
    box-shadow: 1px 1px 3px #ccc;
}
.buyer-avatar{
    text-align: center;
    margin-bottom: 10px;
}
.buyer-namer{
    text-align: center;
}
.list-title{
    font-size: 18px;
    padding: 10px 0;
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
