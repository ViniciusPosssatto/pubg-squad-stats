<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Stats</th>
        <th class="text-left">
          {{th[0]}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in tr"
        :key="item"
      >
        <td>{{ item }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
// import axios from 'axios'
// import { mapActions } from 'vuex';
  export default {
    props: {
      players: Array,
    },
    data () {
      return {
        playersStats: [],
        apiKey: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkODE3YmZmMC1iZGZiLTAxM2ItMWJhNS00ZTllYWE2OTQyZTMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjgxNTkxMjk4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii01NDkxNjQwOS05NGJhLTQ4ZGEtYmI1Mi0wNzQ1YzliYzlkMTkifQ.VK_xmxa15hUFjNLgiA6cabIOAiB6HWlOriWuA35P8ZI",
        tr: ["assists","boosts","dBNOs","dailyKills", "dailyWins","damageDealt","days",
              "headshotKills","heals","killPoints","kills","longestKill","longestTimeSurvived",
              "losses","maxKillStreaks","mostSurvivalTime","rankPoints","rankPointsTitle",
              "revives","rideDistance","roadKills","roundMostKills", "roundsPlayed","suicides",
              "swimDistance","teamKills","timeSurvived","top10s","vehicleDestroys","walkDistance",
               "weaponsAcquired","weeklyKills","weeklyWins","winPoints","wins"],
        th: []
      }
    },
    computed: {
      // getAll() {
      //   return this.getUsersById()
      // },
      // thList() {
      //   return this.playersStats.player
        
      // },
      // trList() {
      //   return this.playersStats.atributes.gameModeStats.squad

      // }
    },
    methods: {
        // async getUsersById() {
        //   let ths = []
        //   for(let i; i < this.players.length; i++){
        //     ths.push(this.players[i].atributes.name)
        //     let url = `https://api.pubg.com/shards/steam/players/${this.players[i].id}/seasons/lifetime`
        //     let auth = {'Content-Type': 'application/json', "Authorization": this.apiKey, "Accept": "application/vnd.api+json"}
        //     await axios.get(url, {headers: auth}, {} )
        //     .then((response) => {
        //       let player = response.data.data;
        //       player.name = this.players[i].atributes.name
        //       this.setPlayersStats(player)
        //       console.log(this.playersStats)
        //     })
        //     .catch((response) => {
        //       console.error("DEU ERROOOO", response)
        //     })
        //   }
        //   console.log(ths)
        //   this.th = ths;
        // },
        setPlayersStats(data) {
          let values = this.playersStats;
          values.push(data)
          this.playersStats = values
        }
      },

    watch: {
      players() {
        console.log('teste@')
        return this.getUsersById()
      }
    }
      
    }
</script>