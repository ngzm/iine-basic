'use strict'

/**
 * 値がきちんと定義されている (null や undefined でない) ことをチェック
 * @param {*} value
 * @returns null: false, undefined: false, '': true, []: true, {}: true, 0: true 
 */
 export const isDefined = (value) => {
  return null !== value && undefined !== value
}

/**
 * 値が数値かどうかをチェック
 * @param {*} value 
 * @returns 
 */
export const isInt = (value) => {
  let x;
  if (isNaN(value)) return false
  x = parseFloat(value)
  return (x | 0) === x
};

/**
 * 値が存在すること (null や undefined や '' でない) ことをチェック
 * @param {*} value
 * @returns null: false, undefined: false, '': false, []: true, {}: true, 0: true 
 */
 export const isPresent = (value) => {
  return isDefined(value) && '' !== value
}

/**
 * 数字を指定桁でセロ埋めした文字列に変換
 */
export const zeroPaddingString = (num, length) => (
  isInt(num) ? num.toString().padStart(length, '0') : 'notnumber'
)

/**
 * ファイル名から拡張子を抜き出して返す
 * @param {*} filename 
 * @returns 
 */
export const getFileExtension = (filename) => {
  const found = filename.lastIndexOf('.') + 1
  return found > 0 ? filename.substr(found) : ''
}

/**
 * password 複雑度チェッカ
 * @param {*} value 
 * @returns 
 */
export const passwordComplexity = (value) => {
  if (value === null || value === undefined || value.length <= 0) return false
  if (!/[a-z]/.test(value)) return false
  if (!/[A-Z]/.test(value)) return false
  if (!/\d/.test(value)) return false
  return true
}
