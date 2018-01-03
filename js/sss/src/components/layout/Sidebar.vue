<template>
  <div>
    <el-menu class="oms-menu" mode="vertical" :default-active="String($route.meta.index)">
      <el-menu-item-group class="oms-menu-group" :index="item.index" v-for="item in menu">
        <template slot="title">
          {{item.name}}</template>
        <router-link class="child-menu" :to="{path: val.path}" tag="a" v-for="val in item.children">
          <el-menu-item :index="val.index">
            <i class="icon" :class="'icon-'+val.icon"></i> {{val.name}}</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      defaultIndex: '0',
      menu: [{
          name: '搜芽团队管理',
          path: '/team/userManage',
          index: '0',
          icon: 'el-icon-menu',
          meta: {
            icon: 'fa-building-o',
            expanded: false,
            index: '50'
          },
          children: [{
              name: '创建用户',
              path: '/team/userManage',
              index: '0',
              icon: 'person'
            },
            {
              name: '角色管理',
              path: '/team/roleManage',
              index: '1',
              icon: 'personset'
            }
          ]
        },
        {
          name: '数据统计',
          path: '/report/jixiaoManage',
          index: '2',
          icon: 'el-icon-share',
          meta: {
            icon: 'fa-building-o',
            expanded: false,
          },
          children: [{
              name: '绩效管理',
              path: '/report/jixiaoManage',
              index: '2',
              icon: 'jixiao'
            },
            {
              name: '资金管理',
              path: '/report/moneyManage',
              index: '2-1',
              icon: 'zijin'
            }
          ]
        },
        {
          name: '商户管理',
          path: '/merchant/buyer/list',
          index: '3',
          icon: 'el-icon-view',
          meta: {
            icon: 'fa-building-o',
            expanded: false,
          },
          children: [{
              name: '采购商管理',
              path: '/customer/list',
              index: '5-2',
              icon: 'caigou'
            },
            {
              name: '供应商管理',
              path: '/seller/list',
              index: '6-2',
              icon: 'gongying'
            },
            {
              name: '供应商审核',
              path: '/shop/checkList',
              index: '6',
              icon: 'gongshen'
            }
          ]
        },
        {
          name: '审核管理',
          path: '/audit/cut/list',
          index: '4',
          icon: 'el-icon-view',
          meta: {
            icon: 'fa-building-o',
            expanded: false,
          },
          children: [{
            name: '订单审核',
            path: '/audit/find/list',
            index: '4-3',
            icon: 'order'
          }]
        },
        {
          name: '短信管理',
          path: '/outbox/code',
          index: '7',
          meta: {
            expanded: false,
          },
          children: [{
            name: '短信验证码',
            path: '/outbox/code',
            index: '7-2',
            icon: 'meg'
          }]
        }
      ]
    }
  },
  mounted() {},
  methods: {},
}

</script>
<style lang="scss">
@import 'src/static/scss/mixin/variables.scss';
.oms-menu
{
    padding: 30px 0 0 0;

    background-color: #fff;
     > .oms-menu-group
    {
        .el-menu-item-group__title
        {
            font-size: 14px;
            line-height: 40px;

            height: 40px;
            padding: 0 10px 0 36px !important;

            color: $green;
        }
         > ul
        {
            .child-menu
            {
                display: block;
                li.el-menu-item
                {
                    font-size: 14px;
                    line-height: 50px;

                    height: 50px;
                    padding: 0 10px 0 50px !important;

                    color: #bbb;
                    i
                    {
                        display: inline-block;

                        width: 16px;
                        height: 16px;
                        margin: (50px-16px)/2px 3px 0 0;

                        vertical-align: top;

                        background: url('../../static/images/person.png')center center no-repeat;
                    }
                    .icon-person
                    {
                        background-image: url('../../static/images/person.png');
                    }
                    .icon-personset
                    {
                        background-image: url('../../static/images/personset.png');
                    }
                    .icon-jixiao
                    {
                        background-image: url('../../static/images/jixiao.png');
                    }
                    .icon-zijin
                    {
                        background-image: url('../../static/images/zijin.png');
                    }
                    .icon-caigou
                    {
                        background-image: url('../../static/images/caigou.png');
                    }
                    .icon-gongying
                    {
                        background-image: url('../../static/images/gongying.png');
                    }
                    .icon-gongshen
                    {
                        background-image: url('../../static/images/gongshen.png');
                    }
                    .icon-order
                    {
                        background-image: url('../../static/images/order.png');
                    }
                    .icon-meg
                    {
                        background-image: url('../../static/images/meg.png');
                    }
                }
                li.is-active
                {
                    font-size: 14px;

                    color: $green;
                }
                li.el-menu-item:hover,
                li.is-active
                {
                    color: $green;
                    background-color: #fff;
                    .icon-person
                    {
                        background-image: url('../../static/images/person-active.png');
                    }
                    .icon-personset
                    {
                        background-image: url('../../static/images/personset-active.png');
                    }
                    .icon-jixiao
                    {
                        background-image: url('../../static/images/jixiao-active.png');
                    }
                    .icon-zijin
                    {
                        background-image: url('../../static/images/zijin-active.png');
                    }
                    .icon-caigou
                    {
                        background-image: url('../../static/images/caigou-active.png');
                    }
                    .icon-gongying
                    {
                        background-image: url('../../static/images/gongying-active.png');
                    }
                    .icon-gongshen
                    {
                        background-image: url('../../static/images/gongshen-active.png');
                    }
                    .icon-order
                    {
                        background-image: url('../../static/images/order-active.png');
                    }
                    .icon-meg
                    {
                        background-image: url('../../static/images/meg-active.png');
                    }
                }
            }
        }
    }
}

</style>
