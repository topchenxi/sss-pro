<template>
  <div id="customer" class="h100">
    <div class="main-container">
      <c-menu></c-menu>
      <div class="main-content pt20">
        <div class="search-warp">
          <div class="search-item"> <input type="text" class="form-input search-input" v-model="params.company" placeholder="客户名称"> <span class="el-icon-circle-close" @click="resetInput()"></span> </div>
          <div class="search-item"> <button type="button" class="btn btn-search" @click="search()">搜索</button> <button class="btn">哈哈</button> </div>
        </div>
        <div class="table-warp">
          <div class="table-mask">
            <table class="table table-normal">
              <colgroup>
                <col width="25%">
                <col width="10%">
                <col width="10%">
                <col width="5%">
                <col width="10%">
                <col width="15%"> </colgroup>
              <thead>
                <tr>
                  <th>客户名称</th>
                  <th>总额度(元)</th>
                  <th>可用额度(元)</th>
                  <th>状态</th>
                  <th>滞纳金</th>
                  <th>本月应还（含滞纳金）</th>
                  <th>下月应还</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody v-if="!list.length">
                <tr class="empty-warp">
                  <td colspan="8"> <img v-if="params.company" src="../../../assets/oms/empty-search.png"> <img v-else src="../../../assets/oms/empty-list.png">
                    <p v-if="params.company">抱歉！没有搜索到相关数据</p>
                    <p v-else>列表暂时没有数据</p>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr :class="{'over':item.lateFeesMoney>0}" v-for="item in list" :key="item.id">
                  <td>{{item.company}}</td>
                  <td>{{item.creditLine | formatNumber}}</td>
                  <td>{{item.remainLine | formatNumber}}</td>
                  <td> <span class="red" v-if="item.lateFeesMoney>0">逾期</span> <span v-else>正常</span> </td>
                  <td>{{item.lateFeesMoney | formatNumber}}</td>
                  <td> <span class="red" v-if="item.lateFeesMoney>0">{{item.currentDebtMoney+item.lateFeesMoney | formatNumber}}</span> <span v-else>{{item.currentDebtMoney | formatNumber}}</span> </td>
                  <td>{{item.nextDebtMoney | formatNumber}}</td>
                  <td class="table-op">
                    <router-link tag="a" class="btn btn-link" :to="'/debtOrderList/' + item.id"> 欠款订单 </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pagination-warp">
            <p class="tips">当月使用下月还，最迟还款日为每月15号</p>
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
         params: {
           pageNumber: 1,
           pageSize: 20,
           company: ''
         },
         list: [],
         totalCount: 0
       };
     },
     methods: {
       search() {
         this.getList();
       },
       resetInput() {
         this.params.company = '';
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
         service.getCustomerList(this.params).then(res => {
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
           }
         })
       }
     },
     mounted() {
       this.getList();
       let height = window.innerHeight - (74 + 20 + 72 + 40);
       document.querySelector('.table-mask').style.height = height + 'px';
       window.onresize = function() {
         let height = window.innerHeight - (74 + 20 + 72 + 40);
         document.querySelector('.table-mask').style.height = height + 'px';
       }
     },
     components: {
       'c-menu': menu
     }
   }
</script>
<style lang='sass'> @import "../../../common/scss/oms-base.scss";</style>
