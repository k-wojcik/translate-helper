import chai, { expect } from "chai";
import spies from "chai-spies";
import Settings, { SettingsData } from "@/state/settings";
import { SETTINGS_STORAGE_KEY } from "@/state/store";

chai.use(spies);

describe("state/settings.ts", () => {
  it("saves settings to local store on update", () => {
    const localStorage = {
      getItem: () => null,
      setItem: () => {
        /* */
      },
    };

    const newSettings = {
      languages: ["en", "ja", "kr", "fr"],
      translationFilename: "some{name}.csv",
      translationTemplate: {
        prefix: "",
        suffix: "",
        each: "{lang}.{key}:{value}",
      },
    } as SettingsData;

    const storageSpy = chai.spy.on(localStorage, "setItem");

    const subject = new Settings(localStorage);

    subject.update(newSettings);

    expect(storageSpy).to.have.been.called.with(
      SETTINGS_STORAGE_KEY,
      JSON.stringify(newSettings)
    );
  });

  it("updates stored settings on update", () => {
    const languages = ["en", "ja", "kr", "fr"];
    const translationFilename = "some{name}.csv";
    const translationTemplate = {
      prefix: "",
      suffix: "",
      each: "{lang}.{key}:{value}",
    };

    const localStorage = {
      getItem: () => null,
      setItem: () => {
        /* */
      },
    };
    const settings = new Settings(localStorage);

    settings.update({
      languages,
      translationFilename,
      translationTemplate,
    });

    expect(settings.languages).to.include.members(languages);
    expect(settings.translationFilename).to.be.eq(translationFilename);
    expect(settings.translationTemplate).to.be.eql(translationTemplate);
  });

  it("loads from global store on refresh", () => {
    const stored = {
      languages: ["ru", "ua"],
      translationFilename: "fname.xls",
      translationTemplate: "{name}:{key}:{value}",
    };

    const localStorage = {
      getItem: () => null,
      setItem: () => {
        /* */
      },
    };

    const storageSpy = chai.spy.on(localStorage, "getItem", () => {
      return JSON.stringify(stored);
    });

    const settings = new Settings(localStorage);

    expect(storageSpy).to.have.been.called.with(SETTINGS_STORAGE_KEY);
    expect(settings).to.deep.contain(stored);
  });
});
