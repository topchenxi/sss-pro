<template>
  <div class="detail">
    <div class="detail-title">
      <span @click="$router.go(-1)"></span>
      <p>详情</p>
    </div>
    <div class="check-wrap" v-if="info && info.id">
      <div class="c-btns">
        <el-button type="primary" @click="editNeed()">编辑</el-button>
        <el-button type="primary" @click="newOrder()">新增拆单</el-button>
      </div>
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
      <dl>
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
                  <img :src="'http://www.soouya.com' + item" alt="快递单" width="86" height="86">
                </a>
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
    <div v-if="info.findList.length > 0" v-for="(order, orderIndex) in info.findList">
      <div class="check-wrap">
        <div class="c-btns">
          <el-button type="primary" @click.native="editOrder(order, orderIndex)">编辑</el-button>
          <el-button type="default" @click.native="removeOrder(orderIndex)">删除</el-button>
        </div>
        <h5>订单信息 - <span class='green'>{{orderIndex + 1 }}</span></h5>
        <div class="line"></div>
        <dl>
          <dt>订单号:</dt>
          <dd>{{order.serviceNumber}}</dd>
        </dl>
        <dl>
          <dt>采购商:</dt>
          <dd>{{order.customerCompany}}</dd>
        </dl>
        <dl>
          <dt>收货地址:</dt>
          <dd>
            <span>{{order.addressName}}</span>
            <span>{{order.addressTel}}</span>
            <span>{{order.addressProvince}}{{order.addressCity}}{{order.addressArea}}{{order.addressAddr}}</span>
          </dd>
        </dl>
        <dl class="mb30">
          <dt>快递单:</dt>
          <dd>
            <div class="pics ml10">
              <div class="imgs" v-if="order.expressUrls && order.expressUrls.length > 0">
                <a :name="index" :href="`http://www.soouya.com` + item" :key="item" v-lightbox="order.expressUrls" v-for="(item, index) in order.expressUrls">
                  <img :src="'http://www.soouya.com' + item" alt="找版图片" width="86" height="86">
                </a>
              </div>
            </div>
          </dd>
        </dl>
        <h6>商品要求</h6>
        <div class="line"></div>
        <div class="info">
          <div class="img" v-if="order.colorUrls && order.colorUrls.length > 0">
            <a :name="index" :href="`http://www.soouya.com` + item" :key="item" v-lightbox="order.colorUrls" v-for="(item, index) in order.colorUrls">
                <img :src="'http://www.soouya.com' + order.colorUrls[0]" alt="找版图片" v-show="index == 0" width="235" height="235">
              </a>
            <p>({{order.colorUrls.length}}张)</p>
          </div>
          <div class="content">
            <div class="item">
              <div class="col">
                品类：{{order.productType | productTypeFilter}}
              </div>
              <div class="col">
                换卡头：{{order.changeCard | changeCardFilter}}
              </div>
            </div>
            <div class="item">
              <div class="col">
                提案：{{order.motion | motionFilter}}
              </div>
              <div class="col">
                档次：{{order.worth | worthFilter}}
              </div>
            </div>
            <div class="item">
              <div class="col">
                寻样要求：{{order.findType | findTypeFilter}}
              </div>
              <div class="col">
                颜色要求：{{order.color}}
              </div>
            </div>
            <div class="item">
              <div class="col">
                是否有实版：{{order.haveRealVersion | haveRealVersionFilter}}
              </div>
              <div class="col">
                是否收到实版：{{order.hasReceive | hasReceiveFilter}}
              </div>
            </div>
            <div class="item">
              <div class="col"><span>成分/织法/工艺：</span>
                <span>{{order.title || '--' }}</span>
              </div>
            </div>
            <div class="item">
              <div class="col">
                需求量：
                <span v-if="order.quantity">{{order.quantity}}{{order.quantityUnit}}</span>
                <span v-else>--</span>
              </div>
            </div>
          </div>
        </div>
        <h6>订单备注</h6>
        <div class="line"></div>
        <div class="mark">
          {{order.leaveMessage || '--'}}
        </div>
      </div>
    </div>
    <div class="btn-groups ta-l mb20 pl20">
      <el-button type="default" @click.native="back()" size="small">返回</el-button>
      <el-button type="primary" @click.native="save()" size="small">保存</el-button>
      <el-button type="warning" @click.native="notify()" size="small">保存并通知找版</el-button>
    </div>
    <order-dialog v-if="addOrderFlag" :dialogStatus="addOrderFlag" :title="编辑需求" :info="dialogData" :type="'order'" @formSummit="submitOrder" @cancelDialog="cancelDialog"></order-dialog>
    <order-dialog v-if="editNeedFlag" :dialogStatus="editNeedFlag" :title="编辑订单" :info="dialogData" :type="'need'" @formSummit="submitNeed" @cancelDialog="cancelDialog"></order-dialog>
    <Lightbox></Lightbox>
  </div>
