<template>
  <div v-if="type==='textarea'">
    <el-row class="textarea-wrap">
      <el-input type="textarea" :rows="3" placeholder="请输入备注" v-model="value" @input="updateVal">
      </el-input>
      <p style="text-align:right" class="countWrap">{{value.length}}/{{maxLength}}</p>
    </el-row>
  </div>
  <div v-else>
    <el-row type="flex">
      <el-input v-model="value" @input="updateVal"></el-input>
      <span class="countWrap">{{value.length}}/{{maxLength}}</span>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['maxLength', 'model', 'type'],
  computed: {
    value: function () {
      return this.model
    }
  },
  methods: {
    updateVal(value) {
      this.$emit('update', value.trim())
    }
  }
}
</script>

<style scoped lang="scss">
.textarea-wrap {
  position: relative;
  .countWrap {
    right: 0;
    bottom: -30px;
    position: absolute;
  }
}

.countWrap {
  color: #f00;
  margin-left: 10px;
}
</style>
