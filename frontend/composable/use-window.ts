import { ref, onMounted } from '@nuxtjs/composition-api'
import debounce from 'lodash/debounce'

/**
 * Use Window handling
 */
export const useWindow = () => {
  const windowHeight = ref(2048)
  const scrollY = ref(0)

  if (process.client) {
    const getWindowHeight = debounce(() => {
      windowHeight.value = window.innerHeight
    }, 200)

    const getScrollY = debounce(() => {
      scrollY.value = window.scrollY
    }, 20)

    onMounted(() => {
      getWindowHeight()
      getScrollY()

      window.addEventListener('load', getWindowHeight)
      window.addEventListener('resize', getWindowHeight)
      window.addEventListener('scroll', getScrollY)
    })
  }

  return {
    windowHeight,
    scrollY,
  }
}
