import Vue from "vue";

import Button from "./components/ui/controls/Button.vue";
import Switcher from "./components/ui/controls/Switcher.vue";
import Menu from "./components/ui/controls/Menu/index.vue";
import MenuItem from "./components/ui/controls/Menu/Item.vue";
import MenuTitle from "./components/ui/controls/Menu/Title.vue";

import Modal from "./components/ui/wrappers/Modal.vue";

import Spinner from "./components/ui/elements/Spinner.vue";
import Battery from "./components/ui/elements/Battery.vue";
import Notice from "./components/ui/elements/Notice.vue";

Vue.component("ui-button", Button);
Vue.component("ui-switcher", Switcher);
Vue.component("ui-menu", Menu);
Vue.component("ui-menu-item", MenuItem);
Vue.component("ui-menu-title", MenuTitle);

Vue.component("ui-modal", Modal);

Vue.component("ui-spinner", Spinner);
Vue.component("ui-battery", Battery);
Vue.component("ui-notice", Notice);
