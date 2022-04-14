import {createStore} from 'vuex';
import axios from 'axios'
import findIndexWord from "../utils/findIndexWord";

const store = createStore({
  state: {
    search: '',
    fullData: [],
    counterShowedItems: 15,
    stepItemsScroll: 15,
    searchData: [],
  },
  getters: {
    getData(state) {
      if (state.search.length) {
        return state.searchData.slice(0, state.counterShowedItems)
      } else {
        return state.fullData.slice(0, state.counterShowedItems)
      }
    }
  },
  mutations: {
    setSearch(state, value) {
      state.search = value
    },
    filterSearchData(state) {
      if (state.search.length) {
        const searchLowerCase = state.search.toLowerCase()
        state.searchData = state.fullData.filter(user => {
          if (findIndexWord(user.name, searchLowerCase) ||
              findIndexWord(user.title, searchLowerCase) ||
              findIndexWord(user.address, searchLowerCase) ||
              findIndexWord(user.email, searchLowerCase)) {
            return true
          }
          return false
        })
      }
    },
    setData(state, value) {
      state.fullData = value
    },
    addShowedItems(state) {
      state.counterShowedItems = state.counterShowedItems + state.stepItemsScroll > state.fullData.length
        ? state.fullData.length
        : state.counterShowedItems + state.stepItemsScroll
    }
  },
  actions: {
    fetchData(context) {
      axios.get('https://gist.githubusercontent.com/allaud/093aa499998b7843bb10b44ea6ea02dc/raw/c400744999bf4b308f67807729a6635ced0c8644/users.json').then(data => {
        context.commit('setData', data.data)
        context.commit('filterSearchData')
      })
    }
  }
})

export default store
