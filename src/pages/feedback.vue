<template>
<q-page padding class="row justify-center">
    <div style="width: 500px; max-width: 95vw;">
        <q-breadcrumbs separator=">" active-color="blue-gery-10" color="light">
      <q-breadcrumbs-el label="主畫面" to="/main" />
      <q-breadcrumbs-el label="課後回饋" to="/main/feeback" />
    </q-breadcrumbs>
    <br>
    <q-card inline class="q-ma-sm text-blue-grey">
      <q-card-section class="text-blue-grey">
        <div class="text-h5 text-weight-bolder">
          第一週上課心得
        </div>
      </q-card-section>
      <q-card-section class="text-blue-grey">
        <q-input  outlined v-model="area" type="textarea"  placeholder="在此輸入心得" />
        <br>
        你覺得這堂課怎麼樣?
        <br>
        <q-rating class="text-blue-grey" v-model="ratingModel" :max="5" icon="star" size="2rem" />
      <div align="right">
          <q-btn push  align="center" class="text-blue-grey"  @click="done">送出</q-btn>
      </div>
      </q-card-section>
    </q-card>
  <q-page-container>
      <router-view />
  </q-page-container>
    </div>
  </q-page>
  </template>

<style lang="stylus">
.card-examples
  .q-card
    width 300px
  .bigger
    width 450px
    max-width 90vw
  @media (max-width $breakpoint-xs-max)
    .q-card
      width 100%
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
      stars: 3,
      lorem: '',
      ratingModel: 0,
      area:''
    }
  },
  methods:{
    done(){
      this.ratingModel=0,
      this.area=''
      this.$swal({ type: "success" });
    }
  }
}
</script>
