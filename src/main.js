
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";
import router from './router';
import "./assets/css/admin.css";
import utils from './utils'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
VueMarkdownEditor.use(vuepressTheme);
Vue.use(VueMarkdownEditor);
/*
 * @Author shaokexiang
 * @Date 2021/2/15 21:08
 * @Description //TODO
 **/
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.utils = utils

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
