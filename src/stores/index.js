import { createStore } from "vuex"
import requests from "./modules/requests"

const store = createStore({
  modules: {
    requests,
  }
})

export default store;