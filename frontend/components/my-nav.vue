<template>
  <div>
    <header>
      <div>
        <div>
          <h1>
            <nuxt-link to="/">Nuxt Cafe</nuxt-link>
          </h1>
          <div>
            <!-- TODO: ハンバーガーメニュー実装 -->
          </div>
        </div>
        <nav>
          <ul>
            <li>
              <nuxt-link to="/shop">店舗情報</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/menu">メニュー</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/information">お知らせ</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MyNav',
  setup() {
    return {}
  },
})
</script>
