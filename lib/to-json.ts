import { jsonrepair } from 'jsonrepair';

export function convertToProperJson(input: string): ExamAnalysisResponse {
  try {
    let cleanedInput = input.trim();
    
    if (cleanedInput.startsWith('"') && cleanedInput.endsWith('"')) {
      cleanedInput = cleanedInput.slice(1, -1);
    }
    
    cleanedInput = cleanedInput.replace(/```json\n?/g, '');
    cleanedInput = cleanedInput.replace(/```\n?/g, '');
    
    console.log("Attempting to repair JSON...");
    const repairedJson = jsonrepair(cleanedInput);
    
    const parsedData: ExamAnalysisResponse = JSON.parse(repairedJson);
    console.log("Successfully parsed JSON");
    
    return parsedData;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw new Error(`Failed to parse JSON: ${error}`);
  }
}