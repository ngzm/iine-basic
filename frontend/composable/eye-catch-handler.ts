import { reactive } from '@nuxtjs/composition-api'
import { EyeCatchType, EyecatchFormType } from '@/types/content-type'

const initialData = (): EyeCatchType => ({
  id: 0,
  title: '',
  subtitle: '',
  image: '',
})

const fetchEyeCatch = (id: number = 1): EyeCatchType => ({
  id,
  title: '情報技術をチカラにしたい！',
  subtitle: 'ロングリブネットがサポートいたします',
  image: 'https://longlivenet.com/static/images/top01.jpg',
})

/**
 * Eyecatcher State
 */
const eyeCatch = reactive(initialData())

/**
 * Eyecatcher Handler
 */
export default ( /* userId */ ) => {
  const loadEyeCatch = (id: number) => {
    setEyeCatch(fetchEyeCatch(id))
  }

  const updateEyeCatch = (formData: EyecatchFormType) => {
    // update through API

    setEyeCatch(formData)
  }

  const setEyeCatch = (data: EyeCatchType) => {
    Object.assign(eyeCatch, data)
  }

  return {
    eyeCatch,
    loadEyeCatch,
    updateEyeCatch,
    setEyeCatch,
  }
}
