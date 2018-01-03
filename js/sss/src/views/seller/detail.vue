<template>
  <div class="detail-container">
    <div class="crumbs">
      <span>供应商</span>
      <span class="arrow"></span>
      <span class="current">供应商详情</span>
    </div>
    <div class="detail-content">
      <div class="title">
        <h5>基本信息</h5>
        <div class="op update" v-if="updateForm.info == null">
          <span @click="showUpdate('info')" class="icon icon-editor"></span>
          <span @click="showUpdate('info')">编辑</span>
        </div>
        <div class="op save" v-if="updateForm.info != null">
          <span @click="updateSeller" class="icon icon-save"></span>
          <span @click="updateSeller">保存</span> |
          <span @click="updateForm.info = null" class="icon icon-cancel"></span>
          <span @click="updateForm.info = null">取消</span>
        </div>
      </div>
      <div class="o-row" v-if="updateForm.info == null">
        <dl class="o-item">
          <dt>采购商ID:</dt>
          <dd>{{sellerObj.number}}</dd>
          <dd class="icon-wrap">
            <span v-if="sellerObj.soouya == 1" class="font" title="搜芽自营">自营</span>
            <span v-if="sellerObj.status == 1" class="font onStatus" title="账号状态">激活</span>
            <span v-if="sellerObj.status != 1&&sellerObj.status == 0" class="font offStatus" title="账号状态">未激活</span>
            <span v-if="sellerObj.status != 1&&sellerObj.status != 0" class="font error" title="账号状态">异常</span>
          </dd>
        </dl>
      </div>
      <div class="o-row" v-if="updateForm.info == null">
        <dl class="o-item">
          <dt>供应商编号:</dt>
          <dd>{{sellerObj.serviceNumber}}</dd>
        </dl>
        <dl class="o-item">
          <dt>注册手机号:</dt>
          <dd>{{sellerObj.mobilePhone}}</dd>
        </dl>
      </div>
      <el-form class="o-form" :inline="true" :rules="infoRules" ref="updateForm.info" :model="updateForm.info" v-if="updateForm.info != null">
        <el-row class="seller-info-row">
          <el-col :span="6">
            <el-form-item label="供应商编号" prop="serviceNumber">
              <el-input v-model="updateForm.info.serviceNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="注册手机号" prop="mobilePhone">
              <el-input v-model="updateForm.info.mobilePhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-checkbox v-model="updateForm.info.soouyaBox">搜芽自营</el-checkbox>
          </el-col>
        </el-row>
        </el-row>
      </el-form>
      <div class="line"></div>
      <div class="title">
        <h5>线上店铺</h5>
        <div class="op update" v-if="updateForm.company == null">
          <span @click="showUpdate('company')" class="icon icon-editor"></span>
          <span @click="showUpdate('company')">编辑</span>
        </div>
        <div class="op save" v-if="updateForm.company != null">
          <span @click="updateSeller" class="icon icon-save"></span>
          <span @click="updateSeller">保存</span> |
          <span @click="updateForm.company = null" class="icon icon-cancel"></span>
          <span @click="updateForm.company = null">取消</span>
        </div>
      </div>
      <div class="o-row" v-if="updateForm.company == null">
        <dl class="o-item">
          <dt>店铺名称:</dt>
          <dd>{{sellerObj.company}}</dd>
        </dl>
        <dl class="o-item">
          <dt>店铺类型:</dt>
          <dd>{{sellerObj.shopType == 0?'店铺':'工作室'}}</dd>
        </dl>
        <dl class="o-item">
          <dt>店铺电话:</dt>
          <dd>{{sellerObj.tel}}</dd>
        </dl>
      </div>
      <div class="o-row" v-if="updateForm.company == null">
        <dl class="o-item">
          <dt>省市区:</dt>
          <dd>{{sellerObj.province}}{{sellerObj.city}}{{sellerObj.area}}</dd>
        </dl>
        <dl class="o-item">
          <dt>店铺地址:</dt>
          <dd>{{sellerObj.addr}}</dd>
        </dl>
        <dl class="o-item">
          <dt>店铺介绍:</dt>
          <dd>{{sellerObj.descr}}</dd>
        </dl>
      </div>
      <div class="o-row" v-if="updateForm.company == null">
        <dl class="o-item">
          <dt>商家联系人:</dt>
          <dd>{{sellerObj.contact}}</dd>
        </dl>
        <dl class="o-item">
          <dt>商家联系电话:</dt>
          <dd>{{sellerObj.contactTel}}</dd>
        </dl>
      </div>
      <el-form class="o-form" :inline="true" :rules="companyRules" ref="updateForm.company" :model="updateForm.company" v-if="updateForm.company != null">
        <el-row>
          <el-col :span="8">
            <el-form-item label="店铺名称" prop="company">
              <el-input v-model="updateForm.company.company"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="店铺电话" prop="tel">
              <el-input v-model="updateForm.company.tel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省市区" prop="fullAddress">
              <el-cascader :options="proCity" v-model="updateForm.company.fullAddress">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="店铺地址" prop="addr">
              <el-input v-model="updateForm.company.addr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="店铺介绍" prop="tel">
              <el-input v-model="updateForm.company.descr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="商家联系人" prop="tel">
              <el-input v-model="updateForm.company.contact" class="input-sm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商家联系电话" prop="tel">
              <el-input v-model="updateForm.company.contactTel" class="input-md"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="line"></div>
      <div class="title">
        <h5>档口信息</h5>
        <div class="op update" v-if="updateForm.shop == null">
          <span @click="showUpdate('shop')" class="icon icon-editor"></span>
          <span @click="showUpdate('shop')">编辑</span>
        </div>
        <div class="op save" v-if="updateForm.shop != null">
          <span @click="updateSeller" class="icon icon-save"></span>
          <span @click="updateSeller">保存</span> |
          <span @click="updateForm.shop = null" class="icon icon-cancel"></span>
          <span @click="updateForm.shop = null">取消</span>
        </div>
      </div>
      <div class="o-row" v-if="updateForm.shop == null">
        <dl class="o-item">
          <dt>档口名称:</dt>
          <dd>{{sellerObj.shop.company}}</dd>
        </dl>
        <dl class="o-item">
          <dt>档口电话:</dt>
          <dd>{{sellerObj.shop.tel}}</dd>
        </dl>
      </div>
      <div class="o-row" v-if="updateForm.shop == null">
        <dl class="o-item">
          <dt>省市区:</dt>
          <dd>{{sellerObj.shop.province}}{{sellerObj.shop.city}}{{sellerObj.shop.area}}</dd>
        </dl>
        <dl class="o-item">
          <dt>详细地址:</dt>
          <dd>{{sellerObj.shop.addr}}</dd>
        </dl>
      </div>
      <el-form class="o-form" :inline="true" :rules="shopRules" ref="updateForm.shop" :model="updateForm.shop" v-if="updateForm.shop != null">
        <el-row>
          <el-col :span="8">
            <el-form-item label="档口名称" prop="company">
              <el-input v-model="updateForm.shop.company"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="档口电话" prop="tel">
              <el-input v-model="updateForm.shop.tel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省市区" prop="fullAddress">
              <el-cascader :options="proCity" v-model="updateForm.shop.fullAddress">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详细地址" prop="addr">
              <el-input v-model="updateForm.shop.addr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="line"></div>
      <div class="title">
        <h5>绑定关系</h5>
        <div class="op update" v-if="updateForm.bind == null">
          <span @click="showUpdate('bind')" class="icon icon-editor"></span>
          <span @click="showUpdate('bind')">编辑</span>
        </div>
        <div class="op save" v-if="updateForm.bind != null">
          <span @click="updateSeller" class="icon icon-save"></span>
          <span @click="updateSeller">保存</span> |
          <span @click="updateForm.bind = null" class="icon icon-cancel"></span>
          <span @click="updateForm.bind = null">取消</span>
        </div>
      </div>
      <div class="o-row">
        <dl class="o-item">
          <dt>买货员:</dt>
          <dd v-if="updateForm.bind == null">{{sellerObj.buyerName}}&nbsp;&nbsp;&nbsp;{{sellerObj.buyerTel}}</dd>
          <dd v-if="updateForm.bind != null">
            <el-select v-model="updateForm.bind.buyerId" placeholder="请选择买货员">
              <el-option label="请选择买货员" value=""></el-option>
              <el-option v-for="buyer in buyerList" :value="buyer.id" :label="buyer.realName"></el-option>
            </el-select>
          </dd>
        </dl>
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
        <h5>绑定采购商</h5>
        <div class="op update" @click="showCustomerDialog">
          <span class="icon icon-add"></span>
          <span>新增采购商</span>
        </div>
      </div>
      <!--  <el-row class="top-line">
        <el-col>新增采购商</el-col>
        <el-col>
          <el-button type="primary" @click.native="showCustomerDialog()">新增采购商 </el-button>
        </el-col>
      </el-row> -->
      <template v-if="!customerList.length">
        暂无数据
      </template>
      <template v-for="(customerItem, index) in customerList">
        <div :key="index" style="padding-top: 10px;padding-bottom:10px;">
          <el-row>
            <el-col :span="11">采购商ID：{{customerItem.customerNumber}}</el-col>
            <el-col :span="11">采购商企业名称：{{customerItem.customerCompany}}</el-col>
            <el-col :span="2">
              <el-button icon="delete" title="删除" @click.native="showWarnDialog(customerItem)"></el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </div>
    <!-- <el-row class="top-line">
      <el-col>基本信息</el-col>
      <el-col>
        <el-button type="primary" @click.native="showUpdate('info')" v-if="updateForm.info == null">编辑</el-button>
        <el-button type="warning" @click.native="updateForm.info = null" v-if="updateForm.info != null">取消</el-button>
        <el-button type="success" @click.native="updateSeller" v-if="updateForm.info != null">保存</el-button>
      </el-col>
    </el-row>
    <el-row class="seller-info-row" v-if="updateForm.info == null">
      <el-col :span="4">供应商ID：{{sellerObj.number}}</el-col>
      <el-col :span="4">供应商编号：{{sellerObj.serviceNumber}}</el-col>
      <el-col :span="4">注册手机号：{{sellerObj.mobilePhone}}</el-col>
    </el-row>
    <el-row class="seller-info-row" v-if="updateForm.info == null">
      <el-col :span="4">是否是搜芽自营：{{sellerObj.soouya == 1?'是':'否'}}</el-col>
      <el-col :span="4">账号状态：{{sellerObj.status == 1?'激活':(sellerObj.status == 0?'未激活':'异常')}}</el-col>
    </el-row>
    <el-form :inline="true" :rules="infoRules" ref="updateForm.info" :model="updateForm.info" v-if="updateForm.info != null">
      <el-row class="seller-info-row">
        <el-col :span="4">供应商ID：{{sellerObj.number}}</el-col>
        <el-col :span="4">
          <el-form-item label="供应商编号" prop="serviceNumber">
            <el-input v-model="updateForm.info.serviceNumber" class="input-md"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="注册手机号" prop="mobilePhone">
            <el-input v-model="updateForm.info.mobilePhone" class="input-md"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="seller-info-row">
        <el-col :span="4">
          <el-checkbox v-model="updateForm.info.soouyaBox">搜芽自营</el-checkbox>
        </el-col>
        <el-col :span="4">账号状态：{{sellerObj.status == 1?'激活':(sellerObj.status == 0?'未激活':'异常')}}</el-col>
      </el-row>
    </el-form> -->
    <!-- <el-row class="top-line">
      <el-col>线上店铺</el-col>
      <el-col>
        <el-button type="primary" @click.native="showUpdate('company')" v-if="updateForm.company == null">编辑</el-button>
        <el-button type="warning" @click.native="updateForm.company = null" v-if="updateForm.company != null">取消</el-button>
        <el-button type="success" @click.native="updateSeller" v-if="updateForm.company != null">保存</el-button>
      </el-col>
    </el-row>
    <el-row class="seller-info-row" v-if="updateForm.company == null">
      <el-col :span="6">店铺名称：{{sellerObj.company}}</el-col>
      <el-col :span="6">店铺类型：{{sellerObj.shopType == 0?'店铺':'工作室'}}</el-col>
      <el-col :span="6">店铺电话：{{sellerObj.tel}}</el-col>
    </el-row>
    <el-row class="seller-info-row" v-if="updateForm.company == null">
      <el-col :span="6">省市区：{{sellerObj.province}}{{sellerObj.city}}{{sellerObj.area}}</el-col>
      <el-col :span="6">店铺地址：{{sellerObj.addr}}</el-col>
      <el-col :span="8">店铺介绍：{{sellerObj.descr}}</el-col>
    </el-row>
    <el-row class="seller-info-row" v-if="updateForm.company == null">
      <el-col :span="6">商家联系人：{{sellerObj.contact}}</el-col>
      <el-col :span="6">商家联系电话：{{sellerObj.contactTel}}</el-col>
    </el-row>
    <el-form :inline="true" :rules="companyRules" ref="updateForm.company" :model="updateForm.company" v-if="updateForm.company != null">
      <el-row class="seller-info-row">
        <el-col :span="6">
          <el-form-item label="店铺名称" prop="company">
            <el-input v-model="updateForm.company.company" class="input-md"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">店铺类型：{{sellerObj.shopType == 0?'店铺':'工作室'}}</el-col>
        <el-col :span="6">
          <el-form-item label="店铺电话" prop="tel">
            <el-input v-model="updateForm.company.tel" class="input-md"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="seller-info-row">
        <el-col :span="6">
          <el-form-item label="省市区" prop="fullAddress">
            <el-cascader :options="proCity" v-model="updateForm.company.fullAddress" style="width:140px">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="店铺地址" prop="addr">
            <el-input v-model="updateForm.company.addr" style="width:100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="店铺介绍" prop="tel">
            <el-input v-model="updateForm.company.descr"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="seller-info-row">
        <el-col :span="6">
          <el-form-item label="商家联系人" prop="tel">
            <el-input v-model="updateForm.company.contact" class="input-sm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="商家联系电话" prop="tel">
            <el-input v-model="updateForm.company.contactTel" class="input-md"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> -->
    <!-- <el-row class="top-line">
      <el-col>档口信息</el-col>
      <el-col>
        <el-button type="primary" @click.native="showUpdate('shop')" v-if="updateForm.shop == null">编辑</el-button>
        <el-button type="warning" @click.native="updateForm.shop = null" v-if="updateForm.shop != null">取消</el-button>
        <el-button type="success" @click.native="updateSeller" v-if="updateForm.shop != null">保存</el-button>
      </el-col>
    </el-row>
    <el-row class="seller-info-row" v-if="updateForm.shop == null">
      <el-col :span="8">档口名称：{{sellerObj.shop.company}}</el-col>
      <el-col :span="4">档口电话：{{sellerObj.shop.tel}}</el-col>
    </el-row>
    <el-row class="seller-info-row" v-if="updateForm.shop == null">
      <el-col :span="8">省市区：{{sellerObj.shop.province}}{{sellerObj.shop.city}}{{sellerObj.shop.area}}</el-col>
      <el-col :span="8">详细地址：{{sellerObj.shop.addr}}</el-col>
    </el-row>
    <el-form :inline="true" :rules="shopRules" ref="updateForm.shop" :model="updateForm.shop" v-if="updateForm.shop != null">
      <el-row class="seller-info-row">
        <el-col :span="8">
          <el-form-item label="档口名称" prop="company">
            <el-input v-model="updateForm.shop.company" class="input-lg"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="档口电话" prop="tel">
            <el-input v-model="updateForm.shop.tel" class="input-lg"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="seller-info-row">
        <el-col :span="8">
          <el-form-item label="省市区" prop="fullAddress">
            <el-cascader :options="proCity" v-model="updateForm.shop.fullAddress" style="width:140px">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="详细地址" prop="addr">
            <el-input v-model="updateForm.shop.addr" style="width:100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> -->
    <!-- <el-row class="top-line">
      <el-col>绑定关系</el-col>
      <el-col>
        <el-button type="primary" v-if="updateForm.bind == null" @click.native="showUpdate('bind')">编辑</el-button>
        <el-button type="warning" v-if="updateForm.bind != null" @click.native="updateForm.bind = null">取消</el-button>
        <el-button type="success" v-if="updateForm.bind != null" @click.native="updateSeller">保存</el-button>
      </el-col>
    </el-row>
    <el-row class="seller-info-row" v-if="updateForm.bind == null">
      <el-col :span="4">买货员：{{sellerObj.buyerName}}&nbsp;&nbsp;&nbsp;{{sellerObj.buyerTel}}</el-col>
    </el-row>
    <el-row class="seller-info-row" v-if="updateForm.bind != null">
      <el-col :span="4">买货员：
        <el-select v-model="updateForm.bind.buyerId" placeholder="请选择买货员" style="width: 180px">
          <el-option label="请选择买货员" value=""></el-option>
          <el-option v-for="buyer in buyerList" :value="buyer.id" :label="buyer.realName"></el-option>
        </el-select>
      </el-col>
    </el-row> -->
    <!-- <el-row class="top-line">
      <el-col>收款方式</el-col>
      <el-col>
        <el-button type="primary" @click.native="showUpdate('saveBankAccount')">新增收款方式</el-button>
      </el-col>
    </el-row>
    <el-row class="seller-info-row" v-if="updateForm.bankAccountId == ''">
      <el-form ref="bankAccountForm" :model="bankAccountData" :inline="true" :rules="bankAccountRules">
        <el-row class="seller-info-row">
          <el-col :span="12">
            <el-form-item label="开户支行" prop="fullBankAccount">
              <el-cascader @active-item-change="handleItemChange" :options="bankList" style="width:550px" v-model="bankAccountData.fullBankAccount">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            &nbsp;
          </el-col>
          <el-col :span="2">
            <el-button icon="check" title="保存" @click.native="saveOrUpdateBankAccount"></el-button>
            <el-button icon="close" title="取消" @click.native="updateForm.bankAccountId = null"></el-button>
          </el-col>
        </el-row>
        <el-row class="seller-info-row">
          <el-col :span="4">
            <el-form-item label="账户类型">
              <el-radio class="radio" v-model="bankAccountData.type" label="1">个人</el-radio>
              <el-radio class="radio" v-model="bankAccountData.type" label="2">企业</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行卡号" prop="number">
              <el-input v-model="bankAccountData.number" style="width:273px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行账号开户名" prop="realName" v-if="bankAccountData.type == 1">
              <el-input v-model="bankAccountData.realName" style="width:273px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对公账号公司名" prop="company" v-if="bankAccountData.type == 2">
              <el-input v-model="bankAccountData.company" style="width:273px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="seller-info-row" v-if="bankAccountList.length == 0 && updateForm.bankAccountId == null">
      <el-col :span="24" style="color:grey;">暂无数据</el-col>
    </el-row>
    <div v-for="bankAccount in bankAccountList">
      <el-row class="seller-info-row" v-if="updateForm.bankAccountId != bankAccount.id">
        <el-col :span="4">银行名称：{{bankAccount.bank}}</el-col>
        <el-col :span="6">银行账号开户名：{{bankAccount.realName}}{{bankAccount.company}}</el-col>
        <el-col :span="10">银行卡号：{{bankAccount.number}}</el-col>
        <el-col :span="2">开户地区：{{bankAccount.province}}{{bankAccount.city}}{{bankAccount.area}}</el-col>
        <el-col :span="2">
          <el-button icon="edit" title="编辑" @click.native="showUpdateBankAccount(bankAccount)"></el-button>
          <el-button icon="delete" title="删除" @click.native="deleteBankAccount(bankAccount.id)"></el-button>
        </el-col>
      </el-row>
      <el-row class="seller-info-row" v-if="updateForm.bankAccountId == bankAccount.id">
        <el-form ref="bankAccountForm" :model="bankAccountData" :inline="true" :rules="bankAccountRules">
          <el-row class="seller-info-row">
            <el-col :span="12">
              <el-form-item label="开户支行" prop="fullBankAccount">
                <el-cascader :options="bankList" @active-item-change="handleItemChange" style="width:550px" v-model="bankAccountData.fullBankAccount">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              &nbsp;
            </el-col>
            <el-col :span="2">
              <el-button icon="check" title="保存" @click.native="saveOrUpdateBankAccount"></el-button>
              <el-button icon="close" title="取消" @click.native="updateForm.bankAccountId = null"></el-button>
            </el-col>
          </el-row>
          <el-row class="seller-info-row">
            <el-col :span="4">
              <el-form-item label="账户类型">
                <el-radio class="radio" v-model="bankAccountData.type" label="1">个人</el-radio>
                <el-radio class="radio" v-model="bankAccountData.type" label="2">企业</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="银行卡号" prop="number">
                <el-input v-model="bankAccountData.number" style="width:273px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="银行账号开户名" prop="realName" v-if="bankAccountData.type == 1">
                <el-input v-model="bankAccountData.realName" style="width:273px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="对公账号公司名" prop="company" v-if="bankAccountData.type == 2">
                <el-input v-model="bankAccountData.company" style="width:273px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
    </div> -->
    <!-- <el-row class="top-line">
      <el-col>绑定采购商</el-col>
      <el-col>
        <el-button type="primary" @click.native="showCustomerDialog()">新增采购商 </el-button>
      </el-col>
    </el-row>
    <template v-if="!customerList.length">
      暂无数据
    </template>
    <template v-for="(customerItem, index) in customerList">
      <div :key="index" style="padding-top: 10px;padding-bottom:10px;">
        <el-row>
          <el-col :span="11">采购商ID：{{customerItem.customerNumber}}</el-col>
          <el-col :span="11">采购商企业名称：{{customerItem.customerCompany}}</el-col>
          <el-col :span="2">
            <el-button icon="delete" title="删除" @click.native="showWarnDialog(customerItem)"></el-button>
          </el-col>
        </el-row>
      </div>
    </template> -->
    <el-dialog title="删除采购商" v-model="warnDialogVisible" size="tiny">
      <i class="el-icon-information" style="color:#f00">  确认删除此采购商？</i>
      <el-form label-position="right" label-width="150" style="margin-top: 20px">
        <el-form-item label="采购商ID：">{{warnDialogData.customerNumber}}</el-form-item>
        <el-form-item label="采购商企业名称：">{{warnDialogData.customerCompany}}</el-form-item>
      </el-form>
      <footer>
        <el-button @click.native="warnDialogVisible = false">取消</el-button>
        <el-button type="primary" @click.native="deleteCustomerItem(warnDialogData.id)">确定</el-button>
      </footer>
    </el-dialog>
    <el-dialog title="白条采购商" size="small" v-model="customerDialogVisible">
      <el-input @keyup.enter.native="handleIconClick" placeholder="企业名称/注册手机号" style="width: 250px" icon="search" v-model="reqCustomerParams.key" :on-icon-click="handleIconClick">
      </el-input>
      <el-table style="margin-top:25px;" :data="dialogData" height="500" border>
        <el-table-column prop="mobilePhone" label="采购商注册手机号"></el-table-column>
        <el-table-column prop="number" label="采购商ID"></el-table-column>
        <el-table-column prop="company" label="采购商企业名称"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="mini" type="primary" @click.native="confirmAddCustomer(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <div style="height: 150px;"></div>
  </div>
