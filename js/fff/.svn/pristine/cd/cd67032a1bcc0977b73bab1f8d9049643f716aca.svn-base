<template>
  <el-dialog title="异常" v-model="config.isShow" size="tiny">
    <!-- <p class="warn-msg">异常</p> -->
    <el-form class="" :model="exceptionForm" :rules="rules" style="margin-top: 15px">
      <p>异常：</p>
      <el-form-item prop="exceptionMsg" class="nowrap">
        <!-- <limitInput :maxLength="500" :model="exceptionForm.exceptionMsg" type="textarea" v-on:update="updateRemark"></limitInput> -->
        <el-input @input="updateRemark" type="textarea" v-model="exceptionForm.exceptionMsg" :autosize="{minRows:6,maxRows:6}" :maxlength="500" resize="none"></el-input>
        <p class="remark-font">{{exceptionForm.exceptionMsg.length}}/500</p>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close" size="small">取 消</el-button>
      <el-button type="primary" @click="submit" size="small">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import limitInput from 'components/limitInput.vue'
import deductionApi from 'api/deduction'

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
      exceptionForm: {
        id: '',
        exceptionMsg: '',
      },
      rules: {
        exceptionMsg: [
          { validator: validateLength, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    config: {
      handler: function(val, oldVal) {
        if (val.id !== this.exceptionForm.id) {
          this.exceptionForm.id = val.id
          this.exceptionForm.exceptionMsg = ''
        }
      },
      deep: true,
    }
  },
  methods: {
    updateRemark(val) {
      this.exceptionForm.exceptionMsg = val;
    },
    submit() {
      deductionApi.exceptionDeduction(this.exceptionForm).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.$message({
            message: '处理成功',
            type: 'success'
          });
          this.$emit('success');
          this.config.isShow = false
        }
      })
    },
    close() {
      this.config.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.reiburse-form {
  font-size: 16px;
  margin: 0 auto;
  width: 300px;
}

.important {
  color: #f00;
}

.nowrap {
  white-space: nowrap;
}
</style>
