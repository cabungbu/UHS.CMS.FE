"use client";
import { useParams } from "next/navigation";
import { AboutSubMenu } from "../components/subMenu";
import LanguageDisplay from "@/components/languageDisplay/LanguageDisplay";
import ThumbnailSelect from "@/components/thumnailSelect/ThumnailSelect";
import ContentTabs from "@/components/contentTab/ContentTab";
import { Flex } from "antd";

export default function AboutDetailPage() {
  const params = useParams<{ slug: string }>();
  const { slug } = params;

  return (
    <Flex vertical={true} className="gap-5">
      <AboutSubMenu />
      <LanguageDisplay />
      <ThumbnailSelect />
      <ContentTabs />
    </Flex>
  );
}
