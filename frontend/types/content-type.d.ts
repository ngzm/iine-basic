
export interface ContentType {
  id: number
  title?: string
  subtitle?: string
  comment?: string
  body?: string
  image?: string
  link?: string
}


export type EyeCatchType = Pick<ContentType, 'id'|'title'|'subtitle'|'image'>

export interface InformationType extends ContentType {}

export interface NewsType extends ContentType {
  category: string;
  publishOn: Date;
}

export interface ServiceType extends ContentType {}

export interface WorkType extends ContentType {
  category?: string
}

export interface AboutType extends ContentType {}

export interface ReasonType extends ContentType {}

export interface ContactType extends ContentType {}
