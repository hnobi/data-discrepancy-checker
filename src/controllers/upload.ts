import express, { Express, Request, Response } from "express";
import { PdfService } from "../pdf-service";
import { fetchSummaryData } from "../utils/fetch-summary-data";
import { MulterRequest } from "../middlewares/upload";

 class UploadController {

    compareData = async (req: Request, res: Response) => {
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
            res.status(201).send(summary)

        } catch (error) {
            return res.status(400).send({ error: error || "Cannot extract data. Invalid file provided." })
        }
    }

};


export default new UploadController()