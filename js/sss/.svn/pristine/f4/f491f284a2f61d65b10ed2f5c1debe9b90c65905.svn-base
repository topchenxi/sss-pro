<template lang="html">
  <div class="pending-outline" v-loading.fullscreen="fullscreenLoading">
    <h1 class="title" style="font-size: 25px; padding: 15px">线下分账</h1>
    <div class="box">
      <div class="">
        <p>费用明细</p>
        <FeeDetail :order="detailData[0].order" :payType="10" :statusText="statusText" :moneyString="moneyString" v-if="detailData[0] && detailData[0].order"></FeeDetail>
      </div>
      <div class="upload">
        <p>上传付款凭据</p>
        <el-row v-for="(file, index) in fileList" class="file-item">
          <el-col :span="3">
            <el-card :body-style="{ padding: '0px', width: '120px', height: '120px' }"  v-loading="file.status != 'finished'">
              <img :src="('http://www.soouya.com' + file.response.imgUrl)" class="image"  v-if="file.status == 'finished'">
              <div class="mark">
                <p>{{file.name}}</p>
                <div class="bottom clearfix">
                  <i class="el-icon-view" title="预览" @click.prevent="handlePreview(file.response&&file.response.imgUrl)"></i>
                  <i class="el-icon-delete" title="删除" @click.prevent="handleRemove(file.uid)"></i>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-input size="small" placeholder="请输入备注" v-model="remark[index]"></el-input>
          </el-col>
        </el-row>
        <el-upload
          ref="el-upload"
          action="/redwood/sys/Common/uploadFile.do?type=1"
          :multiple="true"
          :show-upload-list="false"
          :before-upload="handleBeforeupload"
          :on-success="handleSuccess"
          style="margin-bottom: 10px;"
          :on-error="handleError">
          <el-button size="small" type="primary"><i class="el-icon-upload"></i>点击上传付款凭据</el-button>
        </el-upload>

      </div>

    </div>
   <div style="padding-left: 8px;">
     <el-button type="primary" @click.native.prevent="handleSubmit" :disabled="!fileList.length">确认</el-button>
     <el-button @click.native.prevent="handleReturn">返回</el-button>
   </div>
    <el-dialog title="图片预览" v-model="previewVisible" ref="dialogPreview">
      <img :src="previewSrc" alt="图片预览" class="preview-img" />
    </el-dialog>
  </div>
</template>

<script>
import {
  request,
} from 'src/common/utils.js'
import AccountApi from 'api/account.js'
import FeeDetail from 'components/FeeDetail/feeDetail.vue'
export default {
  data () {
    return {
      time: new Date().getTime(),
      fullscreenLoading: true,
      previewVisible: false,
      previewSrc: '',
      detailData: [],
      fileList: [],
      remark: [],
      statusText: '应付款（元）',
      moneyString: 'toPayMoney'
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getDetail();
  },
  computed: {},
  methods: {
    handleBeforeupload(file) {
      console.log('handleBeforeupload', file);
    },
    handleSuccess(response, file, fileList) {
      console.log(file, fileList);
      console.log('response', response);
      this.fileList = fileList;
    },
    handleError(err, file, fileList) {
      console.log(err, file, fileList);
    },
    handleRemove(uid) {
      // console.log(file, fileList);
      const index = this.fileList.findIndex(obj => {
        return obj.uid == uid;
      })
      this.remark.splice(index, 1);
      this.fileList.splice(index, 1);
    },
    handlePreview(imgUrl) {
      this.previewVisible = true;
      this.previewSrc = 'http://www.soouya.com/' + imgUrl;
    },
    /**
     * 获取分账明细
     */
    getDetail() {
      request({
        url: AccountApi.PayGroupOrderX.getDetail,
        method: 'post',
        data: {
          param: JSON.stringify({ id: this.id })
        }
      }).then(data => {
        this.fullscreenLoading = false;
        // console.log('data', data);
        if (data.success === '1') {
          data.obj.order.toPayMoney = data.obj.toPayMoney
          this.detailData = [data.obj];
        } else {
          this.$message({
            type: 'error',
            message: data.msg,
          })
        }
      })
    },
    handleSubmit() {
      this.fullscreenLoading = true;
      const certificateList = this.fileList.map((obj, index) => {
        return { imgUrl: obj.response.imgUrl, remark: this.remark[index] }
      });
      request({
        url: AccountApi.PayTransaction.offlineComfirmPay,
        method: 'post',
        data: {
          param: JSON.stringify({
            payGroupOrderXIdList: [this.id],
            certificateList: certificateList,
            _time: this.time
          })
        }
      }).then(data => {
        // console.log('data', data);
        this.fullscreenLoading = false;
        if (data.success === '1') {
          this.$router.push('/finance/splitAccount')
        } else {
          this.$message({
            type: 'error',
            message: data.msg,
          })
        }
      })
    },
    handleReturn() {
      this.$router.back();
    },
  },
  components: {
    FeeDetail,
  }
}
</script>

<style lang="scss">
.pending-outline{
  .title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .box {
    margin-left: 8px;
  }
  p {
    margin: 10px 0;
  }
  .upload{
    overflow: hidden;
  }
  .remark, .el-upload{
    float: left;
  }
  .el-input-small{
    margin-bottom: 2px;
  }

  .file-item{
    margin-bottom: 10px;

    p{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      line-height: 1.5;
      background-color: #fff;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .el-card{
      position: relative;
    }
    .image{
      min-width: 100%;
      min-height: 100%;
    }
    .mark{
      display: none;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);

      .bottom{
        line-height: 100px;
        text-align: center;
      }
      .el-icon-delete, .el-icon-view{
        font-size: 30px;
        color: #fff;
        vertical-align: middle;
      }
    }
    &:hover{
      .mark{ display: block;}
    }
  }
}
</style>
