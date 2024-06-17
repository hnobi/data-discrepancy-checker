import express from 'express';
import UploadController from '../controllers/upload';
import uploadMiddleware from '../middlewares/upload';

const uploadRouter = express.Router();

uploadRouter.route('/upload')
    .post(uploadMiddleware.fileUpload, UploadController.compareData);

export { uploadRouter }