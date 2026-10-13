/**
 * cashFlow12mEngine.js
 * Lõi tính toán dòng tiền 12 tháng, nợ vay, năng suất lao động và độ nhạy tài chính
 */

import { MONTHLY_BASE_SCHEDULE } from "../data/cashFlow12mData.js";

export function calculate12MonthCashFlow({
  initialEquity = 100000000,
  birdsPerWorker = 3000, // 2000 (truyền thống) hoặc 3000 (bán công nghiệp)
  workerSalary = 7000000,
  sellingPrice = 180000,
  chickPrice = 14000,
  feedPrice = 10000,
  feedSavingRate = 0.0, // 0.0 đến 0.30
  cullRate = 0.05, // Tỷ lệ loại đàn (chết hoặc loại thải) 0.05 đến 0.10 (5% - 10%)
  birdWeight = 1.2, // Trọng lượng bình quân 1.2 kg / con chu kỳ 5 tháng
  minCashReserve = 20000000
} = {}) {
  let currentCash = initialEquity;
  let runningDebtBalance = 0;
  let peakDebt = 0;
  let peakDebtMonth = "";
  let debtFreeMonth = null;
  let preTetBorrowNeed = 0; // Tháng 01/2027

  // Baseline benchmark calculation (với mức 2.000 con/người) để đo lường số tiền tiết kiệm
  let totalLaborCostActual = 0;
  let totalLaborCostBenchmark = 0;

  const monthlyResults = MONTHLY_BASE_SCHEDULE.map((m) => {
    // 1. Tính toán con giống (Bắt đầu nhập từ Tháng 11/2026; Tháng 10/2026 chỉ làm hạ tầng)
    let chickCost = 0;
    if (m.monthIdx === 1) {
      chickCost = 0;
    } else if (m.monthIdx === 2) {
      // Tháng 11/26: Bắt đầu nhập giống - 300 gà TP1 (giá 1 ngày tuổi) + 500 gà Tết 2 tháng (35M) + 20 bố mẹ 3 tháng (5M)
      chickCost = 300 * chickPrice + 35000000 + 5000000;
    } else {
      chickCost = m.totalImportCount * chickPrice;
    }

    // 2. Tính toán thức ăn & cám (động theo giá cám & tỷ lệ tiết kiệm)
    const feedCost = Math.round(m.baseFeedKg * feedPrice * (1 - feedSavingRate));

    // 3. Tính toán nhân công & lương: 2 tháng đầu cố định 4 người (3 chặt tre làm chuồng: 1 chặt 2 khiêng; 1 trồng rau, điện nước, ăn uống)
    let headcount = 0;
    let benchmarkHeadcount = 0;
    let laborRoleNote = "";

    if (m.monthIdx === 1 || m.monthIdx === 2) {
      headcount = 4;
      benchmarkHeadcount = 4;
      laborRoleNote = m.monthIdx === 1
        ? "4 người (3 chặt tre làm chuồng: 1 chặt 2 khiêng; 1 trồng rau, điện nước, ăn uống)"
        : "4 người (3 hoàn thiện 4–6 chuồng nhỏ 300m², 1 trồng rau & chăm sóc gà đợt 1)";
    } else {
      headcount = Math.max(2, Math.ceil(m.activeFlockCount / birdsPerWorker));
      benchmarkHeadcount = Math.max(2, Math.ceil(m.activeFlockCount / 2000));
      laborRoleNote = `${headcount} người chăn nuôi theo quy mô đàn`;
    }

    const laborCost = headcount * workerSalary;
    totalLaborCostActual += laborCost;
    totalLaborCostBenchmark += benchmarkHeadcount * workerSalary;

    // 4. Thú y, vắc-xin, điện nước
    const vetOpCost = m.baseVetOpCost;

    // Tổng OPEX
    const opexCost = chickCost + feedCost + laborCost + vetOpCost;

    // CAPEX
    const capexCost = m.capexCost;

    // Tổng chi dòng tiền ra
    const totalOutflow = opexCost + capexCost;

    // 5. Doanh thu bán gà (Động theo tỷ lệ loại đàn cullRate & cân nặng chuẩn 1.2 kg)
    let batchSize = 0;
    let batchLabel = "";
    if (m.monthIdx === 5) {
      batchSize = 500;
      batchLabel = "Gà Tết (bán trước 28 Tết)";
    } else if (m.monthIdx === 7) {
      batchSize = 300;
      batchLabel = "Gà TP1 xuất chuồng (nuôi đủ 5 tháng)";
    } else if (m.monthIdx === 8) {
      batchSize = 500;
      batchLabel = "Gà TP2 xuất chuồng (nuôi đủ 5 tháng)";
    } else if (m.monthIdx === 9) {
      batchSize = 800;
      batchLabel = "Gà TP3 xuất chuồng (nuôi đủ 5 tháng)";
    } else if (m.monthIdx === 10) {
      batchSize = 1200;
      batchLabel = "Gà TP4 xuất chuồng (nuôi đủ 5 tháng)";
    } else if (m.monthIdx === 11) {
      batchSize = 2000;
      batchLabel = "Gà TP5 xuất chuồng (nuôi đủ 5 tháng)";
    } else if (m.monthIdx === 12) {
      batchSize = 3160;
      batchLabel = "Gà TP6 xuất chuồng (Quy mô ổn định)";
    }

    const soldBirds = batchSize > 0 ? Math.round(batchSize * (1 - cullRate)) : 0;
    const soldType = batchSize > 0 ? `${soldBirds.toLocaleString()} ${batchLabel}` : "";
    const revenue = Math.round(soldBirds * birdWeight * sellingPrice);

    // Dòng tiền thuần từ vận hành (chưa tính tài trợ)
    const netOperatingFlow = revenue - totalOutflow;

    // 6. Thuật toán cân đối Tiền mặt & Nợ vay 5 bước
    const startingCash = currentCash;
    const cashPreFinancing = startingCash + netOperatingFlow;

    let borrowNeed = 0;
    let repayment = 0;

    if (cashPreFinancing < minCashReserve) {
      // Thiếu tiền mặt so với mức két an toàn -> Cần vay
      borrowNeed = minCashReserve - cashPreFinancing;
      runningDebtBalance += borrowNeed;
      repayment = 0;
      currentCash = minCashReserve;
    } else {
      // Thặng dư tiền mặt -> Trả bớt nợ nếu còn nợ
      borrowNeed = 0;
      const cashSurplus = cashPreFinancing - minCashReserve;
      if (runningDebtBalance > 0) {
        repayment = Math.min(cashSurplus, runningDebtBalance);
        runningDebtBalance -= repayment;
      } else {
        repayment = 0;
      }
      currentCash = cashPreFinancing - repayment;
    }

    // Ghi nhận nợ đỉnh
    if (runningDebtBalance > peakDebt) {
      peakDebt = runningDebtBalance;
      peakDebtMonth = m.label;
    }

    // Ghi nhận nhu cầu vay lũy kế trước Tết (Tháng 01/2027)
    if (m.monthIdx === 4) {
      preTetBorrowNeed = runningDebtBalance;
    }

    // Ghi nhận thời điểm sạch nợ
    if (debtFreeMonth === null && m.monthIdx > 1 && runningDebtBalance === 0 && peakDebt > 0) {
      debtFreeMonth = m.label;
    }

    return {
      ...m,
      soldBirds,
      soldType,
      headcount,
      benchmarkHeadcount,
      laborRoleNote,
      chickCost,
      feedCost,
      laborCost,
      vetOpCost,
      opexCost,
      capexCost,
      totalOutflow,
      revenue,
      netOperatingFlow,
      startingCash,
      cashPreFinancing,
      borrowNeed,
      repayment,
      endingCash: currentCash,
      debtBalance: runningDebtBalance
    };
  });

  // Tổng hợp cả năm
  const annualTotal = monthlyResults.reduce(
    (acc, m) => {
      acc.revenue += m.revenue;
      acc.chickCost += m.chickCost;
      acc.feedCost += m.feedCost;
      acc.laborCost += m.laborCost;
      acc.vetOpCost += m.vetOpCost;
      acc.opexCost += m.opexCost;
      acc.capexCost += m.capexCost;
      acc.totalOutflow += m.totalOutflow;
      acc.netOperatingFlow += m.netOperatingFlow;
      acc.borrowNeed += m.borrowNeed;
      acc.repayment += m.repayment;
      acc.soldBirds += m.soldBirds;
      return acc;
    },
    {
      revenue: 0,
      chickCost: 0,
      feedCost: 0,
      laborCost: 0,
      vetOpCost: 0,
      opexCost: 0,
      capexCost: 0,
      totalOutflow: 0,
      netOperatingFlow: 0,
      borrowNeed: 0,
      repayment: 0,
      soldBirds: 0
    }
  );

  const lastMonth = monthlyResults[monthlyResults.length - 1];
  const steadyMonthlySurplus = lastMonth.revenue - lastMonth.opexCost; // Thặng dư tháng ổn định
  const laborSavingsAnnual = Math.max(0, totalLaborCostBenchmark - totalLaborCostActual);

  return {
    monthlyResults,
    annualTotal,
    kpis: {
      initialEquity,
      minCashReserve,
      preTetBorrowNeed,
      peakDebt,
      peakDebtMonth,
      debtFreeMonth: debtFreeMonth || (lastMonth.debtBalance === 0 ? "Tháng 09/2027" : "Chưa hoàn tất trong năm 1"),
      endingCashSurplus: lastMonth.endingCash - minCashReserve,
      lastEndingCash: lastMonth.endingCash,
      steadyMonthlySurplus,
      laborSavingsAnnual,
      totalLaborCostActual,
      totalLaborCostBenchmark,
      peakHeadcount: Math.max(...monthlyResults.map((m) => m.headcount)),
      peakBenchmarkHeadcount: Math.max(...monthlyResults.map((m) => m.benchmarkHeadcount)),
      cullRate,
      survivalRate: 1 - cullRate,
      steadyMonthlySoldBirds: lastMonth.soldBirds
    }
  };
}
