// Thin wrapper around chrome.storage.local for the vest list + settings.
// Falls back to a no-op store in non-extension contexts (unit-test friendly).

const STORAGE_KEY_VESTS = 'vests';
const STORAGE_KEY_SETTINGS = 'settings';

const DEFAULT_SETTINGS = {
  defaultNotifyDays: 30,
  notificationsEnabled: true,
};

function chromeStorage() {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    return chrome.storage.local;
  }
  return null;
}

export async function loadVests() {
  const s = chromeStorage();
  if (!s) return [];
  return new Promise((resolve) => {
    s.get([STORAGE_KEY_VESTS], (result) => {
      resolve(Array.isArray(result[STORAGE_KEY_VESTS]) ? result[STORAGE_KEY_VESTS] : []);
    });
  });
}

export async function saveVests(vests) {
  const s = chromeStorage();
  if (!s) return;
  return new Promise((resolve) => {
    s.set({ [STORAGE_KEY_VESTS]: vests }, () => resolve());
  });
}

export async function loadSettings() {
  const s = chromeStorage();
  if (!s) return { ...DEFAULT_SETTINGS };
  return new Promise((resolve) => {
    s.get([STORAGE_KEY_SETTINGS], (result) => {
      resolve({ ...DEFAULT_SETTINGS, ...(result[STORAGE_KEY_SETTINGS] || {}) });
    });
  });
}

export async function saveSettings(settings) {
  const s = chromeStorage();
  if (!s) return;
  return new Promise((resolve) => {
    s.set({ [STORAGE_KEY_SETTINGS]: settings }, () => resolve());
  });
}

export { DEFAULT_SETTINGS };
