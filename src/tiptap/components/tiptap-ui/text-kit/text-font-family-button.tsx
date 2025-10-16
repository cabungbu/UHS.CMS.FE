"use client";

import * as React from "react";
import type { Editor } from "@tiptap/react";
import { TypeIcon } from "lucide-react";
import { useTiptapEditor } from "@/tiptap/hooks/use-tiptap-editor";
import { useIsMobile } from "@/tiptap/hooks/use-mobile";
import { FontFamily, TextStyle } from "@tiptap/extension-text-style";

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

const FONT_FAMILIES = [
  { label: "Inter", value: "Inter" },
  { label: "Comic Sans", value: '"Comic Sans MS", "Comic Sans"' },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
  { label: "Cursive", value: "cursive" },
  { label: "CSS Variable", value: "var(--title-font-family)" },
  { label: "Exo 2", value: '"Exo 2"' },
];

export const TextFontButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        type="button"
        className={className}
        data-style="ghost"
        data-appearance="default"
        role="button"
        tabIndex={-1}
        aria-label="Font family"
        tooltip="Font family"
        ref={ref}
        {...props}
      >
        {children ?? <TypeIcon className="tiptap-button-icon" />}
      </Button>
    );
  }
);

TextFontButton.displayName = "TextFontButton";

interface TextFontMainProps {
  currentFont: string;
  setFont: (font: string) => void;
  unsetFont: () => void;
}

const TextFontMain: React.FC<TextFontMainProps> = ({
  currentFont,
  setFont,
  unsetFont,
}) => {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardBody>
        <CardItemGroup orientation="vertical" className="gap-2">
          <ButtonGroup orientation="vertical" className="flex-wrap">
            {FONT_FAMILIES.map(({ label, value }) => (
              <Button
                key={value}
                type="button"
                onClick={() => setFont(value)}
                data-style="ghost"
                data-appearance="default"
                className={`justify-start ${
                  currentFont === value ? "bg-gray-200" : ""
                }`}
                style={{ fontFamily: value }}
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>

          <Button
            type="button"
            onClick={unsetFont}
            data-style="ghost"
            className="text-sm mt-2"
          >
            Unset Font
          </Button>
        </CardItemGroup>
      </CardBody>
    </Card>
  );
};

export const TextFontPopover = React.forwardRef<
  HTMLButtonElement,
  { editor?: Editor | null } & Omit<ButtonProps, "type">
>(({ editor: providedEditor, ...buttonProps }, ref) => {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = React.useState(false);
  if (!editor) return null;

  const { state } = editor;
  const { empty } = state.selection;

  if (empty) {
    return;
  }

  const currentFont =
    typeof editor.getAttributes("textStyle").fontFamily === "string"
      ? editor.getAttributes("textStyle").fontFamily
      : "";

  const setFont = (font: string) => {
    try {
      if (typeof font !== "string" || !font.length) return;
      editor.chain().focus().setFontFamily(font).run();
    } catch (err) {
      console.warn("Invalid font:", font, err);
    }
  };

  const unsetFont = () => {
    try {
      editor.chain().focus().unsetFontFamily().run();
    } catch (err) {
      console.warn("Unset font failed:", err);
    }
  };

  return (
    <>
      {/* Optional: load Exo2 font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <TextFontButton
            ref={ref}
            onClick={() => setIsOpen((s) => !s)}
            {...buttonProps}
          />
        </PopoverTrigger>

        <PopoverContent side="top" aria-label="Font family picker">
          <TextFontMain
            currentFont={currentFont}
            setFont={setFont}
            unsetFont={unsetFont}
          />
        </PopoverContent>
      </Popover>
    </>
  );
});

TextFontPopover.displayName = "TextFontPopover";
export default TextFontPopover;
