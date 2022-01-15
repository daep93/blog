<template>
  <div class="pb-6 pt-10 flex flex-col justify-between min-h-[100%]">
    <h1 class="banner-text text-3xl text-center py-4 text-white">Daehyun's Blog</h1>
    <ul class="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
      <li
        v-for="(abstract, index) in abstractList"
        :key="index"
        class="border-2 border-slate-600 h-[320px] bg-white flex flex-col transition hover:shadow-xl duration-300 translate cursor-pointer"
      >
        <img
          class="h-1/2 object-cover border-b-2 border-slate-200"
          alt="image"
          :src="abstract.thumbnail"
        />
        <div class="grow px-4">
          <h1 class="font-semibold whitespace-nowrap overflow-hidden text-ellipsis py-2">
            {{ abstract.title }}
          </h1>
          <p class="line-clamp-3 text-slate-600">{{ abstract.description }}</p>
        </div>
        <div class="border-t-2 border-slate-200 text-right font-thin text-slate-500 px-4 py-1">
          {{ $_formatDate(abstract.createdAt) }}
        </div>
      </li>
    </ul>
    <ul class="flex justify-center">
      <li
        v-for="(pos, index) in totalSizeOfIndex"
        :key="index"
        class="border-2 hover:border-blue-300 border-slate-200 px-3 py-1 cursor-pointer hover:bg-blue-300 hover:text-white duration-200 ease-in-out rounded"
        :class="getPaginationStyle(pos)"
      >
        {{ pos }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  layout: 'home',
})
export default class extends Vue {
  private abstractList: FetchReturn[] = [];
  private curPos = 1;
  private readonly ABSTRACT_UNIT = 10;
  private totalSizeOfIndex = Math.ceil(
    this.$accessor.article.totalSizeOfArticles / this.ABSTRACT_UNIT
  );

  getPaginationStyle(pos: number) {
    const isCurPos = this.curPos === pos;
    return {
      'border-blue-300': isCurPos,
      'bg-blue-300': isCurPos,
      'text-white': isCurPos,
      'cursor-not-allowed': isCurPos,
    };
  }

  async loadAbstractList() {
    const skipAmount = (this.curPos - 1) * this.ABSTRACT_UNIT;
    const limitAmount = this.ABSTRACT_UNIT;
    this.abstractList = (await this.$content('articles', { deep: true })
      .sortBy('createdAt', 'desc')
      .skip(skipAmount)
      .limit(limitAmount)
      .fetch()) as FetchReturn[];
  }

  async created() {
    try {
      await this.loadAbstractList();
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scoped>
.banner-text {
  font-family: 'Hahmlet-ExtraBold';
}
.translate:hover {
  transform: translateY(-0.5rem);
}
</style>
