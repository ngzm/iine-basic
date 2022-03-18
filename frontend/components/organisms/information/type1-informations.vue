<template>
  <contents-card :loading="loading">
    <template #default>
      <section-eyecatcher
        :background-image="information.image"
        class="type1-information__header"
      >
        <h4 class="type1-information__header--title">
          {{ information.title }}
        </h4>
      </section-eyecatcher>

      {{ loading }}

      <contents-card-body>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="informationHtml" />

        <div class="type1-information__action">
          <slot name="action">
            <b-button v-b-toggle="sidebarIdName" variant="primary">
              <b-icon icon="hand-index" />
              お問合せ
            </b-button>
          </slot>
        </div>
      </contents-card-body>
    </template>

    <template #editActivator>
      <content-edit-activator :type="editType" :content-id="1" />
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, onMounted, computed } from '@nuxtjs/composition-api'
import { sidebarIdName } from '@/components/organisms/layout/contact-form-sidebar.vue'
import { contentDataTypes } from '@/composable/content-helper'
import { useInformationData } from '@/composable/use-information-data'
import ContentsCard from '@/components/molecules/contents-card.vue'
import ContentsCardBody from '@/components/molecules/contents-card-body.vue'
import SectionEyecatcher from '@/components/molecules/section-eyecatcher.vue'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1Iformations',
  components: {
    ContentsCard,
    ContentsCardBody,
    SectionEyecatcher,
    ContentEditActivator
  },
  setup() {
    const { information, loading, loadInformation } = useInformationData(1)

    // TODO: need sanitize!
    const informationHtml = computed(() => information.value.body)

    onMounted(() => {
      loadInformation(1)
    })

    return {
      sidebarIdName,
      information,
      informationHtml,
      loading,
      editType: contentDataTypes.information
    }
  }
})
</script>

<style lang="scss" scoped>
.type1-information {
  &__header {
    &--title {
      font-size: 1.25rem;
      font-weight: bold;
      text-shadow: 1px 1px 6px black; 
      margin: 0;
      padding: 0;
    }
  }
  &__action {
    text-align: center;
    margin-top: 1.5rem;
  }
}
</style>
