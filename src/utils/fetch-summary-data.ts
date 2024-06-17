const fs = require('fs');
const csv = require('csv-parser');
import path from "path";
import { compareData } from "./compare-data";
import { CompanyPDFData } from "../pdf-service";

export const fetchSummaryData = (companyPdfData: CompanyPDFData, csvFilePath: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const csvData: any[] = [];
        fs.createReadStream(path.resolve(__dirname, csvFilePath))
            .pipe(csv())
            .on('data', (row: any) => {
                csvData.push(row);
            })
            .on('end', () => {
                const result = compareData(companyPdfData as any, csvData);
                resolve(result);
            })
            .on('error', (error: any) => {
                reject(error);
            });
    });
}
