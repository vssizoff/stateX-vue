<h1 align="center">stateX-vue</h1>

> Full docs [here](https://github.com/vssizoff/stateX-vue#readme)
> 
## Table of Contents
> 1. [Installation](#installation)
> 2. [Init store](#init-store)
> 3. [Getters](#getters)
> 4. [Mutations](#mutations)
> 5. [Methods](#methods)
> 6. [Computed](#computed)
> 7. [Watch](#watch)
> 8. [Modules](#modules)
> 9. [Config](#config)
## Installation
* Init vue project
* Type this in console
```
npm i statex-vue
```
## Init store
### src/store/index.js
```javascript
import {createStore} from "statex-vue";

export default createStore({
    data() {
        return {
            test: 0
        }
    }
});
```
or
```javascript
export default createStore({
    data: {
        test: 0
    }
});
```
### src/main.js
```javascript
import { createApp } from 'vue';
import rootElem from './App.vue';
import store from "@/store";

let app = createApp(rootElem);

app.use(store);

app.mount('#app');
```
### src/App.vue
```vue
<template>
{{store.global.test}}
</template>
```
## Getters
### src/store/index.js
```javascript
export default createStore({
    data: {
        test: 0
    },
    getters: {
        getTest() {
            return this.global.test.value;
        }
    }
});
```
### src/App.vue
```vue
<template>
  {{store.global.test}}
  {{store.global.getTest()}}
</template>
```
## Mutations
### src/store/index.js
```javascript
export default createStore({
    data: {
        test: 0
    },
    mutations: {
        incrementTest() {
            this.global.test.value++;
        }
    }
});
```
### src/App.vue
```vue
<template>
  {{store.global.test}}
  <button @click="store.global.incrementTest()">increment</button>
</template>
```
## Methods
### src/store/index.js
```javascript
export default createStore({
    data: {
        test: 0
    },
    methods: {
        incrementTest() {
            this.global.test.value++;
            console.log(this.global.test.value);
            return this.global.test.value;
        }
    }
});
```
### src/App.vue
```vue
<template>
  {{store.global.test}}
  <button @click="store.global.incrementTest()">increment</button>
</template>
```
### result
## Computed
### src/store/index.js
```javascript
export default createStore({
    data: {
        test: 8
    },
    computed: {
        test0() {
            return this.global.test.value * this.global.test.value;
        }
    }
});
```
### src/App.vue
```vue
<template>
  {{store.global.test}}
  {{store.global.test0}}
</template>
```
## Watch
### src/store/index.js
```javascript
export default createStore({
    data: {
        test: 0
    },
    watch: {
        test(newValue) {
            console.log("Variable changed", newValue);
        }
    }
});
```
### src/App.vue
```vue
<template>
  {{store.global.test}}
  <button @click="store.global.test++">Change</button>
</template>
```
## Modules
### src/store/index.js
```javascript
import array from "@/store/array";

export default createStore({
    modules: {
        array
    }
});
```
### src/store/array.js
```javascript
import { createStoreModule } from "statex-vue";

export default createStoreModule({
    data: {
        array: ["test", 0, 8, "abcd"]
    },
    getters: {
        getArray() {
            return this.array.array.value;
        }
    },
    mutations: {
        addElem(elem: any) {
            this.array.array.value.push(elem);
        }
    },
    computed: {
        double() {
            return [...this.array.array.value, ...this.array.array.value];
        }
    },
    methods: {
        a() {
            this.array.array.value = this.array.double.value;
            return this.array.array.value;
        }
    },
    watch: {
        array: {
            handler(newValue) {
                console.log("Variable changed", newValue);
            },
            deep: true
        }
    }
});
```
### src/App.vue
```vue
<template>
  {{store.array.array}}
  <br>
  {{store.array.getArray()}}
  <br>
  {{store.array.double}}
  <br>
  <button @click="store.array.addElem(Math.random())">add</button>
  <button @click="store.array.a()">a</button>
</template>
```
## Config
### Name
#### src/store/index.js
```javascript
export default createStore({
    data: {
        test: 0
    }
}, {
    name: "store0"
});
```
#### src/App.vue
```vue
<template>
{{store0.global.test}}
</template>
```
### DefaultModuleName
#### src/store/index.js
```javascript
export default createStore({
    data: {
        test: 0
    }
}, {
    defaultModuleName: "default"
});
```
#### src/App.vue
```vue
<template>
{{store.default.test}}
</template>
```
### DefaultModuleName = ""
#### src/store/index.js
```javascript
export default createStore({
    data: {
        test: 0
    }
}, {
    defaultModuleName: ""
});
```
#### src/App.vue
```vue
<template>
{{store.test}}
</template>
```