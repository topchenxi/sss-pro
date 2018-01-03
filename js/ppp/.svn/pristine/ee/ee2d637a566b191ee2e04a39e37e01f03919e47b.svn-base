<template>
  <div id="order" class="h100">
    <div class="main-container">
      <c-menu></c-menu>
      <div class="main-content">
        <div class="tabs-warp">
          <ul>
            <li :class="{ current: params.status==600 }" @click="inittabs(600)">客户下单(<span>{{group['600']?group['600']:0}}</span>)</li>
            <li :class="{ current: params.status==601 }" @click="inittabs(601)">待客户付款(<span>{{group['601']?group['601']:0}}</span>)</li>
            <li :class="{ current: params.status==602&&params.repaymentLoanSoouyaLoanStatus==0 }" @click="inittabs(602,0)">待收款(<span>{{group['660']?group['660']:0}}</span>)</li>
            <li :class="{ current: params.status==602&&params.repaymentLoanSoouyaLoanStatus>0 }" @click="inittabs(602,21)">已收款</li>
            <li :class="{ current: params.status==630 }" @click="inittabs(630)">已取消</li>
            <li :class="{ current: params.status=='' }" @click="inittabs()">全部订单</li>
          </ul>
        </div>
        <div class="search-warp">
          <div class="search-item">
            <input type="text" class="form-input search-input" v-model="params.key" placeholder="订单号/货号/客户名称">
            <span class="el-icon-circle-close" @click="resetInput()"></span>
          </div>
          <div class="search-item">
            <button type="button" class="btn btn-default" @click="search()">搜索</button>
          </div>
        </div>
        <div class="table-warp" v-loading.body="loading">
          <div class="table-mask">
            <table class="table table-muti">
              <colgroup>
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <!-- 总价(元) -->
                <col width="12%">
                <!-- 收货人 -->
                <col width="10%">
                <!-- 可用额度(元) -->
                <col width="15%">
                <!-- 状态 -->
                <col width="10%">
              </colgroup>
              <thead>
                <tr>
                  <th>色号</th>
                  <th>价格</th>
                  <th>数量</th>
                  <th>总价(元)</th>
                  <th>收货人</th>
                  <th>可用额度(元)</th>
                  <th>状态</th>
                  <th>{{ params.status==630 ? '取消原因' : '操作'}}</th>
                </tr>
              </thead>
              <tbody v-if="!list.length">
                <tr class="empty-warp">
                  <td colspan="8">
                    <img v-if="params.key" src="../../../assets/oms/empty-search.png">
                    <img v-else src="../../../assets/oms/empty-list.png">
                    <p v-if="params.key">抱歉！没有搜索到相关数据</p>
                    <p v-else>列表暂时没有数据</p>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="list.length">
                <tr v-for="item in list" :key="item.id+params.status">
                  <td colspan="8" class="sub-warp">
                    <table>
                      <colgroup>
                        <col width="10%">
                        <col width="10%">
                        <col width="10%">
                        <!-- 总价(元) -->
                        <col width="12%">
                        <!-- 收货人 -->
                        <col width="10%">
                        <!-- 可用额度(元) -->
                        <col width="15%">
                        <!-- 状态 -->
                        <col width="10%">
                      </colgroup>
                      <tbody>
                        <tr>
                          <td colspan="8" class="p0">
                            <div class="base-info">
                              <p>订单号：{{item.number}}</p>
                              <p>{{item.createTime | formatTime('yyyy-MM-dd HH:mm:ss')}}</p>
                              <p>货号：{{item.productNumber}}</p>
                              <p>{{item.customerCompany}}</p>
                              <router-link v-if="params.status==630" class="link fr" :to="'/orderOmsDetail/' + item.id">
                                查看详情 >
                              </router-link>
                            </div>
                          </td>
                        </tr>
                        <tr v-for="(colorItem,colorIndex) in item.colors" :key="item.listId" v-if="colorIndex<3">
                          <td>{{colorItem.color}}</td>
                          <td>{{colorItem.price | formatNumber}} 元/{{item.unit}}</td>
                          <td>{{colorItem.quantity}}{{item.unit}}</td>
                          <td :rowspan="item.colspan" v-if="colorIndex<1">
                            <span class="red">{{item.totalMoney | formatNumber}}</span>
                          </td>
                          <td :rowspan="item.colspan" v-if="colorIndex<1">
                            <p>{{item.customerName}}</p>
                            <p>{{item.customerTel}}</p>
                          </td>
                          <td :rowspan="item.colspan" v-if="colorIndex<1">{{item.customerAvailableBalance | formatNumber}}</td>
                          <td :rowspan="item.colspan" v-if="colorIndex<1">
                            <span class="status">{{item.statusDescr}}</span>
                          </td>
                          <td :rowspan="item.colspan" v-if="colorIndex<1" class="table-op">
                            <!--客户下单-->
                            <div class="op-row" v-if="item.status==600">
                              <router-link tag="div" class="btn btn-default" :to="'/orderOmsEdit/' + item.id">
                                编辑订单
                              </router-link>
                              <div class="btn btn-submit" @click="submitOrder(item)">
                                提交订单
                                <div class="btn-tips">请确保订单信息填写完整后提交！
                                  <div class="arrow"></div>
                                </div>
                              </div>
                            </div>
                            <div class="op-row" v-if="item.status==600">
                              <div class="btn btn-default" @click="cancelOrder(item)">取消订单</div>
                              <router-link tag="div" class="btn btn-default" :to="'/orderOmsDetail/' + item.id">
                                订单详情
                              </router-link>
                            </div>
                            <!--待客户付款-->
                            <div class="op-row" v-if="item.status==601">
                              <router-link tag="div" class="btn btn-default" :to="'/orderOmsDetail/' + item.id">
                                订单详情
                              </router-link>
                            </div>
                            <!--已收款-->
                            <div class="op-row" v-if="item.status==661">
                              <router-link tag="div" class="btn btn-default" :to="'/orderOmsDetail/' + item.id">
                                订单详情
                              </router-link>
                            </div>
                            <!--待收款-->
                            <div class="op-row" v-if="item.status==660">
                              <!--<div class="btn op-submit">确认收款</div>-->
                              <router-link tag="div" class="btn btn-default" :to="'/orderOmsDetail/' + item.id">
                                订单详情
                              </router-link>
                            </div>
                            <!--已取消-->
                            <div class="op-row" v-if="item.status==630">
                              {{item.cancelReason}}
                            </div>
                          </td>
                        </tr>
                        <tr v-if="item.colors.length>3">
                          <td colspan="3" class="ta-r">
                            <router-link class="link" :to="'/orderOmsDetail/' + item.id">
                              查看更多 >>
                            </router-link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pagination-warp">
            <div class="block">
              <el-pagination class="oms-page" @size-change="handleSizeChange" @current-change="pageChange" :current-page="params.pageNumber" :page-sizes="[20, 50, 100]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="submitDialogVisible" size="tiny">
      <span v-html="submitMsg"></span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ensuerSubmitOrder">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="cancelDialogVisible" size="tiny">
      <span>{{submitMsg}}</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ensuerCancelOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/request';
