<template>
  <div>
    <div>
      <label for="template">Template:</label>
      <input type="text" name="template" v-model="template" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    //
  },
  data() {
    return {
      template:''
    }
  }
})
</script>

