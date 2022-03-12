<template>
  <top-eyecatcher :background-image="eyecatch.image" class="type1-top-eyecatcher">
    <template #default>
      <h2 class="type1-top-eyecatcher__header--title">{{ eyecatch.title || '' }}</h2>
      <p class="type1-top-eyecatcher__header--subtitle">{{ eyecatch.subtitle || '' }}</p>
    </template>

    <template #editActivator>
      <content-edit-activator :type="editType" />
    </template>
  </top-eyecatcher>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import { contentDataTypes } from '@/composable/content-helper'
import { useEyecatchData } from '@/composable/use-eyecatch-data'
import TopEyecatcher from '@/components/molecules/top-eyecatcher.vue'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1TopEyecatcher',
  components: {
    TopEyecatcher,
    ContentEditActivator
  },
  setup() {
    const { eyecatch, loading, loadEyecatch } = useEyecatchData(1)

    onMounted(() => {
      loadEyecatch(1)
    })

    return {
      eyecatch,
      loading,
      editType: contentDataTypes.eyecatch
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
