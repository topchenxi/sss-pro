<template>
  <div id="customer" class="h100">
    <div class="main-container">
      <c-menu></c-menu>
      <div class="main-content pt5">
        <div class="crumbs-warp">
          <router-link tag="div" class="oms-back" to='/customerMgr'>
            < 返回 </router-link> {{customerCompany}} <span>></span> 欠款订单列表 </div>
        <div class="table-warp mt0">
          <div class="table-mask">
            <table class="table table-normal">
              <colgroup>
                <col width="15%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="15%"> </colgroup>
              <thead>
                <tr class="bg-F9F9F9">
                  <th>下单时间</th>
                  <th>订单号</th>
                  <th>货号</th>
                  <th>订单总价(元)</th>
                  <th>还款状态</th>
                  <th>滞纳金</th>
                  <th>最迟还款日</th>
                  <th>应还金额(元)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in list" :key="item.id">
                  <td>{{item.createTime | formatTime('yyyy-MM-dd HH:mm:ss')}}</td>
                  <td>{{item.number}}</td>
                  <td>{{item.productNumber}}</td>
                  <td> {{item.totalMoney | formatNumber}} </td>
                  <td> <span class="red" v-if="item.payDebtLateFeesMoney>0">逾期</span> <span v-else>正常</span> </td>
                  <td>{{item.payDebtLateFeesMoney | formatNumber}}</td>
                  <td>{{item.payDebtExpectedRepaymentTime | formatDate('yyyy-MM-dd')}}</td>
                  <td> <span class="red">{{item.payDebtRealRepaymentMoney | formatNumber}}</span> </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pagination-warp">
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="pageChange" :current-page="params.pageNumber" :page-sizes="[20, 50, 100]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"> </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
   import menu from 'components/oms-menu';
   import service from '@/utils/omsServices';
   export default {
     name: 'customer',
     data() {
       return {
         customerCompany: '',
         params: {
           pageNumber: 1,
           pageSize: 20,
           customerId: this.$route.params.id,
           payDebtPayStatus: 1,
         },
         list: [],
         totalCount: 0
       };
     },
     methods: {
       handleSizeChange(currentPageSize) {
         this.params.pageSize = currentPageSize;
         this.getList();
       },
       pageChange(currentPage) {
         this.params.pageNumber = currentPage;
         this.getList();
       },
       getList() {
         service.getOrderByDebt(this.params).then(res => {
           if (res.success !== '1') {
             this.$Message({
               type: 'error',
               message: res.msg,
               duration: 1000
             })
           } else {
             this.info = res;
             this.list = this.info.page.result;
             this.totalCount = this.info.page.totalCount;
             this.customerCompany = this.list.length ? this.list[0].customerCompany : '';
           }
         })
       }
     },
     mounted() {
       this.getList();
       let height = window.innerHeight - (74 + 20 + 72);
       document.querySelector('.table-mask').style.height = height + 'px';
       window.onresize = function() {
         let height = window.innerHeight - (74 + 20 + 72);
         document.querySelector('.table-mask').style.height = height + 'px';
       }
     },
     components: {
       'c-menu': menu
     }
   }
</script>
<style lang='sass'> @import "../../../common/scss/oms-base.scss";</style>
