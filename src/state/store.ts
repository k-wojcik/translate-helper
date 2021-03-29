export const SETTINGS_STORAGE_KEY = "translate-helper-settings";
export const TRANSLATIONS_STORAGE_KEY = "translate-helper-values";

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

export type LocalStorageType = typeof localStorage;
