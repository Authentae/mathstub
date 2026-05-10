import {
  daysUntil,
  parseIsoDate,
  upcomingVests,
  summarizeUpcomingByTicker,
} from '../lib/vest-schedule.js';
import { loadVests } from '../lib/storage.js';

const SUMMARY_WINDOW_DAYS = 90;

const dateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
const numFmt = new Intl.NumberFormat('en-US');

function renderSummary(vests, now) {
  const summary = summarizeUpcomingByTicker(vests, now, SUMMARY_WINDOW_DAYS);
  const tickers = Object.keys(summary);
  const stat = document.getElementById('summary-stat');
  const detail = document.getElementById('summary-detail');

  if (tickers.length === 0) {
    stat.textContent = 'No upcoming vests';
    detail.textContent = `Add a vest to start tracking. Notifications fire 30 days before each vest by default.`;
    return;
  }

  const total = tickers.reduce((acc, t) => acc + summary[t], 0);
  stat.textContent = `${numFmt.format(total)} shares`;
  detail.textContent = tickers
    .map((t) => `${t}: ${numFmt.format(summary[t])}`)
    .join(' · ');
}

function renderList(vests, now) {
  const list = document.getElementById('vest-list');
  const upcoming = upcomingVests(vests, now);

  if (upcoming.length === 0) {
    list.innerHTML =
      '<div class="empty">Nothing scheduled. Click <strong>Manage</strong> to add a vest.</div>';
    return;
  }

  list.innerHTML = upcoming
    .slice(0, 10)
    .map((v) => {
      const days = daysUntil(now, parseIsoDate(v.vestDateIso));
      const dateLabel = dateFmt.format(parseIsoDate(v.vestDateIso));
      const tagClass =
        days <= 7 ? 'tag amber' : days <= 30 ? 'tag' : 'tag emerald';
      const dayText =
        days === 0 ? 'today' : days === 1 ? 'tomorrow' : `${days} days`;
      return `
        <div class="row">
          <div>
            <div><strong>${escapeHtml(v.ticker)}</strong> · ${numFmt.format(v.shares)} ${escapeHtml(v.type)}</div>
            <div class="vest-meta">${dateLabel}${v.notes ? ' · ' + escapeHtml(v.notes) : ''}</div>
          </div>
          <span class="${tagClass}">${dayText}</span>
        </div>
      `;
    })
    .join('');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
}

async function init() {
  const vests = await loadVests();
  const now = new Date();
  renderSummary(vests, now);
  renderList(vests, now);
}

document.getElementById('open-options').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

init().catch((e) => {
  console.error(e);
  document.getElementById('vest-list').innerHTML =
    `<div class="empty">Error loading vests: ${escapeHtml(e.message)}</div>`;
});
