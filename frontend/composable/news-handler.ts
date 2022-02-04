import { reactive, ref } from '@nuxtjs/composition-api'
import { NewsType } from '@/types/content-type'
import { initContent } from '@/composable/content'

export default ( /* userId */ ) => {
  const news = reactive(initNews())
  const loadNews = (/* id: number */) => {
    /* not implimented */
  }

  const newses = ref([] as NewsType[])
  const loadNewses = (ln?: number) => {
    if (ln) {
      const fetchData = fetchNewses()
      newses.value.push(...fetchData)
    } else {
      const fetchData = fetchNewses()
      newses.value.push(...fetchData)
    }
  }

  return {
    initNews,
    news,
    loadNews,
    newses,
    loadNewses,
  }
}

const initNews = (): NewsType => ({
  ...initContent(),
  category: '',
  publishOn: new Date(),
})

let idSeq = 0;
const fetchNewses = (): NewsType[] => ([
  { id: ++idSeq, category: 'I', title: '当事業所のホームページを作成いたしました', publishOn: new Date('2020-02-23 10:00:00'.replace(/-/g, '/')) },
  { id: ++idSeq, category: 'S', title: '初仕事で開発したサイトがリリースされました', publishOn: new Date('2020-04-10 01:00:00'.replace(/-/g, '/')) },
  { id: ++idSeq, category: 'W', title: '開発したWebサイトがリリースされました', publishOn: new Date('2020-10-05 00:00:00'.replace(/-/g, '/')) },
  { id: ++idSeq, category: 'T', title: 'おかげさまで一周年です！', publishOn: new Date('2020-02-27 00:00:00'.replace(/-/g, '/')) },
  { id: ++idSeq, category: 'N', title: 'テストテストこれはテスト、少し長い文字列ですが', publishOn: new Date('2020-02-25 00:00:00'.replace(/-/g, '/')) },
])
