<template>
  <div class="min-h-screen relative">
    <div
      class="thumbnail bg-cover bg-[url('../img/home-background3.png')] h-[300px] top-0 left-0 right-0 absolute w-full z-0 after:inset-[0px,_0px_,auto] after:linear-gradient(rgba(0, 0, 0, 0.15), rgb(255, 255, 255))"
    />
    <div
      class="h-screen grid lg:grid-cols-[17%_1fr_17%] grid-rows-[50px_1fr_50px] z-10 absolute top-0 left-0 right-0"
    >
      <div class="hidden lg:block"></div>
      <header class="flex justify-between col-span-3 lg:col-span-1 px-4">
        <div>
          <img
            class="w-[25px] inline cursor-pointer"
            src="../assets/img/solid_bar_white.svg"
            @click="toggleDrawer"
          />
          <span class="leading-[50px] text-white logo-text">daep93</span>
        </div>
        <div class="leading-[50px]">찾기</div>
      </header>
      <div class="hidden lg:block"></div>

      <div class="hidden lg:block"></div>
      <main class="px-4 col-span-3 lg:col-span-1">
        <nuxt />
      </main>
      <div class="hidden lg:block"></div>

      <footer class="col-span-3 px-4 border-t-2 border-slate-200"></footer>
    </div>
    <MenuDrawer v-show="drawerOpened" @close="toggleDrawer" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuDrawer from '@/components/MenuDrawer.vue';
@Component({
  components: { MenuDrawer },
})
export default class extends Vue {
  private drawerOpened = false;
  async created() {
    await this.$accessor.article.initTotalSizeOfArticles();
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }
}
</script>

<style scoped>
.thumbnail::after {
  content: '';
  position: absolute;
  inset: 0px 0px auto;
  z-index: 5;
  display: block;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.15), rgb(255, 255, 255));
}
.logo-text {
  font-family: 'Hahmlet-ExtraBold';
}
</style>
