const { createElement: h } = window.React;
const html = window.htm.bind(h);

import { IconCheckShield, IconTrendingDown, IconRefresh } from "./Icons.js";

const CARDS = [
  {
    theme: "green",
    Icon: IconCheckShield,
    title: "3~4월까지 안정적 현금 유지",
    body: "1~4월 현금잔액이 100억원 이상을 유지하며 안정적인 흐름을 보였습니다.",
  },
  {
    theme: "amber",
    Icon: IconTrendingDown,
    title: "5월 대규모 지출로 현금잔액 급감",
    body: "5월 투자사 투자금상환으로 지출이 급증하여 현금잔액이 큰 폭으로 감소했습니다.",
  },
  {
    theme: "red",
    Icon: IconRefresh,
    title: "6월 수입은 회복했으나 현금잔액은 낮은 수준 유지",
    body: "6월 수입은 회복되었으나, 현금잔액은 4.85억원으로 낮은 수준을 유지하고 있습니다.",
  },
];

export function InsightCards() {
  return html`
    <div class="insight-grid">
      ${CARDS.map(
        (c) => html`
          <div class="insight-card ${c.theme}" key=${c.title}>
            <div class="insight-icon-badge">
              <${c.Icon} />
            </div>
            <div class="insight-title">${c.title}</div>
            <div class="insight-body">${c.body}</div>
          </div>
        `
      )}
    </div>
  `;
}
