"use client";
import React from "react";
import type { Editor } from "@tiptap/react";

interface CellStylePopupProps {
  editor: Editor;
  x: number;
  y: number;
  onClose: () => void;
}

export const CellStylePopup: React.FC<CellStylePopupProps> = ({
  editor,
  x,
  y,
  onClose,
}) => {
  const setCellAttr = (attr: string, value: string) => {
    editor.chain().focus().setCellAttribute(attr, value).run();
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: y,
        left: x,
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: "8px",
        zIndex: 2000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label>
          Background:
          <input
            type="color"
            onChange={(e) => setCellAttr("backgroundColor", e.target.value)}
          />
        </label>

        <label>
          Border color:
          <input
            type="color"
            onChange={(e) => setCellAttr("borderColor", e.target.value)}
          />
        </label>

        <label>
          Border style:
          <select
            onChange={(e) => setCellAttr("borderStyle", e.target.value)}
            defaultValue=""
          >
            <option value="">Default</option>
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
            <option value="none">None</option>
          </select>
        </label>

        <label>
          Border width:
          <input
            type="number"
            min={0}
            max={10}
            onChange={(e) => setCellAttr("borderWidth", `${e.target.value}px`)}
          />
        </label>
      </div>

      <button
        style={{
          marginTop: "8px",
          width: "100%",
          padding: "4px 8px",
          border: "1px solid #ddd",
          background: "#f9f9f9",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};
