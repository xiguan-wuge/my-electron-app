import {createRouter, createWebHashHistory} from 'vue-router'

const Home = () => import('../pages/Home.vue')
const Detail = () => import('../pages/Detail.vue')
const Order = () => import('../pages/Order.vue')
const Feedback = () => import('../pages/FeedBack.vue')
const MyOrder = () => import('../pages/MyOrder.vue')
const NotFound = () => import('@/pages/NotFound.vue')
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback
  },
  {
    path: '/my-order',
    name: 'MyOrder',
    component: MyOrder
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router