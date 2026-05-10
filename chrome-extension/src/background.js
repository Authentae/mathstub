import { vestsToNotifyToday, daysUntil, parseIsoDate } from './lib/vest-schedule.js';
import { loadVests, loadSettings } from './lib/storage.js';

const DAILY_ALARM = 'vest-tracker-daily-check';
const MATHSTUB_URL = 'https://mathstub.vercel.app';
const MATHSTUB_TOOL_BY_TYPE = {
  RSU: `${MATHSTUB_URL}/rsu-tax-shortfall`,
  ESPP: `${MATHSTUB_URL}/espp-qualifying-disposition`,
  ISO: `${MATHSTUB_URL}/iso-amt`,
};

// Schedule a daily 9am alarm on install + on browser startup.
function scheduleDailyAlarm() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(9, 0, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);
  chrome.alarms.create(DAILY_ALARM, {
    when: next.getTime(),
    periodInMinutes: 24 * 60,
  });
}

chrome.runtime.onInstalled.addListener(() => {
  scheduleDailyAlarm();
});
chrome.runtime.onStartup.addListener(() => {
  scheduleDailyAlarm();
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== DAILY_ALARM) return;
  await checkAndNotify();
});

async function checkAndNotify() {
  const settings = await loadSettings();
  if (!settings.notificationsEnabled) return;

  const vests = await loadVests();
  const now = new Date();
  const due = vestsToNotifyToday(vests, now);

  for (const v of due) {
    const days = daysUntil(now, parseIsoDate(v.vestDateIso));
    const dayLabel =
      days === 0 ? 'today' : days === 1 ? 'tomorrow' : `in ${days} days`;
    const id = `vest-${v.id}-${v.vestDateIso}`;
    chrome.notifications.create(
      id,
      {
        type: 'basic',
        iconUrl: 'icons/icon-128.png',
        title: `${v.ticker} ${v.type} vest ${dayLabel}`,
        message: `${v.shares} shares vesting on ${v.vestDateIso}. Tap to plan tax withholding on Mathstub.`,
        priority: 1,
      },
      () => {
        if (chrome.runtime.lastError) {
          // Notifications may be disabled at OS level — fail silently.
          console.warn('notification failed:', chrome.runtime.lastError.message);
        }
      },
    );
  }
}

chrome.notifications.onClicked.addListener((notificationId) => {
  // Look up the vest by id encoded in the notification id (format: vest-<id>-<date>).
  const m = /^vest-([^-]+(?:-[^-]+)*)-\d{4}-\d{2}-\d{2}$/.exec(notificationId);
  if (!m) {
    chrome.tabs.create({ url: MATHSTUB_URL });
    return;
  }
  const vestId = m[1];
  loadVests().then((vests) => {
    const v = vests.find((x) => x.id === vestId);
    const url =
      v && MATHSTUB_TOOL_BY_TYPE[v.type]
        ? MATHSTUB_TOOL_BY_TYPE[v.type]
        : MATHSTUB_URL;
    chrome.tabs.create({ url });
    chrome.notifications.clear(notificationId);
  });
});

// Expose for testing/manual trigger via the dev console:
//   chrome.runtime.sendMessage({ type: 'force-check' })
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg && msg.type === 'force-check') {
    checkAndNotify().then(() => sendResponse({ ok: true }));
    return true;
  }
});
