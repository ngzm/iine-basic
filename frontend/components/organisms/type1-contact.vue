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
      <div v-html="contactHtml" />

      <div class="type1-contact__action">
        <slot name="action">
          <b-button v-b-toggle="sidebarIdName" variant="primary">
            メールで問合せる（お問合せフォーム）
          </b-button>
        </slot>
      </div>
    </template>

    <template #editActivator>
      <content-edit-activator type="contact" :content-id="1" />
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, onMounted, computed } from '@nuxtjs/composition-api'
import { sidebarIdName } from '@/components/organisms/layout/contact-form-sidebar.vue'
import ContentsCard from '@/components/molecules/contents-card.vue'
import SectionEyeCatcher from '@/components/molecules/section-eye-catcher.vue'
import contactHandler from '@/composable/contact-handler'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1Contact',
  components: {
    ContentsCard,
    SectionEyeCatcher,
    ContentEditActivator
  },
  setup() {
    const { contact, loadContact } = contactHandler()

    onMounted(() => {
      loadContact()
    })

    // TODO: need sanitize!
    const contactHtml = computed(() => contact.body)

    return {
      sidebarIdName,
      contact,
      contactHtml
    }
  }
})
</script>

<style lang="scss" scoped>
.type1-contact {
  &__action {
    text-align: center;
    margin-top: 1.5rem;
  }
}
</style>
