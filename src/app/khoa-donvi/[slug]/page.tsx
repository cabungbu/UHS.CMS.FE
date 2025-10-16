"use client";
import { useParams } from "next/navigation";
import { KhoaDonViSubMenu } from "../components/subMenu";

export default function ApartmentDetailPage() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;
  return (
    <div>
      <KhoaDonViSubMenu />
    </div>
  );
}
