import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import "@/assets/reset.css"
import "@/assets/iconfont/iconfont.css"
import { Tabbar, TabbarItem,Search,Tab, Tabs,Loading,NavBar,Button  } from 'vant';
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Loading)
Vue.use(Search);
Vue.use(Tab).use(Tabs)
Vue.use(Button);
Vue.use(NavBar);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
