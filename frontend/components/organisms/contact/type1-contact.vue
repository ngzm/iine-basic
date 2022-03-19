<template>
  <contents-card :loading="loading">
    <template #default>
      <section-eyecatcher :background-image="contact.image">
        <h4 class="type1-contact__header--title">{{ contact.title }}</h4>
        <p class="type1-contact__header--subtitle">{{ contact.subtitle }}</p>
      </section-eyecatcher>

      <contents-card-body>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="contactHtml" />

        <div class="type1-contact__action">
          <slot name="action">
            <b-button v-b-toggle="sidebarIdName" variant="primary">
              メールで問合せる（お問合せフォーム）
            </b-button>
          </slot>
        </div>
      </contents-card-body>
    </template>

    <template #editActivator>
      <content-edit-activator :type="types.contact" :action="actions.update" :content-id="1" />
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, onMounted, computed } from '@nuxtjs/composition-api'
import { sidebarIdName } from '@/components/organisms/layout/contact-form-sidebar.vue'
import { contentDataTypes, contentActionTypes } from '@/composable/content-helper'
import { useContactData } from '@/composable/use-contact-data'
import ContentsCard from '@/components/molecules/contents-card.vue'
import ContentsCardBody from '@/components/molecules/contents-card-body.vue'
import SectionEyecatcher from '@/components/molecules/section-eyecatcher.vue'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1Contact',
  components: {
    ContentsCard,
    ContentsCardBody,
    SectionEyecatcher,
    ContentEditActivator
  },
  setup() {
    const { contact, loading, loadContact } = useContactData()

    onMounted(() => {
      loadContact(1)
    })

    // TODO: need sanitize!
    const contactHtml = computed(() => contact.value.body)

    return {
      sidebarIdName,
      contact,
      contactHtml,
      loading,
      types: contentDataTypes,
      actions: contentActionTypes
    }
  }
})
</script>

<style lang="scss" scoped>
.type1-contact {
  &__header {
    &--title, &--subtitle {
      font-size: 1.25rem;
      font-weight: bold;
      text-shadow: 1px 1px 6px black; 
      margin: 0;
      padding: 0;
    }
    &--subtitle {
      font-size: 1.0rem;
      margin-top: 0.5rem;
    }
  }
  &__action {
    margin-top: 1.5rem;
    text-align: center;
  }
}
</style>
