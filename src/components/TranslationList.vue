<template>
  <table class="translation-list">
    <tr>
      <th @click="setSortBy('key')">Key</th>
      <th v-for="lang in langs" :key="lang" @click="setSortBy(lang)">
        {{ lang }}
      </th>
      <th></th>
    </tr>
    <translation-row
      v-for="translation in sortedList"
      :key="translation.key"
      :item="translation"
      :languages="langs"
    >
    </translation-row>
  </table>
</template>

<script lang="ts">
import { TT } from "@/state/translations";
import { computed, defineComponent, ref } from "vue";
import TranslationRow from "./TranslationRow.vue";

export default defineComponent({
  setup(props) {
    const sortBy = ref("+key");
    const sortedList = computed(() => {
      const sorter = sortBy.value;
      const selector = sorter.slice(1);
      const reverse = sorter.slice() === "-";
      return props.translations
        .slice()
        .sort((a: TT, b: TT) =>
          reverse ? a[selector] > b[selector] : a[selector] < b[selector]
        );
    });

    return {
      items: props.translations,
      langs: props.languages,
      sortedList,
    };
  },
  components: {
    TranslationRow,
  },
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
