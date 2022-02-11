<template>
  <div class="contact-navigator">
    <div
      class="contact-navigator__activator"
      :class="{ 'avleft': alignActivator === 'left', 'avright': alignActivator === 'right' }"
    >
      <b-button @click="contactCollapse = !contactCollapse">
        お問い合わせ
        <b-icon v-if="contactCollapse" icon="caret-down-square" />
        <b-icon v-else icon="hand-index" />
      </b-button>
    </div>
    <b-collapse v-model="contactCollapse">
      <div class="contact-navigator__collapse">
        <contact-panel :contact="contact" />
      </div>
    </b-collapse>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import { ContactType } from '@/types/content-type'
import ContactPanel from '@/components/molecules/contact-panel.vue'

export default defineComponent({
  name: 'ContactNavigator',
  components: { ContactPanel },
  props: {
    contact: {
      type: Object as PropType<ContactType>,
      required: true
    },
    alignActivator: {
      type: String,
      default: 'center'
    }
  },
  setup() {
    const contactCollapse = ref(false)
    const navLabel = 'メールでのお問い合せ（お問い合せフォーム）'
    return {
      contactCollapse,
      navLabel,
    }
  }
})
</script>

<style lang="scss" scoped>
.contact-navigator {
  &__activator {
    text-align: center;
  }
  .avleft {
    text-align: left;
  }
  .avright {
    text-align: right;
  }
  &__collapse {
    margin-top: 1rem;
    background-color: linen;
    padding: 1rem 2rem;
    // text-align: left;
  }
}
</style>
