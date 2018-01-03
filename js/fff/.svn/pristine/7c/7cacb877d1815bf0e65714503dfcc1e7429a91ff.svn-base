<template>
  <section class="section-box">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1, user-scalable=no;" name="viewport" />
    <!-- <div class="uglyTitle">
      <div class="toLeft">
        <img src="../../assets/iconToLeft.png" @click="toLeftClick" width="30" height="30"></img>
      </div>
      <div class="titleTitle">搜芽代垫采购商货款协议</div>
    </div> -->
    <div class="contractBody">
      <div class="title">
        <h1>搜芽代垫采购商货款协议</h1>
      </div>
      <div class="message-content">
        <div class="jiafang-content">
          <p>甲方：{{obj.company}}</p>
          <p>营业执照社会统一代码：{{obj.license}}</p>
          <p>法定代表人：{{obj.corporation.name}}</p>
          <p>联系人及联系电话：{{obj.corporation.name}}&nbsp;{{obj.corporation.mobilePhone}}</p>
          <p>指定邮箱：{{obj.corporation.email}}</p>
        </div>
        <div class="yifang-content">
          <p>乙方：深圳市微视觉科技有限公司广州分公司</p>
          <p>营业执照社会统一代码：91440105321097130R</p>
          <p>法定代表人：邓代国</p>
        </div>
        <div class="detail-content">
          <h2>鉴于</h2>
          <p>甲方作为代购服务申请人需要获得乙方的相关服务 ,现根据《中华人民共和国合同法》及其他相关法律法规的规定,双方本着诚实守信、互惠互利的原则,经平等协商就在互联网上开展电子商务合作事宜签订如下协议以兹共同遵照执行。</p>
        </div>
        <div class="detail-content">
          <h2>一、服务内容：</h2>
          <p>乙方通过自有品牌搜芽平台为甲方提供有偿的面料采购+货款垫付服务,甲方同意并确认按本合同约定接受乙方服务。</p>
        </div>
        <div class="detail-content">
          <h2></h2>
          <p></p>
        </div>
        <div class="detail-content">
          <h2>二、服务期限：</h2>
          <p>以每次甲方向乙方发出服务需求为始,[执行过程中,搜芽工作人员应当要求对方工作人员提供姓名和名片等,以确认其行为可代表甲方。]以订单完成甲方结清乙方货款为止。甲方聘用或雇佣的工作人员的行为视为甲方的行为,不以其是否签订劳动合同或其他协议为标准。</p>
        </div>
        <div class="detail-content">
          <h2>三、代垫货款内容：</h2>
          <p>1.乙方向甲方提供面料采购服务,收取约定的服务费。</p>
          <p>2.甲方因自身原因需要乙方先行垫付甲方采购的面料货款,在甲方发出垫付需求后,乙方若同意可继续走余下流程,直到订单完成甲方结清全部款项为止。</p>
          <p>3.甲方需在约定的时间内按时足额支付乙方已垫付的货款,否则每逾期一日,甲方应向乙方支付应付未付款项千分之一的违约金,且乙方有权追究甲方其他法律责任。</p>
        </div>
        <div class="detail-content">
          <h2>四、垫付货款的明细：</h2>
          <p>1.需要垫付的乙方系统订单号：{{number}}</p>
          <p>2.甲方申请乙方垫付的金额及服务费合计金额为：人民币{{money | formateNumber}}元,甲方应在双方约定的结算截止日期前将上述款项等足额支付至乙方。</p>
          <p>3.甲方承诺支付乙方垫付金额及服务费的结算日期：{{expectedRepaymentTime | formatDate}}前。</p>
        </div>
        <div class="detail-content">
          <h2>五、双方权利义务</h2>
          <p>1.乙方根据合同约定向甲方提供采购和垫付货款服务;</p>
          <p>2.甲方按照本合同约定向乙方支付其垫付的金额及服务费;</p>
          <p>3.本协议一经签订,视为甲方已确认乙方为其所前期提供的所有服务符合约定,甲方知悉自此负有向乙方支付其垫付货款和服务费的义务,且不得以任何理由任何形式抗辩该付款义务。</p>
        </div>
        <div class="detail-content">
          <h2>六、关于担保责任的补充约定</h2>
          <p>1.乙方承诺在签署本协议的同时,协调了{{obj.corporation.name}}作为承担连带责任的担保人为乙方在本协议项下的结算账期义务及违约责任。</p>
          <p>2.同时,担保人承诺对乙方在本协议项下的结算账期义务及违约责任承担担保责任。</p>
        </div>
        <div class="detail-content">
          <h2>七、违约责任</h2>
          <p>1.甲方未按本协议约定的日期按时足额向乙方结算的,每逾期一日,按应付未付款项的千分之一向乙方支付违约金。</p>
          <p>2.因甲方未按本协议约定的日期结算货款,乙方为保护自身权益为此向人民法院等主张权利而发生的律师费、公证费、评估费、诉讼费、执行费、仲裁费等一切费用由甲方承担。</p>
          <p>3.甲方出现下列任一情况的,乙方有权单方面解除协议,并要求甲方结算全部未结清款项及违约金并赔偿损失：</p>
          <p>a)甲方出现本协议下任何违约行为的;</p>
          <p>b)甲方或者担保人涉及债务诉讼或者仲裁,或者被查封、扣押或者冻结财产导致不能向乙方结算账期的;</p>
          <p>c)甲方或担保人转移、隐匿财产,或者财务状况严重恶化情况,未能按甲方要求增加担保的;</p>
          <p>d)甲方终止营业或者发生解散、撤销或破产事件;</p>
          <p>e)甲方超过结算日后15日不能结算账期的。</p>
          <p>4.本协议自生效时起即对双方具有法律约束力,甲乙双方都应认真履行、遵守,不得违反本协议的任何条款规定和本协议的整体目的和/或相关协议文本、附件的规定。</p>
          <p>5.除本协议另有约定外,违反本协议的任何条款规定和/或本协议的整体目的和相关协议文本、附件的规定即构成违约。违约方应守约方赔偿因其违约而产生的所有损失。</p>
        </div>
        <div class="detail-content">
          <h2>八、协议的生效、修改和提前终止</h2>
          <p>1.
            <strong>乙方确认已详尽明确的理解和接受了本协议的所有内容</strong>,本协议自甲方通过乙方提供的线上平台或APP移动端的确认按钮点击后即生效。</p>
          <p>2.本协议的终止并不解除双方依照本协议规定业己产生但未了结的任何责任,凡由于一方违约而致使对方遭受的一切损失,守约方仍有权提出索赔,不应受本协议终止的影响。</p>
        </div>
        <div class="detail-content">
          <h2>九、其他</h2>
          <p>1.本协议未尽事宜,由甲乙双方协商后产生书面文件,作为本合同的补充条款,具备与本合同同等法律效力;</p>
          <p>2.对本合同内容的任何修改和变更需要用书面形式,并经双方确认后生效。</p>
          <p>3.双方因本协议及履行本协议过程中发生争议的,应当友好协商解决;协商不成的,任一方可向乙方所在地人民法院提起诉讼。</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { newRequest } from 'common/utils'
