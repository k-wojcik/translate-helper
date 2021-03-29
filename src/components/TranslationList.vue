<template>
  <table class="translation-list">
    <tr>
      <th>Key</th>
      <th v-for="lang in languages" :key="lang">
        {{ lang }}
      </th>
    </tr>
    <translation-row
      v-for="translation in translationList"
      :key="translation.key"
      :item="translation"
      :languages="languages"
    >
    </translation-row>
  </table>
</template>

<script lang="ts">
import { TT } from "@/state/translations";
import { defineComponent } from "vue";
import TranslationRow from "./TranslationRow.vue";

export default defineComponent({
  props: {
    translations: {
      type: Object,
      required: true,
    },
    languages: {
      type: Array,
      required: true,
    },
  },
  components: {
    TranslationRow,
  },
  data() {
    return {
      sortBy: "+key",
    };
  },

  computed: {
    translationList(): TT[] {
      const selector = this.sortBy.slice(1);
      const reverse = this.sortBy[0] === "-";
      return this.translations
        .slice()
        .sort((a: TT, b: TT) =>
          reverse ? a[selector] > b[selector] : a[selector] < b[selector]
        );
    },
  },
});
</script>

<style lang="scss" scoped>
.translation-list {
  display: block;
  td,
  th {
    padding: 5px;
  }
  th {
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>
