import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Portfolio from './views/Portfolio.vue'
import Market from './views/Market.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '', component: Home},
    {path: '/portfolio', component: Portfolio },
    {path: '/market', component: Market},
    {path: '*', component: Home}
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition;
    } else if (to.hash) {
        return { selector: to.hash};
    } else {
        return {x: 0, y: 0};
    }
  }
})
