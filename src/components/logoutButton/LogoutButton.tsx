"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/store/hooks";
import { clearAuth } from "@/store/authSlice";

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(clearAuth());
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    sessionStorage.removeItem("pkce_verifier");
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.redirected) {
        window.location.href = res.url;
      }
    } catch (e) {
      console.error("Logout Keycloak error:", e);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
    >
      Đăng xuất
    </button>
  );
}
