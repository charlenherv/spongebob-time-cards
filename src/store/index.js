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
      { val: 'years' },
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
