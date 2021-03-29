import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import State from "@/state";

const state = new State();
createApp(App).use(router).provide("state", state).mount("#app");
