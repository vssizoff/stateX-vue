import { createApp, App } from 'vue';
import rootElem from './App.vue';
import router from './router';
import store from "@/store";

let app: App = createApp(rootElem);

// app.use(router);
app.use(store);

app.mount('#app');