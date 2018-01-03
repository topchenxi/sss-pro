/**
 * 面料属性勾选
 * @author yonghuang
 * @create 2016.07.22
 */
'use strict';
import '../../common/base.js'
import { setCache, imgPath } from '../../common/utils'
import tagApi from '../../api/tag'
class Page {
  constructor() {
    this._time = new Date().getTime()
    this.getTas()
  }
  getTas() {
    const that = this
    $.showPreloader();
    request({
      url: tagApi.list,
      data: that.reqOptions,
      callback (data) {
        $.hidePreloader();
        if (data.success == '1') {
          const tpl = 'addProperty/list.html'
          const renderData = {
            tags: data.result,
            imgPath,
          }
          nunjucks.render(tpl, renderData).then((resHtml) => {
            $('.property-list').html(resHtml)
            that.baseEevent()
          })
        } else {
          $.alert(data.msg);
        }
      }
    })
  }
  baseEevent() {
    const that = this
    that.doms = {
      listContainer: $('.property-list'), // 缓存列表容器节点
      confirmBtn: $('.confirm-btn') // 缓存确认提交节点
    };
    // if () {
    //   this.isUnion = true; // 档口主营品类可以是并集
    // } else {
    //   this.isUnion = false; // 求购等地方品类互斥
    // }
    // that.isUnion = false; // 求购等地方品类互斥
    // let choosedTags = [];
    // if (sessionStorage.getItem('choosedTags')) { // 选中刚刚选中的属性
    //   choosedTags = JSON.parse(sessionStorage.getItem('choosedTags'));
    // }
    // if (choosedTags && choosedTags.length > 0) {
    //   $.each(choosedTags, function(i, n) {
    //     $('[data-id="' + n.id + '"]').addClass('active');
    //     $('[data-id="' + n.id + '"]').parents('.outer').css({
    //       left: "110%"
    //     })
    //   });
    //   var $firstItem = $('.cloth-item.active');
    //   if ($firstItem.length > 0) {
    //     $firstItem = $($firstItem[0]);
    //     const category = sessionStorage.getItem('category');
    //     if (category == 'accessories') { // 辅料回填
    //       $('.acc_tit, .sortA').parent().removeClass('cur');
    //       $('.acc_tit').removeClass('cur');
    //       $firstItem.parent().parent().parent().parent().find('.acc_tit').addClass('cur');
    //       $('.typesWrap').hide();
    //       $('.cur').parent().find('.typesWrap').show();
    //       $('.accessoryNav').css('display', 'block');
    //     } else { // 面料回填
    //       console.log($firstItem)
    //       $('.acc_tit, .sortA').parent().removeClass('cur');
    //       $('.acc_tit').removeClass('cur');
    //       $firstItem.parents('.sort-tit').addClass('cur');
    //       $('.typesWrap').hide();
    //       $('.cur .typesWrap').show();
    //     }
    //   }
    //   if (that.isUnion) {
    //     $('.typesWrap').each(function(i, n) {
    //       var activeLen = $(this).find('li.active').length;
    //       var $belongParent = $(this).parent();
    //       if (activeLen > 0) {
    //         $belongParent.addClass('selected');
    //         $('.icon', $belongParent).hide();
    //       } else {
    //         $belongParent.removeClass('selected');
    //         $('.icon', $belongParent).show();
    //       }
    //     });
    //   }
    // }
    var choosedTags = [];
    if (sessionStorage.getItem('choosedTags')) { // 选中刚刚选中的属性
      choosedTags = JSON.parse(sessionStorage.getItem('choosedTags'));
    }
    this.choosedTags = choosedTags;
    if (choosedTags && choosedTags.length > 0) {
      $.each(choosedTags, function(i, n) {
        $('[data-id="' + n.id + '"]').addClass('active');
      });

      var $firstItem = $('.cloth-item.active');
      if ($firstItem.length > 0) {
        $firstItem = $($firstItem[0]);
        var category = sessionStorage.getItem('category');
        if (category == 'accessories') { // 辅料回填
          $('.acc_tit, .sortA').parent().removeClass("cur");
          $(".acc_tit").removeClass("cur");
          $firstItem.parent().parent().parent().parent().find('.acc_tit').addClass("cur");
          $(".typesWrap").hide();
          $(".cur").parent().find('.typesWrap').show();
          $('.accessoryNav').css('display', 'block');
        } else { // 面料回填
          $('.acc_tit, .sortA').parent().removeClass("cur");
          $(".acc_tit").removeClass("cur");
          $firstItem.parent().parent().parent().parent().addClass("cur");
          $(".typesWrap").hide();
          $(".cur .typesWrap").show();
        }
      }
    }
    that.tagsEvent()
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var fixedHeight = clientHeight - 50;
    $('.nav-list').css('height', fixedHeight);
    $('.typesWrap').css('height', fixedHeight);
  }
  tagsEvent() {
    const that = this
    var doms = that.doms
    doms.listContainer.unbind('click').delegate('.cloth-item', 'click', that.handleClothItem);
    $('body').unbind('click').delegate('.poplayer-confirm', 'click', that.handleUserDefine);

    $('.nav-list .sortTit').on('click', that.tabChange);
    $(".sortAccessory").on("click", that.accessoryMenu);

    $('.accessoryNav .acc_tit').on('click', that.accessoryTags);

    doms.confirmBtn.unbind('click').on('click', that.handleConfirm);
  }
  // 选项切换
  tabChange (e) {
    // const that = this
    var $this = $(e.currentTarget);
    if ($this.hasClass('cur')) return
    if (!$this.hasClass('sortAccessory')) {
      $('.acc_tit, .sortA').parent().removeClass("cur");
      $(".acc_tit").removeClass("cur");
      $this.addClass("cur");
      $(".typesWrap").hide();
      $(".typesWrap", ".cur").show();
    }
    // setTimeout(function() {
    //   $('.outer').removeAttr('style')
    //   $('.outer').css({
    //     left: -9999
    //   })
    //   const outer = $this.find('.outer')
    //   outer.css({
    //     left: '110%',
    //   })
    // }, 100);
  }
  // 辅料下拉
  accessoryMenu (e) {
    // const that = this
    $('.sortTit').removeClass('cur')
    var $this = $(e.currentTarget);
    // $this.siblings("li").removeClass("cur");
    var status = $this.attr('data-status');
    $('.acc_tit').removeClass('cur')
    if (status == 'on') {
      $this.attr('data-status', 'off');
      if ($('.acc_tit.cur', '.accessoryNav').length > 0) {
        $('dt', '.accessoryNav').css('display', 'none');
        $('.acc_tit.cur', '.accessoryNav').parent().addClass('choosedHidden').css('display', 'block');
      } else {
        $this.next(".accessoryNav").css('display', 'none');
        $('.acc_tit.cur', '.accessoryNav').parent().removeClass('choosedHidden');
      }
      $('.arrow', $this).removeClass('arrow-up').addClass('arrow-down');
    } else {
      $this.attr('data-status', 'on');
      $this.next(".accessoryNav").css('display', 'block');
      $('dt', '.accessoryNav').css('display', 'block');
      $('.acc_tit.cur', '.accessoryNav').parent().removeClass('choosedHidden');
      $('.arrow', $this).removeClass('arrow-down').addClass('arrow-up');
    }
  }
  // 辅料下拉子菜单选择
  accessoryTags (e) {
    var $this = $(e.currentTarget);
    $('.sortAccessory, .sortTit').removeClass("cur");
    // .removeClass("selected");
    $(".acc_tit").removeClass("cur");
    $this.addClass("cur");
    // $this.parent().siblings("dt").removeClass('selected');
    // $this.parent().addClass('selected');
    $(".typesWrap").hide();
    $this.parent().find('.typesWrap').show();
  }

