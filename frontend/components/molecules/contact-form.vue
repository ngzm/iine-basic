<template>
  <div class="contact-form">
    <b-form @submit.stop.prevent="onSubmit">
      <p>
        <label for="contact-form-input-name">お名前</label>
        <b-form-input
          id="contact-form-input-name"
          v-model="mailForm.name.$value"
          :state="validStateName"
        />
        <b-form-invalid-feedback :state="validStateName">
          {{ mailForm.name.$message }}
        </b-form-invalid-feedback>
      </p>
      <p>
        <label for="contact-form-input-email">メールアドレス</label>
        <b-form-input
          id="contact-form-input-email"
          v-model="mailForm.email.$value"
          :state="validStateEmail"
        />
        <b-form-invalid-feedback :state="validStateEmail">
          {{ mailForm.email.$message }}
        </b-form-invalid-feedback>
      </p>
      <p>
        <label for="contact-form-input-phone">電話番号</label>
        <b-form-input
          id="contact-form-input-phone"
          v-model="mailForm.phone.$value"
          :state="validStatePhone"
        />
        <b-form-invalid-feedback :state="validStatePhone">
          {{ mailForm.phone.$message }}
        </b-form-invalid-feedback>
      </p>
      <p>
        <label for="contact-form-input-inquiry">お問い合わせ内容</label>
        <b-form-textarea
          id="contact-form-input-inquiry"
          v-model="mailForm.inquiry.$value"
          rows="6"
          max-rows="12"
          :state="validStateInquiry"
        />
        <b-form-invalid-feedback :state="validStateInquiry">
          {{ mailForm.inquiry.$message }}
        </b-form-invalid-feedback>
      </p>
      <p class="mt-4">
        <b-button type="submit" variant="primary">
          送信する
        </b-button>
      </p>
    </b-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed  } from '@nuxtjs/composition-api'
import { useValidation } from "vue-composable"

const required = (x: any) => !!x;

export default defineComponent({
  name: 'ContactForm',
  setup(_props, { emit }) {
    const name = ref('');
    const email = ref('');
    const phone = ref('');
    const inquiry = ref('');

    const mailForm = useValidation({
      name: {
        $value: name,
        required,
        $message: ref("お名前を入力してください"),
      },
      email: {
        $value: email,
        required,
        $message: ref("メールアドレスを入力してください"),
      },
      phone: {
        $value: phone,
        required,
        $message: ref("電話番号を入力してください"),
      },
      inquiry: {
        $value: inquiry,
        required,
        $message: ref("お問い合わせ内容を入力してください"),
      },
    })

    const validStateName = computed(() => !mailForm.name.$dirty ? null : !mailForm.name.$anyInvalid)
    const validStateEmail = computed(() => !mailForm.email.$dirty ? null : !mailForm.email.$anyInvalid)
    const validStatePhone = computed(() => !mailForm.phone.$dirty ? null : !mailForm.phone.$anyInvalid)
    const validStateInquiry = computed(() => !mailForm.inquiry.$dirty ? null : !mailForm.inquiry.$anyInvalid)

    const reset = () => {
      console.log('reset!!!!')
      mailForm.$reset()
    }

    const onSubmit = () => {
      mailForm.$touch()
      if (mailForm.$anyInvalid) return

      const o = mailForm.toObject();
      console.log("submitted", o);

      emit('close')
    }

    return {
      mailForm,
      validStateName,
      validStateEmail,
      validStatePhone,
      validStateInquiry,
      reset,
      onSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
