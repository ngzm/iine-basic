<template>
  <contents-card>
    <template #header>
      <section-eye-catcher :background-image="information.image">
        {{ information.title }}
      </section-eye-catcher>
    </template>

    <template #default>
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
    </template>

    <template #toEdit>
      <information-to-edit :id="1" />
    </template>
  </contents-card>
</template>

<script lang='ts'>
import { defineComponent, onMounted, computed } from '@nuxtjs/composition-api'
import informationHandler from '@/composable/information-handler'
import ContentsCard from '@/components/molecules/contents-card.vue'
import SectionEyeCatcher from '@/components/molecules/section-eye-catcher.vue'
import InformationToEdit from '@/components/organisms/information-to-edit.vue'
import { sidebarIdName } from '@/components/organisms/layout/contact-form-sidebar.vue'

export default defineComponent({
  name: 'Type1Iformations',
  components: {
    ContentsCard,
    SectionEyeCatcher,
    InformationToEdit
  },
  setup() {
    const { information, loadInformation } = informationHandler()

    onMounted(() => {
      loadInformation(1)
    })

    // TODO: need sanitize!
    const informationHtml = computed(() => information.body)

    return {
      sidebarIdName,
      information,
      informationHtml,
    }
  }
})
</script>

<style lang="scss" scoped>
.type1-information {
  &__action {
    text-align: center;
    margin-top: 1.5rem;
  }
}
</style>
