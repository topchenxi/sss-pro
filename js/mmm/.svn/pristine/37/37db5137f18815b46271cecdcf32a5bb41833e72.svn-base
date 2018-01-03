/**
 * 消息
 */
import '../../common/base'
import {
  checkLogin,
  setLastPage
} from '../../common/utils'
import MsgApi from '../../api/message'

class Message {
    constructor () {
        this._time = new Date().getTime()
        let that = this
        checkLogin({}, function (res) {
            let userId = res.loginInfo.user.id
            that.renderMsgList(userId)
            that.clear()
        })
        this.bindEvents()
    }
    renderMsgList (userId) {
        $.showPreloader()
        request({
            url: MsgApi.list,
            data: {
                userId: userId,
                _time: this._time,
                pageSize: 20,
                pageNumber: 1
            },
            callback: function (res) {
                $.hidePreloader();
                nunjucks.render('message/index.html', res).then((renderHtml) => {
                  $('.message-list').html(renderHtml)
                })
            }
        })
    }
    clear () {
        request({
            url: MsgApi.clear,
            data: {
                _time: this._time
            },
            callback: function (res) {
            }
        })
    }

    bindEvents () {
        $(document).delegate('.order-item', 'click', function () {
          setLastPage(location.href);
        })

        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', () => {
            location.reload();
        });

    }
}

export default new Message()
