import * as Types from 'src/vuex/constants/index'
export const changeload = ({ commit, state }, val) => {
  commit('changeload', { load: val })
}
export const changePopLoad = ({ commit, state }, val) => {
  commit('changePopLoad', { popload: val })
}

export const updateVuexData = ({ commit }, params) => {
  switch (params.module) {
    case 'deliverManage': // 发货管理
      commit(Types.UPDATE_DEDILIVER_CURRENT_TAB, params)
      break;
    case 'reject': // 跟单退换货管理
      commit(Types.UPDATE_REJECT_CURRENT_TAB, params)
      break;
    case 'buyerReject': // 采购退换货管理
      commit(Types.UPDATE_BUYER_REJECT_CURRENT_TAB, params)
      break;
    case 'pressPayDebt': // 采购催交欠款
      commit(Types.UPDATE_PARESSPAYDEBT_CURRENT_TAB, params)
      break;
  }
}
