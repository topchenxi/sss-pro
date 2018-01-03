<template>
  <section>
   <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :before-upload="beforeUpload" 
               multiple>
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
             </section>
</template>
<script>
import lrz from 'lrz'
import {
  request
} from 'utils/tool'
  export default {
    props: {
        imgUrls: Array,
        imgArray: Array
    },
    data () {
      return {}
    },
    methods: {
        beforeUpload(file) {
        let that = this
        let type = file.type.split('/')
       if (['jpg', 'png', 'gif', 'jpeg'].indexOf(type[1]) == -1) {
        this.$message({
          type: 'error',
          message: '请上传图片',
          duration: 1500
        })
        return false
      }
      this.imgArray.push(file)
      if (this.imgUrls.length + this.imgArray.length > 9) {
        this.$message.error('最多只能上传9张')
        return false
      }
      lrz(file, {
        quality: 1,
        height: 600,
        width: 800
      })
      .then(function (rst) {
        // 处理成功会执行
        rst.formData.append('field', 'imgUrl')
        request({
          url: '/redwood/sys/Common/uploadFile.do?type=6',
          method: 'post',
          data: rst.formData,
          dataType: 'FormData'
        }).then(data => {
          if (data.success == '1') {
            that.imgUrls.push(data)
          } else {
            that.$alert(data.msg, '', {
              callback: action => {
                return true
              }
            });
          }
        })
        return rst
      })
      return false
        }
    }
  }
</script>
<style lang="scss">
.avatar-uploader  {
   .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
         border-color: #20a0ff;
    }
   }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }
  .avatar {
    width: 70px;
    height: 70px;
    display: block;
  }
</style>
