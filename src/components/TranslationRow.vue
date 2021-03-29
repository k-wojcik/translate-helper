<template>
  <tr></tr>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
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
