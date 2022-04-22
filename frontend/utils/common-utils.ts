import dayjs, { extend } from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import sanitizeHtml from 'sanitize-html'

// Day.js set default timezone
extend(utc)
extend(timezone)
dayjs.tz.setDefault("Asia/Tokyo")

/**
 * Timezone を意識しながら Date フォーマットする
 * @param  baseDate Date (UTC など Timezone 付き)
 * @param fmt 
 * @returns 
 */
export const formatLocalDates = (baseDate: Date|string, fmt = 'YYYY/MM/DD HH:mm') => {
  const tz = process.env.LOCAL_TIMEZONE || 'Asia/Tokyo'
  return dayjs(baseDate).tz(tz).format(fmt)
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

/**
 * HTML を Sanitize する
 */
export const sanitizer = (htmlText: string | undefined) => (
  sanitizeHtml(htmlText || '', {
    allowedAttributes: {
      '*': ["class", "style"],
      'a': [ 'href', 'name', 'target', 'rel' ],
    }
  })
)
