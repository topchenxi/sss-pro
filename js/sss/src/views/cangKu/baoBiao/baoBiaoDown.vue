<template>
  <div v-loading.fullscreen="fullscreenLoading" class='baoBiao-list' :style="`height: ${height}px`">
    <el-tabs type="card" @tab-click="handleClick" class='tabs' :active-name="activeTabKey">
      <el-tab-pane name="1" label= '入仓报表'>
        <span class='tab-label'>入仓时间</span>
      </el-tab-pane>
      <el-tab-pane name="2" label= '出仓报表'>
        <span class='tab-label'>出仓时间</span>
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="16" class='time-col'>
        <!-- <el-date-picker
         v-model="dateArr"
         type="datetimerange"
         placeholder="选择时间范围(最多7天)"
         :onClick='datePicker'
         style="width:350px">
       </el-date-picker> -->
       <el-date-picker
        v-model="beginDate"
        type="datetime"
        placeholder="选择开始时间">
        </el-date-picker>
         <el-date-picker
          v-model="endDate"
          type="datetime"
          placeholder="选择结束时间">
        </el-date-picker>
        <!-- <el-button @click.native="clearTime" style='margin-left: -5px;' class='clear-time'icon="delete"></el-button> -->
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click.native="downLoad">导出</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss">
.finance-parent .main-content{
  background-color: #fff;
}

.baoBiao-list {
  background-color: #fff;
  .tabs{
      width: 100%;
    }
  .tab-label{
    display: inline-block;
    padding: 10px;
  }
}
</style>
<script>
import {
  // request
  // formatTimeString,
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
export default {
  data () {
    return {
      fullscreenLoading: false,
      loading: false,
      beginDate: '',
      endDate: '',
      activeTabKey: '1',
      height: '600'
    }
  },
  mounted() {
    this.height = String(document.documentElement.clientHeight - 200);
  },
  methods: {
    downLoad: function() {
      const that = this
      const param = {
        beginDate: this.beginDate,
        endDate: this.endDate
      }
      const distance = (param.endDate - param.beginDate) - 7 * 24 * 60 * 60 * 1000
      if (!param.beginDate) {
        that.$message('请选择开始时间');
        return;
      }
      if (!param.endDate) {
        that.$message('请选择结束时间');
        return;
      }
      if (param.beginDate && param.beginDate > param.endDate) {
        that.$message('开始时间不能大于结束时间');
        return;
      }
      if (distance > 0) {
        that.$message('时间范围不能超过七天');
      } else {
        const url = `${that.activeTabKey == 1 ? AccountApi.InReposity.exportInReposityBaoBiao : AccountApi.InReposity.exportOutReposityBaoBiao}?param=${JSON.stringify(param)}`
        window.open(url)
      }
    },
    handleClick: function(tab) {
      this.activeTabKey = tab.name
    }
  }
}
</script>
