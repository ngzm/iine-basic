
export interface ContentType {
  id: number
  title?: string
  subtitle?: string
  comment?: string
  body?: string
  image?: string
  link?: string
}

export interface InformationType extends ContentType {}

export interface NewsType extends ContentType {
  category: string
  publishOn: Date
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
