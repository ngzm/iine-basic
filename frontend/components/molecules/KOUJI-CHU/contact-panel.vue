<template>
  <div class="contact-panel">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="contactBody" />
    <!-- <div class="contact-panel__form-activator">
      <b-button variant="primary" @click="contactFormModal = !contactFormModal">
        {{ formActivatorLabel }}
      </b-button>
    </div> -->
    <b-modal
      v-model="contactFormModal"
      title="お問い合せフォーム"
      size="lg"
      centered
      hide-footer
    >
      <contact-form @close="contactFormModal = false" />
    </b-modal>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, ref } from '@nuxtjs/composition-api'
import { ContactType } from '@/types/content-type'
import ContactForm from '@/components/molecules/contact-form.vue'

export default defineComponent({
  name: 'ContactPanel',
  components: { ContactForm },
  props: {
    contact: {
      type: Object as PropType<ContactType>,
      required: true
    },
    formActivatorLabel: {
      type: String,
      default: 'メールでのお問い合せ'
    },
  },
  setup(props) {
    const contactFormModal = ref(false)

    // TODO: need sanitize!
    const contactBody = computed(() => props.contact.body)

    return {
      contactFormModal,
      contactBody,
    }
  }
})
</script>

<style lang="scss" scoped>
.contact-panel {
  &__form-activator {
    margin-top: 1.5rem;
  }
}
</style>
