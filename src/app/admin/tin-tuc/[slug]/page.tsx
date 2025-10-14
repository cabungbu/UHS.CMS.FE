"use client";
import { useParams } from "next/navigation";
import { NewsSubMenu } from "../components/subMenu";

export default function NewsDetailPage() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;

  return (
    <div>
      <NewsSubMenu />
      <h1 className="text-2xl font-semibold mb-4">
        Trang tin tuc: {slug.replace(/-/g, " ")}
      </h1>
    </div>
  );
}
