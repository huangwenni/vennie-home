import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

import Login from '../views/Login.vue'

import Welcome from '../views/Welcome.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import CategoryEditParent from '../views/CategoryEditParent.vue'
import CategoryEditSon from '../views/CategoryEditSon.vue'
import CategoryList from '../views/CategoryList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
import LinkColEdit from '../views/LinkColEdit.vue'
import LinkPerEdit from '../views/LinkPerEdit.vue'
import LinkList from '../views/LinkList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'Login',
    component:Login,
    meta:{isPublic:true}
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path:'/welcome',component:Welcome},
      {path:'/articles/edit',component:ArticleEdit},
      {path:'/articles/edit/:id',component:ArticleEdit,props:true},
      {path:'/articles/list',component:ArticleList},
      {path:'/categories/editParent',component:CategoryEditParent},
      {path:'/categories/editParent/:id',component:CategoryEditParent,props:true},
      {path:'/categories/editSon',component:CategoryEditSon},
      {path:'/categories/editSon/:id',component:CategoryEditSon,props:true},
      {path:'/categories/list',component:CategoryList},
      {path:'/admin_users/edit',component:AdminUserEdit},
      {path:'/admin_users/edit/:id',component:AdminUserEdit,props:true},
      {path:'/admin_users/list',component:AdminUserList},
      {path:'/link/list',component:LinkList},
      {path:'/linkCol/edit',component:LinkColEdit},
      {path:'/linkCol/edit/:id',component:LinkColEdit,props:true},
      {path:'/linkPer/edit',component:LinkPerEdit},
      {path:'/linkPer/edit/:id',component:LinkPerEdit,props:true}
    ]
  }
]

const router = new VueRouter({
  routes
})

//在每次进入路由之前需要做什么
router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    Vue.prototype.$message({
      type:"error",
      message:"请先登录"
    })
    return next('/login')
  }
  next()
})

export default router
