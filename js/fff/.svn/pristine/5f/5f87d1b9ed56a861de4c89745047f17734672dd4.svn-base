<template>
  <section v-loading.fullscreen.lock="fullscreenLoading">
    <div class="search-content">
      <el-row>
        <el-col>
          <p>采购商</p>
          <el-input v-model="requestParams.keyword" @keyup.enter.native="getCustomerData"></el-input>
          <el-button type="primary" @click.native="getCustomerData">搜索</el-button>
          <!-- <el-button type="primary">导出</el-button> -->
        </el-col>
      </el-row>
    </div>
    <div class="customerList-content">
      <el-collapse accordion @change="getJbList">
        <el-collapse-item :name="index" v-for="(item, index) in customerList" :key="index">
          <template slot="title">
            <span class="title-text">{{item.company}}</span>
            <span class="credit-icon" v-if="item.hasOpenedBaitiao"></span>&nbsp;&nbsp; | &nbsp;&nbsp;
            <span class="title-text">{{item.jbCount}}个剪版单</span>&nbsp;&nbsp; | &nbsp;&nbsp;
            <span class="title-text">待对账总金额：￥{{item.totalMoney | formateNumber}}</span>
          </template>
          <span>采购商：{{item.company}}</span>
          <el-button type="primary" size="small" @click.native="showPayDialog" :disabled="payList.length < 2" style="float:right;margin-right:100px;">批量结算</el-button>
          <el-table border :data="item.cutList" @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="订单号" prop="number"></el-table-column>
            <el-table-column label="订单发布时间" prop="createTime" :formatter="formatTime"></el-table-column>
            <el-table-column label="供应商" prop="shopCompany"></el-table-column>
            <el-table-column label="剪版明细" prop="">
              <template scope="scope">
                <el-popover placement="top-start" trigger="hover">
                  <template>
                    <template v-for="(pro,index) in scope.row.productNumberList">
                      <p :key="index">货号：{{pro.number}}
                        <template v-for="(color,index1) in pro.colors">
                          <span :key="index1">色号：{{color.color}}/{{color.cutterQuantity}}{{color.cutterQuantityUnit}}*{{color.cutterPriceMoney | formateNumber}}元</span>
                        </template>
                      </p>
                    </template>
                  </template>
                  <el-button type="text" slot="reference" style="color:#2f4b68">{{scope.row.huoNumber}}货号{{scope.row.seNumber}}色号</el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="成本货款" prop="costMoney"></el-table-column>
            <el-table-column label="服务费" prop="serviceMoney" :formatter="formatNumber"></el-table-column>
            <el-table-column label="税费" prop="taxMoney" :formatter="formatNumber"></el-table-column>
            <el-table-column label="运费" prop="freightMoney" :formatter="formatNumber"></el-table-column>
            <el-table-column label="总费用" prop="totalMoney"></el-table-column>
            <el-table-column label="异常原因" prop="exceptionMsg"></el-table-column>
            <el-table-column label="操作" fixed="right" min-width="150">
              <template scope="scope">
                <el-button type="primary" size="mini" @click.native="showPayDialog(scope.row)">提交结算</el-button>
                <router-link :to="{name: 'oldDataDetail', query: {id: scope.row.id}}">
                  <el-button type="primary" size="mini">详情</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-dialog :title="payList > 2 ? '批量结算' : '提交结算'" v-model="payDialogVisible">
      <el-form label-position="right" label-width="140">
        <el-form-item label="采购商：">{{dialogData.buyerCompany}}</el-form-item>
        <el-form-item label="可用余额：">{{dialogData.availableBalance | formateNumber}}元</el-form-item>
        <el-form-item label="可用白条额度：">{{dialogData.baitiaoRemainLine | formateNumber}}(白条额度：{{dialogData.baitiaoCreditLine}}元&nbsp;预扣金额：{{dialogData.baitiaoHoldMoney| formateNumber}}元)</el-form-item>
        <el-form-item label="可用垫付额度：">{{dialogData.creditLine | formateNumber}}元(垫付额度：{{dialogData.remainLine | formateNumber}}元&nbsp;预扣金额：{{dialogData.holdMoney}}元)</el-form-item>
        <el-form-item label="支付总计：">{{dialogData.totalPayMoney | formateNumber}}</el-form-item>
        <el-form-item label="支付方式：">余额支付</el-form-item>
        <el-form-item label="付款凭据">
          <el-upload ref="el-upload" action="/redwood/sys/Common/uploadFile.do?type=1" :multiple="true" :show-upload-list="false" :before-upload="handleBeforeupload" :on-success="handleSuccess" style="margin-bottom: 10px;" :on-error="handleError" :file-list="fileList">
            <el-button size="small" type="primary">
              <i class="el-icon-upload"></i>上传凭据</el-button>
          </el-upload>
          <el-row class="file-item" :gutter="20">
            <el-col :span="4" v-for="(file, index) in fileList" :key="index">
              <el-card :body-style="{ padding: '0px', width: '70px', height: '70px' }">
                <img :src="('http://test.soouya.com' + file.response.imgUrl)" class="image" v-if="file.response && file.response.imgUrl.length">
                <div class="mark">
                  <p>{{file.name}}</p>
                  <div class="bottom clearfix">
                    <i class="el-icon-view" title="预览" @click.prevent="handlePreview(file.response&&file.response.imgUrl)"></i>
                    <i class="el-icon-delete" title="删除" @click.prevent="handleRemove(file.uid)"></i>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="结算备注">
          <el-input type="textarea" :autosize="{minRows:3,maxRows:3}" resize="none" v-model="reqPayParams.payRemark"></el-input>
          <p v-if="reqPayParams.payRemark" class="remark-font">{{reqPayParams.payRemark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
        </el-form-item>
      </el-form>
      <footer>
        <template v-if="dialogData.totalPayMoney > dialogData.availableBalance">
          <el-button type="primary" @click.native="toAdjust">预存</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click.native="confirmPay">提交结算</el-button>
        </template>
        <el-button @click.native="handleCancel">取消</el-button>
      </footer>
    </el-dialog>
    <el-dialog title="图片预览" v-model="previewVisible" ref="dialogPreview">
      <img :src="previewSrc" alt="图片预览" class="preview-img" />
    </el-dialog>
  </section>
</template>

<script>
import { newRequest } from 'common/utils'
export default {
  data() {
    return {
      reqPayParams: {
        payRemark: '',
        orderIdAndOutReposityIdList: [],
        customerId: '',
        creditType: 3,
        prepayCredentialUrl: [],
      },
      requestParams: {
        keyword: '',
      },
      fullscreenLoading: false,
      customerList: [],
      cutList: [],
      dialogData: {},
      payList: [],
      customerId: '',
      CustomerCompany: '',
      fileList: [],
      payDialogVisible: false,
      previewVisible: false,
      previewSrc: '',
    }
  },
  mounted() {
    // this.getCustomerData()
  },
  methods: {
    getCustomerData() {
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/buyfollow/Order/listForPay',
        method: 'post',
        data: this.requestParams,
        contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          this.customerList = res.result
        } else {
          this.$message.error(res.msg)
        }
        this.fullscreenLoading = false
      })
    },
    getJbList(index) {
      let obj = this.customerList[index]
      if (obj) {
        this.CustomerCompany = obj.company
        this.customerId = obj.id
        this.fullscreenLoading = true
        newRequest({
          url: '/redwood/buyfollow/Order/listForPayByBuyerId',
          data: {
            buyerId: obj.id
          },
          method: 'post',
          contentType: 'application/json'
        }).then(res => {
          if (res.success == 1) {
            if (res.cutList) {
              res.cutList.map(item => {
                item.huoNumber = item.productNumberList.length
                item.seNumber = 0
                item.productNumberList.map(color => {
                  item.seNumber += color.colors.length
                })
              })
            }
            obj.cutList = res.cutList
            this.customerList[index] = obj
          } else {
            this.$message.error(res.msg)
          }
          this.fullscreenLoading = false
        })
      }
    },
    confirmPay() {
      this.fullscreenLoading = true
      this.reqPayParams.customerId = this.customerId
      this.fileList.map(item => {
        this.reqPayParams.prepayCredentialUrl.push(item.response.imgUrl)
      })
      newRequest({
        url: '/redwood/reconciliation/pay',
        data: this.reqPayParams,
        contentType: 'application/json',
        method: 'post'
      }).then(res => {
        if (res.success == 1) {
          this.$message.success(res.msg)
          this.payDialogVisible = false
          this.getCustomerData()
        } else {
          this.$message.error(res.msg)
        }
        this.fullscreenLoading = false
      })
    },
    showPayDialog(item = {}) {
      this.fileList = []
      if (item.id) {
        this.payList = []
        this.reqPayParams.orderIdAndOutReposityIdList = []
        this.payList.push(item)
        this.reqPayParams.orderIdAndOutReposityIdList.push({
          orderId: item.id
        })
      }
      newRequest({
        url: '/redwood/account/CustomerAccount/getSummary',
        method: 'get',
        data: {
          id: this.customerId
        }
      }).then(res => {
        if (res.success == 1) {
          this.dialogData = res.obj
          this.$set(this.dialogData, 'totalPayMoney', 0)
          this.dialogData.totalPayMoney = 0
          this.dialogData.buyerCompany = this.CustomerCompany
          this.payList.map(item => {
            this.dialogData.totalPayMoney += Number(item.totalMoney)
          })
          this.payDialogVisible = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCancel() {
      this.payDialogVisible = false
    },
    handleSelectionChange(selection) {
      this.payList = []
      this.reqPayParams.orderIdAndOutReposityIdList = []
      selection.map(item => {
        this.payList.push(item)
        this.reqPayParams.orderIdAndOutReposityIdList.push({
          orderId: item.id
        })
      })
    },
    toAdjust() { // 去调整额度
      this.payDialogVisible = false
      window.open(`/finance/moneyManage/moneyManageDetail?id=${this.customerId}`)
    },
    handleBeforeupload(file) {
    },
    handleSuccess(response, file, fileList) {
      file.status = 'finished';
      this.fileList = fileList;
    },
    handleError(err, file, fileList) {
      this.$message({
        type: 'error',
        message: err,
        duration: 3000
      })
    },
    handleRemove(uid) {
      const index = this.fileList.findIndex(obj => {
        return obj.uid == uid;
      })
      // this.remark.splice(index, 1);
      this.fileList.splice(index, 1);
    },
    handlePreview(imgUrl) {
      this.previewVisible = true;
      this.previewSrc = 'http://test.soouya.com/' + imgUrl;
    },
    formatNumber(row, column) {
      let val = row[column.property]
      return (val === null || val < 0) ? '--' : (Number(val).toFixed(2))
    },
  },
}
</script>

<style lang="scss">
.search-content {
  background-color: #fff;
  padding: 15px;
  .el-row {
    .el-col {
      p {
        padding-left: 5px;
        color: #aaa;
      }
      .el-input {
        width: 250px;
      }
      .el-button {
        margin-left: 20px;
      }
    }
  }
}

.customerList-content {
  margin-top: 10px;
  background-color: #fff;
  padding: 15px;
  .el-collapse {
    .el-collapse-item {
      .credit-icon {
        background: url(../../../assets/credit.png) 0 0 no-repeat;
        display: inline-block;
        width: 20px;
        height: 20px;
        background-size: 100% 100%;
        vertical-align: middle;
      }
      .span-text {
        padding: 0 10px;
        border-right: 1px solid #000;
      }
      .el-table {
        margin-top: 15px;
      }
    }
  }
}

.el-popover {
  p {
    margin-right: 15px;
    span {
      margin-right: 15px;
      display: inline-block;
    }
  }
}

.file-item {
  margin-bottom: 10px;
  p {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 1.5;
    background-color: #fff;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-card {
    float: left;
    position: relative;
  }
  .image {
    max-width: 100%;
    max-height: 100%;
  }
  .mark {
    display: none;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);

    .bottom {
      line-height: 60px;
      text-align: center;
    }
    .el-icon-delete,
    .el-icon-view {
      font-size: 30px;
      color: #fff;
      vertical-align: middle;
    }
  }
  &:hover {
    .mark {
      display: block;
    }
  }
}

.el-upload-list__item-name {
  display: none;
}

.el-upload-list__item-status-label {
  display: none;
}
</style>
