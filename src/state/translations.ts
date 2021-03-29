import { reactive } from "vue";

export interface Translation {
  key: string;
  [id: string]: string;
}

export const translations = reactive([] as Translation[]);

export const addTranslation = (t: {
  key: string;
  [id: string]: string;
}): void => {
  translations.push(t);
};

export const saveTranslations = (): void => {
  throw new Error();
};
