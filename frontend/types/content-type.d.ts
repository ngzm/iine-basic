/**
 * Content Data Types
 */
export interface ContentType {
  id: number
  userId?: number
  title?: string
  subtitle?: string
  body?: string
  image?: string
  link?: string
  position?: number
  removed?: boolean
}

/**
 * Information
 */
export interface InformationType extends ContentType {}

/**
 * News
 */
export interface NewsType extends ContentType {
  title: string
  body: string
  category: string
  publishOn: Date
}

/**
 * Service
 */
export interface ServiceType extends ContentType {
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
export interface EyecatchType extends ContentType {}

/**
 * ContentListOption
 */
export interface ContentPosition {
  id: number
  position: number
}
