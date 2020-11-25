import Vue from "vue";

import Button from "./components/ui/controls/Button.vue";
import Menu from "./components/ui/controls/Menu/index.vue";
import MenuItem from "./components/ui/controls/Menu/Item.vue";

import Modal from "./components/ui/wrappers/Modal.vue";

Vue.component("ui-button", Button);
Vue.component("ui-menu", Menu);
Vue.component("ui-menu-item", MenuItem);

Vue.component("ui-modal", Modal);
