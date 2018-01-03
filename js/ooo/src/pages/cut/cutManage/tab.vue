<template>
  <section>
    <div class="tab-content">
      <ul>
        <router-link to="cutAll" tag="span">
          <li :class="activeName=='cutAll' ? 'isActive' : ''">
            全部({{obj.all ? obj.all : '...'}})
          </li>
        </router-link>
        <router-link to="cuting" tag="span">
          <li :class="activeName=='cuting' ? 'isActive' : ''">
            剪版中({{obj.cuting ? obj.cuting : '...'}})
          </li>
        </router-link>
        <router-link to="cutSending" tag="span">
          <li :class="activeName=='cutSending' ? 'isActive' : ''">
            快递中({{obj.sending ? obj.sending : '...'}})
          </li>
        </router-link>
        <router-link to="cutChecking" tag="span">
          <li :class="activeName=='cutChecking' ? 'isActive' : ''">
            对账中({{obj.checking ? obj.checking : '...'}})
          </li>
        </router-link>
        <router-link to="cutReimburse" tag="span">
          <li :class="activeName=='cutReimburse' ? 'isActive' : ''">
            报销动态({{obj.reimburse ? obj.reimburse : '...'}})
          </li>
        </router-link>
        <router-link to="cutDebt" tag="span">
          <li :class="activeName=='cutDebt' ? 'isActive' : ''">
            采购商欠款动态({{obj.cancelDebt ? obj.cancelDebt : '...'}})
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
      request('/redwood/count/cut?_function=all', {
        data: {},
        method: 'GET',
      }).then(res => {
        if (res.success == 1) {
          this.obj = res.obj
          this.obj.all = (this.obj['500'] ? this.obj['500'] : 0) + (this.obj['501'] ? this.obj['501'] : 0) + (this.obj['502'] ? this.obj['502'] : 0) + (this.obj['503'] ? this.obj['503'] : 0) + (this.obj['520'] ? this.obj['520'] : 0) + (this.obj['521'] ? this.obj['521'] : 0) + (this.obj['522'] ? this.obj['522'] : 0) + (this.obj['523'] ? this.obj['523'] : 0) + (this.obj['530'] ? this.obj['530'] : 0) + (this.obj['200'] ? this.obj['200'] : 0) + (this.obj['201'] ? this.obj['201'] : 0) + (this.obj['202'] ? this.obj['202'] : 0) + (this.obj['220'] ? this.obj['220'] : 0) + (this.obj['221'] ? this.obj['221'] : 0) + (this.obj['222'] ? this.obj['222'] : 0) + (this.obj['223'] ? this.obj['223'] : 0) + (this.obj['230'] ? this.obj['230'] : 0)
          this.obj.checking = (this.obj['221'] ? this.obj['221'] : 0) + (this.obj['222'] ? this.obj['222'] : 0) + (this.obj['521'] ? this.obj['521'] : 0) + (this.obj['522'] ? this.obj['522'] : 0)
          this.obj.all = this.obj['all']
          this.obj.checking = (this.obj['221'] ? this.obj['221'] : 0) + (this.obj['222'] ? this.obj['222'] : 0) + (this.obj['521'] ? this.obj['521'] : 0) + (this.obj['522'] ? this.obj['522'] : 0)
          this.obj.cuting = (this.obj['200'] ? this.obj['200'] : 0) + (this.obj['201'] ? this.obj['201'] : 0) + (this.obj['202'] ? this.obj['202'] : 0) + (this.obj['500'] ? this.obj['500'] : 0) + (this.obj['501'] ? this.obj['501'] : 0) + (this.obj['502'] ? this.obj['502'] : 0)
          this.obj.sending = (this.obj['220'] ? this.obj['220'] : 0) + (this.obj['503'] ? this.obj['503'] : 0) + (this.obj['520'] ? this.obj['520'] : 0)
          this.obj.reimburse = (this.obj['toReimburse'] ? this.obj['toReimburse'] : 0) + (this.obj['reimbursed'] ? this.obj['reimbursed'] : 0)
          console.log(this.obj)
        }
      })
    }
  }
}
</script>
