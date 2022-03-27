'use strict'

import multer from 'multer'

/**
 * Middleware - Uploader based on multer
 */
 const storage = multer.diskStorage({
   destination: function(req, file, cb) {
     cb(null, 'uploads/');
   },
   filename: function(req, file, cb) {
     cb(null, file.originalname);
   }
 })
 export const upload = multer({ storage })
 