import { COOKIE_NAME } from "@/constants";
// import { error } from "console";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get(COOKIE_NAME);
  console.log(token)
  if (!token) {
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

  try {
    verify(token.value, secret);

    const response = {
      message: "Super Top Secret User!",
      auth: true
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        e,
      },
      {
        status: 400,
      }
    );
  }
}
