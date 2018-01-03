<template>
  <section class="section-box">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1, user-scalable=no;" name="viewport" />
    <div class="uglyTitle">
      <div class="toLeft">
        <img src="../../assets/iconToLeft.png" @click="toLeftClick" width="30" height="30"></img>
      </div>
      <div class="titleTitle">借款合同</div>
    </div>
    <div style="overflow:hidden;padding-top:55px;">
      <!-- <div class="hidden-box"></div>   -->
      <div class="contractBody">
        <div class="title">
          <h1>保理用户服务协议</h1>
        </div>
        <div class="numberMsg">
          <span>长期购销合同编号：【】</span>
        </div>
        <div class="numberMsg">
          <span>订单编号：【{{number}}】</span>
        </div>
        <div class="companyMsg">
          <span>用户（公司名称：【{{contractMsg.company}}】， 公司地址及邮编：【{{contractMsg.province}}{{contractMsg.city}}{{contractMsg.area}}{{contractMsg.addr}}】， 法人代表名字【{{contractMsg.corporation.name}}】， 法人代表手机号【{{contractMsg.corporation.mobilePhone}}】） 通过【搜芽】网站平台（www.soouya.com,以下简称“网站平台”） 点击确认本《网化商城保理用户服务协议》（以下统称“本协议”）， 即表示用户已清晰知悉并充分理解本协议的各项条款， 并同意与【深圳松岚鼎礼商业保理有限公司】（以下统称“保理商”） 签订本协议并接受本协议的约束。
          </span>
        </div>
        <div class="detal">
          <h2>第一条&nbsp定义</h2>
          <span>
            1.1保理赊销：指用户在网站平台向交易对手购买商品或服务时， 由保理商为用户提供授信服务， 交易对手据此接受用户通过赊销方式向其支付购买价款（以下统称“应收账款”）， 并将赊销所产生应收账款转让给保理商的交易模式（以下简称“本业务”）。
          </span>
          </br>
          <span>
            1.2保理费用：指保理商在保理赊销交易模式下所需收取的保理服务费用， 该保理费用将由销售商品或服务并提供赊销账期的网站平台承担。
          </span>
          </br>
          <span>
            1.3交易订单：指用户通过网站平台向交易对手购买商品或服务的购买合约， 在本协议项下该交易订单特指通过赊销方式进行付款的购买合约， 即【《搜芽代购服务协议》】（以下简称“基础协议”）。
          </span>
          </br>
          <span>
            1.4还款日：指根据交易订单，用户支付应支付购买价款等应付款项的具体日期； 若用户未按期、足额支付的，将视为用户逾期。
          </span>
          </br>
          <span>
            1.5违约金：违约金费率为0.075%／日，按照实际逾期天数计收。 违约金＝逾期天数＊逾期费率＊应收帐款转让价款
          </span>
          </br>
          <span>
            1.6应付款项：指用户应在还款日及其后随时支付归还的交易订单项下的购买价款、 违约金及其他款项（包括但不限于债权实现费用， 如诉讼费、律师费、催收费用等，如有）的金额总和。
          </span>
          </br>
        </div>
        <div class="detal">
          <!--待嵌入一个表格  -->
          <h2>第二条&nbsp还款明细</h2>
          <table style="border-collapse:collapse" border="1" border-spacing="0">
            <tr>
              <th style="font-weight:500">项目</th>
              <th style="font-weight:500">内容</th>
            </tr>
            <tr>
              <td>应收账款金额</td>
              <td>{{tableData.money | formatMoney}}</td>
            </tr>
            <tr>
              <td>应收账款到期日</td>
              <td>{{timeFormat(tableData.expectedRepaymentTime)}}</td>
            </tr>
            <tr>
              <td>应收账款转让价款</td>
              <td>{{this.tableData.money | formatMoney}}</td>
            </tr>
            <tr>
              <td>保理服务天数</td>
              <td>{{tableData.factoringDate}}天</td>
            </tr>
            <tr>
              <td>保理服务费收取方式</td>
              <td>由债权人承担，保理商每月定期向债权人收取</td>
            </tr>
          </table>
          <h3>备注:</h3>
          <span>（1）应收账款到期日：基础协议中债权人与债务人约定的到期支付日</span>
          </br>
          <span>（2）应收账款转让日：基于基础协议，债权人向保理商发起应收账款债权转让申请的日期</span>
          </br>
          <span>（3）应收账款转让价款＝转让日当天应收账款金额＊100%</span>
          </br>
          <span>（4）保理服务天数=应收账款到期日-转让价款支付日</span>
          </br>
          <span>（5）保理服务费金额＝应收账款转让价款＊保理服务天数＊保理服务费率／360</span>
          </br>
        </div>
        <div class="detal">
          <h2>第三条&nbsp信用审核</h2>
          <span>
            3.1 用户同意通过网站平台向保理商及其指定服务商提供本业务所需的一切信息、资料， 并保证其所提供的信息、资料均为合法、真实、有效，不存在任何虚假、遗漏和隐瞒， 并授权网站平台、保理商及其指定服务商做一切必要之信用信息采集和使用 （具体详见用户确认签署的《个人信用咨询和管理服务条款》、《企业信用咨询和管理服务条款》）。
          </span>
          </br>
          <span>
            3.2 保理商将根据用户提供的上述信息和资料以及被授权采集的所有信用信息并对用户的信用状况进行查询 、核实和大数据运算， 并据此确定用户可用于赊销支付的授信额度。
          </span>
          </br>
        </div>
        <div class="detal">
          <h2>第四条&nbsp交易订单项下应收账款转让</h2>
          <span>
            4.1用户理解并同意， 根据保理商与交易对手之间达成的《保理服务协议》， 保理商将在交易对手处受让用户使用赊销方式付款的每笔交易订单项下的应收账款。 即在用户所提交的交易订单被交易对手及保理商一致确认接受后， 该等交易订单项下应收账款将自用户“提交订单”且生成订单编号时 （具体以网站平台所显示的交易订单状态为准）即从交易对手转让至保理商， 用户已预先知晓并同意上述应收账款转让安排， 且无须交易对手及/或保理商另行通知用户。
          </span>
          </br>
          <span>
            4.2上述应收账款自交易对手转让至保理商时， 保理商即对用户享有债权， 用户到期应主动向保理商偿付该应收帐款债务。
          </span>
          </br>
          <span>
            4.3若用户全部或部分退货的， 则用户同意交易对手将相应金额的退款直接支付给保理商。
          </span>
          </br>
        </div>
        <div class="detal">
          <h2>第五条&nbsp还款条款</h2>
          <span>
            5.1用户应承担如下还款义务：</br>
            （1）用户应按时足额向保理商支付购买价款；</br>
            （2）如发生逾期还款，用户需按本协议约定向保理商支付违约金及相关费用；
          </span>
          </br>
          <span>
            5.2用户应在还款日【16:00】前通过【网银转账】方式将全部应付款项支付至网站平台指定的如下收款账户：</br>
            （1）开户名称：【深圳市微视觉科技有限公司广州分公司】</br>
            （2）开户银行：【中国工商银行】</br>
            （3）银行账号：【3602 1860 0910 0025 713】</br>
            网站平台代收还款资金后，转付至保理商指定的如下收款账户：</br>
            （1）开户名称：【深圳松岚鼎礼商业保理有限公司】</br>
            （2）开户银行：【招商银行金沙江路支行】</br>
            （3）银行账号：【7559 2920 8210 402】
          </span>
          </br>
          <span>
            5.3在如下任一情况下，保理商有权要求用户提前还款：</br>
            （1）用户未按期、足额向保理商支付任一笔应付款项的；</br>
            （2）保理商发现用户在网站平台的交易订单存在虚假交易或发生异常现象；</br>
            （3）用户在网络平台的注册用户资格终止的；</br>
            （4）用户在本协议之外存在其他逾期或被要求提前还款情形的；</br>
            （5）用户发生其他重大不利变化或事件（包括但不限于遭受行政处罚、仲裁诉讼以及存在合同违约等），已经或可能影响用户履约能力的。
          </span>
          </br>
        </div>
        <div class="detal">
          <h2>第六条&nbsp逾期还款</h2>
          <span>
            6.1若用户逾期还款， 则就逾期归还的应收账款自逾期之日起， 按本协议第二条还款明细所约定的逾期费率按日计收违约金， 直至全部清偿完毕之日止。
          </span>
          </br>
          <span>
            6.2若用户逾期还款， 则保理商有权自行或委托第三方机构对用户进行催收， 包括但不限于采取电话通知、上门通知、 律师函通知以及对用户提起诉讼等方式对用户逾期行为进行违约提醒以及催收工作。
          </span>
          </br>
          <span>
            6.3若用户逾期还款， 用户不可撤销地授权保理商（自行或通过网站平台）在用户到期应付款项的范围内， 随时扣划用户任意账户资金， 包括但不限于用户网站平台账户、用户指定还款关联账户， 以及用户名下其他资金账户内的任何资金, 用于归还用户到期应付款项， 该等划扣无须用户另行同意。
          </span>
          </br>
          <span>
            6.3若用户对任何一笔应付款项逾期满30日的， 则用户不可撤销地授权保理商在网站平台的协助下， 采取一切必要之措施和手段， 包括但不限于：保全和处置用户在网站平台任一订单下所购买的商品或服务， 用于归还用户到期应付款项， 该等保全和处置无须用户另行同意。
          </span>
          </br>
          <span>
            6.4 用户在此充分知悉， 保理商有权将用户的逾期账款以债权转让的方式让渡给第三方机构， 第三方机构在受让该等逾期债权并适当通知用户后， 即有权以债权人的名义向用户进行催收， 并采取一切必要的法律措施以实现其债权。
          </span>
          </br>
        </div>
        <div class="detal">
          <h2>第七条&nbsp声明保证</h2>
          <span>
            7.1 本协议双方均具有签订和履行本协议的资格和能力，并可独立地作为一方诉讼主体。
          </span>
          </br>
          <span>
            7.2 用户签订本协议已获得所有必需的授权或批准， 签订和履行本合同不违反用户作为签约一方的任何协议以及相关法律法规的规定， 与用户应承担的其他合同项下的义务均无抵触。
          </span>
          </br>
          <span>
            7.3 用户为网站平台注册用户，且在网站平台的交易订单真实、有效，不存在任何虚假交易。
          </span>
          </br>
          <span>
            7.4 用户应妥善保管其在网站平台上的账户名和密码， 对于因密码泄露所致的损失，由用户自行承担； 任何以用户账户名和密码登录网站平台后的所有行为均视为用户自身行为， 该等行为的法律后果均由用户承担。
          </span>
          </br>
          <span>7.5 用户有足够的偿债能力归还本协议项下的应付款项。</span>
          </br>
          <span>
            7.6 用户提供的所有信息和资料都是真实、准确、完整和有效的， 不存在虚假记载、重大遗漏或误导性陈述。
          </span>
          </br>
        </div>
        <div class="detal">
          <h2>第八条&nbsp通知</h2>
          <span>
            8.1 本协议任何一方根据本协议约定做出的通知和/或文件均应以书面形式做出， 或者通过网站平台指定的方式进行沟通和传递。
          </span>
          </br>
          <span>
            8.2 若用户更改其联系方式， 应立即登陆网站平台账户提交变更申请并完成变更， 否则因此造成的一切相关责任均应由用户自行承担。 若其他各方更改其联系方式， 可通过在网站平台发布公告等方式进行变更通知。
          </span>
          </br>
        </div>
        <div class="detal">
          <h2>第九条&nbsp违约责任</h2>
          <span>
            9.1 任何一方实质性违反本协议的条款， 或未能在任一实质方面履行其在本协议下的义务， 且在收到另一方要求补救的书面通知后5日内未能补救上述违约或不履约行为， 则构成对本协议的违约。
          </span>
          </br>
          <span>
            9.2 任何一方在本协议下的承诺、声明或保证在任一实质方面被证明是虚假的或具误导性的， 则亦构成对本协议的违约。
          </span>
          </br>
          <span>
            9.3 若任一方违反本协议， 其应就违约行为对另一方造成的任何及全部损害承担赔偿责任， 但本协议另有约定的除外。
          </span>
          </br>
          <span>
            9.4 用户在此同意并确认，在用户出现逾期还款的情况下，保理商及/或网站平台均有权采取如下措施：</br>
            （1）将用户逾期记录、恶意行为或不良情况提供给中国人民银行个人信用信息基础数据库及信贷征信主管部门批准建立的个人信用数据库， 以供有关单位、部门或个人依法查询和使用； </br>
            （2）将用户违约失信的相关信息及用户其他信息向包括但不限于媒体、用人单位、公安机关、检查机关、法律机关及有关逾期款项催收服务机构披露； </br>
            （3）以各种通讯手段（包括但不限于：电话、短信、微信等各种通讯手段）告知用户的近亲属、朋友用户的欠款信息， 并在网站平台或其他报纸、网站上发布用户的欠款信息， 信息内容包括但不限于用户的姓名、身份证号码、住址、工作单位、照片、欠款金额、逾期时间及违约责任等。
            </br>
          </span>
          </br>
        </div>
        <div class="detal">
          <h2>第十条&nbsp信息保护</h2>
          <span>
            10.1 保理商应采取必要措施保护用户信息及资料， 但基于本协议履行之目的， 用户同意，保理商有权收集、保存和使用用户在本协议项下所提供或形成的个人相关信息和资料， 且在遵循合理、必要的原则下， 可将该等信息和资料提供给有必须知晓的第三方。
          </span>
          </br>
          <span>
            10.2 未经保理商事先书面同意， 用户不得将本协议项下的任何信息披露给任何第三方或在本协议之外使用。
          </span>
          </br>
        </div>
        <div class="detal">
          <h2>第十一条&nbsp不可抗力</h2>
          <span>
            11.1 如由于战争、骚乱、恐怖主义、自然灾害、国家法律法规、规章或政策变动、网站平台网络瘫痪、停电、通信线路被人为破坏， 导致各方或一方不能履行或不能完全履行本协议项下有关义务时， 受影响方不承担违约责任， 但应立即将事件情况书面通知对方。 按照事件对协议的履行的影响程度， 由各方协商决定是否继续履行或终止协议。
          </span>
          </br>
          <span>
            11.2如因政府管理部门颁布、变更的法令、政策导致任何一方不能提供本协议约定的服务， 不应视为违约， 各方应根据相关的法令、政策变更合同内容。
          </span>
          </br>
        </div>
        <div class="detal">
          <h2>第十二条&nbsp法律适用和争议解决</h2>
          <span>
            12.1本协议的签订、履行、终止、解释均适用中华人民共和国法律。
          </span>
          </br>
          <span>
            12.2所有因本合同引起的或与本合同有关的任何争议将通过双方友好协商解决。 如果双方不能通过友好协商解决争议，则任何一方均可向有管辖权的人民法院起诉。
          </span>
          </br>
          <span>
            12.3 诉讼进行过程中，各方将继续履行本合同未涉诉讼的其它部分。
          </span>
          </br>
        </div>
        <div class="detal">
          <h2>第十三条&nbsp其他约定事项</h2>
          <span>
            借款人承诺：如借款人不能按照协议约定履行或不完全履行还款义务时， 借款人将自愿接受人民法院的强制执行措施。
          </span>
          </br>
          <span>
            乙方应妥善保管其在搜芽平台的账户名和密码， 对于因密码泄露所致的损失，由乙方自行承担； 任何以乙方的账户名和密码登录搜芽平台后的所有行为均视为乙方自身行为， 该等行为的法律后果均由乙方承担。
          </span>
          </br>
          <span>
            若乙方在搜芽平台的交易订单存在虚假交易或发生异常现象的， 或者乙方在搜芽平台的注册用户资格终止的， 则甲方有权要求本合同项下已发放的部分或全部借款提前到期， 停止发放任何未发放的借款。
          </span>
          </br>
        </div>
        <div class="detal">
          <h2>第十四条&nbsp其他条款</h2>
          <span>
            13.1本协议各条标题仅为提示之用，应以条文内容确定双方的权利义务。
          </span>
          </br>
          <span>
            13.2本协议中部分条款根据相关法律法规等的规定成为无效，或部分无效时， 该等无效不影响本协议项下其他条款的效力，双方仍应履行其在本协议项下义务。
          </span>
          </br>
          <span>
            13.3双方可以书面协议方式对本协议做出修改和补充。 经过双方确认签署的有关本协议的修改协议和补充协议是本协议组成部分， 具有与本协议同等的效力。
          </span>
          </br>
          <span>
            13.4本协议自用户通过网站平台在线点击确认后， 即表示用户已清晰知悉并充分理解本协议的各项条款， 同意与保理商签订本协议并接受本协议的约束。 但用户在线点击确认本协议后并不导致本协议立即生效， 本协议自【交易订单项下的应收账款由交易对手转让至保理商】时，本协议才宣告正式生效； 本协议有效期截至本协议交易订单项下的应付款项被全部清偿之日止。
          </span>
          </br>
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
      contractMsg: {
        corporation: {}
      }, // 采购商信息
      tableData: {
        money: 0,
        expectedRepaymentTime: '',
        factoringDate: 0,
      },
      customerId: '',
      number: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    toLeftClick() {
      window.history.go(-1)
    },
    getData() {
      // console.log(this.$route.query)
      this.tableData.money = this.$route.query.money
      this.number = this.$route.query.number
      this.tableData.expectedRepaymentTime = Number(this.$route.query.expectedRepaymentTime)
      this.calDate()
      this.customerId = this.$route.query.id
      // this.customerId = '549d3cbf-43a7-4deb-9cd9-eca53feed28d' // 临时代码
      newRequest({
        url: '/soouya/oms/customer/' + this.customerId,
        method: 'get',
        data: {},
      }).then((res) => {
        console.log(res)
        if (res.success == 1) {
          this.contractMsg = res.obj
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge); }
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__bridge_loaded__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    },
    calDate() {
      // 到期日处理
      var exDate = new Date(this.tableData.expectedRepaymentTime)
      var exY = exDate.getFullYear()
      var exM = exDate.getMonth() + 1
      var exD = exDate.getDate()
      // 当天时间处理
      var nowDate = new Date()
      var nowY = nowDate.getFullYear()
      var nowM = nowDate.getMonth() + 1
      var nowD = nowDate.getDate()
      // 比较
      var exstr = new Date(exY, exM - 1, exD)
      var nowstr = new Date(nowY, nowM - 1, nowD)
      var comDate = (exstr - nowstr) / (1000 * 60 * 60 * 24)
      this.tableData.factoringDate = comDate
    },
    timeFormat(data) {
      // console.log(data)
      // console.log(typeof data)
      let date = new Date(data)
      // console.log(date)
      if (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        var d = date.getDate();
      }
      return y + '-' + m + '-' + d
    },
  }
}
</script>

