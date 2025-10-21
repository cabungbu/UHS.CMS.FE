// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import { client_id, domainUrl, realms } from "@/commons";

export async function POST(req: Request) {
  try {
    const cookies = req.headers.get("cookie");
    const refresh_token = cookies
      ?.split("; ")
      ?.find((c) => c.startsWith("refresh_token="))
      ?.split("=")[1];

    const logoutUrl = `https://keycloak.uhsvnu.com/realms/${realms}/protocol/openid-connect/logout`;

    const params = new URLSearchParams({
      client_id: client_id,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
    });

    if (refresh_token) params.append("refresh_token", refresh_token);

    await axios.post(logoutUrl, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const res = NextResponse.redirect(`${domainUrl}/login`);

    // Xóa cookies
    res.cookies.delete("access_token");
    res.cookies.delete("refresh_token");

    return res;
  } catch (err: any) {
    console.error("❌ Keycloak logout error:", err.response?.data || err);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
