"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { useAppDispatch } from "@/store/hooks";
import { setAuth } from "@/store/authSlice";

export default function CallbackPage() {
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const code = params.get("code");
    const errorParam = params.get("error");

    if (errorParam) {
      setError("Đăng nhập thất bại: " + errorParam);
      setTimeout(() => (window.location.href = "/login"), 2000);
      return;
    }

    if (!code) {
      setError("Không tìm thấy mã xác thực");
      setTimeout(() => (window.location.href = "/login"), 2000);
      return;
    }

    const getToken = async () => {
      try {
        const codeVerifier = sessionStorage.getItem("pkce_verifier");

        if (!codeVerifier) {
          throw new Error("Code verifier không tồn tại");
        }

        const res = await axios.post(
          "/api/auth/token",
          { code, code_verifier: codeVerifier },
          { withCredentials: true }
        );

        const { expires_in, access_token } = res.data;

        await dispatch(
          setAuth({
            isAuthenticated: true,
            expires_in: Date.now() + expires_in * 1000,
            access_token,
          })
        );

        sessionStorage.removeItem("pkce_verifier");

        setTimeout(() => {
          router.replace("/dashboard");
        }, 300);
      } catch (err: any) {
        console.error("❌ Token exchange failed:", err);

        const errorMessage =
          err.response?.data?.details?.error_description ||
          err.response?.data?.error ||
          "Xác thực thất bại";

        setError(errorMessage);
        sessionStorage.removeItem("pkce_verifier");

        setTimeout(() => (window.location.href = "/login"), 3000);
      }
    };

    getToken();
  }, [params, dispatch]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="text-red-500 text-5xl mb-4 text-center">✕</div>
          <p className="text-red-600 text-center font-medium">{error}</p>
          <p className="text-gray-600 text-sm text-center mt-2">
            Đang chuyển về trang đăng nhập...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
        <p className="text-lg text-gray-700">Đang xác thực...</p>
      </div>
    </div>
  );
}
