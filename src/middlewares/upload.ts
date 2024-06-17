const multer = require('multer');
import { Request, Response, NextFunction } from "express";
import path from "path";

interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}

export interface MulterRequest extends Request {
 file: MulterFile;
}

type Callback = (error: Error | null, destination: string) => void;
class UploadMiddleware {

    fileUpload = (req: Request, res: Response, next: NextFunction) => {
        const storage = multer.diskStorage({
            destination:  (req: Request, file : MulterFile, callback: Callback ) => {
                callback(null, path.join(__dirname, '../assets'));
            },
            filename: (req: Request, file : MulterFile, callback: Callback ) => {
                callback(null, file.originalname);
            }
          
          })

          const upload = multer({ storage});
          upload.single('file');
          
         next()
    }

  

}

export default new UploadMiddleware()