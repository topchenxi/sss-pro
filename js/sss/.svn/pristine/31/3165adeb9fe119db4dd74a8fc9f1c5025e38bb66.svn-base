<template>
  <div class="search-wrap mt20">
    <div class="item">
      <el-input class="w300" placeholder="供应商档口名称，档口电话" v-model="params.key"></el-input>
    </div>
    <div class="item">
      <el-select v-model="params.check" placeholder="状态">
        <el-option label="全部" value=""></el-option>
        <el-option label="未审核" value="0"></el-option>
        <el-option label="已审核" value="1"></el-option>
        <el-option label="已废弃" value="-1"></el-option>
      </el-select>
    </div>
    <el-button class="btn-search" @click.prevent="search">搜索</el-button>
    <el-button class="btn-search" @click.prevent="reset">重置</el-button>
  </div>
</template>
<script>
export default {
  props: {
    'params': {
      'type': Object,
      'required': false,
      'default': () => {}
    }
  },
  data() {
    return {};
  },
  watch: {
    'params.check': function(newValue, oldVal) {
      this.getList()
    }
  },
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
        check: '',
        key: ''
      })
      this.getList();
    }
  }
}

</script>
