<template>
  <div class="search-content mt20">
    <div class="row">
      <div class="item">
        <el-select v-model="params.sellerId" placeholder="选择供应商">
          <el-option key="" value="" label="全部"></el-option>
          <el-option v-for="item in companyArray" :key="item.sellerId" :label="item.company" :value="item.sellerId"> </el-option>
        </el-select>
      </div>
      <div class="item">
        <el-input placeholder="货号" v-model="params.number" @keydown.enter.native="search">
        </el-input>
      </div>
      <div class="item">
        <el-input placeholder="原供应商" v-model="params.shopCompany" @keydown.enter.native="search"> </el-input>
      </div>
      <div class="item">
        <el-input placeholder="原货号" v-model="params.shopOriginalNumber" @keydown.enter.native="search"> </el-input>
      </div>
      <button class="btn" @click="search">搜索</button>
      <button class="btn" @click="reset">重置</button>
      <button class="btn fr" @click="addProduct" v-if="currentRuoteName=='productCardList'">新增商品</button>
    </div>
  </div>
</template>
<script>
import { getShopList } from 'src/service/dataer';
export default {
  props: {
    params: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      companyArray: [],
      currentRuoteName: this.$route.name
    };
  },
  mounted() {
    this.getShopList();
  },
  watch: {
    'params.sellerId' () {
      this.search();
    }
  },
  methods: {
    addProduct() {
      this.$router.push({ 'name': 'productEdit' });
    },
    async getShopList() {
      let res = await getShopList({ 'sellerSoouya': 1 });
      if (res.success !== '1') return;
      this.companyArray = res.page.result;
    },
    getList() {
      this.$emit('toSearch');
    },
    search() {
      this.params.pageNumber = 1;
      this.getList();
    },
    reset() {
      Object.assign(this.params, {
        sellerId: '',
        number: '',
        shopCompany: '',
        shopOriginalNumber: '',
      });
      this.search();
    }
  }
}

</script>