import menu from 'components/oms-menu';
import service from '@/utils/omsServices';
import {
  Message
} from 'element-ui';
export default {
  name: 'order',
  data() {
    return {
      submitDialogVisible: false,
      cancelDialogVisible: false,
      submitMsg: '',
      selectSubmitItem: {},
      allTotal: 0,
      loading: true,
      params: {
        pageNumber: 1,
        pageSize: 20,
        // 户下单：status=600
        // 待客户付款：status=601
        // 待收款：status=602&repaymentLoanSoouyaLoanStatus=0
        // 已收款：status=602&repaymentLoanSoouyaLoanStatus=1
        // 取消：status=630
        status: 600,
        repaymentLoanSoouyaLoanStatus: '',
        // 关键词
        key: '',
      },
      list: [],
      totalCount: 0,
      group: {
        // 600：客户下单
        // 601：待客户付款
        // 630：已取消
        // 661：已收款
        // 660：待付款
        '600': 0,
        '601': 0,
        '630': 0,
        '661': 0,
        '660': 0
      }
    };
  },
  components: {
    'c-menu': menu
  },
  methods: {
    inittabs(status = '', payStatus = '') {
      this.loading = true;
      this.params.status = status;
      this.params.repaymentLoanSoouyaLoanStatus = payStatus;
      // 缓存当期状态
      sessionStorage.orderStatus = status;
      sessionStorage.orderRepayStatus = payStatus;
      this.getList();
    },
    resetInput() {
      this.params.key = '';
    },
    search() {
      this.params.pageNumber = 1;
      this.getList();
    },
    submitOrder(item) {
      this.selectSubmitItem = item;
      this.submitMsg = `订单总计<span class="red">${Number(item.totalMoney).toFixed(2)}</span>元, 请确定后提交`;
      this.submitDialogVisible = true;
    },
    ensuerSubmitOrder() {
      request(`/redwood/shop/bulk/${this.selectSubmitItem.id}?_function=input`, {
        method: 'PUT',
        data: {},
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.success !== '1') {
          Message({
            type: 'error',
            message: response.msg,
            duration: 1000
          })
        } else {
          this.getList();
          Message({
            type: 'success',
            message: '操作成功',
            duration: 1000
          })
        }
      })
      this.submitDialogVisible = false;
    },
    cancelOrder(item) {
      this.cancelDialogVisible = true;
      this.selectSubmitItem = item;
      this.submitMsg = `确定取消订单？`;
    },
    ensuerCancelOrder() {
      request(`/redwood/shop/bulk/${this.selectSubmitItem.id}?_function=cancel`, {
        method: 'PUT',
        data: {
          'cancelReason': '档口取消'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.success !== '1') {
          Message({
            type: 'error',
            message: response.msg,
            duration: 1000
          })
        } else {
          this.getList();
          Message({
            type: 'success',
            message: '操作成功',
            duration: 1000
          })
        }
      })
      this.cancelDialogVisible = false;
    },
    handleSizeChange(currentPageSize) {
      this.params.pageSize = currentPageSize;
      this.getList();
    },
    pageChange(currentPage) {
      this.params.pageNumber = currentPage;
      this.getList();
    },
    getList() {
      service.getOrderList(this.params).then(res => {
        if (res.success !== '1') {
          Message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        } else {
          this.loading = false;
          this.info = res;
          this.list = res.page.result;
          this.totalCount = this.info.page.totalCount;
          this.group = this.info.group;
          this.allTotal = 0;
          for (let key in this.group) {
            if (!isNaN(this.group[key])) {
              this.allTotal += this.group[key]
            }
          }
          this.list.forEach(item => {
            // 定义唯一标识，绑定for循环的key值，el-tooltips bugs
            let listId = item.id + this.params.status + new Date().getTime();
            this.$set(item, 'listId', listId);
            // 预先计算colors合并的行数
            let colspan = item.colors.length > 3 ? 4 : item.colors.length;
            this.$set(item, 'colspan', colspan);
          })
        }
      })
    }
  },
  mounted() {
    this.params.status = sessionStorage.orderStatus ? sessionStorage.orderStatus : this.params.status;
    this.params.repaymentLoanSoouyaLoanStatus = sessionStorage.orderRepayStatus ? sessionStorage.orderRepayStatus : this.params.repaymentLoanSoouyaLoanStatus;
    this.getList();
    let height = window.innerHeight - 74 - 72 - 20 - 20 - 72 - 20;
    document.querySelector('.table-mask').style.height = height + 'px';
    window.onresize = function() {
      let height = window.innerHeight - 74 - 72 - 20 - 20 - 72 - 20;
      document.querySelector('.table-mask').style.height = height + 'px';
    }
  }
}

</script>
<style lang="scss">
@import "../../../common/scss/oms-base.scss";

</style>
