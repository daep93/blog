import { FetchReturn } from '@nuxt/content/types/query-builder';
import { mutationTree, actionTree } from 'typed-vuex';

export const state = () => ({
  totalSizeOfArticles: 0,
});

export const mutations = mutationTree(state, {
  setTotalSizeOfArticles(state, totalSizeOfArticles) {
    state.totalSizeOfArticles = totalSizeOfArticles;
  },
});

export const actions = actionTree(
  { state, mutations },
  {
    async initTotalSizeOfArticles({ commit }) {
      try {
        const articles = (await this.$content('articles', { deep: true })
          .only(['title'])
          .fetch()) as FetchReturn[];
        commit('setTotalSizeOfArticles', articles.length);
      } catch (error) {
        console.error(error);
      }
    },
  }
);
