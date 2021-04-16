import { expect } from "chai";
import TranslationTree from "@/state/translation-tree";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("state/translation-tree.ts", () => {
  const testData = {
    element: {
      value1: "text",
      value2: "more text",
      value3: "even more",
      inner: {
        element: "thing",
      },
    },
    other: {
      value: "element",
    },
    flat: "text",
  };

  it("provides valid flat key list from translations dictionary", () => {
    const subject = new TranslationTree(testData);

    const result = subject.keys;

    const expected = [
      "element.value1",
      "element.value2",
      "element.value3",
      "element.inner.element",
      "other.value",
      "flat",
    ];

    expect(result).to.include.members(expected);
    expect(result.length).to.be.eq(expected.length);
  });

  it("disallows keys in middle of the tree", () => {
    const subject = new TranslationTree(testData);

    expect(subject.allowsKey("element")).to.be.false;
    expect(subject.allowsKey("element.inner")).to.be.false;
  });

  it("allows keys that are overwriting existing nodes", () => {
    const subject = new TranslationTree(testData);

    expect(subject.allowsKey("element.value1")).to.be.true;
    expect(subject.allowsKey("element.inner.element")).to.be.true;
    expect(subject.allowsKey("flat")).to.be.true;
  });

  it("allows valid nonexistent keys to be added", () => {
    const subject = new TranslationTree(testData);

    expect(subject.allowsKey("element.newvalue")).to.be.true;
    expect(subject.allowsKey("other.element.value")).to.be.true;
    expect(subject.allowsKey("secondflat")).to.be.true;
    expect(subject.allowsKey("element.inner.path.to.very.deep.value")).to.be
      .true;
  });

  it("loads translations from url", async () => {
    const translationUri = "https://some.uri/translations";
    const mock = new MockAdapter(axios);
    mock.onGet(translationUri).reply(200, testData);

    const subject = new TranslationTree({});
    await subject.download(translationUri);

    const expected = [
      "element.value1",
      "element.value2",
      "element.value3",
      "element.inner.element",
      "other.value",
      "flat",
    ];

    expect(subject.keys).to.include.members(expected);
    expect(subject.keys.length).to.be.eq(expected.length);
  });
});
