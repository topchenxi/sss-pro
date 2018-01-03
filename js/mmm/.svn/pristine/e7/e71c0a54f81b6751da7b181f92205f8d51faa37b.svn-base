/**
 * 用户中心
 */
import '../../common/base'
import {
    getCache,
    checkLogin,
    isAndroidApp,
    isiPhoneApp
} from '../../common/utils'
import UserApi from '../../api/user'

class PersonalCenter {
    constructor () {
        let that = this
        this._time = new Date().getTime()
        this.doms = {
            container: $('.personal-detail-list')
        }
        /*this.userInfo = getCache({ //尝试获取本地缓存中的信息
            key: 'currentUser',
            type: 'sessionStorage'
        })*/
        checkLogin({
            lastPage: location.href
        }, function (res) {
            that.userInfo = res
            that.renderUserInfo()
            that.bindEvents()
        })

        // console.log('this.userInfo:', this.userInfo)
    }

  renderUserInfo () {
    const that = this
    nunjucks.render('personalCenter/index.html', this.userInfo).then((renderHtml) => {
      that.doms.container.html(renderHtml)
    })
  }

    bindEvents () {
        let that = this

        /**
         * 退出登录
         */
        this.doms.container.delegate('.J_logout', 'click', function (e) {
            sessionStorage.removeItem('currentUser')
            localStorage.removeItem('localStorage-user')
            const currentUser = getCache({
                key: 'currentUser',
                type: 'sessionStorage',
                dataType: 'json',
            })
            if (isiPhoneApp) {
                location.href = 'SoouyaRedwood://user/logout'
            } else if (isAndroidApp) {
                e.preventDefault()
                Android.logout()
            } else {

                e.preventDefault()
                request({
                    url: UserApi.logout,
                    data: {
                        userId: that.userInfo.loginInfo.user.id,
                        _time: that._time
                    },
                    callback: function (res) {
                        sessionStorage.removeItem('currentUser')
                        location.href = '/login.html'
                    }
                })
            }
        })
    }
}

export default new PersonalCenter()
