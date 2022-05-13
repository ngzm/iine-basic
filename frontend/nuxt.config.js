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
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

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
  css: ['@/assets/scss/style.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/axios.js'],

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
    'vue2-editor/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL || 'http://locahost:3000',
  },

  // Auth with Auth0
  auth: {
    cookie: false,
    redirect: {
      callback: false,
      login: '/auth/logout',
      logout: '/auth/logout',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          maxAge: 60 * 60 * 12,
        },
        endpoints: {
          login: {
            url: '/auth/customer-user',
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url: '/auth/customer-user',
            method: 'delete',
          },
          user: {
            url: '/auth/customer-user',
            method: 'get',
          },
        },
      },
    },
  },

  // BootstrapVUe icons
  bootstrapVue: {
    icons: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
