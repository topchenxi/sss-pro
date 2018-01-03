<template>
  <section v-loading.fullscreen="fullscreenLoading">
    <!-- <h2>报销详情页</h2> -->
    <i class="el-icon-arrow-left goback-icon" @click="$router.go(-1)">返回</i>
    <template v-if="reimburseInfo">
      <div class="content box">
        <span class="detail-title">报销信息：</span>
        <span>报销时间：{{reimburseInfo.createTime | formatTime}}</span>
        <table class="custom-table">
          <tr>
            <td>报销状态：
              <span class="forgive-color">{{reimburseInfo.status ? reimburseInfo.status === 1 ? '待报销' : '已报销' : ''}}</span>
            </td>
            <td>仓库员：{{reimburseInfo.reposityName}}/{{reimburseInfo.reposityTel}}</td>
            <td>报销单号：{{reimburseInfo.number}}</td>
            <td>报销类型：运费</td>
          </tr>
          <tr>
            <td>报销金额：{{reimburseInfo.baoxiaoMoney | formatMoney}}元
              <span style="color: #999;float:right">（报销运费）</span>
            </td>
            <td>报销方式：{{reimburseInfo.fukuanType ? reimburseInfo.fukuanType === 1 ? '现金报销' : '线上转账' : ''}}</td>
            <td colspan="2">仓库报销备注：{{reimburseInfo.batchNumber}}</td>
          </tr>
          <tr>
            <td colspan="2" align="left">财务备注：{{reimburseInfo.remark}}</td>
            <td colspan="2">物流凭据：
              <article class="media imgShow" v-if='reimburseInfo.sendCertificateList && reimburseInfo.sendCertificateList.length'>
                <a :href="'http://test.soouya.com'+ val" class="image media-left" v-lightbox="reimburseInfo.sendCertificateList" v-for="(val,index) in reimburseInfo.sendCertificateList" :key="index">
                  <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" width="40" height="40">
                </a>
              </article>
            </td>
          </tr>
        </table>
      </div>
      <orderDetail :basicData="basicData"></orderDetail>
      <DahuoInformation class="content box" :basicData="basicData"></DahuoInformation>
      <in-reposity v-if="inReposityList.length" :inReposityList="inReposityList" :quantity="basicData.quantity"></in-reposity>
      <out-reposity v-if="outReposityList.length" :outReposityList="outReposityList" :inReposityList="inReposityList" :outData="true"></out-reposity>
      <footer class="fixed-footer" v-if="this.$route.params.status === 'undone'">
        <!-- <div>
            <el-button type="primary" @click="showReimburseDialog">报销</el-button>
            <el-button @click="$router.go(-1)">返回</el-button>
          </div> -->
      </footer>
    </template>
    <lightbox></lightbox>
    <ReimburseDialog :config="dialogConfig" v-on:success="goDone"></ReimburseDialog>
  </section>
</template>
<script>
import orderDetail from 'components/detail/orderDetail'
import reimburseApi from 'api/reimburse'
import inReposity from 'components/detail/inReposity'
import outReposity from 'components/detail/outReposity'
import Lightbox from 'components/lightbox/lightbox'
// import CutInformation from 'components/detail/cutInformation'
import DahuoInformation from 'components/detail/dahuoInformation'
import ReimburseDialog from 'components/reimburseDialog.vue'

export default {
  components: {
    orderDetail,
    inReposity,
    outReposity,
    Lightbox,
    DahuoInformation,
    ReimburseDialog
  },
  filters: {
  },
  data() {
    return {
      fullscreenLoading: true,
      reimburseInfo: null,
      basicData: null,
      inReposityList: [],
      outReposityList: [],
      dialogConfig: {
        isShow: false,
        ids: [],
        totalMoney: 0,
        type: 'freight'
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      reimburseApi.getFreightDetails({ id: this.$route.query.id }).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.outReposityList = response.obj.outReposityList
          this.basicData = response.obj.order
          this.reimburseInfo = response.obj
        }
        this.fullscreenLoading = false
      })
    },
    showReimburseDialog() {
      this.dialogConfig.isShow = true
    },
    goDone() {
      this.$router.replace({ path: '/reimburse/freight/details/done', query: this.$route.query })
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
