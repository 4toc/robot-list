<script setup>
import UserListItem from './UserListItem.vue'
import {useStore} from 'vuex';
import {computed, onMounted, ref} from 'vue';

const store = useStore()

const rowHeight = 156 // in pixels
const rowGapHeight = 20
const scrollTop = ref(0)
const rootRef = ref(null)
const rootHeight = ref(400)

const getData = computed(() => store.getters.getData)

const viewportHeight = computed(() => {
  return rowHeight * getData.value.length
})

const startIndex = computed(() => {
  let startNode = Math.floor(scrollTop.value / rowHeight) - rowGapHeight
  return Math.max(0, startNode)
})

const visibleNodeCount = computed(() => {
  let count = Math.ceil(rootHeight.value / rowHeight) + 2 * rowGapHeight
  return Math.min(getData.value.length - startIndex.value, count)
})

const visibleItems = computed(() => {
  return getData.value.slice(startIndex.value, startIndex.value + visibleNodeCount.value)
})

const offsetY = computed(() => {
  return startIndex.value * rowHeight
})

const spacerStyle = computed(() => {
  return {
    transform: "translateY(" + offsetY.value + "px)"
  }
})

const viewportStyle = computed(() => {
  return {
    height: viewportHeight.value + "px",
    position: "relative"
  }
})
const rootStyle = computed(() => {
  return {
    height: rootHeight.value + "px",
  }
})

const onScroll = ({ target }) => {
  scrollTop.value = target.scrollTop
}

onMounted(() => {
  rootHeight.value = rootRef.value.clientHeight
})
</script>

<template>
  <div class="user-list" ref="rootRef" :style="rootStyle" @scroll="onScroll">
    <div class="user-list__viewport" :style="viewportStyle" ref="viewportRef">
      <div class="user-list__spacer" :style="spacerStyle">
        <user-list-item v-for="(item, index) in visibleItems" :user="item" :key="index" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.user-list {
  padding-bottom: 40px;
  height: 60vh;
  padding-right: 12px;
  padding-top: 1px;

  overflow-y: scroll;
  overflow-x: hidden;

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

  &__spacer {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
