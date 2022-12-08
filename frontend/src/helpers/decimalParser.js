import BigNumber from 'bignumber.js';

export const toNano = (amount, decimals) => new BigNumber(amount).shiftedBy(decimals).toFixed(0);
export const fromNano = (amount, decimals) => parseInt(amount) / Math.pow(10, decimals);