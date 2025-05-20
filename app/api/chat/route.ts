import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    // Validasi input
    if (!message) {
      return new Response("Pesan wajib diisi!", { status: 400 });
    }

    // Format history untuk chat
    let formattedHistory = history?.map(
      (msg: { role: string; text: string }) => ({
        role: msg.role === "bot" ? "model" : msg.role,
        parts: [{ text: msg.text }],
      })
    );

    // Ensure history starts with a user turn
    if (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
      formattedHistory = [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        ...formattedHistory,
      ];
    }

    // Buat sesi chat
    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: formattedHistory,
      config: {
        maxOutputTokens: 500,
        temperature: 0.1,
        systemInstruction: "",
      },
    });

    const prompt = `Jawablah pertanyaan ini dengan suara kambing: ${message}`;

    // Kirim pesan dan dapatkan respons
    const response = await chat.sendMessage({
      message: prompt,
    });

    return NextResponse.json(
      {
        reply: response.text,
        message: "Chat response generated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to generate chat response", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
