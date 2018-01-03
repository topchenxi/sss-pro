<template id="">
  <div class='c-header clearfix'>
    <div class="y-filter clearfix">
      <!-- <div class="filter-item item-select"
       v-show="category.name == 'fh' && category.index == '1'">
        <el-select v-model="select" size="small" style="width: 155px;" placeholder="全部状态">
          <el-option label="全部状态" value="1"></el-option>
          <el-option label="等待发货" value="2"></el-option>
          <el-option label="等待通知采购商取货" value="3"></el-option>
        </el-select>
      </div> -->
      <template v-if="category.name != 'bill' && category.name != 'cutManage'">
        <div class="filter-item only-select" v-if="category.name == 'dh' || category.name == 'buyerdh'">
          <el-select :key="randomKey" v-model="filterItem.type" size="large" style="width: 160px;" placeholder="全部退换类型">
            <el-option label="全部退换类型" value="0"></el-option>
            <el-option label="退货" value="1" size="small"></el-option>
            <el-option label="换货" value="2" size="small"></el-option>
            <el-option label="售后退货" value="3" size="small"></el-option>
            <el-option label="售后换货" value="4" size="small"></el-option>
            <el-option label="仅退款" value="5" size="small"></el-option>
          </el-select>
        </div>
        <div class="filter-item only-select" v-if="category.name == 'buyerpr'">
          <el-select :key="randomKey" v-model="filterItem.type" size="small" style="width: 120px;" placeholder="全部">
            <el-option label="全部" value="0"></el-option>
            <el-option label="服务单" value="1" size="small"></el-option>
            <el-option label="贸易单" value="2" size="small"></el-option>
          </el-select>
        </div>
        <div class="filter-item only-select" v-show="category.name == 'dh' && category.index == '1'">
          <el-select :key="randomKey" v-model="filterItem.status" size="small" style="width: 120px;" placeholder="全部状态">
            <el-option label="全部状态" value="2"></el-option>
            <el-option label="等待确认退换货" value="1"></el-option>
          </el-select>
        </div>
        <div class="filter-item only-select" v-show="category.name == 'date'">
          <span class="item-title">时间:</span>
          <el-date-picker v-model="filterItem.createTimeBegin" type="datetime" size="small" style="float:left;" placeholder="选择日期时间">
          </el-date-picker>
          <span class="item-title" style="margin-left: 10px;">-</span>
          <el-date-picker v-model="filterItem.createTimeEnd" type="datetime" size="small" placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <div class="filter-item item-search">
          <el-input v-if="category.name == 'buyerpr'" placeholder="退换货单号/订单号/采购商/供应商" v-model="filterItem.keyword" style="width: 250px;" size="small" class='fl'>
          </el-input>
          <el-input v-else-if="category.name == 'buyerAndSeller'" :placeholder="category.index == 0 ? '用户名/联系电话/公司名称' : '店铺名称/档口名称'" v-model="filterItem.keyword" style="width: 160px;" size="small" class='fl'>
          </el-input>
          <el-input v-else-if="category.name ==  'ksOrderList'" placeholder="出仓订单号/订单号/采购商/供应商" v-model="filterItem.key" style="width:240px;" size="small" class='fl'>
          </el-input>
          <el-input v-else :placeholder="category.name == 'sales' ? '订单号/采购商' : '订单号/采购商/供应商'" v-model="filterItem.keyword" style="width: 160px;" size="small" class='fl'>
          </el-input>
        </div>
      </template>
      <!-- 账单类 -->
      <template v-if="category.name == 'bill'">
        <div class="filter-item item-search">
          <p class="filter-title">采购商ID:</p>
          <el-input placeholder="" v-model="filterItem.buyerNumber" style="width: 160px; float: left;" size="small" class='fl'>
          </el-input>
        </div>
        <div class="filter-item item-search">
          <p class="filter-title">采购商公司名:</p>
          <el-input placeholder="" v-model="filterItem.buyerCompany" style="width: 160px; float: left;" size="small" class='fl'>
          </el-input>
        </div>
        <div class="filter-item item-search" style="margin-right: 30px;">
          <p class="filter-title">账单状态:</p>
          <el-select :key="randomKey" v-model="filterItem.status2" size="small" style="width: 120px; display: inline-block;" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="未提交" :value="1" size="small"></el-option>
            <el-option label="审核中" :value="2" size="small"></el-option>
            <el-option label="审核不通过" :value="3" size="small"></el-option>
            <el-option label="已清偿" :value="4" size="small"></el-option>
          </el-select>
        </div>
        <div class="filter-item item-search">
          <p class="filter-title">账单号:</p>
          <el-input placeholder="" v-model="filterItem.number" style="width: 160px; float: left;" size="small" class='fl'>
          </el-input>
        </div>
        <div class="filter-item item-search">
          <p class="filter-title">账单日:</p>
          <el-date-picker v-model="filterItem.billTimeBegin" type="datetime" size="small" style="float: left;" placeholder="选择日期时间">
          </el-date-picker>
          <span class="item-title" style="float: left; margin-left: 10px;">-</span>
          <el-date-picker v-model="filterItem.billTimeEnd" type="datetime" size="small" style="float: left;" placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </template>
      <template v-if="category.name == 'cutManage'">
        <div class="filter-item item-search" style="margin-right: 30px;">
          <p class="filter-title">订单状态:</p>
          <el-select :key="randomKey" v-model="filterItem.status3" size="small" style="width: 120px; display: inline-block;" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <template v-if="!cutMember">
              <el-option label="待录入剪版信息" :value="200" size="small"></el-option>
              <el-option label="待提交审核" :value="201" size="small"></el-option>
              <el-option label="待审核" :value="202" size="small"></el-option>
              <el-option label="待发货" :value="220" size="small"></el-option>
              <el-option label="待销账" :value="222" size="small"></el-option>
              <el-option label="待提交支付" :value="221" size="small"></el-option>
              <el-option label="已完成" :value="223" size="small"></el-option>
              <el-option label="已取消" :value="230" size="small"></el-option>
            </template>
            <template v-if="cutMember">
              <el-option label="待录入剪版信息" :value="200" size="small"></el-option>
              <el-option label="待提交审核" :value="201" size="small"></el-option>
              <el-option label="已报账" :value="211" size="small"></el-option>
              <el-option label="待报账" :value="210" size="small"></el-option>
            </template>
          </el-select>
        </div>
        <div class="filter-item item-search" style="margin-right: 30px;">
          <p class="filter-title">品类:</p>
          <el-select :key="randomKey" v-model="filterItem.category" size="small" style="width: 120px; display: inline-block;" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="辅料" :value="0" size="small"></el-option>
            <el-option label="面料" :value="1" size="small"></el-option>
          </el-select>
        </div>
        <div class="filter-item item-search">
          <p class="filter-title">时间:</p>
          <el-date-picker v-model="filterItem.createTimeBegin" type="datetime" size="small" style="float: left;" placeholder="选择日期时间">
          </el-date-picker>
          <span class="item-title" style="float: left; margin-left: 10px;">-</span>
          <el-date-picker v-model="filterItem.createTimeEnd" type="datetime" size="small" style="float: left;" placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <div class="filter-item item-search">
          <el-input placeholder="订单号，采购商名称，供应商名称，手机号" v-model="filterItem.keyword" style="width: 300px;" size="small" class='fl'>
          </el-input>
        </div>
      </template>
    </div>
    <div style="text-align: center;margin-top: 10px;">
      <el-button type="primary" style="width: 20%;" size="small" @click.native="search" class="btn-search">搜索(enter)</el-button>
      <el-button type="primariy" size="small" @click.native="resetSubmit" class="btn-search">重置</el-button>
    </div>
  </div>
