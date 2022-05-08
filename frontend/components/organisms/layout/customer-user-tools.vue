<template>
  <b-dropdown variant="warning">
    <template #button-content>
      <b-icon icon="person-fill" />
      <span v-if="withName" class="mr-2">{{ loginUser }}</span>
    </template>
    <b-dropdown-text>{{ loginUser }}さん</b-dropdown-text>
    <b-dropdown-divider />
    <b-dropdown-item-button>アカウント</b-dropdown-item-button>
    <b-dropdown-item-button @click="$auth.logout()">
      ログアウト
    </b-dropdown-item-button>
  </b-dropdown>
</template>

<script lang="ts">
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CostomerUserTools',
  props: {
    withName: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const { $auth } = useContext()
    const loginUser = computed(() => $auth.user?.name)
    return {
      loginUser,
    }
  },
})
</script>
