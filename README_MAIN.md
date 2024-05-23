## 开发环境

```sh
yarn dev
```

## 打包

```sh
yarn build
```

## 开发规范

### 1-1. vue 组件文件、文件夹命名

- 采用小写方式， 以中划线分隔
- 请使用完整单词，不要使用缩写

```sh
正例：todo-list
反例：todo_List | todoList
```

### 1-2. ts\js\css 文件、文件夹命名

- 小驼峰方式
- 请使用完整单词，不要使用缩写

```sh
  正例：getUserInfo.js，head.css，
  反例：getuserinfo.js
```

### 1-3. 变量、function 等命名

- 变量使用小驼峰命名
- function 使用小驼峰名称
- class 使用大驼峰命名
- 常量使用大写字母和下划线命名

### 1-3. 标点符号

- js 代码中使用单引号
- vue template、标签中使用双引号
- js 代码结尾必须有分号

### 2-1. vue 组件

- 顺序按照 template、script、style
- 使用组合式 api 开发，不再使用 options api
- 统一在 script 标签中使用 setup
- style 请使用 module，lang="scss"

```sh
<template>
  <div>
    <h1>Home</h1>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

</style>

```

### 2-2. template 中使用组件

- 采用小写方式， 以中划线分隔

正例:

```sh
<template>
  <router-link></router-link>
</template>
```

反例:

```sh
<template>
  <RouterLink></RouterLink>
</template>
```

### 2-3. UI 组件和业务组件

- 纯 UI 组件请放置于 components 文件夹下，UI 组件不包括业务逻辑、同时保证依赖干净
- 模块组件或者业务组件请放置于 views 文件夹下

### 2-4. 定义 Store

- 使用组合式 api 方式定义，不使用 option api

正例:

```sh
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment }
});
```

反例:

```sh
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

### 2-5. 哪些情况应该使用 stroe 管理数据

- 全局状态，比如用户信息、token 等
- 跨组件共享数据
- 需要多层级传递情况
- 需要缓存数据，例如切换页面需要保存之前数据
- 逻辑处理比较复杂的情况

### 2-6. 逻辑处理代码应该放到哪里

- 基于 2-5 使用 store 的情况，逻辑代码放到 store 中
- 如果组件未使用 store 管理状态，逻辑处理简单，则直接在组件中处理

### 3-1. 请求方法

- 请求统一 request 方法，src/common/request
- 请求文件统一位于 api 文件夹下，文件命名以模块名称+Api.js，例如：`userApi.js`
- 请求方法名命名，功能+Api，例如：`getUserInfoApi`
- request 方法支持 loading 如下

```sh
// 请求loading
import { request } from '@/common/request';

request.get('/user/info', {id: 'xxx'}, {
  // loadingOptions参数和element plus loading一致 可参考element文档
  loadingOptions: {
    target: document.body // 或者一个局部dom节点
  }
});

// 取消请求
import { axiosCancel } from '@/common/request';

axiosCancel.cancelPending('/user/info', 'GET', {id: 'xxx'});

```

### 3-2. 请求注意事项

- 请求头中添加 token，目前代码 token 存在 store 中，request 内部直接取 store 中的 token 值，这里可根据项目做调整
- request 中以设置请求和响应拦截操作，根据项目需求增加拦截操作即可
- src/common/request 提供基本请求功能，如需 hooks 方式调用，自行封装 useRequest，或者使用开源库例如：vue-request

### 4-1. CSS 变量定义

- 使用 css var 变量定义方式。和 element plus 保持一致使用的 var 来定义，更方便样式覆盖以及切换主题功能的实现。

### 4-2. element-icon 使用

- 前缀 i-ep + icon-name，组件中直接使用，无需 import 导入 icon

```sh
<i-ep-add-location />
<i-ep-aim width="30px" height="30px" />
<el-icon size="20">
  <i-ep-apple />
</el-icon>
```

### 5-1. 环境变量

- 环境变量文件位于根目录下，文件名为.env.development/.env.production/.env.test 等
- 环境变量命名规则以'VITE\_'为前缀，例如：VITE_API_URL="xxx"
- 环境变量使用方式，例如：import.meta.env.VITE_API_URL，以提供通用 hooks 详见：src/hooks/useEnv.ts
