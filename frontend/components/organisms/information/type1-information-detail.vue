<template>
  <contents-card :overlay="loading || notFound">
    <template #default>
      <section-eyecatcher :image="informationImage">
        <template #default>
          <h4 class="g-text-cl type1-information__header--title">
            {{ information.title }}
          </h4>
          <p
            v-if="information.subtitle && information.subtitle.length > 0"
            class="g-text-cl type1-information__header--subtitle"
          >
            {{ information.subtitle }}
          </p>
        </template>
        <template #actions>
          <image-setter
            :image-setting="informationImage"
            @change="onChangeImageSetting"
          />
        </template>
      </section-eyecatcher>

      <contents-card-body>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="informationHtml" />

        <div class="type1-information__action">
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
import { useInformationData } from '@/composable/use-information-data'
import { sidebarIdName } from '@/components/organisms/inquire/inquire-form-sidebar.vue'
import ContentsCard from '@/components/molecules/contents-card.vue'
import ContentsCardBody from '@/components/molecules/contents-card-body.vue'
import SectionEyecatcher from '@/components/molecules/section-eyecatcher.vue'
import ImageSetter from '@/components/molecules/edit/image-setter.vue'
import ContentEditActivator from '@/components/molecules/edit/content-edit-activator.vue'
import ContentNotfound from '~/components/molecules/edit/content-notfound.vue'

export default defineComponent({
  name: 'Type1IformationDetail',
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
      information,
      informationImage,
      loading,
      notFound,
      loadInformation,
      getRecentData,
      changeImageSetting,
    } = useInformationData()

    const editProps = reactive({
      type: editTypes.information,
      action: editActions.update,
      id: props.contentId,
    })

    onMounted(async () => {
      const currentId = props.contentId ?? (await getRecentData())?.id
      if (currentId) {
        editProps.id = currentId
        await loadInformation(currentId)
      }
    })

    const onChangeImageSetting = (value: { [key: string]: string }) => {
      Object.assign(informationImage, value)
      changeImageSetting(information.id, informationImage)
    }

    const informationHtml = computed(() => sanitizer(information.body))

    return {
      information,
      informationImage,
      informationHtml,
      onChangeImageSetting,
      loading,
      notFound,
      editProps,
      sidebarIdName,
    }
  },
})
</script>

<style lang="scss" scoped>
.type1-information {
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
    text-align: center;
    margin-top: 1.5rem;
  }
}
</style>
