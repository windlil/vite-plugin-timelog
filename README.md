# vite-plugin-timelog

- In the vite dev, automatic reminders of elapsed encoding time in the console.

- console the composition of the current project.

### 📦Install

```
npm i vite-plugin-timelog -D

yarn i vite-plugin-timelog -D

#recommend
pnpm i vite-plugin-timelog -D
```



### 🤔How to use

```javascript
import { defineConfig } from 'vite'
import { VitePluginTimeLog } from 'vite-plugin-timelog'

export default defineConfig({
  plugins: [
    VitePluginTimeLog({
      interval: 1h,
    })
  ]
})
```

> TIPS:  This plugin will only take effect in dev environment.



### 🔧Options

- `interval` Interval time, if the value you pass in is a number, the default unit is seconds, If you are passing in a string, follow the following format:`1s`  `1m`  `1h` .

  ❗Such use is not allowed: `1h5s `You can only pass one unit in a string.

- `spaced` Whether you need to display content more compact.

- `barstyle` You can customize the shape.

```typescript
export interface Options {
  interval: string | number
  spaced?: boolean
  barstyle?: string
}
```

```javascript
//example

export default defineConfig({
  plugins: [
    VitePluginTimeLog({
      interval: 5,
      spaced: true,
      barstyle: "⭐"
    })
  ]
})
```

