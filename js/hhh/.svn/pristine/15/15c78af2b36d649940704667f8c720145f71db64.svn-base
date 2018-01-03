<template>
    <div class="jb-publish">
        <h2 class="jb-title">订单发布 > 发布剪版</h2>
        <div class="jb-progress clearfix">
            <el-steps :space="'30%'" :active="progressIndex" finish-status="finish">
                <el-step title="填写基本信息"></el-step>
                <el-step title="确认订单"></el-step>
                <el-step title="发布成功"></el-step>
            </el-steps>
        </div>
        <div class="jb-content">
            <!-- 录入状态 -->
            <div style="padding-left: 10px; margin: 10px 0;" v-show="progressIndex == 1">
                <div class="section">
                    <div class="jb-content-buyer-info top-line clearfix">
                        <span class="jb-info">采购商供应商信息</span>
                    </div>
                    <div class="jb-info-content clearfix">
                        <div class="line-item clearfix">
                            <div class="line-item-l">
                                <span style="position: relative; top: 10px;">
                                    <b class="mark">*</b>采购商：</span>
                            </div>
                            <div class="line-item-r">
                                <el-button type="text" @click.native="markIndex=0;$store.dispatch('changePopLoad', true)">请选择</el-button>
                                <div class="buyer-select-info" v-if="customerId">
                                    <p>采购商ID: {{customerNumber}}</p>
                                    <p>公司名称: {{customerCompany}}</p>
                                    <p>联系电话: {{customerTel}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="line-item clearfix">
                            <div class="line-item-l">
                                <span style="position: relative; top: 10px;">
                                    <b class="mark">*</b>收货地址：</span>
                            </div>
                            <div class="line-item-r">
                                <el-select v-model="addressId" placeholder="请选择收货人" style="width: 50%;" size="small">
                                    <el-option v-for="item in addressList" :label="`${item.name}  ${item.tel}  ${item.province}${item.city}${item.area}${item.addr}`" :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-button v-if="customerId" type="text" @click="saveAddressShow = true">添加</el-button>
                            </div>
                        </div>
                        <div class="line-item clearfix">
                            <div class="line-item-l">
                                <span style="position: relative; top: 10px;">
                                    <b class="mark">*</b>供应商：</span>
                            </div>
                            <div class="line-item-r">
                                <el-button type="text" @click.native="markIndex=1;$store.dispatch('changePopLoad', true)">请选择</el-button>
                                <el-button type="text" @click="saveShopShow = true">添加</el-button>
                                <div class="buyer-select-info clearfix" v-if="showShopData.id">
                                    <p style="float:left; margin-right: 50px;">
                                        <span style="padding-right: 5px;">供应商ID:</span>{{showShopData.sellerNumber}}</p>
                                    <p style="float:left; margin-right: 50px;">
                                        <span style="padding-right: 5px;">店铺名称:</span>{{showShopData.sellerCompany}}</p>
                                    <p style="float:left; margin-right: 50px;">
                                        <span style="padding-right: 5px;">档口名称:</span>{{showShopData.company}}</p>
                                    <p style="float:left; margin-right: 50px;">
                                        <span style="padding-right: 5px;">档口地区:</span>{{showShopData.province}}{{showShopData.city}}{{showShopData.area}}</p>
                                    <p style="float:left; margin-right: 50px;">
                                        <span style="padding-right: 5px;">详细地址:</span>{{showShopData.addr}}</p>
                                    <p style="float:left; margin-right: 50px;">
                                        <span style="padding-right: 5px;">档口电话:</span>{{showShopData.tel}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-form v-for="(product,productIdx) in productNumbers" :label-position="right" label-width="180px">
                    <el-row type="flex" class="product-header" align="middle">
                        <el-col class="product-title">
                            <span>货号{{productIdx+1}}</span>
                        </el-col>
                        <el-col style="text-align:right">
                            <el-button type="primary" icon="plus" v-if="productNumbers.length < 6" @click.native="addProduct(productIdx)"></el-button>
                            <el-button type="danger" icon="minus" v-if="productNumbers.length > 1" @click.native="removeProduct(productIdx)">
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-form-item label="图片：">
                        <el-row>
                            <el-col class="position-center product-img-list" style="float:left">
                                <div class="img-wrap" v-for="(url,urlIdx) in product.imgUrls" @click="removeImg(productIdx,urlIdx)">
                                    <img :src="'http://www.soouya.com' + url" />
                                    <i class="el-icon-close"></i>
                                </div>
                                <el-col>
                                    <el-upload class="product-img-upload" drag action="/redwood/sys/Common/uploadFile.do?type=0" multiple width="100" :on-success="handleuploadImg" :before-upload="handleuploadBefore.bind(this,productIdx)" v-if="product.imgUrls.length < 6">
                                        <i class="el-icon-upload"></i>
                                        <div class="el-upload__text">将文件拖到此处，或
                                            <em>点击上传</em>
                                        </div>
                                    </el-upload>
                                </el-col>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="品类：" required>
                        <el-radio-group v-model="product.category" @change="handleCategoryChange">
                            <el-radio-button :label="1">面料</el-radio-button>
                            <el-radio-button :label="0">辅料</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item :label="product.category == 1 ? '货号：' : '品名：'" required>
                        <el-input v-model="product.number" class="input-md"></el-input>
                    </el-form-item>
                    <el-form-item label="单位：" required v-if="product.category == 1">
                        <el-select v-model="product.followerQuantityUnit" @change="handleUnitChange(productIdx)" class="input-md">
                            <el-option v-for="item in productUnitOptions" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务费单价：" required>
                        <RuleInput class="input-md" v-model="product.price" :rule="rules.price">
                        </RuleInput>
                        <!--<el-input v-model="product.price"
                                                                 
                                                                  @blur="formatPrice"
                                                                  class="input-md"></el-input>-->
                        <span class="unit">
                            {{product.priceUnit}}
                        </span>
                    </el-form-item>
                    <el-form :inline="true" v-for="(color,colorIdx) in product.colors" :label-position="right" label-width="180px">
                        <el-form-item :label="product.category == 1 ? '色号：' : '颜色：'" required>
                            <el-input v-model="color.color" class="input-md"></el-input>
                        </el-form-item>
                        <el-form-item label="单价：">
                            <template v-if="product.category == 1">
                                <RuleInput class="input-md" v-model="color.followerPriceMoney" :rule="rules.followerPriceMoney">
                                </RuleInput>
                                <span class="unit">{{color.followerPriceUnit}}</span>
                            </template>
                            <template v-else>
                                <RuleInput v-model="color.followerPriceMoney" :rule="rules.followerPriceMoney">
                                </RuleInput>
                                <span class="unit">元/</span>
                                <el-input v-model="color.followerPriceUnit" @change="handleFollowerPriceUnitChange" @focus="handleFollowerPriceUnitFocus(productIdx,colorIdx)" class="input-sm">
                                </el-input>
                            </template>
                        </el-form-item>
                        <el-form-item label="数量：" required>
                            <el-input v-model="color.followerQuantity" class="input-md"></el-input>
                            <span class="unit">{{color.followerQuantityUnit}}</span>
                        </el-form-item>
                        <el-button type="primary" icon="plus" v-if="product.colors.length < 10" @click.native="addColor(productIdx,colorIdx)"></el-button>
                        <el-button type="danger" icon="minus" v-if="product.colors.length > 1" @click.native="removeColor(productIdx,colorIdx)"></el-button>
                    </el-form>
                </el-form>
    
                <el-form :label-position="right" label-width="180px">
                    <div class="jb-content-buyer-info top-line clearfix">
                        <span class="jb-info">费用信息</span>
                    </div>
                    <el-form-item label="采购商是否需要发票：" required>
                        <el-radio-group v-model="needInvoice">
                            <el-radio-button :label="1">
                                需要
                            </el-radio-button>
                            <el-radio-button :label="0">
                                不需要
                            </el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="采购商税率：" v-if="needInvoice" required>
                        <RuleInput v-model="taxPoint" :rule="rules.taxPoint">
                        </RuleInput>%
                    </el-form-item>
                    <el-form-item label="跟单员留言：">
                        <textarea rows="3" style="width: 300px; height: 100px; resize: none; border: 1px solid #ccc; padding: 5px;" v-model.trim="followerRemark"></textarea>
                        <span>
                            <b style="color: red; padding-left: 5px;">{{leftnumber}}</b>/100字</span>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 录入态结束 -->
            <preview :details="details" v-if="progressIndex == 2 || progressIndex == 3" />
            <buyer-seller v-if="$store.state.b.popLoad" :sendinfo="{name: markIndex}" @getInfo="getInfo" />
            <lightbox />
            <div class="bot_operate" style="text-align: center;">
                <el-button type="primary" v-if="progressIndex == 1" :disabled="isNext" @click.native="goNext">
                    下一步
                </el-button>
                <el-button type="primary" v-if="progressIndex == 2 || progressIndex == 3" @click.native="progressIndex = 1">
                    返回
                </el-button>
                <el-button type="primary" v-if="progressIndex == 2 || progressIndex == 3" @click.native="confirmCut">
                    确定发布
                </el-button>
            </div>
        </div>
        <el-dialog :title="添加供应商" :visible.sync="saveShopShow" custom-class="pop-table-wrap" :lock-scroll="true" size="tiny">
            <el-form label-width="100px" ref="shopForm" :model="saveShopData">
                <el-form-item label="档口名称" :rules="{required: true, message:'档口名称不能为空', trigger: 'blur'}" prop="company">
                    <el-input v-model="saveShopData.company"></el-input>
                </el-form-item>
                <el-form-item label="电话类型">
                    <div style="text-align:left">
                        <el-radio-group v-model="saveShopData.telType">
                            <el-radio-button label="手机" @click.native="saveShopData.tel = ['']"></el-radio-button>
                            <el-radio-button label="固话" @click.native="saveShopData.tel = ['','']"></el-radio-button>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="档口电话" :rules="{required: true, message:'档口电话格式错误', trigger:'blur', validator:validateTel}" prop="tel">
                    <el-row type="flex">
                        <template v-for="(item,index) in saveShopData.tel">
                            <template v-if="index != 0">
                                <span style="margin:0 5px">-</span>
                            </template>
                            <el-input v-model="saveShopData.tel[index]"></el-input>
                        </template>
                    </el-row>
                </el-form-item>
                <el-form-item label="省市区" :rules="{required: true, message:'省市区不能为空', trigger: 'blur', type:'array'}" prop="fullAddress">
                    <el-cascader :options="proCity" v-model="saveShopData.fullAddress" style="width:100%">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" :rules="{required: true, message:'详细地址不能为空', trigger: 'blur'}" prop="addr">
                    <el-input v-model="saveShopData.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="saveShopShow = false">取消</el-button>
                <el-button type="primary" @click="saveShop('shopForm')">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="添加地址" :visible.sync="saveAddressShow" custom-class="pop-table-wrap" :lock-scroll="true" size="tiny">
            <el-form label-width="100px" ref="shopForm" :model="saveAddressData">
                <el-form-item label="收货人姓名" :rules="{required: true, message:'收货人姓名不能为空', trigger: 'blur'}" prop="name">
                    <el-input v-model="saveAddressData.name"></el-input>
                </el-form-item>
                <el-form-item label="收货人电话" :rules="{required: true, message:'收货人电话不能为空', trigger: 'blur'}" prop="tel">
                    <el-input v-model="saveAddressData.tel"></el-input>
                </el-form-item>
                <el-form-item label="省市区" :rules="{required: true, message:'省市区不能为空', trigger: 'blur', type:'array'}" prop="fullAddress">
                    <el-cascader :options="proCity" v-model="saveAddressData.fullAddress" style="width:100%">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="收货地址" :rules="{required: true, message:'收货地址不能为空', trigger: 'blur'}" prop="addr">
                    <el-input v-model="saveAddressData.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="saveAddressShow = false">取消</el-button>
                <el-button type="primary" @click="saveAddress('shopForm')">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Lightbox from 'components/lightbox/lightbox'
import preview from './preview'
import buyerAndSeller from 'pages/common/buyerAndSeller'
import api from 'api/allApi'
import { proCity } from 'components/proCityArea'
import { getTaxMoney, getTotalMoney } from 'utils/getMoney'
import {
    deepCopy,
    newRequest
}
    from 'utils/tool'
import RuleInput from 'components/ruleInput'
const regFloat = /^\d+(\.\d{1,2})?$/
export default {
    components: {
        Lightbox,
        preview,
        'buyer-seller': buyerAndSeller,
        RuleInput
    },
    data() {
        return {
            proCity,
            saveShopShow: false,
            saveAddressShow: false,
            details: {},
            imgPath: 'http://www.soouya.com',
            // 当前图片所在的obj位置
            temPosition: '',
            // 进度控制
            progressIndex: 1,
            addressList: [],
            showShopData: {},
            saveShopData: {
                company: '',
                tel: [''],
                addr: '',
                fullAddress: [],
                telType: '手机',
            },
            saveAddressData: {
                fullAddress: []
            },
            // 默认单位初始值显示
            defaultCategoryTwo: true,
            // 标志是采购商还是供应商
            markIndex: 0,
            // 采购商
            customerId: '',
            customerNumber: '',
            customerCompany: '',
            customerTel: '',
            // 供应商
            shopId: '',
            shopCompany: '',
            // 收货地址
            addressId: '',
            addressName: '',
            addressTel: '',
            addressProvince: '',
            addressCity: '',
            addressArea: '',
            addressAddr: '',
            // 费用明细
            needInvoice: '', // 1,
            taxPoint: '', //
            followerRemark: '',
            productNumbers: [
                {
                    imgUrls: [],
                    category: '1',
                    number: '', //
                    followerQuantityUnit: '',
                    price: '',
                    priceUnit: '',
                    colors: [
                        {
                            color: '',
                            followerPriceMoney: '',
                            followerPriceUnit: '',
                            followerQuantity: '',
                            followerQuantityUnit: '',
                        }
                    ]
                }
            ],
            productUnitOptions: [{
                label: '元/米',
                value: '米'
            }, {
                label: '元/码',
                value: '码'
            }, {
                label: '元/千克',
                value: '千克'
            }],
            currentUploadIndex: 0,
            waitChangeFollowerPriceUnitIndex: [],
            rules: {
                taxPoint: {
                    message: '请输入大于0小于100且最多两位小数的值',
                    rule(val) {
                        if (regFloat.test(val) && val <= 100 && val > 0) {
                            return false
                        } else {
                            return true
                        }
                    }
                },
                price: {
                    message: '小数点后两位长度不能大于2',
                    rule(val) {
                        if (regFloat.test(val) || val === '') {
                            return false
                        } else {
                            return true
                        }
                    }
                },
                followerPriceMoney: {
                    message: '小数点后两位长度不能大于2',
                    rule(val) {
                        if (regFloat.test(val) || val === '') {
                            return false
                        } else {
                            return true
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.$store.dispatch('changeload', false)
    },
    computed: {
        // 预估货款
        estimatedCostMoney() {
            let countEstimatedCostMoney = this.productNumbers.reduce((productAss, productVal) => {
                let countColor = productVal.colors.reduce((colorAss, colorVal) => {
                    return colorAss + colorVal.followerPriceMoney * colorVal.followerQuantity
                }, 0)
                return productAss + countColor
            }, 0)
            return countEstimatedCostMoney.toFixed(2)
        },
        // 计算税费
        taxMoney() {
            return getTaxMoney(Number(this.estimatedCostMoney), Number(this.serviceMoney), Number(this.taxPoint))
        },
        // 总费用
        countTotalMoney() {
            return getTotalMoney(Number(this.estimatedCostMoney), Number(this.serviceMoney), Number(this.taxMoney))
        },
        serviceMoney() {
            let countServiceMoney = this.productNumbers.reduce((productAcc, productVal) => {
                let countQuantity = productVal.colors.reduce((colorAcc, colorVal) => {
                    return Number(colorAcc) + Number(colorVal.followerQuantity)
                }, 0)
                let currentProductPrice = countQuantity * productVal.price
                return (productAcc + currentProductPrice)
            }, 0)
            return countServiceMoney.toFixed(2)
        },
        leftnumber() {
            return 100 - Number(this.followerRemark.length)
        },
        // 字段校验
        isNext() {
            let on = false
            // 采购商供应商信息
            if (!this.customerId || !this.customerNumber || !this.shopId || !this.addressId || !this.customerCompany) {
                on = true
            }
            if (!this.showShopData.company || !this.showShopData.addr || !this.showShopData.tel) {
                on = true
            }
            // 货号校验
            this.productNumbers.forEach((item) => {
                if (String(item.category) == '' || String(item.number) == '' || !regFloat.test(item.price)) {
                    on = true
                }
                item.colors.forEach((val) => {
                    if (String(val.color) == '' || String(val.followerQuantity) == '' || (!regFloat.test(val.followerPriceMoney) && val.followerPriceMoney)) {
                        on = true
                    }
                })
            })
            // 费用信息校验
            if (this.needInvoice && !regFloat.test(this.taxPoint) || this.needInvoice === '') {
                on = true
            }
            return on
        }
    },
    watch: {
        // 备注限定
        followerRemark(val) {
            if (val.length >= 100) {
                this.followerRemark = val.slice(0, 100)
            }
        },
    },
    methods: {
        getInfo(param) {
            this.fillInfo(param)
            if (this.markIndex == 0) {
                this.getAddressList()
            }
        },
        fillInfo(param) {
            if (this.markIndex == 0) {
                this.customerId = param.id
                this.customerNumber = param.number
                if (!param.company || !param.number) {
                    this.$message({
                        type: 'error',
                        message: '请维护此采购商信息,否则不能提交订单',
                        duration: 1500
                    })
                }
                this.customerCompany = param.company
                this.customerTel = param.tel
                this.customerNumber = param.number
            } else {
                this.showShopData = param
                if (!this.showShopData.company || !this.showShopData.addr || !this.showShopData.tel) {
                    this.$message({
                        type: 'error',
                        message: '请维护此供应商信息,否则不能提交订单',
                        duration: 1500
                    })
                }
                this.shopId = param.id
            }
        },
        // 收货地址列表
        getAddressList() {
            this.addressId = ''
            newRequest({
                url: api.Address.list,
                contentType: 'application/json',
                data: {
                    userId: this.customerId
                }
            }, (res) => {
                if (res.success == 1) {
                    this.addressList = res.result
                }
            })
        },
        // 选择采购商是否需要发票
        selectNeedInvoice(index) {
            this.needInvoice = index
        },
        getTemAddressData() {
            let addressData = {}
            this.addressList.forEach((item) => {
                if (item.id == this.addressId) {
                    addressData = item
                }
            })
            return addressData
        },
        goNext() {
            const addressData = this.getTemAddressData()
            this.details = {
                customerId: this.customerId,
                customerCompany: this.customerCompany,
                customerTel: this.customerTel,
                productNumbers: this.productNumbers,
                needInvoice: this.needInvoice,
                estimatedCostMoney: this.estimatedCostMoney,
                taxPoint: this.taxPoint,
                serviceMoney: this.serviceMoney,
                taxMoney: this.taxMoney,
                totalMoney: this.countTotalMoney,
                showShopData: this.showShopData,
                followerRemark: this.followerRemark,
                customerNumber: this.customerNumber,
                addressData
            }
            this.progressIndex = 2
        },
        confirmCut() {
            const addressData = this.getTemAddressData()
            const newProductNumbers = deepCopy(this.productNumbers)
            const productNumbers = newProductNumbers.map((item) => {
                delete item.followerQuantityUnit
                item.category = parseFloat(item.category)
                item.price = parseFloat(item.price)
                item.colors.forEach((color) => {
                    color.followerPriceMoney = parseFloat(color.followerPriceMoney) || 0
                    color.followerQuantity = parseFloat(color.followerQuantity)
                })
                return item
            })
            const obj = {
                addressProvince: addressData.province,
                addressCity: addressData.city,
                addressArea: addressData.area,
                addressAddr: addressData.addr,
                addressName: addressData.name,
                addressTel: addressData.tel,
                customerId: this.customerId,
                addressId: this.addressId,
                customerCompany: this.customerCompany,
                customerTel: this.customerTel,
                shopId: this.showShopData.id,
                shopCompany: this.showShopData.company,
                shopTel: this.showShopData.tel,
                shopProvince: this.showShopData.province,
                shopCity: this.showShopData.city,
                shopArea: this.showShopData.area,
                shopAddr: this.showShopData.addr,
                productNumbers,
                needInvoice: this.needInvoice,
                estimatedCostMoney: parseFloat(this.estimatedCostMoney),
                serviceMoney: parseFloat(this.serviceMoney),
                totalMoney: parseFloat(this.countTotalMoney),
                followerRemark: this.followerRemark,
                taxMoney: this.taxMoney,
                taxPoint: parseFloat(this.taxPoint) || 0
            }
            this.$store.dispatch('changeload', true)
            newRequest({
                url: api.cut.cut,
                method: 'post',
                contentType: 'application/json',
                data: obj
            }, (res) => {
                this.$store.dispatch('changeload', false)
                if (res.success == 1) {
                    this.open(res.obj.id)
                } else {
                    this.$message({
                        type: 'success',
                        message: res.msg,
                        duration: 1500
                    })
                }
            })
        },
        open(id) {
            // this.$router.push({ name: 'jbPublish' })
            this.$msgbox({
                title: '提示',
                message: '发布订单成功',
                showCancelButton: true,
                confirmButtonText: '再发一单',
                cancelButtonText: '查看详情',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        done()
                        location.reload()
                    } else {
                        this.$router.push({ name: 'cutDetail', query: { id } })
                        done();
                    }
                }
            }).then(action => { })
        },
        addProduct(productIdx) {
            this.productNumbers.push(Object.assign({}, this.productNumbers[productIdx], {
                imgUrls: [],
                number: '',
                followerQuantityUnit: '',
                priceUnit: '',
                price: '',
                colors: [
                    {
                        color: '',
                        followerPriceMoney: '',
                        followerPriceUnit: '',
                        followerQuantity: '',
                        followerQuantityUnit: '',
                    }
                ]
            }))
        },
        removeProduct(productIdx) {
            this.productNumbers.splice(productIdx, 1)
        },
        addColor(productIdx, colorIdx) {
            let product = this.productNumbers[productIdx]
            let colors = product.colors
            colors.push(Object.assign({}, colors[colorIdx], {
                color: '',
                followerPriceMoney: '',
                followerQuantity: '',
            }))
        },
        removeColor(productIdx, colorIdx) {
            this.productNumbers[productIdx].colors.splice(colorIdx, 1)
        },
        handleUnitChange(productIdx) {
            let product = this.productNumbers[productIdx]
            const followerQuantityUnit = product.followerQuantityUnit
            const followerPriceUnit = `元/${followerQuantityUnit}`
            product.colors.forEach(color => {
                color.followerPriceUnit = followerPriceUnit
                color.followerQuantityUnit = followerQuantityUnit
            })
            product.priceUnit = followerPriceUnit
        },
        handleCategoryChange(val) {
            this.productNumbers.forEach(product => {
                product.category = val
                product.followerQuantityUnit = ''
                product.colors.forEach((color) => {
                    color.followerPriceUnit = ''
                    color.followerQuantityUnit = ''
                    product.priceUnit = ''
                })
            })
        },
        handleuploadImg(response, file, fileList) {
            console.log(response, file, fileList)
            if (response.success === '1') {
                this.productNumbers[this.currentUploadIndex].imgUrls.push(response.imgUrl)
            } else {
                this.$message.error(response.msg);
            }
        },
        handleuploadBefore(productIdx) {
            this.currentUploadIndex = productIdx
            return true
        },
        removeImg(productIdx, urlIdx) {
            this.productNumbers[productIdx].imgUrls.splice(urlIdx, 1)
        },
        handleFollowerPriceUnitChange(val) {
            let productIdx = this.waitChangeFollowerPriceUnitIndex[0]
            let colorIdx = this.waitChangeFollowerPriceUnitIndex[1]
            this.productNumbers[productIdx].colors[colorIdx].followerQuantityUnit = val
        },
        handleFollowerPriceUnitFocus(productIdx, colorIdx) {
            this.waitChangeFollowerPriceUnitIndex = [productIdx, colorIdx]
        },
        formatPrice(e) {
            e.target.value = (parseFloat(e.target.value) || 0).toFixed(2)
        },
        saveAddress(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    newRequest({
                        url: '/redwood/buyfollow/Address/add',
                        contentType: 'application/json',
                        method: 'POST',
                        data: {
                            _time: +new Date(),
                            userId: this.customerId,
                            name: this.saveAddressData.name,
                            tel: this.saveAddressData.tel,
                            province: this.saveAddressData.fullAddress[0] || '',
                            city: this.saveAddressData.fullAddress[1] || '',
                            area: this.saveAddressData.fullAddress[2] || '',
                            addr: this.saveAddressData.addr,
                            haveSendCompany: 0
                        }
                    }).then((response) => {
                        if (response.success == '1') {
                            console.log(response)
                            this.getAddressList()
                            this.saveAddressShow = false
                        } else {
                            this.$message({
                                type: 'error',
                                message: response.msg,
                                duration: 1500
                            })
                        }
                    })
                }
            })
        },
        saveShop(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    newRequest({
                        url: '/redwood/sys/Shop/save',
                        contentType: 'application/json',
                        method: 'POST',
                        data: {
                            _time: +new Date(),
                            company: this.saveShopData.company,
                            province: this.saveShopData.fullAddress[0] || '',
                            city: this.saveShopData.fullAddress[1] || '',
                            area: this.saveShopData.fullAddress[2] || '',
                            addr: this.saveShopData.addr,
                            tel: this.saveShopData.tel.join('-'),
                        }
                    }).then((response) => {
                        if (response.success == '1') {
                            console.log(response)
                            this.showShopData.id = response.obj.id
                            this.showShopData.sellerNumber = response.obj.sellerNumber
                            this.showShopData.sellerCompany = response.obj.sellerCompany
                            this.showShopData.company = response.obj.company
                            this.showShopData.province = response.obj.province
                            this.showShopData.city = response.obj.city
                            this.showShopData.area = response.obj.area
                            this.showShopData.addr = response.obj.addr
                            this.showShopData.tel = response.obj.tel
                            this.shopId = response.obj.id
                            this.shopCompany = response.obj.company
                            this.saveShopShow = false
                        } else {
                            this.$message({
                                type: 'error',
                                message: response.msg,
                                duration: 1500
                            })
                        }
                    })
                }
            })
        },
        validateTel(rule, value, callback) {
            let tel = value.join('-')
            let isOk = false
            if (value.length === 1) {
                isOk = (/^1[34578]\d{9}$/.test(tel))
            } else {
                isOk = (/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel))
            }
            if (isOk) {
                callback()
            } else {
                callback(new Error(rule.message))
            }
        }
    }
};
</script>
<style lang="scss">
.product-img-upload {
    .el-upload-dragger {
        width: 200px;
        height: 100px;
        overflow: hidden;
    }
    .el-icon-upload {
        margin-top: 7px;
    }
}
</style>
<style lang="scss">
.jb-publish {
    .jb-title {
        font-size: 18px;
        font-weight: normal;
    }
    .jb-progress {
        padding-top: 20px;
        text-align: center;
    }
    .el-upload-list {
        display: none;
    }
    .bot-line {
        position: relative;
        &:after {
            position: absolute;
            display: block;
            content: '';
            height: 2px;
            width: 100%;
            background: #bfcbd9;
        }
    }
    .top-line {
        position: relative;

        &:before {
            position: absolute;
            display: block;
            content: '';
            height: 2px;
            width: 100%;
            background: #bfcbd9;
        }
    }

    .jb-info {
        float: left;
        width: 150px;
        padding: 10px 0;
        background: #20a0ff;
        text-align: center;
        color: #fff;
    }
    .jb-info-content {
        padding-bottom: 20px;
        .line-item {
            margin-bottom: 10px;
            .line-item-l {
                float: left;
                font-size: 14px;
                width: 180px;
                color: #48576a;
                padding: 0 12px 0 0;
                text-align: right;
                white-space: nowrap;
            }
            .radio-tit {
                padding-top: 5px;
            }
            .line-item-r {
                font-size: 14px;
                width: 500px;
                float: left;
            }
            .buyer-select-info {
                p {
                    padding: 10px 0;
                }
            }
            .mark {
                color: red;
            }
        }
    }
    .product-list {
        .pro-title {
            position: relative;
            top: 10px;
            float: left;
            margin-right: 10px;
        }
        .pro-list-item {
            float: left;
            margin-right: 20px;
        }
    }
    .jb-content-buyer-info {
        margin-bottom: 10px;
    }
    .operate-wrap {
        .operate {
            float: right;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #20a0ff;
            border-radius: 50%;
            cursor: pointer;
            color: #fff;
            &:hover {
                color: #000;
                background: #0c95fb;
            }
        }
        .add {
            margin-right: 20px;
        }
        .plus {
            background: #FF4949;
            &:hover {
                color: #000;
                background: #FF4949;
            }
        }
    }
    .jb-content-title {
        margin: 30px 0;
    }
    .showmadan {
        float: left;
        .madan-wrap {
            position: relative;
            float: left;
            margin-right: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
        }
        .del-arrow {
            position: absolute;
            text-align: center;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: 50%;
            top: -10px;
            right: -10px;
            background-color: #ccc;
            color: #fff;
            border: 1px solid #fff;
        }
    }
    .upImg {
        float: left;
        width: 42px;
        height: 42px;
        line-height: 42px;
        background: #ccc;
        text-align: center;
        color: #fff;
        font-size: 40px;
        cursor: pointer;
        &:active {
            background: #999;
        }
    }
    .money-info {
        .money-info-l {
            float: left;
            width: 100px;
            padding-top: 9px;
        }
        .money-info-item {
            margin-bottom: 10px;
        }
    }
}

.el-radio-group {
    vertical-align: middle;
}

.product-header {
    border-top: 2px solid #bfcbd9;
    .product-title {
        background: #20a0ff;
        color: #fff;
        width: 150px;
        height: 40px;
        text-align: center;
        line-height: 40px;
    }
}

.input-lg {
    width: 200px;
}

.input-md {
    width: 150px;
}

.input-sm {
    width: 100px;
}

.el-form-item {
    white-space: nowrap;
}

.flex-auto {
    flex: 1;
}

.position-center {
    display: flex;
    align-items: center;
}

.product-img-list {
    .img-wrap {
        width: 80px;
        height: 80px;
        position: relative;
        margin-right: 10px;
        &:hover {
            cursor: pointer;
        }
        img {
            width: 100%;
            height: 100%;
        }
        .el-icon-close {
            position: absolute;
            right: -5px;
            top: -5px;
            background: rgba(0, 0, 0, .5);
            border-radius: 50%;
            overflow: hidden;
            color: #fff;
            font-size: 12px;
            padding: 5px;
        }
    }
}
</style>
