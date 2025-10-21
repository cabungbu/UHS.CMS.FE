import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { client_id, domainUrl, realms } from "@/commons";

export async function POST(request: NextRequest) {
  try {
    const { code, code_verifier } = await request.json();

    const tokenUrl = `https://keycloak.uhsvnu.com/realms/${realms}/protocol/openid-connect/token`;

    const tokenResponse = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        code_verifier,
        client_id: client_id,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
        redirect_uri: `${domainUrl}/callback`,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    const response = NextResponse.json({
      success: true,
      expires_in,
    });

    response.cookies.set("access_token", access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: expires_in,
      path: "/",
    });

    response.cookies.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch (error: any) {
    console.error("❌ Token exchange error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });

    return NextResponse.json(
      {
        error: "Authentication failed",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
