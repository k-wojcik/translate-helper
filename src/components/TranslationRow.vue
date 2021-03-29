<template>
  <tr :class="{ conflict: hasMultiple(data.key) }">
    <td><input type="text" v-model.lazy="data.key" @change="updateValue" /></td>
    <td v-for="lang in langs" :key="lang">
      <input type="text" v-model.lazy="data[lang]" @change="updateValue" />
    </td>
    <td>
      <button @click="deleteRow(data.key)">X</button>
    </td>
  </tr>
</template>

<script lang="ts">
import State from "@/state";
import { defineComponent, inject } from "vue";

export default defineComponent({
  setup(props) {
    const state = inject("state") as State;
    const updateValue = async () => {
      await state.translations.saveAsync();
    };
    const deleteRow = (key: string) => {
      state.translations.deleteRow(key);
    };
    const hasMultiple = (key: string) => {
      return state.translations.values.filter((x) => x.key === key).length > 1;
    };
    return {
      data: props.item,
      langs: props.languages,
      updateValue,
      deleteRow,
      hasMultiple,
    };
  },
  props: {
    item: {
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
.conflict {
  border: 2px solid red;
}
input {
  font-size: 18px;
  padding: 3px;
}
</style>
