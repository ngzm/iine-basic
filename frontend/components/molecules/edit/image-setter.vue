<template>
  <div v-if="isEditable" class="image-settings">
    <!-- Large画面 -->
    <ul class="g-block-lg image-settings">
      <li v-if="!isIOS">
        <div class="ml-1 mb-1">
          <b-form-checkbox v-model="parallaxLg" switch>
            <small>固定表示</small>
          </b-form-checkbox>
        </div>
      </li>
      <li>
        <div class="ml-1 mb-1">
          <b-form-checkbox v-model="autoLg" switch>
            <small>自動調整</small>
          </b-form-checkbox>
        </div>
      </li>
      <li>
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
      </li>
      <li>
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
      </li>
      <li>
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
      </li>
    </ul>
    <!-- Small画面 -->
    <ul class="g-block-sm image-settings">
      <li v-if="!isIOS">
        <div class="ml-1 mb-1">
          <b-form-checkbox v-model="parallaxSm" switch>
            <small>固定表示</small>
          </b-form-checkbox>
        </div>
      </li>
      <li>
        <div class="ml-1 mb-1">
          <b-form-checkbox v-model="autoSm" switch>
            <small>自動調整</small>
          </b-form-checkbox>
        </div>
      </li>
      <li>
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
      </li>
      <li>
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
      </li>
      <li>
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
      </li>
    </ul>
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
import { useDetectIOS } from '@/composable/use-window'
import { usePreviewControll } from '@/composable/use-edit-controll'

export default defineComponent({
  props: {
    imageSetting: {
      type: Object as PropType<ImageSetting>,
      default: {} as ImageSetting,
    },
  },
  setup(props, { emit }) {
    const { isEditable } = usePreviewControll()

    const { lgSize, smSize, lgPosition, smPosition, lgParallax, smParallax } =
      toRefs(props.imageSetting)

    const parallaxLg = computed({
      get: () => lgParallax.value,
      set: (value: boolean) => {
        emit('change', { lgParallax: value })
      },
    })

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

    const parallaxSm = computed({
      get: () => smParallax.value,
      set: (value: boolean) => {
        emit('change', { smParallax: value })
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

    const { isIOS } = useDetectIOS()

    return {
      isEditable,
      parallaxLg,
      autoLg,
      sizeLg,
      pxLg,
      pyLg,
      parallaxSm,
      autoSm,
      sizeSm,
      pxSm,
      pySm,
      isIOS,
    }
  },
})
</script>

<style lang="scss" scoped>
ul.image-settings {
  padding: 0.8rem;
  li {
    width: 14rem;
    display: flex;
    justify-content: stretch;
    p {
      width: 3rem;
    }
    div {
      flex-grow: 1;
    }
  }
}
</style>
