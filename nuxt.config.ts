export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '~/assets/nuxtui.css',
    '~/assets/base.css'
  ],
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-svgo'
  ],
  baseURL: '/anime-nuxt/',
  nitro: {
    preset: 'static'
  }
})
