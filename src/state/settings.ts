import { reactive } from "vue";
import { SETTINGS_STORAGE_KEY, LocalStorageType } from "./store";

export interface TranslationTemplate {
  each: string;
  prefix: string;
  suffix: string;
}

export interface SettingsData {
  translationTemplate: TranslationTemplate;
  translationFilename: string;
  languages: string[];
  translationsSourceUri?: string;
}

export function defaultSettings(): SettingsData {
  return {
    translationTemplate: {
      prefix: "",
      suffix: "",
      each: "{key}\t{value}\t{lang}",
    },
    translationFilename: "{name}.csv",
    languages: ["EN", "PL"],
  };
}

export default class Settings {
  private _data: SettingsData;
  private _storage: LocalStorageType;

  constructor(storage: LocalStorageType) {
    this._storage = storage;
    const stored = storage.getItem(SETTINGS_STORAGE_KEY);
    const values = stored
      ? (JSON.parse(stored) as SettingsData)
      : defaultSettings();
    this._data = reactive(values);
  }

  get languages(): string[] {
    return this._data.languages;
  }

  get translationTemplate(): TranslationTemplate {
    return this._data.translationTemplate;
  }

  get translationFilename(): string {
    return this._data.translationFilename;
  }

  get translationsSourceUri(): string | null {
    return this._data.translationsSourceUri || null;
  }

  update(data: SettingsData): void {
    this._storage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(data));
    this._data.translationTemplate.prefix = data.translationTemplate.prefix;
    this._data.translationTemplate.suffix = data.translationTemplate.suffix;
    this._data.translationTemplate.each = data.translationTemplate.each;
    this._data.translationFilename = data.translationFilename;
    this._data.languages = data.languages;
    this._data.translationsSourceUri = data.translationsSourceUri;
  }
}
