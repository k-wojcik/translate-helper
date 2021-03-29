/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import chai, { expect } from "chai";
import spies from "chai-spies";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import Translations from "@/views/Translations.vue";
chai.use(spies);

describe("Translations.vue", () => {
  type TT = { [id: string]: string };
  let state = {
    translations: [] as TT[],
    settings: {
      languages: [] as string[],
      translationTemplate: "",
      translationFilename: "",
    },
    addTranslation: () => {
      throw new TypeError();
    },
  };
  let wrapper: VueWrapper<any> | null = null;

  beforeEach(() => {
    state = {
      translations: [],
      settings: {
        languages: [],
        translationTemplate: "",
        translationFilename: "",
      },
      addTranslation: () => {
        throw new TypeError();
      },
    };

    wrapper = shallowMount(Translations, {
      global: {
        provide: {
          state,
        },
      },
    });
  });

  it("passes list and languages from store", () => {
    const child = wrapper!.getComponent({ name: "TranslationList" });
    expect(child.props()).to.be.eql({
      translations: state.translations,
      languages: state.settings.languages,
    });
  });

  it("add new translation on button click", async () => {
    state.settings.languages = ["en", "ja"];
    const spy = chai.spy.on(state, "addTranslation", (t: TT) => {
      state.translations.push(t);
    });

    const button = wrapper!.find("button.add");
    await button.trigger("click");
    const expected = { key: "", en: "", ja: "" };
    expect(spy).to.have.been.called.with(expected);

    const child = wrapper!.getComponent({ name: "TranslationList" });
    expect(child.props().translations).to.be.eql([expected]);
  });
});
