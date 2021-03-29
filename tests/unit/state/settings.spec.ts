import chai, { expect } from "chai";
import spies from "chai-spies";
import { settings, updateSettings, refreshSettings } from "@/state/settings";
import { SETTINGS_STORAGE_KEY, localStorage } from "@/state/store";

chai.use(spies);

describe("state/settings.ts", () => {
  it("saves settings to local store on update", () => {
    const newSettings = {
      languages: ["en", "ja", "kr", "fr"],
      translationFilename: "some{name}.csv",
      translationTemplate: "{lang}.{key}:{value}",
    };

    let usedKey = "";
    let usedData = "";

    const storageSpy = chai.spy.on(
      localStorage,
      "setItem",
      (key: string, data: string) => {
        usedKey = key;
        usedData = data;
      }
    );

    updateSettings(newSettings);

    expect(usedKey).to.be.eq(SETTINGS_STORAGE_KEY);
    expect(storageSpy).to.have.been.called();
    expect(JSON.parse(usedData)).to.have.deep.keys(newSettings);
  });

  it("updates stored settings on update", () => {
    const languages = ["en", "ja", "kr", "fr"];
    const translationFilename = "some{name}.csv";
    const translationTemplate = "{lang}.{key}:{value}";

    updateSettings({
      languages,
      translationFilename,
      translationTemplate,
    });

    expect(settings.languages).to.include.members(languages);
    expect(settings.translationFilename).to.be.eq(translationFilename);
    expect(settings.translationTemplate).to.be.eq(translationTemplate);
  });

  it("loads from global store on refresh", () => {
    const stored = {
      languages: ["ru", "ua"],
      translationFilename: "fname.xls",
      translationTemplate: "{name}:{key}:{value}",
    };

    let calledKey = "";

    const storageSpy = chai.spy.on(localStorage, "getItem", (key: string) => {
      calledKey = key;
      return JSON.stringify(stored);
    });

    refreshSettings();
    expect(storageSpy).to.have.been.called.with(SETTINGS_STORAGE_KEY);
    expect(calledKey).to.be.eq(SETTINGS_STORAGE_KEY);
    expect(settings).to.deep.contain(stored);
  });
});
