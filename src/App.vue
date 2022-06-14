<template>
  <div id="q-app" class="ba">
    <router-view  />
  </div>
</template>

<script>
import * as firebase from "firebase";
export default {
  name: "App",
};
</script>

<style>
body {
  font-family: Microsoft JhengHei;
}
.ba {
  background-size: cover;
  position: fixed;
  background-image: url(statics\l.jpg);
}
</style>
