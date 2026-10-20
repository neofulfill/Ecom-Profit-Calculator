# Ecom Profit Calculator

A minimalist, responsive ecommerce profitability calculator built with vanilla JavaScript and flexbox.

## Run

1. Set `APP_PORT` in `.env` if port `3000` is unavailable.
2. Start the app:

   ```bash
   npm start
   ```

3. Open `http://localhost:APP_PORT`.

No package installation is required because the server uses Node.js built-in modules.

## Test

```bash
npm test
```

## Calculations

- CPC = CPM / (1,000 × CTR)
- CPA = CPC / conversion rate
- Net profit = selling price − product cost − fixed fees − CPA
- Net margin = net profit / selling price
- ROAS = selling price / CPA
