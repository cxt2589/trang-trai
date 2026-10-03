export function formatCurrencyVND(amountInMillion, decimals = 1) {
  if (amountInMillion === null || amountInMillion === undefined) return "0 tr";
  const num = Number(amountInMillion);
  return `${num.toLocaleString("vi-VN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })} tr`;
}

export function formatVNDRaw(amount) {
  return `${Number(amount).toLocaleString("vi-VN")} đ`;
}

export function formatPercent(rate, decimals = 1) {
  return `${Number(rate).toFixed(decimals).replace(".", ",")}%`;
}

export function calculateFinancials({
  scenario,
  chickenPrice = 200000,
  pigPrice = 130000,
  feedSavingRate = 0.40, // 40% default
  chickenSurvRate = 0.95
}) {
  // 1. Gà 3 Tháng Bán Tết
  const chicken3mCount = scenario.chicken3mCount;
  const chickenSold = Math.floor(chicken3mCount * chickenSurvRate);
  const chickenRevenue = (chickenSold * chickenPrice) / 1000000;

  // 2. Lợn Bản Bán Tết
  const pigsCount = scenario.pigsCount;
  const pigSold = pigsCount;
  const pigTotalWeight = pigSold * scenario.pigWeight;
  const pigRevenue = (pigTotalWeight * pigPrice) / 1000000;

  // 3. Tổng Doanh Thu Tết
  const totalRevenue = chickenRevenue + pigRevenue;

  // 4. Chi Phí Giống
  const chicken3mCost = (chicken3mCount * scenario.chicken3mPrice) / 1000000;
  const chicken1mCount = scenario.chicken1mCount;
  const chicken1mCost = (chicken1mCount * scenario.chicken1mPrice) / 1000000;
  const pigCost = (pigsCount * scenario.pigPrice) / 1000000;
  const totalSeedCost = chicken3mCost + chicken1mCost + pigCost;

  // 5. Chi Phí Thức Ăn & Thú Y
  // Chuẩn hóa: Tại mức tiết kiệm 40%, chi phí là baseFeedCost
  const unreducedFeedCost = scenario.baseFeedCost / (1 - 0.40);
  const feedCost = unreducedFeedCost * (1 - feedSavingRate);
  const feedSavings = unreducedFeedCost - feedCost;

  // 6. CAPEX Hạ Tầng
  const capex = scenario.capex;

  // 7. Tổng Vốn Đầu Tư Thực Tế
  const totalCapital = capex + totalSeedCost + feedCost;

  // 8. Tài Sản Tích Lũy Sau Tết
  const chicken1mRemaining = Math.floor(chicken1mCount * chickenSurvRate);
  const chicken1mValue = (chicken1mRemaining * scenario.chicken1mValuation) / 1000000;
  const equipmentResidual = scenario.equipmentResidual;
  const totalPostTetAssets = chicken1mValue + equipmentResidual;

  // 9. Lợi Nhuận
  // Lãi dòng tiền mặt = Doanh thu bán Tết - Tổng vốn đầu tư
  const cashProfit = totalRevenue - totalCapital;

  // Lợi nhuận ròng kinh tế = (Doanh thu + Tài sản sau Tết) - Tổng vốn
  const totalNetProfit = cashProfit + totalPostTetAssets;

  // ROI & Margin
  const roi = (totalNetProfit / totalCapital) * 100;
  const netMargin = (totalNetProfit / totalRevenue) * 100;
  const cashRecoveryRate = (totalRevenue / totalCapital) * 100;

  return {
    // Quantities
    chicken3mCount,
    chickenSold,
    chicken1mCount,
    chicken1mRemaining,
    pigsCount,
    pigSold,
    pigTotalWeight,

    // Revenues
    chickenRevenue,
    pigRevenue,
    totalRevenue,

    // Costs
    capex,
    chicken3mCost,
    chicken1mCost,
    pigCost,
    totalSeedCost,
    feedCost,
    unreducedFeedCost,
    feedSavings,
    totalCapital,

    // Assets
    chicken1mValue,
    equipmentResidual,
    totalPostTetAssets,

    // Profits
    cashProfit,
    totalNetProfit,
    roi,
    netMargin,
    cashRecoveryRate,

    // Prices
    chickenPrice,
    pigPrice,
    feedSavingRate,
    chickenSurvRate
  };
}
