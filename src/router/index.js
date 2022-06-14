import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2'
import routes from './routes'
import VueClipboard from 'vue-clipboard2'
import Notifications from 'vue-notification'
 
Vue.use(Notifications)
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)
Vue.use(VueRouter)
Vue.use(VueSweetalert2)



import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyDB1g-yrAS_nw4wkz-gp6nElrFgTrKV9c4",
  authDomain: "test-b994b.firebaseapp.com",
  databaseURL: "https://test-b994b.firebaseio.com",
  projectId: "test-b994b",
  storageBucket: "test-b994b.appspot.com",
  messagingSenderId: "805447214225",
  appId: "1:805447214225:web:96f001edc07986ea"
});
// Initialize Firebase
const db = firebase.firestore()
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  return Router
}