import { CompanyPDFData } from "../pdf-service";

const CompanyName = "Company Name";
 interface MismatchesData {
    field: string,
    extracted: string | number,
    stored: string | number | null
}

export interface Summary {
    matched: boolean,
    extractedData: CompanyPDFData,
    storedData: null | CompanyPDFData,
    mismatches: MismatchesData[]
}


export const compareData = (extractedData: CompanyPDFData, csvData: CompanyPDFData[]) => {
  let summary: Summary = {
      matched: false,
      extractedData,
      storedData: null,
      mismatches: [],
  };
  const storedData = csvData.find((csv: CompanyPDFData) => csv[CompanyName] === extractedData[CompanyName]);

  if (storedData) {
      summary.matched = true;
      summary.storedData = storedData;
      for (let key in extractedData) {
          if (extractedData[key] !== storedData[key]) {
              summary.mismatches.push({
                  field: key,
                  extracted: extractedData[key],
                  stored: storedData[key]
              });
          }
      }
  }else{
    for (let key in extractedData) {
            summary.mismatches.push({
                field: key,
                extracted: extractedData[key],
                stored: null
            });
        
    }
  }

  return summary;
}