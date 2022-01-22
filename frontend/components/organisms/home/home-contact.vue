<template>
  <section id="home-contact-section">
    <section-title>Contact</section-title>
    <contents-card no-footer>
      <template #header>
        <section-eye-catcher background-image="https://longlivenet.com/static/images/contact01.jpg">
          <template #default>
            ご連絡はこちらまで
          </template>
          <template #subtitle>
            お気軽にご相談ください
          </template>
        </section-eye-catcher>
      </template>
      <template #default>
        <div>
          <p>
            〒210-0007<br />
            神奈川県川崎市川崎区駅前本町11番地2 川崎フロンティアビル4階<br />
            ロングリブネット 長住直樹
          </p>
          <p>
            TEL: 050-5241-3096<br />
            URL: https://www.longlivenet.com/
          </p>
        </div>
        <div class="home-contact-nav">
          <b-button variant="primary" href="/contact">メールでのお問い合せ（お問い合せフォーム）</b-button>
        </div>
      </template>
    </contents-card>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api'
import ContentsCard from '@/components/molecules/contents-card.vue'
import SectionTitle from '~/components/molecules/section-title.vue'
import SectionEyeCatcher from '~/components/molecules/section-eye-catcher.vue'

export default defineComponent({
  name: 'HomeContact',
  components: {
    ContentsCard,
    SectionTitle,
    SectionEyeCatcher
  },
})
</script>

<style lang="scss" scoped>
.home-contact-nav {
  margin-top: 1.5em;
}
</style>
