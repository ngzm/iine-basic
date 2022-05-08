<template>
  <contents-card :overlay="loading || notFound">
    <template #default>
      <section-eyecatcher :image="information.image">
        <h4 class="type1-information__header--title">
          {{ information.title }}
        </h4>
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
      <content-edit-activator
        :type="types.information"
        :action="actions.update"
        :content-id="information.id"
      />
    </template>

    <template v-if="notFound" #overlay>
      <div class="text-center">
        <h4 class="my-3">記事が登録されていません</h4>
        <p class="my-3">記事を作成してください</p>
        <content-edit-activator
          :type="types.information"
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
import { useInformationData } from '@/composable/use-information-data'
import ContentsCard from '@/components/molecules/contents-card.vue'
import ContentsCardBody from '@/components/molecules/contents-card-body.vue'
import SectionEyecatcher from '@/components/molecules/section-eyecatcher.vue'
import ContentEditActivator from '@/components/organisms/layout/content-edit-activator.vue'

export default defineComponent({
  name: 'Type1IformationDetail',
  components: {
    ContentsCard,
    ContentsCardBody,
    SectionEyecatcher,
    ContentEditActivator,
  },
  props: {
    contentId: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const { information, loading, notFound, loadInformation, getRecentData } =
      useInformationData()

    onMounted(async () => {
      const currentId = props.contentId ?? (await getRecentData())?.id
      if (currentId) {
        await loadInformation(currentId)
      }
    })

    const informationHtml = computed(() => sanitizer(information.body))

    return {
      information,
      informationHtml,
      loading,
      notFound,
      types: contentDataTypes,
      actions: contentActionTypes,
      sidebarIdName,
    }
  },
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
