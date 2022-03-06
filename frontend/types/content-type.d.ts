
export interface ContentType {
  id: number
  title?: string
  subtitle?: string
  comment?: string
  body?: string
  image?: string
  link?: string
}

type ContentFormType = ContentType & {
  imageFile?: File|null
}

export interface InformationType extends ContentType {}
export interface InformationFormType extends ContentFormType {}

export interface NewsType extends ContentType {
  category: string
  publishOn: Date
}
export type NewsFormType = NewsType & {
  imageFile?: File|null
}

export interface ServiceType extends ContentType {}

export interface WorkType extends ContentType {
  category?: string
}

export interface AboutType extends ContentType {}

export interface ReasonType extends ContentType {}

export interface ContactType extends ContentType {}

export interface EyeCatchType {
  id: number
  title?: string
  subtitle?: string
  image?: string
}

export type EyecatchFormType = EyeCatchType & {
  imageFile?: File|null
}
