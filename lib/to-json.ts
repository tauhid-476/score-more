export function convertToProperJson(input: string): ExamAnalysisResponse {
    try {
      let cleanedInput = input.trim();
      if (cleanedInput.startsWith('"') && cleanedInput.endsWith('"')) {
        cleanedInput = cleanedInput.slice(1, -1);
      }
      
      cleanedInput = cleanedInput.replace(/```json\n/g, '');
      cleanedInput = cleanedInput.replace(/```/g, '');
      
      cleanedInput = cleanedInput.replace(/\\\\n/g, '\\n');
      
      const parsedData: ExamAnalysisResponse = JSON.parse(cleanedInput);
      
      return parsedData;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw new Error(`Failed to parse JSON: ${error}`);
    }
  }