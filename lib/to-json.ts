export function parseResponseToJson(responseText: string) {
    try {
        let cleanedText = responseText.trim();
        if (cleanedText.startsWith("```json")) {
            cleanedText = cleanedText.substring(7);
        } else if (cleanedText.startsWith("```")) {
            cleanedText = cleanedText.substring(3);
        }
        if (cleanedText.endsWith("```")) {
            cleanedText = cleanedText.substring(0, cleanedText.length - 3);
        }
        cleanedText = cleanedText.trim();
        console.log("cleand text is", cleanedText)
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Error parsing JSON response:", error);
        throw new Error("Failed to parse model response as JSON");
    }
}