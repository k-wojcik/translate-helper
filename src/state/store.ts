export const SETTINGS_STORAGE_KEY = "translate-helper-settings";

const setItem = (key: string, data: string): void => {
  window.localStorage.setItem(key, data);
};

const getItem = (key: string): string | null => {
  return window.localStorage.getItem(key);
};

export const localStorage = {
  setItem,
  getItem,
};
