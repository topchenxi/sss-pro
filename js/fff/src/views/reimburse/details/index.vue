<template>
  <section>
    <h2>报销详情页</h2>
  
    <template v-if="this.$route.params.type === 'cut'">
      <CutInformation></CutInformation>
    </template>
    <template v-if="this.$route.params.type === 'freight'">
      <div class="content box">
        <h4>报销信息</h4>
        <table class="custom-table">
          <tr>
            <td>报销时间：{{reimburseInfo.createTime | formatTime}}</td>
            <td>仓库员：{{reimburseInfo.creatorName}}</td>
            <td>报销类型：运费</td>
            <td>物流凭据：
              <!--<article class="media imgShow" v-if='detailData.sendCertificateList && detailData.sendCertificateList.length'>
                                      <a :href="'http://test.soouya.com'+ val" class="image media-left" v-lightbox="detailData.sendCertificateList" v-for="val in detailData.sendCertificateList">
                                        <img :src="'http://test.soouya.com'+ val +'@200h_200w_1e'" alt="Image" width="40" height="40">
                                      </a>
                                    </article>-->
            </td>
          </tr>
          <tr>
            <td>报销状态：{{reimburseInfo.status == 1 ? '待报销' : '已报销'}}</td>
            <td>报销单号：{{reimburseInfo.batchNumber}}</td>
            <td>报销方式：{{reimburseInfo.batchNumber}}</td>
            <td>仓库报销备注：{{reimburseInfo.batchNumber}}</td>
          </tr>
          <tr>
            <td colspan="4" align="left">
              财务备注：{{reimburseInfo.remark}}</td>
          </tr>
          <tr>
            <td colspan="4" align="right">
              <span style="color: #999;">（报销运费）</span>报销金额：{{reimburseInfo.xiaozhangMoney | formatMoney}}元</td>
          </tr>
        </table>
      </div>
      <orderDetail :basicData="basicData"></orderDetail>
      <DahuoInformation class="content box" :basicData="basicData"></DahuoInformation>
    </template>
    <in-reposity v-if="inReposityList.length" :inReposityList="inReposityList" :quantity="basicData.quantity"></in-reposity>
    <out-reposity :outReposityList="outReposityList" :inReposityList="inReposityList" :outData="true"></out-reposity>
    <footer class="fixed-footer" v-if="this.$route.params.status === 'undone'">
      <div>
        <el-button type="primary" @click="showReimburseDialog">报销</el-button>
        <el-button>返回</el-button>
      </div>
    </footer>
    <lightbox></lightbox>
    <ReimburseDialog :config="dialogConfig"></ReimburseDialog>
  </section>
</template>
<script>
import orderDetail from 'components/detail/orderDetail'
import reimburseApi from 'api/reimburse'
import inReposity from 'components/detail/inReposity'
import outReposity from 'components/detail/outReposity'
import Lightbox from 'components/lightbox/lightbox'
import CutInformation from 'components/detail/cutInformation'
import DahuoInformation from 'components/detail/dahuoInformation'
import ReimburseDialog from 'components/reimburseDialog.vue'

