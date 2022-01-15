import { Inject, NuxtApp } from '@nuxt/types/app';

export default ({ app }: { app: NuxtApp }, inject: Inject) => {
  inject('_formatDate', (date: Date) =>
    new Date(date).toLocaleDateString('ko-kr', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  );
};
