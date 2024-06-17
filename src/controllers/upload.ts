import express, { Express, Request, Response } from "express";
import { PdfService } from "../pdf-service";
import { fetchSummaryData } from "../utils/fetch-summary-data";
import { MulterRequest } from "../middlewares/upload";

 class UploadController {

    async compareData(req: Request, res: Response){
        const multerReq = req as MulterRequest;
        if (!multerReq.file) {
            return res.status(400).send('No file uploaded.');
        }
        
        try {
            const pdfService = new PdfService("TEST_KEY")
           const companyPdfData = await pdfService.extract(`assets/${multerReq.file.originalname}`)
              
            if (!companyPdfData) {
                return res.status(400).send({ error: "Cannot extract data. Invalid file provided." })
            }
            const summary = await fetchSummaryData(companyPdfData, '../../data/database.csv');       
            res.status(200).send(summary)

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred.";

            return res.status(400).send({ error: errorMessage })
        }
    }

};


export default new UploadController()