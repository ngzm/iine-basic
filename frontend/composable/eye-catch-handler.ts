import { reactive } from '@nuxtjs/composition-api'
import { EyeCatchType } from '@/types/content-type'

export default ( /* userId */ ) => {
  const eyeCatch = reactive(initEyeCatch())
  const loadEyeCatch = (id: number = 1) => {
    console.log(id)
    Object.assign(eyeCatch, fetchEyeCatch())
  }

  return {
    initEyeCatch,
    eyeCatch,
    loadEyeCatch,
  }
}

const initEyeCatch = (): EyeCatchType => ({
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
