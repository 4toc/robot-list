<script setup>
import SearchField from './SearchField.vue'
import UserList from './UserList.vue'

import {useStore} from 'vuex';
import {onMounted} from 'vue';

const store = useStore()

onMounted(() => {
  store.dispatch('fetchData')
})
</script>

<template>
  <div class="main-page">
    <search-field />
    <user-list />
  </div>
</template>

<style lang="scss">
@import "src/assets/scss/mixins";

.main-page {
  width: 100%;
  max-width: 564px;
  margin: 54px auto;
  background: #FFFFFF;
  padding: 19px 12px 0;

  @include phone {
    width: unset;
  }
}
</style>
