<template>
  <v-layout ref="app">
    <v-app-bar color="grey-lighten-2" name="app-bar" class="justify-center">
      <div class="d-flex justify-center align-center w-100">
        <v-text-field
          v-model="userNick"
          label="Digite um nick"
          :rules="rules"
          validate-on="submit"
          hide-details="auto"
          :loading="loading"
        ></v-text-field>
        <v-btn @click="getUser">
          click
        </v-btn>  
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <!-- <RouterLink to="/about">About</RouterLink> -->
      </nav>
    </v-app-bar>
    <!-- <v-navigation-drawer color="grey-darken-2" permanent name="drawer">
      <div class="d-flex justify-center align-center">
        <v-img
        aspect-ratio="16/9"
        cover
        src="https://wstatic-prod.pubg.com/web/live/static/og/img-og-pubg.jpg"
      ></v-img>
      </div>
    </v-navigation-drawer> -->
    <v-main>
      <p v-text="getUsersList"></p>   
        <TablePlayer :players="players"/>
    </v-main>
  </v-layout>
</template>
<script>
import TablePlayer from "../components/TablePlayers.vue"
// import axios from "axios"
import { mapActions, mapGetters, mapState } from "vuex"
export default {
  components: {
    TablePlayer
  },
  data(){
    return {
      layout: null,
      // apiKey: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkODE3YmZmMC1iZGZiLTAxM2ItMWJhNS00ZTllYWE2OTQyZTMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjgxNTkxMjk4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii01NDkxNjQwOS05NGJhLTQ4ZGEtYmI1Mi0wNzQ1YzliYzlkMTkifQ.VK_xmxa15hUFjNLgiA6cabIOAiB6HWlOriWuA35P8ZI",
      rules: [
          value => !!value || "Required.",
          value => (value && value.length >= 3) || "Min 3 characters",
      ],
      userNick: "MyEgGs_Vineh",
      idUser:'',
      players: [],
      loading: false,
    }
  },
  computed: {
    ...mapState({
      id: (state)  => state.userId,
      stats: (state)  => state.usersStats
    }),
    ...mapGetters(['requests/getUsersStats']),

    getUsersList(){
      return this["requests/getUsersStats"]
    }


  },
  methods: {
    ...mapActions(['requests/getUserId']),
    async getUser() {
      await this.$store.dispatch('requests/getUserId', this.userNick)
      .then(() => {
        this.$toast.success('Get Users Success.', {
          type: 'success',
          position: 'bottom',
          dismissible: true,
          duration: 1000
        })
        console.log('thenss')
      })
      .catch((response) => {
        console.error("DEU ERROOOO", response)
      })
      .finally(() => {
        this.loading = false;
      })
  },
  setPlayers(player) {
    let values = this.players;
    values.push(player)
    this.players = values
    console.log(this.players)
  }
      
  },
}
</script>
<style scoped>

</style>
