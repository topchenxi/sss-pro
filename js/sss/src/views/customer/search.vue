<template>
  <div class="search-wrap mt20">
    <div class="item">
      <el-input class="w300" placeholder="企业名称，注册手机号，法人姓名" v-model="params.key" @keyup.enter.native="search"></el-input>
    </div>
    <div class="item">
      <el-select v-model="params.hasOpenedFinance" placeholder="选择是否开通金融">
        <el-option label="选择是否开通金融" value=""></el-option>
        <el-option label="已开通" value="1"></el-option>
        <el-option label="未开通" value="0"></el-option>
      </el-select>
    </div>
    <div class="item">
      <el-select v-model="params.status" placeholder="请选择状态">
        <el-option label="请选择状态" value=""></el-option>
        <el-option label="正常" value="1"></el-option>
        <el-option label="异常" value="-2"></el-option>
      </el-select>
    </div>
    <div class="item">
      <el-checkbox v-model="params.largeBox">大客户</el-checkbox>
    </div>
    <el-button class="btn-search" @click.native="search">搜索</el-button>
    <el-button class="btn-search" @click.native="reset">重置</el-button>
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
    'params.largeBox': function() {
      this.search();
    },
    'params.hasOpenedFinance': function() {
      this.search();
    },
    'params.status': function() {
      this.search();
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
        key: '',
        status: '',
        hasOpenedFinance: '',
        largeBox: false,
        pageNumber: 1,
        pageSize: 10,
      })
    }
  }
}

</script>
