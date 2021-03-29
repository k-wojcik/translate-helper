<template>
  <div>
    <h1>Translations</h1>
    <button @click="addEmpty" class="add">
      <fa-icon icon="plus-square" class="fas icon"></fa-icon>
    </button>
    <button @click="makeExport" class="export">
      <fa-icon icon="cloud-download-alt" class="fas icon"></fa-icon>
    </button>
    <button @click="clear" class="reset">
      <fa-icon icon="window-close" class="fas icon"></fa-icon>
    </button>
    <div><span v-if="saving"></span></div>
    <div class="list">
      <translation-list
        :translations="translations"
        :languages="languages"
      ></translation-list>
    </div>
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
      saving: state.translations.saving,
    };
  },
  components: {
    TranslationList,
  },
});
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  justify-content: center;
}

button {
  border: 0;
  background: none;
  padding: 0;
  margin: 10px;

  outline: 0;

  .icon {
    width: 48px;
    height: 48px;
  }

  &.add .icon {
    color: blue;
  }

  &.reset .icon {
    color: red;
  }

  &.export .icon {
    color: green;
  }
}
</style>