export default {
  components: {
    orderDetail,
    inReposity,
    outReposity,
    Lightbox,
    CutInformation,
    DahuoInformation,
    ReimburseDialog
  },
  filters: {
  },
  data() {
    return {
      reimburseInfo: {
        createTime: '1493030028000', // 创建时间
        handlerTime: '', // 报销日期
        creatorName: '林买货组长', // 报销人名称
        creatorTel: '13012341241', // 报销人电话
        type: 1, // 报销类型
        xiaozhangMoney: 1234, // 销账金额
        status: 1, // 报销状态
        remark: '23213123', // 财务备注
        sendCertificateList: [], // 物流凭据
        batchNumber: '12123123123' // 报销单号
      },
      basicData: {
        'orderNumber': '206720640',
        'serviceNumber': 'DLGD161221206720640',
        'createTime': 1482290525000,
        'statusDesc': '履约中',
        'category': 'all-all',
        'type': 1,
        'haveRealVersion': 1,
        'checkCloth': 1,
        'productSource': 0,
        'followerMessage': '',
        'purchaserMessage': null,
        'buyerNumber': 'C02534100',
        'buyerCompany': '上海致良服饰有限公司',
        'invoiceStatus': 1,
        'taxPoint': 8.0,
        'billingCycle': '其他',
        'follower': '李跟单',
        'followerTel': '13012341239',
        'purchaser': '林买货组长',
        'purchaserTel': '13012341241',
        'salesName': '金销售员',
        'salesTel': '13012341252',
        'needToPaySeller': 1,
        'sendType': 0,
        'madanImgUrls': [
          '/upload/redwood/madan/a590a3c0-f28c-4d92-aecc-8f21007483de.jpg'
        ],
        'sellerNumber': 'S63604505',
        'shopCompany': '测试胡金娣',
        'sellerInvoiceStatus': 1,
        'sellerTaxPoint': 8.0,
        'shopTel': '13719429786',
        'shopProvince': '广东',
        'shopCity': '广州',
        'shopArea': '海珠',
        'shopAddr': '中大轻纺交易园F区3019',
        'shopCheck': -1,
        'bankAccountUser': '121212',
        'bankAccountNumber': '1212121212121212',
        'bankAccountBank': '121',
        'bankAccountBranch': '121212',
        'bankAccountType': 2,
        'productNumber': '测试',
        'quantity': 100.0,
        'quantityUnit': '码',
        'saleMoney': 112.0,
        'costMoney': 54.0,
        'buyMoney': 54.0,
        'servicePrice': 1.0,
        'servicePriceUnit': '元/码',
        'serviceMoney': 100.0,
        'taxMoney': 12.0,
        'sellerTaxMoney': 4.0,
        'colorList': [
          {
            'color': '黄色',
            'quantity': 100.0,
            'quantityUnit': '码',
            'price': 0.5,
            'priceUnit': '元/码',
            'salePrice': 1.0,
            'salePriceUnit': '元/码',
            'buyPrice': 0.5,
            'buyPriceUnit': '元/码'
          }
        ]
      },
      inReposityList: [
        {
          'clothLoneList': [
            {
              'number': 'PH064017',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 2342.0,
              'quantityUnit': '码',
              'buchang': null,
              'buchangUnit': null
            },
            {
              'number': 'PH064018',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 2342.0,
              'quantityUnit': '码',
              'buchang': null,
              'buchangUnit': null
            }
          ],
          'createTime': 1482334499000,
          'inType': 1,
          'number': 'RC20672064015'
        },
        {
          'clothLoneList': [
            {
              'number': 'PH064008',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 25.0,
              'quantityUnit': '码',
              'buchang': 25.0,
              'buchangUnit': '码'
            },
            {
              'number': 'PH064005',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 22.0,
              'quantityUnit': '码',
              'buchang': 22.0,
              'buchangUnit': '码'
            },
            {
              'number': 'PH064004',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 21.0,
              'quantityUnit': '码',
              'buchang': 21.0,
              'buchangUnit': '码'
            },
            {
              'number': 'PH064003',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 20.0,
              'quantityUnit': '码',
              'buchang': 20.0,
              'buchangUnit': '码'
            },
            {
              'number': 'PH064006',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 23.0,
              'quantityUnit': '码',
              'buchang': 23.0,
              'buchangUnit': '码'
            },
            {
              'number': 'PH064007',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 24.0,
              'quantityUnit': '码',
              'buchang': 24.0,
              'buchangUnit': '码'
            }
          ],
          'createTime': 1482305700000,
          'inType': 1,
          'number': 'RC20672064004'
        },
        {
          'clothLoneList': [
            {
              'number': 'PH064009',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 31.0,
              'quantityUnit': '码',
              'buchang': 31.0,
              'buchangUnit': '码'
            },
            {
              'number': 'PH064012',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 34.0,
              'quantityUnit': '码',
              'buchang': 34.0,
              'buchangUnit': '码'
            },
            {
              'number': 'PH064011',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 33.0,
              'quantityUnit': '码',
              'buchang': 20.0,
              'buchangUnit': '码'
            },
            {
              'number': 'PH064010',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 32.0,
              'quantityUnit': '码',
              'buchang': 32.0,
              'buchangUnit': '码'
            },
            {
              'number': 'PH064013',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 35.0,
              'quantityUnit': '码',
              'buchang': 35.0,
              'buchangUnit': '码'
            }
          ],
          'createTime': 1482308425000,
          'inType': 1,
          'number': 'RC20672064007'
        },
        {
          'clothLoneList': [
            {
              'number': 'PH064015',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 33423.0,
              'quantityUnit': '码',
              'buchang': 198.0,
              'buchangUnit': '码'
            },
            {
              'number': 'PH064016',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 33423.0,
              'quantityUnit': '码',
              'buchang': 150.0,
              'buchangUnit': '码'
            }
          ],
          'createTime': 1482334388000,
          'inType': 1,
          'number': 'RC20672064014'
        },
        {
          'clothLoneList': [
            {
              'number': 'PH064001',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 50.0,
              'quantityUnit': '码',
              'buchang': 49.0,
              'buchangUnit': '码'
            },
            {
              'number': 'PH064002',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 50.0,
              'quantityUnit': '码',
              'buchang': 48.0,
              'buchangUnit': '码'
            }
          ],
          'createTime': 1482292059000,
          'inType': 1,
          'number': 'RC20672064001'
        }
      ],
      outReposityList: [
        {
          'clothLoneList': [
            {
              'number': 'PH064016',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 33423.0,
              'quantityUnit': '码',
              'buchang': 150.0,
              'buchangUnit': '码'
            }
          ],
          'outType': 1,
          'number': 'CC0672064017',
          'createTime': 1494214914000,
          'assignTime': null,
          'outTime': 1494485990000,
          'outReposityRealName': '仓储组长',
          'outReposityDetail': 'PH064016/33423.0码',
          'sendTypeStr': '搜芽配送/万通物流/12345678',
          'contactName': '1',
          'contactTel': '18888888888',
          'province': '广东',
          'city': '广州',
          'area': '海珠',
          'addr': '4545',
          'remark': '',
          'sendCertificateList': [],
          'saleMoney': 33423.0,
          'freightMoneyNoTax': 0.0,
          'freightMoney': 0.0
        },
        {
          'clothLoneList': [
            {
              'number': 'PH064013',
              'color': '黄色',
              'costPrice': 0.5,
              'costPriceUnit': '元/码',
              'salePrice': 1.0,
              'salePriceUnit': '元/码',
              'quantity': 35.0,
              'quantityUnit': '码',
              'buchang': 35.0,
              'buchangUnit': '码'
            }
          ],
          'outType': 1,
          'number': 'CC0672064014',
          'createTime': 1482311271000,
          'assignTime': 1482311278000,
          'outTime': 1482311286000,
          'outReposityRealName': '仓储组长',
          'outReposityDetail': 'PH064013/35.0码',
          'sendTypeStr': '搜芽配送/万通物流/12345678',
          'contactName': '擦擦擦',
          'contactTel': '1374122',
          'province': '江苏',
          'city': '南通',
          'area': '港闸区',
          'addr': '永和路490号',
          'remark': '12354',
          'sendCertificateList': [],
          'saleMoney': null,
          'freightMoneyNoTax': null,
          'freightMoney': null
        },
        {
          'clothLoneList': [],
          'outType': 1,
          'number': 'CC0672064007',
          'createTime': 1482307988000,
          'assignTime': 1482308140000,
          'outTime': 1482308146000,
          'outReposityRealName': '仓储组长',
          'outReposityDetail': '',
          'sendTypeStr': '搜芽配送/邮政/13800138001',
          'contactName': '曾秋娟',
          'contactTel': '13800138000',
          'province': '广东',
          'city': '广州',
          'area': '天河区',
          'addr': '中大',
          'remark': '邮政',
          'sendCertificateList': [],
          'saleMoney': null,
          'freightMoneyNoTax': null,
          'freightMoney': null
        },
        {
          'clothLoneList': [],
          'outType': 1,
          'number': 'CC0672064000',
          'createTime': 1482300926000,
          'assignTime': 1482301032000,
          'outTime': 1482301170000,
          'outReposityRealName': '仓储组长',
          'outReposityDetail': '',
          'sendTypeStr': '搜芽配送/万通物流/12345678',
          'contactName': '曾秋娟',
          'contactTel': '020-388-388',
          'province': '广东',
          'city': '广州',
          'area': '海珠区',
          'addr': '永和路490号',
          'remark': '测试测试测试测试测试测试测试测试测试测试测试',
          'sendCertificateList': [
            '/upload/redwood/sendCertificate/7fe77343-77a5-4fd0-9a1e-e404ba32d7e2.jpg'
          ],
          'saleMoney': null,
          'freightMoneyNoTax': null,
          'freightMoney': null
        },
        {
          'clothLoneList': [],
          'outType': 1,
          'number': 'CC0672064001',
          'createTime': 1482303018000,
          'assignTime': 1482303449000,
          'outTime': 1482303460000,
          'outReposityRealName': '仓储组长',
          'outReposityDetail': '',
          'sendTypeStr': '搜芽配送/德邦物流/13800138001',
          'contactName': '小曾',
          'contactTel': '13800138000',
          'province': '广东',
          'city': '广州',
          'area': '海珠区',
          'addr': '测试数据',
          'remark': '测试|黄色|50码|PH064002(1/11.43分)',
          'sendCertificateList': [],
          'saleMoney': null,
          'freightMoneyNoTax': null,
          'freightMoney': null
        },
        {
          'clothLoneList': [],
          'outType': 1,
          'number': 'CC0672064011',
          'createTime': 1482308850000,
          'assignTime': 1482308864000,
          'outTime': 1482308890000,
          'outReposityRealName': '仓储组长',
          'outReposityDetail': '',
          'sendTypeStr': '搜芽配送/万通物流/13800013800',
          'contactName': '曾秋娟',
          'contactTel': '13800138000',
          'province': '江苏',
          'city': '南通',
          'area': '崇川区',
          'addr': '永和路490号',
          'remark': '万通物流',
          'sendCertificateList': [],
          'saleMoney': null,
          'freightMoneyNoTax': null,
          'freightMoney': null
        },
        {
          'clothLoneList': [],
          'outType': 1,
          'number': 'CC0672064009',
          'createTime': 1482308578000,
          'assignTime': 1482308605000,
          'outTime': 1482308611000,
          'outReposityRealName': '仓储组长',
          'outReposityDetail': '',
          'sendTypeStr': '搜芽配送/中大/13800138001',
          'contactName': '曾秋娟',
          'contactTel': '13800138000',
          'province': '广东',
          'city': '广州',
          'area': '海珠区',
          'addr': '中大',
          'remark': '中大中大',
          'sendCertificateList': [],
          'saleMoney': null,
          'freightMoneyNoTax': null,
          'freightMoney': null
        },
        {
          'clothLoneList': [],
          'outType': 1,
          'number': 'CC0672064005',
          'createTime': 1482306438000,
          'assignTime': 1482306505000,
          'outTime': 1482306527000,
          'outReposityRealName': '仓储组长',
          'outReposityDetail': '',
          'sendTypeStr': '搜芽配送/天地华宇/13800138001',
          'contactName': '曾秋娟',
          'contactTel': '13800138001',
          'province': '广东',
          'city': '广州',
          'area': '海珠区',
          'addr': '中大',
          'remark': '天地华宇天地华宇天地华宇',
          'sendCertificateList': [],
          'saleMoney': null,
          'freightMoneyNoTax': null,
          'freightMoney': null
        }
      ],
      colorList: [
        {
          'color': '黄色',
          'quantity': 100.0,
          'quantityUnit': '码',
          'price': 0.5,
          'priceUnit': '元/码',
          'salePrice': 1.0,
          'salePriceUnit': '元/码',
          'buyPrice': 0.5,
          'buyPriceUnit': '元/码'
        }
      ],
      dialogConfig: {
        isShow: false,
        ids: '',
        totalMoney: 0,
        type: this.$route.params.type
      },
    }
  },
  methods: {
    getData() {
      reimburseApi()
    },
    showReimburseDialog() {
      this.dialogConfig.isShow = true
    }
  }
}
</script>

<style lang="scss">
.dsf-detail {
  .fixed-footer {
    position: fixed;
    left: 201px;
    right: 0;
    bottom: 0;
    background: #fff;
    height: 50px;
    padding-top: 10px;
    padding-left: 15px;
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
  .el-tabs__content {
    position: static
  }
  .el-table td .cell {
    padding: 5px;
  }
  .line {
    height: 1px;
    border-bottom: 1px solid dashed;
  }
  .red {
    color: red;
  }
  .real-money {
    display: inline-block;
    width: 200px
  }
}

.fixed-footer {
  height: 50px;
  >div {
    position: fixed;
    left: 200px;
    bottom: 0;
    right: 19px;
    border: 1px solid #ccc;
    background: #fff;
    padding: 10px 20px;
  }
}
</style>
