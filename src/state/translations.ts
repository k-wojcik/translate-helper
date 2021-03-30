import { reactive, ref, Ref } from "vue";
import { LocalStorageType, TRANSLATIONS_STORAGE_KEY } from "./store";

export interface TT {
  key: string;
  [id: string]: string;
}

export default class Translations {
  private _values: TT[];
  private _storage: LocalStorageType;
  private _pending: Promise<void> | null;
  private _saving: Ref<boolean>;

  constructor(storage: LocalStorageType) {
    this._storage = storage;
    const data = JSON.parse(
      storage.getItem(TRANSLATIONS_STORAGE_KEY) || "[]"
    ) as TT[];
    this._values = reactive(data);
    this._pending = null;
    this._saving = ref(false);
  }

  get values(): TT[] {
    return this._values;
  }

  get saving(): Readonly<Ref<boolean>> {
    return this._saving;
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
    if (!this._pending) {
      this._pending = this.saveAsync();
    }
  }

  async saveAsync(): Promise<void> {
    if (this._pending) {
      return this._pending;
    }
    this._saving.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this._storage.setItem(
      TRANSLATIONS_STORAGE_KEY,
      JSON.stringify(this._values)
    );
    if (!this._values.some((x) => !x.key)) {
      this._values.push({ key: "" });
    }
    this._pending = null;
    this._saving.value = false;
  }

  connect(): Promise<void> {
    return (
      this._pending ||
      new Promise((resolve) => {
        resolve();
      })
    );
  }

  deleteRow(key: string): void {
    const index = this._values.findIndex((x) => x.key == key);
    this._values.splice(index, 1);
  }
}
