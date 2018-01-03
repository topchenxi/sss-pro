
<template>

<div class="pay-receipt">
    <div class="y_tab tab-wrap">
        <el-tabs type="card" :active-name="tabIndex" @tab-click="handleClick">
            <el-tab-pane name="1" label="待收付款记录"></el-tab-pane>
            <el-tab-pane name="2" label="已收款"></el-tab-pane>
            <el-tab-pane name="3" label="已付款"></el-tab-pane>
        </el-tabs>
    </div>

    <fliter :category="{name: 'buyerpr', index: tabIndex }" :params="filters" @getParams="search" />

    <!-- 待收付款 -->
    <div class="waitlist" v-if="tabIndex == '1'">
        <div class="y_table">
           <div v-for="(arr, index) in result">
                <p class="notify-title">
                    <input type="checkbox" :checked="arr.checked" :id="index"  @change="checkAll(arr, index, e)" />
                    <label :for="index" style="padding-left: 5px; cursor: pointer">供应商：{{arr.sellerName}}</label>
                </p>
                <div class="y_table_wrap mb">
                     <el-table
                      :data="arr.list"
                      border
                      style="width: 100%"
                      :max-height="300"
                      :row-class-name="tableRow"
                      >
                      <el-table-column fixed width="50" inline-template>
                         <div>
                          <input type="checkbox" v-model="row.checked" @change="updateChecked(arr, index, index + 1)" />
                         </div>
                      </el-table-column>
                      <el-table-column prop="returnReplaceNumber" label="退换货单号" min-width="120"></el-table-column>
                      <el-table-column prop="serviceNumber" label="订单号" min-width="120"></el-table-column>
                      <el-table-column label="订单类型" inline-template min-width="125">
                        <div>
                          <template v-if="row.type == '1'">服务单</template>
                          <template v-if="row.type == '2'">贸易单</template>
                        </div>
                      </el-table-column>
                      <el-table-column prop="returnReplaceCreateTime" label="退换货申请时间" width="120">
                      </el-table-column>
                      <el-table-column prop="buyerName" label="采购商" min-width="120"></el-table-column>
                      <el-table-column inline-template label="品类" min-width="120">
                        <div>
                         <template v-if="row.productType == '0'">花型</template>
                          <template v-if="row.productType == '1'">面料</template>
                          <template v-if="row.productType == '2'">辅料</template>
                          <template v-if="row.productType == '3'">底布</template>
                          <template v-if="row.productType == '4'">花布</template>
                        </div>
                      </el-table-column>
                        <el-table-column width="120" align="center" label="应收应付金额">
                          <template scope="scope">
                            {{scope.row.yinShouYiFuMoney}}元
                          </template>
                        </el-table-column>
                        <!--<el-table-column width="120" align="center" label="实收实付金额">
                          <template scope="scope">
                            {{scope.row.shiShouShiFuMoney}}元
                          </template>
                        </el-table-column>-->
                        <el-table-column width="120" align="center" label="修改后金额">
                          <template scope="scope">
                            {{scope.row.shiShouShiFuMoney}}元
                          </template>
                        </el-table-column>
                      <el-table-column label="退换类型" inline-template min-width="120">
                        <div>
                            <template v-if="row.returnReplaceType == '1'">售前退货</template>
                            <template v-if="row.returnReplaceType == '2'">售前换货</template>
                            <template v-if="row.returnReplaceType == '3'">售后退货</template>
                            <template v-if="row.returnReplaceType == '4'">售后换货</template>
                        </div>
                      </el-table-column>
                      <el-table-column label="款项类型" inline-template min-width="120">
                        <div>
                          <template v-if="row.moneyType == '1'">搜芽补款</template>
                          <template v-if="row.moneyType == '2'">供应商退款</template>
                        </div>
                      </el-table-column>
                      <el-table-column label="操作" fixed="right" inline-template width="150">
                        <div class="operate-btn">
                            <template v-if="row.moneyType == '1'"><el-button class="o-btn" size="small" @click.native="confirmInfo(row)">确认收款</el-button></template>
                            <template v-if="row.moneyType == '2'"><el-button class="o-btn" size="small" @click.native="confirmInfo(row)">确认付款</el-button></template>
                        </div>
                      </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="no-data" v-if="result.length == 0">
             没有数据啊^__^!!
        </div>
        <div class="showTotal clearfix">
            <p style="float: left; padding-top: 8px;">
                <span class="item">收款金额：<strong style="color: red;">{{getTotalMoney}}</strong>元</span>
                <span class="item">付款金额：<strong style="color: red;">{{payTotalMoney}}</strong>元</span>
                <span class="item">{{getTotalMoney - payTotalMoney >= 0 ? '总收款金额：' : '总付款金额：'}}<strong style="color: red;">{{totalMoney}}</strong>元</span>
            </p>
            <p style="float: right;"><el-button type="primary" :disabled="!getId.choseArr.length" @click.native="confirmList">确认</el-button></p>
        </div>
    </div>

    <!-- 已收付款 -->
    <div class="y_table" v-if="tabIndex != '1'">
        <div class="y_table_wrap">
            <el-table :data="recordList.result" :resizable="false" :height="height">
                <el-table-column prop="returnReplaceCreateTime" label="收款时间" width="130" align="center">
                    </el-table-column>
                <el-table-column prop="returnReplaceNumber" label="退换货单号" min-width="130" align="center">
                </el-table-column>
                <el-table-column prop="serviceNumber" align="center" label="订单号" min-width='140'>
                </el-table-column>
                <el-table-column inline-template align="center" label="订单类型" width='130'>
                    <div>
                        <template v-if="row.type == '1'">服务单</template>
                        <template v-if="row.type == '2'">贸易单</template>
                    </div>
                </el-table-column>
                <el-table-column prop="returnReplaceCreateTime" align="center" width="130" label="退换货申请时间">
                </el-table-column>
                <el-table-column prop="buyerName" align="center" label="采购商" min-width="120">
                </el-table-column>
                <el-table-column prop="sellerName" align="center" min-width="120" label="供应商">
                </el-table-column>
                <el-table-column inline-template align="center" label="品类" width="80">
                    <div>
                        <template v-if="row.productType == '0'">花型</template>
                        <template v-if="row.productType == '1'">面料</template>
                        <template v-if="row.productType == '2'">辅料</template>
                        <template v-if="row.productType == '3'">底布</template>
                        <template v-if="row.productType == '4'">花布</template>
                    </div>
                </el-table-column>
                <el-table-column width="120" align="center" label="应收应付金额">
                  <template scope="scope">
                    {{scope.row.yinShouYiFuMoney}}元
                  </template>
                </el-table-column>
                <el-table-column width="120" align="center" label="实收实付金额">
                  <template scope="scope">
                    {{scope.row.shiShouShiFuMoney}}元
                  </template>
                </el-table-column>
                <el-table-column width="120" align="center" label="修改后金额">
                  <template scope="scope">
                    {{scope.row.shiShouShiFuMoney}}元
                  </template>
                </el-table-column>
                <el-table-column inline-template align="center" label="退换类型" width='130'>
                    <div>
                        <template v-if="row.returnReplaceType == '1'">售前退货</template>
                        <template v-if="row.returnReplaceType == '2'">售前换货</template>
                        <template v-if="row.returnReplaceType == '3'">售后退货</template>
                        <template v-if="row.returnReplaceType == '4'">售后换货</template>
                    </div>
                </el-table-column>
                <el-table-column inline-template width="120" align="center" label="状态">
                    <div>
                        <template v-if="row.moneyType == '1'">{{row.statusDesc}}</template>
                        <template v-if="row.moneyType == '2'">{{row.statusDesc}}</template>
                    </div>
                </el-table-column>
            </el-table>
        </div>
        <div class="bottom">
            <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
        </div>
    </div>
    <!-- 确认收付款-->
    <el-dialog :title="confirmData.moneyType == '1' ? '确认收款':'确认付款'" v-model="confirmReceipt" custom-class="common-pop" size="tiny" :close-on-click-modal="false">
        <div class="take-good clearfix send-good">
            <div class="t-confirm">
                <template v-if="confirmData.moneyType == '1'">
                    确认已收到货款？
                </template>
                <template v-if="confirmData.moneyType == '2'">
                    确认已付款给财务？
                </template>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="confirmBtn()">确定</el-button>
            <el-button @click.native="confirmReceipt=false;">取消</el-button>
        </div>
    </el-dialog>
    <!-- 确认清帐-->
    <el-dialog title="确认清帐" v-model="confirmChoosed" custom-class="common-pop" size="tiny" :close-on-click-modal="false">
        <div class="take-good clearfix send-good">
            <div class="t-confirm">
                确认是否已清帐完成？
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="confirmBtn()">确定</el-button>
            <el-button @click.native="confirmChoosed=false;">取消</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
