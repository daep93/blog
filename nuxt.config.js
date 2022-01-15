import tailwindTypography from '@tailwindcss/typography';
import taliwindLineClamp from '@tailwindcss/line-clamp';
const config = () => ({
  target: 'static',
  generate: { dir: 'docs' },
  head: {
    title: 'nuxt-blog',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['@/assets/css/tailwind.css'],

  plugins: ['@/plugins/filters.ts'],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxt/postcss8',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-typed-vuex',
  ],
  googleFonts: {
    families: {
      Roboto: true,
    },
  },
  modules: ['@nuxtjs/axios', '@nuxt/content'],

  axios: {
    baseURL: '/',
  },

  content: {},

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  tailwindcss: {
    config: {
      plugins: [tailwindTypography, taliwindLineClamp],
    },
  },
});
export default config;
