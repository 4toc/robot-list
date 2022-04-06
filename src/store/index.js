import {createStore} from 'vuex';
import axios from 'axios'

const store = createStore({
  state: {
    search: '',
    fullData: [],
    counterShowedItems: 15,
  },
  getters: {
    getData(state) {
      const array = state.fullData.slice(0,state.counterShowedItems)
      if (state.search.length) {
        const findingReg = new RegExp('(' + state.search + ')','i')
        return array.filter(user => {
          if (user.name.match(findingReg) ||
              user.title.match(findingReg) ||
              user.address.match(findingReg) ||
              user.email.match(findingReg)) {
            return true
          }
          return false
        })
      }
      return array
    }
  },
  mutations: {
    setSearch(state, value) {
      state.search = value
    },
    setData(state, value) {
      state.fullData = value
    },
    addShowedItems(state) {
      state.counterShowedItems = state.counterShowedItems + 15 > state.fullData.length
        ? state.fullData.length
        : state.counterShowedItems + 15
    }
  },
  actions: {
    fetchData(context) {
      axios.get('https://gist.githubusercontent.com/allaud/093aa499998b7843bb10b44ea6ea02dc/raw/c400744999bf4b308f67807729a6635ced0c8644/users.json').then(data => {
        context.commit('setData', data.data)
      })
    }
  }
})

export default store
