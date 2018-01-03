<template>
  <section>
    <ul class="allDetail-tab">
      <li @click="changeTab('客户支付信息')" :class="activeName == '客户支付信息' ? 'isActive' : ''">客户支付信息</li>
      <li @click="changeTab('出仓信息')" :class="activeName == '出仓信息' ? 'isActive' : ''">出仓信息</li>
      <li @click="changeTab('对账信息')" :class="activeName == '对账信息' ? 'isActive' : ''">对账信息</li>
    </ul>
    <div v-if="activeName=='客户支付信息'" class="shareClass pay-msg">
      <div v-if="!outData1.length" style="height: 250px; text-align: center; line-height: 250px;">
        <span>暂无数据</span>
      </div>
      <div v-if="outData1.length" v-for="(outItem, outIndex) in outData1">
        <p class="bold-text">出仓单：{{outItem.number}}</p>
        <p v-if="outItem.customerPayStatus == 0" class="bg-wait">
          <i class='el-icon-information color2f'></i>
          <span class="color2f ml15">待支付</span>
          <span class="ml15">提交支付时间：{{outItem.createTime | date}}</span>
        </p>
        <p v-if="outItem.customerPayStatus == 1 || outItem.creditType == 3" class="bg-had">
          <i class='el-icon-information color4a'></i>
          <span class="color4a ml15">已支付</span>
          <span class="ml15">支付时间：{{outItem.payTime | date}}</span>
        </p>
        <p v-if="outItem.customerPayStatus == 2" class="bg-fail">
          <i class='el-icon-information colore6'></i>
          <span class="colore6 ml15">支付失败</span>
          <span class="ml15">提交支付时间：{{outItem.createTime | date}}</span>
        </p>
        <p style="margin-top: 10px;">
          <el-row :gutter="10">
            <el-col :span="6">
              <span class="bold-text">支付金额：￥{{outItem.totalMoney | formatNumber}}</span>
              <span class="color59"> (货款：￥{{outItem.saleMoney | formatNumber}} 运费：￥{{outItem.freightMoney | formatNumber}})</span>
            </el-col>
            <el-col :span="6">
              <span>
                <span class="bold-text">支付方式：</span>
              <span v-if="outItem.creditType == 1">垫付支付</span>
              <span v-if="outItem.creditType == 2">白条支付</span>
              <span v-if="outItem.creditType == 3">余额支付</span>
              <span v-if="outItem.creditType == 4">信贷支付</span>
              </span>
            </el-col>
            <el-col :span="6">
              <span class="bold-text">回款日期：</span>
              <span v-if="outItem.returnDate">{{outItem.returnDate | date('yyyy-MM-dd')}}</span>
              <span v-else>--</span>
            </el-col>
          </el-row>
        </p>
        <div class="bb1se9"></div>
        <el-row>
          <el-col v-if="outItem.payCredentialUrls && outItem.payCredentialUrls.length || outItem.prepayCredentialUrls && outItem.prepayCredentialUrls.length" :span="6" class="show-image" style="margin-top: 20px; min-width:320px;">
            <el-col class="card" v-if="outItem.payCredentialUrls && outItem.payCredentialUrls.length" :href="urlitem" :data="outIndex+'payCredentialUrls'" v-lightbox="urlitem.payCredentialUrls" v-for="(urlitem, urlindex) in outItem.payCredentialUrls" v-show="urlindex == 0">
              <div class="length-text">
                <p>客户付款凭据({{outItem.payCredentialUrls.length}}张)</p>
              </div>
              <el-card :body-style="{ padding: '5px' }">
                <img :src="urlitem" class="image">
              </el-card>
            </el-col>
            <el-col class="card" v-if="outItem.prepayCredentialUrls && outItem.prepayCredentialUrls.length" :href="urlitem" :data="outIndex+'prepayCredentialUrls'" v-lightbox="urlitem.prepayCredentialUrls" v-for="(urlitem, urlindex) in outItem.prepayCredentialUrls" v-show="urlindex == 0">
              <div class="length-text">
                <p>垫付凭据({{outItem.prepayCredentialUrls.length}}张)</p>
              </div>
              <el-card :body-style="{ padding: '5px' }">
                <img :src="urlitem" class="image">
              </el-card>
            </el-col>
          </el-col>
          <el-col :span="16">
            <p style="margin-top:25px;">出仓备注：{{outItem.remark}}</p>
            <p style="margin-top:25px;">结算备注：{{outItem.payRemark}}</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-if="activeName=='出仓信息'" class="shareClass pay-msg">
      <div v-if="!outData2.length" style="height:250px;text-align:center" class="empty"></div>
      <div v-if="outData2.length">
        <el-table :data="outData2" border>
          <el-table-column type="expand">
            <template scope="scope">
              <table border="1">
                <tr>
                  <th>色号/匹号</th>
                  <th>入仓实数</th>
                  <th>实际布长</th>
                  <th>销售单价</th>
                </tr>
                <template v-for="cloth in scope.row.clothLones">
                  <tr>
                    <td>{{cloth.color}}/{{cloth.number}}</td>
                    <td>{{cloth.quantity | formatNumber}}{{cloth.quantityUnit}}</td>
                    <td>
                      <template v-if="scope.row.bulk.checkCloth">
                        {{cloth.clothCheckReport.buchang | formatNumber}}{{cloth.clothCheckReport.buchangUnit}}
                      </template>
                      <template v-else>
                        {{cloth.quantity | formatNumber}}{{cloth.quantityUnit}}
                      </template>
                    </td>
                    <td>{{cloth.salePrice | formatNumber}}{{cloth.salePriceUnit}}</td>
                  </tr>
                </template>
              </table>
              <p>
                <span class="bold-text">出仓备注：</span>{{scope.row.remark}}</p>
            </template>
          </el-table-column>
          <el-table-column label="出仓时间" align="left" width="200">
            <template scope="scope">
              <span>{{scope.row.outTime | formatTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="出仓单号" prop="number" align="left" width="170"></el-table-column>
          <el-table-column label="出仓地点" align="left" prop="repoName"></el-table-column>
          <el-table-column label="收货人" align="left" width="300">
            <template scope="scope">
              <p class="ta-l">{{scope.row.addressName || '--' }}/{{scope.row.addressTel || '--' }}</p>
              <p class="ta-l">{{scope.row.addressProvince}}{{scope.row.addressCity}}{{scope.row.addressArea}}{{scope.row.addressAddr}}</p>
            </template>
          </el-table-column>
          <el-table-column label="承运物流" align="left">
            <template scope="scope">
              <span>{{scope.row.bulk.defaultSendCompany || '--' }}/{{scope.row.bulk.defaultSendTel || '--' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="物流凭据" align="center">
            <template scope="scope">
              <div :span="6" class="show-image-small" style="margin-top: 20px; min-width:320px;">
                <el-col class="card" v-if="scope.row.sendCertificateUrls && scope.row.sendCertificateUrls.length" :href="urlitem" :data="scope.row.number" v-lightbox="urlitem.sendCertificateUrls" v-for="(urlitem, urlindex) in scope.row.sendCertificateUrls" v-show="urlindex == 0">
                  <el-card :body-style="{ padding: '5px' }">
                    <img :src="urlitem" class="image">
                  </el-card>
                </el-col>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="activeName=='对账信息'" class="shareClass check-msg">
      <div v-if="!outData3.length" style="height: 250px; text-align: center; line-height: 250px;">
        <span>暂无数据</span>
      </div>
      <div v-if="outData3.length">
        <div v-for="(outItem,outIndex) in outData3">
          <p>
            <span class="bold-text">出仓单：{{outItem.number}}</span>
            <span>
              <span class="bold-text ml25">对账单号：</span>{{outItem.billNumber}}
            </span>
          </p>
          <p v-if="outItem.reconciliationStatus ==0" class="bg-wait">
            <i class='el-icon-information color2f'></i>
            <span class="color2f ml15">待对账</span>
            <span class="ml15">进入对账时间：{{outItem.reconciliationTime | formatTime}}</span>
          </p>
          <p v-if="outItem.reconciliationStatus ==1" class="bg-had">
            <i class='el-icon-information color4a'></i>
            <span class="color4a ml15">已对账</span>
            <span class="ml15">对账时间：{{outItem.reconciliationTime | formatTime}}</span>
          </p>
          <el-row :gutter="10" class="mt10">
            <el-col :span="3">
              <p class="label">出仓销售货款</p>
              <p class="money-label">￥{{outItem.saleMoney | formatNumber}}</p>
            </el-col>
            <el-col :span="3">
              <p class="label">应收出仓销售货款</p>
              <p class="money-label">￥{{outItem.needSaleMoney | formatNumber}}</p>
            </el-col>
            <el-col :span="3">
              <p class="label">应收滞纳金</p>
              <p class="money-label">￥{{outItem.estimateLateFeesMoney | formatNumber}}</p>
            </el-col>
            <el-col :span="3">
              <p class="label">运费</p>
              <p class="money-label">￥{{outItem.freightMoney | formatNumber}}</p>
            </el-col>
            <el-col :span="3" class="br1se9">
              <p class="label">采购商税款</p>
              <p class="money-label">￥{{outItem.bulk.taxMoney | formatNumber}}</p>
            </el-col>
            <el-col :span="3" v-if="outItem.reconciliationStatus ==0">
              <p class="label">应收款</p>
              <p class="money-redLabel">￥{{outItem.needSaleMoney + outItem.estimateLateFeesMoney + outItem.freightMoney | formatNumber}}</p>
            </el-col>
            <el-col :span="3" v-if="outItem.reconciliationStatus ==1">
              <p class="label">实收滞纳金</p>
              <p class="money-redLabel">￥{{outItem.lateFeesMoney | formatNumber}}</p>
            </el-col>
            <el-col :span="3" v-if="outItem.reconciliationStatus ==1">
              <p class="label">实收款</p>
              <p class="money-redLabel">￥{{outItem.realSaleMoney | formatNumber}}</p>
            </el-col>
          </el-row>
          <div class="bb1se9"></div>
          <el-row>
            <el-col v-if="outItem.payCredentialUrls && outItem.payCredentialUrls.length" :span="4" class="show-image" style="margin-top: 20px; min-width:150px;">
              <el-col class="card" v-if="outItem.payCredentialUrls && outItem.payCredentialUrls.length" :href="urlitem" :data="'payCredentialUrls'+outIndex" v-lightbox="urlitem.payCredentialUrls" v-for="(urlitem, urlindex) in outItem.payCredentialUrls" v-show="urlindex == 0">
                <div class="length-text">
                  <p>客户付款凭据({{outItem.payCredentialUrls.length}}张)</p>
                </div>
                <el-card :body-style="{ padding: '5px' }">
                  <img :src="urlitem" class="image">
                </el-card>
              </el-col>
            </el-col>
            <el-col :span="16">
              <p style="margin-top:25px;">结算备注：{{outItem.payRemark}}</p>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <Lightbox></Lightbox>
  </section>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import {
  newRequest,
  setCache,
  getCache,
} from 'utils/tool'
export default {
  name: 'pay_out_check_msg',
  props: ['id'],
  components: {
    Lightbox,
  },
  data() {
    return {
      activeName: '客户支付信息',
      outData: [],
      outData1: [],
      outData2: [],
      outData3: [],
    }
  },
  watch: {
    id() {
      this.getData()
    }
  },
  mounted() {
    let tab = getCache({
      key: 'payOutCheckMsgTab',
    })
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    getData() {
      newRequest({
        url: '/redwood/repo/out',
        method: 'get',
        data: {
          orderNumber: this.id,
          _function: 'detail'
        }
      }).then(res => {
        if (res.success == 1) {
          res.page.result.forEach(item => {
            for (let i = 0; i < item.payCredentialUrls.length; i++) {
              item.payCredentialUrls[i] = `http://www.soouya.com${item.payCredentialUrls[i]}`
            }
            for (let i = 0; i < item.prepayCredentialUrls.length; i++) {
              item.prepayCredentialUrls[i] = `http://www.soouya.com${item.prepayCredentialUrls[i]}`
            }
            for (let i = 0; i < item.sendCertificateUrls.length; i++) {
              item.sendCertificateUrls[i] = `http://www.soouya.com${item.sendCertificateUrls[i]}`
            }
          })
          this.outData = res.page.result
          this.outData.forEach(item => {
            if (item.creditType >= 1) {
              this.outData1.push(item)
            }
            if (item.status > 0) {
              this.outData2.push(item)
            }
            if (item.reconciliationStatus >= 0) {
              this.outData3.push(item)
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeTab(tab) {
      this.activeName = tab
      setCache({
        key: 'payOutCheckMsgTab',
        value: this.activeName
      })
    },
  },
  filters: {
    formatNumber(val) {
      if (Number(val) < 0 || val == null) {
        return '--'
      } else {
        return Number(val).toFixed(2)
      }
    }
  }
}

</script>
<style>


</style>
