import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/andv'
import './plugins/clipboard'
import test from '../packages/index'
import DemoBox from './views/demoBox'

Vue.component('demo-box', DemoBox)
Vue.use(test)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
