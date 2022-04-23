/**
 * Data Search Parameters
 */
interface PageContidionType {
  page: number
  limit: number
}
export type PageConditon = PageContidionType | null

interface SearchCoditionType {
  [key: string]: string | string[] | number | number[] | boolean | object | null
}
export type SearchConditon = SearchCoditionType[] | null

interface SortCoditionType {
  sortkey: string
  order: 'asc'|'desc'
}
export type SortCodition = SortCoditionType | null
