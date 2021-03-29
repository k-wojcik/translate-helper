import { reactive } from "vue";
import { SETTINGS_STORAGE_KEY, localStorage } from "./store";

export interface Settings {
  translationTemplate: string;
  translationFilename: string;
  languages: string[];
}

export const settings = reactive({
  translationTemplate: "{key}\t{value}\t{lang}",
  translationFilename: "{name}.csv",
  languages: ["EN", "PL"],
});

export const updateSettings = (newValues: Settings): void => {
  if (
    ![
      newValues.translationTemplate,
      newValues.translationFilename,
      newValues.languages,
    ].some((x) => !!x)
  ) {
    return;
  }
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newValues));
  settings.translationTemplate = newValues.translationTemplate;
  settings.translationFilename = newValues.translationFilename;
  settings.languages = newValues.languages;
};

export const refreshSettings = (): void => {
  const data = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (data) {
    const loaded = JSON.parse(data) as Settings;
    settings.translationTemplate = loaded.translationTemplate;
    settings.translationFilename = loaded.translationFilename;
    settings.languages = loaded.languages;
  }
};
