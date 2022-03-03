<template>
  <div class="eyecatcher-form"> 
    <p>
      <label for="eyecatcher-form-input-top-message">トップメッセージ</label>
      <b-form-input
        id="eyecatcher-form-input-top-message"
        v-model="eyecatcherForm.topMessage.$value"
        :state="validStateTopMessage"
      />
      <b-form-invalid-feedback :state="validStateTopMessage">
        <span v-for="(err, inx) in eyecatcherForm.topMessage.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p>
      <label for="eyecatcher-form-input-sub-message">サブメッセージ</label>
      <b-form-input
        id="eyecatcher-form-input-sub-message"
        v-model="eyecatcherForm.subMessage.$value"
        :state="validStateSubMessage"
      />
      <b-form-invalid-feedback :state="validStateSubMessage">
        <span v-for="(err, inx) in eyecatcherForm.subMessage.$errors" :key="inx">
          {{ err }}<br />
        </span>
      </b-form-invalid-feedback>
    </p>
    <p>
      <file-input />
    </p>
    <p class="eyecatcher-form_action">
      <b-button @click="$emit('close')">
        キャンセル
      </b-button>
      <b-button variant="primary" @click="onUpdate">
        更新する
      </b-button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import { useValidation } from 'vue-composable'
import { required, maximunLength } from '@/composable/form-validators'
import FileInput from '@/components/atoms/file-input.vue'

export default defineComponent({
  name: 'EyeCatcherForm',
  components: { FileInput },
  setup(_props, { emit }) {
    const eyecatcherForm = useValidation({
      topMessage: {
        $value: ref(''),
        required: {
          $validator: required,
          $message: ref('トップメッセージを入力してください'),
        },
        maximunLength: {
          $validator: maximunLength(40),
          $message: ref('40文字以内で入力してください'),
        },
      },
      subMessage: {
        $value: ref(''),
        maximunLength: {
          $validator: maximunLength(50),
          $message: ref('50文字以内で入力してください'),
        },
      }
    })

    const validStateTopMessage = computed(() => !eyecatcherForm.topMessage.$dirty ? null : !eyecatcherForm.topMessage.$anyInvalid)
    const validStateSubMessage = computed(() => !eyecatcherForm.subMessage.$dirty ? null : !eyecatcherForm.subMessage.$anyInvalid)

    const onUpdate = () => {
      console.log('eyecatcherForm', eyecatcherForm)

      emit('close')
    }

    return {
      eyecatcherForm,
      validStateTopMessage,
      validStateSubMessage,
      onUpdate
    }
  },
})
</script>

<style lang="scss" scoped>

</style>
