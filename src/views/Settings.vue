<template>
  <h1>Settings</h1>
  <div class="settings-fields">
    <h2>Translation export template</h2>
    <div>
      <label for="template">Template</label>
      <textarea
        name="template"
        v-model="templateString"
        placeholder="Translation template. Use {key} {lang} {value} for respective data. Each translation will be emitted once."
      ></textarea>
    </div>
    <div>
      <label for="prefix">Prefix</label>
      <textarea
        name="prefix"
        v-model="prefix"
        placeholder="Optional prefix for template file content - appended before all languages."
      ></textarea>
    </div>
    <div>
      <label for="suffix">Suffix</label>
      <textarea
        name="suffix"
        v-model="suffix"
        placeholder="Optional suffix for template file content - appended after all languages."
      ></textarea>
    </div>
    <div>
      <label for="filenameTemplate">Filename</label>
      <input
        type="text"
        v-model="filenameTemplate"
        placeholder="Filename template, use {name} for namefield placeholder"
      />
    </div>
    <h2>Language support</h2>
    <div>
      <label for="languages"
        >Languages <button @click="addLanguage">Add</button></label
      >
      <div v-for="lang in languages" :key="lang">
        <input type="text" v-model="lang.name" />
        <button @click="removeLang(lang.name)">X</button>
      </div>
    </div>
    <div>
      <button @click="save">Save</button>
      <button @click="reload">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import State from "@/state";
import { defineComponent, inject } from "vue";

export default defineComponent({
  setup() {
    const state = inject("state") as State;
    return { settings: state.settings };
  },
  data() {
    return {
      templateString: "",
      prefix: "",
      suffix: "",
      filenameTemplate: "",
      languages: [] as { name: string }[],
    };
  },
  methods: {
    addLanguage() {
      if (this.languages.some((l) => !l)) return;
      this.languages.push({ name: "" });
    },
    removeLang(lang: string) {
      const found = this.languages.findIndex((x) => x.name == lang);
      if (found !== -1) {
        this.languages.splice(found, 1);
      }
    },
    save() {
      this.settings.update({
        translationTemplate: {
          prefix: this.prefix,
          suffix: this.suffix,
          each: this.templateString,
        },
        translationFilename: this.filenameTemplate,
        languages: this.languages.map((x) => x.name),
      });
    },
    reload() {
      this.templateString = this.settings.translationTemplate.each;
      this.prefix = this.settings.translationTemplate.prefix;
      this.suffix = this.settings.translationTemplate.suffix;
      this.filenameTemplate = this.settings.translationFilename;
      this.languages = this.settings.languages.map((x) => ({ name: x }));
    },
  },
  mounted() {
    this.reload();
  },
});
</script>

<style lang="scss" scoped>
div.settings-fields {
  min-width: 300px;
  max-width: 60%;
  margin: 0 auto;
  text-align: left;
  label {
    display: block;
    text-align: left;
    width: 100%;
  }
  textarea,
  input {
    width: 50%;
    margin-left: 2em;
    margin-right: 2em;
    font-size: 1.2em;
  }
  textarea {
    height: 8em;
  }
}
</style>
