import chai, { expect } from "chai";
import spies from "chai-spies";
chai.use(spies);
import Translations from "@/state/translations";
import { LocalStorageType } from "@/state/store";

describe("state/translations.ts", () => {
  let storage: LocalStorageType = {
    getItem: () => null,
    setItem: function () {
      /* */
    },
  };

  beforeEach(() => {
    storage = {
      getItem: () => null,
      setItem: function () {
        /* */
      },
    };
  });

  it("adds new translation to shared state", () => {
    const translations = new Translations(storage);
    expect(translations.values).to.not.deep.include({ key: "zzz", en: "abc" });
    translations.update({ key: "zzz", en: "abc" });
    expect(translations.values).to.deep.include({ key: "zzz", en: "abc" });
  });

  it("merges with existing translation when adding", () => {
    const translations = new Translations(storage);
    translations.update({ key: "asdf", en: "zxc" });
    expect(translations.values).to.deep.include({ key: "asdf", en: "zxc" });
    translations.update({ key: "asdf", pl: "abc" });
    expect(translations.values).to.deep.include({
      key: "asdf",
      en: "zxc",
      pl: "abc",
    });
  });

  it("updates existing translation", () => {
    const translations = new Translations(storage);
    expect(translations.values).to.not.deep.include({ key: "zzz", en: "abc" });
    translations.update({ key: "zzz", en: "abc" });
    expect(translations.values).to.deep.include({ key: "zzz", en: "abc" });
    translations.update({ key: "zzz", pl: "qqq" });
    expect(translations.values).to.deep.include({
      key: "zzz",
      en: "abc",
      pl: "qqq",
    });
    translations.update({ key: "zzz", pl: "www" });
    expect(translations.values).to.deep.include({
      key: "zzz",
      en: "abc",
      pl: "www",
    });
  });

  it("drops all data to local storage on save", async () => {
    const translations = new Translations(storage);
    const spy = chai.spy.on(storage, "setItem");
    translations.update({ key: "zzz", en: "abc" });
    await translations.connect();
    expect(spy).to.have.been.called.once.with(
      JSON.stringify([{ key: "zzz", en: "abc" }])
    );
  });
});
