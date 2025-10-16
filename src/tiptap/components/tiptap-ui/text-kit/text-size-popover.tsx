"use client";

import * as React from "react";
import type { Editor } from "@tiptap/react";
import { useTiptapEditor } from "@/tiptap/hooks/use-tiptap-editor";

import { Button } from "@/tiptap/components/tiptap-ui-primitive/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/tiptap/components/tiptap-ui-primitive/popover";
import { Card, CardBody } from "@/tiptap/components/tiptap-ui-primitive/card";
import { ChevronDownIcon } from "lucide-react";

const FONT_SIZES = [
  { label: "12", value: "12px" },
  { label: "13", value: "13px" },
  { label: "15", value: "15px" },
  { label: "16", value: "16px" },
  { label: "18", value: "18px" },
  { label: "20", value: "20px" },
  { label: "24", value: "24px" },
  { label: "28", value: "28px" },
  { label: "32", value: "32px" },
];

export const TextSizePopover = React.forwardRef<
  HTMLButtonElement,
  { editor?: Editor | null }
>(({ editor: providedEditor }, ref) => {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentSize, setCurrentSize] = React.useState("16px");

  // 🔄 Cập nhật khi selection thay đổi
  React.useEffect(() => {
    if (!editor) return;

    const update = () => {
      const size = editor.getAttributes("textStyle").fontSize || "16px";
      setCurrentSize(size);
    };

    update();
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  if (!editor) return null;

  const setSize = (size: string) => {
    const { state } = editor;
    const { empty } = state.selection;

    if (empty) {
      return;
    }
    editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
    setCurrentSize(size);
  };

  const unsetSize = () => {
    const { state } = editor;
    const { empty } = state.selection;

    if (empty) {
      return;
    }
    editor.chain().focus().unsetMark("textStyle").run();
    setCurrentSize("16px");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          //   data-style="primary"
          role="button"
          aria-label="Text size"
        >
          <span className="text-sm font-medium select-none mt-1">
            {currentSize.replace("px", "")}
          </span>
          <ChevronDownIcon className="ml-1 h-4 w-4 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="start"
        className="w-32"
        aria-label="Text size picker"
      >
        <Card>
          <CardBody className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="number"
                min={8}
                max={72}
                value={parseInt(currentSize)}
                onChange={(e) => setCurrentSize(`${e.target.value}px`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSize(currentSize);
                    setIsOpen(false);
                  }
                }}
                className="w-15 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs text-muted-foreground">px</span>
            </div>
            {FONT_SIZES.map(({ label, value }) => (
              <Button
                key={value}
                type="button"
                onClick={() => {
                  setSize(value);
                  setIsOpen(false);
                }}
                data-style="ghost"
                data-active-state={currentSize === value ? "on" : "off"}
                className="justify-start"
              >
                {label}px
              </Button>
            ))}
            <Button
              type="button"
              onClick={() => {
                unsetSize();
                setIsOpen(false);
              }}
              data-style="ghost"
              className="text-sm text-muted-foreground mt-1"
            >
              Reset
            </Button>
          </CardBody>
        </Card>
      </PopoverContent>
    </Popover>
  );
});

TextSizePopover.displayName = "TextSizePopover";
export default TextSizePopover;
