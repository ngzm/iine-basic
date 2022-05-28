import { computed, useRoute } from '@nuxtjs/composition-api'

export const usePageLayout = () => {
  const route = useRoute()
  const isIndex = computed(() => route.value.name === 'index')
  const indexLinkTo = (hash: string) =>
    isIndex.value
      ? { scrollTo: { el: hash, offset: -180 }, to: { name: 'index' } }
      : { scrollTo: {}, to: { name: 'index', hash } }

  const toTop = computed(() => indexLinkTo('#index-top-position'))
  const toInformation = computed(() =>
    indexLinkTo('#index-information-article')
  )
  const toNews = computed(() => indexLinkTo('#index-news-article'))
  const toServices = computed(() => indexLinkTo('#index-services-article'))
  const toContact = computed(() => indexLinkTo('#index-contact-article'))

  return {
    toTop,
    toInformation,
    toNews,
    toServices,
    toContact,
  }
}
