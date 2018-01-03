<template>
  <div class="detail">
    <div class="detail-title">
      <span @click="$router.go(-1)"></span>
      <p>详情</p>
    </div>
    <div class="check-wrap">
      <h5>订单信息</h5>
      <div class="line"></div>
      <dl>
        <dt>订单号:</dt>
        <dd>{{orderInfo.serviceNumber}}</dd>
      </dl>
      <dl>
        <dt>采购商:</dt>
        <dd>{{orderInfo.customerCompany}}</dd>
      </dl>
      <dl>
        <dt>收货地址:</dt>
        <dd>
          <span>{{orderInfo.addressName}}</span>
          <span>{{orderInfo.addressTel}}</span>
          <span>{{orderInfo.addressProvince}}{{orderInfo.addressCity}}{{orderInfo.addressArea}}{{orderInfo.addressAddr}}</span>
        </dd>
      </dl>
      <dl class="mb30">
        <dt>快递单:</dt>
        <dd>
          <div class="imgs" v-if="orderInfo.expressUrls && orderInfo.expressUrls.length > 0">
            <a :name="index" :href="`http://www.soouya.com` + item" :key="item" v-lightbox="orderInfo.expressUrls" v-for="(item, index) in orderInfo.expressUrls">
                <img :src="'http://www.soouya.com' + item" alt="找版图片" width="86" height="86">
              </a>
          </div>
        </dd>
      </dl>
      <h6>商品要求</h6>
      <div class="line"></div>
      <div class="info">
        <div class="img" v-if="orderInfo.colorUrls && orderInfo.colorUrls.length > 0">
          <a :name="index" :href="`http://www.soouya.com` + item" :key="item" v-lightbox="orderInfo.colorUrls" v-for="(item, index) in orderInfo.colorUrls">
                <img :src="'http://www.soouya.com' + orderInfo.colorUrls[0]" alt="找版图片" v-show="index == 0" width="235" height="235">
              </a>
          <p>({{orderInfo.colorUrls.length}}张)</p>
        </div>
        <div class="content">
          <div class="item">
            <div class="col">
              品类：{{orderInfo.productType | productTypeFilter}}
            </div>
            <div class="col">
              换卡头：{{orderInfo.changeCard | changeCardFilter}}
            </div>
          </div>
          <div class="item">
            <div class="col">
              提案：{{orderInfo.motion | motionFilter}}
            </div>
            <div class="col">
              档次：{{orderInfo.worth | worthFilter}}
            </div>
          </div>
          <div class="item">
            <div class="col">
              寻样要求：{{orderInfo.findType | findTypeFilter}}
            </div>
            <div class="col">
              颜色要求：{{orderInfo.color}}
            </div>
          </div>
          <div class="item">
            <div class="col">
              是否有实版：{{orderInfo.haveRealVersion | haveRealVersionFilter}}
            </div>
            <div class="col">
              是否收到实版：{{orderInfo.hasReceive | hasReceiveFilter}}
            </div>
          </div>
          <div class="item">
            <div class="col"><span>成分/织法/工艺：</span>
              <span>{{orderInfo.title || '--' }}</span>
            </div>
          </div>
          <div class="item">
            <div class="col">
              需求量：
              <span v-if="orderInfo.quantity">{{orderInfo.quantity}}{{orderInfo.quantityUnit}}</span>
              <span v-else>--</span>
            </div>
          </div>
        </div>
      </div>
      <h6>订单备注</h6>
      <div class="line"></div>
      <div class="mark">
        {{orderInfo.leaveMessage || '--'}}
      </div>
    </div>
    <div class="check-wrap" v-if="info && info.id">
      <h5>需求信息</h5>
      <div class="line"></div>
      <dl>
        <dt>需求号:</dt>
        <dd>{{info.number}}</dd>
      </dl>
      <dl>
        <dt>发布时间:</dt>
        <dd>{{info.createTime | date}}</dd>
      </dl>
      <dl>
        <dt>销售员:</dt>
        <dd>{{info.salesName}}/{{info.salesTel}}</dd>
      </dl>
      <dl>
        <dt>采购商:</dt>
        <dd>{{info.customerCompany}}</dd>
      </dl>
      <dl >
        <dt>收货地址:</dt>
        <dd>
          <span>{{info.addressName}}</span>
          <span>{{info.addressTel}}</span>
          <span>{{info.addressProvince}}{{info.addressCity}}{{info.addressArea}}{{info.addressAddr}}
          </span>
        </dd>
      </dl>
      <dl class="mb30">
        <dt>快递单:</dt>
        <dd>
          <div class="imgs" v-if="info.expressUrls && info.expressUrls.length > 0">
            <a :name="index" :href="`http://www.soouya.com` + item" :key="item" v-lightbox="info.expressUrls" v-for="(item, index) in info.expressUrls">
                  <img :src="'http://www.soouya.com' + item" alt="快递单"  width="86" height="86">
                </a>
            <div class="ta-c">快递单({{info.expressUrls.length}}张)</div>
          </div>
        </dd>
      </dl>
      <h6>商品要求</h6>
      <div class="line"></div>
      <div class="info">
        <div class="img" v-if="info.colorUrls && info.colorUrls.length > 0">
          <a :name="index" :href="`http://www.soouya.com` + item" :key="item" v-lightbox="info.colorUrls" v-for="(item, index) in info.colorUrls">
                <img :src="'http://www.soouya.com' + info.colorUrls[0]" alt="找版图片" v-show="index == 0" width="235" height="235">
              </a>
          <p>({{info.colorUrls.length}}张)</p>
        </div>
        <div class="content">
          <div class="item">
            <div class="col">
              品类：{{info.productType | productTypeFilter}}
            </div>
            <div class="col">
              换卡头：{{info.changeCard | changeCardFilter}}
            </div>
          </div>
          <div class="item">
            <div class="col">
              提案：{{info.motion | motionFilter}}
            </div>
            <div class="col">
              档次：{{info.worth | worthFilter}}
            </div>
          </div>
          <div class="item">
            <div class="col">
              寻样要求：{{info.findType | findTypeFilter}}
            </div>
            <div class="col">
              颜色要求：{{info.color}}
            </div>
          </div>
          <div class="item">
            <div class="col">
              是否有实版：{{info.haveRealVersion | haveRealVersionFilter}}
            </div>
            <div class="col">
              是否收到实版：{{info.hasReceive | hasReceiveFilter}}
            </div>
          </div>
          <div class="item">
            <div class="col"><span>成分/织法/工艺：</span>
              <span>{{info.title || '--'}}</span>
            </div>
          </div>
          <div class="item">
            <div class="col">
              需求量：
              <span v-if="info.quantity">{{info.quantity}}{{info.quantityUnit}}</span>
              <span v-else>--</span>
            </div>
          </div>
        </div>
      </div>
      <h6>需求备注：</h6>
      <div class="line"></div>
      <div class="mark">
        {{info.remark || '--'}}
      </div>
    </div>
    <lightbox></lightbox>
  </div>
