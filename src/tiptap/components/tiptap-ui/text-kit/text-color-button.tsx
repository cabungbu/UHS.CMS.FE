// components/tiptap-ui/text-color-popover.tsx
"use client";

import * as React from "react";
import type { Editor } from "@tiptap/react";
import { PaletteIcon } from "lucide-react";
import { useTiptapEditor } from "@/tiptap/hooks/use-tiptap-editor";
import { useIsMobile } from "@/tiptap/hooks/use-mobile";

// UI primitives
import {
  Button,
  ButtonGroup,
} from "@/tiptap/components/tiptap-ui-primitive/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/tiptap/components/tiptap-ui-primitive/popover";
import { Separator } from "@/tiptap/components/tiptap-ui-primitive/separator";
import {
  Card,
  CardBody,
  CardItemGroup,
} from "@/tiptap/components/tiptap-ui-primitive/card";

import type { ButtonProps } from "@/tiptap/components/tiptap-ui-primitive/button";

const PRESET_COLORS = [
  { name: "Purple", hex: "#9042f5" },
  { name: "Red", hex: "#f70202" },
  { name: "Orange", hex: "#f77c02" },
  { name: "Yellow", hex: "#f7e302" },
  { name: "Blue", hex: "#209cfa" },
  { name: "Teal", hex: "#20fa8d" },
  { name: "Green", hex: "#36fa20" },
];

export const TextColorButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        type="button"
        className={className}
        data-style="ghost"
        data-appearance="default"
        role="button"
        tabIndex={-1}
        aria-label="Text color"
        tooltip="Text color"
        ref={ref}
        {...props}
      >
        {children ?? <PaletteIcon className="tiptap-button-icon" />}
      </Button>
    );
  }
);

TextColorButton.displayName = "TextColorButton";

interface TextColorMainProps {
  currentColor: string;
  setColor: (color: string) => void;
  unsetColor: () => void;
}

const TextColorMain: React.FC<TextColorMainProps> = ({
  currentColor,
  setColor,
  unsetColor,
}) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardBody>
        <CardItemGroup orientation="vertical" className="gap-2">
          <ButtonGroup orientation="horizontal" className="flex-wrap">
            {PRESET_COLORS.map(({ name, hex }) => (
              <Button
                key={hex}
                type="button"
                onClick={() => setColor(hex)}
                data-style="ghost"
                style={{
                  backgroundColor: hex,
                  border:
                    currentColor === hex ? "2px solid black" : "1px solid #ccc",
                }}
                className="w-8 h-8 rounded-full p-0"
                title={name}
                aria-label={`${name} color`}
              />
            ))}
          </ButtonGroup>

          <Button
            type="button"
            onClick={unsetColor}
            data-style="ghost"
            className="text-sm"
          >
            Unset color
          </Button>
        </CardItemGroup>
      </CardBody>
    </Card>
  );
};

export const TextColorPopover = React.forwardRef<
  HTMLButtonElement,
  { editor?: Editor | null } & Omit<ButtonProps, "type">
>(({ editor: providedEditor, ...buttonProps }, ref) => {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = React.useState(false);
  if (!editor) return null;

  const currentColor =
    typeof editor.getAttributes("textStyle").color === "string"
      ? editor.getAttributes("textStyle").color
      : "";

  const setColor = (color: string) => {
    if (!editor) return;
    if (typeof color !== "string" || !color.startsWith("#")) return;

    const { state, view } = editor;
    const { empty } = state.selection;

    // Kiểm tra mark hợp lệ từ TextStyleKit
    const markType = editor.schema.marks.textStyle;
    if (!markType) {
      console.warn("⚠️ TextStyleKit: textStyle mark not found");
      return;
    }
    if (empty) {
      return;
    } else {
      editor.chain().focus().setMark("textStyle", { color }).run();
    }
  };

  const unsetColor = () => {
    editor.chain().focus().unsetColor().run();
  };

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <TextColorButton
            ref={ref}
            onClick={() => setIsOpen((s) => !s)}
            {...buttonProps}
          />
        </PopoverTrigger>

        <PopoverContent side="top" aria-label="Text color picker">
          <TextColorMain
            currentColor={currentColor}
            setColor={setColor}
            unsetColor={unsetColor}
          />
        </PopoverContent>
      </Popover>
      <input
        type="color"
        value={currentColor || "#000000"}
        onInput={(e) => setColor(e.currentTarget.value)}
        className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
      />
    </>
  );
});

TextColorPopover.displayName = "TextColorPopover";
export default TextColorPopover;
