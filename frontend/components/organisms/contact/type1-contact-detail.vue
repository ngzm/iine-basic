<template>
  <contents-card :overlay="loading || notFound">
    <template #default>
      <section-eyecatcher :image="contactImage">
        <template #default>
          <h4 class="g-text-cl type1-contact__header--title">
            {{ contact.title }}
          </h4>
          <p
            v-if="contact.subtitle && contact.subtitle.length > 0"
            class="g-text-cl type1-contact__header--subtitle"
          >
            {{ contact.subtitle }}
          </p>
        </template>
        <template #actions>
          <image-setter
            :image-setting="contactImage"
            @change="onChangeImageSetting"
          />
        </template>
      </section-eyecatcher>

      <contents-card-body>
        <!-- eslint-disable vue/no-v-html -->
        <div class="type1-contact__body" v-html="contactHtml" />
        <!-- eslint-enable -->

        <div class="type1-contact__action">
          <slot name="action">
            <b-button v-b-toggle="sidebarIdName" variant="primary">
              <b-icon icon="envelope" />
              お問合せ
            </b-button>
          </slot>
        </div>
      </contents-card-body>
    </template>

    <template v-if="!notFound" #editActivator>
      <content-edit-activator :edit-props="editProps" />
    </template>

    <template v-if="notFound" #overlay>
      <content-notfound :type="editProps.type" />
    </template>
  </contents-card>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  computed,
} from '@nuxtjs/composition-api'

import { sanitizer } from '@/utils/common-utils'
import { editTypes, editActions } from '@/composable/use-edit-controll'
import { useContactData } from '@/composable/use-contact-data'
import { sidebarIdName } from '@/components/organisms/inquire/inquire-form-sidebar.vue'
import ContentsCard from '@/components/molecules/contents-card.vue'
import ContentsCardBody from '@/components/molecules/contents-card-body.vue'
import SectionEyecatcher from '@/components/molecules/section-eyecatcher.vue'
import ImageSetter from '@/components/molecules/edit/image-setter.vue'
import ContentEditActivator from '@/components/molecules/edit/content-edit-activator.vue'
import ContentNotfound from '~/components/molecules/edit/content-notfound.vue'

export default defineComponent({
  name: 'Type1ContactDetail',
  components: {
    ContentsCard,
    ContentsCardBody,
    SectionEyecatcher,
    ImageSetter,
    ContentEditActivator,
    ContentNotfound,
  },
  props: {
    contentId: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const {
      contact,
      contactImage,
      loading,
      notFound,
      loadContact,
      getRecentData,
      changeImageSetting,
    } = useContactData()

    const editProps = reactive({
      type: editTypes.contact,
      action: editActions.update,
      id: props.contentId,
    })

    onMounted(async () => {
      const currentId = props.contentId ?? (await getRecentData())?.id
      if (currentId) {
        editProps.id = currentId
        await loadContact(currentId)
      }
    })

    const onChangeImageSetting = (value: { [key: string]: string }) => {
      Object.assign(contactImage, value)
      changeImageSetting(contact.id, contactImage)
    }

    const contactHtml = computed(() => sanitizer(contact.body))

    return {
      sidebarIdName,
      contact,
      contactImage,
      contactHtml,
      onChangeImageSetting,
      loading,
      notFound,
      editProps,
    }
  },
})
</script>

<style lang="scss" scoped>
.type1-contact {
  &__header {
    &--title,
    &--subtitle {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0;
      padding: 0;
    }
    &--subtitle {
      font-size: 1rem;
      margin-top: 0.5rem;
    }
  }
  &__action {
    margin-top: 1.5rem;
    text-align: center;
  }
}
</style>
