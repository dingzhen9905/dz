import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import axios from 'axios'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex'
axios.defaults.withCredentials=true
axios.defaults.baseURL="http://127.0.0.1:3000/"
Vue.use(Vuex)
//创建store
/*var state={
  csuojin:0,
}
export default new Vuex.Store({
  state,
  mutations:{
    bian1(state){
    state.csuojin=1
    },
    bian0(state){
      state.csuojin=0
    }
  }
})*/
Vue.use(MintUI)
Vue.prototype.axios=axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')
