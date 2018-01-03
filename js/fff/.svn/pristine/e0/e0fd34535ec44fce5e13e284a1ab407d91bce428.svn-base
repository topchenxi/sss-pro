<template>
  <el-dialog title="提示" v-loading.fullscreen.lock="pageLoading" element-loading-text="拼命加载中..." v-model="config.isShow" size="tiny">
    <p class="warn-msg">确认处理扣数单</p>
    <el-form :model="handleForm" :rules="rules" style="margin-top: 15px;" label-width="100" label-position="right">
      <el-form-item label="处理方式：" required>
        <el-radio-group v-model="handleForm.handleWay" class="radio-group" @change="getRemain">
          <el-radio :label="1">退回账户余额</el-radio>
          <el-radio :label="2">扣减账户余额</el-radio>
          <el-radio :label="3">不退/减</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="remark" class="nowrap" label="财务备注：">
        <el-input @input="updateRemark" type="textarea" v-model="handleForm.remark" :maxlength="500" :autosize="{minRows:6,maxRows:6}" resize="none"></el-input>
        <p class="remark-font">{{handleForm.remark.length}}/500</p>
      </el-form-item>
      <el-form-item label="扣数类型：" v-if="typeVisible">
        <el-select v-model="handleForm.type" class='c-select funtype-select'>
          <el-option :key="option.value" v-for="option in koushuTypeOptions" :label="option.label" :value="option.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账户余额：" v-if="handleForm.handleWay == 2">
      <span style="red" v-if="availableBalance">{{availableBalance.toFixed(2)}} 元<span v-if="yueFlag"> (余额不足)</span></span>
      <span style="red" v-else>{{availableBalance}} 元<span v-if="yueFlag"> (余额不足)</span></span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close" size="small">取 消</el-button>
      <el-button type="primary" @click="adjust" size="small" v-if="yueFlag && handleForm.handleWay == 2">去调整</el-button>
      <el-button type="primary" @click="submit" size="small"  v-else>确 定</el-button>
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
      handleForm: {
        list: [],
        // 参数待定
        handleWay: null,
        remark: '',
        type: ''
      },
      availableBalance: null,
      yueFlag: 0,
      typeVisible: false,
      pageLoading: false, // loading状态
      koushuTypeOptions: [ // 扣数类型的选择列表
        {
          value: '',
          label: '请选择'
        }, {
          value: '1',
          label: '损耗'
        },
        {
          value: '2',
          label: '运费'
        },
        {
          value: '3',
          label: '售后退换货'
        }
      ],
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
        if (JSON.stringify(val.idList) !== JSON.stringify(this.handleForm.id)) {
          this.handleForm.idList = val.idList
          this.handleForm.remark = ''
        }
        if (val.isShow) { // 弹框每次重新点开的时候值清空
          this.handleForm.handleWay = null
          this.handleForm.remark = ''
          this.handleForm.type = ''
          if (val.list.length == 1) {
            if (Number(val.kouShuMoneyFlag) < 0) {
              this.handleForm.handleWay = 1
            }
            if (Number(val.kouShuMoneyFlag) > 0) {
              this.handleForm.handleWay = 2
              this.getRemain()
            }
            if (Number(val.kouShuMoneyFlag) == 0) {
              this.handleForm.handleWay = 3
            }
          }
        }
        var types = []
        types = val.list.map(item => {
          return item.type
        })
        if (Array.from(new Set(types)).length == 1 && types[0] == 0) {
           this.typeVisible = true
        } else {
          this.typeVisible = false
        }
      },
      deep: true,
    }
  },
  methods: {
    updateRemark(val) {
      this.handleForm.remark = val;
    },
    adjust() {
      window.open('/finance/moneyManage/moneyManageDetail?id=' + this.config.customerId)
    },
    getRemain() {
      if (this.handleForm.handleWay != '2') {
        return false
      }
      this.pageLoading = true
      deductionApi.getRemain(this.config.customerId).then((response) => {
        if (this.requestIsSuccess(response)) {
          this.availableBalance = response.obj.availableBalance
          this.yueFlag = (this.availableBalance - this.config.kouShuMoney > 0) ? 0 : 1
          this.pageLoading = false
        }
      })
    },
    submit() {
      if (this.handleForm.handleWay == null) {
        this.$message.warning('必须选择处理方式')
        return false
      }
      if (this.handleForm.type) {
        this.config.list.forEach(item => {
            item.handleWay = this.handleForm.handleWay
            item.type = Number(this.handleForm.type)
            item.remark = this.handleForm.remark
        })
      } else {
        this.config.list.forEach(item => {
            item.handleWay = this.handleForm.handleWay
            item.remark = this.handleForm.remark
        })
      }
      this.handleForm.list = this.config.list
     var obj = JSON.parse(JSON.stringify(this.handleForm))
      delete obj.type
      delete obj.remark
      delete obj.handleWay
      delete obj.idList
      deductionApi.handleDeduction(obj).then((response) => {
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
  .radio-group {
    margin-top: 10px;
  }
.el-icon-warning {
  color: #f00;
}

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
