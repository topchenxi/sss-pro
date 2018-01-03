<template>
  <section v-loading.fullscreen="fullscreenLoading">
    <i class="el-icon-arrow-left goback-icon" @click="$router.go(-1)">返回</i>
    <div class="msg-content">
      <span>处理状态：</span>
      <span style="color: #2fb468">
        <template v-if="pageData.status === 1">待处理</template>
        <template v-if="pageData.status === -1">已取消</template>
        <template v-if="pageData.status === 2">已完成</template>
      </span>
    </div>
    <div class="msg-content">
      <p style="font-weight:600; font-size: 16px">订单信息：</p>
      <el-form label-position="left" style="text-align:left">
        <el-form-item label="订单号：">{{outReposity.serviceNumber}}</el-form-item>
        <el-form-item label="采购商：">{{outReposity.customerCompany}}</el-form-item>
        <el-form-item label="供应商：">{{outReposity.shopCompany}}</el-form-item>
      </el-form>
    </div>
    <div class="msg-content">
      <p style="font-weight:600; font-size: 16px">货号信息：</p>
      <table border="1">
        <tr>
          <th>出仓单号</th>
          <th>货号</th>
          <th>色号</th>
          <th>销售单价</th>
          <th>成本单价</th>
          <th>发货数量</th>
          <th>出仓匹数</th>
        </tr>
        <tr v-for="(item,index) in outReposity.colorList" :key="index">
          <td v-if="index===0" :rowspan="outReposity.colorList.length">{{outReposity.outReposityNumber}}</td>
          <td v-if="index===0" :rowspan="outReposity.colorList.length">{{item.productNumber}}</td>
          <td>{{item.color}}</td>
          <td>{{item.salePrice | formateNumber}}{{item.salePriceUnit}}</td>
          <td>{{item.price | formateNumber}}{{item.priceUnit}}</td>
          <td>{{item.quantity | formateNumber}}{{item.quantityUnit}}</td>
          <td>{{item.outPi | formateNumber}}</td>
        </tr>
      </table>
    </div>
    <div class="msg-content">
      <p style="font-weight:600; font-size: 16px">扣数信息：</p>
      <table border="1">
        <tr>
          <th>扣数类型</th>
          <th>货号</th>
          <th>色号</th>
          <th>发货数量</th>
          <th>采购商扣数</th>
          <th>供应商扣数</th>
          <th>扣数销售单价</th>
          <th>扣数成本单价</th>
          <th>采购商扣数金额(元)</th>
          <th>供应商扣数金额(元)</th>
        </tr>
        <tr v-for="(item,index) in pageData.detailList" :key="index">
          <td v-if="index===0" :rowspan="pageData.detailList.length">{{pageData.type | typeFilter}}</td>
          <td v-if="index===0" :rowspan="pageData.detailList.length">{{item.productNumber}}</td>
          <td>{{item.color}}</td>
          <td>{{item.quantity | formateNumber}}{{item.quantityUnit}}</td>
          <td>{{item.buyerKouShu | formateNumber}}{{item.quantityUnit}}</td>
          <td>{{item.sellerKouShu | formateNumber}}{{item.quantityUnit}}</td>
          <td>{{item.salePrice | formateNumber}}{{item.salePriceUnit}}</td>
          <td>{{item.sellerKouShuPrice | formateNumber}}{{item.priceUnit}}</td>
          <td>
         <p v-if="item.kouShuMoney == 0">{{item.kouShuMoney | formateNumber}}</p>
         <p v-else><template v-if="!item.buyerFundDirection">-</template>{{item.kouShuMoney | formateNumber}}</p>
            </td>
          <td>
              <p v-if="item.tuiKuanMoney == 0">{{item.tuiKuanMoney | formateNumber}}</p>
              <p v-else><template v-if="!item.sellerFundDirection">-</template>{{item.tuiKuanMoney | formateNumber}}</p>
            </td>
        </tr>
      </table>
    </div>
    <div class="msg-content">
      <p style="font-weight:600; font-size: 16px">备注/凭证信息</p>
      <el-form label-position="left" style="text-align:left">
        <el-form-item label="财务备注：">{{pageData.caiWuRemark}}</el-form-item>
        <el-form-item label="跟单员扣数备注：">{{pageData.genDanRemark}}</el-form-item>
        <el-form-item label="采购员扣数备注:">{{pageData.guiderRemark}}</el-form-item>
        <el-form-item label="凭据图片:">
          <article class="media imgShow" v-if='pageData.imgUrls && pageData.imgUrls.length'>
            <a :href="'http://test.soouya.com'+ val" class="image media-left" v-lightbox="pageData.imgUrls" v-for="(val,index) in pageData.imgUrls" :key="index">
              <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
            </a>
          </article>
        </el-form-item>
      </el-form>
    </div>
    <Lightbox></Lightbox>
  </section>
</template>

<script>
import { newRequest } from 'common/utils'
import Lightbox from 'components/lightbox/lightbox'

export default {
  components: {
    Lightbox
  },
  data() {
    return {
      pageData: {},
      outReposity: {},
      canShow: false,
      fullscreenLoading: true,
    }
  },
  filters: {
    typeFilter(val) {
        switch (val) {
          case 1: return '损耗';
          case 2: return '运费';
          case 3: return '售后退换货';
          default: return '其他';
        }
      },
      formateNumber(val) {
        if (val != null) {
          return val.toFixed(2)
        }
      }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getoutReposity() {
      return newRequest({
        url: '/redwood/outRepoForButtonNumber/getById',
        method: 'get',
        data: { id: this.$route.query.outReposityId }
      }).then((res) => {
        if (res.success !== '1') {
          this.$message.error(res.msg)
        }
        return res;
      })
    },
    async getData() {
      let res = await this.getoutReposity()
      if (res.success !== '1') {
        return false
      }
      this.outReposity = res.obj
      this.fullscreenLoading = true
      newRequest({
        url: '/redwood/buttonNumber/getDetail',
        method: 'get',
        data: { id: this.$route.query.id }
      }).then((response) => {
        this.fullscreenLoading = false
        if (response.success == '1') {
          this.pageData = response.obj
        } else {
          this.$message.error(res.msg)
        }
        })
    }
  }
}
</script>

<style scoped lang="scss">
section {
  background-color: #f2f2f2;
  padding-bottom: 100px;
}

.msg-content {
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
  table {
    border: none;
    margin-top: 10px;
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    td {
      border-color: #bbb;
      padding: 10px;
    }
    th {
      border-color: #bbb;
      padding: 10px;
    }
  }
}
</style>
