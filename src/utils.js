export function formatEok(won) {
  const eok = won / 1e8;
  const rounded = Math.round(eok * 100) / 100;
  return rounded.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatWon(won) {
  return Math.round(won).toLocaleString("ko-KR") + "원";
}

export function niceTicks(max, step) {
  const top = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = 0; v <= top; v += step) ticks.push(v);
  return ticks;
}
