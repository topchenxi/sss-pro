<template>
  <div>
    <title>搜芽纺织ERP系统</title>
    <div class="table-container">
      <table>
        <colgroup>
          <col width="15%" />
          <col width="6%" />
          <col width="6%" />
          <col width="6%" />
          <col width="6%" />
          <col width="6%" />
          <col width="6%" />
          <col width="6%" />
          <col width="6%" />
          <col width="6%" />
          <col width="8%" />
          <col width="6%" />
          <col width="6%" />
          <col width="11%" />
        </colgroup>
        <thead>
          <tr>
            <th colspan="3" class="ta-l order-head">
              <span class="order-head-title">海森时尚毛绒</span>
            </th>
            <th colspan="8" class="ta-c order-title"><strong>销售细码单</strong></th>
            <th colspan="3" class="ta-l order-number">订单号：{{info.number}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>客户名称</td>
            <td colspan="5">{{info.customerCompany}}</td>
            <td>联系人</td>
            <td colspan="3"></td>
            <td>下单时间</td>
            <td colspan="3">{{info.createTime | formatTime('yyyy-MM-dd HH:mm:ss')}}</td>
          </tr>
          <tr>
            <td>货物品名及规格</td>
            <td>色号</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>数量</td>
            <td>单位</td>
            <td>单价</td>
            <td>合计</td>
          </tr>
          <tr v-for="(item,index) in info.colors" :key="index">
            <td>
              <span v-if="index<1"> {{info.productNumber}}</span>
            </td>
            <td>{{item.color}}</td>
            <td colspan="8" class="p0 bdbn">
              <table>
                <colgroup>
                  <col width="12.5%">
                  <col width="12.5%">
                  <col width="12.5%">
                  <col width="12.5%">
                  <col width="12.5%">
                  <col width="12.5%">
                  <col width="12.5%">
                  <col width="12.5%">
                </colgroup>
                <tbody>
                  <tr v-for="(colItem,colIndex) in item.colspanArray">
                    <td class="bdln bdtn" :class="{'bdrn':sizeIndex%8==7,'bdbn':colIndex + 1 == item.colspanArray.length}" v-if="sizeIndex>=colIndex*8&&sizeIndex<(colIndex+1)*8" v-for="(sizeItem,sizeIndex) in item.ximashus" :key="sizeIndex">{{sizeItem}}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>{{item.quantity}}</td>
            <td>{{info.unit}}</td>
            <td>{{item.price | formatNumber}}</td>
            <td>{{item.money?item.money:0 | formatNumber}}</td>
          </tr>
          <tr>
            <td>总计</td>
            <td colspan="8" class="ta-r">共 {{totalSize}} 匹 </td>
            <td colspan="2">总数量：{{totalQuantity}}{{info.unit}}</td>
            <td colspan="3">总金额：{{info.totalMoney | formatNumber}}</td>
          </tr>
          <tr>
            <td colspan="14" class="order-tips-warp">
              <div class="input-warp">
                <span class="w80 inline">公司地址：</span>
                <input type="text" class="form-input" v-model="address1">
              </div>
              <div class="input-warp"><span class="w80 inline"></span>
                <input type="text" class="form-input" v-model="address2">
              </div>
              <h5><span class="w80 inline mb10">公司地址：</span>{{address1}}</h5>
              <h5><span class="w80 inline mb10"></span>{{address2}}</h5>
              <p>备注：请核对本后验收，如发现质量问题应于交货之日起七天内与本公司联系，协商解决一经裁剪或超出本期限，本公司概不负责；非质量问题恕不退换。谢谢合作！</p>
              <button @click="printOrder">打印码单</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import service from '@/utils/omsServices';
import {
  Message
} from 'element-ui';
export default {
  name: 'order',
  data() {
    return {
      'totalQuantity': 0,
      'totalSize': 0,
      'address1': '',
      'address2': '',
      'id': this.$route.params.id,
      info: {}
    }
  },
  methods: {
    printOrder() {
      window.print();
    },
    getDetail() {
      service.getOrderDetail(this.id).then(res => {
        if (res.success !== '1') {
          Message({
            type: 'error',
            message: res.msg,
            duration: 1000
          })
        } else {
          this.info = res.obj;
          this.address1 = '1.广州市海珠区逸景路新长江轻纺城南区五街SA304-307号';
          this.address2 = '2.江苏省徐州新沂市墨河街道徐海西路143号（墨河小学对面）';
          // 计算色号行数
          if (this.info.colors.length) {
            this.info.colors.forEach(item => {
              let newArray = item.ximashus.filter(sizeItem => sizeItem != '');
              item.ximashus = newArray;
            })
            this.info.colors.forEach(item => {
              item.money = item.money == -1 ? parseFloat(item.price || 0) * parseFloat(item.quantity || 0) : item.money;
              let colspan = Math.ceil(item.ximashus.length / 8);
              this.$set(item, 'colspanArray', []);
              item.colspanArray = Array.from(Array(colspan || 1).keys());
              item.ximashus.forEach(sizeItem => {
                this.totalSize += 1;
              })
            })
          }
          // 计算总数
          if (this.info.colors.length) {
            this.info.colors.forEach(item => {
              this.totalQuantity += item.quantity || 0;
            })
          }
        }
      })
    }
  },
  mounted() {
    this.getDetail();
  }
}

</script>
<style lang="scss">
@import "../../../common/scss/mixins/utilities";
@import "../../../common/scss/mixins/clearfix";
@import "../../../common/scss/mixins/reset";
* {
  box-sizing: border-box;
}

@font-face {
  font-family: RTWSYueGoTrial;
  src: url(font/RTWSYueGoTrial-Regular.otf);
}

.form-input,
.form-select,
.form-texteara {
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 2px;
}

.seller-logo {
  width: 155px;
  height: 44px;
  display: inline-block;
  background: url(images/dangkoulogo.png) 0 0 no-repeat;
}

.w63 {
  width: 63px !important;
}

.w64 {
  width: 64px !important;
}

.w65 {
  width: 64px !important;
}

.list-warp {
  @include clearfix;
  .item {
    float: left;
    width: 64px;
    overflow: hidden;
    border-right: 1px solid #2FB468;
    border-bottom: 1px solid #2FB468;
    padding: 10px 0px;
    text-align: center;
  }
}

.form-input {
  height: 30px;
  width: 500px;
}

.input-warp {
  margin-bottom: 10px;
}

.table-container {
  width: 1070px;
  margin: 0 auto;
  background-color: #f0f0f0;
  margin-top: 100px;
  table {
    background-color: #fff;
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    thead {
      tr {
        th {
          border: 1px solid #2FB468;
          width: 100%;
          padding: 20px 8px;
          text-align: center;
          font-size: 16px;
          color: #333333;
          strong {
            font-size: 32px;
            color: #333333;
          }
        }
        .order-head-title {
          font-family: RTWSYueGoTrial;
          font-size: 18px;
        }
        .order-number {
          border-left: 1px solid #fff;
        }
        .order-head {
          border-right: 1px solid #fff;
        }
        .order-title {
          border-left: 1px solid #fff;
          border-right: 1px solid #fff;
        }
      }
    }
    tbody {
      tr {
        td {
          border: 1px solid #2FB468;
          padding: 10px 8px;
          font-size: 14px;
          color: #333333;
          text-align: left;
          vertical-align: middle;
        }
        .order-tips-warp {
          position: relative;
          padding: 15px 8px;
          h5 {
            font-size: 14px;
            color: #333333;
            padding: 0;
            margin: 0;
            display: none;
          }
          p {
            font-size: 12px;
            color: #999999; // display: none;
          }
          button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 23px;
            display: inline-block;
            padding: 5px 21px;
            margin-bottom: 0;
            font-size: 14px;
            color: #2FB468;
            font-weight: 400;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-image: none;
            border: 1px solid #2FB468;
            border-radius: 2px;
            background-color: #fff;
          }
        }
      }
    }
  }
}

@media print {
  .order-tips-warp {
    button {
      display: none !important;
    }
    .input-warp {
      display: none;
    }
    h5,
    p {
      display: block !important;
    }
  }
}

</style>
