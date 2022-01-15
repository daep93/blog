<template>
  <transition
    enter-class="-translate-x-full"
    enter-active-class="transition duration-300"
    enter-to-class="translate-x-0"
    leave-class="translate-x-0"
    leave-active-class="transition duration-700"
    leave-to-class="-translate-x-full"
  >
    <div class="fixed h-screen w-screen bg-transparent z-10 flex">
      <div class="w-[300px] border-r-2 border-slate-200 bg-white">divskdkd ddsdssdsdsdssd</div>
      <div class="grow" @click="closeDrawer"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  readonly drawerOpened = false;

  closeDrawer() {
    this.$emit('close');
  }
}
</script>

<style scoped>
.bg-transparent {
  background-color: transparent;
}
</style>
