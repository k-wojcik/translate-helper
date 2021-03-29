<template>
  <div>
    <h1>Translations</h1>
    <button @click="addEmpty" class="add">Add translation</button>
    <button @click="makeExport" class="export">Export</button>
    <button @click="clear" class="reset">Clear</button>
    <translation-list
      :translations="translations"
      :languages="languages"
    ></translation-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import TranslationList from "@/components/TranslationList.vue";
import State from "@/state";

export default defineComponent({
  setup() {
    type TT = { [id: string]: string; key: string };
    const state = inject("state") as State;
    const addEmpty = () => {
      const entry = { key: "" } as TT;
      state.settings.languages.forEach((lang) => (entry[lang] = ""));
      state.translations.update(entry);
    };

    return {
      translations: state.translations.values,
      languages: state.settings.languages,
      addEmpty,
    };
  },
  components: {
    TranslationList,
  },
});
</script>
