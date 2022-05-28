<template>
  <contents-wrap
    :overlay="loading || notFound"
    no-gap
    activator-position-top="9rem"
    activator-position-right="2rem"
  >
    <top-eyecatcher :image="eyecatchImage" class="type1-top-eyecatcher">
      <template #default>
        <h2 class="type1-top-eyecatcher__header--title">
          {{ eyecatch.title || '' }}
        </h2>
        <p class="type1-top-eyecatcher__header--subtitle">
          {{ eyecatch.subtitle || '' }}
        </p>
      </template>
      <template #actions>
        <image-setter
          :image-setting="eyecatchImage"
          @change="onChangeImageSetting"
        />
      </template>
    </top-eyecatcher>

    <template v-if="!notFound" #editActivator>
      <content-edit-activator :edit-props="editProps" />
    </template>

    <template v-else #overlay>
      <content-notfound :type="editProps.type" />
    </template>
  </contents-wrap>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from '@nuxtjs/composition-api'
import { editTypes, editActions } from '@/composable/use-edit-controll'
import { useEyecatchData } from '@/composable/use-eyecatch-data'
import ContentsWrap from '@/components/molecules/contents-wrap.vue'
import TopEyecatcher from '@/components/molecules/top-eyecatcher.vue'
import ImageSetter from '@/components/molecules/edit/image-setter.vue'
import ContentEditActivator from '@/components/molecules/edit/content-edit-activator.vue'
import ContentNotfound from '~/components/molecules/edit/content-notfound.vue'

export default defineComponent({
  name: 'Type1TopEyecatcherDetail',
  components: {
    ContentsWrap,
    TopEyecatcher,
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
      eyecatch,
      eyecatchImage,
      loading,
      notFound,
      loadEyecatch,
      getRecentData,
      changeImageSetting,
    } = useEyecatchData()

    const editProps = reactive({
      type: editTypes.eyecatch,
      action: editActions.update,
      id: props.contentId,
    })

    onMounted(async () => {
      const currentId = props.contentId ?? (await getRecentData())?.id
      if (currentId) {
        editProps.id = currentId
        await loadEyecatch(currentId)
      }
    })

    const onChangeImageSetting = (value: { [key: string]: string }) => {
      Object.assign(eyecatchImage, value)
      changeImageSetting(eyecatch.id, eyecatchImage)
    }

    return {
      eyecatch,
      eyecatchImage,
      onChangeImageSetting,
      loading,
      notFound,
      editProps,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.type1-top-eyecatcher {
  &__header {
    &--title,
    &--subtitle {
      padding: 0;
      margin: 0;
      text-align: center;
      white-space: nowrap;
      font-weight: bold;
      font-size: 2rem;
    }
    &--subtitle {
      margin-top: 0.5rem;
      font-size: 1.4rem;
    }
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .type1-top-eyecatcher {
    &__header {
      &--title {
        font-size: 1.8rem;
        font-weight: bolder;
      }
      &--subtitle {
        font-size: 1.2rem;
        font-weight: bolder;
      }
    }
  }
}
</style>
