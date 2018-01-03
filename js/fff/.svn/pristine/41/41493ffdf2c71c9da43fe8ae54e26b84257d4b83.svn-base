<template>
  <el-form :inline="true" label-width="115px">
    <el-form-item :label="form.label" v-for="(form,formIdx) in config" :key="form.key">
      <template v-if="form.type === 'input'">
        <p style="font-size:12px;color:#aaa;line-height:15px;">{{form.placeholder}}</p>
        <el-input @keyup.enter.native="search" v-model="scope.requestParams[form.key]" :placeholder="form.placeholder" style="width:280px"></el-input>
      </template>
      <template v-else-if="form.type === 'select'">
        <p style="font-size:12px;color:#aaa;line-height:15px;">{{form.placeholder}}</p>
        <el-select v-model="scope.requestParams[form.key]" :placeholder="form.placeholder" style="width:230px;" @change="showSelect">
          <el-option v-for="item in form.selectOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template v-else-if="form.type === 'datePicker'">
        <p style="font-size:12px;color:#aaa;line-height:15px;">{{form.placeholder}}</p>
        <el-date-picker v-model="scope.requestParams[form.key]" type="daterange" :placeholder="form.placeholder"  style="width:230px;">
        </el-date-picker>
      </template>
    </el-form-item>
    <slot name="manipulate" :scope="scope"></slot>
  </el-form>
</template>
<script>
export default {
  name: 'FormFilter',
  props: ['config'],
  data() {
    let requestParams = {};
    this.config.forEach((item) => {
      console.log(item)
      requestParams[item.key] = ''
    });
    return {
      scope: {
        requestParams
      }
    };
  },
  methods: {
    search() {
      console.log(this.scope.requestParams)
      this.$emit('search', this.scope.requestParams)
    },
    showSelect(status) {
      this.$emit('select', status)
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form{
  background-color: #fff;
  margin-bottom: 10px;
}
.el-form-item {
  // margin-bottom: 10px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
  padding: 10px 15px;
}
</style>

