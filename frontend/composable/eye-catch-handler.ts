import { reactive } from '@nuxtjs/composition-api'
import { EyeCatchType } from '@/types/content-type'

export default ( /* userId */ ) => {
  const eyeCatch = reactive(initialData())

  const loadEyeCatch = (id: number = 1) => {
    console.log(id)

    setEyeCatch(fetchEyeCatch())
  }

  const updateEyeCatch = (data: EyeCatchType) => {
    // update through API

    setEyeCatch({ ...initialData(), ...data })
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

const initialData = (): EyeCatchType => ({
  id: 0,
  title: '',
  subtitle: '',
  image: '',
})

const fetchEyeCatch = (): EyeCatchType => ({
  id: 1,
  title: '情報技術をチカラにしたい！',
  subtitle: 'ロングリブネットがサポートいたします',
  image: 'https://longlivenet.com/static/images/top01.jpg',
})
