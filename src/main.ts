import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import State from "@/state";
import { FontAwesomeIcon } from "./plugins/FontAwesome";

const state = new State();
createApp(App)
  .use(router)
  .component("fa-icon", FontAwesomeIcon)
  .provide("state", state)
  .mount("#app");
