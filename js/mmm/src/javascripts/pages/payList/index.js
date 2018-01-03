/**
 * 收付款列表
 */
import '../../common/base.js'
import { imgPath, getParam, setLastPage } from '../../common/utils'
import OrderApi from '../../api/order'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.getList()
    this.bindEvents()
  }
  render(renderData) {
    const that = this;
    renderData = this.convertData(renderData);

    const tpl = 'payList/index.html';
    nunjucks.render(tpl, renderData).then((html) => {
      that.$page = $('#payList')
      that.$page.html(html)
    });
  }

  getList() {
    const that = this;
    const type = getParam('type');
    $.showPreloader()
    request({
      url: OrderApi.listPayResult,
      data: {type},
      callback(data) {
        console.log('data', data);
        $.hidePreloader()
        if (data.success === '1') {
          that.render(data)
        } else {
          $.alert(data.msg)
        }
      },
      error() {
        $.alert('获取列表失败，请刷新重试')
      }
    })
  }

  convertData(renderData) {
    renderData.imgPath = imgPath;
    const type = getParam('type');
    if (type == 1) {
      renderData.headerTitle = '收付款';
    } else if (type == 2) {
      renderData.headerTitle = '垫付';
    }
    console.log('renderData', renderData);
    return renderData;
  }

  bindEvents() {
    $(document).on('click', '.J_set_lastpage', function() {
      if ($(this).hasClass('disabled')) {
        return false;
      }
      setLastPage();
    });
    $(document).on('click', '.disabled', function() {
      return false;
    });
  }
}

export default new Page()
