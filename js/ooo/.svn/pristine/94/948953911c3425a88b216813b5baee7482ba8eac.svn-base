<template>
  <section>
    <div class="tab-content">
      <ul>
        <router-link to="bulkOrder" tag="span">
          <li :class="activeName=='bulkOrder' ? 'isActive' : ''">
            下单中({{obj.order ? obj.order : '...'}})
          </li>
        </router-link>
        <router-link to="bulkPaying" tag="span">
          <li :class="activeName=='bulkPaying' ? 'isActive' : ''">
            付款中({{obj.pay ? obj.pay : '...'}})
          </li>
        </router-link>
        <router-link to="bulkToSubmitPay" tag="span">
          <li :class="activeName=='bulkToSubmitPay' ? 'isActive' : ''">
            提交客户支付({{obj.toSubmitPay ? obj.toSubmitPay : '...'}})
          </li>
        </router-link>
        <router-link to="bulkToPay" tag="span">
          <li :class="activeName=='bulkToPay' ? 'isActive' : ''">
            等待客户支付({{obj.toPay ? obj.toPay : '...'}})
          </li>
        </router-link>
        <router-link to="bulkWaitCheck" tag="span">
          <li :class="activeName=='bulkWaitCheck' ? 'isActive' : ''">
            待对账({{obj.toDebt ? obj.toDebt : '...'}})
          </li>
        </router-link>
        <router-link to="bulkHadChecked" tag="span">
          <li :class="activeName=='bulkHadChecked' ? 'isActive' : ''">
            已对账({{obj.debted ? obj.debted : '...'}})
          </li>
        </router-link>
        <router-link to="bulkPicking" tag="span">
          <li :class="activeName=='bulkPicking' ? 'isActive' : ''">
            提货中({{obj.lading ? obj.lading : '...'}})
          </li>
        </router-link>
        <router-link to="bulkInspecting" tag="span">
          <li :class="activeName=='bulkInspecting' ? 'isActive' : ''">
            验货中({{obj.check ? obj.check : '...'}})
          </li>
        </router-link>
        <router-link to="bulkSending" tag="span">
          <li :class="activeName=='bulkSending' ? 'isActive' : ''">
            发货中({{obj.send ? obj.send : '...'}})
          </li>
        </router-link>
        <router-link to="bulkRRing" tag="span">
          <li :class="activeName=='bulkRRing' ? 'isActive' : ''">
            退换货中({{obj.returnReplace ? obj.returnReplace : '...'}})
          </li>
        </router-link>
        <router-link to="bulkRefund" tag="span">
          <li :class="activeName=='bulkRefund' ? 'isActive' : ''">
            供应商退款({{obj.refund ? obj.refund : '...'}})
          </li>
        </router-link>
        <router-link to="bulkAll" tag="span">
          <li :class="activeName=='bulkAll' ? 'isActive' : ''">
            全部订单({{obj.all ? obj.all : '...'}})
          </li>
        </router-link>
      </ul>
    </div>
  </section>
</template>
<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      activeName: this.$route.name,
      obj: {},
    }
  },
  mounted() {
    console.log(this.activeName)
    this.getSunmary()
  },
  methods: {
    getSunmary() {
      request('/redwood/count/bulk', {
        data: {},
        method: 'GET',
      }).then(res => {
        if (res.success == 1) {
          this.obj = res.obj
        }
      })
    }
  }
}
</script>
