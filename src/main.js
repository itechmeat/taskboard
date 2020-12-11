import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./globalComponents";
import vClickOutside from "v-click-outside";
import VueMeta from "vue-meta";
import Notifications from "vue-notification";

Vue.use(vClickOutside);
Vue.use(VueMeta);
Vue.use(Notifications);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
