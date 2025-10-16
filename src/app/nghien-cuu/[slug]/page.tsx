"use client";
import { useParams } from "next/navigation";
import { AboutSubMenu } from "../components/subMenu";

export default function AboutDetailPage() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;

  return (
    <div>
      <AboutSubMenu />
    </div>
  );
}
