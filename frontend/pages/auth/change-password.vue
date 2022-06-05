<template>
  <div id="auth-change-password-top">
    <main class="change-password__frame">
      <template v-if="changeDone">
        <div>
          <p>パスワードを変更しました</p>
          <div class="mt-3 text-center">
            <b-button variant="success" @click="$router.go(-1)">戻る</b-button>
          </div>
        </div>
      </template>
      <template v-else>
        <form
          v-show="isAuthenticated"
          class="change-password-form"
          @submit.prevent.stop="onChange"
        >
          <h5 class="form-title">パスワード変更</h5>
          <div class="form-input">
            <label for="login-input-password">新しい Password</label>
            <b-form-input
              id="login-input-password"
              v-model="passwordChangeForm.password.$value"
              type="password"
              required
            />
            <b-form-invalid-feedback :state="validStatePassword">
              <span
                v-for="(err, inx) in passwordChangeForm.password.$errors"
                :key="inx"
              >
                {{ err }}<br />
              </span>
            </b-form-invalid-feedback>
          </div>

          <div class="form-input">
            <label for="login-input-password-confirm">
              新しい Password 確認用
            </label>
            <b-form-input
              id="login-input-password-confirm"
              v-model="passwordChangeForm.passwordConfirm.$value"
              type="password"
              required
            />
            <b-form-invalid-feedback :state="validStatePasswordConfirm">
              <span
                v-for="(err, inx) in passwordChangeForm.passwordConfirm.$errors"
                :key="inx"
              >
                {{ err }}<br />
              </span>
            </b-form-invalid-feedback>
          </div>

          <div class="form-action">
            <b-button variant="success" type="submit" :disabled="isInValid">
              変更する
            </b-button>
          </div>
        </form>
      </template>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import { useValidation } from 'vue-composable'
import { useAuthenticated } from '@/composable/use-authenticated'
import {
  required,
  minimumLength,
  passwordComplexity,
} from '@/utils/form-validators'

export default defineComponent({
  name: 'AuthLogin',
  setup() {
    const changeDone = ref(false)

    const passwordConfirm = (v: string) =>
      v === passwordChangeForm.password.$value

    const passwordChangeForm = useValidation({
      password: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: ref('password を入力してください'),
        },
        minimumLength: {
          $validator: minimumLength(8),
          $message: ref('8 文字以上で設定してください'),
        },
        complexity: {
          $validator: passwordComplexity,
          $message: ref('英字大文字・小文字・数字を全て含めてください'),
        },
      },
      passwordConfirm: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: ref('password 確認用を入力してください'),
        },
        notSame: {
          $validator: passwordConfirm,
          $message: ref('password と確認用が一致しません'),
        },
      },
    })

    const isInValid = computed(
      () => !passwordChangeForm.$anyDirty || passwordChangeForm.$anyInvalid
    )
    const validStatePassword = computed(() =>
      !passwordChangeForm.password.$dirty
        ? null
        : !passwordChangeForm.password.$anyInvalid
    )
    const validStatePasswordConfirm = computed(() =>
      !passwordChangeForm.passwordConfirm.$dirty
        ? null
        : !passwordChangeForm.passwordConfirm.$anyInvalid
    )

    const { isAuthenticated, changePassword } = useAuthenticated()

    const onChange = async () => {
      passwordChangeForm.$touch()
      if (passwordChangeForm.$anyInvalid) return

      const passwordForm = passwordChangeForm.toObject()
      await changePassword(passwordForm.password)

      changeDone.value = true
    }

    return {
      isAuthenticated,
      passwordChangeForm,
      validStatePassword,
      validStatePasswordConfirm,
      isInValid,
      onChange,
      changeDone,
    }
  },
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/style.scss';

#auth-change-password-top {
  @include page-article-gap;
}

.change-password {
  width: 100%;
  height: 100vh;
  &__frame {
    display: flex;
    justify-content: center;
    padding: 1rem;
    .change-password-form {
      padding: 2rem;
      width: 30rem;
      color: black;
      background-color: white;
      border-radius: 12px;
      .form-title {
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
        text-align: center;
      }
      .form-input {
        margin-top: 1rem;
      }
      .form-action {
        margin-top: 1.5rem;
        text-align: right;
      }
    }
  }
}
</style>
