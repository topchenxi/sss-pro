<template>
  <div class="search-content mt20">
    <div class="row">
      <div class="item w360">
        <el-input v-model="params.keyword" placeholder="订单号，采购商名称，销售员，找版员，剪版员"></el-input>
      </div>
      <div class="item">
        <el-select v-model="params.category" placeholder="订单类型">
          <el-option label="订单类型" value=""></el-option>
          <el-option label="找版" value="zb-zy"></el-option>
          <el-option label="剪版" value="jb-zy"></el-option>
        </el-select>
      </div>
      <div class="item" v-if="currentRouteName == 'pickerOrderList'">
        <el-select v-model="params.status" placeholder="订单状态">
          <el-option label="订单状态" value=""></el-option>
          <el-option label="待收版" :value="1"></el-option>
          <el-option label="待发货" :value="2"></el-option>
          <el-option label="已发货" :value="3"></el-option>
        </el-select>
      </div>
    </div>
    <div class="row">
      <div class="item">
        <el-date-picker v-model="params.createTimeBegin" type="datetime" size="small" placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div class="item">
        <el-date-picker v-model="params.createTimeEnd" type="datetime" size="small" placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <button class="btn" @click="search">搜索</button>
      <button class="btn" @click="reset">重置</button>
      <button v-if="'pickerOrderList,pickerOfWaitToSend'.indexOf(currentRouteName)!=-1" class="btn search-submit" @click="mutiSend">批量发货</button>

      <button v-if="'pickerOfWaitToCollect'.indexOf(currentRouteName)!=-1" class="btn search-submit" @click="mutiReceive">批量收货</button>
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
      currentRouteName: this.$route.name
    };
  },
  watch: {
    'params.category': function() {
      this.search();
    },
    'params.status': function() {
      this.search();
    }
  },
  mounted() {
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
        category: '',
        keyword: '',
        createTimeBegin: '',
        createTimeEnd: '',
        pageNumber: 1,
        pageSize: 10
      });
      if (this.currentRouteName === 'pickerOrderList') {
        this.params.status = '';
      }
      this.search();
    },
    mutiSend() {
      this.$emit('mutiSend');
    },
    mutiReceive() {
      this.$emit('mutiReceive');
    }
  }
}

</script>