</template>
<script>
import { getFindedDetail } from 'src/service/assessor';
import Lightbox from 'components/lightbox/lightbox'
export default {
  components: {
    Lightbox
  },
  data() {
    return {
      // 订单信息
      orderInfo: {},
      // 需求信息
      info: {}
    };
  },
  methods: {
    async getDetail(id) {
      let res = await getFindedDetail({ 'orderNumber': id });
      if (res.success !== '1') return;
      this.orderInfo = res.obj;
      this.info = res.obj ? res.obj.need : {};
      console.log(this.info);
    }
  },
  mounted() {
    this.$store.dispatch('changeload', false);
    const id = this.$route.query.id;
    if (!id) {
      this.$message.error('数据为空');
      return;
    }
    this.getDetail(id);
  },
  filters: {
    productTypeFilter(value) {
      switch (value) {
        case 1:
          return '面料';
        case 2:
          return '辅料';
        default:
          return '';
      }
    },
    motionFilter(value) {
      switch (value) {
        case 1:
          return '是';
        default:
          return '否';
      }
    },
    changeCardFilter(value) {
      switch (value) {
        case 1:
          return '是';
        default:
          return '否';
      }
    },
    haveRealVersionFilter(value) {
      switch (value) {
        case 1:
          return '有实版';
        default:
          return '无实版';
      }
    },
    hasReceiveFilter(value) {
      switch (value) {
        case 1:
          return '已收到';
        default:
          return '未收到';
      }
    },
    worthFilter(value) {
      switch (value) {
        case 1:
          return '普通';
        case 8:
          return '中';
        case 16:
          return '高';
        default:
          return '';
      }
    },
    findTypeFilter(value) {
      let findTypeList = ['找相同', '找类似', '找定做']
      let findTypeDescList = [];
      for (let i = 0; i < 3; i++) {
        if ((Number(value) & Math.pow(2, i)) === Math.pow(2, i)) {
          findTypeDescList.push(findTypeList[i]);
        }
      }
      if (!findTypeDescList.length) return '--'
      return findTypeDescList.join('/');
    }
  },
}

</script>
