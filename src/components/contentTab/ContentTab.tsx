import { Tabs, Flex } from "antd";
import { RiDraftLine } from "react-icons/ri";
import {
  MdOutlinePendingActions,
  MdOutlineLibraryAddCheck,
} from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ContentVersion from "@/components/contentVersion/ContentVersion";
import { Language } from "@/commons";

const items = [
  {
    key: "1",
    label: (
      <Flex className="gap-3 items-center">
        <RiDraftLine size={18} />
        <span>Nháp</span>
      </Flex>
    ),
    children: (
      <Flex className="gap-3">
        <ContentVersion language={Language.VI} status="draft" />
        <ContentVersion language={Language.EN} status="draft" />
      </Flex>
    ),
  },
  {
    key: "2",
    label: (
      <Flex className="gap-3">
        <MdOutlinePendingActions size={18} />
        <span>Chờ duyệt</span>
      </Flex>
    ),
    children: (
      <Flex className="gap-3">
        <ContentVersion language={Language.VI} status="submitted" />
        <ContentVersion language={Language.EN} status="submitted" />
      </Flex>
    ),
  },
  {
    key: "3",
    label: (
      <Flex className="gap-3">
        <MdOutlineLibraryAddCheck size={18} />
        <span>Đã duyệt</span>
      </Flex>
    ),
    children: (
      <Flex className="gap-3">
        <ContentVersion language={Language.VI} status="approved" />
        <ContentVersion language={Language.EN} status="approved" />
      </Flex>
    ),
  },
  {
    key: "4",
    label: (
      <Flex className="gap-3">
        <IoIosCloseCircleOutline size={18} />
        <span>Từ chối</span>
      </Flex>
    ),
    children: (
      <Flex className="gap-3">
        <ContentVersion language={Language.VI} status="rejected" />
        <ContentVersion language={Language.EN} status="rejected" />
      </Flex>
    ),
  },
];

export default function ContentTabs() {
  return (
    <div className="w-full bg-[var(--sidebar-bg)] border border-[var(--gray-8)] rounded-lg p-5 gap-3">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}
