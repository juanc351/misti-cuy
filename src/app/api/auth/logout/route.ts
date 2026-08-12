import { NextResponse } from "next/server";

const SESSION_COOKIE_NAME =
  "misti_cuy_session";

export async function POST() {
  const response =
    NextResponse.json({
      success: true,
    });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure:
      process.env.NODE_ENV ===
      "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}