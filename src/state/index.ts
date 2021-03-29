import { readonly } from "vue";
import { settings, refreshSettings, updateSettings } from "./settings";
import { translations, saveTranslations, addTranslation } from "./translations";
import { permissions } from "./permissions";

const state = {
  settings: readonly(settings),
  updateSettings,
  refreshSettings,

  translations: readonly(translations),
  saveTranslations,
  addTranslation,

  permissions: readonly(permissions),
};

export type StateType = typeof state;
export default state;
