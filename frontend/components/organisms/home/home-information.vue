<template>
  <section>
    <h4 class="section-title">
      <span>{{ title }}</span>
    </h4>
    <contents-card>
      <template #header>
        <section-eye-catcher :background-image="eyeCatcherImage">
          {{ eyeCatcherTitle }}
        </section-eye-catcher>
      </template>
      <template #default>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="informationHtml" />
        <div class="home-information-nav">
          <b-button variant="primary" href="#contact">{{ navLabel }}</b-button>
        </div>
      </template>
    </contents-card>
  </section>
</template>

<script lang='ts'>
import { defineComponent, computed } from '@vue/composition-api'
import ContentsCard from '@/components/molecules/contents-card.vue'
import SectionEyeCatcher from '~/components/molecules/section-eye-catcher.vue'

export default defineComponent({
  name: 'HomeInformation',
  components: { ContentsCard, SectionEyeCatcher },
  setup() {
    const title = computed(() => 'Message')

    const eyeCatcherImage = computed(() => 'https://longlivenet.com/static/images/message01.jpg')
    const eyeCatcherTitle = computed(() => 'システムデザインとか IT 活用とか正直どうしてよいかよく解らないんですよ・・')

    // TODO: need sanitize!
    const informationHtml = computed(() => (`
      <p>多くの方よりこのような悩みをご相談をいただいた気がします</p> 
      <p>
      このような悩みを解決するには、その悩みに寄り添い適切な技術をご提供できることが第一です。<br/>
      一方で、お悩みをお持ちの方ご自身や組織自体にも情報技術を正しく知っていただき、自らしっかりと活用できるチカラをある程度養っていただくことも重要です。
      最終的には、これらの技術を自ら楽しんでご活用いただくようになる事が、長期継続的な悩みの解決に繋がるものと考えます。
      </p>
      <p>
      皆様のシステム開発やクラウド導入を行いつつ、お客様ご自身や組織のチカラを向上するお手伝いができればという想いからロングリブネットを立ち上げました。<br/>
      どうぞ長い目でお付き合い頂けますと幸いです。
      </p>
      <p>ロングリブネット<br>長住 直樹（ナガズミ ナオキ）</p>
    `))

    const navLabel = 'お問い合せ'

    return {
      title,
      eyeCatcherImage,
      eyeCatcherTitle,
      informationHtml,
      navLabel
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.section-title {
  @include index-section-title;
}

.home-information-nav {
  text-align: center;
  margin-top: 1.5em;
}
</style>
