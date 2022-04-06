<script setup>
import UserListItem from './UserListItem.vue'
import {useStore} from 'vuex';
import {computed, ref} from 'vue';

const store = useStore()

const onScroll = ({ target: { scrollTop, clientHeight, scrollHeight }}) => {
  if (scrollTop + clientHeight >= scrollHeight) {
    store.commit('addShowedItems')
  }
}

const getData = computed(() => store.getters.getData)
</script>

<template>
  <div class="user-list" @scroll="onScroll">
    <user-list-item v-for="(item, index) in getData" :user="item" :key="index" />
  </div>
</template>

<style lang="scss">
.user-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 40px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 60vh;
  padding-right: 12px;
  padding-top: 1px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.16);
    border-left: 1.5px solid transparent;
    border-right: 1.5px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb {
    background: #4D4D4D;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
