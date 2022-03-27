'use strict'

import moment from 'moment'

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
 * 数字を指定桁でセロ埋めした文字列に変換
 */
export const toPaddedString = (num, length) => (
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
 * アップロードファイル名からバケットオブジェクト名を返す
 * @param {*} prefix iineではuserIDを使用する
 * @param {*} originalname 
 * @returns 
 */
export const getBucketObjectName = (prefix, originalname) => {
  const timestamp = moment().format("YYYYMMDD-HHmmSS")
  const ext = getFileExtension(originalname);
  return `${prefix}_${timestamp}.${ext}`;
}

/**
 * ファイル名文字列から拡張子別のcontent-type取得
 * API仕様書に記載されていないものつについては application/octet-stream 扱いとする
 * @param {string} fname 
 * @returns {Object} コンテンツタイプ(MIME type)とシステム内表示可能フラグ(true/false)
 */
export const getContentType = (fname) => {
  fname = fname.toLowerCase();
  if (fname.endsWith('.docx')) {
    return { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isView: true };
  } else if (fname.endsWith('.doc')) {
    return { type: 'application/msword', isView: true };
  } else if (fname.endsWith('.xls')) {
    return { type: 'application/vnd.ms-excel', isView: true };
  } else if (fname.endsWith('.xlsx')) {
    return { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', isView: true };
  } else if (fname.endsWith('.ppt')) {
    return { type: 'application/vnd.ms-powerpoint', isView: true };
  } else if (fname.endsWith('.pptx')) {
    return { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', isView: true };
  } else if (fname.endsWith('.pdf')) {
    return { type: 'application/pdf', isView: true };
	} else if (fname.endsWith('.jpg')
          || fname.endsWith('.jpeg')
          || fname.endsWith('.jfif')
          || fname.endsWith('.pjpeg')
          || fname.endsWith('.jpe')
          || fname.endsWith('.pjp')) {
    return { type: 'image/jpeg', isView: true };
  } else if (fname.endsWith('.tiff') || fname.endsWith('.tif')) {
    return { type: 'image/tiff', isView: true };
  } else if (fname.endsWith('.png')) {
    return { type: 'image/png', isView: true };
  } else if (fname.endsWith('.txt')) {
    return { type: 'text/plain', isView: true };
  } else if (fname.endsWith('.gif')) {
    return { type: 'image/gif', isView: true };
  } else if (fname.endsWith('.svg')) {
    return { type: 'image/svg+xml', isView: true };
  } else if (fname.endsWith('.heic')) {
    return { type: 'image/heic', isView: true };
  }
  return { type: 'application/octet-stream', isView: true };
}
