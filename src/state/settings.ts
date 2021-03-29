import { reactive } from "vue";
import { SETTINGS_STORAGE_KEY, LocalStorageType } from "./store";

export interface SettingsData {
  translationTemplate: string;
  translationFilename: string;
  languages: string[];
}

export function defaultSettings(): SettingsData {
  return {
    translationTemplate: "{key}\t{value}\t{lang}",
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

  get translationTemplate(): string {
    return this._data.translationTemplate;
  }

  get translationFilename(): string {
    return this._data.translationFilename;
  }

  update(newValues: SettingsData): void {
    this._storage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newValues));
    this._data.translationTemplate = newValues.translationTemplate;
    this._data.translationFilename = newValues.translationFilename;
    this._data.languages = newValues.languages;
  }
}
