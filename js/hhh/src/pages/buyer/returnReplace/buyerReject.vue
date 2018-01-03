<template>
  <div class="buyer-reject">
    <div class="y_tab tab-wrap">
      <el-tabs type="card" :active-name="tabIndex" @tab-click="handleClick">
        <el-tab-pane name="1" :label="'退换货处理'+(num1 ? '(' : '')+num1+''+(num1 ? ')' : '')">
          <fliter :category="{name: 'buyerdh', index: tabIndex }" :params="filters" @getParams="search" />
          <div class="y_table">
            <div class="y_table_wrap">
              <el-table :data="result" :resizable="false" :height="height">
                <el-table-column prop="number" label="退换货单号" min-width="130" align="center">
                </el-table-column>
                <el-table-column prop="serviceNumber" align="center" label="订单号" min-width='140'>
                </el-table-column>
                <el-table-column align="center" label="订单类型" width='130'>
                  <template scope="scope">
                    {{scope.row.dhOrderType == '1' ? '服务单' : '贸易单'}}
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" align="center" width="180" label="退换货申请时间">
                </el-table-column>
                <el-table-column prop="buyerCompany" align="center" label="采购商" width="140">
                </el-table-column>
                <el-table-column prop="sellerCompany" align="center" width="140" label="供应商">
                </el-table-column>
                <el-table-column align="center" label="品类" width="80">
                  <template scope="scope">
                    <template v-if="scope.row.productType == '1'">面料</template>
                    <template v-if="scope.row.productType == '2'">辅料</template>
                    <template v-if="scope.row.productType == '0'">花型</template>
                    <template v-if="scope.row.productType == '3'">底布</template>
                    <template v-if="scope.row.productType == '4'">花布</template>
                  </template>
                </el-table-column>
                <el-table-column width="120" align="center" label="退换货数量">
                  <template scope="scope">
                    <template v-if="scope.row.type == 5">
                        --
                    </template>
                    <template v-else="">
                      {{Number(scope.row.quantity).toFixed(2)}}{{scope.row.quantityUnit}}
                    </template>
                  </template>
                </el-table-column>
                <el-table-column width="130" align="center" label="退换类型">
                  <template scope="scope">
                    <template v-if="scope.row.type == '1'">售前退货</template>
                    <template v-if="scope.row.type == '2'">售前换货</template>
                    <template v-if="scope.row.type == '3'">售后退货</template>
                    <template v-if="scope.row.type == '4'">售后换货</template>
                    <template v-if="scope.row.type == '5'">仅退款</template>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="220" fixed="right">
                  <template scope="scope">
                    <div class="operate-btn">
                        <router-link v-if="contains(scope.row.operationTypes,2)" :to="{name: 'verifyTicket', query: {id: scope.row.number, type: scope.row.type}}">
                          <el-button class="o-btn" size="small" type="primary">审核</el-button>
                        </router-link>
                        <router-link v-if="contains(scope.row.operationTypes,1)" :to="{name: 'inputReturnReplace', query: {id: scope.row.orderNumber, number: scope.row.number} }">
                          <el-button class="o-btn" size="small" type="primary">录入换货信息</el-button>
                        </router-link>
                        <el-button class="o-btn" v-if="contains(scope.row.operationTypes,3)" size="small" type="primary" @click.native="actionReject(scope.row)">退回此单</el-button>
                        <router-link :to="{name: 'returnReplaceDetail', query: { number: scope.row.number, orderNumber: scope.row.orderNumber, pathIndex: 5, type: scope.row.type }}">
                          <el-button class="o-btn" size="small" type="primary">详情</el-button>
                        </router-link>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="bottom">
              <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2" :label="'退款补款中'+(num2 ? '(' : '')+num2+''+(num2 ? ')' : '')">
          <fliter :category="{name: 'buyerdh', index: tabIndex }" :params="filters" @getParams="search" />
          <div class="y_table">
            <div class="y_table_wrap">
              <el-table :data="result" :resizable="false" :height="height">
                <el-table-column prop="number" label="退换货单号" min-width="130" align="center">
                  <template scope="scope">
                    <template v-if="scope.row.exceptReson">
                    <!--<template>-->
                      <el-tooltip placement="top" effect="light">
                        <div slot="content" class="unnormal">
                          <div class="un-line"><span class="un-l-left" style="position: absolute; top: 0;">异常原因:</span>
                            <span class="un-l-r" style="margin-left: 75px;">{{scope.row.exceptReson}}</span>
                          </div>
                        </div>
                        <template>!</template>
                        <el-button type="text"><span style="color:red">!&nbsp;&nbsp;</span>{{scope.row.number}}</el-button>
                      </el-tooltip>
                    </template>
                    <template v-if="!scope.row.exceptReson">
                      {{scope.row.number}}
                    </template>
                  </template>
                </el-table-column>
                <el-table-column prop="serviceNumber" align="center" label="订单号" min-width='140'>
                </el-table-column>
                <el-table-column align="center" label="订单类型" width='130'>
                  <template scope="scope">
                    {{scope.row.dhOrderType == '1' ? '服务单' : '贸易单'}}
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" align="center" width="180" label="退换货申请时间">
                </el-table-column>
                <el-table-column width="120" align="center" label="退换货数量">
                  <template scope="scope">
                    {{Number(scope.row.quantity).toFixed(2)}}{{scope.row.quantityUnit}}
                  </template>
                </el-table-column>
                <el-table-column width="120" align="center" label="供应商退款">
                  <template scope="scope">
                    <template v-if="scope.row.sellerRefund < 0">--</template>
                    <template v-else="">
                        <template v-if="scope.row.isEdit">
                          <el-input v-model="scope.row.sellerRefund" @keyup.native="keyupBind($event)"></el-input>
                        </template>
                        <template v-else="">
                          {{Number(scope.row.sellerRefund).toFixed(2)}}元
                        </template>    
                      </template>
                  </template>
                </el-table-column>
                
                
                <el-table-column width="120" align="center" label="搜芽补款">
                  <template scope="scope">
                    <template v-if="scope.row.soouyaToSellerMoney < 0">--</template>
                    <template v-else="">
                        <template v-if="scope.row.isEdit">
                          <el-input v-model="scope.row.soouyaToSellerMoney" @keyup.native="keyupBind($event)"></el-input>
                        </template>
                        <template v-else="">
                          {{Number(scope.row.soouyaToSellerMoney).toFixed(2)}}元
                        </template>    
                      </template>
                  </template>
                </el-table-column>
               
                <el-table-column width="130" align="center" label="退换类型">
                  <template scope="scope">
                    <template v-if="scope.row.type == '1'">售前退货</template>
                    <template v-if="scope.row.type == '2'">售前换货</template>
                    <template v-if="scope.row.type == '3'">售后退货</template>
                    <template v-if="scope.row.type == '4'">售后换货</template>
                    <template v-if="scope.row.type == '5'">仅退款</template>
                  </template>
                </el-table-column>
                <el-table-column width="130" align="center" label="款项类型">
                  <template scope="scope">
                    <template v-if="scope.row.kuanType == '1'">供应商退款</template>
                    <template v-if="scope.row.kuanType == '2'">搜芽补款</template>
                  </template>
                </el-table-column>
                <el-table-column prop="buyerCompany" align="center" label="采购商" width="140">
                </el-table-column>
                <el-table-column prop="sellerCompany" align="center" width="140" label="供应商">
                </el-table-column>
                <el-table-column align="center" label="品类" width="80">
                  <template scope="scope">
                    <template v-if="scope.row.productType == '1'">面料</template>
                    <template v-if="scope.row.productType == '2'">辅料</template>
                    <template v-if="scope.row.productType == '0'">花型</template>
                    <template v-if="scope.row.productType == '3'">底布</template>
                    <template v-if="scope.row.productType == '4'">花布</template>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="220" fixed="right">
                  <template scope="scope">
                    <div class="operate-btn">
                      <router-link :to="{name: 'returnReplaceDetail', query: { number: scope.row.number, orderNumber: scope.row.orderNumber, pathIndex: 5, type: scope.row.type }}">
                        <el-button class="o-btn" size="small" type="primary">详情</el-button>
                      </router-link>
                      <el-button class="o-btn" size="small" type="primary" @click.native="editMoney(scope.row)">编辑</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="bottom">
              <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="3" :label="'已完成'+(num3 ? '(' : '')+num3+''+(num3 ? ')' : '')">
          <fliter :category="{name: 'buyerdh', index: tabIndex }" :params="filters" @getParams="search" />
          <div class="y_table">
            <div class="y_table_wrap">
              <el-table :data="result" :resizable="false" :height="height">
                <el-table-column prop="finishTime" align="center" label="完成时间" min-width='140'>
                </el-table-column>
                <el-table-column prop="number" label="退换货单号" min-width="130" align="center">
                  <template scope="scope">
                    {{scope.row.number}}
                  </template>
                </el-table-column>
                <el-table-column prop="serviceNumber" align="center" label="订单号" min-width='140'>
                </el-table-column>
                <el-table-column align="center" label="订单类型" width='130'>
                  <template scope="scope">
                    {{scope.row.dhOrderType == '1' ? '服务单' : '贸易单'}}
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" align="center" width="180" label="退换货申请时间">
                </el-table-column>
                <el-table-column width="120" align="center" label="退换货数量">
                  <template scope="scope">
                    {{Number(scope.row.quantity).toFixed(2)}}{{scope.row.quantityUnit}}
                  </template>
                </el-table-column>
                <el-table-column width="120" align="center" label="供应商退款">
                  <template scope="scope">
                    <template v-if="scope.row.sellerRefund < 0">--</template>
                    <template v-else="">
                        <template v-if="scope.row.isEdit">
                          <el-input v-model="scope.row.sellerRefund" @keyup.native="keyupBind($event)"></el-input>
                        </template>
                        <template v-else="">
                          {{Number(scope.row.sellerRefund).toFixed(2)}}元
                        </template>    
                      </template>
                  </template>
                </el-table-column>
                <el-table-column width="120" align="center" label="搜芽补款">
                  <template scope="scope">
                    <template v-if="scope.row.soouyaToSellerMoney < 0">--</template>
                    <template v-else="">
                        <template v-if="scope.row.isEdit">
                          <el-input v-model="scope.row.soouyaToSellerMoney" @keyup.native="keyupBind($event)"></el-input>
                        </template>
                        <template v-else="">
                          {{Number(scope.row.soouyaToSellerMoney).toFixed(2)}}元
                        </template>    
                      </template>
                  </template>
                </el-table-column>
                <el-table-column width="130" align="center" label="退换类型">
                  <template scope="scope">
                    <template v-if="scope.row.type == '1'">售前退货</template>
                    <template v-if="scope.row.type == '2'">售前换货</template>
                    <template v-if="scope.row.type == '3'">售后退货</template>
                    <template v-if="scope.row.type == '4'">售后换货</template>
                    <template v-if="scope.row.type == '5'">仅退款</template>
                  </template>
                </el-table-column>
                <el-table-column width="130" align="center" label="款项类型">
                  <template scope="scope">
                    <template v-if="scope.row.kuanType == '1'">供应商退款</template>
                    <template v-if="scope.row.kuanType == '2'">搜芽补款</template>
                  </template>
                </el-table-column>
                <el-table-column prop="buyerCompany" align="center" label="采购商" width="140">
                </el-table-column>
                <el-table-column prop="sellerCompany" align="center" width="140" label="供应商">
                </el-table-column>
                <el-table-column align="center" label="品类" width="80">
                  <template scope="scope">
                    <template v-if="scope.row.productType == '1'">面料</template>
                    <template v-if="scope.row.productType == '2'">辅料</template>
                    <template v-if="scope.row.productType == '0'">花型</template>
                    <template v-if="scope.row.productType == '3'">底布</template>
                    <template v-if="scope.row.productType == '4'">花布</template>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="220" fixed="right">
                  <template scope="scope">
                    <div class="operate-btn">
                      <router-link :to="{name: 'returnReplaceDetail', query: { number: scope.row.number, orderNumber: scope.row.orderNumber, pathIndex: 5, type: scope.row.type }}">
                        <el-button class="o-btn" size="small" type="primary">详情</el-button>
                      </router-link>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="bottom">
              <pagination :page="pagation.pageNumber" :total="pagation.totalCount" :pagesize="pagation.pageSize" :render="reqList" :options="filters" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 点击拒绝 -->
    <el-dialog title="退回此单" v-model="rejectShow" custom-class="common-pop" size="tiny" :close-on-click-modal="false">
      <div class="take-good clearfix send-good">
        <div class="t-item">
          <div class="t-item-l">订单号</div>
          <div class="t-item-r">{{rejectData.serviceNumber}}</div>
        </div>
        <div class="t-item">
          <div class="t-item-l">采购商</div>
          <div class="t-item-r">{{rejectData.buyerCompany}}</div>
        </div>
        <div class="t-item">
          <div class="t-item-l">退换类型</div>
          <div class="t-item-r">{{(rejectData.type == 1 || rejectData.type == 3) ? '退货' : (rejectData.type == 5) ? '仅退款':'换货'}}</div>
        </div>
        <div class="t-item">
          <div class="t-item-l">退换数量</div>
          <div class="t-item-r">{{rejectData.quantity}}{{rejectData.quantityUnit}}</div>
        </div>
        <div class="t-item">
          <div class="t-item-l" style="position: absolute; top:0;"><b style="color: red;">*</b>退回原因</div>
          <div class="t-item-r" style="margin-left: 100px;">
            <textarea rows="3" style="width: 300px; height: 100px; resize: none; border: 1px solid #ccc; padding: 5px;" v-model.trim="purcahserExceptReson"></textarea>
            <span><b style="color: red; padding-left: 5px;">{{leftnumber}}</b>/500字</span>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="purcahserExceptReson ? false : true" @click.native="confirmReject(rejectData)">确认退回</el-button>
        <el-button @click.native="rejectShow=false; purcahserExceptReson=''">暂不退回</el-button>
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
  newRequest,
  // setCache,
  formatTimeString
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
      rejectShow: false,
      rejectData: {},
      purcahserExceptReson: '',
      num1: '',
      num2: '',
      num3: '',
      tabIndex: '1',
      filters: {
        pageSize: 20,
        pageNumber: 1
      },
      height: 600,
      result: [],
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
    leftnumber() {
      return 500 - Number(this.purcahserExceptReson.length)
    },
