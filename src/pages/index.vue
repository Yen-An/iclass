<template>
<q-layout>
    <q-page-container>
  <q-page class="q-pa-sm docs-input row justify-center">
    <div class="col-xs-12 col-sm-8 col-xl-6">
        <q-carousel 
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        navigation
        height="200px" 
        infinite autoplay>
          <q-carousel-slide :name="1" img-src="statics/index1.png" />
          <q-carousel-slide :name="2" img-src="statics/index2_0.png" />
        </q-carousel>
      <div class="q-pa-sm col-xs-12 col-sm-8 col-xl-6">
      <q-input color="blue-grey-10" v-model="email" filled label="請輸入帳號" placeholder="預設為學校信箱 : 學號@test.com"/>    
      <q-input color="blue-grey-10" v-model="password" label="請輸入密碼" placeholder="預設為學號" filled :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      
      </div>
      <div class="q-pa-sm" align="center">
        <q-btn
          class="button transparent text-blue-grey-10"
          push
          align="center"
          color="post3"
          size="lg"
          @click="login()"
        ><strong>
          登入
        </strong>
        </q-btn>
      </div>
    </div>
    <br />
      <router-view />
  </q-page>
    </q-page-container>
</q-layout>
</template>

<script>
import firebase from "firebase";
export default {
  name: "index",
  data() {
    return {
      email: "",
      password: "",
      slide: 1,
      isPwd: true 
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace("/chooseclass");
        })
        .catch(err => {
          this.$swal({
            title: "帳號或密碼錯誤",
            type: "warning"
          });
        });
    }
  }
};
</script>
<style>
</style>
