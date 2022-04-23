'use strict';

import log4js from 'log4js'

log4js.configure('./lib/logger-config.json')

const logger = log4js.getLogger('default')
export default logger

export const setLogLevel = (level = 'warn') => {
  logger.level = level
}
