"use client";

import * as React from "react";
import { type Editor } from "@tiptap/react";

// --- Hooks ---
import { useMenuNavigation } from "@/tiptap/hooks/use-menu-navigation";
import { useIsMobile } from "@/tiptap/hooks/use-mobile";
import { useTiptapEditor } from "@/tiptap/hooks/use-tiptap-editor";

// --- Icons ---
import { BanIcon } from "@/tiptap/components/tiptap-icons/ban-icon";
import { HighlighterIcon } from "@/tiptap/components/tiptap-icons/highlighter-icon";

// --- UI Primitives ---
import type { ButtonProps } from "@/tiptap/components/tiptap-ui-primitive/button";
import {
  Button,
  ButtonGroup,
} from "@/tiptap/components/tiptap-ui-primitive/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/tiptap/components/tiptap-ui-primitive/popover";
import { Separator } from "@/tiptap/components/tiptap-ui-primitive/separator";
import {
  Card,
  CardBody,
  CardItemGroup,
} from "@/tiptap/components/tiptap-ui-primitive/card";

// --- Tiptap UI ---
import type {
  HighlightColor,
  UseColorHighlightConfig,
} from "@/tiptap/components/tiptap-ui/color-highlight-button";
import {
  ColorHighlightButton,
  pickHighlightColorsByValue,
  useColorHighlight,
} from "@/tiptap/components/tiptap-ui/color-highlight-button";

export interface ColorHighlightPopoverContentProps {
  editor?: Editor | null;
  colors?: HighlightColor[];
  onColorSelect?: (color: string | null) => void;
}

export interface ColorHighlightPopoverProps
  extends Omit<ButtonProps, "type">,
    Pick<
      UseColorHighlightConfig,
      "editor" | "hideWhenUnavailable" | "onApplied"
    > {
  colors?: HighlightColor[];
}

export const ColorHighlightPopoverButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, children, ...props }, ref) => (
  <Button
    type="button"
    className={className}
    data-style="ghost"
    data-appearance="default"
    role="button"
    tabIndex={-1}
    aria-label="Highlight text"
    tooltip="Highlight"
    ref={ref}
    {...props}
  >
    {children ?? <HighlighterIcon className="tiptap-button-icon" />}
  </Button>
));

ColorHighlightPopoverButton.displayName = "ColorHighlightPopoverButton";

// -------------------------
// ✅ Popover Content
// -------------------------
export function ColorHighlightPopoverContent({
  editor,
  colors = pickHighlightColorsByValue([
    "var(--tt-color-highlight-green)",
    "var(--tt-color-highlight-blue)",
    "var(--tt-color-highlight-red)",
    "var(--tt-color-highlight-purple)",
    "var(--tt-color-highlight-yellow)",
  ]),
  onColorSelect,
}: ColorHighlightPopoverContentProps) {
  const { handleRemoveHighlight } = useColorHighlight({ editor });
  const isMobile = useIsMobile();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const menuItems = React.useMemo(
    () => [...colors, { label: "Remove highlight", value: "none" }],
    [colors]
  );

  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "both",
    onSelect: (item) => {
      if (!containerRef.current) return false;
      const highlightedElement = containerRef.current.querySelector(
        '[data-highlighted="true"]'
      ) as HTMLElement;
      if (highlightedElement) highlightedElement.click();
      if (item.value === "none") handleRemoveHighlight();
    },
    autoSelectFirstItem: false,
  });

  return (
    <Card
      ref={containerRef}
      tabIndex={0}
      style={isMobile ? { boxShadow: "none", border: 0 } : {}}
    >
      <CardBody style={isMobile ? { padding: 0 } : {}}>
        <CardItemGroup orientation="horizontal">
          <ButtonGroup orientation="horizontal">
            {colors.map((color, index) => (
              <ColorHighlightButton
                key={color.value}
                editor={editor}
                highlightColor={color.value}
                tooltip={color.label}
                aria-label={`${color.label} highlight color`}
                tabIndex={index === selectedIndex ? 0 : -1}
                data-highlighted={selectedIndex === index}
                onClick={() => {
                  editor
                    ?.chain()
                    .focus()
                    .setMark("highlight", { color: color.value })
                    .run();
                  onColorSelect?.(color.value); // ✅ update currentColor
                }}
              />
            ))}
          </ButtonGroup>
          <Separator />
          <ButtonGroup orientation="horizontal">
            <Button
              onClick={() => {
                handleRemoveHighlight();
                onColorSelect?.(null); // ✅ reset currentColor
              }}
              aria-label="Remove highlight"
              tooltip="Remove highlight"
              tabIndex={selectedIndex === colors.length ? 0 : -1}
              type="button"
              role="menuitem"
              data-style="ghost"
              data-highlighted={selectedIndex === colors.length}
            >
              <BanIcon className="tiptap-button-icon" />
            </Button>
          </ButtonGroup>
        </CardItemGroup>
      </CardBody>
    </Card>
  );
}

// -------------------------
// ✅ Main Popover Component
// -------------------------
export function ColorHighlightPopover({
  editor: providedEditor,
  colors = pickHighlightColorsByValue([
    "var(--tt-color-highlight-green)",
    "var(--tt-color-highlight-blue)",
    "var(--tt-color-highlight-red)",
    "var(--tt-color-highlight-purple)",
    "var(--tt-color-highlight-yellow)",
  ]),
  hideWhenUnavailable = false,
  onApplied,
  ...props
}: ColorHighlightPopoverProps) {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = React.useState(false);
  const [customColor, setCustomColor] = React.useState<string | null>(null);

  const { isVisible, canColorHighlight, isActive, label, Icon, currentColor } =
    useColorHighlight({
      editor,
      hideWhenUnavailable,
      onApplied,
    });

  const activeColor = customColor ?? currentColor ?? "#ffff99";

  if (!isVisible) return null;

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <ColorHighlightPopoverButton
            disabled={!canColorHighlight}
            data-active-state={isActive ? "on" : "off"}
            data-disabled={!canColorHighlight}
            aria-pressed={isActive}
            aria-label={label}
            tooltip={label}
            {...props}
          >
            <Icon className="tiptap-button-icon" />
          </ColorHighlightPopoverButton>
        </PopoverTrigger>

        <PopoverContent
          aria-label="Highlight colors"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest("input[type='color']")) e.preventDefault();
          }}
        >
          <ColorHighlightPopoverContent
            editor={editor}
            colors={colors}
            onColorSelect={(color) => {
              setCustomColor(color);
            }}
          />
        </PopoverContent>
      </Popover>

      <input
        type="color"
        value={currentColor ?? "#ffffff"}
        onChange={(e) => {
          const color = e.target.value;
          editor?.chain().focus().setMark("highlight", { color }).run();
        }}
        className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
      />
    </>
  );
}

export default ColorHighlightPopover;
