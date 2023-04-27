const storageKey = 'contudo_adminToken';

export const getToken = () => {
  return JSON.parse(window.localStorage.getItem(storageKey) as string);
};

export const setToken = (token: string) => {
  window.localStorage.setItem(storageKey, JSON.stringify(token));
};

export const deleteToken = () => {
  window.localStorage.removeItem(storageKey);
};
