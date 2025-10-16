"use client";

import { Button, Flex, Avatar } from "antd";
import { MdChecklist } from "react-icons/md";
import { SimpleEditor } from "@/tiptap/components/tiptap-templates/simple/simple-editor";
import { Language } from "@/commons";

interface ContentVersionProps {
  language: Language;
  status: string;
}

export default function ContentVersion({
  language,
  status,
}: ContentVersionProps) {
  const bgColor = language === Language.VI ? "bg-[#e8f8f1]" : "bg-[#e8f1fb]";

  const statusLabelMap: Record<string, string> = {
    draft: "Nháp",
    submitted: "Chờ duyệt",
    approved: "Đã duyệt",
    rejected: "Từ chối",
  };

  const displayStatus = statusLabelMap[status] || status;

  return (
    <Flex
      vertical
      className={`w-full  border border-[var(--gray-8)] rounded-lg px-5 rounded-lg`}
    >
      <div
        className={`${bgColor} flex flex-col gap-2 p-5 rounded-tl-lg rounded-tr-lg`}
      >
        <Flex justify="space-between" align="center">
          <p className="font-bold text-lg text-[var(--primary-blue)]">
            {language === Language.VI
              ? "Phiên bản tiếng Việt"
              : "Phiên bản tiếng Anh"}
          </p>
          <Button size="small" type="primary">
            Private
          </Button>
        </Flex>

        <Flex align="center" className="gap-2 text-sm text-gray-700">
          <MdChecklist />
          <p>Trạng thái:</p>
          <p className="font-semibold capitalize">{displayStatus}</p>
        </Flex>

        <Flex align="center" className="gap-2 text-sm text-gray-700">
          <MdChecklist />
          <p>Lần cuối cập nhật: 16:02 01/10/2015</p>
        </Flex>

        <Flex align="center" className="gap-2 text-sm text-gray-700">
          <MdChecklist />
          <p>Người cập nhật</p>
          <Avatar
            size={24}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcbODdhLiKymNx_SRs_EhG1oAbqpO0XOLhzA&s"
          />
          <p>Ngô Thanh Vân</p>
        </Flex>
      </div>

      <SimpleEditor />
    </Flex>
  );
}
