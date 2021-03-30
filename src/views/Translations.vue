<template>
  <div>
    <h1>Translations</h1>
    <button @click="addEmpty" class="add">
      <fa-icon icon="plus-square" class="fas icon"></fa-icon>
    </button>
    <button @click="makeExport" class="export">
      <fa-icon icon="cloud-download-alt" class="fas icon"></fa-icon>
      <div v-if="nameFieldShown">
        <input type="text" v-model="nameField" placeholder="Export name" />
        <button @click="onSetNameClick">Download</button>
      </div>
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
    <a
      id="download-file"
      ref="fileDownload"
      href=""
      download=""
      target="_blank"
    ></a>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, nextTick, Ref, ref } from "vue";
import TranslationList from "@/components/TranslationList.vue";
import State from "@/state";

export default defineComponent({
  setup() {
    type TT = { [id: string]: string; key: string };
    const state = inject("state") as State;
    const fileDownload: Ref<null | HTMLElement> = ref(null);
    const addEmpty = () => {
      const entry = { key: "" } as TT;
      state.settings.languages.forEach((lang) => (entry[lang] = ""));
      state.translations.update(entry);
    };

    const nameField = ref("");
    const nameFieldShown = ref(false);

    const showNameField = async (): Promise<void> => {
      if (nameField.value) {
        nameField.value = "";
      }
      nameFieldShown.value = true;
      await nextTick();
    };

    const waiter = {
      resolve: undefined as undefined | (() => void),
      reject: undefined as undefined | (() => void),
    };

    const useName = function (): void {
      if (waiter.resolve) {
        waiter.resolve();
      }
    };

    const format = function (str: string, obj: { [id: string]: string }) {
      let tmp = str;
      for (const [key, value] of Object.entries(obj)) {
        tmp = tmp.replaceAll("{" + key + "}", value);
      }
      return tmp;
    };

    const getFilename = async (): Promise<string> => {
      await showNameField();
      await new Promise<void>((resolve, reject) => {
        waiter.resolve = () => {
          resolve();
        };
        waiter.reject = () => {
          reject();
        };
      });
      return format(state.settings.translationFilename, {
        name: nameField.value,
      });
    };

    const enumTranslations = () => {
      return state.translations.values
        .flatMap((val) => {
          return state.settings.languages.map((lang) => ({
            key: val.key,
            lang: lang,
            value: val[lang] || "",
          }));
        })
        .filter((x) => !!x.value && !!x.key && !!x.lang);
    };

    const getDataEncoded = function (): string {
      return encodeURIComponent(
        state.settings.translationTemplate.prefix +
          enumTranslations()
            .map((x) => format(state.settings.translationTemplate.each, x))
            .join("") +
          state.settings.translationTemplate.suffix
      );
    };

    const makeExport = async (): Promise<void> => {
      await state.translations.connect();
      const filename = await getFilename();
      const href = `data:text/plain;charset=utf-8,${getDataEncoded()}`;
      fileDownload.value?.setAttribute("href", href);
      fileDownload.value?.setAttribute("download", filename);
      await fileDownload.value?.click();
      await nextTick();
      fileDownload.value?.setAttribute("href", "");
      fileDownload.value?.setAttribute("download", "");
    };

    const clear = () => {
      state.translations.values.splice(0, state.translations.values.length - 1);
    };

    return {
      translations: state.translations.values,
      languages: state.settings.languages,
      addEmpty,
      saving: state.translations.saving,
      makeExport,
      fileDownload,
      nameFieldShown,
      onSetNameClick: useName,
      nameField,
      clear,
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

a#download-file {
  display: none !important;
}
</style>
