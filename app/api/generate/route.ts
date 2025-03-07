
import { generateExamAnalysisPrompt } from "@/lib/prompt";
import { convertToProperJson } from "@/lib/to-json";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files") as File[];
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        if (files[0].size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 });
        }

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files found" }, { status: 400 });
        }

        const contentParts = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            contentParts.push({
                inlineData: {
                    data: buffer.toString("base64"),
                    mimeType: "application/pdf",
                }
            });
        }

        const dynamicPrompt = generateExamAnalysisPrompt(files.length);
        contentParts.push(dynamicPrompt);

        const result = await model.generateContent(contentParts);
        console.log(result)

        const response = convertToProperJson(result.response.text());
        console.log("response is",response);

        return NextResponse.json(response);
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "An error occurred during your request"
        }, { status: 500 });
    }
}