
import Vue from 'vue';
import App from './App.vue';
import 'jquery';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor' // 引入markdown 所有组件
import 'mavon-editor/dist/css/index.css';
import store from './store';
import router from './router';
import './utils/clicklove/clicklove';
import './assets/iconfont/iconfont.css';
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.use(ElementUI)
Vue.use(mavonEditor) // markdown  挂在到全局
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
