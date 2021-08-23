# vue3-i18n

一個簡易並適用於 vue3 的語系套件

[![](https://img.shields.io/npm/v/@arshown/vue3-i18n)](https://www.npmjs.com/package/@arshown/vue3-i18n)


## Install

```shell
> npm install @arshown/vue3-i18n
# or
> yarn add @arshown/vue3-i18n
```

## Started

```javascript
// main.js
import { createApp } from "vue";
import { createI18n } from "@arshown/vue3-i18n";
import App from "./App";

const i18n = createI18n({
  initLocale: "zh-tw"/* 預設使用語系 */,
  fallbackLocale: "en"/* 當沒有找到文字時使用的備用語系 */,
  messages: {
    "zh-tw": {
      welcome: "您好，{name}!"  
    },
    en: {
      welcome: "Hello, {name}!",
      "fallback message": "yo"
    }
  },
});

const app = createApp(App);
app.use(i18n);
app.mount("#app");
```

## Usage
```html
<template>
  <div>
    當前語系：{{ locale }}
    {{ t("welcome", { name: "Guest" }) }}
    <!-- print: 您好，Guest! --> 
    {{ t("fallback message") }}
    <!-- 找備用語系，print: yo --> 
    {{ t("undefined text") }}
    <!-- 都沒有就顯示鍵值，print: undefined text --> 
    <button @click="change('en')">切換語系</button>
  </div>
</tamplate>
```

```javascript
<script>
import { useI18n } from "@arshown/vue3-i18n";

export default {
  setup() {
    const i18n = useI18n();

    return {
     locale: i18n.locale,
     t: i18n.t,
     change: i18n.setLocale,
    }
  }
}
</script>
```

## API

#### i18n.locale

當前使用語系


#### i18n.setLocale

`(lang:string):void`

變更當前使用語系


#### i18n.addMessages

`(lang:string, messages:Object):void`

動態新增語系物件


#### i18n.t

`(key:string, ?params:Object)`

文字轉換

```javascript
// messages: { lang: { welcome: "Hello, {name}!" } }
i18n.t("welcome", { name: "Guest" });
// Hello, Guest!
```
