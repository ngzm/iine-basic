<template>
  <contents-wrap
    :overlay="loading"
    no-gap
    activator-position-top="9rem"
    activator-position-right="2rem"
  >
    <top-eyecatcher :background-image="eyecatch.image" class="type1-top-eyecatcher">
      <h2 class="type1-top-eyecatcher__header--title">{{ eyecatch.title || '' }}</h2>
      <p class="type1-top-eyecatcher__header--subtitle">{{ eyecatch.subtitle || '' }}</p>
    </top-eyecatcher>

    <template #editActivator>
      <content-edit-activator :type="types.eyecatch" :action="actions.update" />
    </template>
  </contents-wrap>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import { contentDataTypes, contentActionTypes } from '@/composable/content-helper'
import { useEyecatchData } from '@/composable/use-eyecatch-data'
import ContentsWrap from '@/components/molecules/contents-wrap.vue'
import TopEyecatcher from '@/components/molecules/top-eyecatcher.vue'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1TopEyecatcher',
  components: {
    ContentsWrap,
    TopEyecatcher,
    ContentEditActivator
  },
  setup() {
    const customerId = 1
    const contentId = 1
    const { eyecatch, loading, loadEyecatch } = useEyecatchData(customerId)

    onMounted(async () => {
      await loadEyecatch(contentId)
    })

    return {
      eyecatch,
      loading,
      types: contentDataTypes,
      actions: contentActionTypes
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.type1-top-eyecatcher {
  &__header {
    &--title, &--subtitle {
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
