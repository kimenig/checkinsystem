import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mixins from "./mixins";
import store from "./store";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import "bootstrap/dist/css/bootstrap.min.css"; // [bootstrap]
import "bootstrap"; // [bootstrap]

createApp(App)
  .use(router)
  .mixin(mixins)
  .use(store)
  .use(VueSweetalert2)
  .mount("#app");
