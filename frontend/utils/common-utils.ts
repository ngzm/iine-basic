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
