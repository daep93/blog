import { getAccessorType } from 'typed-vuex';
import * as article from './article';

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  modules: {
    // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
    article,
  },
});
