import { createRouter, createWebHistory } from 'vue-router'
import Vue from 'vue'
import SWOP from '@/components/SWOP'

export default createRouter({
  history: createWebHistory('/swop#/'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: SWOP,
      props: { bereich: 'home', swop_view: 'home_fuer_lehrer'}
    }
  ]
})
