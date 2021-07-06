import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
Vue.config.productionTip = false;

import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusCircle,
  faArrowLeft,
  faUser,
  faBars,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlusCircle, faArrowLeft, faUser, faBars, faSignOutAlt);
Vue.component("font-awesome-icon", FontAwesomeIcon);

//registering BaseComponents globall
const requireComponent = require.context(
  // The relative path of the components folder
  "./components",
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem("store", JSON.stringify(state));
});
new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit("initialiseStore", { root: true });
  },
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
