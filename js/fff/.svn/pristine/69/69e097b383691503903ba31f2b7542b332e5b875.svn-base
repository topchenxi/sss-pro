<template>
  <el-dialog title="提示" v-model="config.isShow" size="tiny">
    <el-row>
      <!-- <i class="el-icon-information warn"></i> -->
      <p class="warn-msg">{{label}}</p>
    </el-row>
    <el-row></el-row>
    <el-row  style="margin-top:20px;text-align:left">
      <p style="margin-bottom: 8px;">财务备注:</p>
      <el-col :span="24">
      <!-- <limitInput :maxLength="500" :model="handleForm.remark" v-on:update="updateRemark"></limitInput> -->
      <el-input type="textarea" :autosize="{minRows: 6, maxRows: 6}" resize="none" v-model="handleForm.remark" @input="updateRemark"></el-input>
      </el-col>
    <p v-if="handleForm.remark" class="remark-font">{{handleForm.remark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" :disabled="handleForm.remark > 500" @click="submit()">确 定</el-button>
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
      handleForm: {
        id: '',
        fukuanType: 1,
        remark: '',
      },
      rules: {
        remark: [
          { validator: validateLength, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    label() {
      let label = '';
      switch (this.config.type) {
        case 1:
          label = '确认已收回供应商退款'
          break;
        case 2:
          label = '确认已补款给供应商'
          break;
        case 3:
          label = '同意退款给采购商'
          break;
        default:
          label = '确定批量处理'
      }
      return label
    }
  },
  watch: {
    config: {
      handler: function (val, oldVal) {
        if (JSON.stringify(val.id) !== JSON.stringify(this.handleForm.id)) {
          this.handleForm.id = val.id
          this.handleForm.remark = ''
        }
      },
      deep: true,
    }
  },
  methods: {
    updateRemark(val) {
      console.log(val)
      this.handleForm.remark = val;
    },
    submit() {
      if (this.handleForm.remark.length > 500) {
        this.$message({
          message: '备注不能超过500个字符',
          type: 'error'
        })
        return
      }
      exchangeApi.confirmHandle(this.handleForm).then((response) => {
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
