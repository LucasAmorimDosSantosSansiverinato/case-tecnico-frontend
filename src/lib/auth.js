const KEY = 'dt_logged_person';

export function saveSession(person) {
  localStorage.setItem(KEY, JSON.stringify(person));
}

export function getSession() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(KEY);
}
