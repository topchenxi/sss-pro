<template>
  <div class="search-content mt20">
    <div class="row">
      <div class="item w400">
        <el-input v-if="currentRuoteName == 'debtOfUncleared'&&params.type==1" placeholder="请输入采购商，供应商，订单号，出仓单号，采购员" v-model="params.key"> </el-input>
        <el-input v-if="currentRuoteName == 'debtOfUncleared'&&params.type==2" placeholder="请输入采购商，供应商，订单号，出仓单号，采购员，剪版员" v-model="params.key"> </el-input>
        <el-input v-if="currentRuoteName != 'debtOfUncleared'" placeholder="请输入采购商，账单号，出仓单号，订单号，扣数单号" v-model="params.key"> </el-input>
      </div>
      <div class="item" v-if="currentRuoteName!='debtOfSubmit'">
        <el-select v-model="params.type" placeholder="订单类型">
          <el-option label="大货" value="1"></el-option>
          <el-option label="剪版" value="2"></el-option>
        </el-select>
      </div>
      <template v-if="currentRuoteName == 'debtOfUncleared'&&params.type==1">
        <div class="item">
          <el-date-picker v-model="params['bulk.createTimeBegin']" type="datetime" placeholder="开始时间"></el-date-picker>
        </div>
        <div class="item">
          <el-date-picker v-model="params['bulk.createTimeEnd']" type="datetime" placeholder="结束时间"></el-date-picker>
        </div>
      </template>
      <template v-if="currentRuoteName == 'debtOfUncleared'&&params.type==2 || currentRuoteName == 'debtOfSubmit'">
        <div class="item">
          <el-date-picker v-model="params.createTimeBegin" type="datetime" placeholder="开始时间"></el-date-picker>
        </div>
        <div class="item">
          <el-date-picker v-model="params.createTimeEnd" type="datetime" placeholder="结束时间"></el-date-picker>
        </div>
      </template>
      <template v-if="currentRuoteName == 'debtOfFinish'">
        <div class="item">
          <el-date-picker v-model="params.reconciliationTimeBegin" type="datetime" placeholder="对账开始时间"></el-date-picker>
        </div>
        <div class="item">
          <el-date-picker v-model="params.reconciliationTimeEnd" type="datetime" placeholder="对账结束时间"></el-date-picker>
        </div>
      </template>
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
      currentRuoteName: this.$route.name
    };
  },
  mounted() {
    // console.log(this.currentRuoteName);
  },
  watch: {
    'params.type' () {
      this.search();
    }
  },
  methods: {
    addBill() {
      this.$router.push({ 'name': 'debtOfAddBill' });
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
        'key': '',
        'createTimeBegin': '',
        'createTimeEnd': '',
        'pageNumber': 1,
        'pageSize': 10,
      });
      if (this.currentRuoteName == 'debtOfSubmit') {
        this.params.type = '1';
        this.params['bulk.createTimeBegin'] = '';
        this.params['bulk.createTimeEnd'] = '';
      }
      if (this.currentRuoteName == 'debtOfSubmit') {}
      if (this.currentRuoteName == 'debtOfFinish') {
        this.params.type = '1';
        this.params.reconciliationTimeBegin = '';
        this.params.reconciliationTimeEnd = '';
      }
      this.search();
    }
  }
}

</script>