  /**
   * 属性点击事件处理
   */
  handleClothItem (e) {
    const that = this
    var $this = $(e.currentTarget);
    // const key = $this.parent().parent().attr('data-id');
    // const value = $this.text();
    // 删除其他tab中被选中的
    $('.sort-tit').not('.cur').find('.cloth-item').removeClass('active')
    if (!$this.hasClass('active')) {
      $this.addClass('active');
    } else {
      $this.removeClass('active');
    }
    if (that.isUnion) {
      // var activeLen = $this.parent().parent().parent().find('li.active').length;
      // var $belongParent = $this.parent().parent().parent().parent();
      var activeLen = $this.parent().parent().parent().find('li.active').length;
      var $belongParent = $this.parent().parent().parent().parent();
      if (activeLen > 0) {
        $belongParent.addClass('selected');
        $('.icon', $belongParent).hide();
        if ($('dt.selected', '.accessoryNav').length > 0) {
          $('.sortAccessory').addClass('selected');
          $('.icon', '.sortAccessory').hide();
        }
      } else {
        $belongParent.removeClass('selected');
        $('.icon', $belongParent).show();
        if ($('dt.selected', '.accessoryNav').length == 0) {
          $('.sortAccessory').removeClass('selected');
          $('.icon', '.sortAccessory').show();
        }
      }
    }
  }
  /**
   * 确认提交
   */
  handleConfirm (e) {
    var category = $('.cur').attr('data-category');
    if (category == '面料') {
      sessionStorage.setItem('category', 'cloth');
    } else {
      sessionStorage.setItem('category', 'accessories');
    }
    var choosedTags = [];
    if (category == '辅料') {
      $('.cur').parent().find('.cloth-item.active').each(function() {
        var tagItem = {
          id: $(this).attr('data-id'),
          name: $(this).text(),
          parentName: $(this).parent().parent().parent().attr('data-parentName')
        };
        choosedTags.push(tagItem);
      });
    } else {
      $('.cur .cloth-item.active').each(function() {
        var tagItem = {
          id: $(this).attr('data-id'),
          name: $(this).text(),
          parentName: $(this).parent().parent().parent().attr('data-parentName')
        };
        choosedTags.push(tagItem);
      });
    }
    setCache({
      type: 'sessionStorage',
      key: 'choosedTags',
      value: choosedTags,
      dataType: 'json'
    });
    history.back()
  }
}
export default new Page()
