<template>
  <div v-if="isAuthenticated" class="image-settings">
    <!-- Large画面 -->
    <div class="image-settings__lg">
      <div class="image-settings__lg--row">
        <div class="ml-3 mb-2">
          <b-form-checkbox v-model="autoLg" switch>
            <small>画像自動調整</small>
          </b-form-checkbox>
        </div>
      </div>
      <div class="image-settings__lg--row">
        <p><small>サイズ</small></p>
        <div>
          <b-form-input
            v-model="sizeLg"
            type="range"
            min="100"
            max="300"
            :disabled="autoLg"
          />
        </div>
      </div>
      <div class="image-settings__lg--row">
        <p><small>横位置</small></p>
        <div>
          <b-form-input
            v-model="pxLg"
            type="range"
            min="1"
            max="99"
            :disabled="autoLg"
          />
        </div>
      </div>
      <div class="image-settings__lg--row">
        <p><small>縦位置</small></p>
        <div>
          <b-form-input
            v-model="pyLg"
            type="range"
            min="1"
            max="99"
            :disabled="autoLg"
          />
        </div>
      </div>
    </div>
    <!-- Small画面 -->
    <div class="image-settings__sm">
      <div class="image-settings__sm--row">
        <div class="ml-3 mb-2">
          <b-form-checkbox v-model="autoSm" switch>
            <small>画像自動調整</small>
          </b-form-checkbox>
        </div>
      </div>
      <div class="image-settings__sm--row">
        <p><small>サイズ</small></p>
        <div>
          <b-form-input
            v-model="sizeSm"
            type="range"
            min="100"
            max="400"
            :disabled="autoSm"
          />
        </div>
      </div>
      <div class="image-settings__sm--row">
        <p><small>横位置</small></p>
        <div>
          <b-form-input
            v-model="pxSm"
            type="range"
            min="1"
            max="99"
            :disabled="autoSm"
          />
        </div>
      </div>
      <div class="image-settings__sm--row">
        <p><small>縦位置</small></p>
        <div>
          <b-form-input
            v-model="pySm"
            type="range"
            min="1"
            max="99"
            :disabled="autoSm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  computed,
  PropType,
} from '@nuxtjs/composition-api'
import { ImageSetting } from '@/types/content-types'
import { useAuthenticated } from '@/composable/use-authenticated'

export default defineComponent({
  props: {
    imageSetting: {
      type: Object as PropType<ImageSetting>,
      default: {} as ImageSetting,
    },
  },
  setup(props, { emit }) {
    const { isAuthenticated } = useAuthenticated()

    const { lgSize, smSize, lgPosition, smPosition } = toRefs(
      props.imageSetting
    )

    const autoLg = computed({
      get: () => lgSize.value === 'cover',
      set: (value: boolean) => {
        if (value) {
          emit('change', { lgSize: 'cover', lgPosition: 'center' })
        } else {
          emit('change', {
            lgSize: `${sizeLg.value.toString()}%`,
            lgPosition: `${pxLg.value.toString()}% ${pyLg.value.toString()}%`,
          })
        }
      },
    })

    const sizeLg = computed({
      get: () => {
        if (lgSize.value === 'cover') {
          return 100
        } else {
          const matched = lgSize.value?.match(/^(?<size>\d+)%$/)
          return parseInt(matched?.groups?.size ?? '100')
        }
      },
      set: (value: number) => {
        if (autoLg.value) return
        emit('change', { lgSize: `${value.toString()}%` })
      },
    })

    const pxLg = computed({
      get: () => {
        if (lgPosition.value === 'center') {
          return 50
        } else {
          const matched = lgPosition.value?.match(
            /^(?<posx>\d+)%\s+(?<posy>\d+)%$/
          )
          return parseInt(matched?.groups?.posx ?? '50')
        }
      },
      set: (value: number) => {
        if (autoLg.value) return
        const positionLg = `${value.toString()}% ${pyLg.value.toString()}%`
        emit('change', { lgPosition: positionLg })
      },
    })

    const pyLg = computed({
      get: () => {
        if (lgPosition.value === 'center') {
          return 50
        } else {
          const matched = lgPosition.value?.match(
            /^(?<posx>\d+)%\s+(?<posy>\d+)%$/
          )
          return parseInt(matched?.groups?.posy ?? '50')
        }
      },
      set: (value: number) => {
        if (autoLg.value) return
        const positionLg = `${pxLg.value.toString()}% ${value.toString()}%`
        emit('change', { lgPosition: positionLg })
      },
    })

    const autoSm = computed({
      get: () => smSize.value === 'cover',
      set: (value: boolean) => {
        if (value) {
          emit('change', { smSize: 'cover', smPosition: 'center' })
        } else {
          emit('change', {
            smSize: `${sizeSm.value.toString()}%`,
            smPosition: `${pxSm.value.toString()}% ${pySm.value.toString()}%`,
          })
        }
      },
    })

    const sizeSm = computed({
      get: () => {
        if (smSize.value === 'cover') {
          return 100
        } else {
          const matched = smSize.value?.match(/^(?<size>\d+)%$/)
          return parseInt(matched?.groups?.size ?? '100')
        }
      },
      set: (value: number) => {
        if (autoSm.value) return
        emit('change', { smSize: `${value.toString()}%` })
      },
    })

    const pxSm = computed({
      get: () => {
        if (smPosition.value === 'center') {
          return 50
        } else {
          const matched = smPosition.value?.match(
            /^(?<posx>\d+)%\s+(?<posy>\d+)%$/
          )
          return parseInt(matched?.groups?.posx ?? '50')
        }
      },
      set: (value: number) => {
        if (autoSm.value) return
        const positionSm = `${value.toString()}% ${pySm.value.toString()}%`
        emit('change', { smPosition: positionSm })
      },
    })

    const pySm = computed({
      get: () => {
        if (smPosition.value === 'center') {
          return 50
        } else {
          const matched = smPosition.value?.match(
            /^(?<posx>\d+)%\s+(?<posy>\d+)%$/
          )
          return parseInt(matched?.groups?.posy ?? '50')
        }
      },
      set: (value: number) => {
        if (autoSm.value) return
        const positionSm = `${pxSm.value.toString()}% ${value.toString()}%`
        emit('change', { smPosition: positionSm })
      },
    })

    return {
      isAuthenticated,
      autoLg,
      sizeLg,
      pxLg,
      pyLg,
      autoSm,
      sizeSm,
      pxSm,
      pySm,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.image-settings {
  width: 16rem;
  padding: 0.5rem;
  &__lg,
  &__sm {
    &--row {
      display: flex;
      justify-content: stretch;
      p {
        flex-basis: auto;
        width: 4rem;
        text-align: center;
      }
      div {
        flex-grow: 1;
      }
    }
  }
  &__lg {
    display: block;
  }
  &__sm {
    display: none;
  }
}

@media only screen and (max-width: $grid-breakpoint-md) {
  .image-settings {
    &__lg {
      display: none;
    }
    &__sm {
      display: block;
    }
  }
}
</style>
