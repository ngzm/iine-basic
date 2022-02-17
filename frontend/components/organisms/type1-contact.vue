<template>
  <contents-card>
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
      <div v-html="contactBody" />
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ContactType } from '@/types/content-type'
import ContentsCard from '@/components/molecules/contents-card.vue'
import SectionEyeCatcher from '~/components/molecules/section-eye-catcher.vue'

export default defineComponent({
  name: 'Type1Contact',
  components: {
    ContentsCard,
    SectionEyeCatcher,
  },
  props: {
    contact: {
      type: Object as PropType<ContactType>,
      required: true
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
