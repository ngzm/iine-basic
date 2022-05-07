/**
 * Content Data Types
 */
export interface ContentType {
  id: number
  customerId?: number
  title: string
  subtitle?: string
  body?: string
  image?: string
  position?: number
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
  image: string
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
  image: string
}

/**
 * ContentListOption
 */
export interface ContentPosition {
  id: number
  position: number
}

export type PositionObj = { [key: number]: number }
