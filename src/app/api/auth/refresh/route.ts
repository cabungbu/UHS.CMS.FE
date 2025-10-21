import { NextResponse } from "next/server";
import axios from "axios";
import { tokenUrl } from "@/commons/lib/keycloak";

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const refreshTokenMatch = cookieHeader.match(/refresh_token=([^;]+)/);
    const refresh_token = refreshTokenMatch?.[1];

    if (!refresh_token) {
      return NextResponse.json(
        { error: "Missing refresh_token" },
        { status: 401 }
      );
    }

    const params = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: "CMS.UHS",
      refresh_token,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
    });

    const res = await axios.post(tokenUrl, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const { access_token, refresh_token: new_refresh, expires_in } = res.data;

    const response = NextResponse.json({ success: true, expires_in });

    response.cookies.set("access_token", access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: expires_in,
      path: "/",
    });

    response.cookies.set("refresh_token", new_refresh, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("❌ Refresh token failed:", error.response?.data || error);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 401 }
    );
  }
}
