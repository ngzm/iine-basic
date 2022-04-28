<template>
  <contents-card :overlay="loading || notFound">
    <template #default>
      <section-eyecatcher :background-image="contact.image">
        <h4 class="type1-contact__header--title">
          {{ contact.title }}
        </h4>
      </section-eyecatcher>

      <contents-card-body>
        <h5
          v-if="contact.subtitle && contact.subtitle.length > 0"
          class="type1-contact__subtitle"
        >
          <span>{{ contact.subtitle }}</span>
        </h5>

        <!-- eslint-disable vue/no-v-html -->
        <div class="type1-contact__body" v-html="contactHtml" />
        <!-- eslint-enable -->

        <div class="type1-contact__action">
          <slot name="action">
            <b-button v-b-toggle="sidebarIdName" variant="primary">
              メールで問合せる（お問合せフォーム）
            </b-button>
          </slot>
        </div>
      </contents-card-body>
    </template>

    <template v-if="!notFound" #editActivator>
      <content-edit-activator
        :type="types.contact"
        :action="actions.update"
        :content-id="1"
      />
    </template>

    <template v-if="notFound" #overlay>
      <div class="text-center">
        <h4 class="my-3">コンタクト情報が登録されていません</h4>
        <p class="my-3">情報を作成してください</p>
        <content-edit-activator
          :type="types.contact"
          :action="actions.create"
          button
        />
      </div>
    </template>
  </contents-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from '@nuxtjs/composition-api'
import { sanitizer } from '@/utils/common-utils'
import { sidebarIdName } from '@/components/organisms/layout/contact-form-sidebar.vue'
import {
  contentDataTypes,
  contentActionTypes,
} from '@/composable/content-helper'
import { useContactData } from '@/composable/use-contact-data'
import ContentsCard from '@/components/molecules/contents-card.vue'
import ContentsCardBody from '@/components/molecules/contents-card-body.vue'
import SectionEyecatcher from '@/components/molecules/section-eyecatcher.vue'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1ContactDetail',
  components: {
    ContentsCard,
    ContentsCardBody,
    SectionEyecatcher,
    ContentEditActivator,
  },
  props: {
    contentId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { contact, loading, notFound, loadContact } = useContactData()
    const contactHtml = computed(() => sanitizer(contact.body))

    onMounted(async () => {
      await loadContact(props.contentId)
    })

    return {
      sidebarIdName,
      contact,
      contactHtml,
      loading,
      notFound,
      types: contentDataTypes,
      actions: contentActionTypes,
    }
  },
})
</script>

<style lang="scss" scoped>
.type1-contact {
  &__header {
    &--title {
      font-size: 1.25rem;
      font-weight: bold;
      text-shadow: 1px 1px 6px black;
      margin: 0;
      padding: 0;
    }
  }
  &__subtitle {
    position: relative;
    top: -0.5rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    text-align: center;
    background-color: lightgray;
    span {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
  &__action {
    margin-top: 1.5rem;
    text-align: center;
  }
}
</style>
