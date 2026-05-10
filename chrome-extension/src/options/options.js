import {
  newVestId,
  validateVest,
  sortByVestDate,
  parseIsoDate,
  daysUntil,
} from '../lib/vest-schedule.js';
import {
  loadVests,
  saveVests,
  loadSettings,
  saveSettings,
} from '../lib/storage.js';

const dateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});
const numFmt = new Intl.NumberFormat('en-US');

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
}

function showStatus(message, kind = 'ok') {
  const el = document.getElementById('status');
  el.textContent = message;
  el.className = `status ${kind}`;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 3500);
}

async function reloadTable() {
  const vests = await loadVests();
  const sorted = sortByVestDate(vests);
  const wrap = document.getElementById('vest-table-wrap');
  if (sorted.length === 0) {
    wrap.innerHTML = '<div class="empty">No vests yet. Add one above.</div>';
    return;
  }
  const now = new Date();
  wrap.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Vest date</th>
          <th>Days</th>
          <th>Ticker</th>
          <th>Shares</th>
          <th>Type</th>
          <th>Notify</th>
          <th>Notes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${sorted
          .map((v) => {
            const d = parseIsoDate(v.vestDateIso);
            const days = daysUntil(now, d);
            const dayCol =
              days === 0
                ? '<span class="tag amber">today</span>'
                : days < 0
                  ? `<span class="muted">${Math.abs(days)}d ago</span>`
                  : `<span class="tag${days <= 30 ? ' amber' : ''}">${days}d</span>`;
            return `
              <tr data-id="${escapeHtml(v.id)}">
                <td>${dateFmt.format(d)}</td>
                <td>${dayCol}</td>
                <td><strong>${escapeHtml(v.ticker)}</strong></td>
                <td>${numFmt.format(v.shares)}</td>
                <td>${escapeHtml(v.type)}</td>
                <td>${v.notifyDays ?? 30}d</td>
                <td>${escapeHtml(v.notes || '')}</td>
                <td><button class="danger delete-btn" data-id="${escapeHtml(v.id)}">Delete</button></td>
              </tr>
            `;
          })
          .join('')}
      </tbody>
    </table>
  `;

  wrap.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const vests = await loadVests();
      await saveVests(vests.filter((v) => v.id !== id));
      await reloadTable();
      showStatus('Vest deleted.');
    });
  });
}

async function reloadSettings() {
  const s = await loadSettings();
  document.getElementById('defaultNotifyDays').value = s.defaultNotifyDays;
  document.getElementById('notificationsEnabled').checked = s.notificationsEnabled;
}

document.getElementById('add-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const ticker = document.getElementById('ticker').value.trim().toUpperCase();
  const shares = Number(document.getElementById('shares').value);
  const type = document.getElementById('type').value;
  const vestDateIso = document.getElementById('vestDate').value;
  const notifyDaysRaw = document.getElementById('notifyDays').value;
  const notes = document.getElementById('notes').value.trim();

  const vest = {
    id: newVestId(),
    ticker,
    shares,
    type,
    vestDateIso,
    notifyDays: notifyDaysRaw === '' ? 30 : Number(notifyDaysRaw),
    ...(notes ? { notes } : {}),
  };

  try {
    validateVest(vest);
  } catch (err) {
    showStatus(err.message, 'err');
    return;
  }

  const vests = await loadVests();
  vests.push(vest);
  await saveVests(vests);

  e.target.reset();
  document.getElementById('notifyDays').value = '30';

  await reloadTable();
  showStatus(`Added ${vest.ticker} ${vest.shares} ${vest.type} on ${vest.vestDateIso}.`);
});

document.getElementById('export-json').addEventListener('click', async () => {
  const vests = await loadVests();
  const blob = new Blob([JSON.stringify(vests, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `equity-vests-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showStatus('Exported.');
});

document.getElementById('import-json').addEventListener('click', () => {
  document.getElementById('import-file').click();
});

document.getElementById('import-file').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const incoming = JSON.parse(text);
    if (!Array.isArray(incoming)) throw new Error('Expected an array of vests.');
    incoming.forEach(validateVest);
    const existing = await loadVests();
    const existingIds = new Set(existing.map((v) => v.id));
    const merged = [...existing, ...incoming.filter((v) => !existingIds.has(v.id))];
    await saveVests(merged);
    await reloadTable();
    showStatus(`Imported ${incoming.length} vests (${merged.length - existing.length} new).`);
  } catch (err) {
    showStatus(`Import failed: ${err.message}`, 'err');
  } finally {
    e.target.value = '';
  }
});

document.getElementById('clear-all').addEventListener('click', async () => {
  if (!confirm('Delete ALL vests? This cannot be undone.')) return;
  await saveVests([]);
  await reloadTable();
  showStatus('All vests cleared.');
});

document.getElementById('save-settings').addEventListener('click', async () => {
  const settings = {
    defaultNotifyDays: Number(document.getElementById('defaultNotifyDays').value) || 30,
    notificationsEnabled: document.getElementById('notificationsEnabled').checked,
  };
  await saveSettings(settings);
  showStatus('Settings saved.');
});

(async function init() {
  await reloadTable();
  await reloadSettings();
})();
