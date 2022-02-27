<template>
  <top-eyecatcher :background-image="eyeCatch.image" class="type1-top-eyecatcher">
    <template #default>
      <h2 class="type1-top-eyecatcher__header--title">{{ eyeCatch.title || '' }}</h2>
      <p class="type1-top-eyecatcher__header--subtitle">{{ eyeCatch.subtitle || '' }}</p>
    </template>

    <template #editActivator>
      <content-edit-activator
        type="eyecatch"
      />
    </template>
  </top-eyecatcher>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import eyeCatchHandler from '@/composable/eye-catch-handler'
import TopEyecatcher from '@/components/molecules/top-eyecatcher.vue'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1TopEyecatcher',
  components: {
    TopEyecatcher,
    ContentEditActivator
  },
  setup() {
    const { eyeCatch, loadEyeCatch } = eyeCatchHandler()

    onMounted(() => {
      loadEyeCatch()
    })

    return { eyeCatch }
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
