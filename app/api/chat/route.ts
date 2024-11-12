import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json(
        { error: "Message content is required!" },
        { status: 400 }
      );
    }
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `${message} \nberikan response dalam bahasa indonesia`,
        },
      ],
      model: "llama3-8b-8192",
    });

    const responseMessage =
      chatCompletion.choices[0]?.message?.content || "No response from llama.";
    return NextResponse.json({ response: responseMessage });
  } catch (error) {
    console.error("Error in chat API: ", error);
    return NextResponse.json(
      { error: "An error occured while processing your request." },
      { status: 500 }
    );
  }
}
