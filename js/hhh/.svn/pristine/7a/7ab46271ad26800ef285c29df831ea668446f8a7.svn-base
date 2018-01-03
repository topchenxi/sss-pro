<template>
  <div class="hs-oms">
    <ul>
      <li @click="to('pickerOrderList')" :class="{'current' : currentRuoteName == 'pickerOrderList'}">
        <strong>全部</strong>
      </li>
      <li @click="to('pickerOfWaitToCollect')" :class="{'current' : currentRuoteName == 'pickerOfWaitToCollect'}">
        <div class="item">
          <p>{{count[0]}}</p>
          <p>待收版</p>
        </div>
      </li>
      <li @click="to('pickerOfWaitToSend')" :class="{'current' : currentRuoteName == 'pickerOfWaitToSend'}">
        <div class="item">
          <p>{{count[1]}}</p>
          <p>待发货</p>
        </div>
      </li>
      <li @click="to('pickerOfHadSended')" :class="{'current' : currentRuoteName == 'pickerOfHadSended'}">
        <div class="item">
          <p>{{count[2]}}</p>
          <p>已发货</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    count: {
      'type': Array,
      'default': () => [0, 0, 0],
      'required': false
    }
  },
  data() {
    return {
      currentRuoteName: this.$route.name
    };
  },
  mounted() {},
  methods: {
    to(name) {
      this.$router.push({ 'name': name });
    }
  }
}

</script>
