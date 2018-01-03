/**
 * 登录页面js
 */

import '../../common/base'
import { setCache, getLastPage } from '../../common/utils'
import md5 from 'blueimp-md5'
import UserApi from '../../api/user'

class Login {
  constructor() {
    this._time = new Date().getTime()
    this.doms = {
      userName: $('input[name="name"]'),
      password: $('input[name="pwd"]'),
      dosubmit: $('.dosubmit')
    }
    this.bindEvents()
  }

  bindEvents() {
    let that = this
    const doms = this.doms
    document.addEventListener('keyup', function (event) {
      if (event.keyCode == '13') {
        doms.dosubmit.click()
      }
    }, true);
    /**
     * 提交登录信息
     */
    doms.dosubmit.on('click', () => {
      const userName = doms.userName.val();
      if (userName.length === 0) {
        $.toast('请输入登录账号');
        return false;
      }

      const password = doms.password.val();
      if (password.length === 0) {
        $.toast('请输入登录密码');
        return false;
      }

      const params = {
        userName,
        pwd: md5(password),
        _time: that._time
      };

      $.toast('登录中...');
      sessionStorage.clear()
      // localStorage.clear()
      request({
        url: UserApi.login,
        data: params,
        callback: (data) => {
          if (data.success === '1' && data.loginInfo) {
            $.toast('登录成功', 1000);

            setCache({ // 将用户信息缓存到本地
              type: 'sessionStorage',
              key: 'currentUser',
              value: data
            });

            const loginInfo = data.loginInfo;
            const cacheData = {
              userName: params.userName,
              pwd: params.pwd,
              loginId: loginInfo.user.id,
              group: loginInfo.group
            };

            setCache({ // 将用户信息缓存到本地
              type: 'localStorage',
              key: 'localStorage-user',
              value: cacheData,
            });

            const lastPage = getLastPage();
            if (lastPage) {
              location.href = lastPage;
            } else {
              location.href = '/';
            }
          } else {
            $.alert(data.msg);
          }
        },
      });
      return false;
    });
  }
}

export default new Login();
