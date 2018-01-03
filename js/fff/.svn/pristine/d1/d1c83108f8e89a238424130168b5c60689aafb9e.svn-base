<template>
  <el-dialog title="添加备注" v-model="config.isShow" size="tiny">
    <el-form :model="reportsForm" :rules="rules">
      <el-form-item prop="remark" class="nowrap">
        <limitInput :maxLength="500" :model="reportsForm.remark" type="textarea" v-on:update="updateRemark"></limitInput>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="close">取消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import limitInput from 'components/limitInput.vue'
import reportsApi from 'api/reports'

export default {
  components: {
    limitInput
  },
  props: ['config'],
  data() {
    const validateLength = (rule, value, callback) => {
      if (value.length > 500) {
        callback(new Error('备注不能超过500字'));
      } else {
        callback();
      }
    }
    return {
      reportsForm: {
        orderNumber: '',
        remark: '',
      },
      rules: {
        remark: [
          { validator: validateLength, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    config: {
      handler: function (val, oldVal) {
        if (val.orderNumber !== this.reportsForm.orderNumber) {
          this.reportsForm.orderNumber = val.orderNumber;
          this.reportsForm.remark = val.remark;
        }
      },
      deep: true,
    }
  },
  methods: {
    updateRemark(val) {
      this.reportsForm.remark = val;
    },
    submit() {
      const params = {
        orderNumber: this.config.orderNumber,
        remark: this.reportsForm.remark
      }
      reportsApi.setRemark(params).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.config.isShow = false;
          this.$emit('success', params)
        }
      });
    },
    close() {
      this.config.isShow = false;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
