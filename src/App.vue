<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/settings">Settings</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import State from "@/state";
import { defineComponent, inject } from "vue";

export default defineComponent({
  setup() {
    const state = inject("state") as State;
    return { state };
  },
  mounted() {
    this.backgroundDownloadTranslations();
  },
  methods: {
    async backgroundDownloadTranslations() {
      try {
        if (this.state.settings.translationsSourceUri) {
          await this.state.translations.existing.download(
            this.state.settings.translationsSourceUri
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
