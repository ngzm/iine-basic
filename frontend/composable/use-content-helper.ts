import { ContentType } from '@/types/content-type'

export const initContent = (): ContentType => ({
  id: 0,
  title: '',
  subtitle: '',
  body: '',
  image: '',
  link: '',
})

export const contentDataTypes = {
  eyecatch: 'eyecatch',
  information: 'information',
  news: 'news',
  service: 'service',
  work: 'work',
  contact: 'contact',
  menu: 'menu',
  none: 'none'
} as const

export type ContentDataType = typeof contentDataTypes[keyof typeof contentDataTypes];
