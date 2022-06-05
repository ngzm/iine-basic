<template>
  <div class="base-footer g-theme-footer">
    <div v-if="!isAuthenticated" class="base-footer__user">
      <nav-link :to="{ name: 'auth-login' }">
        <b-icon icon="person-circle" />
      </nav-link>
    </div>
    <div class="base-footer__template">
      <component :is="templateName" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useAuthenticated } from '@/composable/use-authenticated'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import NavLink from '@/components/atoms/nav-link.vue'
import longlivenetFooter from '@/components/templates/longlivenet/layout/footer.vue'

export default defineComponent({
  name: 'DefautFooter',
  components: {
    NavLink,
    longlivenetFooter,
  },
  setup() {
    const { template } = useCurrentCustomer()
    const { isAuthenticated } = useAuthenticated()

    return {
      templateName: `${template}Footer`,
      isAuthenticated,
    }
  },
})
</script>

<style lang="scss" scoped>
.base-footer {
  display: flex;
  align-items: center;
  &__user {
    padding-left: 0.5rem;
  }
  &__template {
    flex-grow: 10;
  }
}
</style>
