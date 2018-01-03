<template>
    <div>
        <section v-if="customerAccount.canRender">
        <el-row>
            <el-col>
                可用总额： ￥{{customerAccount.details.available}}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">可用余额：{{customerAccount.details.availableBalance}}</el-col>
            <el-col :span="12">剩余额度：{{customerAccount.details.remainLine}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="12">不可用余额：{{customerAccount.details.unavailableBalance}}</el-col>
            <el-col :span="12">授信额度：{{customerAccount.details.creditLine}}</el-col>
        </el-row>
        <p>账户交易记录</p>
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
    </section>
    </div>
</template>
<script>
  import {
    request,
    // setCache,
    // formatTimeString
  } from 'common/utils'
    import CrmApi from 'api/crm'
export default {
    data() {
        return {
            customerAccount: {
                details: null,
                recodeList: null,
                canRender: false
            },
            customerId: this.$route.params.id
        }
    },
    created() {
        this.getCustomerAccount(this.customerId)
        this.getTransactionRecordList(this.customerId)
    },
    mounted() {
        console.log(1)
    },
    methods: {
        getTransactionRecordList(customerId) {
            request({
                url: CrmApi.transactionRecord.list,
                data: {
                    customerId: customerId
                }
            }).then((response) => {
                if (response.success === '1') {
                    this.customerAccount.recodeList = response.page
                    this.canRenderCustomerAccount()
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
                }
            })
        },
        canRenderCustomerAccount() {
            if (this.customerAccount.recodeList && this.customerAccount.details) {
                console.log(1)
                this.customerAccount.canRender = true
            }
        },
        handleCustomerAccountRecodeListChangePage(currentPage) {
            console.log(currentPage)
        }
    }
}
</script>
