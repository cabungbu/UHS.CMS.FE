"use client";

import * as React from "react";
import { type Editor } from "@tiptap/react";
import { useHotkeys } from "react-hotkeys-hook";
import { useTiptapEditor } from "@/tiptap/hooks/use-tiptap-editor";
import { useIsMobile } from "@/tiptap/hooks/use-mobile";
import { isMarkInSchema } from "@/tiptap/lib/tiptap-utils";
import { SquareChartGantt } from "lucide-react";

export const LINE_HEIGHT_SHORTCUT_KEY = "mod+shift+l";

export const LINE_HEIGHTS = [
  { label: "1.0", value: "1" },
  { label: "1.2", value: "1.2" },
  { label: "1.5", value: "1.5" },
  { label: "2.0", value: "2" },
  { label: "2.5", value: "2.5" },
];

export interface UseLineHeightConfig {
  editor?: Editor | null;
  hideWhenUnavailable?: boolean;
  onApplied?: (value: string | null) => void;
}

export function canSetLineHeight(editor: Editor | null): boolean {
  return !!editor && editor.isEditable && editor.can().setMark("textStyle");
}

export function getCurrentLineHeight(editor: Editor | null): string | null {
  if (!editor) return null;
  const attrs = editor.getAttributes("textStyle");
  return attrs?.lineHeight || null;
}

export function useLineHeight(config: UseLineHeightConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onApplied,
  } = config;
  const { editor } = useTiptapEditor(providedEditor);
  const isMobile = useIsMobile();
  const [currentValue, setCurrentValue] = React.useState<string | null>(null);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      const value = getCurrentLineHeight(editor);
      setCurrentValue(value);
      setIsVisible(canSetLineHeight(editor));
    };

    handleSelectionUpdate();
    editor.on("selectionUpdate", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
    };
  }, [editor]);

  const applyLineHeight = React.useCallback(
    (value: string) => {
      if (!editor) return;

      const { state } = editor;
      const { empty } = state.selection;
      if (empty) {
        return;
      } else {
        editor
          .chain()
          .focus()
          .setMark("textStyle", { lineHeight: value })
          .run();
      }

      onApplied?.(value);
      setCurrentValue(value);
    },
    [editor, onApplied]
  );

  const removeLineHeight = React.useCallback(() => {
    if (!editor) return;

    const { state } = editor;
    const { empty } = state.selection;

    if (empty) {
      return;
    } else {
      editor.chain().focus().unsetMark("textStyle").run();
    }

    onApplied?.(null);
    setCurrentValue(null);
  }, [editor, onApplied]);

  useHotkeys(
    LINE_HEIGHT_SHORTCUT_KEY,
    (e) => {
      e.preventDefault();
      applyLineHeight("1.5"); // default shortcut value
    },
    {
      enabled: isVisible,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  );

  return {
    isVisible,
    currentValue,
    applyLineHeight,
    removeLineHeight,
    canSetLineHeight: canSetLineHeight(editor),
    label: "Line height",
    Icon: SquareChartGantt,
  };
}
