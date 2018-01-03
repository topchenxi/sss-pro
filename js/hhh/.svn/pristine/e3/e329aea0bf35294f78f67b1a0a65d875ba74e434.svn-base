<template>
  <div>
    <el-dialog v-model="sendVisible" title="确认发货" :before-close="close">
      <el-form :model="form" class="form-dialog">
        <el-form-item label="快递单">
          <div class="image-warp p14">
            <div class="image-item">
              <a class="pic-item" :href="'http://www.soouya.com' + item" :key="item" v-lightbox="params.sendCredentialUrls" v-for="(item, index) in params.sendCredentialUrls">
                <img :src="'http://www.soouya.com' + item" width='86' height="86" />
                <span @click="del(item)" class="del-arrow">X</span>
              </a>
            </div>
            <el-upload class="pic-item" action="/redwood/sys/Common/uploadFile.do" :multiple="true" :show-upload-list="false" :before-upload="beforeUpload" :on-success="handleSuccess" :on-error="handleError" v-if="params.sendCredentialUrls.length < 9">
              <div class="icon-upload"></div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="快递单号">
          <el-input v-model="params.sendExpress" class="w200"></el-input>
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
import Lightbox from 'components/lightbox/lightbox';
import lrz from 'lrz';
import { request } from 'utils/request';
import { orderSend } from 'src/service/picker';
export default {
  components: {
    Lightbox
  },
  props: {
    'sendVisible': {
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
        sendCredentialUrls: [],
        sendExpress: '',
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
      this.params.sendCredentialUrls = [];
      this.params.sendExpress = '';
    },
    async submit() {
      this.params.idList = this.idList;
      let res = await orderSend(this.params);
      this.reset();
      this.$emit('submit');
      if (res.success !== '1') return;
      this.$message.success(res.msg);
    },
    beforeUpload(file) {
      this.$store.dispatch('changeload', true);
      lrz(file, { quality: 1 }).then(rst => {
        rst.formData.append('field', 'imgUrl');
        request('/redwood/sys/Common/uploadFile.do?type=4', {
          method: 'POST',
          data: rst.formData,
        }).then(data => {
          this.$store.dispatch('changeload', false);
          if (data.success === '1') {
            this.handleSuccess(data);
          } else {
            this.$message.error(data.msg);
          }
        })
      });
      return false;
    },
    handleSuccess(file, fileList) {
      if (this.params.sendCredentialUrls.length < 9) {
        this.params.sendCredentialUrls.push(file.imgUrl)
      }
    }
  }

}

</script>
