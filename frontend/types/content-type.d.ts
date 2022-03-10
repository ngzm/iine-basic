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
}

/**
 * Information
 */
export interface InformationType extends ContentType {}
export interface InformationFormType extends InformationType {
  imageFile?: File | null
}

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
export interface EyeCatchType {
  id: number
  title?: string
  subtitle?: string
  image?: string
}
export interface EyecatchFormType extends EyeCatchType {
  imageFile?: File | null
}
