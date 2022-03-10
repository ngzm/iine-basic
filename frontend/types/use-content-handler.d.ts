/**
 * Use Data Handler
 */
export type SyncronizerFunction<T> = (data: T) => void
export type Syncronizer<T> = { id: number; func: SyncronizerFunction<T>; }

export type LoaderFunction<T> = () => Promise<T>
export type SaverFunction<T> = () => Promise<T>
export type ComparerFunction<T> = (c1: T, c2: T) => boolean

/**
 * Data Search Parameters
 */
interface SearchCoditionType {
  [key: string]: string | string[] | number | number[] | boolean | object | null
}
export type SearchConditon = SearchCoditionType[] | null

interface SortCoditionType {
  sortkey: string
  order: 'asc'|'desc'
}
export type SortCodition = SortCoditionType | null
