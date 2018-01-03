<template>
  <div>
    <el-dialog v-model="showFlag" title="取消退换货" :before-close="closeDlg">
      <div>
        <el-form label-position="right" label-width="100px">
          <el-form-item class="mb5" label="订单号">
            <span>{{selectOrder.order.serviceNumber}}</span>
          </el-form-item>
          <el-form-item class="mb5" label="采购商">
            <span>{{selectOrder.order.customerCompany}}</span>
          </el-form-item>
          <el-form-item class="mb5" label="退换货类型">
            <span>{{selectItem.type | typeFilter}}</span>
          </el-form-item>
          <el-form-item label="退换数量">
            <span>{{selectItem.quantity | formatMoney}}{{selectItem.quantityUnit}}</span>
          </el-form-item>
          <el-form-item label="取消原因" :required="true">
            <el-input v-model="cancelReason" type="textarea" placeholder="请输入取消原因"></el-input>
          </el-form-item>
          <el-form-item style="display: inline-block">
            <el-button type="warning" @click.native="confirmCancel" :disabled="cancelReason.length<=5">确认取消</el-button>
            <el-button type="primary" @click.native="closeDlg">暂不取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { cancelRR } from 'src/service/merchandiser';
export default {
  props: {
    'showFlag': {
      type: Boolean
    },
    'selectOrder': {
      type: Object,
      required: true,
      default: () => {}
    },
    'selectItem': {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      'cancelReason': ''
    };
  },
  methods: {
    async confirmCancel() {
      let params = {
        'id': this.selectItem.id,
        'cancelReason': this.cancelReason,
      };
      this.$store.dispatch('changeload', true);
      let res = await cancelRR(params);
      this.$store.dispatch('changeload', false);
      if (res.success !== '1') return;
      this.$message.success(res.msg);
      this.$emit('confirm');
    },
    closeDlg() {
      this.$emit('closeCancel');
    }
  },
  filters: {
    typeFilter(vaule) {
      switch ('' + vaule) {
        case '1':
          return '售前退货';
        case '2':
          return '售前换货';
        case '3':
          return '售后退货';
        case '4':
          return '售后换货';
        default:
          return '';
      }
    }
  },
}

</script>
