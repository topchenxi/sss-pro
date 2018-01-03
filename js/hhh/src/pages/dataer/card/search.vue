<template>
  <div class="search-content mt20">
    <div class="row">
      <div class="item w360">
        <el-input placeholder="需求号/采购商/销售员" v-model="params.keyword1"> </el-input>
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
        keyword1: ''
      });
      this.search();
    }
  }
}

</script>
