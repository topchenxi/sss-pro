<template>
  <section class="allDetail">
    <div class="detail-title">
      <!-- <span @click="$router.go(-1)"></span> -->
      <p class="bold-text">详情</p>
    </div>
    <div class="msg-content">
      <OrderProductMsg :config="bulkObj"></OrderProductMsg>
    </div>
    <div class="msg-content">
      <QuotePendingMsg :config="bulkObj"></QuotePendingMsg>
    </div>
    <div class="msg-content">
      <CheckCloth :id="bulkObj.id"></CheckCloth>
    </div>
    <div class="msg-content">
      <PayOutCheckMsg :id="bulkObj.id"></PayOutCheckMsg>
    </div>
    <div class="msg-content">
      <RrKoushuMsg :id="bulkObj.id"></RrKoushuMsg>
    </div>
  </section>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import OrderProductMsg from 'components/bulkDetail/order_product_msg.vue'
import CheckCloth from 'components/bulkDetail/checkCloth.vue'
import QuotePendingMsg from 'components/bulkDetail/quote_pending_msg.vue'
import PayOutCheckMsg from 'components/bulkDetail/pay_out_check_msg.vue'
import RrKoushuMsg from 'components/bulkDetail/rr_koushu_msg.vue'
import {
  newRequest,
}
from 'utils/tool';
export default {
  components: {
    Lightbox,
    OrderProductMsg,
    CheckCloth,
    QuotePendingMsg,
    PayOutCheckMsg,
    RrKoushuMsg,
  },
  data() {
    return {
      id: '',
      bulkObj: {},
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path != '/') {
      sessionStorage.removeItem('orderProductMsgTab')
      sessionStorage.removeItem('quotePendingMsgTab')
      sessionStorage.removeItem('payOutCheckMsgTab')
      sessionStorage.removeItem('rrKoushuMsgTab')
    }
    next()
  },
  mounted() {
    this.$store.dispatch('changeload', false)
    this.id = this.$route.query.id
    if (this.id) {
      this.getData()
    } else {
      this.$message.error('id不能为空')
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('changeload', true)
      newRequest({
        url: `/redwood/bulk/${this.id}`,
        method: 'get',
        data: {}
      }).then(res => {
        this.$store.dispatch('changeload', false)
        if (res.success == 1) {
          for (let i = 0; i < res.obj.clothShopOriginalImgUrls.length; i++) {
            res.obj.clothShopOriginalImgUrls[i] = `http://www.soouya.com${res.obj.clothShopOriginalImgUrls[i]}`
          }
          for (let i = 0; i < res.obj.clothShopOriginalColorUrls.length; i++) {
            res.obj.clothShopOriginalColorUrls[i] = `http://www.soouya.com${res.obj.clothShopOriginalColorUrls[i]}`
          }
          // res.obj.sellerMadanUrls.push('/upload/redwood/madan/6fb4ba87-2483-49cf-b210-9b483b521851.png')
          for (let i = 0; i < res.obj.sellerMadanUrls.length; i++) {
            res.obj.sellerMadanUrls[i] = `http://www.soouya.com${res.obj.sellerMadanUrls[i]}`
          }
          for (let i = 0; i < res.obj.customerPayCredentialUrls.length; i++) {
            res.obj.customerPayCredentialUrls[i] = `http://www.soouya.com${res.obj.customerPayCredentialUrls[i]}`
          }
          for (let i = 0; i < res.obj.madanUrls.length; i++) {
            res.obj.madanUrls[i] = `http://www.soouya.com${res.obj.madanUrls[i]}`
          }
          for (let i = 0; i < res.obj.sendCredentialUrls.length; i++) {
            res.obj.sendCredentialUrls[i] = `http://www.soouya.com${res.obj.sendCredentialUrls[i]}`
          }
          this.bulkObj = res.obj
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}

</script>
<style>


</style>
