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
    <b-dropdown-divider />
    <b-dropdown-item-button @click="toChengePassword()">
      パスワード変更
    </b-dropdown-item-button>
    <b-dropdown-item-button @click="logout()">
      ログアウト
    </b-dropdown-item-button>
  </b-dropdown>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { useAuthenticated } from '@/composable/use-authenticated'
import { usePreviewControll } from '@/composable/use-edit-controll'

export default defineComponent({
  name: 'CostomerUserTools',
  props: {
    withName: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const { loginUser, logout } = useAuthenticated()
    const { togglePreview } = usePreviewControll()

    const router = useRouter()
    const toChengePassword = () => {
      router.push({ name: 'auth-change-password' })
    }

    return {
      loginUser,
      togglePreview,
      logout,
      toChengePassword,
    }
  },
})
</script>
