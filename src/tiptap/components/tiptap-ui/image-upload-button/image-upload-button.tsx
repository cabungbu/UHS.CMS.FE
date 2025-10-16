"use client";

import * as React from "react";

// --- Lib ---
import { parseShortcutKeys } from "@/tiptap/lib/tiptap-utils";

// --- Hooks ---
import { useTiptapEditor } from "@/tiptap/hooks/use-tiptap-editor";

// --- Tiptap UI ---
import type { UseImageUploadConfig } from "@/tiptap/components/tiptap-ui/image-upload-button";
import {
  IMAGE_UPLOAD_SHORTCUT_KEY,
  useImageUpload,
} from "@/tiptap/components/tiptap-ui/image-upload-button";

// --- UI Primitives ---
import type { ButtonProps } from "@/tiptap/components/tiptap-ui-primitive/button";
import { Button } from "@/tiptap/components/tiptap-ui-primitive/button";
import { Badge } from "@/tiptap/components/tiptap-ui-primitive/badge";

export interface ImageUploadButtonProps
  extends Omit<ButtonProps, "type">,
    UseImageUploadConfig {
  /**
   * Optional text to display alongside the icon.
   */
  text?: string;
  /**
   * Optional show shortcut keys in the button.
   * @default false
   */
  showShortcut?: boolean;
}

export function ImageShortcutBadge({
  shortcutKeys = IMAGE_UPLOAD_SHORTCUT_KEY,
}: {
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

/**
 * Button component for uploading/inserting images in a Tiptap editor.
 *
 * For custom button implementations, use the `useImage` hook instead.
 */
export const ImageUploadButton = React.forwardRef<
  HTMLDivElement,
  ImageUploadButtonProps
>(({ editor: providedEditor, text = "Ảnh", showShortcut = false }, ref) => {
  const { editor } = useTiptapEditor(providedEditor);
  const { Icon } = useImageUpload({ editor });

  if (!editor) return null;

  const handleUploadFromDevice = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        editor
          .chain()
          .focus()
          .setImage({ src: reader.result as string })
          .run();
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleInsertFromUrl = () => {
    const url = prompt("Nhập đường dẫn ảnh (URL):");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div
      className="flex items-center gap-1"
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      {/* Upload từ máy */}
      <Button
        type="button"
        data-style="ghost"
        onClick={handleUploadFromDevice}
        tooltip="Tải ảnh từ máy"
      >
        <Icon className="tiptap-button-icon" />
        {text && <span className="tiptap-button-text">From Computer</span>}
        {showShortcut && <ImageShortcutBadge />}
      </Button>

      {/* Thêm từ URL */}
      <Button
        type="button"
        data-style="ghost"
        tooltip="Thêm ảnh từ URL"
        onClick={handleInsertFromUrl}
      >
        <Icon className="tiptap-button-icon" />
        {text && <span className="tiptap-button-text">Url</span>}
      </Button>
    </div>
  );
});

ImageUploadButton.displayName = "ImageUploadButton";
