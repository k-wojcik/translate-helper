<template>
  <div class="about">
    <h1>Translate helper tool</h1>
    Local-only web tool to help keeping track of and updating translations
    scratchbook as you work.
    <h2>Setup</h2>
    <p>In settings, set up the following:</p>
    <ul>
      <li>
        <strong>Filename</strong> - filename template you'll get when exporting
        translations. Use
        <pre>{name}</pre>
        as placeholder for name you'll type when exporting.
      </li>
      <li>
        <strong>Languages</strong> - list of languages for translations.
        Languages will be used as keys for translations provided
      </li>
      <li>
        <strong>Translation prefix</strong> - constant that will be put in
        translation file before all translations. Useful for making translation
        SQLs etc.
      </li>
      <li>
        <strong>Translation suffix</strong> - constant that will be put in
        translation file after all translations. Useful for making translation
        SQLs etc.
      </li>
      <li>
        <strong>Translation entry</strong> - single entry, one per each language
        of each translation. Can be templated with
        <pre>{lang}</pre>
        for language,
        <pre>{key}</pre>
        for translation key and
        <pre>{value}</pre>
        for translated text.
      </li>
    </ul>
    <h2>Usage</h2>
    <p>
      Plus button adds new translations row, if there's no empty row visible.
      Empty row should add automatically at the end as you add translations.
    </p>
    <p>
      Cloud button prepares generating translations export - after providing
      translation name (used as template in filename defined in settings), click
      Download to get translation file downloaded.
    </p>
    <p>
      X button clears translation list.
      <strong>There is no confirmation!</strong>
    </p>
    <p>
      Translations are automatically being saves as you type, in your browser's
      local storage, if you want to come back to them later. Settings need to be
      saved manually.
    </p>
    <h2>Privacy</h2>
    <p>
      All data are stored locally, using browser's local storage for page. No
      data is being sent or uploaded anywhere, there's no tracking on the site.
      All code is available open source
      <a href="https://github.com/asmnh/translate-helper" target="_blank">on Github</a>,
      including build process.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.about {
  text-align: left;
  max-width: 60em;
  margin: 0 auto;
}

pre {
  display: inline-block;
  background-color: #ccc;
  padding: 2px 5px;
  margin: 0;
}
</style>
