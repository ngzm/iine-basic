/**
 * Content Data Types
 */
export interface ContentType {
  id: number
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
  category: string
  publishOn: Date
}

/**
 * Service
 */
export interface ServiceType extends ContentType {}

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
export interface EyecatchType {
  id: number
  title?: string
  subtitle?: string
  image?: string
}


/**
 * ContentListOption
 */
export interface ContentPosition {
  id: number
  position: number
}