</template>
<script>
import { getNeedDetail, saveFindWaitOrderInfo, chgNeedNotify } from 'src/service/assessor';
import Lightbox from 'components/lightbox/lightbox'
import orderDialog from '../dialogs/orderDialog.vue'
// import {
//   removeArrayItem,
//   formatTimeString,
//   alertMessage
// } from 'utils/tool'
// import {
//   request
// } from 'utils/request'

export default {
  components: {
    Lightbox,
    'order-dialog': orderDialog
  },
  data() {
    return {
      id: this.$route.query.id,
      // dataList: [],
      info: {},
      typePower: [1, 2, 4],
      addOrderFlag: false,
      editNeedFlag: false,
      dialogTitle: '',
      dialogData: {},
      orderCurrentEditIndex: -1,
      noticeClass: ''
    }
  },
  mounted() {
    this.$store.dispatch('changeload', false)
    if (!this.id) {
      this.$message({
        type: 'error',
        content: '请选择需要编辑的需求单',
        onClose: () => {
          this.$route.push({ name: 'checkFindWait' })
        }
      })
      return false;
    }
    this.getDetail();
  },
  methods: {
    editOrder(order, index) {
      this.addOrderFlag = true
      this.dialogData = order
      this.orderCurrentEditIndex = index
    },
    async removeOrder(index) {
      try {
        let dlgRes = await this.$confirm('删除拆单' + (index + 1), '提示');
        if (dlgRes !== 'confirm') return;
        this.info.findList.splice(index, 1);
      } catch (e) {
        console.log(e)
      }
    },
    submitNeed(data) {
      this.info = data
      this.editNeedFlag = false
    },
    submitOrder(data) {
      data.leaveMessage = data.remark
      if (data.findList) {
        delete data.findList
      }
      if (this.orderCurrentEditIndex != -1) { // 更改
        this.info.findList[this.orderCurrentEditIndex] = data
      } else {
        if (this.info.findList == undefined) {
          this.info.findList = [];
        }
        if (this.info.findList.length >= 9) {
          this.$message.error('订单最多只能有9个')
          this.addOrderFlag = false
          this.dialogTitle = ''
          this.orderCurrentEditIndex = -1
          return false
        }
        this.info.findList.push(data)
      }
      this.noticeClass = this.info.findList.length != 1 ? '' : 'is-disabled'
      this.addOrderFlag = false
      this.dialogTitle = ''
      this.orderCurrentEditIndex = -1
    },
    cancelDialog() {
      this.editNeedFlag = false;
      this.addOrderFlag = false
    },
    editNeed() {
      this.editNeedFlag = true;
      this.dialogData = this.info;
    },
    async save() {
      try {
        let dlgRes = await this.$confirm('是否保存页面内容？', '提示');
        if (dlgRes !== 'confirm') return;
        if (this.info.haveRealVersion == 1 && this.info.hasReceive == null) {
          this.info.hasReceive = 0;
        }
        let res = await saveFindWaitOrderInfo(this.info);
        this.$message.success(res.msg);
        this.getDetail();
      } catch (e) {
        console.log(e)
      }
    },
    async notify() {
      try {
        if (this.info.findList.length == 1) {
          this.$msgbox({
            title: '提示',
            message: '请确认拆分订单至少在两个以上',
            confirmButtonText: '确定'
          })
          return false;
        }
        let dlgRes = await this.$confirm('是否保存页面内容，并通知找版？', '提示');
        if (dlgRes !== 'confirm') return;
        let res = await saveFindWaitOrderInfo(this.info);
        if (res.success !== '1') return;
        let resNotify = await chgNeedNotify({ id: this.info.id });
        this.$message.success(resNotify.msg);
        this.$router.go(-1);
      } catch (e) {
        console.log(e)
      }
    },
    async back() {
      try {
        let dlgRes = await this.$confirm('是否放弃保存本页面数据？', '提示');
        if (dlgRes !== 'confirm') return;
        this.$router.go(-1);
      } catch (e) {
        console.log(e)
      }
    },
    async getDetail() {
      let res = await getNeedDetail({ 'id': this.id });
      if (res.success !== '1') return;
      this.info = res.obj
    },
    newOrder() {
      let newData = Object.assign({}, this.info)
      delete newData.id
      delete newData.findList
      newData.hasReceive = 0
      newData.leaveMessage = this.info.remark
      this.dialogAction = 'add_order'
      this.addOrderFlag = true
      this.dialogData = newData
    }
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
