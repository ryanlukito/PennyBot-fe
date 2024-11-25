import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME } from "@/constants";

const MAX_AGE = 60 * 60 * 24 * 10000;

export async function POST(request: Request) {
  const body = await request.json();

  const { username, password } = body;

  if (username !== "admin" || password !== "admin123") {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const secret = process.env.JWT_SECRET || "";

  const token = sign(
    {
      username,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = {
    message: "Authenticated!",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
}
