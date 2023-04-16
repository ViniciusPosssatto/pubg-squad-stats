// import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

const API_KEY = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkODE3YmZmMC1iZGZiLTAxM2ItMWJhNS00ZTllYWE2OTQyZTMiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjgxNTkxMjk4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii01NDkxNjQwOS05NGJhLTQ4ZGEtYmI1Mi0wNzQ1YzliYzlkMTkifQ.VK_xmxa15hUFjNLgiA6cabIOAiB6HWlOriWuA35P8ZI"

export const pubgRequests = defineStore('pubgRequests', {
  state: () => ({
    
    stats: [],
    
  }),
  mutations: {},
  actions: {
    async getUserId(userNick) {
      let url = `https://api.pubg.com/shards/steam/players?filter[playerNames]=${userNick}`
      let auth = {'Content-Type': 'application/json', "Authorization": API_KEY, "Accept": "application/vnd.api+json"}
      await axios.get(url, {headers: auth}, {} )
      .then((response) => {
        this.stats.push(response.data.data);
      })
      .catch((response) => {
        console.error("DEU ERROOOO", response)
      })
  },
  }
  
})
