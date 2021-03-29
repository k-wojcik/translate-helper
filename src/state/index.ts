import { LocalStorageType, localStorage } from "./store";
import Settings from "./settings";
import Translations from "./translations";

export default class State {
  private _storage: LocalStorageType;
  private _translations: Translations;
  private _settings: Settings;

  constructor() {
    this._storage = localStorage;
    this._translations = new Translations(this._storage);
    this._settings = new Settings(this._storage);
  }

  get translations(): Translations {
    return this._translations;
  }

  get settings(): Settings {
    return this._settings;
  }
}
