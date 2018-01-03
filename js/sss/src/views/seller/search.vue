<template>
  <div class="search-wrap mt20">
    <div class="item"> <span>注册手机号：</span>
      <el-input v-model="params.mobilePhone" @keyup.enter.native="search"></el-input>
    </div>
    <div class="item"> <span>店铺名称：</span>
      <el-input v-model="params.companyLike" @keyup.enter.native="search"></el-input>
    </div>
    <div class="item"> <span>档口名称：</span>
      <el-input v-model="params.shopCompanyLike" @keyup.enter.native="search"></el-input>
    </div>
    <div class="item"> <span>档口电话：</span>
      <el-input v-model="params.shopTel" @keyup.enter.native="search"></el-input>
    </div>
    <div class="item" style="clear:both;">
      <el-select v-model="params.status" placeholder="请选择状态">
        <el-option label="请选择状态" value=""></el-option>
        <el-option label="激活" value="1"></el-option>
        <el-option label="未激活" value="0"></el-option>
        <el-option label="异常" value="-2"></el-option>
      </el-select>
    </div>
    <div class="item">
      <el-checkbox v-model="params.soouyaBox">搜芽自营</el-checkbox>
    </div>
    <el-button class="btn-search" @click="search">搜索</el-button>
    <el-button class="btn-search" @click="reset">重置</el-button>
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
    'params.soouyaBox': function() {
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
        mobilePhone: '',
        companyLike: '',
        shopCompanyLike: '',
        shopTel: '',
        status: '',
        soouyaBox: false,
        pageSize: 10,
        pageNumber: 1
      });
    }
  }
}

</script>
