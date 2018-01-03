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
              </colgroup>
              <thead>
                <tr>
                  <th>图片</th>
                  <th>供应商</th>
                  <th>货号</th>
                  <th>原供应商</th>
                  <th>原货号</th>
                  <th>品类</th>
                  <th>成分</th>
                  <th>幅宽</th>
                  <th>克重</th>
                  <th>大货价格</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in list" :key="index">
                  <!-- 图片 -->
                  <td>
                    <a v-if="!!item.colorUrls.length" :name="index" :href="imageDomain + item.colorUrls[0]" v-lightbox="item.colorUrls" v-bind:data="`商品` + index"> 
                      <img :src="imageDomain +  item.colorUrls[0]" width="60" height="60" /> </a>
                    <img v-else src="~assets/default_pic_detail.png" alt="" width="60px" height="60px">
                  </td>
                  <!-- 供应商 -->
                  <td>{{item.company || '--' }}</td>
                  <!-- 货号 -->
                  <td>{{item.number || '--' }}</td>
                  <!-- 原供应商 -->
                  <td>
                    <el-tooltip placement="left" v-if="item.shopCompany">
                      <div slot="content">档口电话：{{item.shopTel}}
                        <br/>档口地址: {{item.shopProvince}}{{item.shopCity}}{{item.shopArea}}{{item.shopAddr}}</div>
                      <p v-if="item.shopCompany">{{item.shopCompany}}</p>
                    </el-tooltip>
                    <span v-if="!item.shopCompany">-</span>
                  </td>
                  <!-- 原货号 -->
                  <td>{{item.shopOriginalNumber}}</td>
                  <!-- 品类 -->
                  <td>{{item.type}}</td>
                  <!-- 成分 -->
                  <td>{{item.composition || '--' }}</td>
                  <!-- 幅宽 -->
                  <td>{{item.width | widthFilter(item)}}</td>
                  <!-- 克重 -->
                  <td>{{item.weight | weightFilter(item)}}</td>
                  <!-- 大货价格 -->
                  <td class="ta-l">
                    <p>{{item.costPrice | costPriceFilter(item)}}</p>
                    <p>{{item.price | priceFilter(item)}}</p>
                  </td>
                  <!-- 操作 -->
                  <td>
                    <el-button class="table-btn" @click.native="toDetail(item.id)">详情</el-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Page :total="total" :params="params" @toSearch="getList"></Page>
        </div>
      </div>
    </div>
    <lightbox></lightbox>
  </div>
</template>
<script>
import hsMenu from '../menu.vue';
import search from '../search.vue';
import { getProductList } from 'src/service/dataer';
import Lightbox from 'components/lightbox/lightbox'
export default {
  components: {
    hsMenu,
    search,
    Lightbox
  },
  data() {
    return {
      imageDomain: 'http://www.soouya.com',
      params: {
        sellerId: '',
        number: '',
        shopCompany: '',
        shopOriginalNumber: '',
        sellerSoouya: 1,
        pageNumber: 1,
        pageSize: 10,
        ownStatus: 1,
      },
      list: [],
      total: 0,
    }
  },
  methods: {
    toDetail(id) {
      this.$router.push({ name: 'productDetail', query: { 'id': id, 'type': 1 } });
    },
    async getList() {
      this.$store.dispatch('changeload', true);
      let res = await getProductList(this.params);
      if (res.success !== '1') return;
      this.$store.dispatch('changeload', false);
      this.list = res.page.result;
      this.total = res.page.totalCount;
    }
  },
  filters: {
    widthFilter(value, item) {
      return value ? `${value}${item.widthUnit}` : '--';
    },
    weightFilter(value, item) {
      return value ? `${value}${item.weightUnit}` : '--';
    },
    costPriceFilter(value, item) {
      return '成本价 : ' + (value && value != -1 ? value.toFixed(2) + item.priceUnit : '--');
    },
    priceFilter(vaule, item) {
      const title = '销售价 : ';
      if (!item.colorPrices || !item.colorPrices.length) {
        return title + (item.price > 0 ? Number(item.price).toFixed(2) + item.priceUnit : '--');
      }
      let array = item.colorPrices.map(item => Number(item.price)) || [];
      array.push(Number(item.price));
      const [max, min] = [Math.max.apply(null, array), Math.min.apply(null, array)];
      if (min == -1) {
        return title + max.toFixed(2) + item.priceUnit;
      }
      if (max > 0) {
        return title + min.toFixed(2) + item.priceUnit + ' ~ ' + max.toFixed(2) + item.priceUnit;
      }
      return '';
    }
  },
  mounted() {
    this.getList();
  }
}

</script>
