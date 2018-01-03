import api from 'src/api/guider';
import $http from 'src/utils/http';

// 采购商资金管理 - 列表
export const getFundList = (params) => $http.get(api.fundManagement.list, params);

// 采购商资金管理 - 本月账单
export const reportFund = (params) => $http.get(api.fundManagement.report, params);

// 采购商欠款记录 - 大货 - 列表
export const getBuyerDebtBulkList = (params) => $http.get(api.buyerDebt.bulkList, params);

// 采购商欠款记录 - 大货 - 导出
export const reportBuyerDebtBulk = (params) => $http.get(api.buyerDebt.bulkReport, params);

// 采购商欠款记录 - 剪版 - 列表
export const getBuyerDebtCutList = (params) => $http.get(api.buyerDebt.CutList, params);

// 采购商欠款记录 - 剪版 - 导出
export const reportBuyerDebtCut = (params) => $http.get(api.buyerDebt.CutReport, params);

// 供应商退款 - 退款中 - 列表
export const sellerRefundingList = (params) => $http.get(api.refund.list, params);

// 供应商退款 - 已退款 - 列表
export const sellerRefundedList = (params) => $http.get(api.refund.list, params);

// 退换货退补款单 - 退款中/已退款 - 列表
export const rrRefundList = (params) => $http.get(api.rrRefund.list, params);
