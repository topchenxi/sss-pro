<template>
    <div class="weixin">
        <el-row v-if="openid==undefined || openid==null || openid == ''">
            <el-col :span="2" style="color:#cccccc;">未绑定</el-col>
            <el-col :span="4" style="font-weight:700;">绑定微信号</el-col>
            <el-col :span="4">绑定后可接收搜芽红杉订单消息</el-col>
            <el-col :span="14">
                <el-button @click="dialogVisible = true" size="small" type="primary">立即绑定</el-button>
            </el-col>
        </el-row>
        <el-row v-else>
            <el-col :span="2"><span style="color:#26C6DA;">√</span>已绑定</el-col>
            <el-col :span="4">微信号（{{weixin}}）</el-col>
            <el-col :span="4">绑定后可接收搜芽红杉订单消息</el-col>
            <el-col :span="14">
                <el-button @click="unbind()" size="small" type="warning">解绑</el-button>
            </el-col>
        </el-row>
        <el-dialog title="绑定搜芽微信" v-model="dialogVisible" size="tiny" @close="handleClose()">
            <qrcode :cls="qrCls" :value="qrText" :size="200"></qrcode>
            <span>请扫描二维码后根据提示绑定搜芽微信</span>
        </el-dialog>
    </div>
</template>
<script>
import Lightbox from 'components/lightbox/lightbox'
import AccountApi from 'api/account'
import Qrcode from 'v-qrcode'
import {
    request
} from 'utils/tool'

export default {
    components: {
        Lightbox,
        Qrcode
    },
    data() {
        return {
            id: '',
            openid: '',
            weixin: '',
            dialogVisible: false,
            qrCls: 'qrcode',
            qrText: '',
            isTest: location.href.indexOf('test') > 0 || location.href.indexOf('local') > 0
        }
    },
    mounted() {
        this.$store.dispatch('changeload', false)
        this.getCurrentUser()
    },
    methods: {
        handleClose() {
            console.log('close')
            this.getCurrentUser()
        },
        getCurrentUser() {
            request({
                url: AccountApi.getRealCurrentUser,
                method: 'get'
            }).then(data => {
                this.$store.dispatch('changeload', false)
                if (data.success === '1') {
                    this.id = data.loginInfo.user.id;
                    this.openid = data.loginInfo.user.openId;
                    this.weixin = data.loginInfo.user.weixin;
                    if (this.isTest) {
                        this.qrText = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxded14f5635dd3bd5&redirect_uri=http://testwx.soouya.com/wx/bind?id=' + this.id + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
                    } else {
                        this.qrText = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7e7d926b3871acf5&redirect_uri=http://weixin.soouya.com/wx/bind?id=' + this.id + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: data.msg,
                        duration: 1000
                    })
                }
            })
        },
        unbind() {
            this.$store.dispatch('changeload', true)
            request({
                url: AccountApi.unbind,
                method: 'get',
                data: {
                    id: this.id
                }
            }).then(data => {
                this.$store.dispatch('changeload', false)
                if (data.success === '1') {
                    this.id = '';
                    this.openid = '';
                    this.weixin = '';
                } else {
                    this.$message({
                        type: 'error',
                        message: data.msg,
                        duration: 1000
                    })
                }
            })
        }
    }
}
</script>
<style lang="scss">
.el-dialog--tiny {
    width: 280px;
}

.qrcode {
    margin-left: 25px;
}
</style>
<style lang="scss" scoped>
.weixin {
    border: 1px solid gray;
    min-height: 60px;
}

.weixin>div.el-row {
    margin-left: 20px;
    margin-top: 20px;
}
</style>
