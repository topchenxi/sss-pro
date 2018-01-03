<template>
  <div class="oms-content">
    <el-dialog title="选择采购商" v-model="showFlag" :before-close="close">
      <div class="search-content p0 m0">
        <div class="row">
          <div class="item w360 ml0">
            <el-input placeholder="采购商名称" v-model="params.key"></el-input>
          </div>
          <el-button @click.native="search">搜索</el-button>
        </div>
      </div>
      <div class="main-wrap pl0 m0 bsn">
        <div class="main-content">
          <div class="table-wrap">
            <table class="table" v-if="list.length">
              <colgroup>
                <col width="5%">
                <col width="50%">
                <col width="25%">
              </colgroup>
              <thead>
                <tr>
                  <th></th>
                  <th>采购商/ID</th>
                  <th>采购商电话</th>
                  <th>欠款金额(元)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index" v-if="item">
                  <td>
                    <el-radio v-model="customerId" :label="item.id" @click.native="select(item)">
                      <span></span>
                    </el-radio>
                  </td>
                  <td class="ta-l">
                    <span class="icon" :class="item.hasOpenedBaitiao ? 'icon-ximu-active' : 'icon-ximu-gray' "></span>
                    <span class="icon mr5" :class="item.hasOpenedYanzhen ? 'icon-yanzhen-active' : 'icon-yanzhen-gray'"></span>{{item.company}}/{{item.number}}
                  </td>
                  <td>{{item.tel}}</td>
                  <td class="money">{{item.totalDebtMoney | formatMoney}}</td>
                </tr>
              </tbody>
            </table>
            <Page :total="total" :params="params" @toSearch="getList"></Page>
            <div class="empty" v-if="!list.length" :style="{ height : 300 + 'px' }"></div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCustomerList } from 'src/service/saler';
export default {
  props: {
    showFlag: false,
    customerInfo: {
      'type': Object,
      'required': false,
      'default': () => {}
    },
  },
  data() {
    return {
      params: {
        key: '',
        pageNumber: 1,
        pageSize: 20
      },
      customerId: '',
      total: 0,
      list: []
    }
  },
  mounted() {
    this.getList()
    this.customerId = this.customerInfo.id || '';
  },
  methods: {
    select(item) {
      this.customerId = item.id;
      this.$emit('changeCustomer', item);
    },
    close() {
      this.$emit('closeMember');
    },
    search() {
      this.params.pageNumber = 1;
      this.getList();
    },
    async getList() {
      let res = await getCustomerList(this.params);
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
    }
  }
}

</script>
