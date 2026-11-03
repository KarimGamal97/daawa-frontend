export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        },
      ],
    },
  },

  tailwindcss: {
    cssPath: '~/styles/main.css',
    config: {
      darkMode: 'class',
      content: [
        './app/**/*.{vue,js,ts}',
      ],
    },
  },

  i18n: {
    locales: [
      { code: 'ar', name: 'العربية', file: 'ar.ts', dir: 'rtl' },
      { code: 'en', name: 'English', file: 'en.ts', dir: 'ltr' }
    ],
    lazy: false,
    langDir: 'locales',
    defaultLocale: 'ar',
    strategy: 'prefix_except_default',
  },
  devtools: { enabled: true },
})
