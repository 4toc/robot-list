<script setup>
import {computed, ref} from 'vue';

import MarkedText from './MarkedText.vue'
import {useStore} from 'vuex';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})
const store = useStore()

const search = computed(() => store.state.search)

const isSelected = ref(false)

const clickButton = () => {
  isSelected.value = !isSelected.value
}
</script>

<template>
  <div class="user-list-item" :class="{'user-list-item--selected': isSelected}">
    <div class="user-list-item__image">
      <img :src="props.user.avatar" alt="">
    </div>
    <div class="user-list-item__text">
      <div class="user-list-item__info">
        <div class="user-list-item__info-top">
          <h6 class="user-list-item__name"><marked-text :text="props.user.name" :search="search" /></h6>
          <div class="user-list-item__email"><marked-text :text="props.user.email" :search="search" /></div>
        </div>
        <div class="user-list-item__job"><marked-text :text="props.user.title" :search="search" /></div>
        <div class="user-list-item__address"><marked-text :text="props.user.address" :search="search" /></div>
      </div>
      <div class="user-list-item__button"
           :class="{'user-list-item__button--selected': isSelected}"
           @click="clickButton">
        <span v-if="isSelected" class="user-list-item__button-inner">Skip selection</span>
        <span v-else class="user-list-item__button-inner">Mark as Siutable</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "src/assets/scss/mixins";

.user-list-item {
  height: 136px;
  width: 100%;
  display: flex;
  background: #FAFAFA;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: 3px;
  margin-left: 1px;

  &--selected {
    outline: 1px solid rgba(71, 101, 255, 1);
  }

  &__image {
    width: 136px;
    height: 136px;
    background: palegoldenrod;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 3px 0 0 3px;

    @include phone {
      width: 30px;
      height: 30px;
      margin-top: 16px;
      margin-left: 10px;
    }

    img {
      height: 100%;
      width: 100%;
    }
  }

  &__text {
    flex-grow: 1;
  }

  &__info {
    padding-left: 27px;
    padding-right: 9px;

    @include phone {
      padding-left: 10px;
    }
  }

  &__info-top {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  &__name {
    margin: 0;
    font-size: 24px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.87);
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @include phone {
      font-size: 20px;
      max-width: 190px;
    }
  }

  &__email {
    color: rgba(0, 0, 0, 0.54);
    font-size: 14px;
    line-height: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 130px;

    @include phone {
      max-width: 100px;
    }
  }

  &__job {
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.54);
    font-weight: 700;
  }

  &__address {
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.54);
    margin-bottom: 2px;
  }

  &__button {
    height: 50px;
    display: flex;
    align-items: center;
    color: #009688;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 500;
    border-top: 1px solid rgba(0, 0, 0, 0.12);

    &:hover {
      cursor: pointer;
    }
  }

  &__button--selected {
    border-top: 1px solid transparent;
  }

  &__button-inner {
    padding-left: 32px;
    width: 138px;
    text-align: center;
  }
}
</style>
