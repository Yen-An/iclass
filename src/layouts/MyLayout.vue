<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="transparent">
      <q-toolbar>
        <q-btn flat dense  @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="img:statics/logoicon.png"  size="50px"  />
        </q-btn>
        <q-toolbar-title class="text-brand text-h4 q-display-1 font text-bold">
            iClass
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen"
      show-if-above
        bordered
        content-class="dark transparent" >
      <q-list padding no-border link inset-delimiter>
        <q-item-label header>功能選單，點擊空白處關閉</q-item-label>
        <q-item clickable v-ripple to="/main">
          <q-item-section avatar>
            <q-icon class="text-cerulean" name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label  class="text-brand">主畫面</q-item-label>
            <q-item-label caption>點選進入主畫面</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Chooseclass">
          <q-item-section avatar>
            <q-icon class="text-cerulean" name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>課程選單</q-item-label>
            <q-item-label caption>你可以在這裡選你所上的課</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/test">
          <q-item-section avatar>
            <q-icon  class="text-cerulean" name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>小組討論區</q-item-label>
            <q-item-label caption>你可以在這裡和組員聊天</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/irs">
          <q-item-section avatar>
            <q-icon class="text-cerulean" name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>課堂互動</q-item-label>
            <q-item-label caption>你在這裡可以進行課堂活動</q-item-label>
          </q-item-section>
        </q-item>
        <q-item @click.native="logout()" to="/">
          <q-item-section avatar>
            <q-icon class="text-cerulean" name="directions_run" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-brand">登出</q-item-label>
            <q-item-label caption>不用了記得登出</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import * as firebase from "firebase";
export default {
  created: function() {},
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          alert("登出 ! ");
        });
    }
  }
};
</script>

<style>
.bg-falcon {
  background: #735b69;
}
.bg-lemonade {
  background: #fee19f;
}
.bg-zig {
  background: #70c0ff;
}
.text-zig {
  color: #70c0ff;
}
.text-brand {
  color: #192231;
}
.bg-brand {
 background: #192231;
}
.bg-papink {
  background: #ff9690;
}
.text-papink {
  color: #ff9690;
}
.bg-powerblue {
  background: #4abdac;
}
.bg-spruce {
  background: #f5b994;
}
.bg-cerulean {
  background: #1d6a96;
}
.bg-turq {
  background: #85b8cb;
}
.bg-pista {
  background: #d1dddb;

}
.bg-post {
  background: #ffc9b3;
}
.bg-post2 {
  background: #c9efff;
}
.bg-deepteal {
  background: #034b61;
}
.text-spruce {
  color: #283b42;
}
.text-cerulean {
  color: #1d6a96;
}
.text-turq {
  color: #85b8cb;
}
.text-pista {
  color: #d1dddb;
}
.text-lemonade {
  color: #fee19f;
}
.bg-post3 {
  background: #ffc653;
}
.text-post3 {
  color: #ffc653;
}
.bg-post4 {
  background: #9fc6b3;
}
.font {
  font-family: MV Boli;
}
.bg-try{
  opacity: 0.1;
  background-color: transparent;
  color:transparent;
  background: transparent
}
</style>
