/**
 * 计算税费
 * @param {Number} costMoney
 * @param {Number} serviceMoney
 * @param {Number} taxPoint
 */
export const getTaxMoney = (costMoney, serviceMoney, taxPoint) => {
    return parseFloat(((costMoney + serviceMoney) * taxPoint * 0.01).toFixed(2))
}

/**
 * 计算总费用
 * @param {Number} costMoney
 * @param {Number} serviceMoney
 * @param {Number} taxMoney
 */
export const getTotalMoney = (costMoney, serviceMoney, taxMoney) => {
    return parseFloat((costMoney + serviceMoney + taxMoney).toFixed(2))
}
