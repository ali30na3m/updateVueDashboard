import { createRouter, createWebHistory } from 'vue-router'
import dashboardPanel from '@/views/dashboard/dashboardPanel.vue'
import todosPanel from '@/views/todos/todosPanel.vue'
import weatherPanel from '@/views/weather/weatherPanel.vue'
import profilePanel from '@/views/profile/profilePanel.vue'
import loginPanel from '@/views/loginPanel.vue'
import notFound from '@/views/notFound.vue'
import layoutPanel from '@/layout/layoutPanel.vue'
import type { Component } from 'vue'
import {
  AppstoreOutlined,
  CarryOutOutlined,
  CloudOutlined,
  ProfileOutlined
} from '@ant-design/icons-vue'

export const routes = [
  {
    path: '/',
    component: layoutPanel,
    children: [
      {
        path: '/',
        redirect: '/dashboard',
        name: '',
        meta: {
          isSideBar: false
        }
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboardPanel as Component,
        meta: {
          icon: AppstoreOutlined as Component,
          isSideBar: true,
          requiresAuth: true
        }
      },
      {
        path: '/todos',
        name: 'todos',
        component: todosPanel as Component,
        meta: {
          icon: CarryOutOutlined as Component,
          isSideBar: true,
          requiresAuth: true
        }
      },
      {
        path: '/weather',
        name: 'weather',
        component: weatherPanel as Component,
        meta: {
          icon: CloudOutlined as Component,
          isSideBar: true,
          requiresAuth: true
        }
      },
      {
        path: '/profile',
        name: 'profile',
        component: profilePanel as Component,
        meta: {
          icon: ProfileOutlined as Component,
          isSideBar: true,
          requiresAuth: true
        }
      }
    ],
    meta: {
      isSideBar: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: loginPanel,
    meta: {
      isSideBar: false
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: notFound,
    meta: {
      isSideBar: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('username')

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
