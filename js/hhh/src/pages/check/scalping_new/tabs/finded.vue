<template>
  <div>
    <hsMenu></hsMenu>
    <div class="oms-content">
      <search :params='params' @toSearch="getList"></search>
      <div class="main-wrap">
        <div class="main-content">
          <div class="table-wrap" :style="{ height : windowHeight - 300 + 'px' }">
            <table class="table">
              <colgroup>
                <!-- 订单号 -->
                <col width="8%">
                <!-- 需求号 -->
                <col width="7%">
                <!-- 发布时间 -->
                <col width="7%">
                <!-- 采购商 -->
                <col width="12%">
                <!-- 品类 -->
                <col width="4%">
                <!-- 提案 -->
                <col width="4%">
                <!-- 换卡头 -->
                <col width="5%">
                <!-- 样版 -->
                <col width="5%">
                <!-- 是否收版 -->
                <col width="5%">
                <!-- 成分/织法/工艺 -->
                <col width="10%">
                <!-- 录样要求 -->
                <col width="5%">
                <!-- 颜色要求 -->
                <col width="5%">
                <!-- 销售员 -->
                <col width="5%">
                <!-- 结束时间 -->
                <col width="6%">
                <!-- 状态 -->
                <col width="5%">
                <!-- 操作 -->
              </colgroup>
              <thead>
                <tr>
                  <th>订单号</th>
                  <th>需求号</th>
                  <th>发布时间</th>
                  <th>采购商</th>
                  <th>品类</th>
                  <th>提案</th>
                  <th>换卡头</th>
                  <th>样版</th>
                  <th>是否收版</th>
                  <th>成分/织法/工艺</th>
                  <th>录样要求</th>
                  <th>颜色要求</th>
                  <th>销售员</th>
                  <th>结束时间</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <!-- 订单号 -->
                  <td>
                    {{item.serviceNumber}}
                  </td>
                  <!-- 需求号 -->
                  <td>
                    <el-tooltip class="item" placement="top" v-if="item.needOrderCount > 1">
                      <div slot="content">
                        已拆分{{item.needOrderCount}}个订单
                      </div>
                      <span class="icon icon-chaidan"></span>
                    </el-tooltip>
                    {{item.needNumber}}
                  </td>
                  <!-- 发布时间 -->
                  <td>
                    <p>{{item.createTime | date('yyyy-MM-dd')}}</p>
                    <p>{{item.createTime | date('hh:mm:ss')}}</p>
                  </td>
                  <!-- 采购商 -->
                  <td class="ta-l"><span class="sign" v-if="item.customerCompany&&item.customerCompany.indexOf('代采') != -1">代采</span>{{item.customerCompany}}</td>
                  <!-- 品类 -->
                  <td>{{item.productType | productTypeFilter}}</td>
                  <!-- 提案 -->
                  <td>{{item.motion | motionFilter}}</td>
                  <!-- 是否换卡头 -->
                  <td>{{item.changeCard | changeCardFilter}}</td>
                  <!-- 是否有样版 -->
                  <td>{{item.haveRealVersion | haveRealVersionFilter}}</td>
                  <!-- 是否收到实版 -->
                  <td>
                    <p v-if="item.haveRealVersion == 1">{{item.hasReceive | hasReceiveFilter}}</p>
                    <p v-else>--</p>
                  </td>
                  <!-- 成分/织法/工艺 -->
                  <td>{{item.title || '--'}}</td>
                  <!-- 录样要求 -->
                  <td>{{item.findType | findTypeFilter}}</td>
                  <!-- 颜色要求 -->
                  <td>{{item.color || '--'}}</td>
                  <!-- 销售员 -->
                  <td>{{item.salesName}}</td>
                  <!-- 结束时间 -->
                  <td>
                    <p>{{item.editTime | date('yyyy-MM-dd')}}</p>
                    <p>{{item.editTime | date('hh:mm:ss')}}</p>
                  </td>
                  <td>{{item.statusDescr}}</td>
                  <td>
                    <el-button @click="toDetail(item)" class="table-btn">详情</el-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Page :total="total" :params="params" @toSearch="getList"></Page>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import hsMenu from '../menu.vue';
import search from '../search.vue';
import { getFindedList } from 'src/service/assessor';
export default {
  components: {
    hsMenu,
    search
  },
  data() {
    return {
      params: {
        keyword: '',
        tag: 3,
        haveRealVersion: '',
        pageNumber: 1,
        pageSize: 10
      },
      list: [],
      total: 0,
    }
  },
  methods: {
    toDetail(item) {
      this.$router.push({ name: 'checkFindedDetail', query: { id: item.orderNumber } })
    },
    async getList() {
      let res = await getFindedList(this.params);
      if (res.success !== '1') return;
      this.list = res.page.result;
      this.total = res.page.totalCount;
    }
  },
  filters: {
    productTypeFilter(value) {
      switch (value) {
        case 1:
          return '面料';
        case 2:
          return '辅料';
        default:
          return '';
      }
    },
    motionFilter(value) {
      switch (value) {
        case 1:
          return '是';
        default:
          return '否';
      }
    },
    changeCardFilter(value) {
      switch (value) {
        case 1:
          return '是';
        default:
          return '否';
      }
    },
    haveRealVersionFilter(value) {
      switch (value) {
        case 1:
          return '有实版';
        default:
          return '无实版';
      }
    },
    hasReceiveFilter(value) {
      switch (value) {
        case 1:
          return '已收到';
        default:
          return '未收到';
      }
    },
    findTypeFilter(value) {
      let findTypeList = ['找相同', '找类似', '找定做']
      let findTypeDescList = [];
      for (let i = 0; i < 3; i++) {
        if ((Number(value) & Math.pow(2, i)) === Math.pow(2, i)) {
          findTypeDescList.push(findTypeList[i]);
        }
      }
      return findTypeDescList.join('/');
    }
  },
  mounted() {
    this.$store.dispatch('changeload', false);
    this.getList();
  }
}

</script>
