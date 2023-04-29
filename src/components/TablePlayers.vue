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
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="stats, index in headers"
            :key="index"
          >
            <td>{{ stats }}</td>
            <td v-for="player, index in getUsersList" :key="index">{{ player.attributes.gameModeStats[gameMode][stats] }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

// import axios from 'axios'
// import { mapActions } from 'vuex';
  export default {
    data () {
      return {
        playersStats: [],
        selected: [],
        apiKey: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkODE3YmZmMC1iZGZiLTAxM2ItMWJhNS00ZTllYWE2OTQyZTMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjgxNTkxMjk4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii01NDkxNjQwOS05NGJhLTQ4ZGEtYmI1Mi0wNzQ1YzliYzlkMTkifQ.VK_xmxa15hUFjNLgiA6cabIOAiB6HWlOriWuA35P8ZI",
        headers: ["assists","boosts","dBNOs","dailyKills", "dailyWins","damageDealt","days",
              "headshotKills","heals","killPoints","kills","longestKill","longestTimeSurvived",
              "losses","maxKillStreaks","mostSurvivalTime","rankPoints","rankPointsTitle",
              "revives","rideDistance","roadKills","roundMostKills", "roundsPlayed","suicides",
              "swimDistance","teamKills","timeSurvived","top10s","vehicleDestroys","walkDistance",
               "weaponsAcquired","weeklyKills","weeklyWins","winPoints","wins"],
        th: [],
        moreOptions: [
          "duo", "duo-fpp", "solo", "solo-fpp", 
          "squad", "squad-fpp"
        ],
        gameMode: 'solo',
      }
    },
    computed: {
      ...mapGetters(['requests/getUsersStats']),

      getUsersList(){
        return this["requests/getUsersStats"]
      },
      getAll() {
        return this.players
      },
      playersNames() {
        return this.getUsersList.map((player) => {
          return player.player.name
        });
      },
      translateStats(stats) {
        let tranlateStats = { assists: "Assistência", boosts: "Biricos usados", dBNOs: "Inimidos derrubados", 
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
        }
        
        return tranlateStats[stats]
      },
    },
    methods: {
      playerStatsByGameMode(gameMode) {
        if (gameMode === "solo") {
          return this.getUsersList.map((player) => {
            return player.attributes.gameModeStats.solo
          });
        }
        else if (gameMode === "solo-fpp") {
          return this.getUsersList.map((player) => {
            return player.attributes.gameModeStats['solo-fpp']
          });
        }
        else if (gameMode === "duo") {
          return this.getUsersList.map((player) => {
            return player.attributes.gameModeStats.duo
          });
        }
        else if (gameMode === "duo-fpp") {
          return this.getUsersList.map((player) => {
            return player.attributes.gameModeStats["duo-fpp"]
          });
        }
        else if (gameMode === "squad") {
          return this.getUsersList.map((player) => {
            return player.attributes.gameModeStats.squad
          });
        }
        else if (gameMode === "squad-fpp") {
          return this.getUsersList.map((player) => {
            return player.attributes.gameModeStats["squad-fpp"]
          });
        }
        return ''
      }
    },

    watch: {}
      
    }
</script>