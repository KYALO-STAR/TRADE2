/**
 * Commission calculation logic
 * This file contains functions for calculating and processing commissions on profitable trades.
 */

import { TRADING_CONFIG } from './constants';

/**
 * Calculates the commission on a profitable trade.
 * @param profit The profit from the trade.
 * @returns The commission amount.
 */
export function calculateCommission(profit: number): number {
  if (profit <= 0) {
    return 0;
  }

  const commission = profit * TRADING_CONFIG.PROFIT_COMMISSION;
  return parseFloat(commission.toFixed(2));
}
