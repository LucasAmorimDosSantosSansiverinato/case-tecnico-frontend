const TOKEN_KEY  = 'dt_token';
const PERSON_KEY = 'dt_person';

export function saveSession(token, person) {
  localStorage.setItem(TOKEN_KEY,  token);
  localStorage.setItem(PERSON_KEY, JSON.stringify(person));
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getSession() {
  try {
    const token = getToken();
    if (!token) return null;

    // Decodifica o payload do JWT sem verificar assinatura (verificação fica no BFF/Backend)
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      clearSession();
      return null;
    }

    const raw = localStorage.getItem(PERSON_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PERSON_KEY);
}
