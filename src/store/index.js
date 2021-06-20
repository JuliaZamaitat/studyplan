import Vue from "vue";
import Vuex from "vuex";
import * as program from "@/store/modules/program.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    program,
  },
});
