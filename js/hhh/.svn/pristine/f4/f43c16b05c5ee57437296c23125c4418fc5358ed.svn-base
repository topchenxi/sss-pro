<template>
  <div class="hs-oms">
    <ul>
      <li @click="to('productCardList')" :class="{'current' : currentRuoteName == 'productCardList'}">
        <strong>换卡头</strong>
      </li>
      <li @click="to('productSoouyaList')" :class="{'current' : currentRuoteName == 'productSoouyaList'}">
        <div class="item">
          <strong>自营</strong>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
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
