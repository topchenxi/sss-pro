<template>
  <section class="sy-page-wrap">
    <template v-if="details">
      <dl class="sy-info-item">
        <dt>
          <div>采购商供应商信息</div>
        </dt>
        <dd>
          <div>订单号：</div>
          <div>{{details.number}}</div>
        </dd>
        <dd>
          <div>订单时间：</div>
          <div>{{details.createTime | formatTime}}</div>
        </dd>
        <dd>
          <div>采购商：</div>
          <div>{{details.customerCompany}} {{details.customerTel}}</div>
        </dd>
        <dd>
          <div>收货地址：</div>
          <div>{{details.addressName}} {{details.addressTel}} {{details.addressProvince}}{{details.addressCity}}{{details.addressArea}}{{details.addressAddr}}</div>
        </dd>
        <dd>
          <div>供应商：</div>
          <div>{{details.shopCompany}} {{details.shopTel}} {{details.shopProvince}}{{details.shopCity}}{{details.shopArea}}{{details.shopAddr}}</div>
        </dd>
      </dl>
      <dl class="sy-info-item" v-for="(product,productIdx) in details.productNumbers">
        <dt>
          <div>货号{{productIdx+1}}</div>
        </dt>
        <dd>
          <div>图片：</div>
          <div>
            <a :href="imgPath + item" :key="item" v-lightbox="product.imgUrls" v-for="(item, index) in product.imgUrls" class="madan-wrap">
              <img :src="imgPath + item" width='40' height="40" />
            </a>
            <!-- <lightBox :value="product.imgUrls"></lightBox> -->
          </div>
        </dd>
        <dd>
          <div>品类：</div>
          <div>{{product.category === 1 ? '面料' : '辅料'}}</div>
        </dd>
        <dd>
          <div>服务费单价：</div>
          <div>{{product.price}}{{product.priceUnit}}</div>
        </dd>
        <dd>
          <div>货物信息：</div>
          <div>
            <el-table :data="product.colors">
              <el-table-column :label="product.category === 1 ? '货号' : '品名'" align="center">
                <template scope="scope">
                  {{product.number}}
                </template>
              </el-table-column>
              <el-table-column prop="color" :label="product.category === 1 ? '色号' : '颜色'" align="center">
              </el-table-column>
              <el-table-column label="单价" align="center" width="100">
                <template scope="scope">
                  {{scope.row.followerPriceMoney}}{{scope.row.followerPriceUnit}}
                </template>
              </el-table-column>
              <el-table-column label="成本单价" v-if="details.status >= 201 && details.status != 230" align="center" width="100">
                <template scope="scope">
                  {{scope.row.cutterPriceMoney}}{{scope.row.cutterPriceUnit}}
                </template>
              </el-table-column>
              <el-table-column label="数量" align="center" width="100">
                <template scope="scope">
                  {{scope.row.followerQuantity}}{{scope.row.followerQuantityUnit}}
                </template>
              </el-table-column>
              <el-table-column label="采购数量" v-if="details.status >= 201 && details.status != 230" align="center" width="100">
                <template scope="scope">
                  {{scope.row.cutterQuantity}}{{scope.row.cutterQuantityUnit}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </dd>
      </dl>
      <dl class="sy-info-item">
        <dt>
          <div>费用信息</div>
        </dt>
        <template v-if="details.status == 200 || details.status == 230">
          <dd>
            <div>采购商是否需要发票：</div>
            <div>{{details.needInvoice == 1 ? '需要' : '不需要'}}</div>
          </dd>
          <dd v-if="details.needInvoice == 1">
            <div>采购商税率：</div>
            <div>{{details.taxPoint}}%</div>
          </dd>
          <dd>
            <div>费用明细：</div>
            <div>
              <table class="sy-money-table">
                <tr>
                  <th>预估成本货款</th>
                  <th>服务费</th>
                  <th>税费</th>
                  <th>总费用</th>
                </tr>
                <tr>
                  <td>
                    <template v-if="details.estimatedCostMoney !== null">
                      {{details.estimatedCostMoney | formatNumber}}元
                    </template>
                    <template v-else>
                      --
                    </template>
                  </td>
                  <td>
                    <template v-if="details.serviceMoney !== null">
                      {{details.serviceMoney | formatNumber}}元
                    </template>
                    <template v-else>
                      --
                    </template>
                  </td>
                  <td>
                    <template v-if="details.taxMoney !== null">
                      <strong>{{details.taxMoney | formatNumber}}</strong>元
                    </template>
                    <template v-else>
                      --
                    </template>
                  </td>
                  <td>
                    <template v-if="details.totalMoney !== null">
                      <strong>{{details.totalMoney | formatNumber}}</strong>元
                    </template>
                    <template v-else>
                      --
                    </template>
                  </td>
                </tr>
              </table>
            </div>
          </dd>
        </template>
        <template v-if="details.status != 200 && details.status != 230">
          <dd>
            <div>成本货款：</div>
            <div>{{details.costMoney}}元</div>
          </dd>
          <dd>
            <div>码单：</div>
            <div>
              <a :href="imgPath + item" :key="item" v-lightbox="details.madanUrls" v-for="(item, index) in details.madanUrls" class="madan-wrap">
                <img :src="imgPath + item" width='40' height="40" />
              </a>
              <!-- <lightBox :value="details.madanUrls"></lightBox> -->
            </div>
          </dd>
          <dd>
            <div>剪版员留言：</div>
            <div>{{details.cutterRemark}}</div>
          </dd>
          <dd>
            <div>跟单员留言：</div>
            <div>{{details.followerRemark}}</div>
          </dd>
        </template>
      </dl>
      <dl class="sy-info-item">
        <dt>
          <div>物流信息</div>
        </dt>
        <dd>
          <div>发货凭据：</div>
          <div>
            <a :href="imgPath + item" :key="item" v-lightbox="details.sendCredentialUrls" v-for="(item, index) in details.sendCredentialUrls" class="madan-wrap">
                <img :src="imgPath + item" width='40' height="40" />
              </a>
            <!-- <lightBox :value="details.sendCredentialUrls"></lightBox> -->
          </div>
        </dd>
      </dl>
      <div class="sy-handle-wrap">
        <el-button @click="goBack">返回</el-button>
      </div>
    </template>
    <lightbox />
  </section>
</template>
<script>
import getCut from '@/api/cut/getCut'
import Lightbox from '@/components/light-box/lightbox'
import mixinFilters from '@/mixin/filters'
import mixinMethods from '@/mixin/methods'
export default {
  name: 'cutOrderDetails',
  data() {
    return {
      details: null,
      imgPath: 'http://www.soouya.com'
    }
  },
  components: {
    Lightbox
  },
  activated() {
    this.getOrderDetails()
  },
  mixins: [mixinFilters, mixinMethods],
  methods: {
    getOrderDetails() {
      const id = this.$route.query.id
      getCut(id).then((response) => {
        if (response.success === '1') {
          this.details = response.obj
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.sy-money-table {
  font-size: 14px;
  border-collapse: collapse;
  border: 1px solid #dfe6ec;
  text-align: center;
  th {
    padding: 15px 20px;
    background: #eef1f6;
  }
  td {
    padding: 15px 20px;
  }
}

.sy-info-item {
  margin-bottom: 20px;
  dt {
    height: 40px;
    border-top: 1px solid #ccc;
    div {
      display: block;
      width: 200px;
      background: #20a0ff;
      text-align: center;
      color: #fff;
      height: 100%;
      line-height: 40px;
    }
  }
  dd {
    display: flex;
    margin-top: 15px;
    >div {
      &:first-child {
        flex: 0 0 160px;
        text-align: right;
      }
    }
    li {
      display: flex;
      white-space: nowrap;
      margin-bottom: 5px;
      div {
        &:first-child {
          text-align: right;
          flex: 0 0 130px;
          margin-right: 10px;
        }
      }
    }
    strong {
      color: #f00;
    }
  }
}

.sy-handle-wrap {
  text-align: center;
  margin: 20px 0;
}
.madan-wrap {
  img{
    margin-right: 5px;
  }
}
</style>
