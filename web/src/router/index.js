import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Index from '../views/Index.vue'
import Category from '../views/Category'
import About from '../views/About.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/', component: Index },
      { path: '/category', component: Category },
      { path: '/about', component: About },
      { path: '/detail/:id', component: Detail, props: true },
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  next()
})


export default router
