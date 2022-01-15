<template>
  <div class="min-h-screen relative">
    <div
      class="h-screen grid lg:grid-cols-[17%_1fr_17%] grid-rows-[50px_1fr_50px] z-10 absolute top-0 left-0 right-0"
    >
      <div class="hidden lg:block border-b-2 border-slate-200"></div>
      <header
        class="flex justify-between col-span-3 lg:col-span-1 px-4 border-b-2 border-slate-200"
      >
        <div>
          <img class="w-[25px] inline" src="../assets/img/solid_bar.svg" />
          <span class="leading-[50px]">daep93</span>
        </div>
        <div class="leading-[50px]">찾기</div>
      </header>
      <div class="hidden lg:block border-b-2 border-slate-200"></div>

      <div class="hidden lg:block"></div>
      <main class="px-4 col-span-3 lg:col-span-1">
        <nuxt />
      </main>
      <div class="hidden lg:block"></div>

      <footer class="col-span-3 px-4 border-t-2 border-slate-200"></footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  async created() {
    await this.$accessor.article.initTotalSizeOfArticles();
  }
}
</script>
