export function calculateProfit({ sellingPrice, productCost, cpm, conversionRate, fixedFees, ctr }) {
  const values = [sellingPrice, productCost, cpm, conversionRate, fixedFees, ctr].map(Number);
  if (values.some((value) => !Number.isFinite(value) || value < 0)) return null;
  if (conversionRate <= 0 || ctr <= 0) return null;

  const cpc = cpm / (10 * ctr);
  const cpa = cpc / (conversionRate / 100);
  const profit = sellingPrice - productCost - fixedFees - cpa;
  const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : null;
  const roas = cpa > 0 ? sellingPrice / cpa : null;

  return { cpc, cpa, profit, margin, roas };
}

export function formatMoney(value, currency, locale = "en-US") {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
