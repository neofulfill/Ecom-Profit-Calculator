import { calculateProfit, formatMoney } from "./calculator.js";

const defaults = {
  sellingPrice: 49.99,
  productCost: 12,
  cpm: 15,
  conversionRate: 2.5,
  fixedFees: 2,
  ctr: 1.5,
};

const currencySymbols = { EUR: "€", USD: "$", GBP: "£", CAD: "C$", AUD: "A$" };
const inputIds = Object.keys(defaults);
const inputs = Object.fromEntries(inputIds.map((id) => [id, document.getElementById(id)]));
const currency = document.getElementById("currency");
const output = {
  roas: document.getElementById("roas"),
  profit: document.getElementById("profit"),
  margin: document.getElementById("margin"),
  cpa: document.getElementById("cpa"),
  cpc: document.getElementById("cpc"),
  profitCard: document.getElementById("profitCard"),
  marginCard: document.getElementById("marginCard"),
  profitDescription: document.getElementById("profitDescription"),
  marginDescription: document.getElementById("marginDescription"),
};

function setTone(element, value, dangerThreshold) {
  if (!Number.isFinite(value)) {
    element.classList.remove("is-danger", "is-positive");
    return;
  }
  element.classList.toggle("is-danger", value < dangerThreshold);
  element.classList.toggle("is-positive", value >= dangerThreshold);
}

function render() {
  const result = calculateProfit(Object.fromEntries(inputIds.map((id) => [id, inputs[id].value])));
  const selectedCurrency = currency.value;
  document.querySelectorAll(".prefix").forEach((prefix) => {
    prefix.textContent = currencySymbols[selectedCurrency];
  });

  if (!result) {
    [output.roas, output.profit, output.margin, output.cpa, output.cpc].forEach((element) => {
      element.textContent = "—";
    });
    output.profitDescription.textContent = "Enter positive CTR and conversion-rate values.";
    output.marginDescription.textContent = "Waiting for valid inputs.";
    output.profitCard.classList.remove("is-danger", "is-positive");
    output.marginCard.classList.remove("is-danger", "is-positive");
    return;
  }

  output.roas.textContent = Number.isFinite(result.roas) ? result.roas.toFixed(2) : "—";
  output.profit.textContent = formatMoney(result.profit, selectedCurrency);
  output.margin.textContent = Number.isFinite(result.margin) ? `${result.margin.toFixed(1)}%` : "—";
  output.cpa.textContent = formatMoney(result.cpa, selectedCurrency);
  output.cpc.textContent = formatMoney(result.cpc, selectedCurrency);

  output.profitDescription.textContent = result.profit < 0
    ? "Campaign loses money at these assumptions."
    : "Estimated profit after product, fees and advertising.";
  output.marginDescription.textContent = !Number.isFinite(result.margin)
    ? "Margin requires positive revenue."
    : result.margin < 5
    ? "Margin below 5%."
    : "Healthy margin at these assumptions.";
  setTone(output.profitCard, result.profit, 0);
  setTone(output.marginCard, result.margin, 5);
}

document.querySelectorAll("input").forEach((input) => input.addEventListener("input", render));
currency.addEventListener("change", render);
document.getElementById("reset").addEventListener("click", () => {
  for (const [id, value] of Object.entries(defaults)) inputs[id].value = value;
  currency.value = "USD";
  render();
});

render();
