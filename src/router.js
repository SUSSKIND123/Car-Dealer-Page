import { createRouter, createWebHistory } from "vue-router";
import Atendente from "./components/Atendente.vue";
import Login from "./components/Login.vue";
import Carros from "./components/Carros.vue";
import Carros2 from "./components/Carros2.vue";
import Carros3 from "./components/Carros3.vue";
import Carros4 from "./components/Carros4.vue";
import SeguroVida from "./components/SeguroVida.vue";
import SeguroCarro from "./components/SeguroCarro.vue";
import SeguroCarroMarca from "./components/SeguroCarroMarca.vue";
import ModelYear from "./components/ModelYear.vue";
import SeguroAuto from "./components/SeguroAuto.vue";
import Email from "./components/Email.vue";
import EntreContato from "./components/EntreContato.vue";
import Duvida from "./components/Duvida.vue";
import Errado from "./components/Errado.vue";
import Outro from "./components/Outro.vue";
import Reclamacao from "./components/Reclamacao.vue";
import store from "./store/index.js";
import Cart from "./components/Cart.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login, meta: { requiresUnauth: true } },
    { path: "/atendente", component: Atendente, meta: { requiresAuth: true } },
    { path: "/carros", component: Carros, meta: { requiresAuth: true } },
    { path: "/carros/p2", component: Carros2, meta: { requiresAuth: true } },
    { path: "/carros/p3", component: Carros3, meta: { requiresAuth: true } },
    { path: "/carros/p4", component: Carros4, meta: { requiresAuth: true } },

    {
      path: "/segurovida",
      component: SeguroVida,
      meta: { requiresAuth: true },
    },
    {
      path: "/seguro3",
      component: ModelYear,
      meta: { requiresAuth: true },
    },
    {
      path: "/seguro2",
      component: SeguroCarro,
      meta: { requiresAuth: true },
    },
    {
      path: "/seguro",
      component: SeguroCarroMarca,
      meta: { requiresAuth: true },
    },
    {
      path: "/seguroauto",
      component: SeguroAuto,
      meta: { requiresAuth: true },
    },
    {
      path: "/seguro4",
      component: Email,
      meta: { requiresAuth: true },
    },
    { path: "/entre", component: EntreContato, meta: { requiresAuth: true } },
    { path: "/cart", component: Cart, meta: { requiresAuth: true } },
    { path: "/duvida", component: Duvida, meta: { requiresAuth: true } },
    { path: "/errado", component: Errado, meta: { requiresAuth: true } },
    { path: "/outro", component: Outro, meta: { requiresAuth: true } },
    {
      path: "/reclamacao",
      component: Reclamacao,
      meta: { requiresAuth: true },
    },
    { path: "/:notFound(.*)", redirect: "/login" },
  ],
});
router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/atendente");
  } else if (
    (to.path == "/atendente" || to.path == "/seguroAuto") &&
    from.path == "/seguro"
  ) {
    router.push("/seguro");
  } else {
    next();
  }
});

export default router;
