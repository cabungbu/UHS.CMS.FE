"use client";
import { SimpleEditor } from "@/tiptap/components/tiptap-templates/simple/simple-editor";
import { AboutSubMenu } from "./components/subMenu";
import { Flex } from "antd";
import LanguageDisplay from "@/components/languageDisplay/LanguageDisplay";
import ThumbnailSelect from "@/components/thumnailSelect/ThumnailSelect";
import { Tabs } from "antd";
import { RiDraftLine } from "react-icons/ri";
import {
  MdOutlinePendingActions,
  MdOutlineLibraryAddCheck,
} from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function AboutPage() {
  return (
    <Flex>
      <AboutSubMenu />
    </Flex>
  );
}
