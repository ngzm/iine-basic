export interface ImageSetting {
  url: string
  lgSize: string | 'cover'
  smSize: string | 'cover'
  lgPosition: string | 'center'
  smPosition: string | 'center'
  lgParallax: boolean
  smParallax: boolean
}

/**
 * Content Data Types
 */
export interface ContentType {
  id: number
  customerId?: number
  title: string
  subtitle?: string
  body?: string
  image?: ImageSetting
  position?: number
  tags?: string[]
}

/**
 * Information
 */
export interface InformationType extends ContentType {}

/**
 * News
 */
export interface NewsType extends ContentType {
  body: string
  category: string
  publishOn: Date
}

/**
 * Service
 */
export interface ServiceType extends ContentType {
  body: string
  image: ImageSetting
  position: number
}

/**
 * Work
 */
export interface WorkType extends ContentType {
  category?: string
}

export interface AboutType extends ContentType {}

export interface ReasonType extends ContentType {}

/**
 * Contact
 */
export interface ContactType extends ContentType {}

/**
 * Eyecatcher
 */
export interface EyecatchType extends ContentType {
  image: ImageSetting
}

/**
 * ContentListOption
 */
export interface ContentPosition {
  id: number
  position: number
}

export type PositionObj = { [key: number]: number }
