# vue3-i18n

![](https://img.shields.io/npm/v/@arshown/vue3-i18n)

一個簡易並適用於 vue3 的語系套件

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

搭配 vuex 將當前語言同步為 store 的一部分

```javascript
// main.js
import { sync } from "@arshown/vue3-i18n";
import store from "./vuex/store"/* store 實例 */; 
import i18n from "./i18n"/* i18n 實例 */;

sync(store, i18n);
// 可自定義狀態名稱，預設名稱為 'i18n'
// sync(store, i18n, { name: 'othername' } )
```

```javascript
//取得當前使用語系值
store.state.i18n.locale;
```

## Usage
```html
<template>
  <div>
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

    i18n.addChangedListener((currentState, prevState) => {
      /* 監聽語系切換 */
      console.log(currentState);
    });

    return {
     t: i18n.transfer,
     change: i18n.setLocale,
    }
  }
}
</script>
```

## API

#### i18n.getLocale
`():string`
取得當前使用語系

#### i18n.setLocale
`(lang:string):void`
變更當前使用語系

#### i18n.addMessages
`(lang:string, messages:Object):void`
動態新增語系物件

#### i18n.addChangedListener
`(fn:Function):void`
監聽語系變更行為

#### i18n.removeChangedListener
`(fn:Function):void`
移除監聽

#### i18n.transfer
`(key:string, ?params:Object)`
語系轉換

```javascript
// messages: { lang: { welcome: "Hello, {name}!" } }
i18n.transfer("welcome", { name: "Guest" });
// Hello, Guest!
```
