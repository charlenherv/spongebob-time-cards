import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    backgrounds: [],
    units: [
      { val: 'seconds' },
      { val: 'minutes' },
      { val: 'hours' },
      { val: 'days' },
      { val: 'weeks' },
      { val: 'fortnites' },
      { val: 'months' },
      { val: 'years' },
      { val: 'decades' },
      { val: 'centuries' },
      { val: 'eternities' },
      /*{ 
        val: 'oftears',
        label: 'of Tears'
      }*/
    ]
  },
  mutations: {
    setBackgrounds(state, backgrounds) {
      state.backgrounds = backgrounds
    }
  },
  actions: {
    getBackgrounds({ commit }) {
      axios.get('/getBackgrounds')
          .then(response => {
              commit('setBackgrounds', response.data)
      })
    }
  },
  modules: {
  }
})
