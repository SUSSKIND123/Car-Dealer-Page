import { createStore } from "vuex";

import authModule from "./modules/auth/index.js";
import carrosModule from "./modules/carros/index.js";
import segurosModule from "./modules/segurosCarro/index.js";

const store = createStore({
  modules: {
    seguros: segurosModule,
    auth: authModule,
    carros: carrosModule,
  },
});

export default store;
