<template>
  <div class="default-footer">
    <component :is="templateName" />
    <!-- TODO nuxt3 移行後に改めて実装を検討する -->
    <!-- <div class="default-footer__customer-user">
      <a :href="customerUserPage">
        <b-icon icon="person-circle" />
      </a>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import longlivenetFooter from '@/components/templates/longlivenet/layout/footer.vue'

export default defineComponent({
  name: 'DefautFooter',
  components: {
    longlivenetFooter,
  },
  setup() {
    const { template } = useCurrentCustomer()

    return {
      templateName: `${template}Footer`,
    }
  },
})
</script>

<style lang="scss" scoped>
.default-footer {
  position: relative;
  background-color: white;
  color: dimgray;
  &__customer-user {
    position: absolute;
    left: 1rem;
    top: 1rem;
  }
}
</style>
