<template>
  <div class="inquire-form">
    <b-form @submit.stop.prevent="onSubmit">
      <div>
        <label for="inquire-form-input-name">お名前</label>
        <b-form-input
          id="inquire-form-input-name"
          v-model="inquireForm.name.$value"
          :state="validStateName"
        />
        <b-form-invalid-feedback :state="validStateName">
          <span v-for="(err, inx) in inquireForm.name.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div>
        <label for="inquire-form-input-email">メールアドレス</label>
        <b-form-input
          id="inquire-form-input-email"
          v-model="inquireForm.email.$value"
          type="email"
          :state="validStateEmail"
        />
        <b-form-invalid-feedback :state="validStateEmail">
          <span v-for="(err, inx) in inquireForm.email.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div>
        <label for="inquire-form-input-phone">電話番号 (任意)</label>
        <b-form-input
          id="inquire-form-input-phone"
          v-model="inquireForm.phone.$value"
          type="tel"
          :state="validStatePhone"
        />
        <b-form-invalid-feedback :state="validStatePhone">
          <span v-for="(err, inx) in inquireForm.phone.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div>
        <label for="inquire-form-input-inquiry">お問い合わせ内容</label>
        <b-form-textarea
          id="inquire-form-input-inquiry"
          v-model="inquireForm.inquiry.$value"
          rows="6"
          max-rows="12"
          :state="validStateInquiry"
        />
        <b-form-invalid-feedback :state="validStateInquiry">
          <span v-for="(err, inx) in inquireForm.inquiry.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </div>
      <div class="inquire-form__action">
        <b-button @click="onReset()">リセット</b-button>
        <b-button type="submit" variant="primary">
          送信する
          <b-icon icon="envelope" />
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useContext,
} from '@nuxtjs/composition-api'
import { useValidation } from 'vue-composable'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import {
  required,
  emailValidator,
  phoneValidator,
} from '@/utils/form-validators'

export interface InquireFormType {
  name: string
  email: string
  phone?: string
  inquiry: string
}

export default defineComponent({
  name: 'InquireForm',
  setup(_props, { emit }) {
    const inquireForm = useValidation({
      name: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: 'お名前を入力してください',
        },
      },
      email: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: 'メールアドレスを入力してください',
        },
        emailFormat: {
          $validator: emailValidator,
          $message: 'メールアドレスの形式で入力してください',
        },
      },
      phone: {
        $value: ref(''),
        phoneFormat: {
          $validator: phoneValidator,
          $message: '0000-0000-0000 の形式で入力してください',
        },
      },
      inquiry: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: 'お問い合わせ内容を入力してください',
        },
      },
    })

    const validStateName = computed(() =>
      !inquireForm.name.$dirty ? null : !inquireForm.name.$anyInvalid
    )
    const validStateEmail = computed(() =>
      !inquireForm.email.$dirty ? null : !inquireForm.email.$anyInvalid
    )
    const validStatePhone = computed(() =>
      !inquireForm.phone.$dirty ? null : !inquireForm.phone.$anyInvalid
    )
    const validStateInquiry = computed(() =>
      !inquireForm.inquiry.$dirty ? null : !inquireForm.inquiry.$anyInvalid
    )

    const onReset = () => {
      // $value は getter - setter らしい
      inquireForm.name.$value = ''
      inquireForm.email.$value = ''
      inquireForm.phone.$value = ''
      inquireForm.inquiry.$value = ''
      inquireForm.$reset()
    }

    const { $axios } = useContext()
    const { customerId } = useCurrentCustomer()
    const onSubmit = async () => {
      inquireForm.$touch()
      if (inquireForm.$anyInvalid) return

      const inquireData: InquireFormType = inquireForm.toObject()
      await $axios.$post('/inquire', inquireData, {
        params: { customerId },
      })

      emit('submitted')
      onReset()
    }

    return {
      inquireForm,
      validStateName,
      validStateEmail,
      validStatePhone,
      validStateInquiry,
      onReset,
      onSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>
.inquire-form {
  p {
    margin-bottom: 1rem;
  }
  &__action {
    margin-top: 1.5rem;
    text-align: right;
  }
}
</style>
