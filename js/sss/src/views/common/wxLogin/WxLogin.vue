<template>
<div id="login_container" style="text-align: center; margin-left: -180px">
</div>
</template>

<script>
import {
  Message
} from 'element-ui'
import {
  request,
  getCache
} from '../../../common/utils'
import Seed from '../../../api/seed'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      msg: '微信授权登录'
    }
  },

  mounted() {
    const self = this
    const currentUser = getCache({
      key: 'currentUser'
    })
    const productionConfig = {
      appid: 'wx89d7638a3085331a',
      secret: 'a98307c8d22d014072518227b0ae59b4',
      redirectUri: 'https://caiwu.soouya.com/common/wxlogin'
    }
    const testConfig = {
      appid: 'wx70a3ea62103cd380',
      secret: '392f3126c68b47b30dd2d66d39b7670d',
      redirectUri: 'http://testcaiwu.soouya.com/common/wxlogin'
    }
    const devConfig = {
      appid: 'wx197fea6f35b78d98',
      secret: 'ce701b42af7525029ed8185a1004f1e3',
      redirectUri: 'http://devcaiwu.soouya.com/common/wxlogin'
    }

    const config = location.host === 'caiwu.soouya.com' ? productionConfig : location.host === 'testcaiwu.soouya.com' ? testConfig : devConfig

    const code = self.$route.query.code
    const userId = self.$route.query.state
    if (code) {
      request({
        url: '/sns/oauth2/access_token',
        data: {
          appid: config.appid,
          secret: config.secret,
          code: code,
          grant_type: 'authorization_code'
        }
      }, (res) => {
        const openid = res.openid
        if (openid && userId) {
          // const currentUser = getCache({
          //   key: 'currentUser'
          // })
          request({
            url: Seed.wechatVerify,
            data: {
              openId: openid,
              userId: userId
            }
          }, (res) => {
            if (res.code == 1) {
              Message({
                message: '验证成功',
                type: 'success'
              })
              sessionStorage.setItem('isAuthed', 'true')
              Cookies.set('isAuthed', 'true')
              setTimeout(function() {
                location.href = '/'
              }, 1000)
            } else {
              Message({
                message: res.msg,
                type: 'error'
              })
            }
          }).catch((e) => {
            console.log(e)
          })
        } else {
          Message({
            message: res.errmsg,
            type: 'error'
          })
        }
      }).catch((e) => {
        console.log(e)
      })
    } else {
      new window.WxLogin({
        id: 'login_container',
        appid: config.appid,
        scope: 'snsapi_login',
        redirect_uri: config.redirectUri,
        state: currentUser ? currentUser.loginInfo.user.id : '',
        style: '',
        href: ''
      });
    }
  }
}
</script>
