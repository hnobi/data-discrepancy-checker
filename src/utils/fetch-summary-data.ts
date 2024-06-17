const fs = require('fs');
const csv = require('csv-parser');
import path from "path";
import { Summary, compareData } from "./compare-data";
import { CompanyPDFData } from "../pdf-service";

export const fetchSummaryData = (companyPdfData: CompanyPDFData, csvFilePath: string): Promise<Summary> => {
    return new Promise((resolve, reject) => {
        const csvData: CompanyPDFData[] = [];
        fs.createReadStream(path.resolve(__dirname, csvFilePath))
            .pipe(csv())
            .on('data', (row: CompanyPDFData) => {
                csvData.push(row);
            })
            .on('end', () => {
                const result = compareData(companyPdfData, csvData);
                resolve(result);
            })
            .on('error', (error: any) => {
                reject(error);
            });
    });
}