export default {
  data() {
    return {
      obj: {
        corporation: {},
      },
      customerId: '',
      number: '',
      money: '',
      expectedRepaymentTime: '',
    }
  },
  mounted() {
    this.customerId = this.$route.query.id
    // this.customerId = '24d2687f-69e8-4c24-8f5f-23fad750ea0f'
    this.number = this.$route.query.number
    this.money = this.$route.query.money
    this.expectedRepaymentTime = this.$route.query.expectedRepaymentTime
    if (!this.customerId) {
      this.$message('采购商ID不能为空')
    } else {
      this.getData()
    }
  },
  methods: {
    getData() {
      newRequest({
        url: `/soouya/oms/customer/${this.customerId}`,
        method: 'get',
        data: {}
      }).then(res => {
        if (res.success == 1) {
          this.obj = res.obj
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    toLeftClick() {
      // this.closeXiMuView()
      // 判断ios android
      var u = navigator.userAgent.toLowerCase()
      var isAndroid = (u.indexOf('android') > -1) // android终端
      // var isiOS = u.indexOf('ios') > -1 // ios终端
      if (isAndroid) {
        window.app.javascriptInvoke('goback')
      } else {
        this.setupWebViewJavascriptBridge()
        // 待定
        window.WebViewJavascriptBridge.callHandler('closeXiMuView')
      }
    },
    setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge); }
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    },
  },
  filters: {
    formatDate(val) {
      let result = '--'
      if (val && Number(val) > 0) {
        val = Number(val)
        let Y = new Date(val).getFullYear()
        let M = new Date(val).getMonth() + 1
        let D = new Date(val).getDate()
        result = Y + '年' + M + '月' + D + '日'
      }
      return result
    }
  },
  beforeCreate() {
    document.title = '搜芽代垫采购商货款协议'
  }
}
</script>

<style lang="scss" scoped>
.section-box {
  height: 100%;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  text-align: center;
  background-color: #fefefe;
  .uglyTitle {
    background-color: #383A3E;
    height: 55px;
    border-bottom: 1px solid;
    width: 100%;
    text-align: center;
    display: inline-block;
    line-height: 60px;
    position: fixed;
    z-index: 2;
    top: 0px;
    left: 0px;
    .toLeft {
      margin-top: 12.5px;
      width: 30px;
      height: 30px;
      float: left;
      position: absolute;
    }

    .titleTitle {
      font-size: 104%;
      text-align: center;
      font-weight: 600;
      color: #fff;
      font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
    }
  }
  .contractBody {
    // margin-top: 55px;
    // height: calc(100% - 55px);
    height: 100%;
    background-color: #FEFEFE;
    color: #656565;
    font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
    width: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .title {
      margin-top: 5px;
      padding-top: 5px;
      padding-left: 15px;
      padding-right: 15px;
      text-align: center;
      h1 {
        font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
        font-size: 30px;
      }
    }
    .message-content {
      text-align: left;
      padding: 0px 15px;
      .jiafang-content {
        margin-top: 10px;
        margin-bottom: 5px;
        text-indent: 15px;
      }
      .yifang-content {
        margin-top: 5px;
        margin-bottom: 5px;
        text-indent: 15px;
      }
      .detail-content {
        margin-top: 5px;
        margin-bottom: 5px;
        h2 {
          font-size: 18px;
        }
        p {
          text-indent: 20px;
        }
      }
    }
  }
}
</style>
