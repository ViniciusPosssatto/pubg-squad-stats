<template>
  <v-layout ref="app">
    <v-app-bar extension-height="500" color="grey-lighten-2" name="app-bar" class="justify-center">
      <div class="d-flex justify-center align-center w-100">
        <v-text-field
          :disabled="getUsersList.length >= 6"
          v-model="userNick"
          label="Digite um nick"
          :rules="rules"
          validate-on="submit"
          hide-details="auto"
          :loading="loading"
          :disable="getUsersList.length === 6"
        ></v-text-field>
        <v-btn  @click="getUser" :disabled="loading || getUsersList.length >= 6" >
          Buscar player
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
        <TablePlayer :getUsersList="getUsersList"/>
    </v-main>
  </v-layout>
</template>
<script>
import TablePlayer from "../components/TablePlayers.vue"
import axios from "axios"
import { mapActions, mapGetters, mapState } from "vuex"
export default {
  components: {
    TablePlayer
  },
  data(){
    return {
      layout: null,
      rules: [
          value => !!value || "Required.",
          value => (value && value.length >= 3) || "Min 3 characters",
      ],
      userNick: "",
      loading: false,
      API_KEY: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkODE3YmZmMC1iZGZiLTAxM2ItMWJhNS00ZTllYWE2OTQyZTMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjgxNTkxMjk4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii01NDkxNjQwOS05NGJhLTQ4ZGEtYmI1Mi0wNzQ1YzliYzlkMTkifQ.VK_xmxa15hUFjNLgiA6cabIOAiB6HWlOriWuA35P8ZI",
    }
  },
  computed: {
    ...mapState({
      id: (state)  => state.userId,
      stats: (state)  => state.usersStats
    }),
    ...mapGetters(['requests/getUsersStats']),

    getUsersList(){
      if (this["requests/getUsersStats"]) {
        return this["requests/getUsersStats"]
      } else {
        return []
      }
    }


  },
  methods: {
    ...mapActions(['requests/getUserId']),
    async getUser() {
      this.loading = true;
      let url = `https://api.pubg.com/shards/steam/players?filter[playerNames]=${this.userNick}`
      const auth = {'Content-Type': 'application/json', "Authorization": this.API_KEY, "Accept": "application/vnd.api+json"}
      await axios.get(url, {headers: auth}, {})
      .then((response) => {
        let user =  response.data.data
        this.$store.dispatch('requests/getUsersStatsLifetimeById', user)
        this.$toast.success('Player encontrado! Pegando os dados.', {
          type: 'success',
          position: 'bottom',
          dismissible: true,
          duration: 2000
        })
      })
      .catch((response) => {
        console.error("ERRO no getUser: ", response)
        this.$toast.error('Nick não encontrado, verifique tente novamente!', {
          type: 'error',
          position: 'bottom',
          dismissible: true,
          duration: 2000
        })
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
