<template>
  <div class="auth-login">
    <div class="auth-login__navigation">
      <nav-link :to="{ name: 'index' }">HOME</nav-link>
    </div>
    <main class="auth-login__frame">
      <form class="login-form" @submit.prevent.stop="onLogin">
        <h5 class="form-title">{{ customerName }} 管理者ログイン</h5>
        <p v-if="loginResult === 'authError'" class="form-caution">
          ログイン認証できませんでした
        </p>
        <p v-if="loginResult === 'authOk'" class="form-success">
          ログイン認証成功しました
        </p>

        <div class="form-input">
          <label for="login-input-email">Email</label>
          <b-form-input
            id="login-input-email"
            v-model="loginForm.email.$value"
            type="email"
            required
            :disabled="loginResult === 'authOk'"
          />
          <b-form-invalid-feedback :state="validStateEmail">
            <span v-for="(err, inx) in loginForm.email.$errors" :key="inx">
              {{ err }}<br />
            </span>
          </b-form-invalid-feedback>
        </div>

        <div class="form-input">
          <label for="login-input-password">Password</label>
          <b-form-input
            id="login-input-password"
            v-model="loginForm.password.$value"
            type="password"
            required
            :disabled="loginResult === 'authOk'"
          />
          <b-form-invalid-feedback :state="validStatePassword">
            <span v-for="(err, inx) in loginForm.password.$errors" :key="inx">
              {{ err }}<br />
            </span>
          </b-form-invalid-feedback>
        </div>

        <div class="form-action">
          <b-button
            variant="success"
            type="submit"
            :disabled="loginResult === 'authOk'"
          >
            ログイン
          </b-button>
        </div>
      </form>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import { useValidation } from 'vue-composable'
import { required, emailValidator } from '@/utils/form-validators'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import { useAuthenticated } from '@/composable/use-authenticated'
import NavLink from '@/components/atoms/nav-link.vue'

export default defineComponent({
  name: 'AuthLogin',
  components: { NavLink },
  layout: 'simple',
  setup() {
    const loginForm = useValidation({
      email: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: ref('email を入力してください'),
        },
        emailFormat: {
          $validator: emailValidator,
          $message: 'メールアドレスの形式で入力してください',
        },
      },
      password: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: ref('password を入力してください'),
        },
      },
    })
    const validStateEmail = computed(() =>
      !loginForm.email.$dirty ? null : !loginForm.email.$anyInvalid
    )
    const validStatePassword = computed(() =>
      !loginForm.password.$dirty ? null : !loginForm.password.$anyInvalid
    )

    const { customer } = useCurrentCustomer()
    const { login } = useAuthenticated()
    const loginResult = ref('authInit')

    const onLogin = async () => {
      loginForm.$touch()
      if (loginForm.$anyInvalid) return

      const loginData = loginForm.toObject()
      loginResult.value = await login(
        {
          customerId: String(customer.id),
          username: loginData.email,
          password: loginData.password,
        },
        'authOk',
        'authError'
      )
    }

    return {
      customerName: customer.name,
      loginForm,
      validStateEmail,
      validStatePassword,
      onLogin,
      loginResult,
    }
  },
})
</script>

<style scoped lang="scss">
.auth-login {
  width: 100%;
  height: 100vh;
  &__navigation {
    padding: 1rem;
    text-align: right;
  }
  &__frame {
    display: flex;
    justify-content: center;
    padding: 1rem;
    .login-form {
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
      .form-caution {
        margin-bottom: 1.5rem;
        color: crimson;
      }
      .form-success {
        margin-bottom: 1.5rem;
        color: mediumseagreen;
        font-weight: bold;
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
