"use client";
import { getLoginUrl } from "@/commons/lib/keycloak";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    const initLogin = async () => {
      try {
        if (typeof window === "undefined") return;

        const codeVerifier = generateRandomString(64);
        sessionStorage.setItem("pkce_verifier", codeVerifier);

        const codeChallenge = await generateCodeChallenge(codeVerifier);
        const loginUrl = getLoginUrl(codeChallenge);

        window.location.href = loginUrl;
      } catch (error) {
        console.error("Login initialization failed:", error);
      }
    };

    initLogin();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Đang chuyển hướng đến trang đăng nhập...</p>
    </div>
  );
}

function generateRandomString(length: number): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values)
    .map((v) => charset[v % charset.length])
    .join("");
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
