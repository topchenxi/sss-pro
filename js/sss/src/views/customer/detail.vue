<template>
  <div>
    <div class="detail-container">
      <div class="crumbs">
        <span>采购商</span>
        <span class="arrow"></span>
        <span class="current">采购商详情</span>
      </div>
      <div class="detail-content">
        <div class="title">
          <h5>基本信息</h5>
          <div class="op save" v-if="updateForm.info != null">
            <span @click="updateCustomer" class="icon icon-save"></span>
            <span @click="updateCustomer">保存</span> |
            <span @click="updateForm.info = null" class="icon icon-cancel"></span>
            <span @click="updateForm.info = null">取消</span>
          </div>
          <div class="op update" v-if="updateForm.info == null">
            <span @click="showUpdate('info')" class="icon icon-editor"></span>
            <span @click="showUpdate('info')">编辑</span>
          </div>
        </div>
        <div class="o-row" v-if="updateForm.info == null">
          <dl class="o-item">
            <dt>采购商ID:</dt>
            <dd>{{customerObj.number}}</dd>
            <dd class="icon-wrap">
              <span v-if="customerObj.large ==1" class="icon icon-vip" tile="大客户"></span>
              <span v-if="customerObj.large ==0" class="icon icon-vip-disabled" title="非大客户"></span>
              <span v-if="customerObj.hasOpenedBaitiao ==1" class="icon icon-ximu-active" title="已开通徙木"></span>
              <span v-if="customerObj.hasOpenedBaitiao ==0" class="icon icon-ximu-gray" title="未开通徙木"></span>
              <span v-if="customerObj.hasOpenedYanzhen ==1" class="icon icon-yanzhen-active" title="已开通白条"></span>
              <span v-if="customerObj.hasOpenedYanzhen ==0" class="icon icon-yanzhen-gray" title="未开通白条"></span>
              <span v-if="customerObj.status == 1" class="font" title="账号状态">正常</span>
              <span v-if="customerObj.status != 1" class="font error" title="账号状态">异常</span>
            </dd>
          </dl>
        </div>
        <div class="o-row" v-if="updateForm.info == null">
          <dl class="o-item">
            <dt>注册手机号:</dt>
            <dd>{{customerObj.mobilePhone}}</dd>
          </dl>
        </div>
        <el-form class="o-form" :inline="true" :rules="infoRules" ref="updateForm.info" :model="updateForm.info" v-if="updateForm.info != null">
          <el-row>
            <el-col :span="4">采购商ID：{{customerObj.number}}</el-col>
            <el-col :span="8">
              <el-form-item label="注册手机号" prop="mobilePhone">
                <el-input v-model="updateForm.info.mobilePhone" class="input-md"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="updateForm.info.largeBox">大客户</el-checkbox>
            </el-col>
          </el-row>
        </el-form>
        <div class="line"></div>
        <div class="title">
          <h5>公司信息</h5>
          <div class="op update" v-if="updateForm.company == null">
            <span @click="showUpdate('company')" class="icon icon-editor"></span>
            <span @click="showUpdate('company')">编辑</span>
          </div>
          <div class="op save" v-if="updateForm.company != null">
            <span @click="updateCustomer" class="icon icon-save"></span>
            <span @click="updateCustomer">保存</span> |
            <span @click="updateForm.company = null" class="icon icon-cancel"></span>
            <span @click="updateForm.company = null">取消</span>
          </div>
        </div>
        <div class="o-row" v-if="updateForm.company == null">
          <dl class="o-item">
            <dt>企业名称:</dt>
            <dd>{{customerObj.company}}</dd>
          </dl>
          <dl class="o-item">
            <dt>营业执照号码:</dt>
            <dd>{{customerObj.license}}</dd>
          </dl>
          <dl class="o-item" v-if="customerObj.hasOpenedYanzhen ==1">
            <dt>经营地址:</dt>
            <dd>{{customerObj.yanzhenCorporation.actualAdd}}</dd>
          </dl>
        </div>
        <div class="o-row" v-if="updateForm.company == null">
          <dl class="o-item">
            <dt>企业固话/手机:</dt>
            <dd>{{customerObj.tel}}</dd>
          </dl>
          <dl class="o-item">
            <dt>注册地址:</dt>
            <dd>{{customerObj.province}}{{customerObj.city}}{{customerObj.area}}{{customerObj.addr}}</dd>
          </dl>
        </div>
        <el-form class="o-form" v-if="updateForm.company != null" :inline="true" :rules="companyRules" ref="updateForm.company" :model="updateForm.company">
          <el-row>
            <el-col :span="6">
              <el-form-item label="企业名称" prop="company">
                <el-input v-model="updateForm.company.company"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="营业执照号码" prop="license">
                <el-input v-model="updateForm.company.license"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-if="customerObj.hasOpenedYanzhen ==1">
              <el-form-item label="经营地址" prop="yanzhenCorporation.actualAdd">
                <el-input v-model="updateForm.company.yanzhenCorporation.actualAdd"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="企业固话/手机" prop="tel">
                <el-input v-model="updateForm.company.tel" class="input-md"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="省市区" prop="fullAddress">
                <el-cascader :options="proCity" v-model="updateForm.company.fullAddress">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="注册地址" prop="addr">
                <el-input v-model="updateForm.company.addr"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="line"></div>
        <div class="title">
          <h5></h5>
          <div class="op update" v-if="updateForm.corporationImg == null">
            <span @click="showUpdate('corporationImg')" class="icon icon-editor"></span>
            <span @click="showUpdate('corporationImg')">编辑</span>
          </div>
          <div class="op save" v-if="updateForm.corporationImg != null">
            <span @click="updateCustomer" class="icon icon-save"></span>
            <span @click="updateCustomer">保存</span> |
            <span @click="updateForm.corporationImg = null" class="icon icon-cancel"></span>
            <span @click="updateForm.corporationImg = null">取消</span>
          </div>
        </div>
        <el-row class="customer-info-row" v-if="updateForm.corporationImg == null">
          <el-col :span="4">
            <p>营业执照</p>
            <a v-if="customerObj.corporation.licenseUrl" :href="'http://www.soouya.com'+val" class="image" v-lightbox="[customerObj.corporation.licenseUrl]" v-for="val in [customerObj.corporation.licenseUrl]">
              <img v-if="val" class="corporationImg" style="margin-bottom: 22px;" :src="'http://www.soouya.com/' + val">
            </a>
            <img v-else class="corporationImg" style="margin-bottom: 22px;" src="http://www.soouya.com/upload/util/empty.png">
          </el-col>
          <el-col :span="4">
            <p>税务登记证</p>
            <a v-if="customerObj.corporation.taxRegistrationCertificateUrl" :href="'http://www.soouya.com'+val" class="image" v-lightbox="[customerObj.corporation.taxRegistrationCertificateUrl]" v-for="val in [customerObj.corporation.taxRegistrationCertificateUrl]">
              <img v-if="val" class="corporationImg" style="margin-bottom: 22px;" :src="'http://www.soouya.com/' + val">
            </a>
            <img v-else class="corporationImg" style="margin-bottom: 22px;" src="http://www.soouya.com/upload/util/empty.png">
          </el-col>
          <el-col :span="4">
            <p>组织机构代码证</p>
            <a v-if="customerObj.corporation.organizationCodeCertificateUrl" :href="'http://www.soouya.com'+val" class="image" v-lightbox="[customerObj.corporation.organizationCodeCertificateUrl]" v-for="val in [customerObj.corporation.organizationCodeCertificateUrl]">
              <img v-if="val" class="corporationImg" style="margin-bottom: 22px;" :src="'http://www.soouya.com/' + val">
            </a>
            <img v-else class="corporationImg" style="margin-bottom: 22px;" src="http://www.soouya.com/upload/util/empty.png">
          </el-col>
          <el-col :span="4">
            <p>经营场所，门头照片</p>
            <a v-if="customerObj.corporation.placeUrl" :href="'http://www.soouya.com'+val" class="image" v-lightbox="[customerObj.corporation.placeUrl]" v-for="val in [customerObj.corporation.placeUrl]">
              <img v-if="val" class="corporationImg" style="margin-bottom: 22px;" :src="'http://www.soouya.com/' + val">
            </a>
            <img v-else class="corporationImg" style="margin-bottom: 22px;" src="http://www.soouya.com/upload/util/empty.png">
          </el-col>
          <el-col :span="4">
            <p>法人身份证正面照片</p>
            <a v-if="customerObj.corporation.idUrl" :href="'http://www.soouya.com'+val" class="image" v-lightbox="[customerObj.corporation.idUrl]" v-for="val in [customerObj.corporation.idUrl]">
              <img v-if="val" class="corporationImg" style="margin-bottom: 22px;" :src="'http://www.soouya.com/' + val">
            </a>
            <img v-else class="corporationImg" style="margin-bottom: 22px;" src="http://www.soouya.com/upload/util/empty.png">
          </el-col>
          <el-col :span="4">
            <p>法人身份证反面照片</p>
            <a v-if="customerObj.corporation.idBackUrl" :href="'http://www.soouya.com'+val" class="image" v-lightbox="[customerObj.corporation.idBackUrl]" v-for="val in [customerObj.corporation.idBackUrl]">
              <img v-if="val" class="corporationImg" style="margin-bottom: 22px;" :src="'http://www.soouya.com/' + val">
            </a>
            <img v-else class="corporationImg" style="margin-bottom: 22px;" src="http://www.soouya.com/upload/util/empty.png">
          </el-col>
        </el-row>
        <el-row class="customer-info-row" v-if="updateForm.corporationImg != null">
          <el-form :model="customerObj" :inline="true">
            <el-col :span="4">
              <p>营业执照</p>
              <el-form-item prop="licenseUrl">
                <el-upload action="/soouya/v1/uploadFile?_model=User" :multiple="false" :show-file-list="false" :on-success="handleLicenseUrl" title="点击上传图片">
                  <label class="uploadTxt">+</label>
                  <img class="corporationImg" :src="'http://www.soouya.com/' + (updateForm.corporationImg.corporation.licenseUrl == ''?'upload/util/empty.png':updateForm.corporationImg.corporation.licenseUrl)"></img>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <p>税务登记证</p>
              <el-form-item prop="taxRegistrationCertificateUrl">
                <el-upload action="/soouya/v1/uploadFile?_model=User" :multiple="false" :show-file-list="false" :on-success="handleTaxRegistrationCertificateUrl" title="点击上传图片">
                  <label class="uploadTxt">+</label>
                  <img class="corporationImg" :src="'http://www.soouya.com/' + (updateForm.corporationImg.corporation.taxRegistrationCertificateUrl == ''?'upload/util/empty.png':updateForm.corporationImg.corporation.taxRegistrationCertificateUrl)"></img>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <p>组织机构代码证</p>
              <el-form-item prop="organizationCodeCertificateUrl">
                <el-upload action="/soouya/v1/uploadFile?_model=User" :multiple="false" :show-file-list="false" :on-success="handleOrganizationCodeCertificateUrl" title="点击上传图片">
                  <label class="uploadTxt">+</label>
                  <img class="corporationImg" :src="'http://www.soouya.com/' + (updateForm.corporationImg.corporation.organizationCodeCertificateUrl == ''?'upload/util/empty.png':updateForm.corporationImg.corporation.organizationCodeCertificateUrl)"></img>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <p>经营场所，门头照片</p>
              <el-form-item prop="placeUrl">
                <el-upload action="/soouya/v1/uploadFile?_model=User" :multiple="false" :show-file-list="false" :on-success="handlePlaceUrl" title="点击上传图片">
                  <label class="uploadTxt">+</label>
                  <img class="corporationImg" :src="'http://www.soouya.com/' + (updateForm.corporationImg.corporation.placeUrl == ''?'upload/util/empty.png':updateForm.corporationImg.corporation.placeUrl)"></img>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <p>法人身份证正面照片</p>
              <el-form-item prop="idUrl">
                <el-upload action="/soouya/v1/uploadFile?_model=User" :multiple="false" :show-file-list="false" :on-success="handleidUrl" title="点击上传图片">
                  <label class="uploadTxt">+</label>
                  <img class="corporationImg" :src="'http://www.soouya.com/' + (updateForm.corporationImg.corporation.idUrl == ''?'upload/util/empty.png':updateForm.corporationImg.corporation.idUrl)"></img>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <p>法人身份证反面照片</p>
              <el-form-item prop="idBackUrl">
                <el-upload action="/soouya/v1/uploadFile?_model=User" :multiple="false" :show-file-list="false" :on-success="handleidBackUrl" title="点击上传图片">
                  <label class="uploadTxt">+</label>
                  <img class="corporationImg" :src="'http://www.soouya.com/' + (updateForm.corporationImg.corporation.idBackUrl == ''?'upload/util/empty.png':updateForm.corporationImg.corporation.idBackUrl)"></img>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div class="line"></div>
        <div class="title">
          <h5>收货地址</h5>
          <div class="op update" @click="showUpdate('saveAddr')">
            <span class="icon icon-add"></span>
            <span>新增收货地址</span>
          </div>
        </div>
        <div class="o-row row-address" v-if="updateForm.addressId == ''">
          <el-form class="o-form" ref="addrForm" :model="addrData" :rules="addrRules">
            <el-row>
              <el-col :span="8">
                <el-form-item label="收货人姓名：" prop="name">
                  <el-input v-model="addrData.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收货人电话：" prop="tel">
                  <el-input v-model="addrData.tel"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="省市区" prop="fullAddress">
                  <el-cascader :options="proCity" v-model="addrData.fullAddress">
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收货地址" prop="addr">
                  <el-input v-model="addrData.addr"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="address-op">
              <span class="icon icon-save-g" title="保存" @click="saveOrUpdateAddr"></span>
              <span class="icon icon-del-g" title="取消" @click="updateForm.addressId = null"></span>
            </div>
          </el-form>
        </div>
        <div class="o-row row-address" v-for="address in addressList">
          <div class="clearfix" v-if="updateForm.addressId != address.id">
            <dl class="o-item">
              <dt>收货人姓名:</dt>
              <dd>{{address.name}}</dd>
            </dl>
            <dl class="o-item">
              <dt>收货人电话:</dt>
              <dd>{{address.tel}}</dd>
            </dl>
          </div>
          <div class="clearfix" v-if="updateForm.addressId != address.id">
            <dl class="o-item">
              <dt>收货地址:</dt>
              <dd>{{address.province}}{{address.city}}{{address.area}}{{address.addr}}</dd>
            </dl>
          </div>
          <el-form class="o-form" v-if="updateForm.addressId == address.id" ref="addrForm" :model="addrData" :rules="addrRules">
            <el-row>
              <el-col :span="8">
                <el-form-item label="收货人姓名：" prop="name">
                  <el-input v-model="addrData.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收货人电话：" prop="tel">
                  <el-input v-model="addrData.tel"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="省市区：" prop="fullAddress">
                  <el-cascader :options="proCity" v-model="addrData.fullAddress">
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收货地址：" prop="addr">
                  <el-input v-model="addrData.addr"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="address-op" v-if="updateForm.addressId != address.id">
            <span class="icon icon-editor" title="编辑" @click="showUpdateAddr(address)"></span>
            <span class="icon icon-delete" title="删除" @click="deleteAddr(address.id)"></span>
          </div>
          <div class="address-op" v-if="updateForm.addressId == address.id">
            <span class="icon icon-save-g" title="保存" @click="saveOrUpdateAddr"></span>
            <span class="icon icon-del-g" title="取消" @click="updateForm.addressId = null"></span>
          </div>
        </div>
        <div class="line"></div>
        <div class="title">
          <h5>收款方式</h5>
          <div class="op update" @click="showUpdate('saveBankAccount')">
            <span class="icon icon-add"></span>
            <span>新增收款方式</span>
          </div>
        </div>
        <div class="o-row row-address" v-if="updateForm.bankAccountId == ''">
          <el-form class="o-form" ref="bankAccountForm" :model="bankAccountData" :inline="true" :rules="bankAccountRules">
            <el-row>
              <el-col :span="8">
                <el-form-item label="开户支行：" prop="fullBankAccount">
                  <el-cascader @active-item-change="handleItemChange" :options="bankList" v-model="bankAccountData.fullBankAccount">
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="账户类型：">
                  <el-radio class="radio" v-model="bankAccountData.type" label="1">个人</el-radio>
                  <el-radio class="radio" v-model="bankAccountData.type" label="2">企业</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="银行卡号：" prop="number">
                  <el-input v-model="bankAccountData.number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="bankAccountData.type == 1">
                <el-form-item label="银行账号开户名：" prop="realName">
                  <el-input v-model="bankAccountData.realName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="bankAccountData.type == 2">
                <el-form-item label="对公账号公司名：" prop="company">
                  <el-input v-model="bankAccountData.company"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="address-op">
              <span class="icon icon-save-g" title="保存" @click="saveOrUpdateBankAccount"></span>
              <span class="icon icon-del-g" title="取消" @click="updateForm.bankAccountId = null"></span>
            </div>
          </el-form>
        </div>
        <div class="o-row row-address" v-for="bankAccount in bankAccountList">
          <div class="clearfix" v-if="updateForm.bankAccountId != bankAccount.id">
            <dl class="o-item">
              <dt>银行名称:</dt>
              <dd>{{bankAccount.bank}}</dd>
            </dl>
            <dl class="o-item">
              <dt>银行账号开户名:</dt>
              <dd>{{bankAccount.realName}}{{bankAccount.company}}</dd>
            </dl>
          </div>
          <div class="clearfix" v-if="updateForm.bankAccountId != bankAccount.id">
            <dl class="o-item">
              <dt>银行卡号:</dt>
              <dd>{{bankAccount.number}}</dd>
            </dl>
            <dl class="o-item">
              <dt>开户地区:</dt>
              <dd>{{bankAccount.province}}{{bankAccount.city}}{{bankAccount.area}}</dd>
            </dl>
          </div>
          <el-form class="o-form" v-if="updateForm.bankAccountId == bankAccount.id" ref="bankAccountForm" :model="bankAccountData" :inline="true" :rules="bankAccountRules">
            <el-row>
              <el-col :span="8">
                <el-form-item label="开户支行：" prop="fullBankAccount">
                  <el-cascader @active-item-change="handleItemChange" :options="bankList" v-model="bankAccountData.fullBankAccount">
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="账户类型：">
                  <el-radio class="radio" v-model="bankAccountData.type" label="1">个人</el-radio>
                  <el-radio class="radio" v-model="bankAccountData.type" label="2">企业</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="银行卡号：" prop="number">
                  <el-input v-model="bankAccountData.number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="bankAccountData.type == 1">
                <el-form-item label="银行账号开户名：" prop="realName">
                  <el-input v-model="bankAccountData.realName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="bankAccountData.type == 2">
                <el-form-item label="对公账号公司名：" prop="company">
                  <el-input v-model="bankAccountData.company"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="address-op" v-if="updateForm.bankAccountId != bankAccount.id">
            <span class="icon icon-editor" v-if="bankAccount.number != '6228480********9170'" title="编辑" @click="showUpdateBankAccount(bankAccount)"></span>
            <span class="icon icon-delete" v-if="bankAccount.number != '6228480********9170'" title="删除" @click="deleteBankAccount(bankAccount.id)"></span>
          </div>
          <div class="address-op" v-if="updateForm.bankAccountId == bankAccount.id">
            <span class="icon icon-save-g" title="保存" @click="saveOrUpdateBankAccount"></span>
            <span class="icon icon-del-g" title="取消" @click="updateForm.bankAccountId = null"></span>
          </div>
        </div>
        <div class="line"></div>
        <div class="title">
          <h5>绑定关系</h5>
          <div class="op update" v-if="updateForm.bind == null">
            <span @click="showUpdate('bind')" class="icon icon-editor"></span>
            <span @click="showUpdate('bind')">编辑</span>
          </div>
          <div class="op save" v-if="updateForm.bind != null">
            <span @click="updateCustomer" class="icon icon-save"></span>
            <span @click="updateCustomer">保存</span> |
            <span @click="updateForm.bind = null" class="icon icon-cancel"></span>
            <span @click="updateForm.bind = null">取消</span>
          </div>
        </div>
        <div class="o-row" v-if="updateForm.bind == null">
          <dl class="o-item">
            <dt>跟单员:</dt>
            <dd>{{customerObj.followerName}}&nbsp;&nbsp;&nbsp;{{customerObj.followerTel}}</dd>
          </dl>
          <dl class="o-item">
            <dt>销售员:</dt>
            <dd>{{customerObj.salerName}}&nbsp;&nbsp;&nbsp;{{customerObj.salerTel}}</dd>
          </dl>
        </div>
        <div class="o-row" v-if="updateForm.bind != null">
          <dl class="o-item">
            <dt>跟单员:</dt>
            <dd>
              <el-select v-model="updateForm.bind.followerId" placeholder="请选择跟单员">
                <el-option label="请选择跟单员" value=""></el-option>
                <el-option v-for="follower in followerList" :value="follower.id" :label="follower.realName"></el-option>
              </el-select>
            </dd>
          </dl>
          <dl class="o-item">
            <dt>销售员:</dt>
            <dd>
              <el-select v-model="updateForm.bind.salerId" placeholder="请选择销售员">
                <el-option label="请选择请选择销售员" value=""></el-option>
                <el-option v-for="saler in salerList" :value="saler.id" :label="saler.realName"></el-option>
              </el-select>
            </dd>
          </dl>
        </div>
        <div class="line"></div>
        <div class="title">
          <h5>金融信息</h5>
          <div class="op update" v-if="updateForm.finance == null">
            <span @click="showUpdate('finance')" class="icon icon-editor"></span>
            <span @click="showUpdate('finance')">编辑</span>
          </div>
          <div class="op save" v-if="updateForm.finance != null">
            <span @click="updateCustomer" class="icon icon-save"></span>
            <span @click="updateCustomer">保存</span> |
            <span @click="updateForm.finance = null" class="icon icon-cancel"></span>
            <span @click="updateForm.finance = null">取消</span>
          </div>
        </div>
        <div class="o-finance mb20" v-if="updateForm.finance == null">
          <h4>徙木白条 <span v-if="customerObj.hasOpenedBaitiao==1" class="status">已开通</span></h4>
          <div class="wrap" v-if="customerObj.hasOpenedBaitiao!=1">
            <dl>
              <dt>申请白条资格:</dt>
              <dd>
                <span v-if="customerObj.canApplyBaitiao ==1" class="status-had">有</span>
                <span v-else class="status-not">否</span>
              </dd>
            </dl>
            <dl v-if="customerObj.canApplyBaitiao ==1">
              <dt>开通白条:</dt>
              <dd>
                <span v-if="customerObj.baitiaoApplyStatus==0" class="status-not">未申请</span>
                <span v-if="customerObj.baitiaoApplyStatus==1" class="status-had">申请中</span>
                <span v-if="customerObj.baitiaoApplyStatus==2" class="status-had">申请成功</span>
                <!-- <span v-if="customerObj.hasOpenedBaitiao==1" class="status-had">有</span>
                <span v-else class="status-not">否</span> -->
              </dd>
            </dl>
          </div>
          <div class="wrap mt10" v-if="customerObj.hasOpenedBaitiao==1">
            <dl>
              <dt>申请人姓名:</dt>
              <dd>
                {{customerObj.corporationApply.name}}
              </dd>
            </dl>
            <dl>
              <dt>电话:</dt>
              <dd>
                {{customerObj.corporationApply.mobilePhone}}
              </dd>
            </dl>
            <dl>
              <dt>身份证号:</dt>
              <dd>
                {{customerObj.corporationApply.idNumber}}
              </dd>
            </dl>
            <dl>
              <dt>
                <p class="green" style="cursor:pointer;" v-if="!showCorporation" @click="showCorporation=true">查看更多<i class="el-icon-arrow-down"></i></p>
                <p class="green" style="cursor:pointer;" v-if="showCorporation" @click="showCorporation=false">隐藏<i class="el-icon-arrow-up"></i></p>
              </dt>
            </dl>
            <div v-if="showCorporation">
              <dl style="clear:both">
                <dt>性别:</dt>
                <dd>
                  {{customerObj.corporationApply.sex == -1?'':(customerObj.corporationApply.sex == 0?'男':'女')}}
                </dd>
              </dl>
              <dl>
                <dt>民族:</dt>
                <dd>
                  {{customerObj.corporationApply.nation}}
                </dd>
              </dl>
              <dl>
                <dt>出生日期:</dt>
                <dd>
                  {{customerObj.corporationApply.birthDate}}
                </dd>
              </dl>
              <dl>
                <dt>户籍地址:</dt>
                <dd>
                  {{customerObj.corporationApply.permanentAddress}}
                </dd>
              </dl>
              <dl>
                <dt>是否有子女:</dt>
                <dd>
                  {{customerObj.corporationApply.hasChildren == -1?'':(customerObj.corporationApply.hasChildren == 0?'无':'有')}}
                </dd>
              </dl>
              <dl style="clear:both">
                <dt>签发机关:</dt>
                <dd>
                  {{customerObj.corporationApply.issuingAuthority}}
                </dd>
              </dl>
              <dl>
                <dt>生效日期:</dt>
                <dd>
                  {{customerObj.corporationApply.startDate}}
                </dd>
              </dl>
              <dl>
                <dt>失效日期:</dt>
                <dd>
                  {{customerObj.corporationApply.endDate}}
                </dd>
              </dl>
              <dl style="clear:both">
                <dt>电子邮箱:</dt>
                <dd>
                  {{customerObj.corporationApply.email}}
                </dd>
              </dl>
              <dl>
                <dt>居住状态:</dt>
                <dd>
                  {{customerObj.corporationApply.liveStatus}}
                </dd>
              </dl>
              <dl>
                <dt>居住地址:</dt>
                <dd>
                  {{customerObj.corporationApply.liveAddr}}
                </dd>
              </dl>
              <dl style="clear:both">
                <dt>婚姻状态:</dt>
                <dd>
                  {{customerObj.corporationApply.marry}}
                </dd>
              </dl>
              <dl>
                <dt>配偶姓名:</dt>
                <dd>
                  {{customerObj.corporationApply.spouseName}}
                </dd>
              </dl>
              <dl>
                <dt>配偶手机号:</dt>
                <dd>
                  {{customerObj.corporationApply.spouseMobilePhone}}
                </dd>
              </dl>
              <dl>
                <dt>配偶身份证:</dt>
                <dd>
                  {{customerObj.corporationApply.spouseIdNumber}}
                </dd>
              </dl>
              <dl style="clear:both">
                <dt>是否有驾照:</dt>
                <dd>
                  {{customerObj.corporationApply.hasDrivingLicense == -1?'':(customerObj.corporationApply.hasDrivingLicense == 0?'无':'有')}}
                </dd>
              </dl>
              <dl>
                <dt>是否有车:</dt>
                <dd>
                  {{customerObj.corporationApply.hasCar == -1?'':(customerObj.corporationApply.hasCar == 0?'无':'有')}}
                </dd>
              </dl>
              <dl>
                <dt>车牌号:</dt>
                <dd>
                  {{customerObj.corporationApply.carNumber}}
                </dd>
              </dl>
              <dl style="clear:both">
                <dt>紧急联系人:</dt>
                <dd>
                  {{customerObj.corporationApply.urgentName1}}
                </dd>
              </dl>
              <dl>
                <dt>联系电话:</dt>
                <dd>
                  {{customerObj.corporationApply.urgentTel1}}
                </dd>
              </dl>
              <dl>
                <dt>关系:</dt>
                <dd>
                  {{customerObj.corporationApply.urgentRelationship1}}
                </dd>
              </dl>
              <dl style="clear:both">
                <dt>紧急联系人:</dt>
                <dd>
                  {{customerObj.corporationApply.urgentName2}}
                </dd>
              </dl>
              <dl>
                <dt>联系电话:</dt>
                <dd>
                  {{customerObj.corporationApply.urgentTel2}}
                </dd>
              </dl>
              <dl>
                <dt>关系:</dt>
                <dd>
                  {{customerObj.corporationApply.urgentRelationship2}}
                </dd>
              </dl>
              <dl style="clear:both">
                <dt>开户银行:</dt>
                <dd>
                  {{customerObj.corporationApply.bank}}
                </dd>
              </dl>
              <dl>
                <dt>企业账户号:</dt>
                <dd>
                  {{customerObj.corporationApply.bankAccount}}
                </dd>
              </dl>
              <dl>
                <dt>银行开户手机号:</dt>
                <dd>
                  {{customerObj.corporationApply.bankTel}}
                </dd>
              </dl>
              <dl style="clear:both">
                <dt>申请人身份证正面照片:</dt>
                <dd>
                </dd>
              </dl>
              <dl>
                <dt>申请人身份证反面照片:</dt>
                <dd>
                </dd>
              </dl>
              <dl style="clear:both">
                <dd>
                  <a v-if="customerObj.corporationApply.idUrl" :href="'http://www.soouya.com'+val" class="image" v-lightbox="[customerObj.corporationApply.idUrl]" v-for="val in [customerObj.corporationApply.idUrl]">
              <img v-if="val" class="corporationImg" style="margin-bottom: 22px;" :src="'http://www.soouya.com/' + val">
            </a>
                  <img v-else class="corporationImg" style="margin-bottom: 22px;" src="http://www.soouya.com/upload/util/empty.png">
                </dd>
              </dl>
              <dl>
                <dd>
                  <a v-if="customerObj.corporationApply.idBackUrl" :href="'http://www.soouya.com'+val" class="image" v-lightbox="[customerObj.corporationApply.idBackUrl]" v-for="val in [customerObj.corporationApply.idBackUrl]">
              <img v-if="val" class="corporationImg" style="margin-bottom: 22px;" :src="'http://www.soouya.com/' + val">
            </a>
                  <img v-else class="corporationImg" style="margin-bottom: 22px;" src="http://www.soouya.com/upload/util/empty.png">
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="o-finance" v-if="updateForm.finance == null">
          <h4>雁阵信贷 <span v-if="customerObj.hasOpenedYanzhen ==1" class="status">已开通</span> </h4>
          <div class="wrap" v-if="customerObj.hasOpenedYanzhen !=1">
            <dl>
              <dt>申请信贷资格:</dt>
              <dd>
                <span v-if="customerObj.canApplyYanzhen ==1" class="status-had">有</span>
                <span v-else class="status-not">否</span>
              </dd>
            </dl>
            <dl v-if="customerObj.canApplyYanzhen ==1">
              <dt>开通信贷:</dt>
              <dd>
                <span v-if="customerObj.hasOpenedYanzhen ==1" class="status-had">有</span>
                <span v-if="customerObj.hasOpenedYanzhen ==0" class="status-not">否</span>
                <span v-if="customerObj.hasOpenedYanzhen ==2" class="status-not">申请中</span>
                <span v-if="customerObj.hasOpenedYanzhen ==3" class="status-not">申请失败</span>
                <span v-if="customerObj.hasOpenedYanzhen ==4" class="status-not">否</span>
              </dd>
            </dl>
          </div>
          <div class="wrap mt10" v-if="customerObj.hasOpenedYanzhen==1">
            <dl>
              <dt>申请人姓名:</dt>
              <dd>
                {{customerObj.yanzhenCorporation.userName}}
              </dd>
            </dl>
            <dl>
              <dt>电话:</dt>
              <dd>
                {{customerObj.yanzhenCorporation.contactTel}}
              </dd>
            </dl>
            <dl>
              <dt>身份证号:</dt>
              <dd>
                {{customerObj.yanzhenCorporation.idNo}}
              </dd>
            </dl>
            <dl>
              <dt>雁阵的贷款期限:</dt>
              <dd>
                {{customerObj.yanzhenLoanTerm}}天
              </dd>
            </dl>
          </div>
          <div class="wrap mt10" v-if="customerObj.hasOpenedYanzhen==1">
            <dl>
              <dt>身份证正面照片:</dt>
              <div class="img">
                <a v-if="customerObj.yanzhenCorporation.idFrontUrl" :href="'http://www.soouya.com'+val" class="image" v-lightbox="[customerObj.yanzhenCorporation.idFrontUrl]" v-for="val in [customerObj.yanzhenCorporation.idFrontUrl]">
              <img v-if="val" class="corporationImg" style="margin-bottom: 22px;" :src="'http://www.soouya.com/' + val">
            </a>
                <img v-else class="corporationImg" style="margin-bottom: 22px;" src="http://www.soouya.com/upload/util/empty.png">
              </div>
            </dl>
            <dl>
              <dt>手持身份证正面照片:</dt>
              <div class="img">
                <a v-if="customerObj.yanzhenCorporation.taxRegistrationUrl" :href="'http://www.soouya.com'+val" class="image" v-lightbox="[customerObj.yanzhenCorporation.taxRegistrationUrl]" v-for="val in [customerObj.yanzhenCorporation.taxRegistrationUrl]">
              <img v-if="val" class="corporationImg" style="margin-bottom: 22px;" :src="'http://www.soouya.com/' + val">
            </a>
                <img v-else class="corporationImg" style="margin-bottom: 22px;" src="http://www.soouya.com/upload/util/empty.png">
              </div>
            </dl>
          </div>
        </div>
        <el-form class="o-form finance-form" :inline="true" :rules="financeRules" ref="updateForm.finance" :model="updateForm.finance" v-if="updateForm.finance != null">
          <h4>徙木白条</h4>
          <el-row class="mb20">
            <el-col :span="8">
              <el-checkbox v-model="updateForm.finance.canApplyBaitiaoBox">申请白条资格</el-checkbox>
            </el-col>
            <el-col :span="8">
              <el-checkbox v-if="updateForm.finance.canApplyBaitiaoBox" v-model="updateForm.finance.hasOpenedBaitiaoBox">开通白条</el-checkbox>
              <el-checkbox v-if="!updateForm.finance.canApplyBaitiaoBox" disabled>开通白条</el-checkbox>
            </el-col>
          </el-row>
          <div v-if="updateForm.finance.canApplyBaitiaoBox&&updateForm.finance.hasOpenedBaitiaoBox">
            <el-row class="customer-info-row">
              <el-col :span="6">
                <el-form-item prop="corporationApply.name">申请人姓名:
                  <el-input style="width: 180px" v-model="updateForm.finance.corporationApply.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="corporationApply.idNumber">申请人身份证号:
                  <el-input style="width: 180px" v-model="updateForm.finance.corporationApply.idNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="corporationApply.mobilePhone">申请人联系电话:
                  <el-input style="width: 180px" type="number" v-model="updateForm.finance.corporationApply.mobilePhone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">性别：
                <el-select v-model="updateForm.finance.corporationApply.sex" placeholder="请选择性别" style="width: 180px">
                  <el-option :value="-1" label="请选择性别"></el-option>
                  <el-option :value="0" label="男"></el-option>
                  <el-option :value="1" label="女"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">民族：
                <el-select v-model="updateForm.finance.corporationApply.nation" placeholder="请选择民族" style="width: 180px">
                  <el-option value="" label="请选择民族"></el-option>
                  <el-option value="汉族"></el-option>
                  <el-option value="蒙古族"></el-option>
                  <el-option value="满族"></el-option>
                  <el-option value="朝鲜族"></el-option>
                  <el-option value="赫哲族"></el-option>
                  <el-option value="达斡尔族"></el-option>
                  <el-option value="鄂温克族"></el-option>
                  <el-option value="鄂伦春族"></el-option>
                  <el-option value="回族"></el-option>
                  <el-option value="东乡族"></el-option>
                  <el-option value="土族"></el-option>
                  <el-option value="撒拉族"></el-option>
                  <el-option value="保安族"></el-option>
                  <el-option value="裕固族"></el-option>
                  <el-option value="维吾尔族"></el-option>
                  <el-option value="哈萨克族"></el-option>
                  <el-option value="柯尔克孜族"></el-option>
                  <el-option value="锡伯族"></el-option>
                  <el-option value="塔吉克族"></el-option>
                  <el-option value="乌孜别克族"></el-option>
                  <el-option value="俄罗斯族"></el-option>
                  <el-option value="塔塔尔族"></el-option>
                  <el-option value="藏族"></el-option>
                  <el-option value="门巴族"></el-option>
                  <el-option value="珞巴族"></el-option>
                  <el-option value="羌族"></el-option>
                  <el-option value="彝族"></el-option>
                  <el-option value="白族"></el-option>
                  <el-option value="哈尼族"></el-option>
                  <el-option value="傣族"></el-option>
                  <el-option value="傈僳族"></el-option>
                  <el-option value="佤族"></el-option>
                  <el-option value="拉祜族"></el-option>
                  <el-option value="纳西族"></el-option>
                  <el-option value="景颇族"></el-option>
                  <el-option value="布朗族"></el-option>
                  <el-option value="阿昌族"></el-option>
                  <el-option value="普米族"></el-option>
                  <el-option value="怒族"></el-option>
                  <el-option value="德昂族"></el-option>
                  <el-option value="独龙族"></el-option>
                  <el-option value="基诺族"></el-option>
                  <el-option value="苗族"></el-option>
                  <el-option value="布依族"></el-option>
                  <el-option value="侗族"></el-option>
                  <el-option value="水族"></el-option>
                  <el-option value="仡佬族"></el-option>
                  <el-option value="壮族"></el-option>
                  <el-option value="瑶族"></el-option>
                  <el-option value="仫佬族"></el-option>
                  <el-option value="毛南族"></el-option>
                  <el-option value="京族"></el-option>
                  <el-option value="土家族"></el-option>
                  <el-option value="黎族"></el-option>
                  <el-option value="畲族"></el-option>
                  <el-option value="高山族"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">出生日期：
                <el-form-item prop="corporationApply.birthDate">
                  <el-date-picker v-model="updateForm.finance.corporationApply.birthDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">户籍地址：
                <el-form-item prop="corporationApply.permanentAddress">
                  <el-input v-model="updateForm.finance.corporationApply.permanentAddress" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">是否有子女：
                <el-select v-model="updateForm.finance.corporationApply.hasChildren" placeholder="请选择是否有子女" style="width: 180px">
                  <el-option :value="-1" label="请选择是否有子女"></el-option>
                  <el-option :value="1" label="有"></el-option>
                  <el-option :value="0" label="无"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">签发机关：
                <el-form-item prop="corporationApply.issuingAuthority">
                  <el-input v-model="updateForm.finance.corporationApply.issuingAuthority" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">生效日期：
                <el-form-item prop="corporationApply.startDate">
                  <el-date-picker v-model="updateForm.finance.corporationApply.startDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">失效日期：
                <el-form-item prop="corporationApply.endDate">
                  <el-date-picker v-model="updateForm.finance.corporationApply.endDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">电子邮箱：
                <el-form-item prop="corporationApply.email">
                  <el-input v-model="updateForm.finance.corporationApply.email" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">居住状态：
                <el-form-item prop="corporationApply.liveStatus">
                  <el-select v-model="updateForm.finance.corporationApply.liveStatus" placeholder="请选择居住状态" style="width: 180px">
                    <el-option value="" label="请选择居住状态"></el-option>
                    <el-option value="自购无贷" label="自购无贷"></el-option>
                    <el-option value="自购有贷" label="自购有贷"></el-option>
                    <el-option value="集体宿舍" label="集体宿舍"></el-option>
                    <el-option value="租房" label="租房"></el-option>
                    <el-option value="借宿亲属" label="借宿亲属"></el-option>
                    <el-option value="其他" label="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">居住地址：
                <el-form-item prop="corporationApply.liveAddr">
                  <el-input v-model="updateForm.finance.corporationApply.liveAddr" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">婚姻状态：
                <el-select v-model="updateForm.finance.corporationApply.marry" placeholder="请选择婚姻状态" style="width: 180px">
                  <el-option value="" label="请选择婚姻状态"></el-option>
                  <el-option value="未婚" label="未婚"></el-option>
                  <el-option value="已婚" label="已婚"></el-option>
                  <el-option value="离异" label="离异"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">配偶姓名：
                <el-form-item prop="corporationApply.spouseName">
                  <el-input v-model="updateForm.finance.corporationApply.spouseName" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">配偶手机号：
                <el-form-item prop="corporationApply.spouseMobilePhone">
                  <el-input v-model="updateForm.finance.corporationApply.spouseMobilePhone" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">配偶身份证：
                <el-form-item prop="corporationApply.spouseIdNumber">
                  <el-input v-model="updateForm.finance.corporationApply.spouseIdNumber" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="customer-info-row">
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">是否有驾照：
                <el-select v-model="updateForm.finance.corporationApply.hasDrivingLicense" placeholder="请选择是否有驾照" style="width: 180px">
                  <el-option :value="-1" label="请选择是否有驾照"></el-option>
                  <el-option :value="1" label="有"></el-option>
                  <el-option :value="0" label="无"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">是否有车：
                <el-select v-model="updateForm.finance.corporationApply.hasCar" placeholder="请选择是否有车" style="width: 180px">
                  <el-option :value="-1" label="请选择是否有车"></el-option>
                  <el-option :value="1" label="有"></el-option>
                  <el-option :value="0" label="无"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">车牌号：
                <el-form-item prop="corporationApply.carNumber">
                  <el-input v-model="updateForm.finance.corporationApply.carNumber" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">紧急联系人：
                <el-form-item prop="corporationApply.urgentName1">
                  <el-input v-model="updateForm.finance.corporationApply.urgentName1" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">联系电话：
                <el-form-item prop="corporationApply.urgentTel1">
                  <el-input v-model="updateForm.finance.corporationApply.urgentTel1" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">关系：
                <el-select v-model="updateForm.finance.corporationApply.urgentRelationship1" placeholder="请选择关系" style="width: 180px">
                  <el-option label="请选择关系" value=""></el-option>
                  <el-option label="父母" value="父母"></el-option>
                  <el-option label="配偶" value="配偶"></el-option>
                  <el-option label="子女" value="子女"></el-option>
                  <el-option label="兄弟姐妹" value="兄弟姐妹"></el-option>
                  <el-option label="亲属" value="亲属"></el-option>
                  <el-option label="朋友" value="朋友"></el-option>
                  <el-option label="同学" value="同学"></el-option>
                  <el-option label="同事" value="同事"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">紧急联系人：
                <el-form-item prop="corporationApply.urgentName2">
                  <el-input v-model="updateForm.finance.corporationApply.urgentName2" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">联系电话：
                <el-form-item prop="corporationApply.urgentTel2">
                  <el-input v-model="updateForm.finance.corporationApply.urgentTel2" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">关系：
                <el-select v-model="updateForm.finance.corporationApply.urgentRelationship2" placeholder="请选择关系" style="width: 180px">
                  <el-option label="请选择关系" value=""></el-option>
                  <el-option label="父母" value="父母"></el-option>
                  <el-option label="配偶" value="配偶"></el-option>
                  <el-option label="子女" value="子女"></el-option>
                  <el-option label="兄弟姐妹" value="兄弟姐妹"></el-option>
                  <el-option label="亲属" value="亲属"></el-option>
                  <el-option label="朋友" value="朋友"></el-option>
                  <el-option label="同学" value="同学"></el-option>
                  <el-option label="同事" value="同事"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">开户银行：
                <el-form-item prop="corporationApply.bank">
                  <el-input v-model="updateForm.finance.corporationApply.bank" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">企业账户号：
                <el-form-item prop="corporationApply.bankAccount">
                  <el-input v-model="updateForm.finance.corporationApply.bankAccount" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">银行开户手机号：
                <el-form-item prop="corporationApply.bankTel">
                  <el-input v-model="updateForm.finance.corporationApply.bankTel" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">
                <el-form-item prop="idUrl">
                  <p>申请人身份证正面照片</p>
                  <el-upload style="position:relative;" action="/soouya/v1/uploadFile?_model=User" :multiple="false" :show-file-list="false" :on-success="handleApplyidUrl" title="点击上传图片">
                    <label class="uploadTxt">+</label>
                    <img class="corporationImg" :src="'http://www.soouya.com/' + (updateForm.finance.corporationApply.idUrl == ''?'upload/util/empty.png':updateForm.finance.corporationApply.idUrl)"></img>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="idBackUrl">
                  <p>申请人身份证反面照片</p>
                  <el-upload style="position:relative;" action="/soouya/v1/uploadFile?_model=User" :multiple="false" :show-file-list="false" :on-success="handleApplyidBackUrl" title="点击上传图片">
                    <label class="uploadTxt">+</label>
                    <img class="corporationImg" :src="'http://www.soouya.com/' + (updateForm.finance.corporationApply.idBackUrl == ''?'upload/util/empty.png':updateForm.finance.corporationApply.idBackUrl)"></img>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <h4>雁阵信贷</h4>
          <el-row class="mb20">
            <el-col :span="8">
              <el-checkbox v-model="updateForm.finance.canApplyYanzhenBox">申请信贷资格</el-checkbox>
            </el-col>
            <el-col :span="8">
              <el-checkbox v-if="updateForm.finance.canApplyYanzhenBox" v-model="updateForm.finance.hasOpenedYanzhenBox">开通信贷</el-checkbox>
              <el-checkbox v-if="!updateForm.finance.canApplyYanzhenBox" disabled>开通信贷</el-checkbox>
            </el-col>
          </el-row>
          <el-row style="margin-left:-17px;" v-if="updateForm.finance.canApplyYanzhenBox&&updateForm.finance.hasOpenedYanzhenBox">
            <el-col :span="8">
              <el-form-item label="申请人姓名:" prop="yanzhenCorporation.userName">
                <el-input v-model="updateForm.finance.yanzhenCorporation.userName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请人身份证号:" prop="yanzhenCorporation.idNo">
                <el-input v-model="updateForm.finance.yanzhenCorporation.idNo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请人联系电话:" prop="yanzhenCorporation.contactTel">
                <el-input type="number" v-model="updateForm.finance.yanzhenCorporation.contactTel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="" v-if="updateForm.finance.canApplyYanzhenBox&&updateForm.finance.hasOpenedYanzhenBox">
            <el-col :span="8">
              <el-form-item prop="licenseUrl" label="申请人身份证正面照片:">
                <el-upload action="/soouya/v1/uploadFile?_model=User" :multiple="false" :show-file-list="false" :on-success="handleidFrontUrl" title="点击上传图片">
                  <label class="uploadTxt">+</label>
                  <img class="corporationImg" :src="'http://www.soouya.com/' + (updateForm.finance.yanzhenCorporation.idFrontUrl == ''?'upload/util/empty.png':updateForm.finance.yanzhenCorporation.idFrontUrl)"></img>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left:-11px;">
              <el-form-item prop="licenseUrl" label="申请人手持身份证照片:">
                <el-upload action="/soouya/v1/uploadFile?_model=User" :multiple="false" :show-file-list="false" :on-success="handletaxRegistrationUrl" title="点击上传图片">
                  <label class="uploadTxt">+</label>
                  <img class="corporationImg" :src="'http://www.soouya.com/' + (updateForm.finance.yanzhenCorporation.taxRegistrationUrl == ''?'upload/util/empty.png':updateForm.finance.yanzhenCorporation.taxRegistrationUrl)"></img>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <div class="line"></div>
          <div class="title">
            <h5>法人信息</h5>
            <div class="op update" v-if="updateForm.corporationInfo == null">
              <span @click="showUpdate('corporationInfo')" class="icon icon-editor"></span>
              <span @click="showUpdate('corporationInfo')">编辑</span>
            </div>
            <div class="op save" v-if="updateForm.corporationInfo != null">
              <span @click="updateCustomer" class="icon icon-save"></span>
              <span @click="updateCustomer">保存</span> |
              <span @click="updateForm.corporationInfo = null" class="icon icon-cancel"></span>
              <span @click="updateForm.corporationInfo = null">取消</span>
            </div>
          </div>
          <div v-if="updateForm.corporationInfo == null">
            <el-row class="customer-info-row">
              <el-col :span="6">姓名：{{customerObj.corporation.name}}</el-col>
              <el-col :span="6">性别：{{customerObj.corporation.sex == -1?'':(customerObj.corporation.sex == 0?'男':'女')}}</el-col>
              <el-col :span="6">民族：{{customerObj.corporation.nation}}</el-col>
              <el-col :span="6">出生日期：{{customerObj.corporation.birthDate}}</el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">身份证号：{{customerObj.corporation.idNumber}}</el-col>
              <el-col :span="6">户籍地址：{{customerObj.corporation.permanentAddress}}</el-col>
              <el-col :span="6">是否有子女：{{customerObj.corporation.hasChildren == -1?'':(customerObj.corporation.hasChildren == 0?'无':'有')}}</el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">签发机关：{{customerObj.corporation.issuingAuthority}}</el-col>
              <el-col :span="6">生效日期：{{customerObj.corporation.startDate}}</el-col>
              <el-col :span="6">失效日期：{{customerObj.corporation.endDate}}</el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">手机号：{{customerObj.corporation.mobilePhone}}</el-col>
              <el-col :span="6">电子邮箱：{{customerObj.corporation.email}}</el-col>
              <el-col :span="6">居住状态：{{customerObj.corporation.liveStatus}}</el-col>
              <el-col :span="6">居住地址：{{customerObj.corporation.liveAddr}}</el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">婚姻状态：{{customerObj.corporation.marry}}</el-col>
              <el-col :span="6">配偶姓名：{{customerObj.corporation.spouseName}}</el-col>
              <el-col :span="6">配偶手机号：{{customerObj.corporation.spouseMobilePhone}}</el-col>
              <el-col :span="6">配偶身份证：{{customerObj.corporation.spouseIdNumber}}</el-col>
            </el-row>
            <el-row class="customer-info-row">
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">是否有驾照：{{customerObj.corporation.hasDrivingLicense == -1?'':(customerObj.corporation.hasDrivingLicense == 0?'无':'有')}}</el-col>
              <el-col :span="6">是否有车：{{customerObj.corporation.hasCar == -1?'':(customerObj.corporation.hasCar == 0?'无':'有')}}</el-col>
              <el-col :span="6">车牌号：{{customerObj.corporation.carNumber}}</el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">紧急联系人：{{customerObj.corporation.urgentName1}}</el-col>
              <el-col :span="6">联系电话：{{customerObj.corporation.urgentTel1}}</el-col>
              <el-col :span="6">关系：{{customerObj.corporation.urgentRelationship1}}</el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">紧急联系人：{{customerObj.corporation.urgentName2}}</el-col>
              <el-col :span="6">联系电话：{{customerObj.corporation.urgentTel2}}</el-col>
              <el-col :span="6">关系：{{customerObj.corporation.urgentRelationship2}}</el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">开户银行：{{customerObj.corporation.bank}}</el-col>
              <el-col :span="6">企业账户号：{{customerObj.corporation.bankAccount}}</el-col>
              <el-col :span="6">银行开户手机号：{{customerObj.corporation.bankTel}}</el-col>
              <el-col :span="6"></el-col>
            </el-row>
          </div>
          <el-form class="o-form" v-else ref="corporationInfoForm" :model="updateForm.corporationInfo" :inline="true" :rules="corporationInfoRules">
            <el-row class="customer-info-row">
              <el-col :span="6">姓名：
                <el-form-item prop="name">
                  <el-input v-model="updateForm.corporationInfo.name" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">性别：
                <el-select v-model="updateForm.corporationInfo.sex" placeholder="请选择性别" style="width: 180px">
                  <el-option :value="-1" label="请选择性别"></el-option>
                  <el-option :value="0" label="男"></el-option>
                  <el-option :value="1" label="女"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">民族：
                <el-select v-model="updateForm.corporationInfo.nation" placeholder="请选择民族" style="width: 180px">
                  <el-option value="" label="请选择民族"></el-option>
                  <el-option value="汉族"></el-option>
                  <el-option value="蒙古族"></el-option>
                  <el-option value="满族"></el-option>
                  <el-option value="朝鲜族"></el-option>
                  <el-option value="赫哲族"></el-option>
                  <el-option value="达斡尔族"></el-option>
                  <el-option value="鄂温克族"></el-option>
                  <el-option value="鄂伦春族"></el-option>
                  <el-option value="回族"></el-option>
                  <el-option value="东乡族"></el-option>
                  <el-option value="土族"></el-option>
                  <el-option value="撒拉族"></el-option>
                  <el-option value="保安族"></el-option>
                  <el-option value="裕固族"></el-option>
                  <el-option value="维吾尔族"></el-option>
                  <el-option value="哈萨克族"></el-option>
                  <el-option value="柯尔克孜族"></el-option>
                  <el-option value="锡伯族"></el-option>
                  <el-option value="塔吉克族"></el-option>
                  <el-option value="乌孜别克族"></el-option>
                  <el-option value="俄罗斯族"></el-option>
                  <el-option value="塔塔尔族"></el-option>
                  <el-option value="藏族"></el-option>
                  <el-option value="门巴族"></el-option>
                  <el-option value="珞巴族"></el-option>
                  <el-option value="羌族"></el-option>
                  <el-option value="彝族"></el-option>
                  <el-option value="白族"></el-option>
                  <el-option value="哈尼族"></el-option>
                  <el-option value="傣族"></el-option>
                  <el-option value="傈僳族"></el-option>
                  <el-option value="佤族"></el-option>
                  <el-option value="拉祜族"></el-option>
                  <el-option value="纳西族"></el-option>
                  <el-option value="景颇族"></el-option>
                  <el-option value="布朗族"></el-option>
                  <el-option value="阿昌族"></el-option>
                  <el-option value="普米族"></el-option>
                  <el-option value="怒族"></el-option>
                  <el-option value="德昂族"></el-option>
                  <el-option value="独龙族"></el-option>
                  <el-option value="基诺族"></el-option>
                  <el-option value="苗族"></el-option>
                  <el-option value="布依族"></el-option>
                  <el-option value="侗族"></el-option>
                  <el-option value="水族"></el-option>
                  <el-option value="仡佬族"></el-option>
                  <el-option value="壮族"></el-option>
                  <el-option value="瑶族"></el-option>
                  <el-option value="仫佬族"></el-option>
                  <el-option value="毛南族"></el-option>
                  <el-option value="京族"></el-option>
                  <el-option value="土家族"></el-option>
                  <el-option value="黎族"></el-option>
                  <el-option value="畲族"></el-option>
                  <el-option value="高山族"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">出生日期：
                <el-form-item prop="birthDate">
                  <el-date-picker v-model="updateForm.corporationInfo.birthDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">身份证号：
                <el-form-item prop="idNumber">
                  <el-input v-model="updateForm.corporationInfo.idNumber" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">户籍地址：
                <el-form-item prop="permanentAddress">
                  <el-input v-model="updateForm.corporationInfo.permanentAddress" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">是否有子女：
                <el-select v-model="updateForm.corporationInfo.hasChildren" placeholder="请选择是否有子女" style="width: 180px">
                  <el-option :value="-1" label="请选择是否有子女"></el-option>
                  <el-option :value="1" label="有"></el-option>
                  <el-option :value="0" label="无"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">签发机关：
                <el-form-item prop="issuingAuthority">
                  <el-input v-model="updateForm.corporationInfo.issuingAuthority" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">生效日期：
                <el-form-item prop="startDate">
                  <el-date-picker v-model="updateForm.corporationInfo.startDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">失效日期：
                <el-form-item prop="endDate">
                  <el-date-picker v-model="updateForm.corporationInfo.endDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">手机号：
                <el-form-item prop="mobilePhone">
                  <el-input v-model="updateForm.corporationInfo.mobilePhone" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">电子邮箱：
                <el-form-item prop="email">
                  <el-input v-model="updateForm.corporationInfo.email" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">居住状态：
                <el-form-item prop="liveStatus">
                  <el-select v-model="updateForm.corporationInfo.liveStatus" placeholder="请选择居住状态" style="width: 180px">
                    <el-option value="" label="请选择居住状态"></el-option>
                    <el-option value="自购无贷" label="自购无贷"></el-option>
                    <el-option value="自购有贷" label="自购有贷"></el-option>
                    <el-option value="集体宿舍" label="集体宿舍"></el-option>
                    <el-option value="租房" label="租房"></el-option>
                    <el-option value="借宿亲属" label="借宿亲属"></el-option>
                    <el-option value="其他" label="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">居住地址：
                <el-form-item prop="liveAddr">
                  <el-input v-model="updateForm.corporationInfo.liveAddr" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">婚姻状态：
                <el-select v-model="updateForm.corporationInfo.marry" placeholder="请选择婚姻状态" style="width: 180px">
                  <el-option value="" label="请选择婚姻状态"></el-option>
                  <el-option value="未婚" label="未婚"></el-option>
                  <el-option value="已婚" label="已婚"></el-option>
                  <el-option value="离异" label="离异"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">配偶姓名：
                <el-form-item prop="spouseName">
                  <el-input v-model="updateForm.corporationInfo.spouseName" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">配偶手机号：
                <el-form-item prop="spouseMobilePhone">
                  <el-input v-model="updateForm.corporationInfo.spouseMobilePhone" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">配偶身份证：
                <el-form-item prop="spouseIdNumber">
                  <el-input v-model="updateForm.corporationInfo.spouseIdNumber" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="customer-info-row">
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">是否有驾照：
                <el-select v-model="updateForm.corporationInfo.hasDrivingLicense" placeholder="请选择是否有驾照" style="width: 180px">
                  <el-option :value="-1" label="请选择是否有驾照"></el-option>
                  <el-option :value="1" label="有"></el-option>
                  <el-option :value="0" label="无"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">是否有车：
                <el-select v-model="updateForm.corporationInfo.hasCar" placeholder="请选择是否有车" style="width: 180px">
                  <el-option :value="-1" label="请选择是否有车"></el-option>
                  <el-option :value="1" label="有"></el-option>
                  <el-option :value="0" label="无"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">车牌号：
                <el-form-item prop="carNumber">
                  <el-input v-model="updateForm.corporationInfo.carNumber" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">紧急联系人：
                <el-form-item prop="urgentName1">
                  <el-input v-model="updateForm.corporationInfo.urgentName1" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">联系电话：
                <el-form-item prop="urgentTel1">
                  <el-input v-model="updateForm.corporationInfo.urgentTel1" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">关系：
                <el-select v-model="updateForm.corporationInfo.urgentRelationship1" placeholder="请选择关系" style="width: 180px">
                  <el-option label="请选择关系" value=""></el-option>
                  <el-option label="父母" value="父母"></el-option>
                  <el-option label="配偶" value="配偶"></el-option>
                  <el-option label="子女" value="子女"></el-option>
                  <el-option label="兄弟姐妹" value="兄弟姐妹"></el-option>
                  <el-option label="亲属" value="亲属"></el-option>
                  <el-option label="朋友" value="朋友"></el-option>
                  <el-option label="同学" value="同学"></el-option>
                  <el-option label="同事" value="同事"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">紧急联系人：
                <el-form-item prop="urgentName2">
                  <el-input v-model="updateForm.corporationInfo.urgentName2" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">联系电话：
                <el-form-item prop="urgentTel2">
                  <el-input v-model="updateForm.corporationInfo.urgentTel2" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">关系：
                <el-select v-model="updateForm.corporationInfo.urgentRelationship2" placeholder="请选择关系" style="width: 180px">
                  <el-option label="请选择关系" value=""></el-option>
                  <el-option label="父母" value="父母"></el-option>
                  <el-option label="配偶" value="配偶"></el-option>
                  <el-option label="子女" value="子女"></el-option>
                  <el-option label="兄弟姐妹" value="兄弟姐妹"></el-option>
                  <el-option label="亲属" value="亲属"></el-option>
                  <el-option label="朋友" value="朋友"></el-option>
                  <el-option label="同学" value="同学"></el-option>
                  <el-option label="同事" value="同事"></el-option>
                </el-select>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
            <el-row class="customer-info-row">
              <el-col :span="6">开户银行：
                <el-form-item prop="bank">
                  <el-input v-model="updateForm.corporationInfo.bank" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">企业账户号：
                <el-form-item prop="bankAccount">
                  <el-input v-model="updateForm.corporationInfo.bankAccount" class="input-lg"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">银行开户手机号：
                <el-form-item prop="bankTel">
                  <el-input v-model="updateForm.corporationInfo.bankTel" class="input-md"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    <Lightbox></Lightbox>
  </div>
