<template>
  <q-page padding class="docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;">
      <q-breadcrumbs separator=">" active-color="turq" color="light">
        <q-breadcrumbs-el label="主畫面" to="/main" />
        <q-breadcrumbs-el label="課程互動" to="/main/irs" />
      </q-breadcrumbs>
      <br />
      <div v-for="item in items" :key="item.id">
          <q-card inline color="lemonade" class="q-ma-sm">
            <q-card-section class="text-brand">
              {{item.question}}
              <span slot="subtitle"></span>
              <q-icon slot="right" name="timer_10" />
            </q-card-section>
            <q-card-section>
              <q-option-group
                class="text-brand"
                type="radio"
                color="cerulean"
                v-model="radio"
                :options="[
          { label: item.a, value: 'a' },
          { label: item.b, value: 'b' },
          { label: item.c, value: 'c'},
          { label: item.d, value: 'd'}
        ]"
              />
            </q-card-section>
            <div align="center">
              <q-btn
                glossy
                size="18px"
                align="center"
                color="01"
                push
                text-color="black"
                label="送出"
                @click="check(item.ans)"
              />
            </div>
            <br />
          </q-card>
        </div>
      </div>
  </q-page>
</template>

<style lang="stylus">
.card-examples {
  .q-card {
    width: 300px;
  }

  .bigger {
    width: 450px;
    max-width: 90vw;
  }

  @media (max-width: $breakpoint-xs-max) {
    .q-card {
      width: 100%;
    }
  }
}
</style>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      radio: "",
      items:[],
    };
  },
  created: function() {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     console.log("login success");
    //   } else {
    //     console.log("沒人登入");
    //     this.$swal("請先登入");
    //     this.$router.push("/");
    //   }
    // });
    firebase.database().ref("irs/").on("value",snapshot => {
      this.radio = ''
      this.items = snapshot.val()
      })
  },
  methods: {
    check(val) {
      console.log(val)
      if(this.radio == val)
      {
        this.$swal({type:'success' ,title:'答對'})
      }else{
        this.$swal({type:'warning',title:'答錯'})
      }
      firebase.database().ref("irs").remove()
      firebase.database().ref("ans/").set({
        答題狀況 : true
      })
      }
    }
};
</script>
