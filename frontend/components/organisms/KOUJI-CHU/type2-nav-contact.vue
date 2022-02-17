<template>
  <contents-card-info
    :header-image="contact.image"
    class="nav-contact"
  >
    <template #default>
      <div class="nav-contact__wrap">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="nav-contact__body" v-html="contactBody" />

        <div class="nav-contact__activator">
          <b-button
            pill
            variant="warning"
            @click="contactFormModal = !contactFormModal"
          >
            <b-icon icon="pencil" />
            メールで問い合せる
          </b-button>
        </div>
      </div>

      <b-modal
        v-model="contactFormModal"
        title="お問い合せフォーム"
        size="lg"
        centered
        hide-footer
      >
        <contact-form @close="contactFormModal = false" />
      </b-modal>
    </template>
  </contents-card-info>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, computed } from '@nuxtjs/composition-api'
import { ContactType } from '@/types/content-type'
import ContentsCardInfo from '~/components/molecules/KOUJI-CHU/contents-card-info.vue'
import ContactForm from '@/components/molecules/contact-form.vue'
// import SectionEyeCatcher from '~/components/molecules/section-eye-catcher.vue'

export default defineComponent({
  name: 'Type2NavContact',
  components: {
    ContactForm,
    ContentsCardInfo,
    // SectionEyeCatcher 
  },
  props: {
    contact: {
      type: Object as PropType<ContactType>,
      required: true
    }
  },
  setup(props) {
    const contactFormModal = ref(false)

    // TODO: need sanitize!
    const contactBody = computed(() => props.contact.body)

    return {
      contactFormModal,
      contactBody
    }
  }
})
</script>

<style lang="scss" scoped>
.nav-contact {
  &__body {
    margin-top: 1rem;
  }
  &__activator {
    margin-top: 1rem;
  }
}
</style>
