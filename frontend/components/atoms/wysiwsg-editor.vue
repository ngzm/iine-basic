<template>
  <div class="wysiwyg-editor" :class="classByStates">
    <client-only>
      <div class="wysiwyg-editor__editor">
        <vue-editor
          v-model="valueText"
          :editor-toolbar="wysiwygToolbar"
          @focus="isFocus = true"
          @blur="isFocus = false"
        />
      </div>
      <div class="wysiwyg-editor__icon">
        <b-icon
          v-show="state === true"
          icon="check"
          variant="success"
          font-scale="1.5"
        />
        <b-icon
          v-show="state === false"
          icon="exclamation-circle"
          variant="danger"
          font-scale="1.5"
        />
      </div>
    </client-only>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'WysiwsgEditor',
  props: {
    value: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      default: null,
    },
  },
  setup(props, { emit }) {
    const wysiwygToolbar = [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
      ],
      [{ color: [] }, 'link'],
    ] as const

    const isFocus = ref(false)

    const valueText = computed({
      get: () => props.value,
      set: (val: string) => {
        emit('input', val)
      },
    })

    const classByStates = computed(() => {
      if (props.state === true) {
        return isFocus.value ? 'focused-ok-state' : 'ok-state'
      } else if (props.state === false) {
        return isFocus.value ? 'focused-error-state' : 'error-state'
      } else {
        return isFocus.value ? 'focused' : ''
      }
    })

    return {
      wysiwygToolbar,
      isFocus,
      valueText,
      classByStates,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.wysiwyg-editor {
  display: flex;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  &__editor {
    flex-grow: 2;
    padding-right: 0.5rem;
  }
  &__icon {
    flex-grow: 0;
    min-width: 1.5rem;
  }
}

.focused {
  box-shadow: 0 0 5px 1px $blue;
}

.ok-state {
  border-color: $green;
}

.focused-ok-state {
  border-color: $green;
  box-shadow: 0 0 5px 1px $green;
}

.error-state {
  border-color: $red;
}

.focused-error-state {
  border-color: $red;
  box-shadow: 0 0 5px 1px $red;
}

::v-deep .ql-container.ql-snow {
  border-color: transparent !important;
}
</style>
