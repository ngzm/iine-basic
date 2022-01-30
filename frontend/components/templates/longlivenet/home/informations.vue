<template>
  <section>
    <h4 class="section-title">
      <span>{{ title }}</span>
    </h4>
    <contents-card>
      <template #header>
        <section-eye-catcher :background-image="eyeCatcherImage">
          {{ eyeCatcherTitle }}
        </section-eye-catcher>
      </template>
      <template #default>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="informationHtml" />
        <div class="home-information-nav">
          <b-button variant="primary" href="#contact">{{ navLabel }}</b-button>
        </div>
      </template>
    </contents-card>
  </section>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed } from '@vue/composition-api'
import ContentsCard from '@/components/molecules/contents-card.vue'
import SectionEyeCatcher from '~/components/molecules/section-eye-catcher.vue'
import { InformationType } from '@/types/content-type'

export default defineComponent({
  name: 'LongLivenetHomeInformations',
  components: { ContentsCard, SectionEyeCatcher },
  props: {
    informations: {
      type: Array as PropType<InformationType[]>,
      required: true
    }
  },
  setup(props) {
    const initData = (): InformationType => ({ id: 0, image: '', title: '', body: ''})

    const information = computed(() => props.informations.length > 0 ? props.informations[0] : initData())

    const eyeCatcherImage = computed(() => information.value.image)

    const eyeCatcherTitle = computed(() => information.value.title)

    // TODO: need sanitize!
    const informationHtml = computed(() => information.value.body)

    const title = computed(() => 'Message')
    const navLabel = 'お問い合せ'

    return {
      title,
      navLabel,
      information,
      eyeCatcherImage,
      eyeCatcherTitle,
      informationHtml,
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.section-title {
  @include index-section-title;
}

.home-information-nav {
  text-align: center;
  margin-top: 1.5rem;
}
</style>
