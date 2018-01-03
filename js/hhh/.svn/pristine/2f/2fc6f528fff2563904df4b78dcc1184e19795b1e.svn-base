<template>
  <div class="search-content mt20">
    <div class="row">
      <div class="item w400">
        <el-input placeholder="订单号/采购商/供应商" v-model="params.keyword"> </el-input>
      </div>
      <div class="item" v-if="currentRuoteName!='bulkRRCancel'">
        <el-select v-model="params.type">
          <el-option v-for="item in rrOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
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
    return {
      currentRuoteName: this.$route.name,
      rrOptions: [{
          label: '全部退换类型',
          value: '',
        },
        {
          label: '售后退货',
          value: 3,
        },
        {
          label: '售后换货',
          value: 4
        }
      ],
    };
  },
  mounted() {},
  watch: {
    'params.type' () {
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
        'keyword': '',
        'type': '',
        'pageNumber': 1,
        'pageSize': 10
      });
      this.search();
    }
  }
}

</script>
