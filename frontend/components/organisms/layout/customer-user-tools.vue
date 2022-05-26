<template>
  <b-dropdown variant="warning">
    <template #button-content>
      <b-icon icon="person-fill" />
      <span v-if="withName" class="mr-2">{{ loginUser }}</span>
    </template>
    <b-dropdown-text>{{ loginUser }}</b-dropdown-text>
    <b-dropdown-divider />
    <b-dropdown-item-button @click="togglePreview()">
      プレビュー
    </b-dropdown-item-button>
    <b-dropdown-item-button @click="logout()">
      ログアウト
    </b-dropdown-item-button>
  </b-dropdown>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuthenticated } from '@/composable/use-authenticated'

export default defineComponent({
  name: 'CostomerUserTools',
  props: {
    withName: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const { loginUser, togglePreview, logout } = useAuthenticated()
    return {
      loginUser,
      togglePreview,
      logout,
    }
  },
})
</script>
