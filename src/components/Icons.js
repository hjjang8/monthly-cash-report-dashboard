const { createElement: h } = window.React;
const html = window.htm.bind(h);

export function IconTrendingUp({ color = "#fff", size = 20 }) {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${color} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3,17 9,11 13,15 21,6" />
      <polyline points="14,6 21,6 21,13" />
    </svg>
  `;
}

export function IconBarChart({ color = "#fff", size = 20 }) {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${color} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="20" x2="5" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="19" y1="20" x2="19" y2="14" />
    </svg>
  `;
}

export function IconCheckShield({ color = "#1f7a4d", size = 24 }) {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${color} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <polyline points="8.5,12 11,14.5 15.5,9.5" />
    </svg>
  `;
}

export function IconTrendingDown({ color = "#c98a1f", size = 24 }) {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${color} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3,7 9,13 13,9 21,18" />
      <polyline points="21,11 21,18 14,18" />
    </svg>
  `;
}

export function IconRefresh({ color = "#d9573c", size = 24 }) {
  return html`
    <svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke=${color} stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 12a8 8 0 0 1 14-5.2M20 12a8 8 0 0 1-14 5.2" />
      <polyline points="17,4 18,7 15,7" />
      <polyline points="7,20 6,17 9,17" />
    </svg>
  `;
}
