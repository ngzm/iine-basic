
export interface ContentType {
  id: number
  title?: string
  subtitle?: string
  body?: string
  image?: string
  link?: string
}

export interface NewsType extends ContentType{
  sectionId: number
  category: string
  publish: Date
}

export interface TopicType extends ContentType{
  sectionId: number
  position: number
}

export interface SectionType extends ContentType {
  articleId: number
  position: number
}

export interface ArticleType extends ContentType {
  id: number
  type: 'info'|'news'|'service'|'work'|'menu'|'reason'|'index'
  title: string
}
