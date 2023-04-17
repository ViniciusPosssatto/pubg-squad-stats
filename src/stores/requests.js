import axios from 'axios'

const API_KEY = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkODE3YmZmMC1iZGZiLTAxM2ItMWJhNS00ZTllYWE2OTQyZTMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjgxNTkxMjk4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii01NDkxNjQwOS05NGJhLTQ4ZGEtYmI1Mi0wNzQ1YzliYzlkMTkifQ.VK_xmxa15hUFjNLgiA6cabIOAiB6HWlOriWuA35P8ZI"
const auth = {'Content-Type': 'application/json', "Authorization": API_KEY, "Accept": "application/vnd.api+json"}

const requests = {
  namespaced: true,
  state: () => ({
    userId: "",
    usersStats: [],
  }),

  getters: {
    getUserId: state => {
      return state.userId;
    },
    getUsersStats: state => {
      return state.usersStats;
    }
  },
  
  mutations: {
    setUsersList(state, userStats) {
      state.usersStats.push(userStats)
    }

  },

  actions: {
    async getUserId({commit}, userNick) {
      let url = `https://api.pubg.com/shards/steam/players?filter[playerNames]=${userNick}`
      await axios.get(url, {headers: auth}, {} )
      .then((response) => {
        let user =  response.data.data
        commit('getUsersStatsLifetimeById', user)
        console.log(user)
      })
      .catch((response) => {
        console.error("ERRO no getUserId: ", response)
      })
    },
    async getUsersStatsLifetimeById({commit}, user) {
      let url = `https://api.pubg.com/shards/steam/players/${user[0].id}/seasons/lifetime`
      await axios.get(url, {headers: auth}, {} )
      .then((response) => {
        let player = response.data.data;
        player[0].attributes = user.attributes
        commit('setUsersList', player)
        console.log(player)
      })
      .catch((response) => {
        console.error("ERRO no getUsersStatsLifetimeById: ", response)
      })
    }
  }
}
  
export default { requests }
