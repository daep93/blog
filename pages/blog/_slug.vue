<template>
  <article class="article prose lg:prose-xl">
    <header class="article-header">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <div class="details-cont">
        <span>{{ formatDate(article.updatedAt) }}</span>
      </div>
    </header>

    <nuxt-content :document="article" />
  </article>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  async asyncData({ $content, params }: Context) {
    const [subPath, fileName] = params.slug.split('_') as [string, string];
    const article = await $content(`articles/${subPath}`, fileName).fetch();
    return { article };
  },
})
export default class extends Vue {
  formatDate(date: Date) {
    return new Date(date).toLocaleDateString('ko-kr', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
</script>
<style lang="postcss" scoped>
.article {
  @apply prose lg:prose-xl;
  @apply p-4 mt-6 lg:mt-8 m-auto lg:max-w-3xl;
}

.article-header {
  @apply mb-12 pb-8 lg:mb-16 border-gray-200 border-b-2;
}

.article-header h1 {
  @apply mb-0;
}

.article-header .details-cont span {
  @apply text-opacity-50 text-sm;
}
</style>
