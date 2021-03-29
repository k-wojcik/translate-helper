import { reactive } from "vue";

export const permissions = reactive({
  new: [],
  existing: [],
} as { new: string[]; existing: string[] });
