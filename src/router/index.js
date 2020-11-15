import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index'
import {adminIsLogined} from 'network/adminOperation'

// // 插件安装
Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/article/Article.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/article/Article.vue')
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../views/demo/Demo.vue')
  },
  {
    path: '/tool',
    name: 'Tool',
    component: () => import('../views/tool/Tool.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/detail/Detail.vue')
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: () => import('../components/admin/childComps/adminLogin.vue')
  }, 
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../components/admin/admin.vue'),
    children: [
      {
        path: '/admin/article/publish',
        name: 'articlePublish',
        component: () => import('../components/admin/childComps/articlePublish.vue')
      }, 
      {
        path: '/admin/article/category',
        name: 'articleCategory',
        component: () => import('../components/admin/childComps/articleCategory.vue')
      },
      {
        path: '/admin/article/label',
        name: 'articleLabel',
        component: () => import('../components/admin/childComps/articleLabel.vue')
      },
      {
        path: '/admin/article/management',
        name: 'articleManagement',
        component: () => import('../components/admin/childComps/articleManagement.vue')
      },
      {
        path: '/admin/article/message',
        name: 'articleMessage',
        component: () => import('../components/admin/childComps/articleMessage.vue')
      },
      {
        path: '/admin/user/management',
        name: 'userManagement',
        component: () => import('../components/admin/childComps/userManagement.vue')
      },
      {
        path: '/admin/notice/publish',
        name: 'notice',
        component: () => import('../components/admin/childComps/notice.vue')
      },
      {
        path: '/admin/tool/publish',
        name: 'toolPublish',
        component: () => import('../components/admin/childComps/toolPublish.vue')
      },
      {
        path: '/admin/tool/management',
        name: 'toolManagement',
        component: () => import('../components/admin/childComps/toolManagement.vue')
      },
      {
        path: '/admin/demo/publish',
        name: 'demoPublish',
        component: () => import('../components/admin/childComps/demoPublish.vue')
      },
      {
        path: '/admin/demo/management',
        name: 'demoManagement',
        component: () => import('../components/admin/childComps/demoManagement.vue')
      },
    ]
  },
]
// 创建路由对象
const router = new VueRouter({
  routes,
  mode: 'history',
})


/* 重定向不报错 */
const originalPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/* 管理系统守卫 */
router.beforeEach((to,from,next) => {
  store.state.loading = true;
  if(to.path.includes("/admin")) {
    adminIsLogined().then(res => {
      if(res.data.err === 0) {
        next()
      } else {
        next('/admin/login')
      }
    }).catch(err => {
      
    })
  }
  next()
})

/* 路由跳转回顶部 */
router.afterEach((to,from,next)=>{
  window.scrollTo(0,0);
  setTimeout(() => {
    store.state.loading = false;
  }, 1000)
})

// 导出
export default router;
