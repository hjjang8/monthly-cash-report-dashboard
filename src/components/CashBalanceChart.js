const { createElement: h, useState } = window.React;
const html = window.htm.bind(h);

import { formatEok, formatWon, niceTicks } from "../utils.js";

const W = 1200;
const H = 380;
const M = { top: 60, right: 40, bottom: 50, left: 70 };
const LOW_VALUE_THRESHOLD = 20;
const ANNOTATION_MONTH_INDEX = 4; // 5월

export function CashBalanceChart({ data }) {
  const [hover, setHover] = useState(null);

  const plotW = W - M.left - M.right;
  const plotH = H - M.top - M.bottom;

  const values = data.map((d) => d.endBalance / 1e8);
  const maxVal = Math.max(...values);
  const ticks = niceTicks(maxVal, 20);
  const yMax = ticks[ticks.length - 1];

  const x = (i) => M.left + (plotW * i) / (data.length - 1);
  const y = (v) => M.top + plotH - (plotH * v) / yMax;
  const baseline = M.top + plotH;

  const points = data.map((d, i) => ({
    ...d,
    value: d.endBalance / 1e8,
    xPos: x(i),
    yPos: y(d.endBalance / 1e8),
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.xPos.toFixed(1)} ${p.yPos.toFixed(1)}`)
    .join(" ");

  const annoPoint = points[ANNOTATION_MONTH_INDEX];
  const boxW = 220;
  const boxH = 42;
  const boxX = annoPoint.xPos - boxW / 2 + 30;
  const boxY = y(66) - boxH / 2;
  const arrowStart = { x: boxX + 26, y: boxY + boxH };
  const arrowEnd = { x: annoPoint.xPos - 6, y: annoPoint.yPos - 12 };

  return html`
    <div>
      <div class="axis-unit-label">현금잔액 (억원)</div>
      <div class="chart-wrap">
        <svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="2026년 월별 현금잔액 추이">
          <defs>
            <marker id="cash-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--annotation-border)" />
            </marker>
          </defs>

          ${ticks.map(
            (t) => html`
              <g key=${"grid-" + t}>
                <line x1=${M.left} x2=${W - M.right} y1=${y(t)} y2=${y(t)} stroke="var(--gridline)" stroke-width="1" />
                <text x=${M.left - 12} y=${y(t) + 4} text-anchor="end" class="tick-label">${t.toLocaleString("ko-KR")}</text>
              </g>
            `
          )}
          <line x1=${M.left} x2=${W - M.right} y1=${baseline} y2=${baseline} stroke="var(--baseline)" stroke-width="1" />

          <path d=${linePath} fill="none" stroke="var(--series-cash)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />

          <path
            d="M ${arrowStart.x.toFixed(1)} ${arrowStart.y.toFixed(1)} Q ${(arrowStart.x - 30).toFixed(1)} ${(arrowStart.y + 70).toFixed(1)} ${arrowEnd.x.toFixed(1)} ${arrowEnd.y.toFixed(1)}"
            fill="none"
            stroke="var(--annotation-border)"
            stroke-width="1.6"
            stroke-dasharray="4,4"
            marker-end="url(#cash-arrow)"
          />
          <rect x=${boxX} y=${boxY} width=${boxW} height=${boxH} rx="10" fill="var(--annotation-bg)" stroke="var(--annotation-border)" stroke-width="1.2" />
          <text x=${boxX + boxW / 2} y=${boxY + boxH / 2 + 5} text-anchor="middle" class="annotation-text">
            5월 투자사 투자금상환
          </text>

          ${points.map((p, i) => {
            const labelBelow = p.value < LOW_VALUE_THRESHOLD;
            return html`
              <g key=${"pt-" + i}>
                <circle cx=${p.xPos} cy=${p.yPos} r="7" fill="var(--surface-1)" stroke="var(--series-cash)" stroke-width="3" />
                <rect
                  x=${p.xPos - plotW / (data.length - 1) / 2}
                  y=${M.top}
                  width=${plotW / (data.length - 1)}
                  height=${plotH}
                  fill="transparent"
                  style=${{ cursor: "pointer" }}
                  onMouseEnter=${() => setHover(i)}
                  onMouseLeave=${() => setHover(null)}
                />
                <text x=${p.xPos} y=${baseline + 28} text-anchor="middle" class="tick-label">2026년 ${p.month}</text>
                <text
                  x=${p.xPos}
                  y=${labelBelow ? p.yPos + 28 : p.yPos - 16}
                  text-anchor="middle"
                  class="value-label"
                >
                  ${formatEok(p.endBalance)}억원
                </text>
              </g>
            `;
          })}
        </svg>
        ${hover !== null
          ? html`
              <div
                class="chart-tooltip"
                style=${{
                  left: `${(points[hover].xPos / W) * 100}%`,
                  top: `${(points[hover].yPos / H) * 100}%`,
                }}
              >
                <div class="tt-title">2026년 ${points[hover].month}</div>
                <div class="tt-row"><span>월말잔액</span><span class="tabular">${formatWon(points[hover].endBalance)}</span></div>
                <div class="tt-row"><span>순증감</span><span class="tabular">${points[hover].net >= 0 ? "+" : ""}${formatWon(points[hover].net)}</span></div>
              </div>
            `
          : null}
      </div>
    </div>
  `;
}
