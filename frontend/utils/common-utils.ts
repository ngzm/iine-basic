/**
 * Timezone を意識しながら Date フォーマットする
 * @param  baseDate Date (UTC など Timezone 付き)
 * @param fmt 
 * @returns 
 */
export const formatLocalDates = (baseDate: Date|string, fmt = 'YYYY/MM/DD HH:mm') => {
  const moment = require('moment-timezone')
  const timezone = process.env.LOCAL_TIMEZONE || 'Asia/Tokyo'
  return moment.utc(baseDate).tz(timezone).format(fmt)
}

/**
 * 指定ミリ秒スリープする
 * Promise を返すので利用する側でawaitして
 * @param sleepms スリープ時間 ミリ秒
 * @returns Promise
 */
export const sleep = (sleepms: number) => {
  return new Promise((resolve) => setTimeout(() => {
    resolve('OK')
  }, sleepms))
}
