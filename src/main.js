// import { createApp } from "vue";
import store from "./store/index.js";
// import router from "./router";

import BaseCard from "./ui/BaseCard.vue";
import BaseButton from "./ui/BaseButton.vue";

// import App from "./App.vue";
// const app = createApp(App);

// app.use(router);
// app.use(store);

// app.component("base-card", BaseCard);
// app.component("base-button", BaseButton);
// app.component("base-badge", BaseBadge);
// app.component("base-spinner", BaseSpinner);
// app.component("base-dialog", BaseDialog);
// app.mount("#app");
import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(store);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);

app.mount("#app");
