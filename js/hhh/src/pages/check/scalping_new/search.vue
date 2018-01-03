<template>
  <div class="search-content mt20">
    <div class="row">
      <div class="item w360">
        <el-input placeholder="需求号/采购商/销售员" v-model="params.keyword"> </el-input>
      </div>
      <div class="item">
        <el-select v-model="params.haveRealVersion" placeholder="是否有实版">
          <el-option label="是否有实版" value=""></el-option>
          <el-option label="有实版" :value="1"></el-option>
          <el-option label="无实版" :value="0"></el-option>
        </el-select>
      </div>
      <button class="btn" @click="search">搜索</button>
      <button class="btn" @click="reset">重置</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    params: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  watch: {
    'params.haveRealVersion': function() {
      this.search();
    },
  },
  mounted() {},
  methods: {
    getList() {
      this.$emit('toSearch');
    },
    search() {
      this.params.pageNumber = 1;
      this.getList();
    },
    reset() {
      Object.assign(this.params, {
        keyword: '',
        haveRealVersion: ''
      });
      this.search();
    }
  }
}

</script>