</template>
<script>
import {
  request,
  formatTimeString,
  newRequest
} from 'common/utils'
import Lightbox from 'components/lightbox/lightbox';
import { proCity } from 'common/proCityArea';
export default {
  components: {
    Lightbox
  },
  data() {
    var checkMobilePhone = (rule, value, callback) => {
      if (value == '') {
        callback()
        return;
      }
      (/^1\d{10}$/g).test(value) ? callback() : callback(new Error('请输入正确手机号'))
    };
    return {
      proCity,
      showCorporation: false,
      bankList: [],
      addrData: {
        fullAddress: []
      },
      bankAccountData: {
        type: '1',
        fullBankAccount: []
      },
      updateForm: {
        info: null,
        company: null,
        bind: null,
        corporationImg: null,
        corporationInfo: null,
        yanzhenCorporationInfo: null,
        addressId: null,
        bankAccountId: null,
        finance: null
      },
      customerObj: {
        corporation: {},
        yanzhenCorporation: {}
      },
      followerList: [],
      salerList: [],
      addressList: [],
      bankAccountList: [],
      id: this.$route.query.id,
      infoRules: {
        mobilePhone: [
          { validator: checkMobilePhone, trigger: 'blur' }
        ]
      },
      companyRules: {
        company: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        license: [
          { min: 15, max: 20, message: '长度在 15 到 20 个字符', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入企业固话/手机', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        fullAddress: [
          { type: 'array', required: true, message: '请选择省市', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入注册地址', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      },
      financeRules: {
        'corporationApply.name': [
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        'corporationApply.idNumber': [
          { min: 15, max: 18, message: '长度在 15 到 18 个字符', trigger: 'blur' }
        ],
        'corporationApply.permanentAddress': [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        'corporationApply.issuingAuthority': [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        'corporationApply.mobilePhone': [
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        'corporationApply.email': [
          { min: 3, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        'corporationApply.liveAddr': [
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        'corporationApply.spouseName': [
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        'corporationApply.spouseMobilePhone': [
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        'corporationApply.spouseIdNumber': [
          { min: 15, max: 18, message: '长度在 15 到 18 个字符', trigger: 'blur' }
        ],
        'corporationApply.carNumber': [
          { min: 6, max: 7, message: '长度在 6 到 7 个字符', trigger: 'blur' }
        ],
        'corporationApply.urgentName1': [
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        'corporationApply.urgentTel1': [
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        'corporationApply.urgentName2': [
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        'corporationApply.urgentTel2': [
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        'corporationApply.bank': [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        'corporationApply.bankAccount': [
          { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
        ],
        'corporationApply.bankTel': [
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        'yanzhenCorporation.contactTel': [
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        'yanzhenCorporation.idNo': [
          { min: 15, max: 18, message: '长度在 15 到 18 个字符', trigger: 'blur' }
        ]
      },
      addrRules: {
        name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入收货联系人手机号', trigger: 'blur' },
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        fullAddress: [
          { type: 'array', required: true, message: '请选择省市', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入收货地址', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      },
      bankAccountRules: {
        realName: [
          { required: true, message: '请输入开户姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
          { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
        ],
        fullBankAccount: [
          { type: 'array', required: true, message: '请选择开户支行', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入对公账号公司名', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      },
      corporationInfoRules: {
        name: [
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        idNumber: [
          { min: 15, max: 18, message: '长度在 15 到 18 个字符', trigger: 'blur' }
        ],
        permanentAddress: [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        issuingAuthority: [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        mobilePhone: [
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        email: [
          { min: 3, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        liveAddr: [
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        spouseName: [
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        spouseMobilePhone: [
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        spouseIdNumber: [
          { min: 15, max: 18, message: '长度在 15 到 18 个字符', trigger: 'blur' }
        ],
        carNumber: [
          { min: 6, max: 7, message: '长度在 6 到 7 个字符', trigger: 'blur' }
        ],
        urgentName1: [
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        urgentTel1: [
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        urgentName2: [
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        urgentTel2: [
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        bank: [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        bankAccount: [
          { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
        ],
        bankTel: [
          { validator: checkMobilePhone, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getCustomerDetail()
    this.getAddressList()
    this.getFollowerAndSellerList()
    this.getBankAccountList()
    this.getBankList('', '', '')
  },
  methods: {
    resetUpdateForm() {
      this.updateForm.info = null;
      this.updateForm.company = null;
      this.updateForm.corporationImg = null;
      this.updateForm.corporationInfo = null;
      this.updateForm.yanzhenCorporationInfo = null;
      this.updateForm.addressId = null;
      this.updateForm.bankAccountId = null;
      this.updateForm.finance = null;
      this.updateForm.bind = null;
      this.addrData = {
        fullAddress: []
      }
      this.bankAccountData = {
        type: '1',
        fullBankAccount: []
      }
      this.updateForm.addressId = null;
    },
    showUpdateAddr(address) {
      this.resetUpdateForm()
      this.updateForm.addressId = address.id
      this.addrData = {
        id: address.id,
        name: address.name,
        tel: address.tel,
        fullAddress: [address.province, address.city, address.area],
        addr: address.addr,
      }
    },
    showUpdateBankAccount(bankAccount) {
      this.resetUpdateForm()
      if (bankAccount.realName == '') {
        bankAccount.type = '2'
      } else {
        bankAccount.type = '1'
      }
      bankAccount.customerId = this.id
      bankAccount.fullBankAccount = [bankAccount.bank + '-' + bankAccount.bankShort, bankAccount.province, bankAccount.city, bankAccount.bankId]
      Object.assign(this.bankAccountData, bankAccount)
      this.getFullBankList(bankAccount.bank, bankAccount.fullBankAccount[1], bankAccount.fullBankAccount[2])
      this.updateForm.bankAccountId = bankAccount.id
    },
    showUpdate(type) {
      console.log('show Edit');
      this.resetUpdateForm()
      if (type == 'finance') {
        this.updateForm.finance = {
          canApplyBaitiaoBox: this.customerObj.canApplyBaitiao == 1,
          hasOpenedBaitiaoBox: this.customerObj.hasOpenedBaitiao == 1,
          canApplyYanzhenBox: this.customerObj.canApplyYanzhen == 1,
          hasOpenedYanzhenBox: this.customerObj.hasOpenedYanzhen == 1,
          corporation: this.customerObj.corporation,
          yanzhenCorporation: this.customerObj.yanzhenCorporation,
          corporationApply: this.customerObj.corporationApply,
        }
      }
      if (type == 'info') {
        this.updateForm.info = {
          mobilePhone: this.customerObj.mobilePhone,
          largeBox: this.customerObj.large == 1
        }
      }
      if (type == 'company') {
        this.updateForm.company = {
          company: this.customerObj.company,
          province: this.customerObj.province,
          city: this.customerObj.city,
          area: this.customerObj.area,
          fullAddress: [this.customerObj.province, this.customerObj.city, this.customerObj.area],
          addr: this.customerObj.addr,
          tel: this.customerObj.tel,
          license: this.customerObj.license,
          yanzhenCorporation: this.customerObj.yanzhenCorporation
        }
      }
      if (type == 'bind') {
        this.updateForm.bind = {
          followerId: this.customerObj.followerId,
          salerId: this.customerObj.salerId
        }
      }
      if (type == 'corporationImg') {
        // this.updateForm.corporationImg = Object.assign({}, this.customerObj.corporation)
        this.updateForm.corporationImg = {};
        this.updateForm.corporationImg.corporation = this.customerObj.corporation;
        this.updateForm.corporationImg.yanzhenCorporation = this.customerObj.yanzhenCorporation;
      }
      if (type == 'yanzhenCorporationInfo') {
        this.updateForm.yanzhenCorporationInfo = Object.assign({}, this.customerObj.yanzhenCorporation)
        console.log(this.updateForm.yanzhenCorporationInfo)
      }
      if (type == 'corporationInfo') {
        this.updateForm.corporationInfo = Object.assign({}, this.customerObj.corporation)
        console.log(this.updateForm.corporationInfo)
      }
      if (type == 'saveAddr') {
        if (this.addressList.length >= 20) {
          this.$message({
            type: 'error',
            message: '最多可以新增20个收货信息',
            duration: 1500
          })
          return;
        }
        this.updateForm.addressId = ''
      }
      if (type == 'saveBankAccount') {
        this.updateForm.bankAccountId = ''
      }
    },
    saveOrUpdateBankAccount() {
      var url = '/soouya/oms/bankAccount'
      var validPass = true
      // this.bankAccountData.haveSendCompany = 0
      this.bankAccountData.customerId = this.id
      this.bankAccountData.bank = this.bankAccountData.fullBankAccount[0] || ''
      this.bankAccountData.province = this.bankAccountData.fullBankAccount[1] || ''
      this.bankAccountData.city = this.bankAccountData.fullBankAccount[2] || ''
      this.bankAccountData.bankId = this.bankAccountData.fullBankAccount[3] || ''
      if (this.bankAccountData.bankId.indexOf('-') > 0) {
        this.bankAccountData.bankId = this.bankAccountData.bankId.split('-')[0]
      }
      var bankString = this.bankAccountData.bank
      this.bankAccountData.bank = bankString.split('-')[0]
      this.bankAccountData.bankShort = bankString.split('-')[1]
      var formName = this.$refs['bankAccountForm']
      if (formName instanceof Array) {
        formName = formName[0]
      }
      if (this.bankAccountData.type == 1) {
        this.bankAccountData.company = ''
      }
      if (this.bankAccountData.type == 2) {
        this.bankAccountData.realName = ''
      }
      formName.validate((valid) => {
        if (valid) {
          newRequest({
            url: this.updateForm.bankAccountId == '' ? url : url + '/' + this.updateForm.bankAccountId,
            method: this.updateForm.bankAccountId == '' ? 'post' : 'put',
            contentType: 'application/json',
            data: this.bankAccountData
          }).then((response) => {
            if (response.success === '1') {
              this.$message({
                type: 'success',
                message: response.msg,
                duration: 1500
              })
              this.getBankAccountList()
              this.resetUpdateForm()
            } else {
              this.$message({
                type: 'error',
                message: response.msg,
                duration: 1500
              })
            }
          })
        } else {
          validPass = false
          return false;
        }
      });
      if (!validPass) {
        return;
      }
    },
    saveOrUpdateAddr() {
      var url = '/redwood/buyfollow/Address/update'
      var formName = this.$refs['addrForm']
      if (formName instanceof Array) {
        formName = formName[0]
      }
      if (this.updateForm.addressId == '') {
        url = '/redwood/buyfollow/Address/add'
      }
      var validPass = true
      this.addrData.haveSendCompany = 0
      this.addrData.userId = this.id
      this.addrData.province = this.addrData.fullAddress[0] || ''
      this.addrData.city = this.addrData.fullAddress[1] || ''
      this.addrData.area = this.addrData.fullAddress[2] || ''
      formName.validate((valid) => {
        if (valid) {
          newRequest({
            url: url,
            method: 'post',
            contentType: 'application/json',
            data: this.addrData
          }).then((response) => {
            if (response.success === '1') {
              this.$message({
                type: 'success',
                message: response.msg,
                duration: 1500
              })
              this.getAddressList()
              this.resetUpdateForm()
            } else {
              this.$message({
                type: 'error',
                message: response.msg,
                duration: 1500
              })
            }
          })
        } else {
          validPass = false
          return false;
        }
      });
      if (!validPass) {
        return;
      }
    },
    deleteBankAccount(id) {
      this.$confirm('确定要删除此条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        newRequest({
          url: '/soouya/oms/bankAccount/' + id,
          method: 'delete'
        }).then((response) => {
          if (response.success === '1') {
            this.$message({
              type: 'success',
              message: response.msg,
              duration: 1500
            })
            this.getBankAccountList()
            this.resetUpdateForm()
          } else {
            this.$message({
              type: 'error',
              message: response.msg,
              duration: 1500
            })
          }
        })
      });
    },
    deleteAddr(id) {
      this.$confirm('确定要删除此条数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        newRequest({
          url: '/redwood/buyfollow/Address/delete',
          method: 'post',
          contentType: 'application/json',
          data: { id: id }
        }).then((response) => {
          if (response.success === '1') {
            this.$message({
              type: 'success',
              message: response.msg,
              duration: 1500
            })
            this.getAddressList()
            this.resetUpdateForm()
          } else {
            this.$message({
              type: 'error',
              message: response.msg,
              duration: 1500
            })
          }
        })
      });
    },
    formatTime(row, column) {
      return formatTimeString(row.createTime)
    },
    getDate(date) {
      console.log(date);
      if (date.length == 10 || date == '') {
        return date
      }
      date = new Date(date);
      var year = date.getFullYear();
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return year + '-' + month + '-' + day;
    },
    updateCustomer() {
      var param = {}
      let financeValidPass = true;
      if (this.updateForm.finance != null) {
        financeValidPass = true
        this.$refs['updateForm.finance'].validate((valid) => {
          if (valid) {
            param = {
              id: this.id,
              canApplyBaitiao: this.updateForm.finance.canApplyBaitiaoBox ? 1 : 0,
              hasOpenedBaitiao: this.updateForm.finance.hasOpenedBaitiaoBox && this.updateForm.finance.canApplyBaitiaoBox ? 1 : 0,
              baitiaoApplyStatus: this.updateForm.finance.hasOpenedBaitiaoBox && this.updateForm.finance.canApplyBaitiaoBox ? 2 : 0,
              canApplyYanzhen: this.updateForm.finance.canApplyYanzhenBox ? 1 : 0,
              hasOpenedYanzhen: 0,
              corporation: this.updateForm.finance.corporation,
              yanzhenCorporation: this.updateForm.finance.yanzhenCorporation,
              corporationApply: this.updateForm.finance.corporationApply
            }
            param.corporationApply.birthDate = this.getDate(param.corporationApply.birthDate)
            param.corporationApply.startDate = this.getDate(param.corporationApply.startDate)
            param.corporationApply.endDate = this.getDate(param.corporationApply.endDate)
            if (this.customerObj.hasOpenedYanzhen === 0) {
              param.hasOpenedYanzhen = this.updateForm.finance.hasOpenedYanzhenBox && this.updateForm.finance.canApplyYanzhenBox ? 1 : 0;
            } else {
              param.hasOpenedYanzhen = this.updateForm.finance.hasOpenedYanzhenBox && this.updateForm.finance.canApplyYanzhenBox ? 1 : 4;
            }
            console.log(param.hasOpenedYanzhen);
            if (this.customerObj.hasOpenedYanzhen == 0) {
              delete param.yanzhenCorporation;
            }
          } else {
            financeValidPass = false
            return false;
          }
        });
        if (!financeValidPass) {
          return;
        }
      }
      if (this.updateForm.info != null) {
        param = {
          id: this.id,
          mobilePhone: this.updateForm.info.mobilePhone,
          large: this.updateForm.info.largeBox ? 1 : 0,
        }
        var validPass = true
        this.$refs['updateForm.info'].validate((valid) => {
          if (!valid) {
            validPass = false
            return false;
          }
        });
        if (!validPass) {
          return;
        }
      }
      if (this.updateForm.company != null) {
        validPass = true
        this.$refs['updateForm.company'].validate((valid) => {
          if (valid) {
            param = Object.assign({}, this.updateForm.company, {
              id: this.id
            })
            param.province = this.updateForm.company.fullAddress[0] || ''
            param.city = this.updateForm.company.fullAddress[1] || ''
            param.area = this.updateForm.company.fullAddress[2] || ''
          } else {
            validPass = false
            return false;
          }
        });
        if (!validPass) {
          return;
        }
        if (this.customerObj.hasOpenedYanzhen == 0) {
          delete param.yanzhenCorporation;
        }
      }
      if (this.updateForm.bind != null) {
        param = Object.assign({}, this.updateForm.bind, {
          id: this.id,
          followerId: this.updateForm.bind.followerId,
          salerId: this.updateForm.bind.salerId
        })
      }
      if (this.updateForm.corporationImg != null) {
        param = Object.assign({}, this.updateForm.corporationImg, {
          id: this.id
        })
        if (this.customerObj.hasOpenedYanzhen == 0) {
          delete param.yanzhenCorporation;
        }
      }
      if (this.updateForm.yanzhenCorporationInfo != null) {
        param = Object.assign({}, { yanzhenCorporation: this.updateForm.yanzhenCorporationInfo }, {
          id: this.id
        })
        if (this.customerObj.hasOpenedYanzhen == 0) {
          delete param.yanzhenCorporation;
        }
      }
      if (this.updateForm.corporationInfo != null) {
        param = Object.assign({}, { corporation: this.updateForm.corporationInfo }, {
          id: this.id
        })
        console.log(param);
        param.corporation.birthDate = this.getDate(param.corporation.birthDate)
        param.corporation.startDate = this.getDate(param.corporation.startDate)
        param.corporation.endDate = this.getDate(param.corporation.endDate)
        if (param.corporation.birthDate && param.corporation.startDate && param.corporation.endDate) {
          if (param.corporation.birthDate > param.corporation.startDate) {
            this.$message({
              type: 'error',
              message: '出生日期不能晚于开始日期',
              duration: 1500
            })
            return;
          }
          if (param.corporation.birthDate > param.corporation.endDate) {
            this.$message({
              type: 'error',
              message: '出生日期不能晚于失效日期',
              duration: 1500
            })
            return;
          }
          if (param.corporation.startDate > param.corporation.endDate) {
            this.$message({
              type: 'error',
              message: '生效日期不能晚于失效日期',
              duration: 1500
            })
            return;
          }
        } else if (param.corporation.birthDate && param.corporation.startDate) {
          if (param.corporation.birthDate > param.corporation.startDate) {
            this.$message({
              type: 'error',
              message: '出生日期不能晚于生效日期',
              duration: 1500
            })
            return;
          }
        } else if (param.corporation.startDate && param.corporation.endDate) {
          if (param.corporation.startDate > param.corporation.endDate) {
            this.$message({
              type: 'error',
              message: '生效日期不能晚于失效日期',
              duration: 1500
            })
            return;
          }
        } else if (param.corporation.birthDate && param.corporation.endDate) {
          if (param.corporation.birthDate > param.corporation.endDate) {
            this.$message({
              type: 'error',
              message: '出生日期不能晚于失效日期',
              duration: 1500
            })
            return;
          }
        }
        validPass = true
        this.$refs['corporationInfoForm'].validate((valid) => {
          if (!valid) {
            validPass = false
            return false;
          }
        });
        if (!validPass) {
          return;
        }
      }
      newRequest({
        url: '/soouya/oms/customer/' + this.id,
        method: 'put',
        contentType: 'application/json',
        data: param
      }).then((response) => {
        if (response.success === '1') {
          this.$message.success(response.msg);
          this.getCustomerDetail()
          // if (this.updateForm.bind == null) {
          //   this.customerObj = response.obj
          // } else {
          //   this.getCustomerDetail()
          // }
          this.resetUpdateForm()
        } else {
          this.$message({
            type: 'error',
            message: response.msg,
            duration: 1500
          })
        }
      })
    },
    getFollowerAndSellerList() {
      request({
        url: '/crm/cm/Seed/getfollowList.do',
      }).then((response) => {
        if (response.success === '1') {
          this.followerList = response.followList;
          this.salerList = response.sellerList;
          this.salerList.forEach(item => {
            if (!item.realName) item.realName = '(空)'
          })
        }
      })
    },
    getCustomerDetail() {
      request({
        url: '/soouya/oms/customer/' + this.id,
      }).then((response) => {
        if (response.success === '1') {
          this.customerObj = response.obj
        }
      })
    },
    getAddressList() {
      request({
        url: '/redwood/buyfollow/Address/list',
        method: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
          userId: this.id
        })
      }).then((response) => {
        if (response.success === '1') {
          this.addressList = response.result
        }
      })
    },
    getBankAccountList() {
      request({
        url: '/soouya/oms/bankAccount?customerId=' + this.id,
        method: 'get'
      }).then((response) => {
        if (response.success === '1') {
          this.bankAccountList = response.result
        }
      })
    },
    handleItemChange(val) {
      console.log(val)
      if (val.length == 1) {
        this.getBankList(val[0].split('-')[0], '', '')
      }
      if (val.length == 2) {
        this.getBankList(val[0].split('-')[0], val[1], '')
      }
      if (val.length == 3) {
        this.getBankList(val[0].split('-')[0], val[1], val[2])
      }
    },
    getFullBankList(bank, province, city) {
      request({
        url: '/soouya/oms/bank?bank=' + bank,
        method: 'get'
      }).then((response) => {
        if (response.success === '1') {
          this.dealBankList(response, bank, '', '')
          request({
            url: '/soouya/oms/bank?bank=' + bank + '&province=' + province,
            method: 'get'
          }).then((response) => {
            if (response.success === '1') {
              this.dealBankList(response, bank, province, '')
              request({
                url: '/soouya/oms/bank?bank=' + bank + '&province=' + province + '&city=' + city,
                method: 'get'
              }).then((response) => {
                if (response.success === '1') {
                  this.dealBankList(response, bank, province, city)
                }
              })
            }
          })
        }
      })
    },
    dealBankList(response, bank, province, city) {
      var j2 = 0;
      var k2 = 0;
      var m2 = 0;
      var isEmpty = ''
      for (var i = 0; i < response.result.length; i++) {
        var j = 0;
        var k = 0;
        if (city != '') {} else if (province != '') {
          for (j = 0; j < this.bankList.length; j++) {
            if (this.bankList[j].label == bank) {
              for (k = 0; k < this.bankList[j].children.length; k++) {
                if (this.bankList[j].children[k].label == province) {
                  if (k == 0 && this.bankList[j].children[k].children.length != 0) {
                    return;
                  }
                  this.bankList[j].children[k].children.push({
                    label: response.result[i].city,
                    value: response.result[i].city
                  })
                }
              }
            }
          }
        } else if (bank != '') {
          for (j = 0; j < this.bankList.length; j++) {
            if (this.bankList[j].label == bank) {
              if (j == 0 && this.bankList[j].children.length != 0) {
                return;
              }
              this.bankList[j].children.push({
                label: response.result[i].province,
                value: response.result[i].province,
                children: []
              })
            }
          }
        } else {
          this.bankList.push({
            label: response.result[i].bank,
            value: response.result[i].bank + '-' + response.result[i].bankShort,
            children: []
          })
        }
      }
      if (isEmpty) {
        this.bankList[j2].children[k2].children[m2].children.unshift({
          label: '自定义',
          value: ''
        })
      }
    },
    getBankList(bank, province, city) {
      request({
        url: '/soouya/oms/bank?bank=' + bank + '&province=' + province + '&city=' + city,
        method: 'get'
      }).then((response) => {
        if (response.success === '1') {
          this.dealBankList(response, bank, province, city)
        }
      })
    },
    handleLicenseUrl(response) {
      if (this.requestIsSuccess(response)) {
        this.updateForm.corporationImg.corporation.licenseUrl = response.obj
      }
    },
    handleTaxRegistrationCertificateUrl(response) {
      if (this.requestIsSuccess(response)) {
        this.updateForm.corporationImg.corporation.taxRegistrationCertificateUrl = response.obj
      }
    },
    handleOrganizationCodeCertificateUrl(response) {
      if (this.requestIsSuccess(response)) {
        this.updateForm.corporationImg.corporation.organizationCodeCertificateUrl = response.obj
      }
    },
    handlePlaceUrl(response) {
      if (this.requestIsSuccess(response)) {
        this.updateForm.corporationImg.corporation.placeUrl = response.obj
      }
    },
    handleidUrl(response) {
      if (this.requestIsSuccess(response)) {
        this.updateForm.corporationImg.corporation.idUrl = response.obj
      }
    },
    handleidBackUrl(response) {
      if (this.requestIsSuccess(response)) {
        this.updateForm.corporationImg.corporation.idBackUrl = response.obj
      }
    },
    handleApplyidUrl(response) {
      if (this.requestIsSuccess(response)) {
        this.updateForm.finance.corporationApply.idUrl = response.obj
      }
    },
    handleApplyidBackUrl(response) {
      if (this.requestIsSuccess(response)) {
        this.updateForm.finance.corporationApply.idBackUrl = response.obj
      }
    },
    handlebussineslicenseUrl(response) {
      if (this.requestIsSuccess(response)) {
        this.updateForm.corporationImg.yanzhenCorporation.bussineslicenseUrl = response.obj
      }
    },
    handleidFrontUrl(response) {
      if (this.requestIsSuccess(response)) {
        this.updateForm.finance.yanzhenCorporation.idFrontUrl = response.obj
      }
    },
    handletaxRegistrationUrl(response) {
      if (this.requestIsSuccess(response)) {
        this.updateForm.finance.yanzhenCorporation.taxRegistrationUrl = response.obj
      }
    },
    handleoutsideUrl(response) {
      if (this.requestIsSuccess(response)) {
        this.updateForm.corporationImg.yanzhenCorporation.outsideUrl = response.obj
      }
    }
  }
}

</script>
<style scoped lang="scss">
.top-line {
  border-top: 2px solid #20a0ff;
  display: block;
  div:first-child {
    background: #20a0ff none repeat scroll 0 0;
    color: #fff;
    float: left;
    padding: 5px 0;
    text-align: center;
    width: 150px;
    font-size: 18px;
  }
  div:nth-child(2) {
    position: absolute;
    float: right;
  }
  button {
    float: right;
  }
}

.customer-info-row {
  // height: 40px;
  line-height: 40px;
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

.corporationImg {
  width: 100px;
  height: 100px;
  vertical-align: top;
  display: inline-block;
}

.uploadTxt {
  position: absolute;
  left: 35px;
  top: 28px;
  color: #20A0FF;
  cursor: pointer;
  font-size: 40px;
  font-weight: bold;
}

</style>
