/**
 * 面料属性列表
 * @author 李家优
 * @email Jerrold@soouya.com
 * @update 2015.07.21
 */

/**
 * API接口
 */
var UserApi = require('api-user');
var UtilApi = require('api-util');
var ClothApi = require('api-cloth');

/**
 * 公共模块
 */
var AppConfig = require('app-config');
var Poplayer = require('poplayer');
var Validator = require('validator');
var Tools = require('c-tools');

/**
 * 模板
 */
var ListTpl = __inline('../tpls/list.handlebars');
var PopupTpl = __inline('../tpls/popup.handlebars');

var attributes = [];

var List = {
    init: function(pageInstance, options) {
        this.options = options;
        this.pageInstance = pageInstance;
        this.doms = {
            listContainer: $('.property-list', pageInstance.dom), //缓存列表容器节点
            confirmBtn: $('.confirm-btn', pageInstance.dom) //缓存确认提交节点
        };
        this.tags = options.tags;
        this.action = options.action;
        //@crm2.0 新增 this.options.shopId
        if ('updateProperty' === this.action || 'regSeller' === this.options.comeFrom || this.options.shopId) {
            this.isUnion = true; //档口主营品类可以是并集
        } else {
            this.isUnion = false; //求购等地方品类互斥
        }

        this.buyInfo = options.buyInfo;
        this.sellerInfo = options.sellerInfo;
        this.regShopInfo = options.regShopInfo;

        this.render();
    },
    render: function() {
        var _this = this;
        var tags = this.tags

        var regShopInfo = sessionStorage.getItem('regShopInfo');
        var renderData = {
            tags: tags,
            imgBasePath: AppConfig.imgBasePath
        };
        var $ListHtml = $(ListTpl(renderData));
        this.doms.listContainer.html($ListHtml);

        this.doms.clothItem = $('.cloth-item', this.doms.listContainer); //缓存属性dom节点
        this.doms.custom = $('.custom', this.doms.listContainer); //缓存添加自定义按钮节点

        if (regShopInfo) { // 商家注册不能添加自定义标签
            this.doms.custom.hide();
        }

        var choosedTags = [];
        if (sessionStorage.getItem('choosedTags')) { //选中刚刚选中的属性
            choosedTags = JSON.parse(sessionStorage.getItem('choosedTags'));
        } else if (this.buyInfo) { //编辑采购
            if (this.buyInfo.obj && this.buyInfo.obj.tags) {
                var tagsIds = this.buyInfo.obj.tags.split(',');
                var tagsIdsLength = tagsIds.length;
                for (var i = 0; i < tagsIdsLength; i++) {
                    var tagItem = {};
                    tagItem.id = tagsIds[i];
                    choosedTags.push(tagItem);
                };
            }
        } else if (this.sellerInfo) {
            if (this.sellerInfo && this.sellerInfo.tags) {
                var tagsIds = this.sellerInfo.tags.split(',');
                var tagsIdsLength = tagsIds.length;
                for (var i = 0; i < tagsIdsLength; i++) {
                    var tagItem = {};
                    tagItem.id = tagsIds[i];
                    choosedTags.push(tagItem);
                };
            }
        } else if (this.regShopInfo) {
            if (this.regShopInfo && this.regShopInfo.tags) {
                var tagsIds = this.regShopInfo.tags.split(',');
                var tagsIdsLength = tagsIds.length;
                for (var i = 0; i < tagsIdsLength; i++) {
                    var tagItem = {};
                    tagItem.id = tagsIds[i];
                    choosedTags.push(tagItem);
                };
            }
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
                if ('accessories' == category) { //辅料回填
                    $('.acc_tit, .sortA').parent().removeClass("cur");
                    $(".acc_tit").removeClass("cur");
                    $firstItem.parent().parent().parent().parent().find('.acc_tit').addClass("cur");
                    $(".typesWrap").hide();
                    $(".cur").parent().find('.typesWrap').show();
                    $('.accessoryNav').css('display', 'block');
                } else { //面料回填
                    $('.acc_tit, .sortA').parent().removeClass("cur");
                    $(".acc_tit").removeClass("cur");
                    $firstItem.parent().parent().parent().parent().addClass("cur");
                    $(".typesWrap").hide();
                    $(".cur .typesWrap").show();
                }

            }

            if (this.isUnion) {
                $('.typesWrap').each(function(i, n) {
                    var activeLen = $(this).find('li.active').length;
                    var $belongParent = $(this).parent();
                    if (activeLen > 0) {
                        $belongParent.addClass('selected');
                        $('.icon', $belongParent).hide();
                    } else {
                        $belongParent.removeClass('selected');
                        $('.icon', $belongParent).show();
                    }
                });
            }
        }

        this.bindEvents();

        UtilApi.validationConfig({}, function(data) {
            var valAttributes = {}; // 校验属性
            if (data && data.success == 1 && data.result) {
                valAttributes.tag = JSON.stringify(data.result['Global.tag']); //面料类型
                _this.PopupTpl = $(PopupTpl(valAttributes));
            }
        });

        Loading.hide();
    },
    bindEvents: function() {
        var doms = this.doms;
        var EventHandler = this.EventHandler;
        doms.listContainer.unbind('click').delegate('.cloth-item', 'click', EventHandler.handleClothItem);
        doms.custom.unbind('click').on('click', EventHandler.handleCustom);
        $('body').unbind('click').delegate('.poplayer-confirm', 'click', EventHandler.handleUserDefine);

        $(".nav-list .sortTit").on("click", EventHandler.tabChange);
        $(".sortAccessory").on("click", EventHandler.accessoryMenu);

        $(".accessoryNav .acc_tit").on("click", EventHandler.accessoryTags);

        doms.confirmBtn.unbind('click').on('click', EventHandler.handleConfirm);
    },
    EventHandler: {
        //选项切换
        tabChange: function(e) {
            var $this = $(e.currentTarget);
            if (!$this.hasClass('sortAccessory')) {
                $('.acc_tit, .sortA').parent().removeClass("cur");
                $(".acc_tit").removeClass("cur");
                $this.addClass("cur");
                $(".typesWrap").hide();
                $(".typesWrap", ".cur").show();
            }
        },

        //辅料下拉
        accessoryMenu: function(e) {
            var $this = $(e.currentTarget);
            //$this.siblings("li").removeClass("cur");
            var status = $this.attr('data-status');
            if ('on' == status) {
                $this.attr('data-status', 'off');
                if ($('.acc_tit.cur', '.accessoryNav').length > 0) {
                    $('dt', '.accessoryNav').css('display', 'none');;
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
        },
        //辅料下拉子菜单选择
        accessoryTags: function(e) {
            var $this = $(e.currentTarget);
            $('.sortAccessory, .sortTit').removeClass("cur");
            //.removeClass("selected");
            $(".acc_tit").removeClass("cur");
            $this.addClass("cur");

            //$this.parent().siblings("dt").removeClass('selected');
            //$this.parent().addClass('selected');
            $(".typesWrap").hide();
            $this.parent().find('.typesWrap').show();
        },

        /**
         * 属性点击事件处理
         */
        handleClothItem: function(e) {
            var $this = $(e.currentTarget);
            var key = $this.parent().parent().attr('data-id');
            var value = $this.text();

            if (!$this.hasClass('active')) {
                $this.addClass('active');
            } else {
                $this.removeClass('active');
            }
            if (List.isUnion) {
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

        },
        /**
         * 打开添加自定义属性弹出层
         */
        handleCustom: function(e) {
            var $this = $(e.currentTarget);
            var key = $this.attr('data-parentId');
            List.userDefineKey = key;

            Poplayer.showInteract({
                contentHtml: List.PopupTpl,
            });
            $('.confirm-wrap').css({
                'top': '0%',
                'margin-top': '50px'
            });

            var validateOptions = {
                container: List.PopupTpl,
                auto: false
            };

            Validator.init(validateOptions); //校验此容器内data-validate属性为true的节点

        },
        /**
         * 确认添加自定义属性
         */
        handleUserDefine: function(e) {

            var validateOptions = {
                container: List.PopupTpl,
                auto: false
            };
            Validator.init(validateOptions); //校验此容器内data-validate属性为true的节点
            var errorNum = $('[data-status="false"]').length;
            if (errorNum > 0) {
                return false;
            }

            var value = $('.poplayer-element-value').val();
            if (value && value.length > 0) {
                var isExist = false;
                $('.cloth-item').each(function() {
                    var $this = $(this);
                    var itemValue = $this.text();
                    if (value == itemValue) {
                        $this.addClass('active');
                        isExist = true;
                    }
                });

                if (isExist) {
                    Poplayer.destory();
                    return;
                }

                ClothApi.saveTag({
                    pid: List.userDefineKey,
                    tag: value
                }, function(data) {
                    if (1 == data.success) {
                        var item = '<li class="cloth-item active" data-id="' + data.id + '">' + value + '</li>';
                        $('[data-parentId=' + List.userDefineKey + ']').before(item);
                        $('.poplayer-element-value').val('');
                    }
                })
            }
            Poplayer.destory();
        },
        /**
         * 确认提交
         */
        handleConfirm: function(e) {
            var category = $('.cur').attr('data-category');

            if ('面料' == category) {
                sessionStorage.setItem('category', 'cloth');
            } else {
                sessionStorage.setItem('category', 'accessories');
            }

            var choosedTags = [];
            if ('updateProperty' === List.action || 'regSeller' === List.options.comeFrom || List.options.shopId) {
                $('.cloth-item.active').each(function() {
                    var tagItem = {
                        id: $(this).attr('data-id'),
                        name: $(this).text(),
                        parentName: $(this).parent().parent().parent().attr('data-parentName')
                    };
                    choosedTags.push(tagItem);
                });
            } else {
                if ('辅料' == category) {
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

            }
            Tools.setCache({
                type: 'sessionStorage',
                key: 'choosedTags',
                value: choosedTags,
                dataType: 'json'
            });

            var tagsIds = '';
            var tagsNames = [];
            var len = choosedTags.length;

            $.each(choosedTags, function(i, n) {
                tagsIds += n.id + ',';

                var isExist = false;
                for (var m in tagsNames) {
                    if (tagsNames[m] == n.parentName) {
                        isExist = true;
                    }
                }
                if (!isExist) {
                    tagsNames.push(n.parentName);
                }
            });

            if (List.action && List.action == 'updateProperty') {
                Poplayer.showAlert({
                    msg: '更新中...'
                });
                UserApi.updateUser({ //更新档口主营类型
                    tags: tagsIds
                }, function(data) {
                    if (data.success == 1) {
                        Poplayer.destory();
                        Poplayer.showAlert({
                            msg: '更新成功...',
                            isClickHide: true
                        });
                        sessionStorage.removeItem('choosedTags');
                        history.back();
                    } else {
                        data.msg && Poplayer.showAlert({
                            msg: data.msg,
                            isClickHide: true
                        });
                    }
                });
            } else if (List.options.comeFrom === 'regSeller') {
                List.regShopInfo = List.regShopInfo || {};
                List.regShopInfo.tags = tagsIds;
                List.regShopInfo.tagsNames = tagsNames.length > 1 ? tagsNames.join('、') : tagsNames[0] ? tagsNames[0] : '';

                Tools.setCache({
                    type: 'sessionStorage',
                    key: 'regShopInfo',
                    value: List.regShopInfo,
                    dataType: 'json'
                });
                history.back();
            } else {
                history.back();
            }
        }
    }
};

module.exports = List;
