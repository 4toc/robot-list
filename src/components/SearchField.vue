<script setup>
import {useStore} from 'vuex'
import {computed, onMounted} from 'vue';
import {useRouter, useRoute} from 'vue-router'
import debounce from "lodash/debounce"

const store = useStore()
const router = useRouter()
const route = useRoute()
const query = computed(() => route.query)
const search = computed(() => store.state.search)

const  changeSearch = debounce((event) => {
  store.commit('setSearch', event.target.value)
  store.commit('filterSearchData')
  router.push({
    path: '/',
    query: {search: encodeURIComponent(search.value)}
  })
}, 200)

onMounted(async () => {
  await router.isReady()
  if (query.value.search) {
    store.commit('setSearch', decodeURIComponent(query.value.search))
  }
})

</script>

<template>
  <div class="search-field">
    <label for="search-input" class="search-field__icon">
      <img src="@/assets/icons/search-icon.svg">
    </label>
    <input class="search-field__input"
           id="search-input"
           type="text"
           placeholder="Search"
           :value="search"
           @input="changeSearch"
    >
  </div>
</template>

<style lang="scss">
.search-field {
  width: 100%;
  position: relative;
  margin-bottom: 20px;

  &__icon {
    position: absolute;
    left: 19px;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 17px;
    width: 17px;

    &:hover {
      cursor: text;
    }
  }

  &__input {
    width: 100%;
    height: 48px;
    padding-right: 15px;
    padding-left: 50px;
    box-sizing: border-box;
    background: #FFFFFF;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
    border-radius: 2px;
    border: none;
    font-size: 24px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.75);

    &:focus {
      border: none;
      outline: none;
      background: #FAFAFA;
    }

    &:hover {
      background: #FAFAFA;
    }
  }
}
</style>
