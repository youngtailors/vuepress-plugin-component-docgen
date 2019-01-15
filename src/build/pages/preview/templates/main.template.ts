export default context => {
  return `
import Vue from "vue";
import App from "./App";
import component from "./component";

Vue.config.productionTip = false;
Vue.component("${context.name}", component);
/* eslint-disable no-new */
new Vue({
    el: "#app",
    components: { App },
    template: "<App/>"
});
`
}