<style scoped>
.section-box{
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.uglyTitle {
  background-color: #383A3E;
  height: 55px;
  border-bottom: 1px solid;
  width: 100%;
  text-align: center;
  display: inline-block;
  line-height: 60px;
  position: fixed;
  z-index:2;
  top:0px;
  left: 0px;
}

.uglyTitle .toLeft {
  margin-top: 12.5px;
  width: 30px;
  height: 30px;
  float: left;
  position: absolute;
}

.uglyTitle .titleTitle {
  font-size: 104%;
  text-align: center;
  font-weight: 600;
  color: #fff;
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
}
 
.hidden-box{
  height: 55px;
  overflow: hidden;
  width:100%;
  display: block;
  top: 0px;
  left: 0px;
  
} 

.contractBody {
  height:100%;
  background-color: #FEFEFE;
  color: #656565;
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
  width: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.title {
  margin-top: 5px;
  padding-top: 5px;
  padding-left: 15px;
  padding-right: 15px;
  text-align: center;
}

.title>h1 {
  color: #656565;
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
  font-size: 35px;
}

.numberMsg {
  margin-top: 20px;
  text-align: right;
  padding-right: 15px;
}

.numberMsg>span {
  color: #656565;
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
  font-size: 17px;
}

.companyMsg {
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 20px;
  text-indent: 2em;
}

.companyMsg>span {
  color: #656565;
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
  font-size: 14px;
}

.detal {
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
  padding-top: 10px;
}

.detal>h2 {
  color: #656565;
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
  font-size: 25px;
  padding-bottom: 10px;
}

.detal>h3 {
  color: #656565;
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
  font-size: 20px;
  padding-bottom: 7px;
  padding-top: 7px;
}

.detal>span {
  color: #656565;
  font-family: "Helvetica Neue", Helvetica, Tahoma, STHeiTi, Simhei, sans-serif;
  font-size: 14px;
}

.detal>table {
  text-align: left;
  width: 90%;
}

.detal>table tr:nth-child(even) {
  background-color: #f5f5f5;
}
</style>