//    isEdit() {
//
//    },
    ...mapState({
      condition: state => {
        return {
          tabIndex: state.buyerReturnRepalce.tabIndex
        }
      }
    })
  },
  watch: {
    purcahserExceptReson(val) {
      if (val.length >= 500) {
        const vals = val.slice(0, 500)
        this.purcahserExceptReson = vals
      }
    }
  },
  methods: {
    initCondition() {
      this.tabIndex = this.condition.tabIndex
    },
    ...mapActions([
      'updateVuexData'
    ]),
    handleClick(val) {
      this.tabIndex = String(val.name)
      this.updateVuexData({ module: 'buyerReject', tabIndex: this.tabIndex })
      this.reqList({
        type: '',
        status: '',
        keyword: ''
      })
    },
    contains (array, obj) {
        if (!array) {
          return false;
        }
      var i = array.length;
      while (i--) {
        if (array[i] === obj) {
          return true;
        }
      }
      return false;
    },
    search(params) {
      this.filters.pageNumber = '1'
      console.log('params', params)
      if (params.type == '0') {
        params.type = ''
      }
      this.filters = Object.assign(this.filters, params)
      this.reqList()
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
      reqs.tag = this.tabIndex
      console.log('reqs', reqs);
      let url = StoreApi.ReturnReplace_thhHandleList
      if (reqs.tag == '1') {
        url = StoreApi.ReturnReplace_thhHandleList
      } else if (reqs.tag == '2') {
        url = StoreApi.ReturnReplace_thhHandlingList
      } else if (reqs.tag == '3') {
        url = StoreApi.ReturnReplace_thhFinishList
      }
      newRequest({
        url: url,
        contentType: 'application/json',
        data: reqs
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
//          this.result = res.page.result
          this.convertData(res.page)
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
      this.pagation.pageNumber = page.pageNumber
      this.pagation.pageSize = page.pageSize
      this.pagation.totalCount = page.totalCount
      this.filters.pageSize = page.pageSize
      this.filters.pageNumber = page.pageNumber
      this.num1 = ''
      this.num2 = ''
      this.num3 = ''
      const currentNumber = 'num' + this.tabIndex
      this[currentNumber] = page.totalCount
      page.result.length && page.result.map((item) => {
        item.createTime = Number(item.createTime) != 0 ? formatTimeString(item.createTime) : '--'
        item.finishTime = Number(item.finishTime) != 0 ? formatTimeString(item.finishTime) : '--'
//        if (item.soouyaToSellerMoney) {
//
//        }
        item.isEdit = false
      })
      this.result = page.result
      console.log('result:' + this.result)
    },
    editMoney(row) {
        // 款项类型 1:供应商退款 2:搜芽补款
      row.isEdit = true
    },
    keyupBind (event) {
      if (event.keyCode == '13') {
        let changeMoneys = []
//        console.log('event.keyCode:' + event)
        this.result.length && this.result.map((row) => {
            if (row.isEdit) {
              let changeMoney = {}
              changeMoney.id = row.id
              changeMoney.soouyaToSellerMoney = row.soouyaToSellerMoney
              changeMoney.sellerRefund = row.sellerRefund
              changeMoneys.push(changeMoney)
            }
        })
        // 调用远程接口,更新
        this.changeMoney(changeMoneys)
      }
    },
    // 确认拒绝
    changeMoney(list) {
      this.$store.dispatch('changeload', true)
      newRequest({
        url: StoreApi.ReturnReplace_changeMoney,
        contentType: 'application/json',
        data: {'changeMoneys': list}
      }, (res) => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          this.reqList()
        } else {
          this.$message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        }
      })
    },
    // 弹窗拒绝
    actionReject(row) {
      this.rejectShow = true
      this.rejectData = row
      this._time = (new Date()).getTime()
    },
    // 确认拒绝
    confirmReject(row) {
        if (row.type == 5) {
          this.$store.dispatch('changeload', true)
          const obj = {
            number: row.number,
            agreeOrNot: 0,
            purcahserExceptReson: this.purcahserExceptReson,
            _time: this._time
          }
          newRequest({
            url: StoreApi.Return_sendbackToFollower,
            contentType: 'application/json',
            data: obj
          }, (res) => {
            this.$store.dispatch('changeload', false)
            this.purcahserExceptReson = ''
            this.rejectShow = false
            this.cancelgoodShow = false
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
        } else {
          this.$store.dispatch('changeload', true)
          const obj = JSON.stringify({
            number: row.number,
            agreeOrNot: 0,
            purcahserExceptReson: this.purcahserExceptReson,
            _time: this._time
          })
          request({
            url: row.type == 2 ? StoreApi.Replace_review : StoreApi.Return_review,
            data: {
              param: obj
            }
          }, (res) => {
            this.$store.dispatch('changeload', false)
            this.purcahserExceptReson = ''
            this.rejectShow = false
            this.cancelgoodShow = false
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
        }
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
.buyer-reject {
  .y_table {
    clear: both;
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
    position: relative;
  }
  .bottom {
    text-align: right;
    background: #fff;
    padding: 10px;
  }
  .operate-btn {
    text-align: left;
    padding-left: 10px;
    .o-btn {
      width: 88px;
      margin-right: 5px;
      margin-bottom: 5px;
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
