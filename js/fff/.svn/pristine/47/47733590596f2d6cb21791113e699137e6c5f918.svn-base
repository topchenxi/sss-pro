<template>
  <el-dialog title="导出" v-model="config.isShow" size="tiny">
    <div class="sy-dialog-item">
      <el-button type="primary" @click="exportReports('exportExcel')">导出Excel</el-button>
    </div>
    <div class="sy-dialog-item">
      <el-button type="primary" @click="exportReports('sendToEmail')">发送Excel到邮箱</el-button>
      <el-select v-model="toEmail" style="display: inline-block;">
        <el-option value="finacedpt@soouya.com">finacedpt@soouya.com</el-option>
        <el-option value="rainyzeng@soouya.com">rainyzeng@soouya.com</el-option>
        <el-option value="junozeng@soouya.com">junozeng@soouya.com</el-option>
        <el-option value="huyushan@soouya.com">huyushan@soouya.com</el-option>
      </el-select>
    </div>
  </el-dialog>
</template>

<script>
import reportsApi from 'api/reports'

export default {
  props: ['config'],
  data() {
    return {
      toEmail: 'finacedpt@soouya.com'
    }
  },
  methods: {
    exportReports(type) {
      const params = this.getParams(type)
      reportsApi.exportReports(params).then((response) => {

      })
    },
    getParams(type) {
      let result = {
        status: this.config.status,
        orderNumber: this.config.orderNumber,
        customerCompany: this.config.customerCompany,
        shopCompany: this.config.shopCompany,
        salesName: this.config.salesName,
        guiderName: this.config.guiderName,
        transactionTimeBegin: this.config.transactionTimeBegin ? new Date(this.config.transactionTimeBegin).getTime() : '',
        transactionTimeEnd: this.config.transactionTimeEnd ? new Date(this.config.transactionTimeEnd).getTime() : ''
      }
      if (type === 'exportExcel') {
        Object.assign(result, {
          queryType: 2
        })
      } else if (type === 'sendToEmail') {
        Object.assign(result, {
          queryType: 3,
          toEmail: this.toEmail
        })
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.sy-dialog-item {
  text-align: left;
  margin: 20px 0;
  .el-button {
    margin-right: 20px;
  }
}
</style>
