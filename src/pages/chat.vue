<template>
    <q-page padding class="docs-input row justify-center">
  <div style="width: 500px; max-width: 90vw;">
        <div class="text-grey">小組討論</div>
        <div>
        <q-scroll-area style="width: 500px; max-width: 90vw; height: 480px; max-height: 85vh;" class="">
      <q-chat-message
        v-for="(msg, index) in messages"
        :key="`avatar-${index}`"
        :label="msg.label"
        :sent="msg.sent"
        :text-color="msg.textColor"
        :bg-color="msg.bgColor"
        :name="msg.name"
        :text="msg.text"
      >
      </q-chat-message>
    </q-scroll-area>
  </div>
  <br>
  <q-list>
    <q-item>
  <q-item-main>
      <q-input hide-underline placeholder="輸入訊息" color="secondary" v-model="textarea"/>
  </q-item-main>
    <q-item-side right>
    <q-btn flat color="primary" icon=send></q-btn>
    </q-item-side>
    </q-item>
    </q-list>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-page>

  </template>

<style lang="stylus">
</style>

<script>
import firebase from "firebase";
const db = firebase.firestore();
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("login success");
  } else {
    console.log("沒人登入");
  }
});
export default {
  data () {
    return {
      messages: [
        {
          label: '2019/4/8'
        },
        {
          name: '小安',
          text: ['現在是討論時間'],
          avatar: 'statics/boy-avatar.png',
          bgColor: 'blue-grey-11',
          textColor: 'black'
        },
        {
          name: '老古',
          text: ['好', '菌菌你覺得怎樣?'],
          sent: true,
          bgColor: 'papink',
          textColor: 'black',
          avatar: 'statics/linux-avatar.png'
        },
        {
          name: '菌菌',
          text: ['我覺得可以'],
          sent: true,
          avatar: 'statics/linux-avatar.png',
          bgColor: 'grey-5',
          textColor: 'black'
        },
        {
          label: '2019/4/15'
        },
        {
          name: '小安',
          text: ['所以午餐要吃什麼'],
          avatar: 'statics/boy-avatar.png',
          bgColor: 'blue-grey-11',
          textColor: 'black'
        },
        {
          name: '老古',
          text: ['早安山丘', '麥味登', '選一個'],
          sent: true,
          bgColor: 'papink',
          textColor: 'black',
          avatar: 'statics/linux-avatar.png'
        },
        {
          name: '菌菌',
          text: ['早安味登'],
          sent: true,
          avatar: 'statics/linux-avatar.png',
          bgColor: 'grey-5',
          textColor: 'black'
        },
        {
          name: '小安',
          text: ['好'],
          avatar: 'statics/boy-avatar.png',
          bgColor: 'blue-grey-11',
          textColor: 'black'
        }
      ]
    }
  }
}
</script>
