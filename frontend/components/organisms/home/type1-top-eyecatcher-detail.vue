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
      <content-edit-activator
        :type="types.eyecatch"
        :action="actions.update"
        :content-id="eyecatch.id"
      />
    </template>

    <template v-else #overlay>
      <div class="text-center">
        <h4 class="my-3">トップ画像コンテンツが登録されていません</h4>
        <p class="my-3">コンテンツを作成してください</p>
        <content-edit-activator
          :type="types.eyecatch"
          :action="actions.create"
          button
        />
      </div>
    </template>
  </contents-wrap>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import {
  contentDataTypes,
  contentActionTypes,
} from '@/composable/content-helper'
import { useEyecatchData } from '@/composable/use-eyecatch-data'
import ContentsWrap from '@/components/molecules/contents-wrap.vue'
import TopEyecatcher from '@/components/molecules/top-eyecatcher.vue'
import ImageSetter from '@/components/organisms/edit/image-setter.vue'
import ContentEditActivator from '@/components/organisms/edit/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1TopEyecatcherDetail',
  components: {
    ContentsWrap,
    TopEyecatcher,
    ImageSetter,
    ContentEditActivator,
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

    onMounted(async () => {
      const currentId = props.contentId ?? (await getRecentData())?.id
      if (currentId) {
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
      types: contentDataTypes,
      actions: contentActionTypes,
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
      color: white;
      text-shadow: 1px 1px 6px black;
      font-size: 2rem;
    }
    &--subtitle {
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
