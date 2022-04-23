
/**
 * データ種別
 */
export const contentDataTypes = {
  eyecatch: 'eyecatch',
  information: 'information',
  news: 'news',
  service: 'service',
  work: 'work',
  contact: 'contact',
  menu: 'menu',
  none: 'none'
} as const

export type ContentDataType = typeof contentDataTypes[keyof typeof contentDataTypes];

/**
 * アクション操作種別
 */
export const contentActionTypes = {
 create: 'create',
 update: 'update',
 moddel: 'moddel',
 none: 'none'
} as const

export type ContentActionType = typeof contentActionTypes[keyof typeof contentActionTypes];
