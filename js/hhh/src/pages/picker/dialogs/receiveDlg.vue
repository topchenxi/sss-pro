<template>
  <div>
    <el-dialog v-model="receiveVisible" title="是否确认收到货物？" :before-close="close">
      <el-form :model="form" class="form-dialog">
        <el-form-item label="收货备注">
          <el-input v-model="params.receiveRemark" class="w400"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click.native="cancel">取 消</el-button>
        <el-button type="primary" @click.native="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { orderReceive } from 'src/service/picker';
export default {
  props: {
    'receiveVisible': {
      type: Boolean,
      required: true
    },
    'idList': {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      form: {},
      params: {
        idList: [],
        receiveRemark: ''
      }
    }
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('cancel');
    },
    cancel() {
      this.$emit('cancel');
    },
    reset() {
      this.params.idList = [];
      this.params.receiveRemark = '';
    },
    async submit() {
      this.params.idList = this.idList;
      let res = await orderReceive(this.params);
      this.reset();
      this.$emit('submit');
      if (res.success !== '1') return;
      this.$message.success(res.msg);
    }
  }

}

</script>
