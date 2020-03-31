import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import News from './components/News.vue'
import NewsDetail from './components/NewsDetail.vue'

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {path: '/', component: News},
        {path: '/detail/:id', component: NewsDetail}
    ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h=>h(News)
}).$mount('#app')
  .use(BootstrapVue)
  .use(IconsPlugin)
  .use(VueRouter)
