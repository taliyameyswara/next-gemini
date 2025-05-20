import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const systemPrompt = `Kamu adalah asisten yang membantu pengguna untuk merangkum catatan. Jika catatan pengguna adalah sebagai berikut ${message}, maka buatlah ringkasan yang tepat, singkat.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: systemPrompt,
      config: {
        maxOutputTokens: 100,
        temperature: 0.7,
      },
    });

    return NextResponse.json(
      {
        summary: response.text,
        message: "Success generate content",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
