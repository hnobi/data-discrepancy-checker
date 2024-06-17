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

    fileUpload (req: Request, res: Response, next: NextFunction){
        const storage = multer.diskStorage({
            destination:  (req: Request, file : MulterFile, callback: Callback ) => {
                callback(null, path.join(__dirname, '../assets'));
            },
            filename: (req: Request, file : MulterFile, callback: Callback ) => {
                if (file.mimetype === 'application/pdf') {
                    callback(null, file.originalname);
                  } else {
                    callback(new Error('Only PDF files are allowed!'), '');
                  }
                
            }
          
          })

          const upload = multer({ storage});
         const fileUpload =  upload.single('file');

         fileUpload(req, res, (err: any) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            next();
        });
    }

  

}

export default new UploadMiddleware()