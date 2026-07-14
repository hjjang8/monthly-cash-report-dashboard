const { createElement: h, useState } = window.React;
const html = window.htm.bind(h);

import { formatEok, formatWon, niceTicks } from "../utils.js";

const W = 1200;
const H = 380;
const M = { top: 50, right: 40, bottom: 50, left: 70 };
const BAR_MAX = 46;
const BAR_GAP = 12;

function roundedTopRectPath(x, yTop, width, height, radius) {
  const r = Math.min(radius, width / 2, height);
  const yBottom = yTop + height;
  if (height <= 0) return "";
  return [
    `M ${x} ${yBottom}`,
    `L ${x} ${yTop + r}`,
    `Q ${x} ${yTop} ${x + r} ${yTop}`,
    `L ${x + width - r} ${yTop}`,
    `Q ${x + width} ${yTop} ${x + width} ${yTop + r}`,
    `L ${x + width} ${yBottom}`,
    "Z",
  ].join(" ");
}

export function IncomeExpenseChart({ data }) {
  const [hover, setHover] = useState(null);

  const plotW = W - M.left - M.right;
  const plotH = H - M.top - M.bottom;

  const maxVal = Math.max(...data.map((d) => Math.max(d.income, d.expense) / 1e8));
  const ticks = niceTicks(maxVal, 20);
  const yMax = ticks[ticks.length - 1];

  const bandW = plotW / data.length;
  const barW = Math.min(BAR_MAX, (bandW - 40) / 2);
  const groupW = barW * 2 + BAR_GAP;

  const yFor = (v) => (plotH * v) / yMax;
  const baseline = M.top + plotH;

  const bars = data.map((d, i) => {
    const bandCenter = M.left + bandW * i + bandW / 2;
    const groupLeft = bandCenter - groupW / 2;
    const incomeH = yFor(d.income / 1e8);
    const expenseH = yFor(d.expense / 1e8);
    return {
      ...d,
      idx: i,
      incomeX: groupLeft,
      expenseX: groupLeft + barW + BAR_GAP,
      incomeH,
      expenseH,
      incomeY: baseline - incomeH,
      expenseY: baseline - expenseH,
      bandCenter,
    };
  });

  return html`
    <div>
      <div class="panel-top-row">
        <div class="axis-unit-label">금액 (억원)</div>
        <div class="legend">
          <span class="legend-item">
            <span class="legend-swatch" style=${{ background: "var(--series-income)" }}></span>
            수입 (소계)
          </span>
          <span class="legend-item">
            <span class="legend-swatch" style=${{ background: "var(--series-expense)" }}></span>
            지출 (소계)
          </span>
        </div>
      </div>
      <div class="chart-wrap">
        <svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="2026년 수입/지출 비교">
          ${ticks.map(
            (t) => html`
              <g key=${"grid-" + t}>
                <line x1=${M.left} x2=${W - M.right} y1=${baseline - yFor(t)} y2=${baseline - yFor(t)} stroke="var(--gridline)" stroke-width="1" />
                <text x=${M.left - 12} y=${baseline - yFor(t) + 4} text-anchor="end" class="tick-label">${t.toLocaleString("ko-KR")}</text>
              </g>
            `
          )}
          <line x1=${M.left} x2=${W - M.right} y1=${baseline} y2=${baseline} stroke="var(--baseline)" stroke-width="1" />

          ${bars.map(
            (b) => html`
              <g key=${"bar-" + b.idx}>
                <path d=${roundedTopRectPath(b.incomeX, b.incomeY, barW, b.incomeH, 4)} fill="var(--series-income)" />
                <path d=${roundedTopRectPath(b.expenseX, b.expenseY, barW, b.expenseH, 4)} fill="var(--series-expense)" />
                <text x=${b.incomeX + barW} y=${b.incomeY - 10} text-anchor="end" class="value-label income">${formatEok(b.income)}억원</text>
                <text x=${b.expenseX} y=${b.expenseY - 10} text-anchor="start" class="value-label">${formatEok(b.expense)}억원</text>
                <rect
                  x=${b.bandCenter - bandW / 2}
                  y=${M.top}
                  width=${bandW}
                  height=${plotH}
                  fill="transparent"
                  style=${{ cursor: "pointer" }}
                  onMouseEnter=${() => setHover(b.idx)}
                  onMouseLeave=${() => setHover(null)}
                />
                <text x=${b.bandCenter} y=${baseline + 28} text-anchor="middle" class="tick-label">2026년 ${b.month}</text>
              </g>
            `
          )}
        </svg>
        ${hover !== null
          ? html`
              <div
                class="chart-tooltip"
                style=${{
                  left: `${(bars[hover].bandCenter / W) * 100}%`,
                  top: `${(Math.min(bars[hover].incomeY, bars[hover].expenseY) / H) * 100}%`,
                }}
              >
                <div class="tt-title">2026년 ${bars[hover].month}</div>
                <div class="tt-row"><span>수입</span><span class="tabular">${formatWon(bars[hover].income)}</span></div>
                <div class="tt-row"><span>지출</span><span class="tabular">${formatWon(bars[hover].expense)}</span></div>
                <div class="tt-row"><span>순유입/유출</span><span class="tabular">${bars[hover].net >= 0 ? "+" : ""}${formatWon(bars[hover].net)}</span></div>
              </div>
            `
          : null}
      </div>
    </div>
  `;
}
