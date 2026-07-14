const { createElement: h } = window.React;
const html = window.htm.bind(h);

import { monthly2026 } from "./data/monthly2026.js";
import { CashBalanceChart } from "./components/CashBalanceChart.js";
import { IncomeExpenseChart } from "./components/IncomeExpenseChart.js";
import { InsightCards } from "./components/InsightCards.js";
import { IconTrendingUp, IconBarChart } from "./components/Icons.js";

function App() {
  return html`
    <div>
      <header class="app-header">
        <h1>월간 자금보고</h1>
        <span class="period">2026년 1월 ~ 6월 (기준일: 2026.06.30)</span>
      </header>

      <section class="panel-stack">
        <div class="panel">
          <div class="panel-header">
            <span class="panel-icon-badge green"><${IconTrendingUp} /></span>
            <h2 class="panel-title">월별 현금잔액 추이</h2>
          </div>
          <${CashBalanceChart} data=${monthly2026} />
        </div>

        <div class="panel">
          <div class="panel-header">
            <span class="panel-icon-badge green"><${IconBarChart} /></span>
            <h2 class="panel-title">월별 수입 / 지출 비교</h2>
          </div>
          <${IncomeExpenseChart} data=${monthly2026} />
        </div>
      </section>

      <section class="insight-section">
        <${InsightCards} />
      </section>
    </div>
  `;
}

const root = window.ReactDOM.createRoot(document.getElementById("root"));
root.render(html`<${App} />`);
