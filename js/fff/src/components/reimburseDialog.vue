<template>
  <el-dialog title="提示" v-model="config.isShow" size="tiny">
    <p class="warn-msg">
      <span>
        <template v-if="config.type === 'freight'">
          确定给仓库员报销
        </template>
        <template v-else-if="config.type === 'cut'">
          确定给剪版员报销
        </template>
      </span>
    </p>
    <el-form class="reiburse-form" :model="reimburseForm" :rules="rules" label-width="100" label-position="right">
      <el-form-item prop="fukuanType" label="报销方式：" >
        <el-radio-group v-model="reimburseForm.fukuanType" style="margin-top:10px;">
          <el-radio :label="1">现金报销</el-radio>
          <el-radio :label="2">线上转账 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="报销金额：">
        <strong class="important">{{config.totalMoney | formateNumber}}元</strong>
      </el-form-item>
      <el-form-item class="nowrap" label="财务备注：">
        <!-- <limitInput :maxLength="500" :model="reimburseForm.remark" v-on:update="updateRemark"></limitInput> -->
        <el-input type="textarea" :autosize="{minRows: 6, maxRows:6}" resize="none" v-model="reimburseForm.remark" @input="updateRemark" style="width:%;"></el-input>
        <p v-if="reimburseForm.remark" class="remark-font">{{reimburseForm.remark.length}}/500</p>
          <p v-else class="remark-font">0/500</p>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="reimburseForm.remark.length>500">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import limitInput from 'components/limitInput.vue'
import reimburseApi from 'api/reimburse'

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
      reimburseForm: {
        ids: '',
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
  watch: {
    config: {
      handler: function(val, oldVal) {
        if (JSON.stringify(val.ids) !== JSON.stringify(this.reimburseForm.ids)) {
          this.reimburseForm.ids = val.ids;
          this.reimburseForm.remark = '';
        }
      },
      deep: true,
    }
  },
  methods: {
    updateRemark(val) {
      this.reimburseForm.remark = val;
    },
    submit() {
      let type = ''
      if (this.config.type === 'cut') {
        type = 'reimburseCut'
      } else if (this.config.type === 'freight') {
        type = 'reimburseFreight'
      }
      reimburseApi[type](this.reimburseForm).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.config.isShow = false;
          this.$emit('success');
          this.$message({
            message: '报销成功',
            type: 'success'
          });
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
  text-align: left;
}

.important {
  color: #f00;
}

.nowrap {
  white-space: nowrap;
}
</style>
