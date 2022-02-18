<template>
  <div class="contact-form">
    <b-form @submit.stop.prevent="onSubmit">
      <p>
        <label for="contact-form-input-name">お名前</label>
        <b-form-input
          id="contact-form-input-name"
          v-model="contactForm.name.$value"
          :state="validStateName"
        />
        <b-form-invalid-feedback :state="validStateName">
          <span v-for="(err, inx) in contactForm.name.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </p>
      <p>
        <label for="contact-form-input-email">メールアドレス</label>
        <b-form-input
          id="contact-form-input-email"
          v-model="contactForm.email.$value"
          type="email"
          :state="validStateEmail"
        />
        <b-form-invalid-feedback :state="validStateEmail">
          <span v-for="(err, inx) in contactForm.email.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </p>
      <p>
        <label for="contact-form-input-phone">電話番号 (任意)</label>
        <b-form-input
          id="contact-form-input-phone"
          v-model="contactForm.phone.$value"
          type="tel"
          :state="validStatePhone"
        />
        <b-form-invalid-feedback :state="validStatePhone">
          <span v-for="(err, inx) in contactForm.phone.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </p>
      <p>
        <label for="contact-form-input-inquiry">お問い合わせ内容</label>
        <b-form-textarea
          id="contact-form-input-inquiry"
          v-model="contactForm.inquiry.$value"
          rows="6"
          max-rows="12"
          :state="validStateInquiry"
        />
        <b-form-invalid-feedback :state="validStateInquiry">
          <span v-for="(err, inx) in contactForm.inquiry.$errors" :key="inx">
            {{ err }}<br />
          </span>
        </b-form-invalid-feedback>
      </p>
      <p class="contact-form__action">
        <b-button @click="onReset()">
          リセット
        </b-button>
        <b-button type="submit" variant="primary">
          問い合せメール送信
        </b-button>
      </p>
    </b-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed  } from '@nuxtjs/composition-api'
import { useValidation } from "vue-composable"
import { ContactFormType } from '@/types/contact-form'

const required = (x: any) => !!x

const emailValidator = (x: string) => {
  const format =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return x ? format.test(x) : true
}

const phoneValidator = (x: string) => {
  const format = /^\d{2,5}-\d{1,4}-\d{4}$/
  return x ? format.test(x) : true
}


export default defineComponent({
  name: 'ContactForm',
  setup(_props, { emit }) {
    const contactForm = useValidation({
      name: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: ref('お名前を入力してください'),
        },
      },
      email: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: ref('メールアドレスを入力してください'),
        },
        emailFormat: {
          $validator: emailValidator,
          $message: ref('メールアドレスの形式で入力してください'),
        },
      },
      phone: {
        $value: ref(''),
        phoneFormat: {
          $validator: phoneValidator,
          $message: ref('0000-0000-0000 の形式で入力してください'),
        },
      },
      inquiry: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: ref('お問い合わせ内容を入力してください'),
        },
      },
    })

    const validStateName = computed(() => !contactForm.name.$dirty ? null : !contactForm.name.$anyInvalid)
    const validStateEmail = computed(() => !contactForm.email.$dirty ? null : !contactForm.email.$anyInvalid)
    const validStatePhone = computed(() => !contactForm.phone.$dirty ? null : !contactForm.phone.$anyInvalid)
    const validStateInquiry = computed(() => !contactForm.inquiry.$dirty ? null : !contactForm.inquiry.$anyInvalid)

    const onReset = () => {
      // $value は getter - setter らしい
      contactForm.name.$value = '';
      contactForm.email.$value = '';
      contactForm.phone.$value = '';
      contactForm.inquiry.$value = '';
      contactForm.$reset()
    }

    const onSubmit = () => {
      contactForm.$touch()
      if (contactForm.$anyInvalid) return

      const contactData: ContactFormType = contactForm.toObject();
      emit('submit', contactData)
      onReset()
    }

    return {
      contactForm,
      validStateName,
      validStateEmail,
      validStatePhone,
      validStateInquiry,
      onReset,
      onSubmit,
    }
  }
})
</script>

<style lang="scss" scoped>
.contact-form {
  &__action {
    text-align: right;
  }
}
</style>
