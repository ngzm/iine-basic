<template>
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
        <b-button variant="primary" href="/contact">{{ navLabel }}</b-button>
      </div>
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed } from '@nuxtjs/composition-api'
import { ContactType } from '@/types/content-type'
import ContentsCard from '@/components/molecules/contents-card.vue'
import SectionEyeCatcher from '~/components/molecules/section-eye-catcher.vue'

export default defineComponent({
  name: 'Type1Contact',
  components: { ContentsCard, SectionEyeCatcher },
  props: {
    contact: {
      type: Object as PropType<ContactType>,
      required: true
    }
  },
  setup(props) {
    // TODO: need sanitize!
    const contactBody = computed(() => props.contact.body)
    const navLabel = 'メールでのお問い合せ（お問い合せフォーム）'

    return {
      navLabel,
      contactBody,
    }
  }
})
</script>

<style lang="scss" scoped>
.home-contact-nav {
  margin-top: 1.5rem;
}
</style>
