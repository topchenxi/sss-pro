<template>
  <el-dialog title="提示" v-model="config.isShow" size="tiny">
    <el-row>
      <!-- <i class="el-icon-information important"></i> -->
      <!-- <p class="warn-msg">异常</p> -->
    </el-row>
    <el-row></el-row>
    <el-row style="margin-top:20px;">
      <el-col style="margin-top:8px;text-align:left">
        <p style="margin-bottom:8px;">异常：</p>
        <el-input type="textarea" :autosize="{minRows: 6, maxRows: 6}" resize="none" v-model="exceptionForm.exception" @input="updateRemark"></el-input>
        <!-- <limitInput :maxLength="500" :model="exceptionForm.exception" v-on:update="updateRemark"></limitInput> -->
      </el-col>
      <p v-if="exceptionForm.exception" class="remark-font">{{exceptionForm.exception.length}}/500</p>
      <p v-else class="remark-font">0/500</p>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import limitInput from 'components/limitInput.vue'
import exchangeApi from 'api/exchange'

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
        exception: '',
      },
      rules: {
        exception: [
          { validator: validateLength, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    config: {
      handler: function(val, oldVal) {
        if (val.id !== this.exceptionForm.id) {
          console.log(val)
          this.exceptionForm.id = val.id
          this.exceptionForm.exception = ''
        }
      },
      deep: true,
    }
  },
  methods: {
    updateRemark(val) {
      this.exceptionForm.exception = val;
    },
    submit() {
      if (this.exceptionForm.exception.length > 500) {
        this.$message({
          message: '备注不能超过500个字符',
          type: 'error'
        })
        return
      }
      exchangeApi.confirmException(this.exceptionForm).then((response) => {
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
