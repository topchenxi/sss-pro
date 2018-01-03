<template>
  <section>
    <div class="content box" v-for="list in cutData.productNumberList">
      <h4>商品信息</h4>
      <table class="custom-table">
        <tr>
          <th>{{list.category === 0 ? '品名' : '货号'}}</th>
          <th>{{list.category === 0 ? '颜色' : '色号'}}</th>
          <th>单价</th>
          <th>成本单价</th>
          <th>数量</th>
          <th>采购数量</th>
        </tr>
        <tr v-for="item in list.colors">
          <td>{{list.number}}</td>
          <td>{{item.color}}
            <span style="color:#f00">
              <!-- <template v-if="item.status == 1">(测试)</template> -->
              <template v-if="item.status == 0">(无货)</template>
            </span>
          </td>
          <td>
            <span v-if="cutData.type == 3">{{item.salePriceMoney}}{{item.followerPriceUnit}}</span>
            <span v-if="cutData.type == 1">{{item.followerPriceMoney}} {{item.followerPriceUnit}}</span>
          </td>
          <td>
            <span v-if="cutData.type == 3">{{item.followerPriceMoney}}{{item.cutterPriceUnit}}</span>
            <span v-if="cutData.type == 1">{{item.cutterPriceMoney}}{{item.cutterPriceUnit}}</span>
          </td>
          </td>
          <td>{{item.followerQuantity}}{{item.followerQuantityUnit}}</td>
          <td>{{item.cutterQuantity}}{{item.cutterQuantityUnit}}</td>
        </tr>
        <tr>
          <td colspan="6">
            <div class="left-img">
              <label>图片：</label>
              <article class="media imgShow" v-if='list.imgUrls && list.imgUrls.length'>
                <a :href="'http://test.soouya.com'+val" class="image media-left" v-lightbox="list.imgUrls" v-for="val in list.imgUrls">
                  <img :src="'http://test.soouya.com'+val+'@200h_200w_1e'" alt="Image" width="40" height="40">
                </a>
              </article>
            </div>
            <div class="right-info">
              <span>品类：{{list.category == 0 ? '辅料' : '面料'}}</span>
              <span>采购总数：{{list.colors | countCutterQuantity}}</span>
              <span>成本货款：{{list.colors | countCutterPriceMoney}}元 |</span>
              <span>服务费单价：{{list.price | formatMoney}}{{list.priceUnit}}</span>
              <span>服务费：{{list.colors | countServiceMoney(list.price)}}元</span>
              <span>采购商税款：{{cutData.taxMoney | formatMoney}}元</span>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </section>
</template>
<script>
export default {
  props: ['cutData'],
  data() {
    console.log(this.cutData)
    return {}
  },
  filters: {
    formatMoney(val) {
      let result = '--'
      if (val !== null && val >= 0) {
        result = Number(val).toFixed(2) + '元'
      }
      return result
    },
    countCutterQuantity(colors) {
      console.log(colors)
      let countQuantity = colors.reduce((acc, val) => {
        return acc + val.cutterQuantity
      }, 0)
      return countQuantity + colors[0].cutterQuantityUnit
    },
    countCutterPriceMoney(colors) {
      let countPriceMoney = colors.reduce((acc, val) => {
        return acc + val.cutterQuantity * val.cutterPriceMoney
      }, 0)
      return countPriceMoney
    },
    countServiceMoney(colors, servicePrice) {
      let countServiceMoney = colors.reduce((acc, val) => {
        return acc + val.cutterQuantity * servicePrice
      }, 0)
      if (countServiceMoney < 0) {
        countServiceMoney = '--'
      }
      return countServiceMoney
    }
  }
}
</script>
<style lang="scss" scoped>
.checkAccountDetail {
  .is-64x64 {}
  .el-table td {
    position: inherit;
  }
  p {
    margin: 10px 0;
  }
  h1 {
    font-size: 20px;
  }
  h4 {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 18px;
  }
  .custom-table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #ccc;
    border-bottom: 0;
    border-right: 0;
    border-collapse: separate;
    table-layout: fixed;
    text-align: left;
    margin-bottom: 20px;
    th {
      white-space: nowrap;
      overflow: hidden;
      background-color: #fff;
      height: 20px;
      line-height: 40px;
      text-overflow: ellipsis;
      vertical-align: middle;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      box-sizing: border-box;
      color: #1f2d3d;
      padding: 0 10px;
    }
    tr {
      height: 35px;
    }
    td {
      padding: 5px 10px;
      font-size: 14px;
      position: relative;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      min-width: 0;
      min-width: 100px;
      text-overflow: ellipsis;
      vertical-align: middle;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      label {
        display: inline-block;
        vertical-align: top;
        line-height: 40px;
      }
      span {
        padding-right: 10px;
      }
      p {
        display: inline-block;
        padding-right: 10px;
      }
      .imgShow {
        display: inline-block;
        a {
          margin-right: 5px;
        }
      }
      .left-img {
        float: left;
      }
      .right-info {
        float: right;
        line-height: 40px;
      }
    }
  }
}
</style>
