<template>
  <v-container>
    <v-select v-model="gameMode" :items="moreOptions" label="Modo de jogo"></v-select>
    <v-menu>
        <v-list dense>
          <v-list-item
            v-for="(item, i) in moreOptions"
            :key="i"
            :value="i"
          >
            <v-list-item-title @click="gameMode = item">
              {{ item }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    <v-card outlined max-width="1400" min-width="400" class="mx-auto rounded-lg" flat>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Stats</th>
            <th v-for="name, index in playersNames" :key="index" class="text-left">
              {{name}}
              <v-chip
                class="ma-2"
                size="x-small"
                @click="removePlayer(name)"
              >
                X
              </v-chip>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="stats, index in headers"
            :key="index"
          >
            <td>{{ th[stats] }}</td>
            <td v-for="player, index in playersStats" :key="index">{{ player.attributes.gameModeStats[gameMode][stats] }}</td>
          </tr>
        </tbody>
      </v-table>
      <span class="ml-4">** Campo desativado da API do PUBG (dados inválidos)</span>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

  export default {
    props: {
      getUsersList: Array
    }, 
    data () {
      return {
        playersStats: this.getUsersList,
        selected: [],
        apiKey: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkODE3YmZmMC1iZGZiLTAxM2ItMWJhNS00ZTllYWE2OTQyZTMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjgxNTkxMjk4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii01NDkxNjQwOS05NGJhLTQ4ZGEtYmI1Mi0wNzQ1YzliYzlkMTkifQ.VK_xmxa15hUFjNLgiA6cabIOAiB6HWlOriWuA35P8ZI",
        headers: ["assists","boosts","dBNOs","dailyKills", "dailyWins","damageDealt","days",
              "headshotKills","heals","killPoints","kills","longestKill","longestTimeSurvived",
              "losses","maxKillStreaks","mostSurvivalTime","rankPoints","rankPointsTitle",
              "revives","rideDistance","roadKills","roundMostKills", "roundsPlayed","suicides",
              "swimDistance","teamKills","timeSurvived","top10s","vehicleDestroys","walkDistance",
               "weaponsAcquired","weeklyKills","weeklyWins","winPoints","wins"],
        th: { assists: "Assistências", boosts: "Biricos usados", dBNOs: "Inimigos derrubados", 
          dailyKills: "Kills do último dia",  dailyWins: "Wins do último dia", damageDealt: "Total de dano", 
          days: "Dias jogados", headshotKills: "Mortes de HS", heals: "Itens de cura usados",  killPoints: "Pontos de kills**",
          kills: "Mortes feitas", longestKill: "Morte mais longa (m)", longestTimeSurvived: "Maior tempo sobrevivido (seg)",
          losses: "Partidas perdidas", maxKillStreaks: "Kills em sequência", mostSurvivalTime: "Tempo sobrevivido", 
          rankPoints: "Rank points**", rankPointsTitle:"Rank points**" , revives: "Revivimentos de colegas", 
          rideDistance: "Total dirigido (m)", roadKills: "Mortes de driveBy", roundMostKills: "Maior número de mortes", 
          roundsPlayed: "Número de partidas jogadas", suicides: "Suicídios", swimDistance: "Distância em nado (m)", 
          teamKills: "Mortes a colegas", timeSurvived: "Tempo total sobrevivido (seg)", top10s: "partidas Top 10", 
          vehicleDestroys: "Veículos destruídos", walkDistance: "Distância a pé (m)", weaponsAcquired: "Armas pegas do chão", 
          weeklyKills: "Mortes da semana", weeklyWins: "Wins da semana", winPoints: "Win Points**", wins: "Total de Wins"
        },
        moreOptions: [
          "duo", "duo-fpp", "solo", "solo-fpp", 
          "squad", "squad-fpp"
        ],
        gameMode: 'solo',
      }
    },
    computed: {
      ...mapMutations(['requests/removePlayerFromList']),

      playersNames() {
        return this.playersStats.map((player) => {
          return player.player.name
        });
      },
      
    },
    methods: {
      removePlayer(name) {
        this.$store.commit('requests/removePlayerFromList', name)
      },

      addPlayersStatsModel() {
        this.playersStats = this.getUsersList
      },
    },

    watch: {
      getUsersList() {
        this.addPlayersStatsModel()
      }
    }
      
  }
</script>