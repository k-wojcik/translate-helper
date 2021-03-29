import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import TranslationList from "@/components/TranslationList.vue";
import { reactive } from "vue";

describe("TranslationList.vue", () => {
  it("creates row for each translation with languages passed", () => {
    const translations = [
      {
        key: "zzztranslation.key",
        en: "keyval",
        pl: "wartość klucza",
      },
      {
        key: "kkkport.key",
        en: "Blah",
        pl: "Lablah",
      },
      {
        key: "aaaother.key",
        en: "otherval",
        pl: "keyval",
      },
    ];
    const languages = ["en", "pl"];
    const wrapper = shallowMount(TranslationList, {
      props: { translations, languages: languages },
    });
    const children = wrapper.findAllComponents({ name: "TranslationRow" });
    const c1 = children[0];
    const c2 = children[1];
    expect(c1.exists()).to.be.true;
    expect(c1.props()).to.be.eql({ item: translations[0], languages });
    expect(c2.exists()).to.be.true;
    expect(c2.props()).to.be.eql({ item: translations[1], languages });
  });

  it("creates row headers for key and each translation", () => {
    const languages = ["en", "pl"];
    const wrapper = shallowMount(TranslationList, {
      props: { translations: [], languages: languages },
    });
    const children = wrapper.findAll("th").map((val) => val.text());
    expect(children).to.include("en", "pl");
  });

  it("adds empty value when store changes", async () => {
    const translations = reactive([
      {
        key: "zzztranslation.key",
        en: "keyval",
        pl: "wartość klucza",
      },
      {
        key: "kkkport.key",
        en: "Blah",
        pl: "Lablah",
      },
      {
        key: "aaaother.key",
        en: "otherval",
        pl: "keyval",
      },
    ]);
    const languages = ["en", "pl"];
    const wrapper = shallowMount(TranslationList, {
      props: { translations, languages: languages },
    });

    let children = wrapper.findAllComponents({ name: "TranslationRow" });
    expect(children.map((f) => f.props().item.key)).to.not.include("");

    translations.push({
      key: "",
      en: "",
      pl: "",
    });

    await wrapper.setProps({ translations });

    children = wrapper.findAllComponents({ name: "TranslationRow" });
    expect(children.map((f) => f.props().item.key)).to.include("");
  });
});
