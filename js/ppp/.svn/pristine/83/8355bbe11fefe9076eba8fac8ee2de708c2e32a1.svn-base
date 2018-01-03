<template>
  <div id="order" class="h100">
    <div class="main-container">
      <c-menu></c-menu>
      <div class="main-content">
        <div class="crumbs-warp">
          <router-link tag="div" class="oms-back" to='/orderMgr'>
            < 返回 </router-link>
              订单中心
              <span>></span> 订单详情
              <span>></span> 订单号：{{info.number}}
        </div>
        <div class="statu-warp">
          {{info.statusDescr}}
        </div>
        <div class="info-warp">
          <ul>
            <li>
              <div class="detail-title">
                <span>客户信息</span>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td>客户名称：</td>
                    <td>{{info.customerCompany}}</td>
                  </tr>
                  <tr>
                    <td>联系人：</td>
                    <td>{{info.customerName}}</td>
                  </tr>
                  <tr>
                    <td>电话：</td>
                    <td>{{info.customerTel}}</td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li>
              <div class="detail-title">
                <span>收货人</span>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td>姓名：</td>
                    <td>{{info.addressName}}</td>
                  </tr>
                  <tr>
                    <td>电话：</td>
                    <td>{{info.addressTel}}</td>
                  </tr>
                  <tr>
                    <td>地址：</td>
                    <td>{{info.addressProvince}}{{info.addressCity}}{{info.addressArea}}{{info.addressAddr}}</td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>
        <div class="detail-warp">
          <div class="detail-title">
            <span>商品信息</span>
          </div>
          <div class="product-warp">
            <span>货号： {{info.productNumber}}</span>
            <router-link tag='button' class="btn" :to="'/orderOmPrint/'+info.id">
              打印码单
            </router-link>
          </div>
          <div class="table">
            <table>
              <colgroup>
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
              </colgroup>
              <thead>
                <tr>
                  <th>色号</th>
                  <th>数量</th>
                  <th>单价</th>
                  <th>合计(元)</th>
                  <th>细码数</th>
                </tr>
              </thead>
              <tbody v-if="info.colors&&info.colors.length">
                <tr v-for="item in info.colors" :key='item.color'>
                  <td>{{item.color}}</td>
                  <td>{{item.quantity}}{{info.unit}}</td>
                  <td>{{item.price | formatNumber}}元/{{info.unit}}</td>
                  <td>{{item.money?item.money:0 | formatNumber}}</td>
                  <td>
                    <span v-if="sizeItem" class="item" v-for='sizeItem in item.ximashus' :key='sizeItem.index'>{{sizeItem}}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="total-warp">
            总计：<span>{{info.totalMoney | formatNumber}}</span> 元
          </div>
        </div>
        <div class="remark-warp">
          <div class="detail-title">
            <span>备注</span>
          </div>
          <div class="remark-detail">
            {{info.remark}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import menu from 'components/oms-menu';
import service from '@/utils/omsServices'
export default {
  name: 'order',
  data() {
    return {
      'id': this.$route.params.id,
      info: {}
    }
  },
  components: {
    'c-menu': menu
  },
  methods: {
    getDetail() {
      service.getOrderDetail(this.id).then(res => {
        if (res.success !== '1') {
          this.$Message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        } else {
          this.info = res.obj;
          this.info.colors.forEach(item => {
            item.money = item.money == -1 ? parseFloat(item.price || 0) * parseFloat(item.quantity || 0) : item.money;
          })
        }
      })
    }
  },
  mounted() {
    this.getDetail();
  }
}

</script>
<style lang="scss" scoped>
@import "../../../common/scss/oms-base.scss";
.icon-order {
  background: url('images/orders-active@1x.png') 0 0 no-repeat;
}

.icon-customer {
  background: url('images/customer@1x.png') 0 0 no-repeat;
}

</style>