import Fliter from 'components/filter'
import Pagination from 'components/pagination'
import StoreApi from 'api/reposity'
import { mapActions, mapState } from 'vuex'
import {
    request,
    formatTimeString,
    culSub
}
from 'utils/tool'
export default {
    components: {
        Fliter,
        Pagination
    },
    data() {
        return {
            pagation: {
                pageNumber: 1,
                pageSize: 20,
                totalCount: 1,
            },
            confirmReceipt: false,
            confirmChoosed: false,
            confirmData: {},
            ids: {},
            list: [],
            tabIndex: '1',
            filters: {
                type: '',
                keyWord: '',
                pageSize: 20,
                pageNumber: 1
            },
            height: 600,
            result: [],
            recordList: {},
            _time: 0
        }
    },
    mounted() {
      this.countH()
      window.addEventListener('resize', this.countH)
      this.initCondition()
      this.reqList()
    },
    computed: {
        getId () {
           let choseArr = []
           let orderNumberList = []
           let buyerId = ''
           this.result.forEach((item) => {
              if (item.checked) {
                buyerId = item.buyerId
              }
              item.list.forEach((item) => {
                if (item.checked) {
                  choseArr.push(item)
                  orderNumberList.push(item.id)
                }
              })
           })
           return {choseArr, orderNumberList, buyerId}
        },
        getTotalMoney () {
            let shishou = 0
            this.getId.choseArr.forEach((item) => {
                if (item.moneyType == 1) { // 搜芽补款，收款
                    shishou += Number(item.shiShouShiFuMoney)
                }
            })
            return Number(shishou).toFixed(2)
        },
        payTotalMoney () {
            let shifu = 0
            this.getId.choseArr.forEach((item) => {
                if (item.moneyType == 2) { // 供应商退款，付款
                    shifu += Number(item.shiShouShiFuMoney)
                }
            })
            return Number(shifu).toFixed(2)
        },
        totalMoney () {
            let get = this.getTotalMoney
            let pay = this.payTotalMoney
            if (culSub(get, pay) >= 0) {
                return culSub(get, pay).toFixed(2)
            } else {
                return culSub(pay, get).toFixed(2)
            }
        },
        ...mapState({
            condition: state => {
                return {
                    tabIndex: state.buyerReturnRepalce.tabIndex
                }
            }
        })
    },
    methods: {
        initCondition () {
          this.tabIndex = this.condition.tabIndex
        },
        ...mapActions([
          'updateVuexData'
        ]),
        handleClick(val) {
            this.tabIndex = String(val.name)
            if (this.tabIndex == '1') {
                this.reqList({
                    type: '',
                    keyword: ''
                })
            }
            if (this.tabIndex == '2') { // 已收款
                this.reqReceivedList({
                    type: '',
                    keyword: ''
                })
            }
            if (this.tabIndex == '3') { // 已付款
                this.reqPaidList({
                    type: '',
                    keyword: ''
                })
            }
        },
        search(params) {
            this.filters.pageNumber = '1'
            console.log('params', params);
            if (params.type == '0') {
              params.type = ''
            }
            this.filters = Object.assign(this.filters, params)
            if (this.tabIndex == '1') {
                this.reqList()
            }
            if (this.tabIndex == '2') { // 已收款
                this.reqReceivedList()
            }
            if (this.tabIndex == '3') { // 已付款
                this.reqPaidList()
            }
        },
        tableRow(row, index) {
            if (row.yinShouYiFuMoney != row.shiShouShiFuMoney) {
                return 'cred';
            }
            return '';
        },
        reqList(req = {}) {
            this.$store.dispatch('changeload', true)
            this.filters = Object.assign({}, this.filters, req)
            const reqs = {}
            for (const key of Object.keys(this.filters)) {
                if (this.filters[key]) {
                    reqs[key] = this.filters[key]
                }
            }
            console.log('paramm', JSON.stringify(reqs))
            request({
                url: StoreApi.waitHandleList,
                data: {
                    param: JSON.stringify(reqs)
                }
            }, (res) => {
                this.$store.dispatch('changeload', false)
                if (res.success == 1) {
                    this.convertData(res.list)
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg,
                        duration: 1000
                    })
                }
            })
        },
        reqReceivedList(req = {}) {
            this.$store.dispatch('changeload', true)
            this.filters = Object.assign({}, this.filters, req)
            const reqs = {}
            for (const key of Object.keys(this.filters)) {
                if (this.filters[key]) {
                    reqs[key] = this.filters[key]
                }
            }
            request({
                url: StoreApi.receivablesList,
                data: {
                    param: JSON.stringify(reqs)
                }
            }, (res) => {
                this.$store.dispatch('changeload', false)
                if (res.success == 1) {
                    this.recordList = res.page
                    res.page.result.map((item) => {
                        item.returnReplaceCreateTime = Number(item.returnReplaceCreateTime) != 0 ? formatTimeString(item.returnReplaceCreateTime) : '--'
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
        reqPaidList(req = {}) {
            this.$store.dispatch('changeload', true)
            this.filters = Object.assign({}, this.filters, req)
            const reqs = {}
            for (const key of Object.keys(this.filters)) {
                if (this.filters[key]) {
                    reqs[key] = this.filters[key]
                }
            }
            request({
                url: StoreApi.paidList,
                data: {
                    param: JSON.stringify(reqs)
                }
            }, (res) => {
                this.$store.dispatch('changeload', false)
                if (res.success == 1) {
                    this.recordList = res.page
                    res.page.result.map((item) => {
                        item.returnReplaceCreateTime = Number(item.returnReplaceCreateTime) != 0 ? formatTimeString(item.returnReplaceCreateTime) : '--'
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
        convertData(page) {
            page.forEach((item) => {
                item.checked = false
                item.list.map((item) => {
                    item.returnReplaceCreateTime = Number(item.returnReplaceCreateTime) != 0 ? formatTimeString(item.returnReplaceCreateTime) : '--'
                })
                item.list.forEach((val) => {
                    val.checked = false
                })
            })
            this.result = page
            console.log('this.result', this.result)
        },
        singleChoose (index) {
            this.result.forEach((val, key) => {
                if (index != key) {
                    val.checked = false
                    val.list.forEach((item, indexKey) => {
                        item.checked = false
                    })
                }
            })
        },
        checkAll (arr, index, e) {
            this.result[index].checked = !this.result[index].checked
            if (this.result[index].checked) {
                console.log('true')
                this.result[index].list.forEach((item) => {
                    item.checked = true
                })
            } else {
                this.result[index].list.forEach((item) => {
                    item.checked = false
                })
            }
            this.singleChoose(index)
        },
        updateChecked (arr, index) {
            let i = 0;
            arr.list.map((item) => {
            if (item.checked) {
                i++
            }
            })
            if (i > 0) {
                arr.checked = true
            } else {
                arr.checked = false
            }
            this.singleChoose(index)
        },
        // 单条确认收付款
        confirmInfo(row) {
            this.confirmReceipt = true
            this.confirmData = row
            row.checked = true
        },
        // 批量确认收付款
        confirmList () {
            this.confirmChoosed = true
        },
        // 确认收款
        confirmBtn() {
            this.$store.dispatch('changeload', true)
            request({
                url: StoreApi.payReceipt_confirm,
                data: {
                    param: JSON.stringify({ids: this.getId.orderNumberList})
                }
            }, (res) => {
                this.$store.dispatch('changeload', false)
                this.confirmReceipt = false
                this.confirmChoosed = false
                if (res.success == 1) {
                    const that = this
                    this.$message({
                        type: 'success',
                        message: res.msg,
                        duration: 1000,
                        onClose() {
                            that.reqList()
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
        countH() {
            this.height = String(document.documentElement.clientHeight - 240)
        },
    },
    destroyed() {
        window.removeEventListener('resize', this.countH)
    }
}

</script>

<style lang="scss">

.pay-receipt {

    .waitlist {
      padding-bottom: 60px;
    }
    .y_table {
        clear: both;
        .notify-title{
            padding-bottom: 5px;
        }
    }
    .y_table_wrap {
        td.is-center {
            text-align: center;
            border-right: 1px solid #ddd;
        }
        th.is-center {
            text-align: center;
        }
        .el-table td .cell {
            padding: 5px 0 0;
            line-height: 1.5;
            word-break: break-word;
        }
        .el-table .cred {
            color: #fe0000;
        }
        position: relative;
        margin-bottom: 15px;
    }
    .bottom {
        text-align: right;
        background: #fff;
        padding: 10px;
    }
    .operate-btn {
        text-align: center;
        padding-left: 10px;
        .o-btn {
            width: 80px;
            margin-right: 5px;
            margin-bottom: 5px;
            background: #20a0ff;
            border:#20a0ff;
            color: #fff;
        }
    }
    .no-data {
     height: 50px;
     line-height: 50px;
     text-align: center;
     border: 1px solid #e4e4e4;
     margin-bottom: 10px;
     background: #fff;
     color: red;
    }
    .showTotal {
      position: fixed;
      bottom: 0;
      margin-left: 180px;
      left: 0;
      z-index: 1000;
      right: 0;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-top: 1px solid #afafaf;
      overflow: hidden;
      background-color: #ecf0f5;
      box-sizing: border-box;
      .item {
        padding-right: 30px;
      }
    }
}

.unnormal {
    .un-line {
        margin-bottom: 5px;
        position: relative;
        .un-l-left {
            display: inline-block;
            width: 70px;
            padding-right: 5px;
            text-align: right;
        }
        .un-l-r {
            width: 150px;
            display: inline-block;
        }
    }
}

.common-pop {
    min-width: 500px;
}

.take-good {
    max-height: 450px;
    min-width: 460px;
    overflow-y: auto;
    .t-item {
        position: relative;
        margin-bottom: 8px;
    }
    .t-item-l {
        display: inline-block;
        width: 100px;
        text-align: right;
        padding-right: 10px;
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
