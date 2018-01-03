<template>
  <div v-loading.fullscreen="fullscreenLoading" class='baoBiao-list' :style="`height: ${height}px`">
    <el-tabs type="card" @tab-click="handleClick" class='has-link' :active-name="activeTabKey">
      <el-tab-pane name="1">
        <router-link slot="label" to="">入仓报表</router-link>
        <span class='tab-label'>入仓时间</span>
      </el-tab-pane>
      <el-tab-pane name="2">
        <router-link slot="label" to="">出仓报表</router-link>
        <span class='tab-label'>出仓时间</span>
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="16" class='time-col' style="margin-left: 15px;">
        <!-- <el-date-picker
           v-model="dateArr"
           type="datetimerange"
           placeholder="选择时间范围(最多7天)"
           :onClick='datePicker'
           style="width:350px">
         </el-date-picker> -->
        <el-date-picker :default-value="defaultBegin" v-model="beginDate" type="datetime" placeholder="选择开始时间">
        </el-date-picker>
        <el-date-picker :default-value="defaultEnd" v-model="endDate" type="datetime" placeholder="选择结束时间">
        </el-date-picker>
        <!-- <el-button @click.native="clearTime" style='margin-left: -5px;' class='clear-time'icon="delete"></el-button> -->
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click.native="downLoad">导出</el-button>
        <el-button type="primary" @click.native="dialogHandle">发送Excel到邮件</el-button>
      </el-col>
    </el-row>

    <el-dialog title="导出Excel设置" v-model="emailDialog.visible" size="tiny">
      <div style='padding: 5px 0;font-size: 14px;text-align: left'>
        <el-button type="primary" @click.native="downLoadEmail(emailDialog.param)">发送Excel到邮箱</el-button>
        <el-select v-model="emailDialog.param.toEmail" style="display: inline-block;">
          <el-option value="finacedpt@soouya.com">finacedpt@soouya.com</el-option>
          <el-option value="rainyzeng@soouya.com">rainyzeng@soouya.com</el-option>
          <el-option value="junozeng@soouya.com">junozeng@soouya.com</el-option>
        </el-select>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.finance-parent .main-content {
  // background-color: #fff;
}

.baoBiao-list {
  background-color: #fff;
  .tabs {
    width: 100%;
    border: none;
  }
  .tab-label {
    margin-left: 15px;
    display: inline-block;
    padding: 10px;
    color: #aaa;
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
  data() {
    return {
      fullscreenLoading: false,
      loading: false,
      emailDialog: {
        visible: false,
        param: {}
      },
      beginDate: '',
      endDate: '',
      activeTabKey: '1',
      height: '600',
      defaultBegin: new Date((new Date().getFullYear()) + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getDate())),
      defaultEnd: new Date((new Date().getFullYear()) + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getDate()) + ' ' + 23 + ':' + 59 + ':' + 59)
    }
  },
  mounted() {
    this.height = String(document.body.clientHeight - 200);
  },
  methods: {
    downLoad: function() {
      const that = this
      const param = {
        beginDate: this.beginDate,
        endDate: this.endDate,
        type: 2
      }
      console.log('param.endDate', param.endDate)
      console.log('param.beginDate', param.endDate)
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
      param.beginDate = new Date(param.beginDate).getTime()
      param.endDate = new Date(param.endDate).getTime()
      if (distance > 0) {
        that.$message('时间范围不能超过七天');
      } else {
        const url = `${that.activeTabKey == 1 ? AccountApi.InReposity.exportInReposityBaoBiao : AccountApi.InReposity.exportOutReposityBaoBiao}?param=${JSON.stringify(param)}`
        window.open(url)
        console.log(url);
      }
    },
    dialogHandle() {
      const that = this
      const param = {
        beginDate: this.beginDate,
        endDate: this.endDate,
        type: 3,
        toEmail: this.emailDialog.param.toEmail
      }
      console.log('param.endDate', param.endDate)
      console.log('param.beginDate', param.endDate)
      // const distance = (param.endDate - param.beginDate) - 7 * 24 * 60 * 60 * 1000
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
      param.beginDate = new Date(param.beginDate).getTime()
      param.endDate = new Date(param.endDate).getTime()
      this.emailDialog.visible = true
      this.emailDialog.param = param
      this.emailDialog.param.toEmail = 'finacedpt@soouya.com'
    },
    downLoadEmail: function(param) {
      const that = this
      const url = `${that.activeTabKey == 1 ? AccountApi.InReposity.exportInReposityBaoBiao : AccountApi.InReposity.exportOutReposityBaoBiao}?param=${JSON.stringify(param)}`
      window.open(url)
      console.log(url);
    },
    handleClick: function(tab) {
      this.activeTabKey = tab.name
    }
  }
}
</script>
