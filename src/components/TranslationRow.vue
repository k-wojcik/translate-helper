<template>
  <tr :class="{ conflict: status.duplicate || status.conflict }">
    <td>
      <input
        type="text"
        v-model.lazy="data.key"
        @change="updateValue"
        class="key-field"
      />
    </td>
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
import { defineComponent, inject, reactive } from "vue";

export default defineComponent({
  setup(props) {
    const state = inject("state") as State;
    const hasMultiple = (key: string) => {
      return state.translations.values.filter((x) => x.key === key).length > 1;
    };
    const status = reactive({
      duplicate: hasMultiple(props.item.key),
      conflict: !state.translations.existing.allowsKey(props.item.key),
    });
    const updateValue = async () => {
      status.conflict = !state.translations.existing.allowsKey(props.item.key);
      status.duplicate = hasMultiple(props.item.key);
      await state.translations.saveAsync();
    };
    const deleteRow = async (key: string) => {
      state.translations.deleteRow(key);
      state.translations.save();
    };
    return {
      data: props.item,
      langs: props.languages,
      updateValue,
      deleteRow,
      hasMultiple,
      status,
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
  .key-field {
    background: #ffcccb;
  }
}
input {
  font-size: 18px;
  padding: 3px;
}
</style>
