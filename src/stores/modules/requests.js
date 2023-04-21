import axios from 'axios'

const API_KEY = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkODE3YmZmMC1iZGZiLTAxM2ItMWJhNS00ZTllYWE2OTQyZTMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjgxNTkxMjk4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii01NDkxNjQwOS05NGJhLTQ4ZGEtYmI1Mi0wNzQ1YzliYzlkMTkifQ.VK_xmxa15hUFjNLgiA6cabIOAiB6HWlOriWuA35P8ZI"
const auth = {'Content-Type': 'application/json', "Authorization": API_KEY, "Accept": "application/vnd.api+json"}

export default {
  namespaced: true,
  state() {
    return {
      userId: "",
      usersStats: [],
    };
  },

  getters: {
    getUsersId(state) {
      return state.userId;
    },
    getUsersStats(state) {
      return state.usersStats;
    }
  },
  
  mutations: {
    setUsersList(state, userStats) {
      state.usersStats.push(userStats)
    }

  },

  actions: {
    async getUserId(context, userNick) {
      console.log("user");
      let url = `https://api.pubg.com/shards/steam/players?filter[playerNames]=${userNick}`
      await axios.get(url, {headers: auth}, {})
      .then((response) => {
        let user =  response.data.data
        context.dispatch('getUsersStatsLifetimeById', user)
      })
      .catch((response) => {
        console.error("ERRO no getUserId: ", response)
        return false
      })
    },
    async getUsersStatsLifetimeById(context, user) {
      let url = `https://api.pubg.com/shards/steam/players/${user[0].id}/seasons/lifetime`
      await axios.get(url, {headers: auth}, {} )
      .then((response) => {
        let player = response.data.data;
        player.player = user[0].attributes
        context.commit('setUsersList', player)
      })
      .catch((response) => {
        console.error("ERRO no getUsersStatsLifetimeById: ", response)
      })
    }
  }
}