</template>
<script>
import {
  request,
  formatTimeString,
  newRequest
} from 'common/utils'
import { proCity } from 'common/proCityArea'
export default {
  data() {
    var checkMobilePhone = (rule, value, callback) => {
      if (value == '') {
        callback()
        return;
      }
      (/^1\d{10}$/g).test(value) ? callback() : callback(new Error('请输入正确手机号'))
    };
    return {
      warnDialogData: {},
      warnDialogVisible: false,
      reqCustomerParams: {
        hasOpenedFinance: 1,
        key: '',
        pageSize: 20,
        pageNumber: 1,
      },
      dialogData: [],
      customerDialogVisible: false,
      customerList: [],
      proCity,
      shopId: '',
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
        shop: null,
        bind: null,
        bankAccountId: null
      },
      sellerObj: {
        shop: {}
      },
      buyerList: [],
      addressList: [],
      bankAccountList: [],
      id: this.$route.query.id,
      infoRules: {
        mobilePhone: [
          { validator: checkMobilePhone, trigger: 'blur' }
        ],
        // bug 4708 供应商编号不能超过4位
        serviceNumber: [
          { min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
        ]
      },
      companyRules: {
        company: [
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        tel: [
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        fullAddress: [
          { type: 'array', required: true, message: '请选择省市', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      },
      shopRules: {
        company: [
          { required: true, message: '请输入档口名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入档口电话', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        fullAddress: [
          { type: 'array', required: true, message: '请选择省市', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入档口地址', trigger: 'blur' },
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
      }
    }
  },
  mounted() {
    this.shopId = this.$route.query.id
    this.getSellerDetail()
    this.getBuyerList()
    this.getBankList('', '', '')
  },
  methods: {
    showWarnDialog(item) {
      // deleteCustomerItem(customerItem.id)
      this.warnDialogData = item
      this.warnDialogVisible = true
    },
    confirmAddCustomer(item) {
      if (this.sellerObj.serviceNumber == null || this.sellerObj.serviceNumber == '') {
        this.$message({
          type: 'error',
          message: '供应商编号为空时不能绑定采购商'
        })
      }
      if (this.sellerObj.serviceNumber.length > 4) {
        this.$message({
          type: 'error',
          message: '供应商编号超过4位时不能绑定采购商'
        })
      }
      newRequest({
        url: '/soouya/v1/shopCustomer',
        data: {
          shopId: this.shopId,
          customerId: item.id,
          customerNumber: item.number,
          customerCompany: item.company,
          sellerId: this.sellerObj.id,
          sellerServiceNumber: this.sellerObj.serviceNumber,
          shopCompany: this.sellerObj.shop.company
        },
        method: 'post',
        contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.customerDialogVisible = false
          if (this.shopId) {
            this.getCustomerList()
          }
        } else {
          if (res.success === '10005') {
            this.$message.error('供应商编号不能为空');
            this.customerDialogVisible = false
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    handleIconClick() {
      newRequest({
        url: '/soouya/oms/customer',
        data: this.reqCustomerParams,
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.dialogData = res.page.result
          // this.customerDialogVisible = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showCustomerDialog() {
      newRequest({
        url: '/soouya/oms/customer',
        data: this.reqCustomerParams,
        method: 'get'
      }).then(res => {
        if (res.success == 1) {
          this.dialogData = res.page.result
          this.reqCustomerParams.key = ''
          this.customerDialogVisible = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    deleteCustomerItem(id) {
      newRequest({
        url: '/soouya/v1/shopCustomer/' + id,
        data: {},
        method: 'delete',
      }).then(res => {
        if (res.success == 1) {
          this.warnDialogVisible = false
          if (this.shopId) {
            this.getCustomerList()
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getCustomerList() {
      newRequest({
        url: '/soouya/v1/shopCustomer',
        method: 'get',
        data: {
          shopId: this.shopId,
        }
        // contentType: 'application/json'
      }).then(res => {
        if (res.success == 1) {
          this.customerList = res.page.result
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    resetUpdateForm() {
      this.updateForm = {
        info: null,
        company: null,
        bind: null,
        shop: null,
        addressId: null,
        bankAccountId: null
      }
      this.addrData = {
        fullAddress: []
      }
      this.bankAccountData = {
        type: '1',
        fullBankAccount: []
      }
      this.updateForm.addressId = null
    },
    showUpdateBankAccount(bankAccount) {
      this.resetUpdateForm()
      if (bankAccount.realName == '') {
        bankAccount.type = '2'
      } else {
        bankAccount.type = '1'
      }
      bankAccount.sellerId = this.id
      bankAccount.fullBankAccount = [bankAccount.bank + '-' + bankAccount.bankShort, bankAccount.province, bankAccount.city, bankAccount.bankId == '' ? '' : bankAccount.bankId]
      Object.assign(this.bankAccountData, bankAccount)
      this.getFullBankList(bankAccount.bank, bankAccount.fullBankAccount[1], bankAccount.fullBankAccount[2])
      this.updateForm.bankAccountId = bankAccount.id
    },
    showUpdate(type) {
      this.resetUpdateForm()
      if (type == 'info') {
        this.updateForm.info = {
          mobilePhone: this.sellerObj.mobilePhone,
          soouyaBox: this.sellerObj.soouya == 1,
          serviceNumber: this.sellerObj.serviceNumber
        }
      }
      if (type == 'company') {
        this.updateForm.company = {
          company: this.sellerObj.company,
          province: this.sellerObj.province,
          city: this.sellerObj.city,
          area: this.sellerObj.area,
          fullAddress: [this.sellerObj.province, this.sellerObj.city, this.sellerObj.area],
          addr: this.sellerObj.addr,
          tel: this.sellerObj.tel,
          descr: this.sellerObj.descr,
          contact: this.sellerObj.contact,
          contactTel: this.sellerObj.contactTel
        }
      }
      if (type == 'shop') {
        this.updateForm.shop = {
          company: this.sellerObj.shop.company,
          province: this.sellerObj.shop.province,
          city: this.sellerObj.shop.city,
          area: this.sellerObj.shop.area,
          fullAddress: [this.sellerObj.shop.province, this.sellerObj.shop.city, this.sellerObj.shop.area],
          addr: this.sellerObj.shop.addr,
          tel: this.sellerObj.shop.tel
        }
      }
      if (type == 'bind') {
        this.updateForm.bind = {
          buyerId: this.sellerObj.buyerId
        }
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
        if (this.shopId == '' || this.shopId == null) {
          this.$message({
            type: 'error',
            message: '请先新建档口',
            duration: 1500
          })
          return;
        }
        this.updateForm.bankAccountId = ''
      }
    },
    saveOrUpdateBankAccount() {
      if (this.shopId == '' || this.shopId == null) {
        this.$message({
          type: 'error',
          message: '请先新建档口',
          duration: 1500
        })
        return;
      }
      var url = '/soouya/oms/bankAccount'
      var validPass = true
      this.bankAccountData.shopId = this.shopId
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
    formatTime(row, column) {
      return formatTimeString(row.createTime)
    },
    getDate(date) {
      if (date.length == 10 || date == '') {
        return date
      }
      var year = date.getFullYear();
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return year + '-' + month + '-' + day;
    },
    updateSeller() {
      var param = {}
      if (this.updateForm.info != null) {
        param = {
          id: this.id,
          mobilePhone: this.updateForm.info.mobilePhone,
          soouya: this.updateForm.info.soouyaBox ? 1 : 0,
          serviceNumber: this.updateForm.info.serviceNumber
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
      }
      if (this.updateForm.shop != null) {
        validPass = true
        this.$refs['updateForm.shop'].validate((valid) => {
          if (valid) {
            param = Object.assign({}, this.updateForm, {
              id: this.id
            })
            param.shop.id = this.shopId
            param.shop.province = this.updateForm.shop.fullAddress[0] || ''
            param.shop.city = this.updateForm.shop.fullAddress[1] || ''
            param.shop.area = this.updateForm.shop.fullAddress[2] || ''
          } else {
            validPass = false
            return false;
          }
        });
        if (!validPass) {
          return;
        }
      }
      if (this.updateForm.bind != null) {
        param = Object.assign({}, this.updateForm.bind, {
          id: this.id,
          buyerId: this.updateForm.bind.buyerId
        })
      }
      newRequest({
        url: '/soouya/oms/seller/' + this.id,
        method: 'put',
        contentType: 'application/json',
        data: param
      }).then((response) => {
        if (response.success === '1') {
          this.getSellerDetail()
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
    getBuyerList() {
      request({
        url: '/crm/cm/Seed/getMaihuoList.do',
      }).then((response) => {
        if (response.success === '1') {
          this.buyerList = response.purchaserList;
        }
      })
    },
    getSellerDetail() {
      request({
        url: '/soouya/oms/seller/' + this.id,
      }).then((response) => {
        if (response.success === '1') {
          this.sellerObj = response.obj
          this.shopId = this.sellerObj.shop.id
          this.getBankAccountList()
          if (this.shopId) {
            this.getCustomerList()
          }
        }
      })
    },
    getBankAccountList() {
      if (this.shopId == '') {
        return;
      }
      request({
        url: '/soouya/oms/bankAccount?shopId=' + this.shopId,
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

.seller-info-row {
  line-height: 30px;
  padding-left: 10px;
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

.shopImg {
  width: 50px;
  height: 50px;
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

.el-col {
  overflow: hidden;
  display: block;
}

</style>
