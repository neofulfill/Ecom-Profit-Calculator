import test from "node:test";
import assert from "node:assert/strict";
import { calculateProfit, formatMoney } from "../public/calculator.js";

test("matches the reference-image default results", () => {
  const result = calculateProfit({
    sellingPrice: 49.99,
    productCost: 12,
    cpm: 15,
    conversionRate: 2.5,
    fixedFees: 2,
    ctr: 1.5,
  });

  assert.equal(result.cpc, 1);
  assert.equal(result.cpa, 40);
  assert.equal(result.roas.toFixed(2), "1.25");
  assert.equal(result.profit.toFixed(2), "-4.01");
  assert.equal(result.margin.toFixed(1), "-8.0");
});

test("returns null for an unusable rate", () => {
  assert.equal(calculateProfit({ sellingPrice: 10, productCost: 1, cpm: 2, conversionRate: 0, fixedFees: 1, ctr: 1 }), null);
});

test("formats selected currencies", () => {
  assert.match(formatMoney(40, "EUR"), /€40\.00/);
  assert.match(formatMoney(40, "USD"), /\$40\.00/);
});
