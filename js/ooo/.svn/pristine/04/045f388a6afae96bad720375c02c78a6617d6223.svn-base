<template>
  <section>
    <div class="tab-content">
      <ul>
        <router-link to="findAll" tag="span">
          <li :class="activeName=='findAll' ? 'isActive' : ''">
            全部({{result[0] ? result[0] : '...'}})
          </li>
        </router-link>
        <router-link to="finding" tag="span">
          <li :class="activeName=='finding' ? 'isActive' : ''">
            找版中({{result[1] ? result[1] : '...'}})
          </li>
        </router-link>
        <router-link to="sending" tag="span">
          <li :class="activeName=='sending' ? 'isActive' : ''">
            快递中({{result[2] ? result[2] : '...'}})
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
      result: {
        0: '',
        1: '',
        2: ''
      },
    }
  },
  mounted() {
    this.getSumary()
  },
  methods: {
    getSumary() {
      request('/redwood/report/findColorCard/getSumary', {
        data: {},
        method: 'GET'
      }).then(res => {
        if (res.success == 1) {
          this.result[0] = res.result[0]
          this.result[1] = res.result[1]
          this.result[2] = res.result[2]
        }
      })
    }
  }
}
</script>