</template>
<style lang="scss">
.c-header {
  margin-bottom: 8px;
}

.y-filter {
  .filter-item {
    float: left;
    min-width: 120px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .item-select {
    min-width: 160px;
  }
  .only-select {
    .el-input__inner {
      height: 30px;
    }
  }
  .item-title {
    float: left;
    height: 30px;
    line-height: 30px;
    margin-right: 10px;
  }
  .item-search {}
  .filter-title {
    float: left;
    padding-top: 8px;
    padding-right: 10px;
    font-size: 14px;
    height: 40px;
    font-weight: normal;
  }
}

.btn-search {
  width: 100px;
  font-size: 14px;
  font-weight: normal;
}

.fl {
  float: left;
  margin-right: 40px;
}

.button {
  vertical-align: middle;
}

</style>
<script>
import { getCache } from 'utils/tool'
export default {
  props: {
    params: {
      type: Object,
      required: false,
      randKey: 0,
      default: function(a) {
        return {}
      },
    },
    category: {
      type: Object,
      required: false,
      default: function(a) {
        return {}
      }
    }
  },
  components: {},
  mounted() {
    this.keyCodeBind()
  },
  data() {
    const filterItem = Object.assign({
      select: '',
      dhOrderType: '',
      type: '',
      status: '',
      status2: '',
      status3: '',
      keyword: '',
      key: '',
      buyerCompany: '',
      createTimeBegin: '',
      createTimeEnd: '',
      billTimeBegin: '',
      billTimeEnd: '',
      category: ''
    }, this.params)
    return {
      filterItem
    }
  },
  computed: {
    cutMember() {
      const user = getCache({ key: 'currentUser' }).loginInfo
      if (user.woodCutCloth || user.woodCutClothLeader) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    'category.index' (val) {
      this.filterItem.type = ''
      this.filterItem.status = ''
      this.filterItem.keyword = ''
    }
  },
  methods: {
    keyCodeBind() {
      const that = this
      document.addEventListener('keyup', function(event) {
        if (event.keyCode == '13') {
          that.search()
        }
      }, true);
    },
    search() {
      // this.$emit('getParams', this.filterItem)
      if (this.category.condition == 'notifyPay') {
        const req = {
          createTimeBegin: new Date(this.filterItem.createTimeBegin).getTime(),
          createTimeEnd: new Date(this.filterItem.createTimeEnd).getTime(),
          keyword: this.filterItem.keyword
        }
        this.$emit('getParams', req)
      } else if (this.category.condition == 'bill') {
        const req = {
          billTimeBegin: new Date(this.filterItem.billTimeBegin).getTime(),
          billTimeEnd: new Date(this.filterItem.billTimeEnd).getTime(),
          buyerNumber: this.filterItem.buyerNumber,
          status: this.filterItem.status2,
          keyword: this.filterItem.keyword,
          number: this.filterItem.number,
          dhOrderType: this.filterItem.dhOrderType,
          buyerCompany: this.filterItem.buyerCompany
        }
        this.$emit('getParams', req)
      } else if (this.category.name == 'cutManage') {
        const req = {
          createTimeBegin: new Date(this.filterItem.createTimeBegin).getTime(),
          createTimeEnd: new Date(this.filterItem.createTimeEnd).getTime(),
          status: this.filterItem.status3,
          key: this.filterItem.keyword,
          category: this.filterItem.category
        }
        this.$emit('getParams', req)
      } else {
        this.$emit('getParams', this.filterItem)
      }
    },
    resetSubmit() {
      for (const key of Object.keys(this.filterItem)) {
        if (key != 'pageNumber' && key != 'pageSize') {
          this.filterItem[key] = ''
        }
      }
      this.$emit('getParams', this.filterItem)
    }
  },
  updated() {}
}

</script>
