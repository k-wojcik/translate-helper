import axios from "axios";
import { Ref, ref } from "vue";

export interface TranslationNode {
  [key: string]: TranslationNode | string | null;
}

export default class TranslationTree {
  private tree: TranslationNode;
  private hasDownloadedData: Ref<boolean>;
  private isDownloading: Ref<boolean>;
  private downloadCallbacks: ((tree: TranslationNode) => void)[];

  constructor(tree: TranslationNode) {
    this.tree = tree;
    this.hasDownloadedData = ref(false);
    this.isDownloading = ref(false);
    this.downloadCallbacks = [];
  }

  get keys(): string[] {
    const recurseKeys = function (
      keys: string[],
      node: TranslationNode | string | null
    ): string[] {
      if (!node) {
        return [];
      } else if (typeof node === "string") {
        return [keys.join(".")];
      } else {
        return Object.entries(node).flatMap(([key, value]) =>
          recurseKeys([...keys, key], value)
        );
      }
    };
    return recurseKeys([], this.tree);
  }

  get all(): TranslationNode {
    return this.tree;
  }

  onDownload(callback: (tree: TranslationNode) => void): void {
    this.downloadCallbacks.push(callback);
  }

  // returns false when path conflicts with existing keys, otherwise true
  allowsKey(key: string): boolean {
    const parts = key.split(".");
    let cursor = this.tree;

    while (parts.length > 0) {
      const next = cursor[parts[0]];
      if (!next) {
        return true;
      }
      if (typeof next === "string") {
        return parts.length === 1;
      } else {
        parts.shift();
        cursor = next;
      }
    }
    return false;
  }

  get downloaded(): boolean {
    return this.hasDownloadedData.value;
  }

  get downloading(): boolean {
    return this.isDownloading.value;
  }

  get downloadStatus(): {
    downloading: Ref<boolean>;
    downloaded: Ref<boolean>;
  } {
    return {
      downloading: this.isDownloading,
      downloaded: this.hasDownloadedData,
    };
  }

  async download(uri: string): Promise<TranslationTree> {
    try {
      this.isDownloading.value = true;
      const data = (await axios.get(uri)).data;
      if (typeof data === "string") {
        throw new Error("Unable to parse translations as string");
      }
      this.tree = data as TranslationNode;
      this.hasDownloadedData.value = true;
      this.isDownloading.value = false;
      this.downloadCallbacks.forEach((cb) => cb(this.tree));
    } catch (err) {
      this.hasDownloadedData.value = false;
      this.isDownloading.value = false;
      throw err;
    }
    return this;
  }
}
