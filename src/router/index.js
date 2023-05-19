import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/views/Index.vue"


Vue.use(VueRouter)

const routes = [
  {
    //首页
    path: '/',
    name: 'index',
    redirect:"/index",
    component: Index,
  },
  {
    //首页
    path: '/index',
    component: Index,
  },
  {
    //分类
    path:'/classify',
    name: 'classify',
    component:()=>import(`@/views/Classify.vue`)
  },
  {
    //书架
    path:'/bookShelf',
    name: 'bookShelf',
    component:()=>import(`@/views/BookShelf.vue`)
  },
  {
    //我的
    path:'/my',
    name: 'my',
    component:()=>import(`@/views/My.vue`)
  },
  {
    path:"/seach",
    name:"seach",
    component:()=>import(`@/views/SeachPage.vue`),
    meta:{
      hideTab:true
    },
  },
  {
    //图书信息
    path:'/seach/:bookId',
    name: 'SeachBooks',
    props:true,
    component:()=>import(`@/views/SeachBooks.vue`),
    meta:{
      hideTab:true
    },
    
  },
  {
    //图书信息
    path:'/readbook/:readId',
    name: 'readbook',
    props:true,
    component:()=>import(`@/views/ReadBook.vue`),
    meta:{
      hideTab:true
    },
  },
]

const router = new VueRouter({
  mode:"hash",
  routes
})

export default router
