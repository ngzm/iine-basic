export default {
  // Nuxt environments
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://locahost:3000',
    auth0: {
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
    },
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'iine-t',
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    ['vue-scrollto/nuxt', { duration: 600 }],
    "vue2-editor/nuxt",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'process.env.API_ENDPOINT_URL',
    baseURL: process.env.BASE_URL || 'http://locahost:3000',
  },

  // Auth with Auth0
  auth: {
    // cookie: false,
    redirect: {
      login: '/auth/login',
      logout: '/auth/logout',
      callback: '/auth/callback',
      home: '/',
    },
    strategies: {
      auth0: {
        domain: 'lln-jiman.us.auth0.com',
        clientId: 'kjxl4Va7cAMra4qyfcvbl4mGJIUndrjq',
        // audience: 'https://lln-jiman.us.auth0.com',
        // scope: ['openid', 'profile', 'email', 'offline_access'],
        // responseType: 'token id_token',
        // grantType: 'implicit',
        // codeChallengeMethod: 'S256',
      },
    },
  },

  // BootstrapVUe icons
  bootstrapVue: {
    icons: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
