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
                <!-- 需求号 -->
                <col width="8%">
                <!-- 发布时间 -->
                <col width="7%">
                <!-- 采购商 -->
                <col width="10%">
                <!-- 品类 -->
                <col width="4%">
                <!-- 提案 -->
                <col width="4%">
                <!-- 换卡头 -->
                <col width="5%">
                <!-- 样版 -->
                <col width="5%">
                <!-- 是否收版 -->
                <col width="6%">
                <!-- 成分/织法/工艺 -->
                <col width="13%">
                <!-- 录样要求 -->
                <col width="6%">
                <!-- 颜色要求 -->
                <col width="10%">
                <!-- 销售员 -->
                <col width="8%">
                <!-- 操作 -->
              </colgroup>
              <thead>
                <tr>
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
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <!-- 需求号 -->
                  <td>
                    <el-tooltip class="item" placement="top" v-if="item.orderCount > 1">
                      <div slot="content">
                        已拆分{{item.orderCount}}个订单
                      </div>
                      <span class="icon icon-chaidan"></span>
                    </el-tooltip>
                    {{item.number}}
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
                  <!-- 操作 -->
                  <td class="ta-l">
                    <div>
                      <el-button :disabled="item.orderCount == 1" class="table-btn submit" @click.native="notice(item)">通知找版</el-button>
                      <el-button class="table-btn" @click.native="goEdit(item)">编辑</el-button>
                    </div>
                    <div>
                      <el-button class="table-btn" @click.native="cancel(item)">取消</el-button>
                    </div>
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
import { getFindWaitList, chgNeedNotify, chgNeedCancel } from 'src/service/assessor';
export default {
  components: {
    hsMenu,
    search
  },
  data() {
    return {
      params: {
        keyword: '',
        status: 1,
        haveRealVersion: '',
        pageNumber: 1,
        pageSize: 10
      },
      list: [],
      total: 0,
    }
  },
  methods: {
    async notice(item) {
      try {
        let dlgRes = await this.$confirm('立即通知找版？', '提示');
        if (dlgRes !== 'confirm') return;
        let res = await chgNeedNotify({ 'id': item.id });
        if (res.success !== '1') return;
        this.$message.success(res.msg);
        this.getList();
      } catch (e) {
        console.log(e)
      }
    },
    goEdit(item) {
      this.$router.push({ name: 'checkFindWaitDetail', query: { id: item.id } })
    },
    async cancel(item) {
      try {
        let dlgRes = await this.$confirm('是否取消需求？', '提示');
        if (dlgRes !== 'confirm') return;
        let res = await chgNeedCancel({ 'id': item.id });
        if (res.success !== '1') return;
        this.$message.success(res.msg);
        this.getList();
      } catch (e) {
        console.log(e)
      }
    },
    async getList() {
      let res = await getFindWaitList(this.params);
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
