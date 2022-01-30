<template>
  <section>
    <h4 class="section-title">
      <span>Contact</span>
    </h4>
    <contents-card no-footer>
      <template #header>
        <section-eye-catcher :background-image="contact.image">
          <template #default>
            {{ contact.title }}
          </template>
          <template #subtitle>
            {{ contact.subtitle }}
          </template>
        </section-eye-catcher>
      </template>
      <template #default>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="contact.body" />
        <div class="home-contact-nav">
          <b-button variant="primary" href="/contact">メールでのお問い合せ（お問い合せフォーム）</b-button>
        </div>
      </template>
    </contents-card>
  </section>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@vue/composition-api'
import { ContactType } from '@/types/content-type'
import ContentsCard from '@/components/molecules/contents-card.vue'
import SectionEyeCatcher from '~/components/molecules/section-eye-catcher.vue'

export default defineComponent({
  name: 'LongLivenetHomeContact',
  components: { ContentsCard, SectionEyeCatcher },
  props: {
    contact: {
      type: Object as PropType<ContactType>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.section-title {
  @include index-section-title;
}

.home-contact-nav {
  margin-top: 1.5rem;
}
</style>
