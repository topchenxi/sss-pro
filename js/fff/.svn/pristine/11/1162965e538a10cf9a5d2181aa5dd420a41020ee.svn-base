<template>
  <section>
    <!-- <h2>报销详情页</h2> -->
    <i class="el-icon-arrow-left goback-icon" @click="$router.go(-1)">返回</i>
    <template v-if="reimburseInfo">
      <div class="content box">
        <span class="detail-title">报销信息：</span>
        <span>进入待报销时间：{{reimburseInfo.createTime | formatTime}}</span>
        <table class="custom-table">
          <tr>
            <td>报销状态：
              <span class="forgive-color">{{reimburseInfo.status == 1 ? '待报销' : '已报销'}}</span>
            </td>
            <td>剪版员：{{reimburseInfo.cutterName}}/{{reimburseInfo.cutterTel}}</td>
            <td>报销单号：{{reimburseInfo.number}}</td>            
            <td>报销类型：剪版</td>
          </tr>
          <tr>
            <td>成本货款：{{reimburseInfo.costMoney | formatMoney}}</td>            
            <td>报销方式：{{reimburseInfo.fukuanType === 1 ? '现金报销' : '线上转账'}}</td>
            <td colspan="2" rowspan="2">财务备注：{{reimburseInfo.remark}}</td>            
          </tr>
          <tr>
            <td colspan="2" align="left">
              报销金额：{{reimburseInfo.baoxiaoMoney | formatMoney}}元<span style="color: #999;float:right">（报销成本货款）</span></td>
          </tr>
        </table>
      </div>
      <orderDetail :basicData="basicData"></orderDetail>
      <CutInformation class="content box" :cutData="basicData"></CutInformation>
    </template>
    <!-- <footer class="fixed-footer" v-if="this.$route.params.status === 'undone'">
        <div>
          <el-button type="primary" @click="showReimburseDialog">报销</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
      </footer> -->
    <lightbox></lightbox>
    <ReimburseDialog :config="dialogConfig" v-on:success="toback"></ReimburseDialog>
  </section>
</template>
<script>
import orderDetail from 'components/detail/orderDetail'
import reimburseApi from 'api/reimburse'
import inReposity from 'components/detail/inReposity'
import outReposity from 'components/detail/outReposity'
import Lightbox from 'components/lightbox/lightbox'
import CutInformation from 'components/detail/cutInformation'
import DahuoInformation from 'components/detail/dahuoInformation'
import ReimburseDialog from 'components/reimburseDialog.vue'

export default {
  components: {
    orderDetail,
    inReposity,
    outReposity,
    Lightbox,
    DahuoInformation,
    CutInformation,
    ReimburseDialog
  },
  filters: {
  },
  data() {
    return {
      reimburseInfo: null,
      basicData: null,
      dialogConfig: {
        isShow: false,
        ids: '',
        totalMoney: 0,
        type: 'cut'
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      reimburseApi.getCutDetails({ id: this.$route.query.id }).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.basicData = response.obj.cut
          this.reimburseInfo = response.obj
        }
      })
    },
    showReimburseDialog() {
      this.dialogConfig.ids = []
      this.dialogConfig.ids.push(this.$route.query.id)
      this.dialogConfig.totalMoney = this.reimburseInfo.costMoney
      this.dialogConfig.isShow = true
    },
    toback() {
      // console.log('1445454')
      window.history.go(-1)
    }
  }
}
</script>

<style lang="scss">
.dsf-detail {
  .fixed-footer {
    position: fixed;
    left: 201px;
    right: 0;
    bottom: 0;
    background: #fff;
    height: 50px;
    padding-top: 10px;
    padding-left: 15px;
  }
  .custom-table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #ccc;
    border-bottom: 0;
    border-right: 0;
    border-collapse: separate;
    table-layout: fixed;
    text-align: left;
    margin-bottom: 20px;
    th {
      white-space: nowrap;
      overflow: hidden;
      background-color: #fff;
      height: 20px;
      line-height: 40px;
      text-overflow: ellipsis;
      vertical-align: middle;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      box-sizing: border-box;
      color: #1f2d3d;
      padding: 0 10px;
    }
    tr {
      height: 35px;
    }
    td {
      padding: 5px 10px;
      font-size: 14px;
      position: relative;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      min-width: 0;
      min-width: 100px;
      text-overflow: ellipsis;
      vertical-align: middle;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      label {
        display: inline-block;
        vertical-align: top;
        line-height: 40px;
      }
      p {
        display: inline-block;
        padding-right: 10px;
      }
      .imgShow {
        display: inline-block;
        a {
          margin-right: 5px;
        }
      }
      .left-img {
        float: left;
      }
      .right-info {
        float: right;
        line-height: 40px;
      }
    }
  }
  .el-tabs__content {
    position: static
  }
  .el-table td .cell {
    padding: 5px;
  }
  .line {
    height: 1px;
    border-bottom: 1px solid dashed;
  }
  .red {
    color: red;
  }
  .real-money {
    display: inline-block;
    width: 200px
  }
}

.fixed-footer {
  height: 50px;
  >div {
    position: fixed;
    left: 200px;
    bottom: 0;
    right: 19px;
    border: 1px solid #ccc;
    background: #fff;
    padding: 10px 20px;
  }
}
</style>
