import { reactive, readonly } from "vue";
import { LocalStorageType, TRANSLATIONS_STORAGE_KEY } from "./store";

export interface TT {
  key: string;
  [id: string]: string;
}

export default class Translations {
  private _values: TT[];
  private _storage: LocalStorageType;

  constructor(storage: LocalStorageType) {
    this._storage = storage;
    const data = JSON.parse(
      storage.getItem(TRANSLATIONS_STORAGE_KEY) || "[]"
    ) as TT[];
    this._values = reactive(data);
  }

  get values(): Readonly<TT[]> {
    return readonly(this._values);
  }

  update(t: TT): void {
    const found = this._values.filter((x) => x.key == t.key);
    if (found.length > 0) {
      const existing = found[0];
      for (const [key, value] of Object.entries(t)) {
        existing[key] = value;
      }
    } else {
      this._values.push(t);
    }
    this.save();
  }

  save(): void {
    this._storage.setItem(
      TRANSLATIONS_STORAGE_KEY,
      JSON.stringify(this._values)
    );
  }
}
